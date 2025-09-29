import { Brain } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cognitiveTypes } from "@/utils/cognitiveTypes";

const CognitiveTypes = () => {
  // Show first 8 types for the landing page display
  const displayTypes = cognitiveTypes.slice(0, 8);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Meet the Cognitive Types
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {displayTypes.map((type, index) => (
            <Card key={index} className="group p-8 hover:shadow-glow transition-all duration-500 bg-gradient-card border-0 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12 translate-x-8 -translate-y-8">
                <type.icon className="w-full h-full" />
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className={`${type.color} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <type.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {type.name}
                  </h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CognitiveTypes;