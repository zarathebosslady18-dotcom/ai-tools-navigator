import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OffersSection from "@/components/OffersSection";
import WebinarFunnel from "@/components/WebinarFunnel";
import MiniCourseFunnel from "@/components/MiniCourseFunnel";
import CaseStudyFunnel from "@/components/CaseStudyFunnel";
import ROICalculatorFunnel from "@/components/ROICalculatorFunnel";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import LeadMagnet from "@/components/LeadMagnet";
import Quiz from "@/components/Quiz";
import SavingsCalculator from "@/components/SavingsCalculator";
import ServicesSection from "@/components/ServicesSection";
import MasterclassTeaser from "@/components/MasterclassTeaser";
import BookingSection from "@/components/BookingSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import EmailCaptureModal from "@/components/EmailCaptureModal";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import AIHelpWidget from "@/components/AIHelpWidget";
import RetargetingPixels from "@/components/RetargetingPixels";

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
      <RetargetingPixels />
      <Header />
      <Hero />
      <OffersSection />
      <WebinarFunnel />
      <MiniCourseFunnel />
      <CaseStudyFunnel />
      <ROICalculatorFunnel />
      <ProblemSection />
      <SolutionSection />
      <Quiz />
      <SavingsCalculator />
      <ServicesSection />
      <MasterclassTeaser />
      <BookingSection />
      <LeadMagnet />
      <Newsletter />
      <Footer />
      
      <EmailCaptureModal 
        isOpen={showEmailCapture} 
        onClose={() => setShowEmailCapture(false)} 
      />
      
      {/* Floating Widgets */}
      <WhatsAppWidget />
      <AIHelpWidget />
    </div>
  );
};

export default Index;
