import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { useState } from 'react';
import ProjectFlashcard, { ProjectDetails } from '@/components/ProjectFlashcard';
import { getProjectsByCategory } from '@/data/projects';

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

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const categoryGroups = getProjectsByCategory();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4 font-serif text-center md:text-6xl">
              Project Archive
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A comprehensive collection of 21 projects spanning electronics, aerospace, sustainability, AI, and safety systems — each addressing a unique challenge through interdisciplinary research.
            </p>
          </div>

          {categoryGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-2 font-serif">
                {group.category}
              </h2>
              <div className="w-16 h-1 bg-primary/60 rounded-full mb-8" />
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.projects.map((project, index) => (
                  <Card 
                    key={index} 
                    className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {project.type}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                          {project.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <ProjectFlashcard 
        project={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
    </div>
  );
};

export default ProjectsPage;
