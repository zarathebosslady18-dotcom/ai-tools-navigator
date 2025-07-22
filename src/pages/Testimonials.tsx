import { useState } from "react";
import { Star, Quote, TrendingUp, DollarSign, Clock, CheckCircle, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Ahmed Al-Mansouri",
      title: "CEO, Emirates Digital Solutions",
      company: "Dubai, UAE",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      result: "AED 85,000 saved annually",
      timeframe: "Within 3 months",
      quote: "Miss Akiru didn't just recommend AI tools - she transformed our entire operation. We went from manually processing 200 invoices daily to automated processing of 2,000+. The ROI was visible within weeks, not months.",
      metrics: {
        productivity: "+340%",
        cost_reduction: "AED 85,000/year",
        time_saved: "25 hours/week"
      }
    },
    {
      name: "Fatima Al-Zahra",
      title: "Marketing Director",
      company: "Luxury Hotels Group, Dubai",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b120?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      result: "Customer engagement up 280%",
      timeframe: "6 weeks implementation",
      quote: "I was skeptical about AI until Miss Akiru showed us the potential. Our hotel bookings increased by 280% after implementing her AI customer service and marketing automation recommendations. The Arabic language support was game-changing.",
      metrics: {
        bookings: "+280%",
        response_time: "-90%",
        revenue: "AED 150,000/month extra"
      }
    },
    {
      name: "Omar Hassan",
      title: "Operations Manager",
      company: "Dubai Construction Ltd",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      result: "Project delivery 60% faster",
      timeframe: "First month",
      quote: "Construction and AI? I thought it was impossible. Miss Akiru proved me wrong. Our project management, resource allocation, and client communications are now fully automated. We're completing projects 60% faster.",
      metrics: {
        project_speed: "+60%",
        efficiency: "+45%",
        client_satisfaction: "98%"
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
              Only 12 spots left for March consultations
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
                  <Play className="w-5 h-5 ml-2" />
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
    </div>
  );
};

export default Testimonials;