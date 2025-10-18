import React, { useState } from 'react';
import { X } from 'lucide-react';

function PaymentModal({ isOpen, onClose, onComplete, ticketData, eventData }) {
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [promoCode, setPromoCode] = useState('');

  if (!isOpen || !ticketData) return null;

  const formatPrice = (price) => `₦ ${price.toLocaleString()}`;
  
  const ticketPrice = ticketData.total;
  const serviceFee = 0;
  const total = ticketPrice + serviceFee;

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
            <h2 className="text-lg font-semibold">Complete your purchase for {ticketData.ticketType} ticket(s)</h2>
            <p className="text-sm text-gray-600">to {eventData?.title}.</p>
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
              <label className="block text-sm font-medium mb-2">Selected Ticket Type</label>
              <div className="border rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="capitalize">{ticketData.ticketType}</span>
                  <span className="font-semibold">{formatPrice(ticketData.total / ticketData.quantity)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Enter Promo Code <span className="text-gray-500">(Optional)</span></label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder=""
              />
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center border rounded-lg w-32">
              <button className="px-3 py-2 hover:bg-gray-100 transition-colors">-</button>
              <span className="flex-1 text-center py-2 border-x">{ticketData.quantity}</span>
              <button className="px-3 py-2 hover:bg-gray-100 transition-colors">+</button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Payment Method</label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="wallet"
                  checked={paymentMethod === 'wallet'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="ml-3">Wallet Balance ({formatPrice(5000)})</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="paystack"
                  checked={paymentMethod === 'paystack'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="ml-3">PayStack</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="flutterwave"
                  checked={paymentMethod === 'flutterwave'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="ml-3">Flutter Wave</span>
              </label>
            </div>
          </div>

          {/* Price Summary */}
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="capitalize">{ticketData.ticketType} Ticket ({ticketData.quantity})</span>
              <span>{formatPrice(ticketPrice)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Service Fee</span>
              <span>{formatPrice(serviceFee)}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {/* Complete Purchase Button */}
          <button
            onClick={handleComplete}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Complete Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;