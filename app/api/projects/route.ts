// app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { name, jobTitle, jobDescription, experienceLevel } = body;

    // Validate required fields
    if (!name || !jobTitle || !jobDescription) {
      return NextResponse.json(
        { error: 'Missing required fields: name, jobTitle, and jobDescription are required.' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (name.length > 200) {
      return NextResponse.json(
        { error: 'Project name must be less than 200 characters.' },
        { status: 400 }
      );
    }

    if (jobTitle.length > 200) {
      return NextResponse.json(
        { error: 'Job title must be less than 200 characters.' },
        { status: 400 }
      );
    }

    if (jobDescription.length < 50) {
      return NextResponse.json(
        { error: 'Job description must be at least 50 characters.' },
        { status: 400 }
      );
    }

    // Validate experience level
    const validExperienceLevels = ['entry', 'mid', 'senior', 'lead', 'executive'];
    if (experienceLevel && !validExperienceLevels.includes(experienceLevel)) {
      return NextResponse.json(
        { error: 'Invalid experience level.' },
        { status: 400 }
      );
    }

    // Create timestamp in Budapest timezone
    const now = new Date();
    const budapestTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Budapest' }));

    // Create project
    const [newProject] = await db.insert(projects).values({
      id: nanoid(),
      userId: user.id,
      name: name.trim(),
      jobTitle: jobTitle.trim(),
      jobDescription: jobDescription.trim(),
      experienceLevel: experienceLevel || null,
      status: 'draft',
      createdAt: budapestTime,
      updatedAt: budapestTime,
    }).returning();

    return NextResponse.json(
      { 
        success: true, 
        project: newProject,
        message: 'Project created successfully!' 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating project:', error);
    
    // Check for database errors
    if (error instanceof Error) {
      if (error.message.includes('unique constraint')) {
        return NextResponse.json(
          { error: 'A project with this name already exists.' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Authenticate user
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    // Get all user's projects
    const userProjects = await db.query.projects.findMany({
      where: (projects, { eq }) => eq(projects.userId, user.id),
      orderBy: (projects, { desc }) => [desc(projects.createdAt)],
    });

    return NextResponse.json({
      success: true,
      projects: userProjects,
      count: userProjects.length,
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects.' },
      { status: 500 }
    );
  }
}