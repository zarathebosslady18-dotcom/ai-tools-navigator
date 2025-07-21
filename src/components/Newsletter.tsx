import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { triggerZapierWebhook } from "@/lib/webhook";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Welcome to the community!",
      description: "You'll receive weekly AI insights for Dubai businesses."
    });
    
    // Trigger Zapier webhook
    await triggerZapierWebhook({
      action_type: 'newsletter_subscription',
      email,
      timestamp: new Date().toISOString(),
      source_url: window.location.href,
      user_agent: navigator.userAgent,
      lead_data: {
        subscriber_count: '847_UAE',
        subscription_source: 'newsletter_section'
      }
    });
    
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Join Dubai's <span className="bg-gradient-primary bg-clip-text text-transparent">AI Revolution</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get weekly insights on UAE-specific AI tools, Arabic integrations, and Dubai market strategies
          </p>

          {isSubmitted ? (
            <div className="bg-secondary/20 border border-secondary rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-secondary mb-4">🎉 Welcome to the community!</h3>
              <p className="text-muted-foreground">
                You'll receive weekly AI insights for Dubai businesses in your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-4 border-2 border-border rounded-2xl focus:border-primary focus:outline-none transition-colors bg-background"
              />
              <Button type="submit" size="lg" variant="hero" className="sm:w-auto w-full">
                Join 847 UAE Subscribers
              </Button>
            </form>
          )}

          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Weekly AI Updates
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></span>
              Dubai-Focused Content
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></span>
              No Spam Guarantee
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
