import { Shield, Zap, Target, Sparkles, ArrowRight, Brain, Heart, Users, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Features = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Shield,
      title: "Psychology-Backed Matching",
      description: "Our algorithm is built on decades of research in cognitive psychology and relationship science, ensuring matches that truly understand each other.",
      highlight: "Science-based",
      stats: "94% accuracy",
      color: "from-neural-blue to-neural-purple",
      benefits: ["Research-proven methods", "Academic partnerships", "Validated frameworks"],
      interactive: "🧠 Based on 50+ psychological studies"
    },
    {
      icon: Zap,
      title: "Quick 5-Minute Quiz",
      description: "Get deep insights without the time commitment. Our quiz is designed to be both fast and incredibly accurate using adaptive questioning.",
      highlight: "Lightning fast",
      stats: "5min average",
      color: "from-neural-purple to-neural-pink",
      benefits: ["Adaptive questions", "Smart algorithms", "Instant results"],
      interactive: "⚡ 24 intelligent questions"
    },
    {
      icon: Target,
      title: "Precision Compatibility",
      description: "See exactly how compatible you are with potential matches across thinking styles, values, communication patterns, and life goals.",
      highlight: "Highly accurate",
      stats: "89% success",
      color: "from-neural-pink to-neural-blue",
      benefits: ["Multi-dimensional analysis", "Compatibility scores", "Detailed insights"],
      interactive: "🎯 12 compatibility dimensions"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description: "Get personalized conversation starters and relationship advice based on your unique cognitive profile and communication style.",
      highlight: "Smart suggestions",
      stats: "1000+ insights",
      color: "from-neural-blue to-neural-purple",
      benefits: ["Personalized advice", "Conversation starters", "Relationship tips"],
      interactive: "✨ Powered by advanced AI"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-slate-50 to-white relative overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-neural-blue/3 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-neural-purple/4 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neural-pink/2 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating elements */}
        <div className="absolute top-32 right-32 w-4 h-4 bg-neural-blue/30 rounded-full animate-float"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-neural-pink/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 right-20 w-2 h-2 bg-neural-purple/50 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neural-blue/10 to-neural-purple/10 rounded-full mb-8">
            <Brain className="w-4 h-4 text-neural-blue" />
            <span className="text-sm font-medium text-slate-700">THE SCIENCE</span>
            <TrendingUp className="w-4 h-4 text-neural-purple" />
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight">
            Why
            <span className="block bg-gradient-to-r from-neural-blue via-neural-purple to-neural-pink bg-clip-text text-transparent animate-gradient">
              MindMatch
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl">Works</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Other apps match on photos. We match on how your mind works — creating connections that actually *get* you.
          </p>
        </div>

        {/* Interactive feature grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group p-8 hover:shadow-2xl transition-all duration-700 bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-neural-blue/30 relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-all duration-700`}></div>
              
              {/* Interactive floating elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                <div className="w-2 h-2 bg-neural-blue rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-4 group-hover:translate-x-0" style={{ transitionDelay: '200ms' }}>
                <div className="w-1.5 h-1.5 bg-neural-pink rounded-full animate-pulse"></div>
              </div>
              
              <div className="relative z-10">
                {/* Enhanced header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className={`bg-gradient-to-br ${feature.color} p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-neural-blue transition-colors duration-300">
                          {feature.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`bg-gradient-to-r ${feature.color} text-white border-0`}>
                          {feature.highlight}
                        </Badge>
                        <span className="text-sm font-semibold text-neural-blue">{feature.stats}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced description */}
                <p className="text-lg text-slate-700 leading-relaxed mb-6 group-hover:text-slate-800 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Interactive benefits list */}
                <div className="space-y-3 mb-6">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div 
                      key={benefitIndex}
                      className="flex items-center gap-3 opacity-70 group-hover:opacity-100 transition-all duration-500"
                      style={{ transitionDelay: `${benefitIndex * 100}ms` }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-neural-blue to-neural-purple rounded-full"></div>
                      <span className="text-sm text-slate-600">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive element */}
                <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 mb-6">
                  <div className="text-sm font-medium text-slate-700">{feature.interactive}</div>
                </div>

                {/* Hover call-to-action */}
                <div className="flex items-center gap-3 text-neural-blue opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-sm font-semibold">Explore this feature</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="flex-1 h-px bg-gradient-to-r from-neural-blue to-transparent"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced interactive stats */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 text-white relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-40 h-40 bg-neural-blue/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-neural-purple/10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-neural-pink/10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Real Results, Real Impact
              </h3>
              <p className="text-white/80 text-lg">
                The numbers that prove our approach works
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "94%", label: "Match satisfaction", icon: Heart, color: "text-neural-pink" },
                { value: "5min", label: "Average quiz time", icon: Zap, color: "text-neural-blue" },
                { value: "89%", label: "Find meaningful connections", icon: Users, color: "text-neural-purple" },
                { value: "12", label: "Cognitive dimensions", icon: Brain, color: "text-neural-blue" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center space-y-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-500 group"
                >
                  <div className="p-3 bg-gradient-to-br from-white/10 to-white/5 rounded-xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;