# AI-Powered Resume & Interview Trainer

## Project Overview

This is a web application designed to help job seekers prepare for their applications and interviews using AI. Users can upload their CVs, provide a job description, and receive personalized AI-powered feedback. Additionally, the system provides a simulated interview experience tailored to the selected role.

This project is built with **Next.js**, **Tailwind CSS**, **Supabase**, and integrates AI APIs for natural language understanding and voice-based interview simulations.

---

## Features

### Core Concepts

- **Position**: Each job the user wants to apply for is represented as a `Position` entity in the system. It includes:
- Job title
- Company (optional)
- Job description
- Skills & seniority level (extracted by AI)
- CV snapshots and history
- Interview training history
- Scoring and feedback

### Position Menu

1. **CV Evaluation**

- Users upload their CV in PDF format.
- Users submit the related Job Description.
- AI evaluates CV and provides a detailed score breakdown:
- Skill match
- Relevant experience
- Project quality
- ATS compatibility
- Communication & structure
- Output: Position score (0–100) + actionable improvement suggestions.
- **Note:** AI evaluation is behind a paywall; free plan users see a rule-based preview only.

2. **Interview Training**

- Simulated interview sessions based on the Job Description.
- AI acts as the interviewer, asking role-specific questions.
- Voice-based or text-based options (optional for MVP).
- Post-interview feedback with scoring:
- Clarity
- Technical depth
- Confidence
- Improvement tips

### Free vs Paid Plans

- **Free / Preview Plan**
- Rule-based CV preview
- Job description management
- Limited trial of interview training (if any)
- **Pro Plan**
- AI-powered CV evaluation
- Full interview training
- Multiple Positions
- Voice-based training (optional)
- **Tester / Admin**
- Whitelisted users can access AI features without limits for development/testing.

---

## Tech Stack

- **Frontend:** Next.js + Tailwind CSS
- **Backend:** Next.js API routes, Supabase
- **Database:** Supabase (PostgreSQL)
- **AI:** GitHub Copilot API, OpenAI API (or other AI providers), VAPI for voice interviews
- **Payment (future):** Stripe subscription for Pro/Career plans

---

## Database Models (Supabase)

```sql
users
- id
- email

subscriptions
- user_id
- plan // free | pro | career
- status // active | trial | canceled
- expires_at
- is_tester // boolean

positions
- id
- user_id
- title
- company
- job_description
- created_at

cv_reviews
- id
- position_id
- score_total
- breakdown_json
- suggestions

interview_sessions
- id
- position_id
- role_type
- transcript
- score_json
- created_at
```
