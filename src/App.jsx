import { Routes, Route } from "react-router-dom";
import WebsiteLayout from "./Pages/Website/WebsiteLayout";
import LandingPage from "./Pages/Website/LandingPage";
import DiscoverEventsPage from "./Pages/Website/DiscoverEventsPage";
import EventDetails from "./Pages/Website/EventDetails";
import Checkout from "./Components/Website/Checkout";
import BlogPage from "./Pages/Website/Blog";
import BlogPost from "./Components/Website/BlogPost";
import ContactUs from "./Pages/Website/ContactUs";
import Pricing from "./Pages/Website/Pricing";
import HowItWorksPage from "./Pages/Website/HowItWorksPage";
import SignIn from "./Components/App/Auth/SignIn";
import ForgotPassword from "./Components/App/Auth/ForgotPassword";
import SignUp from "./Components/App/Auth/SignUp/SignUp";
import VerificationSuccess from "./Components/App/Auth/Attendee/VerificationSuccess";
import VerifyEmailPage from "./Components/App/Auth/SignUp/VerifyEmail";
import ResetPassword from "./Components/App/Auth/ResetPassword";
import DashboardLayout from "./Components/App/Dashboard/DashboardLayout";
import AttendeeDashboard from "./Components/App/Dashboard/Attendee/Components/AttendeeDashboard";
import OrganizerDashboard from "./Components/App/Dashboard/Organizer/Components/OrganizerDashboard";
import DashboardEventDetails from "./Components/App/Dashboard/Attendee/Components/DashboardEventDetails";
import { useSelector } from "react-redux";
import SavedEvents from "./Components/App/Dashboard/Attendee/Components/SavedEvents";
import MyTickets from "./Components/App/Dashboard/Attendee/Components/MyTickets";
import Support from "./Components/App/Dashboard/Attendee/Components/Support";
import Notifications from "./Components/App/Dashboard/Attendee/Components/Notifications";

function App() {
  const userData = useSelector((state) => state.user?.currentUser?.user);
  console.log(userData);
  const userType = userData?.userType;

  return (
    <div>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/verification-successful"
          element={<VerificationSuccess />}
        />

        {/* Dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout userType={userType}>
              {userType === "attendee" ? (
                <AttendeeDashboard />
              ) : (
                <OrganizerDashboard />
              )}
            </DashboardLayout>
          }
        />

        {/* Dashboard Event Details Route */}
        <Route
          path="/dashboard/event/:id"
          element={
            <DashboardLayout userType={userType}>
              <DashboardEventDetails />
            </DashboardLayout>
          }
        />

        <Route
          path="/dashboard/saved-events"
          element={
            <DashboardLayout userType={userType}>
              <SavedEvents />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/my-tickets"
          element={
            <DashboardLayout userType={userType}>
              <MyTickets />
            </DashboardLayout>
          }
        />

        <Route
          path="/dashboard/support"
          element={
            <DashboardLayout userType={userType}>
              <Support />
            </DashboardLayout>
          }
        />

        <Route
          path="/dashboard/notifications"
          element={
            <DashboardLayout userType={userType}>
              <Notifications />
            </DashboardLayout>
          }
        />

        {/* Website routes with common layout */}
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="discover-events" element={<DiscoverEventsPage />} />
          <Route path="discover-events/:id" element={<EventDetails />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="Contact-us" element={<ContactUs />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
