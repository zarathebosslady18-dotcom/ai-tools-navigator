import { useState } from "react";
import { Calendar, Clock, Users, Award, CheckCircle, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { triggerZapierWebhook } from "@/lib/webhook";

const AIMasterclass = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email to register",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await triggerZapierWebhook({
        action: "masterclass_signup",
        name,
        email,
        phone,
        masterclass: "AI Business Transformation Masterclass",
        timestamp: new Date().toISOString(),
      });

      toast({
        title: "Registration Successful!",
        description: "You'll receive confirmation details shortly. Welcome to the future of AI business!",
      });

      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const tools = [
    { category: "AI Business Strategy", tools: ["ChatGPT", "Claude", "Gemini Pro", "Perplexity"] },
    { category: "Content & Marketing", tools: ["Copy.ai", "Jasper", "Canva AI", "Midjourney"] },
    { category: "Data & Analytics", tools: ["Julius", "DataGPT", "Tableau AI", "Power BI"] },
    { category: "Automation & Workflow", tools: ["Zapier", "Make", "n8n", "AI Agents"] },
    { category: "Voice & Video", tools: ["ElevenLabs", "Runway", "HeyGen", "Synthesia"] },
    { category: "Customer Service", tools: ["Intercom AI", "Zendesk AI", "Chatbot Builders"] },
  ];

  const benefits = [
    "Get your personalized AI business roadmap",
    "Access to 25+ premium AI tools with Dubai pricing",
    "1-on-1 consultation with Miss Akiru",
    "Join exclusive Dubai AI business community",
    "Certificate of completion",
    "3 months of follow-up support"
  ];

  const targetAudience = [
    "Business Owners & Entrepreneurs",
    "Marketing & Growth Teams", 
    "Operations Managers",
    "C-Suite Executives",
    "Freelancers & Consultants",
    "Tech Team Leaders"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        {/* Header Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-medium border border-primary/20">
            <Star className="w-4 h-4" />
            2-Day Expert-Led Live Masterclass
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Master AI.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Transform Business.
            </span>{" "}
            <br />Advance your Career.
          </h1>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>No Prior AI Knowledge Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span>Get Dubai AI Business Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Next Batch: Dec 15 & 22 (Weekends)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>9 AM - 5 PM GST</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Schedule */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Masterclass Schedule</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Day 1 */}
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-primary">Day 1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">Build Your AI Foundation</h3>
                        <p className="text-sm text-muted-foreground">Dec 15, Saturday</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold">AI Strategy & Planning (9-11 AM)</h4>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          <li>• AI opportunity assessment for your business</li>
                          <li>• ROI calculation frameworks</li>
                          <li>• Building your AI roadmap</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold">Essential AI Tools (11:30 AM-1 PM)</h4>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          <li>• ChatGPT for business automation</li>
                          <li>• Content creation with Claude & Gemini</li>
                          <li>• Advanced prompt engineering</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold">Hands-on Workshop (2-5 PM)</h4>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          <li>• Build your first AI automation</li>
                          <li>• Create marketing content with AI</li>
                          <li>• Design business processes</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Day 2 */}
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-secondary">Day 2</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">Deploy Your AI Stack</h3>
                        <p className="text-sm text-muted-foreground">Dec 22, Saturday</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold">Advanced AI Integration (9-11 AM)</h4>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          <li>• Visual AI tools for branding</li>
                          <li>• Voice AI for customer service</li>
                          <li>• Video AI for marketing</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold">Implementation Planning (11:30 AM-1 PM)</h4>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          <li>• Team training strategies</li>
                          <li>• Change management for AI</li>
                          <li>• Measuring AI success</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold">Your AI Business Plan (2-5 PM)</h4>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          <li>• Finalize your personalized AI stack</li>
                          <li>• 90-day implementation roadmap</li>
                          <li>• Certification & next steps</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* AI Tools Covered */}
            <div>
              <h2 className="text-3xl font-bold mb-8">25+ AI Tools You'll Master</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {tools.map((toolCategory, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="font-bold text-lg mb-4">{toolCategory.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {toolCategory.tools.map((tool, toolIndex) => (
                        <span 
                          key={toolIndex}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Who It's For */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Who It's For</h2>
              <p className="text-muted-foreground mb-6">Perfect for Dubai Professionals Ready to Lead with AI</p>
              <div className="grid md:grid-cols-3 gap-4">
                {targetAudience.map((audience, index) => (
                  <div 
                    key={index}
                    className="px-4 py-3 bg-secondary/10 rounded-lg text-center font-medium"
                  >
                    {audience}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Registration */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-medium mb-4">
                      <Users className="w-4 h-4" />
                      Limited to 50 Seats Only
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold">AED 2,499</span>
                      <span className="text-lg text-muted-foreground line-through">AED 4,999</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Early Bird Offer - Ends Soon!</p>
                  </div>

                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="Your Full Name*"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    
                    <div>
                      <Input
                        type="email"
                        placeholder="Business Email*"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    
                    <div>
                      <Input
                        type="tel"
                        placeholder="WhatsApp Number (Optional)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-12"
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full h-12 text-lg font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? "Securing Your Seat..." : "Secure Your Seat Now"}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>

                  <div className="mt-6 space-y-3">
                    <h4 className="font-semibold">What You Get:</h4>
                    <div className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-center">
                      <strong>Bonus:</strong> Get a free 1-hour consultation with Miss Akiru worth AED 500!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Instructor Section */}
        <div className="mt-20 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-6">Meet Your AI Instructor</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-primary mb-2">Miss Akiru</h3>
                  <p className="text-lg text-muted-foreground mb-4">Dubai's #1 AI Business Consultant</p>
                  <div className="space-y-2 text-sm">
                    <p>✓ Helped 500+ UAE businesses implement AI</p>
                    <p>✓ Saved companies over AED 50M in operational costs</p>
                    <p>✓ Featured speaker at Dubai AI Summit 2024</p>
                    <p>✓ Certified in 25+ AI platforms</p>
                    <p>✓ 10+ years in business automation</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <span className="text-6xl">👩‍💼</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIMasterclass;