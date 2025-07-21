const ProblemSection = () => {
  const problems = [
    {
      icon: "🤯",
      title: "Choice Overload",
      description: "With Dubai's AI market growing 43.9% annually, there are 1000+ AI tools launched every month. How do you choose the right ones for YOUR Dubai business?"
    },
    {
      icon: "💸",
      title: "Subscription Drain",
      description: "UAE businesses waste AED 15,000+ yearly on duplicate AI tools or unused subscriptions that don't fit their workflow."
    },
    {
      icon: "⏰",
      title: "Setup Nightmare",
      description: "Hours spent configuring tools that promise \"5-minute setup\" but actually take days to implement in Dubai's business environment."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            The AI Tools <span className="text-destructive">Dilemma</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-gradient-card p-8 rounded-2xl border-l-4 border-destructive hover:shadow-card transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-bold text-destructive mb-4">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;