import { MobileNavigation } from "./components/MobileNavigation";
import { HeaderLogo } from "./components/HeaderLogo";
import { DesktopNavigation } from "./components/DesktopNavigation";
import { HeaderActions } from "./components/HeaderActions";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = (restoreFocus = true) => {
    setIsMobileMenuOpen(false);
    if (restoreFocus) {
      window.setTimeout(() => {
        document.querySelector<HTMLButtonElement>("[aria-controls='mobile-navigation']")?.focus();
      }, 0);
    }
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu();
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header data-uid="q37kBZJpSOuHwM8d" className="fixed items-center backdrop-blur-xl bg-slate-950/45 border border-white/10 box-border caret-transparent flex justify-between outline-[3px] rounded-2xl translate-x-[-50%] w-[calc(100%-16px)] z-[2000] px-4 py-3 left-2/4 top-2 md:w-[1248px] md:px-6 md:py-4 md:top-4 font-system_ui md:font-inter_v">
        <HeaderLogo data-uid="wrn52asM5KHboeD_" />
        <DesktopNavigation data-uid="_8MH4Z50HwcK1plE" />
        <HeaderActions
          data-uid="IRJJJCu2S5_HbgGZ"
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        />
      </header>
      <MobileNavigation
        data-uid="BwhkwdUthkABbeCX"
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </>
  );
};
