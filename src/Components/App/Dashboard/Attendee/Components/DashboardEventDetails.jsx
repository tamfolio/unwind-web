import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventDetails from "../../../../../Pages/Website/EventDetails";


function DashboardEventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Dashboard
      </button>

      {/* Event Details Content */}
      <div className="bg-white rounded-2xl shadow-sm">
        <EventDetails />
      </div>
    </div>
  );
}

export default DashboardEventDetails;