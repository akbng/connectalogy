import { getAPSeries } from "../utils/createFlowElements";

const baseScores = {
  easy: 10,
  normal: 20,
  hard: 35,
};

const baseTimer = {
  easy: 25,
  normal: 20,
  hard: 15,
};

export const updateScore = (currentLevel, mode = "easy") => {
  const levels = getAPSeries(10, Math.ceil(currentLevel / 10 + 1) * 10, 10);
  for (let i = 0; i < levels.length; i++) {
    if (currentLevel < levels[i]) {
      const score = baseScores[mode] + i * 5;
      return { inc: score, dec: ~~(score / 4) };
    }
  }
};

export const timerDetails = (currentLevel, mode = "easy") => {
  const levels = getAPSeries(10, Math.ceil(currentLevel / 10 + 1) * 10, 10);
  for (let i = 0; i < levels.length; i++) {
    if (currentLevel < levels[i])
      return Math.min(60, baseTimer[mode] + i * Math.max(0, i - 2));
  }
};
