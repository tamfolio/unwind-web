import React, { useState } from "react";
import { X, CreditCard, Wallet, AlertCircle } from "lucide-react";
import { usePaymentMethods } from "../../../../../../hooks/useEvents";

function PaymentModal({ isOpen, onClose, onComplete, ticketData, eventData }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [promoCode, setPromoCode] = useState("");

  // Fetch payment methods from API
  const { 
    data: paymentMethods, 
    isLoading: paymentMethodsLoading, 
    error: paymentMethodsError 
  } = usePaymentMethods();

  if (!isOpen || !ticketData) return null;

  const formatPrice = (price) => `₦ ${price.toLocaleString()}`;

  // Calculate fees based on selected payment method
  const calculateFees = (method, amount) => {
    if (!method || !amount) return { processingFee: 0, fixedFee: 0, total: 0 };
    
    const processingFee = (amount * method.processingFee) / 100;
    const fixedFee = method.fixedFee;
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

  const ticketPrice = ticketData.total;
  const fees = selectedPaymentMethod ? calculateFees(selectedPaymentMethod, ticketPrice) : { processingFee: 0, fixedFee: 0, total: 0 };
  const total = ticketPrice + fees.total;

  const handleComplete = () => {
    // Here you would normally process the payment
    onComplete();
  };

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
          {/* Selected Ticket Type */}
          <div className="grid grid-cols-2 gap-4 mb-6">
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
            
            {paymentMethodsLoading ? (
              <div className="space-y-3">
                <div className="animate-pulse">
                  <div className="h-16 bg-gray-200 rounded-lg mb-2"></div>
                  <div className="h-16 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ) : paymentMethodsError ? (
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
                  
                  return (
                    <label 
                      key={method.id} 
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={isSelected}
                          onChange={() => setSelectedPaymentMethod(method)}
                          className="w-4 h-4 text-purple-600"
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
                            <span className="font-medium">{method.name}</span>
                            <p className="text-sm text-gray-500">{method.description}</p>
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
            onClick={handleComplete}
            disabled={!selectedPaymentMethod}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {selectedPaymentMethod 
              ? `Pay ${formatPrice(total)} with ${selectedPaymentMethod.name}`
              : 'Select Payment Method'
            }
          </button>
          
          {selectedPaymentMethod && (
            <p className="text-center text-xs text-gray-500 mt-2">
              You will be redirected to {selectedPaymentMethod.name} to complete your payment
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;