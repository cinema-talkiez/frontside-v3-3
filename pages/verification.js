import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Verification() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("verified_at", Date.now().toString()); // Store verification time
      router.push("/"); // Redirect back to index.js
    }, 2000); // Simulate verification delay
  }, [router]);

  return <h1>Verifying... Please wait.</h1>;
}
