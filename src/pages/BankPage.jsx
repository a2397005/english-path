import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { LEVELS } from "../data/vocab/index.js";
import useVocabulary from "../data/vocab/useVocabulary.js";
import { C } from "../theme.js";
import Pagination, { PAGE_SIZE } from "../components/Pagination.jsx";
import SpeakButton from "../components/SpeakButton.jsx";

export default function BankPage({ rate }) {
  const [query, setQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");

  const [page, setPage] = useState(1);
  const { words, error } = useVocabulary("all");
  const search = query.trim();
  const start = (page - 1) * PAGE_SIZE;

  const filtered = useMemo(() => {
    const englishSearch = search.toLowerCase();
    return words?.filter((w) =>
      (filterLevel === "all" || w.levelId === filterLevel) &&
      (w.word.toLowerCase().includes(englishSearch) || w.meaning.includes(search))
    ) ?? [];
  }, [words, filterLevel, search]);

  function selectLevel(level) {
    setFilterLevel(level);
    setPage(1);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 rounded-full px-4 py-2" style={{ backgroundColor: C.card, boxShadow: "0 1px 3px rgba(22,33,62,0.08)" }}>
          <Search size={18} style={{ color: C.inkSoft }} />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="搜尋英文單字或中文意思…"
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: C.ink }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => selectLevel("all")}
            className="px-3 py-2 rounded-full text-xs sm:text-sm font-semibold"
            style={{ backgroundColor: filterLevel === "all" ? C.navy : C.card, color: filterLevel === "all" ? "#fff" : C.inkSoft }}
          >
            全部
          </button>
          {LEVELS.map((lv) => (
            <button
              key={lv.id}
              onClick={() => selectLevel(lv.id)}
              className="px-3 py-2 rounded-full text-xs sm:text-sm font-semibold"
              style={{ backgroundColor: filterLevel === lv.id ? C.navy : C.card, color: filterLevel === lv.id ? "#fff" : C.inkSoft }}
            >
              {lv.label}
            </button>
          ))}
        </div>
      </div>

      <div role="status" className="text-xs mt-3" style={{ color: C.inkSoft }}>
        {words
          ? `共 ${filtered.length} 筆結果（詞庫總計 ${words.length} 個單字）`
          : error ? "無法載入詞庫，請重新整理頁面。" : "正在載入詞庫…"}
      </div>
      <Pagination count={filtered.length} page={page} setPage={setPage} />

      {words && <div className="mt-3 rounded-2xl overflow-hidden" style={{ backgroundColor: C.card, boxShadow: "0 1px 3px rgba(22,33,62,0.08)" }}>
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-sm" style={{ color: C.inkSoft }}>
            找不到符合的單字，換個關鍵字試試看。
          </div>
        ) : (
          filtered.slice(start, start + PAGE_SIZE).map((w, idx) => (
            <div key={`${w.levelId}:${w.word}`} className="flex items-center gap-4 px-5 py-4" style={{ borderTop: idx === 0 ? "none" : "1px solid #EEF1F5" }}>
              <SpeakButton text={w.word} rate={rate} />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold" style={{ color: C.ink, fontFamily: "'Fredoka', sans-serif" }}>{w.word}</span>
                  <span className="text-xs" style={{ color: C.inkSoft, fontFamily: "'JetBrains Mono', monospace" }}>/{w.phon}/</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: C.yellowSoft, color: C.navy }}>{w.levelLabel}</span>
                </div>
                <div className="text-sm" style={{ color: C.teal }}>{w.meaning}</div>
              </div>
            </div>
          ))
        )}
      </div>}
    </div>
  );
}
