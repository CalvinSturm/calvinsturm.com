import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, BookOpen, Download } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { trackCtaClick, trackEvent } from '../lib/analytics';

// Config-driven guide system shared by the per-product guide hubs
// (src/fastplay-guides, src/fastcast-guides). Each product binds its own
// data, theme variant, CTAs, and footer via createProductGuides(); the DOM
// and class names here match the original FastPlay guide implementation so
// existing guide styling (.product-guide rules in index.css) applies to
// every product, themed by the product-landing-<variant> variables.

export type GuideMeta = {
  slug: string;
  /** H1 and document title of the article. */
  title: string;
  /** Short label used in cards, breadcrumbs, and related-guide lists. */
  shortTitle: string;
  /** Card blurb; also mirrors the meta description in the HTML entry. */
  description: string;
  category: string;
  /** ISO dates, shown on the article and mirrored in Article JSON-LD. */
  published: string;
  updated: string;
  /** Slugs of two or three genuinely related guides. */
  related: string[];
};

export type TocEntry = { id: string; label: string };

export type ProductGuidesConfig = {
  /** Theme suffix: wrapper gets product-landing-<variant>. */
  variant: string;
  brand: string;
  brandIconUrl: string;
  productPath: string;
  guidesIndexPath: string;
  downloadUrl: string;
  /** Primary CTA label, e.g. "Download FastPlay". */
  downloadLabel: string;
  /** Secondary CTA under the download button; links to the product page. */
  secondaryCtaLabel: string;
  SecondaryCtaIcon: LucideIcon;
  navLinks: Array<{ href: string; label: string; external?: boolean }>;
  footer: ReactNode;
  /** Monospace qualifier line under the top CTA buttons. */
  topCtaMeta: string;
  /** Monospace qualifier line under the final CTA buttons. */
  finalCtaMeta: string;
  authorName: string;
  guides: GuideMeta[];
  guidePath: (slug: string) => string;
  indexEyebrow: string;
  indexTitle: string;
  indexLede: string;
  indexFinalCtaHeading: string;
  indexFinalCtaBody: string;
};

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function externalProps(external?: boolean) {
  return external ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {};
}

export type GuideLayoutProps = {
  slug: string;
  toc: TocEntry[];
  /** One-or-two sentence direct answer rendered as the article lede. */
  lede: ReactNode;
  topCtaNote: string;
  finalCtaHeading: string;
  finalCtaBody: string;
  children: ReactNode;
};

export function createProductGuides(config: ProductGuidesConfig) {
  const guideBySlug: Record<string, GuideMeta> = Object.fromEntries(
    config.guides.map((g) => [g.slug, g]),
  );
  const categories = [...new Set(config.guides.map((g) => g.category))];

  function GuideChrome({ children }: { children: ReactNode }) {
    return (
      <div className={`product-landing product-landing-${config.variant} product-guide`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
        >
          Skip to main content
        </a>
        <header className="product-site-header" aria-label={`${config.brand} guides navigation`}>
          <a href={config.productPath} className="product-brand" aria-label={`${config.brand} product page`}>
            <img src={config.brandIconUrl} alt="" className="product-brand-mark" width="30" height="30" aria-hidden="true" />
            <span>{config.brand}</span>
          </a>
          <nav className="product-nav-links" aria-label={`${config.brand} pages`}>
            {config.navLinks.map((link) => (
              <a key={`${link.href}-${link.label}`} href={link.href} {...externalProps(link.external)}>
                {link.label}
              </a>
            ))}
          </nav>
        </header>
        <main id="main-content">{children}</main>
        <footer className="product-site-footer">{config.footer}</footer>
      </div>
    );
  }

  function Breadcrumbs({ current }: { current?: string }) {
    return (
      <nav aria-label="Breadcrumb" className="guide-breadcrumbs">
        <ol>
          <li>
            <a href={config.productPath}>{config.brand}</a>
          </li>
          <li>
            {current ? <a href={config.guidesIndexPath}>Guides</a> : <span aria-current="page">Guides</span>}
          </li>
          {current && (
            <li>
              <span aria-current="page">{current}</span>
            </li>
          )}
        </ol>
      </nav>
    );
  }

  function DownloadCta({ compact = false, ctaLocation = compact ? 'top' : 'final' }: { compact?: boolean; ctaLocation?: string }) {
    const SecondaryIcon = config.SecondaryCtaIcon;
    return (
      <div className={compact ? 'guide-cta-actions' : 'product-hero-actions guide-cta-actions'}>
        <a
          href={config.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="product-button product-button-primary"
          onClick={() => trackCtaClick(config.variant, 'download_clicked', ctaLocation, config.downloadUrl)}
        >
          <Download className="h-5 w-5" aria-hidden="true" />
          {config.downloadLabel}
        </a>
        <a
          href={config.productPath}
          className="product-button product-button-secondary"
          onClick={() => trackCtaClick(config.variant, 'guide_product_cta_clicked', ctaLocation, config.productPath)}
        >
          <SecondaryIcon className="h-5 w-5" aria-hidden="true" />
          {config.secondaryCtaLabel}
        </a>
      </div>
    );
  }

  /** Compact CTA shown right after the direct answer at the top of a guide. */
  function TopCta({ note }: { note: string }) {
    return (
      <aside className="guide-cta guide-cta-top" aria-label={config.downloadLabel}>
        <p className="guide-cta-note">{note}</p>
        <DownloadCta compact />
        <p className="guide-cta-meta">{config.topCtaMeta}</p>
      </aside>
    );
  }

  /** Contextual CTA for use inside the article body. */
  function InlineCta({ children }: { children: ReactNode }) {
    return (
      <aside className="guide-cta guide-cta-inline" aria-label={`Try ${config.brand}`}>
        <p className="guide-cta-note">{children}</p>
        <a
          href={config.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="guide-cta-link"
          onClick={() => trackCtaClick(config.variant, 'download_clicked', 'inline', config.downloadUrl)}
        >
          {config.downloadLabel} for Windows
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </aside>
    );
  }

  function FinalCta({ heading, body }: { heading: string; body: string }) {
    return (
      <section className="guide-cta guide-cta-final" aria-label={`Get ${config.brand}`}>
        <h2>{heading}</h2>
        <p className="guide-cta-note">{body}</p>
        <DownloadCta />
        <p className="guide-cta-meta">{config.finalCtaMeta}</p>
      </section>
    );
  }

  function TableOfContents({ entries }: { entries: TocEntry[] }) {
    return (
      <nav className="guide-toc" aria-label="On this page">
        <h2>On this page</h2>
        <ol>
          {entries.map((entry) => (
            <li key={entry.id}>
              <a href={`#${entry.id}`}>{entry.label}</a>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  function GuideCard({ guide }: { guide: GuideMeta }) {
    return (
      <a
        href={config.guidePath(guide.slug)}
        className="guide-card"
        onClick={() =>
          trackEvent(`${config.variant}_related_guide_clicked`, {
            product: config.variant,
            source_path: typeof location !== 'undefined' ? location.pathname : '',
            guide_slug: guide.slug,
            destination: config.guidePath(guide.slug),
          })
        }
      >
        <p className="guide-card-category">{guide.category}</p>
        <h3>{guide.shortTitle}</h3>
        <p className="guide-card-copy">{guide.description}</p>
        <span className="guide-card-more">
          Read the guide
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </a>
    );
  }

  function RelatedGuides({ slugs }: { slugs: string[] }) {
    const related = slugs.map((slug) => guideBySlug[slug]).filter(Boolean);
    if (related.length === 0) return null;
    return (
      <section className="guide-related" aria-labelledby="related-guides-heading">
        <h2 id="related-guides-heading">Related guides</h2>
        <div className="guide-grid">
          {related.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>
    );
  }

  function GuideLayout({
    slug,
    toc,
    lede,
    topCtaNote,
    finalCtaHeading,
    finalCtaBody,
    children,
  }: GuideLayoutProps) {
    const meta = guideBySlug[slug];

    useEffect(() => {
      trackEvent(`${config.variant}_guide_viewed`, {
        product: config.variant,
        guide_slug: slug,
        source_path: typeof location !== 'undefined' ? location.pathname : '',
        referrer_path: typeof document !== 'undefined' ? document.referrer : '',
      });
    }, [slug]);

    return (
      <GuideChrome>
        <article className="guide-shell">
          <Breadcrumbs current={meta.shortTitle} />
          <header className="guide-header">
            <p className="guide-category">{meta.category}</p>
            <h1>{meta.title}</h1>
            <p className="guide-lede">{lede}</p>
            <p className="guide-dates">
              {meta.updated !== meta.published ? (
                <>
                  Updated <time dateTime={meta.updated}>{formatDate(meta.updated)}</time>
                  {' · '}
                  Published <time dateTime={meta.published}>{formatDate(meta.published)}</time>
                </>
              ) : (
                <>
                  Published <time dateTime={meta.published}>{formatDate(meta.published)}</time>
                </>
              )}
              {' · '}By {config.authorName}
            </p>
          </header>

          <TopCta note={topCtaNote} />
          <TableOfContents entries={toc} />

          <div className="guide-body">{children}</div>

          <FinalCta heading={finalCtaHeading} body={finalCtaBody} />
          <RelatedGuides slugs={meta.related} />
        </article>
      </GuideChrome>
    );
  }

  function GuideSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
    return (
      <section id={id} className="guide-section" aria-labelledby={`${id}-heading`}>
        <h2 id={`${id}-heading`}>{title}</h2>
        {children}
      </section>
    );
  }

  function GuidesIndexPage() {
    useEffect(() => {
      trackEvent(`${config.variant}_guide_viewed`, {
        product: config.variant,
        guide_slug: 'index',
        source_path: typeof location !== 'undefined' ? location.pathname : '',
        referrer_path: typeof document !== 'undefined' ? document.referrer : '',
      });
    }, []);

    return (
      <GuideChrome>
        <div className="guide-shell">
          <Breadcrumbs />
          <header className="guide-header">
            <p className="guide-category">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {config.indexEyebrow}
            </p>
            <h1>{config.indexTitle}</h1>
            <p className="guide-lede">{config.indexLede}</p>
          </header>

          {categories.map((category) => {
            const items = config.guides.filter((g) => g.category === category);
            if (items.length === 0) return null;
            return (
              <section key={category} className="guide-index-group" aria-label={category}>
                <h2>{category}</h2>
                <div className="guide-grid">
                  {items.map((guide) => (
                    <GuideCard key={guide.slug} guide={guide} />
                  ))}
                </div>
              </section>
            );
          })}

          <FinalCta heading={config.indexFinalCtaHeading} body={config.indexFinalCtaBody} />
        </div>
      </GuideChrome>
    );
  }

  return { GuideLayout, GuideSection, InlineCta, TopCta, DownloadCta, GuidesIndexPage, guideBySlug };
}
