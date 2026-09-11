import { useState } from "react";

export type MobileNavItemDropdownItem = {
  href: string;
  iconSrc: string;
  iconAlt: string;
  label: string;
};

export type MobileNavItemProps = {
  variant: string;
  label: string;
  href: string;
  ariaLabel: string;
  iconSrc: string;
  iconAlt: string;
  dropdownItems: MobileNavItemDropdownItem[];
  onNavigate?: () => void;
};

export const MobileNavItem = (props: MobileNavItemProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownId = `mobile-nav-${props.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  if (props.variant === "dropdown") {
    return (
      <li data-uid="-kL9-mjzSf48CooW" className="box-border caret-transparent list-none outline-[3px] border-t-white border-b-white/10 border-x-white border-b font-system_ui md:font-inter_v">
        <div data-uid="hFCmVM9_O40HjMHH" className="box-border caret-transparent outline-[3px] w-full px-2 py-4 font-system_ui md:font-inter_v">
          <button
            data-uid="WT5hv1IAMh0CKRGC"
            type="button"
            aria-expanded={isDropdownOpen}
            aria-controls={dropdownId}
            onClick={() => setIsDropdownOpen((isOpen) => !isOpen)}
            className="items-center box-border caret-transparent flex justify-between outline-[3px] w-full border-0 bg-transparent p-0 text-left font-system_ui md:font-inter_v"
          >
            <span data-uid="cU_6g-Svknnr1X6i" className="text-gray-300 box-border caret-transparent basis-[0%] grow leading-6 min-h-[auto] min-w-[auto] outline-[3px] font-system_ui md:leading-[18.4px] md:min-h-0 md:min-w-0 md:font-inter_v">
              {props.label}
            </span>
            <span data-uid="IDvBKedesvyTkQd0" className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] font-system_ui md:min-h-0 md:min-w-0 md:font-inter_v">
              <img data-uid="ptJoC9kuT0iDcpyy"
                src={props.iconSrc}
                alt={props.iconAlt || ""}
                aria-hidden={props.iconAlt ? undefined : true}
                className={`box-border caret-transparent h-5 outline-[3px] align-baseline w-5 font-system_ui transition-transform duration-300 md:font-inter_v ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </span>
          </button>
          <ul id={dropdownId} data-uid="ZfwCOYUNWv4jLcbx" className={`relative box-border caret-transparent gap-x-3 flex flex-col list-[circle] outline-[3px] gap-y-3 overflow-hidden pl-0 font-system_ui transition-[max-height,opacity,margin] duration-300 md:max-h-none md:opacity-100 md:mt-4 md:font-inter_v ${isDropdownOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}`}>
            {props.dropdownItems.map((item) => (
              <li data-uid="GAIqboqXvOTnxF5T"
                className="box-border caret-transparent list-none min-h-[auto] min-w-[auto] outline-[3px] font-system_ui md:min-h-0 md:min-w-0 md:font-inter_v"
                key={`${item.href}-${item.label}`}
              >
                <a data-uid="AgAKKrFoDuV0MU0y"
                  href={item.href}
                  onClick={props.onNavigate}
                  className="items-center box-border caret-transparent gap-x-2 flex outline-[3px] gap-y-2 font-system_ui md:font-inter_v"
                >
                  <img data-uid="CR6O0xaZprKizN2I"
                    src={item.iconSrc}
                    alt={item.iconAlt || ""}
                    aria-hidden={item.iconAlt ? undefined : true}
                    className="box-border caret-transparent hidden h-7 outline-[3px] align-baseline w-7 font-system_ui md:font-inter_v"
                  />
                  <span data-uid="lDII49fn39-QLRvB" className="text-gray-300 text-sm box-border caret-transparent block basis-[0%] grow leading-6 min-h-[auto] min-w-[auto] outline-[3px] font-system_ui md:text-base md:leading-[18.4px] md:min-h-0 md:min-w-0 md:font-inter_v">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li data-uid="cjzyJW3NBjjhT2e4" className="box-border caret-transparent list-none outline-[3px] border-t-white border-b-white/10 border-x-white border-b font-system_ui md:font-inter_v">
        <a data-uid="fMLD_NDc8uEyG8Rg"
          aria-label={props.ariaLabel}
          href={props.href}
          onClick={props.onNavigate}
        className="text-gray-300 box-border caret-transparent flex h-full leading-6 outline-[3px] w-full px-2 py-4 font-system_ui md:leading-[18.4px] md:font-inter_v"
      >
        {props.label}
      </a>
    </li>
  );
};
