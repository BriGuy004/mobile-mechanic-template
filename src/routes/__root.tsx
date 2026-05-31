import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { siteConfig } from "@/config/siteConfig";
import { localBusinessJsonLd } from "@/components/site/Seo";
import { Header } from "@/components/site/Header";
import { TopBar } from "@/components/site/TopBar";
import { Footer } from "@/components/site/Footer";
import { MobileStickyCTA } from "@/components/site/MobileStickyCTA";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white">
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try refreshing.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white">Try again</button>
          <a href="/" className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium">Go home</a>
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
      { title: `${siteConfig.businessName} | ${siteConfig.primaryCity} ${siteConfig.verticalNoun} Repair, Install & Service` },
      { name: "description", content: siteConfig.defaultDescription },
      { name: "author", content: siteConfig.legalName },
      { name: "theme-color", content: siteConfig.colorPrimary },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: siteConfig.businessName },
      { property: "og:title", content: `${siteConfig.businessName} | ${siteConfig.primaryCity} ${siteConfig.verticalNoun}` },
      { property: "og:description", content: siteConfig.defaultDescription },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: localBusinessJsonLd(),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const c = siteConfig;
  // Inject brand tokens at runtime from config
  const brandVars = `:root{--brand-primary:${c.colorPrimary};--brand-accent:${c.colorAccent};--brand-dark-bg:${c.colorDarkBg};--brand-light-bg:${c.colorLightBg};--brand-text-dark:${c.colorTextDark};--brand-text-light:${c.colorTextLight};--font-headline:${c.fontHeadline};--font-body:${c.fontBody};}`;
  return (
    <html lang={c.defaultLanguage}>
      <head>
        <HeadContent />
        <style dangerouslySetInnerHTML={{ __html: brandVars }} />
      </head>
      <body className="font-body antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col pb-20 lg:pb-0">
        <TopBar />
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <MobileStickyCTA />
      </div>
    </QueryClientProvider>
  );
}
