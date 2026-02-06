export function calculateResumeScore(skills: string[]): number {
  if (!skills || skills.length === 0) return 20;

  // 10 skills = 100 score (max)
  const score = Math.round((skills.length / 10) * 100);

  return Math.min(score, 100);
}
