const About = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Crafting Tomorrow's Fashion
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                At ÉLITE Fashion, we believe in creating pieces that transcend trends. 
                Our collections blend contemporary design with timeless elegance, 
                crafted for those who appreciate the art of fashion.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Each piece is meticulously designed in our atelier, where traditional 
                craftsmanship meets modern innovation. We're committed to sustainable 
                practices and ethical production, ensuring every garment tells a story 
                of quality and conscience.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="border-l-2 border-accent pl-6">
                <h3 className="text-2xl font-semibold mb-2 text-foreground">Our Philosophy</h3>
                <p className="text-muted-foreground">
                  Design that empowers, style that endures
                </p>
              </div>
              
              <div className="border-l-2 border-accent pl-6">
                <h3 className="text-2xl font-semibold mb-2 text-foreground">Sustainability</h3>
                <p className="text-muted-foreground">
                  Committed to ethical fashion and environmental responsibility
                </p>
              </div>
              
              <div className="border-l-2 border-accent pl-6">
                <h3 className="text-2xl font-semibold mb-2 text-foreground">Craftsmanship</h3>
                <p className="text-muted-foreground">
                  Artisanal quality in every stitch and seam
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
