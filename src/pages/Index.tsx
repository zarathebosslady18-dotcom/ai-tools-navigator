import { useState, useEffect } from "react";
import Header from "@/components/Header";
import MasterclassTeaser from "@/components/MasterclassTeaser";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import LeadMagnet from "@/components/LeadMagnet";
import Quiz from "@/components/Quiz";
import SavingsCalculator from "@/components/SavingsCalculator";
import ServicesSection from "@/components/ServicesSection";
import BookingSection from "@/components/BookingSection";
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
      <MasterclassTeaser />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <LeadMagnet />
      <Quiz />
      <SavingsCalculator />
      <ServicesSection />
      <BookingSection />
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
