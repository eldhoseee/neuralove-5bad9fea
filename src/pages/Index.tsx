import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RoastOfTheDay from "@/components/RoastOfTheDay";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CognitiveTypes from "@/components/CognitiveTypes";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header hide={isModalOpen} />
      <HeroSection onModalStateChange={setIsModalOpen} />
      <RoastOfTheDay />
      
      {/* Divider */}
      <div className="relative py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-6 text-sm text-muted-foreground font-medium">
                ✨ How It Actually Works ✨
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <HowItWorks />
      <Features />
      <RoastOfTheDay />
      <CognitiveTypes />
      <TestimonialsSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
