export type TrackId = "eng" | "motion" | "vfx" | "learn";

export type Clip = {
  id: string;
  track: TrackId;
  title: string;
  org: string;
  start: number;
  end: number;
  period: string;
  location?: string;
  summary: string;
  points?: string[];
  tags?: string[];
};

export const tracks: { id: TrackId; code: string; label: string }[] = [
  { id: "eng", code: "V1", label: "Engineering" },
  { id: "motion", code: "V2", label: "Motion & Film" },
  { id: "vfx", code: "V3", label: "VFX & Mocap" },
  { id: "learn", code: "A1", label: "Learning" },
];

export const TIMELINE_START = 2009;
export const TIMELINE_END = 2027;
export const NOW = 2026 + 9.7 / 12;

const month = (year: number, m: number) => year + (m - 1) / 12;

export const clips: Clip[] = [
  {
    id: "atlassian",
    track: "eng",
    title: "Software Engineer",
    org: "Atlassian",
    start: month(2025, 9),
    end: NOW,
    period: "Sep 2025 — Present",
    location: "Auckland, NZ",
    summary:
      "Design System team. Platform work that ships to every Atlassian product.",
    points: [
      "Led the migration of every product to ADS iconography and removed the legacy icons from the Atlassian Frontend Monorepo. The icon package is 50% smaller with 54% fewer files, and adoption in AFM is 100%.",
      "Built, shipped and scaled Rovo Retro to 1,400+ users, with 1,150+ in its first two weeks. It replaced better-retro, the retro tool Atlassian had used for 6+ years, and placed 3rd of 284 teams at ShipIt 62.",
      "Contribute to ADS Motion, rolling motion tokens out to shared components. It's where my film background meets my engineering.",
      "Use multi-agent AI workflows for research, codebase context and large migrations, while keeping architectural oversight.",
    ],
    tags: ["React", "TypeScript", "Compiled CSS", "ESLint", "Codemods", "Design systems", "AI agents"],
  },
  {
    id: "xero-senior",
    track: "eng",
    title: "Senior Engineer",
    org: "Xero",
    start: month(2022, 7),
    end: month(2025, 8),
    period: "Jul 2022 — Aug 2025",
    location: "Auckland, NZ",
    summary:
      "Frontend platform: templates and shared foundations that other product teams build on.",
    points: [
      "Led the Dashboard Template, which lets 3+ product teams plug widgets into one microfrontend platform. Integration time went from 1 month to 2 days.",
      "Co-created the Widget Template with Storybook and shared utilities. 10+ widgets across 4 teams now use it, and building a new widget takes 1 day instead of 2 months.",
      "Championed onboarding for internal consumers through docs, workshops and direct support, which improved DX and adoption across squads.",
      "Partnered with designers, PMs and engineering leads in Australia on design consistency, accessibility and UX. Fixed design inconsistencies and WCAG violations.",
      "Interviewed intermediate engineers, sat on the Grad Day 2022 panel, and buddied new grads.",
    ],
    tags: ["React", "TypeScript", "Microfrontends", "Storybook", "Accessibility", "Mentoring"],
  },
  {
    id: "xero",
    track: "eng",
    title: "Software Engineer",
    org: "Xero",
    start: month(2021, 3),
    end: month(2022, 7),
    period: "Mar 2021 — Jul 2022",
    location: "Auckland, NZ",
    summary:
      "Contacts team: rebuilt the Contacts page from a legacy .NET page into a React frontend on a .NET backend.",
    points: [
      "Rebuilt the Contacts List and Add/Edit Contact pages in React as part of the Future of Xero initiative, which made them faster, easier to maintain and quicker to ship features on.",
      "Deployed Dockerised apps to AWS with Kubernetes and Helm, with CI/CD on TeamCity.",
      "Monitored with New Relic and Sumo Logic, measured with Mixpanel, and built mock servers for local end-to-end tests.",
      "Ran sprint rituals and mentored teammates on frontend practice.",
    ],
    tags: ["React", "Redux", "GraphQL", ".NET Core", "AWS", "Kubernetes", "Cypress"],
  },
  {
    id: "asb",
    track: "eng",
    title: "Fullstack Software Engineer",
    org: "ASB Bank",
    start: month(2020, 1),
    end: month(2021, 3),
    period: "Jan 2020 — Mar 2021",
    location: "Auckland, NZ",
    summary:
      "Personalisation team: features for customers' personal details, such as name, legal name, address and tax.",
    points: [
      "Delivered the Profile, Tax Details and Preferences pages with React, TypeScript and .NET, from UI through to the APIs that update customer details.",
      "Contributed to GEL, ASB's shared UI component library.",
      "Worked with designers, PMs and compliance to meet customer needs and regulatory standards.",
      "Made tests more reliable with Jest and Cypress suites across frontend features.",
    ],
    tags: ["React", "TypeScript", "C# .NET", "Azure", "Accessibility", "Jest"],
  },
  {
    id: "movio",
    track: "eng",
    title: "Intermediate Web Developer",
    org: "Movio",
    start: month(2018, 6),
    end: month(2019, 12),
    period: "Jun 2018 — Oct 2019",
    location: "Auckland, NZ",
    summary:
      "Marketing site, analytics UI and microsites for the cinema-marketing company Movio.",
    points: [
      "Built and maintained features on the Movio website (Django) and the Movio Cinema and Media platforms (React, D3).",
      "Built dynamic UI components for marketing dashboards and analytics interfaces.",
      "Hand-coded responsive email templates (HTML, Marketo) for global campaigns.",
      "Delivered style guide and onboarding microsites with UX and graphic designers.",
    ],
    tags: ["React", "Redux Saga", "D3", "Django", "Python", "Docker"],
  },
  {
    id: "beweb",
    track: "eng",
    title: "Fullstack Web Developer",
    org: "beweb limited",
    start: month(2017, 6),
    end: month(2018, 6),
    period: "Jun 2017 — Jun 2018",
    location: "Auckland, NZ",
    summary: "First engineering role: client websites from layout to CMS.",
    points: [
      "Built and launched 10+ websites end to end on an in-house C# .NET MVC CMS.",
      "Worked with designers on pixel-perfect responsive sites for Honda, Rinnai and Auckland Museum.",
    ],
    tags: ["C# .NET MVC", "JavaScript", "jQuery", "CSS"],
  },
  {
    id: "redfire",
    track: "motion",
    title: "Motion Graphics / Film Producer & Director",
    org: "Redfire",
    start: month(2017, 2),
    end: month(2017, 6),
    period: "Feb 2017 — Jun 2017",
    location: "Auckland, NZ",
    summary: "Produced videos for clients and for Redfire, and cut the studio showreel.",
  },
  {
    id: "freelance",
    track: "motion",
    title: "Motion Graphics / Film Producer & Director",
    org: "Freelance",
    start: month(2013, 10),
    end: month(2017, 6),
    period: "Oct 2013 — Jun 2017",
    summary:
      "Independent motion design and film work for brands, creators and tech companies.",
    points: [
      "Ask Harold YouTube channel videos",
      "Sigmoid Coach2Coach project videos",
      "Haystack website tutorial video",
      "Giant Poppy project",
    ],
  },
  {
    id: "ice",
    track: "motion",
    title: "Media Producer & Director",
    org: "ICE Professionals",
    start: month(2013, 10),
    end: month(2015, 1),
    period: "Oct 2013 — Jan 2015",
    location: "Auckland, NZ",
    summary:
      "Typography and infographic videos, ads, web and graphic design, and photography.",
  },
  {
    id: "weta",
    track: "vfx",
    title: "Mocap Tracker",
    org: "Wētā FX",
    start: month(2015, 4),
    end: month(2015, 10),
    period: "Apr 2015 — Sep 2015",
    location: "Wellington, NZ",
    summary:
      "Tracked body and facial motion capture for feature films at one of the world's biggest VFX studios.",
    points: [
      "Tracked body motion capture in Giant to a professional standard for motion editing.",
      "Tracked facial motion capture in Famfit for facial solves. Giant and Famfit are both Wētā in-house tools.",
      "Credits include The Jungle Book, The BFG, Batman v Superman and The Hunger Games: Mockingjay.",
    ],
    tags: ["Giant", "Famfit", "Body mocap", "Facial mocap"],
  },
  {
    id: "aut-mocap",
    track: "vfx",
    title: "Motion Capture Assistant",
    org: "AUT",
    start: month(2014, 6),
    end: month(2015, 4),
    period: "Jun 2014 — Mar 2015",
    location: "Auckland, NZ",
    summary:
      "Captured and animated 3D characters with studios, using MotionBuilder and CaraPost for facial capture.",
    points: [
      "“25 April” with Flux Animation Studio",
      "Chiho Aoshima Animated Mural with Darkroom",
      "Rugby World Cup intro with Brandspank",
    ],
    tags: ["MotionBuilder", "CaraPost", "Motion editing"],
  },
  {
    id: "cause-fx",
    track: "vfx",
    title: "Rotoscope Artist",
    org: "Cause+FX",
    start: month(2014, 7),
    end: month(2014, 8),
    period: "Jul 2014",
    location: "Auckland, NZ",
    summary: "Rotoscoped shots for a TV show.",
  },
  {
    id: "talk",
    track: "learn",
    title: "English Teacher (TaLK)",
    org: "NIIED",
    start: month(2009, 8),
    end: month(2011, 2),
    period: "Aug 2009 — Jan 2011",
    location: "South Korea",
    summary:
      "Taught English to elementary school students in rural South Korea.",
  },
  {
    id: "aut",
    track: "learn",
    title: "Bachelor of Art & Design, Digital Design",
    org: "AUT University",
    start: 2012,
    end: 2015,
    period: "2012 — 2014",
    summary: "Digital design degree, and an Art and Design Scholarship in 2013.",
  },
  {
    id: "fcc",
    track: "learn",
    title: "Full Stack Web Development",
    org: "freeCodeCamp",
    start: 2016,
    end: month(2016, 5),
    period: "2016",
    summary: "Full stack web development certificate.",
  },
  {
    id: "yoobee",
    track: "learn",
    title: "Associate's Degree, Web Development",
    org: "ACG Yoobee School of Design",
    start: month(2016, 5),
    end: 2017.5,
    period: "2016 — 2017",
    summary: "Formal training in web development, which led into engineering.",
  },
];

const poster = (path: string) => `https://image.tmdb.org/t/p/w342/${path}`;

export const credits = {
  weta: [
    {
      title: "The Jungle Book",
      year: "2016",
      poster: poster("2Epx7F9X7DrFptn4seqn4mzBVks.jpg"),
      url: "https://www.themoviedb.org/movie/278927-the-jungle-book",
    },
    {
      title: "The BFG",
      year: "2016",
      poster: poster("w17Mc2x2olB5CtewznUFxgpvne0.jpg"),
      url: "https://www.themoviedb.org/movie/267935-the-bfg",
    },
    {
      title: "Batman v Superman: Dawn of Justice",
      year: "2016",
      poster: poster("5UsK3grJvtQrtzEgqNlDljJW96w.jpg"),
      url: "https://www.themoviedb.org/movie/209112-batman-v-superman-dawn-of-justice",
    },
    {
      title: "The Hunger Games: Mockingjay – Part 2",
      year: "2015",
      poster: poster("lImKHDfExAulp16grYm8zD5eONE.jpg"),
      url: "https://www.themoviedb.org/movie/131634-the-hunger-games-mockingjay-part-2",
    },
    {
      title: "Maze Runner: The Scorch Trials",
      year: "2015",
      poster: poster("mYw7ZyejqSCPFlrT2jHZOESZDU3.jpg"),
      url: "https://www.themoviedb.org/movie/294254-maze-runner-the-scorch-trials",
    },
    {
      title: "The Hobbit: The Battle of the Five Armies",
      year: "Extended Edition",
      poster: poster("xT98tLqatZPQApyRmlPL12LtiWp.jpg"),
      url: "https://www.themoviedb.org/movie/122917-the-hobbit-the-battle-of-the-five-armies",
    },
  ],
  studio: [
    { title: "25 April", studio: "Flux Animation Studio" },
    { title: "Chiho Aoshima Animated Mural", studio: "Darkroom" },
    { title: "Rugby World Cup Intro", studio: "Brandspank" },
  ],
};


export type Stat = {
  value: number;
  suffix: string;
  label: string;
  detail: string;
  org: string;
};

export const stats: Stat[] = [
  {
    value: 9,
    suffix: "+ yrs",
    label: "shipping software",
    detail: "From agency websites in 2017 to the Atlassian Design System",
    org: "2017–now",
  },
  {
    value: 2,
    suffix: " days",
    label: "to plug a team into the dashboard",
    detail: "Down from 1 month, with the Dashboard Template I led",
    org: "Xero",
  },
  {
    value: 1,
    suffix: " day",
    label: "to build a new widget",
    detail: "Down from 2 months. 10+ widgets across 4 teams use the template.",
    org: "Xero",
  },
  {
    value: 1400,
    suffix: "+",
    label: "Rovo Retro users",
    detail: "Built and scaled it. 3rd of 284 teams at ShipIt 62.",
    org: "Atlassian",
  },
  {
    value: 50,
    suffix: "%",
    label: "smaller icon package",
    detail: "Every Atlassian product migrated to ADS iconography",
    org: "Atlassian",
  },
  {
    value: 10,
    suffix: "+",
    label: "client websites launched",
    detail: "End to end, for Honda, Rinnai and Auckland Museum",
    org: "beweb",
  },
];

export const growth = [
  { id: "beweb", year: "2017", org: "beweb", scope: "Websites", detail: "10+ client sites, end to end" },
  { id: "movio", year: "2018", org: "Movio", scope: "Products", detail: "Marketing site, dashboards and microsites" },
  { id: "asb", year: "2020", org: "ASB Bank", scope: "Banking", detail: "Personalisation: customers' personal details" },
  { id: "xero", year: "2021", org: "Xero", scope: "Full stack", detail: "Contacts rebuilt from legacy .NET to React" },
  { id: "xero-senior", year: "2022", org: "Xero · Senior", scope: "Platform", detail: "Templates other teams build on, plus mentoring and hiring" },
  { id: "atlassian", year: "2025", org: "Atlassian", scope: "Design system", detail: "Foundations used by every Atlassian product" },
];

export const journey = [
  {
    years: "2012 — 2017",
    title: "Frames",
    body: "I studied digital design at AUT, directed and animated motion graphics for clients, and tracked motion capture at Wētā FX for films like The Jungle Book and The BFG.",
  },
  {
    years: "2016 — 2017",
    title: "The switch",
    body: "I wanted to build the things I was designing, not just animate them. I learned full stack development through freeCodeCamp and Yoobee, and took my first developer job in 2017.",
  },
  {
    years: "2017 — now",
    title: "Code",
    body: "Nine years of engineering since then. I went from client websites to product teams at Movio, ASB and Xero, then to platform work that other teams build on.",
  },
  {
    years: "Today",
    title: "Full circle",
    body: "At Atlassian I work on the design system that every product uses. That includes bringing motion to ADS, which puts the film years to work again.",
  },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  url: string;
  repo: string;
  accent: string;
};

export const projects: Project[] = [
  {
    id: "home-trainer",
    name: "HomeTrainer",
    tagline: "Free guided home workouts with an animated trainer",
    description:
      "An installable 7-minute-workout PWA with 72 animated exercises, a voice coach, a routine builder and share codes.",
    highlights: [
      "Custom SVG animation engine with forward kinematics, two-bone IK and keyframe interpolation. No animation libraries.",
      "Voice coach built on Web Speech, with screen wake lock, vibration and keyboard control",
      "Routines shared through HT-XXXX-XXXX codes backed by immutable Firestore snapshots",
    ],
    stack: ["React 19", "TypeScript", "Vite", "Firebase", "PWA", "Vitest"],
    url: "https://ckangnz.github.io/home-trainer/",
    repo: "https://github.com/ckangnz/home-trainer",
    accent: "#4BCE97",
  },
  {
    id: "digizoo",
    name: "DigiZoo",
    tagline: "A sticker book for kids where the animals walk, swim and fly",
    description:
      "Pick a world and play with animal stickers: drag, pinch, rotate and flip them, then tap to hear them or send them across the map.",
    highlights: [
      "No image or audio files. Every animal is a rigged vector drawing generated in code.",
      "Procedural motion for walking, waddling, hopping, flying, swimming and slithering",
      "Animal sounds synthesised live with the Web Audio API. Works offline once installed.",
    ],
    stack: ["TypeScript", "SVG", "Web Audio", "Vite", "Playwright", "PWA"],
    url: "https://ckangnz.github.io/DigiZoo/",
    repo: "https://github.com/ckangnz/DigiZoo",
    accent: "#F5CD47",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Frontend",
    items: ["TypeScript", "React", "Redux", "GraphQL", "CSS / Sass", "Compiled CSS", "Webpack / Vite", "Storybook", "Accessibility"],
  },
  {
    group: "Platform & testing",
    items: ["Design systems", "Microfrontends", "ESLint rules", "Codemods", "Jest / RTL", "Cypress", "Playwright"],
  },
  {
    group: "Backend & DevOps",
    items: ["Node.js", "C# .NET Core", "Python / Django", "AWS", "Kubernetes", "Docker", "GitHub Actions", "New Relic"],
  },
  {
    group: "AI",
    items: ["Multi-agent orchestration", "Claude Code", "GitHub Copilot"],
  },
  {
    group: "Design & motion",
    items: ["Figma", "After Effects", "Premiere Pro", "Photoshop", "Illustrator", "Maya", "MotionBuilder"],
  },
  {
    group: "Ways of working",
    items: ["Neovim", "Mentoring", "Hiring panels", "Cross-region collaboration"],
  },
];

export const languages = [
  { name: "Korean", level: "Native" },
  { name: "English", level: "Native" },
  { name: "Japanese", level: "Limited working" },
  { name: "Chinese", level: "Elementary" },
];

export const contact = {
  email: "chris.sm.kang542@gmail.com",
  linkedin: "https://www.linkedin.com/in/chrissmkang",
  github: "https://github.com/ckangnz",
};
