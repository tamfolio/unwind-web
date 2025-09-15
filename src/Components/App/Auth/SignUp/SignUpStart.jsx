import React, { useState } from "react";
import { ArrowLeft, Users, User, Eye, EyeOff } from "lucide-react";

function SignUpStart({ onContinue }) {
  const [selectedPath, setSelectedPath] = useState(null);

  const handleContinue = () => {
    if (selectedPath) {
      console.log(`Selected path: ${selectedPath}`);
      onContinue(selectedPath);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Back Button */}
        <button className="absolute top-6 left-6 text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Main Content Card */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm w-full">
            {/* Hero Text */}

            {/* Hero Image */}
            <div className="">
              <img
                src="/assets/sign-up-image.png"
                alt="People enjoying events"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel / Mobile Full Screen */}
      <div className="flex-1 bg-gray-50 flex flex-col">
        {/* Mobile Back Button */}
        <div className="lg:hidden p-4">
          <button className="text-gray-700 flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-start px-6 mt-10 lg:px-12">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <img src="/assets/logo.png" alt="Unwind" className="" />
            </div>
          </div>

          {/* Header */}
          <div className="mb-3">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Let's get started
            </h1>
            <p className="text-gray-600 mb-5">
              Tell us who you are to tailor your experience.
            </p>
          </div>

          {/* User Type Selection */}
          <div className="space-y-4 mb-8 flex flex-col md:flex-row gap-4">
            {/* Attendee Option */}
            <button
              onClick={() => setSelectedPath("attendee")}
              className={`w-full h-[200px] md:h-[300px] p-6 rounded-2xl border-2 transition-all ${
                selectedPath === "attendee"
                  ? "border-primary bg-purple-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                    selectedPath === "attendee" ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <Users
                    className={`w-6 h-6 ${
                      selectedPath === "attendee"
                        ? "text-white"
                        : "text-gray-600"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Join as an Attendee
                </h3>
                <p className="text-gray-600 text-sm">
                  Discover, buy tickets, and enjoy amazing events.
                </p>
              </div>
            </button>

            {/* Organizer Option */}
            <button
              onClick={() => setSelectedPath("organizer")}
              className={`w-full h-[200px] md:h-[300px] p-6 rounded-2xl border-2 transition-all ${
                selectedPath === "organizer"
                  ? "border-primary bg-purple-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                    selectedPath === "organizer" ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <User
                    className={`w-6 h-6 ${
                      selectedPath === "organizer"
                        ? "text-white"
                        : "text-gray-600"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Join as an Organizer
                </h3>
                <p className="text-gray-600 text-sm">
                  Create events, manage tickets, and grow your audience.
                </p>
              </div>
            </button>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedPath}
            className={`w-full py-4 rounded-2xl font-semibold transition-all ${
              selectedPath
                ? "bg-primary text-white hover:bg-purple-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpStart



