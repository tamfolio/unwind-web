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
import Home from "./Components/App/Dashboard/Home";
import ResetPassword from "./Components/App/Auth/ResetPassword";

// Import other pages as you create them
// import About from "./Pages/Website/About"
// import Contact from "./Pages/Website/Contact"
// import PrivacyPolicy from "./Pages/Website/PrivacyPolicy"
// import TermsOfUse from "./Pages/Website/TermsOfUse"
// import Dashboard from "./Pages/Dashboard/Dashboard"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/verify-email" element={<VerifyEmailPage/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/verification-successful" element={<VerificationSuccess/>}/>
        <Route path="/home" element={<Home/>}/>
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
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="privacy-policy" element={<PrivacyPolicy />} /> */}
          {/* <Route path="terms-of-use" element={<TermsOfUse />} /> */}
        </Route>

        {/* Dashboard routes (without website layout) */}
        {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}

        {/* Catch-all route for 404 - optional */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
