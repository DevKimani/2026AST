export interface Program {
  slug: string;
  name: string;
  icon: "heart" | "book" | "people" | "coin";
  intro: string;
  heading1: string; list1: string[];
  heading2: string; list2: string[];
  who: string;
  outcomes: { n: string; l: string }[];
  images?: string[];
}

export const programs: Program[] = [
  {
    slug: "gbv",
    name: "Gender-Based Violence Response",
    icon: "heart",
    intro: "Confidential, survivor-led support and free psychosocial care for anyone affected by gender-based violence,at the pace they choose.",
    heading1: "Objectives",
    list1: [
      "Create safe spaces where survivors can break the silence around GBV",
      "Provide free psychosocial support and counselling from trained counsellors",
      "Ensure survivors are believed, supported, and empowered to heal",
      "Connect survivors to referral pathways;legal, health, and shelter services",
      "Support survivor-centred handling of cases and accountability for perpetrators",
    ],
    heading2: "Activities",
    list2: [
      "Safe spaces and one-to-one confidential support",
      "Free psychosocial support and counselling",
      "Safety planning and referral to [legal aid, health facilities, safe houses]",
      "Peer support groups",
      "Follow-up support through healing and recovery",
    ],
    who: "Women, young women, and girls affected by GBV in our community — and anyone seeking a safe, non-judgmental space to be believed and supported.",
    outcomes: [
      { n: "200", l: "young women given free psychosocial support" },
      { n: "100", l: "girls given free psychosocial support" },
      { n: "***", l: "referrals through GBV pathways" },
    ],
  },
  {
    slug: "capacity-building",
    name: "Capacity Building",
    icon: "book",
    intro: "Workshops that build confidence and practical skills; equipping women and youth to step into leadership and business roles in the community.",
    heading1: "Training areas",
    list1: [
      "Understanding gender-based violence and survivors’ rights",
      "Safe identification and referral of survivors",
      "Leadership and confidence-building for women and youth",
      "Practical skills for business and community roles",
      "Community awareness and prevention",
    ],
    heading2: "What participants gain",
    list2: [
      "Noticeably improved confidence and self-agency",
      "Practical skills to take on leadership and business roles",
      "Knowledge of referral pathways and how to support survivors safely",
      "A network of trained peers in the community",
    ],
    who: "Women and youth in our community ready to grow their confidence, skills, and leadership.",
    outcomes: [
      { n: "***", l: "people trained" },
      { n: "***", l: "women & youth in leadership roles" },
      { n: "***", l: "partner institutions reached" },
    ],
  },
  {
    slug: "community-advocacy",
    name: "Community Advocacy",
    icon: "people",
    intro: "Persistent community dialogue and grassroots campaigns that challenge harmful cultural norms and amplify local voices to reduce gender-based violence.",
    heading1: "Advocacy focus areas",
    list1: [
      "Challenging harmful cultural norms that enable GBV",
      "Raising awareness of referral pathways so cases are reported",
      "Promoting survivor-centred handling of cases and accountability",
      "Amplifying local voices in decisions that affect the community",
    ],
    heading2: "Engagement activities",
    list2: [
      "Community dialogues and awareness campaigns",
      "Engaging men and boys as allies",
      "Working with schools, faith groups, and local leaders",
      "Public events and commemorations [e.g. 16 Days of Activism]",
    ],
    who: "Communities, local leaders, schools, faith groups, and partners across [area].",
    outcomes: [
      { n: "***", l: "people reached in campaigns" },
      { n: "***", l: "community dialogues held" },
      { n: "***", l: "partners engaged" },
    ],
  },
  {
    slug: "economic-empowerment",
    name: "Economic Empowerment",
    icon: "coin",
    intro: "Grassroots initiatives that help survivors build sustainable micro-enterprises — stabilising households and reducing vulnerability through financial independence.",
    heading1: "What we offer",
    list1: [
      "Support to start and grow sustainable micro-enterprises",
      "Vocational and technical skills [list trades]",
      "Financial literacy and money management",
      "Business and entrepreneurship skills",
    ],
    heading2: "Business support",
    list2: [
      "[Start-up kits / seed grants / mentorship / market linkages]",
      "Ongoing coaching as businesses grow",
      "Peer networks of survivor entrepreneurs",
    ],
    who: "Survivors — especially women and youth — ready to build independent, sustainable livelihoods.",
    outcomes: [
      { n: "***", l: "supported into work or enterprise" },
      { n: "***", l: "micro-enterprises started" },
      { n: "***", l: "households more financially stable" },
    ],
    images: ["/images/hero.jpg", "/images/mission.jpg"],
  },
];

export const getProgram = (slug?: string) => programs.find((p) => p.slug === slug);
