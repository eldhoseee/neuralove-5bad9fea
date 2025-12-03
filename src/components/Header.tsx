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

  // Header removed as per user request
  return null;
};

export default Header;
