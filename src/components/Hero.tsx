import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';
import { useState, useEffect } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

const roles = [
'Independent Researcher',
'Innovator & Builder',
'Mechanical Engineering',
'Certified First Aid Responder',
'Indian Scientist (Aspirant)',
'National Martial Artist',
'World Record Holder'];


const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const { ref, visible } = useScrollReveal(0.05);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex <= currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, 60);
    } else if (!isDeleting && charIndex > currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 4000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setCharIndex((c) => c - 1);
        setDisplayed(currentRole.slice(0, charIndex - 1));
      }, 35);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="min-h-screen flex items-center bg-gradient-subtle">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div
            className={`space-y-8 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`
            }>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Hari prasad S
                <span className="block bg-gradient-primary bg-clip-text text-transparent text-4xl min-h-[2.5rem] mt-[20px]">
                  {displayed}
                  <span className="inline-block w-0.5 h-8 bg-primary ml-1 animate-pulse align-middle" />
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Conducting independent research in embedded systems, experimental engineering, and prototype system development, with a focus on translating scientific concepts into functional real-world technologies.
              
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-primary hover:opacity-90 transition-opacity">

                Explore Museum
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/20 hover:bg-primary/5"
                onClick={() => {
                  const subject = encodeURIComponent("Resume Request");
                  const body = encodeURIComponent("Hello Hari Prasad,\n\nI would like to request a copy of your resume for review.\n\nThank you.");
                  window.open(`mailto:hariprasad.researcher@gmail.com?subject=${subject}&body=${body}`, '_blank');
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                Request Resume
              </Button>
            </div>
          </div>

          {/* Image side */}
          <div
            className={`relative transition-all duration-700 ease-out delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`
            }>

            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={heroImage}
                alt="Professional workspace"
                className="w-full h-[60vh] sm:h-[50vh] md:h-[55vh] lg:h-[65vh] xl:h-[70vh] object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default Hero;
