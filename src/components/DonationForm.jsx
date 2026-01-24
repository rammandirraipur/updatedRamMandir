import React, { useState } from "react";
import "./DonationForm.css";
import { useAuth } from "../AuthContext";

const DonationForm = () => {
  const { user } = useAuth();
  const upiID = "shree90099@barodampay";
  const [copied, setCopied] = useState(false);

  if (!user) return null; // 🔒 hide if not logged in

  const handleCopy = () => {
    navigator.clipboard.writeText(upiID)
      .then(() => setCopied(true))
      .catch((err) => console.error("Failed to copy!", err));

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="donation-wrapper" id="donation">
      <h2 className="donation-title">Bank Details for Donations</h2>

      <div className="donation-card">
        <div className="bank-logo">
          <img src="../Assets/banklogo.png" alt="Bank Logo" />
        </div>

        <div className="content-row">
          <div className="qr-column">
            <p className="qr-heading">Scan & Pay</p>
            <img src="../Assets/QRCode.jpeg" alt="QR Code" className="qr-image" />
          </div>

          <div className="details-column">
            <h3 className="bank-title">Shri Ram Mandir Raipur</h3>

            <div className="details-list">
              <p>
                <span>UPI ID: </span>{upiID}{" "}
                <button onClick={handleCopy} className="copy-button">
                  {copied ? "Copied ✅" : "Copy"}
                </button>
              </p>
              <p><span>Account Name: </span>Shri Ram Mandir Nirman Samiti</p>
              <p><span>Account Number: </span>39170200000079</p>
              <p><span>IFSC Code: </span>BARB0AVANTI</p>
              <p><span>Branch: </span>Avanti Vihar, Raipur</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
