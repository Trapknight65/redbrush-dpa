'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

// Define explicit types matching our JSON structure for better type safety in frontend
export interface Experience {
    title: string
    company: string
    period: string
    description: string
    logo?: string
    location?: string
}

export interface Education {
    title: string
    institution: string
    year: string
}

export interface Certification {
    title: string
    issuer: string
    date: string
}

export interface HeroSlide {
    type: 'image' | 'video' | '3d'
    url?: string
    component?: string
    alt?: string
}

export interface Language {
    language: string
    proficiency: string
}

export async function getProfile() {
    try {
        const profile = await prisma.profile.findFirst()
        return { success: true, data: profile }
    } catch (error) {
        console.error('getProfile error:', error)
        return { success: false, error: 'Failed to fetch profile' }
    }
}

export async function updateProfile(data: Prisma.ProfileCreateInput) {
    try {
        // Check if profile exists
        const existing = await prisma.profile.findFirst()

        let profile
        if (existing) {
            profile = await prisma.profile.update({
                where: { id: existing.id },
                data: {
                    name: data.name,
                    headline: data.headline,
                    bio: data.bio,
                    avatar: data.avatar,
                    skills: data.skills,
                    experiences: data.experiences,
                    education: data.education,
                    certifications: data.certifications,
                    languages: data.languages,
                    heroSlides: data.heroSlides
                }
            })
        } else {
            profile = await prisma.profile.create({
                data: {
                    name: data.name,
                    headline: data.headline,
                    bio: data.bio,
                    avatar: data.avatar,
                    skills: data.skills,
                    experiences: data.experiences || [],
                    education: data.education || [],
                    certifications: data.certifications || [],
                    languages: data.languages || [],
                    heroSlides: data.heroSlides || []
                }
            })
        }

        revalidatePath('/about')
        revalidatePath('/admin/about')
        return { success: true, data: profile }
    } catch (error) {
        console.error('updateProfile error:', error)
        return { success: false, error: 'Failed to update profile' }
    }
}
