import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { useState } from 'react';
import ProjectFlashcard, { ProjectDetails } from '@/components/ProjectFlashcard';

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  const projects: ProjectDetails[] = [{
    title: "AI-Driven Climate Analysis Platform",
    description: "A comprehensive platform for analyzing climate data using machine learning algorithms. Features predictive modeling, real-time data processing, and interactive visualizations for environmental research.",
    tags: ["Machine Learning", "Climate Science", "Data Visualization", "Python"],
    type: "Independent Research",
    status: "Published",
    problemStatement: "Climate change predictions lack accuracy due to fragmented data sources and outdated modeling techniques, limiting effective environmental policy decisions.",
    objective: "To develop an integrated platform that combines multiple climate datasets with advanced ML algorithms for more accurate predictions.",
    approach: [
      "Aggregated satellite and ground-sensor data from 50+ sources",
      "Implemented ensemble learning with LSTM and transformer models",
      "Built real-time data pipeline using Apache Kafka",
      "Developed interactive visualization dashboard"
    ],
    results: [
      "Achieved 94% accuracy in 7-day temperature predictions",
      "Reduced data processing time by 60%",
      "Published findings in Nature Climate Change",
      "Platform adopted by 3 research institutions"
    ],
    images: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5",
    reportUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5"
  }, {
    title: "Quantum Computing Simulator",
    description: "High-performance quantum circuit simulator for educational and research purposes. Includes quantum algorithm implementations and noise modeling capabilities.",
    tags: ["Quantum Computing", "C++", "Algorithm Design", "Performance"],
    type: "Independent Research",
    status: "Open Source",
    problemStatement: "Quantum computing education is hindered by limited access to actual quantum hardware and complex simulation tools.",
    objective: "To create an accessible, high-performance simulator that enables researchers and students to experiment with quantum algorithms.",
    approach: [
      "Optimized matrix operations using SIMD instructions",
      "Implemented noise models for realistic simulations",
      "Built modular architecture for custom gate definitions",
      "Created interactive tutorial system"
    ],
    results: [
      "Simulates up to 30 qubits on consumer hardware",
      "10x faster than leading open-source alternatives",
      "1,500+ GitHub stars and active community",
      "Used in 12 university courses worldwide"
    ],
    images: [
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5",
    reportUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5"
  }, {
    title: "Distributed Systems Optimization",
    description: "Novel approach to optimizing distributed computing systems using adaptive load balancing and predictive resource allocation algorithms.",
    tags: ["Distributed Systems", "Optimization", "Go", "Cloud Computing"],
    type: "Independent Research",
    status: "In Development",
    problemStatement: "Cloud infrastructure costs escalate due to inefficient resource allocation and reactive scaling strategies.",
    objective: "To develop a predictive system that optimizes resource allocation before demand spikes occur.",
    approach: [
      "Analyzed historical usage patterns using time-series analysis",
      "Built predictive model for demand forecasting",
      "Implemented adaptive load balancer in Go",
      "Tested on Kubernetes clusters"
    ],
    results: [
      "Reduced cloud costs by 35% in pilot tests",
      "Improved response times by 40%",
      "Zero downtime during scaling events",
      "Patent application in progress"
    ],
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5",
    reportUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5"
  }, {
    title: "Biomedical Data Mining Framework",
    description: "Scalable framework for mining patterns in large-scale biomedical datasets. Includes privacy-preserving techniques and federated learning capabilities.",
    tags: ["Healthcare", "Data Mining", "Privacy", "Federated Learning"],
    type: "Independent Research",
    status: "Published",
    problemStatement: "Medical research is limited by data silos and privacy concerns that prevent sharing of valuable patient information.",
    objective: "To enable collaborative medical research while preserving patient privacy through federated learning.",
    approach: [
      "Implemented differential privacy mechanisms",
      "Built federated learning infrastructure",
      "Developed secure multi-party computation protocols",
      "Created standardized data anonymization pipeline"
    ],
    results: [
      "Enabled research across 8 hospitals without data sharing",
      "Discovered 3 new biomarkers for early cancer detection",
      "100% HIPAA compliance verified",
      "Framework licensed to 2 pharmaceutical companies"
    ],
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5",
    reportUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5"
  }, {
    title: "IoT Security Protocol",
    description: "Lightweight security protocol for resource-constrained IoT devices. Features end-to-end encryption with minimal computational overhead.",
    tags: ["IoT", "Cybersecurity", "Cryptography", "Embedded Systems"],
    type: "Independent Research",
    status: "Patent Pending",
    problemStatement: "IoT devices lack adequate security due to computational constraints, making them vulnerable to attacks.",
    objective: "To design a cryptographic protocol that provides strong security while operating within IoT resource limits.",
    approach: [
      "Analyzed existing lightweight cryptographic primitives",
      "Designed custom elliptic curve parameters",
      "Implemented protocol on ARM Cortex-M0",
      "Conducted formal security verification"
    ],
    results: [
      "80% reduction in power consumption vs. TLS",
      "Passed formal security verification",
      "Patent filed in 3 jurisdictions",
      "Interest from major IoT manufacturers"
    ],
    images: [
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5",
    reportUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5"
  }, {
    title: "Autonomous Systems Coordination",
    description: "Multi-agent coordination system for autonomous vehicles and drones. Implements consensus algorithms and real-time decision making.",
    tags: ["Autonomous Systems", "Multi-Agent", "Real-time", "Robotics"],
    type: "Independent Research",
    status: "Prototype",
    problemStatement: "Autonomous vehicles operating in shared spaces lack efficient coordination mechanisms, leading to inefficiencies and safety risks.",
    objective: "To develop a decentralized coordination protocol enabling safe and efficient multi-agent operations.",
    approach: [
      "Implemented Byzantine fault-tolerant consensus",
      "Built real-time path planning with collision avoidance",
      "Tested in simulated urban environments",
      "Validated with physical drone swarm"
    ],
    results: [
      "99.7% collision avoidance rate in testing",
      "Sub-millisecond coordination latency",
      "Demonstrated with 20-drone swarm",
      "Partnership with autonomous vehicle startup"
    ],
    images: [
      "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    reportUrl: "#"
  }, {
    title: "Natural Language Understanding Engine",
    description: "Advanced NLU engine for semantic parsing and intent recognition. Supports multiple languages and domain-specific fine-tuning.",
    tags: ["NLP", "Deep Learning", "Transformers", "Python"],
    type: "Independent Research",
    status: "Published",
    problemStatement: "Existing NLU systems struggle with context-dependent language and domain-specific terminology.",
    objective: "To build a flexible NLU engine that adapts to specialized domains without extensive retraining.",
    approach: [
      "Developed adapter-based fine-tuning approach",
      "Created multi-task learning framework",
      "Built efficient inference pipeline",
      "Implemented continuous learning system"
    ],
    results: [
      "95% intent accuracy across 8 domains",
      "Support for 12 languages",
      "50% reduction in fine-tuning data requirements",
      "Deployed in 3 enterprise applications"
    ],
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    reportUrl: "#"
  }, {
    title: "Edge Computing Framework",
    description: "Lightweight framework for deploying ML models on edge devices. Optimized for low-latency inference and minimal memory footprint.",
    tags: ["Edge Computing", "ML Optimization", "Rust", "Embedded"],
    type: "Independent Research",
    status: "Open Source",
    problemStatement: "ML deployment on edge devices is hindered by large model sizes and high computational requirements.",
    objective: "To create a framework that enables efficient ML inference on resource-constrained edge devices.",
    approach: [
      "Implemented model quantization and pruning",
      "Built zero-copy inference engine in Rust",
      "Created hardware-aware optimization pipeline",
      "Developed cross-compilation toolchain"
    ],
    results: [
      "90% model size reduction with <2% accuracy loss",
      "Sub-10ms inference on Raspberry Pi Zero",
      "Support for 15+ edge hardware platforms",
      "800+ GitHub stars"
    ],
    images: [
      "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1580584126903-c17d41830450?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    reportUrl: "#"
  }];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Open Source":
        return "bg-blue-100 text-blue-800";
      case "In Development":
        return "bg-yellow-100 text-yellow-800";
      case "Patent Pending":
        return "bg-purple-100 text-purple-800";
      case "Prototype":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-secondary text-secondary-foreground";
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
            <h1 className="text-4xl font-bold text-foreground mb-4 font-serif text-center md:text-6xl">
              Project Archive
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

      <ProjectFlashcard 
        project={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
    </div>
  );
};

export default ProjectsPage;
