import { useState } from "react";
import { Calendar, Clock, Users, Award, CheckCircle, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const MasterclassTeaser = () => {
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">AED 2,499</span>
              <span className="text-lg text-muted-foreground line-through">AED 4,999</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-medium">
              <Users className="w-4 h-4" />
              Limited to 50 Seats Only
            </div>
          </div>
        </div>

        {/* Quick Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="font-bold text-lg mb-2">25+ AI Tools</h3>
            <p className="text-muted-foreground text-sm">Master the complete AI business toolkit</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Personal AI Roadmap</h3>
            <p className="text-muted-foreground text-sm">Get your customized 90-day implementation plan</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Dubai Certified</h3>
            <p className="text-muted-foreground text-sm">Official AI Business certification + 3 months support</p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link to="/masterclass">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              View Full Details & Register
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Early Bird Offer Ends Soon! Save AED 2,500
          </p>
        </div>
      </div>
    </section>
  );
};

export default MasterclassTeaser;