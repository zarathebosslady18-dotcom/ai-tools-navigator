import { useState } from "react";
import { Calendar, Clock, Users, Award, CheckCircle, Star, ArrowRight, ArrowLeft, Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
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
      answer: "The masterclass spans 2 days (Aug 10 & 17) from 9 AM to 5 PM GST. Day 1 focuses on AI foundations and essential tools. Day 2 covers advanced integration and your personalized AI implementation plan."
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
    },
    {
      question: "What's The Refund Policy?",
      answer: "We offer a 100% satisfaction guarantee. If you're not completely satisfied after Day 1, we'll provide a full refund, no questions asked."
    },
    {
      question: "Is There Any Post-Masterclass Support?",
      answer: "Yes! You get 3 months of follow-up support, access to our exclusive Dubai AI Leaders community, monthly Q&A sessions, and priority access to future advanced workshops."
    },
    {
      question: "What Makes This Different From Online Courses?",
      answer: "This is a live, interactive experience with hands-on workshops, personalized coaching, networking with Dubai professionals, and immediate implementation support - not just watching videos."
    },
    {
      question: "Can I Attend If I'm Not Based In Dubai?",
      answer: "While the masterclass is designed for Dubai professionals and includes local business context, we welcome participants from across the UAE and GCC region."
    },
    {
      question: "What AI Tools Will Be Covered?",
      answer: "We cover 25+ tools including ChatGPT, Claude, Gemini Pro, Copy.ai, Midjourney, Canva AI, Zapier, Make, ElevenLabs, Runway, HeyGen, and many more across different business functions."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link to="/masterclass" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Masterclass
        </Link>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-medium border border-primary/20 mb-6">
              <Star className="w-4 h-4" />
              AI Business Transformation Masterclass
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Questions
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about the AI Business Transformation Masterclass
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-6 bg-card"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
                <p className="text-muted-foreground mb-6">
                  Our team is here to help! Get in touch and we'll answer any questions you have about the masterclass.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/masterclass">
                    <Button size="lg" className="w-full sm:w-auto">
                      Register Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Contact Support
                  </Button>
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

export default FAQ;