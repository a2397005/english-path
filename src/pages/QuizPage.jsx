import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, ChevronRight } from "lucide-react";
import { LEVELS } from "../data/vocab/index.js";
import useVocabulary from "../data/vocab/useVocabulary.js";
import { QUIZ } from "../data/quiz.js";
import { C } from "../theme.js";
import { generateVocabQuestions, VOCAB_QUIZ_COUNT } from "../utils/speech.js";
import LevelTabs from "../components/LevelTabs.jsx";
import SpeakButton from "../components/SpeakButton.jsx";

export default function QuizPage({ level, setLevel, rate }) {
  const { words, error } = useVocabulary(level);
  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  function start(cat) {
    const qs = cat === "vocab" ? generateVocabQuestions(words) : QUIZ[level].grammar;
    setCategory(cat);
    setQuestions(qs);
    setIdx(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
  }

  function choose(optIdx) {
    if (selected !== null) return;
    setSelected(optIdx);
    setAnswers([...answers, optIdx === questions[idx].a]);
  }

  function next() {
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function reset() {
    setCategory(null);
    setQuestions([]);
    setIdx(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
  }

  if (!category) {
    return (
      <div>
        <LevelTabs level={level} setLevel={(l) => { setLevel(l); reset(); }} />
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <button onClick={() => start("vocab")} disabled={!words} className="rounded-2xl p-6 text-left transition enabled:hover:-translate-y-1 disabled:opacity-60" style={{ backgroundColor: C.card, boxShadow: "0 1px 3px rgba(22,33,62,0.08)" }}>
            <div className="text-xs font-semibold" style={{ color: C.teal }}>VOCABULARY</div>
            <div className="text-lg font-bold mt-1" style={{ color: C.ink, fontFamily: "'Fredoka', sans-serif" }}>單字測驗</div>
            <div className="text-sm mt-1" style={{ color: C.inkSoft }}>
              {words
                ? `${Math.min(VOCAB_QUIZ_COUNT, words.length)} 題 · 從 ${words.length} 個單字中隨機出題`
                : error ? "無法載入單字，請重新整理頁面。" : "正在載入單字…"}
            </div>
          </button>
          <button onClick={() => start("grammar")} className="rounded-2xl p-6 text-left transition hover:-translate-y-1" style={{ backgroundColor: C.card, boxShadow: "0 1px 3px rgba(22,33,62,0.08)" }}>
            <div className="text-xs font-semibold" style={{ color: C.coral }}>GRAMMAR</div>
            <div className="text-lg font-bold mt-1" style={{ color: C.ink, fontFamily: "'Fredoka', sans-serif" }}>文法測驗</div>
            <div className="text-sm mt-1" style={{ color: C.inkSoft }}>{QUIZ[level].grammar.length} 題 · 測試句型與時態</div>
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const score = answers.filter(Boolean).length;
    return (
      <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: C.card, boxShadow: "0 1px 3px rgba(22,33,62,0.08)" }}>
        <div className="text-sm font-semibold" style={{ color: C.inkSoft }}>
          {LEVELS.find((l) => l.id === level).label} · {category === "vocab" ? "單字測驗" : "文法測驗"}
        </div>
        <div className="text-4xl font-bold mt-2" style={{ color: C.navy, fontFamily: "'Fredoka', sans-serif" }}>
          {score} / {questions.length}
        </div>
        <p className="mt-2 text-sm" style={{ color: C.inkSoft }}>
          {score === questions.length ? "全對！太厲害了 🎉" : score >= questions.length / 2 ? "不錯喔，再多練習幾次就更熟練了。" : "沒關係，再挑戰一次，多看幾遍單字和例句吧。"}
        </p>
        <div className="flex justify-center gap-3 mt-6">
          <button onClick={() => start(category)} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold" style={{ backgroundColor: C.yellow, color: C.navy }}>
            <RotateCcw size={16} /> 再測一次
          </button>
          <button onClick={reset} className="rounded-full px-5 py-2.5 font-semibold" style={{ backgroundColor: C.paper, color: C.inkSoft }}>
            換一個類別
          </button>
        </div>
      </div>
    );
  }

  const question = questions[idx];
  const isVocab = question.type === "vocab";

  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-3" style={{ color: C.inkSoft }}>
        <span>{LEVELS.find((l) => l.id === level).label} · {category === "vocab" ? "單字測驗" : "文法測驗"}</span>
        <span>{idx + 1} / {questions.length}</span>
      </div>
      <div className="w-full h-2 rounded-full mb-6" style={{ backgroundColor: "#E3E7EE" }}>
        <div className="h-2 rounded-full transition-all" style={{ width: `${(idx / questions.length) * 100}%`, backgroundColor: C.teal }} />
      </div>

      <div className="rounded-2xl p-6" style={{ backgroundColor: C.card, boxShadow: "0 1px 3px rgba(22,33,62,0.08)" }}>
        {isVocab ? (
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold" style={{ color: C.ink, fontFamily: "'Fredoka', sans-serif" }}>{question.word}</div>
              <div className="text-xs mt-1" style={{ color: C.inkSoft, fontFamily: "'JetBrains Mono', monospace" }}>/{question.phon}/ · {question.pos}</div>
            </div>
            <SpeakButton text={question.word} rate={rate} />
          </div>
        ) : (
          <div className="text-lg font-semibold" style={{ color: C.ink }}>{question.q}</div>
        )}

        <div className="grid gap-3 mt-5">
          {question.opts.map((opt, i) => {
            const isCorrect = i === question.a;
            const isChosen = i === selected;
            let bg = C.paper, border = "transparent", textColor = C.ink;
            if (selected !== null) {
              if (isCorrect) { bg = C.tealSoft; border = C.teal; }
              else if (isChosen) { bg = C.coralSoft; border = C.coral; }
            }
            return (
              <button key={i} onClick={() => choose(i)} disabled={selected !== null} className="flex items-center justify-between px-4 py-3 rounded-xl text-left border-2 transition" style={{ backgroundColor: bg, borderColor: border, color: textColor }}>
                <span>{opt}</span>
                {selected !== null && isCorrect && <CheckCircle2 size={18} style={{ color: C.teal }} />}
                {selected !== null && isChosen && !isCorrect && <XCircle size={18} style={{ color: C.coral }} />}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="mt-5 rounded-xl p-4" style={{ backgroundColor: C.paper }}>
            {isVocab ? (
              <>
                <div className="text-sm font-semibold" style={{ color: C.teal }}>正確意思：{question.opts[question.a]}</div>
                <div className="mt-2 flex items-start gap-2 text-sm" style={{ color: C.inkSoft }}>
                  <span className="flex-1">{question.example}</span>
                  <SpeakButton text={question.example} size={14} rate={rate} />
                </div>
              </>
            ) : (
              <div className="text-sm" style={{ color: C.teal }}>中文翻譯：{question.zh}</div>
            )}
          </div>
        )}

        {selected !== null && (
          <button onClick={next} className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-semibold" style={{ backgroundColor: C.navy, color: "#fff" }}>
            {idx + 1 < questions.length ? "下一題" : "查看成績"} <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
