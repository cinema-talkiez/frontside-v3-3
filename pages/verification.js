import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Verification() {
  const router = useRouter();

  useEffect(() => {
    // Store verification time in localStorage
    localStorage.setItem("verified_at", Date.now().toString());

    // Redirect back to home page
    router.push("/");
  }, [router]);

  return <h1>Verification Successful! Redirecting...</h1>;
}
