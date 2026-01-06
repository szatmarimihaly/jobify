CREATE TYPE "public"."company_type" AS ENUM('startup', 'mid-size', 'enterprise', 'big-tech');--> statement-breakpoint
CREATE TYPE "public"."experience_level" AS ENUM('entry', 'mid', 'senior', 'lead', 'executive');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('draft', 'processing', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('signup_bonus', 'purchase', 'evaluation_used', 'refund', 'admin_grant');--> statement-breakpoint
CREATE TABLE "credit_transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"amount" integer NOT NULL,
	"type" "transaction_type" NOT NULL,
	"project_id" text,
	"evaluation_id" text,
	"payment_id" text,
	"payment_amount" integer,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "evaluations" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"resume_id" text NOT NULL,
	"user_id" text NOT NULL,
	"total_score" integer NOT NULL,
	"detailed_scores" jsonb NOT NULL,
	"recommendations" jsonb NOT NULL,
	"strengths" jsonb,
	"critical_issues" jsonb,
	"ai_model" text DEFAULT 'claude-sonnet-4' NOT NULL,
	"tokens_used" integer,
	"processing_time_ms" integer,
	"evaluated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"status" "project_status" DEFAULT 'draft' NOT NULL,
	"current_resume_id" text,
	"job_title" text NOT NULL,
	"job_description" text NOT NULL,
	"company_name" text,
	"company_type" "company_type",
	"industry" text,
	"experience_level" "experience_level",
	"key_skills" text[],
	"latest_score" integer,
	"latest_evaluation_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resumes" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"user_id" text NOT NULL,
	"file_name" text NOT NULL,
	"file_url" text NOT NULL,
	"file_size" integer NOT NULL,
	"extracted_text" text,
	"version_number" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"uploaded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP INDEX "account_userId_idx";--> statement-breakpoint
DROP INDEX "session_userId_idx";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" text DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "credits" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "total_credits_used" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "credit_transactions" ADD CONSTRAINT "credit_transactions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit_transactions" ADD CONSTRAINT "credit_transactions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit_transactions" ADD CONSTRAINT "credit_transactions_evaluation_id_evaluations_id_fk" FOREIGN KEY ("evaluation_id") REFERENCES "public"."evaluations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "transactions_user_id_idx" ON "credit_transactions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "transactions_type_idx" ON "credit_transactions" USING btree ("type");--> statement-breakpoint
CREATE INDEX "transactions_user_type_idx" ON "credit_transactions" USING btree ("user_id","type");--> statement-breakpoint
CREATE INDEX "transactions_created_at_idx" ON "credit_transactions" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "transactions_payment_id_idx" ON "credit_transactions" USING btree ("payment_id");--> statement-breakpoint
CREATE INDEX "evaluations_project_id_idx" ON "evaluations" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "evaluations_resume_id_idx" ON "evaluations" USING btree ("resume_id");--> statement-breakpoint
CREATE INDEX "evaluations_user_id_idx" ON "evaluations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "evaluations_total_score_idx" ON "evaluations" USING btree ("total_score");--> statement-breakpoint
CREATE INDEX "evaluations_evaluated_at_idx" ON "evaluations" USING btree ("evaluated_at");--> statement-breakpoint
CREATE INDEX "evaluations_project_date_idx" ON "evaluations" USING btree ("project_id","evaluated_at");--> statement-breakpoint
CREATE INDEX "projects_user_id_idx" ON "projects" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "projects_status_idx" ON "projects" USING btree ("status");--> statement-breakpoint
CREATE INDEX "projects_user_status_idx" ON "projects" USING btree ("user_id","status");--> statement-breakpoint
CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "projects_latest_score_idx" ON "projects" USING btree ("latest_score");--> statement-breakpoint
CREATE INDEX "resumes_project_id_idx" ON "resumes" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "resumes_user_id_idx" ON "resumes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "resumes_project_active_idx" ON "resumes" USING btree ("project_id","is_active");--> statement-breakpoint
CREATE INDEX "resumes_uploaded_at_idx" ON "resumes" USING btree ("uploaded_at");--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "account_provider_idx" ON "account" USING btree ("provider_id","account_id");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_token_idx" ON "session" USING btree ("token");--> statement-breakpoint
CREATE INDEX "session_expires_at_idx" ON "session" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "user_email_idx" ON "user" USING btree ("email");--> statement-breakpoint
CREATE INDEX "user_role_idx" ON "user" USING btree ("role");--> statement-breakpoint
CREATE INDEX "user_created_at_idx" ON "user" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "verification_expires_at_idx" ON "verification" USING btree ("expires_at");