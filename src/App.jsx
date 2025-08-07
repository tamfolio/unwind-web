import { Routes, Route } from "react-router-dom";
import WebsiteLayout from "./Pages/Website/WebsiteLayout";
import LandingPage from "./Pages/Website/LandingPage";
import DiscoverEventsPage from "./Pages/Website/DiscoverEventsPage";
import EventDetails from "./Pages/Website/EventDetails";
import Checkout from "./Components/Website/Checkout";
import BlogPage from "./Pages/Website/Blog";
import BlogPost from "./Components/Website/BlogPost";

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
        {/* Website routes with common layout */}
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="discover-events" element={<DiscoverEventsPage />} />
          <Route path="discover-events/:id" element={<EventDetails />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="checkout" element={<Checkout />} />
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
