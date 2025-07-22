import { useState } from "react";
import { Star, Quote, TrendingUp, DollarSign, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import AIHelpWidget from "@/components/AIHelpWidget";

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      title: "Founder & CEO",
      company: "TechVision Consulting, Dubai",
      image: "/lovable-uploads/b355bc61-c0af-4091-8f51-75b3c45cc01f.png",
      rating: 5,
      result: "AED 120,000 saved annually",
      timeframe: "Within 2 months",
      quote: "Miss Akiru's AI implementation strategy completely revolutionized our consulting firm. We automated our client onboarding, report generation, and follow-up processes. Our team productivity increased by 400% and client satisfaction hit an all-time high.",
      metrics: {
        productivity: "+400%",
        cost_reduction: "AED 120,000/year",
        client_satisfaction: "98%"
      }
    },
    {
      name: "Amara Williams",
      title: "Executive Director",
      company: "Emirates Finance Group",
      image: "/lovable-uploads/df12d5b5-d1fb-48f5-af06-652cb4fcac9d.png",
      rating: 5,
      result: "Revenue increased by 320%",
      timeframe: "4 weeks implementation",
      quote: "I was drowning in manual financial analysis until Miss Akiru introduced AI-powered solutions. Now our risk assessment, portfolio management, and client reporting are fully automated. We're processing 10x more clients with the same team size.",
      metrics: {
        revenue: "+320%",
        efficiency: "+1000%",
        processing_time: "-85%"
      }
    },
    {
      name: "Zara Ahmed",
      title: "Creative Director",
      company: "Mirage Digital Agency",
      image: "/lovable-uploads/d9e13406-a8f3-4ff6-a742-7b08f32e7b77.png",
      rating: 5,
      result: "Campaign ROI up 275%",
      timeframe: "First month",
      quote: "Miss Akiru showed us how to leverage AI for creative campaigns and client management. Our social media automation, content generation, and performance tracking are now seamless. Clients are amazed by our speed and accuracy.",
      metrics: {
        roi: "+275%",
        campaign_speed: "+300%",
        client_retention: "95%"
      }
    },
    {
      name: "Maya Rodriguez",
      title: "Restaurant Owner",
      company: "Fusion Bistro Chain, Abu Dhabi",
      image: "/lovable-uploads/b1c753b5-df63-49f6-b050-1083500295c8.png",
      rating: 5,
      result: "Costs reduced by AED 75,000",
      timeframe: "6 weeks",
      quote: "Running multiple restaurants was a nightmare until Miss Akiru implemented AI solutions for inventory, staff scheduling, and customer service. Our food waste dropped by 60% and customer wait times are practically zero now.",
      metrics: {
        cost_reduction: "AED 75,000/year",
        waste_reduction: "-60%",
        efficiency: "+180%"
      }
    },
    {
      name: "David Mitchell",
      title: "Senior Partner",
      company: "Gulf Legal Associates",
      image: "/lovable-uploads/319f553f-90eb-4dbd-b86f-70a9ee1e88b6.png",
      rating: 5,
      result: "Case processing 450% faster",
      timeframe: "3 months",
      quote: "Legal work and AI seemed incompatible until Miss Akiru proved otherwise. Our document review, case research, and client communication are now automated. We're handling 5x more cases with unprecedented accuracy.",
      metrics: {
        case_speed: "+450%",
        accuracy: "+95%",
        billable_hours: "+300%"
      }
    },
    {
      name: "Alexander Petrov",
      title: "Investment Director",
      company: "Dubai Capital Ventures",
      image: "/lovable-uploads/638880f3-91b8-4d63-9c1b-6cf85ed0f31b.png",
      rating: 5,
      result: "Portfolio returns up 185%",
      timeframe: "8 weeks",
      quote: "Miss Akiru's AI solutions transformed our investment analysis and risk management. We're now identifying opportunities 10x faster and our predictive models have an 94% accuracy rate. Our clients are seeing incredible returns.",
      metrics: {
        returns: "+185%",
        analysis_speed: "+1000%",
        accuracy: "94%"
      }
    },
    {
      name: "Hassan & Nadia Al-Rashid",
      title: "Co-Founders",
      company: "Family Business Consulting",
      image: "/lovable-uploads/2bc3de43-6747-4ec7-b04a-719b0ec53afa.png",
      rating: 5,
      result: "Family business efficiency up 240%",
      timeframe: "5 weeks",
      quote: "Miss Akiru helped us modernize our traditional family business with AI. From succession planning to operational efficiency, every aspect improved. Our multi-generational team now works seamlessly together using smart automation.",
      metrics: {
        efficiency: "+240%",
        collaboration: "+200%",
        satisfaction: "97%"
      }
    },
    {
      name: "Eleanor Thompson",
      title: "Wellness Center Director",
      company: "Serenity Health & Spa, Dubai",
      image: "/lovable-uploads/bd325d4f-4dae-4aa7-95eb-5b0fe6354c46.png",
      rating: 5,
      result: "Client bookings up 190%",
      timeframe: "4 weeks",
      quote: "Miss Akiru's AI solutions revolutionized our wellness center operations. From appointment scheduling to personalized treatment recommendations, everything runs smoothly. Our clients love the seamless experience and personalized care.",
      metrics: {
        bookings: "+190%",
        satisfaction: "96%",
        efficiency: "+150%"
      }
    },
    {
      name: "Marcus Johnson",
      title: "Fitness Studio Owner",
      company: "Elite Performance Gym, Sharjah",
      image: "/lovable-uploads/49a8ba69-cf1a-40ae-8de3-9972949c612a.png",
      rating: 5,
      result: "Membership growth 310%",
      timeframe: "6 weeks",
      quote: "Miss Akiru transformed my gym from struggling to thriving. AI-powered member management, personalized workout plans, and automated nutrition tracking increased our retention rate to 89%. We're now the top gym in Sharjah.",
      metrics: {
        membership: "+310%",
        retention: "89%",
        revenue: "+250%"
      }
    }
  ];

  const urgencyStats = [
    { number: "73%", label: "of Dubai businesses will use AI by 2025", color: "text-destructive" },
    { number: "AED 2.3B", label: "AI market value in UAE by 2025", color: "text-primary" },
    { number: "18 months", label: "average time competitors take to catch up", color: "text-secondary" },
    { number: "47%", label: "of businesses report being left behind", color: "text-destructive" }
  ];

  const fearFactors = [
    {
      icon: <TrendingUp className="w-8 h-8 text-destructive" />,
      title: "Your Competitors Are Already Ahead",
      description: "While you're reading this, 3 of your competitors just automated their customer service. Don't let them capture YOUR market share."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-destructive" />,
      title: "Every Day Costs You AED 1,200+",
      description: "Manual processes are bleeding your profits. Each day without AI optimization costs the average Dubai business AED 1,200 in lost efficiency."
    },
    {
      icon: <Clock className="w-8 h-8 text-destructive" />,
      title: "The Window Is Closing Fast",
      description: "Early AI adopters in Dubai are seeing 10x returns. By 2025, AI will be table stakes - not a competitive advantage."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section with Urgency */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-6 py-2 rounded-full text-sm font-medium border border-destructive/20 mb-6 animate-pulse">
              <Clock className="w-4 h-4" />
              Only 12 spots left for July consultations
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              They Acted Fast.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Now They're Winning.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              While their competitors struggled with manual processes, these Dubai businesses 
              <span className="text-primary font-semibold"> implemented AI and gained an unfair advantage</span>. 
              Here's proof it works...
            </p>

            {/* Urgency Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {urgencyStats.map((stat, index) => (
                <div key={index} className="bg-background/80 backdrop-blur p-6 rounded-2xl border border-border shadow-card">
                  <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Real Results From Real{" "}
              <span className="text-primary">Dubai Businesses</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These aren't fake reviews. These are documented results from businesses 
              that chose to act while their competitors hesitated.
            </p>
          </div>

          {/* Featured Testimonial */}
          <div className="max-w-6xl mx-auto mb-16">
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 shadow-2xl">
              <CardContent className="p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <Quote className="w-16 h-16 text-primary mb-6" />
                    <blockquote className="text-2xl font-medium text-foreground mb-8 leading-relaxed">
                      "{testimonials[selectedTestimonial].quote}"
                    </blockquote>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <img 
                        src={testimonials[selectedTestimonial].image}
                        alt={testimonials[selectedTestimonial].name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-bold text-lg">{testimonials[selectedTestimonial].name}</div>
                        <div className="text-muted-foreground">{testimonials[selectedTestimonial].title}</div>
                        <div className="text-sm text-primary">{testimonials[selectedTestimonial].company}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">Verified Result</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-background p-6 rounded-2xl border border-border">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {testimonials[selectedTestimonial].result}
                      </div>
                      <div className="text-muted-foreground">
                        Achieved in {testimonials[selectedTestimonial].timeframe}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(testimonials[selectedTestimonial].metrics).map(([key, value], index) => (
                        <div key={index} className="bg-background p-4 rounded-xl border border-border text-center">
                          <div className="text-xl font-bold text-primary">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key.replace('_', ' ')}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Testimonial Selection */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setSelectedTestimonial(index)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  selectedTestimonial === index 
                    ? 'border-primary bg-primary/5 shadow-glow' 
                    : 'border-border bg-background hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-primary">{testimonial.result}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Fear/Urgency Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-destructive">
              Don't Let This Be Your Story
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every day you wait, competitors gain ground. Here's what happens when businesses hesitate...
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {fearFactors.map((factor, index) => (
              <Card key={index} className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    {factor.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-destructive">{factor.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{factor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 p-12 rounded-3xl border border-primary/20">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Join The Winners. Act Now.
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              These businesses didn't wait for "perfect timing." They acted when they saw the opportunity. 
              <span className="text-primary font-semibold"> Your spot is still available.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#consultation">
                <Button size="lg" className="text-lg px-8 py-4">
                  Get My AI Assessment Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/#booking">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Book Strategy Call
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-6 text-sm text-muted-foreground">
              ⏰ Only 12 consultation slots available this month
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Floating Widgets */}
      <WhatsAppWidget />
      <AIHelpWidget />
    </div>
  );
};

export default Testimonials;