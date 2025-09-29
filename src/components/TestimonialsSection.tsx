import { Heart, Sparkles, Users, Star, Calendar, MessageCircle } from "lucide-react";
import TestimonialCard from "./TestimonialCard";

const TestimonialsSection = () => {
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
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-neural-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-neural-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neural-pink/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neural-blue/10 to-neural-purple/10 rounded-full mb-6">
            <Heart className="w-4 h-4 text-neural-pink" />
            <span className="text-sm font-medium text-slate-700">SUCCESS STORIES</span>
            <Sparkles className="w-4 h-4 text-neural-blue" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Real Students,
            <span className="block bg-gradient-to-r from-neural-blue via-neural-purple to-neural-pink bg-clip-text text-transparent">
              Real Connections
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From campus to careers, see how Indian GenZ is finding meaningful connections through MindMatch.
          </p>
        </div>

        {/* Testimonial cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
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

        {/* Enhanced success stats for Indian context */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 text-white relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-neural-blue/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-neural-purple/10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Building India's Future, One Connection at a Time
              </h3>
              <p className="text-white/80 text-lg">
                Trusted by students across India's top colleges and universities
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center space-y-3 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-neural-blue/20 to-neural-blue/10 rounded-xl w-fit mx-auto">
                  <Users className="w-8 h-8 text-neural-blue" />
                </div>
                <div className="text-4xl font-bold text-white">5,000+</div>
                <div className="text-white/70">Students connected</div>
              </div>
              
              <div className="text-center space-y-3 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-neural-pink/20 to-neural-pink/10 rounded-xl w-fit mx-auto">
                  <Star className="w-8 h-8 text-neural-pink" />
                </div>
                <div className="text-4xl font-bold text-white">4.8/5</div>
                <div className="text-white/70">Student satisfaction</div>
              </div>
              
              <div className="text-center space-y-3 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-neural-purple/20 to-neural-purple/10 rounded-xl w-fit mx-auto">
                  <Calendar className="w-8 h-8 text-neural-purple" />
                </div>
                <div className="text-4xl font-bold text-white">82%</div>
                <div className="text-white/70">Lead to study partnerships</div>
              </div>
              
              <div className="text-center space-y-3 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-neural-blue/20 to-neural-purple/10 rounded-xl w-fit mx-auto">
                  <MessageCircle className="w-8 h-8 text-neural-blue" />
                </div>
                <div className="text-4xl font-bold text-white">3hrs</div>
                <div className="text-white/70">Average first conversation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 