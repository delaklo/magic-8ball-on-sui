import React from "react";

export default function MagicBall({ answer, isShaking, onClick }) {
  return (
    <div
      className={`magic-ball ${isShaking ? "shaking" : ""}`}
      onClick={onClick}
    >
      <div className="ball-window">{answer}</div>
    </div>
  );
}
