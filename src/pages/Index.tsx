import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import LeadMagnet from "@/components/LeadMagnet";
import Quiz from "@/components/Quiz";
import ServicesSection from "@/components/ServicesSection";
import BookingSection from "@/components/BookingSection";
import Newsletter from "@/components/Newsletter";

const Index = () => {
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
      <Newsletter />
    </div>
  );
};

export default Index;
