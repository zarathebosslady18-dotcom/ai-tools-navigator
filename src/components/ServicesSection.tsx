import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = [
    {
      price: "FREE",
      title: "Dubai AI Tools Assessment",
      features: [
        "5-minute personalized quiz for UAE businesses",
        "Custom tool recommendations (including Arabic AI)",
        "Budget-optimized for Dubai market",
        "Implementation priority for UAE compliance"
      ],
      cta: "Take Assessment",
      ctaAction: () => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' }),
      popular: false
    },
    {
      price: "AED 356",
      title: "Dubai AI Strategy Call",
      features: [
        "1-hour consultation with UAE AI expert",
        "Custom AI roadmap for Dubai businesses",
        "ROI calculations in AED",
        "UAE compliance & Arabic tool integration",
        "Follow-up strategy document"
      ],
      cta: "Book Call Now",
      ctaAction: () => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }),
      popular: true
    },
    {
      price: "AED 1,067",
      title: "Done-For-You Dubai Setup",
      features: [
        "Complete AI stack for UAE businesses",
        "Arabic language AI integration",
        "Dubai compliance & data privacy setup",
        "Team training in Dubai (remote/in-person)",
        "30-day UAE market optimization"
      ],
      cta: "Get Started",
      ctaAction: () => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }),
      popular: false
    }
  ];

  return (
    <section id="consultation" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Get Expert <span className="bg-gradient-primary bg-clip-text text-transparent">Help</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`relative bg-gradient-card p-8 rounded-3xl shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border ${
                service.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-primary text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className={`text-4xl font-bold mb-2 ${
                  service.price === 'FREE' ? 'text-secondary' : 'text-primary'
                }`}>
                  {service.price}
                </div>
                <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
              </div>

              <ul className="space-y-4 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <span className="text-secondary text-lg mt-0.5">✓</span>
                    <span className="text-muted-foreground leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={service.ctaAction}
                variant={service.popular ? "hero" : "default"}
                size="lg"
                className="w-full"
              >
                {service.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;