import { VOCAB } from "../data/vocab/index.js";

export function speak(text, rate = 0.85) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const cleaned = text.trim();
  // very short words (like "I", "a") can sound clipped or odd; a trailing period stabilizes prosody
  const utteranceText = cleaned.length <= 2 ? cleaned + "." : cleaned;
  const u = new SpeechSynthesisUtterance(utteranceText);
  u.lang = "en-US";
  u.rate = rate;
  window.speechSynthesis.speak(u);
}

export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const VOCAB_QUIZ_COUNT = 8;

export function generateVocabQuestions(level, count = VOCAB_QUIZ_COUNT) {
  const words = VOCAB[level];
  const n = Math.min(count, words.length);
  const chosen = shuffleArray(words).slice(0, n);
  return chosen.map((w) => {
    const others = words.filter((o) => o.word !== w.word && o.meaning !== w.meaning);
    const distractors = shuffleArray(others).slice(0, 3).map((o) => o.meaning);
    const opts = shuffleArray([w.meaning, ...distractors]);
    const a = opts.indexOf(w.meaning);
    return {
      type: "vocab",
      word: w.word,
      phon: w.phon,
      pos: w.pos,
      example: w.example,
      opts,
      a,
    };
  });
}
