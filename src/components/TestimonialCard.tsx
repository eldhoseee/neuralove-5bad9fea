import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TestimonialCardProps {
  name: string;
  college: string;
  quote: string;
  avatar: string;
  rating?: number;
  status?: string;
  matchScore?: string;
  timeframe?: string;
}

const TestimonialCard = ({ 
  name, 
  college, 
  quote, 
  avatar, 
  rating = 5, 
  status = "success",
  matchScore,
  timeframe 
}: TestimonialCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "engaged":
        return <Badge className="bg-gradient-to-r from-neural-pink to-neural-purple text-white">💍 Engaged</Badge>;
      case "relationship":
        return <Badge className="bg-gradient-to-r from-neural-blue to-neural-purple text-white">❤️ In Love</Badge>;
      case "dating":
        return <Badge className="bg-gradient-to-r from-neural-purple to-neural-pink text-white">💕 Dating</Badge>;
      case "success":
        return <Badge className="bg-gradient-to-r from-neural-blue to-neural-pink text-white">✨ Success</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="group p-4 md:p-8 hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-neural-blue/30 relative overflow-hidden">
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-neural-blue/5 via-transparent to-neural-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Quote icon */}
      <div className="absolute top-4 md:top-6 right-4 md:right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <Quote className="w-10 h-10 md:w-16 md:h-16 text-neural-blue" />
      </div>

      <div className="relative z-10">
        {/* Status badge and rating */}
        <div className="flex items-center justify-between mb-3 md:mb-6">
          {getStatusBadge(status)}
          <div className="flex items-center gap-0.5 md:gap-1">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-neural-pink text-neural-pink" />
            ))}
          </div>
        </div>

        {/* Quote */}
        <blockquote className="text-sm md:text-lg text-slate-700 leading-relaxed mb-4 md:mb-8 font-medium">
          "{quote}"
        </blockquote>

        {/* User info */}
        <div className="space-y-2 md:space-y-4">
          {/* Avatar */}
          <div className="flex items-center justify-center mb-2 md:mb-4">
            <div className="text-2xl md:text-4xl">{avatar}</div>
          </div>
          
          {/* User details */}
          <div className="text-center space-y-1 md:space-y-2">
            <div className="font-semibold text-slate-800 text-base md:text-lg">{name}</div>
            <div className="text-slate-600 text-xs md:text-base">{college}</div>
            {matchScore && (
              <div className="text-neural-blue font-medium text-xs md:text-sm">{matchScore}</div>
            )}
            {timeframe && (
              <div className="text-slate-500 text-xs md:text-sm">{timeframe}</div>
            )}
          </div>
        </div>

        {/* Hover effect bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neural-blue to-neural-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </Card>
  );
};

export default TestimonialCard; 