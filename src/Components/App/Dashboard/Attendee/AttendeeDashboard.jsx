import React from "react";
import DashboardLayout from "../Dashboard/DashboardLayout";

function AttendeeDashboard() {
  return (
    <DashboardLayout userType="attendee">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Welcome back! Here's what's happening with your events.
        </p>

        {/* Your dashboard content here */}
      </div>
    </DashboardLayout>
  );
}

export default AttendeeDashboard;