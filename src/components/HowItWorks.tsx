import { Brain, Users, MessageCircle, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: Brain,
      title: "Take the Quiz",
      description: "Answer 5 minutes of psychology-based questions about how you think, feel, and make decisions.",
      color: "bg-neural-purple"
    },
    {
      icon: Users,
      title: "Discover Your Type",
      description: "Get your unique cognitive profile based on proven psychological frameworks and research.",
      color: "bg-neural-blue"
    },
    {
      icon: Heart,
      title: "Find Your Matches",
      description: "See compatibility scores with people whose minds complement and understand yours.",
      color: "bg-primary"
    },
    {
      icon: MessageCircle,
      title: "Start Real Conversations",
      description: "Connect with conversation starters based on your shared thinking patterns and values.",
      color: "bg-accent"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From mind to match in four simple steps. No more endless swiping, no more surface-level connections.
          </p>
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

        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground">
            Ready to find someone who truly gets you?
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;