import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SafetyBar } from "./SafetyBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { quickExit } from "@/lib/quickExit";

export function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
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
