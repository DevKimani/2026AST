import {
  matchPath,
  useLocation,
} from "react-router-dom";

import { getProgram } from "@/data/programs";

const SITE_NAME =
  "Arise Strong Together";

const SITE_URL =
  "https://www.arisestrongtogether.org";

const DEFAULT_IMAGE =
  `${SITE_URL}/images/logo.png`;

const HOME_IMAGE =
  `${SITE_URL}/images/hero.jpg`;

interface SeoData {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}

const staticSeo: Record<
  string,
  SeoData
> = {
  "/": {
    title:
      "Supporting Survivors of Gender-Based Violence",

    description:
      "Arise Strong Together is a survivor-founded community-based organisation in Samburu County, Kenya supporting people affected by gender-based violence through survivor-centred support, prevention, skills-building, and economic empowerment.",

    image: HOME_IMAGE,
  },

  "/about": {
    title: "About Us",

    description:
      "Learn about Arise Strong Together, a survivor-founded community-based organisation in Samburu County working across GBV support, prevention, skills-building, and economic resilience.",
  },

  "/get-help": {
    title: "Get Help",

    description:
      "Find confidential, survivor-centred gender-based violence support options in Kenya, including Arise Strong Together contact information and national emergency and GBV helplines.",
  },

  "/programs": {
    title: "Our Programmes",

    description:
      "Explore Arise Strong Together programmes in GBV response, capacity building, community advocacy, and economic empowerment in Samburu County, Kenya.",
  },

  "/get-involved": {
    title: "Get Involved",

    description:
      "Support Arise Strong Together through partnership, volunteering, practical resources, or financial contributions that strengthen survivor-centred and community-led work.",
  },

  "/volunteer": {
    title: "Volunteer",

    description:
      "Register your interest in volunteering with Arise Strong Together through community, administrative, event, or skills-based roles subject to current needs and safeguarding requirements.",
  },

  "/donate": {
    title: "Donate",

    description:
      "Support Arise Strong Together and help sustain survivor-centred support, GBV prevention, skills-building, community programmes, and economic resilience work.",
  },

  "/contact": {
    title: "Contact Us",

    description:
      "Contact Arise Strong Together in Samburu County, Kenya for support enquiries, partnerships, volunteering, donations, media, or general questions.",
  },

  "/blog": {
    title: "News & Stories",

    description:
      "Read updates, reflections, resources, and stories from Arise Strong Together's work on survivor support, GBV prevention, and community resilience.",
  },

  "/privacy": {
    title:
      "Privacy & Safer Browsing",

    description:
      "Read how Arise Strong Together handles personal information, protects confidential enquiries, and provides safer-browsing guidance for people seeking support.",
  },
};

function getSeo(
  pathname: string
): SeoData {
  const staticMatch =
    staticSeo[pathname];

  if (staticMatch) {
    return staticMatch;
  }

  const programMatch =
    matchPath(
      "/programs/:slug",
      pathname
    );

  if (programMatch) {
    const program =
      getProgram(
        programMatch.params.slug
      );

    if (program) {
      return {
        title: program.name,

        description:
          `${program.intro} Learn more about Arise Strong Together's ${program.name} programme in Samburu County, Kenya.`,
      };
    }
  }

  return {
    title: "Page Not Found",

    description:
      "The page you requested could not be found on the Arise Strong Together website.",

    noIndex: true,
  };
}

function OrganizationJsonLd() {
  const data = {
    "@context":
      "https://schema.org",

    "@type": "NGO",

    name: SITE_NAME,

    legalName: SITE_NAME,

    url: SITE_URL,

    logo:
      `${SITE_URL}/images/logo.png`,

    image: HOME_IMAGE,

    description:
      "A survivor-founded community-based organisation in Samburu County, Kenya supporting people affected by gender-based violence through survivor-centred support, prevention, skills-building, and economic empowerment.",

    foundingDate: "2025",

    areaServed: {
      "@type":
        "AdministrativeArea",

      name:
        "Samburu County, Kenya",
    },

    address: {
      "@type":
        "PostalAddress",

      addressRegion:
        "Samburu County",

      addressCountry:
        "KE",
    },

    email:
      "arisestrongtogether@gmail.com",

    telephone:
      "0180740140",

    sameAs: [
      "https://www.instagram.com/arisestrongtogether/",
    ],

    contactPoint: {
      "@type":
        "ContactPoint",

      telephone:
        "0180740140",

      contactType:
        "general enquiries",

      areaServed:
        "KE",

      availableLanguage: [
        "en",
        "sw",
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          JSON.stringify(data),
      }}
    />
  );
}

export function Seo() {
  const { pathname } =
    useLocation();

  const data =
    getSeo(pathname);

  const canonical =
    `${SITE_URL}${
      pathname === "/"
        ? ""
        : pathname
    }`;

  const fullTitle =
    pathname === "/"
      ? `${SITE_NAME} | ${data.title}`
      : `${data.title} | ${SITE_NAME}`;

  const image =
    data.image ??
    DEFAULT_IMAGE;

  return (
    <>
      <title>
        {fullTitle}
      </title>

      <meta
        name="description"
        content={
          data.description
        }
      />

      <meta
        name="robots"
        content={
          data.noIndex
            ? "noindex, nofollow"
            : "index, follow"
        }
      />

      <link
        rel="canonical"
        href={canonical}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:site_name"
        content={SITE_NAME}
      />

      <meta
        property="og:title"
        content={fullTitle}
      />

      <meta
        property="og:description"
        content={
          data.description
        }
      />

      <meta
        property="og:url"
        content={canonical}
      />

      <meta
        property="og:image"
        content={image}
      />

      <meta
        property="og:locale"
        content="en_KE"
      />

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={fullTitle}
      />

      <meta
        name="twitter:description"
        content={
          data.description
        }
      />

      <meta
        name="twitter:image"
        content={image}
      />

      {pathname === "/" && (
        <OrganizationJsonLd />
      )}
    </>
  );
}