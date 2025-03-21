"use server";

import prisma from "@/lib/prisma";
import { Priority } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type TodoPriority = "low" | "medium" | "high";

const mapPriority = (priority: TodoPriority): Priority => {
    switch (priority) {
        case "low":
            return Priority.LOW;
        case "high":
            return Priority.HIGH;
        default:
            return Priority.MEDIUM;
    }
};

const mapPriorityToString = (priority: Priority): TodoPriority => {
    switch (priority) {
        case Priority.LOW:
            return "low";
        case Priority.HIGH:
            return "high";
        default:
            return "medium";
    }
};

export async function getTodos() {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: { createdAt: "desc" },
        });

        return todos.map((todo) => ({
            ...todo,
            priority: mapPriorityToString(todo.priority),
        }));
    } catch (error) {
        console.error("Failed to fetch todos:", error);
        return [];
    }
}

export async function addTodo(formData: FormData) {
    const text = formData.get("text") as string;

    if (!text?.trim()) {
        return { error: "Text is required" };
    }

    try {
        await prisma.todo.create({
            data: {
                text,
            },
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to add todo:", error);
        return { error: "Failed to add todo" };
    }
}

export async function toggleTodo(id: string) {
    try {
        const todo = await prisma.todo.findUnique({ where: { id } });

        if (!todo) {
            return { error: "Todo not found" };
        }

        await prisma.todo.update({
            where: { id },
            data: { completed: !todo.completed },
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to toggle todo:", error);
        return { error: "Failed to update todo" };
    }
}

export async function deleteTodo(id: string) {
    try {
        await prisma.todo.delete({ where: { id } });
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete todo:", error);
        return { error: "Failed to delete todo" };
    }
}

export async function updatePriority(id: string, priority: TodoPriority) {
    try {
        await prisma.todo.update({
            where: { id },
            data: { priority: mapPriority(priority) },
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to update priority:", error);
        return { error: "Failed to update priority" };
    }
}
