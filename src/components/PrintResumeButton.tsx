"use client";

import { Printer } from "lucide-react";
import Button from "@/components/ui/Button";

export default function PrintResumeButton() {
    return (
        <Button
            variant="secondary"
            onClick={() => window.print()}
            className="fixed bottom-8 right-8 z-50 shadow-lg print:hidden flex items-center gap-2 bg-crimson-red text-white hover:bg-red-700 border-none"
        >
            <Printer size={20} />
            Download Resume
        </Button>
    );
}
