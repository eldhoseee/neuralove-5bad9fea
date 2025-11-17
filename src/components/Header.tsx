import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface HeaderProps {
  hide?: boolean;
}

const Header = ({ hide = false }: HeaderProps) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  if (!isLandingPage || hide) return null;

  return (
    <header className="fixed top-0 right-0 z-50 p-4 hidden md:block">
      <Link to="/contact">
        <Button 
          size="sm" 
          variant="secondary"
          className="shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Mail className="w-4 h-4 mr-2" />
          Contact Us
        </Button>
      </Link>
    </header>
  );
};

export default Header;
