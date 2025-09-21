import React, { useState } from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import ResetPasswordSuccess from './ResetPasswordSuccess';

function ResetPassword() {
  const [isResetComplete, setIsResetComplete] = useState(false);

  const handleResetSuccess = () => {
    setIsResetComplete(true);
  };

  return (
    <div className="w-full">
      {!isResetComplete ? (
        <ResetPasswordForm onResetSuccess={handleResetSuccess} />
      ) : (
        <ResetPasswordSuccess />
      )}
    </div>
  );
}

export default ResetPassword;