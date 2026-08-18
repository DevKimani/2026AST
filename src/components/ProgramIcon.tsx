import { Heart, BookOpen, Users, Coins } from "lucide-react";
import type { Program } from "@/data/programs";

export function ProgramIcon({ name, size = 24 }: { name: Program["icon"]; size?: number }) {
  const map = { heart: Heart, book: BookOpen, people: Users, coin: Coins };
  const Ic = map[name];
  return <Ic size={size} strokeWidth={1.8} />;
}
