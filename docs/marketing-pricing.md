# Pricing and marketing notes

Working notes on how the Fast Series is priced and how the site talks about it.
Not a spec. The store listing is always the source of truth: if this file and
Gumroad disagree, Gumroad wins and the site is the thing that is stale.

## FastCast: where it stands

History, most recent last:

- Free tier plus Pro at $49 one time.
- 2026-09-06: Gumroad moved to $0+, so Pro became pay what you want. Commit
  f31a3fa swapped the price claims. The site still described a "Pro" tier.
- Uncommitted working tree: the tier concept is deleted entirely. One license
  key unlocks the whole app, `fastCastProPrice` becomes `fastCastLicensePrice`,
  and roughly 15 files lose their Pro language.
- 2026-09-09: Gumroad set to a $1 floor with $29 suggested. Site copy is being
  updated to match.

### The $1 floor kills the word "free"

This is the trap to remember. The app does nothing without a license key, so a
$1 minimum means FastCast is not free, and the site says "free" in a lot of
load-bearing places: the page title, the og and twitter card descriptions, the
hero trust list, the pricing headline, and a FAQ question literally named "Is
FastCast free?" that is duplicated verbatim into the FAQPage JSON-LD.

Any move off a $0 floor has to sweep all of those. Any move back to a $0 floor
gets to use "free" again. Do not swap the number without swapping the framing.

## Idea: price rises $1 per X downloads

The mechanic: FastCast starts cheap and the price climbs by $1 for every X
downloads. Early buyers pay less, the price tracks the app getting better, and
there is a real reason to buy today instead of bookmarking it.

Why it suits this product specifically: it is an Open Beta from one person, so a
low price is honest about the current state, and a rising price is honest about
where it is going. It also reframes paying as getting in early rather than as
charity, which the current "pay what you want" framing leans on and which does
not convert well.

### What has to be true before it ships

- **Gumroad does not do this on its own.** There is no rule engine for price by
  download count. Every increase is a manual edit to the listing. If the site
  claims a rule the store does not follow, the site is lying, and the checkout
  page is where the buyer finds out.
- **The counter needs a public source.** Releases live at
  `github.com/CalvinSturm/FastCast-releases`, and the GitHub releases API
  reports `download_count` per asset, so a real number is reachable from the
  browser at runtime. Note that all 38 routes are prerendered, so a number baked
  at build time would be stale on arrival; this has to be a client-side fetch
  with the last known price as the fallback.
- **Downloads are not sales.** The GitHub count includes every re-download,
  every CI fetch, and every person who never buys a key. It is a fine number to
  drive a public counter, but it is not revenue, and it will climb faster than
  intuition suggests. Pick X against real numbers, not a guess.
- **The price can only go up.** That is the whole promise. Once it is published,
  walking it back costs more trust than the mechanic buys.

### Decision, 2026-09-09

Parked, not cancelled. Calvin will run the increases by hand once there is
enough download data to size the step, so nothing on the site claims the rule
yet and no live counter is wired up. Revisit when the GitHub release download
count is worth reading.

### Pay what you want is the bidding mechanism

The honest way to land on a number is to let buyers name one first, and that is
exactly what the current listing does. Every order at the $1 floor is a bid, and
the distribution of what people actually pay is the answer to "what is FastCast
worth". A price set by guessing is a claim; a price set from that distribution
is evidence.

So treat the $1/$29 period as price discovery, not as a final decision. What to
pull from Gumroad when there is enough volume:

- The median and the mode, not the mean. A couple of generous orders will drag
  the average somewhere no one actually bid.
- The share paying the $1 floor. A large floor share means the suggested price
  is doing no work, or the app has not earned it yet.
- The share paying at or above $29, which is the real test of whether the
  suggested number is credible.
- Whether the number moves after a release. If it climbs when the app gets
  better, the rising-price idea above has evidence behind it.

This also removes the main objection to raising the price later: it is not an
arbitrary hike, it is meeting the number buyers already named.

### Open questions

- What is X? Needs the actual download rate to answer.
- What is the starting price, and is there a cap where it stops climbing?
- Does the site show a live counter and next price, or just state the rule and
  hardcode today's price?
- Who bumps Gumroad when a threshold is crossed, and how is that remembered?

## Voice

Sell to the people who use the app, in plain language. No AI landing page tells.
See the product page voice notes in the repo memory.
