import { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIHelpWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm here to help you with any questions about our AI Business Transformation Masterclass. Ask me anything!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const faqData = `
  FAQ Knowledge Base:
  
  Q: Who Is This Masterclass For?
  A: This masterclass is designed for Dubai professionals across all industries - from business owners and entrepreneurs to marketing teams, operations managers, and C-suite executives. No prior AI knowledge is required.
  
  Q: What Will I Learn In The Masterclass?
  A: You'll master 25+ AI tools, learn to build automated workflows, create AI-powered content, develop your personalized AI business roadmap, and get hands-on experience with the latest AI technologies for business transformation.
  
  Q: How Is The Masterclass Structured?
  A: The masterclass spans 2 days (Aug 10 & 17) from 9 AM to 5 PM GST. Day 1 focuses on AI foundations and essential tools. Day 2 covers advanced integration and your personalized AI implementation plan.
  
  Q: What Resources Will I Receive?
  A: You'll get access to 25+ premium AI tools, your personalized 90-day AI roadmap, 1-on-1 consultation with Miss Akiru, exclusive Dubai AI community access, certificate of completion, and 3 months of follow-up support.
  
  Q: What's The Pricing?
  A: Early Bird Special: AED 1,999 (60% off regular price of AED 4,999). Early bird offer ends August 6th.
  
  Q: How many seats are available?
  A: Only 20 seats are available for this exclusive masterclass.
  
  Q: Will I Get A Certificate?
  A: Yes, you'll receive an official AI Business Transformation certificate endorsed by The Economic Times, validating your expertise in AI business applications.
  
  Q: Do I Need Technical AI Skills To Join?
  A: Not at all! This masterclass is designed for business professionals with no technical background. We focus on practical business applications rather than technical implementation.
  `;

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-help', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          context: faqData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again or contact our support team directly.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating AI Help Button */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full w-14 h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
          >
            <Bot className="w-6 h-6" />
          </Button>
        )}
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-80 h-96">
          <Card className="h-full flex flex-col shadow-2xl border-2 border-primary/20">
            <CardHeader className="pb-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  AI Help Assistant
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          message.isUser
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-muted-foreground p-3 rounded-lg text-sm">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          Thinking...
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about the masterclass..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    size="icon"
                    disabled={isLoading || !inputMessage.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AIHelpWidget;