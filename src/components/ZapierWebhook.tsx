import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ZapierWebhook = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Triggering Zapier webhook:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Add this to handle CORS
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
          source: "AI Tools Navigator",
          user_action: "zapier_webhook_trigger"
        }),
      });

      // Since we're using no-cors, we won't get a proper response status
      // Instead, we'll show a more informative message
      toast({
        title: "Request Sent! ⚡",
        description: "The request was sent to Zapier. Please check your Zap's history to confirm it was triggered.",
      });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Error",
        description: "Failed to trigger the Zapier webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              ⚡ Zapier Integration
            </h2>
            <p className="text-xl text-muted-foreground">
              Connect this page to your favorite tools using Zapier webhooks
            </p>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Webhook Trigger
              </CardTitle>
              <CardDescription>
                Enter your Zapier webhook URL to connect this form to your automation workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrigger} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="webhook-url" className="text-sm font-medium text-foreground">
                    Zapier Webhook URL
                  </label>
                  <Input
                    id="webhook-url"
                    type="url"
                    placeholder="https://hooks.zapier.com/hooks/catch/..."
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="hero" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {isLoading ? "Triggering..." : "Trigger Zapier Webhook"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2 text-foreground">How to set up:</h4>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Create a new Zap in Zapier</li>
                  <li>Choose "Webhooks by Zapier" as the trigger</li>
                  <li>Select "Catch Hook" trigger event</li>
                  <li>Copy the webhook URL provided by Zapier</li>
                  <li>Paste it above and test the connection</li>
                </ol>
                
                <div className="mt-4">
                  <a 
                    href="https://zapier.com/apps/webhook/integrations" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Learn more about Zapier Webhooks
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ZapierWebhook;