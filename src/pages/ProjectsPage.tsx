import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { useState } from 'react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  type: string;
  status: string;
}

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "AI-Driven Climate Analysis Platform",
      description: "A comprehensive platform for analyzing climate data using machine learning algorithms. Features predictive modeling, real-time data processing, and interactive visualizations for environmental research.",
      tags: ["Machine Learning", "Climate Science", "Data Visualization", "Python"],
      type: "Independent Research",
      status: "Published"
    },
    {
      title: "Quantum Computing Simulator",
      description: "High-performance quantum circuit simulator for educational and research purposes. Includes quantum algorithm implementations and noise modeling capabilities.",
      tags: ["Quantum Computing", "C++", "Algorithm Design", "Performance"],
      type: "Independent Research",
      status: "Open Source"
    },
    {
      title: "Distributed Systems Optimization",
      description: "Novel approach to optimizing distributed computing systems using adaptive load balancing and predictive resource allocation algorithms.",
      tags: ["Distributed Systems", "Optimization", "Go", "Cloud Computing"],
      type: "Independent Research",
      status: "In Development"
    },
    {
      title: "Biomedical Data Mining Framework",
      description: "Scalable framework for mining patterns in large-scale biomedical datasets. Includes privacy-preserving techniques and federated learning capabilities.",
      tags: ["Healthcare", "Data Mining", "Privacy", "Federated Learning"],
      type: "Independent Research",
      status: "Published"
    },
    {
      title: "IoT Security Protocol",
      description: "Lightweight security protocol for resource-constrained IoT devices. Features end-to-end encryption with minimal computational overhead.",
      tags: ["IoT", "Cybersecurity", "Cryptography", "Embedded Systems"],
      type: "Independent Research",
      status: "Patent Pending"
    },
    {
      title: "Autonomous Systems Coordination",
      description: "Multi-agent coordination system for autonomous vehicles and drones. Implements consensus algorithms and real-time decision making.",
      tags: ["Autonomous Systems", "Multi-Agent", "Real-time", "Robotics"],
      type: "Independent Research",
      status: "Prototype"
    },
    {
      title: "Natural Language Understanding Engine",
      description: "Advanced NLU engine for semantic parsing and intent recognition. Supports multiple languages and domain-specific fine-tuning.",
      tags: ["NLP", "Deep Learning", "Transformers", "Python"],
      type: "Independent Research",
      status: "Published"
    },
    {
      title: "Edge Computing Framework",
      description: "Lightweight framework for deploying ML models on edge devices. Optimized for low-latency inference and minimal memory footprint.",
      tags: ["Edge Computing", "ML Optimization", "Rust", "Embedded"],
      type: "Independent Research",
      status: "Open Source"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-green-100 text-green-800";
      case "Open Source": return "bg-blue-100 text-blue-800";
      case "In Development": return "bg-yellow-100 text-yellow-800";
      case "Patent Pending": return "bg-purple-100 text-purple-800";
      case "Prototype": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              All Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A comprehensive collection of my work spanning research, innovation, and engineering. 
              Each project represents a unique challenge solved through interdisciplinary thinking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
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
      </main>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-lg data-[state=open]:animate-[scale-in_0.3s_ease-out,fade-in_0.2s_ease-out] data-[state=closed]:animate-[scale-out_0.2s_ease-out,fade-out_0.2s_ease-out]">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs animate-fade-in" style={{ animationDelay: '0.1s' }}>
                {selectedProject?.type}
              </Badge>
              <Badge className={`text-xs animate-fade-in ${selectedProject ? getStatusColor(selectedProject.status) : ''}`} style={{ animationDelay: '0.15s' }}>
                {selectedProject?.status}
              </Badge>
            </div>
            <DialogTitle className="text-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground pt-2 animate-fade-in" style={{ animationDelay: '0.25s' }}>
              {selectedProject?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedProject?.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="animate-fade-in"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsPage;
