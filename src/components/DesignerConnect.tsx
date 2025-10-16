import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Video, MessageCircle, Calendar, Crown, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const designers = [
  {
    id: 1,
    name: "Aria Valentino",
    specialty: "Haute Couture",
    experience: "15 years",
    availability: "Available today",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Zara Chen",
    specialty: "Sustainable Fashion",
    experience: "10 years",
    availability: "Available in 2 hours",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Marco Rossi",
    specialty: "Bespoke Tailoring",
    experience: "20 years",
    availability: "Available tomorrow",
    image: "/placeholder.svg",
  },
];

const DesignerConnect = () => {
  const [selectedDesigner, setSelectedDesigner] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleConnect = () => {
    toast({
      title: "Connection request sent!",
      description: "Our designer will respond within 15 minutes.",
    });
    setMessage("");
    setSelectedDesigner(null);
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Crown className="w-5 h-5" />
            <span className="font-semibold">Premium Access</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Connect with Designers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get personalized guidance from our expert designers. Chat, video call, or book a private consultation for your perfect look.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Designer Selection */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-6">Our Master Designers</h3>
            {designers.map((designer) => (
              <Card
                key={designer.id}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  selectedDesigner === designer.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedDesigner(designer.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">{designer.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{designer.specialty}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">{designer.experience}</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          {designer.availability}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Communication Panel */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Start a Conversation</CardTitle>
                <CardDescription>
                  {selectedDesigner
                    ? `Connect with ${designers.find((d) => d.id === selectedDesigner)?.name}`
                    : "Select a designer to begin"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="flex-col h-auto py-4"
                    disabled={!selectedDesigner}
                  >
                    <MessageCircle className="w-6 h-6 mb-2" />
                    <span className="text-xs">Chat</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-col h-auto py-4"
                    disabled={!selectedDesigner}
                  >
                    <Video className="w-6 h-6 mb-2" />
                    <span className="text-xs">Video Call</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-col h-auto py-4"
                    disabled={!selectedDesigner}
                  >
                    <Calendar className="w-6 h-6 mb-2" />
                    <span className="text-xs">Book Session</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Name</label>
                    <Input placeholder="Enter your name" disabled={!selectedDesigner} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea
                      placeholder="Tell us about your style needs..."
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={!selectedDesigner}
                    />
                  </div>
                  <Button
                    className="w-full gap-2"
                    onClick={handleConnect}
                    disabled={!selectedDesigner || !message}
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </div>

                <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Premium members</strong> get priority
                      access and longer consultation times. Upgrade now for the full experience.
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant Chat</h3>
              <p className="text-sm text-muted-foreground">
                Get quick style advice and recommendations through real-time messaging
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Video Consultation</h3>
              <p className="text-sm text-muted-foreground">
                Have a face-to-face session with our designers for detailed guidance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Book Sessions</h3>
              <p className="text-sm text-muted-foreground">
                Schedule extended consultations for custom pieces and wardrobe planning
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DesignerConnect;
