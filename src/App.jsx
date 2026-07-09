import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
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
import Logo from "./Logo.jsx";

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
    title: "From scattered information to one resident home base",
    copy: "Residents get one place that feels like Summer Place, not another disconnected system.",
    icon: ShieldCheck,
  },
  {
    title: "From repeated reminders to real understanding",
    copy: "Guides explain why expectations matter instead of only repeating what to do.",
    icon: Home,
  },
  {
    title: "From local property to local standout",
    copy: "Summer Place can feel more modern, more guided, and more memorable without pretending to be a luxury high-rise.",
    icon: Sparkles,
  },
];

const biggerOpportunityCards = [
  "From scattered information to one resident home base",
  "From repeated reminders to real understanding",
  "From rules on paper to guides residents can actually use",
  "From apartment complex to community experience",
  "From local property to local standout",
];

const apartmentTools = ["Rent portal", "Maintenance form", "Mass text", "Website"];

const experienceModes = [
  {
    id: "moving",
    title: "I'm moving in",
    icon: KeyRound,
    description: "See how a new resident gets guided through their first day, first week, and first month.",
  },
  {
    id: "question",
    title: "I have a question",
    icon: MessageCircle,
    description: "See how Ask Summer helps residents get clarity before calling or texting the office.",
  },
  {
    id: "rules",
    title: "I want to understand the rules",
    icon: BookOpen,
    description: "See how the Resident Guide turns expectations into simple, helpful education.",
  },
  {
    id: "connected",
    title: "I want to feel connected",
    icon: Users,
    description: "See how community updates, events, perks, and local partners make Summer Place feel alive.",
  },
];

const demoPanels = {
  moving: {
    title: "Move-in becomes guided instead of overwhelming.",
    scenario: "A new resident gets their keys, receives the Summer Place app link, creates their account, and chooses 'New Resident.'",
    current: "Without one home base, move-in details spread across calls, texts, papers, and memory.",
    helps: "The app turns the first week into a guided checklist with the right resources in one place.",
    benefit: "New residents feel guided from day one, and staff gains a stronger place to direct recurring move-in needs.",
    screen: "settle",
  },
  question: {
    title: "Common questions get answered before they become calls.",
    scenario: "A resident is unsure where bulk trash goes or what to do when the AC stops cooling.",
    current: "Common questions often become office calls or texts because residents do not know where to start.",
    helps: "Ask Summer gives a clear first answer, links the right guide, and redirects urgent or account-specific issues to staff.",
    benefit: "Residents get clarity faster while official support channels stay protected.",
    screen: "ask",
  },
  rules: {
    title: "Better context creates better resident behavior.",
    scenario: "Some issues repeat because residents get reminders but not enough explanation.",
    current: "Reminders tell residents what to do. They do not always help residents understand why it matters.",
    helps: "The Resident Guide turns expectations into short, respectful education residents can revisit.",
    benefit: "The Resident Guide helps Summer Place educate without talking down to residents.",
    screen: "smoke",
  },
  connected: {
    title: "Summer Place feels alive between announcements.",
    scenario: "Texts are great for urgent updates, but community needs a place residents can return to.",
    current: "Updates disappear into message threads, and community moments do not have a permanent home.",
    helps: "The app gives events, perks, appreciation, staff spotlights, and property updates a polished resident feed.",
    benefit: "Residents see Summer Place as more than buildings. They see an active community.",
    screen: "community",
  },
};

const lifecycleStages = [
  ["Before Move-In", "Know what to expect.", Home],
  ["Move-In Week", "Get settled faster.", KeyRound],
  ["First Month", "Learn the property.", BookOpen],
  ["Daily Living", "Ask, search, and understand.", MessageCircle],
  ["Community Life", "Events, perks, updates, and connection.", Users],
  ["Renewal Season", "Feel more value in staying.", Star],
  ["Move-Out", "Leave smoothly and avoid preventable charges.", ClipboardCheck],
];

const questionGroups = [
  {
    title: "Living Here",
    questions: ["Where does bulk trash go?", "What are quiet hours?", "Where can guests park?", "How do packages work?"],
  },
  {
    title: "Apartment Care",
    questions: ["What do I do if my AC stops cooling?", "What should I check before submitting maintenance?", "What do I do if I see a leak?", "How do I prevent pests?"],
  },
  {
    title: "Community",
    questions: ["Are there upcoming events?", "Are there local perks?", "What are pool rules?", "How do I stay updated?"],
  },
  {
    title: "Policies",
    questions: ["Can I smoke inside?", "What are pet expectations?", "What if I smell smoke?", "How do I report a concern?"],
  },
];

const questionAnswers = {
  "Where does bulk trash go?": ["Bulk trash instructions live in Trash & Clean Community, including location, timing, and what not to leave near dumpsters.", "Trash & Clean Community"],
  "What are quiet hours?": ["Quiet-hour guidance belongs in Noise & Neighbor Respect so residents can understand expectations before issues grow.", "Noise & Neighbor Respect"],
  "Where can guests park?": ["Guest parking guidance points residents to approved areas and overnight expectations.", "Parking & Guest Parking"],
  "How do packages work?": ["Package guidance explains delivery notes, missed packages, and when to contact the office.", "Packages & Deliveries"],
  "What do I do if my AC stops cooling?": ["Residents can check thermostat mode, fan setting, temperature, and breaker before using the official maintenance portal.", "AC basics"],
  "What should I check before submitting maintenance?": ["The app can show simple pre-checks, then send residents to the existing maintenance system.", "Maintenance basics"],
  "What do I do if I see a leak?": ["The app can explain immediate steps and route urgent issues to official support channels.", "Emergency guidance"],
  "How do I prevent pests?": ["Residents can learn daily habits around food, trash, moisture, and reporting early signs.", "Apartment Care 101"],
  "Are there upcoming events?": ["Community updates can keep events visible after a text announcement passes.", "Community"],
  "Are there local perks?": ["The Local Perks section can list current resident offers and local partners.", "Local Perks"],
  "What are pool rules?": ["Pool guidance can explain amenity expectations in a simple resident-friendly format.", "Pool & Amenity Etiquette"],
  "How do I stay updated?": ["The app becomes the place residents return to for updates, guides, events, and reminders.", "Home Dashboard"],
  "Can I smoke inside?": ["No. Summer Place follows a no-smoking addendum, and residents can review smoke-free living guidance in the Resident Guide.", "Smoke-Free Living"],
  "What are pet expectations?": ["Pet Life can explain shared-space expectations, cleanup, and neighbor comfort.", "Pet Life"],
  "What if I smell smoke?": ["The guide can explain what residents can document, how odor travels, and when to contact the office.", "Smoke-Free Living"],
  "How do I report a concern?": ["The app can point residents to the right official channel and clarify when to contact the office directly.", "Resident support"],
};

const libraryCategories = [
  ["New Resident", ["First 24 Hours", "First Week", "Utilities", "Parking", "Packages"]],
  ["Daily Living", ["Trash", "Pets", "Noise", "Guests", "Apartment Care"]],
  ["Property Protection", ["Smoke-Free Living", "Preventing Damage", "Pest Prevention", "Storm Prep"]],
  ["Community", ["Events", "Local Perks", "Staff Spotlights", "Resident Appreciation"]],
  ["Move-Out", ["Cleaning Checklist", "Keys", "Avoidable Charges", "Final Steps"]],
];

const managementCards = [
  ["Approved Knowledge Base", "Office hours, amenity rules, parking, trash, packages, policies, emergency guidance, and resident expectations.", ShieldCheck],
  ["Safe AI Boundaries", "Ask Summer answers common questions from approved content and redirects urgent or account-specific issues to staff.", MessageCircle],
  ["Easy Content Updates", "Guides and app content can be updated as policies, reminders, seasons, or property priorities change.", ClipboardCheck],
];

const existingSystems = ["Rent portal", "Maintenance portal", "Mass texting", "Website", "Lease documents"];
const communityAppSystems = ["Resident onboarding", "Learning guides", "Ask Summer concierge", "Community updates", "Local perks", "Resident knowledge base"];

const summaryValues = [
  ["Resident Experience", "Residents do not just get information. They get a clearer, smoother, more connected way to live here.", Users],
  ["Community Identity", "Summer Place becomes more than buildings and units. It becomes a place with a digital home, shared expectations, local connection, and community energy.", Sparkles],
  ["Staff Support", "Staff does not need another system to manage. They get a better place to point residents when the same questions, issues, and misunderstandings keep coming up.", ClipboardCheck],
];

const whyNowCards = [
  ["Renovations improve the property.", Building2],
  ["Communication improves awareness.", MessageCircle],
  ["A community app improves how residents experience living here.", Home],
];

const isList = [
  "A resident experience layer",
  "A new resident onboarding hub",
  "A living guidebook",
  "A community home base",
  "A smarter place for common questions",
  "A way to make care more visible",
];

const isNotList = [
  "A replacement for the rent portal",
  "A replacement for the maintenance system",
  "A replacement for staff",
  "A replacement for corporate communication",
  "A complicated operational system",
  "A generic apartment app",
];

const localStandoutCards = [
  ["Unexpectedly modern", "Residents feel like Summer Place is thinking beyond the basics.", Sparkles],
  ["Locally connected", "Perks, partners, guides, and community moments connect residents to the area.", Store],
  ["Resident-centered", "The app is built around how people actually live, not just how properties operate.", Users],
  ["Memorable", "A better experience gives residents something to talk about and remember.", Star],
];

const futureCards = [
  ["Seasonal guides", "Storm prep, freeze warnings, pool season, holiday reminders.", CalendarDays],
  ["Resident feedback", "Simple polls and feedback prompts to understand what residents need.", CircleHelp],
  ["Local partner network", "Perks from nearby businesses and services.", Store],
  ["Renewal support", "Helpful reminders and resident appreciation moments near renewal season.", Star],
  ["Move-out clarity", "A smoother exit process with fewer avoidable charges.", ClipboardCheck],
  ["Community moments", "Events, spotlights, appreciation days, and property updates.", Users],
];

const managementTakeaways = [
  "A stronger resident first impression",
  "A central place for common information",
  "A helpful learning hub",
  "A safe AI concierge concept",
  "A community/perks layer",
  "A better way to show residents the care already being put into the property",
  "A pilot that can start small and grow with feedback",
];

const pillars = [
  {
    title: "Welcome System",
    icon: Home,
    description: "A guided first impression for every new resident.",
    microcopy: "Digital welcome",
    items: ["Welcome to Summer Place", "Your first 24 hours", "Your first week", "Meet the community", "Ask Summer if you get stuck"],
  },
  {
    title: "Resident Intelligence Hub",
    icon: BookOpen,
    description: "A living guidebook that turns common issues into clear, respectful education.",
    microcopy: "Community knowledge",
    items: ["Smoke-Free Living", "Clean Community", "Shared Living", "Apartment Care", "Storm Prep"],
  },
  {
    title: "Ask Summer Concierge",
    icon: MessageCircle,
    description: "An AI-powered resident assistant trained on approved Summer Place information.",
    microcopy: "Property-specific AI",
    items: ["Can I smoke inside?", "No smoking is permitted inside apartments.", "Suggested guide: Smoke-Free Living"],
    chat: true,
  },
  {
    title: "Community Pulse",
    icon: Users,
    description: "A place where events, updates, appreciation, and property progress stay alive.",
    microcopy: "Living community",
    items: ["Property Progress Update", "Resident Appreciation", "New Resident Welcome", "Community Pulse"],
  },
  {
    title: "Local Perks Network",
    icon: Store,
    description: "A resident benefit layer connecting Summer Place with local businesses and services.",
    microcopy: "Local connection",
    items: ["Local Partner Perk", "Groomed Gent Co. SUMMERPLACE20", "Local services", "Resident benefits"],
  },
  {
    title: "Living Better at Summer Place",
    icon: ClipboardCheck,
    description: "A practical education layer that helps residents become more respectful, prepared, and confident without feeling talked down to.",
    microcopy: "Better expectations",
    items: ["Neighbor respect", "Prepared living", "Odor respect", "Damage prevention", "Move-out clarity"],
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
    "Understand how odor travels",
    "Protect renovated apartments",
    "Learn legal medical cannabis basics",
    "Explore cleaner, lower-odor options",
    "Practice outdoor courtesy",
    "Report odor concerns without confrontation",
  ],
};

const guides = [
  ["Smoke-Free Living & Odor Respect", "Help residents understand the no-smoking addendum, reduce odor complaints, protect renovated units, and make cleaner, more respectful choices.", ShieldCheck],
  ["Pet Life & Neighbor Respect", "Shared-space expectations for pets, cleanup, and neighbor comfort.", Sparkles],
  ["Trash, Bulk Trash & Clean Community", "Simple disposal steps, timing, and dumpster-area clarity.", ClipboardCheck],
  ["Packages & Delivery Clarity", "Delivery notes, missed packages, and what to check first.", Bell],
  ["Noise, Guests & Shared Living", "Practical reminders that protect quiet enjoyment.", Waves],
  ["Parking & Guest Flow", "Approved areas, guests, and overnight parking clarity.", MapPin],
  ["Apartment Care & Damage Prevention", "Small habits that protect units and renovated finishes.", Building2],
  ["Storm, Freeze & Emergency Prep", "Weather reminders, outage steps, and preparation basics.", ShieldCheck],
  ["Move-Out Clarity & Avoidable Charges", "Move-out expectations in plain language.", Check],
  ["Pool, Amenities & Shared Spaces", "Clean, respectful shared-space guidance.", Star],
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
  ["Staff repeats the same explanation.", "Staff points to the approved guide."],
  ["A reminder disappears in a text thread.", "The information stays available in the app."],
  ["Residents misunderstand expectations.", "The app explains the context before frustration builds."],
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
    title: "Phase 1: Vision Review",
    description: "A low-risk walkthrough to align on tone, value, and what belongs in a pilot.",
    items: ["Interactive concept app", "Management walkthrough", "Feedback on tone, features, and content", "Decide what belongs in the pilot"],
  },
  {
    title: "Phase 2: Pilot Build",
    description: "A focused resident resource built around approved starter content.",
    items: ["New Resident Hub", "Resident Guide starter modules", "Ask Summer approved-answer demo", "Community and perks pages", "Basic content update workflow"],
  },
  {
    title: "Phase 3: Community App",
    description: "The full resident experience after the pilot proves where it creates value.",
    items: ["Resident access", "Approved knowledge base", "AI concierge", "Local partner hub", "Engagement insights", "Seasonal content updates"],
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
  const [activeExperience, setActiveExperience] = useState("moving");
  const [activeGridQuestion, setActiveGridQuestion] = useState("Where does bulk trash go?");
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
      <VisionProgress />
      <Hero />
      <ExecutiveSummary />
      <BiggerOpportunitySection />
      <WhyNowSection />
      <ExperienceMode activeExperience={activeExperience} setActiveExperience={setActiveExperience} />
      <ResidentJourneyDemo activeExperience={activeExperience} setActiveExperience={setActiveExperience} />
      <OpportunitySection />
      <GapSection />
      <ResidentLifecycleMap />
      <PillarsSection activePillar={activePillar} setActivePillar={setActivePillar} />
      <JourneySection activeStep={activeStep} setActiveStep={setActiveStep} progress={progress} />
      <GuideSection activeGuide={activeGuide} setActiveGuide={setActiveGuide} />
      <AskSection
        activeQuestion={activeQuestion}
        setActiveQuestion={setActiveQuestion}
        askAnswer={askAnswer}
        isTyping={isTyping}
      />
      <QuestionGrid activeQuestion={activeGridQuestion} setActiveQuestion={setActiveGridQuestion} />
      <ContentLibraryPreview />
      <CommunitySection />
      <ManagementControl />
      <WhatIsSection />
      <NoDisruptionSection />
      <StaffSection />
      <DifferentSection />
      <LocalStandoutSection />
      <FuturePossibilities />
      <FinishedAppVision />
      <PilotSection />
      <WhySection />
      <ManagementTakeaway />
      <FinalCta />
      <Footer />
    </main>
  );
}

function TopNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-midnight/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a href="#hero" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo className="h-11 w-11 rounded-full ring-1 ring-silver/25" />
          <span className="text-sm font-semibold text-white">Summer Place Vision</span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="rounded-full px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white">
              {label}
            </a>
          ))}
          <a href="#final" className="ml-2 rounded-full border border-silver/25 bg-harbor px-4 py-2 text-xs font-bold text-white shadow-glow transition hover:bg-ocean">
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
            <a href="#final" onClick={() => setOpen(false)} className="mt-2 rounded-full border border-silver/25 bg-harbor px-4 py-3 text-center text-sm font-bold text-white">
              Build the Community Layer
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function VisionProgress() {
  const items = [
    ["Vision", "hero"],
    ["Opportunity", "opportunity"],
    ["Experience", "experience"],
    ["App Preview", "pillars"],
    ["Guide", "guide"],
    ["Ask Summer", "ask"],
    ["Pilot", "pilot"],
  ];
  return (
    <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <div className="premium-glass grid gap-2 p-3">
        {items.map(([label, id]) => (
          <a key={id} href={`#${id}`} className="group flex items-center justify-end gap-2 text-xs font-semibold text-steel">
            <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all group-hover:max-w-28 group-hover:opacity-100">{label}</span>
            <span className="h-2.5 w-2.5 rounded-full border border-silver/35 bg-silver/25 shadow-glow" />
          </a>
        ))}
      </div>
    </div>
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
              <motion.div
                className="premium-glass-strong grid h-28 w-28 place-items-center rounded-[2rem] p-3 shadow-glow"
                animate={{ boxShadow: ["0 20px 70px rgba(168,216,234,0.14)", "0 28px 90px rgba(168,216,234,0.26)", "0 20px 70px rgba(168,216,234,0.14)"] }}
                transition={{ duration: 4.8, repeat: Infinity }}
              >
                <Logo className="h-full w-full rounded-full" />
              </motion.div>
              <div className="rounded-full border border-silver/25 bg-silver/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-silver shadow-[inset_0_-1px_0_rgba(0,111,152,0.45)]">
                Resident Experience Concept
              </div>
            </div>
            <p className="mb-5 text-sm text-steel">A resident experience concept by Gent Ascend Collective.</p>
            <h1 className="metallic-text text-5xl font-semibold leading-[1.02] md:text-7xl">
              Summer Place can become more than a place people rent.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200">
              It can become a community residents understand, respect, connect with, and feel proud
              to call home.
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-steel">
              The Summer Place Community App is a custom resident experience layer - designed to help
              residents settle in, learn how to live here well, connect with the community, access
              local perks, and get trusted answers through an AI concierge built around
              Summer Place-approved information.
            </p>
            <p className="mt-4 max-w-2xl rounded-2xl border border-aqua/20 bg-white/[0.045] p-4 text-sm leading-6 text-slate-300 backdrop-blur">
              Not another portal. Not another reminder system. A digital community experience built
              for Summer Place.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#opportunity" className="primary-btn">Explore the Community Vision <ArrowRight className="h-4 w-4" /></a>
              <a href="#pillars" className="secondary-btn">See What Residents Experience <Phone className="h-4 w-4" /></a>
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

function ExecutiveSummary() {
  return (
    <Section id="summary" eyebrow="Executive summary" title="The opportunity in one sentence.">
      <Glass strong className="p-6 md:p-9">
        <p className="max-w-5xl text-2xl font-semibold leading-10 text-white md:text-3xl">
          Give Summer Place something most apartment communities around here do not have: a custom
          mobile community experience that makes residents feel guided from day one, connected while
          they live here, and more confident in how to be part of the community.
        </p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {summaryValues.map(([title, copy, Icon]) => (
            <div key={title} className="rounded-[1.5rem] border border-aqua/15 bg-white/[0.045] p-5">
              <Icon className="mb-4 h-6 w-6 text-aqua" />
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
            </div>
          ))}
        </div>
      </Glass>
    </Section>
  );
}

function BiggerOpportunitySection() {
  return (
    <Section id="bigger-opportunity" eyebrow="Bigger opportunity" title="The real opportunity is not communication. It is community.">
      <Glass strong className="p-6 md:p-8">
        <p className="max-w-4xl text-lg leading-8 text-slate-200">
          Texts can notify residents. Portals can process maintenance. Websites can show floor plans.
          But none of those things make a resident feel truly guided, connected, or part of something.
        </p>
        <p className="mt-5 text-2xl font-semibold text-white">The Summer Place Community App fills that gap.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {biggerOpportunityCards.map((card) => (
            <div key={card} className="rounded-[1.5rem] border border-silver/15 bg-white/[0.045] p-4 text-sm font-semibold leading-6 text-slate-100">
              {card}
            </div>
          ))}
        </div>
        <p className="mt-7 text-center text-xl font-semibold text-white">
          This is how Summer Place can feel different without pretending to be a luxury high-rise.
        </p>
      </Glass>
    </Section>
  );
}

function WhyNowSection() {
  return (
    <Section id="why-now" eyebrow="Why now" title="Why this matters now.">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Glass className="p-7">
          <p className="text-lg leading-8 text-slate-200">
            Summer Place is already being improved physically and operationally. The next opportunity
            is emotional and experiential: helping residents feel the care being put into the property.
          </p>
          <p className="mt-6 text-xl font-semibold leading-8 text-white">
            When residents feel more guided, they feel more respected. When they feel more respected,
            the community gets stronger.
          </p>
        </Glass>
        <div className="grid gap-4">
          {whyNowCards.map(([copy, Icon]) => (
            <Glass key={copy} className="flex items-center gap-4 p-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-aqua/12 ring-1 ring-aqua/20">
                <Icon className="h-5 w-5 text-aqua" />
              </div>
              <p className="text-lg font-semibold text-white">{copy}</p>
            </Glass>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ExperienceMode({ activeExperience, setActiveExperience }) {
  return (
    <Section id="experience" eyebrow="Experience mode" title="Choose a resident journey.">
      <p className="mb-7 max-w-3xl text-lg leading-8 text-slate-300">
        Explore how the Summer Place Community App supports residents at different moments - from
        move-in day to everyday living.
      </p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {experienceModes.map(({ id, title, description, icon: Icon }) => (
          <motion.button
            key={id}
            onClick={() => setActiveExperience(id)}
            whileHover={{ y: -7 }}
            className={`curved-glass-card min-h-64 p-6 text-left ${
              activeExperience === id ? "bg-harbor/[0.12] ring-1 ring-harbor/60 blue-glow" : ""
            }`}
          >
            <div className="mb-8 grid h-14 w-14 place-items-center rounded-full bg-aqua/12 ring-1 ring-aqua/25">
              <Icon className="h-7 w-7 text-aqua" />
            </div>
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
            <p className="mt-4 text-sm leading-6 text-slate-300">{description}</p>
            <a href="#journey-demos" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-aqua">
              Open demo <ArrowRight className="h-4 w-4" />
            </a>
          </motion.button>
        ))}
      </div>
    </Section>
  );
}

function ResidentJourneyDemo({ activeExperience, setActiveExperience }) {
  const demo = demoPanels[activeExperience];
  return (
    <Section id="journey-demos" eyebrow="Guided resident demos" title="See the future app through real resident moments.">
      <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
        {experienceModes.map(({ id, title }) => (
          <button
            key={id}
            onClick={() => setActiveExperience(id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${
              activeExperience === id ? "border-harbor/60 bg-harbor/15 text-white" : "border-white/10 bg-white/[0.04] text-slate-300"
            }`}
          >
            {title}
          </button>
        ))}
      </div>
      <Glass strong className="p-5 md:p-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_410px] xl:items-center">
          <div>
            <h3 className="metallic-text text-3xl font-semibold leading-tight md:text-5xl">{demo.title}</h3>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <StoryBlock label="Resident situation" text={demo.scenario} />
              <StoryBlock label="What usually happens now" text={demo.current} />
              <StoryBlock label="How the app helps" text={demo.helps} />
              <StoryBlock label="Staff/community benefit" text={demo.benefit} />
            </div>
            <p className="mt-7 rounded-2xl border border-aqua/20 bg-white/[0.045] p-4 text-sm leading-6 text-slate-300">
              Community is easier to build when residents have one trusted home base.
            </p>
          </div>
          <PhoneScreenLibrary screen={demo.screen} />
        </div>
      </Glass>
    </Section>
  );
}

function StoryBlock({ label, text }) {
  return (
    <div className="rounded-[1.4rem] border border-aqua/15 bg-white/[0.045] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-aqua">{label}</p>
      <p className="mt-3 text-sm leading-6 text-slate-200">{text}</p>
    </div>
  );
}

function OpportunitySection() {
  return (
    <Section id="opportunity" eyebrow="The experience layer" title="You already have the systems. This creates the experience.">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Glass strong className="p-6 md:p-8">
          <p className="max-w-2xl text-lg leading-8 text-slate-200">
            The app does not compete with existing tools. It makes those tools easier for residents
            to understand and use.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {apartmentTools.map((tool) => (
              <div key={tool} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-sm font-semibold text-slate-200">
                {tool}
              </div>
            ))}
          </div>
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-aqua/20" />
            <ArrowRight className="h-5 w-5 text-aqua" />
            <div className="h-px flex-1 bg-aqua/20" />
          </div>
          <div className="rounded-[1.75rem] border border-silver/25 bg-gradient-to-br from-gunmetal/55 to-deepblue/35 p-6 shadow-glow">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-silver">Summer Place Community App</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">A digital community home</h3>
            <p className="mt-4 leading-7 text-slate-200">
              A resident identity layer, guided move-in experience, living knowledge base, local
              connection hub, and AI concierge grounded in property-approved information.
            </p>
          </div>
        </Glass>
        <div className="grid gap-4">
          {opportunityCards.map(({ title, copy, icon: Icon }) => (
            <Glass key={title} className="flex gap-4 p-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-aqua/12 ring-1 ring-aqua/20">
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
          className="absolute left-1/2 top-1/2 z-10 w-[min(82%,330px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-silver/25 bg-gradient-to-br from-gunmetal/85 to-darkgraphite/95 p-6 text-center shadow-glow"
          initial={{ scale: 0.92, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Logo className="mx-auto mb-4 h-14 w-14 rounded-full" />
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

function ResidentLifecycleMap() {
  return (
    <Section id="lifecycle" eyebrow="Resident lifecycle" title="One app across the resident journey.">
      <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-300">
        Instead of only helping residents when something goes wrong, the app supports the full
        experience of living at Summer Place.
      </p>
      <Glass strong className="p-5 md:p-7">
        <div className="grid gap-4 lg:grid-cols-7">
          {lifecycleStages.map(([title, copy, Icon], index) => (
            <div key={title} className="relative rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
              {index < lifecycleStages.length - 1 && <span className="absolute left-10 top-full hidden h-px w-[calc(100%-1rem)] bg-aqua/20 lg:left-[calc(100%-0.5rem)] lg:top-8 lg:block" />}
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-aqua/12 ring-1 ring-aqua/25">
                <Icon className="h-5 w-5 text-aqua" />
              </div>
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
            </div>
          ))}
        </div>
      </Glass>
    </Section>
  );
}

function PillarsSection({ activePillar, setActivePillar }) {
  return (
    <Section id="pillars" eyebrow="Clickable app preview" title="The resident experience layer, broken into six powerful parts.">
      <div className="grid gap-8 xl:grid-cols-[1fr_430px] xl:items-center">
        <div className="grid gap-3 md:grid-cols-2">
          {pillars.map((pillar) => (
            <motion.button
              key={pillar.title}
              onClick={() => setActivePillar(pillar)}
              whileHover={{ y: -6, rotateX: 1.5 }}
              className={`curved-glass-card min-h-48 p-5 text-left ${
                activePillar.title === pillar.title ? "ring-1 ring-harbor/60 bg-harbor/[0.12] blue-glow" : ""
              }`}
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-aqua/12 ring-1 ring-aqua/20">
                <pillar.icon className="h-6 w-6 text-aqua" />
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-steel">{pillar.microcopy}</p>
              <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{pillar.description}</p>
            </motion.button>
          ))}
        </div>
        <AppPhone pillar={activePillar} />
      </div>
    </Section>
  );
}

function JourneySection({ activeStep, setActiveStep, progress }) {
  return (
    <Section id="journey" eyebrow="Welcome System" title="First impressions should feel guided, not handed off.">
      <p className="mb-7 max-w-4xl text-lg leading-8 text-slate-300">
        When a new resident moves in, the experience should not stop at keys, paperwork, and a portal
        login. The app can welcome them into the community, walk them through the first week, explain
        expectations, and make Summer Place feel organized from the start.
      </p>
      <div className="grid gap-6">
        <Glass strong className="p-5 md:p-7">
          <div className="grid gap-4 lg:grid-cols-5">
            {timeline.map(([title, copy], index) => (
              <motion.button
                key={title}
                onClick={() => setActiveStep(index)}
                whileHover={{ y: -4 }}
                className={`relative flex w-full gap-4 rounded-[1.4rem] border p-4 text-left transition ${
                  activeStep === index ? "border-harbor/60 bg-harbor/12" : "border-white/10 bg-white/[0.035] hover:bg-white/[0.08]"
                }`}
              >
                {index < timeline.length - 1 && <span className="absolute left-10 top-full hidden h-px w-[calc(100%-1rem)] bg-aqua/20 lg:left-[calc(100%-0.5rem)] lg:top-1/2 lg:block" />}
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-bold text-aqua">
                  {index + 1}
                </span>
                <span>
                  <span className="block font-semibold text-white">{title}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-300">{copy}</span>
                </span>
              </motion.button>
            ))}
          </div>
        </Glass>
        <Glass className="p-6 md:p-7">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-aqua">Welcome progress</p>
              <h3 className="mt-1 text-3xl font-semibold text-white">{progress}% complete</h3>
            </div>
            <ClipboardCheck className="h-8 w-8 text-aqua" />
          </div>
          <div className="mb-6 h-3 rounded-full bg-white/10">
            <motion.div className="h-full rounded-full bg-harbor" animate={{ width: `${progress}%` }} transition={{ duration: 0.45 }} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {checklist.map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-lg bg-white/[0.055] p-3">
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${index < Math.ceil((progress / 100) * checklist.length) ? "bg-harbor text-white" : "bg-white/10 text-slate-400"}`}>
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </Glass>
      </div>
      <p className="mt-7 text-center text-2xl font-semibold text-white">
        A stronger first week creates better expectations for the entire lease.
      </p>
    </Section>
  );
}

function GuideSection({ activeGuide, setActiveGuide }) {
  return (
    <Section id="guide" eyebrow="Resident Intelligence Hub" title="The Resident Guide is where repeated problems become teachable moments.">
      <p className="mb-7 max-w-3xl text-lg leading-8 text-slate-300">
        Many apartment issues do not repeat because residents are bad people. They repeat because
        expectations are scattered, reminders disappear, and people do not always understand the why
        behind the rule. The Resident Guide gives Summer Place a better way to educate - calm, clear,
        respectful, and always available.
      </p>
      <p className="mb-7 max-w-3xl rounded-2xl border border-silver/15 bg-white/[0.045] p-4 text-lg font-semibold text-white">
        This is not enforcement. It is expectation design.
      </p>
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="grid gap-4 md:grid-cols-2">
          {guides.map(([title, copy, Icon]) => (
            <motion.button
              key={title}
              onClick={() => setActiveGuide(title)}
              whileHover={{ y: -5 }}
              className={`curved-glass-card p-5 text-left ${
                activeGuide === title ? "ring-1 ring-harbor/60 bg-harbor/[0.1]" : "hover:bg-white/[0.08]"
              }`}
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-aqua/12 ring-1 ring-aqua/20">
                <Icon className="h-6 w-6 text-aqua" />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
            </motion.button>
          ))}
        </div>
        <Glass strong className="p-6">
          <p className="text-sm font-semibold text-aqua">Case study preview</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Example: {activeGuide}</h3>
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
            This is an area where Gent Ascend can bring real insight. Neil spent over three years in
            Louisiana medical cannabis and completed more than 15,000 deliveries, many to apartment
            communities. That experience can help turn a repeated property frustration into a
            practical, respectful resident education module.
          </p>
        </Glass>
        <Glass className="p-5">
          <h3 className="mb-4 text-xl font-semibold text-white">Designed with boundaries.</h3>
          <div className="grid gap-3">
            {[
              "Answers from approved Summer Place information",
              "Sends urgent issues back to official channels",
              "Avoids guessing on account-specific questions",
              "Emergency issues directed to official emergency paths",
              "Points residents to the right guide or contact path",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-white/[0.05] p-3 text-sm text-slate-200">
                <ShieldCheck className="h-4 w-4 text-aqua" />
                {item}
              </div>
            ))}
          </div>
        </Glass>
      </div>
    </Section>
  );
}

function AskSection({ activeQuestion, setActiveQuestion, askAnswer, isTyping }) {
  return (
    <Section id="ask" eyebrow="Ask Summer Concierge" title="Ask Summer is not a chatbot. It is a property-specific concierge.">
      <p className="mb-7 max-w-3xl text-lg leading-8 text-slate-300">
        Residents should not have to dig through old texts, remember lease language, search emails,
        or call the office for every common question. Ask Summer gives them a trusted starting point -
        trained on approved Summer Place information and designed to guide residents back to official
        staff channels when needed.
      </p>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-wrap content-start gap-3">
          {Object.keys(askQuestions).map((question) => (
            <button
              key={question}
              onClick={() => setActiveQuestion(question)}
              className={`rounded-full border px-4 py-3 text-left text-sm font-semibold transition ${
                question === activeQuestion ? "border-harbor/70 bg-harbor/12 text-white" : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
              }`}
            >
              {question}
            </button>
          ))}
        </div>
        <Glass strong className="p-5 md:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-aqua/15 shadow-glow ring-1 ring-aqua/25">
              <MessageCircle className="h-5 w-5 text-aqua" />
            </div>
            <div>
              <p className="text-sm font-semibold text-aqua">Ask Summer</p>
              <h3 className="font-semibold text-white">{activeQuestion}</h3>
            </div>
          </div>
          <div className="space-y-4 rounded-2xl bg-[#0c2a3d]/65 p-4 ring-1 ring-white/10">
            <div className="ml-auto max-w-[82%] rounded-2xl rounded-tr-sm bg-harbor/20 p-4 text-sm text-slate-100">
              {activeQuestion}
            </div>
            <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white/[0.075] p-4 text-sm leading-7 text-slate-100">
              {isTyping ? <TypingDots /> : askAnswer.answer}
            </div>
            {!isTyping && (
              <button className="secondary-btn w-fit px-4 py-2">
                Open {askAnswer.guide} <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="mt-4 text-xs leading-5 text-steel">
            For urgent, account-specific, or emergency issues, residents are guided to contact the
            office or official support channels.
          </p>
        </Glass>
      </div>
    </Section>
  );
}

function QuestionGrid({ activeQuestion, setActiveQuestion }) {
  const [answer, guide] = questionAnswers[activeQuestion];
  return (
    <Section id="questions" eyebrow="Ask before contacting" title="What residents can ask before contacting the office.">
      <p className="mb-7 max-w-3xl text-lg leading-8 text-slate-300">
        Ask Summer is designed to reduce confusion, not replace staff.
      </p>
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="grid gap-4 md:grid-cols-2">
          {questionGroups.map((group) => (
            <Glass key={group.title} className="p-5">
              <h3 className="mb-4 text-xl font-semibold text-white">{group.title}</h3>
              <div className="grid gap-2">
                {group.questions.map((question) => (
                  <button
                    key={question}
                    onClick={() => setActiveQuestion(question)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      activeQuestion === question ? "border-harbor/60 bg-harbor/15 text-white" : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                    }`}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </Glass>
          ))}
        </div>
        <Glass strong className="p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-aqua/12 ring-1 ring-aqua/25">
              <Sparkles className="h-5 w-5 text-aqua" />
            </div>
            <div>
              <p className="text-sm font-semibold text-aqua">Ask Summer answer preview</p>
              <h3 className="text-xl font-semibold text-white">{activeQuestion}</h3>
            </div>
          </div>
          <p className="leading-7 text-slate-200">{answer}</p>
          <button className="secondary-btn mt-5 px-4 py-2">Suggested guide: {guide}</button>
          <p className="mt-5 text-xs leading-5 text-steel">
            Contact office if urgent, emergency-related, or account-specific.
          </p>
        </Glass>
      </div>
    </Section>
  );
}

function ContentLibraryPreview() {
  return (
    <Section id="library" eyebrow="Living knowledge base" title="The app becomes a living resident knowledge base.">
      <p className="mb-7 max-w-3xl text-lg leading-8 text-slate-300">
        Start with the highest-impact guides, then grow based on the questions residents actually ask.
      </p>
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {["40+ potential resident guides", "6 core app sections", "1 trusted home base"].map((stat) => (
          <Glass key={stat} className="p-5 text-center">
            <p className="text-2xl font-semibold text-white">{stat}</p>
          </Glass>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {libraryCategories.map(([title, items]) => (
          <Glass key={title} className="p-5">
            <h3 className="mb-4 text-xl font-semibold text-white">{title}</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item} className="rounded-xl bg-white/[0.055] px-3 py-2 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </Glass>
        ))}
      </div>
    </Section>
  );
}

function CommunitySection() {
  const cards = [
    ["Property Progress Update", "Show residents how Summer Place is improving, not just tell them.", Building2],
    ["Resident Appreciation", "Give appreciation moments a place residents can revisit.", Users],
    ["New Resident Welcome", "Make move-in feel like joining a community, not just signing paperwork.", Home],
    ["Storm Prep Guide", "Turn seasonal preparation into a clear resident experience.", ShieldCheck],
    ["Smoke-Free Living Case Study", "Use education to reduce friction around repeated property concerns.", BookOpen],
    ["Local Partner Perk", "Groomed Gent Co. - 20% off with SUMMERPLACE20", Store],
    ["Community Pulse", "Keep events, updates, perks, and property energy alive between announcements.", Sparkles],
  ];
  return (
    <Section id="community" eyebrow="Community Pulse" title="Make Summer Place feel alive between announcements.">
      <p className="mb-7 max-w-3xl text-lg leading-8 text-slate-300">
        A text can notify residents, but it disappears into a thread. Community Pulse gives Summer
        Place a digital home for progress, appreciation, local connection, and shared energy.
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

function ManagementControl() {
  return (
    <Section id="approved" eyebrow="Approved information" title="Built around approved Summer Place information.">
      <p className="mb-7 max-w-3xl text-lg leading-8 text-slate-300">
        The future app can be built so the content, guide language, and AI answers only reflect
        information Summer Place approves.
      </p>
      <div className="grid gap-4 lg:grid-cols-3">
        {managementCards.map(([title, copy, Icon]) => (
          <Glass key={title} className="p-6">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-aqua/12 ring-1 ring-aqua/25">
              <Icon className="h-6 w-6 text-aqua" />
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
          </Glass>
        ))}
      </div>
    </Section>
  );
}

function WhatIsSection() {
  return (
    <Section id="definition" eyebrow="Clear definition" title="What this is - and what it is not.">
      <div className="grid gap-5 lg:grid-cols-2">
        <DefinitionList title="This is" items={isList} positive />
        <DefinitionList title="This is not" items={isNotList} />
      </div>
      <p className="mt-7 rounded-[1.5rem] border border-aqua/20 bg-white/[0.045] p-5 text-center text-xl font-semibold leading-8 text-white">
        It fits beside what already works and improves the part residents feel every day.
      </p>
    </Section>
  );
}

function DefinitionList({ title, items, positive = false }) {
  return (
    <Glass strong={positive} className="p-6">
      <h3 className="mb-5 text-2xl font-semibold text-white">{title}</h3>
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-xl bg-white/[0.055] p-3 text-sm text-slate-200">
            {positive ? <Check className="h-4 w-4 text-aqua" /> : <X className="h-4 w-4 text-steel" />}
            {item}
          </div>
        ))}
      </div>
    </Glass>
  );
}

function NoDisruptionSection() {
  return (
    <Section id="fit" eyebrow="No disruption" title="Designed to fit beside what already works.">
      <Glass strong className="p-6 md:p-8">
        <p className="mx-auto mb-7 max-w-4xl text-center text-lg leading-8 text-slate-200">
          Summer Place already has systems for payments, maintenance, messaging, and management. The
          Community App does not compete with those systems. It gives residents a better place to
          understand them.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          <SystemList title="Existing Systems" items={existingSystems} />
          <SystemList title="Community App" items={communityAppSystems} />
        </div>
        <p className="mt-7 text-center text-2xl font-semibold text-white">
          Operations stay where they are. Resident experience gets upgraded.
        </p>
      </Glass>
    </Section>
  );
}

function SystemList({ title, items }) {
  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5">
      <h3 className="mb-4 text-xl font-semibold text-white">{title}</h3>
      <div className="grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-xl bg-white/[0.055] px-3 py-2 text-sm text-slate-200">
            <Check className="h-4 w-4 text-aqua" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function StaffSection() {
  return (
    <Section id="staff" eyebrow="Staff leverage" title="Staff gets leverage without another complicated system.">
      <p className="mb-7 max-w-4xl text-lg leading-8 text-slate-300">
        The app gives staff a stronger answer than repeating the same message again. Instead of only
        saying "we sent a text," staff can point residents to a permanent guide, a clear app section,
        or Ask Summer.
      </p>
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
        Staff keeps using the systems that already work. The Community App gives those systems a
        resident-facing experience layer.
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

function LocalStandoutSection() {
  return (
    <Section id="standout" eyebrow="Local opportunity" title="Most complexes around here have portals. Summer Place could have a community.">
      <Glass strong className="p-6 md:p-8">
        <p className="max-w-4xl text-lg leading-8 text-slate-200">
          A resident portal is expected. A maintenance form is expected. Text reminders are expected.
          A custom community app built around the real resident experience is not expected.
        </p>
        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {localStandoutCards.map(([title, copy, Icon]) => (
            <div key={title} className="rounded-[1.5rem] border border-aqua/15 bg-white/[0.045] p-5">
              <Icon className="mb-4 h-6 w-6 text-aqua" />
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
            </div>
          ))}
        </div>
        <p className="mt-7 text-center text-xl font-semibold text-white">
          This is a chance to build something different without needing to become something Summer
          Place is not.
        </p>
      </Glass>
    </Section>
  );
}

function FinishedAppVision() {
  const sequence = [
    "Welcome home.",
    "Here is what matters this week.",
    "Here is how to settle in.",
    "Here is how to live here well.",
    "Here is who to ask.",
    "Here is what is happening.",
    "Here is what local perks are available.",
    "Here is how to stay prepared.",
    "Here is how Summer Place is improving.",
  ];
  return (
    <Section id="finished-app" eyebrow="Finished app vision" title="What the finished app could feel like.">
      <Glass strong className="p-6 md:p-8">
        <p className="max-w-4xl text-lg leading-8 text-slate-200">
          Imagine a resident opening the app and seeing Summer Place not as scattered buildings, but
          as a living community.
        </p>
        <div className="mt-7 grid gap-3 md:grid-cols-3">
          {sequence.map((item) => (
            <div key={item} className="rounded-[1.4rem] border border-silver/15 bg-white/[0.045] p-4 text-sm font-semibold text-slate-100">
              {item}
            </div>
          ))}
        </div>
        <p className="mt-7 text-center text-2xl font-semibold text-white">
          That is not just information. That is resident experience.
        </p>
      </Glass>
    </Section>
  );
}

function FuturePossibilities() {
  return (
    <Section id="future" eyebrow="Future possibilities" title="What this could grow into.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {futureCards.map(([title, copy, Icon]) => (
          <Glass key={title} className="p-5">
            <Icon className="mb-5 h-6 w-6 text-aqua" />
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
          </Glass>
        ))}
      </div>
      <p className="mt-7 rounded-[1.5rem] border border-aqua/20 bg-white/[0.045] p-5 text-center text-xl font-semibold text-white">
        Start with the core experience. Grow only where it creates real value.
      </p>
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
            <p className="mb-5 text-sm leading-6 text-slate-300">{phase.description}</p>
            <div className="mb-5 h-1.5 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-harbor" style={{ width: `${(index + 1) * 28}%` }} />
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
        The pilot does not need to disrupt existing systems. It can begin as a simple resident
        resource and grow from there.
      </p>
    </Section>
  );
}

function WhySection() {
  return (
    <Section id="why" eyebrow="Inside perspective" title="Built from inside the community.">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Glass className="p-7">
          <p className="text-lg leading-8 text-slate-200">
            I am not approaching this as an outside software vendor guessing what residents need. I
            live at Summer Place. I see the improvements being made, the questions residents ask, and
            the opportunity to help the community feel more guided and connected.
          </p>
          <p className="mt-5 text-lg leading-8 text-slate-200">
            Gent Ascend Collective was created to build practical technology for real local
            communities - tools that make people feel clearer, more supported, and more confident.
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

function ManagementTakeaway() {
  return (
    <Section id="takeaway" eyebrow="Management takeaway" title="What Summer Place gets.">
      <Glass strong className="p-6 md:p-8">
        <div className="grid gap-3 md:grid-cols-2">
          {managementTakeaways.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-xl bg-white/[0.055] p-4 text-sm font-semibold text-slate-100">
              <Check className="h-5 w-5 shrink-0 text-aqua" />
              {item}
            </div>
          ))}
        </div>
      </Glass>
    </Section>
  );
}

function FinalCta() {
  return (
    <section id="final" className="relative px-4 py-24 md:px-6">
      <BackgroundDetails compact />
      <Reveal>
        <div className="premium-glass-strong mx-auto max-w-5xl p-8 text-center md:p-14">
          <div className="premium-glass mx-auto mb-7 grid h-24 w-24 place-items-center rounded-[1.8rem] p-3">
            <Logo className="h-full w-full rounded-full" />
          </div>
          <h2 className="metallic-text text-4xl font-semibold leading-tight md:text-6xl">
            Summer Place can build something residents do not expect.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-200">
            A community app that makes the property feel more guided, more connected, and more cared for.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-300">
            The buildings are being improved. The communication is already stronger. The next step is
            creating a resident experience that makes people feel the difference every time they open
            their phone.
          </p>
          <a href="mailto:" className="primary-btn mx-auto mt-9 w-fit">
            Let's Build the Community Layer <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#pilot" className="secondary-btn mx-auto mt-3 w-fit px-5 py-3">
            Start With a Pilot <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-aqua/10 px-4 py-8 md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-steel md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo className="h-9 w-9 rounded-full ring-1 ring-silver/20" />
          <p className="font-semibold text-slate-200">Summer Place Community Vision</p>
        </div>
        <p>Resident experience concept by Gent Ascend Collective</p>
        <p>Built as a vision prototype for discussion and feedback.</p>
      </div>
    </footer>
  );
}

function DashboardPhone() {
  return (
    <div className="relative mx-auto w-full max-w-[430px] lg:ml-auto">
      {[
        ["Ask Summer", MessageCircle, "left-0 top-16"],
        ["Welcome System", KeyRound, "right-0 top-28"],
        ["Local Network", Store, "bottom-20 left-2"],
      ].map(([label, Icon, position], index) => (
        <motion.div
          key={label}
          className={`premium-glass absolute z-20 hidden items-center gap-2 px-4 py-3 text-sm font-semibold text-white lg:flex ${position}`}
          animate={{ y: [0, index % 2 ? 8 : -8, 0] }}
          transition={{ duration: 5 + index, repeat: Infinity }}
        >
          <Icon className="h-4 w-4 text-aqua" />
          {label}
        </motion.div>
      ))}
      <motion.div className="phone-shell mx-auto" animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity }}>
        <PhoneFrame>
          <div className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-aqua">Summer Place</p>
                <h3 className="text-2xl font-semibold text-white">Welcome home</h3>
              </div>
              <Logo className="h-12 w-12 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-3">
            {[
              ["Ask Summer", MessageCircle],
              ["Welcome System", KeyRound],
              ["Intelligence Hub", ClipboardCheck],
              ["Local Network", Store],
            ].map(([label, Icon]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.07] p-3">
                  <Icon className="mb-3 h-5 w-5 text-aqua" />
                  <p className="text-sm font-semibold text-white">{label}</p>
                </div>
              ))}
            </div>
            <PhoneCard label="Case study" title="Smoke-Free Living & Odor Respect" icon={ShieldCheck} />
            <PhoneCard label="Community Pulse" title="Property Progress Update" icon={Building2} />
            <PhoneCard label="Local network" title="SUMMERPLACE20" icon={Store} />
            <PhoneBottomNav />
          </div>
        </PhoneFrame>
      </motion.div>
    </div>
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
              <div className="ml-auto rounded-2xl rounded-tr-sm bg-harbor/20 p-3 text-sm text-white">{pillar.items[0]}</div>
              <div className="rounded-2xl rounded-tl-sm bg-white/[0.07] p-3 text-sm leading-6 text-slate-200">{pillar.items[1]}</div>
              <div className="rounded-lg border border-harbor/30 bg-harbor/12 p-3 text-sm font-semibold text-silver">{pillar.items[2]}</div>
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
          <PhoneBottomNav />
        </div>
      </PhoneFrame>
    </motion.div>
  );
}

function PhoneScreenLibrary({ screen }) {
  const screenMap = {
    home: <HomeDashboardScreen />,
    settle: <SettleInScreen />,
    guide: <GuideLibraryScreen />,
    smoke: <SmokeGuideScreen />,
    ask: <AskChatScreen />,
    community: <CommunityFeedScreen />,
    perks: <LocalPerksScreen />,
    library: <ContentLibraryScreen />,
  };
  return (
    <motion.div className="phone-shell mx-auto" key={screen} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <PhoneFrame>{screenMap[screen] || screenMap.home}</PhoneFrame>
    </motion.div>
  );
}

function PhoneScreenScaffold({ title, eyebrow, children }) {
  return (
    <div className="p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-aqua">{eyebrow}</p>
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
        </div>
        <Logo className="h-11 w-11 rounded-full" />
      </div>
      <div className="space-y-3">{children}</div>
      <PhoneBottomNav />
    </div>
  );
}

function HomeDashboardScreen() {
  return (
    <PhoneScreenScaffold title="Welcome home" eyebrow="Summer Place">
      <div className="grid grid-cols-2 gap-3">
        {["Ask Summer", "Welcome", "Guide", "Local"].map((item) => (
          <div key={item} className="rounded-2xl bg-white/[0.07] p-3 text-sm font-semibold text-white">{item}</div>
        ))}
      </div>
      <PhoneList items={["Property Progress Update", "Community Pulse", "Local Partner Perk"]} />
    </PhoneScreenScaffold>
  );
}

function SettleInScreen() {
  return (
    <PhoneScreenScaffold title="62% complete" eyebrow="Move-In Progress">
      <div className="h-2.5 rounded-full bg-white/10"><div className="h-full w-[62%] rounded-full bg-harbor" /></div>
      <PhoneList items={["Welcome to Summer Place", "First 24 Hours", "First 7 Days", "Utility Setup", "Parking", "Packages", "Trash & Bulk Trash", "Pet Expectations", "Emergency Info", "Maintenance Portal"]} />
    </PhoneScreenScaffold>
  );
}

function GuideLibraryScreen() {
  return (
    <PhoneScreenScaffold title="Resident Guide" eyebrow="Learning Hub">
      <PhoneList items={["Smoke-Free Living", "Pet Life", "Trash & Bulk Trash", "Apartment Care", "Storm Prep"]} />
    </PhoneScreenScaffold>
  );
}

function SmokeGuideScreen() {
  return (
    <PhoneScreenScaffold title="Smoke-Free Living" eyebrow="Guide Preview">
      <div className="rounded-2xl border border-aqua/20 bg-aqua/10 p-3 text-sm leading-6 text-slate-100">
        Respect the no-smoking addendum, reduce odor complaints, protect renovated units, and help residents make cleaner choices.
      </div>
      <PhoneList items={["Respect the addendum", "Why odor travels", "Protecting renovated units", "Lower-odor options", "Outdoor courtesy"]} />
    </PhoneScreenScaffold>
  );
}

function AskChatScreen() {
  return (
    <PhoneScreenScaffold title="Ask Summer" eyebrow="Resident Concierge">
      <div className="ml-auto rounded-2xl rounded-tr-sm bg-harbor/20 p-3 text-sm text-white">Where does bulk trash go?</div>
      <div className="rounded-2xl rounded-tl-sm bg-white/[0.07] p-3 text-sm leading-6 text-slate-200">
        Open Trash & Clean Community for location, timing, and what not to leave near dumpsters.
      </div>
      <button className="w-full rounded-full border border-harbor/30 bg-harbor/12 px-3 py-2 text-sm font-semibold text-silver">Open suggested guide</button>
    </PhoneScreenScaffold>
  );
}

function CommunityFeedScreen() {
  return (
    <PhoneScreenScaffold title="Community" eyebrow="Resident Feed">
      <PhoneList items={["Property Progress Update", "Resident Appreciation", "New Resident Welcome", "Storm Prep Guide", "Smoke-Free Living Case Study", "Local Partner Perk", "Community Pulse"]} />
    </PhoneScreenScaffold>
  );
}

function LocalPerksScreen() {
  return (
    <PhoneScreenScaffold title="Local Perks" eyebrow="Resident Offers">
      <PhoneList items={["Groomed Gent Co. - SUMMERPLACE20", "Local food partner", "Pet service partner", "Cleaning help", "Fitness/wellness partner"]} />
    </PhoneScreenScaffold>
  );
}

function ContentLibraryScreen() {
  return (
    <PhoneScreenScaffold title="Knowledge Base" eyebrow="Content Library">
      <PhoneList items={["New Resident", "Daily Living", "Property Protection", "Community", "Move-Out"]} />
    </PhoneScreenScaffold>
  );
}

function PhoneList({ items }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item} className="flex items-center justify-between rounded-xl bg-white/[0.06] px-3 py-2.5 text-sm text-slate-100">
          <span>{item}</span>
          <ChevronRight className="h-4 w-4 text-aqua" />
        </div>
      ))}
    </div>
  );
}

function PhoneBottomNav() {
  return (
    <div className="mt-4 grid grid-cols-4 gap-2 rounded-2xl border border-white/10 bg-white/[0.045] p-2">
      {[
        [Home, "Home"],
        [BookOpen, "Guide"],
        [MessageCircle, "Ask"],
        [Users, "Community"],
      ].map(([Icon, label]) => (
        <div key={label} className="grid place-items-center gap-1 text-[10px] text-steel">
          <Icon className="h-4 w-4 text-aqua" />
          {label}
        </div>
      ))}
    </div>
  );
}

function PhoneFrame({ children }) {
  return (
    <div className="phone-frame p-3">
      <div className="relative overflow-hidden rounded-[1.55rem] border border-silver/15 bg-gradient-to-b from-gunmetal to-midnight">
        <div className="pointer-events-none absolute inset-x-6 top-0 h-28 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center justify-between px-5 pt-3 text-[10px] font-semibold text-slate-300">
          <span>9:41</span>
          <div className="h-1.5 w-20 rounded-full bg-white/20" />
          <span>LTE</span>
        </div>
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
    <section id={id} className="section-shell relative px-4 py-20 md:px-6 md:py-28">
      <BackgroundDetails compact />
      <Reveal>
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-aqua">{eyebrow}</p>
          <h2 className="metallic-text mb-8 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">{title}</h2>
          {children}
        </div>
      </Reveal>
    </section>
  );
}

function Glass({ className = "", children, strong = false }) {
  return (
    <motion.div
      className={`${strong ? "premium-glass-strong" : "curved-glass-card"} ${className}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
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
