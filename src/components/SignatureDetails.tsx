interface SignatureDetailsProps {
  message: string;
  signature: string;
  responseIndex: number | null;
  isVisible: boolean;
}

export default function SignatureDetails({
  message,
  signature,
  responseIndex,
  isVisible,
}: SignatureDetailsProps) {
  if (!isVisible) return null;

  return (
    <div className="signature-info">
      <strong>Signature Details:</strong>
      <p><strong>Message:</strong> {message}</p>
      <p><strong>Signature:</strong> {signature}</p>
      <p><strong>Response Index:</strong> {responseIndex}</p>
    </div>
  );
}
