import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import LeadMagnet from "@/components/LeadMagnet";
import Quiz from "@/components/Quiz";
import ServicesSection from "@/components/ServicesSection";
import BookingSection from "@/components/BookingSection";
import ZapierWebhook from "@/components/ZapierWebhook";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import EmailCaptureModal from "@/components/EmailCaptureModal";

const Index = () => {
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEmailCapture(true);
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <LeadMagnet />
      <Quiz />
      <ServicesSection />
      <BookingSection />
      <ZapierWebhook />
      <Newsletter />
      <Footer />
      
      <EmailCaptureModal 
        isOpen={showEmailCapture} 
        onClose={() => setShowEmailCapture(false)} 
      />
    </div>
  );
};

export default Index;
