import Relations from "../data/Relations";

/**
 * Given an item, find the path to it
 * @param name - the item to find the path for
 * @returns An array of strings.
 */
export function findPath(name) {
  for (let a of Object.keys(Relations)) {
    const relative = Relations[a];
    for (let b of Object.keys(relative)) {
      if (name == relative[b]) return [a, b];
    }
  }
}

/**
 * Remove all occurrences of "me" from the array
 * @param arr - the array to be filtered
 */
const removeMe = (arr) => arr.filter((item) => item !== "me");

/**
 * Given two people, find the relative of the second person in the chain of relationships between the
 * first person and the second person
 * @param a - The first person
 * @param b - The person you want to find the relative of.
 * @returns The relative of the two people.
 */
export function findRelative(a, b) {
  const basicKeys = Object.keys(Relations.me);
  let arr = removeMe([...findPath(a), ...findPath(b)]);

  let person = Relations[arr[0]];
  let i = 1;
  while (i < arr.length) {
    if (!basicKeys.includes(arr[i])) arr.splice(i, 1, ...findPath(arr[i]));
    arr = removeMe(arr);

    if (i + 1 === arr.length) return person[arr[i]];
    if (!Relations[person[arr[i]]]) return false;
    person = Relations[person[arr[i]]];
    i++;
  }
  return person;
}

/**
 * Given a difficulty level, findRandom() returns an array of random name from the props array
 * @param diff - the number of random cards to return
 * @returns An array of random props.
 */
export function findRandom(diff) {
  const props = removeMe(Object.keys(Relations));
  const length = props.length;
  const arr = [];
  for (let i = 0; i < diff; i++) {
    const rand = Math.floor(Math.random() * length);
    arr.push(props[rand]);
  }
  return arr;
}

/**
 * Find the relative position of each element in the array
 * @param problem - a string of characters representing the problem.
 * @returns The solution to the problem.
 */
export function findSolution(problem) {
  let arr = Array.from(problem);
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i + 1] = findRelative(arr[i], arr[i + 1]);
  }
  return arr;
}

/**
 * Given a difficulty level, find a random problem and its solution
 * @param diff - the difficulty of the problem.
 * @returns An object with two properties, problem and solution.
 */
export function getRelationsWithSolution(diff) {
  let temp, problem;

  do {
    temp = findRandom(diff);
    problem = Array.from(temp);
    temp = findSolution(temp);
  } while (temp.includes(false) || temp.includes(""));

  return { problem, solution: temp.at(-1) };
}

/**
 * Find a random property name from the `Relations` object
 * @returns A random property from the `Relations` object.
 */
export function findOneRandom() {
  const props = Object.keys(Relations);
  return props[Math.floor(Math.random() * props.length)];
}

/**
 * "Shuffle the elements of an array."
 *
 * Here's a more detailed description of the above function: "Given an array, return a new array with
 * the elements of the original array in a random order. The random order should be different each time
 * the function is called. The function should not modify the original array."
 *
 * @param arr - The array to be shuffled.
 * @returns The array is being returned.
 */
export function shuffle(arr) {
  let currentIndex = arr.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
}

/**
 * Given a solution, find three other solutions that are not the correct solution
 * @param solution - The correct solution to the problem.
 * @returns An array of three random numbers.
 */
export function getRandomSolutionSet(solution) {
  const set = [];
  do {
    const relative = findOneRandom();
    if (!set.includes(relative) && relative !== solution) set.push(relative);
  } while (set.length < 3);
  return shuffle([solution, ...set]);
}

export function getListOfProblems(level = 0, limit = 10) {
  const data = [];
  const bound = parseInt(level) + parseInt(limit);
  for (let i = parseInt(level); i < bound; i++) {
    const { problem, solution } = getRelationsWithSolution(
      Math.floor(i / 6) + 2
    );
    const solutionSet = getRandomSolutionSet(solution);
    data.push({ problem, solution, solutionSet });
  }
  return data;
}
