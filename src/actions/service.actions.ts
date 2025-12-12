'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getServices() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { order: 'asc' },
        });
        return { success: true, data: services };
    } catch (error) {
        console.error('Failed to fetch services:', error);
        return { success: false, error: 'Failed to fetch services' };
    }
}

export async function createService(data: {
    title: string;
    description: string;
    icon: string;
    price?: string;
    features: string[];
    order?: number;
}) {
    try {
        const service = await prisma.service.create({
            data: {
                ...data,
                order: data.order ?? 0
            },
        });
        revalidatePath('/services');
        revalidatePath('/admin/services');
        return { success: true, data: service };
    } catch (error) {
        console.error('Failed to create service:', error);
        return { success: false, error: 'Failed to create service' };
    }
}

export async function updateService(id: string, data: {
    title?: string;
    description?: string;
    icon?: string;
    price?: string;
    features?: string[];
    order?: number;
}) {
    try {
        const service = await prisma.service.update({
            where: { id },
            data,
        });
        revalidatePath('/services');
        revalidatePath('/admin/services');
        return { success: true, data: service };
    } catch (error) {
        console.error('Failed to update service:', error);
        return { success: false, error: 'Failed to update service' };
    }
}

export async function deleteService(id: string) {
    try {
        await prisma.service.delete({
            where: { id },
        });
        revalidatePath('/services');
        revalidatePath('/admin/services');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete service:', error);
        return { success: false, error: 'Failed to delete service' };
    }
}

// Seed function to be called manually or via script if needed
export async function seedInitialServices() {
    const initialServices = [
        {
            title: "Custom Web Development",
            description: "Tailored websites built with modern technologies like React, Next.js, and Node.js.",
            icon: "Code",
            features: ["Responsive Design", "SEO Optimized", "CMS Integration", "Performance Tuning"],
        },
        {
            title: "UI/UX Design",
            description: "User-centric design solutions that enhance engagement and usability.",
            icon: "Palette",
            features: ["Wireframing", "Prototyping", "User Research", "Brand Identity"],
        },
        {
            title: "Mobile App Development",
            description: "Native and cross-platform mobile applications for iOS and Android.",
            icon: "Smartphone",
            features: ["React Native", "Flutter", "App Store Deployment", "Push Notifications"],
        }
    ];

    try {
        for (const service of initialServices) {
            await prisma.service.create({ data: service });
        }
        revalidatePath('/services');
        return { success: true, message: "Services seeded" };
    } catch (error) {
        console.error("Seed error", error);
        return { success: false, error: "Seed failed" };
    }
}
