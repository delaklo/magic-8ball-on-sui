import React from 'react';

export default function StatusMessage({ message, type, visible }) {
  if (!visible) return null;
  return (
    <div className={`status ${type}`}>
      {message}
    </div>
  );
}
