import { HeroContent } from "./components/HeroContent";
import { HeroVisual } from "./components/HeroVisual";

export const Hero = () => {
  return (
    <header id="hero" className="hero-shell relative overflow-hidden bg-orange-300 pt-24 md:min-h-[760px] md:pt-32">
      <div className="hero-shell__content mx-auto flex max-w-[1440px] flex-col gap-12 px-5 pb-20 md:flex-row md:items-center md:gap-16 md:px-20 md:pb-24">
        <HeroContent />
        <HeroVisual />
      </div>
    </header>
  );
};
