import { Linkedin, Github, Instagram, Youtube, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/yourprofile" },
  { icon: Github, label: "GitHub", href: "https://github.com/hariprasad-research" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/yourprofile" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@ICT_LABz" },
  { icon: Mail, label: "Email", href: "mailto:hariprasad.research@gmail.com" }];


  const navLinks = [
  { label: "About", section: "about" },
  { label: "Projects", section: "projects" },
  { label: "Contact", section: "contact" }];


  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold text-foreground mb-3">Hari Prasad</div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Independent researcher specializing in experimental engineering, embedded systems, and scientific prototype development.
            
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) =>
              <li key={link.section}>
                  <button
                  onClick={() => scrollToSection(link.section)}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm">

                    {link.label}
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((item) =>
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity">

                  <item.icon className="h-4 w-4 text-white" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Hari Prasad. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            aria-label="Back to top">

            <ArrowUp className="h-4 w-4" />
            Back to top
          </button>
        </div>
      </div>
    </footer>);

};

export default Footer;