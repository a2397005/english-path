import { LEVELS } from "../data/vocab/index.js";
import { C } from "../theme.js";

export default function LevelTabs({ level, setLevel }) {
  return (
    <div className="flex flex-wrap gap-2">
      {LEVELS.map((lv) => (
        <button
          key={lv.id}
          onClick={() => setLevel(lv.id)}
          className="px-3 py-2 rounded-full text-xs sm:text-sm font-semibold transition"
          style={{
            backgroundColor: level === lv.id ? C.navy : C.card,
            color: level === lv.id ? "#fff" : C.inkSoft,
          }}
        >
          {lv.label} <span className="opacity-70">{lv.cefr}</span>
        </button>
      ))}
    </div>
  );
}
