import React, { useState } from "react";
import SignUpStart from "./SignUpStart";
import CreateAccount from "../Attendee/CreateAccount";
import VerifyEmail from "../Attendee/VerifyEmail";
import Preference from "../Attendee/Preference";

function SignUp() {
  const [currentStep, setCurrentStep] = useState("start");
  const [userType, setUserType] = useState(null);
  const [email, setEmail] = useState("")

  const handleContinueFromStart = (selectedPath) => {
    setUserType(selectedPath);
    if (selectedPath === "attendee") {
      setCurrentStep("createAccount");
    } else {
      // Handle organizer flow - you can add organizer-specific steps here
      console.log("Organizer flow not implemented yet");
    }
  };

  const handleBackToStart = () => {
    setCurrentStep("start");
    setUserType(null);
  };

  return (
    <div>
      {currentStep === "start" && (
        <SignUpStart onContinue={handleContinueFromStart} />
      )}
      {currentStep === "createAccount" && (
        <CreateAccount
          onBack={handleBackToStart}
          userType={userType}
          setCurrentStep={setCurrentStep}
          email={email}
          setEmail={setEmail}
        />
      )}
      {currentStep === "verifyEmail" && (
        <VerifyEmail onBack={handleBackToStart} userType={userType} setCurrentStep={setCurrentStep} email={email}/>
      )}
      {currentStep === "preferences" && (
        <Preference onBack={handleBackToStart} userType={userType} />
      )}
    </div>
  );
}

export default SignUp;
