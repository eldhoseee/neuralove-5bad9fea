import { Button } from "@/components/ui/button";
import { Brain, Heart, ArrowRight, Sparkles, Star, Zap } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-neural-blue/20 to-neural-purple/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-neural-purple/20 to-neural-pink/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-neural-blue rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-neural-pink rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-neural-purple rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Enhanced header section */}
          <div className="space-y-4">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-neural-blue/20 to-neural-purple/20 backdrop-blur-sm border border-white/10 rounded-full">
              <Sparkles className="w-3 h-3 text-neural-blue" />
              <span className="text-white font-medium tracking-wide text-xs">START YOUR JOURNEY TODAY</span>
              <Star className="w-3 h-3 text-neural-pink" />
            </div>
            
            {/* Main headline */}
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Your Perfect
                <span className="block bg-gradient-to-r from-neural-blue via-neural-purple to-neural-pink bg-clip-text text-transparent animate-gradient">
                  Mind Match
                </span>
                <span className="block text-2xl md:text-3xl lg:text-4xl text-white/90 font-normal">
                  is Waiting
                </span>
              </h2>
              
              <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
                Join <span className="font-semibold text-neural-blue">thousands</span> who've found people who actually *think* like them. 
                <span className="block text-white/70">Your 5-minute journey to real connection starts now.</span>
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button size="default" className="group relative bg-gradient-to-r from-neural-blue to-neural-purple hover:from-neural-blue/80 hover:to-neural-purple/80 text-white border-0 shadow-xl transition-all duration-300 px-6 py-3 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative mr-2 font-semibold">Find Your MindMatch</span>
              <div className="relative flex items-center gap-1">
                <Brain className="w-4 h-4" />
                <Heart className="w-4 h-4 text-neural-pink group-hover:animate-pulse" />
              </div>
            </Button>
            
            <Button size="default" variant="ghost" className="group text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 px-6 py-3 rounded-lg">
              <span className="mr-2">Watch How It Works</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-6 space-y-4">
            <div className="flex flex-wrap justify-center items-center gap-6 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-neural-blue" />
                <span>Psychology-backed</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-neural-pink" />
                <span>10,000+ matches</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-neural-purple" />
                <span>5-minute quiz</span>
              </div>
            </div>
            
            <p className="text-white/50 text-sm">
              Free to start • No commitment • Find your cognitive complement today
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;