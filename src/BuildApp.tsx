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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

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
    <div className="home-landing svc-has-mobilebar">
      <a href="#main-content" className="home-skip-link">
        Skip to main content
      </a>

      <header className="home-header">
        <div className="home-shell home-header-inner">
          <a href="/" className="home-brand" aria-label="Sturm Technologies home">
            <img src="/sturm-mark.svg" alt="Sturm Technologies" width={30} height={30} />
            <span>Sturm Technologies</span>
          </a>

          <nav className="home-nav" aria-label="Primary">
            {navItems.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
            <a href="/projects">Projects</a>
          </nav>

          <div className="home-header-actions">
            <a href="tel:+18059940881" className="svc-phone-nav">
              <Phone className="h-4 w-4" />
              (805) 994-0881
            </a>
            <a href="#request-build" className="home-btn home-btn-primary home-btn-compact">
              Start a project
            </a>
            <button
              type="button"
              className="home-menu-toggle"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav id="mobile-menu" className="home-mobile-menu" aria-label="Primary mobile">
            <div className="home-shell">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setIsMobileMenuOpen(false)}>
                  {label}
                </a>
              ))}
              <a href="/projects" onClick={() => setIsMobileMenuOpen(false)}>
                Projects
              </a>
              <a
                href="#request-build"
                className="home-btn home-btn-primary home-mobile-cta"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start a project
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="main-content">
        {/* ---- Hero ---- */}
        <section className="home-shell svc-hero">
          <div>
            <p className="home-eyebrow">Websites · Software · Applied AI</p>
            <h1>Websites, apps, and AI built to actually help</h1>
            <p className="home-hero-sub">
              Custom-built websites, business software, and applied AI / GenAI tools. Clear scoping, modern code,
              honest pricing, from the developer behind the Fast Series of native Windows creator tools.
            </p>
            <div className="home-hero-actions">
              <a href="#request-build" className="home-btn home-btn-primary">
                <Calendar className="h-4 w-4" />
                Start a project
              </a>
              <a href="tel:+18059940881" className="home-btn home-btn-ghost">
                <Phone className="h-4 w-4" />
                (805) 994-0881
              </a>
            </div>
            <div className="svc-topics">
              <span className="svc-topics-label">Popular:</span>
              {quickTopics.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={selectedQuickTopic === item}
                  onClick={() => handleQuickTopic(item)}
                  className={`svc-topic ${selectedQuickTopic === item ? 'svc-topic-active' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="svc-visual" aria-hidden="true">
            <div className="svc-visual-chips">
              <span>
                <Globe className="h-3.5 w-3.5" />
                Websites
              </span>
              <span>
                <Terminal className="h-3.5 w-3.5" />
                Apps
              </span>
              <span>
                <Bot className="h-3.5 w-3.5" />
                AI
              </span>
            </div>
            <div className="svc-visual-card">
              <div className="svc-visual-card-label">
                <Cpu className="h-3.5 w-3.5" />
                <span>Custom AI assistant</span>
              </div>
              <p>&ldquo;Draft a reply to this client in my voice.&rdquo;</p>
            </div>
            <div className="svc-visual-card">
              <div className="svc-visual-card-label">
                <Gauge className="h-3.5 w-3.5" />
                <span>Launch-ready site</span>
              </div>
              <p>Modern, fast, and easy to edit yourself.</p>
            </div>
            <div className="svc-visual-note">
              <CheckCircle2 className="h-5 w-5" />
              Built, shipped, and maintained by a real human.
            </div>
          </div>
        </section>

        {/* ---- Why ---- */}
        <section id="what-we-build" className="home-section home-shell" aria-labelledby="what-we-build-heading">
          <div className="svc-split">
            <div className="svc-split-head">
              <p className="home-eyebrow">Why Sturm Technologies</p>
              <h2 id="what-we-build-heading">Software that feels built, not assembled</h2>
            </div>
            <ul className="svc-points">
              {trustPoints.map(([title, desc, Icon]) => (
                <li key={title}>
                  <Icon className="svc-points-icon h-5 w-5" />
                  <div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="svc-quotes">
            {reviews.map(([quote, name, location]) => (
              <figure key={name} className="svc-quote">
                <blockquote>&ldquo;{quote}&rdquo;</blockquote>
                <figcaption>
                  {name} · {location}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ---- How it works ---- */}
        <section id="how-it-works" className="home-section home-shell" aria-labelledby="how-it-works-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">How it works</p>
            <h2 id="how-it-works-heading">From idea to launched, without the mystery</h2>
          </div>
          <ol className="svc-steps">
            {processSteps.map(([step, title, desc]) => (
              <li key={step} className="svc-step">
                <span className="svc-step-num">{step}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </li>
            ))}
          </ol>
          <div className="home-hero-actions">
            <a href="#request-build" className="home-btn home-btn-primary">
              Start the conversation
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* ---- Services ---- */}
        <section id="services" className="home-section home-shell" aria-labelledby="services-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">What we build</p>
            <h2 id="services-heading">Websites, software, and AI tailored to you</h2>
          </div>

          <div>
            {serviceGroups.map((group) => (
              <div key={group.title} className="svc-group">
                <div className="svc-group-head">
                  <h3>{group.title}</h3>
                  <p>{group.intro}</p>
                </div>
                <ul className="svc-rows">
                  {group.items.map(([title, desc, prompt, Icon]) => (
                    <li key={title}>
                      <button
                        type="button"
                        onClick={() => handleServiceItemSelect(title, prompt)}
                        className={`svc-row ${selectedService === title ? 'svc-row-active' : ''}`}
                      >
                        <Icon className="svc-row-icon h-5 w-5" />
                        <span className="min-w-0 flex-1">
                          <span className="svc-row-title">{title}</span>
                          <span className="svc-row-desc">{desc}</span>
                        </span>
                        <ArrowUpRight className="svc-row-arrow h-5 w-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="svc-fineprint">
            Not sure where your idea fits? <a href="#request-build">Describe it in a sentence</a> and we&apos;ll
            point you the right way.
          </p>
        </section>

        {/* ---- Pricing ---- */}
        <section id="pricing" className="home-section home-shell" aria-labelledby="pricing-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Pricing</p>
            <h2 id="pricing-heading">Fixed quotes. No surprise invoices</h2>
            <p className="pj-section-sub">Every project gets a written scope and a fixed price before any work begins.</p>
          </div>

          <div className="svc-plans">
            {pricingPlans.map(([name, price, desc], index) => {
              const featured = index === 1;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => handlePricingSelect(name, price)}
                  className={`svc-plan ${featured ? 'svc-plan-featured' : ''}`}
                >
                  {featured && <span className="svc-plan-badge">Most popular</span>}
                  <span className="svc-plan-name">{name}</span>
                  <span className="svc-plan-price">{price}</span>
                  <span className="svc-plan-desc">{desc}</span>
                  <span className="svc-plan-cta">
                    Talk about this plan
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              );
            })}
          </div>

          <p className="svc-fineprint">
            The initial conversation is always free. You only commit once the scope and price are in writing.
          </p>
        </section>

        {/* ---- Request build ---- */}
        <section id="request-build" className="home-section home-shell" aria-labelledby="request-heading">
          <div className="svc-split">
            <div className="svc-split-head">
              <p className="home-eyebrow">Start a project</p>
              <h2 id="request-heading">Tell us what you have in mind</h2>
              <p className="svc-lead">
                One or two sentences is plenty to get started. We&apos;ll reply with next steps, not a sales pitch,
                usually within one business day.
              </p>
              <a href="tel:+18059940881" className="svc-phone-big">
                <Phone className="h-5 w-5" />
                (805) 994-0881
              </a>
            </div>

            <form className="svc-form" onSubmit={handleSubmit} aria-label="Start a project" noValidate>
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
              <div className="svc-form-row">
                <div className="svc-field">
                  <label htmlFor="name">
                    Your name <span className="svc-req">*</span>
                  </label>
                  <input type="text" id="name" name="name" autoComplete="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" className="svc-input" required />
                </div>
                <div className="svc-field">
                  <label htmlFor="email">
                    Email <span className="svc-req">*</span>
                  </label>
                  <input type="email" id="email" name="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="svc-input" required />
                </div>
              </div>
              <div className="svc-form-row">
                <div className="svc-field">
                  <label htmlFor="phone">
                    Phone <span className="svc-opt">(optional)</span>
                  </label>
                  <input type="tel" id="phone" name="phone" autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="(555) 123-4567" className="svc-input" />
                </div>
                <div className="svc-field">
                  <label htmlFor="company">
                    Business / project name <span className="svc-opt">(optional)</span>
                  </label>
                  <input type="text" id="company" name="company" autoComplete="organization" value={form.company} onChange={handleChange} placeholder="Acme Co." className="svc-input" />
                </div>
              </div>
              <div className="svc-field">
                <label htmlFor="contact">Best contact</label>
                <select id="contact" name="contact" value={form.contact} onChange={handleChange} className="svc-input">
                  <option value="email">Email</option>
                  <option value="phone call">Phone call</option>
                  <option value="text message">Text message</option>
                  <option value="either one">Any of the above</option>
                </select>
              </div>
              <div className="svc-field">
                <label htmlFor="details">
                  What do you want to build? <span className="svc-req">*</span>
                </label>
                <textarea
                  ref={detailsRef}
                  id="details"
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Example: I need a website for my consulting business, plus an AI assistant that drafts client follow-up emails."
                  className="svc-input"
                  required
                />
              </div>
              <div className="svc-form-actions">
                <button
                  type="submit"
                  className="home-btn home-btn-primary"
                  disabled={submitState === 'submitting'}
                  aria-busy={submitState === 'submitting'}
                >
                  <Send className="h-4 w-4" />
                  {submitState === 'submitting' ? 'Sending…' : 'Send inquiry'}
                </button>
                <a href="tel:+18059940881" className="home-btn home-btn-ghost">
                  <Phone className="h-4 w-4" />
                  Call now
                </a>
              </div>
              {submitState === 'success' && (
                <div role="status" className="svc-note svc-note-success">
                  Thanks{form.name ? `, ${form.name}` : ''}. We&apos;ll reply within one business day.
                </div>
              )}
              {submitState === 'error' && (
                <div role="alert" className="svc-note svc-note-error">
                  Something went wrong sending that. Email <a href="mailto:calvinsturm@gmail.com">calvinsturm@gmail.com</a>{' '}
                  directly or call <a href="tel:+18059940881">(805) 994-0881</a>.
                </div>
              )}
            </form>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section id="faq" className="home-section home-shell" aria-labelledby="faq-heading">
          <div className="svc-split">
            <div className="svc-split-head">
              <p className="home-eyebrow">FAQ</p>
              <h2 id="faq-heading">Common questions</h2>
            </div>
            <div className="svc-faq">
              {faqs.map(([question, answer], index) => {
                const open = openFaq === index;
                return (
                  <div key={question} className="svc-faq-item">
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="svc-faq-btn"
                      aria-expanded={open}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-btn-${index}`}
                    >
                      <span>{question}</span>
                      <span className="svc-faq-icon">
                        {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                      </span>
                    </button>
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-btn-${index}`}
                      className={`svc-faq-panel ${open ? 'svc-faq-panel-open' : ''}`}
                    >
                      <p>{answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---- Final CTA ---- */}
        <section className="home-final home-shell" aria-labelledby="final-heading">
          <div className="home-final-panel">
            <Code2 className="home-final-icon h-6 w-6" aria-hidden="true" />
            <h2 id="final-heading">Ready to build something?</h2>
            <p>Send a short description. You&apos;ll hear back within one business day with real next steps.</p>
            <div className="home-hero-actions home-final-actions">
              <a href="#request-build" className="home-btn home-btn-primary">
                <Calendar className="h-4 w-4" />
                Start a project
              </a>
              <a href="tel:+18059940881" className="home-btn home-btn-ghost">
                <Phone className="h-4 w-4" />
                Call now
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="home-shell home-footer-grid">
          <div>
            <a href="/" className="home-brand home-footer-brand">
              <img src="/sturm-mark.svg" alt="Sturm Technologies" width={28} height={28} />
              <span>Sturm Technologies</span>
            </a>
            <p className="home-footer-blurb">
              Websites, custom software, and applied AI, built on California&apos;s Central Coast and delivered
              anywhere.
            </p>
          </div>
          <nav aria-label="Explore">
            <h3>Explore</h3>
            {navItems.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
            <a href="/fast-series">Fast Series</a>
            <a href="/projects">Projects</a>
            <a href="/tech-support">Local tech support</a>
          </nav>
          <nav aria-label="Contact">
            <h3>Contact</h3>
            <a href="tel:+18059940881">(805) 994-0881</a>
            <a href="mailto:calvinsturm@gmail.com">calvinsturm@gmail.com</a>
            <a href="#request-build">Start a project</a>
          </nav>
        </div>
        <div className="home-shell home-footer-legal">
          © {new Date().getFullYear()} Sturm Technologies LLC · Websites, software, and AI built with care.
        </div>
      </footer>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`svc-top-btn ${showBackToTop ? 'svc-top-btn-visible' : ''}`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <div className="svc-mobilebar">
        <div className="svc-mobilebar-inner">
          <a href="tel:+18059940881" className="home-btn home-btn-primary">
            <Phone className="h-4 w-4" />
            Call
          </a>
          <a href="#request-build" className="home-btn home-btn-ghost">
            <Calendar className="h-4 w-4" />
            Start
          </a>
        </div>
      </div>
    </div>
  );
}
