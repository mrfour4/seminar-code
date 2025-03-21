"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TryNowButton() {
    const [isHovering, setIsHovering] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        router.push("/api/redirect");
    };

    return (
        <Button
            onClick={handleClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group relative transform cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-violet-500 hover:to-indigo-500 hover:shadow-xl"
        >
            <span className="flex items-center gap-2">
                Try Now
                <ArrowRight
                    className={`transition-transform duration-300 ${isHovering ? "translate-x-1" : ""}`}
                    size={18}
                />
            </span>
            <span className="absolute inset-0 h-full w-full origin-left scale-x-0 rounded-full bg-white/10 transition-transform group-hover:scale-x-100" />
        </Button>
    );
}
