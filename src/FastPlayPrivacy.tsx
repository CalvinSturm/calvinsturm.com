const policyUrl = 'https://www.calvinsturm.com/fastplay/privacy';

const serviceRows = [
  {
    service: 'Vercel',
    when: 'When you visit a FastPlay page on calvinsturm.com.',
    data: 'Hosting request data may include an IP address, request time, page, browser, device, referrer, and approximate location. Vercel Web Analytics provides aggregated pageview and click-event statistics without advertising cookies or a cross-site user profile.',
    href: 'https://vercel.com/legal/privacy-notice',
  },
  {
    service: 'Google Fonts',
    when: 'When a FastPlay product page requests its web typefaces.',
    data: 'Your browser contacts Google to retrieve a stylesheet and font files. Google receives ordinary request information such as your IP address, browser or device details, requested resource, time, and referrer under its own privacy policy.',
    href: 'https://policies.google.com/privacy',
  },
  {
    service: 'GitHub',
    when: 'When you download FastPlay, visit its source or release pages, or use GitHub Issues.',
    data: 'GitHub receives ordinary connection and account information under its own policy. Information you place in a public issue, discussion, or contribution may be publicly visible. FastPlay itself does not contact GitHub or check for updates.',
    href: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement',
  },
] as const;

const categoryRows = [
  {
    category: 'Identifiers and contact information',
    examples: 'Name, email address, GitHub username, IP address, and information you include in a message or privacy request.',
    sources: 'You; website hosting; GitHub when you choose to interact there.',
    purpose: 'Support, website security, legal compliance, and responding to privacy requests.',
  },
  {
    category: 'Internet and website activity',
    examples: 'Pages viewed, referrer, browser, operating system, device type, approximate location, and FastPlay download-link events.',
    sources: 'Your browser and network connection through Vercel, Google Fonts, and GitHub when you follow an external link.',
    purpose: 'Deliver and secure the website, render its typefaces, understand aggregate traffic, and measure whether product links work.',
  },
  {
    category: 'Technical support information',
    examples: 'App version, Windows version, hardware or decoder details, error information, media paths, screenshots, and logs you choose to share.',
    sources: 'You, only when you contact us, open an issue, or deliberately share diagnostic material.',
    purpose: 'Diagnose problems, answer support requests, and improve reliability and security.',
  },
] as const;

export function FastPlayPrivacy() {
  return (
    <div className="fc fc-policy fc-policy-fastplay">
      <a className="fc-skip" href="#privacy-main">Skip to main content</a>

      <header className="fc-bar">
        <a className="fc-mark" href="/fastplay" aria-label="FastPlay product page">
          <span className="fc-tally" aria-hidden="true" />
          <img src="/assets/FastPlay/fastplay.png" alt="" width="30" height="30" />
          FastPlay
        </a>
        <nav aria-label="Privacy policy sections">
          <a href="#app-data">App data</a>
          <a href="#online-services">Online services</a>
          <a href="#disclosures">Disclosures</a>
          <a href="#rights">Your rights</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="fc-bar-right">
          <a className="fc-btn fc-btn-ghost" href="/fastplay">FastPlay home</a>
        </div>
      </header>

      <main id="privacy-main">
        <section id="overview" className="fc-unit fc-policy-hero" aria-labelledby="privacy-title">
          <div className="fc-unit-inner fc-unit-blank">
            <div className="fc-unit-body">
              <p className="fc-eyebrow">Legal · FastPlay</p>
              <h1 id="privacy-title">FastPlay Privacy Policy</h1>
              <p className="fc-unit-lede">
                This policy explains how Sturm Technologies LLC handles information in connection with the FastPlay
                Windows application, the FastPlay pages on calvinsturm.com, downloads, and FastPlay support.
              </p>
              <dl className="fc-policy-meta">
                <div><dt>Effective</dt><dd>August 23, 2026</dd></div>
                <div><dt>Last updated</dt><dd>August 23, 2026</dd></div>
                <div><dt>Policy URL</dt><dd><a href={policyUrl}>{policyUrl}</a></dd></div>
              </dl>
              <div className="fc-policy-summary" aria-labelledby="summary-title">
                <h2 id="summary-title">The short version</h2>
                <ul>
                  <li>Your media stays on your computer. FastPlay has no streaming or cloud-media feature.</li>
                  <li>The app has no account, telemetry, licensing service, automatic update check, or automatic crash upload.</li>
                  <li>Recent-file paths, resume positions, preferences, screenshots, and diagnostic logs are stored locally.</li>
                  <li>The website uses Vercel analytics and links to GitHub for downloads and source code.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="scope" className="fc-unit" aria-labelledby="scope-title">
          <div className="fc-unit-inner">
            <p className="fc-rail" aria-hidden="true"><b>001</b><span>Scope</span></p>
            <div className="fc-unit-body fc-policy-copy">
              <h2 id="scope-title">Who we are and what this covers</h2>
              <p>
                FastPlay is provided by <strong>Sturm Technologies LLC</strong>, a California limited liability company.
                In this policy, “FastPlay,” “we,” “us,” and “our” refer to Sturm Technologies LLC.
              </p>
              <p>
                This policy applies to FastPlay and FastPlay-specific website and support interactions. It does not govern
                the independent practices of Vercel, Google, GitHub, email providers, or other services you choose to use.
                Their policies apply when they process information for their own purposes.
              </p>
            </div>
          </div>
        </section>

        <section id="app-data" className="fc-unit" aria-labelledby="app-data-title">
          <div className="fc-unit-inner">
            <p className="fc-rail" aria-hidden="true"><b>002</b><span>Local</span></p>
            <div className="fc-unit-body fc-policy-copy">
              <h2 id="app-data-title">Information processed by the FastPlay app</h2>

              <h3>Media and subtitle files</h3>
              <p>
                FastPlay reads the local video, audio, and sidecar SRT subtitle files you choose so it can decode and display
                them. The app does not upload their contents or send their paths to Sturm Technologies. FastPlay does not
                support network media sources, streaming, or a hosted media library.
              </p>

              <h3>Recent files and resume positions</h3>
              <p>
                FastPlay keeps up to 20 recent-file records in <code>%APPDATA%\FastPlay\recent.tsv</code>. Each record can
                include the full local file path, last playback position, media duration, and last-opened time. This powers
                the Recent Files overlay and resume-on-open. You can remove an item from the overlay with the Delete key.
              </p>

              <h3>Settings</h3>
              <p>
                FastPlay stores volume and the framed or frameless window preference in
                <code>%APPDATA%\FastPlay\settings.txt</code>. The portable build uses the same AppData location; removing the
                portable program does not remove these settings or the recent-file history.
              </p>

              <h3>Screenshots</h3>
              <p>
                When you press the screenshot shortcut, FastPlay writes a BMP image to
                <code>%USERPROFILE%\Pictures\FastPlay</code>. If the Windows user-profile path is unavailable, it uses a
                <code>FastPlay Screenshots</code> folder under the current working directory. Screenshots are not uploaded.
              </p>

              <h3>Session and crash logs</h3>
              <p>
                FastPlay writes local <code>session-*.log</code> files and may write <code>crash-*.log</code> files under
                <code>%APPDATA%\FastPlay</code>. Logs can include operational events, timing and playback metrics, decoder or
                display details, errors, and local media or screenshot paths. They are not uploaded automatically. At startup,
                FastPlay attempts to delete its matching session and crash logs after they are more than seven days old.
              </p>

              <h3>Installation and file associations</h3>
              <p>
                The MSI installer places FastPlay on your computer and can register supported media-file associations in
                Windows. The portable ZIP does not require installation. These are local operating-system changes and are not
                transmitted to Sturm Technologies.
              </p>

              <aside className="fc-policy-note">
                <strong>Deleting local FastPlay data.</strong> Close every FastPlay window, then delete
                <code>%APPDATA%\FastPlay</code> to remove settings, recent-file history, and logs. Delete any screenshots from
                the folder described above. Uninstall the MSI through Windows Settings to remove the installed app; separately
                deleting the portable folder removes the portable program but not its AppData.
              </aside>
            </div>
          </div>
        </section>

        <section id="categories" className="fc-unit" aria-labelledby="categories-title">
          <div className="fc-unit-inner">
            <p className="fc-rail" aria-hidden="true"><b>003</b><span>Data</span></p>
            <div className="fc-unit-body fc-policy-copy">
              <h2 id="categories-title">Information we collect or receive</h2>
              <p>
                The following table describes the categories of personal information we have collected or may collect during
                the 12 months preceding this policy when someone visits a FastPlay page, follows a product link, contacts us,
                opens a GitHub issue, or makes a privacy request. Local media and app data are not collected by Sturm
                Technologies unless you deliberately share them for support.
              </p>
              <div className="fc-policy-table-wrap" tabIndex={0} aria-label="Personal information categories table">
                <table>
                  <thead>
                    <tr><th>Category</th><th>Examples</th><th>Sources</th><th>Purpose</th></tr>
                  </thead>
                  <tbody>
                    {categoryRows.map((row) => (
                      <tr key={row.category}>
                        <th scope="row">{row.category}</th>
                        <td>{row.examples}</td>
                        <td>{row.sources}</td>
                        <td>{row.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                We do not use sensitive personal information to infer characteristics about you. FastPlay does not collect
                biometric templates, precise geolocation, health information, or the contents of your media files.
              </p>
            </div>
          </div>
        </section>

        <section id="online-services" className="fc-unit" aria-labelledby="services-title">
          <div className="fc-unit-inner">
            <p className="fc-rail" aria-hidden="true"><b>004</b><span>Network</span></p>
            <div className="fc-unit-body fc-policy-copy">
              <h2 id="services-title">Online services and network activity</h2>
              <aside className="fc-policy-note">
                <strong>The FastPlay app makes no product-service network requests.</strong> It has no update checker,
                license validation, telemetry, analytics, advertising, cloud library, or network-source feature. Opening the
                website or a GitHub link uses your web browser and is separate from local playback.
              </aside>
              <div className="fc-policy-services">
                {serviceRows.map((row) => (
                  <article key={row.service}>
                    <h3><a href={row.href} target="_blank" rel="noopener noreferrer">{row.service}</a></h3>
                    <p><strong>When used:</strong> {row.when}</p>
                    <p><strong>Information involved:</strong> {row.data}</p>
                  </article>
                ))}
              </div>
              <h3>Payments and licensing</h3>
              <p>
                FastPlay is free and open source under the MIT License. There is no FastPlay checkout, paid account, product
                key, license-validation service, or subscription, so we do not collect payment or licensing information for
                FastPlay.
              </p>
            </div>
          </div>
        </section>

        <section id="website" className="fc-unit" aria-labelledby="website-title">
          <div className="fc-unit-inner">
            <p className="fc-rail" aria-hidden="true"><b>005</b><span>Web</span></p>
            <div className="fc-unit-body fc-policy-copy">
              <h2 id="website-title">FastPlay website analytics and tracking</h2>
              <p>
                FastPlay pages are hosted by Vercel. Like most hosting providers, Vercel processes ordinary request and
                security logs, which may include IP address, time, requested URL, browser, device, referrer, and approximate
                location. FastPlay pages also use Vercel Web Analytics for aggregated pageviews and selected download-link
                events. A custom event can include the product name, action, source page path, button location, and the fixed
                public GitHub destination URL. It does not include names, email addresses, local file paths, media content, or
                app logs.
              </p>
              <p>
                We do not use third-party advertising pixels, behavioral advertising, or analytics cookies on FastPlay pages.
                Vercel states that Web Analytics does not tie analytics events to an individual or IP address, does not use
                third-party cookies, and discards its visitor-session hash after 24 hours. See Vercel’s{' '}
                <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">
                  Web Analytics privacy documentation
                </a>.
              </p>
              <h3>Do Not Track and Global Privacy Control</h3>
              <p>
                Browsers may offer Do Not Track (DNT) or Global Privacy Control (GPC) signals. Because we do not sell or share
                personal information for cross-context behavioral advertising and do not serve targeted ads, these signals do
                not currently change the behavior of FastPlay pages. We will treat a legally applicable opt-out preference
                signal as a valid request if our practices change in a way that requires it.
              </p>
            </div>
          </div>
        </section>

        <section id="disclosures" className="fc-unit" aria-labelledby="disclosures-title">
          <div className="fc-unit-inner">
            <p className="fc-rail" aria-hidden="true"><b>006</b><span>Sharing</span></p>
            <div className="fc-unit-body fc-policy-copy">
              <h2 id="disclosures-title">How information is used and disclosed</h2>
              <p>We use personal information only as reasonably necessary to:</p>
              <ul>
                <li>provide, secure, maintain, and support FastPlay;</li>
                <li>deliver and protect the website and understand aggregate product-page traffic;</li>
                <li>respond to messages, GitHub issues, support requests, and privacy requests;</li>
                <li>establish, exercise, or defend legal claims and comply with applicable law; and</li>
                <li>complete a merger, acquisition, financing, reorganization, or sale of assets, subject to appropriate safeguards.</li>
              </ul>
              <p>
                We disclose information to the service providers described above for those purposes, to professional advisers
                under confidentiality obligations, and to authorities or other parties when reasonably necessary to comply with
                law, protect rights and safety, or investigate fraud or abuse.
              </p>
              <aside className="fc-policy-note">
                <strong>No sale or behavioral-advertising sharing.</strong> We do not sell personal information, share it for
                cross-context behavioral advertising, or disclose it to third parties for their own direct marketing. We have no
                actual knowledge that we sell or share personal information of anyone under 16. We do not offer a financial
                incentive in exchange for personal information.
              </aside>
              <h3>Legal bases for users in the EEA, United Kingdom, and similar jurisdictions</h3>
              <p>
                Where a legal basis is required, we process information to provide services or support you request, for our
                legitimate interests in operating and securing FastPlay and its website, to comply with legal obligations, and
                with consent where the law requires consent. You may withdraw consent at any time, without affecting processing
                that occurred before withdrawal.
              </p>
            </div>
          </div>
        </section>

        <section id="retention" className="fc-unit" aria-labelledby="retention-title">
          <div className="fc-unit-inner">
            <p className="fc-rail" aria-hidden="true"><b>007</b><span>Storage</span></p>
            <div className="fc-unit-body fc-policy-copy">
              <h2 id="retention-title">Retention, security, and international processing</h2>
              <h3>Retention</h3>
              <p>
                Local media, settings, recent-file records, screenshots, and logs remain under your control until removed as
                described above. FastPlay retains at most 20 recent-file records and attempts to remove its session and crash
                logs after seven days. We retain support correspondence, issue records, and privacy-request records only as long
                as reasonably necessary for support, security, dispute resolution, and legal obligations. Our providers retain
                information under their own policies and our arrangements with them.
              </p>
              <h3>Security</h3>
              <p>
                We use reasonable administrative and technical safeguards appropriate to the information involved. FastPlay’s
                playback data stays local, and website connections use HTTPS. Logs are not automatically uploaded. No storage
                or transmission method is completely secure, so review any log, screenshot, or path information before posting
                it publicly or sending it to support.
              </p>
              <h3>International processing</h3>
              <p>
                Sturm Technologies is based in the United States. Our providers may process information in the United States and
                other countries where privacy laws differ from those where you live. Where required, we rely on recognized legal
                mechanisms and provider safeguards for international transfers.
              </p>
            </div>
          </div>
        </section>

        <section id="rights" className="fc-unit" aria-labelledby="rights-title">
          <div className="fc-unit-inner">
            <p className="fc-rail" aria-hidden="true"><b>008</b><span>Control</span></p>
            <div className="fc-unit-body fc-policy-copy">
              <h2 id="rights-title">Your privacy rights and choices</h2>
              <p>
                Depending on where you live, you may have rights to request access to or a copy of personal information,
                correction, deletion, restriction, portability, or information about sources, purposes, and disclosures. You may
                also have a right to object to certain processing, withdraw consent, opt out of a sale, sharing, or targeted
                advertising, and appeal a denied request. We will not discriminate against you for exercising an applicable right.
              </p>
              <p>
                California residents may request to know, access, correct, or delete covered personal information and may use an
                authorized agent where permitted. Because we do not sell or share personal information as those terms are defined
                for cross-context behavioral advertising, there is no separate “Do Not Sell or Share” link. Residents of the EEA
                or United Kingdom may also complain to their local data-protection authority.
              </p>
              <p>
                To make a request, email <a href="mailto:calvinsturm@gmail.com?subject=Privacy%20Request%20-%20FastPlay">calvinsturm@gmail.com</a>{' '}
                with the subject <strong>Privacy Request – FastPlay</strong>. Describe the request and the FastPlay interaction it
                concerns. We may ask for information reasonably necessary to verify your identity or an agent’s authority. If we
                deny a request, reply with <strong>Privacy Appeal</strong> to request review. Some information may be exempt from a
                request under applicable law.
              </p>
            </div>
          </div>
        </section>

        <section id="children" className="fc-unit" aria-labelledby="children-title">
          <div className="fc-unit-inner">
            <p className="fc-rail" aria-hidden="true"><b>009</b><span>Updates</span></p>
            <div className="fc-unit-body fc-policy-copy">
              <h2 id="children-title">Children and policy changes</h2>
              <h3>Children</h3>
              <p>
                FastPlay is a general-audience media player and is not directed to children under 13. We do not knowingly
                collect personal information from children under 13. If you believe a child has provided personal information
                to us, contact us so we can review and delete it as appropriate.
              </p>
              <h3>Changes to this policy</h3>
              <p>
                We may update this policy to reflect product, provider, or legal changes. The current version will remain at this
                URL with a revised “Last updated” date. If a change materially affects how we use information already collected,
                we will provide any additional notice or choice required by law, which may include release notes, a website notice,
                or direct communication when contact information is available.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="fc-unit fc-policy-contact" aria-labelledby="contact-title">
          <div className="fc-unit-inner">
            <p className="fc-rail" aria-hidden="true"><b>010</b><span>Contact</span></p>
            <div className="fc-unit-body fc-policy-copy">
              <h2 id="contact-title">Contact Sturm Technologies</h2>
              <p>Questions, privacy requests, and concerns can be sent to:</p>
              <address>
                <strong>Sturm Technologies LLC</strong><br />
                California, United States<br />
                <a href="mailto:calvinsturm@gmail.com">calvinsturm@gmail.com</a>
              </address>
              <p>Policy URL: <a href={policyUrl}>{policyUrl}</a></p>
            </div>
          </div>
        </section>
      </main>

      <footer className="fc-foot">
        <div className="fc-unit-inner">
          <p><b>FastPlay</b> · Privacy Policy · Sturm Technologies LLC</p>
          <nav aria-label="FastPlay privacy footer links">
            <a href="/fastplay">FastPlay home</a>
            <a href="/fastplay/guides">Guides</a>
            <a href="/fast-series">Fast Series</a>
            <a href="mailto:calvinsturm@gmail.com">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
