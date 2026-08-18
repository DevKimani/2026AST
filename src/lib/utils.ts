import { type ClassValue } from "./cva-lite";
export function cn(...inputs: ClassValue[]): string {
  return inputs.flat(Infinity as 1).filter(Boolean).join(" ");
}
