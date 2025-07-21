import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Instagram, Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border py-8">
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
          
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Miss Akiru Business Consulting. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;