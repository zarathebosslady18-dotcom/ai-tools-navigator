import { Button } from "@/components/ui/button";

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
          <Button 
            size="sm" 
            variant="hero"
            onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Consultation
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;