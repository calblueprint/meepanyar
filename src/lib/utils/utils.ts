// Rounds number to at most 2 decimal points
// And converts to string
export const roundToString = (number: number) => {
  return (Math.round(number * 100) / 100).toString();
}
