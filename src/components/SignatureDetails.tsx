import React from "react";

export default function SignatureDetails({
  message,
  signature,
  responseIndex,
  visible,
}) {
  if (!visible) return null;

  const shortSig = signature
    ? `${signature.slice(0, 20)}...${signature.slice(-10)}`
    : "N/A";

  return (
    <div className="signature-info">
      <strong>Signature Details:</strong>
      <br />
      <strong>Message:</strong> {message}
      <br />
      <strong>Signature:</strong> {shortSig}
      <br />
      <strong>Response Index:</strong> {responseIndex} / 20
    </div>
  );
}
