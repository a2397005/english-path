import { useEffect, useState } from "react";
import { LEVELS, loadVocabulary } from "./index.js";

async function loadWords(level) {
  if (level !== "all") return loadVocabulary(level);

  const groups = await Promise.all(LEVELS.map(async ({ id, label }) => {
    const words = await loadVocabulary(id);
    return words.map((word) => ({ ...word, levelId: id, levelLabel: label }));
  }));
  return groups.flat();
}

export default function useVocabulary(level) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    let active = true;
    loadWords(level).then(
      (words) => { if (active) setResult({ level, words }); },
      () => { if (active) setResult({ level, error: true }); },
    );
    return () => { active = false; };
  }, [level]);

  return result?.level === level ? result : {};
}
