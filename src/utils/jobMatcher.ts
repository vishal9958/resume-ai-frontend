export function matchJob(
  resumeSkills: string[],
  jobSkills: string[]
) {
  if (!resumeSkills || !jobSkills || jobSkills.length === 0) {
    return {
      matchedSkills: [],
      missingSkills: jobSkills || [],
      matchPercent: 0,
    };
  }

  const matchedSkills = jobSkills.filter((skill) =>
    resumeSkills.includes(skill.toLowerCase())
  );

  const missingSkills = jobSkills.filter(
    (skill) => !resumeSkills.includes(skill.toLowerCase())
  );

  const matchPercent = Math.round(
    (matchedSkills.length / jobSkills.length) * 100
  );

  return {
    matchedSkills,
    missingSkills,
    matchPercent,
  };
}
