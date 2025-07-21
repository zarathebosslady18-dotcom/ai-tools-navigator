import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { triggerZapierWebhook } from "@/lib/webhook";

interface QuizQuestion {
  id: number;
  question: string;
  options: { value: string; label: string }[];
}

interface QuizAnswers {
  [key: string]: string;
}

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What's your business size?",
      options: [
        { value: "solo", label: "👤 Solo entrepreneur" },
        { value: "small", label: "👥 Small team (2-10 people)" },
        { value: "medium", label: "🏢 Medium business (11-50 people)" },
        { value: "large", label: "🏗️ Large company (50+ people)" }
      ]
    },
    {
      id: 2,
      question: "What's your biggest time drain?",
      options: [
        { value: "research", label: "🔍 Research and information gathering" },
        { value: "meetings", label: "📞 Meeting notes and follow-ups" },
        { value: "tasks", label: "📝 Repetitive manual tasks" },
        { value: "content", label: "✍️ Content creation and writing" }
      ]
    },
    {
      id: 3,
      question: "What's your monthly AI budget?",
      options: [
        { value: "free", label: "💸 $0 - Free tools only" },
        { value: "low", label: "💵 $1-50 per month" },
        { value: "medium", label: "💰 $51-200 per month" },
        { value: "high", label: "💎 $200+ per month" }
      ]
    },
    {
      id: 4,
      question: "What's your technical comfort level?",
      options: [
        { value: "beginner", label: "😅 Beginner - I need simple, plug-and-play" },
        { value: "intermediate", label: "🛠️ Intermediate - I can follow tutorials" },
        { value: "advanced", label: "💻 Advanced - I enjoy customizing and coding" }
      ]
    },
    {
      id: 5,
      question: "What's your priority?",
      options: [
        { value: "time", label: "⏰ Save time on daily tasks" },
        { value: "money", label: "💰 Reduce costs and subscriptions" },
        { value: "growth", label: "📈 Scale my business faster" },
        { value: "quality", label: "✨ Improve work quality" }
      ]
    }
  ];

  const generateRecommendations = () => {
    const recommendations = [];

    // Always include Arabic-specific and free options
    recommendations.push({
      category: "🇦🇪 Arabic AI Starter",
      tool: "ChatGPT + Yamli + Google Translate",
      price: "Free",
      why: "Perfect starting point for UAE businesses"
    });

    // Based on time drain
    if (answers.question2 === 'research') {
      recommendations.push({
        category: "🔍 Research Assistant",
        tool: "Perplexity AI Pro + Arabic Search",
        price: "AED 75/month",
        why: "Perfect for deep research with UAE market citations"
      });
    }

    if (answers.question2 === 'meetings') {
      recommendations.push({
        category: "📞 Meeting Assistant",
        tool: "Otter.ai Pro + Arabic Transcription",
        price: "AED 63/month",
        why: "Auto-transcribe English/Arabic meetings in Dubai"
      });
    }

    if (answers.question2 === 'tasks') {
      recommendations.push({
        category: "🤖 Automation Engine",
        tool: "Zapier Professional + UAE Banking",
        price: "AED 186/month",
        why: "Connect UAE banks & 1000+ apps without coding"
      });
    }

    if (answers.question2 === 'content') {
      recommendations.push({
        category: "✍️ Content Creator",
        tool: "Jasper AI + Arabic Content",
        price: "AED 148/month",
        why: "Create English & Arabic content for Dubai market"
      });
    }

    // Add Dubai compliance tool
    recommendations.push({
      category: "🛡️ UAE Compliance",
      tool: "Microsoft Purview + UAE Data Centers",
      price: "AED 280/month",
      why: "Ensure AI compliance with UAE data laws"
    });

    return recommendations;
  };

  const handleOptionSelect = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [`question${currentQuestion}`]: value
    }));
  };

  const nextQuestion = () => {
    if (!answers[`question${currentQuestion}`]) {
      toast({
        variant: "destructive",
        title: "Please select an option",
        description: "Choose an answer before continuing."
      });
      return;
    }

    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Recommendations sent!",
      description: "Check your email for your complete AI tools report."
    });
    
    // Trigger Zapier webhook with quiz completion data
    const recommendations = generateRecommendations();
    await triggerZapierWebhook({
      action_type: 'quiz_completion',
      email,
      timestamp: new Date().toISOString(),
      source_url: window.location.href,
      user_agent: navigator.userAgent,
      lead_data: {
        quiz_answers: answers,
        business_size: answers.question1,
        time_drain: answers.question2,
        budget_range: answers.question3,
        tech_level: answers.question4,
        priority: answers.question5,
        recommendations_count: recommendations.length,
        tools_recommended: recommendations.map(r => r.tool)
      }
    });
    
    // Reset quiz
    setCurrentQuestion(1);
    setAnswers({});
    setShowResults(false);
    setEmail("");
  };

  if (showResults) {
    const recommendations = generateRecommendations();
    
    return (
      <section id="quiz" className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">🎉 Your Personalized AI Stack</h2>
            <p className="text-xl mb-8 opacity-90">
              Based on your answers, here are the perfect AI tools for your Dubai business
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                  <h3 className="text-lg font-bold mb-2">{rec.category}</h3>
                  <h4 className="text-xl font-semibold mb-2 text-accent">{rec.tool}</h4>
                  <p className="font-bold text-lg mb-2">{rec.price}</p>
                  <p className="opacity-90">{rec.why}</p>
                </div>
              ))}
            </div>

            <div className="max-w-md mx-auto">
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for full recommendations"
                  required
                  className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:border-accent focus:outline-none"
                />
                <Button type="submit" size="lg" variant="glow" className="w-full">
                  Get Complete Report
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentQ = questions[currentQuestion - 1];

  return (
    <section id="quiz" className="py-20 bg-gradient-primary text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">🎯 Find Your Perfect AI Stack</h2>
          <p className="text-xl mb-8 opacity-90">
            Answer 5 quick questions to get personalized tool recommendations
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm opacity-70">Question {currentQuestion} of {questions.length}</span>
                <div className="w-1/3 bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-accent h-full rounded-full transition-all duration-300"
                    style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-8">{currentQ.question}</h3>
            </div>

            <div className="grid gap-4 mb-8">
              {currentQ.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left hover:bg-white/20 hover:border-accent ${
                    answers[`question${currentQuestion}`] === option.value
                      ? 'bg-white/20 border-accent'
                      : 'bg-white/5 border-white/20'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                onClick={previousQuestion}
                disabled={currentQuestion === 1}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                ← Previous
              </Button>
              <Button
                onClick={nextQuestion}
                variant="glow"
              >
                {currentQuestion === questions.length ? 'Get Results' : 'Next'} →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
