import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Linkedin, Github, Instagram, Youtube, Mail, ArrowUp } from 'lucide-react';
import { unlockAdmin } from '@/hooks/useAdminAccess';

const SECRET_ORDER = ['Email', 'YouTube', 'LinkedIn', 'GitHub', 'Instagram'];

const playBell = () => {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    [880, 1320, 1760].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.25 / (i + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.2);
    });
    setTimeout(() => ctx.close(), 1500);
  } catch {
    // Audio unavailable
  }
};

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/dr-hari-prasad-s" },
  { icon: Github, label: "GitHub", href: "https://github.com/hariprasad-research" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/indian_scientist_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5" },
  { icon: Mail, label: "Email", href: "mailto:hariprasad.researcher@gmail.com" }];

const Footer = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(socialLinks);
  const [puzzle, setPuzzle] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const dragIndex = useRef<number | null>(null);
  const clicks = useRef<number[]>([]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const swap = (a: number, b: number) => {
    if (a === b) return;
    setOrder((prev) => {
      const next = [...prev];
      [next[a], next[b]] = [next[b], next[a]];
      return next;
    });
  };

  const resetPuzzle = () => {
    setPuzzle(false);
    setPicked(null);
    setOrder(socialLinks);
  };

  const handleConnect = () => {
    playBell();
    if (puzzle) {
      const ok = order.map((o) => o.label).join() === SECRET_ORDER.join();
      resetPuzzle();
      if (ok) {
        unlockAdmin();
        navigate('/admin');
      } else {
        console.log('%cNice try... but you are not me! 🕵️‍♂️', 'color:#3b82f6;font-size:14px;font-weight:bold;');
        navigate('/');
        scrollToTop();
      }
      return;
    }
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 3000), now];
    if (clicks.current.length >= 5) {
      clicks.current = [];
      setPuzzle(true);
    }
  };

  const handleIconClick = (e: React.MouseEvent, i: number) => {
    if (!puzzle) return;
    e.preventDefault();
    if (picked === null) setPicked(i);
    else {
      swap(picked, i);
      setPicked(null);
    }
  };


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
            <div className="flex items-center gap-2 mb-3">
              {/* Logo placeholder — replace this circle with your logo image */}
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                HP
              </div>
              <div className="text-xl font-bold text-foreground">Hari Prasad</div>
            </div>
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
            <h4
              onClick={handleConnect}
              className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 cursor-default select-none">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {order.map((item, i) =>
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                draggable={puzzle}
                onClick={(e) => handleIconClick(e, i)}
                onDragStart={() => { dragIndex.current = i; }}
                onDragOver={(e) => puzzle && e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragIndex.current !== null) swap(dragIndex.current, i);
                  dragIndex.current = null;
                }}
                className={`w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center hover:opacity-80 transition-all ${
                  puzzle ? 'cursor-move animate-pulse ring-2 ring-primary/40' : ''
                } ${picked === i ? 'ring-4 ring-primary scale-110' : ''}`}>

                  <item.icon className="h-4 w-4 text-primary-foreground" />
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