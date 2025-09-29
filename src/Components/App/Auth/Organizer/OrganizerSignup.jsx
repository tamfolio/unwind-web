import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Upload } from "lucide-react";
import { publicRequest } from "../../../../requestMethod";
import { toast } from "react-toastify";

function OrganizerSignup({ onBack, setCurrentStep, email, setEmail }) {
  const [currentOrgStep, setCurrentOrgStep] = useState("createAccount");
  const [formData, setFormData] = useState({
    fullName: "",
    email: email || "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    registrationNumber: "",
    nin: "",
    cacDocument: null,
    utilityBill: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validate Step 1 (Create Account)
  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 2 (Business Info)
  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = "Registration number is required";
    }

    if (!formData.nin.trim()) {
      newErrors.nin = "NIN is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle file uploads
  const handleFileUpload = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, [field]: file });
    }
  };

  // Step 1: Create Account
  const handleCreateAccountSubmit = (e) => {
    e.preventDefault();
    if (!validateStep1()) {
      return;
    }
    setEmail(formData.email);
    setCurrentOrgStep("businessInfo");
  };

  // Step 2: Business Information
  const handleBusinessInfoSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData object for multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append("businessName", formData.businessName.trim());
      formDataToSend.append("registrationNumber", formData.registrationNumber.trim());
      formDataToSend.append("nin", formData.nin.trim());
      formDataToSend.append("email", formData.email.trim());
      formDataToSend.append("password", formData.password);
      
      // Add optional files if they exist
      if (formData.cacDocument) {
        formDataToSend.append("cacDocument", formData.cacDocument);
      }
      if (formData.utilityBill) {
        formDataToSend.append("utilityBill", formData.utilityBill);
      }

      console.log("Registering organizer with business:", formData.businessName);

      const response = await publicRequest.post('/auth/register/organizer', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Registration response:", response.data);

      toast.success("Account created successfully!");
      setCurrentStep("verifyEmail");

    } catch (error) {
      console.error("Registration error:", error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 400) {
        toast.error("Invalid registration data. Please check your information.");
      } else if (error.response?.status === 409) {
        toast.error("An account with this email already exists.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    console.log("Navigate to sign in");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <div className="flex items-center p-4 text-gray-900">
            <button onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>

          {/* Logo */}
          <div className="px-6 mb-8">
            <div className="flex items-center gap-1">
              <img src="/assets/logo.png" alt="" />
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 bg-white rounded-t-3xl p-6">
            <h1 className="text-2xl text-center font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 mb-8">
              Start creating unforgettable experiences today.
            </p>

            {/* Step 1: Create Account */}
            {currentOrgStep === "createAccount" && (
              <form onSubmit={handleCreateAccountSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="janedoe@gmail.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    placeholder="0123456789"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="6+ characters"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  Continue
                </button>

                <p className="text-center text-gray-600">
                  Already have an account?{" "}
                  <button 
                    onClick={handleSignIn}
                    type="button"
                    className="text-purple-600 font-medium hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            )}

            {/* Step 2: Business Information */}
            {currentOrgStep === "businessInfo" && (
              <form onSubmit={handleBusinessInfoSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.businessName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationNumber: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.registrationNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.registrationNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.registrationNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIN (National Identification Number)
                  </label>
                  <input
                    type="text"
                    value={formData.nin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nin: e.target.value,
                      })
                    }
                    placeholder="Enter your NIN"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.nin ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.nin && (
                    <p className="text-red-500 text-xs mt-1">{errors.nin}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload CAC Document (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.cacDocument?.name || ""}
                      placeholder="Upload"
                      readOnly
                      className="flex-1 px-4 py-3 border rounded-lg border-gray-300 bg-white text-gray-500"
                    />
                    <label className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <Upload className="w-5 h-5 text-gray-400" />
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload("cacDocument", e)}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Utility Bill (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.utilityBill?.name || ""}
                      placeholder="Upload"
                      readOnly
                      className="flex-1 px-4 py-3 border rounded-lg border-gray-300 bg-white text-gray-500"
                    />
                    <label className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <Upload className="w-5 h-5 text-gray-400" />
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload("utilityBill", e)}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating Account..." : "Create Your Account"}
                </button>

                <p className="text-center text-gray-600">
                  Already have an account?{" "}
                  <button 
                    onClick={handleSignIn}
                    type="button"
                    className="text-purple-600 font-medium hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        <div className="w-full flex flex-col">
          {/* Back button */}
          <div className="absolute top-6 left-6">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-900 hover:text-gray-700"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>

          {/* Centered Form */}
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="max-w-md w-full">
              <div className="flex justify-center items-center gap-2 mb-12">
                <img src="/assets/logo.png" alt="" />
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">
                Create Account
              </h1>
              <p className="text-gray-600 mb-10 text-center">
                Start creating unforgettable experiences today.
              </p>

              {/* Step 1: Create Account */}
              {currentOrgStep === "createAccount" && (
                <form onSubmit={handleCreateAccountSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="janedoe@gmail.com"
                      className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                      }
                      placeholder="0123456789"
                      className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg ${
                        errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        placeholder="6+ characters"
                        className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg pr-14 ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg pr-14 ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={22} />
                        ) : (
                          <Eye size={22} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors mt-8"
                  >
                    Continue
                  </button>

                  <p className="text-center text-gray-600 text-lg">
                    Already have an account?{" "}
                    <button 
                      onClick={handleSignIn}
                      type="button"
                      className="text-purple-600 font-medium hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                </form>
              )}

              {/* Step 2: Business Information */}
              {currentOrgStep === "businessInfo" && (
                <form onSubmit={handleBusinessInfoSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({ ...formData, businessName: e.target.value })
                      }
                      className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg ${
                        errors.businessName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.businessName && (
                      <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registration Number
                    </label>
                    <input
                      type="text"
                      value={formData.registrationNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          registrationNumber: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg ${
                        errors.registrationNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.registrationNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.registrationNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NIN (National Identification Number)
                    </label>
                    <input
                      type="text"
                      value={formData.nin}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nin: e.target.value,
                        })
                      }
                      placeholder="Enter your NIN"
                      className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg ${
                        errors.nin ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.nin && (
                      <p className="text-red-500 text-xs mt-1">{errors.nin}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload CAC Document (Optional)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.cacDocument?.name || ""}
                        placeholder="Upload"
                        readOnly
                        className="flex-1 px-4 py-4 border rounded-xl border-gray-300 bg-white text-gray-500 text-lg"
                      />
                      <label className="w-14 h-14 rounded-xl border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <Upload className="w-5 h-5 text-gray-400" />
                        <input
                          type="file"
                          onChange={(e) => handleFileUpload("cacDocument", e)}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Utility Bill (Optional)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.utilityBill?.name || ""}
                        placeholder="Upload"
                        readOnly
                        className="flex-1 px-4 py-4 border rounded-xl border-gray-300 bg-white text-gray-500 text-lg"
                      />
                      <label className="w-14 h-14 rounded-xl border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <Upload className="w-5 h-5 text-gray-400" />
                        <input
                          type="file"
                          onChange={(e) => handleFileUpload("utilityBill", e)}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Creating Account..." : "Create Your Account"}
                  </button>

                  <p className="text-center text-gray-600 text-lg">
                    Already have an account?{" "}
                    <button 
                      onClick={handleSignIn}
                      type="button"
                      className="text-purple-600 font-medium hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizerSignup;