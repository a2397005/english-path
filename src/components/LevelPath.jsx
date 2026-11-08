import { LEVELS } from "../data/vocab/index.js";
import { C } from "../theme.js";

export default function LevelPath({ current, onSelect }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-3 py-6 max-w-3xl mx-auto">
      {LEVELS.map((lv) => (
        <button key={lv.id} onClick={() => onSelect(lv.id)} className="flex flex-col items-center gap-2 group">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-4 transition-transform group-hover:scale-105"
            style={{
              backgroundColor: current === lv.id ? C.yellow : C.card,
              borderColor: current === lv.id ? C.yellow : C.navyLight,
              color: current === lv.id ? C.navy : C.inkSoft,
            }}
          >
            {lv.step}
          </div>
          <div className="text-center leading-tight">
            <div className="font-bold text-sm" style={{ color: C.ink }}>{lv.label}</div>
            <div className="text-[11px]" style={{ color: C.inkSoft }}>{lv.cefr}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
