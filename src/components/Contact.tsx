import { Mail, MapPin, Phone, Send, Linkedin, Github, Instagram, Youtube } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useScrollReveal from '@/hooks/useScrollReveal';

const Contact = () => {
  const { ref, visible } = useScrollReveal();

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hariprasad.researcher@gmail.com", href: "mailto:hariprasad.researcher@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 9498090637", href: "tel:+919498090637" },
    { icon: MapPin, label: "Location", value: "Chennai, India", href: "#" },
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/dr-hari-prasad-s" },
    { icon: Github, label: "GitHub", href: "https://github.com/hariprasad-research" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/indian_scientist_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { icon: Youtube, label: "YouTube", href: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5" },
  ];

  return (
    <section id="contact" ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Let's Collaborate</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Interested in working together? Whether you have a research question,
            need technical expertise, or want to discuss innovative ideas, I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left column */}
          <div
            className={`space-y-8 transition-all duration-700 ease-out delay-100 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-foreground">Get in Touch</h3>
                <div className="flex items-center gap-3">
                  {socialLinks.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                      aria-label={item.label}
                    >
                      <item.icon className="h-5 w-5 text-white" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <a href={item.href} className="text-foreground hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Areas of Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="text-muted-foreground">• Embedded Systems & Electronics</div>
                    <div className="text-muted-foreground">• Space Systems (Ground & Concepts)</div>
                    <div className="text-muted-foreground">• Prototyping & Experimental Research</div>
                    <div className="text-muted-foreground">• Sustainable Materials & Eco-Tech</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-muted-foreground">• IoT & Automation Logic</div>
                    <div className="text-muted-foreground">• Web-Based System Interfaces</div>
                    <div className="text-muted-foreground">• Systems Thinking & Problem Solving</div>
                    <div className="text-muted-foreground">• Human Performance & Discipline</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Research Contact */}
          <div
            className={`transition-all duration-700 ease-out delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <Card className="shadow-card h-full flex flex-col justify-center">
              <CardHeader>
                <CardTitle className="text-xl">Research Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Interested in Collaboration or Research?</h4>
                  <p className="text-muted-foreground">
                    If you would like to discuss research ideas, experimental systems, or potential collaborations, feel free to reach out.
                  </p>
                </div>
                <a
                  href="https://forms.gle/bJZ4NU8FJXfnLk6W8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full"
                >
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    <Send className="mr-2 h-4 w-4" />
                    Send Inquiry
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
