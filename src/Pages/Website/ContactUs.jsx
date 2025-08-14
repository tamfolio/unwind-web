import React, { useState } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setShowSuccessModal(true);
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="min-h-screen min-w-full">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 min-w-3xl mx-4 relative py-20">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Message Sent Successfully
              </h3>
              <p className="text-sm text-gray-600">
                We've received your message and will get back to you shortly.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img src="/assets/Mail sent-cuate 1.png" alt="" />
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-8 bg-white">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="lg:w-1/2">
            <div className="mb-4">
              <span className="text-purple-600 text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                Let's Talk
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch with Us
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Have questions? We're here to help. Reach out to our team and
              we'll get back to you as soon as possible.
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Get In Touch
            </button>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative">
              <img
                src="/assets/contact.png"
                alt="Professional woman on phone"
                className="rounded-2xl shadow-lg w-full max-w-md mx-auto"
              />
              <div className="absolute -top-4 -left-4 w-8 h-8 text-purple-300">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 text-purple-300">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="w-full bg-[#F7F5FA] py-16">
        <div className="flex justify-center items-center w-full px-4">
          <div className="max-w-2xl w-full bg-white px-10 py-8 rounded-lg">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                <span className="text-purple-600 text-sm font-medium">
                  We want to help
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Got Questions?
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ex. JohnDoe03@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What is this about?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your inquiry"
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary  text-white font-medium py-3 rounded-lg transition-colors"
              >
                Send Your Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Email */}
            <div className="text-center p-6">
              <div className="w-[80px] h-[80px] bg-[#F7F5FA] rounded-full mx-auto mb-4 flex items-center justify-center">
                <img src="/assets/sms.svg" alt="" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 text-sm">support@unwind.com</p>
              <p className="text-gray-600 text-sm">sales@unwind.com</p>
            </div>

            {/* Phone */}
            <div className="text-center p-6">
              <div className="w-[80px] h-[80px] bg-[#F7F5FA] rounded-full mx-auto mb-4 flex items-center justify-center">
                <img src="/assets/call.svg" alt="" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600 text-sm">+234 815 706 9045</p>
              <p className="text-gray-600 text-sm">+234 902 845 1176</p>
            </div>

            {/* Office */}
            <div className="text-center p-6">
              <div className="w-[80px] h-[80px] bg-[#F7F5FA] rounded-full mx-auto mb-4 flex items-center justify-center">
                <img src="/assets/building.svg" alt="" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Office</h3>
              <p className="text-gray-600 text-sm">
                Unwind HQ, 38 Adebayo Doherty Street, Lekki
              </p>
              <p className="text-gray-600 text-sm">Phase 1, Lagos, Nigeria.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
