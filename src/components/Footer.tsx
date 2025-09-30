import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Heart, 
  Mail, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Facebook,
  ArrowRight,
  Shield,
  FileText,
  HelpCircle,
  Users,
  Sparkles
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-neural-blue/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-neural-purple/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-neural-pink/5 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-neural-blue to-neural-purple rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-neural-blue to-neural-purple bg-clip-text text-transparent">
                NeuraLove
              </span>
            </div>
            
            <p className="text-slate-300 leading-relaxed">
              Revolutionizing dating through cognitive compatibility. Find deeper connections by matching minds, not just faces.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors group">
                <Twitter className="w-5 h-5 text-slate-400 group-hover:text-neural-blue transition-colors" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors group">
                <Instagram className="w-5 h-5 text-slate-400 group-hover:text-neural-pink transition-colors" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors group">
                <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-neural-blue transition-colors" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors group">
                <Facebook className="w-5 h-5 text-slate-400 group-hover:text-neural-purple transition-colors" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-neural-pink" />
              Product
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-300 hover:text-neural-blue transition-colors">How It Works</a></li>
              <li><a href="#" className="text-slate-300 hover:text-neural-blue transition-colors">Cognitive Types</a></li>
              <li><a href="#" className="text-slate-300 hover:text-neural-blue transition-colors">Matching Algorithm</a></li>
              <li><a href="#" className="text-slate-300 hover:text-neural-blue transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-slate-300 hover:text-neural-blue transition-colors">Premium Features</a></li>
            </ul>
          </div>

          {/* Support links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-neural-purple" />
              Support
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-300 hover:text-neural-blue transition-colors">Help Center</a></li>
              <li><a href="#" className="text-slate-300 hover:text-neural-blue transition-colors">Safety Tips</a></li>
              <li><a href="#" className="text-slate-300 hover:text-neural-blue transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-slate-300 hover:text-neural-blue transition-colors">Community Guidelines</a></li>
              <li><a href="#" className="text-slate-300 hover:text-neural-blue transition-colors">Report Issues</a></li>
            </ul>
          </div>

          {/* Newsletter signup */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-neural-blue" />
              Stay Updated
            </h3>
            <p className="text-slate-300 text-sm">
              Get insights on cognitive compatibility and dating tips delivered to your inbox.
            </p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your mail" 
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-neural-blue"
                />
                <Button size="sm" className="bg-gradient-to-r from-neural-blue to-neural-purple hover:from-neural-blue/80 hover:to-neural-purple/80">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-slate-400">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-700" />

        {/* Bottom section */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-400">
            <span>© {currentYear} NeuraLove. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link to="/privacy-policy" className="hover:text-neural-blue transition-colors flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Privacy Policy
              </Link>
              <a href="#" className="hover:text-neural-blue transition-colors flex items-center gap-1">
                <FileText className="w-4 h-4" />
                Terms of Service
              </a>
              <a href="#" className="hover:text-neural-blue transition-colors flex items-center gap-1">
                <Users className="w-4 h-4" />
                Cookie Policy
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-neural-pink animate-pulse" />
            <span>and</span>
            <Brain className="w-4 h-4 text-neural-blue" />
            <span>for deeper connections</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 