import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface ResultCardProps {
  children: ReactNode;
  variant?: "base" | "primary" | "accent" | "secondary" | "superpower";
  className?: string;
}

export const ResultCard = ({ children, variant = "base", className = "" }: ResultCardProps) => {
  const variantClass = `result-card-${variant}`;
  
  return (
    <Card className={`p-6 ${variantClass} ${className}`}>
      {children}
    </Card>
  );
};