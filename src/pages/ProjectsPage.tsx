import { ExternalLink, Github, FileText, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const ProjectsPage = () => {
  const projects = [
    {
      title: "AI-Driven Climate Analysis Platform",
      description: "A comprehensive platform for analyzing climate data using machine learning algorithms. Features predictive modeling, real-time data processing, and interactive visualizations for environmental research.",
      tags: ["Machine Learning", "Climate Science", "Data Visualization", "Python"],
      type: "Research",
      status: "Published",
      links: {
        demo: "#",
        github: "#",
        paper: "#"
      }
    },
    {
      title: "Quantum Computing Simulator",
      description: "High-performance quantum circuit simulator for educational and research purposes. Includes quantum algorithm implementations and noise modeling capabilities.",
      tags: ["Quantum Computing", "C++", "Algorithm Design", "Performance"],
      type: "Innovation",
      status: "Open Source",
      links: {
        demo: "#",
        github: "#"
      }
    },
    {
      title: "Distributed Systems Optimization",
      description: "Novel approach to optimizing distributed computing systems using adaptive load balancing and predictive resource allocation algorithms.",
      tags: ["Distributed Systems", "Optimization", "Go", "Cloud Computing"],
      type: "Engineering",
      status: "In Development",
      links: {
        github: "#",
        paper: "#"
      }
    },
    {
      title: "Biomedical Data Mining Framework",
      description: "Scalable framework for mining patterns in large-scale biomedical datasets. Includes privacy-preserving techniques and federated learning capabilities.",
      tags: ["Healthcare", "Data Mining", "Privacy", "Federated Learning"],
      type: "Research",
      status: "Published",
      links: {
        demo: "#",
        paper: "#"
      }
    },
    {
      title: "IoT Security Protocol",
      description: "Lightweight security protocol for resource-constrained IoT devices. Features end-to-end encryption with minimal computational overhead.",
      tags: ["IoT", "Cybersecurity", "Cryptography", "Embedded Systems"],
      type: "Innovation",
      status: "Patent Pending",
      links: {
        paper: "#"
      }
    },
    {
      title: "Autonomous Systems Coordination",
      description: "Multi-agent coordination system for autonomous vehicles and drones. Implements consensus algorithms and real-time decision making.",
      tags: ["Autonomous Systems", "Multi-Agent", "Real-time", "Robotics"],
      type: "Engineering",
      status: "Prototype",
      links: {
        demo: "#",
        github: "#"
      }
    },
    {
      title: "Natural Language Understanding Engine",
      description: "Advanced NLU engine for semantic parsing and intent recognition. Supports multiple languages and domain-specific fine-tuning.",
      tags: ["NLP", "Deep Learning", "Transformers", "Python"],
      type: "Research",
      status: "Published",
      links: {
        demo: "#",
        github: "#",
        paper: "#"
      }
    },
    {
      title: "Edge Computing Framework",
      description: "Lightweight framework for deploying ML models on edge devices. Optimized for low-latency inference and minimal memory footprint.",
      tags: ["Edge Computing", "ML Optimization", "Rust", "Embedded"],
      type: "Engineering",
      status: "Open Source",
      links: {
        demo: "#",
        github: "#"
      }
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
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
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
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {project.links.demo && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Demo
                      </Button>
                    )}
                    {project.links.github && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Github className="h-3 w-3 mr-1" />
                        Code
                      </Button>
                    )}
                    {project.links.paper && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileText className="h-3 w-3 mr-1" />
                        Paper
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
