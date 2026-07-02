import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export const navLinks = [
  ['/fast-series', 'Fast Series'],
  ['/fastcast', 'FastCast'],
  ['/fastplay', 'FastPlay'],
  ['/roadmap', 'Roadmap'],
  ['/projects', 'Projects'],
  ['/tech-support', 'Tech Support'],
] as const;

const fastSeriesLinks = [
  ['/fast-series', 'Overview'],
  ['/fastcast', 'FastCast'],
  ['/fastplay', 'FastPlay'],
  ['/fastclip', 'FastClip'],
  ['/fastcompress', 'FastCompress'],
  ['/fastshorts', 'FastShorts'],
] as const;

export function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <>
      <a href="#main-content" className="home-skip-link">
        Skip to main content
      </a>

      <header className="home-header">
        <div className="home-shell home-header-inner">
          <a href="/" className="home-brand" aria-label="Calvin Sturm home">
            <img src="/sturm-mark.svg" alt="Sturm Technologies" width={30} height={30} />
            <span>Calvin Sturm</span>
          </a>

          <nav className="home-nav" aria-label="Primary">
            {navLinks.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>

          <div className="home-header-actions">
            <a href="/fast-series" className="home-btn home-btn-primary home-btn-compact">
              Explore Fast Series
            </a>
            <button
              type="button"
              className="home-menu-toggle"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="home-mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="home-mobile-menu" className="home-mobile-menu" aria-label="Primary mobile">
            <div className="home-shell">
              {navLinks.map(([href, label]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              ))}
              <a href="/fast-series" className="home-btn home-btn-primary home-mobile-cta" onClick={() => setMenuOpen(false)}>
                Explore Fast Series
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

export function HomeFooter() {
  return (
    <footer className="home-footer">
      <div className="home-shell home-footer-grid">
        <div>
          <a href="/" className="home-brand home-footer-brand">
            <img src="/sturm-mark.svg" alt="Sturm Technologies" width={28} height={28} />
            <span>Calvin Sturm</span>
          </a>
          <p className="home-footer-blurb">
            Practical Windows software and local-first creator tools, built by Calvin Sturm through Sturm
            Technologies LLC.
          </p>
        </div>
        <nav aria-label="Fast Series">
          <h3>Fast Series</h3>
          {fastSeriesLinks.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <nav aria-label="Explore">
          <h3>Explore</h3>
          <a href="/roadmap">Product roadmap</a>
          <a href="/projects">Projects</a>
          <a href="/build">Websites &amp; software</a>
          <a href="/tech-support">Tech support</a>
          <a href="https://github.com/CalvinSturm" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="mailto:calvinsturm@gmail.com">calvinsturm@gmail.com</a>
        </nav>
      </div>
      <div className="home-shell home-footer-legal">© {new Date().getFullYear()} Sturm Technologies LLC</div>
    </footer>
  );
}
