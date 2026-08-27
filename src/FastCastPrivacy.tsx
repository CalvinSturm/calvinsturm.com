const policyUrl = 'https://www.calvinsturm.com/fastcast/privacy';

const serviceRows = [
  {
    service: 'Vercel',
    when: 'When you visit a FastCast page on calvinsturm.com.',
    data: 'Hosting request data may include an IP address, request time, page, browser, device, referrer, and approximate location. Vercel Web Analytics provides aggregated pageview and click-event statistics without advertising cookies or a cross-site user profile.',
    href: 'https://vercel.com/legal/privacy-notice',
  },
  {
    service: 'Google Fonts',
    when: 'When a FastCast product page requests its web typefaces.',
    data: 'Your browser contacts Google to retrieve a stylesheet and font files. Google receives ordinary request information such as your IP address, browser or device details, requested resource, time, and referrer under its own privacy policy.',
    href: 'https://policies.google.com/privacy',
  },
  {
    service: 'GitHub',
    when: 'When you download FastCast, open a release page, or click Check for Updates.',
    data: 'GitHub receives ordinary connection data such as your IP address and request metadata. The manual update check sends a generic FastCast user agent and requests only the latest public release tag; it sends no recording, setting, diagnostic, path, stream key, or machine identifier.',
    href: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement',
  },
  {
    service: 'Gumroad',
    when: 'When you buy or activate a current FastCast Pro license.',
    data: 'Gumroad processes checkout, payment, buyer, transaction, and license information. FastCast activation and validation send the license key, FastCast product ID, and whether the activation-use count should increase. FastCast does not send a device name to Gumroad.',
    href: 'https://gumroad.com/privacy',
  },
  {
    service: 'Lemon Squeezy',
    when: 'When an existing license issued through the former store is activated, validated, or deactivated.',
    data: 'FastCast sends the license key and, as applicable, a user-visible Windows device label and activation instance ID. Lemon Squeezy also separately controls purchase and payment information for orders it processed.',
    href: 'https://www.lemonsqueezy.com/privacy',
  },
] as const;

const categoryRows = [
  {
    category: 'Identifiers and contact information',
    examples: 'Name, email address, IP address, and information you include in support messages.',
    sources: 'You; website hosting; Gumroad or Lemon Squeezy when relevant to a purchase or license.',
    purpose: 'Support, transaction administration, security, legal compliance, and responding to privacy requests.',
  },
  {
    category: 'Commercial and license information',
    examples: 'Product purchased, order status, license key, license provider, plan, activation status, and transaction records.',
    sources: 'You; Gumroad; Lemon Squeezy; FastCast license activation and validation.',
    purpose: 'Process purchases, activate Pro features, prevent fraud, provide support, and maintain tax and accounting records.',
  },
  {
    category: 'Internet and website activity',
    examples: 'Pages viewed, referrer, browser, operating system, device type, approximate location, and FastCast download or purchase CTA events.',
    sources: 'Your browser and network connection through Vercel hosting, Vercel Web Analytics, and Google Fonts.',
    purpose: 'Deliver and secure the website, render its typefaces, understand aggregate traffic, and measure whether product links work.',
  },
  {
    category: 'Technical support information',
    examples: 'App version, Windows version, hardware and encoder categories, error details, and redacted diagnostics you choose to send.',
    sources: 'You, only when you contact support or deliberately share a support bundle or other diagnostic material.',
    purpose: 'Diagnose problems, answer support requests, and improve reliability and security.',
  },
] as const;

export function FastCastPrivacy() {
  return (
    <div className="fc fc-policy">
      <a className="fc-skip" href="#privacy-main">Skip to main content</a>

      <header className="fc-bar">
        <a className="fc-mark" href="/fastcast" aria-label="FastCast product page">
          <span className="fc-tally" aria-hidden="true" />
          <img src="/assets/FastCast/FastCast_Icon.png" alt="" width="30" height="30" />
          FastCast
        </a>
        <nav aria-label="Privacy policy sections">
          <a href="#app-data">App data</a>
          <a href="#online-services">Online services</a>
          <a href="#disclosures">Disclosures</a>
          <a href="#rights">Your rights</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="fc-bar-right">
          <a className="fc-btn fc-btn-ghost" href="/fastcast">FastCast home</a>
        </div>
      </header>

      <main id="privacy-main">
        <section id="overview" className="fc-unit fc-policy-hero" aria-labelledby="privacy-title">
          <div className="fc-unit-inner fc-unit-blank">
            <div className="fc-unit-body">
              <p className="fc-eyebrow">Legal · FastCast</p>
              <h1 id="privacy-title">FastCast Privacy Policy</h1>
              <p className="fc-unit-lede">
                This policy explains how Sturm Technologies LLC handles information in connection with the FastCast
                Windows application, the FastCast pages on calvinsturm.com, FastCast Pro licensing, and FastCast support.
              </p>
              <dl className="fc-policy-meta">
                <div><dt>Effective</dt><dd>August 23, 2026</dd></div>
                <div><dt>Last updated</dt><dd>August 23, 2026</dd></div>
                <div><dt>Policy URL</dt><dd><a href={policyUrl}>{policyUrl}</a></dd></div>
              </dl>
              <div className="fc-policy-actions">
                <button
                  type="button"
                  className="fc-btn fc-btn-ghost fc-policy-print"
                  onClick={() => window.print()}
                >
                  Print / Save as PDF
                </button>
              </div>
              <div className="fc-policy-summary" aria-labelledby="summary-title">
                <h2 id="summary-title">The short version</h2>
                <ul>
                  <li>Your recordings stay on your computer unless you choose to livestream, upload, or share them.</li>
                  <li>FastCast has no usage telemetry, advertising SDK, account system, or automatic crash upload.</li>
                  <li>Network connections occur when you stream, manually check for updates, visit an external link, or use FastCast Pro licensing. An already activated Pro license is revalidated with its issuing store when FastCast starts.</li>
                  <li>Stream keys are session-only unless you opt in to Windows Credential Manager storage.</li>
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
                FastCast is provided by <strong>Sturm Technologies LLC</strong>, a California limited liability company.
                In this policy, “FastCast,” “we,” “us,” and “our” refer to Sturm Technologies LLC.
              </p>
              <p>
                This policy applies to FastCast and FastCast-specific website and support interactions. It does not govern
                the independent practices of streaming platforms, stores, hosting providers, GitHub, email providers, or
                other services you choose to use. Their policies apply when they process information for their own purposes.
              </p>
            </div>
          </div>
        </section>

        <section id="app-data" className="fc-unit" aria-labelledby="app-data-title">
          <div className="fc-unit-inner">
            <p className="fc-rail" aria-hidden="true"><b>002</b><span>Local</span></p>
            <div className="fc-unit-body fc-policy-copy">
              <h2 id="app-data-title">Information processed by the FastCast app</h2>

              <h3>Recordings, audio, video, and screen content</h3>
              <p>
                FastCast processes the monitor or window, microphone, desktop audio, and webcam sources you select to create
                a recording or livestream. Recordings and recovery segments are written to the output location you choose.
                Sturm Technologies does not receive or host that content. If you go live, FastCast sends the selected audio
                and video directly to the streaming endpoint you configure. RTMPS encrypts that connection in transit; plain
                RTMP does not.
              </p>

              <h3>Settings and device preferences</h3>
              <p>
                FastCast stores application preferences locally in <code>%APPDATA%\FastCast\settings.ini</code>. These may
                include capture and encoder settings, output locations, selected device references, and destination labels and
                URLs. Stream keys are deliberately excluded from the settings file.
              </p>

              <h3>Stream keys</h3>
              <p>
                Stream keys remain in memory for the current session by default. If you enable <strong>Remember stream keys</strong>,
                FastCast stores them in Windows Credential Manager, encrypted by Windows under your signed-in Windows profile.
                Turning the option off, removing a destination, or changing its platform deletes the corresponding stored key.
                FastCast does not send stream keys to Sturm Technologies; it sends them only to the streaming endpoint you choose
                when establishing a livestream.
              </p>

              <h3>Local logs, diagnostics, and support bundles</h3>
              <p>
                FastCast writes rotating operational logs under <code>%APPDATA%\FastCast\logs</code>. Logs can contain technical
                events and local output paths, but are not uploaded automatically. The in-app <strong>Save Support Bundle</strong>{' '}
                action creates a redacted ZIP locally and removes stream keys, credentials, usernames, local and network paths,
                device names, email addresses, endpoint identifiers, and secret-bearing URLs before the bundle is written.
                FastCast never uploads the bundle. You decide whether to send it to support. Command-line diagnostics created
                without the redaction option may contain more detailed local information and should be reviewed before sharing.
              </p>

              <h3>FastCast Pro license state</h3>
              <p>
                If you activate FastCast Pro, FastCast stores the license key, issuing store, plan, activation identifiers,
                status, and validation timestamps locally in <code>%APPDATA%\FastCast\license.json</code>. FastCast contacts the
                store that issued the key for activation, deactivation where supported, and validation. An activated Pro license
                is revalidated once when FastCast starts; a Free installation without a stored activated key makes no license call.
              </p>

              <aside className="fc-policy-note">
                <strong>Deleting local FastCast data.</strong> Deactivate Pro first if you want a supported store activation
                released, turn off remembered stream keys, close FastCast, and then delete <code>%APPDATA%\FastCast</code> plus
                any recordings or recovery folders you created. Deleting the portable app alone may leave this local data behind.
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
                the 12 months preceding this policy when someone visits the site, buys or activates Pro, contacts support, or
                makes a privacy request. Locally processed recordings and stream keys are not collected by Sturm Technologies.
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
                We do not use sensitive personal information to infer characteristics about you. We do not collect biometric
                templates, precise geolocation, health information, or the content of your recordings through FastCast.
              </p>
            </div>
          </div>
        </section>

        <section id="online-services" className="fc-unit" aria-labelledby="services-title">
          <div className="fc-unit-inner">
            <p className="fc-rail" aria-hidden="true"><b>004</b><span>Network</span></p>
            <div className="fc-unit-body fc-policy-copy">
              <h2 id="services-title">Online services and network activity</h2>
              <div className="fc-policy-services">
                {serviceRows.map((row) => (
                  <article key={row.service}>
                    <h3><a href={row.href} target="_blank" rel="noopener noreferrer">{row.service}</a></h3>
                    <p><strong>When used:</strong> {row.when}</p>
                    <p><strong>Information involved:</strong> {row.data}</p>
                  </article>
                ))}
              </div>
              <h3>User-chosen streaming services</h3>
              <p>
                When you start a livestream, FastCast sends the selected live audio/video, stream key, and ordinary connection
                metadata directly to YouTube, Twitch, Kick, or another RTMP/RTMPS service you configure. Sturm Technologies is
                not the recipient of that stream and does not control the destination service’s collection, retention, audience,
                or moderation practices.
              </p>
              <h3>Payments</h3>
              <p>
                We do not directly receive or store your full payment-card number. Gumroad currently processes FastCast Pro
                checkout. Lemon Squeezy processed earlier purchases. The applicable store may provide us with buyer contact,
                order, tax, refund, and license information needed to fulfill the purchase, provide support, prevent fraud, and
                maintain business records.
              </p>
            </div>
          </div>
        </section>

        <section id="website" className="fc-unit" aria-labelledby="website-title">
          <div className="fc-unit-inner">
            <p className="fc-rail" aria-hidden="true"><b>005</b><span>Web</span></p>
            <div className="fc-unit-body fc-policy-copy">
              <h2 id="website-title">FastCast website analytics and tracking</h2>
              <p>
                The FastCast website is hosted by Vercel. Like most hosting providers, Vercel processes ordinary request and
                security logs, which may include IP address, time, requested URL, browser, device, referrer, and approximate
                location. FastCast pages also use Vercel Web Analytics for aggregated pageviews and selected product-link events.
                A custom event can include the product name, action, source page path, button location, and the fixed public
                destination URL. It does not include names, email addresses, recording content, license keys, or stream keys.
              </p>
              <p>
                FastCast product pages request Archivo and IBM Plex Mono from Google Fonts. Your browser therefore makes a
                separate request to Google for the stylesheet and font files; Google processes that request under its own
                privacy policy.
              </p>
              <p>
                We do not use third-party advertising pixels, behavioral advertising, or analytics cookies on FastCast pages.
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
                not currently change the behavior of FastCast pages. We will treat a legally applicable opt-out preference signal
                as a valid request if our practices change in a way that requires it.
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
                <li>provide, license, secure, maintain, and support FastCast;</li>
                <li>deliver and protect the website and understand aggregate product-page traffic;</li>
                <li>process purchases, refunds, activation, and fraud prevention;</li>
                <li>respond to messages, support requests, and privacy requests;</li>
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
                Where a legal basis is required, we process information as necessary to perform a contract or take requested
                pre-contract steps, for our legitimate interests in operating and securing FastCast and providing support, to
                comply with legal obligations, and with consent where the law requires consent. You may withdraw consent at any
                time, without affecting processing that occurred before withdrawal.
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
                Local recordings, settings, credentials, logs, license state, and support bundles remain under your control until
                deleted, overwritten, rotated, or removed as described above. We retain support correspondence, privacy-request
                records, and transaction information only as long as reasonably necessary for support, security, dispute
                resolution, tax, accounting, and legal obligations. Our providers retain information under their own policies and
                our arrangements with them. We delete or de-identify information when it is no longer needed, unless law permits
                or requires longer retention.
              </p>
              <h3>Security</h3>
              <p>
                We use reasonable administrative and technical safeguards appropriate to the information involved. License and
                update requests use HTTPS. Opted-in stream keys use Windows Credential Manager. Support bundles created through
                the app are redacted and local-only. No storage or transmission method is completely secure, so we cannot promise
                absolute security. Keep license and stream keys confidential and use RTMPS when your destination supports it.
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
                Depending on where you live, you may have rights to request access to or a copy of personal information, correction,
                deletion, restriction, portability, or information about sources, purposes, and disclosures. You may also have a
                right to object to certain processing, withdraw consent, opt out of a sale, sharing, or targeted advertising, and
                appeal a denied request. We will not discriminate against you for exercising an applicable privacy right.
              </p>
              <p>
                California residents may request to know, access, correct, or delete covered personal information and may use an
                authorized agent where permitted. Because we do not sell or share personal information as those terms are defined
                for cross-context behavioral advertising, there is no separate “Do Not Sell or Share” link. Residents of the EEA
                or United Kingdom may also complain to their local data-protection authority.
              </p>
              <p>
                To make a request, email <a href="mailto:calvinsturm@gmail.com?subject=Privacy%20Request%20-%20FastCast">calvinsturm@gmail.com</a>{' '}
                with the subject <strong>Privacy Request – FastCast</strong>. Describe the request and the FastCast interaction it
                concerns. Do not email a stream key or full license key. We may ask for information reasonably necessary to verify
                your identity or an agent’s authority. If we deny a request, reply with <strong>Privacy Appeal</strong> to request
                review. Some information may be exempt from a request under applicable law.
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
                FastCast is a general-audience creator tool and is not directed to children under 13. We do not knowingly collect
                personal information from children under 13. If you believe a child has provided personal information to us,
                contact us so we can review and delete it as appropriate.
              </p>
              <h3>Changes to this policy</h3>
              <p>
                We may update this policy to reflect product, provider, or legal changes. The current version will remain at this
                URL with a revised “Last updated” date. If a change materially affects how we use information already collected,
                we will provide any additional notice or choice required by law, which may include a notice in FastCast, release
                notes, or direct communication when contact information is available.
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
          <p><b>FastCast</b> · Privacy Policy · Sturm Technologies LLC</p>
          <nav aria-label="FastCast privacy footer links">
            <a href="/fastcast">FastCast home</a>
            <a href="/fastcast/guides">Guides</a>
            <a href="/fast-series">Fast Series</a>
            <a href="mailto:calvinsturm@gmail.com">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
