import { useState, useEffect } from "react";
import { Calendar, Clock, Users, Award, CheckCircle, Star, ArrowRight, ArrowLeft, Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { triggerZapierWebhook } from "@/lib/webhook";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Masterclass = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const { toast } = useToast();

  // Countdown to early bird deadline (August 1st, 2024)
  useEffect(() => {
    const targetDate = new Date('2024-08-01T23:59:59').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    "Marketing & Growth Professionals", 
    "Sales Teams",
    "Customer Support Specialists",
    "Business Leaders & Entrepreneurs",
    "Product Managers",
    "HR & Talent Professionals",
    "Operations & Logistics Teams",
    "Designers & Creatives",
    "Tech Enthusiasts & Developers",
    "Finance & Accounting Professionals"
  ];

  const testimonials = [
    {
      name: "Hemant Walia",
      title: "Founder",
      company: "Ace Square Realty",
      quote: "This masterclass transformed how we approach real estate with AI. The practical tools we learned are already saving us hours daily.",
      avatar: "👨‍💼"
    },
    {
      name: "Aditya Telidevara", 
      title: "Senior Manager AI Tech Operations",
      company: "Seismic Inc",
      quote: "Incredible depth of knowledge. Miss Akiru breaks down complex AI concepts into actionable business strategies.",
      avatar: "👨‍💻"
    },
    {
      name: "Dr. Neelu",
      title: "Assistant Professor",
      company: "IIIT Lucknow",
      quote: "Perfect blend of theory and practice. My students are now implementing these AI tools in their projects.",
      avatar: "👩‍🏫"
    },
    {
      name: "Anshita Sharma",
      title: "Deputy General Manager", 
      company: "HCL",
      quote: "The ROI we've seen from implementing these AI strategies has been phenomenal. Worth every dirham!",
      avatar: "👩‍💼"
    }
  ];

  const faqs = [
    {
      question: "Who Is This Masterclass For?",
      answer: "This masterclass is designed for Dubai professionals across all industries - from business owners and entrepreneurs to marketing teams, operations managers, and C-suite executives. No prior AI knowledge is required."
    },
    {
      question: "What Will I Learn In The Masterclass?", 
      answer: "You'll master 25+ AI tools, learn to build automated workflows, create AI-powered content, develop your personalized AI business roadmap, and get hands-on experience with the latest AI technologies for business transformation."
    },
    {
      question: "How Is The Masterclass Structured?",
      answer: "The masterclass spans 2 days (Dec 15 & 22) from 9 AM to 5 PM GST. Day 1 focuses on AI foundations and essential tools. Day 2 covers advanced integration and your personalized AI implementation plan."
    },
    {
      question: "What Resources Will I Receive?",
      answer: "You'll get access to 25+ premium AI tools, your personalized 90-day AI roadmap, 1-on-1 consultation with Miss Akiru, exclusive Dubai AI community access, certificate of completion, and 3 months of follow-up support."
    },
    {
      question: "What Is The Duration Of The Masterclass?",
      answer: "The masterclass is a comprehensive 2-day program (16 hours total) spread across two weekends to ensure you can implement learnings between sessions."
    },
    {
      question: "How Will This Masterclass Impact My Business Growth?",
      answer: "Previous participants have reported 40-60% increase in productivity, significant cost savings through automation, improved customer engagement, and faster decision-making processes within 90 days of implementation."
    },
    {
      question: "Will I Have Access To Trainers For Guidance?",
      answer: "Yes! You'll have direct access to Miss Akiru during the masterclass, a 1-on-1 consultation session, and 3 months of follow-up support through our exclusive community."
    },
    {
      question: "What If I Miss A Session?",
      answer: "All sessions are recorded and available for 6 months. However, we highly recommend attending live for the interactive elements and networking opportunities."
    },
    {
      question: "Will I Get A Certificate?",
      answer: "Yes, you'll receive an official AI Business Transformation certificate endorsed by The Economic Times, validating your expertise in AI business applications."
    },
    {
      question: "Do I Need Technical AI Skills To Join?",
      answer: "Not at all! This masterclass is designed for business professionals with no technical background. We focus on practical business applications rather than technical implementation."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
          </div>

          {/* Countdown Timer */}
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-destructive/10 to-destructive/5 border border-destructive/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-destructive mb-4">⚡ Early Bird Offer Ends In:</h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-background rounded-lg p-3 border">
                  <div className="text-2xl font-bold text-destructive">{timeLeft.days}</div>
                  <div className="text-xs text-muted-foreground">Days</div>
                </div>
                <div className="bg-background rounded-lg p-3 border">
                  <div className="text-2xl font-bold text-destructive">{timeLeft.hours}</div>
                  <div className="text-xs text-muted-foreground">Hours</div>
                </div>
                <div className="bg-background rounded-lg p-3 border">
                  <div className="text-2xl font-bold text-destructive">{timeLeft.minutes}</div>
                  <div className="text-xs text-muted-foreground">Minutes</div>
                </div>
                <div className="bg-background rounded-lg p-3 border">
                  <div className="text-2xl font-bold text-destructive">{timeLeft.seconds}</div>
                  <div className="text-xs text-muted-foreground">Seconds</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Save AED 3,000 with Early Bird Pricing!
              </p>
            </div>
          </div>

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
                <span>Next Batch: Aug 10 & 17 (Weekends)</span>
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
                          <p className="text-sm text-muted-foreground">Aug 10, Saturday</p>
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
                          <p className="text-sm text-muted-foreground">Aug 17, Saturday</p>
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
              <h2 className="text-3xl font-bold mb-4">Who It&apos;s For</h2>
              <p className="text-muted-foreground mb-6">Perfect for Decision-Makers Across Functions</p>
              <div className="grid md:grid-cols-3 gap-3">
                {targetAudience.map((audience, index) => (
                  <div 
                    key={index}
                    className="px-4 py-3 bg-secondary/10 rounded-lg text-center font-medium text-sm border border-secondary/20 hover:bg-secondary/20 transition-colors"
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
                      <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-medium mb-4 animate-pulse">
                        <Users className="w-4 h-4" />
                        Only 20 Seats Available!
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-4xl font-bold text-primary">AED 1,999</span>
                          <div className="text-right">
                            <div className="text-lg text-muted-foreground line-through">AED 4,999</div>
                            <div className="text-sm text-destructive font-semibold">60% OFF</div>
                          </div>
                        </div>
                        <p className="text-sm text-destructive font-medium">🔥 Early Bird Special - Ends Aug 1st!</p>
                      </div>

                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3 mb-4">
                        <p className="text-sm font-semibold">Regular Price After Aug 1st: AED 4,999</p>
                        <p className="text-xs text-muted-foreground">Save AED 3,000 by registering now!</p>
                      </div>
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

                    <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                      <div className="text-center">
                        <p className="text-sm font-semibold mb-2">
                          🎁 <strong>Bonus:</strong> Free 1-hour consultation with Miss Akiru (Worth AED 800!)
                        </p>
                        <p className="text-xs text-muted-foreground">
                          + Exclusive access to Dubai AI Leaders WhatsApp group
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

        {/* Success Stories Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Real Stories. Real Impact.{" "}
              <span className="text-primary">Real Success.</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">92%</div>
              <p className="text-muted-foreground">Rated it extremely valuable</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-2">4.6/5</div>
              <p className="text-muted-foreground">Average rating from 2000+ professionals</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">1 in 3</div>
              <p className="text-muted-foreground">Applied AI at work in 2 weeks</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              From Learners to{" "}
              <span className="text-primary">AI Leaders</span>
            </h2>
            <p className="text-muted-foreground">
              From marketers to HR managers to founders — this class is helping people unlock their next level with AI
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  {/* Video Placeholder */}
                  <div className="aspect-video bg-black rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/40" />
                    <Play className="w-16 h-16 text-white opacity-80" />
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-muted-foreground text-sm mb-2">
                        {testimonial.title}
                      </p>
                      <p className="text-muted-foreground text-sm mb-3">
                        {testimonial.company}
                      </p>
                      <p className="text-sm italic">
                        &quot;{testimonial.quote}&quot;
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Got Questions?</h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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

      <Footer />
    </div>
  );
};

export default Masterclass;