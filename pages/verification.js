import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function VerificationPage() {
  const [verificationStatus, setVerificationStatus] = useState("Waiting for verification...");
  const router = useRouter();

  useEffect(() => {
    const { query } = router;

    if (query.status === "success") {
      setVerificationStatus("✅ Verification successful! You can now proceed.");
    } else if (query.status === "failed") {
      setVerificationStatus("❌ Verification failed. Please try again.");
    }
  }, [router]);

  return (
    <div className="verificationPage">
      <h2>{verificationStatus}</h2>
      <button onClick={() => router.push("/dashboard")}>Go to Dashboard</button>
    </div>
  );
}
