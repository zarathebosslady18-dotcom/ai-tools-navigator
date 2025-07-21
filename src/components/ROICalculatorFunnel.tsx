import { useState } from "react";
import { Calculator, TrendingUp, DollarSign, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ROICalculatorFunnel = () => {
  const [formData, setFormData] = useState({
    companySize: "",
    industry: "",
    monthlyToolsCost: "",
    employeeHours: "",
    email: "",
    name: ""
  });
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const calculateROI = () => {
    const toolsCost = parseInt(formData.monthlyToolsCost) || 0;
    const hours = parseInt(formData.employeeHours) || 0;
    const employees = parseInt(formData.companySize.split('-')[0]) || 1;
    
    // AI savings calculations
    const toolSavings = toolsCost * 0.6; // 60% savings on tools
    const timeSavings = hours * employees * 0.4 * 50; // 40% time savings * AED 50/hour
    const totalMonthlySavings = toolSavings + timeSavings;
    const annualSavings = totalMonthlySavings * 12;
    
    return {
      toolSavings,
      timeSavings,
      totalMonthlySavings,
      annualSavings,
      paybackPeriod: Math.ceil(2000 / totalMonthlySavings) // Assuming AED 2000 implementation cost
    };
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const handleGetPersonalizedReport = async () => {
    if (!formData.email || !formData.name) {
      toast({
        title: "Missing Information",
        description: "Please enter your name and email to get the detailed report.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Report Sent!",
        description: "Check your email for your personalized AI ROI analysis.",
      });
      setIsLoading(false);
    }, 1000);
  };

  const results = showResults ? calculateROI() : null;

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-6 py-2 rounded-full text-sm font-medium mb-6">
              <Calculator className="w-4 h-4" />
              AI ROI CALCULATOR
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Calculate Your
              <br />
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                AI Savings Potential
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              See exactly how much your Dubai business could save monthly with AI automation. 
              Get a personalized report based on your specific industry and team size.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Calculator Form */}
            <Card className="border-2 border-secondary/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-secondary" />
                  AI Savings Calculator
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-6">
                  <div>
                    <Label htmlFor="companySize" className="text-sm font-medium">Company Size</Label>
                    <Select value={formData.companySize} onValueChange={(value) => 
                      setFormData({...formData, companySize: value})
                    }>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 employees</SelectItem>
                        <SelectItem value="6-20">6-20 employees</SelectItem>
                        <SelectItem value="21-50">21-50 employees</SelectItem>
                        <SelectItem value="51-100">51-100 employees</SelectItem>
                        <SelectItem value="100+">100+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="industry" className="text-sm font-medium">Industry</Label>
                    <Select value={formData.industry} onValueChange={(value) => 
                      setFormData({...formData, industry: value})
                    }>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trading">Trading & Import/Export</SelectItem>
                        <SelectItem value="real-estate">Real Estate</SelectItem>
                        <SelectItem value="retail">Retail & E-commerce</SelectItem>
                        <SelectItem value="hospitality">Hospitality & Tourism</SelectItem>
                        <SelectItem value="construction">Construction & Engineering</SelectItem>
                        <SelectItem value="finance">Finance & Banking</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="monthlyToolsCost" className="text-sm font-medium">
                      Current Monthly Software/Tools Cost (AED)
                    </Label>
                    <Input
                      type="number"
                      id="monthlyToolsCost"
                      placeholder="e.g., 5000"
                      value={formData.monthlyToolsCost}
                      onChange={(e) => setFormData({...formData, monthlyToolsCost: e.target.value})}
                      className="h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="employeeHours" className="text-sm font-medium">
                      Weekly Hours Spent on Repetitive Tasks (per employee)
                    </Label>
                    <Input
                      type="number"
                      id="employeeHours"
                      placeholder="e.g., 15"
                      value={formData.employeeHours}
                      onChange={(e) => setFormData({...formData, employeeHours: e.target.value})}
                      className="h-12"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-12"
                    variant="secondary"
                  >
                    Calculate My AI Savings
                    <TrendingUp className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Right: Results */}
            <div className="space-y-6">
              {showResults && results ? (
                <>
                  <Card className="bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/20">
                    <CardHeader>
                      <CardTitle className="text-2xl text-center">Your AI Savings Potential</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-background rounded-lg">
                          <DollarSign className="w-8 h-8 mx-auto mb-2 text-secondary" />
                          <div className="text-2xl font-bold text-secondary">
                            AED {results.toolSavings.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Tool Savings/Month</div>
                        </div>
                        
                        <div className="text-center p-4 bg-background rounded-lg">
                          <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <div className="text-2xl font-bold text-primary">
                            AED {results.timeSavings.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Time Savings/Month</div>
                        </div>
                      </div>

                      <div className="text-center p-6 bg-background rounded-lg border-2 border-secondary/20">
                        <div className="text-4xl font-bold text-secondary mb-2">
                          AED {results.totalMonthlySavings.toLocaleString()}
                        </div>
                        <div className="text-lg text-muted-foreground mb-1">Total Monthly Savings</div>
                        <div className="text-2xl font-bold text-primary">
                          AED {results.annualSavings.toLocaleString()}/year
                        </div>
                      </div>

                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-lg font-semibold mb-1">
                          Payback Period: {results.paybackPeriod} months
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Time to recover your AI implementation investment
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Personalized Report Form */}
                  <Card className="border-2 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-xl">Get Your Detailed AI Strategy Report</CardTitle>
                      <p className="text-muted-foreground">Specific tools and implementation plan for your industry</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Input
                          type="text"
                          placeholder="Your Full Name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="h-12"
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Your Business Email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="h-12"
                        />
                      </div>
                      <Button 
                        onClick={handleGetPersonalizedReport}
                        size="lg" 
                        className="w-full h-12"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending Report..." : "Get My Personalized AI Strategy"}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Includes specific tool recommendations, implementation timeline, and Dubai compliance checklist
                      </p>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="h-full flex items-center justify-center">
                  <CardContent className="text-center py-16">
                    <Calculator className="w-16 h-16 mx-auto mb-6 text-muted-foreground/50" />
                    <h3 className="text-2xl font-bold mb-4">Ready to Calculate?</h3>
                    <p className="text-muted-foreground">
                      Fill out the form to see your personalized AI savings potential
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculatorFunnel;