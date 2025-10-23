import React, { useState } from "react";
import { createPortal } from "react-dom";

interface WordProps {
  word: string;
  definition?: string;
  pronunciation?: string;
}

export const Word: React.FC<WordProps> = ({
  word,
  definition = "示例释义",
  pronunciation = "/ˈwɜːd/",
}) => {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // 点击播放发音
  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
  };

  // 鼠标进入时计算位置
  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPos({ x: rect.left + rect.width / 2, y: rect.top });
    setShow(true);
  };

  // tooltip
  const tooltip = show
    ? createPortal(
      <div
        style={{
          position: "fixed",
          top: pos.y - 45,
          left: pos.x,
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.9)", // 永远黑底
          color: "#fff", // 永远白字
          padding: "6px 10px",
          borderRadius: "8px",
          fontSize: "0.85em",
          zIndex: 9999,
          whiteSpace: "nowrap",
          boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        {definition} ({pronunciation})
      </div>,
      document.body
    )
    : null;

  return (
    <>
      <span
        style={{
          cursor: "pointer",
          margin: "0 2px",
          transition: "color 0.2s",
          color: show ? "#1e90ff" : "inherit", // 悬停变蓝
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShow(false)}
        onClick={playAudio}
      >
        {word}
      </span>
      {tooltip}
    </>
  );
};
