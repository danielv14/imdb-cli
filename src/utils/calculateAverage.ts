export const calculateAverage = (arr: number[]): number => {
  const average = arr.reduce((a, b) => a + b, 0) / arr.length;
  return parseFloat(average.toFixed(1));
};
