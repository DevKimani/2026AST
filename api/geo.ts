// Vercel Edge Function. Returns the visitor's country from Vercel's geo header.
// Local dev returns empty -> the client falls back to device locale.
export const config = { runtime: "edge" };

export default function handler(req: Request): Response {
  const country = req.headers.get("x-vercel-ip-country") || "";
  return new Response(JSON.stringify({ country }), {
    headers: { "content-type": "application/json", "cache-control": "public, max-age=3600" },
  });
}
