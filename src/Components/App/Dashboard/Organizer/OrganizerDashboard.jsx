import React from "react";
import DashboardLayout from "../Dashboard/DashboardLayout";

function OrganizerDashboard() {
  return (
    <DashboardLayout userType="organizer">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Organizer Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your events and track performance
        </p>

        {/* Your organizer dashboard content here */}
      </div>
    </DashboardLayout>
  );
}

export default OrganizerDashboard;