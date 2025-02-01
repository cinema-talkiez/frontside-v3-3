import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getVerificationTime, clearVerification } from "@/utils/db";

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkVerification = async () => {
      const verifiedTime = await getVerificationTime();
      if (verifiedTime) {
        const timeDiff = Date.now() - verifiedTime;
        if (timeDiff <= 5 * 60 * 1000) { // If verified within 5 minutes
          setIsVerified(true);
        } else {
          await clearVerification(); // Clear expired verification
        }
      }
    };

    checkVerification();
  }, []);

  return (
    <div>
      <button onClick={() => router.push("/verify")}>Verify</button>

      <button 
        onClick={() => router.push("/index1")}
        disabled={!isVerified} // Disable if not verified
      >
        Visit
      </button>
    </div>
  );
}
