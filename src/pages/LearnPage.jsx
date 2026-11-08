import { useState } from "react";
import useVocabulary from "../data/vocab/useVocabulary.js";
import { C } from "../theme.js";
import LevelTabs from "../components/LevelTabs.jsx";
import Pagination, { PAGE_SIZE } from "../components/Pagination.jsx";
import SpeakButton from "../components/SpeakButton.jsx";

export default function LearnPage({ level, setLevel, rate }) {
  const [page, setPage] = useState(1);
  const { words, error } = useVocabulary(level);
  const start = (page - 1) * PAGE_SIZE;

  function selectLevel(nextLevel) {
    setLevel(nextLevel);
    setPage(1);
  }

  return (
    <div>
      <LevelTabs level={level} setLevel={selectLevel} />
      <div role="status" className="text-xs mt-3 mb-1" style={{ color: C.inkSoft }}>
        {words ? `共 ${words.length} 個單字` : error ? "無法載入單字，請重新整理頁面。" : "正在載入單字…"}
      </div>
      <Pagination count={words?.length ?? 0} page={page} setPage={setPage} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {words?.slice(start, start + PAGE_SIZE).map((w) => (
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
