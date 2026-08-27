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
  Mail,
  MapPin,
  Menu,
  Minus,
  MonitorSmartphone,
  Phone,
  Plus,
  Printer,
  ShieldAlert,
  ShieldCheck,
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
  ['01', 'Reach out in plain language', 'Request a callback with a simple description of what feels off.'],
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

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
      // Swallow the error; still show confirmation so the user isn't stranded.
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
    <div className="home-landing svc-has-mobilebar">
      <a href="#main-content" className="home-skip-link">
        Skip to main content
      </a>

      <header className="home-header">
        <div className="home-shell home-header-inner">
          <a href="/tech-support" className="home-brand" aria-label="Tech Wiz home">
            <img src="/techWizIcon.png" alt="Tech Wiz" width={34} height={34} />
            <span>
              Tech Wiz
              <span className="svc-brand-sub">by Sturm Technologies</span>
            </span>
          </a>

          <nav className="home-nav" aria-label="Primary">
            {navItems.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
            <a href="/">Sturm Technologies</a>
          </nav>

          <div className="home-header-actions">
            <a href="mailto:techwiz@calvinsturm.com" className="svc-phone-nav">
              <Mail className="h-4 w-4" />
              Email
            </a>
            <a href="#request-help" className="home-btn home-btn-primary home-btn-compact">
              Request callback
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
              <a href="/" onClick={() => setIsMobileMenuOpen(false)}>
                Sturm Technologies
              </a>
              <a
                href="#request-help"
                className="home-btn home-btn-primary home-mobile-cta"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Request callback
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
            <p className="home-eyebrow">Central Coast · In-home tech help · A Sturm Technologies service</p>
            <h1>Tech support that comes to you</h1>
            <p className="home-hero-sub">
              No jargon. No confusion. Just patient, local help for Wi-Fi, printers, devices, and everyday tech,
              right at your kitchen table.
            </p>
            <div className="home-hero-actions">
              <a href="#request-help" className="home-btn home-btn-primary">
                <Calendar className="h-4 w-4" />
                Request a callback
              </a>
              <a href="mailto:techwiz@calvinsturm.com" className="home-btn home-btn-ghost">
                <Mail className="h-4 w-4" />
                Email Tech Wiz
              </a>
            </div>
            <div className="svc-topics">
              <span className="svc-topics-label">Popular:</span>
              {quickTopics.map((item) => (
                <button key={item} type="button" onClick={() => handleQuickTopic(item)} className="svc-topic">
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="svc-photo">
            <img
              src="/hero-helping.png"
              alt="Patient in-home tech help with a neighbor at their kitchen table"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="1648"
              height="927"
              className="aspect-[4/3] lg:aspect-[4/5]"
            />
            <div className="svc-photo-note">
              <CheckCircle2 className="h-5 w-5" />
              In-home service, where the problem actually happens.
            </div>
          </div>
        </section>

        {/* ---- Why book ---- */}
        <section id="why-book" className="home-section home-shell" aria-labelledby="why-book-heading">
          <div className="svc-split">
            <div className="svc-split-head">
              <p className="home-eyebrow">Why Tech Wiz</p>
              <h2 id="why-book-heading">Help that feels calm, clear, and trustworthy</h2>
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

        {/* ---- Who's behind it ---- */}
        <section id="about" className="home-section home-shell" aria-labelledby="about-heading">
          <div className="svc-split">
            <div>
              <p className="home-eyebrow">Who you&apos;re working with</p>
              <h2 id="about-heading">A software builder, not a call center</h2>
              <p className="svc-lead">
                Tech Wiz is the local services side of Sturm Technologies. Calvin Sturm builds the Fast Series,
                practical Windows software for creators and builders, and brings that same patient, methodical
                approach to the everyday tech problems that slow people down on the Central Coast.
              </p>
              <p className="svc-lead">
                The person at your kitchen table writes software for a living. No scripts, no upselling, and
                explanations that make sense before the visit is over.
              </p>
            </div>
            <div className="svc-about-card">
              <p className="svc-kicker">Sturm Technologies</p>
              <p>
                Practical Windows software for creators and builders, made on the Central Coast. Tech support is a
                separate local service, not one of the software products.
              </p>
              <a href="/" className="home-inline-link">
                See the software
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ---- How it works ---- */}
        <section id="how-it-works" className="home-section home-shell" aria-labelledby="how-it-works-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">How it works</p>
            <h2 id="how-it-works-heading">A simple path from first note to fixed</h2>
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
            <a href="#request-help" className="home-btn home-btn-primary">
              Get started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* ---- Services ---- */}
        <section id="services" className="home-section home-shell" aria-labelledby="services-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Services</p>
            <h2 id="services-heading">Common issues we fix at home</h2>
            <p className="pj-section-sub">Pick what sounds closest and we&apos;ll start the request for you.</p>
          </div>

          <ul className="svc-rows">
            {services.map(([title, desc, prompt, Icon], index) => (
              <li key={title}>
                <button
                  type="button"
                  onClick={() => handleServiceItemSelect(title, prompt)}
                  className={`svc-row ${selectedService === title ? 'svc-row-active' : ''}`}
                >
                  <span className="svc-row-index">{String(index + 1).padStart(2, '0')}</span>
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

          <p className="svc-fineprint">
            Not sure which one fits? <a href="#request-help">Describe the issue</a> and we&apos;ll help.
          </p>
        </section>

        {/* ---- Pricing ---- */}
        <section id="pricing" className="home-section home-shell" aria-labelledby="pricing-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Pricing</p>
            <h2 id="pricing-heading">Straightforward pricing</h2>
            <p className="pj-section-sub">Clear starting prices. You approve any extra before it happens.</p>
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
                    Start with this
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ---- Service area ---- */}
        <section id="service-area" className="home-section home-shell" aria-labelledby="service-area-heading">
          <div className="svc-area-panel">
            <div className="svc-area-copy">
              <p className="home-eyebrow">Service area</p>
              <h2 id="service-area-heading">Serving the Five Cities &amp; Central Coast</h2>
              <p>Nearby and not listed? Send a request to confirm: there&apos;s a good chance we can help.</p>
              <div className="home-hero-actions">
                <a href="#request-help" className="home-btn home-btn-primary">
                  <Calendar className="h-4 w-4" />
                  Request callback
                </a>
                <a href="mailto:techwiz@calvinsturm.com" className="home-btn home-btn-ghost">
                  <Mail className="h-4 w-4" />
                  Email Tech Wiz
                </a>
              </div>
            </div>
            <ul className="svc-area-list">
              {serviceArea.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---- Request help ---- */}
        <section id="request-help" className="home-section home-shell" aria-labelledby="request-heading">
          <div className="svc-split">
            <div className="svc-split-head">
              <p className="home-eyebrow">Request a callback</p>
              <h2 id="request-heading">Tell us what&apos;s going on</h2>
              <p className="svc-lead">
                A simple description is enough. We&apos;ll follow up in plain English, usually the same day.
              </p>
              <a href="mailto:techwiz@calvinsturm.com" className="svc-phone-big">
                <Mail className="h-5 w-5" />
                techwiz@calvinsturm.com
              </a>
            </div>

            <form
              className="svc-form"
              onSubmit={handleSubmit}
              action="https://formsubmit.co/calvinasturm@gmail.com"
              method="POST"
              aria-label="Request a callback"
            >
              <input type="hidden" name="_subject" value="New callback request from calvinsturm.com" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <div className="svc-form-row">
                <div className="svc-field">
                  <label htmlFor="name">
                    Your name <span className="svc-req">*</span>
                  </label>
                  <input type="text" id="name" name="name" autoComplete="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" className="svc-input" required />
                </div>
                <div className="svc-field">
                  <label htmlFor="phone">
                    Phone number <span className="svc-req">*</span>
                  </label>
                  <input type="tel" id="phone" name="phone" autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="(555) 123-4567" className="svc-input" required />
                </div>
              </div>
              <div className="svc-form-row">
                <div className="svc-field">
                  <label htmlFor="email">
                    Email <span className="svc-opt">(optional)</span>
                  </label>
                  <input type="email" id="email" name="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="svc-input" />
                </div>
                <div className="svc-field">
                  <label htmlFor="city">
                    City <span className="svc-req">*</span>
                  </label>
                  <input type="text" id="city" name="city" autoComplete="address-level2" value={form.city} onChange={handleChange} placeholder="Arroyo Grande" className="svc-input" required />
                </div>
              </div>
              <div className="svc-field">
                <label htmlFor="contact">Best contact</label>
                <select id="contact" name="contact" value={form.contact} onChange={handleChange} className="svc-input">
                  <option value="phone call">Phone call</option>
                  <option value="text message">Text message</option>
                  <option value="email">Email</option>
                  <option value="either one">Any of the above</option>
                </select>
              </div>
              <div className="svc-field">
                <label htmlFor="details">
                  What do you need help with? <span className="svc-req">*</span>
                </label>
                <textarea
                  ref={detailsRef}
                  id="details"
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Example: Wi-Fi drops in the back bedroom, printer stopped connecting..."
                  className="svc-input"
                  required
                />
              </div>
              <div className="svc-form-actions">
                <button type="submit" className="home-btn home-btn-primary">
                  <Calendar className="h-4 w-4" />
                  Request callback
                </button>
                <a href="mailto:techwiz@calvinsturm.com" className="home-btn home-btn-ghost">
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </div>
              {isSubmitted && (
                <div role="status" className="svc-note svc-note-success">
                  Thanks{form.name ? `, ${form.name}` : ''}. We&apos;ll be in touch soon.
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
            <Wrench className="home-final-icon h-6 w-6" aria-hidden="true" />
            <h2 id="final-heading">Ready for tech that just works?</h2>
            <p>A short note is enough to get started. Patient help, at your home, in plain English.</p>
            <div className="home-hero-actions home-final-actions">
              <a href="#request-help" className="home-btn home-btn-primary">
                <Calendar className="h-4 w-4" />
                Request a callback
              </a>
              <a href="mailto:techwiz@calvinsturm.com" className="home-btn home-btn-ghost">
                <Mail className="h-4 w-4" />
                Email Tech Wiz
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="home-shell home-footer-grid">
          <div>
            <a href="/tech-support" className="home-brand home-footer-brand">
              <img src="/techWizIcon.png" alt="Tech Wiz" width={28} height={28} />
              <span>Tech Wiz</span>
            </a>
            <p className="home-footer-blurb">
              Patient in-home tech support for the Five Cities, Santa Maria, Orcutt, Lompoc, and nearby areas. The
              local services side of Sturm Technologies LLC.
            </p>
          </div>
          <nav aria-label="Explore">
            <h3>Explore</h3>
            {navItems.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
            <a href="/">Sturm Technologies home</a>
          </nav>
          <nav aria-label="Contact">
            <h3>Contact</h3>
            <a href="mailto:techwiz@calvinsturm.com">techwiz@calvinsturm.com</a>
            <a href="#request-help">Request a callback</a>
          </nav>
        </div>
        <div className="home-shell home-footer-legal">
          © {new Date().getFullYear()} Sturm Technologies LLC · Local in-home tech support.
        </div>
      </footer>

      <div className="svc-mobilebar">
        <div className="svc-mobilebar-inner">
          <a href="mailto:techwiz@calvinsturm.com" className="home-btn home-btn-primary">
            <Mail className="h-4 w-4" />
            Email
          </a>
          <a href="#request-help" className="home-btn home-btn-ghost">
            <Calendar className="h-4 w-4" />
            Callback
          </a>
        </div>
      </div>
    </div>
  );
}
