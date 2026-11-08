import { Volume2 } from "lucide-react";
import { C } from "../theme.js";
import { speak } from "../utils/speech.js";

export default function SpeedControl({ rate, setRate }) {
  const presets = [
    { label: "慢速", value: 0.6 },
    { label: "正常", value: 0.85 },
    { label: "較快", value: 1.0 },
  ];
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs font-semibold whitespace-nowrap" style={{ color: C.inkSoft }}>語速</span>
      <input
        type="range"
        min="0.5"
        max="1.2"
        step="0.05"
        value={rate}
        onChange={(e) => setRate(parseFloat(e.target.value))}
        className="flex-1 min-w-[80px]"
      />
      <span className="text-xs w-10 text-right" style={{ color: C.inkSoft }}>{rate.toFixed(2)}x</span>
      <div className="flex gap-1">
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => setRate(p.value)}
            className="text-xs px-2 py-1 rounded-full"
            style={{
              backgroundColor: Math.abs(rate - p.value) < 0.01 ? C.navy : C.paper,
              color: Math.abs(rate - p.value) < 0.01 ? "#fff" : C.inkSoft,
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
      <button
        onClick={() => speak("This is a speed test.", rate)}
        className="text-xs px-2 py-1 rounded-full flex items-center gap-1"
        style={{ backgroundColor: C.tealSoft, color: C.teal }}
      >
        <Volume2 size={12} /> 試聽
      </button>
    </div>
  );
}
