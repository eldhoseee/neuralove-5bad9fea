import { Star, Quote, Heart, Brain, Users, Calendar, MessageCircle, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "It felt like someone finally got me. Our first conversation lasted 4 hours because we just clicked on every level. We're planning our wedding next spring!",
      author: "Sarah & James",
      authorDetails: "Sarah, 26 • The Visionary",
      partnerDetails: "James, 28 • The Analytical Thinker", 
      rating: 5,
      relationship: "Found her match after 2 weeks",
      timeframe: "Engaged after 1 year",
      matchScore: "97% compatibility",
      image: "👩‍💼👨‍💻",
      status: "engaged"
    },
    {
      quote: "I was so tired of small talk on other apps. Here, every conversation feels meaningful from the start. We understand each other's minds completely.",
      author: "Marcus & Elena",
      authorDetails: "Marcus, 29 • The Pattern Seeker",
      partnerDetails: "Elena, 27 • The Creative Catalyst",
      rating: 5,
      relationship: "In a relationship for 8 months",
      timeframe: "Together for 8 months",
      matchScore: "94% compatibility", 
      image: "👨‍🎨👩‍🔬",
      status: "relationship"
    },
    {
      quote: "The compatibility insights were spot-on. We understood each other's communication styles immediately and never had the usual dating confusion.",
      author: "Alex & Jordan",
      authorDetails: "Alex, 24 • The Grounded Empath",
      partnerDetails: "Jordan, 26 • The Strategic Innovator",
      rating: 5,
      relationship: "Found deep connection",
      timeframe: "Dating for 6 months",
      matchScore: "92% compatibility",
      image: "👩‍🎓👨‍💼", 
      status: "dating"
    },
    {
      quote: "Finally, an app that values what's actually important in relationships. No more endless swiping - just real, meaningful connections with incredible people.",
      author: "David & Maya",
      authorDetails: "David, 31 • The Practical Builder", 
      partnerDetails: "Maya, 29 • The Intuitive Connector",
      rating: 5,
      relationship: "Found meaningful connections",
      timeframe: "Recently matched",
      matchScore: "89% compatibility",
      image: "👨‍🔧👩‍🎨",
      status: "new"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "engaged":
        return <Badge className="bg-gradient-to-r from-neural-pink to-neural-purple text-white">💍 Engaged</Badge>;
      case "relationship":
        return <Badge className="bg-gradient-to-r from-neural-blue to-neural-purple text-white">❤️ In Love</Badge>;
      case "dating":
        return <Badge className="bg-gradient-to-r from-neural-purple to-neural-pink text-white">💕 Dating</Badge>;
      case "new":
        return <Badge className="bg-gradient-to-r from-neural-blue to-neural-pink text-white">✨ New Match</Badge>;
      default:
        return null;
    }
  };

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
            Real Stories,
            <span className="block bg-gradient-to-r from-neural-blue via-neural-purple to-neural-pink bg-clip-text text-transparent">
              Real Connections
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            When minds match, magic happens. Here's what our community is saying about finding their perfect cognitive complement.
          </p>
        </div>

        {/* Enhanced testimonial cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group p-8 hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-neural-blue/30 relative overflow-hidden">
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-neural-blue/5 via-transparent to-neural-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="w-16 h-16 text-neural-blue" />
              </div>

              <div className="relative z-10">
                {/* Status badge and rating */}
                <div className="flex items-center justify-between mb-6">
                  {getStatusBadge(testimonial.status)}
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-neural-pink text-neural-pink" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-lg text-slate-700 leading-relaxed mb-8 font-medium">
                  "{testimonial.quote}"
                </blockquote>

                {/* Couple info */}
                <div className="space-y-4">
                  {/* Couple representation */}
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="text-4xl">{testimonial.image}</div>
                  </div>
                  
                  {/* Couple details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-800">{testimonial.authorDetails}</span>
                      <span className="text-neural-blue font-medium">{testimonial.matchScore}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-800">{testimonial.partnerDetails}</span>
                      <span className="text-slate-500">{testimonial.timeframe}</span>
                    </div>
                  </div>
                </div>

                {/* Hover effect bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neural-blue to-neural-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced success stats */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 text-white relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-neural-blue/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-neural-purple/10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                The Numbers Speak for Themselves
              </h3>
              <p className="text-white/80 text-lg">
                Real results from real people finding real love
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center space-y-3 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-neural-blue/20 to-neural-blue/10 rounded-xl w-fit mx-auto">
                  <Users className="w-8 h-8 text-neural-blue" />
                </div>
                <div className="text-4xl font-bold text-white">10,000+</div>
                <div className="text-white/70">Meaningful matches made</div>
              </div>
              
              <div className="text-center space-y-3 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-neural-pink/20 to-neural-pink/10 rounded-xl w-fit mx-auto">
                  <Star className="w-8 h-8 text-neural-pink" />
                </div>
                <div className="text-4xl font-bold text-white">4.9/5</div>
                <div className="text-white/70">Average user rating</div>
              </div>
              
              <div className="text-center space-y-3 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-neural-purple/20 to-neural-purple/10 rounded-xl w-fit mx-auto">
                  <Calendar className="w-8 h-8 text-neural-purple" />
                </div>
                <div className="text-4xl font-bold text-white">76%</div>
                <div className="text-white/70">Lead to real-world dates</div>
              </div>
              
              <div className="text-center space-y-3 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-neural-blue/20 to-neural-purple/10 rounded-xl w-fit mx-auto">
                  <MessageCircle className="w-8 h-8 text-neural-blue" />
                </div>
                <div className="text-4xl font-bold text-white">4hrs</div>
                <div className="text-white/70">Average first conversation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;