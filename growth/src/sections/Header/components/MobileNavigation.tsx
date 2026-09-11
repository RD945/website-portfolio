import { MobileNavItem } from "./MobileNavItem";
import { MobileAuthActions } from "./MobileAuthActions";

export type MobileNavigationProps = {
  isOpen: boolean;
  onClose: (restoreFocus?: boolean) => void;
};

export const MobileNavigation = (props: MobileNavigationProps) => {
  const closeAfterNavigation = () => props.onClose(false);

  return (
    <div
      data-uid="WKJrVlQx4sSisIeA"
      id="mobile-navigation"
      role="navigation"
      aria-label="Mobile navigation"
      aria-hidden={!props.isOpen}
      onClick={(event) => {
        if (event.target === event.currentTarget) props.onClose();
      }}
      className={`fixed items-center backdrop-blur-[36px] bg-slate-950/70 box-border caret-transparent flex h-screen justify-center outline-[3px] w-full z-[1999] overflow-hidden left-0 top-0 font-system_ui transition-[max-height,opacity] duration-300 md:hidden md:font-inter_v ${props.isOpen ? "max-h-screen opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"}`}
    >
      <div data-uid="qZXgRnOqwhN1USzE" onClick={(event) => event.stopPropagation()} className={`box-border caret-transparent flex flex-col h-full justify-between min-h-[auto] min-w-[auto] outline-[3px] w-full max-w-[390px] pt-20 pb-6 px-6 font-system_ui transition-[opacity,transform] duration-300 md:min-h-0 md:min-w-0 md:font-inter_v ${props.isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
        <div data-uid="6J1sUejrsOUIj2G7" className="box-border caret-transparent basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px] overflow-x-hidden overflow-y-auto pb-4 font-system_ui md:min-h-0 md:min-w-0 md:font-inter_v">
          <ul data-uid="vMBVyQlA2SZRluNv" className="box-border caret-transparent outline-[3px] my-4 pl-0 font-system_ui md:font-inter_v">
            <MobileNavItem data-uid="oCfu6tccEyDr3lsW"
              variant="dropdown"
              label="Insights"
              href=""
              ariaLabel="Insights"
              iconSrc="/assets/remote/c.animaapp.com/tO-VzA9Kzm3PB0vGDP_xYA/assets/icon-7.svg"
              iconAlt=""
              dropdownItems={[
                {
                  href: "/for-agencies",
                  iconSrc:
                    "/assets/remote/c.animaapp.com/tO-VzA9Kzm3PB0vGDP_xYA/assets/icon-8.svg",
                  iconAlt: "",
                  label: "Nexora for Agencies",
                },
                {
                  href: "/for-startups",
                  iconSrc:
                    "/assets/remote/c.animaapp.com/tO-VzA9Kzm3PB0vGDP_xYA/assets/icon-9.svg",
                  iconAlt: "",
                  label: "Nexora for Startups",
                },
                {
                  href: "/partnership",
                  iconSrc:
                    "/assets/remote/c.animaapp.com/tO-VzA9Kzm3PB0vGDP_xYA/assets/icon-10.svg",
                  iconAlt: "",
                  label: "Partnership",
                },
                {
                  href: "/affiliate",
                  iconSrc:
                    "/assets/remote/c.animaapp.com/tO-VzA9Kzm3PB0vGDP_xYA/assets/icon-8.svg",
                  iconAlt: "",
                  label: "Affiliate",
                },
              ]}
              onNavigate={closeAfterNavigation}
            />
            <MobileNavItem data-uid="LfMsVdo4t90QCN2U"
              variant="link"
              label="Pricing"
              href="/pricing"
              ariaLabel="Pricing"
              iconSrc=""
              iconAlt=""
              dropdownItems={[]}
              onNavigate={closeAfterNavigation}
            />
            <MobileNavItem data-uid="5RX1weHOl_k5_LVV"
              variant="link"
              label="Download"
              href="/download"
              ariaLabel="Download"
              iconSrc=""
              iconAlt=""
              dropdownItems={[]}
              onNavigate={closeAfterNavigation}
            />
            <MobileNavItem data-uid="lAeWGm3yOSPA1ie3"
              variant="link"
              label="Contact Us"
              href="#demo"
              ariaLabel="Contact Us"
              iconSrc=""
              iconAlt=""
              dropdownItems={[]}
              onNavigate={closeAfterNavigation}
            />
          </ul>
        </div>
        <MobileAuthActions data-uid="tgcEEmKw7jXgO0gz" onNavigate={closeAfterNavigation} />
      </div>
    </div>
  );
};
