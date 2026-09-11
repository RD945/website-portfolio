import { FormEvent, useId, useState } from "react";

const domainPattern = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;

const normalizeDomain = (value: string) =>
  value
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "")
    .toLowerCase();

export const CtaForm = () => {
  const formId = useId().replace(/:/g, "");
  const domainId = `demo-domain-${formId}`;
  const noteId = `demo-note-${formId}`;
  const errorId = `demo-error-${formId}`;
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedDomain = normalizeDomain(domain);

    if (!domainPattern.test(normalizedDomain)) {
      setError("Enter a valid domain, such as example.com.");
      return;
    }

    setError("Signup is not connected in this demo.");
  };

  return (
    <form data-uid="2wzZt9YjBq7VJ-RR" onSubmit={handleSubmit} noValidate className="items-center box-border caret-transparent flex flex-col outline-[3px] text-wrap font-system_ui md:text-nowrap md:font-inter_v">
      <label htmlFor={domainId} className="sr-only">
        Website domain
      </label>
      <div data-uid="KdZEBRIuGUuNbDAx" className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-wrap font-system_ui md:text-nowrap md:font-inter_v">
        <div data-uid="EAmRLFBhDkft-53r" className="relative backdrop-blur-sm bg-white/0 box-border caret-transparent inline-block isolate outline-[3px] text-wrap overflow-hidden rounded-[999px] font-system_ui md:text-nowrap md:font-inter_v">
          <div data-uid="K5MxOOdUDvUnbBzm" className="relative text-sm font-medium box-border caret-transparent tracking-[-0.14px] leading-6 outline-[3px] text-wrap z-[1] border rounded-[999px] border-solid border-white/10 font-system_ui md:text-nowrap md:font-inter_v">
            <input
              data-uid="fenmN6in6H3sXPuf"
              id={domainId}
              name="domain"
              type="text"
              inputMode="url"
              autoComplete="url"
              value={domain}
              onChange={(event) => {
                setDomain(event.target.value);
                if (error) setError("");
              }}
              placeholder="example.com"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : noteId}
              className="relative font-normal bg-transparent text-white placeholder:text-white/40 box-border h-[46px] tracking-[normal] leading-[16.1px] max-w-[352px] outline-[3px] text-start text-wrap w-full z-[1] border pl-5 pr-[130px] py-3.5 border-solid border-transparent font-system_ui md:text-nowrap md:font-inter_v"
            />
          </div>
        </div>
        <div data-uid="BgbeDw_zUNaT-6Oy" className="absolute backdrop-blur-sm box-border caret-transparent isolate outline-[3px] text-wrap z-[4] overflow-hidden rounded-[999px] right-1 top-1 font-system_ui md:text-nowrap md:font-inter_v">
          <button data-uid="V1EwAkqIossMUEc1"
            type="submit"
            disabled={!domain.trim()}
            className="relative text-stone-950/30 text-sm font-medium bg-white/0 bg-[radial-gradient(107.5%_107.5%_at_50%_215%,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0)_100%),none] bg-size-[auto,auto] caret-transparent tracking-[-0.14px] leading-6 outline-[3px] text-wrap z-[1] border bg-[position:0%,0%_0%,0%] px-6 py-[7px] rounded-[999px] border-white/10 transition-all duration-300 enabled:text-white enabled:hover:bg-white/5 enabled:hover:border-white/25 disabled:cursor-not-allowed disabled:opacity-60 font-system_ui md:text-nowrap md:font-inter_v"
          >
            <span data-uid="7iBADuDS3VVA9IS0" className="text-transparent bg-clip-text bg-[linear-gradient(rgba(255,255,255,0.3)_8.85%,rgb(255,255,255)_100%)] box-border block outline-[3px] text-wrap font-system_ui md:text-nowrap md:font-inter_v">
              Analyze my domain
            </span>
          </button>
        </div>
      </div>
      <div id={noteId} data-uid="fbOYD7IGTO4cuFQv" className="text-white/50 text-xs items-center box-border caret-transparent flex justify-center tracking-[-0.12px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-wrap mt-4 font-system_ui md:text-sm md:tracking-[-0.14px] md:leading-6 md:text-nowrap md:mt-3 md:font-inter_v">
        No credit card required
        <img data-uid="FmSNGnx9lMuYiVmT"
          src="/assets/remote/c.animaapp.com/tO-VzA9Kzm3PB0vGDP_xYA/assets/icon-19.svg"
          alt=""
          aria-hidden="true"
          className="text-xs box-border caret-transparent h-2.5 tracking-[-0.12px] leading-4 outline-[3px] text-wrap align-baseline w-2.5 mx-3 font-system_ui md:text-sm md:tracking-[-0.14px] md:leading-6 md:text-nowrap md:font-inter_v"
        />
        14-day free trial
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-red-300 text-xs mt-3">
          {error}
        </p>
      ) : null}
    </form>
  );
};
