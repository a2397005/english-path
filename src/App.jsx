import { useState } from "react";
import { Home, BookOpen, Library, ClipboardCheck } from "lucide-react";
import { C } from "./theme.js";
import HomePage from "./pages/HomePage.jsx";
import LearnPage from "./pages/LearnPage.jsx";
import BankPage from "./pages/BankPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import SpeedControl from "./components/SpeedControl.jsx";

const NAV = [
  { id: "home", label: "首頁", icon: Home },
  { id: "learn", label: "分級學習", icon: BookOpen },
  { id: "bank", label: "詞庫", icon: Library },
  { id: "quiz", label: "測驗", icon: ClipboardCheck },
];

export default function App() {
  const [tab, setTab] = useState("home");
  const [level, setLevel] = useState("elem1");
  const [rate, setRate] = useState(0.75);

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.paper }}>
      <header className="sticky top-0 z-10" style={{ backgroundColor: C.navy }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => setTab("home")} className="font-bold text-white text-lg" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            英語階梯
          </button>
          <nav className="flex gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition"
                style={{ backgroundColor: tab === n.id ? C.yellow : "transparent", color: tab === n.id ? C.navy : "#C9D1E0" }}
              >
                <n.icon size={16} />
                <span className="hidden sm:inline">{n.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {(tab === "learn" || tab === "bank") && (
        <div className="max-w-5xl mx-auto px-4 pt-3">
          <div className="rounded-xl px-4 py-2" style={{ backgroundColor: C.card, boxShadow: "0 1px 3px rgba(22,33,62,0.08)" }}>
            <SpeedControl rate={rate} setRate={setRate} />
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-4 py-8">
        {tab === "home" && <HomePage onNavigate={setTab} level={level} setLevel={setLevel} />}
        {tab === "learn" && <LearnPage level={level} setLevel={setLevel} rate={rate} />}
        {tab === "bank" && <BankPage rate={rate} />}
        {tab === "quiz" && <QuizPage level={level} setLevel={setLevel} rate={rate} />}
      </main>

      <footer className="text-center text-xs py-6" style={{ color: C.inkSoft }}>
        英語階梯 · 點擊喇叭圖示即可聽發音，可在「分級學習」或「詞庫」頁上方調整語速
      </footer>
    </div>
  );
}
