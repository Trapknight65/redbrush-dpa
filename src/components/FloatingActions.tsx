"use client";

import { Printer, Phone } from "lucide-react";
import Button from "@/components/ui/Button";

export default function FloatingActions() {
    return (
        <div className="fixed bottom-4 left-4 z-50 flex flex-col-reverse gap-3 print:hidden">
            {/* Download Resume Button */}
            <Button
                variant="secondary"
                onClick={() => window.print()}
                className="shadow-lg flex items-center gap-1.5 bg-crimson-red text-white hover:bg-red-700 border-none text-xs px-3 py-2"
            >
                <Printer size={16} />
                Download Resume
            </Button>

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/351933019265"
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-lg flex items-center justify-center gap-1.5 bg-green-500 text-white hover:bg-green-600 border-none text-xs px-3 py-2 rounded-full font-medium transition-colors"
                aria-label="Contact on WhatsApp"
            >
                <Phone size={16} />
                WhatsApp Call
            </a>
        </div>
    );
}
