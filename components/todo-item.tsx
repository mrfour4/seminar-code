"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AlertTriangle, ArrowDown, Check, Trash2 } from "lucide-react";
import type { Todo } from "./todo-app";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onPriorityChange: (id: string, priority: "low" | "medium" | "high") => void;
}

export function TodoItem({
    todo,
    onToggle,
    onDelete,
    onPriorityChange,
}: TodoItemProps) {
    const priorityColors = {
        low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };

    const priorityIcons = {
        low: <ArrowDown className="h-3 w-3" />,
        medium: <Check className="h-3 w-3" />,
        high: <AlertTriangle className="h-3 w-3" />,
    };

    return (
        <div
            className={cn(
                "group flex items-center justify-between rounded-lg p-3 transition-all",
                "bg-card hover:bg-accent/50",
                "border-border border",
            )}
        >
            <div className="flex items-center gap-3">
                <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => onToggle(todo.id)}
                />

                <div className="flex flex-col">
                    <label
                        htmlFor={`todo-${todo.id}`}
                        className={cn(
                            "cursor-pointer text-sm font-medium transition-all",
                            todo.completed &&
                                "text-muted-foreground line-through",
                        )}
                    >
                        {todo.text}
                    </label>
                    <span className="text-muted-foreground text-xs">
                        {new Date(todo.createdAt).toLocaleDateString()}{" "}
                        {new Date(todo.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                                "flex h-6 items-center gap-1 px-2 text-xs",
                                priorityColors[todo.priority],
                            )}
                        >
                            {priorityIcons[todo.priority]}
                            {todo.priority}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => onPriorityChange(todo.id, "low")}
                        >
                            <ArrowDown className="mr-2 h-4 w-4" />
                            Low
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onPriorityChange(todo.id, "medium")}
                        >
                            <Check className="mr-2 h-4 w-4" />
                            Medium
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onPriorityChange(todo.id, "high")}
                        >
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            High
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(todo.id)}
                    className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                >
                    <Trash2 className="text-muted-foreground h-4 w-4" />
                    <span className="sr-only">Delete</span>
                </Button>
            </div>
        </div>
    );
}
