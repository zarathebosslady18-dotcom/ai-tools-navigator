const SolutionSection = () => {
  const solutions = [
    {
      icon: "🎯",
      title: "Perfect Match Assessment",
      description: "Custom recommendations based on your business size, industry, and specific needs"
    },
    {
      icon: "🚀",
      title: "Implementation Roadmap",
      description: "Step-by-step setup guides and integration strategies that actually work"
    },
    {
      icon: "💰",
      title: "Budget Optimization",
      description: "Free, freemium, and paid options ranked by value, not hype"
    },
    {
      icon: "🔄",
      title: "Ongoing Updates",
      description: "Weekly insights on new tools, updates, and optimization tips"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Your AI <span className="bg-gradient-primary bg-clip-text text-transparent">Success System</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className="bg-background p-8 rounded-2xl shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border border-border group"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {solution.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {solution.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;