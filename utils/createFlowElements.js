import enRelations from "../i18n/en";

/**
 * Function to find a general AP series given the starting point,
 * ending point and the common difference
 * @param start - Starting Number for the series
 * @param end - The last number of the series
 * @param commonDiff - Common Difference of the series
 * @returns - An array containing the required AP series.
 */
const getAPSeries = (start, end, commonDiff) => {
  let arr = [];
  let i = 0;
  let a = 0;
  while (true) {
    a = start + i * commonDiff;
    if (a > end) break;
    arr.push(a);
    i++;
  }
  return arr;
};

const getXPosition = (p, numOfElements, numOfRows) => {
  const pos = new Array(numOfRows).fill().map((_, i) => i * 180); // [0, 180, 360, 540]
  const reverseSeries = getAPSeries(numOfRows, numOfElements, 2 * numOfRows);
  const forwardSeries = getAPSeries(0, numOfElements, 2 * numOfRows);
  for (let i = 0; i < numOfElements; i++) {
    let a = reverseSeries[i];
    let b = forwardSeries[i];
    if (p >= a && p <= a + numOfRows - 1) return pos[pos.length - (p - a) - 1];
    if (p >= b && p <= b + numOfRows - 1) return pos[p - b];
  }
};

const getTargetPos = (pos, numOfElements, numOfRows) => {
  if (pos === 0) return "left";
  if (pos % numOfRows === 0) return "top";
  const rSeries = getAPSeries(numOfRows + 1, numOfElements, 2 * numOfRows);
  const lSeries = getAPSeries(1, numOfElements, 2 * numOfRows);
  for (let i = 0; i < numOfElements; i++) {
    let a = rSeries[i];
    let b = lSeries[i];
    if (pos >= a && pos <= a + numOfRows - 1) return "right";
    if (pos >= b && pos <= b + numOfRows - 1) return "left";
  }
};

const getSourcePos = (pos, numOfElements, numOfRows) => {
  if (pos % numOfRows === numOfRows - 1) return "bottom";
  const rSeries = getAPSeries(0, numOfElements, 2 * numOfRows);
  const lSeries = getAPSeries(numOfRows, numOfElements, 2 * numOfRows);
  for (let i = 0; i < numOfElements; i++) {
    let a = lSeries[i];
    let b = rSeries[i];
    if (pos >= a && pos <= a + numOfRows - 1) return "left";
    if (pos >= b && pos <= b + numOfRows - 1) return "right";
  }
};

const createFlowElements = (arr, lang, screenWidth) => {
  const rowsPerColumn = screenWidth < 600 ? 2 : 4;

  const nodes = arr.map((item, i) => ({
    id: `${i + 1}`,
    data: {
      label: !lang || lang.length === 0 ? enRelations[item] : lang[item],
    },
    position: {
      x: getXPosition(i, arr.length, rowsPerColumn), // [0, 180, 360, 540] or [540, 360, 180, 0]
      y: 100 * Math.floor(i / rowsPerColumn), // y = 0, 100, 200, 300, ...
    },
    style: {
      width: "120px",
    },
    targetPosition: getTargetPos(i, arr.length, rowsPerColumn),
    sourcePosition: getSourcePos(i, arr.length, rowsPerColumn),
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
