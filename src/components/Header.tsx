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
    <header className="fixed top-0 right-0 z-50 p-3 md:p-4">
      <Link to="/contact">
        <Button
          size="sm"
          variant="secondary"
          className="shadow-lg hover:shadow-xl transition-all duration-300 text-xs md:text-sm"
        >
          <Mail className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
          <span className="hidden sm:inline">Contact Us</span>
          <span className="sm:hidden">Contact</span>
        </Button>
      </Link>
    </header>
  );
};

export default Header;
