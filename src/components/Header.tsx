import { useState } from "react";
import { Menu, X, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">🧭</span>
            </div>
            <a href="#" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
              AI Tools Navigator
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/#consultation" className="text-foreground hover:text-primary transition-colors">Services</Link>
            <Link to="/#about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/faq" className="text-foreground hover:text-primary transition-colors">FAQ</Link>
            
            {/* Two Prominent CTA Buttons */}
            <Link to="/masterclass">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
              >
                <Zap className="w-4 h-4 mr-2" />
                AI Masterclass
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline"
              className="font-semibold px-4 py-2 rounded-full border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </nav>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/40">
            <div className="flex flex-col space-y-4 pt-4">
              <Link to="/#consultation" className="text-foreground hover:text-primary transition-colors">Services</Link>
              <Link to="/#about" className="text-foreground hover:text-primary transition-colors">About</Link>
              <Link to="/faq" className="text-foreground hover:text-primary transition-colors">FAQ</Link>
              
              <Link to="/masterclass" className="mt-4">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full shadow-lg"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  AI Masterclass
                </Button>
              </Link>
              
              <Button 
                size="lg" 
                variant="outline"
                className="w-full font-semibold"
                onClick={() => {
                  setIsMenuOpen(false);
                  document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Book Consultation
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;