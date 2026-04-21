import { lazy, Suspense, useRef, useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

const TechHelpCarousel = lazy(() => import('./TechHelpCarousel'));
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  HardDrive,
  House,
  MapPin,
  Menu,
  MonitorSmartphone,
  Phone,
  Printer,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Wifi,
  Wrench,
  X,
} from 'lucide-react';

const navItems = [
  ['Why Book', '#why-book'],
  ['How It Works', '#how-it-works'],
  ['Services', '#services'],
  ['Pricing', '#pricing'],
  ['FAQ', '#faq'],
] as const;

const trustPoints = [
  ['Patient, plain-English help', 'Questions are welcome. The explanation should make sense before the visit is over.', ShieldCheck],
  ['Help where the problem actually happens', 'Wi-Fi, printers, TVs, and smart home issues get solved in the room where they break down.', MapPin],
  ['Family can join in', 'A spouse, adult child, or caregiver can be there in person or by phone so everyone stays aligned.', Phone],
  ['No surprise add-ons', 'If something extra is needed, you hear about it before money is spent.', Calendar],
] as const;

const reviews = [
  ['Alex R.', 'Arroyo Grande', 'My new laptop, email, and phone were all set up in one visit. Everything worked when he left.'],
  ['Mary F.', 'Nipomo', 'The printer was finally working again before family came over, and everything was explained in a way that made sense.'],
  ['Greg S.', 'Grover Beach', "He fixed the Wi-Fi and took the time to walk me through what he did. No confusing tech talk."],
  ['Samantha', 'Atascadero', 'I appreciated the honesty. The problem was solved at home without pressure to buy anything new.'],
] as const;

const processSteps = [
  ['01', 'Reach out in plain language', 'Call or request a callback with a simple description of what feels off.', Phone],
  ['02', 'Get help at home', 'The issue gets worked on where it happens, with calm explanations as things are fixed.', House],
  ['03', 'Leave with a setup that feels lighter', 'You get a working solution, the next step if one exists, and fewer lingering headaches.', CheckCircle2],
] as const;

const serviceGroups = [
  {
    title: 'Connectivity and setup',
    intro: 'Choose the kind of help that sounds closest to your issue.',
    items: [
      ['Wi-Fi and internet problems', 'Dead zones, dropped connections, slow speeds, and unstable routers.', 'My Wi-Fi keeps dropping in parts of the house and I need help getting it stable again.', Wifi],
      ['New device setup', 'Phones, tablets, laptops, TVs, and printers set up to feel usable right away.', 'I need help setting up a new device and making sure everything works together at home.', MonitorSmartphone],
    ],
  },
  {
    title: 'Everyday device problems',
    intro: 'Good for the problems that quietly derail the day.',
    items: [
      ['Computer cleanup', 'Speed up a sluggish computer, remove unwanted software, and sort out routine glitches.', 'My computer has gotten slow and I need help cleaning it up and fixing a few issues.', Wrench],
      ['Printer, email, and login help', 'Printer connections, password confusion, and email settings that keep breaking.', 'I need help with printer setup, email problems, or logins that keep failing.', Printer],
    ],
  },
  {
    title: 'Protection and peace of mind',
    intro: 'For the files and devices you do not want to lose or misconfigure.',
    items: [
      ['Virus and malware removal', 'Check a computer for viruses, malware, and pop-ups, then clean it up and get it running normally again.', 'I think my computer may have a virus or malware and I need help checking it and cleaning it up.', ShieldAlert],
      ['Photos and backup help', 'Protect family photos, important documents, and the files that matter most.', 'I want help backing up family photos and important documents before something gets lost.', HardDrive],
      ['Smart home and safety setup', 'Doorbells, cameras, thermostats, and streaming devices configured with privacy in mind.', 'I need help setting up smart home devices and making sure they are configured safely.', ShieldCheck],
    ],
  },
] as const;

const pricingPlans = [
  ['Quick Help', 'Starting at $79', 'Best for printer issues, password help, email setup, or a shorter troubleshooting visit.'],
  ['In-Home Visit', 'Starting at $149', 'Best for Wi-Fi, new computers, smart TVs, virus and malware cleanup, and more involved home tech issues.'],
  ['Care Plan', '$39 / month', 'Best for households that want priority scheduling, routine checkups, and ongoing peace of mind.'],
] as const;

const faqs = [
  ['Do I need to unplug anything or bring my computer somewhere?', 'No. This service is built around house calls, so the goal is to make things easier on you, not harder.'],
  ['What if I am not sure how to describe the problem?', 'That is normal. A simple explanation like "the printer stopped working" is enough to get started.'],
  ['Can a family member or caregiver join the visit?', 'Yes. They can be there in person or join by phone if that makes the visit more comfortable.'],
  ['Do you come to my city or neighborhood?', 'Five Cities, Santa Maria, Orcutt, and Lompoc are the main service area. Nearby communities can usually be confirmed quickly with a city, ZIP, or callback request.'],
  ['Can you help set up a new device I already bought?', 'Yes. Phones, printers, laptops, smart TVs, streaming devices, and other home tech can be set up where they are actually being used.'],
  ['Will I be pushed into buying new devices?', 'No surprise upselling. If replacement is the best option, it should be explained clearly before you spend anything.'],
] as const;

const cities = ['Arroyo Grande', 'Grover Beach', 'Pismo Beach', 'Shell Beach', 'Avila Beach', 'Santa Maria', 'Orcutt', 'Lompoc'];

const mapCities = [
  ['Lompoc', 45, 30, 'nearby'],
  ['Santa Maria', 75, 50, 'in-range'],
  ['Orcutt', 90, 40, 'in-range'],
  ['Arroyo Grande', 130, 80, 'in-range'],
  ['Grover Beach', 145, 85, 'in-range'],
  ['Pismo Beach', 155, 95, 'in-range'],
  ['Shell Beach', 165, 100, 'in-range'],
  ['Avila Beach', 175, 110, 'nearby'],
] as const;

const featuredServices = [
  ['Wi-Fi Help', 'Fix weak rooms, drops, and unstable home internet.', 'The Wi-Fi keeps dropping in one part of the house and I need help getting it stable again.', Wifi],
  ['Printer Setup', 'Reconnect printers and get them working again.', 'My printer stopped connecting and I need help getting it set up again.', Printer],
  ['New Devices', 'Set up phones, tablets, computers, and TVs.', 'I need help setting up a new device and making sure everything works together.', MonitorSmartphone],
] as const;

const quickTopics = ['Wi-Fi trouble', 'Printer help', 'Virus or malware check', 'New device setup', 'Smart TV setup'] as const;

const cityZipLookup: Record<string, { label: string; status: 'in-range' | 'nearby' }> = {
  'arroyo grande': { label: 'Arroyo Grande', status: 'in-range' },
  '93420': { label: 'Arroyo Grande', status: 'in-range' },
  'grover beach': { label: 'Grover Beach', status: 'in-range' },
  '93433': { label: 'Grover Beach', status: 'in-range' },
  'pismo beach': { label: 'Pismo Beach', status: 'in-range' },
  '93449': { label: 'Pismo Beach', status: 'in-range' },
  'shell beach': { label: 'Shell Beach', status: 'in-range' },
  '93448': { label: 'Shell Beach', status: 'in-range' },
  'avila beach': { label: 'Avila Beach', status: 'nearby' },
  '93424': { label: 'Avila Beach', status: 'nearby' },
  'santa maria': { label: 'Santa Maria', status: 'in-range' },
  '93454': { label: 'Santa Maria', status: 'in-range' },
  '93455': { label: 'Santa Maria', status: 'in-range' },
  '93456': { label: 'Santa Maria', status: 'in-range' },
  'orcutt': { label: 'Orcutt', status: 'in-range' },
  '93457': { label: 'Orcutt', status: 'in-range' },
  'lompoc': { label: 'Lompoc', status: 'in-range' },
  '93436': { label: 'Lompoc', status: 'in-range' },
  '93438': { label: 'Lompoc', status: 'in-range' },
  'san luis obispo': { label: 'San Luis Obispo', status: 'nearby' },
  '93401': { label: 'San Luis Obispo', status: 'nearby' },
  '93405': { label: 'San Luis Obispo', status: 'nearby' },
  'nipomo': { label: 'Nipomo', status: 'nearby' },
  '93444': { label: 'Nipomo', status: 'nearby' },
};

type RequestForm = { name: string; phone: string; email: string; city: string; contact: string; details: string };

function TechWizMark({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="techwiz-hat" x1="16" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4f86ff" />
          <stop offset="1" stopColor="#1d3b8f" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="52" rx="22" ry="6.5" fill="#10203f" opacity="0.18" />
      <path d="M22 47c1-6 2.8-13.4 5.6-20.8C30.8 17.4 35.9 10 43 8c5.8-1.6 9.4 1.6 8.6 6.1-.5 3.1-2.4 5.8-5.2 8.5 2.8.6 5 2.6 5 6 0 5.9-4.9 8.9-9.2 10.6-5.4 2.2-12.8 4.1-20.2 5.1Z" fill="url(#techwiz-hat)" />
      <path d="M14 48c2.8-2.2 8.7-3.8 18-3.8 11.4 0 20.2 2.2 20.2 5.8S43.4 56 32 56c-9.3 0-15.2-1.6-18-3.8L14 48Z" fill="#1c387a" />
      <path d="M28.6 28.1c2.5-4.5 7.2-8.1 13.6-8.9-5.1 2.8-7.4 8.3-7.6 13.2 2.8-.8 5.5-2.6 7.6-5.2-.1 5.8-3.7 12.4-10.4 14.4-5.5 1.7-10.9-.6-13.7-4.7 3.9.7 7.8-.8 10.5-3.9-2.8-.8-5.3-3.2-6.1-6.9 1.8 1.4 4 2 6.1 2Z" fill="#f4f7ff" opacity="0.95" />
      <circle cx="41.5" cy="20" r="2.1" fill="#f7d36b" />
      <circle cx="46.8" cy="26.4" r="1.5" fill="#f7d36b" />
      <circle cx="38.2" cy="12.7" r="1.4" fill="#f7d36b" />
    </svg>
  );
}

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
  const [areaQuery, setAreaQuery] = useState('');
  const [areaResult, setAreaResult] = useState<{ tone: 'in-range' | 'nearby' | 'unknown'; title: string; body: string } | null>(null);
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

  const handleServiceSelect = (service: (typeof featuredServices)[number]) => {
    const [label, , prompt] = service;
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

  const handleAreaCheck = (value: string) => {
    const normalized = value.trim().toLowerCase();
    setAreaQuery(value);

    if (!normalized) {
      setAreaResult(null);
      return;
    }

    const match = cityZipLookup[normalized];
    if (match?.status === 'in-range') {
      setAreaResult({
        tone: 'in-range',
        title: `${match.label} is in range`,
        body: 'That area fits the normal house-call zone. Request a callback and mention the city or ZIP.',
      });
      setForm((current) => ({ ...current, city: current.city || match.label }));
      return;
    }

    if (match?.status === 'nearby') {
      setAreaResult({
        tone: 'nearby',
        title: `${match.label} is close by`,
        body: 'That area is nearby. Call now or request a callback to confirm the visit range for your address.',
      });
      setForm((current) => ({ ...current, city: current.city || match.label }));
      return;
    }

    setAreaResult({
      tone: 'unknown',
      title: 'Let us confirm your location',
      body: 'If you are on the Central Coast but do not see your city here, request a callback with your address or ZIP and we can confirm quickly.',
    });
  };

  const handleCitySelect = (city: string) => {
    handleAreaCheck(city);
    setForm((current) => ({ ...current, city }));
  };

  return (
    <div className="min-h-screen bg-transparent pb-24 text-slate-900 md:pb-0">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="section-shell">
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-2.5" aria-label="Tech Wiz home">
              <img src="/techWizIcon.png" alt="" aria-hidden="true" className="h-12 w-12 object-contain" />
              <span className="text-lg font-semibold text-slate-900">Tech Wiz</span>
            </a>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} className="nav-link">{label}</a>
              ))}
              <a href="/build.html" className="nav-link inline-flex items-center gap-1.5 text-slate-700">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                Websites & Software
              </a>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
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
              <a href="tel:+18059940881" className="nav-phone">
                <Phone className="h-4 w-4" />
                (805) 994-0881
              </a>
              <a href="#request-help" className="cta-primary text-sm py-2.5">
                <Calendar className="h-4 w-4" />
                Request Callback
              </a>
            </div>

            <button 
              className="rounded-lg p-2 text-slate-600 md:hidden hover:bg-slate-100" 
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
          <div id="mobile-menu" className="md:hidden bg-white border-t border-slate-100">
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
              <a
                href="/build.html"
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                <Sparkles className="h-4 w-4 text-amber-500" />
                Websites & Software
              </a>
              <div className="pt-4 pb-2">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 mb-2"
                >
                  <svg className="h-4 w-4 dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <svg className="h-4 w-4 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
                <a href="tel:+18059940881" className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700">
                  <Phone className="h-4 w-4" />
                  Call (805) 994-0881
                </a>
                <a href="#request-help" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white" onClick={() => setIsMobileMenuOpen(false)}>
                  <Calendar className="h-4 w-4" />
                  Request Callback
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="main-content" className="pt-16 pb-24 md:pb-0">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-amber-200/30 blur-[120px]" />
            <div className="absolute right-[-5%] bottom-[-10%] h-[400px] w-[400px] rounded-full bg-indigo-200/25 blur-[100px]" />
          </div>
          <div className="section-shell py-12 lg:py-20">
              <div className="grid items-center gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">
                <div className="max-w-2xl">
                  <h1 className="font-display mb-5 text-4xl font-medium leading-[1.15] text-slate-900 sm:text-5xl lg:text-[3.25rem] animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
                    Tech support that comes to you.
                  </h1>
                <p className="mb-6 text-lg leading-relaxed text-slate-600 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  No jargon. No confusion. Just patient, local help for Wi-Fi, printers, devices, and everyday tech at your home.
                </p>
                <div className="mb-8 flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                  {quickTopics.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setSelectedService(item);
                        setForm((current) => ({
                          ...current,
                          details: current.details || `I need help with ${item.toLowerCase()}.`,
                        }));
                        requestAnimationFrame(() => {
                          detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        });
                      }}
                      className="quick-topic-btn"
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <a href="#request-help" className="cta-primary">
                    <Calendar className="h-5 w-5" />
                    Request a Callback
                  </a>
                  <a href="tel:+18059940881" className="cta-secondary">
                    <Phone className="h-5 w-5" />
                    Call Now
                  </a>
                </div>
              </div>

              <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="relative overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/60">
                  <img
                    src="/hero-helping.png"
                    alt="Patient in-home tech help with a neighbor at their kitchen table"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    width="1648"
                    height="927"
                    className="h-full w-full object-cover aspect-[4/3] lg:aspect-[4/5]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-3 shadow-md backdrop-blur">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    <p className="text-sm font-medium text-slate-800">In-home service, where the problem actually happens.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-shell py-12 lg:py-20">
          <Suspense fallback={<div className="h-[450px] w-full max-w-5xl mx-auto rounded-[32px] bg-slate-100 animate-pulse" aria-hidden="true" />}>
            <TechHelpCarousel />
          </Suspense>
        </div>

        <section id="why-book" className="py-16 lg:py-20">
          <div className="section-shell">
            <div className="mb-10 lg:mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">Why Tech Wiz</div>
              <h2 className="font-display text-3xl font-medium text-slate-900 sm:text-4xl lg:text-[2.5rem]">Help that feels calm, clear, and trustworthy.</h2>
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
                      <CheckCircle2 className="h-5 w-5 text-amber-700" />
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

        <section id="how-it-works" className="py-16 lg:py-20">
          <div className="section-shell">
            <div className="mb-10 lg:mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">How it works</div>
              <h2 className="font-display text-3xl font-medium text-slate-900 sm:text-4xl lg:text-[2.5rem]">A simple path from first call to fixed.</h2>
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
              <a href="#request-help" className="cta-primary">
                Get started
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        <section id="services" className="py-16 lg:py-20">
          <div className="section-shell">
            <div className="mb-10 lg:mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">Services</div>
              <h2 className="font-display text-3xl font-medium text-slate-900 sm:text-4xl lg:text-[2.5rem]">Common issues we fix at home.</h2>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {serviceGroups.flatMap(group => 
                group.items.map(([title, desc, prompt, Icon]) => (
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
                ))
              )}
            </div>

            <div className="mt-8 text-center">
              <p className="text-slate-600">Not sure which one fits? <a href="#request-help" className="font-medium text-slate-900 underline">Describe the issue</a> and we&apos;ll help.</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-16 lg:py-20">
          <div className="section-shell">
            <div className="mb-10 lg:mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">Pricing</div>
              <h2 className="font-display text-3xl font-medium text-slate-900 sm:text-4xl lg:text-[2.5rem]">Straightforward pricing.</h2>
              <p className="mt-3 text-lg text-slate-600">Clear starting prices. No surprise costs.</p>
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
                  <div className={`mt-5 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium ${index === 1 ? 'bg-white text-slate-900' : 'bg-amber-100 text-amber-800'}`}>Start with this plan <ArrowRight className="h-4 w-4" /></div>
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
              <p className="text-sm text-slate-600">You approve the price before any extra work. A short visit stays short.</p>
            </div>
          </div>
        </section>

        <section id="service-area" className="py-16 lg:py-20">
          <div className="section-shell">
            <div className="mb-10 lg:mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-medium text-white">Service Area</div>
              <h2 className="font-display text-3xl font-medium text-slate-900 sm:text-4xl lg:text-[2.5rem]">Serving the Five Cities & Central Coast.</h2>
              <p className="mt-3 text-lg text-slate-600">We come to you. Check if we cover your area.</p>
            </div>

            <div className="service-area-shell">
              <div className="service-area-map-panel">
                <div className="service-area-map-copy">
                  <div>
                    <p className="service-area-kicker">Primary coverage</p>
                    <h3 className="text-2xl font-semibold text-slate-900">Five Cities, Santa Maria, Orcutt, and Lompoc</h3>
                    <p className="mt-3 text-base text-slate-600">The main house-call zone covers the places most visits come from. Nearby Central Coast areas are confirmed case by case.</p>
                  </div>
                </div>

                <div className="service-area-map-visual">
                  <div className="absolute inset-0 opacity-15">
                    <svg viewBox="0 0 200 140" className="h-full w-full">
                      <path d="M10,70 Q50,50 90,65 T190,60" fill="none" stroke="#64748b" strokeWidth="0.5" />
                      <path d="M0,80 Q40,60 100,75 T200,70" fill="none" stroke="#94a3b8" strokeWidth="0.3" />
                      <path d="M0,90 Q60,70 130,85 T200,80" fill="none" stroke="#cbd5e1" strokeWidth="0.2" />
                    </svg>
                  </div>
                  <div className="service-area-map-frame">
                    <img src="/5CitiesMap.png" alt="Map of Five Cities service area on the Central Coast" loading="lazy" decoding="async" className="w-full max-w-md mx-auto rounded-xl" />
                  </div>
                </div>
              </div>

              <div className="service-area-info-panel">
                <div className="service-area-checker-card">
                  <h3 className="text-xl font-semibold text-slate-900">Check your city or ZIP</h3>
                  <p className="mt-1 text-sm text-slate-600">Type your city or ZIP, or tap one below.</p>

                  <div className="mt-5">
                    <label htmlFor="service-area-search" className="sr-only">City or ZIP code</label>
                    <div className="service-area-search-wrap">
                      <Search className="h-5 w-5 text-slate-400" />
                      <input
                        id="service-area-search"
                        type="text"
                        value={areaQuery}
                        onChange={(event) => handleAreaCheck(event.target.value)}
                        placeholder="Enter city or ZIP code"
                        className="service-area-search-input"
                      />
                    </div>
                  </div>

                  {areaResult && (
                    <div className={`service-area-result-card ${areaResult.tone === 'in-range' ? 'service-area-result-card-in-range' : areaResult.tone === 'nearby' ? 'service-area-result-card-nearby' : 'service-area-result-card-unknown'}`}>
                      <div className="flex items-start gap-3">
                        <div className="service-area-result-badge">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-base font-semibold">{areaResult.title}</p>
                          <p className="mt-1 text-sm leading-relaxed">{areaResult.body}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-5">
                    <p className="mb-3 text-sm font-medium text-slate-700">Popular service areas</p>
                    <div className="service-area-chip-grid">
                      {cities.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => handleCitySelect(city)}
                          className={`service-area-chip ${areaQuery.trim().toLowerCase() === city.toLowerCase() ? 'service-area-chip-active' : ''}`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="service-area-notes-card">
                  <h3 className="text-lg font-semibold text-slate-900">Just outside the map?</h3>
                  <p className="mt-2 text-sm text-slate-600">Call or request a callback with your city or ZIP. Nearby areas can usually be confirmed quickly.</p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <a href="tel:+18059940881" className="cta-primary flex-1 justify-center">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </a>
                    <a href="#request-help" className="cta-secondary flex-1 justify-center">
                      <Calendar className="h-4 w-4" />
                      Request Callback
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="request-help" className="py-16 lg:py-20">
          <div className="section-shell">
            <div className="mx-auto max-w-2xl">
              <div className="mb-6 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">Request a callback</div>
                <h2 className="font-display text-3xl font-medium text-slate-900 sm:text-4xl">Tell us what&apos;s going on.</h2>
                <p className="mt-3 text-lg text-slate-600">A simple description is enough. We&apos;ll follow up in plain English.</p>
              </div>
              <form className="mt-8 space-y-4" onSubmit={handleSubmit} action="https://formsubmit.co/calvinasturm@gmail.com" method="POST" aria-label="Request a callback">
                <input type="hidden" name="_subject" value="New callback request from calvinsturm.com" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">Your name <span className="text-amber-600">*</span></label><input type="text" id="name" name="name" autoComplete="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900" required /></div>
                  <div><label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">Phone number <span className="text-amber-600">*</span></label><input type="tel" id="phone" name="phone" autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="(555) 123-4567" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900" required /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">Email <span className="text-slate-400 font-normal">(optional)</span></label><input type="email" id="email" name="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900" /></div>
                  <div><label htmlFor="city" className="mb-1.5 block text-sm font-medium text-slate-700">City <span className="text-amber-600">*</span></label><input type="text" id="city" name="city" autoComplete="address-level2" value={form.city} onChange={handleChange} placeholder="Arroyo Grande" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900" required /></div>
                </div>
                <div><label htmlFor="contact" className="mb-1.5 block text-sm font-medium text-slate-700">Best contact</label><select id="contact" name="contact" value={form.contact} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900"><option value="phone call">Phone call</option><option value="text message">Text message</option><option value="email">Email</option><option value="either one">Any of the above</option></select></div>
                <div><label htmlFor="details" className="mb-1.5 block text-sm font-medium text-slate-700">What do you need help with? <span className="text-amber-600">*</span></label><textarea ref={detailsRef} id="details" name="details" value={form.details} onChange={handleChange} rows={4} placeholder="Example: Wi-Fi drops in the back bedroom, printer stopped connecting..." className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base leading-relaxed text-slate-900" required /></div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button type="submit" className="cta-primary flex-1 justify-center">
                    <Calendar className="h-5 w-5" />
                    Request Callback
                  </button>
                  <a href="tel:+18059940881" className="cta-secondary flex-1 justify-center">
                    <Phone className="h-5 w-5" />
                    Call Now
                  </a>
                </div>
                {isSubmitted && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-base text-emerald-800">Thanks{form.name ? `, ${form.name}` : ''}. We&apos;ll be in touch soon.</div>}
              </form>
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 lg:py-20">
          <div className="section-shell">
            <div className="mb-10 lg:mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">FAQ</div>
              <h2 className="font-display text-3xl font-medium text-slate-900 sm:text-4xl lg:text-[2.5rem]">Common questions.</h2>
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
                  >
                    <span className="text-lg font-medium text-slate-900">{question}</span>
                    <ChevronDown className={`h-5 w-5 text-slate-400 shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
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
              <h2 className="font-display text-3xl font-medium text-white sm:text-4xl">Ready to get things working?</h2>
              <p className="mt-4 text-lg text-slate-300">Call now or request a callback. A simple description is enough.</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
                <a href="tel:+18059940881" className="cta-primary">
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
                <a href="#request-help" className="cta-secondary">
                  <Calendar className="h-5 w-5" />
                  Request Callback
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
                <img src="/techWizIcon.png" alt="Tech Wiz" className="h-10 w-10 object-contain" />
                <span className="text-lg font-semibold text-slate-900">Tech Wiz</span>
              </div>
              <p className="text-sm text-slate-600">Patient in-home tech support for the Five Cities, Santa Maria, Orcutt, Lompoc & nearby areas.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {navItems.map(([label, href]) => (
                  <li key={href}><a href={href} className="hover:text-slate-900">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Contact</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="tel:+18059940881" className="font-medium text-slate-900">(805) 994-0881</a></li>
                <li><a href="mailto:techwiz@calvinsturm.com" className="hover:text-slate-900">techwiz@calvinsturm.com</a></li>
                <li><a href="#request-help" className="hover:text-slate-900">Request a callback</a></li>
                <li>Serving: Arroyo Grande, Grover Beach, Pismo Beach, Santa Maria, Orcutt, Lompoc</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Sturm Technologies LLC. Local in-home tech support.
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 p-4 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        <div className="flex gap-3">
          <a href="tel:+18059940881" className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-4 text-base font-semibold text-white min-h-[52px]"><Phone className="h-5 w-5" />Call</a>
          <a href="#request-help" className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base font-semibold text-slate-900 min-h-[52px]"><Calendar className="h-5 w-5" />Callback</a>
        </div>
      </div>
    </div>
  );
}
