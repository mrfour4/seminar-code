"use client";

import type React from "react";

import {
    addTodo,
    deleteTodo,
    getTodos,
    toggleTodo,
    updatePriority,
    type TodoPriority,
} from "@/app/actions";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { TodoFilter } from "@/components/todo-filter";
import { TodoItem } from "@/components/todo-item";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, Loader2, PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export type Todo = {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
    priority: TodoPriority;
};

export type FilterType = "all" | "active" | "completed";
export type SortType = "newest" | "oldest" | "priority" | "alphabetical";

export function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [filter, setFilter] = useState<FilterType>("all");
    const [sort, setSort] = useState<SortType>("newest");
    const [searchTerm, setSearchTerm] = useState("");
    const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch todos on component mount
    useEffect(() => {
        const fetchTodos = async () => {
            setIsLoading(true);
            try {
                const data = await getTodos();
                setTodos(data);
            } catch (error) {
                console.error("Failed to fetch todos:", error);
                toast.error("Failed to load your tasks. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTodos();
    }, []);

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodo.trim() === "") return;

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("text", newTodo);

        try {
            const result = await addTodo(formData);

            if (result.error) {
                toast.error(result.error);
            } else {
                setNewTodo("");
                // Refresh todos
                const updatedTodos = await getTodos();
                setTodos(updatedTodos);

                toast.success("Task added successfully");

                // Focus the input after adding a todo
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }
        } catch (error) {
            toast.error("Failed to add task. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToggleTodo = async (id: string) => {
        // Find the todo to toggle
        const todoToToggle = todos.find((t) => t.id === id);
        if (!todoToToggle) return;

        // Apply optimistic update
        const newCompletedState = !todoToToggle.completed;
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: newCompletedState }
                    : todo,
            ),
        );

        // Show toast based on the new state
        toast.success(
            newCompletedState ? "Task completed" : "Task marked as active",
        );

        try {
            // Make the actual API call
            await toggleTodo(id);
        } catch (error) {
            // Revert the optimistic update if the API call fails
            setTodos(
                todos.map((todo) =>
                    todo.id === id
                        ? { ...todo, completed: todoToToggle.completed }
                        : todo,
                ),
            );
            toast.error("Failed to update task. Please try again.");
        }
    };

    const confirmDelete = (id: string) => {
        setTodoToDelete(id);
    };

    const handleDeleteTodo = async () => {
        if (!todoToDelete || isDeleting) return;

        // Set deleting state to prevent multiple clicks
        setIsDeleting(true);

        // Store the todos before deletion for potential rollback
        const previousTodos = [...todos];
        const todoToRemove = todos.find((t) => t.id === todoToDelete);

        try {
            // Make the API call first, before updating UI
            await deleteTodo(todoToDelete);

            // Update UI after successful API call
            setTodos(todos.filter((todo) => todo.id !== todoToDelete));
            toast.success("Task removed successfully");

            // Close the dialog after successful deletion
            setTodoToDelete(null);
        } catch (error) {
            toast.error("Failed to delete task. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    const cancelDelete = () => {
        setTodoToDelete(null);
    };

    const handleUpdatePriority = async (id: string, priority: TodoPriority) => {
        // Find the todo to update
        const todoToUpdate = todos.find((t) => t.id === id);
        if (!todoToUpdate) return;

        // Store the original priority for potential rollback
        const originalPriority = todoToUpdate.priority;

        // Apply optimistic update
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, priority } : todo,
            ),
        );

        try {
            await updatePriority(id, priority);
            toast.success(`Priority updated to ${priority}`);
        } catch (error) {
            // Rollback if the API call fails
            setTodos(
                todos.map((todo) =>
                    todo.id === id
                        ? { ...todo, priority: originalPriority }
                        : todo,
                ),
            );
            toast.error("Failed to update priority. Please try again.");
        }
    };

    // Filter todos
    const filteredTodos = todos.filter((todo) => {
        // Filter by status
        const statusMatch =
            filter === "all"
                ? true
                : filter === "active"
                  ? !todo.completed
                  : todo.completed;

        // Filter by search term
        const searchMatch = todo.text
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return statusMatch && searchMatch;
    });

    // Sort todos
    const sortedTodos = [...filteredTodos].sort((a, b) => {
        if (sort === "newest")
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
        if (sort === "oldest")
            return (
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            );
        if (sort === "alphabetical") return a.text.localeCompare(b.text);
        if (sort === "priority") {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return 0;
    });

    const activeTodosCount = todos.filter((todo) => !todo.completed).length;

    return (
        <Card className="border-none shadow-lg">
            <CardHeader className="pb-3">
                <CardTitle className="text-center text-2xl font-bold">
                    My Tasks
                </CardTitle>
                <CardDescription className="text-center">
                    Organize your day, boost your productivity
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleAddTodo} className="flex space-x-2">
                    <Input
                        ref={inputRef}
                        placeholder="Add a new task..."
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        className="flex-1"
                        disabled={isSubmitting}
                    />
                    <Button type="submit" size="icon" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <PlusCircle className="h-5 w-5" />
                        )}
                        <span className="sr-only">Add task</span>
                    </Button>
                </form>

                <div className="space-y-2">
                    <Input
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                    />
                </div>

                <TodoFilter
                    currentFilter={filter}
                    onFilterChange={setFilter}
                    currentSort={sort}
                    onSortChange={setSort}
                />

                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="text-primary h-8 w-8 animate-spin" />
                    </div>
                ) : sortedTodos.length > 0 ? (
                    <ScrollArea className="h-[250px] rounded-md">
                        <div className="space-y-2 pr-4">
                            {sortedTodos.map((todo) => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    onToggle={handleToggleTodo}
                                    onDelete={confirmDelete}
                                    onPriorityChange={handleUpdatePriority}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <div className="text-muted-foreground py-6 text-center">
                        {searchTerm
                            ? "No matching tasks found"
                            : filter === "all"
                              ? "Add your first task to get started!"
                              : filter === "active"
                                ? "No active tasks"
                                : "No completed tasks"}
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <p>
                        {activeTodosCount}{" "}
                        {activeTodosCount === 1 ? "task" : "tasks"} remaining
                    </p>
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <p>{new Date().toLocaleDateString()}</p>
                </div>
            </CardFooter>

            <DeleteConfirmDialog
                isOpen={!!todoToDelete}
                onConfirm={handleDeleteTodo}
                onCancel={cancelDelete}
                isDeleting={isDeleting}
            />
        </Card>
    );
}
