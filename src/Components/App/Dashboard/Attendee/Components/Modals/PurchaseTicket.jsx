import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, X, Star, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConfirmPurchase from './ConfirmPurchase';
import PaymentModal from './PaymentModal';
import SuccessModal from './SuccessModal';

function PurchaseTicket({ isOpen, onClose, eventData }) {
  const [selectedTicket, setSelectedTicket] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentStep, setCurrentStep] = useState('select'); // 'select', 'confirm', 'payment', 'success'
  const navigate = useNavigate();

  // Set default ticket when modal opens and event data is available
  useEffect(() => {
    if (isOpen && eventData?.ticketTypes && eventData.ticketTypes.length > 0 && !selectedTicket) {
      // Select the first available ticket type
      const availableTicket = eventData.ticketTypes.find(ticket => ticket.available > 0);
      if (availableTicket) {
        setSelectedTicket(availableTicket.id);
      }
    }
  }, [isOpen, eventData, selectedTicket]);

  // Use real ticket types from API data, fallback to empty array
  const ticketTypes = eventData?.ticketTypes || [];

  const getAvailabilityStatus = (ticket) => {
    if (ticket.available === 0) {
      return { status: 'sold-out', color: 'text-red-600', text: 'Sold Out', bgColor: 'bg-red-50 border-red-200' };
    }
    const availablePercentage = (ticket.available / ticket.quantity) * 100;
    if (availablePercentage <= 10) {
      return { status: 'limited', color: 'text-red-600', text: 'Only few left!', bgColor: 'bg-red-50 border-red-200' };
    }
    if (availablePercentage <= 30) {
      return { status: 'selling-fast', color: 'text-orange-600', text: 'Selling fast', bgColor: 'bg-orange-50 border-orange-200' };
    }
    return { status: 'available', color: 'text-green-600', text: 'Available', bgColor: 'bg-gray-50 border-gray-200' };
  };

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
    total: calculateTotal(),
    ticketDetails: ticketTypes.find(t => t.id === selectedTicket)
  });

  const handleClose = () => {
    // Reset to initial state when closing
    setSelectedTicket("");
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
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg">{eventData.title}</h3>
                {eventData.isFeatured && (
                  <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </span>
                )}
                {eventData.isVirtual && (
                  <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    <Globe className="w-3 h-3 mr-1" />
                    Virtual
                  </span>
                )}
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{eventData.date || eventData.shortDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{eventData.time} {eventData.timezone && `(${eventData.timezone})`}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{eventData.venue ? `${eventData.venue}, ${eventData.city}` : eventData.location}</span>
                </div>
                {eventData.organizer && (
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Organized by {eventData.organizer.name}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Ticket Types */}
          <div className="space-y-4 mb-6">
            <h4 className="font-semibold">Available Ticket Types</h4>
            {ticketTypes.length > 0 ? (
              ticketTypes.map((ticket) => {
                const availability = getAvailabilityStatus(ticket);
                const isSelected = selectedTicket === ticket.id;
                const isAvailable = ticket.available > 0;
                
                return (
                  <div
                    key={ticket.id}
                    className={`border rounded-lg p-4 transition-all ${
                      isSelected
                        ? "border-purple-500 bg-purple-50"
                        : isAvailable 
                        ? `${availability.bgColor} hover:border-gray-300 cursor-pointer`
                        : "bg-gray-100 border-gray-300 cursor-not-allowed opacity-75"
                    }`}
                    onClick={() => isAvailable && setSelectedTicket(ticket.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold">{ticket.name}</h5>
                      <span className="font-bold text-lg">
                        ₦{ticket.price.toLocaleString()}
                        {ticket.currency && ticket.currency !== 'NGN' && (
                          <span className="text-sm text-gray-500 ml-1">{ticket.currency}</span>
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {ticket.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${availability.color}`}>
                        {availability.text}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {ticket.available} of {ticket.quantity} left
                        </span>
                        {isSelected && isAvailable && (
                          <div className="w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Progress bar for ticket availability */}
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            availability.status === 'limited' ? 'bg-red-400' :
                            availability.status === 'selling-fast' ? 'bg-orange-400' :
                            availability.status === 'sold-out' ? 'bg-gray-400' :
                            'bg-green-400'
                          }`}
                          style={{ width: `${(ticket.available / ticket.quantity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No ticket types available for this event.</p>
              </div>
            )}
          </div>

          {/* Quantity Selector - Only show if a ticket is selected and available */}
          {selectedTicket && ticketTypes.find(t => t.id === selectedTicket)?.available > 0 && (
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
                  onClick={() => {
                    const maxAvailable = ticketTypes.find(t => t.id === selectedTicket)?.available || 1;
                    setQuantity(Math.min(quantity + 1, maxAvailable));
                  }}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Maximum {ticketTypes.find(t => t.id === selectedTicket)?.available} tickets available
              </p>
            </div>
          )}

          {/* Price Summary - Only show if a ticket is selected */}
          {selectedTicket && calculateTotal() > 0 && (
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span>{ticketTypes.find(t => t.id === selectedTicket)?.name} Tickets ({quantity}x)</span>
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
          )}

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
              disabled={!selectedTicket || calculateTotal() === 0}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Proceed to Checkout
            </button>
          </div>

          {/* Event Stats */}
          {eventData && (
            <div className="text-center text-sm text-gray-500 mt-4 space-y-1">
              {eventData.totalSold > 0 && (
                <p>
                  <Users className="w-4 h-4 inline mr-1" />
                  {eventData.totalSold} people attending
                </p>
              )}
              {eventData.totalAvailable > 0 && (
                <p className="text-xs">
                  {eventData.totalAvailable} tickets remaining of {eventData.totalCapacity} total
                </p>
              )}
              {/* Fallback for older event data format */}
              {!eventData.totalSold && eventData.attendees && (
                <p>
                  <Users className="w-4 h-4 inline mr-1" />
                  {eventData.attendees} people are interested
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PurchaseTicket;