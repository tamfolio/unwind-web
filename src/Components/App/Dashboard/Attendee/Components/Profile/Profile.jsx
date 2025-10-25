import React, { useState } from "react";
import { Search, Bell } from "lucide-react";
import Account from "./Account";
import Security from "./Security";
import Contact from "./Contact";
import Preference from "./Preference";
import LogoutModal from "./Logout";
import DeleteAccountModal from "./DeleteAccount";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const tabs = [
    { id: "account", label: "Account", component: Account },
    { id: "security", label: "Security", component: Security },
    { id: "contact", label: "Contact", component: Contact },
    { id: "preference", label: "Preference", component: Preference },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  const handleLogout = () => {
    console.log('User logged out');
    setShowLogoutModal(false);
  };

  const handleDeleteAccount = () => {
    console.log('Account deleted');
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        className="p-6"
        style={{ backgroundColor: "var(--color-offwhite)", minHeight: "100vh" }}
      >
        {/* Header */}
        <div className="mb-6">
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--color-dark)" }}
          >
            My Profile
          </h1>
          <p style={{ color: "var(--color-grey)" }}>
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Search Bar - Mobile Only */}
        <div className="relative mb-6 md:hidden">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
            style={{ color: "var(--color-secondary)" }}
          />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-colors"
            style={{ 
              backgroundColor: "var(--color-white)",
              borderColor: "var(--color-offwhite)",
              color: "var(--color-dark)"
            }}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Bell 
              className="w-5 h-5 cursor-pointer" 
              style={{ color: "var(--color-secondary)" }}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Hidden on Mobile */}
          <div
            className="hidden lg:block lg:w-1/3 rounded-lg p-6"
            style={{ backgroundColor: "var(--color-white)" }}
          >
            {/* Profile Image */}
            <div className="text-center mb-6">
              <div
                className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-white)",
                }}
              >
                👤
              </div>
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--color-dark)" }}
              >
                Jane Doe Oghogho
              </h3>
              <p className="text-sm" style={{ color: "var(--color-grey)" }}>
                janedoe@gmail.com
              </p>
            </div>

            {/* Navigation Menu */}
            <div className="space-y-2">
              {[
                { id: "account", label: "Account Information", icon: "👤" },
                { id: "security", label: "Security", icon: "🛡️" },
                { id: "contact", label: "Contact Information", icon: "📧" },
                { id: "preference", label: "Preference", icon: "⚙️" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                    activeTab === item.id ? "font-medium" : ""
                  }`}
                  style={{
                    backgroundColor:
                      activeTab === item.id
                        ? "var(--color-offwhite)"
                        : "transparent",
                    color:
                      activeTab === item.id
                        ? "var(--color-primary)"
                        : "var(--color-grey)",
                  }}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            {/* Action Buttons - Desktop Only */}
            <div className="mt-8 space-y-3">
              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full py-2 px-4 rounded-lg border transition-colors flex items-center justify-center gap-2"
                style={{
                  borderColor: "var(--color-grey)",
                  color: "var(--color-grey)",
                }}
              >
                👋 Log Out
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "#ef4444",
                  color: "var(--color-white)",
                }}
              >
                🗑️ Delete Account
              </button>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="w-full lg:w-2/3">
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors capitalize"
                  style={{
                    backgroundColor:
                      activeTab === tab.id
                        ? "var(--color-offwhite)"
                        : "transparent",
                    color:
                      activeTab === tab.id
                        ? "var(--color-primary)"
                        : "var(--color-grey)",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Component */}
            <div>{ActiveComponent && <ActiveComponent />}</div>

            {/* Mobile Action Buttons - Below Content */}
            <div className="mt-8 space-y-3 lg:hidden">
              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full py-2 px-4 rounded-lg border transition-colors flex items-center justify-center gap-2"
                style={{
                  borderColor: "var(--color-grey)",
                  color: "var(--color-grey)",
                }}
              >
                👋 Log Out
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "#ef4444",
                  color: "var(--color-white)",
                }}
              >
                🗑️ Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />

      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />
    </>
  );
};

export default Profile;