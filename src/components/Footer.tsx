import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
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
  Sparkles,
  CheckCircle2,
  TrendingUp
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    
    // Simulate API call - replace with actual newsletter service
    setTimeout(() => {
      toast({
        title: "Successfully subscribed! 🎉",
        description: "Check your inbox for a confirmation email.",
      });
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };

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
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand section */}
          <div className="md:col-span-3 lg:col-span-1 space-y-6">
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
              <a href="https://twitter.com/neuralove" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors group">
                <Twitter className="w-5 h-5 text-slate-400 group-hover:text-neural-blue transition-colors" />
              </a>
              <a href="https://instagram.com/neuralove" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors group">
                <Instagram className="w-5 h-5 text-slate-400 group-hover:text-neural-pink transition-colors" />
              </a>
              <a href="https://linkedin.com/company/neuralove" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors group">
                <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-neural-blue transition-colors" />
              </a>
              <a href="https://facebook.com/neuralove" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors group">
                <Facebook className="w-5 h-5 text-slate-400 group-hover:text-neural-purple transition-colors" />
              </a>
            </div>
            
            {/* Trust signals */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-700">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <TrendingUp className="w-4 h-4 text-neural-blue" />
                <span>10k+ Matches</span>
              </div>
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-neural-pink" />
              Product
            </h3>
            <ul className="space-y-3">
              <li><a href="#how-it-works" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-slate-300 hover:text-neural-blue transition-colors">How It Works</a></li>
              <li><a href="#cognitive-types" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-slate-300 hover:text-neural-blue transition-colors">Cognitive Types</a></li>
              <li><Link to="/psychology" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-slate-300 hover:text-neural-blue transition-colors">Matching Algorithm</Link></li>
              <li><a href="#testimonials" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-slate-300 hover:text-neural-blue transition-colors">Success Stories</a></li>
              <li><a href="#features" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-slate-300 hover:text-neural-blue transition-colors">Premium Features</a></li>
            </ul>
          </div>

          {/* Support links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-neural-purple" />
              Support
            </h3>
            <ul className="space-y-3">
              <li><Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-slate-300 hover:text-neural-blue transition-colors">Help Center</Link></li>
              <li><a href="https://blog.neuralove.com/safety-tips" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-neural-blue transition-colors">Safety Tips</a></li>
              <li><Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-slate-300 hover:text-neural-blue transition-colors">Contact Us</Link></li>
              <li><a href="https://blog.neuralove.com/community-guidelines" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-neural-blue transition-colors">Community Guidelines</a></li>
              <li><Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-slate-300 hover:text-neural-blue transition-colors">Report Issues</Link></li>
              <li><Link to="/admin" className="text-slate-300 hover:text-neural-blue transition-colors">System Status</Link></li>
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
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubscribing}
                  required
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-neural-blue flex-1"
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  disabled={isSubscribing}
                  className="bg-gradient-to-r from-neural-blue to-neural-purple hover:from-neural-blue/80 hover:to-neural-purple/80 w-full sm:w-auto"
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <p className="text-xs text-slate-400">
                No spam. Unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
              </p>
            </form>
          </div>
        </div>

        <Separator className="bg-slate-700" />

        {/* Bottom section */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-400">
            <span>© {currentYear} NeuraLove. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link to="/privacy-policy" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-neural-blue transition-colors flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Privacy Policy
              </Link>
              <a href="https://neuralove.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-neural-blue transition-colors flex items-center gap-1">
                <FileText className="w-4 h-4" />
                Terms of Service
              </a>
              <a href="https://neuralove.com/cookies" target="_blank" rel="noopener noreferrer" className="hover:text-neural-blue transition-colors flex items-center gap-1">
                <Users className="w-4 h-4" />
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 