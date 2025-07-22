import { CheckCircle, Clock, DollarSign, Zap } from "lucide-react";

const AboutSection = () => {
  const achievements = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Cost Savings",
      description: "Helped businesses save AED 50,000+ annually through smart AI implementation"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time Efficiency", 
      description: "Reduced operational tasks by 60% through strategic AI automation"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Business Growth",
      description: "Enabled 300+ Dubai entrepreneurs to scale faster with AI-powered solutions"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Success Rate",
      description: "98% client satisfaction rate in AI tool implementation and training"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          
          {/* Image Side */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src="/lovable-uploads/dd935718-9306-4fe3-a5db-2fc64be01b33.png"
                alt="Miss Akiru - AI Business Transformation Expert"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Achievement Card */}
            <div className="absolute -bottom-8 -right-8 bg-background p-6 rounded-2xl shadow-xl border border-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Businesses Transformed</div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20 mb-6">
                <Zap className="w-4 h-4" />
                AI Business Expert
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Meet <span className="bg-gradient-primary bg-clip-text text-transparent">Miss Akiru</span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Dubai's leading AI transformation specialist helping businesses and entrepreneurs 
                discover innovative ways to implement AI in their operations, dramatically 
                <span className="text-primary font-semibold"> saving both money and time</span> while 
                accelerating growth in the competitive UAE market.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                With deep expertise in UAE business compliance and Arabic AI integration, 
                Miss Akiru has guided hundreds of Dubai entrepreneurs through successful 
                AI adoption, turning complex technology into simple, profitable solutions.
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="bg-background p-6 rounded-xl shadow-card border border-border hover:shadow-glow transition-all duration-300 group"
                >
                  <div className="text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;