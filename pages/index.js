import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkVerification = () => {
      const lastVerified = localStorage.getItem("verified_time");
      if (lastVerified) {
        const currentTime = new Date().getTime();
        const expiryTime = 5 * 60 * 1000; // 5 minutes
        if (currentTime - lastVerified < expiryTime) {
          setVerified(true);
        } else {
          localStorage.removeItem("verified_time"); // Expired, remove it
          setVerified(false);
        }
      }
    };

    checkVerification();
    const interval = setInterval(checkVerification, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      <button onClick={() => router.push("/verify")}>Verify</button>
      <button 
        onClick={() => router.push("/index1")} 
        disabled={!verified}
      >
        Visit
      </button>
    </div>
  );
}
