import { VOCAB } from "../data/vocab/index.js";
import { C } from "../theme.js";
import LevelTabs from "../components/LevelTabs.jsx";
import SpeakButton from "../components/SpeakButton.jsx";

export default function LearnPage({ level, setLevel, rate }) {
  const words = VOCAB[level];
  return (
    <div>
      <LevelTabs level={level} setLevel={setLevel} />
      <div className="text-xs mt-3 mb-1" style={{ color: C.inkSoft }}>
        共 {words.length} 個單字
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {words.map((w) => (
          <div key={w.word} className="rounded-2xl p-5" style={{ backgroundColor: C.card, boxShadow: "0 1px 3px rgba(22,33,62,0.08)" }}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold" style={{ color: C.ink, fontFamily: "'Fredoka', sans-serif" }}>{w.word}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: C.yellowSoft, color: C.navy }}>{w.pos}</span>
                </div>
                <div className="text-xs mt-1" style={{ color: C.inkSoft, fontFamily: "'JetBrains Mono', monospace" }}>/{w.phon}/</div>
              </div>
              <SpeakButton text={w.word} rate={rate} />
            </div>
            <div className="mt-3 font-medium" style={{ color: C.teal }}>{w.meaning}</div>
            <div className="mt-2 flex items-start gap-2 text-sm" style={{ color: C.inkSoft }}>
              <span className="flex-1">{w.example}</span>
              <SpeakButton text={w.example} size={14} rate={rate} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
