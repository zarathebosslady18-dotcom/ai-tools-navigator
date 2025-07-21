import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Instagram, Zap } from "lucide-react";

const Header = () => {
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
          
          <div className="flex items-center gap-3">
            <Button 
              size="sm" 
              variant="outline"
              asChild
            >
              <a href="https://linktr.ee/MissAkiruBusinessconsulting" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Links
              </a>
            </Button>
            
            <Button 
              size="sm" 
              variant="secondary"
              asChild
            >
              <a href="https://zarathebosslady.gumroad.com/subscribe" target="_blank" rel="noopener noreferrer">
                <Zap className="w-4 h-4 mr-2" />
                Subscribe
              </a>
            </Button>
            
            <Button 
              size="sm" 
              variant="ghost"
              asChild
            >
              <a href="https://www.instagram.com/miss_akiru_business_consulting?igsh=ZGo3cXludjU0anM4" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-4 h-4" />
              </a>
            </Button>
            
            <Button 
              size="sm" 
              variant="hero"
              asChild
            >
              <a href="https://calendly.com/zarathebosslady18/30min" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-4 h-4 mr-2" />
                Book Call
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;