import React, { useState } from "react";
import TopNavigation from "./TopNavigation";
import AttendeeSidebar from "./AttendeeSidebar";
import OrganizerSidebar from "./OrganizerSidebar";
import BottomNavigation from "./BottomNavigation";

function DashboardLayout({ children, userType = "attendees" }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop Only */}
      <aside
        className={`
          hidden lg:block lg:sticky top-0 left-0 h-screen
          w-64 bg-white border-r border-gray-200
        `}
      >
        {userType === "attendee" ? (
          <AttendeeSidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        ) : (
          <OrganizerSidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen pb-16 lg:pb-0">
        <TopNavigation userType={userType} />
        
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation 
        userType={userType} 
        activeItem={activeItem} 
        setActiveItem={setActiveItem}
      />
    </div>
  );
}

export default DashboardLayout;