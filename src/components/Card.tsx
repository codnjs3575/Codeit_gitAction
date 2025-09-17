import React from "react";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "outlined" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  className?: string;
}

export default function Card({
  children,
  variant = "default",
  padding = "md",
  radius = "md",
  className,
}: CardProps) {
  // Implementation will go here
  const classStyles = clsx(
    "overflow-hidden transition",
    // padding styles
    {
      "p-0": padding === "none",
      "p-3": padding === "sm",
      "p-5": padding === "md",
      "p-8": padding === "lg",
    },
    // radius styles
    {
      "rounded-none": radius === "none",
      "rounded-sm": radius === "sm",
      "rounded-md": radius === "md",
      "rounded-lg": radius === "lg",
      "rounded-full": radius === "full",
    },

    // variant styles
    {
      "bg-white border border-gray-200": variant === "default",
      "bg-white border border-gray-400 hover:border-gray-600 transition-colors":
        variant === "outlined",
      "bg-white shadow-md hover:shadow-lg": variant === "elevated",
    },
    className,
  );
  return <div className={classStyles}>{children}</div>;
}
