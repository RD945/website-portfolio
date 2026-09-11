import { HeroCta } from "./HeroCta";

export const HeroContent = () => {
  return (
    <div className="hero-content max-w-none md:mr-[62px] md:max-w-[620px]">
      <h1 className="max-w-[90%] text-[42px] font-black leading-[42px] md:max-w-none md:text-[80px] md:leading-[80px]">
        Keep every customer relationship moving.
      </h1>
      <div className="my-9 max-w-[510px]">
        <p className="text-lg leading-[25.2px] md:text-[22px] md:leading-[30.8px]">
          Keep customer context, follow-ups, and next steps in one clear place.
        </p>
      </div>
      <HeroCta />
    </div>
  );
};
