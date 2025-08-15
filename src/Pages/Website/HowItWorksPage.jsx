import { Check } from "lucide-react";
import React from "react";

function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              How It Works
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            How Unwind Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From discovery to checkout, Unwind makes event ticketing simple and
            seamless. Here's how our platform connects event-goers with
            unforgettable experiences.
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            Get Started
          </button>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Member Dashboard */}
            <div className="bg-white rounded-2xl shadow-lg p-8 rotate-6">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-[#F7F5FA] rounded-full flex items-center justify-center mr-4">
                  <img src="/assets/profile-2user.png" alt="" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Attendee Dashboard
                  </h3>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Current Balance</span>
                  <span className="font-bold text-green-600">$5,500.00</span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Recent Activity</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Music Festival</span>
                      <span>-$125.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Comedy Show</span>
                      <span>-$45.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Organizer Dashboard */}
            <div className="bg-white rounded-2xl shadow-lg p-8 -rotate-6">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-[#F7F5FA] rounded-full flex items-center justify-center mr-4">
                  <img src="/assets/status-up.png" alt="" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Organizer Dashboard
                  </h3>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-[#F7F5FA] rounded-lg">
                  <span className="text-gray-700">Total Sales</span>
                  <span className="font-bold text-primary">$18,500.00</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-900">234</div>
                    <div className="text-sm text-gray-600">Tickets Sold</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-900">12</div>
                    <div className="text-sm text-gray-600">Active Events</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Event Attendees Section */}
      <section className="py-20 bg-[#F7F5FA]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            For Event Attendees
          </h2>
          <p className="mb-16 text-center">
            Discover, save, and enjoy amazing events in just a few steps
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Discover Events */}
            <div className="bg-white rounded-xl py-10 px-5 flex flex-col justify-start items-start w-full shadow-[10px_4px_20px_0px_#00000014]">
              <div className="w-16 h-16 bg-[#F7F5FA] rounded-full flex items-center justify-center mb-6">
                <img src="/assets/search-favorite.svg" alt="" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                Discover Events
              </h3>
              <p className="mb-4 text-[#5E5073] font-normal text-sm">
                Browse thousands of events by category, location, or date. Use
                our smart search and personalized recommendations to find events
                you'll love.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Browse curated event listings
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Filter by location and interests
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Get personalized recommendations
                </li>
              </ul>
            </div>

            {/* Save or Buy Instantly */}
            <div className="bg-white rounded-xl py-10 px-5 flex flex-col justify-start items-start w-full shadow-[10px_4px_20px_0px_#00000014]">
              <div className="w-16 h-16 bg-[#F7F5FA] rounded-full flex items-center justify-center mb-6">
                <img src="/assets/card-pos.png" alt="" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                Save or Buy Instantly
              </h3>
              <p className="mb-4 text-[#5E5073] font-normal text-sm">
                Start saving towards expensive events with our unique savings
                feature, or buy tickets instantly for immediate events.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  One-click ticket purchasing
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Save events for later
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Secure payment processing
                </li>
              </ul>
            </div>

            {/* Enjoy & Share */}
            <div className="bg-white rounded-xl py-10 px-5 flex flex-col justify-start items-start w-full shadow-[10px_4px_20px_0px_#00000014]">
              <div className="w-16 h-16 bg-[#F7F5FA] rounded-full flex items-center justify-center mb-6">
                <img src="/assets/ticket-star.png" alt="" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                Enjoy & Share
              </h3>
              <p className="mb-4 text-[#5E5073] font-normal text-sm">
                Get your tickets delivered instantly, enjoy amazing events, and
                share your experiences with the community.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Digital ticket delivery
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Easy event check-in
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Share with friends
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Event Dashboard Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Your Personal Event Dashboard
              </h2>
              <p className="mb-6">
                Track your saved events, manage your tickets, and discover new
                experiences all in one place.
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Track your upcoming events
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  View purchase history
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Manage saved events
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Get event updates and reminders
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <img src="/assets/dashboard.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Unique Savings Feature Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img src="/assets/whole browser (1).png" alt="" />
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Unique Savings Feature
              </h2>
              <p className="text-gray-600 mb-6">
                Unwind's intelligent savings system helps you get the best deals
                on events you love, automatically applying discounts and
                rewards.
              </p>
              <ul className="space-y-4 text-gray-700 mb-8">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Automatic early bird discounts
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Group booking savings
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Loyalty points and rewards
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Smart price tracking
                </li>
              </ul>
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold  transition-colors">
                Start Saving Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* For Event Organizers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            For Event Organizers
          </h2>
          <p className="mb-16 text-center">
            Create, promote, and manage successful events with ease
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Create Your Event */}
            <div className="flex flex-col items-start justify-center bg-white rounded-xl shadow-[10px_4px_20px_0px_#00000014] pt-3 pb-2 px-10">
              <div className="w-16 h-16 bg-[#F7F5FA] rounded-full flex items-center justify-center mb-6">
                <img src="/assets/add-circle.png" alt="" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Create Your Event
              </h3>
              <p className="text-gray-600">
                Set up your event in minutes with our intuitive event creation
                tool.
              </p>
            </div>

            {/* Set Up Ticketing */}
            <div className="flex flex-col items-start justify-center bg-white rounded-xl shadow-[10px_4px_20px_0px_#00000014] pt-3 pb-2 px-10">
              <div className="w-16 h-16 bg-[#F7F5FA] rounded-full flex items-center justify-center mb-6">
                <img src="/assets/ticket-star.png" alt="" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Set Up Ticketing
              </h3>
              <p className="text-gray-600">
                Configure pricing, availability, and sales channels for maximum
                reach.
              </p>
            </div>

            {/* Promote, Manage, Get Paid */}
            <div className="flex flex-col items-start justify-center bg-white rounded-xl shadow-[10px_4px_20px_0px_#00000014] pt-3 pb-2 px-10">
              <div className="w-16 h-16 bg-[#F7F5FA] rounded-full flex items-center justify-center mb-6">
                <img src="/assets/card-pos.png" alt="" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Promote, Manage, Get Paid
              </h3>
              <p className="text-gray-600 mb-4">
                Market your event, track sales, and receive payments seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Payouts Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Instant Payouts
              </h2>
              <p className="text-gray-600 mb-6">
                Get paid instantly when tickets are sold. No waiting periods, no
                delays - just instant access to your revenue.
              </p>
              <ul className="space-y-4 text-gray-700 mb-8">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Instant payouts on ticket sales
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Multiple payment methods
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Transparent fee structure
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Real-time revenue tracking
                </li>
              </ul>
            </div>
            <div className="">
              <div className="">
                <img src="/assets/organiser.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Powerful Event Management Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="">
              <img src="/assets/organiser.png" alt="" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Powerful Event Management
              </h2>
              <p className="text-gray-600 mb-6">
                Comprehensive tools to manage every aspect of your events, from
                creation to completion.
              </p>
              <ul className="space-y-4 text-gray-700 mb-8">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Real-time sales analytics
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Attendee management system
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Automated check-in process
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                    <Check className="text-white w-[20px] h-[20px]" />
                  </div>
                  Marketing and promotion tools
                </li>
              </ul>
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Start Organizing Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-20 bg-[#F7F5FA]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Platform Features
          </h2>
          <p className="text-center mb-16">
            Everything you need for successful events, all in one place
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Mobile Optimized */}
            <div className="text-center bg-white px-10 py-10 rounded-xl shadow-[10px_4px_20px_0px_#00000014]">
              <div className="w-20 h-20 bg-[#F7F5FA] rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/assets/monitor-mobbile.png" alt="" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Mobile Optimized
              </h3>
              <p className="text-gray-600">
                Fully responsive design ensures a perfect experience on any
                device, anywhere.
              </p>
            </div>

            {/* Secure Payments */}
            <div className="text-center bg-white px-10 py-10 rounded-xl shadow-[10px_4px_20px_0px_#00000014]">
              <div className="w-20 h-20 bg-[#F7F5FA] rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/assets/card-pos.png" alt="" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Bank-level security with encrypted transactions and PCI DSS
                compliance.
              </p>
            </div>

            {/* Real-time Analytics */}
            <div className="text-center bg-white px-10 py-10 rounded-xl shadow-[10px_4px_20px_0px_#00000014]">
              <div className="w-20 h-20 bg-[#F7F5FA] rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/assets/status-up.png" alt="" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Real-time Analytics
              </h3>
              <p className="text-gray-600">
                Comprehensive insights and reporting to track performance and
                optimize sales.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Fraud Protection */}
            <div className="text-center bg-white px-10 py-10 rounded-xl shadow-[10px_4px_20px_0px_#00000014]">
              <div className="w-20 h-20 bg-[#F7F5FA] rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/assets/fraud.svg" alt="" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Fraud Protection
              </h3>
              <p className="text-gray-600">
                Advanced fraud detection and prevention to protect both
                organizers and attendees.
              </p>
            </div>

            {/* QR Code Check-in */}
            <div className="text-center bg-white px-10 py-10 rounded-xl shadow-[10px_4px_20px_0px_#00000014]">
              <div className="w-20 h-20 bg-[#F7F5FA] rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/assets/category.png" alt="" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                QR Code Check-in
              </h3>
              <p className="text-gray-600">
                Fast, contactless entry with secure QR codes for smooth event
                experiences.
              </p>
            </div>

            {/* 24/7 Support */}
            <div className="text-center bg-white px-10 py-10 rounded-xl shadow-[10px_4px_20px_0px_#00000014]">
              <div className="w-20 h-20 bg-[#F7F5FA] rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/assets/message-question.png" alt="" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Round-the-clock customer support to help you succeed every step
                of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Get Started CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of event organizers and attendees who trust Unwind
            for their ticketing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Create Your Event
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Find Events
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorksPage;
