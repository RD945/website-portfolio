import { Link } from "@tanstack/react-router";

type LogoProps = {
  className?: string;
  showName?: boolean;
};

/** Abstract soundwave mark: offset concentric arcs radiating from a core. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Auralis"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="19" cy="24" r="4.5" fill="currentColor" />
      <path
        d="M28 13.5a15 15 0 0 1 0 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M34 8.5a22 22 0 0 1 0 31"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M41 4a29 29 0 0 1 0 40"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M11 18a9 9 0 0 0 0 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function Logo({ className = "", showName = true }: LogoProps) {
  return (
    <Link
      to="/"
      className={`group flex items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-slate-100/70 ${className}`}
    >
      <LogoMark className="logo-mark h-9 w-9 text-stage-mist transition-transform duration-500 group-hover:rotate-[8deg] group-hover:text-slate-100" />
      {showName && (
        <span className="font-display text-xl font-light uppercase tracking-[0.18em]">Auralis</span>
      )}
    </Link>
  );
}
