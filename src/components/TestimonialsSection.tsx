import { useState } from "react";
import { Heart, Sparkles, Users, Star, Calendar, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const [showAll, setShowAll] = useState(false);
  
  const testimonials = [
    {
      name: "Ananya",
      college: "DU",
      quote: "Met my study buddy through MindMatch. We now prep together for UPSC and our conversations flow from Kafka to constitutional law effortlessly!",
      avatar: "👩‍🎓",
      rating: 5,
      status: "relationship",
      matchScore: "94% compatibility",
      timeframe: "Dating for 6 months"
    },
    {
      name: "Arjun",
      college: "IIT Bombay",
      quote: "Finally found someone who gets my coding jokes AND my existential crisis at 3 AM. We debug code and life together now.",
      avatar: "👨‍💻",
      rating: 5,
      status: "dating",
      matchScore: "91% compatibility", 
      timeframe: "Together for 4 months"
    },
    {
      name: "Priya",
      college: "SRCC",
      quote: "Other apps were just surface-level small talk. Here I found someone who shares my passion for sustainable fashion and midnight chai discussions.",
      avatar: "👩‍💼",
      rating: 5,
      status: "engaged",
      matchScore: "96% compatibility",
      timeframe: "Engaged after 1 year"
    },
    {
      name: "Karan",
      college: "St. Xavier's Mumbai",
      quote: "We bonded over our shared love for indie music and social causes. Now we're planning a startup together while being completely in sync mentally.",
      avatar: "👨‍🎨",
      rating: 5,
      status: "relationship",
      matchScore: "93% compatibility",
      timeframe: "In love for 8 months"
    },
    {
      name: "Shreya",
      college: "JNU",
      quote: "Found my debate partner and life partner in one! We challenge each other intellectually and support each other emotionally.",
      avatar: "👩‍⚖️",
      rating: 5,
      status: "dating",
      matchScore: "89% compatibility",
      timeframe: "Dating for 5 months"
    },
    {
      name: "Vikram",
      college: "IIM Ahmedabad",
      quote: "She understands my entrepreneurial dreams and shares my vision for social impact. We're building our future together, literally and figuratively.",
      avatar: "👨‍💼",
      rating: 5,
      status: "success",
      matchScore: "92% compatibility",
      timeframe: "Recently matched"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-48 md:w-64 h-48 md:h-64 bg-neural-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-56 md:w-80 h-56 md:h-80 bg-neural-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-neural-pink/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Enhanced header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-neural-blue/10 to-neural-purple/10 rounded-full mb-4 md:mb-6">
            <Heart className="w-3 h-3 md:w-4 md:h-4 text-neural-pink" />
            <span className="text-xs md:text-sm font-medium text-slate-700">SUCCESS STORIES</span>
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-neural-blue" />
          </div>
          
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-slate-900 mb-4 md:mb-6 leading-tight">
            Real Students,
            <span className="block bg-gradient-to-r from-neural-blue via-neural-purple to-neural-pink bg-clip-text text-transparent">
              Real Connections
            </span>
          </h2>
          
          <p className="text-sm md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
            From campus to careers, see how Indian GenZ is finding meaningful connections through MindMatch.
          </p>
        </div>

        {/* Testimonial cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto mb-8 md:mb-12">
          {(showAll ? testimonials : testimonials.slice(0, 3)).map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              college={testimonial.college}
              quote={testimonial.quote}
              avatar={testimonial.avatar}
              rating={testimonial.rating}
              status={testimonial.status}
              matchScore={testimonial.matchScore}
              timeframe={testimonial.timeframe}
            />
          ))}
        </div>

        {/* Show More/Less Button */}
        <div className="text-center mb-8 md:mb-12">
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            className="group border-2 border-neural-blue/30 hover:border-neural-blue hover:bg-neural-blue/10 px-8 py-6 text-base font-semibold transition-all duration-300"
          >
            {showAll ? (
              <>
                <span className="mr-2">Show Less Reviews</span>
                <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </>
            ) : (
              <>
                <span className="mr-2">Read More Success Stories</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </>
            )}
          </Button>
        </div>

        {/* Enhanced success stats for Indian context */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl md:rounded-3xl p-6 md:p-12 text-white relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-24 md:w-32 h-24 md:h-32 bg-neural-blue/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-1/4 w-28 md:w-40 h-28 md:h-40 bg-neural-purple/10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-6 md:mb-12">
              <h3 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
                Building India's Future, One Connection at a Time
              </h3>
              <p className="text-white/80 text-sm md:text-lg">
                Trusted by students across India's top colleges and universities
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="text-center space-y-2 md:space-y-3 p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-2 md:p-3 bg-gradient-to-br from-neural-blue/20 to-neural-blue/10 rounded-lg md:rounded-xl w-fit mx-auto">
                  <Users className="w-5 h-5 md:w-8 md:h-8 text-neural-blue" />
                </div>
                <div className="text-2xl md:text-4xl font-bold text-white">5,000+</div>
                <div className="text-white/70 text-xs md:text-base">Students connected</div>
              </div>
              
              <div className="text-center space-y-2 md:space-y-3 p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-2 md:p-3 bg-gradient-to-br from-neural-pink/20 to-neural-pink/10 rounded-lg md:rounded-xl w-fit mx-auto">
                  <Star className="w-5 h-5 md:w-8 md:h-8 text-neural-pink" />
                </div>
                <div className="text-2xl md:text-4xl font-bold text-white">4.8/5</div>
                <div className="text-white/70 text-xs md:text-base">Student satisfaction</div>
              </div>
              
              <div className="text-center space-y-2 md:space-y-3 p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-2 md:p-3 bg-gradient-to-br from-neural-purple/20 to-neural-purple/10 rounded-lg md:rounded-xl w-fit mx-auto">
                  <Calendar className="w-5 h-5 md:w-8 md:h-8 text-neural-purple" />
                </div>
                <div className="text-2xl md:text-4xl font-bold text-white">82%</div>
                <div className="text-white/70 text-xs md:text-base">Lead to study partnerships</div>
              </div>
              
              <div className="text-center space-y-2 md:space-y-3 p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-2 md:p-3 bg-gradient-to-br from-neural-blue/20 to-neural-purple/10 rounded-lg md:rounded-xl w-fit mx-auto">
                  <MessageCircle className="w-5 h-5 md:w-8 md:h-8 text-neural-blue" />
                </div>
                <div className="text-2xl md:text-4xl font-bold text-white">3hrs</div>
                <div className="text-white/70 text-xs md:text-base">Average first conversation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 