import { useState } from "react";
import { TrendingUp, Download, CheckCircle, ArrowRight, Building, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const CaseStudyFunnel = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const results = [
    { metric: "Monthly Savings", value: "AED 15,420", icon: DollarSign },
    { metric: "Time Saved", value: "120 hours/week", icon: TrendingUp },
    { metric: "Efficiency Increase", value: "340%", icon: CheckCircle },
    { metric: "ROI Timeline", value: "6 weeks", icon: Building }
  ];

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Case Study Sent!",
        description: "Check your email for the complete 12-page analysis.",
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-medium mb-6">
              <Building className="w-4 h-4" />
              REAL DUBAI SUCCESS STORY
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How AlMadar Trading
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Saved AED 15,420 Monthly
              </span>
              <br />
              With AI Automation
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Dubai-based trading company transforms operations with AI. 
              Complete breakdown: tools used, implementation timeline, exact ROI calculations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Case Study Preview */}
            <div className="space-y-8">
              {/* Results Grid */}
              <div className="grid grid-cols-2 gap-4">
                {results.map((result, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <result.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                      <div className="text-2xl font-bold text-primary mb-1">{result.value}</div>
                      <div className="text-sm text-muted-foreground">{result.metric}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Company Overview */}
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Company Profile: AlMadar Trading LLC</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>150+ employees across Dubai & Abu Dhabi</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Import/Export business with 200+ suppliers</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Processing 500+ orders daily in Arabic & English</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Previous software costs: AED 23,000/month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What You'll Learn */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Inside This 12-Page Case Study:</h3>
                <div className="space-y-3">
                  {[
                    "Exact AI tools implemented (with Arabic support)",
                    "Step-by-step implementation timeline (16 weeks)",
                    "Complete cost breakdown: before vs after",
                    "Team training strategy that worked",
                    "UAE compliance considerations & solutions",
                    "Mistakes to avoid (they made them so you don't have to)",
                    "Templates & checklists used in the project"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Download Form */}
            <div className="lg:pl-8">
              <Card className="border-2 border-primary/20 sticky top-8">
                <CardHeader className="text-center">
                  <Download className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <CardTitle className="text-2xl">Get the Complete Case Study</CardTitle>
                  <p className="text-muted-foreground">12-page detailed analysis + implementation guide</p>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleDownload} className="space-y-6">
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
                    >
                      {isLoading ? "Sending..." : "Download Case Study FREE"}
                      <Download className="w-5 h-5 ml-2" />
                    </Button>
                    
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-4">
                        Instant download. No spam, ever.
                        <br />Specifically analyzed for Dubai businesses.
                      </p>
                      
                      <div className="bg-primary/5 p-4 rounded-lg">
                        <p className="text-sm font-medium text-primary mb-2">
                          🎁 BONUS: Get 30-minute consultation call
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Discuss how to implement similar results in your business
                        </p>
                      </div>
                    </div>
                  </form>
                  
                  <div className="mt-6 pt-6 border-t text-center">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">2,400+ downloads</span> from Dubai business owners
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      ⭐⭐⭐⭐⭐ "Best AI case study I've read" - Sarah Al-Mansouri, CEO
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyFunnel;