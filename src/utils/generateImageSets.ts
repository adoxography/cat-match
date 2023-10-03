export const differenceSets: Record<number, number[]> = {
  3: [0, 1, 3],
  4: [0, 1, 3, 9],
  5: [0, 1, 6, 8, 18],
  6: [0, 1, 3, 10, 14, 26],
  8: [0, 1, 3, 13, 32, 36, 43, 52],
};

export const createRange = (n: number) => Array(n).fill(0).map((_, idx) => idx);

export const generateRandomNumber = (max: number) => Math.floor(Math.random() * max);

export const generateNumCards = (n: number) => n * (n - 1) + 1;

const generateStartingIndices = (max: number) => {
  const a = generateRandomNumber(max);
  let b: number;

  do {
    b = generateRandomNumber(max);
  } while (a === b);

  return [a, b] as const;
};

const getImageSet = (n: number, start: number): number[] => {
  const range = createRange(generateNumCards(n));
  const differenceSet = differenceSets[n];

  if (differenceSet === undefined) {
    throw new Error(`Illegal n: ${n}`);
  }

  return differenceSet.map((idx) => (range[idx] + start) % range.length);
};

const generateImageSets = (size: number) => {
  const numCards = generateNumCards(size);
  const [a, b] = generateStartingIndices(numCards);

  return [
    getImageSet(size, a),
    getImageSet(size, b),
  ] as const;
};

export default generateImageSets;
