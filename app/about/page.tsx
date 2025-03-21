import TryNowButton from "@/components/try-now-button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8 dark:from-slate-950 dark:to-slate-900">
            <div className="mx-auto max-w-3xl">
                <Card className="border-none shadow-lg">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-center text-3xl font-bold">
                            About Todo App
                        </CardTitle>
                        <CardDescription className="text-center text-lg">
                            A beautiful and powerful task management application
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">
                                Welcome to Todo App
                            </h2>
                            <p className="text-muted-foreground">
                                Todo App is a modern task management application
                                built with Next.js and shadcn/ui. It provides a
                                clean and intuitive interface to help you
                                organize your tasks and boost your productivity.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">Features</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle2 className="text-primary mt-0.5 mr-2 h-5 w-5" />
                                    <span>
                                        Create, update, and delete tasks with
                                        ease
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="text-primary mt-0.5 mr-2 h-5 w-5" />
                                    <span>
                                        Mark tasks as complete or active
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="text-primary mt-0.5 mr-2 h-5 w-5" />
                                    <span>
                                        Set priority levels (low, medium, high)
                                        for your tasks
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="text-primary mt-0.5 mr-2 h-5 w-5" />
                                    <span>
                                        Filter tasks by status (all, active,
                                        completed)
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="text-primary mt-0.5 mr-2 h-5 w-5" />
                                    <span>
                                        Sort tasks by date, priority, or
                                        alphabetically
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="text-primary mt-0.5 mr-2 h-5 w-5" />
                                    <span>Search tasks by title</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="text-primary mt-0.5 mr-2 h-5 w-5" />
                                    <span>
                                        View detailed information about each
                                        task
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="text-primary mt-0.5 mr-2 h-5 w-5" />
                                    <span>
                                        Responsive design that works on all
                                        devices
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">
                                Technology Stack
                            </h3>
                            <p className="text-muted-foreground">
                                This application is built with modern web
                                technologies:
                            </p>
                            <ul className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                                <li className="bg-primary/10 flex items-center rounded-md p-2">
                                    <span className="font-medium">Next.js</span>
                                </li>
                                <li className="bg-primary/10 flex items-center rounded-md p-2">
                                    <span className="font-medium">React</span>
                                </li>
                                <li className="bg-primary/10 flex items-center rounded-md p-2">
                                    <span className="font-medium">
                                        TypeScript
                                    </span>
                                </li>
                                <li className="bg-primary/10 flex items-center rounded-md p-2">
                                    <span className="font-medium">
                                        Tailwind CSS
                                    </span>
                                </li>
                                <li className="bg-primary/10 flex items-center rounded-md p-2">
                                    <span className="font-medium">
                                        shadcn/ui
                                    </span>
                                </li>
                                <li className="bg-primary/10 flex items-center rounded-md p-2">
                                    <span className="font-medium">Prisma</span>
                                </li>
                                <li className="bg-primary/10 flex items-center rounded-md p-2">
                                    <span className="font-medium">
                                        PostgreSQL
                                    </span>
                                </li>
                                <li className="bg-primary/10 flex items-center rounded-md p-2">
                                    <span className="font-medium">Vercel</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">
                                How to Use
                            </h3>
                            <ol className="text-muted-foreground list-inside list-decimal space-y-2">
                                <li>
                                    <span className="text-foreground font-medium">
                                        Add a task:
                                    </span>{" "}
                                    Type your task in the input field and press
                                    Enter or click the plus button.
                                </li>
                                <li>
                                    <span className="text-foreground font-medium">
                                        Complete a task:
                                    </span>{" "}
                                    Click the checkbox next to a task to mark it
                                    as complete.
                                </li>
                                <li>
                                    <span className="text-foreground font-medium">
                                        Set priority:
                                    </span>{" "}
                                    Click on the priority button to open a
                                    dropdown and select a priority level.
                                </li>
                                <li>
                                    <span className="text-foreground font-medium">
                                        Filter tasks:
                                    </span>{" "}
                                    Use the filter buttons to show all, active,
                                    or completed tasks.
                                </li>
                                <li>
                                    <span className="text-foreground font-medium">
                                        Sort tasks:
                                    </span>{" "}
                                    Click on the sort button to choose how to
                                    sort your tasks.
                                </li>
                                <li>
                                    <span className="text-foreground font-medium">
                                        Search tasks:
                                    </span>{" "}
                                    Type in the search field to find specific
                                    tasks.
                                </li>
                                <li>
                                    <span className="text-foreground font-medium">
                                        View details:
                                    </span>{" "}
                                    Click the info icon to see more details
                                    about a task.
                                </li>
                                <li>
                                    <span className="text-foreground font-medium">
                                        Delete a task:
                                    </span>{" "}
                                    Click the trash icon to remove a task
                                    (confirmation required).
                                </li>
                            </ol>
                        </div>

                        <div className="flex w-full justify-center">
                            <TryNowButton />
                        </div>
                        <div className="border-t pt-4">
                            <p className="text-muted-foreground text-center text-sm">
                                &copy; {new Date().getFullYear()} Todo App. All
                                rights reserved.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
