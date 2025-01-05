const HeroSection = () => {
  return (
    <div className="to-secondary align flex h-screen items-center justify-center bg-gradient-to-b from-primary/50 text-foreground">
      <div className="container px-4 text-center">
        <h1 className="mb-4 animate-text bg-gradient-to-r from-black via-primary to-black bg-clip-text pb-6 font-tinos text-8xl font-black text-transparent">
          Global Pulse
        </h1>
        <p className="mb-8 font-tinos text-5xl">
          Your faithful news aggregator
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
