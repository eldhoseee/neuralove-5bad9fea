import { Brain, Users, MessageCircle, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: Brain,
      title: "Take the Cognitive Quiz",
      description: "Answer psychology-based questions about how you think, solve problems, and process emotions. Our 5-minute assessment reveals your unique cognitive profile.",
      color: "bg-neural-purple"
    },
    {
      icon: Users,
      title: "Get Your Mind Type",
      description: "Discover your cognitive personality - whether you're a Strategic Visionary, Empathetic Connector, or one of 8 other scientifically-backed thinking patterns.",
      color: "bg-neural-blue"
    },
    {
      icon: Heart,
      title: "Find Compatible Minds",
      description: "See people whose thinking styles create natural chemistry with yours. No more guessing - we show you why you'll click mentally and emotionally.",
      color: "bg-primary"
    },
    {
      icon: MessageCircle,
      title: "Connect with Purpose",
      description: "Start conversations with personalized icebreakers based on your shared values, interests, and communication styles. Real depth from day one.",
      color: "bg-accent"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How MindMatch Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Traditional dating apps focus on what you look like. We focus on how you think. 
            MindMatch uses psychology-based profiling to connect people whose minds naturally click together.
          </p>
          <div className="bg-muted/30 rounded-2xl p-6 max-w-4xl mx-auto">
            <p className="text-lg text-foreground font-medium mb-4">
              💡 The Big Idea
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Ever met someone and felt like they "just get you"? That's cognitive compatibility in action. 
              We help you find people who process information, make decisions, and view the world in ways that complement your own thinking style. 
              The result? Deeper conversations, stronger connections, and relationships built on genuine mental harmony.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative p-8 text-center group hover:shadow-card transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0">
              {/* Step number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>

              {/* Icon */}
              <div className={`${step.color} p-4 rounded-2xl inline-flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-8 h-8 text-background" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Connecting line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-border"></div>
              )}
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;