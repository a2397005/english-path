import { BookOpen, Library, ClipboardCheck, ChevronRight } from "lucide-react";
import { C } from "../theme.js";
import LevelPath from "../components/LevelPath.jsx";

export default function HomePage({ onNavigate, level, setLevel }) {
  return (
    <div>
      <div className="rounded-2xl px-6 py-10 sm:py-14 text-center" style={{ backgroundColor: C.navy }}>
        <p className="text-sm tracking-widest uppercase mb-3" style={{ color: C.yellow, fontFamily: "'JetBrains Mono', monospace" }}>
          English Path · 英語階梯
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Fredoka', sans-serif" }}>
          一步一步，穩紮英文基礎
        </h1>
        <p className="max-w-xl mx-auto" style={{ color: "#C9D1E0" }}>
          從國小低年級到托福，六個階段循序漸進，累積字彙、鍛鍊文法，用聽力反覆熟悉每個單字的唸法。
        </p>
        <LevelPath current={level} onSelect={setLevel} />
        <button
          onClick={() => onNavigate("learn")}
          className="mt-2 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition hover:opacity-90"
          style={{ backgroundColor: C.yellow, color: C.navy }}
        >
          開始學習 <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        {[
          { icon: BookOpen, title: "分級學習", desc: "六個階段的單字卡，附例句與中文解釋。", tab: "learn" },
          { icon: Library, title: "詞庫查詢", desc: "跨階段搜尋單字，隨點隨聽發音。", tab: "bank" },
          { icon: ClipboardCheck, title: "文法 / 單字測驗", desc: "分級測驗，立即得知對錯與詳解。", tab: "quiz" },
        ].map((card) => (
          <button
            key={card.tab}
            onClick={() => onNavigate(card.tab)}
            className="text-left rounded-2xl p-6 transition hover:-translate-y-1"
            style={{ backgroundColor: C.card, boxShadow: "0 1px 3px rgba(22,33,62,0.08)" }}
          >
            <card.icon size={26} style={{ color: C.teal }} />
            <h3 className="mt-3 font-bold text-lg" style={{ color: C.ink, fontFamily: "'Fredoka', sans-serif" }}>{card.title}</h3>
            <p className="text-sm mt-1" style={{ color: C.inkSoft }}>{card.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
