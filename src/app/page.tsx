import Button from "@/components/ui/Button";
import Testimonials from "@/components/Testimonials";
import BrushCreate from "@/components/ui/BrushCreate";
import HeroSlider from "@/components/HeroSlider";
import { getProfile } from "@/actions/profile.actions";
import HeroParallax from "@/components/HeroParallax";

export default async function Home() {
  const { data: profile } = await getProfile();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroParallax>
        <div className="grid grid-cols-[70%_30%] sm:grid-cols-2 gap-2 sm:gap-12 items-center">
          {/* Left: Hero Content */}
          <div className="text-left w-full pr-2">
            <h1 className="text-xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-6 leading-tight">
              <BrushCreate text="We Build Vessels for" className="block" delay={0.2} />
              <span className="text-crimson-red block">The New Era</span>
            </h1>
            <p className="text-xs sm:text-lg lg:text-xl text-canvas-white max-w-2xl lg:max-w-none mb-4 sm:mb-10">
              Your ambition is the treasure. We provide the ship, the map, and the crew to reach it.
            </p>
          </div>

          {/* Right: Hero Slider */}
          <div className="w-full h-[120px] sm:h-auto">
            <HeroSlider slides={(profile?.heroSlides as any) || []} />
          </div>
        </div>
      </HeroParallax>

      {/* Services Section - Modern Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <h2 className="text-4xl sm:text-5xl font-black text-center mb-12 uppercase tracking-tight">
          <span className="text-redbrush-gradient bg-clip-text text-transparent">Our Craft</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">

          {/* Card 1: Web Development (The Ship) */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-2xl border border-white/10 glass-card p-8 flex flex-col justify-end hover:border-crimson-red/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-crimson-red/10 group-hover:scale-105 transition-transform duration-700 opacity-50" />
            <div className="absolute top-0 right-0 p-32 bg-crimson-red/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="mb-4 p-3 bg-white/10 w-fit rounded-lg backdrop-blur-md">
                <span className="text-2xl">⚓</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">The Great Ship</h3>
              <p className="text-gray-400 max-w-md">
                Web Development. We build robust, storm-proof digital platforms (Next.js) capable of sailing the Grand Line of the internet without faltering.
              </p>
            </div>
          </div>

          {/* Card 2: Branding (The Jolly Roger) */}
          <div className="md:row-span-1 relative group overflow-hidden rounded-2xl border border-white/10 glass-card p-8 flex flex-col justify-between hover:border-gold/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="mb-4 p-3 bg-white/10 w-fit rounded-lg backdrop-blur-md">
                <span className="text-2xl">🏴‍☠️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">The Jolly Roger</h3>
              <p className="text-gray-400 text-sm">
                Branding. A symbol so powerful it strikes awe across the seas. Establish your legend.
              </p>
            </div>
          </div>

          {/* Card 3: Marketing (The Log Pose) */}
          <div className="relative group overflow-hidden rounded-2xl border border-white/10 glass-card p-8 flex flex-col justify-between hover:border-ocean-blue/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-bl from-ocean-blue/5 to-transparent group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="mb-4 p-3 bg-white/10 w-fit rounded-lg backdrop-blur-md">
                <span className="text-2xl">🧭</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">The Log Pose</h3>
              <p className="text-gray-400 text-sm">
                Strategy & Marketing. Navigate the chaotic waters with precision. We chart the course to the treasure.
              </p>
            </div>
          </div>

          {/* Card 4: SEO (Wind in Sails) */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-2xl border border-white/10 glass-card p-6 flex items-center justify-between hover:border-white/20 transition-colors duration-500">
            <div className="relative z-10 flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-lg">
                <span className="text-2xl">💨</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Wind in the Sails</h3>
                <p className="text-gray-400 text-sm">SEO & Performance. Speed is power. Outrun the marines and the competition.</p>
              </div>
            </div>
            <div className="relative z-10">
              <Button variant="secondary" className="border-white/10 hover:bg-white/10 text-xs text-white">Set Sail</Button>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}
