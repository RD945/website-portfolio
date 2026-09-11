export type FeatureCardOverlayImage = {
  alt: string;
  src: string;
  className: string;
};

export type FeatureCardProps = {
  outerVariant: string;
  cardVariant: string;
  heroImageSrc: string;
  heroImageVariant: string;
  overlayImages: FeatureCardOverlayImage[];
  contentVariant: string;
  title: string;
  titleSecondLine?: string;
  titleVariant?: string;
  description: string;
  descriptionVariant: string;
};

export const FeatureCard = (props: FeatureCardProps) => {
  return (
    <div data-uid="ETBPjnairwIZp0U1"
      className={`relative bg-[linear-gradient(0deg,rgba(191,175,255,0.04)_0%,rgba(191,175,255,0.04)_100%),linear-gradient(rgba(169,163,194,0.05)_0%,rgba(169,163,194,0.2)_100%)] bg-size-[auto,auto] box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] w-[358px] overflow-hidden bg-[position:0%,0%_0%,0%] rounded-2xl left-0 top-0 font-system_ui md:absolute md:min-h-0 md:min-w-0 md:font-inter_v ${props.outerVariant}`}
    >
      <div data-uid="pNGaWMQ2ejfstlc7"
        className={`absolute bg-slate-950 box-border caret-transparent flex flex-col grow outline-[3px] z-[2] rounded-2xl inset-px font-system_ui md:font-inter_v ${props.cardVariant}`}
      >
        <div data-uid="mzncRHZQj6uKxJfX" className="absolute box-border caret-transparent h-full outline-[3px] pointer-events-none w-full z-[8] font-system_ui md:font-inter_v">
          <img data-uid="H8b6X63_sBLxnE4G"
            src={props.heroImageSrc}
            className={`box-border caret-transparent inline h-full outline-[3px] align-baseline w-full font-system_ui md:font-inter_v ${props.heroImageVariant}`}
          />
        </div>
        {props.overlayImages.map((image) => (
          <img data-uid="d7lW6hFKfIDBOOyR"
            key={image.src}
            alt={image.alt}
            src={image.src}
            className={image.className}
          />
        ))}
        <div data-uid="KUhYQzPZPPCR6h9k"
          className={`absolute box-border caret-transparent outline-[3px] z-20 inset-x-8 font-system_ui md:inset-x-10 md:font-inter_v ${props.contentVariant}`}
        >
          <h4 data-uid="ntEhXG77U_RRBWXu"
            className={`font-bold box-border caret-transparent outline-[3px] mb-2 font-system_ui md:font-inter_v ${props.titleVariant ?? ""}`}
          >
            <span data-uid="sv84R2uFvHcFeZSH" className="text-2xl font-normal bg-clip-text bg-[linear-gradient(rgb(255,255,255)_0%,rgba(255,255,255,0.5)_100%)] box-border caret-transparent tracking-[-0.48px] leading-8 outline-[3px] font-inter_v md:text-[28px] md:tracking-[-0.56px] md:leading-10">
              {props.title}
            </span>
            {props.titleSecondLine !== undefined ? (
              <>
                <br data-uid="fx4pjjfdONdgmT2r" className="box-border caret-transparent outline-[3px] font-system_ui md:font-inter_v" />
                <span data-uid="DBzhqBGZJuC9EeXn" className="text-2xl font-normal bg-clip-text bg-[linear-gradient(rgb(255,255,255)_0%,rgba(255,255,255,0.5)_100%)] box-border caret-transparent tracking-[-0.48px] leading-8 outline-[3px] font-inter_v md:text-[28px] md:tracking-[-0.56px] md:leading-10">
                  {props.titleSecondLine}
                </span>
              </>
            ) : null}
          </h4>
          <p data-uid="K5U9QCrR1f3WqPKV"
            className={`text-gray-400 text-sm box-border caret-transparent tracking-[-0.14px] leading-6 outline-[3px] font-inter_v ${props.descriptionVariant}`}
          >
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};
