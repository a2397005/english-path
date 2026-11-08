import { Volume2 } from "lucide-react";
import { C } from "../theme.js";
import { speak } from "../utils/speech.js";

export default function SpeakButton({ text, size = 18, label, rate }) {
  return (
    <button
      onClick={() => speak(text, rate)}
      aria-label={`播放 ${text} 的發音`}
      className="inline-flex items-center gap-1 rounded-full px-2 py-1 transition hover:opacity-80 active:scale-95"
      style={{ backgroundColor: C.tealSoft, color: C.teal }}
    >
      <Volume2 size={size} />
      {label && <span className="text-xs font-medium">{label}</span>}
    </button>
  );
}
