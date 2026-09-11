import { MobileMenuButton } from "./MobileMenuButton";
import { DesktopAuthActions } from "./DesktopAuthActions";

export type HeaderActionsProps = {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
};

export const HeaderActions = (props: HeaderActionsProps) => {
  return (
    <div data-uid="RnRUE1QHYL8tZy-7" className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] z-[2000] font-system_ui md:font-inter_v">
      <MobileMenuButton
        data-uid="8wkQAv7xBuFjLRCb"
        isOpen={props.isMobileMenuOpen}
        onClick={props.onMobileMenuToggle}
      />
      <DesktopAuthActions data-uid="30ooRtb3Vjvzj-LG" />
    </div>
  );
};
