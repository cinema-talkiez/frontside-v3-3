import { useEffect } from "react";
import { saveVerificationTime } from "@/utils/db";

export default function Verification() {
  useEffect(() => {
    saveVerificationTime(); // Save verification time in IndexedDB
    window.location.href = "/"; // Redirect back to home
  }, []);

  return <h2>Verification Successful! Redirecting...</h2>;
}
