import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, Sparkles, RotateCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const VirtualMirror = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const outfits = [
    { id: 1, name: "Silk Evening Gown", collection: "Luxe Gold", image: "/placeholder.svg" },
    { id: 2, name: "Urban Blazer", collection: "Urban Vogue", image: "/placeholder.svg" },
    { id: 3, name: "Heritage Saree", collection: "Heritage Revival", image: "/placeholder.svg" },
  ];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsActive(true);
      toast({
        title: "Camera activated",
        description: "Select an outfit to try it on virtually",
      });
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please enable camera permissions to use Virtual Mirror",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsActive(false);
    setSelectedOutfit(null);
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Virtual Mirror
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Try on our collections virtually with AR technology. See how each piece looks on you before making your choice.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Virtual Mirror Display */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-2">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] bg-muted flex items-center justify-center">
                  {isActive ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      {selectedOutfit && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-end justify-center p-6">
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3">
                            <p className="font-semibold text-foreground">
                              {outfits.find((o) => o.id === selectedOutfit)?.name}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Camera className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-4">Virtual Try-On</h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Experience our collections in augmented reality. Start your camera to begin the virtual try-on experience.
                      </p>
                      <div className="flex gap-4 justify-center">
                        <Button onClick={startCamera} className="gap-2" size="lg">
                          <Camera className="w-5 h-5" />
                          Start Camera
                        </Button>
                        <Button variant="outline" size="lg" className="gap-2">
                          <Upload className="w-5 h-5" />
                          Upload Photo
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {isActive && (
              <div className="flex gap-4 mt-4">
                <Button variant="outline" onClick={stopCamera} className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
                <Button className="flex-1 gap-2">
                  <Sparkles className="w-4 h-4" />
                  Capture & Save Look
                </Button>
              </div>
            )}
          </div>

          {/* Outfit Selection */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Select Outfit</CardTitle>
                <CardDescription>Choose from our premium collections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {outfits.map((outfit) => (
                  <Card
                    key={outfit.id}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      selectedOutfit === outfit.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => {
                      if (isActive) {
                        setSelectedOutfit(outfit.id);
                        toast({
                          title: "Outfit selected",
                          description: `Now viewing ${outfit.name}`,
                        });
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{outfit.name}</h4>
                          <p className="text-sm text-muted-foreground">{outfit.collection}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-4 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">AI Enhancement</h4>
                    <p className="text-sm text-muted-foreground">
                      Our AR technology adapts to your lighting and environment for the most realistic try-on experience.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualMirror;
