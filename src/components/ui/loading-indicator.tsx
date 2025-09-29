import { Loader2 } from "lucide-react";

interface LoadingIndicatorProps {
  message: string;
  className?: string;
}

export const LoadingIndicator = ({ message, className = "" }: LoadingIndicatorProps) => {
  return (
    <div className={`flex items-center gap-2 text-muted-foreground ${className}`}>
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>{message}</span>
    </div>
  );
};