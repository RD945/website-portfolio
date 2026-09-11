import { useId, useState } from "react";

export type FooterLinkColumnProps = {
  title: string;
  links: {
    href: string;
    label: string;
  }[];
};

export const FooterLinkColumn = (props: FooterLinkColumnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const linksId = useId();

  return (
    <div data-uid="ZfE_7CXQvPMMB1Je" className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] w-full px-2 border-t-white border-b-white/10 border-x-white border-b font-system_ui md:px-0 md:border-b-white md:border-b-0 md:font-inter_v">
      <button
        data-uid="bVFSbYpH_9oCQlQs"
        type="button"
        aria-expanded={isOpen}
        aria-controls={linksId}
        onClick={() => setIsOpen((open) => !open)}
        className="items-center box-border caret-transparent flex justify-between outline-[3px] pt-4 w-full border-0 bg-transparent text-left font-system_ui md:pointer-events-none md:pt-0 md:font-inter_v hover:text-white hover:bg-transparent hover:shadow-none hover:outline-offset-0 hover:outline-[3px] hover:no-underline hover:decoration-solid hover:decoration-auto hover:rounded-none hover:border-0 hover:border-none hover:border-white"
      >
        <h2 data-uid="rNMdMfKlfpLmf_ne" className="text-gray-400 text-base font-medium box-border caret-transparent basis-[0%] grow tracking-[-0.16px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] uppercase font-system_ui md:text-gray-300 md:text-sm md:tracking-[-0.14px] md:pointer-events-none md:normal-case md:font-inter_v hover:text-gray-500 hover:bg-transparent hover:shadow-none hover:outline-offset-0 hover:outline-[3px] hover:no-underline hover:decoration-solid hover:decoration-auto hover:border-gray-400 hover:rounded-none hover:border-0 hover:border-none">
          {props.title}
        </h2>
        <span data-uid="dhPJHSpNLMDcW46X" className={`box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] font-system_ui transition-transform duration-300 md:hidden md:min-h-0 md:min-w-0 md:pointer-events-none md:font-inter_v hover:text-white hover:bg-transparent hover:shadow-none hover:outline-offset-0 hover:outline-[3px] hover:no-underline hover:decoration-solid hover:decoration-auto hover:rounded-none hover:border-0 hover:border-none hover:border-white ${isOpen ? "rotate-180" : ""}`}>
          <img data-uid="Ek3095h9sLWesaz-"
            src="/assets/remote/c.animaapp.com/tO-VzA9Kzm3PB0vGDP_xYA/assets/icon-7.svg"
            alt=""
            aria-hidden="true"
            className="box-border caret-transparent h-5 outline-[3px] align-baseline w-5 font-system_ui md:pointer-events-none md:font-inter_v"
          />
        </span>
      </button>
      <ul id={linksId} data-uid="XrHnXgjbhZlhdF7Q" className={`relative box-border caret-transparent gap-x-3 flex flex-col outline-[3px] gap-y-3 overflow-hidden mb-4 pl-0 font-system_ui transition-[max-height,opacity,margin] duration-300 md:gap-x-4 md:max-h-none md:opacity-100 md:gap-y-4 md:mt-4 md:font-inter_v ${isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}`}>
        {props.links.map((link) => (
          <li data-uid="fV4mAjRM3GPO5zBX"
            key={link.href}
            className="box-border caret-transparent list-none min-h-[auto] min-w-[auto] outline-[3px] font-system_ui md:font-inter_v"
          >
            <a data-uid="sBYfhQPJrOr4LX-t"
              href={link.href}
              className="text-gray-500 text-sm box-border caret-transparent tracking-[-0.14px] leading-6 outline-[3px] font-system_ui md:text-gray-400 md:font-inter_v hover:text-gray-300 hover:border-gray-300"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
