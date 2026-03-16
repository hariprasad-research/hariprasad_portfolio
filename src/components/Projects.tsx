import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProjectFlashcard, { ProjectDetails } from './ProjectFlashcard';
import useScrollReveal from '@/hooks/useScrollReveal';
import { getFeaturedProjects } from '@/data/projects';

const getStatusColor = (status: string) => {
  switch (status) {
    case "Published": return "bg-green-100 text-green-800";
    case "Completed": return "bg-emerald-100 text-emerald-800";
    case "Open Source": return "bg-blue-100 text-blue-800";
    case "In Development": return "bg-yellow-100 text-yellow-800";
    case "Patent Pending": return "bg-purple-100 text-purple-800";
    case "Prototype": return "bg-orange-100 text-orange-800";
    default: return "bg-secondary text-secondary-foreground";
  }
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const { ref, visible } = useScrollReveal();
  const projects = getFeaturedProjects();

  return (
    <section id="projects" ref={ref} className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Project Museum</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A curated selection of my recent work spanning research, innovation, and engineering, where each project addresses a unique challenge through interdisciplinary thinking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: visible ? `${index * 80}ms` : '0ms' }}
            >
              <Card
                className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full"
                onClick={() => setSelectedProject(project)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{project.type}</Badge>
                    <Badge className={`text-xs ${getStatusColor(project.status)}`}>{project.status}</Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-700 ease-out delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/projects">
            <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <ProjectFlashcard
        project={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
