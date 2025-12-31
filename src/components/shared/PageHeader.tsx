import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export const PageHeader = ({ title, description, children, className }: PageHeaderProps) => {
  return (
    <div className={cn("flex-shrink-0 bg-background", className)}>
      <div className="px-6 h-16 flex items-center border-b w-full">
        <div className="flex items-center justify-between w-full">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl text-foreground font-semibold truncate">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-muted-foreground mt-0.5 truncate">
                {description}
              </p>
            )}
          </div>
          {children && (
            <div className="flex items-center gap-2 flex-shrink-0 ml-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
