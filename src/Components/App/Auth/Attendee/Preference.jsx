import React, { useState } from 'react';
import { 
  Briefcase, 
  Heart, 
  Plane, 
  Activity, 
  Music, 
  UtensilsCrossed,
  Gamepad2,
  Cpu,
  Film,
  Book,
  Landmark,
  Users,
  Palette,
  GraduationCap,
  Star
} from 'lucide-react';

function Preference() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { id: 'business', name: 'Business & Networking', icon: Briefcase },
    { id: 'charity', name: 'Charity & Causes', icon: Heart },
    { id: 'travel', name: 'Travel & Outdoor', icon: Plane },
    { id: 'health', name: 'Health & Wellness', icon: Activity },
    { id: 'music', name: 'Music & Concerts', icon: Music },
    { id: 'food', name: 'Food & Drink', icon: UtensilsCrossed },
    { id: 'gaming', name: 'Gaming & Esports', icon: Gamepad2 },
    { id: 'tech', name: 'Technology & Innovation', icon: Cpu },
    { id: 'film', name: 'Film & Theater', icon: Film },
    { id: 'literature', name: 'Literature & Book Clubs', icon: Book },
    { id: 'cultural', name: 'Cultural & Heritage', icon: Landmark },
    { id: 'family', name: 'Kids & Family', icon: Users },
    { id: 'art', name: 'Art & Exhibitions', icon: Palette },
    { id: 'education', name: 'Education & Workshops', icon: GraduationCap },
    { id: 'religion', name: 'Religion & Spirituality', icon: Star },
  ];

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSkip = () => {
    console.log('Skip clicked');
    // Handle skip logic
  };

  const handleContinue = () => {
    console.log('Selected categories:', selectedCategories);
    // Handle continue logic
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Purple Section with Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white rounded-3xl rotate-12"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 border-2 border-white rounded-2xl -rotate-12"></div>
          <div className="absolute top-1/2 left-20 w-16 h-16 border-2 border-white rounded-xl rotate-45"></div>
        </div>

        <div className="flex flex-col justify-center items-center text-white p-12 relative z-10">
          {/* Main Image Container */}
          <div className="mb-8 relative">
            <div className="w-80 h-96 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 flex items-center justify-center">
              {/* You can replace this with your actual image */}
              <img 
                src="/assets/preference.png" 
                alt="Event preferences" 
                className="w-full h-full object-cover rounded-3xl"
                onError={(e) => {
                  // Fallback if image doesn't load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback icon container */}
              <div className="hidden w-full h-full items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-lg font-medium">Event Ticket</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center max-w-sm">
            <h1 className="text-4xl font-bold mb-4">Tell Us What You're Into</h1>
            <p className="text-purple-100 text-lg leading-relaxed">
              Choose 3 or more categories to personalize your experience
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Category Selection */}
      <div className="flex-1 lg:w-1/2 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white text-center">
          <h1 className="text-2xl font-bold mb-2">Tell Us What You're Into</h1>
          <p className="text-purple-100">Choose 3 or more categories to personalize your experience</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-12">
          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Hi Jane!</h2>
            <p className="text-gray-600 text-lg">Help us curate events that match your taste.</p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategories.includes(category.id);
              
              return (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`
                    p-4 lg:p-6 rounded-2xl border-2 transition-all duration-200 text-left
                    ${isSelected 
                      ? 'border-purple-500 bg-purple-50 text-purple-700' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <IconComponent className={`w-6 h-6 mb-3 ${isSelected ? 'text-purple-600' : 'text-gray-500'}`} />
                  <div className="text-sm lg:text-base font-medium leading-tight">
                    {category.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              onClick={handleSkip}
              className="text-purple-600 font-medium hover:text-purple-700 transition-colors px-4 py-2"
            >
              Skip
            </button>

            <button
              onClick={handleContinue}
              disabled={selectedCategories.length < 3}
              className={`
                px-8 py-3 rounded-2xl font-medium transition-all duration-200
                ${selectedCategories.length >= 3
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Continue
            </button>
          </div>

          {/* Selection Counter */}
          {selectedCategories.length > 0 && (
            <div className="text-center mt-4 text-sm text-gray-600">
              {selectedCategories.length} categor{selectedCategories.length === 1 ? 'y' : 'ies'} selected
              {selectedCategories.length < 3 && (
                <span className="text-purple-600 ml-1">
                  (minimum 3 required)
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Preference;