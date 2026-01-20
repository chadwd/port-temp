import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { profileSchema, type Profile } from './schema';

// =============================================================================
// PROFILE DATA LOADER
// =============================================================================
// Loads and validates src/data/profile.yaml at build time
// Provides typed access to professional profile data

let cachedProfile: Profile | null = null;

/**
 * Load and validate the profile data from YAML
 * Caches the result for subsequent calls during the same build
 */
export function getProfile(): Profile {
  if (cachedProfile) {
    return cachedProfile;
  }

  const yamlPath = new URL('./profile.yaml', import.meta.url);
  const yamlContent = readFileSync(yamlPath, 'utf-8');
  const rawData = parse(yamlContent);

  // Validate against schema - will throw if invalid
  const validated = profileSchema.parse(rawData);
  cachedProfile = validated;

  return validated;
}

/**
 * Get all impact statements flattened into a single array
 * Useful for filtering by tags or building custom lists
 */
export function getAllImpactStatements() {
  const profile = getProfile();
  return [
    ...profile.impact_statements.headline,
    ...profile.impact_statements.featured,
    ...profile.impact_statements.legacy,
  ];
}

/**
 * Get impact statements filtered by tag
 */
export function getImpactStatementsByTag(tag: string) {
  return getAllImpactStatements().filter(s => s.tags.includes(tag));
}

/**
 * Get all accomplishments from all experiences flattened
 * Returns with company context for each
 */
export function getAllAccomplishments() {
  const profile = getProfile();
  const results: Array<{
    company: string;
    category: string;
    label: string;
    accomplished: string;
    measured_by: string;
    by_doing: string;
  }> = [];

  for (const exp of profile.experience) {
    for (const [category, group] of Object.entries(exp.accomplishments)) {
      for (const item of group.items) {
        results.push({
          company: exp.company,
          category,
          label: group.label,
          ...item,
        });
      }
    }
  }

  return results;
}

// Re-export types for convenience
export type { Profile, Accomplishment, ImpactStatement, Experience, Project } from './schema';
