import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SafetyBar } from "./SafetyBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { quickExit } from "@/lib/quickExit";

export function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const base = "Arise Strong Together";
    const titles: Record<string, string> = {
      "/": "Supporting Survivors of Gender-Based Violence",
      "/about": "About Us", "/get-help": "Get Help", "/programs": "Programs",
      "/get-involved": "Get Involved", "/volunteer": "Volunteer",
      "/donate": "Donate", "/contact": "Contact", "/blog": "News & Stories",
    };
    const t = titles[pathname];
    document.title = t ? `${t} | ${base}` : base;
  }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") quickExit(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <>
      <SafetyBar />
      <Header />
      <main><Outlet /></main>
      <Footer />
    </>
  );
}