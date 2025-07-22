
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Instagram, Zap, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <footer className="bg-muted/50 border-t border-border py-8 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold">🧭</span>
            </div>
            <span className="text-lg font-bold text-foreground">
              AI Tools Navigator
            </span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              About Us
            </Button>
            
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Services
            </Button>
            
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Testimonials
            </Button>
            
            <Button 
              size="sm" 
              variant="outline"
              asChild
            >
              <a href="https://linktr.ee/MissAkiruBusinessconsulting" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                All Links
              </a>
            </Button>
            
            <Button 
              size="sm" 
              variant="glow"
              asChild
            >
              <a href="https://www.paypal.com/paypalme/my/profile" target="_blank" rel="noopener noreferrer">
                💰 PayPal
              </a>
            </Button>
            
            <Button 
              size="sm" 
              variant="secondary"
              asChild
            >
              <a href="https://zarathebosslady.gumroad.com/subscribe" target="_blank" rel="noopener noreferrer">
                <Zap className="w-4 h-4 mr-2" />
                Subscribe Now
              </a>
            </Button>
            
            <Button 
              size="sm" 
              variant="ghost"
              asChild
            >
              <a href="https://www.instagram.com/miss_akiru_business_consulting?igsh=ZGo3cXludjU0anM4" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-4 h-4 mr-2" />
                Follow Us
              </a>
            </Button>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link to="/masterclass">
                <Zap className="w-4 h-4 mr-2" />
                AI Masterclass
              </Link>
            </Button>
            
            <Button 
              size="sm" 
              variant="hero"
              asChild
            >
              <a href="https://calendly.com/zarathebosslady18/30min" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-4 h-4 mr-2" />
                Book Your Call
              </a>
            </Button>
          </div>
          
          {/* Mobile Navigation Menu Button - Only visible on mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="border border-primary hover:bg-primary hover:text-primary-foreground"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Miss Akiru Business Consulting. All rights reserved.</p>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - Expands upward from footer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute bottom-full left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border shadow-lg z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/#consultation" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/#about" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/testimonials" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link 
                to="/faq" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
