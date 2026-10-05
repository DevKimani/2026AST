import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",

  // Static hosting — no runtime React server required.
  ssr: false,

  // Generate real HTML for every public AST page.
  prerender: [
    "/",

    "/about",

    "/get-help",

    "/programs",

    "/programs/gbv",

    "/programs/capacity-building",

    "/programs/community-advocacy",

    "/programs/economic-empowerment",

    "/get-involved",

    "/volunteer",

    "/donate",

    "/contact",

    "/blog",

    "/privacy",
  ],
} satisfies Config;