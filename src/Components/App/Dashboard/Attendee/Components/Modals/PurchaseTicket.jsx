import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConfirmPurchase from './ConfirmPurchase';
import PaymentModal from './PaymentModal';
import SuccessModal from './SuccessModal';

function PurchaseTicket({ isOpen, onClose, eventData }) {
  const [selectedTicket, setSelectedTicket] = useState("regular");
  const [quantity, setQuantity] = useState(1);
  const [currentStep, setCurrentStep] = useState('select'); // 'select', 'confirm', 'payment', 'success'
  const navigate = useNavigate();

  const ticketTypes = [
    {
      id: "regular",
      name: "Regular",
      price: 5000,
      description: "Standard admission with access to all general event areas",
      color: "bg-gray-50 border-gray-200",
    },
    {
      id: "vip",
      name: "VIP",
      price: 7000,
      description: "Premium admission with access to all general event areas",
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: "premium",
      name: "Premium",
      price: 12000,
      description: "Premium admission with access to all general event areas",
      color: "bg-purple-50 border-purple-200",
    },
  ];

  const calculateTotal = () => {
    const selectedTicketType = ticketTypes.find(
      (ticket) => ticket.id === selectedTicket
    );
    return selectedTicketType ? selectedTicketType.price * quantity : 0;
  };

  const getTicketData = () => ({
    eventId: eventData?.id,
    ticketType: selectedTicket,
    quantity: quantity,
    total: calculateTotal()
  });

  const handleClose = () => {
    // Reset to initial state when closing
    setSelectedTicket("regular");
    setQuantity(1);
    setCurrentStep('select');
    onClose();
  };

  const handleProceedToCheckout = () => {
    setCurrentStep('confirm');
  };

  const handleConfirmPurchase = () => {
    setCurrentStep('payment');
  };

  const handlePaymentComplete = () => {
    setCurrentStep('success');
  };

  const handleViewTicket = () => {
    handleClose();
    navigate('/dashboard/my-tickets');
  };

  // Don't render anything if modal is not open
  if (!isOpen) return null;

  // Render different steps based on currentStep
  if (currentStep === 'confirm') {
    return (
      <ConfirmPurchase
        isOpen={true}
        onClose={handleClose}
        onConfirm={handleConfirmPurchase}
        ticketData={getTicketData()}
        eventData={eventData}
      />
    );
  }

  if (currentStep === 'payment') {
    return (
      <PaymentModal
        isOpen={true}
        onClose={handleClose}
        onComplete={handlePaymentComplete}
        ticketData={getTicketData()}
        eventData={eventData}
      />
    );
  }

  if (currentStep === 'success') {
    return (
      <SuccessModal
        isOpen={true}
        onClose={handleClose}
        onViewTicket={handleViewTicket}
        eventData={eventData}
      />
    );
  }

  // Default step - ticket selection
  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Select Your Tickets</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Event Info */}
          {eventData && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">{eventData.title}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{eventData.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{eventData.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{eventData.location}</span>
                </div>
              </div>
            </div>
          )}

          {/* Ticket Types */}
          <div className="space-y-4 mb-6">
            <h4 className="font-semibold">Available Ticket Types</h4>
            {ticketTypes.map((ticket) => (
              <div
                key={ticket.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedTicket === ticket.id
                    ? "border-purple-500 bg-purple-50"
                    : ticket.color
                }`}
                onClick={() => setSelectedTicket(ticket.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold">{ticket.name}</h5>
                  <span className="font-bold text-lg">
                    ₦{ticket.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {ticket.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">130 tickets available</span>
                  {selectedTicket === ticket.id && (
                    <div className="w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Quantity
            </label>
            <div className="flex items-center border rounded-lg w-32">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="flex-1 text-center py-2 border-x">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span>{ticketTypes.find(t => t.id === selectedTicket)?.name} Tickets</span>
              <span>₦{calculateTotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Service Fee</span>
              <span>₦0</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>₦{calculateTotal().toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleProceedToCheckout}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>

          {eventData && (
            <p className="text-center text-sm text-gray-500 mt-4">
              <Users className="w-4 h-4 inline mr-1" />
              {eventData.attendees} people are interested
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PurchaseTicket;