import React, { useState } from 'react';
import { ArrowLeft, Users, User, Eye, EyeOff } from 'lucide-react';

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
              <img 
                src="/assets/logo.png" 
                alt="Unwind" 
                className=""
              />
            </div>
          </div>

          {/* Header */}
          <div className="mb-3">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Let's get started</h1>
            <p className="text-gray-600 mb-5">Tell us who you are to tailor your experience.</p>
          </div>

          {/* User Type Selection */}
          <div className="space-y-4 mb-8 flex flex-col md:flex-row gap-4">
            {/* Attendee Option */}
            <button
              onClick={() => setSelectedPath('attendee')}
              className={`w-full h-[200px] md:h-[300px] p-6 rounded-2xl border-2 transition-all ${
                selectedPath === 'attendee'
                  ? 'border-primary bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                  selectedPath === 'attendee' ? 'bg-primary' : 'bg-gray-300'
                }`}>
                  <Users className={`w-6 h-6 ${
                    selectedPath === 'attendee' ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Join as an Attendee</h3>
                <p className="text-gray-600 text-sm">Discover, buy tickets, and enjoy amazing events.</p>
              </div>
            </button>

            {/* Organizer Option */}
            <button
              onClick={() => setSelectedPath('organizer')}
              className={`w-full h-[200px] md:h-[300px] p-6 rounded-2xl border-2 transition-all ${
                selectedPath === 'organizer'
                  ? 'border-primary bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                  selectedPath === 'organizer' ? 'bg-primary' : 'bg-gray-300'
                }`}>
                  <User className={`w-6 h-6 ${
                    selectedPath === 'organizer' ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Join as an Organizer</h3>
                <p className="text-gray-600 text-sm">Create events, manage tickets, and grow your audience.</p>
              </div>
            </button>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedPath}
            className={`w-full py-4 rounded-2xl font-semibold transition-all ${
              selectedPath
                ? 'bg-primary text-white hover:bg-purple-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateAccount({ onBack, userType }) {
  const [email, setEmail] = useState('janedoe@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    console.log('Creating account with:', { email, password, userType });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <div className="flex items-center p-4 text-white">
            <button onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>

          {/* Logo */}
          <div className="px-6 mb-8">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <div className="w-5 h-5 bg-purple-600 rounded-sm"></div>
              </div>
              <span className="text-white text-2xl font-bold">nwind</span>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 bg-white rounded-t-3xl p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600 mb-8">Start exploring unforgettable experiences today.</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="janedoe@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                    placeholder="8+ characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              >
                Create Your Account
              </button>
            </div>

            <p className="text-center text-gray-600 mt-8">
              Already have an account?{' '}
              <button className="text-purple-600 font-medium hover:underline">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Side - Hero Section */}
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800"></div>
          <div className="absolute top-6 left-6">
            <button onClick={onBack} className="flex items-center gap-2 text-white">
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center items-center h-full p-12">
            <div className="max-w-md mx-auto text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8">
                <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                  Your Pass to Every Unforgettable Experience
                </h2>
                <div className="flex justify-center mb-6">
                  <div className="w-48 h-48 bg-gradient-to-br from-purple-300 to-purple-500 rounded-2xl flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-20 h-20 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-600 rounded-md flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-sm"></div>
                    </div>
                    <span className="text-white text-sm">Experiences</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-600 rounded-md flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-sm"></div>
                    </div>
                    <span className="text-white text-sm">Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 bg-white flex flex-col justify-center p-12">
          <div className="max-w-md mx-auto w-full">
            <div className="flex items-center gap-2 mb-12">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <span className="text-purple-600 text-3xl font-bold">nwind</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">Create Account</h1>
            <p className="text-gray-600 mb-10">Start exploring unforgettable experiences today.</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="janedoe@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg pr-14"
                    placeholder="8+ characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg pr-14"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-purple-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors mt-8"
              >
                Create Your Account
              </button>
            </div>

            <p className="text-center text-gray-600 mt-8 text-lg">
              Already have an account?{' '}
              <button className="text-purple-600 font-medium hover:underline">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignUp() {
  const [currentStep, setCurrentStep] = useState('start');
  const [userType, setUserType] = useState(null);

  const handleContinueFromStart = (selectedPath) => {
    setUserType(selectedPath);
    if (selectedPath === 'attendee') {
      setCurrentStep('createAccount');
    } else {
      // Handle organizer flow - you can add organizer-specific steps here
      console.log('Organizer flow not implemented yet');
    }
  };

  const handleBackToStart = () => {
    setCurrentStep('start');
    setUserType(null);
  };

  return (
    <div>
      {currentStep === 'start' && (
        <SignUpStart onContinue={handleContinueFromStart} />
      )}
      {currentStep === 'createAccount' && (
        <CreateAccount onBack={handleBackToStart} userType={userType} />
      )}
    </div>
  );
}

export default SignUp;