import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import "@fontsource/archivo/latin-300.css";
import "@fontsource/archivo/latin-400.css";
import "@fontsource/dm-sans/latin-300.css";
import "@fontsource/dm-sans/latin-400.css";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="stage flex min-h-screen items-center justify-center px-4 text-slate-100">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-light text-slate-100">404</h1>
        <h2 className="mt-4 font-display text-xl font-light uppercase tracking-[0.12em]">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-stage-mist">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="cta inline-flex items-center justify-center rounded-full border border-stage-mist/50 px-6 py-2.5 text-sm hover:bg-slate-100 hover:text-stage-abyss"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="stage flex min-h-screen items-center justify-center px-4 text-slate-100">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-light uppercase tracking-[0.12em]">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-stage-mist">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="cta inline-flex items-center justify-center rounded-full border border-stage-mist/50 px-6 py-2.5 text-sm hover:bg-slate-100 hover:text-stage-abyss"
          >
            Try again
          </button>
          <a
            href="/"
            className="cta inline-flex items-center justify-center rounded-full border border-stage-mist/50 px-6 py-2.5 text-sm hover:bg-slate-100 hover:text-stage-abyss"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Auralis — The Wireless Headphones of the Future" },
      {
        name: "description",
        content: "High-resolution audio, active noise cancellation and spatial sound from Auralis.",
      },
      { name: "author", content: "Auralis" },
      { property: "og:title", content: "Auralis — The Wireless Headphones of the Future" },
      {
        property: "og:description",
        content: "High-resolution audio, active noise cancellation and spatial sound from Auralis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    document.documentElement.dataset["appReady"] = "true";

    const preventLinkNavigation = (event: MouseEvent) => {
      const target = event.target;
      const anchor = target instanceof Element ? target.closest("a") : null;
      const href = anchor?.getAttribute("href") ?? "";
      if (href === "#" || /^(?:\/|https?:|mailto:)/i.test(href)) {
        event.preventDefault();
      }
    };

    document.addEventListener("click", preventLinkNavigation, true);
    return () => document.removeEventListener("click", preventLinkNavigation, true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  );
}
