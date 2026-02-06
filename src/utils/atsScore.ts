export function calculateATSScore(text: string): number {
  if (!text) return 30;

  let score = 40;
  const lower = text.toLowerCase();

  if (lower.includes("experience")) score += 15;
  if (lower.includes("project")) score += 15;
  if (lower.includes("skills")) score += 15;
  if (lower.length > 500) score += 10;
  if (lower.length > 1000) score += 5;

  return Math.min(score, 100);
}
