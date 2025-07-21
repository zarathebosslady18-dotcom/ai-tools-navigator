import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Mail, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailCaptureModal = ({ isOpen, onClose }: EmailCaptureModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success! 🎉",
      description: "Your AI tools guide is on its way to your inbox!"
    });
    
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md mx-auto bg-gradient-primary text-white border-none">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <Gift className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Welcome to the Club! 🚀</h3>
            <p className="text-white/90">
              Check your email for your exclusive AI tools guide and updates from Dubai's AI expert!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-auto bg-background border-2 border-primary">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <Mail className="w-6 h-6 text-primary" />
            Free AI Tools Guide
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-3xl">🤖</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Get Your FREE Dubai AI Business Guide
            </h3>
            <p className="text-muted-foreground text-sm">
              Join 1,000+ Dubai entrepreneurs getting exclusive AI tools, tips, and UAE compliance updates!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your business email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <Button type="submit" variant="hero" className="w-full" size="lg">
              <Gift className="w-4 h-4 mr-2" />
              Get My Free Guide Now
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              💯 Free forever • No spam • Unsubscribe anytime
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCaptureModal;