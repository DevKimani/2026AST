export interface Program {
  slug: string;
  name: string;
  icon: "heart" | "book" | "people" | "coin";
  intro: string;
  heading1: string;
  list1: string[];
  heading2: string;
  list2: string[];
  who: string;
}

export const programs: Program[] = [
  {
    slug: "gbv",
    name: "Gender-Based Violence Response",
    icon: "heart",
    intro:
      "Confidential, survivor-centred support for people affected by gender-based violence, with choices explained at the pace that feels right for the person seeking help.",

    heading1: "Our approach",

    list1: [
      "Provide a respectful, non-judgmental first point of contact for people seeking support",
      "Offer psychosocial support and counselling where appropriately trained support is available",
      "Support safety planning based on the survivor's circumstances and choices",
      "Explain available health, legal, protection, and other referral options",
      "Protect dignity, privacy, and survivor choice throughout the support process",
    ],

    heading2: "Support may include",

    list2: [
      "One-to-one listening and emotional support",
      "Psychosocial support and counselling",
      "Safety planning",
      "Referral to appropriate services and response pathways",
      "Follow-up support where appropriate and agreed",
    ],

    who:
      "Women, girls, young mothers, and other people affected by gender-based violence in the communities we serve. A person does not need to know which service or programme they need before reaching out.",
  },

  {
    slug: "capacity-building",
    name: "Capacity Building",
    icon: "book",

    intro:
      "Learning activities that strengthen knowledge, confidence, practical skills, and community capacity around gender-based violence prevention, response, leadership, and livelihoods.",

    heading1: "Areas of learning",

    list1: [
      "Understanding gender-based violence and survivor-centred support",
      "Safer identification and referral of people seeking help",
      "Leadership, communication, and confidence-building",
      "Practical livelihood and enterprise skills where relevant",
      "Community awareness and prevention",
    ],

    heading2: "What participation can strengthen",

    list2: [
      "Confidence and self-agency",
      "Practical knowledge for leadership, work, enterprise, or community roles",
      "Understanding of safer referral pathways and boundaries when supporting survivors",
      "Connections with peers and community support networks",
    ],

    who:
      "Women, youth, community members, and others who can benefit from practical learning linked to AST's programme areas.",
  },

  {
    slug: "community-advocacy",
    name: "Community Advocacy",
    icon: "people",

    intro:
      "Community dialogue and awareness activities that challenge harmful norms, strengthen prevention, and make support pathways easier to understand.",

    heading1: "Advocacy focus areas",

    list1: [
      "Challenging harmful norms and attitudes that enable gender-based violence",
      "Raising awareness of safer reporting and referral pathways",
      "Promoting survivor-centred responses and respect for survivor choice",
      "Encouraging community responsibility for prevention and safety",
    ],

    heading2: "Ways we engage",

    list2: [
      "Community dialogue and awareness activities",
      "Engagement with men and boys as part of prevention work",
      "Collaboration with schools, faith groups, local leaders, service providers, and other community actors where appropriate",
      "Participation in relevant public awareness and prevention initiatives",
    ],

    who:
      "Community members, local leaders, schools, faith groups, service providers, and partners in Samburu County and surrounding communities where AST is working.",
  },

  {
    slug: "economic-empowerment",
    name: "Economic Empowerment",
    icon: "coin",

    intro:
      "Livelihood and enterprise support intended to strengthen financial independence, resilience, and practical options for survivors and community members.",

    heading1: "Areas of support",

    list1: [
      "Planning and strengthening small livelihood activities or micro-enterprises",
      "Practical livelihood and enterprise skills based on participant needs and available opportunities",
      "Financial literacy and money-management skills",
      "Basic business and entrepreneurship skills",
    ],

    heading2: "Support can include",

    list2: [
      "Practical business planning",
      "Mentoring or coaching where capacity is available",
      "Peer learning and support",
      "Connections to relevant opportunities or services where available",
    ],

    who:
      "Survivors, women, youth, and other eligible participants who want to strengthen livelihoods and reduce economic vulnerability.",
  },
];

export const getProgram = (slug?: string) =>
  programs.find((program) => program.slug === slug);