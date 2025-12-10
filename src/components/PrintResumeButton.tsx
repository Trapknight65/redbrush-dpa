"use client";

import { Printer } from "lucide-react";
import Button from "@/components/ui/Button";

export default function PrintResumeButton() {
    return (
        <Button
            variant="secondary"
            onClick={() => window.print()}
            className="fixed bottom-4 left-4 z-50 shadow-lg print:hidden flex items-center gap-1.5 bg-crimson-red text-white hover:bg-red-700 border-none text-xs px-3 py-2"
        >
            <Printer size={16} />
            Download Resume
        </Button>
    );
}
