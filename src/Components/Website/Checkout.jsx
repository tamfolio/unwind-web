import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

function Checkout() {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate(); // For navigation

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample event data (you can get this from props, context, or API)
  const eventData = {
    id: 1,
    title: 'Tech Conference 2025',
    date: 'May 25, 2025',
    location: 'B Ann Avenue, Lagos',
    image: '/assets/event-image.png'
  };

  // Sample order data (you can get this from context or route state)
  const orderData = {
    ticketType: 'Regular Ticket',
    quantity: 1,
    price: 5000,
    serviceFee: 0  // FIXED: Was serviceeFee (with extra 'e')
  };

  const subtotal = orderData.price * orderData.quantity;
  const total = subtotal + orderData.serviceFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission - integrate with payment gateway
    console.log('Processing payment...', formData);
    alert('Payment processing would happen here!');
  };

  const handleBackToEvent = () => {
    navigate(`/discover-events/${id}`);
  };

  return (
    <>
      {/* Back Button */}
      <div className="bg-white px-4 py-4 border-b">
        <button 
          onClick={handleBackToEvent}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Event
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your ticket purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information Form */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-6">Your tickets will be sent to the email address you provide below</p>
            
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="name@example.com"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="+234 683 006 0328"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            {/* Event Details */}
            <div className="flex gap-4 mb-6">
              <img 
                src={eventData.image} 
                alt={eventData.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{eventData.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{eventData.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{eventData.location}</span>
                </div>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">
                  {orderData.ticketType} ({orderData.quantity})
                </span>
                <span className="font-medium">₦{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Sub Total</span>
                <span className="font-medium">₦{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Service Fee</span>
                <span className="font-medium">₦{orderData.serviceFee.toLocaleString()}</span>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold">₦{total.toLocaleString()}.00</span>
                </div>
              </div>
            </div>

            {/* Buy Ticket Button */}
            <button 
              onClick={handleSubmit}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-lg transition-colors duration-200 mb-4"
            >
              Buy Now
            </button>

            {/* Security Notice */}
            <p className="text-center text-sm text-gray-500">
              Secure checkout powered by PayStack
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;