import type { ReactNode } from "react";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "./index.css";
import "./i18n";

export function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />

        <meta
          name="author"
          content="Arise Strong Together"
        />

        <meta
          name="theme-color"
          content="#B54B24"
        />

        <link
          rel="icon"
          type="image/png"
          href="/images/logo-mark.png"
        />

        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Figtree:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <Meta />
        <Links />
      </head>

      <body>
        {children}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}