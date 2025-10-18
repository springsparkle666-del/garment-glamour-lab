import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Sparkles, RotateCcw } from "lucide-react";

const VirtualMirror = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<string | null>(null);
  const [arEnabled, setArEnabled] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const outfits = [
    { id: "1", name: "Elegant Evening Dress", color: "from-purple-500 to-pink-500" },
    { id: "2", name: "Casual Street Style", color: "from-blue-500 to-cyan-500" },
    { id: "3", name: "Professional Business", color: "from-gray-600 to-gray-800" },
    { id: "4", name: "Summer Beach Look", color: "from-yellow-400 to-orange-500" },
    { id: "5", name: "Winter Chic", color: "from-indigo-600 to-blue-800" },
    { id: "6", name: "Bohemian Style", color: "from-green-400 to-teal-500" },
  ];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
        setArEnabled(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Please allow camera access to use Virtual Mirror");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setIsActive(false);
      setSelectedOutfit(null);
      setArEnabled(false);
    }
  };

  const captureLook = async () => {
    if (!canvasRef.current || !videoRef.current) return;
    
    setCapturing(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `elite-fashion-look-${Date.now()}.png`;
          a.click();
          URL.revokeObjectURL(url);
        }
        setCapturing(false);
      });
    }
  };

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20 -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Virtual AR Mirror
          </h2>
          <p className="text-lg text-muted-foreground">
            Try on outfits in real-time with AR technology ✨
          </p>
        </div>

        {/* AR Mirror Display */}
        <div className="relative bg-card/50 backdrop-blur-sm border-2 border-border/50 rounded-2xl overflow-hidden aspect-[3/4] max-w-2xl mx-auto shadow-2xl mb-8">
          {!isActive ? (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
              <div className="text-center p-8">
                <Camera className="w-20 h-20 mx-auto mb-6 text-primary animate-pulse" />
                <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Ready to Try On?
                </h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  Experience AR-powered fashion fitting in real-time
                </p>
                <div className="flex gap-2 justify-center text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4" />
                  <span>AI-Enhanced</span>
                  <span>•</span>
                  <span>Real-time Fitting</span>
                  <span>•</span>
                  <span>Share Ready</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
            </>
          )}

          {isActive && selectedOutfit && (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 mix-blend-overlay pointer-events-none animate-pulse" />
              
              <div className="absolute top-4 left-4 right-4 bg-black/50 backdrop-blur-md rounded-xl p-3 text-white text-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                  <span>AR Fitting Active • {outfits.find(o => o.id === selectedOutfit)?.name}</span>
                </div>
              </div>

              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-green-500 rounded-full animate-pulse delay-100" />
                <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200" />
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Button
            onClick={isActive ? stopCamera : startCamera}
            size="lg"
            variant={isActive ? "outline" : "default"}
            className="min-w-[180px]"
          >
            <Camera className="mr-2 h-5 w-5" />
            {isActive ? "Stop Camera" : "Start AR Mirror"}
          </Button>

          {isActive && (
            <>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Photo
              </Button>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
              />
              <Button 
                variant="outline" 
                size="lg" 
                onClick={stopCamera}
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Reset
              </Button>
              <Button 
                size="lg"
                onClick={captureLook}
                disabled={capturing}
                className="bg-gradient-to-r from-primary to-accent"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {capturing ? "Capturing..." : "Save Look"}
              </Button>
            </>
          )}
        </div>

        {/* Outfit Selection */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Choose Your Style
            </h3>
            <p className="text-muted-foreground">
              {isActive ? "Select an outfit to see it on you" : "Start camera first to try outfits"}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {outfits.map((outfit) => (
              <button
                key={outfit.id}
                onClick={() => setSelectedOutfit(outfit.id)}
                className={`group relative p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedOutfit === outfit.id
                    ? "border-primary bg-primary/10 scale-105 shadow-xl"
                    : "border-border/50 hover:border-primary/50"
                } ${!isActive ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={!isActive}
              >
                <div
                  className={`w-full aspect-square rounded-lg bg-gradient-to-br ${outfit.color} mb-3 group-hover:scale-105 transition-transform relative overflow-hidden`}
                >
                  {selectedOutfit === outfit.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Sparkles className="w-6 h-6 text-white animate-pulse" />
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium text-center">{outfit.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/50 transition-all">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold mb-2">AI-Enhanced Fitting</h4>
            <p className="text-sm text-muted-foreground">
              Advanced body tracking for realistic garment overlay
            </p>
          </div>

          <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/50 transition-all">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary mx-auto mb-4 flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold mb-2">Real-Time Preview</h4>
            <p className="text-sm text-muted-foreground">
              Instant visualization with dynamic lighting
            </p>
          </div>

          <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/50 transition-all">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold mb-2">Save & Share</h4>
            <p className="text-sm text-muted-foreground">
              Capture your favorite looks and share with friends
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualMirror;