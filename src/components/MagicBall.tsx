interface MagicBallProps {
  answer: string;
  isShaking: boolean;
  onClick: () => void;
}

export default function MagicBall({ answer, isShaking, onClick }: MagicBallProps) {
  return (
    <div onClick={onClick} className={`magic-ball ${isShaking ? "shaking" : ""}`}>
      <div className="ball-window">{answer}</div>
    </div>
  );
}
