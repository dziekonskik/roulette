export function randomNumber(rangeStart: number, rangeEnd: number) {
  return Math.floor(Math.random() * (rangeStart - rangeEnd + 1) + rangeEnd);
}
