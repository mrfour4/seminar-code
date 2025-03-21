"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AlertTriangle, ArrowUpDown, Calendar, SortAsc } from "lucide-react";
import type { FilterType, SortType } from "./todo-app";

interface TodoFilterProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    currentSort: SortType;
    onSortChange: (sort: SortType) => void;
}

export function TodoFilter({
    currentFilter,
    onFilterChange,
    currentSort,
    onSortChange,
}: TodoFilterProps) {
    const filters: { value: FilterType; label: string }[] = [
        { value: "all", label: "All" },
        { value: "active", label: "Active" },
        { value: "completed", label: "Completed" },
    ];

    const getSortLabel = (sort: SortType) => {
        switch (sort) {
            case "newest":
                return "Newest First";
            case "oldest":
                return "Oldest First";
            case "alphabetical":
                return "Alphabetical";
            case "priority":
                return "Priority";
            default:
                return "Sort";
        }
    };

    return (
        <div className="flex flex-wrap gap-2 justify-between">
            <div className="flex space-x-1">
                {filters.map((filter) => (
                    <Button
                        key={filter.value}
                        variant="outline"
                        size="sm"
                        onClick={() => onFilterChange(filter.value)}
                        className={cn(
                            "text-xs h-8",
                            currentFilter === filter.value &&
                                "bg-primary/10 text-primary"
                        )}
                    >
                        {filter.label}
                    </Button>
                ))}
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs h-8">
                        <ArrowUpDown className="h-3 w-3 mr-2" />
                        {getSortLabel(currentSort)}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onSortChange("newest")}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Newest First
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onSortChange("oldest")}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Oldest First
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onSortChange("alphabetical")}
                    >
                        <SortAsc className="h-4 w-4 mr-2" />
                        Alphabetical
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onSortChange("priority")}>
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Priority
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
