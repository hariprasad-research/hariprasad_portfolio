import { Brain, Microscope, Lightbulb, Code, Trophy, HeartPulse, Medal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import useScrollReveal from '@/hooks/useScrollReveal';
import useCountUp from '@/hooks/useCountUp';
import { useMetrics, useHonors } from '@/hooks/useSiteData';
import { iconMap } from '@/lib/honorIcons';

const MetricCounter = ({ value, label, start }: { value: number; label: string; start: boolean }) => {
  const count = useCountUp(value, start);
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-primary">{count}+</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

const About = () => {
  const { ref, visible } = useScrollReveal();
  const { data: metrics } = useMetrics();
  const { data: honors } = useHonors();

  const expertise = [
  { icon: Brain, title: "Research & Analysis", description: "Deep dive into complex problems with systematic research methodologies and data-driven insights." },
  { icon: Microscope, title: "Scientific Innovation", description: "Translating scientific discoveries into practical applications and breakthrough technologies." },
  { icon: Lightbulb, title: "Creative Problem Solving", description: "Developing novel solutions through interdisciplinary thinking and innovative approaches." },
  { icon: Code, title: "Engineering Excellence", description: "Building robust, scalable systems with cutting-edge technologies and best practices." }];


  return (
    <section id="about" ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`
          }>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center">
            I am an independent researcher focused on experimental engineering, embedded systems, and prototype development. My work involves designing, building, and validating functional systems that bridge theoretical scientific principles with practical implementation. I specialize in interdisciplinary research, system integration, and engineering experimentation aimed at developing reliable and scalable technological solutions.
          

          </p>
        </div>

        {/* Expertise cards with stagger */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {expertise.map((item, index) =>
          <div
            key={index}
            className={`transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`
            }
            style={{ transitionDelay: visible ? `${index * 100}ms` : '0ms' }}>

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
          )}
        </div>

        {/* Approach block */}
        <div
          className={`bg-gradient-subtle rounded-3xl p-8 md:p-12 transition-all duration-700 ease-out delay-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`
          }>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Research Methodology</h3>
              <p className="text-muted-foreground mb-6">
                My research follows a structured methodology involving problem identification, system design, experimental development, iterative testing, and performance validation. Each project is approached with scientific rigor, ensuring reproducibility, functional reliability, and real-world applicability.
              

              </p>
              <div className="space-y-4">
                {["Systematic experimental design", "Iterative prototype development", "Engineering validation and analysis"].map((point) =>
                <div key={point} className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 shrink-0" />
                    <span className="text-foreground">{point}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h4 className="text-lg font-semibold text-foreground mb-4">Research Metrics</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(metrics ?? []).map((m) =>
                <MetricCounter key={m.label} value={m.value} label={m.label} start={visible} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Honors & Distinctions badges */}
        <div
          className={`flex flex-wrap justify-center gap-4 mt-12 transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`
          }>

          {(honors ?? []).map((h, index) => {
          const Icon = iconMap[h.icon] ?? Trophy;
          return (
          <div
            key={h.title}
            className="flex items-center gap-3 rounded-full border border-primary/20 bg-card px-5 py-3 shadow-card hover:shadow-elegant transition-shadow duration-300"
            style={{ transitionDelay: visible ? `${index * 120}ms` : '0ms' }}>

              <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-foreground leading-tight">{h.title}</div>
                <div className="text-xs text-muted-foreground">{h.subtitle}</div>
              </div>
            </div>);
          })}
        </div>
      </div>
    </section>);

};

export default About;