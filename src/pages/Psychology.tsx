import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResultCard } from "@/components/ui/result-card";
import { Brain, Heart, Users, Lightbulb, ArrowLeft, CheckCircle, TrendingUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Psychology = () => {
  const psychologyFacts = [
    {
      icon: Brain,
      title: "Cognitive Compatibility",
      description: "Research by Dr. John Gottman shows that couples who think similarly have 67% higher relationship satisfaction and communicate 3x more effectively.",
      stat: "67% Higher Satisfaction"
    },
    {
      icon: Heart,
      title: "Emotional Synchrony",
      description: "When partners share similar emotional processing patterns, their stress hormones (cortisol) synchronize, leading to better mental health outcomes.",
      stat: "40% Less Stress"
    },
    {
      icon: Users,
      title: "Decision-Making Harmony",
      description: "Couples with compatible decision-making styles report 82% fewer conflicts and make major life decisions 50% faster together.",
      stat: "82% Fewer Conflicts"
    }
  ];

  const happinessFactors = [
    {
      title: "Shared Mental Models",
      description: "When you understand how your partner thinks, you can anticipate their needs and respond with empathy.",
      benefit: "Deeper intimacy and connection"
    },
    {
      title: "Effortless Communication",
      description: "Compatible cognitive styles mean less miscommunication and more meaningful conversations.",
      benefit: "Reduced relationship friction"
    },
    {
      title: "Aligned Life Goals",
      description: "Similar thinking patterns often lead to naturally aligned values and life aspirations.",
      benefit: "Stronger long-term compatibility"
    },
    {
      title: "Complementary Strengths",
      description: "The right cognitive match means your weaknesses are their strengths, creating perfect balance.",
      benefit: "Mutual growth and support"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-4 h-4 bg-neural-pink rounded-full animate-float opacity-60"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-neural-blue rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-20 w-5 h-5 bg-neural-purple rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              The Psychology of 
              <span className="block bg-gradient-accent bg-clip-text text-transparent">
                Perfect Partnerships
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed max-w-3xl mx-auto">
              Why finding someone who thinks like you is the secret to lasting happiness and deep fulfillment in relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-20">
            <ResultCard variant="accent" className="text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Lightbulb className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold text-foreground">The Science of Connection</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                For decades, psychologists have studied what makes relationships thrive. The answer isn't about finding someone who looks perfect or shares your hobbies. 
                It's about finding someone whose mind naturally harmonizes with yours—creating a foundation for genuine understanding, effortless communication, and lasting happiness.
              </p>
            </ResultCard>
          </div>

          {/* Research-Backed Facts */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              What Research Reveals
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Scientific studies consistently show that cognitive compatibility is the strongest predictor of relationship success.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {psychologyFacts.map((fact, index) => (
                <ResultCard key={index} variant="primary" className="text-center group hover:shadow-card transition-all duration-300 hover:-translate-y-2">
                  <div className="bg-primary p-4 rounded-2xl inline-flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <fact.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <div className="text-3xl font-bold text-primary mb-2">{fact.stat}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{fact.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{fact.description}</p>
                </ResultCard>
              ))}
            </div>
          </div>

          {/* The Happiness Connection */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Why Cognitive Compatibility Creates Happiness
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {happinessFactors.map((factor, index) => (
                <ResultCard key={index} variant="secondary" className="group hover:shadow-card transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary p-2 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">{factor.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{factor.description}</p>
                      <div className="flex items-center gap-2 text-secondary">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-medium text-sm">{factor.benefit}</span>
                      </div>
                    </div>
                  </div>
                </ResultCard>
              ))}
            </div>
          </div>

          {/* The Problem with Traditional Dating */}
          <div className="mb-20">
            <ResultCard variant="base" className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-6">
                Why Traditional Dating Falls Short
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">The Surface-Level Problem</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Most dating platforms focus on physical attraction, shared interests, or demographic compatibility. 
                    While these factors matter, they don't predict long-term relationship satisfaction.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    You might love the same movies, but if you process emotions differently or make decisions in conflicting ways, 
                    those surface similarities won't sustain a deep, fulfilling relationship.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                    <div className="text-destructive font-medium mb-2">❌ Traditional Approach</div>
                    <div className="text-sm text-muted-foreground">Focuses on: Looks, hobbies, location, age</div>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <div className="text-primary font-medium mb-2">✅ MindMatch Approach</div>
                    <div className="text-sm text-muted-foreground">Focuses on: Thinking patterns, decision-making, emotional processing</div>
                  </div>
                </div>
              </div>
            </ResultCard>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <ResultCard variant="superpower" className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Ready to Find Your Perfect Mental Match?</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Don't leave your happiness to chance. Discover your cognitive profile and connect with someone whose mind naturally complements yours.
              </p>
              <Link to="/">
                <Button size="lg" className="group shadow-glow hover:shadow-xl transition-all duration-300">
                  <span className="mr-2">Start Your Journey</span>
                  <div className="flex items-center gap-1">
                    <Brain className="w-4 h-4" />
                    <Heart className="w-4 h-4 group-hover:animate-pulse" />
                  </div>
                </Button>
              </Link>
            </ResultCard>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Psychology;