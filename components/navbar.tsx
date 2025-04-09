"use client";

import { Button } from "@/components/ui/button";
import { CheckSquare, FlaskConical, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";

export function Navbar() {
    const pathname = usePathname();

    return (
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div className="container mx-auto flex h-14 items-center px-4">
                <div className="mr-4 flex">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/turbo-light.svg"
                            alt="Vercel Logo"
                            width={22}
                            height={22}
                            className="dark:invert"
                        />
                        <span className="hidden font-bold sm:inline-block">
                            Todo App
                        </span>
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-end space-x-2">
                    <nav className="flex items-center gap-x-2">
                        <Link href="/" passHref>
                            <Button
                                variant={pathname === "/" ? "default" : "ghost"}
                                size="sm"
                                className="text-sm"
                            >
                                <CheckSquare className="mr-2 h-4 w-4" />
                                Tasks
                            </Button>
                        </Link>
                        <Link href="/about" passHref>
                            <Button
                                variant={
                                    pathname === "/about" ? "default" : "ghost"
                                }
                                size="sm"
                                className="text-sm"
                            >
                                <Info className="mr-2 h-4 w-4" />
                                About
                            </Button>
                        </Link>
                        <Link href="/test" passHref>
                            <Button
                                variant={
                                    pathname === "/test" ? "default" : "ghost"
                                }
                                size="sm"
                                className="text-sm"
                            >
                                <FlaskConical className="mr-2 h-4 w-4" />
                                Test
                            </Button>
                        </Link>
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    );
}
