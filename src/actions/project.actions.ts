'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

export type ProjectCreateInput = Prisma.ProjectCreateInput
export type ProjectUpdateInput = Prisma.ProjectUpdateInput

export interface ProjectFormInput {
    title: string;
    slug: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
    tech: string[];
    challenge: string;
    solution: string;
    results: string[];
    gallery: string[];
    figmaDesign?: any;
    caseStudyData?: string; // Passed as JSON string
    order?: number;
}

export async function getProjects() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: [
                { order: 'asc' },
                { createdAt: 'desc' }
            ],
            include: { caseStudies: true }
        })
        return { success: true, data: projects }
    } catch (error) {
        console.error('getProjects error:', error)
        return { success: false, error: 'Failed to fetch projects' }
    }
}

export async function getProjectBySlug(slug: string) {
    try {
        const project = await prisma.project.findUnique({
            where: { slug },
            include: { caseStudies: true }
        })
        return { success: true, data: project }
    } catch (error) {
        console.error('getProjectBySlug error:', error)
        return { success: false, error: 'Failed to fetch project' }
    }
}

export async function getProjectById(id: string) {
    try {
        const project = await prisma.project.findUnique({
            where: { id },
            include: { caseStudies: true }
        })
        return { success: true, data: project }
    } catch (error) {
        console.error('getProjectById error:', error)
        return { success: false, error: 'Failed to fetch project' }
    }
}

export async function createProject(data: ProjectFormInput) {
    try {
        const projectData: any = { ...data };
        if (typeof data.caseStudyData === 'string' && data.caseStudyData) {
            projectData.caseStudyData = JSON.parse(data.caseStudyData);
        } else if (!data.caseStudyData) {
            projectData.caseStudyData = Prisma.JsonNull;
        }

        const project = await prisma.project.create({
            data: projectData
        })
        revalidatePath('/admin/projects')
        revalidatePath('/portfolio')
        revalidatePath('/projects')
        return { success: true, data: project }
    } catch (error: any) {
        console.error('createProject CRITICAL FAILURE:', error);
        console.error('Input Data:', JSON.stringify(data, null, 2)); // Log the input data for debugging

        if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
            return { success: false, error: 'A project with this slug already exists. Please choose a different title or slug.' };
        }
        if (error instanceof SyntaxError) {
            return { success: false, error: 'Invalid JSON in Case Study Data.' };
        }
        // Return more detail
        return {
            success: false,
            error: `Failed to create project: ${error.message} (Code: ${error.code})`
        };
    }
}

export async function updateProject(id: string, data: Partial<ProjectFormInput>) {
    try {
        const projectData: any = { ...data };
        if (typeof data.caseStudyData === 'string' && data.caseStudyData) {
            projectData.caseStudyData = JSON.parse(data.caseStudyData);
        } else if (data.caseStudyData === "") { // Handle clearing
            projectData.caseStudyData = Prisma.JsonNull;
        }

        const project = await prisma.project.update({
            where: { id },
            data: projectData
        })
        revalidatePath('/admin/projects')
        revalidatePath('/portfolio')
        revalidatePath('/projects')
        return { success: true, data: project }
    } catch (error) {
        console.error('updateProject error:', error)
        return { success: false, error: 'Failed to update project' }
    }
}

export async function deleteProject(id: string) {
    try {
        await prisma.project.delete({
            where: { id }
        })
        revalidatePath('/admin/projects')
        revalidatePath('/portfolio')
        revalidatePath('/projects')
        return { success: true }
    } catch (error) {
        console.error('deleteProject error:', error)
        return { success: false, error: 'Failed to delete project' }
    }
}
