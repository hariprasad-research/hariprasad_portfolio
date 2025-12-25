import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
const Contact = () => {
  const {
    toast
  } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon."
    });
  };
  const contactInfo = [{
    icon: Mail,
    label: "Email",
    value: "contact@researcher.dev",
    href: "mailto:contact@researcher.dev"
  }, {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567"
  }, {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "#"
  }];
  return <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let's Collaborate
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Interested in working together? Whether you have a research question, 
            need technical expertise, or want to discuss innovative ideas, I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <a href={item.href} className="text-foreground hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    </div>
                  </div>)}
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
                    <div className="text-muted-foreground">• Space Systems (Ground & Concepts) </div>
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

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      First Name
                    </label>
                    <Input placeholder="John" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Last Name
                    </label>
                    <Input placeholder="Doe" required />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Email
                  </label>
                  <Input type="email" placeholder="john@example.com" required />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Subject
                  </label>
                  <Input placeholder="Collaboration Opportunity" required />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Message
                  </label>
                  <Textarea placeholder="Tell me about your project or research interests..." className="min-h-[120px]" required />
                </div>
                
                <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default Contact;