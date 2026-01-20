import { z } from 'astro:content';

// =============================================================================
// PROFILE DATA SCHEMA
// =============================================================================
// Zod validation for src/data/profile.yaml
// Single source of truth for resumes, CVs, portfolio, and AI assistants

// -----------------------------------------------------------------------------
// Primitives
// -----------------------------------------------------------------------------

const accomplishmentSchema = z.object({
  accomplished: z.string(),
  measured_by: z.string(),
  by_doing: z.string(),
});

const impactStatementSchema = z.object({
  id: z.string(),
  statement: z.string(),
  tags: z.array(z.string()),
  role: z.string(),
  year: z.number(),
});

// -----------------------------------------------------------------------------
// Identity & Contact
// -----------------------------------------------------------------------------

const identitySchema = z.object({
  name: z.string(),
  title: z.string(),
  location: z.string(),
  availability: z.array(z.string()),
  travel: z.string().optional(),
});

const contactSchema = z.object({
  email: z.string().email(),
  linkedin: z.string().url(),
  portfolio: z.string().url(),
  github: z.string().url().nullable(),
});

// -----------------------------------------------------------------------------
// Summary & Skills
// -----------------------------------------------------------------------------

const summarySchema = z.object({
  principal: z.string(),
  short: z.string(),
});

const skillsSchema = z.object({
  product_design: z.array(z.string()),
  design_systems: z.array(z.string()),
  research: z.array(z.string()),
  ai_technical: z.array(z.string()),
  tools: z.array(z.string()),
  frontend: z.array(z.string()),
});

// -----------------------------------------------------------------------------
// Experience
// -----------------------------------------------------------------------------

const accomplishmentGroupSchema = z.object({
  label: z.string(),
  items: z.array(accomplishmentSchema),
});

const experienceSchema = z.object({
  company: z.string(),
  title: z.string(),
  department: z.string().nullable(),
  teams: z.array(z.string()).nullable(),
  start_date: z.string(), // ISO date string
  end_date: z.string().nullable(), // null = current
  accomplishments: z.record(z.string(), accomplishmentGroupSchema),
});

// -----------------------------------------------------------------------------
// Education & Certifications
// -----------------------------------------------------------------------------

const educationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  year: z.number(),
  honors: z.string().optional(),
  gpa: z.string().nullable(),
});

const certificationSchema = z.object({
  name: z.string(),
  institution: z.string(),
  year: z.number(),
});

const otherExperienceSchema = z.object({
  role: z.string(),
  organization: z.string(),
  start_year: z.number(),
  end_year: z.number().nullable(),
});

// -----------------------------------------------------------------------------
// Impact Statements (Curated XYZ)
// -----------------------------------------------------------------------------

const impactStatementsSchema = z.object({
  headline: z.array(impactStatementSchema),
  featured: z.array(impactStatementSchema),
  legacy: z.array(impactStatementSchema),
});

// -----------------------------------------------------------------------------
// Impact Metrics (Raw Data)
// -----------------------------------------------------------------------------

const businessOutcomeSchema = z.object({
  metric: z.string(),
  value: z.string(),
  timeframe: z.string(),
  context: z.string(),
  detail: z.string().optional(),
});

const processKpiSchema = z.object({
  metric: z.string(),
  baseline: z.string(),
  target: z.string(),
  status: z.string(),
  context: z.string(),
});

const uxOutcomeSchema = z.object({
  metric: z.string(),
  value: z.string().optional(),
  target: z.string().optional(),
  timeframe: z.string().optional(),
  status: z.string().optional(),
  context: z.string(),
});

const impactMetricsSchema = z.object({
  business_outcomes: z.array(businessOutcomeSchema),
  process_kpis: z.array(processKpiSchema),
  ux_outcomes: z.array(uxOutcomeSchema),
});

// -----------------------------------------------------------------------------
// Projects
// -----------------------------------------------------------------------------

const projectSchema = z.object({
  name: z.string(),
  role: z.string(),
  status: z.enum(['Completed', 'Ongoing', 'Archived']),
  year: z.number(),
  description: z.string(),
  surfaces: z.array(z.string()).optional(),
  outcomes: z.array(z.string()),
});

// -----------------------------------------------------------------------------
// Leadership
// -----------------------------------------------------------------------------

const processOwnershipSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const teamCreatedSchema = z.object({
  name: z.string(),
  members: z.union([z.number(), z.string()]), // "10+" is a string
  purpose: z.string(),
});

const leadershipSchema = z.object({
  process_ownership: z.array(processOwnershipSchema),
  teams_created: z.array(teamCreatedSchema),
  mentorship: z.array(z.string()),
});

// -----------------------------------------------------------------------------
// Complete Profile Schema
// -----------------------------------------------------------------------------

export const profileSchema = z.object({
  identity: identitySchema,
  contact: contactSchema,
  summary: summarySchema,
  strengths: z.array(z.string()),
  skills: skillsSchema,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  certifications: z.array(certificationSchema),
  other_experience: z.array(otherExperienceSchema),
  impact_statements: impactStatementsSchema,
  impact_metrics: impactMetricsSchema,
  projects: z.array(projectSchema),
  leadership: leadershipSchema,
});

// -----------------------------------------------------------------------------
// Type Exports
// -----------------------------------------------------------------------------

export type Profile = z.infer<typeof profileSchema>;
export type Accomplishment = z.infer<typeof accomplishmentSchema>;
export type ImpactStatement = z.infer<typeof impactStatementSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Project = z.infer<typeof projectSchema>;
