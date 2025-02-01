import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const checkVerification = () => {
      const lastVerified = localStorage.getItem("verified_at");
      if (lastVerified) {
        const elapsedTime = Date.now() - parseInt(lastVerified);
        const timeLeft = 5 * 60 * 1000 - elapsedTime;

        if (timeLeft > 0) {
          setIsVerified(true);
          setRemainingTime(timeLeft);
        } else {
          setIsVerified(false);
          localStorage.removeItem("verified_at"); // Clear expired verification
        }
      }
    };

    checkVerification(); // Check on mount

    // Sync verification status every second
    const interval = setInterval(checkVerification, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    router.push("/verify"); // Redirect to verify.js (gplinks process)
  };

  const handleVisit = () => {
    if (isVerified) {
      router.push("/index1"); // Redirect to index1.js
    }
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 1000 / 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div>
      <h1>Welcome to Index Page</h1>
      <button onClick={handleVerify}>Verify</button>

      {isVerified && <p>Expires in: {formatTime(remainingTime)}</p>}

      <button disabled={!isVerified} onClick={handleVisit}>
        Visit
      </button>
    </div>
  );
}
