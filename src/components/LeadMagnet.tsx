import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const LeadMagnet = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Success! Check Your Email",
      description: "Your Dubai AI Toolkit is on its way!"
    });
    
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const benefits = [
    {
      icon: "📊",
      title: "50+ AI Tools Compared",
      description: "Free vs Paid options for every Dubai business need"
    },
    {
      icon: "🇦🇪",
      title: "Arabic AI Solutions",
      description: "Best tools for Arabic content and UAE market"
    },
    {
      icon: "💰",
      title: "ROI Calculator",
      description: "Calculate your AI savings in AED"
    },
    {
      icon: "🛡️",
      title: "UAE Compliance Guide",
      description: "Data privacy & legal requirements"
    }
  ];

  if (isSubmitted) {
    return (
      <section id="lead-magnet" className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
              <h3 className="text-3xl font-bold text-accent mb-4">🎉 Success! Check Your Email</h3>
              <p className="text-xl mb-6">
                Your Dubai AI Toolkit is on its way!<br />
                Check your inbox in the next 2 minutes.
              </p>
              <Button 
                size="lg" 
                variant="glow"
                onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
              >
                💬 Book Your Strategy Call (50% Off)
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-magnet" className="py-20 bg-gradient-primary text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            🎁 FREE: "Dubai Business AI Toolkit 2025"
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get the complete guide that 500+ Dubai businesses use to choose AI tools
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h4 className="font-bold mb-2">{benefit.title}</h4>
                <p className="text-sm opacity-90">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:border-accent focus:outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email Address"
                required
                className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:border-accent focus:outline-none"
              />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company Name (Optional)"
                className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:border-accent focus:outline-none"
              />
              <Button type="submit" size="lg" variant="glow" className="w-full">
                📥 Download Free Guide (Worth AED 267)
              </Button>
              <p className="text-sm opacity-80">
                ✅ Instant download • ✅ No spam • ✅ Dubai-focused content
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;