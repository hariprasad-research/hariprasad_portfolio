import { Brain, Microscope, Lightbulb, Code } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import useScrollReveal from '@/hooks/useScrollReveal';

const About = () => {
  const { ref, visible } = useScrollReveal();

  const expertise = [
    { icon: Brain, title: "Research & Analysis", description: "Deep dive into complex problems with systematic research methodologies and data-driven insights." },
    { icon: Microscope, title: "Scientific Innovation", description: "Translating scientific discoveries into practical applications and breakthrough technologies." },
    { icon: Lightbulb, title: "Creative Problem Solving", description: "Developing novel solutions through interdisciplinary thinking and innovative approaches." },
    { icon: Code, title: "Engineering Excellence", description: "Building robust, scalable systems with cutting-edge technologies and best practices." },
  ];

  return (
    <section id="about" ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            As an independent researcher and innovator, I specialize in connecting theoretical knowledge
            with practical applications. My work spans across multiple disciplines, from advanced data
            science to emerging technologies, always with a focus on creating meaningful impact.
          </p>
        </div>

        {/* Expertise cards with stagger */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {expertise.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: visible ? `${index * 100}ms` : '0ms' }}
            >
              <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Approach block */}
        <div
          className={`bg-gradient-subtle rounded-3xl p-8 md:p-12 transition-all duration-700 ease-out delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">My Approach</h3>
              <p className="text-muted-foreground mb-6">
                I believe in the power of interdisciplinary collaboration and evidence-based innovation.
                Every project begins with thorough research, continues with iterative experimentation,
                and concludes with practical, scalable solutions.
              </p>
              <div className="space-y-4">
                {["Research-driven methodology", "Collaborative innovation", "Practical implementation"].map((point) => (
                  <div key={point} className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 shrink-0" />
                    <span className="text-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h4 className="text-lg font-semibold text-foreground mb-4">Key Metrics</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { value: "30+", label: "Projects Completed" },
                  { value: "5+", label: "Active Research Themes" },
                  { value: "20+", label: "Prototypes & Experiments" },
                  { value: "8+", label: "Hackathons & Exhibitions" },
                  { value: "7+", label: "Domains Explored" },
                  { value: "5+", label: "Methodologies Applied" },
                ].map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="text-2xl font-bold text-primary">{m.value}</div>
                    <div className="text-sm text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
