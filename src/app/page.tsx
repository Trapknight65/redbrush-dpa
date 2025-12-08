import Button from "@/components/Button";
import Card from "@/components/Card";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Hero Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Digital Solutions for
              <span className="text-crimson-red"> Modern Brands</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-canvas-white max-w-2xl lg:max-w-none mb-8 sm:mb-10">
              We craft stunning digital experiences that drive results. From web development to branding, we've got you covered.
            </p>

            <div className="flex gap-3 sm:gap-4 items-center justify-center lg:justify-start flex-wrap">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Start Your Project
              </Button>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                View Our Work
              </Button>
            </div>
          </div>

          {/* Right: Video */}
          <div className="relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            >
              <source src="/frog.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">Our Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card title="Web Development">
            <p className="text-canvas-white text-sm sm:text-base">
              Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.
            </p>
          </Card>

          <Card title="Branding & Design">
            <p className="text-canvas-white text-sm sm:text-base">
              Create a memorable brand identity with our comprehensive design services, from logos to complete brand systems.
            </p>
          </Card>

          <Card title="Digital Marketing">
            <p className="text-canvas-white text-sm sm:text-base">
              Grow your online presence with data-driven marketing strategies that deliver measurable results.
            </p>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}
