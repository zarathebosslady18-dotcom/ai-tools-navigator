import { useState } from "react";
import { Calendar, Clock, Users, Video, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const WebinarFunnel = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleWebinarSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Registration Successful!",
        description: "Check your email for webinar access details.",
      });
      setEmail("");
      setName("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Video className="w-4 h-4" />
              FREE LIVE WEBINAR
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                AI Tools for Dubai Businesses
              </span>
              <br />In Just 30 Minutes
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover the exact AI tools 500+ Dubai companies use to save AED 5,000+ monthly. 
              Live demo + Q&A with real UAE case studies.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: What You'll Learn */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">What You'll Discover:</h3>
              
              <div className="space-y-4">
                {[
                  "Top 5 AI tools every Dubai business needs (with Arabic support)",
                  "How to reduce your software costs by 60% using AI",
                  "UAE compliance requirements for AI implementation",
                  "Live demo: Setting up AI automation in 10 minutes",
                  "Q&A: Get your specific business questions answered"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-secondary/5 p-6 rounded-lg mt-8">
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <span className="font-semibold">Next Session: Today 7:00 PM GST</span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-secondary" />
                  <span>Duration: 30 minutes + 15 min Q&A</span>
                </div>
              </div>
            </div>

            {/* Right: Registration Form */}
            <Card className="border-2 border-secondary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Reserve Your FREE Seat</CardTitle>
                <p className="text-muted-foreground">Limited to 100 attendees</p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleWebinarSignup} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="text-lg h-12"
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Business Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="text-lg h-12"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full text-lg h-12"
                    disabled={isLoading}
                    variant="secondary"
                  >
                    {isLoading ? "Registering..." : "Register FREE Now"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    No spam. Webinar link sent instantly. 
                    <br />100% focused on Dubai business applications.
                  </p>
                </form>
                
                <div className="mt-6 pt-6 border-t text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>47 Dubai business owners registered today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebinarFunnel;