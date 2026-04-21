import { useRef, useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
  ArrowRight,
  Bot,
  Brain,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Code2,
  Cpu,
  Gauge,
  Globe,
  Layers,
  LineChart,
  Menu,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Workflow,
  X,
  Zap,
  ArrowUp,
} from 'lucide-react';

const navItems = [
  ['What We Build', '#what-we-build'],
  ['How It Works', '#how-it-works'],
  ['Services', '#services'],
  ['Pricing', '#pricing'],
  ['FAQ', '#faq'],
] as const;

const trustPoints = [
  ['Plain-English process', 'No buzzwords. You get clear updates, clear tradeoffs, and a working demo at every milestone.', MessageSquare],
  ['Modern, maintainable code', 'Built on current frameworks so it keeps working after launch, and anyone can pick it up later.', Code2],
  ['AI where it actually helps', 'GenAI used to save real hours (drafting, summarizing, searching your own data), not as a gimmick.', Sparkles],
  ['Honest scoping', 'If something is cheaper, simpler, or already solved off-the-shelf, we say so before you spend.', ShieldCheck],
] as const;

const reviews = [
  ['Jordan M.', 'Small business owner', 'My booking site finally looks the way I always pictured it. And I can actually update things myself now.'],
  ['Priya S.', 'Consultant', 'The AI assistant drafts client emails in my voice. Saves me hours every week.'],
  ['Marco D.', 'Nonprofit director', "We got a custom tool that replaced three spreadsheets. Our volunteers actually use it."],
  ['Alicia R.', 'Real estate agent', 'My new website gets more calls than any marketing I have ever paid for.'],
] as const;

const processSteps = [
  ['01', 'Talk it through', 'A free conversation to understand what you want, who it is for, and what success looks like.', MessageSquare],
  ['02', 'Build and review', 'You see progress in short cycles, not months of silence. Feedback shapes the next version.', Workflow],
  ['03', 'Launch and support', 'Deployed, documented, and kept running. Training included so you are not stuck.', CheckCircle2],
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
  ['Ongoing Partner', 'From $150 / month', 'Hosting, updates, small changes, and a bucket of hours each month so your site or app keeps improving.'],
] as const;

const faqs = [
  ['I do not know exactly what I want yet. Is that okay?', 'Yes. Most projects start with a conversation to figure out what would actually help. If a project is not the right fit, that is a fine outcome too.'],
  ['How long does a typical project take?', 'A simple website can launch in about a week. Custom apps and AI integrations usually run two to six weeks depending on scope.'],
  ['Can I edit the site myself after launch?', 'Yes. Sites are set up so you can update text, images, and pages without needing code. Training is included.'],
  ['Is AI actually useful for my small business?', 'Often, yes. The best fit is repetitive writing, answering common questions, or pulling information out of documents. We will tell you honestly if it is not worth it in your case.'],
  ['Who owns the code and the content?', 'You do. Everything we build is yours: code, content, accounts, and domains stay in your name.'],
  ['Do you work with clients outside the Central Coast?', 'Yes. Most of this work happens remotely, with video calls and shared demos. Local clients are welcome to meet in person.'],
] as const;

const featuredBuilds = [
  ['Personal Websites', 'Portfolios, resumes, and personal brands done right.', 'I want a personal website that represents me well.', Globe],
  ['Business Sites', 'Websites that turn visitors into customers.', 'I need a website for my business.', LineChart],
  ['AI Assistants', 'Custom chatbots and GenAI tools for your workflow.', 'I want an AI assistant built for my business.', Bot],
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

  const handleBuildSelect = (build: (typeof featuredBuilds)[number]) => {
    const [label, , prompt] = build;
    setSelectedService(label);
    setForm((current) => ({ ...current, details: prompt }));
    requestAnimationFrame(() => {
      detailsRef.current?.focus();
      detailsRef.current?.setSelectionRange(detailsRef.current.value.length, detailsRef.current.value.length);
    });
  };

  const handleServiceItemSelect = (title: string, prompt: string) => {
    setSelectedService(title);
    setForm((current) => ({ ...current, details: prompt }));
    requestAnimationFrame(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const handlePricingSelect = (name: string, price: string) => {
    setSelectedService(name);
    setForm((current) => ({ ...current, details: `I'm interested in ${name} (${price}).` }));
    requestAnimationFrame(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  return (
    <div className="min-h-screen bg-transparent pb-24 text-slate-900 lg:pb-0">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="section-shell">
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-2.5" aria-label="Sturm Technologies home">
              <img src="/techWizIcon.png" alt="" aria-hidden="true" className="h-12 w-12 object-contain" />
              <span className="text-lg font-semibold text-slate-900">Sturm Technologies</span>
            </a>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} className="nav-link whitespace-nowrap">{label}</a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                aria-label="Toggle dark mode"
              >
                <svg className="h-5 w-5 dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <svg className="h-5 w-5 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>
              <a href="tel:+18059940881" className="nav-phone whitespace-nowrap">
                <Phone className="h-4 w-4" />
                (805) 994-0881
              </a>
              <a href="#request-build" className="cta-primary text-sm py-2.5 whitespace-nowrap">
                <Calendar className="h-4 w-4" />
                Start a Project
              </a>
            </div>

            <button
              className="rounded-lg p-2 text-slate-600 lg:hidden hover:bg-slate-100"
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
          <div id="mobile-menu" className="lg:hidden bg-white border-t border-slate-100">
            <div className="section-shell py-4 space-y-1">
              {navItems.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <div className="pt-4 pb-2">
                <a href="tel:+18059940881" className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700">
                  <Phone className="h-4 w-4" />
                  Call (805) 994-0881
                </a>
                <a href="#request-build" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white" onClick={() => setIsMobileMenuOpen(false)}>
                  <Calendar className="h-4 w-4" />
                  Start a Project
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="main-content" className="pt-16 pb-24 lg:pb-0">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-amber-200/30 blur-[120px]" />
            <div className="absolute right-[-5%] bottom-[-10%] h-[400px] w-[400px] rounded-full bg-indigo-200/25 blur-[100px]" />
          </div>
          <div className="section-shell py-12 lg:py-20">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">
              <div className="max-w-2xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                  <Sparkles className="h-4 w-4" />
                  Websites · Software · Applied AI
                </div>
                <h1 className="font-display mb-5 text-4xl font-medium leading-[1.15] text-slate-900 sm:text-5xl lg:text-[3.25rem]">
                  Websites, apps, and AI built to actually help.
                </h1>
                <p className="mb-6 text-lg leading-relaxed text-slate-600 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  Custom-built websites, business software, and applied AI / GenAI tools. Clear scoping, modern code, honest pricing, from the same local team that helps Central Coast neighbors with their tech.
                </p>
                <div className="mb-8 flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                  {quickTopics.map((item) => {
                    const isActive = selectedQuickTopic === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => {
                          setSelectedQuickTopic(item);
                          setSelectedService(item);
                          setForm((current) => ({
                            ...current,
                            details: `I'm interested in a ${item.toLowerCase()}.`,
                          }));
                          requestAnimationFrame(() => {
                            detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          });
                        }}
                        className={`quick-topic-btn ${isActive ? 'quick-topic-btn-active' : ''}`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <a href="#request-build" className="cta-primary">
                    <Calendar className="h-5 w-5" />
                    Start a Project
                  </a>
                  <a href="tel:+18059940881" className="cta-secondary">
                    <Phone className="h-5 w-5" />
                    Call Now
                  </a>
                </div>
              </div>

              <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/60 aspect-[4/5]">
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-amber-400/40 blur-2xl" />
                    <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-indigo-400/40 blur-2xl" />
                  </div>
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
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                      <p className="text-sm font-medium text-slate-800">Built, shipped, and maintained by a real human.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="what-we-build" aria-labelledby="what-we-build-heading" className="py-16 lg:py-20">
          <div className="section-shell">
            <div className="mb-10 lg:mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">Why Sturm Technologies</div>
              <h2 id="what-we-build-heading" className="font-display text-3xl font-medium text-slate-900 sm:text-4xl lg:text-[2.5rem]">Software that feels built, not assembled.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {trustPoints.map(([title, desc, Icon]) => (
                <div key={title} className="modern-card group">
                  <div className="modern-card-icon">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {reviews.map(([name, location, quote]) => (
                <div key={name} className="rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-200">
                      <Star className="h-5 w-5 text-amber-700 fill-current" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <p className="mt-2 text-slate-600">&ldquo;{quote}&rdquo;</p>
                      <p className="mt-3 text-sm font-medium text-slate-900">{name} <span className="text-slate-500 font-normal">· {location}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" aria-labelledby="how-it-works-heading" className="py-16 lg:py-20">
          <div className="section-shell">
            <div className="mb-10 lg:mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">How it works</div>
              <h2 id="how-it-works-heading" className="font-display text-3xl font-medium text-slate-900 sm:text-4xl lg:text-[2.5rem]">From idea to launched, without the mystery.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {processSteps.map(([step, title, desc, Icon]) => (
                <div key={step} className="modern-card">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Step {step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <a href="#request-build" className="cta-primary">
                Start the conversation
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        <section id="services" aria-labelledby="services-heading" className="py-16 lg:py-20">
          <div className="section-shell">
            <div className="mb-10 lg:mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">What we build</div>
              <h2 id="services-heading" className="font-display text-3xl font-medium text-slate-900 sm:text-4xl lg:text-[2.5rem]">Websites, software, and AI tailored to you.</h2>
            </div>

            <div className="space-y-10">
              {serviceGroups.map((group) => (
                <div key={group.title}>
                  <div className="mb-4">
                    <h3 className="font-display text-2xl font-medium text-slate-900">{group.title}</h3>
                    <p className="mt-1 text-slate-600">{group.intro}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map(([title, desc, prompt, Icon]) => (
                      <button
                        key={title}
                        type="button"
                        onClick={() => handleServiceItemSelect(title, prompt)}
                        className={`service-card ${selectedService === title ? 'service-card-active' : ''}`}
                      >
                        <div className="service-card-icon">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                          <p className="mt-1 text-sm text-slate-600">{desc}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-slate-600">Not sure where your idea fits? <a href="#request-build" className="font-medium text-slate-900 underline">Describe it in a sentence</a> and we&apos;ll point you the right way.</p>
            </div>
          </div>
        </section>

        <section id="pricing" aria-labelledby="pricing-heading" className="py-16 lg:py-20">
          <div className="section-shell">
            <div className="mb-10 lg:mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">Pricing</div>
              <h2 id="pricing-heading" className="font-display text-3xl font-medium text-slate-900 sm:text-4xl lg:text-[2.5rem]">Fixed quotes. No surprise invoices.</h2>
              <p className="mt-3 text-lg text-slate-600">Every project gets a written scope and a fixed price before any work begins.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {pricingPlans.map(([name, price, desc], index) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handlePricingSelect(name, price)}
                  className={`pricing-card-modern relative text-left ${index === 1 ? 'pricing-card-featured-modern' : ''}`}
                >
                  {index === 1 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-900 shadow-sm">Most popular</div>
                  )}
                  <p className={`text-sm font-medium ${index === 1 ? 'text-slate-200' : 'text-slate-500'}`}>{name}</p>
                  <p className={`mt-2 text-3xl font-semibold ${index === 1 ? 'text-white' : 'text-slate-900'}`}>{price}</p>
                  <p className={`mt-3 text-sm ${index === 1 ? 'text-slate-200' : 'text-slate-600'}`}>{desc}</p>
                  <div className={`mt-5 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium ${index === 1 ? 'bg-white text-slate-900' : 'bg-amber-100 text-amber-800'}`}>Talk about this plan <ArrowRight className="h-4 w-4" /></div>
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
              <p className="text-sm text-slate-600">The initial conversation is always free. You only commit once the scope and price are in writing.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="popular-heading" className="py-16 lg:py-20">
          <div className="section-shell">
            <div className="mb-10 lg:mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">Quick starts</div>
              <h2 id="popular-heading" className="font-display text-3xl font-medium text-slate-900 sm:text-4xl lg:text-[2.5rem]">Popular projects.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBuilds.map((build) => {
                const [label, desc, , Icon] = build;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleBuildSelect(build)}
                    className={`service-card ${selectedService === label ? 'service-card-active' : ''}`}
                  >
                    <div className="service-card-icon">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-slate-900">{label}</h3>
                      <p className="mt-1 text-sm text-slate-600">{desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section id="request-build" aria-labelledby="request-heading" className="py-16 lg:py-20">
          <div className="section-shell">
            <div className="mx-auto max-w-2xl">
              <div className="mb-6 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">Start a project</div>
                <h2 id="request-heading" className="font-display text-3xl font-medium text-slate-900 sm:text-4xl">Tell us what you have in mind.</h2>
                <p className="mt-3 text-lg text-slate-600">One or two sentences is plenty to get started. We&apos;ll reply with next steps, not a sales pitch.</p>
              </div>
              <form className="mt-8 space-y-4" onSubmit={handleSubmit} aria-label="Start a project" noValidate>
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
                  <div><label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">Phone <span className="text-slate-400 font-normal">(optional)</span></label><input type="tel" id="phone" name="phone" autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="(555) 123-4567" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900" /></div>
                  <div><label htmlFor="company" className="mb-1.5 block text-sm font-medium text-slate-700">Business / project name <span className="text-slate-400 font-normal">(optional)</span></label><input type="text" id="company" name="company" autoComplete="organization" value={form.company} onChange={handleChange} placeholder="Acme Co." className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900" /></div>
                </div>
                <div><label htmlFor="contact" className="mb-1.5 block text-sm font-medium text-slate-700">Best contact</label><select id="contact" name="contact" value={form.contact} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900"><option value="email">Email</option><option value="phone call">Phone call</option><option value="text message">Text message</option><option value="either one">Any of the above</option></select></div>
                <div><label htmlFor="details" className="mb-1.5 block text-sm font-medium text-slate-700">What do you want to build? <span className="text-amber-600">*</span></label><textarea ref={detailsRef} id="details" name="details" value={form.details} onChange={handleChange} rows={5} placeholder="Example: I need a website for my consulting business, plus an AI assistant that drafts client follow-up emails." className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base leading-relaxed text-slate-900" required /></div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="cta-primary flex-1 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={submitState === 'submitting'}
                    aria-busy={submitState === 'submitting'}
                  >
                    <Send className="h-5 w-5" />
                    {submitState === 'submitting' ? 'Sending…' : 'Send Inquiry'}
                  </button>
                  <a href="tel:+18059940881" className="cta-secondary flex-1 justify-center">
                    <Phone className="h-5 w-5" />
                    Call Now
                  </a>
                </div>
                {submitState === 'success' && (
                  <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-base text-emerald-800">
                    Thanks{form.name ? `, ${form.name}` : ''}. We&apos;ll reply within one business day.
                  </div>
                )}
                {submitState === 'error' && (
                  <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-base text-red-800">
                    Something went wrong sending that. Email <a href="mailto:calvinsturm@gmail.com" className="underline font-medium">calvinsturm@gmail.com</a> directly or call <a href="tel:+18059940881" className="underline font-medium">(805) 994-0881</a>.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-heading" className="py-16 lg:py-20">
          <div className="section-shell">
            <div className="mb-10 lg:mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">FAQ</div>
              <h2 id="faq-heading" className="font-display text-3xl font-medium text-slate-900 sm:text-4xl lg:text-[2.5rem]">Common questions.</h2>
            </div>

            <div className="space-y-3">
              {faqs.map(([question, answer], index) => (
                <div
                  key={question}
                  className={`faq-item-modern ${openFaq === index ? 'faq-item-open' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="faq-btn-modern w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-btn-${index}`}
                  >
                    <span className="text-lg font-medium text-slate-900">{question}</span>
                    <ChevronDown className={`h-5 w-5 text-slate-400 shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-btn-${index}`}
                    className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="px-5 pb-4 text-slate-600">{answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="section-shell">
            <div className="rounded-3xl bg-slate-900 px-6 py-12 text-center lg:px-12 lg:py-16">
              <h2 className="font-display text-3xl font-medium text-white sm:text-4xl">Ready to build something?</h2>
              <p className="mt-4 text-lg text-slate-300">Send a short description. You&apos;ll hear back within one business day with real next steps.</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
                <a href="#request-build" className="cta-primary">
                  <Calendar className="h-5 w-5" />
                  Start a Project
                </a>
                <a href="tel:+18059940881" className="cta-secondary">
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="section-shell">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <img src="/techWizIcon.png" alt="Sturm Technologies" className="h-10 w-10 object-contain" />
                <span className="text-lg font-semibold text-slate-900">Sturm Technologies</span>
              </div>
              <p className="text-sm text-slate-600">Websites, custom software, and applied AI, built on California&apos;s Central Coast and delivered anywhere.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Explore</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {navItems.map(([label, href]) => (
                  <li key={href}><a href={href} className="hover:text-slate-900">{label}</a></li>
                ))}
                <li><a href="/" className="hover:text-slate-900">In-home tech support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Contact</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="tel:+18059940881" className="font-medium text-slate-900">(805) 994-0881</a></li>
                <li><a href="mailto:calvinsturm@gmail.com" className="hover:text-slate-900">calvinsturm@gmail.com</a></li>
                <li><a href="#request-build" className="hover:text-slate-900">Start a project</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Sturm Technologies LLC. Websites, software, and AI built with care.
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

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 p-4 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
        <div className="flex gap-3">
          <a href="tel:+18059940881" className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-4 text-base font-semibold text-white min-h-[52px]"><Phone className="h-5 w-5" />Call</a>
          <a href="#request-build" className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base font-semibold text-slate-900 min-h-[52px]"><Calendar className="h-5 w-5" />Start</a>
        </div>
      </div>
    </div>
  );
}
