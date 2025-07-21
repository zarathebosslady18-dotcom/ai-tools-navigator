import { useState } from "react";
import { Mail, CheckCircle, ArrowRight, BookOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const MiniCourseFunnel = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const courseModules = [
    {
      day: 1,
      title: "AI Audit: What Your Dubai Business Actually Needs",
      description: "Assess your current tools and identify AI opportunities specific to UAE market"
    },
    {
      day: 2,
      title: "The Dubai AI Stack: Essential Tools for Local Businesses",
      description: "Top 5 AI tools every UAE business should implement (with Arabic support)"
    },
    {
      day: 3,
      title: "Implementation Roadmap for UAE Compliance",
      description: "Step-by-step guide ensuring your AI setup meets Dubai's business requirements"
    },
    {
      day: 4,
      title: "Team Training & Change Management",
      description: "How to get your Dubai team excited about AI (not afraid of it)"
    },
    {
      day: 5,
      title: "Measuring ROI & Scaling Your AI Success",
      description: "Track your AED savings and plan for advanced AI integration"
    }
  ];

  const handleCourseSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome to the Course!",
        description: "Day 1 will arrive in your inbox in 5 minutes.",
      });
      setEmail("");
      setName("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              FREE 5-DAY EMAIL COURSE
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Master AI Implementation
              <br />
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                For Dubai Businesses
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Get a new lesson delivered to your inbox every day for 5 days. 
              By the end, you'll have a complete roadmap to implement AI in your Dubai business.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Course Modules */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6">Your 5-Day Journey:</h3>
              
              {courseModules.map((module, index) => (
                <Card key={index} className="border-l-4 border-l-accent">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-accent font-bold">Day {module.day}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{module.title}</h4>
                        <p className="text-muted-foreground text-sm">{module.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="bg-accent/5 p-6 rounded-lg mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="font-semibold">Bonus Materials Included:</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                  <li>• UAE AI Compliance Checklist</li>
                  <li>• Arabic AI Tools Directory</li>
                  <li>• ROI Calculation Template</li>
                  <li>• Implementation Timeline Template</li>
                </ul>
              </div>
            </div>

            {/* Right: Signup Form */}
            <div className="lg:pl-8">
              <Card className="border-2 border-accent/20 sticky top-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Start Your Free Course</CardTitle>
                  <p className="text-muted-foreground">Join 1,200+ Dubai business owners</p>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleCourseSignup} className="space-y-4">
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
                    >
                      {isLoading ? "Enrolling..." : "Start Free Course Now"}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      Unsubscribe anytime. No spam, ever.
                      <br />Specifically designed for UAE business needs.
                    </p>
                  </form>
                  
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>Daily at 9 AM GST</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>5 days total</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <p className="text-sm font-medium text-accent">
                        ⭐ 4.9/5 rating from 800+ completed students
                      </p>
                    </div>
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

export default MiniCourseFunnel;