import { Suspense, lazy, useEffect, useState } from 'react';
import { HomeHeader, HomeFooter } from './HomeChrome.tsx';
import { fastCastDownloadUrl, guides as fastCastGuides } from './fastcast-guides/guides-data';
import { guides as fastPlayGuides } from './fastplay-guides/guides-data';
import { guides as fastClipGuides } from './fastclip-guides/guides-data';
import { guides as fastCompressGuides } from './fastcompress-guides/guides-data';
import { products, type Product, type ProductAction } from './home/products';
import { trackCtaClick } from './lib/analytics';

// The homepage is the Fast Series store. At the top, a 3D shelf holds the five
// apps; picking one (on the shelf or with the tabs under it) fills the panel
// with that app's price, status and downloads. Below that: real screenshots,
// guides, trust notes, and the company.
//
// The shelf is client-only. The prerendered HTML and the first client render
// both show the flat icon shelf, so hydration matches; the WebGL scene swaps in
// once it has loaded, and stays out if WebGL is unavailable.

const StoreScene = lazy(() => import('./home/StoreScene.tsx'));

function track(product: Product['slug'], action: ProductAction, location: string) {
  if (action.kind === 'download') trackCtaClick(product, 'download_clicked', location, action.href);
  else if (action.kind === 'pro') trackCtaClick(product, 'license_clicked', location, action.href);
  else if (action.kind === 'source') trackCtaClick(product, 'github_clicked', location, action.href);
}

type Variant = 'primary' | 'pro' | 'ghost' | 'link';

function ActionLink({
  product,
  action,
  location,
  variant,
}: {
  product: Product;
  action: ProductAction;
  location: string;
  variant: Variant;
}) {
  const className = variant === 'link' ? 'hm-link' : `hm-btn hm-btn-${variant}`;
  return (
    <a
      className={className}
      href={action.href}
      {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={() => track(product.slug, action, location)}
    >
      {action.label}
    </a>
  );
}

function variantFor(action: ProductAction, first: boolean): Variant {
  if (action.kind === 'pro') return 'pro';
  if (first) return 'primary';
  if (action.kind === 'page') return 'link';
  return 'ghost';
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function useClientFlags() {
  const [flags, setFlags] = useState({ ready: false, webgl: false, reducedMotion: false });
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const webgl = supportsWebGL();
    // ?motion=on shows the animated shelf even when the OS asks for reduced
    // motion, so the animated path can be reviewed from a machine that has it off.
    const forceMotion = new URLSearchParams(window.location.search).get('motion') === 'on';
    const update = () => setFlags({ ready: true, webgl, reducedMotion: query.matches && !forceMotion });
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return flags;
}

/** The flat shelf: what the prerender ships, and the view without WebGL. */
function FlatShelf({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  return (
    <div className="hm-flat" aria-hidden="true">
      {products.map((p, i) => (
        <button
          key={p.slug}
          type="button"
          tabIndex={-1}
          className={`hm-flat-box${i === selected ? ' is-selected' : ''}`}
          style={{ ['--box' as string]: p.color }}
          onClick={() => onSelect(i)}
        >
          <img src={p.icon384} alt="" width={120} height={120} />
          <span className="hm-flat-name">{p.name}</span>
          <span className="hm-flat-verb">{p.verb}</span>
        </button>
      ))}
    </div>
  );
}

function ProductPanel({ product }: { product: Product }) {
  return (
    <div className="hm-panel">
      <div className="hm-panel-main">
        <p className="hm-panel-verb">{product.verb}</p>
        <h2 className="hm-panel-name">{product.name}</h2>
        <p className="hm-panel-meta">
          <span className="hm-status">{product.status}</span>
          {product.version ? <span>v{product.version}</span> : null}
          <span>Windows 10 and 11</span>
        </p>
        <p className="hm-panel-summary">{product.summary}</p>
        <ul className="hm-points">
          {product.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="hm-panel-buy">
        <div className={`hm-price hm-price-${product.priceTone}`}>
          <strong>{product.price}</strong>
          <span>{product.priceNote}</span>
        </div>
        <div className="hm-actions hm-actions-stack">
          {product.actions.map((action, i) => (
            <ActionLink
              key={action.label}
              product={product}
              action={action}
              location="store"
              variant={variantFor(action, i === 0)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const guideShelves = [
  { name: 'FastCast', href: '/fastcast/guides', topic: 'Screen recording and streaming', count: fastCastGuides.length },
  { name: 'FastPlay', href: '/fastplay/guides', topic: 'Video playback', count: fastPlayGuides.length },
  { name: 'FastClip', href: '/fastclip/guides', topic: 'Vertical clips', count: fastClipGuides.length },
  { name: 'FastCompress', href: '/fastcompress/guides', topic: 'Video compression', count: fastCompressGuides.length },
];

const checks = [
  {
    title: 'Public releases',
    body: 'Builds ship on public GitHub releases pages with notes on what changed in each version.',
    href: 'https://github.com/CalvinSturm',
    link: 'GitHub',
  },
  {
    title: 'FastPlay is open source',
    body: 'MIT licensed. Read the code, build it yourself, or file an issue.',
    href: 'https://github.com/CalvinSturm/FastPlay',
    link: 'FastPlay source',
  },
  {
    title: 'Your files stay on your PC',
    body: 'FastCast has no account, no watermark, and no telemetry. FastClip analyzes footage locally. FastCompress has no account and no watermark.',
    href: '/fastcast/privacy',
    link: 'FastCast privacy policy',
  },
  {
    title: 'Unsigned during beta',
    body: 'Windows SmartScreen may show an Unknown Publisher warning the first time you run a beta app. That is expected until code signing is in place.',
  },
];

export default function HomeApp() {
  const [selected, setSelected] = useState(0);
  const { ready, webgl, reducedMotion } = useClientFlags();
  const product = products[selected];
  const show3d = ready && webgl;

  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (selected + (e.key === 'ArrowRight' ? 1 : products.length - 1)) % products.length;
    setSelected(next);
    document.getElementById(`hm-tab-${products[next].slug}`)?.focus();
  };

  return (
    <div className="home-landing hm">
      <HomeHeader
        cta={{
          href: fastCastDownloadUrl,
          label: 'Download FastCast',
          external: true,
          onClick: () => trackCtaClick('fastcast', 'download_clicked', 'header', fastCastDownloadUrl),
        }}
      />

      <main id="main-content">
        {/* Store: title, 3D shelf, tabs, product panel */}
        <section className="hm-store" aria-labelledby="hm-title">
          <div className="hm-shell hm-store-head">
            <h1 id="hm-title" className="hm-title">
              <span>Record. Stream.</span> <span>Clip. Done.</span>
            </h1>
            <p className="hm-lede">
              The Fast Series: focused Windows creator tools that do their job without turning your workflow into a
              project. Pick one off the shelf.
            </p>
          </div>

          <div className="hm-stage">
            {show3d ? (
              <Suspense fallback={<FlatShelf selected={selected} onSelect={setSelected} />}>
                <StoreScene products={products} selected={selected} onSelect={setSelected} reducedMotion={reducedMotion} />
              </Suspense>
            ) : (
              <FlatShelf selected={selected} onSelect={setSelected} />
            )}
          </div>

          <div className="hm-shell hm-store-body">
            <div className="hm-tabs" role="tablist" aria-label="Fast Series apps" onKeyDown={onTabKey}>
              {products.map((p, i) => (
                <button
                  key={p.slug}
                  id={`hm-tab-${p.slug}`}
                  type="button"
                  role="tab"
                  aria-selected={i === selected}
                  aria-controls="hm-panel"
                  tabIndex={i === selected ? 0 : -1}
                  className="hm-tab"
                  style={{ ['--box' as string]: p.color }}
                  onClick={() => setSelected(i)}
                >
                  <img src={p.icon} alt="" width={28} height={28} />
                  <span className="hm-tab-name">{p.name}</span>
                  <span className="hm-tab-price">{p.boxPrice.replace('  /  ', ', ')}</span>
                </button>
              ))}
            </div>

            <div id="hm-panel" role="tabpanel" aria-labelledby={`hm-tab-${product.slug}`}>
              <ProductPanel product={product} />
            </div>
          </div>
        </section>

        {/* Real product media */}
        <section className="hm-section hm-shell" aria-labelledby="hm-media-title">
          <div className="hm-head">
            <h2 id="hm-media-title">Straight from the apps</h2>
            <p>Real captures, not mockups.</p>
          </div>

          <div className="hm-showcase">
            <figure className="hm-shot">
              <img
                src="/assets/FastCast/fastcast-green-screen.png"
                alt="FastCast recording a game at 1440p60 with a green-screened webcam in the corner"
                width={730}
                height={792}
                loading="lazy"
              />
              <figcaption>
                <strong>FastCast</strong> mid-recording, with the webcam keyed over the game.
              </figcaption>
            </figure>
            <figure className="hm-shot">
              <img
                src="/assets/FastCast/fastcast-advanced-view.png"
                alt="FastCast detailed view with capture, audio and webcam, stream, and advanced encoder panels"
                width={726}
                height={1124}
                loading="lazy"
              />
              <figcaption>
                <strong>FastCast</strong> detailed view. Press F2 to switch.
              </figcaption>
            </figure>
            <figure className="hm-shot">
              <video
                src="/assets/FastPlay/fastplay-demo.mp4"
                poster="/assets/FastPlay/fastplay-demo-poster.jpg"
                width={544}
                height={988}
                controls
                muted
                playsInline
                preload="none"
                aria-label="FastPlay playing a vertical beach video"
              />
              <figcaption>
                <strong>FastPlay</strong> playing a local file.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Guides */}
        <section className="hm-section hm-shell" aria-labelledby="hm-guides-title">
          <div className="hm-head">
            <h2 id="hm-guides-title">Guides for the job, not just the app</h2>
            <p>Plain how-to articles for recording, playback, clipping, and compression on Windows.</p>
          </div>
          <ul className="hm-guides">
            {guideShelves.map((g) => (
              <li key={g.href}>
                <a href={g.href}>
                  <span className="hm-guides-topic">{g.topic}</span>
                  <span className="hm-guides-meta">
                    {g.count} {g.count === 1 ? 'guide' : 'guides'} from {g.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Trust */}
        <section className="hm-section hm-shell" aria-labelledby="hm-trust-title">
          <div className="hm-head">
            <h2 id="hm-trust-title">What you can check before you install</h2>
          </div>
          <ul className="hm-checks">
            {checks.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.href ? (
                  <a
                    className="hm-link"
                    href={item.href}
                    {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {item.link}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        {/* Company, secondary links, low-priority links */}
        <section className="hm-section hm-shell" aria-labelledby="hm-about-title">
          <div className="hm-about">
            <div className="hm-about-who">
              <img src="/sturm-mark.svg" alt="" width={40} height={40} />
              <div>
                <h2 id="hm-about-title">Made by Calvin Sturm</h2>
                <p>
                  Sturm Technologies LLC is one developer on California's Central Coast. The person who answers your
                  support email is the person who wrote the code.
                </p>
                <p className="hm-about-links">
                  <a className="hm-link" href="mailto:calvinsturm@gmail.com">
                    calvinsturm@gmail.com
                  </a>
                  <a className="hm-link" href="https://github.com/CalvinSturm" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </p>
              </div>
            </div>

            <div className="hm-also">
              <a href="/marketplace" className="hm-also-item">
                <h3>Sturm Marketplace</h3>
                <p>Windows software from independent developers, with clear versions and direct downloads.</p>
              </a>
              <a href="/build" className="hm-also-item">
                <h3>Websites and software, built for you</h3>
                <p>Custom websites, apps, and applied AI for personal brands and small businesses.</p>
              </a>
            </div>
          </div>

          <nav className="hm-minor" aria-label="More from Sturm Technologies">
            <span>Also here:</span>
            <a href="/tech-support">In-home tech support</a>
            <a href="/projects">Experiments and side projects</a>
            <a href="/roadmap">Product roadmap</a>
          </nav>
        </section>

        {/* Final CTA */}
        <section className="hm-final hm-shell" aria-labelledby="hm-final-title">
          <div className="hm-final-inner">
            <div className="hm-final-copy">
              <h2 id="hm-final-title">Start with the one you need.</h2>
              <p>FastCast and FastPlay are both free to download. Record with one, watch it back with the other.</p>
            </div>
            <div className="hm-actions">
              <ActionLink product={products[0]} action={products[0].actions[0]} location="final" variant="primary" />
              <ActionLink product={products[1]} action={products[1].actions[0]} location="final" variant="ghost" />
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}
