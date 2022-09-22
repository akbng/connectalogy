import enRelations from "../i18n/en";

const getOctoSeries = (start, numOfElements) => {
  let arr = [];
  let i = 0;
  let a = 0;
  while (true) {
    a = start + i * 8;
    if (a > numOfElements) break;
    arr.push(a);
    i++;
  }
  return arr;
};

const getXPosition = (p, numOfElements) => {
  const pos = new Array(4).fill().map((_, i) => i * 180); // [0, 180, 360, 540]
  const quadSeries = getOctoSeries(4, numOfElements);
  const octoSeries = getOctoSeries(0, numOfElements);
  for (let i = 0; i < numOfElements; i++) {
    let a = quadSeries[i];
    let b = octoSeries[i];
    if (p >= a && p <= a + 3) return pos[pos.length - (p - a) - 1];
    if (p >= b && p <= b + 3) return pos[p - b];
  }
};

const getTargetPos = (pos, numOfElements) => {
  if (pos === 0) return "left";
  if (pos % 4 === 0) return "top";
  const rSeries = getOctoSeries(5, numOfElements);
  const lSeries = getOctoSeries(1, numOfElements);
  for (let i = 0; i < numOfElements; i++) {
    let a = rSeries[i];
    let b = lSeries[i];
    if (pos >= a && pos <= a + 3) return "right";
    if (pos >= b && pos <= b + 3) return "left";
  }
};

const getSourcePos = (pos, numOfElements) => {
  if (pos % 4 === 3) return "bottom";
  const rSeries = getOctoSeries(0, numOfElements);
  const lSeries = getOctoSeries(4, numOfElements);
  for (let i = 0; i < numOfElements; i++) {
    let a = lSeries[i];
    let b = rSeries[i];
    if (pos >= a && pos <= a + 3) return "left";
    if (pos >= b && pos <= b + 3) return "right";
  }
};

const createFlowElements = (arr, lang) => {
  const nodes = arr.map((item, i) => ({
    id: `${i + 1}`,
    data: {
      label: !lang || lang.length === 0 ? enRelations[item] : lang[item],
    },
    position: {
      x: getXPosition(i, arr.length), // [0, 180, 360, 540] or [540, 360, 180, 0]
      y: 100 * Math.floor(i / 4), // [0, 0, 0, 0, 100, 100, 100, 100, 200, 200, 200, 200, 300, 300, ...]
    },
    style: {
      width: "120px",
    },
    targetPosition: getTargetPos(i, arr.length),
    sourcePosition: getSourcePos(i, arr.length),
  }));
  const edges = arr.map((_, i) => {
    if (i + 1 === arr.length) return;
    return {
      id: `e${i + 1}-${i + 2}`,
      source: `${i + 1}`,
      target: `${i + 2}`,
      animated: true,
    };
  });
  return { nodes, edges: edges.filter((item) => item !== undefined) };
};

export default createFlowElements;
