import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Video, FileText, X } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ProjectDetails {
  title: string;
  description: string;
  tags: string[];
  type: string;
  status: string;
  problemStatement: string;
  objective: string;
  approach: string[];
  results: string[];
  images: string[];
  videoUrl?: string;
  reportUrl?: string;
}

interface ProjectFlashcardProps {
  project: ProjectDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "Open Source":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "In Development":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "Patent Pending":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
    case "Prototype":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
    case "Completed":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const ProjectFlashcard = ({ project, open, onOpenChange }: ProjectFlashcardProps) => {
  const [videoOpen, setVideoOpen] = useState(false);

  if (!project) return null;

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto data-[state=open]:animate-[scale-in_0.3s_ease-out,fade-in_0.2s_ease-out] data-[state=closed]:animate-[scale-out_0.2s_ease-out,fade-out_0.2s_ease-out]">
          <DialogHeader>
            {/* Status Badge */}
            <div className="flex items-center gap-2 mb-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Badge variant="outline" className="text-xs">
                {project.type}
              </Badge>
              <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                {project.status}
              </Badge>
            </div>
            
            {/* Title */}
            <DialogTitle className="text-2xl font-bold animate-fade-in" style={{ animationDelay: '0.15s' }}>
              {project.title}
            </DialogTitle>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </DialogHeader>

          <div className="space-y-5 mt-4">
            {/* Problem Statement */}
            <div className="animate-fade-in" style={{ animationDelay: '0.25s' }}>
              <h4 className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Problem Statement
              </h4>
              <p className="text-sm text-muted-foreground pl-3.5">
                {project.problemStatement}
              </p>
            </div>

            {/* Objective */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h4 className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Objective
              </h4>
              <p className="text-sm text-muted-foreground pl-3.5">
                {project.objective}
              </p>
            </div>

            {/* Approach */}
            <div className="animate-fade-in" style={{ animationDelay: '0.35s' }}>
              <h4 className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Approach
              </h4>
              <ul className="text-sm text-muted-foreground pl-3.5 space-y-1">
                {project.approach.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-muted-foreground/60 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Results */}
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h4 className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Key Results
              </h4>
              <ul className="text-sm text-muted-foreground pl-3.5 space-y-1">
                {project.results.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Images */}
            {project.images.length > 0 && (
              <div className="animate-fade-in" style={{ animationDelay: '0.45s' }}>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Preview
                </h4>
                <div className="grid grid-cols-2 gap-3 pl-3.5">
                  {project.images.slice(0, 2).map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-border">
                      <AspectRatio ratio={4/3}>
                        <img 
                          src={image} 
                          alt={`${project.title} preview ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </AspectRatio>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {project.videoUrl && (
                <Button 
                  className="gap-2"
                  asChild
                >
                  <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Video className="h-4 w-4" />
                    View Testing Video
                  </a>
                </Button>
              )}
              {project.reportUrl && (
                <Button 
                  variant="outline" 
                  className="gap-2"
                  asChild
                >
                  <a href={project.reportUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4" />
                    Download Report
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Popup Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Testing Video</DialogTitle>
            <DialogDescription>Watch the project testing video</DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-foreground/50 hover:bg-foreground/70 text-background rounded-full"
              onClick={() => setVideoOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <AspectRatio ratio={16/9}>
              {project.videoUrl && (
                <iframe
                  src={getYouTubeEmbedUrl(project.videoUrl)}
                  title={`${project.title} - Testing Video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </AspectRatio>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectFlashcard;
