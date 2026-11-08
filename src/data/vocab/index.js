export const LEVELS = [
  { id: "elem1", label: "國小低年級", sub: "1-2年級", cefr: "Pre-A1", step: 1 },
  { id: "elem2", label: "國小中年級", sub: "3-4年級", cefr: "A1", step: 2 },
  { id: "elem3", label: "國小高年級", sub: "5-6年級", cefr: "A1-A2", step: 3 },
  { id: "middle", label: "國中", sub: "7-9年級", cefr: "A2-B1", step: 4 },
  { id: "high", label: "高中", sub: "10-12年級", cefr: "B1-B2", step: 5 },
  { id: "toefl", label: "托福 TOEFL", sub: "留學/檢定", cefr: "B2-C1", step: 6 },
];

const loaders = {
  elem1: () => import("./elem1.js"),
  elem2: () => import("./elem2.js"),
  elem3: () => import("./elem3.js"),
  middle: () => import("./middle.js"),
  high: () => import("./high.js"),
  toefl: () => import("./toefl.js"),
};

export async function loadVocabulary(level) {
  const module = await loaders[level]();
  return module[level];
}
