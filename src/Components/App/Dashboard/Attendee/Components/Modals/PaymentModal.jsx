import React, { useState, useEffect } from "react";
import { X, CreditCard, Wallet, AlertCircle, Loader } from "lucide-react";
import { useSelector } from 'react-redux';
import { usePaymentMethods, usePurchaseTickets, useVerifyPayment } from "@hooks/useEvents";
import { useDashboardSummary } from "../../../../../../hooks/useDashboard";

function PaymentModal({ isOpen, onClose, onComplete, ticketData, eventData }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Get user data from Redux
  const currentUser = useSelector((state) => state.user?.currentUser);
  const access_token = currentUser?.access_token || localStorage.getItem('access_token');

  // Fetch dashboard summary to get wallet balance - using the correct hook
  const { 
    data: dashboardData, 
    isLoading: dashboardLoading,
    error: dashboardError,
    refetch: refetchDashboard
  } = useDashboardSummary(); // Don't pass access token - hook handles authentication internally

  // Fetch payment methods from API
  const { 
    data: paymentMethods, 
    isLoading: paymentMethodsLoading, 
    error: paymentMethodsError 
  } = usePaymentMethods();

  // Purchase tickets mutation
  const purchaseTicketsMutation = usePurchaseTickets({
    onSuccess: (response) => {
      console.log('✅ Purchase successful:', response);
      // Redirect to payment URL
      if (response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        // If no payment URL (maybe free ticket or wallet payment), complete immediately
        onComplete();
      }
    },
    onError: (error) => {
      console.error('❌ Purchase failed:', error);
      setIsProcessing(false);
      alert('Purchase failed: ' + error.message);
    }
  });

  // Verify payment mutation
  const verifyPaymentMutation = useVerifyPayment({
    onSuccess: (response) => {
      console.log('✅ Payment verified:', response);
      setIsProcessing(false);
      onComplete();
    },
    onError: (error) => {
      console.error('❌ Payment verification failed:', error);
      setIsProcessing(false);
      alert('Payment verification failed: ' + error.message);
    }
  });

  // Listen for payment callback (when user returns from payment gateway)
  useEffect(() => {
    const handlePaymentCallback = (event) => {
      if (event.data && event.data.type === 'PAYMENT_CALLBACK') {
        const { reference, status } = event.data;
        console.log('💳 Payment callback received:', { reference, status });
        
        if (status === 'success' && reference) {
          setIsProcessing(true);
          // Verify the payment
          verifyPaymentMutation.mutate({ reference, accessToken: access_token });
        } else {
          setIsProcessing(false);
          alert('Payment was cancelled or failed');
        }
      }
    };

    window.addEventListener('message', handlePaymentCallback);
    return () => window.removeEventListener('message', handlePaymentCallback);
  }, [access_token, verifyPaymentMutation]);

  // Handle URL callback when user returns from payment gateway
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('reference') || urlParams.get('trxref');
    
    if (reference && isOpen) {
      console.log('🔗 Payment reference found in URL:', reference);
      setIsProcessing(true);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
      // Verify payment
      verifyPaymentMutation.mutate({ reference, accessToken: access_token });
    }
  }, [isOpen, access_token, verifyPaymentMutation]);

  if (!isOpen || !ticketData) return null;

  const formatPrice = (price) => `₦ ${price.toLocaleString()}`;

  // Get wallet balance from dashboard data - EXACT same logic as AttendeeDashboard
  const walletBalance = dashboardData?.walletBalance || dashboardData?.wallet_balance || dashboardData?.balance || 0;

  console.log('🔍 PaymentModal Debug (same hook as Dashboard):');
  console.log('  - Dashboard Data:', dashboardData);
  console.log('  - Wallet Balance (should be 505k):', walletBalance);
  console.log('  - Dashboard Loading:', dashboardLoading);
  console.log('  - Dashboard Error:', dashboardError);
  
  // Format currency helper - same as dashboard
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency', 
      currency: 'NGN'
    }).format(amount || 0);
  };

  // Calculate fees based on selected payment method
  const calculateFees = (method, amount) => {
    if (!method || !amount) return { processingFee: 0, fixedFee: 0, total: 0 };
    
    const processingFee = (amount * (method.processingFee || 0)) / 100;
    const fixedFee = method.fixedFee || 0;
    const total = processingFee + fixedFee;
    
    return {
      processingFee,
      fixedFee,
      total
    };
  };

  const getMethodIcon = (type) => {
    switch (type) {
      case 'paystack':
        return <CreditCard className="w-4 h-4" />;
      case 'wallet_balance':
        return <Wallet className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  // Check if wallet has insufficient balance - FIXED LOGIC INCLUDING EDGE CASE
  const hasInsufficientBalance = (method, ticketPrice) => {
    // Check if this is a wallet payment method
    if (method.type === 'wallet_balance' || method.name?.toLowerCase().includes('wallet')) {
      const fees = calculateFees(method, ticketPrice);
      const totalRequired = ticketPrice + fees.total;
      
      console.log('💰 Balance Check:', {
        method: method.name,
        walletBalance,
        ticketPrice,
        fees: fees.total,
        totalRequired,
        insufficient: walletBalance < totalRequired,
        hasExactAmount: walletBalance === totalRequired,
        canAfford: walletBalance >= totalRequired
      });
      
      // Return true if insufficient (balance is LESS than required)
      // If balance equals required amount, it should be sufficient (false)
      return walletBalance < totalRequired;
    }
    return false;
  };

  const ticketPrice = ticketData.total;
  const fees = selectedPaymentMethod ? calculateFees(selectedPaymentMethod, ticketPrice) : { processingFee: 0, fixedFee: 0, total: 0 };
  const total = ticketPrice + fees.total;

  const handlePurchase = async () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // Check wallet balance if using wallet payment
    if (selectedPaymentMethod.type === 'wallet_balance' && hasInsufficientBalance(selectedPaymentMethod, ticketPrice)) {
      alert('Insufficient wallet balance. Please top up your wallet or use another payment method.');
      return;
    }

    setIsProcessing(true);

    const purchaseData = {
      eventId: eventData.id,
      ticketTypeId: ticketData.ticketType,
      quantity: ticketData.quantity,
      paymentMethodId: selectedPaymentMethod.id,
      guestEmail: guestEmail || currentUser?.email,
      guestPhone: guestPhone || currentUser?.phone || "",
      notes: notes
    };

    console.log('🛒 Purchasing tickets with data:', purchaseData);

    try {
      await purchaseTicketsMutation.mutateAsync({ 
        purchaseData, 
        accessToken: access_token 
      });
    } catch (error) {
      console.error('Purchase error:', error);
      setIsProcessing(false);
    }
  };

  // Show processing overlay
  if (isProcessing) {
    return (
      <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-600" />
          <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
          <p className="text-gray-600">
            Please wait while we process your payment. Do not close this window.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="text-center flex-1">
            <h2 className="text-lg font-semibold">
              Complete your purchase for {ticketData.title?.length > 30
                ? `${ticketData.title.substring(0, 30)}...`
                : ticketData.title} ticket(s)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Debug wallet balance in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-3 bg-blue-50 rounded text-sm">
              <strong className="text-blue-800">💰 Wallet Balance (using same hook as Dashboard):</strong>
              <span className="text-blue-700 ml-2">
                {dashboardLoading ? 'Loading...' : formatCurrency(walletBalance)}
              </span>
              <div className="mt-2 text-xs text-blue-600">
                Expected: ₦505,000.00 | Actual: {formatCurrency(walletBalance)}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder={currentUser?.email || "Enter your email"}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="+234..."
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Selected Ticket Type & Promo Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Selected Ticket Type
              </label>
              <div className="border rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="capitalize">
                    {ticketData.ticketDetails?.name || 'Ticket'}
                  </span>
                  <span className="font-semibold">
                    {formatPrice(ticketData.total / ticketData.quantity)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Enter Promo Code{" "}
                <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter promo code"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Additional Notes <span className="text-gray-500">(Optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Any special requests or notes..."
            />
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center border rounded-lg w-32">
              <button className="px-3 py-2 hover:bg-gray-100 transition-colors cursor-not-allowed opacity-50">
                -
              </button>
              <span className="flex-1 text-center py-2 border-x">
                {ticketData.quantity}
              </span>
              <button className="px-3 py-2 hover:bg-gray-100 transition-colors cursor-not-allowed opacity-50">
                +
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Quantity cannot be changed at checkout</p>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">
              Payment Method
            </label>
            
            {paymentMethodsLoading || dashboardLoading ? (
              <div className="space-y-3">
                <div className="animate-pulse">
                  <div className="h-16 bg-gray-200 rounded-lg mb-2"></div>
                  <div className="h-16 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ) : paymentMethodsError || dashboardError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  <span>Failed to load payment methods</span>
                </div>
                <p className="text-sm text-red-500 mt-1">Please try again later.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {paymentMethods?.map((method) => {
                  const isSelected = selectedPaymentMethod?.id === method.id;
                  const methodFees = calculateFees(method, ticketPrice);
                  const methodTotal = ticketPrice + methodFees.total;
                  const insufficientBalance = hasInsufficientBalance(method, ticketPrice);
                  const isDisabled = insufficientBalance;
                  
                  return (
                    <label 
                      key={method.id} 
                      className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
                        isDisabled
                          ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-75'
                          : isSelected 
                          ? 'border-purple-500 bg-purple-50 cursor-pointer' 
                          : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={isSelected}
                          onChange={() => !isDisabled && setSelectedPaymentMethod(method)}
                          disabled={isDisabled}
                          className="w-4 h-4 text-purple-600 disabled:cursor-not-allowed"
                        />
                        <div className="ml-3 flex items-center gap-2">
                          <div className={`p-1 rounded ${
                            method.type === 'paystack' ? 'bg-blue-100 text-blue-600' :
                            method.type === 'wallet_balance' ? 'bg-green-100 text-green-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {getMethodIcon(method.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{method.name}</span>
                              {/* Debug info for wallet methods */}
                              {console.log('🔍 Method Debug:', {
                                methodName: method.name,
                                methodType: method.type,
                                isWalletType: method.type === 'wallet_balance',
                                nameIncludesWallet: method.name?.toLowerCase().includes('wallet'),
                                shouldShowBalance: method.type === 'wallet_balance' || method.name?.toLowerCase().includes('wallet'),
                                walletBalance
                              })}
                              {/* Show balance for ANY wallet method */}
                              {(method.type === 'wallet_balance' || 
                                method.name?.toLowerCase().includes('wallet') ||
                                method.name?.toLowerCase().includes('balance')) && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                  Balance: {formatPrice(walletBalance)}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{method.description}</p>
                            {insufficientBalance && (
                              <p className="text-xs text-red-600 mt-1">
                                Insufficient balance (need {formatPrice(methodTotal)})
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        {methodFees.total > 0 && (
                          <div className="text-xs text-gray-500">
                            +₦{methodFees.total.toLocaleString()} fee
                          </div>
                        )}
                        <div className="font-semibold">
                          {formatPrice(methodTotal)}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Price Summary */}
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="capitalize">
                {ticketData.ticketDetails?.name || 'Ticket'} ({ticketData.quantity}x)
              </span>
              <span>{formatPrice(ticketPrice)}</span>
            </div>
            
            {selectedPaymentMethod && fees.total > 0 && (
              <>
                {fees.processingFee > 0 && (
                  <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                    <span>Processing Fee ({selectedPaymentMethod.processingFee}%)</span>
                    <span>{formatPrice(fees.processingFee)}</span>
                  </div>
                )}
                {fees.fixedFee > 0 && (
                  <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                    <span>Fixed Fee</span>
                    <span>{formatPrice(fees.fixedFee)}</span>
                  </div>
                )}
              </>
            )}
            
            <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {/* Complete Purchase Button */}
          <button
            onClick={handlePurchase}
            disabled={!selectedPaymentMethod || isProcessing || purchaseTicketsMutation.isLoading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {purchaseTicketsMutation.isLoading && (
              <Loader className="w-4 h-4 animate-spin" />
            )}
            {selectedPaymentMethod 
              ? `Pay ${formatPrice(total)} with ${selectedPaymentMethod.name}`
              : 'Select Payment Method'
            }
          </button>
          
          {selectedPaymentMethod && (
            <p className="text-center text-xs text-gray-500 mt-2">
              {selectedPaymentMethod.type === 'wallet_balance' 
                ? 'Payment will be deducted from your wallet balance'
                : `You will be redirected to ${selectedPaymentMethod.name} to complete your payment`
              }
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;