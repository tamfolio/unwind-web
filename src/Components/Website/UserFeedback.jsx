import React from 'react';

function UserFeedback() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Event Attendee",
      rating: 5,
      testimonial: "The savings feature is a game-changer! I was able to save up for a $300 conference ticket over 3 months. The dashboard makes it so easy to track progress."
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Event Organizer",
      rating: 5,
      testimonial: "Unwind has transformed how I manage events. The analytics are incredible and instant payouts mean I don't have to wait weeks for my money."
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Music Lover",
      rating: 5,
      testimonial: "I've discovered so many amazing local events through Unwind. The personalized recommendations are spot-on and ticket buying is seamless."
    }
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex justify-center mb-6">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-6 h-6 ${
              index < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-2">
            What Our Users Say
          </h2>
          <p className="text-lg text-grey">
            Real stories from real users
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Star Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Testimonial Text */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed text-center">
                  "{testimonial.testimonial}"
                </p>
              </div>

              {/* User Info */}
              <div className="text-center  pt-6">
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-gray-500 text-sm">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserFeedback;