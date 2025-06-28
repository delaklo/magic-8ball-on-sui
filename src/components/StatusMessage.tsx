interface StatusMessageProps {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
}

export default function StatusMessage({ message, type, isVisible }: StatusMessageProps) {
  if (!isVisible) return null;

  return (
    <div className={`status ${type}`}>
      {message}
    </div>
  );
}
