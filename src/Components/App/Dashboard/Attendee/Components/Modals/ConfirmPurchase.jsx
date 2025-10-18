import React from 'react';
import { X } from 'lucide-react';

function ConfirmPurchase({ isOpen, onClose, onConfirm, ticketData, eventData }) {
  if (!isOpen || !ticketData) return null;

  const formatPrice = (price) => `₦ ${price.toLocaleString()}`;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">Confirm Purchase</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            You are about to purchase {ticketData.quantity} {ticketData.ticketType} ticket{ticketData.quantity > 1 ? 's' : ''} for {eventData?.title} for a total of{' '}
            <span className="font-semibold">{formatPrice(ticketData.total)}</span> using your wallet balance.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 border border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Complete Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPurchase;