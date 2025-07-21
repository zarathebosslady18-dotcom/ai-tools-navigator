import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calculator, Clock, DollarSign, TrendingUp, Users, Zap } from "lucide-react";
import { triggerZapierWebhook } from "@/lib/webhook";

interface SavingsCalculatorProps {
  initialEmployees?: number;
  initialMonthlyCosts?: number;
  onBookConsultation?: () => void;
}

const SavingsCalculator = ({ 
  initialEmployees = 10, 
  initialMonthlyCosts = 5000,
  onBookConsultation 
}: SavingsCalculatorProps) => {
  const [employees, setEmployees] = useState([initialEmployees]);
  const [monthlyCosts, setMonthlyCosts] = useState([initialMonthlyCosts]);
  const [animatedSavings, setAnimatedSavings] = useState(0);
  const [animatedTimeSavings, setAnimatedTimeSavings] = useState(0);

  // Dubai average hourly rate for business operations (AED 110 = ~$30 USD)
  const hourlyRate = 30;
  
  // AI efficiency gains based on Dubai market research
  const efficiencyGain = 0.32; // 32% average productivity increase
  const costReduction = 0.28; // 28% operational cost reduction
  const hoursPerEmployeePerWeek = 40;
  const weeksPerMonth = 4.33;

  // Calculate savings
  const monthlySalaryPerEmployee = hourlyRate * hoursPerEmployeePerWeek * weeksPerMonth;
  const totalMonthlySalaryCosts = employees[0] * monthlySalaryPerEmployee;
  
  const timeSavingsHoursPerMonth = employees[0] * (hoursPerEmployeePerWeek * weeksPerMonth * efficiencyGain);
  const timeSavingsValue = timeSavingsHoursPerMonth * hourlyRate;
  const operationalSavings = monthlyCosts[0] * costReduction;
  
  const totalMonthlySavings = timeSavingsValue + operationalSavings;
  const yearlyMonthlySavings = totalMonthlySavings * 12;

  // ROI calculation (assuming $3k implementation cost)
  const implementationCost = 3000;
  const roiMonths = Math.ceil(implementationCost / totalMonthlySavings);

  // Animate counters
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedSavings(Math.floor(totalMonthlySavings * easeOut));
      setAnimatedTimeSavings(Math.floor(timeSavingsHoursPerMonth * easeOut));
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedSavings(Math.floor(totalMonthlySavings));
        setAnimatedTimeSavings(Math.floor(timeSavingsHoursPerMonth));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [employees, monthlyCosts, totalMonthlySavings, timeSavingsHoursPerMonth]);

  const handleGetCustomPlan = async () => {
    await triggerZapierWebhook({
      action_type: 'savings_calculator_conversion',
      timestamp: new Date().toISOString(),
      source_url: window.location.href,
      user_agent: navigator.userAgent,
      lead_data: {
        employees: employees[0],
        monthly_costs: monthlyCosts[0],
        projected_monthly_savings: Math.floor(totalMonthlySavings),
        projected_yearly_savings: Math.floor(yearlyMonthlySavings),
        roi_months: roiMonths,
        calculator_source: 'savings_calculator'
      }
    });

    if (onBookConsultation) {
      onBookConsultation();
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Calculate Your <span className="bg-gradient-primary bg-clip-text text-transparent">AI Savings</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how much your Dubai business could save with a custom AI implementation plan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Input Controls */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Your Business Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Number of Employees: <span className="text-primary font-bold">{employees[0]}</span>
                  </label>
                  <Slider
                    value={employees}
                    onValueChange={setEmployees}
                    max={200}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1</span>
                    <span>200+</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Current Monthly Software Costs: <span className="text-primary font-bold">${monthlyCosts[0].toLocaleString()}</span>
                  </label>
                  <Slider
                    value={monthlyCosts}
                    onValueChange={setMonthlyCosts}
                    max={50000}
                    min={500}
                    step={500}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$500</span>
                    <span>$50,000+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Savings Display */}
            <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  Projected Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-primary/10 rounded-2xl">
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      ${animatedSavings.toLocaleString()}
                      <span className="text-lg text-muted-foreground">/month</span>
                    </div>
                    <div className="text-secondary font-semibold">
                      ${(animatedSavings * 12).toLocaleString()} annually
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary/10 rounded-xl">
                      <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="font-bold text-foreground">{animatedTimeSavings}h</div>
                      <div className="text-xs text-muted-foreground">Time Saved/Month</div>
                    </div>
                    <div className="text-center p-4 bg-accent/10 rounded-xl">
                      <Zap className="w-6 h-6 text-accent mx-auto mb-2" />
                      <div className="font-bold text-foreground">{roiMonths} mo</div>
                      <div className="text-xs text-muted-foreground">ROI Timeline</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Summary */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-background border-2 border-border rounded-2xl">
              <DollarSign className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Cost Reduction</h3>
              <p className="text-muted-foreground text-sm">
                28% average operational cost savings through AI automation
              </p>
            </div>
            <div className="text-center p-6 bg-background border-2 border-border rounded-2xl">
              <Clock className="w-8 h-8 text-secondary mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Time Efficiency</h3>
              <p className="text-muted-foreground text-sm">
                32% productivity increase with smart workflow automation
              </p>
            </div>
            <div className="text-center p-6 bg-background border-2 border-border rounded-2xl">
              <TrendingUp className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Fast ROI</h3>
              <p className="text-muted-foreground text-sm">
                Break-even in {roiMonths} months with our proven AI implementation
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">
                🚀 Limited Time: Free AI Audit Worth $1,500
              </Badge>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Ready to Start Saving?
              </h3>
              <p className="text-muted-foreground">
                Get your personalized AI implementation roadmap in a 30-minute consultation
              </p>
            </div>
            
            <Button 
              size="lg" 
              variant="hero" 
              className="text-lg px-8 py-6"
              onClick={handleGetCustomPlan}
            >
              Get My Custom AI Plan
              <TrendingUp className="w-5 h-5 ml-2" />
            </Button>
            
            <p className="text-xs text-muted-foreground mt-4">
              💯 No commitment • Dubai-focused solutions • Arabic support included
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;