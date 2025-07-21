import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    time: "",
    challenge: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Booking Received!",
      description: "We'll send you a calendar invite within 2 hours."
    });
    
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-background p-12 rounded-3xl shadow-card text-center">
              <h3 className="text-3xl font-bold text-secondary mb-4">📅 Booking Received!</h3>
              <p className="text-lg font-semibold mb-6 text-foreground">Next Steps:</p>
              <div className="text-left space-y-3 mb-6 bg-muted/50 p-6 rounded-2xl">
                <p className="flex items-center gap-2">
                  <span className="text-secondary">✅</span>
                  Calendar invite sent to your email
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-secondary">✅</span>
                  WhatsApp confirmation coming soon
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-secondary">✅</span>
                  Pre-session AI audit form will arrive tomorrow
                </p>
              </div>
              <div className="bg-primary/10 p-4 rounded-2xl">
                <p className="text-sm text-foreground">
                  <strong>Can't wait?</strong> WhatsApp us at +971-XX-XXX-XXXX for immediate assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            📅 Book Your Dubai AI Strategy Session
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose your preferred time for a consultation with Dubai's AI Tools Expert
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-background rounded-3xl shadow-card p-8 border border-border">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-6">📞 Video Call Options</h3>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-2xl">
                  <h4 className="font-bold text-foreground mb-3">📞 Call Options:</h4>
                  <div className="space-y-1 text-muted-foreground">
                    <p>• Video Call or Voice Call available</p>
                    <p>• Monday-Thursday: 9:00 AM - 6:00 PM</p>
                    <p>• Friday: Closed</p>
                    <p>• Saturday/Sunday: Unavailable (Priority clients only)</p>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-2xl">
                  <h4 className="font-bold text-foreground mb-3">🎯 What You'll Get:</h4>
                  <div className="space-y-1 text-muted-foreground">
                    <p>• AI tools assessment for your business</p>
                    <p>• Custom roadmap with AED savings</p>
                    <p>• UAE compliance checklist</p>
                    <p>• Arabic AI recommendations</p>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-2xl">
                  <h4 className="font-bold text-foreground mb-2">💰 Investment:</h4>
                  <p className="text-lg font-semibold text-foreground">AED 356 (normally AED 500)</p>
                  <p className="text-sm text-muted-foreground">Payment via Pioneer • Satisfaction guaranteed</p>
                </div>
              </div>

              <div className="bg-muted/50 p-8 rounded-2xl">
                <h4 className="text-xl font-bold text-center text-foreground mb-6">Book Your Session</h4>
                
                <div className="calendly-inline-widget rounded-xl overflow-hidden" 
                     data-url="https://calendly.com/zarathebosslady18?background_color=0c0b0b&primary_color=42ec6a" 
                     style={{minWidth:'320px', height:'700px'}}></div>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Select your preferred time slot above
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;