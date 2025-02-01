import { useState } from "react";
import Modal from "react-modal";
import { FcApproval } from "react-icons/fc";

Modal.setAppElement("#__next"); // Required for accessibility in Next.js

export default function VerifyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationUrl, setVerificationUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVerification = async () => {
    setIsVerifying(true);
    setErrorMessage("");

    const apiToken = "e5bf7301b4ad442d45481de99fd656a182ec6507";
    const callbackUrl = "https://injured-harriet-cinema-talkies-87f4a1d2.koyeb.app/verification/";
    const apiUrl = `https://api.gplinks.com/api?api=${apiToken}&url=${encodeURIComponent(callbackUrl)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const result = await response.json();

      if (result.status === "success" && result.shortenedUrl) {
        setVerificationUrl(result.shortenedUrl);
        setIsModalOpen(true); // Open modal
      } else {
        throw new Error(result.message || "Verification failed.");
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred.");
      setIsVerifying(false);
    }
  };

  return (
    <div className="verificationContainer">
      <div className="verificationBox">
        <h2>Verify Your Access</h2>
        <p>Click the button below to verify yourself and gain access.</p>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <button onClick={handleVerification} disabled={isVerifying} className="verifyButton">
          <FcApproval className="icon1" />
          {isVerifying ? "Verifying..." : "Verify Now"}
        </button>

        {/* Modal for GPLinks Verification */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modalContent">
            <h2>Complete Verification</h2>
            {verificationUrl ? (
              <iframe
                src={verificationUrl}
                width="100%"
                height="500px"
                style={{ border: "none" }}
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            ) : (
              <p>Loading verification...</p>
            )}
            <button onClick={() => setIsModalOpen(false)} className="closeButton">
              Close
            </button>
          </div>
        </Modal>

        <p>After verification, you will be redirected back automatically.</p>
      </div>
    </div>
  );
}
