import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Bookmark, Ticket, Wallet, HelpCircle } from "lucide-react";

function AttendeeSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
    { id: "saved-events", label: "Saved Events", icon: Bookmark, path: "/dashboard/saved-events" },
    { id: "my-tickets", label: "My Tickets", icon: Ticket, path: "/dashboard/my-tickets" },
    { id: "wallet", label: "My Wallet", icon: Wallet, path: "/dashboard/wallet" },
    { id: "support", label: "Help & Support", icon: HelpCircle, path: "/dashboard/support" },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <img src="/assets/logo.png" alt="Unwind" className="h-8" />
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl
                transition-colors text-left
                ${
                  isActive(item.path)
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Featured Event Card */}
      <div className="m-4 p-4 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl text-white">
        <h3 className="font-bold mb-1">Designers Hangout</h3>
        <p className="text-sm text-purple-100 mb-3">May 29, 2025</p>
        <button className="w-full bg-white text-purple-600 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
          View Ticket
        </button>
      </div>
    </div>
  );
}

export default AttendeeSidebar;