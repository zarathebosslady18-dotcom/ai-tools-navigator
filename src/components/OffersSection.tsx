import { Calendar, Clock, Users, Award, CheckCircle, Star, ArrowRight, MessageSquare, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const OffersSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AI Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you need personalized consultation or comprehensive training, we have the perfect solution for your Dubai business.
          </p>
        </div>

        {/* Two Main Offers */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* AI Consultation Card */}
          <Card className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl">
            <div className="absolute top-4 right-4">
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                <MessageSquare className="w-4 h-4 inline mr-1" />
                1-on-1 Expert
              </div>
            </div>
            
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">AI Tools Consultation</CardTitle>
              <p className="text-muted-foreground">Get personalized AI recommendations for your specific Dubai business needs</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Free 5-minute AI assessment</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>1-hour strategy call (AED 356)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Custom AI roadmap for UAE market</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Done-for-you setup available</span>
                </div>
              </div>

              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">START FREE</div>
                  <div className="text-sm text-muted-foreground">Then from AED 356</div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Take Free Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Book Strategy Call
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Masterclass Card */}
          <Card className="relative overflow-hidden border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-xl">
            <div className="absolute top-4 right-4">
              <div className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                <Star className="w-4 h-4 inline mr-1" />
                60% OFF
              </div>
            </div>
            
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/60 rounded-2xl flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">AI Business Masterclass</CardTitle>
              <p className="text-muted-foreground">Master 25+ AI tools and get certified in just 2 weekends</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span>25+ AI tools mastery</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span>Personal 90-day AI roadmap</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span>Dubai AI Business certification</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span>3 months follow-up support</span>
                </div>
              </div>

              <div className="bg-secondary/5 p-4 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-3xl font-bold text-secondary">AED 1,999</span>
                    <span className="text-lg text-muted-foreground line-through">AED 4,999</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Early Bird - Ends Aug 6th</div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Aug 10 & 17 (Weekends)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>9 AM - 5 PM GST</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Only 20 seats available</span>
                </div>
              </div>

              <Link to="/masterclass" className="block">
                <Button size="lg" variant="secondary" className="w-full">
                  Register Now - Save AED 3,000
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Not sure which option is right for you?
          </p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Take Our Free AI Assessment
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;