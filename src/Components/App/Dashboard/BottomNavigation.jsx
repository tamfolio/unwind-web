import React from "react";
import { 
  Home, 
  Bookmark, 
  Ticket, 
  Wallet, 
  HelpCircle,
  Plus,
  Calendar,
  CheckSquare
} from "lucide-react";

function BottomNavigation({ userType, activeItem, setActiveItem }) {
  const attendeeItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "saved", label: "Saved Events", icon: Bookmark },
    { id: "tickets", label: "My Tickets", icon: Ticket },
    { id: "wallet", label: "My Wallet", icon: Wallet },
    { id: "support", label: "Support", icon: HelpCircle },
  ];

  const organizerItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "create", label: "Create Events", icon: Plus },
    { id: "events", label: "My Events", icon: Calendar },
    { id: "checkin", label: "Check-in", icon: CheckSquare },
    { id: "wallet", label: "Wallet", icon: Wallet },
  ];

  const menuItems = userType === "attendee" ? attendeeItems : organizerItems;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
      <div className="flex justify-around items-center px-2 py-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1 ${
                activeItem === item.id
                  ? "text-purple-600"
                  : "text-gray-600"
              }`}
            >
              <Icon size={20} />
              <span className="text-[12px] font-medium truncate max-w-[60px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavigation;