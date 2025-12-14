import Button from "@/components/ui/Button";
import Testimonials from "@/components/Testimonials";
import BrushCreate from "@/components/ui/BrushCreate";
import HeroSlider from "@/components/HeroSlider";
import { getProfile } from "@/actions/profile.actions";
import HeroParallax from "@/components/HeroParallax";
import CraftBento from "@/components/CraftBento";

export default async function Home() {
  const { data: profile } = await getProfile();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroParallax>
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left: Hero Content */}
          <div className="text-left w-full pr-2 order-1">
            <h1 className="text-xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-6 leading-tight">
              <BrushCreate text="We Build Vessels for" className="block" delay={0.2} />
              <span className="text-crimson-red block">The New Era</span>
            </h1>
            <p className="text-xs sm:text-lg lg:text-xl text-canvas-white max-w-2xl lg:max-w-none">
              Your ambition is the treasure. We provide the ship, the map, and the crew to reach it.
            </p>
          </div>

          {/* Right: Craft Bento (Beside Title) */}
          <div className="w-full h-auto order-2 mt-4 sm:mt-0">
            <CraftBento />
          </div>
        </div>
      </HeroParallax>

      {/* Services/Our Craft Section REMOVED */}

      {/* Hero Slider Section (Repositioned) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Branding Text */}
          <div className="text-left">
            <h3 className="text-3xl font-bold text-white mb-4">
              The <span className="text-crimson-red">Fude Fude no Mi</span> Style
            </h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              Inspired by the fluidity of ink and the precision of the blade.
              Our designs flow like water but strike with impact.
              We craft digital experiences that are not just seen, but felt.
            </p>
          </div>

          {/* Right: Slider */}
          <div className="w-full h-[150px] sm:h-auto">
            <HeroSlider slides={(profile?.heroSlides as any) || []} />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}
