"use client";

import dynamic from "next/dynamic";

const SplashingParticles = dynamic(() => import("@/components/SplashingParticles"), { ssr: false });
const LogPose = dynamic(() => import("@/components/ui/LogPose"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });

export default function EffectsWrapper() {
    return (
        <>
            <CustomCursor />
            <SplashingParticles />
            <LogPose />
        </>
    );
}
