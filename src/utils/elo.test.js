import { describe, it, expect } from 'vitest';
import { calculateElo } from './elo';

describe('calculateElo', () => {
  it('should increase rating A when Agent A wins', () => {
    const { newRatingA, newRatingB, changeA, changeB } = calculateElo(1200, 1200, 'A');
    expect(newRatingA).toBe(1216);
    expect(newRatingB).toBe(1184);
    expect(changeA).toBe('+16');
    expect(changeB).toBe('-16');
  });

  it('should increase rating B when Agent B wins', () => {
    const { newRatingA, newRatingB } = calculateElo(1200, 1200, 'B');
    expect(newRatingA).toBe(1184);
    expect(newRatingB).toBe(1216);
  });

  it('should keep ratings equal when tie happens between equal opponents', () => {
    const { newRatingA, newRatingB } = calculateElo(1200, 1200, 'tie');
    expect(newRatingA).toBe(1200);
    expect(newRatingB).toBe(1200);
  });
});
