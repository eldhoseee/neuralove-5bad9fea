import { Brain, Heart, Lightbulb, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PsychologyNav = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navButtons = [
    {
      id: "science-section",
      label: "Why MindMatch Works",
      icon: Lightbulb,
      variant: "ghost" as const,
    },
    {
      id: "research-section",
      label: "What Science Says",
      icon: Brain,
      variant: "ghost" as const,
    },
    {
      id: "happiness-section",
      label: "The Happiness Secret",
      icon: Heart,
      variant: "ghost" as const,
    },
    {
      id: "problem-section",
      label: "Why Dating Apps Fail",
      icon: AlertCircle,
      variant: "ghost" as const,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {navButtons.map((btn) => (
            <Button
              key={btn.id}
              variant={btn.variant}
              size="sm"
              onClick={() => scrollToSection(btn.id)}
              className="group hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:shadow-glow"
            >
              <btn.icon className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              <span className="text-sm font-medium">{btn.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default PsychologyNav;
