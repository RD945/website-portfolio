export type DesktopNavItemProps = {
  label: string;
  href?: string;
  showIcon?: boolean;
  iconSrc?: string;
  iconAlt?: string;
};

export const DesktopNavItem = (props: DesktopNavItemProps) => {
  return (
    <li data-uid="hmHoeX1sLWFb3hdw" className="relative items-center box-border caret-transparent flex h-full justify-center list-none min-h-0 min-w-0 outline-[3px] font-system_ui md:min-h-[auto] md:min-w-[auto] md:font-inter_v">
      {props.href ? (
        <a data-uid="amjdPEsC9ZOjtn07"
          aria-label={props.label}
          href={props.href}
           className="group relative items-center box-border caret-transparent gap-x-2 flex justify-center min-h-0 min-w-0 opacity-70 outline-[3px] gap-y-2 text-nowrap px-3 transition-all duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-300 font-system_ui md:min-h-[auto] md:min-w-[auto] md:font-inter_v"
        >
           <span data-uid="AjcPM6xqJkNe-GJU" className="text-slate-50 text-sm box-border caret-transparent block tracking-[-0.14px] leading-6 min-h-0 min-w-0 outline-[3px] text-nowrap transition-transform duration-300 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 font-system_ui md:min-h-[auto] md:min-w-[auto] md:font-inter_v">
            {props.label}
          </span>
           <span data-uid="zPcdWXWQsrER6xPM" className="absolute bg-white/70 box-border caret-transparent h-px opacity-0 outline-[3px] transition-all duration-300 w-0 left-1/2 -translate-x-1/2 bottom-1 group-hover:opacity-100 group-hover:w-[calc(100%-28px)] group-focus-visible:opacity-100 group-focus-visible:w-[calc(100%-28px)]"></span>
        </a>
      ) : (
        <div data-uid="unIYjGUJFQFYi-rJ"
          aria-label={props.label}
          className="group relative items-center box-border caret-transparent gap-x-2 flex justify-center min-h-0 min-w-0 opacity-70 outline-[3px] gap-y-2 text-nowrap px-3 transition-all duration-300 hover:opacity-100 font-system_ui md:min-h-[auto] md:min-w-[auto] md:font-inter_v"
        >
          <span data-uid="PUcnqp6DCM2cXav_" className="text-slate-50 text-sm box-border caret-transparent block tracking-[-0.14px] leading-6 min-h-0 min-w-0 outline-[3px] text-nowrap font-system_ui md:min-h-[auto] md:min-w-[auto] md:font-inter_v">
            {props.label}
          </span>
          {props.showIcon ? (
            <span data-uid="DjxQFzdrCWHSDlF9" className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap font-system_ui md:min-h-[auto] md:min-w-[auto] md:font-inter_v">
              <img data-uid="FBNVyq1KpUrL_xUC"
                src={props.iconSrc}
                alt={props.iconAlt}
                className="box-border caret-transparent h-4 outline-[3px] text-nowrap align-baseline w-4 font-system_ui md:font-inter_v"
              />
            </span>
          ) : null}
        </div>
      )}
    </li>
  );
};
