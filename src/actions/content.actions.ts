'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// --- Types ---

export interface TechStackItem {
    name: string
    icon?: string
    version?: string
}

export interface ArticleInput {
    title: string
    slug: string
    content: string
    excerpt?: string
    tags: string[]
    category: string
    techStack?: TechStackItem[]
    techStack?: TechStackItem[]
    repositoryUrl?: string
    demoUrl?: string
    isPublished?: boolean
}

export interface DevReportInput {
    title: string
    slug: string
    period: string
    content: string
    metrics?: Record<string, number | string>
    highlights: string[]
    isPublished?: boolean
}

// --- Article Actions ---

export async function getArticles(publishedOnly = true) {
    try {
        const where = publishedOnly ? { isPublished: true } : {}
        const articles = await prisma.article.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        })
        return { success: true, data: articles }
    } catch (error) {
        console.error("Error fetching articles:", error)
        return { success: false, error: "Failed to fetch articles" }
    }
}

export async function getArticleBySlug(slug: string) {
    try {
        const article = await prisma.article.findUnique({
            where: { slug }
        })

        if (article) {
            // Increment views
            await prisma.article.update({
                where: { slug },
                data: { views: { increment: 1 } }
            })
        }

        return { success: true, data: article }
    } catch (error) {
        console.error("Error fetching article:", error)
        return { success: false, error: "Failed to fetch article" }
    }
}

export async function getArticleById(id: string) {
    try {
        const article = await prisma.article.findUnique({
            where: { id }
        })
        return { success: true, data: article }
    } catch (error) {
        console.error("Error fetching article:", error)
        return { success: false, error: "Failed to fetch article" }
    }
}

export async function createArticle(data: ArticleInput) {
    try {
        const article = await prisma.article.create({
            data: {
                ...data,
                techStack: data.techStack as any // JSON casting
            }
        })
        revalidatePath('/dev-lab')
        revalidatePath('/admin/articles')
        return { success: true, data: article }
    } catch (error) {
        console.error("Error creating article:", error)
        return { success: false, error: "Failed to create article" }
    }
}

export async function updateArticle(id: string, data: Partial<ArticleInput>) {
    try {
        const article = await prisma.article.update({
            where: { id },
            data: {
                ...data,
                techStack: data.techStack as any
            }
        })
        revalidatePath('/dev-lab')
        revalidatePath(`/dev-lab/${article.slug}`)
        revalidatePath('/admin/articles')
        return { success: true, data: article }
    } catch (error) {
        console.error("Error updating article:", error)
        return { success: false, error: "Failed to update article" }
    }
}

// --- DevReport Actions ---

export async function getDevReports(publishedOnly = true) {
    try {
        const where = publishedOnly ? { isPublished: true } : {}
        const reports = await prisma.devReport.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        })
        return { success: true, data: reports }
    } catch (error) {
        console.error("Error fetching reports:", error)
        return { success: false, error: "Failed to fetch reports" }
    }
}

export async function createDevReport(data: DevReportInput) {
    try {
        const report = await prisma.devReport.create({
            data: {
                ...data,
                metrics: data.metrics as any
            }
        })
        revalidatePath('/dev-lab')
        return { success: true, data: report }
    } catch (error) {
        console.error("Error creating report:", error)
        return { success: false, error: "Failed to create report" }
    }
}

export async function getDevReportBySlug(slug: string) {
    try {
        const report = await prisma.devReport.findUnique({
            where: { slug }
        })
        return { success: true, data: report }
    } catch (error) {
        console.error("Error fetching report:", error)
        return { success: false, error: "Failed to fetch report" }
    }
}
