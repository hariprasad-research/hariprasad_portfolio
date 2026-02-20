import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const technicalSkills = [
  { name: "Embedded Systems & Electronics", level: 90 },
  { name: "IoT & Automation", level: 85 },
  { name: "Prototyping & Experimental Research", level: 88 },
  { name: "Space Systems & Ground Concepts", level: 75 },
  { name: "Sustainable Materials & Eco-Tech", level: 78 },
  { name: "Web-Based System Interfaces", level: 72 },
];

const softSkillTags = [
  { label: "Systems Thinking", size: "lg" },
  { label: "Problem Solving", size: "lg" },
  { label: "Research Methodology", size: "md" },
  { label: "Critical Analysis", size: "md" },
  { label: "Interdisciplinary Thinking", size: "lg" },
  { label: "Communication", size: "sm" },
  { label: "Adaptability", size: "sm" },
  { label: "Collaboration", size: "md" },
  { label: "Discipline & Focus", size: "md" },
  { label: "Innovation", size: "lg" },
  { label: "Curiosity", size: "sm" },
  { label: "Leadership", size: "sm" },
  { label: "Creativity", size: "md" },
  { label: "Attention to Detail", size: "sm" },
];

const tagSizeMap = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-5 py-2.5 font-medium",
};

const ProgressBar = ({ name, level, animate }: { name: string; level: number; animate: boolean }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-foreground">{name}</span>
      <span className="text-sm text-primary font-semibold">{level}%</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
        style={{ width: animate ? `${level}%` : '0%' }}
      />
    </div>
  </div>
);

const Skills = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A blend of technical depth and human-centered capabilities that drive meaningful innovation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Technical Skills - Progress Bars */}
          <Card className="shadow-card">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">Technical Proficiency</h3>
              {technicalSkills.map((skill) => (
                <ProgressBar key={skill.name} {...skill} animate={animate} />
              ))}
            </CardContent>
          </Card>

          {/* Soft Skills - Tag Cloud */}
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-foreground mb-6">Soft Skills & Mindset</h3>
            <div className="flex flex-wrap gap-3">
              {softSkillTags.map((tag, index) => (
                <span
                  key={tag.label}
                  className={`
                    ${tagSizeMap[tag.size as keyof typeof tagSizeMap]}
                    rounded-full border border-primary/30 text-foreground
                    bg-card hover:bg-gradient-primary hover:text-white hover:border-transparent
                    transition-all duration-300 cursor-default shadow-sm hover:shadow-elegant
                    hover-scale
                    ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}
                  style={{ transitionDelay: animate ? `${index * 60}ms` : '0ms' }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
