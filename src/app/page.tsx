import Button from "@/components/ui/Button";
import Card from "@/components/Card";
import Testimonials from "@/components/Testimonials";
import BrushCreate from "@/components/ui/BrushCreate";
import HeroSlider from "@/components/HeroSlider";
import { getProfile } from "@/actions/profile.actions";

export default async function Home() {
  const { data: profile } = await getProfile();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-4 lg:gap-12 items-center">
          {/* Left: Hero Content */}
          <div className="text-left w-full">
            <h1 className="text-xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-6 leading-tight">
              <BrushCreate text="Digital Solutions for" className="block" delay={0.2} />
              <span className="text-crimson-red block">Modern Brands</span>
            </h1>
            <p className="text-xs sm:text-lg lg:text-xl text-canvas-white max-w-2xl lg:max-w-none mb-4 sm:mb-10">
              We craft stunning digital experiences that drive results. From web development to branding, we&apos;ve got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start justify-start flex-wrap">
              <Button variant="primary" size="lg" className="w-full sm:w-auto text-xs sm:text-base py-2 sm:py-3 px-4 sm:px-8">
                Start Project
              </Button>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-xs sm:text-base py-2 sm:py-3 px-4 sm:px-8">
                View Work
              </Button>
            </div>
          </div>

          {/* Right: Hero Slider */}
          <div className="w-full h-[200px] sm:h-auto">
            <HeroSlider slides={(profile?.heroSlides as any) || []} />
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
