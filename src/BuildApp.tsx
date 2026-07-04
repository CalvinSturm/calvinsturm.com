import { useRef, useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Bot,
  Brain,
  Calendar,
  CheckCircle2,
  Code2,
  Cpu,
  Gauge,
  Globe,
  Layers,
  Menu,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
  Zap,
} from 'lucide-react';

const navItems = [
  ['Why', '#what-we-build'],
  ['How it works', '#how-it-works'],
  ['Services', '#services'],
  ['Pricing', '#pricing'],
  ['FAQ', '#faq'],
] as const;

const trustPoints = [
  ['Plain-English process', 'No buzzwords. You get clear updates, clear tradeoffs, and a working demo at every milestone.', MessageSquare],
  ['Modern, maintainable code', 'Built on current frameworks so it keeps working after launch, and anyone can pick it up later.', Code2],
  ['AI where it actually helps', 'GenAI used to save real hours: drafting, summarizing, searching your own data, not as a gimmick.', Sparkles],
  ['Honest scoping', 'If something is cheaper, simpler, or already solved off-the-shelf, we say so before you spend.', ShieldCheck],
  ['Products, not just projects', 'Sturm Technologies ships its own software: the Fast Series of native Windows creator tools, with public releases on GitHub.', Zap],
] as const;

const reviews = [
  ['My booking site finally looks the way I always pictured it. And I can actually update things myself now.', 'Jordan M.', 'Small business owner'],
  ['The AI assistant drafts client emails in my voice. Saves me hours every week.', 'Priya S.', 'Consultant'],
  ['We got a custom tool that replaced three spreadsheets. Our volunteers actually use it.', 'Marco D.', 'Nonprofit director'],
  ['My new website gets more calls than any marketing I have ever paid for.', 'Alicia R.', 'Real estate agent'],
] as const;

const processSteps = [
  ['01', 'Talk it through', 'A free conversation to understand what you want, who it is for, and what success looks like.'],
  ['02', 'Build and review', 'You see progress in short cycles, not months of silence. Feedback shapes the next version.'],
  ['03', 'Launch and support', 'Deployed, documented, and kept running. Training included so you are not stuck.'],
] as const;

const serviceGroups = [
  {
    title: 'Websites',
    intro: 'For people and businesses who want a site that actually represents them.',
    items: [
      ['Personal & portfolio sites', 'Clean, modern sites for creators, professionals, and personal brands.', 'I want a personal or portfolio website that represents my work well.', Globe],
      ['Small business websites', 'Service pages, booking, contact forms, and the search visibility to get found.', 'I need a website for my small business with contact, services, and booking.', Layers],
    ],
  },
  {
    title: 'Applications & software',
    intro: 'Custom tools that fit how you actually work.',
    items: [
      ['Web applications', 'Dashboards, booking systems, client portals, internal tools. Browser-based and fast.', 'I need a custom web app or internal tool for my business.', Terminal],
      ['Desktop & mobile apps', 'Native-feeling applications for Windows, macOS, iOS, and Android when a website is not enough.', 'I need a desktop or mobile application built.', Cpu],
    ],
  },
  {
    title: 'Applied AI & GenAI',
    intro: 'AI features that pay for themselves in saved hours.',
    items: [
      ['AI chatbots & assistants', 'Chat agents trained on your documents, website, or workflow to answer questions and handle tasks.', 'I want an AI chatbot or assistant trained on my own content.', Bot],
      ['Workflow & document automation', 'GenAI that drafts emails, summarizes meetings, extracts data from PDFs, and more.', 'I want AI to automate repetitive writing or document work in my business.', Brain],
      ['Custom AI integrations', 'Plug Claude, GPT, or open models into your existing tools and data, securely.', 'I want AI integrated into a tool or workflow I already use.', Zap],
    ],
  },
] as const;

const pricingPlans = [
  ['Starter Site', 'From $900', 'A clean one- to three-page website for a personal brand, portfolio, or simple business presence. Launch in about a week.'],
  ['Custom Build', 'From $2,500', 'Larger websites, custom web apps, or a first AI feature. Scoped per project with a fixed price before we start.'],
  ['Ongoing Partner', 'From $150 / mo', 'Hosting, updates, small changes, and a bucket of hours each month so your site or app keeps improving.'],
] as const;

const faqs = [
  ['I do not know exactly what I want yet. Is that okay?', 'Yes. Most projects start with a conversation to figure out what would actually help. If a project is not the right fit, that is a fine outcome too.'],
  ['How long does a typical project take?', 'A simple website can launch in about a week. Custom apps and AI integrations usually run two to six weeks depending on scope.'],
  ['Can I edit the site myself after launch?', 'Yes. Sites are set up so you can update text, images, and pages without needing code. Training is included.'],
  ['Is AI actually useful for my small business?', 'Often, yes. The best fit is repetitive writing, answering common questions, or pulling information out of documents. We will tell you honestly if it is not worth it in your case.'],
  ['Who owns the code and the content?', 'You do. Everything we build is yours: code, content, accounts, and domains stay in your name.'],
  ['Do you work with clients outside the Central Coast?', 'Yes. Most of this work happens remotely, with video calls and shared demos. Local clients are welcome to meet in person.'],
] as const;

const quickTopics = ['Personal website', 'Business website', 'Custom app', 'AI chatbot', 'Document automation'] as const;

type RequestForm = { name: string; phone: string; email: string; company: string; contact: string; details: string; website: string };

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function BuildApp() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('theme');
      if (!saved) setIsDark(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedQuickTopic, setSelectedQuickTopic] = useState<string | null>(null);
  const [form, setForm] = useState<RequestForm>({ name: '', phone: '', email: '', company: '', contact: 'email', details: '', website: '' });
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const detailsRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? -1 : index);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (submitState === 'success' || submitState === 'error') setSubmitState('idle');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === 'submitting') return;
    if (form.website) {
      setSubmitState('success');
      return;
    }
    setSubmitState('submitting');
    try {
      const response = await fetch('https://formsubmit.co/ajax/calvinsturm@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New build inquiry from ${form.name || 'website visitor'}`,
          _template: 'table',
          _captcha: 'false',
          name: form.name,
          phone: form.phone,
          email: form.email,
          company: form.company,
          contact: form.contact,
          details: form.details,
        }),
      });
      if (!response.ok) throw new Error('submit failed');
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  };

  const scrollToDetails = () => {
    requestAnimationFrame(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const handleServiceItemSelect = (title: string, prompt: string) => {
    setSelectedService(title);
    setForm((current) => ({ ...current, details: prompt }));
    scrollToDetails();
  };

  const handlePricingSelect = (name: string, price: string) => {
    setSelectedService(name);
    setForm((current) => ({ ...current, details: `I'm interested in ${name} (${price}).` }));
    scrollToDetails();
  };

  const handleQuickTopic = (item: string) => {
    setSelectedQuickTopic(item);
    setSelectedService(item);
    setForm((current) => ({ ...current, details: `I'm interested in a ${item.toLowerCase()}.` }));
    scrollToDetails();
  };

  return (
    <div className="min-h-screen bg-transparent pb-24 text-slate-900 lg:pb-0">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-[#fbf8f3]/80 backdrop-blur-md">
        <div className="section-shell">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-2.5" aria-label="Sturm Technologies home">
              <img src="/sturm-mark.svg" alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
              <span className="font-display text-xl text-slate-900">Sturm Technologies</span>
            </a>

            <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} className="nav-link whitespace-nowrap">{label}</a>
              ))}
              <a href="/projects" className="nav-link inline-flex items-center gap-1.5 whitespace-nowrap text-slate-700">
                <Code2 className="h-3.5 w-3.5 text-amber-500" />
                Projects
              </a>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <button
                onClick={() => setIsDark(!isDark)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Toggle dark mode"
              >
                <svg className="h-5 w-5 dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <svg className="hidden h-5 w-5 dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>
              <a href="tel:+18059940881" className="nav-phone whitespace-nowrap">
                <Phone className="h-4 w-4" />
                (805) 994-0881
              </a>
              <a href="#request-build" className="cta-primary py-2.5 text-sm whitespace-nowrap">
                Start a project
              </a>
            </div>

            <button
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div id="mobile-menu" className="border-t border-slate-200 bg-[#fbf8f3] lg:hidden">
            <div className="section-shell space-y-1 py-4">
              {navItems.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <a href="/projects" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-100">
                <Code2 className="h-4 w-4 text-amber-500" />
                Projects
              </a>
              <div className="pt-4 pb-2">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700"
                >
                  {isDark ? 'Light mode' : 'Dark mode'}
                </button>
                <a href="tel:+18059940881" className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700">
                  <Phone className="h-4 w-4" />
                  Call (805) 994-0881
                </a>
                <a href="#request-build" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white" onClick={() => setIsMobileMenuOpen(false)}>
                  <Calendar className="h-4 w-4" />
                  Start a project
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="main-content" className="pt-16 pb-24 lg:pb-0">
        {/* ---- Hero ---- */}
        <section className="section-shell py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow-amber animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
                Websites · Software · Applied AI
              </p>
              <h1
                className="font-display mt-5 text-[2.75rem] leading-[1.05] text-slate-900 animate-fade-in-up sm:text-6xl lg:text-[4rem]"
                style={{ animationDelay: '0.1s' }}
              >
                Websites, apps, and AI built to actually help.
              </h1>
              <p
                className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 animate-fade-in-up"
                style={{ animationDelay: '0.15s' }}
              >
                Custom-built websites, business software, and applied AI / GenAI tools. Clear scoping, modern code, honest pricing, from the developer behind the Fast Series of native Windows creator tools.
              </p>
              <div className="mt-8 flex flex-col gap-3 animate-fade-in-up sm:flex-row" style={{ animationDelay: '0.2s' }}>
                <a href="#request-build" className="cta-primary">
                  <Calendar className="h-5 w-5" />
                  Start a project
                </a>
                <a href="tel:+18059940881" className="cta-secondary">
                  <Phone className="h-5 w-5" />
                  (805) 994-0881
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                <span className="text-sm font-medium text-slate-400">Popular:</span>
                {quickTopics.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={selectedQuickTopic === item}
                    onClick={() => handleQuickTopic(item)}
                    className={`quick-topic-btn ${selectedQuickTopic === item ? 'quick-topic-btn-active' : ''}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in-up lg:col-span-5" style={{ animationDelay: '0.2s' }}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.25)]">
                <div className="pointer-events-none absolute -right-10 top-10 h-40 w-40 rounded-full bg-amber-400/20 blur-3xl" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur"><Globe className="h-3.5 w-3.5" /> Websites</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur"><Terminal className="h-3.5 w-3.5" /> Apps</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur"><Bot className="h-3.5 w-3.5" /> AI</span>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Cpu className="h-3.5 w-3.5" />
                        <span>Custom AI assistant</span>
                      </div>
                      <p className="mt-1 text-sm text-white">&ldquo;Draft a reply to this client in my voice.&rdquo;</p>
                    </div>
                    <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Gauge className="h-3.5 w-3.5" />
                        <span>Launch-ready site</span>
                      </div>
                      <p className="mt-1 text-sm text-white">Modern, fast, and easy to edit yourself.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-3 shadow-md">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-600" />
                    <p className="text-sm font-medium text-slate-800">Built, shipped, and maintained by a real human.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Why ---- */}
        <section id="what-we-build" aria-labelledby="what-we-build-heading" className="border-t border-slate-200">
          <div className="section-shell py-16 lg:py-24">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="eyebrow-amber">Why Sturm Technologies</p>
                <h2 id="what-we-build-heading" className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">
                  Software that feels built, not assembled.
                </h2>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <dl>
                  {trustPoints.map(([title, desc, Icon], index) => (
                    <div key={title} className={`flex gap-5 py-6 ${index > 0 ? 'border-t border-slate-200' : ''}`}>
                      <Icon className="mt-1 h-6 w-6 shrink-0 text-amber-600" />
                      <div>
                        <dt className="text-lg font-semibold text-slate-900">{title}</dt>
                        <dd className="mt-1.5 leading-relaxed text-slate-600">{desc}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {reviews.map(([quote, name, location]) => (
                <figure key={name}>
                  <blockquote className="font-display text-2xl leading-snug text-slate-800">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-medium text-slate-500">
                    {name} <span className="text-slate-400">· {location}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ---- How it works ---- */}
        <section id="how-it-works" aria-labelledby="how-it-works-heading" className="border-t border-slate-200">
          <div className="section-shell py-16 lg:py-24">
            <div className="max-w-2xl">
              <p className="eyebrow-amber">How it works</p>
              <h2 id="how-it-works-heading" className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">
                From idea to launched, without the mystery.
              </h2>
            </div>
            <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-0">
              {processSteps.map(([step, title, desc], index) => (
                <li key={step} className={`sm:px-8 sm:first:pl-0 ${index > 0 ? 'sm:border-l sm:border-slate-200' : ''}`}>
                  <span className="font-display text-5xl text-amber-500/90">{step}</span>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{desc}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12">
              <a href="#request-build" className="cta-primary">
                Start the conversation
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        {/* ---- Services ---- */}
        <section id="services" aria-labelledby="services-heading" className="border-t border-slate-200">
          <div className="section-shell py-16 lg:py-24">
            <div className="max-w-2xl">
              <p className="eyebrow-amber">What we build</p>
              <h2 id="services-heading" className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">
                Websites, software, and AI tailored to you.
              </h2>
            </div>

            <div className="mt-10 space-y-12">
              {serviceGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="font-display text-2xl text-slate-900">{group.title}</h3>
                  <p className="mt-1 text-slate-600">{group.intro}</p>
                  <ul className="mt-4 border-b border-slate-200">
                    {group.items.map(([title, desc, prompt, Icon]) => (
                      <li key={title}>
                        <button
                          type="button"
                          onClick={() => handleServiceItemSelect(title, prompt)}
                          className={`edit-row group ${selectedService === title ? 'edit-row-active' : ''}`}
                        >
                          <Icon className="mt-0.5 h-6 w-6 shrink-0 text-slate-400 transition-colors group-hover:text-amber-600" />
                          <span className="min-w-0 flex-1">
                            <span className="font-display block text-xl text-slate-900 sm:text-2xl">{title}</span>
                            <span className="mt-1 block text-slate-600">{desc}</span>
                          </span>
                          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-600" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-8 text-slate-600">
              Not sure where your idea fits? <a href="#request-build" className="font-medium text-slate-900 underline decoration-amber-400 underline-offset-4">Describe it in a sentence</a> and we&apos;ll point you the right way.
            </p>
          </div>
        </section>

        {/* ---- Pricing ---- */}
        <section id="pricing" aria-labelledby="pricing-heading" className="border-t border-slate-200">
          <div className="section-shell py-16 lg:py-24">
            <div className="max-w-2xl">
              <p className="eyebrow-amber">Pricing</p>
              <h2 id="pricing-heading" className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">Fixed quotes. No surprise invoices.</h2>
              <p className="mt-4 text-lg text-slate-600">Every project gets a written scope and a fixed price before any work begins.</p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {pricingPlans.map(([name, price, desc], index) => {
                const featured = index === 1;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => handlePricingSelect(name, price)}
                    className={`group relative flex flex-col rounded-2xl border p-6 text-left transition-all duration-200 hover:-translate-y-1 ${
                      featured
                        ? 'border-slate-900 bg-slate-900 text-white shadow-[0_20px_50px_rgba(15,23,42,0.25)]'
                        : 'border-slate-200 bg-white hover:border-amber-300'
                    }`}
                  >
                    {featured && (
                      <span className="absolute -top-3 left-6 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-900">
                        Most popular
                      </span>
                    )}
                    <span className={`text-sm font-medium ${featured ? 'text-slate-300' : 'text-slate-500'}`}>{name}</span>
                    <span className={`font-display mt-3 text-3xl ${featured ? 'text-white' : 'text-slate-900'}`}>{price}</span>
                    <span className={`mt-3 flex-1 text-sm leading-relaxed ${featured ? 'text-slate-300' : 'text-slate-600'}`}>{desc}</span>
                    <span className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${featured ? 'text-amber-300' : 'text-amber-700'}`}>
                      Talk about this plan
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-sm text-slate-500">The initial conversation is always free. You only commit once the scope and price are in writing.</p>
          </div>
        </section>

        {/* ---- Request build ---- */}
        <section id="request-build" aria-labelledby="request-heading" className="border-t border-slate-200">
          <div className="section-shell py-16 lg:py-24">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="eyebrow-amber">Start a project</p>
                <h2 id="request-heading" className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">Tell us what you have in mind.</h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  One or two sentences is plenty to get started. We&apos;ll reply with next steps, not a sales pitch, usually within one business day.
                </p>
                <a href="tel:+18059940881" className="mt-6 inline-flex items-center gap-2 font-display text-2xl text-slate-900 hover:text-amber-700">
                  <Phone className="h-5 w-5 text-amber-600" />
                  (805) 994-0881
                </a>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <form className="space-y-4" onSubmit={handleSubmit} aria-label="Start a project" noValidate>
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">Your name <span className="text-amber-600">*</span></label><input type="text" id="name" name="name" autoComplete="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900" required /></div>
                    <div><label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">Email <span className="text-amber-600">*</span></label><input type="email" id="email" name="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900" required /></div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">Phone <span className="font-normal text-slate-400">(optional)</span></label><input type="tel" id="phone" name="phone" autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="(555) 123-4567" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900" /></div>
                    <div><label htmlFor="company" className="mb-1.5 block text-sm font-medium text-slate-700">Business / project name <span className="font-normal text-slate-400">(optional)</span></label><input type="text" id="company" name="company" autoComplete="organization" value={form.company} onChange={handleChange} placeholder="Acme Co." className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900" /></div>
                  </div>
                  <div><label htmlFor="contact" className="mb-1.5 block text-sm font-medium text-slate-700">Best contact</label><select id="contact" name="contact" value={form.contact} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900"><option value="email">Email</option><option value="phone call">Phone call</option><option value="text message">Text message</option><option value="either one">Any of the above</option></select></div>
                  <div><label htmlFor="details" className="mb-1.5 block text-sm font-medium text-slate-700">What do you want to build? <span className="text-amber-600">*</span></label><textarea ref={detailsRef} id="details" name="details" value={form.details} onChange={handleChange} rows={5} placeholder="Example: I need a website for my consulting business, plus an AI assistant that drafts client follow-up emails." className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base leading-relaxed text-slate-900" required /></div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      className="cta-primary flex-1 justify-center disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={submitState === 'submitting'}
                      aria-busy={submitState === 'submitting'}
                    >
                      <Send className="h-5 w-5" />
                      {submitState === 'submitting' ? 'Sending…' : 'Send inquiry'}
                    </button>
                    <a href="tel:+18059940881" className="cta-secondary flex-1 justify-center">
                      <Phone className="h-5 w-5" />
                      Call now
                    </a>
                  </div>
                  {submitState === 'success' && (
                    <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-base text-emerald-800">
                      Thanks{form.name ? `, ${form.name}` : ''}. We&apos;ll reply within one business day.
                    </div>
                  )}
                  {submitState === 'error' && (
                    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-base text-red-800">
                      Something went wrong sending that. Email <a href="mailto:calvinsturm@gmail.com" className="font-medium underline">calvinsturm@gmail.com</a> directly or call <a href="tel:+18059940881" className="font-medium underline">(805) 994-0881</a>.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section id="faq" aria-labelledby="faq-heading" className="border-t border-slate-200">
          <div className="section-shell py-16 lg:py-24">
            <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="eyebrow-amber">FAQ</p>
                <h2 id="faq-heading" className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">Common questions.</h2>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <div className="border-b border-slate-200">
                  {faqs.map(([question, answer], index) => {
                    const open = openFaq === index;
                    return (
                      <div key={question} className="border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => toggleFaq(index)}
                          className="flex w-full items-center justify-between gap-6 py-5 text-left"
                          aria-expanded={open}
                          aria-controls={`faq-panel-${index}`}
                          id={`faq-btn-${index}`}
                        >
                          <span className="text-lg font-medium text-slate-900">{question}</span>
                          <span className="mt-0.5 shrink-0 text-amber-600">
                            {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                          </span>
                        </button>
                        <div
                          id={`faq-panel-${index}`}
                          role="region"
                          aria-labelledby={`faq-btn-${index}`}
                          className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <p className="pb-5 pr-10 leading-relaxed text-slate-600">{answer}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Final CTA (dark band) ---- */}
        <section className="bg-slate-900">
          <div className="section-shell py-16 text-center lg:py-24">
            <h2 className="font-display text-3xl text-white sm:text-4xl">Ready to build something?</h2>
            <p className="mt-4 text-lg text-slate-400">Send a short description. You&apos;ll hear back within one business day with real next steps.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#request-build" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3.5 font-semibold text-[#1f1003] transition-colors hover:bg-amber-300">
                <Calendar className="h-5 w-5" />
                Start a project
              </a>
              <a href="tel:+18059940881" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10">
                <Phone className="h-5 w-5" />
                Call now
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-14">
        <div className="section-shell">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="mb-3 flex items-center gap-2.5">
                <img src="/sturm-mark.svg" alt="Sturm Technologies" className="h-9 w-9 object-contain" />
                <span className="font-display text-xl text-slate-900">Sturm Technologies</span>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-slate-600">Websites, custom software, and applied AI, built on California&apos;s Central Coast and delivered anywhere.</p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Explore</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {navItems.map(([label, href]) => (
                  <li key={href}><a href={href} className="hover:text-slate-900">{label}</a></li>
                ))}
                <li><a href="/fast-series" className="hover:text-slate-900">Fast Series</a></li>
                <li><a href="/projects" className="hover:text-slate-900">Projects</a></li>
                <li><a href="/tech-support" className="hover:text-slate-900">Local tech support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Contact</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="tel:+18059940881" className="font-medium text-slate-900">(805) 994-0881</a></li>
                <li><a href="mailto:calvinsturm@gmail.com" className="hover:text-slate-900">calvinsturm@gmail.com</a></li>
                <li><a href="#request-build" className="hover:text-slate-900">Start a project</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
            © {new Date().getFullYear()} Sturm Technologies LLC · Websites, software, and AI built with care.
          </div>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed right-4 z-40 h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-opacity duration-200 hover:bg-slate-800 lg:right-6 ${showBackToTop ? 'flex opacity-100' : 'hidden opacity-0'} bottom-24 lg:bottom-6`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-[#fbf8f3]/95 p-4 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
        <div className="flex gap-3">
          <a href="tel:+18059940881" className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-4 text-base font-semibold text-white"><Phone className="h-5 w-5" />Call</a>
          <a href="#request-build" className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base font-semibold text-slate-900"><Calendar className="h-5 w-5" />Start</a>
        </div>
      </div>
    </div>
  );
}
