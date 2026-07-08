import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Building2,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Home,
  KeyRound,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Users,
  Waves,
  X,
} from "lucide-react";

const navItems = [
  ["Vision", "hero"],
  ["App Preview", "pillars"],
  ["Resident Guide", "guide"],
  ["Ask Summer", "ask"],
  ["Staff Benefit", "staff"],
  ["Pilot", "pilot"],
];

const opportunityCards = [
  {
    title: "Not another portal",
    copy: "The app does not replace rent, maintenance, or corporate systems.",
    icon: ShieldCheck,
  },
  {
    title: "A resident home base",
    copy: "It gives residents one trusted place to understand daily life at Summer Place.",
    icon: Home,
  },
  {
    title: "A community advantage",
    copy: "It helps Summer Place feel more organized, more connected, and more cared for than other communities around it.",
    icon: Sparkles,
  },
];

const pillars = [
  {
    title: "Home",
    icon: Home,
    description: "A calm dashboard for daily resident life, reminders, guides, quick actions, and local connection.",
    items: ["Welcome home", "Today's guide", "Quick actions", "Community update", "Local perk"],
  },
  {
    title: "Settle In",
    icon: KeyRound,
    description: "A guided onboarding hub for the first day, first week, and first month at Summer Place.",
    items: ["First 24 hours", "First 7 days", "Utilities", "Parking", "Packages", "Maintenance portal"],
  },
  {
    title: "Resident Guide",
    icon: ClipboardCheck,
    description: "Resident-friendly education that explains expectations without feeling like a rule packet.",
    items: ["Smoke-Free Living", "Pet Life", "Trash & Bulk Trash", "Apartment Care", "Storm Prep"],
  },
  {
    title: "Ask Summer",
    icon: MessageCircle,
    description: "A property-specific concierge for common questions, approved answers, and suggested guide links.",
    items: ["Can I smoke inside?", "No smoking is permitted inside apartments.", "Suggested guide: Smoke-Free Living"],
    chat: true,
  },
  {
    title: "Community",
    icon: Users,
    description: "Events, updates, appreciation moments, staff spotlights, and property progress residents can revisit.",
    items: ["Resident Appreciation Weekend", "Pool Reminder", "Property Upgrade Update", "Staff Spotlight"],
  },
  {
    title: "Local Perks",
    icon: Store,
    description: "A simple local partner layer that connects residents with nearby offers and useful services.",
    items: ["Groomed Gent Co. SUMMERPLACE20", "Local food", "Pet services", "Cleaning help", "Wellness partners"],
  },
];

const timeline = [
  ["Welcome", "Staff shares the app link during move-in."],
  ["Setup", "Resident creates an account and chooses New Resident."],
  ["First Week", "The app walks them through parking, packages, trash, pets, maintenance, and emergency info."],
  ["Confidence", "Instead of guessing or calling for every detail, the resident knows where to go."],
  ["Community", "They start exploring events, perks, guides, and Ask Summer."],
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

const guidePreview = {
  title: "Smoke-Free Living & Odor Respect",
  sections: [
    "Respect the no-smoking addendum",
    "Why odor travels in apartment buildings",
    "Protecting renovated units",
    "Legal medical cannabis basics",
    "Cleaner, lower-odor options",
    "Outdoor courtesy",
    "What to do if smoke odor affects your unit",
  ],
};

const guides = [
  ["Smoke-Free Living & Odor Respect", "A clear guide to expectations, odor respect, and cleaner choices.", ShieldCheck],
  ["Pet Life at Summer Place", "Shared-space expectations for pets, cleanup, and neighbor comfort.", Sparkles],
  ["Trash, Bulk Trash & Clean Community", "Simple disposal steps, timing, and dumpster-area clarity.", ClipboardCheck],
  ["Packages & Deliveries", "Delivery notes, missed packages, and what to check first.", Bell],
  ["Noise & Neighbor Respect", "Practical reminders that protect quiet enjoyment.", Waves],
  ["Parking & Guest Parking", "Approved areas, guests, and overnight parking clarity.", MapPin],
  ["Apartment Care 101", "Small habits that protect units and renovated finishes.", Building2],
  ["Storm & Emergency Prep", "Weather reminders, outage steps, and preparation basics.", ShieldCheck],
  ["Moving Out Without Avoidable Charges", "Move-out expectations in plain language.", Check],
  ["Pool & Amenity Etiquette", "Clean, respectful shared-space guidance.", Star],
];

const askQuestions = {
  "Can I smoke inside?": {
    answer:
      "No. Summer Place follows a no-smoking addendum, and smoking is not permitted inside apartments. The Resident Guide can help residents understand smoke-free living and odor respect.",
    guide: "Smoke-Free Living guide",
  },
  "Where does bulk trash go?": {
    answer:
      "Bulk trash instructions are listed in the Trash & Clean Community guide, including location, timing, and what should not be left near dumpsters.",
    guide: "Trash & Clean Community guide",
  },
  "What do I do if my AC stops cooling?": {
    answer:
      "Check thermostat mode, temperature, fan setting, and breaker first. If the issue continues, submit a request through the official maintenance portal.",
    guide: "AC basics guide",
  },
  "Where can guests park?": {
    answer:
      "Guest parking rules are listed in the Parking guide. Residents should review approved areas before guests park overnight.",
    guide: "Parking guide",
  },
  "How do packages work?": {
    answer:
      "Package guidance is listed in Packages & Deliveries, including delivery notes, missed packages, and when to contact the office.",
    guide: "Packages & Deliveries guide",
  },
  "What should I do during a storm?": {
    answer:
      "Open Storm & Emergency Prep for weather reminders, emergency contacts, power outage steps, and what to prepare before severe weather.",
    guide: "Storm & Emergency Prep guide",
  },
};

const staffBenefits = [
  ["Staff repeats the same move-in answers.", "Residents follow the Settle In checklist."],
  ["Staff sends the same reminders again and again.", "Residents can revisit clear guides whenever they need them."],
  ["Residents ask basic questions through calls or texts.", "Ask Summer answers common questions and points them to the right resource."],
];

const differentiators = [
  ["Custom to Summer Place", "Built around this property, this resident experience, and this community.", Building2],
  ["Resident-first", "Designed around the questions and situations residents actually deal with.", Users],
  ["Education, not enforcement", "Guides help residents understand expectations without feeling talked down to.", ClipboardCheck],
  ["Community, not just communication", "Texts tell people something happened. The app gives the community a place to live.", MessageCircle],
  ["Built in phases", "Start focused, learn from management feedback, then expand.", Sparkles],
];

const pilotPhases = [
  {
    title: "Phase 1: Vision Prototype",
    items: ["Interactive vision app", "Branded mock screens", "Management review", "Feedback and scope alignment"],
  },
  {
    title: "Phase 2: Pilot Community App",
    items: ["Settle In Hub", "Resident Guide starter modules", "Ask Summer knowledge demo", "Community and perks pages", "Staff-approved content"],
  },
  {
    title: "Phase 3: Full Resident Experience",
    items: ["Resident accounts", "Approved knowledge base", "Live AI concierge", "Local partner hub", "Analytics and engagement insights", "Seasonal modules and events"],
  },
];

const credibility = [
  "Current Summer Place resident",
  "Founder of Gent Ascend Collective",
  "Founder of Groomed Gent Co.",
  "10+ years customer service and operations",
  "Restaurant operations leadership",
  "Industrial project supervision experience",
  "3+ years Louisiana medical cannabis experience",
  "15,000+ deliveries completed",
];

function App() {
  const [activePillar, setActivePillar] = useState(pillars[0]);
  const [activeStep, setActiveStep] = useState(2);
  const [activeGuide, setActiveGuide] = useState(guides[0][0]);
  const [activeQuestion, setActiveQuestion] = useState("Can I smoke inside?");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    const timer = window.setTimeout(() => setIsTyping(false), 650);
    return () => window.clearTimeout(timer);
  }, [activeQuestion]);

  const askAnswer = useMemo(() => askQuestions[activeQuestion], [activeQuestion]);
  const progress = Math.round(((activeStep + 1) / timeline.length) * 100);

  return (
    <main className="min-h-screen overflow-hidden bg-midnight text-frost">
      <TopNav />
      <Hero />
      <OpportunitySection />
      <GapSection />
      <PillarsSection activePillar={activePillar} setActivePillar={setActivePillar} />
      <JourneySection activeStep={activeStep} setActiveStep={setActiveStep} progress={progress} />
      <GuideSection activeGuide={activeGuide} setActiveGuide={setActiveGuide} />
      <AskSection
        activeQuestion={activeQuestion}
        setActiveQuestion={setActiveQuestion}
        askAnswer={askAnswer}
        isTyping={isTyping}
      />
      <CommunitySection />
      <StaffSection />
      <DifferentSection />
      <PilotSection />
      <WhySection />
      <FinalCta />
    </main>
  );
}

function TopNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-midnight/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a href="#hero" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="Summer Place" className="h-10 w-10 rounded-full object-contain ring-1 ring-white/15" />
          <span className="text-sm font-semibold text-white">Summer Place Vision</span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="rounded-full px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white">
              {label}
            </a>
          ))}
          <a href="#final" className="ml-2 rounded-full bg-frost px-4 py-2 text-xs font-bold text-midnight transition hover:bg-white">
            Build the Community Layer
          </a>
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open navigation">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-midnight/95 px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10">
                {label}
              </a>
            ))}
            <a href="#final" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-frost px-4 py-3 text-center text-sm font-bold text-midnight">
              Build the Community Layer
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden px-4 pb-16 pt-28 md:px-6">
      <div className="hero-bg" />
      <BackgroundDetails />
      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <Reveal>
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-4">
              <img src="/logo.png" alt="Summer Place Apartments logo" className="h-24 w-24 rounded-full bg-white/8 object-contain p-2 shadow-glow ring-1 ring-white/15" />
              <div className="rounded-full border border-aqua/30 bg-aqua/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-aqua">
                Resident Experience Concept
              </div>
            </div>
            <h1 className="text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
              A custom community app for the next chapter of Summer Place.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200">
              One mobile-first home base where residents can settle in, learn expectations, get answers
              faster, explore local perks, and feel more connected to the place they call home.
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-steel">
              The app turns property care into something residents can actually feel.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#opportunity" className="primary-btn">Explore the Vision <ArrowRight className="h-4 w-4" /></a>
              <a href="#pillars" className="secondary-btn">See App Preview <Phone className="h-4 w-4" /></a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <DashboardPhone />
        </Reveal>
      </div>
    </section>
  );
}

function OpportunitySection() {
  return (
    <Section id="opportunity" eyebrow="The opportunity" title="Summer Place can build something different.">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
        <Glass className="p-7 md:p-9">
          <p className="text-lg leading-8 text-slate-200">
            Most apartment communities have the same basic tools: rent portals, maintenance forms,
            mass texts, and a website. Those systems matter - but they do not create community by
            themselves. The opportunity is to give Summer Place something residents can actually use,
            feel, and return to.
          </p>
        </Glass>
        <div className="grid gap-4">
          {opportunityCards.map(({ title, copy, icon: Icon }) => (
            <Glass key={title} className="flex gap-4 p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-aqua/12 ring-1 ring-aqua/20">
                <Icon className="h-5 w-5 text-aqua" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
              </div>
            </Glass>
          ))}
        </div>
      </div>
    </Section>
  );
}

function GapSection() {
  const scattered = ["Text reminders", "Emails", "Lease packet", "Flyers", "Office calls", "Website", "Maintenance portal", "Word of mouth"];
  return (
    <Section id="gap" eyebrow="Resident experience gap" title="Residents don't always need more reminders. They need one place to understand.">
      <Glass className="relative min-h-[500px] overflow-hidden p-5 md:p-8">
        <div className="map-lines" />
        <motion.div
          className="absolute left-1/2 top-1/2 z-10 w-[min(82%,330px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-aqua/35 bg-gradient-to-br from-harbor/85 to-midnight/90 p-6 text-center shadow-glow"
          initial={{ scale: 0.92, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img src="/logo.png" alt="" className="mx-auto mb-4 h-14 w-14 rounded-full object-contain" />
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-aqua">One trusted home base</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Summer Place Community App</h3>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Scattered information creates repeated questions. A central experience creates clarity.
          </p>
        </motion.div>
        {scattered.map((item, index) => (
          <motion.div
            key={item}
            className="absolute rounded-lg border border-white/10 bg-white/[0.075] px-4 py-3 text-sm font-medium text-slate-100 shadow-glass backdrop-blur-xl"
            style={{
              left: `${[6, 67, 12, 72, 8, 62, 30, 54][index]}%`,
              top: `${[14, 12, 66, 67, 40, 43, 22, 77][index]}%`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ x: [0, index % 2 ? -10 : 10, 0], y: [0, index % 2 ? 8 : -8, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 5 + index * 0.2, repeat: Infinity, repeatType: "mirror" }}
          >
            {item}
          </motion.div>
        ))}
      </Glass>
    </Section>
  );
}

function PillarsSection({ activePillar, setActivePillar }) {
  return (
    <Section id="pillars" eyebrow="Clickable app preview" title="One app. Every stage of living here.">
      <div className="grid gap-8 xl:grid-cols-[1fr_430px] xl:items-center">
        <div className="grid gap-3 md:grid-cols-2">
          {pillars.map((pillar) => (
            <button
              key={pillar.title}
              onClick={() => setActivePillar(pillar)}
              className={`glass-card min-h-44 p-5 text-left transition hover:-translate-y-1 ${
                activePillar.title === pillar.title ? "ring-1 ring-aqua/70 bg-aqua/[0.09]" : "hover:bg-white/[0.09]"
              }`}
            >
              <pillar.icon className="mb-5 h-6 w-6 text-aqua" />
              <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{pillar.description}</p>
            </button>
          ))}
        </div>
        <AppPhone pillar={activePillar} />
      </div>
    </Section>
  );
}

function JourneySection({ activeStep, setActiveStep, progress }) {
  return (
    <Section id="journey" eyebrow="New resident journey" title="From move-in confusion to guided confidence.">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Glass className="p-5 md:p-7">
          <div className="space-y-4">
            {timeline.map(([title, copy], index) => (
              <button
                key={title}
                onClick={() => setActiveStep(index)}
                className={`flex w-full gap-4 rounded-xl border p-4 text-left transition ${
                  activeStep === index ? "border-aqua/60 bg-aqua/10" : "border-white/10 bg-white/[0.035] hover:bg-white/[0.08]"
                }`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-bold text-aqua">
                  {index + 1}
                </span>
                <span>
                  <span className="block font-semibold text-white">{title}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-300">{copy}</span>
                </span>
              </button>
            ))}
          </div>
        </Glass>
        <Glass className="p-6 md:p-7">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-aqua">Settle In progress</p>
              <h3 className="mt-1 text-3xl font-semibold text-white">{progress}% complete</h3>
            </div>
            <ClipboardCheck className="h-8 w-8 text-aqua" />
          </div>
          <div className="mb-6 h-3 rounded-full bg-white/10">
            <motion.div className="h-full rounded-full bg-aqua" animate={{ width: `${progress}%` }} transition={{ duration: 0.45 }} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {checklist.map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-lg bg-white/[0.055] p-3">
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${index < Math.ceil((progress / 100) * checklist.length) ? "bg-aqua text-midnight" : "bg-white/10 text-slate-400"}`}>
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </Glass>
      </div>
    </Section>
  );
}

function GuideSection({ activeGuide, setActiveGuide }) {
  return (
    <Section id="guide" eyebrow="Resident Guide" title="Helpful guides that quietly create a better community.">
      <p className="mb-7 max-w-3xl text-lg leading-8 text-slate-300">
        Some issues do not need more warnings. They need better context. The Resident Guide turns
        common apartment-life friction into clear, respectful education.
      </p>
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="grid gap-4 md:grid-cols-2">
          {guides.map(([title, copy, Icon]) => (
            <button
              key={title}
              onClick={() => setActiveGuide(title)}
              className={`glass-card p-5 text-left transition hover:-translate-y-1 ${
                activeGuide === title ? "ring-1 ring-aqua/65 bg-aqua/[0.08]" : "hover:bg-white/[0.08]"
              }`}
            >
              <Icon className="mb-5 h-6 w-6 text-aqua" />
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
            </button>
          ))}
        </div>
        <Glass className="p-6">
          <p className="text-sm font-semibold text-aqua">Expanded preview</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{activeGuide}</h3>
          {activeGuide === guidePreview.title ? (
            <div className="mt-5 space-y-3">
              {guidePreview.sections.map((section) => (
                <div key={section} className="flex items-center gap-3 rounded-lg bg-white/[0.055] p-3">
                  <Check className="h-4 w-4 text-aqua" />
                  <span className="text-sm text-slate-200">{section}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-sm leading-7 text-slate-300">
              This guide would open as a short, resident-friendly module with approved Summer Place
              expectations, examples, and the next best action.
            </p>
          )}
          <p className="mt-6 rounded-lg border border-white/10 bg-white/[0.045] p-4 text-sm leading-6 text-slate-300">
            Built with real-world insight from over three years in Louisiana medical cannabis and more
            than 15,000 deliveries, many to apartment communities.
          </p>
        </Glass>
      </div>
    </Section>
  );
}

function AskSection({ activeQuestion, setActiveQuestion, askAnswer, isTyping }) {
  return (
    <Section id="ask" eyebrow="Ask Summer demo" title="Ask Summer gives residents clarity before they have to call.">
      <p className="mb-7 max-w-3xl text-lg leading-8 text-slate-300">
        A property-specific concierge trained on approved Summer Place information. It answers common
        questions, points residents to the right guide, and knows when to tell them to contact the office.
      </p>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3">
          {Object.keys(askQuestions).map((question) => (
            <button
              key={question}
              onClick={() => setActiveQuestion(question)}
              className={`rounded-xl border p-4 text-left text-sm font-semibold transition ${
                question === activeQuestion ? "border-aqua/70 bg-aqua/10 text-white" : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
              }`}
            >
              {question}
            </button>
          ))}
        </div>
        <Glass className="p-5 md:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-aqua/15 ring-1 ring-aqua/20">
              <MessageCircle className="h-5 w-5 text-aqua" />
            </div>
            <div>
              <p className="text-sm font-semibold text-aqua">Ask Summer</p>
              <h3 className="font-semibold text-white">{activeQuestion}</h3>
            </div>
          </div>
          <div className="space-y-4 rounded-2xl bg-slate-950/45 p-4 ring-1 ring-white/10">
            <div className="ml-auto max-w-[82%] rounded-2xl rounded-tr-sm bg-aqua/15 p-4 text-sm text-slate-100">
              {activeQuestion}
            </div>
            <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white/[0.075] p-4 text-sm leading-7 text-slate-100">
              {isTyping ? <TypingDots /> : askAnswer.answer}
            </div>
            {!isTyping && (
              <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                Open {askAnswer.guide} <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </Glass>
      </div>
    </Section>
  );
}

function CommunitySection() {
  const cards = [
    ["Resident Appreciation Weekend", "A standing home for appreciation moments and small community wins.", Users],
    ["Pool Reminder", "Seasonal reminders that stay available after a text goes out.", Waves],
    ["Property Upgrade Update", "Progress residents can see, revisit, and understand.", Building2],
    ["Staff Spotlight", "Help residents connect names, faces, and care.", Star],
    ["Local Partner Perk", "Groomed Gent Co. - 20% off with SUMMERPLACE20", Store],
    ["Community Poll", "Lightweight feedback that helps management listen with less friction.", CircleHelp],
  ];
  return (
    <Section id="community" eyebrow="Community and perks" title="Make Summer Place feel alive between announcements.">
      <p className="mb-7 max-w-3xl text-lg leading-8 text-slate-300">
        The texting system is great for urgent updates. The community app becomes the permanent home
        for events, reminders, resident appreciation, and local connection.
      </p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map(([title, copy, Icon]) => (
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
    <Section id="staff" eyebrow="Staff benefit" title="Built to support staff without adding another complicated system.">
      <div className="grid gap-4 lg:grid-cols-3">
        {staffBenefits.map(([before, after]) => (
          <Glass key={before} className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Before</p>
            <p className="mt-3 min-h-20 text-slate-200">{before}</p>
            <div className="my-5 h-px bg-white/10" />
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-aqua">After</p>
            <p className="mt-3 font-semibold leading-7 text-white">{after}</p>
          </Glass>
        ))}
      </div>
      <p className="mt-7 text-center text-2xl font-semibold leading-9 text-white">
        The app does not replace the office. It gives the office a better place to send people.
      </p>
    </Section>
  );
}

function DifferentSection() {
  return (
    <Section id="different" eyebrow="What makes this different" title="This is not a generic apartment app.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {differentiators.map(([title, copy, Icon]) => (
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

function PilotSection() {
  return (
    <Section id="pilot" eyebrow="Pilot plan" title="Start focused. Prove the value. Build from there.">
      <div className="grid gap-5 lg:grid-cols-3">
        {pilotPhases.map((phase, index) => (
          <Glass key={phase.title} className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="max-w-56 text-2xl font-semibold text-white">{phase.title}</h3>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-aqua/12 text-sm font-bold text-aqua ring-1 ring-aqua/20">
                {index + 1}
              </span>
            </div>
            <div className="space-y-3">
              {phase.items.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white/[0.05] p-3">
                  <Check className="h-5 w-5 text-aqua" />
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </Glass>
        ))}
      </div>
      <p className="mt-7 rounded-xl border border-white/10 bg-white/[0.05] p-5 text-center text-slate-200">
        No disruption to existing systems. The app can start as a simple resident layer and grow only
        where it proves useful.
      </p>
    </Section>
  );
}

function WhySection() {
  return (
    <Section id="why" eyebrow="Why Gent Ascend" title="Built by someone who sees the opportunity from inside the community.">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Glass className="p-7">
          <p className="text-lg leading-8 text-slate-200">
            I live at Summer Place. I see the care being put into the property, and I see the chance
            to make residents feel that care more clearly. Gent Ascend Collective exists to build
            practical, useful technology for local businesses and communities - not generic software,
            but tools that make people feel more guided, connected, and confident.
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
    <section id="final" className="relative px-4 py-24 md:px-6">
      <BackgroundDetails compact />
      <Reveal>
        <div className="mx-auto max-w-5xl rounded-2xl border border-aqua/20 bg-gradient-to-br from-harbor/75 to-graphite/75 p-8 text-center shadow-glow backdrop-blur md:p-14">
          <img src="/logo.png" alt="" className="mx-auto mb-7 h-20 w-20 rounded-full object-contain ring-1 ring-white/15" />
          <h2 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
            Summer Place already has the property, the systems, and the team.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-200">
            This app adds the missing layer: a resident experience people can feel.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-300">
            A place to settle in. A place to learn. A place to ask. A place to connect. A place that
            makes Summer Place feel less like scattered buildings and more like a community.
          </p>
          <a href="mailto:" className="primary-btn mx-auto mt-9 w-fit">
            Let's Build the Community Layer <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function DashboardPhone() {
  return (
    <motion.div className="phone-shell mx-auto lg:ml-auto" animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity }}>
      <PhoneFrame>
        <div className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-aqua">Summer Place</p>
              <h3 className="text-2xl font-semibold text-white">Welcome home</h3>
            </div>
            <img src="/logo.png" alt="" className="h-12 w-12 rounded-full object-contain" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Ask Summer", MessageCircle],
              ["Settle In", KeyRound],
              ["Resident Guide", ClipboardCheck],
              ["Perks", Store],
            ].map(([label, Icon]) => (
              <div key={label} className="rounded-xl bg-white/[0.07] p-3">
                <Icon className="mb-3 h-5 w-5 text-aqua" />
                <p className="text-sm font-semibold text-white">{label}</p>
              </div>
            ))}
          </div>
          <PhoneCard label="Featured guide" title="Smoke-Free Living & Odor Respect" icon={ShieldCheck} />
          <PhoneCard label="Community" title="Pool Reminder" icon={Waves} />
          <PhoneCard label="Local perk" title="SUMMERPLACE20" icon={Store} />
        </div>
      </PhoneFrame>
    </motion.div>
  );
}

function AppPhone({ pillar }) {
  const Icon = pillar.icon;
  return (
    <motion.div className="phone-shell mx-auto" key={pillar.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <PhoneFrame>
        <div className="p-5">
          <div className="mb-5 rounded-2xl bg-white/[0.08] p-4 ring-1 ring-white/10">
            <Icon className="mb-4 h-6 w-6 text-aqua" />
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-aqua">{pillar.title}</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{pillar.chat ? "Ask Summer" : pillar.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{pillar.description}</p>
          </div>
          {pillar.chat ? (
            <div className="space-y-3">
              <div className="ml-auto rounded-2xl rounded-tr-sm bg-aqua/15 p-3 text-sm text-white">{pillar.items[0]}</div>
              <div className="rounded-2xl rounded-tl-sm bg-white/[0.07] p-3 text-sm leading-6 text-slate-200">{pillar.items[1]}</div>
              <div className="rounded-lg border border-aqua/25 bg-aqua/10 p-3 text-sm font-semibold text-aqua">{pillar.items[2]}</div>
            </div>
          ) : (
            <div className="space-y-3">
              {pillar.items.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-lg bg-white/[0.06] px-4 py-3">
                  <span className="text-sm text-slate-100">{item}</span>
                  <ChevronRight className="h-4 w-4 text-aqua" />
                </div>
              ))}
            </div>
          )}
        </div>
      </PhoneFrame>
    </motion.div>
  );
}

function PhoneFrame({ children }) {
  return (
    <div className="rounded-[2rem] border border-white/20 bg-slate-950 p-3 shadow-glow">
      <div className="overflow-hidden rounded-[1.55rem] border border-white/10 bg-gradient-to-b from-harbor to-midnight">
        <div className="mx-auto mt-3 h-1.5 w-20 rounded-full bg-white/20" />
        {children}
      </div>
    </div>
  );
}

function PhoneCard({ label, title, icon: Icon }) {
  return (
    <div className="mt-3 rounded-xl bg-white/[0.065] p-4 ring-1 ring-white/10">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-aqua" />
        <div>
          <p className="text-xs text-steel">{label}</p>
          <p className="text-sm font-semibold text-white">{title}</p>
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="h-2 w-2 rounded-full bg-aqua"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.12 }}
        />
      ))}
    </span>
  );
}

function BackgroundDetails({ compact = false }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-overlay" />
      <div className="node-field">
        {Array.from({ length: compact ? 8 : 16 }).map((_, index) => (
          <span key={index} style={{ left: `${(index * 23) % 94}%`, top: `${12 + ((index * 31) % 76)}%` }} />
        ))}
      </div>
      {!compact && (
        <>
          <motion.div className="float-card left-[8%] top-[23%]" animate={{ y: [0, -18, 0] }} transition={{ duration: 8, repeat: Infinity }} />
          <motion.div className="float-card right-[10%] top-[34%] h-24 w-40" animate={{ y: [0, 20, 0] }} transition={{ duration: 9, repeat: Infinity }} />
        </>
      )}
    </div>
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
      transition={{ duration: 0.65, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default App;
