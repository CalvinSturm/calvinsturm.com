import { useRef, useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clapperboard,
  Download,
  HardDrive,
  MapPin,
  Menu,
  Minus,
  MonitorSmartphone,
  Phone,
  Plus,
  Printer,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Wifi,
  Wrench,
  X,
} from 'lucide-react';

const navItems = [
  ['Why', '#why-book'],
  ['How it works', '#how-it-works'],
  ['Services', '#services'],
  ['Pricing', '#pricing'],
  ['FAQ', '#faq'],
] as const;

const trustPoints = [
  ['Patient, plain-English help', 'Questions are welcome. The explanation should make sense before the visit is over.', ShieldCheck],
  ['Help where the problem happens', 'Wi-Fi, printers, TVs, and smart-home issues get solved in the room where they break down.', MapPin],
  ['Family can join in', 'A spouse, adult child, or caregiver can be there in person or by phone so everyone stays aligned.', Phone],
  ['No surprise add-ons', 'If something extra is needed, you hear about it before any money is spent.', Calendar],
] as const;

const reviews = [
  ['The printer was finally working again before family came over, and everything was explained in a way that made sense.', 'Mary F.', 'Nipomo'],
  ['He fixed the Wi-Fi and took the time to walk me through what he did. No confusing tech talk.', 'Greg S.', 'Grover Beach'],
] as const;

const processSteps = [
  ['01', 'Reach out in plain language', 'Call or request a callback with a simple description of what feels off.'],
  ['02', 'Get help at home', 'The issue gets worked on where it happens, with calm explanations as things are fixed.'],
  ['03', 'Leave feeling lighter', 'You get a working solution, the next step if one exists, and fewer lingering headaches.'],
] as const;

const services = [
  ['Wi-Fi and internet problems', 'Dead zones, dropped connections, slow speeds, and unstable routers.', 'My Wi-Fi keeps dropping in parts of the house and I need help getting it stable again.', Wifi],
  ['New device setup', 'Phones, tablets, laptops, TVs, and printers set up to feel usable right away.', 'I need help setting up a new device and making sure everything works together at home.', MonitorSmartphone],
  ['Computer cleanup', 'Speed up a sluggish computer, remove unwanted software, and sort out routine glitches.', 'My computer has gotten slow and I need help cleaning it up and fixing a few issues.', Wrench],
  ['Printer, email, and login help', 'Printer connections, password confusion, and email settings that keep breaking.', 'I need help with printer setup, email problems, or logins that keep failing.', Printer],
  ['Virus and malware removal', 'Check a computer for viruses, malware, and pop-ups, then clean it up and get it running normally again.', 'I think my computer may have a virus or malware and I need help checking it and cleaning it up.', ShieldAlert],
  ['Photos and backup help', 'Protect family photos, important documents, and the files that matter most.', 'I want help backing up family photos and important documents before something gets lost.', HardDrive],
  ['Smart home and safety setup', 'Doorbells, cameras, thermostats, and streaming devices configured with privacy in mind.', 'I need help setting up smart home devices and making sure they are configured safely.', ShieldCheck],
  ['Software setup and updates', 'Get the programs you actually use installed, updated, and working together, and clear out the ones you do not.', 'I need help installing or setting up software and getting my programs working properly.', Download],
  ['Creator and workflow help', 'Recording, video, audio, and productivity tools set up so your projects and files stop fighting you.', 'I need help setting up my recording, video, or productivity tools and organizing my workflow.', Clapperboard],
  ['Small business tech help', 'Practical help for home offices and small shops: computers, printers, email, and backups that just work.', 'I run a small business and need practical help with our everyday computers, printers, or email.', Briefcase],
] as const;

const pricingPlans = [
  ['Quick Help', 'Starting at $79', 'Printer issues, password help, email setup, or a shorter troubleshooting visit.'],
  ['In-Home Visit', 'Starting at $149', 'Wi-Fi, new computers, smart TVs, virus and malware cleanup, and more involved home tech.'],
  ['Care Plan', '$39 / month', 'Priority scheduling, routine checkups, and ongoing peace of mind for the whole household.'],
] as const;

const faqs = [
  ['Do I need to unplug anything or bring my computer somewhere?', 'No. This service is built around house calls, so the goal is to make things easier on you, not harder.'],
  ['What if I am not sure how to describe the problem?', 'That is normal. A simple explanation like "the printer stopped working" is enough to get started.'],
  ['Can a family member or caregiver join the visit?', 'Yes. They can be there in person or join by phone if that makes the visit more comfortable.'],
  ['Will I be pushed into buying new devices?', 'No surprise upselling. If replacement is the best option, it should be explained clearly before you spend anything.'],
] as const;

const quickTopics = ['Wi-Fi trouble', 'Printer help', 'Virus or malware check', 'New device setup', 'Smart TV setup'] as const;

const serviceArea = ['Arroyo Grande', 'Grover Beach', 'Pismo Beach', 'Shell Beach', 'Avila Beach', 'Santa Maria', 'Orcutt', 'Lompoc'] as const;

type RequestForm = { name: string; phone: string; email: string; city: string; contact: string; details: string };

export default function App() {
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
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('theme');
      if (!saved) {
        setIsDark(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [form, setForm] = useState<RequestForm>({ name: '', phone: '', email: '', city: '', contact: 'phone call', details: '' });
  const [openFaq, setOpenFaq] = useState<number>(0);
  const detailsRef = useRef<HTMLTextAreaElement | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (isSubmitted) setIsSubmitted(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await fetch('https://formsubmit.co/ajax/calvinasturm@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Callback request from ${form.name || 'website visitor'}`,
          _template: 'table',
          _captcha: 'false',
          name: form.name,
          phone: form.phone,
          email: form.email,
          city: form.city,
          contact: form.contact,
          details: form.details,
        }),
      });
    } catch {
      // swallow — still show confirmation so user isn't stranded
    }
    setIsSubmitted(true);
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
    setSelectedService(item);
    setForm((current) => ({ ...current, details: current.details || `I need help with ${item.toLowerCase()}.` }));
    scrollToDetails();
  };

  return (
    <div className="min-h-screen bg-transparent pb-24 text-slate-900 md:pb-0">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-[#fbf8f3]/80 backdrop-blur-md">
        <div className="section-shell">
          <div className="flex h-16 items-center justify-between">
            <a href="/tech-support" className="flex items-center gap-2.5" aria-label="Tech Wiz home">
              <img src="/techWizIcon.png" alt="" aria-hidden="true" className="h-11 w-11 object-contain" />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-xl text-slate-900">Tech Wiz</span>
                <span className="text-[11px] font-medium tracking-wide text-slate-500">by Sturm Technologies</span>
              </span>
            </a>

            <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} className="nav-link">{label}</a>
              ))}
              <a href="/" className="nav-link inline-flex items-center gap-1.5 text-slate-700">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                Sturm Technologies
              </a>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
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
              <a href="tel:+18059940881" className="nav-phone">
                <Phone className="h-4 w-4" />
                (805) 994-0881
              </a>
              <a href="#request-help" className="cta-primary py-2.5 text-sm">
                Request callback
              </a>
            </div>

            <button
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
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
          <div id="mobile-menu" className="border-t border-slate-200 bg-[#fbf8f3] md:hidden">
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
              <a
                href="/"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-100"
              >
                <Sparkles className="h-4 w-4 text-amber-500" />
                Sturm Technologies
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
                <a href="#request-help" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white" onClick={() => setIsMobileMenuOpen(false)}>
                  <Calendar className="h-4 w-4" />
                  Request callback
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="main-content" className="pt-16 pb-24 md:pb-0">
        {/* ---- Hero ---- */}
        <section className="section-shell py-16 lg:py-24">
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow-amber animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
                Central Coast · In-home tech help · A Sturm Technologies service
              </p>
              <h1
                className="font-display mt-5 text-[2.75rem] leading-[1.05] text-slate-900 animate-fade-in-up sm:text-6xl lg:text-7xl"
                style={{ animationDelay: '0.1s' }}
              >
                Tech support that comes to you.
              </h1>
              <p
                className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 animate-fade-in-up"
                style={{ animationDelay: '0.15s' }}
              >
                No jargon. No confusion. Just patient, local help for Wi-Fi, printers, devices, and everyday tech, right at your kitchen table.
              </p>
              <div className="mt-8 flex flex-col gap-3 animate-fade-in-up sm:flex-row" style={{ animationDelay: '0.2s' }}>
                <a href="#request-help" className="cta-primary">
                  <Calendar className="h-5 w-5" />
                  Request a callback
                </a>
                <a href="tel:+18059940881" className="cta-secondary">
                  <Phone className="h-5 w-5" />
                  (805) 994-0881
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                <span className="text-sm font-medium text-slate-400">Popular:</span>
                {quickTopics.map((item) => (
                  <button key={item} type="button" onClick={() => handleQuickTopic(item)} className="quick-topic-btn">
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in-up lg:col-span-5" style={{ animationDelay: '0.2s' }}>
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src="/hero-helping.png"
                  alt="Patient in-home tech help with a neighbor at their kitchen table"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width="1648"
                  height="927"
                  className="aspect-[4/3] h-full w-full object-cover lg:aspect-[4/5]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-3 shadow-md backdrop-blur">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-600" />
                  <p className="text-sm font-medium text-slate-800">In-home service, where the problem actually happens.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Why book ---- */}
        <section id="why-book" className="border-t border-slate-200">
          <div className="section-shell py-16 lg:py-24">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="eyebrow-amber">Why Tech Wiz</p>
                <h2 className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">
                  Help that feels calm, clear, and trustworthy.
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
                  <blockquote className="font-display text-2xl leading-snug text-slate-800 sm:text-[1.6rem]">
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

        {/* ---- Who's behind it ---- */}
        <section id="about" className="border-t border-slate-200">
          <div className="section-shell py-16 lg:py-24">
            <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="eyebrow-amber">Who you&apos;re working with</p>
                <h2 className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">
                  A software builder, not a call center.
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  Tech Wiz is the local services side of Sturm Technologies. Calvin Sturm builds the Fast Series,
                  practical Windows software for creators and builders, and brings that same patient, methodical
                  approach to the everyday tech problems that slow people down on the Central Coast.
                </p>
                <p className="mt-3 leading-relaxed text-slate-600">
                  The person at your kitchen table writes software for a living. No scripts, no upselling, and
                  explanations that make sense before the visit is over.
                </p>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Sturm Technologies</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Practical Windows software for creators and builders, made on the Central Coast. Tech support is
                    a separate local service, not one of the software products.
                  </p>
                  <a href="/" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-800">
                    See the software
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- How it works ---- */}
        <section id="how-it-works" className="border-t border-slate-200">
          <div className="section-shell py-16 lg:py-24">
            <div className="max-w-2xl">
              <p className="eyebrow-amber">How it works</p>
              <h2 className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">
                A simple path from first call to fixed.
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
              <a href="#request-help" className="cta-primary">
                Get started
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        {/* ---- Services ---- */}
        <section id="services" className="border-t border-slate-200">
          <div className="section-shell py-16 lg:py-24">
            <div className="max-w-2xl">
              <p className="eyebrow-amber">Services</p>
              <h2 className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">
                Common issues we fix at home.
              </h2>
              <p className="mt-4 text-lg text-slate-600">Pick what sounds closest and we&apos;ll start the request for you.</p>
            </div>

            <ul className="mt-10 border-b border-slate-200">
              {services.map(([title, desc, prompt, Icon], index) => (
                <li key={title}>
                  <button
                    type="button"
                    onClick={() => handleServiceItemSelect(title, prompt)}
                    className={`edit-row group ${selectedService === title ? 'edit-row-active' : ''}`}
                  >
                    <span className="edit-index">{String(index + 1).padStart(2, '0')}</span>
                    <Icon className="mt-0.5 hidden h-6 w-6 shrink-0 text-slate-400 transition-colors group-hover:text-amber-600 sm:block" />
                    <span className="min-w-0 flex-1">
                      <span className="font-display block text-xl text-slate-900 sm:text-2xl">{title}</span>
                      <span className="mt-1 block text-slate-600">{desc}</span>
                    </span>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-600" />
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-slate-600">
              Not sure which one fits? <a href="#request-help" className="font-medium text-slate-900 underline decoration-amber-400 underline-offset-4">Describe the issue</a> and we&apos;ll help.
            </p>
          </div>
        </section>

        {/* ---- Pricing ---- */}
        <section id="pricing" className="border-t border-slate-200">
          <div className="section-shell py-16 lg:py-24">
            <div className="max-w-2xl">
              <p className="eyebrow-amber">Pricing</p>
              <h2 className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">Straightforward pricing.</h2>
              <p className="mt-4 text-lg text-slate-600">Clear starting prices. You approve any extra before it happens.</p>
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
                      Start with this
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---- Service area (dark band) ---- */}
        <section id="service-area" className="bg-slate-900">
          <div className="section-shell py-16 lg:py-24">
            <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Service area</p>
                <h2 className="font-display mt-4 text-3xl text-white sm:text-4xl">
                  Serving the Five Cities &amp; Central Coast.
                </h2>
                <p className="mt-4 text-slate-400">Nearby and not listed? Call to confirm: there&apos;s a good chance we can help.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="tel:+18059940881" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3.5 font-semibold text-[#1f1003] transition-colors hover:bg-amber-300">
                    <Phone className="h-5 w-5" />
                    Call now
                  </a>
                  <a href="#request-help" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10">
                    <Calendar className="h-5 w-5" />
                    Request callback
                  </a>
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <ul className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3 lg:grid-cols-2">
                  {serviceArea.map((city) => (
                    <li key={city} className="font-display border-b border-white/10 py-3 text-lg text-slate-200 lg:text-xl">
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Request help ---- */}
        <section id="request-help" className="border-t border-slate-200">
          <div className="section-shell py-16 lg:py-24">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="eyebrow-amber">Request a callback</p>
                <h2 className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">Tell us what&apos;s going on.</h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  A simple description is enough. We&apos;ll follow up in plain English, usually the same day.
                </p>
                <a href="tel:+18059940881" className="mt-6 inline-flex items-center gap-2 font-display text-2xl text-slate-900 hover:text-amber-700">
                  <Phone className="h-5 w-5 text-amber-600" />
                  (805) 994-0881
                </a>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <form className="space-y-4" onSubmit={handleSubmit} action="https://formsubmit.co/calvinasturm@gmail.com" method="POST" aria-label="Request a callback">
                  <input type="hidden" name="_subject" value="New callback request from calvinsturm.com" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">Your name <span className="text-amber-600">*</span></label><input type="text" id="name" name="name" autoComplete="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900" required /></div>
                    <div><label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">Phone number <span className="text-amber-600">*</span></label><input type="tel" id="phone" name="phone" autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="(555) 123-4567" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900" required /></div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">Email <span className="font-normal text-slate-400">(optional)</span></label><input type="email" id="email" name="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900" /></div>
                    <div><label htmlFor="city" className="mb-1.5 block text-sm font-medium text-slate-700">City <span className="text-amber-600">*</span></label><input type="text" id="city" name="city" autoComplete="address-level2" value={form.city} onChange={handleChange} placeholder="Arroyo Grande" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900" required /></div>
                  </div>
                  <div><label htmlFor="contact" className="mb-1.5 block text-sm font-medium text-slate-700">Best contact</label><select id="contact" name="contact" value={form.contact} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900"><option value="phone call">Phone call</option><option value="text message">Text message</option><option value="email">Email</option><option value="either one">Any of the above</option></select></div>
                  <div><label htmlFor="details" className="mb-1.5 block text-sm font-medium text-slate-700">What do you need help with? <span className="text-amber-600">*</span></label><textarea ref={detailsRef} id="details" name="details" value={form.details} onChange={handleChange} rows={4} placeholder="Example: Wi-Fi drops in the back bedroom, printer stopped connecting..." className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base leading-relaxed text-slate-900" required /></div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button type="submit" className="cta-primary flex-1 justify-center">
                      <Calendar className="h-5 w-5" />
                      Request callback
                    </button>
                    <a href="tel:+18059940881" className="cta-secondary flex-1 justify-center">
                      <Phone className="h-5 w-5" />
                      Call now
                    </a>
                  </div>
                  {isSubmitted && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-base text-emerald-800">Thanks{form.name ? `, ${form.name}` : ''}. We&apos;ll be in touch soon.</div>}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section id="faq" className="border-t border-slate-200">
          <div className="section-shell py-16 lg:py-24">
            <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="eyebrow-amber">FAQ</p>
                <h2 className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">Common questions.</h2>
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
                        >
                          <span className="text-lg font-medium text-slate-900">{question}</span>
                          <span className="mt-0.5 shrink-0 text-amber-600">
                            {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                          </span>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
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
      </main>

      <footer className="border-t border-slate-200 py-14">
        <div className="section-shell">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="mb-3 flex items-center gap-2.5">
                <img src="/techWizIcon.png" alt="Tech Wiz" className="h-10 w-10 object-contain" />
                <span className="font-display text-xl text-slate-900">Tech Wiz</span>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-slate-600">Patient in-home tech support for the Five Cities, Santa Maria, Orcutt, Lompoc, and nearby areas. The local services side of Sturm Technologies LLC.</p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Explore</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {navItems.map(([label, href]) => (
                  <li key={href}><a href={href} className="hover:text-slate-900">{label}</a></li>
                ))}
                <li><a href="/" className="hover:text-slate-900">Sturm Technologies home</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Contact</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="tel:+18059940881" className="font-medium text-slate-900">(805) 994-0881</a></li>
                <li><a href="mailto:techwiz@calvinsturm.com" className="hover:text-slate-900">techwiz@calvinsturm.com</a></li>
                <li><a href="#request-help" className="hover:text-slate-900">Request a callback</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
            © {new Date().getFullYear()} Sturm Technologies LLC · Local in-home tech support.
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-[#fbf8f3]/95 p-4 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        <div className="flex gap-3">
          <a href="tel:+18059940881" className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-4 text-base font-semibold text-white"><Phone className="h-5 w-5" />Call</a>
          <a href="#request-help" className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base font-semibold text-slate-900"><Calendar className="h-5 w-5" />Callback</a>
        </div>
      </div>
    </div>
  );
}
