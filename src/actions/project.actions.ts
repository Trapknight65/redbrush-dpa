'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

export type ProjectCreateInput = Prisma.ProjectCreateInput
export type ProjectUpdateInput = Prisma.ProjectUpdateInput

export async function getProjects() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
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

export async function createProject(data: ProjectCreateInput) {
    try {
        const project = await prisma.project.create({
            data
        })
        revalidatePath('/admin/projects')
        revalidatePath('/portfolio')
        return { success: true, data: project }
    } catch (error) {
        console.error('createProject error:', error)
        return { success: false, error: 'Failed to create project' }
    }
}

export async function updateProject(id: string, data: ProjectUpdateInput) {
    try {
        const project = await prisma.project.update({
            where: { id },
            data
        })
        revalidatePath('/admin/projects')
        revalidatePath('/portfolio')
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
        return { success: true }
    } catch (error) {
        console.error('deleteProject error:', error)
        return { success: false, error: 'Failed to delete project' }
    }
}
