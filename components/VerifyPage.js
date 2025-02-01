import { useState } from "react";
import { FcApproval } from "react-icons/fc";
import styles from "./VerifyPage.module.css"; // Optional: Add your CSS for styling

export default function VerifyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerification = () => {
    setIsVerifying(true);
    setErrorMessage("");

    // Custom URL Scheme to open your app (for both iOS and Android)
    const appLink = "myapp://verification"; // Replace with your app's deep link URL scheme
    const fallbackUrl = "https://injured-harriet-cinema-talkies-87f4a1d2.koyeb.app//verification"; // Fallback URL (could be a web page or app store URL)

    // Try opening the app (deep link)
    window.location = appLink;

    // Fallback logic: if the app is not installed, wait a bit, then redirect to fallback URL
    setTimeout(() => {
      window.location = fallbackUrl;
    }, 2000); // 2-second delay before fallback (adjust based on your needs)
  };

  return (
    <div className={styles.verificationContainer}>
      <div className={styles.verificationBox}>
        <h2>Verify Your Access</h2>
        <p>Click the button below to verify yourself and gain access.</p>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <button onClick={handleVerification} disabled={isVerifying} className={styles.verifyButton}>
          <FcApproval className={styles.icon1} />
          {isVerifying ? "Verifying..." : "Verify Now"}
        </button>

        <p>After verification, you will be redirected back automatically.</p>
      </div>
    </div>
  );
}
