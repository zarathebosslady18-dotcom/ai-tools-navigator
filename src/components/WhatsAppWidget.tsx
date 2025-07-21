import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppWidget = () => {
  const whatsappNumber = "+971501234567"; // Replace with actual WhatsApp number
  const message = "Hi! I'm interested in the AI Business Transformation Masterclass. Can you help me?";
  
  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        onClick={openWhatsApp}
        size="lg"
        className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default WhatsAppWidget;