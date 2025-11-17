import { Users, Star, TrendingUp, Sparkles } from "lucide-react";

const SocialProofBanner = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-r from-primary/5 via-primary-glow/5 to-accent/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-accent/5 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
          {/* Main headline */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-accent animate-pulse" />
            <h3 className="text-lg md:text-2xl font-bold text-foreground">
              Join <span className="bg-gradient-accent bg-clip-text text-transparent">5,000+ students</span> finding meaningful connections
            </h3>
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-3xl">
            <div className="flex flex-col items-center p-3 md:p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 group">
              <div className="p-2 md:p-3 bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="text-xl md:text-3xl font-bold text-foreground">5,000+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Active Students</div>
            </div>

            <div className="flex flex-col items-center p-3 md:p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-accent/10 hover:border-accent/30 transition-all duration-300 group">
              <div className="p-2 md:p-3 bg-gradient-to-br from-accent/10 to-primary-glow/10 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-4 h-4 md:w-6 md:h-6 text-accent" />
              </div>
              <div className="text-xl md:text-3xl font-bold text-foreground">4.8/5</div>
              <div className="text-xs md:text-sm text-muted-foreground">Satisfaction</div>
            </div>

            <div className="flex flex-col items-center p-3 md:p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-primary-glow/10 hover:border-primary-glow/30 transition-all duration-300 group">
              <div className="p-2 md:p-3 bg-gradient-to-br from-primary-glow/10 to-accent/10 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-primary-glow" />
              </div>
              <div className="text-xl md:text-3xl font-bold text-foreground">94%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Match Quality</div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Trusted by IIT, DU, SRCC students</span>
            </div>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <span>100% Privacy Protected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofBanner;
