import { useEffect, useRef, useState } from 'react';

const technicalTags = [
  { label: "Embedded Systems", size: "lg" },
  { label: "Electronics Design", size: "md" },
  { label: "IoT & Automation", size: "lg" },
  { label: "Arduino / Microcontrollers", size: "md" },
  { label: "Prototyping", size: "lg" },
  { label: "Space Ground Systems", size: "md" },
  { label: "Sustainable Materials", size: "sm" },
  { label: "Eco-Tech", size: "sm" },
  { label: "Web Interfaces", size: "md" },
  { label: "Sensor Integration", size: "sm" },
  { label: "Circuit Design", size: "md" },
  { label: "Data Logging", size: "sm" },
  { label: "CAD & Fabrication", size: "sm" },
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

const TagCloud = ({
  tags,
  animate,
  offset = 0,
}: {
  tags: { label: string; size: string }[];
  animate: boolean;
  offset?: number;
}) => (
  <div className="flex flex-wrap gap-3">
    {tags.map((tag, index) => (
      <span
        key={tag.label}
        className={`
          ${tagSizeMap[tag.size as keyof typeof tagSizeMap]}
          rounded-full border border-primary/30 text-foreground
          bg-card hover:bg-gradient-primary hover:text-white hover:border-transparent
          transition-all duration-300 cursor-default shadow-sm hover:shadow-elegant hover-scale
          ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
        style={{ transitionDelay: animate ? `${(index + offset) * 60}ms` : '0ms' }}
      >
        {tag.label}
      </span>
    ))}
  </div>
);

const Skills = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.15 }
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
          {/* Technical Skills - Tag Cloud */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-foreground mb-6">Technical Proficiency</h3>
            <TagCloud tags={technicalTags} animate={animate} offset={0} />
          </div>

          {/* Soft Skills - Tag Cloud */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-foreground mb-6">Soft Skills & Mindset</h3>
            <TagCloud tags={softSkillTags} animate={animate} offset={technicalTags.length} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
