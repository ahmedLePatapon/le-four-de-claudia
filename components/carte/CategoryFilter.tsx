"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  const all = ["Toutes", ...categories];

  return (
    <div className="sticky top-16 z-40 bg-creme/95 dark:bg-charbon/95 backdrop-blur-md border-b border-charbon/10 dark:border-creme/10 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
          {all.map((cat) => {
            const isActive = selected === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelect(cat)}
                className={cn(
                  "shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap border",
                  isActive
                    ? "bg-rouge-tomate text-white border-rouge-tomate shadow-md shadow-rouge-tomate/20"
                    : "bg-transparent text-charbon/70 dark:text-creme/70 border-charbon/20 dark:border-creme/20 hover:bg-rouge-tomate/10 hover:border-rouge-tomate/30 hover:text-charbon dark:hover:text-creme"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
