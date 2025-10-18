import React from 'react';
import { X } from 'lucide-react';

function SuccessModal({ isOpen, onClose, onViewTicket, eventData }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-xl w-full">
        {/* Modal Header */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-6 pb-6 text-center">
          <h2 className="text-xl font-bold mb-4">Ticket Purchased Successfully</h2>
          
          <p className="text-gray-600 mb-8">
            Your ticket has been confirmed! A copy has been sent to your email — check your inbox for all the details. We can't wait to see you at the event!
          </p>

          {/* Success Icon */}
          <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg 
              className="w-16 h-16 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>

          {/* View Ticket Button */}
          <button
            onClick={onViewTicket}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            View Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;