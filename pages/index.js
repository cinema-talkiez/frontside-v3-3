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

    checkVerification(); // Initial check

    // Update countdown every second
    const interval = setInterval(() => {
      checkVerification();
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  const handleVerify = () => {
    router.push("/verify"); // Redirect to verification page
  };

  const handleVisit = () => {
    if (isVerified) {
      router.push("/index1"); // Redirect to index1.js
    }
  };

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div>
      <h1>Welcome to Index Page</h1>
      <button onClick={handleVerify}>Verify</button>

      {isVerified && <p>Expires in: {formatTime(remainingTime)}</p>}

      {/* Visit Button enabled only if verified */}
      <button disabled={!isVerified} onClick={handleVisit}>
        Visit
      </button>
    </div>
  );
}
