const SKILLS_BANK = [
  "html", "css", "javascript", "typescript",
    "react", "next.js", "redux",
    "node.js", "express",
    "python", "flask", "django",
    "java", "spring",
    "c", "c++",
    "mysql", "postgresql", "mongodb",
    "git", "github",
    "rest api", "graphql",
    "docker", "aws",
    "tailwind", "bootstrap",
    "excel", "power bi", "tableau",
    "marketing", "finance", "accounting",
    "business analysis", "communication"
];

export function extractSkills(text: string): string[] {
  if (!text) return [];

  const lowerText = text.toLowerCase();

  const foundSkills = SKILLS_BANK.filter((skill) =>
    lowerText.includes(skill)
  );

  // remove duplicates
  return Array.from(new Set(foundSkills));
}
