import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Share2, Download, Sparkles, Film } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const runwayVideos = [
  {
    id: 1,
    title: "Spring Collection 2025",
    collection: "Urban Vogue",
    duration: "2:30",
    thumbnail: "/placeholder.svg",
    views: "1.2K",
  },
  {
    id: 2,
    title: "Luxe Evening Series",
    collection: "Luxe Gold",
    duration: "3:15",
    thumbnail: "/placeholder.svg",
    views: "2.8K",
  },
  {
    id: 3,
    title: "Heritage Showcase",
    collection: "Heritage Revival",
    duration: "2:45",
    thumbnail: "/placeholder.svg",
    views: "1.5K",
  },
];

const AIRunwayMode = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const handleShare = () => {
    toast({
      title: "Share link copied!",
      description: "Share this runway show with your friends",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your runway video will be ready shortly",
    });
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-accent/5 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Film className="w-5 h-5" />
            <span className="font-semibold">AI Runway</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl mb-4">AI-Generated Fashion Shows</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience our collections in motion. Watch AI-generated runway shows or create your own personalized fashion video.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-muted flex items-center justify-center group">
                  {selectedVideo ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Button
                        size="lg"
                        className="relative z-10 rounded-full w-20 h-20"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8" />
                        ) : (
                          <Play className="w-8 h-8 ml-1" />
                        )}
                      </Button>
                      <div className="absolute bottom-6 left-6 right-6 z-10">
                        <h3 className="text-white text-2xl font-bold mb-2">
                          {runwayVideos.find((v) => v.id === selectedVideo)?.title}
                        </h3>
                        <p className="text-white/80">
                          {runwayVideos.find((v) => v.id === selectedVideo)?.collection}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Film className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-4">AI Runway Experience</h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Select a collection to watch its AI-generated runway show, or create your own personalized video.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {selectedVideo && (
              <div className="flex gap-4 mt-4">
                <Button variant="outline" className="gap-2" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" className="gap-2" onClick={handleDownload}>
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button className="flex-1 gap-2">
                  <Sparkles className="w-4 h-4" />
                  Create My Runway
                </Button>
              </div>
            )}
          </div>

          {/* Video Library */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Runway Library</CardTitle>
                <CardDescription>Browse our AI-generated fashion shows</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {runwayVideos.map((video) => (
                  <Card
                    key={video.id}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      selectedVideo === video.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => {
                      setSelectedVideo(video.id);
                      setIsPlaying(false);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
                          <Play className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{video.title}</h4>
                          <p className="text-sm text-muted-foreground truncate">{video.collection}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span>{video.duration}</span>
                            <span>•</span>
                            <span>{video.views} views</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-4 bg-gradient-to-br from-primary to-accent text-white border-none">
              <CardContent className="p-6">
                <Sparkles className="w-10 h-10 mb-4" />
                <h4 className="font-semibold text-lg mb-2">Create Your Show</h4>
                <p className="text-sm opacity-90 mb-4">
                  Select your favorite pieces and let AI generate a personalized runway video featuring your picks.
                </p>
                <Button variant="secondary" className="w-full">
                  Start Creating
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI Generation</h3>
              <p className="text-sm text-muted-foreground">
                Powered by advanced AI to create cinematic runway experiences
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Film className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Professional Quality</h3>
              <p className="text-sm text-muted-foreground">
                Studio-grade production with dynamic lighting and camera movements
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Share & Download</h3>
              <p className="text-sm text-muted-foreground">
                Export your personalized shows to share across social platforms
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIRunwayMode;
