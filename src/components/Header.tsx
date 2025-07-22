
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">🧭</span>
            </div>
            <Link to="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
              AI Tools Navigator
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/#consultation" className="text-foreground hover:text-primary transition-colors">Services</Link>
            <Link to="/#about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/testimonials" className="text-foreground hover:text-primary transition-colors">Testimonials</Link>
            <Link to="/faq" className="text-foreground hover:text-primary transition-colors">FAQ</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
