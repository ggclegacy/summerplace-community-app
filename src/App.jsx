import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Home,
  KeyRound,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Users,
  Waves,
} from "lucide-react";

const navItems = [
  ["Vision", "hero"],
  ["Pillars", "pillars"],
  ["Guide", "guide"],
  ["Ask Summer", "ask"],
  ["Pilot", "pilot"],
];

const pillars = [
  {
    title: "Home",
    icon: Home,
    description:
      "The resident dashboard - quick links, featured guides, community updates, and the Ask Summer concierge.",
    screen: ["Featured guide: Parking", "Ask Summer", "Pool reminder", "Local essentials"],
  },
  {
    title: "Settle In",
    icon: KeyRound,
    description: "A new resident onboarding hub for the first day, first week, and first month.",
    screen: ["First week checklist", "Save office contact", "Package instructions", "Emergency guidance"],
  },
  {
    title: "Resident Guide",
    icon: ClipboardCheck,
    description: "Helpful guides that make apartment life smoother without feeling like a rulebook.",
    screen: ["Smoke-free living", "Trash and bulk trash", "Pet life", "Apartment care 101"],
  },
  {
    title: "Ask Summer",
    icon: MessageCircle,
    description: "A property-specific AI concierge trained only on approved Summer Place information.",
    screen: ["Can I smoke inside?", "Where does bulk trash go?", "Guest parking?", "Storm prep"],
  },
  {
    title: "Community",
    icon: Users,
    description: "Events, updates, reminders, resident appreciation, and community moments.",
    screen: ["Resident appreciation", "Staff spotlight", "Upgrade update", "Community poll"],
  },
  {
    title: "Local Perks",
    icon: Store,
    description: "Discounts and partnerships that connect residents with local businesses.",
    screen: ["Groomed Gent Co.", "Nearby essentials", "Coffee partner", "Resident offers"],
  },
];

const journeySteps = [
  "Staff sends the app link",
  "Resident creates account",
  "App asks: New resident or current resident?",
  "Resident enters the Settle In Hub",
  "Resident follows the first-week checklist",
  "Resident knows where to go before calling the office",
];

const checklist = [
  "Save office contact info",
  "Review parking",
  "Learn package instructions",
  "Review trash and bulk trash",
  "Understand pet expectations",
  "Find maintenance portal",
  "Review emergency guidance",
  "Explore local essentials",
];

const guides = [
  ["Smoke-Free Living & Odor Respect", "Respect the no-smoking addendum, reduce odor complaints, protect renovated units, and help residents make cleaner, more respectful choices.", ShieldCheck],
  ["Pet Life at Summer Place", "Friendly expectations for pets, shared spaces, cleanup, and neighbor comfort.", HeartIcon],
  ["Trash, Bulk Trash & Clean Community", "Clear disposal steps, timing, and what not to leave near dumpsters.", ClipboardCheck],
  ["Packages & Deliveries", "Delivery notes, missed packages, and what to check before calling the office.", Bell],
  ["Noise & Neighbor Respect", "Simple reminders that protect quiet enjoyment and everyday courtesy.", Waves],
  ["Parking & Guest Parking", "Approved areas, guest reminders, and overnight parking clarity.", MapPin],
  ["Apartment Care 101", "Small habits that help residents protect their home and renovated finishes.", Building2],
  ["Storm & Emergency Prep", "Weather reminders, contacts, outage steps, and preparation basics.", ShieldCheck],
  ["Moving Out Without Avoidable Charges", "Plain-language move-out expectations and preventable charge reminders.", Check],
  ["Pool & Amenity Etiquette", "Clean, respectful shared-space guidance residents can revisit anytime.", Star],
];

const questions = {
  "Can I smoke inside?":
    "No. Summer Place follows a no-smoking addendum, and smoking is not permitted inside apartments. The Resident Guide includes smoke-free living tips, odor respect guidance, and cleaner options that help residents follow property expectations.",
  "Where does bulk trash go?":
    "Bulk trash instructions are listed in the Trash & Clean Community guide. Tap below to view the correct location, timing, and what not to leave near dumpsters.",
  "What do I do if my AC stops cooling?":
    "Start by checking thermostat mode, temperature setting, fan setting, and breaker. If the issue continues, submit a maintenance request through the official portal. Tap below for the AC basics guide.",
  "Where can guests park?":
    "Guest parking rules are listed in the Parking guide. Please review approved areas before having guests park overnight.",
  "How do packages work?":
    "Package guidance is listed in the Packages & Deliveries guide, including delivery notes, missed packages, and what to do before contacting the office.",
  "What should I do during a storm?":
    "Open the Storm & Emergency Prep guide for weather reminders, emergency contacts, power outage steps, and what to prepare before severe weather.",
};

const communityCards = [
  ["Resident Appreciation Weekend", "A standing place for appreciation moments and small community wins.", CalendarDays],
  ["Pool Reminder", "Quick seasonal reminders that stay available after a text goes out.", Waves],
  ["Property Upgrade Update", "Progress residents can see, revisit, and understand.", Building2],
  ["Staff Spotlight", "Help residents connect names, faces, and care.", Star],
  ["Local Partner Perk", "Groomed Gent Co. - 20% off with SUMMERPLACE20", Store],
  ["Community Poll", "Lightweight feedback that helps management listen with less friction.", CircleHelp],
];

const benefits = [
  ["Resident texts the office asking where bulk trash goes.", "Resident opens the app, taps Trash & Bulk Trash, and gets the answer."],
  ["New resident calls with five basic move-in questions.", "Resident follows the Settle In checklist."],
  ["Staff sends repeated no-smoking reminders.", "Residents have a Smoke-Free Living guide that explains expectations with context."],
];

const credibility = [
  "Founder of Gent Ascend Collective",
  "Founder of Groomed Gent Co.",
  "10+ years customer service and operations experience",
  "Restaurant operations leadership",
  "Industrial project supervision experience",
  "3+ years in Louisiana medical cannabis",
  "15,000+ deliveries completed",
  "Current Summer Place resident",
];

function HeartIcon(props) {
  return <Sparkles {...props} />;
}

function App() {
  const [activePillar, setActivePillar] = useState(pillars[0]);
  const [activeStep, setActiveStep] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState("Can I smoke inside?");

  const activeAnswer = useMemo(() => questions[activeQuestion], [activeQuestion]);

  return (
    <main className="min-h-screen overflow-hidden bg-midnight text-frost">
      <TopNav />
      <Hero />
      <Section id="chapter" eyebrow="New chapter" title="Summer Place is already becoming something better.">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Glass className="p-7 md:p-9">
            <p className="text-lg leading-8 text-slate-200">
              Since the new team took over, the property has started feeling more cared for - clearer
              communication, more attention, and a stronger sense that Summer Place is moving in the
              right direction. The next step is giving that care a digital home.
            </p>
          </Glass>
          <Glass className="flex items-center p-7 md:p-9">
            <p className="text-2xl font-semibold leading-9 text-white">
              The Summer Place Community App turns care into a resident experience.
            </p>
          </Glass>
        </div>
      </Section>
      <GapSection />
      <Section id="pillars" eyebrow="Resident experience layer" title="One app. Every stage of living here.">
        <div className="grid gap-8 lg:grid-cols-[1fr_410px] lg:items-center">
          <div className="grid gap-3 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <button
                key={pillar.title}
                onClick={() => setActivePillar(pillar)}
                className={`glass-card group min-h-44 p-5 text-left transition ${
                  activePillar.title === pillar.title ? "ring-1 ring-aqua/70" : "hover:bg-white/[0.09]"
                }`}
              >
                <pillar.icon className="mb-5 h-6 w-6 text-aqua" />
                <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{pillar.description}</p>
              </button>
            ))}
          </div>
          <PhoneMockup pillar={activePillar} />
        </div>
      </Section>
      <Section id="journey" eyebrow="Move-in clarity" title="Give every new resident a smoother first week.">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Glass className="p-5">
            <div className="space-y-3">
              {journeySteps.map((step, index) => (
                <button
                  key={step}
                  onClick={() => setActiveStep(index)}
                  className={`flex w-full items-center gap-4 rounded-lg border p-4 text-left transition ${
                    activeStep === index
                      ? "border-aqua/60 bg-aqua/10"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                  }`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-bold text-aqua">
                    {index + 1}
                  </span>
                  <span className="font-medium text-white">{step}</span>
                </button>
              ))}
            </div>
          </Glass>
          <Glass className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-aqua">Settle In Hub</p>
                <h3 className="text-2xl font-semibold">First-week checklist</h3>
              </div>
              <ClipboardCheck className="h-7 w-7 text-aqua" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {checklist.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white/[0.055] p-3">
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${index <= activeStep ? "bg-aqua text-midnight" : "bg-white/10 text-slate-400"}`}>
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </Glass>
        </div>
      </Section>
      <GuideSection />
      <AskSection activeQuestion={activeQuestion} setActiveQuestion={setActiveQuestion} activeAnswer={activeAnswer} />
      <CommunitySection />
      <StaffSection />
      <PilotSection />
      <WhySection />
      <FinalCta />
    </main>
  );
}

function TopNav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-midnight/72 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a href="#hero" className="flex items-center gap-3">
          <img src="/logo.png" alt="Summer Place" className="h-10 w-10 rounded-full object-contain" />
          <span className="hidden text-sm font-semibold text-white sm:inline">Summer Place Vision</span>
        </a>
        <div className="flex items-center gap-1 overflow-x-auto">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="rounded-full px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden px-4 pb-16 pt-28 md:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(90,160,255,0.3),transparent_28%),radial-gradient(circle_at_82%_30%,rgba(210,230,255,0.15),transparent_26%),linear-gradient(135deg,#07111f_0%,#0d2f5b_48%,#202832_100%)]" />
      <div className="grid-overlay" />
      <motion.div className="float-card left-[8%] top-[23%]" animate={{ y: [0, -18, 0] }} transition={{ duration: 8, repeat: Infinity }} />
      <motion.div className="float-card right-[10%] top-[34%] h-24 w-40" animate={{ y: [0, 20, 0] }} transition={{ duration: 9, repeat: Infinity }} />
      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <div className="max-w-3xl">
            <img src="/logo.png" alt="Summer Place Apartments logo" className="mb-7 h-24 w-24 rounded-full bg-white/8 object-contain p-2 shadow-glow" />
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-aqua">Summer Place Community Vision</p>
            <p className="mb-8 text-sm text-slate-300">A resident experience concept by Gent Ascend Collective</p>
            <h1 className="text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
              A new community layer for Summer Place.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200">
              A mobile-first resident experience app designed to help residents settle in, understand
              expectations, get answers faster, and feel more connected to the place they call home.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#chapter" className="primary-btn">Enter the Vision <ArrowRight className="h-4 w-4" /></a>
              <a href="#pillars" className="secondary-btn">Preview the App <Phone className="h-4 w-4" /></a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <PhoneMockup pillar={pillars[3]} hero />
        </Reveal>
      </div>
    </section>
  );
}

function GapSection() {
  const scattered = ["Text reminders", "Emails", "Lease packet", "Flyers", "Office calls", "Website", "Maintenance portal", "Word of mouth"];
  const progression = [
    "When information is scattered, residents forget.",
    "When residents forget, staff has to repeat.",
    "When staff repeats, frustration builds.",
    "When frustration builds, community gets harder.",
  ];
  return (
    <Section id="gap" eyebrow="The experience gap" title="Residents don't always need more reminders. They need one place to understand.">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Glass className="relative min-h-80 p-5">
          {scattered.map((item, index) => (
            <motion.div
              key={item}
              className="absolute rounded-lg border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-slate-100 shadow-glass backdrop-blur"
              style={{ left: `${8 + (index % 3) * 28}%`, top: `${12 + Math.floor(index / 3) * 26}%` }}
              animate={{ y: [0, index % 2 ? 8 : -8, 0] }}
              transition={{ duration: 4 + index * 0.4, repeat: Infinity }}
            >
              {item}
            </motion.div>
          ))}
        </Glass>
        <Glass className="p-6 md:p-8">
          <div className="space-y-4">
            {progression.map((line) => (
              <div key={line} className="flex items-center gap-3 rounded-lg bg-white/[0.05] p-4">
                <ChevronRight className="h-5 w-5 text-aqua" />
                <p className="text-slate-100">{line}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 text-2xl font-semibold leading-9 text-white">
            The Summer Place Community App gives residents one trusted home base.
          </p>
        </Glass>
      </div>
    </Section>
  );
}

function GuideSection() {
  return (
    <Section id="guide" eyebrow="Resident Guide" title="Helpful guides that quietly create a better community.">
      <p className="mb-7 max-w-3xl text-lg leading-8 text-slate-300">
        Not lectures. Not rule packets. Simple, resident-friendly guides that help people live here
        with more clarity, respect, and confidence.
      </p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {guides.map(([title, copy, Icon], index) => (
          <Glass key={title} className={`p-5 ${index === 0 ? "md:col-span-2 xl:col-span-1 ring-1 ring-aqua/50" : ""}`}>
            <Icon className="mb-5 h-6 w-6 text-aqua" />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
          </Glass>
        ))}
      </div>
      <Glass className="mt-5 p-5">
        <p className="text-sm leading-6 text-slate-300">
          Built with real-world insight from over three years in Louisiana medical cannabis and more
          than 15,000 deliveries, many to apartment communities.
        </p>
      </Glass>
    </Section>
  );
}

function AskSection({ activeQuestion, setActiveQuestion, activeAnswer }) {
  return (
    <Section id="ask" eyebrow="Ask Summer demo" title="Ask Summer: answers when residents need clarity.">
      <p className="mb-7 max-w-3xl text-lg leading-8 text-slate-300">
        A resident concierge trained on approved Summer Place information - not a replacement for staff,
        but a smarter place for common questions to start.
      </p>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3">
          {Object.keys(questions).map((question) => (
            <button
              key={question}
              onClick={() => setActiveQuestion(question)}
              className={`rounded-lg border p-4 text-left text-sm font-medium transition ${
                question === activeQuestion ? "border-aqua/70 bg-aqua/10 text-white" : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
              }`}
            >
              {question}
            </button>
          ))}
        </div>
        <Glass className="p-5 md:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-aqua/15">
              <MessageCircle className="h-5 w-5 text-aqua" />
            </div>
            <div>
              <p className="text-sm text-aqua">Ask Summer</p>
              <h3 className="font-semibold text-white">{activeQuestion}</h3>
            </div>
          </div>
          <div className="rounded-xl bg-white/[0.065] p-5">
            <p className="leading-8 text-slate-100">{activeAnswer}</p>
            <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              Open related guide <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Glass>
      </div>
    </Section>
  );
}

function CommunitySection() {
  return (
    <Section id="community" eyebrow="Community and perks" title="Make Summer Place feel alive between announcements.">
      <p className="mb-7 max-w-3xl text-lg leading-8 text-slate-300">
        The texting system is great for urgent updates. The community app becomes the permanent home
        for events, reminders, resident appreciation, and local connection.
      </p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {communityCards.map(([title, copy, Icon]) => (
          <Glass key={title} className="p-5">
            <Icon className="mb-5 h-6 w-6 text-aqua" />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
          </Glass>
        ))}
      </div>
    </Section>
  );
}

function StaffSection() {
  return (
    <Section id="staff" eyebrow="Staff support" title="This does not add another system. It gives staff a better place to send residents.">
      <div className="grid gap-4 lg:grid-cols-3">
        {benefits.map(([before, after]) => (
          <Glass key={before} className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Before</p>
            <p className="mt-3 min-h-20 text-slate-200">{before}</p>
            <div className="my-5 h-px bg-white/10" />
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-aqua">After</p>
            <p className="mt-3 font-semibold leading-7 text-white">{after}</p>
          </Glass>
        ))}
      </div>
      <p className="mt-6 text-center text-2xl font-semibold text-white">
        Less repeated explanation. Clearer expectations. Better resident confidence.
      </p>
    </Section>
  );
}

function PilotSection() {
  const pilot = ["Branded vision prototype", "New Resident Hub", "Resident Guide starter modules", "Ask Summer demo", "Community/perks preview", "Management feedback pass"];
  const future = ["Resident accounts", "Approved knowledge base", "Real AI concierge", "Property-specific updates", "Local partner hub", "Analytics and engagement insights"];
  return (
    <Section id="pilot" eyebrow="Pilot plan" title="Start focused. Prove the value. Build from there.">
      <div className="grid gap-5 md:grid-cols-2">
        <Phase title="Pilot Version" items={pilot} />
        <Phase title="Future Version" items={future} muted />
      </div>
    </Section>
  );
}

function WhySection() {
  return (
    <Section id="why" eyebrow="Why Gent Ascend" title="Built by someone who sees the opportunity from the inside.">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Glass className="p-7">
          <p className="text-lg leading-8 text-slate-200">
            I live at Summer Place. I see the effort being put into the property, and I see the
            opportunity to make residents feel that care more clearly. Through Gent Ascend Collective,
            my goal is to build practical technology that helps local communities, businesses, and
            teams operate with more clarity, connection, and confidence.
          </p>
        </Glass>
        <div className="grid gap-3 sm:grid-cols-2">
          {credibility.map((item) => (
            <Glass key={item} className="p-4">
              <p className="text-sm font-medium text-slate-100">{item}</p>
            </Glass>
          ))}
        </div>
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    <section className="px-4 py-24 md:px-6">
      <Reveal>
        <div className="mx-auto max-w-5xl rounded-2xl border border-aqua/20 bg-gradient-to-br from-harbor/70 to-graphite/70 p-8 text-center shadow-glow backdrop-blur md:p-14">
          <img src="/logo.png" alt="" className="mx-auto mb-7 h-20 w-20 rounded-full object-contain" />
          <h2 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
            Summer Place already has buildings, systems, and staff.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-200">
            This app adds the missing layer: a resident experience people can feel.
          </p>
          <a href="mailto:" className="primary-btn mx-auto mt-9 w-fit">
            Let's Build the Community Layer <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function PhoneMockup({ pillar, hero = false }) {
  const Icon = pillar.icon;
  return (
    <motion.div
      className={`mx-auto w-full max-w-[360px] ${hero ? "lg:ml-auto" : ""}`}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
    >
      <div className="rounded-[2rem] border border-white/20 bg-slate-950 p-3 shadow-glow">
        <div className="overflow-hidden rounded-[1.55rem] border border-white/10 bg-gradient-to-b from-harbor to-midnight">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <img src="/logo.png" alt="" className="h-9 w-9 rounded-full object-contain" />
            <span className="text-xs text-slate-300">Summer Place</span>
          </div>
          <div className="p-5">
            <div className="mb-5 rounded-xl bg-white/[0.08] p-4">
              <Icon className="mb-4 h-6 w-6 text-aqua" />
              <p className="text-xs uppercase tracking-[0.16em] text-aqua">{pillar.title}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{pillar.title === "Ask Summer" ? "How can I help?" : pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{pillar.description}</p>
            </div>
            <div className="space-y-3">
              {pillar.screen.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-lg bg-white/[0.06] px-4 py-3">
                  <span className="text-sm text-slate-100">{item}</span>
                  <ChevronRight className="h-4 w-4 text-aqua" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Phase({ title, items, muted = false }) {
  return (
    <Glass className="p-6">
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-lg bg-white/[0.05] p-3">
            <Check className={`h-5 w-5 ${muted ? "text-steel" : "text-aqua"}`} />
            <span className="text-sm text-slate-200">{item}</span>
          </div>
        ))}
      </div>
    </Glass>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="relative px-4 py-20 md:px-6 md:py-28">
      <Reveal>
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-aqua">{eyebrow}</p>
          <h2 className="mb-8 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-5xl">{title}</h2>
          {children}
        </div>
      </Reveal>
    </section>
  );
}

function Glass({ className = "", children }) {
  return <div className={`glass-card ${className}`}>{children}</div>;
}

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default App;
