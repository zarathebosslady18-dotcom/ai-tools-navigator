import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full blur-md animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 text-center text-white relative z-10 pt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Dubai's <span className="text-accent animate-glow">#1</span> AI Business
            <br />
            <span className="bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
              Transformation Expert
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
            Get personalized AI tools consultation OR master 25+ AI tools in our exclusive masterclass. 
            Join <span className="font-semibold text-accent">500+</span> UAE businesses saving 
            <span className="font-semibold text-accent"> AED 5,000+</span> monthly with AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="xl" 
              variant="hero"
              className="group"
              onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="mr-2">🎯</span>
              Book AI Consultation
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
            
            <Button 
              size="xl" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => document.getElementById('masterclass-info')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="mr-2">🎓</span>
              View AI Masterclass
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="group"
              onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="mr-2">📋</span>
              Take Free AI Assessment
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              500+ UAE Businesses
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></span>
              AED 5,000+ Monthly Savings
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></span>
              3-Minute Assessment
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;