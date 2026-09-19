// Calculate new Elo ratings for Agent A and Agent B based on match result
// outcome: 'A' (A wins), 'B' (B wins), 'tie' (draw), 'both_bad' (draw or small penalty)
export function calculateElo(ratingA, ratingB, outcome, kFactor = 32) {
  const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const expectedB = 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400));

  let scoreA = 0.5;
  let scoreB = 0.5;

  if (outcome === 'A') {
    scoreA = 1;
    scoreB = 0;
  } else if (outcome === 'B') {
    scoreA = 0;
    scoreB = 1;
  } else if (outcome === 'tie') {
    scoreA = 0.5;
    scoreB = 0.5;
  } else if (outcome === 'both_bad') {
    scoreA = 0.3;
    scoreB = 0.3;
  }

  const newRatingA = Math.round(ratingA + kFactor * (scoreA - expectedA));
  const newRatingB = Math.round(ratingB + kFactor * (scoreB - expectedB));

  const changeA = newRatingA - ratingA;
  const changeB = newRatingB - ratingB;

  return {
    newRatingA,
    newRatingB,
    changeA: changeA >= 0 ? `+${changeA}` : `${changeA}`,
    changeB: changeB >= 0 ? `+${changeB}` : `${changeB}`,
  };
}
