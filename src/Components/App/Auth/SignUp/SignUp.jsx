import React, { useState } from "react";
import SignUpStart from "./SignUpStart";

// Attendee Components
import CreateAccount from "../Attendee/CreateAccount";
import VerifyEmail from "../Attendee/VerifyEmail";
import Preference from "../Attendee/Preference";

// Organizer Components
import OrganizerSignup from "../Organizer/OrganizerSignup";

function SignUp() {
  const [currentStep, setCurrentStep] = useState("start");
  const [userType, setUserType] = useState(null);
  const [email, setEmail] = useState("");

  const handleContinueFromStart = (selectedPath) => {
    setUserType(selectedPath);
    if (selectedPath === "attendee") {
      setCurrentStep("createAccount");
    } else if (selectedPath === "organizer") {
      setCurrentStep("organizerCreateAccount"); // This should match below
    }
  };

  const handleBackToStart = () => {
    setCurrentStep("start");
    setUserType(null);
  };

  return (
    <div>
      {/* Start Screen */}
      {currentStep === "start" && (
        <SignUpStart onContinue={handleContinueFromStart} />
      )}

      {/* ATTENDEE FLOW */}
      {currentStep === "createAccount" && userType === "attendee" && (
        <CreateAccount
          onBack={handleBackToStart}
          userType={userType}
          setCurrentStep={setCurrentStep}
          email={email}
          setEmail={setEmail}
        />
      )}
      {currentStep === "verifyEmail" && userType === "attendee" && (
        <VerifyEmail
          onBack={handleBackToStart}
          userType={userType}
          setCurrentStep={setCurrentStep}
          email={email}
        />
      )}
      {currentStep === "preferences" && userType === "attendee" && (
        <Preference onBack={handleBackToStart} userType={userType} />
      )}

      {/* ORGANIZER FLOW */}
      {currentStep === "organizerCreateAccount" && userType === "organizer" && (
        <OrganizerSignup
          onBack={handleBackToStart}
          setCurrentStep={setCurrentStep}
          email={email}
          setEmail={setEmail}
        />
      )}
      {currentStep === "verifyEmail" && userType === "organizer" && (
        <VerifyEmail
          onBack={handleBackToStart}
          userType={userType}
          setCurrentStep={setCurrentStep}
          email={email}
        />
      )}
    </div>
  );
}

export default SignUp;
