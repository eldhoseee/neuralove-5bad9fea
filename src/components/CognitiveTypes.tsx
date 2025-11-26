import { useState } from "react";
import { Brain } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cognitiveTypes } from "@/utils/cognitiveTypes";

const CognitiveTypes = () => {
  const [showAll, setShowAll] = useState(false);
  
  // Show first 4 types initially, or all 12 when expanded
  const displayTypes = showAll ? cognitiveTypes : cognitiveTypes.slice(0, 4);

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Meet the Cognitive Types
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {showAll 
              ? "All 12 unique cognitive types — each with its own strengths and compatibility patterns"
              : "Discover the 4 most common personality types — find yours in our 5-minute quiz"
            }
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto mb-8 md:mb-12">
          {displayTypes.map((type, index) => (
            <Card 
              key={index} 
              className="group p-5 md:p-8 hover:shadow-glow transition-all duration-500 bg-gradient-card border-0 relative overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 opacity-5 transform rotate-12 translate-x-8 -translate-y-8">
                <type.icon className="w-full h-full" />
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`${type.color} p-3 md:p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <type.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-foreground">
                    {type.name}
                  </h3>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA to discover all types */}
        <div className="text-center">
          {!showAll && (
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              And 8 more unique cognitive profiles waiting to be discovered
            </p>
          )}
          <button 
            onClick={() => setShowAll(!showAll)}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-glow text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="font-medium">
              {showAll ? "Show Less" : "Discover All 12 Types"}
            </span>
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-90' : 'group-hover:translate-x-1'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAll ? "M19 9l-7 7-7-7" : "M17 8l4 4m0 0l-4 4m4-4H3"} />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CognitiveTypes;