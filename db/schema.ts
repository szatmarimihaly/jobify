import { relations } from "drizzle-orm";
import { 
  pgTable, 
  text, 
  timestamp, 
  boolean, 
  integer,
  jsonb,
  index,
  pgEnum 
} from "drizzle-orm/pg-core";

// ============================================================================
// BETTER AUTH TABLES (Extended)
// ============================================================================

export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    
    // Extended fields for our system
    role: text("role").default("user").notNull(), // 'user' | 'admin' | 'tester'
    credits: integer("credits").default(1).notNull(),
    totalCreditsUsed: integer("total_credits_used").default(0).notNull(),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("user_email_idx").on(table.email), // Fast email lookups
    index("user_role_idx").on(table.role), // Filter by role (admin queries)
    index("user_created_at_idx").on(table.createdAt), // Sort by signup date
  ]
);

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("session_user_id_idx").on(table.userId), // Fast user session lookup
    index("session_token_idx").on(table.token), // Fast token validation
    index("session_expires_at_idx").on(table.expiresAt), // Cleanup expired sessions
  ]
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("account_user_id_idx").on(table.userId), // Fast user account lookup
    index("account_provider_idx").on(table.providerId, table.accountId), // Fast OAuth lookups
  ]
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("verification_identifier_idx").on(table.identifier), // Fast verification lookup
    index("verification_expires_at_idx").on(table.expiresAt), // Cleanup expired verifications
  ]
);

// ============================================================================
// ENUMS
// ============================================================================

export const projectStatusEnum = pgEnum("project_status", [
  "draft",
  "processing", 
  "completed",
  "failed"
]);

export const companyTypeEnum = pgEnum("company_type", [
  "startup",
  "mid-size",
  "enterprise",
  "big-tech"
]);

export const experienceLevelEnum = pgEnum("experience_level", [
  "entry",
  "mid",
  "senior",
  "lead",
  "executive"
]);

export const transactionTypeEnum = pgEnum("transaction_type", [
  "signup_bonus",
  "purchase",
  "evaluation_used",
  "refund",
  "admin_grant"
]);

// ============================================================================
// RESUME EVALUATION TABLES
// ============================================================================

export const projects = pgTable(
  "projects",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    
    // Project basics
    name: text("name").notNull(),
    status: projectStatusEnum("status").default("draft").notNull(),
    
    // Resume reference
    currentResumeId: text("current_resume_id"),
    
    // Job context
    jobTitle: text("job_title").notNull(),
    jobDescription: text("job_description").notNull(),
    companyName: text("company_name"),
    companyType: companyTypeEnum("company_type"),
    industry: text("industry"),
    experienceLevel: experienceLevelEnum("experience_level").notNull(),
    keySkills: text("key_skills").array(),
    
    // Latest evaluation (denormalized for performance)
    latestScore: integer("latest_score"),
    latestEvaluationId: text("latest_evaluation_id"),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("projects_user_id_idx").on(table.userId), // Get all user projects
    index("projects_status_idx").on(table.status), // Filter by status
    index("projects_user_status_idx").on(table.userId, table.status), // Compound: user's active projects
    index("projects_created_at_idx").on(table.createdAt), // Sort by date
    index("projects_latest_score_idx").on(table.latestScore), // Sort by score
  ]
);

export const resumes = pgTable(
  "resumes",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    
    // File data
    fileName: text("file_name").notNull(),
    fileUrl: text("file_url").notNull(),
    fileSize: integer("file_size").notNull(),
    
    // Extracted content
    extractedText: text("extracted_text"),
    
    // Version tracking
    versionNumber: integer("version_number").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    
    uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
  },
  (table) => [
    index("resumes_project_id_idx").on(table.projectId), // Get all project resumes
    index("resumes_user_id_idx").on(table.userId), // Get all user resumes
    index("resumes_project_active_idx").on(table.projectId, table.isActive), // Get active resume for project
    index("resumes_uploaded_at_idx").on(table.uploadedAt), // Sort by upload date
  ]
);

export const evaluations = pgTable(
  "evaluations",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    resumeId: text("resume_id")
      .notNull()
      .references(() => resumes.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    
    // Scores
    totalScore: integer("total_score").notNull(),
    detailedScores: jsonb("detailed_scores").notNull(),
    
    // Feedback
    recommendations: jsonb("recommendations").notNull(),
    strengths: jsonb("strengths"),
    criticalIssues: jsonb("critical_issues"),
    
    // AI metadata
    aiModel: text("ai_model").default("claude-sonnet-4").notNull(),
    tokensUsed: integer("tokens_used"),
    processingTimeMs: integer("processing_time_ms"),
    
    evaluatedAt: timestamp("evaluated_at").defaultNow().notNull(),
  },
  (table) => [
    index("evaluations_project_id_idx").on(table.projectId), // Get all project evaluations
    index("evaluations_resume_id_idx").on(table.resumeId), // Get all resume evaluations
    index("evaluations_user_id_idx").on(table.userId), // Get all user evaluations
    index("evaluations_total_score_idx").on(table.totalScore), // Sort/filter by score
    index("evaluations_evaluated_at_idx").on(table.evaluatedAt), // Sort by date
    index("evaluations_project_date_idx").on(table.projectId, table.evaluatedAt), // Project evaluation history
  ]
);

export const creditTransactions = pgTable(
  "credit_transactions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    
    amount: integer("amount").notNull(),
    type: transactionTypeEnum("type").notNull(),
    
    // References
    projectId: text("project_id").references(() => projects.id),
    evaluationId: text("evaluation_id").references(() => evaluations.id),
    
    // Payment info
    paymentId: text("payment_id"),
    paymentAmount: integer("payment_amount"),
    
    notes: text("notes"),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("transactions_user_id_idx").on(table.userId), // Get user transaction history
    index("transactions_type_idx").on(table.type), // Filter by type
    index("transactions_user_type_idx").on(table.userId, table.type), // User purchases/usage
    index("transactions_created_at_idx").on(table.createdAt), // Sort by date
    index("transactions_payment_id_idx").on(table.paymentId), // Webhook lookups
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  projects: many(projects),
  resumes: many(resumes),
  evaluations: many(evaluations),
  creditTransactions: many(creditTransactions),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(user, {
    fields: [projects.userId],
    references: [user.id],
  }),
  resumes: many(resumes),
  evaluations: many(evaluations),
  currentResume: one(resumes, {
    fields: [projects.currentResumeId],
    references: [resumes.id],
  }),
  latestEvaluation: one(evaluations, {
    fields: [projects.latestEvaluationId],
    references: [evaluations.id],
  }),
}));

export const resumesRelations = relations(resumes, ({ one, many }) => ({
  project: one(projects, {
    fields: [resumes.projectId],
    references: [projects.id],
  }),
  user: one(user, {
    fields: [resumes.userId],
    references: [user.id],
  }),
  evaluations: many(evaluations),
}));

export const evaluationsRelations = relations(evaluations, ({ one }) => ({
  project: one(projects, {
    fields: [evaluations.projectId],
    references: [projects.id],
  }),
  resume: one(resumes, {
    fields: [evaluations.resumeId],
    references: [resumes.id],
  }),
  user: one(user, {
    fields: [evaluations.userId],
    references: [user.id],
  }),
}));

export const creditTransactionsRelations = relations(creditTransactions, ({ one }) => ({
  user: one(user, {
    fields: [creditTransactions.userId],
    references: [user.id],
  }),
  project: one(projects, {
    fields: [creditTransactions.projectId],
    references: [projects.id],
  }),
  evaluation: one(evaluations, {
    fields: [creditTransactions.evaluationId],
    references: [evaluations.id],
  }),
}));