export const getStarAverage = (stars: any[]) => {
  let average, total = 0;

  stars.map(star => total += star.stars);

  average = total / stars.length;

  return average;
}
