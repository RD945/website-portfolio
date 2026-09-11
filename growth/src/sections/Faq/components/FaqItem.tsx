import { useId, useState } from "react";

export type FaqItemProps = {
  question: string;
  answer: string;
};

export const FaqItem = (props: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerId = useId();

  return (
    <div data-uid="0chGPtzeYW_oI3ie" className="relative box-border caret-transparent max-w-[984px] outline-[3px] mx-auto pt-8 pb-4 px-4 font-system_ui md:font-inter_v before:accent-auto before:bg-[linear-gradient(270deg,rgba(61,53,78,0)_0.2%,rgb(48,39,58)_45.39%,rgb(48,39,58)_53.54%,rgba(61,53,78,0)_110.06%)] before:caret-transparent before:text-white before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-px before:tracking-[normal] before:leading-[18.4px] before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:bottom-0 before:inset-x-0 before:font-system_ui before:md:font-inter_v">
      <button
        data-uid="r811B_3-rW2h-PN4"
        type="button"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={() => setIsOpen((open) => !open)}
        className="items-center box-border caret-transparent flex justify-between outline-[3px] w-full border-0 bg-transparent p-0 text-left font-system_ui md:font-inter_v"
      >
        <h2 data-uid="vjeurAVUvrz92RW4" className="text-lg font-bold bg-clip-text bg-[linear-gradient(rgb(255,255,255)_22.5%,rgba(255,255,255,0.7)_100%)] box-border caret-transparent gap-x-2 leading-7 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 font-rebond_grotesque md:text-2xl md:leading-8">
          {props.question}
          <span data-uid="i1E7C3QbHi-ZBx98" className="text-lg bg-clip-text bg-[linear-gradient(rgb(255,255,255)_22.5%,rgba(255,255,255,0.7)_100%)] box-border caret-transparent leading-7 outline-[3px] ml-1 font-inter_v md:text-2xl md:leading-8">
            ?
          </span>
        </h2>
        <span data-uid="0zr1BV6fv6aY5DWJ" aria-hidden="true" className={`text-gray-300 text-2xl box-border caret-transparent block leading-6 outline-[3px] transition-transform duration-300 font-system_ui md:font-inter_v ${isOpen ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div id={answerId} aria-hidden={!isOpen} data-uid="r4CAxgeGOTomI18F" className={`box-border caret-transparent outline-[3px] w-full overflow-hidden font-system_ui transition-[max-height,opacity,margin] duration-300 md:font-inter_v ${isOpen ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}`}>
        <p data-uid="ECZStHijAnxgos4c" className="text-gray-400 text-base self-stretch box-border caret-transparent tracking-[-0.18px] leading-6 outline-[3px] w-full font-inter_v md:text-lg md:leading-7">
          {props.answer}
        </p>
      </div>
    </div>
  );
};
