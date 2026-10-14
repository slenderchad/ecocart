# EcoKart Frontend — Full Navigable Static Prototype Plan

## 1. Objective and success criteria

Build EcoKart as a route-complete, responsive React prototype that feels like a premium modern marketplace first and communicates sustainability through focused product evidence rather than an overly literal “green” aesthetic.

The implementation is successful when:

- Every route in the brief is directly reachable and presents a complete, intentional screen rather than a placeholder.
- The primary commerce journey is easy to follow: Home → Products → Product detail → Compare / Cart → Checkout.
- Account, impact, rewards, recycle, reuse, learn, seller, verification, admin, login, signup, and preference-onboarding routes share one coherent design language.
- The UI uses the supplied emerald / cream / cyan / blush palette with the specified approximate visual balance.
- Desktop, tablet, and mobile layouts are deliberately composed; navigation, dense tables, sidebars, and checkout adapt rather than simply shrink.
- Navigation and key controls demonstrate intended behavior, but product, cart, wishlist, filter, form, and account data remain static and do not persist across reloads.
- Product and editorial visuals are original CSS/SVG illustrations; no photography, remote image dependency, or emoji-based interface icons are used.
- Accessibility fundamentals are covered: semantic landmarks, keyboard focus, labels, useful alt text or decorative hiding, sufficient contrast, and reduced-motion support.
- The production build completes successfully.

## 2. Scope decisions

### Included

- All consumer, account, content, seller, and admin routes listed below.
- Shared design tokens and reusable UI primitives.
- Typed static fixture data for products, reviews, comparison values, dashboard metrics, articles, rewards, and navigation.
- Real client-side URL navigation through React Router Data mode.
- Demonstrative local interactions that do not require persistence: mobile menu, accordion/filter disclosure, product gallery thumbnail selection, quantity stepper, tabs, profile/dashboard sidebar selection where useful, checkout step progression or section focus, and visual button feedback.
- Responsive desktop/mobile variants for global navigation, filters, comparison tables, cart tables, and dashboards.
- Static empty/loading/error component states in the component system where they help communicate future integration boundaries, without wiring a real API.

### Explicitly excluded

- Backend APIs, authentication, payment processing, inventory, order creation, uploads, or real seller verification.
- Durable cart, wishlist, onboarding preference, form, or filter persistence.
- URL-driven search/filter query state beyond basic route links.
- Real recommendation logic; the personalized recommendation section uses a fixed “Reduce Plastic” preference example.
- Remote photography and final production product assets.
- Production analytics, SEO automation, localization, and deployment work.

## 3. Technical foundation

### Dependencies

- Add `react-router` and use its Data mode APIs (`createBrowserRouter`, `RouterProvider`, nested layouts, route error/not-found handling).
- Add `lucide-react` as the consistent thin-line icon system; do not use emoji as interface symbols.
- Keep React 19, Vite 8, Tailwind CSS v4, and TypeScript.
- Use public Google font CSS imports for Plus Jakarta Sans (display/headings) and Inter (body/UI), placed before the Tailwind import in `src/index.css`.

### Entry and routing

- Keep `src/main.tsx` as the React mount point.
- Move application routing responsibility into `src/app/App.tsx` and `src/app/routes.tsx`.
- Keep `src/App.tsx` as a thin default-export bridge to the app module so the documented entry contract remains stable.
- Use a nested `StoreLayout` for announcement bar, consumer header, page content, newsletter/eco CTA, and footer.
- Use purpose-built `AccountLayout`, `DashboardLayout`, and `AuthLayout` where the page shell materially differs.
- Ensure every page is independently addressable and browser back/forward behavior works.

### Route map

| Route | Screen / behavior |
|---|---|
| `/` | Full marketing and merchandising homepage |
| `/products` | Product listing, desktop sidebar / mobile filter drawer pattern |
| `/products/:id` | Product detail; fixtures resolve known IDs and show a friendly missing-product state otherwise |
| `/compare` | Two-product sustainability comparison |
| `/cart` | Cart items, summary, and avoided-plastic callout |
| `/checkout` | Minimal contact, delivery, payment, summary, and eco-impact layout |
| `/wishlist` | Saved-product grid |
| `/profile` | Account overview / personal information |
| `/profile/impact` | Personal impact dashboard |
| `/rewards` | EcoPoints balance, earning methods, and redemption cards |
| `/recycle` | Return-and-recycle process and eligible item area |
| `/reuse` | Reuse marketplace with Buy / Sell / Donate / Swap presentation |
| `/learn` | Editorial sustainability hub |
| `/seller` | Seller overview dashboard |
| `/seller/verification` | Sustainability verification submission workflow |
| `/admin` | Admin overview dashboard |
| `/login` | Split-screen login |
| `/signup` | Split-screen signup |
| `/signup/preferences` | Static “What matters to you?” preference-onboarding step |
| `*` | Branded not-found screen with recovery links |

## 4. Proposed source organization

```text
src/
  App.tsx
  main.tsx
  index.css
  app/
    App.tsx
    routes.tsx
    layouts/
      StoreLayout.tsx
      AccountLayout.tsx
      DashboardLayout.tsx
      AuthLayout.tsx
  components/
    ui/
      Button.tsx
      IconButton.tsx
      TextField.tsx
      SelectField.tsx
      Checkbox.tsx
      Badge.tsx
      Card.tsx
      SectionHeading.tsx
      ProgressBar.tsx
      QuantityStepper.tsx
      Breadcrumbs.tsx
      Rating.tsx
    commerce/
      ProductCard.tsx
      ProductArtwork.tsx
      EcoScoreBadge.tsx
      EcoScorePanel.tsx
      ProductGrid.tsx
      OrderSummary.tsx
    navigation/
      AnnouncementBar.tsx
      Header.tsx
      MobileNavigation.tsx
      Footer.tsx
      Newsletter.tsx
      DashboardSidebar.tsx
    dashboard/
      MetricCard.tsx
      MiniBarChart.tsx
      ActivityList.tsx
    marketing/
      HeroArtwork.tsx
      CategoryCard.tsx
      ProcessStep.tsx
      TestimonialCard.tsx
      EditorialCard.tsx
  data/
    products.ts
    categories.ts
    content.ts
    dashboards.ts
  pages/
    HomePage.tsx
    ProductsPage.tsx
    ProductDetailPage.tsx
    ComparePage.tsx
    CartPage.tsx
    CheckoutPage.tsx
    WishlistPage.tsx
    ProfilePage.tsx
    ImpactPage.tsx
    RewardsPage.tsx
    RecyclePage.tsx
    ReusePage.tsx
    LearnPage.tsx
    SellerPage.tsx
    SellerVerificationPage.tsx
    AdminPage.tsx
    LoginPage.tsx
    SignupPage.tsx
    PreferencesPage.tsx
    NotFoundPage.tsx
```

Keep page-specific compositions in page files and extract only components that are repeated or represent a clear visual pattern. Avoid creating a large generic abstraction layer for one-off sections.

## 5. Design system implementation

### Color tokens

Define named Tailwind v4 theme tokens in `src/index.css` rather than scattering hex values through JSX:

- Brand emerald: `#0B5D4B`
- Brand dark: `#073F34`
- Brand soft: `#DCEFE8`
- Blush: `#E8A0A8`
- Blush tint: `#F8E7E9`
- Cyan: `#72B8B5`
- Cyan tint: `#E0F1F0`
- Warm cream canvas: `#FAF8F3`
- White card surface: `#FFFFFF`
- Deep charcoal text: `#17211E`
- Muted secondary text: `#66736E`
- Soft gray-green border: `#DDE5E1`
- Success: `#3D8B68`
- Warning: `#D49A45`
- Error: `#C95F68`

Use emerald for primary actions and key numbers, cream/white for most surface area, cyan for comparison/chart emphasis, and blush only for rewards, decorative accents, and small moments of warmth.

### Typography

- Plus Jakarta Sans: editorial display headings, hero statements, section titles, and large metric values.
- Inter: body copy, controls, navigation, labels, metadata, and tables.
- Establish a fluid display scale with `clamp()` in named CSS utilities/tokens so hero and page titles remain balanced across breakpoints.
- Favor short line lengths and sentence-case labels; use uppercase only for small eyebrow labels and product-state badges.

### Shape, depth, and spacing

- Buttons: 10px visual radius.
- Fields: 12px.
- Product and content cards: 18px.
- Large sections: 24px.
- Hero shells: 28–32px.
- Use the supplied subtle emerald-tinted shadow as the primary elevated-card shadow; most surfaces remain border-led rather than shadow-heavy.
- Use a centered max-width content container, generous vertical rhythm, and asymmetric editorial spacing on marketing pages.

### Illustration language

- Create a reusable `ProductArtwork` component with variants such as oral care, bottle, tote, candle, kitchen set, planter, stationery, fashion, and cleaning.
- Construct visuals from layered SVG/CSS shapes using cream, paper, muted cyan, blush, and emerald; use soft gradients, subtle grain-like patterning, and botanical curves sparingly.
- Hero art uses one large stylized product composition with a floating Eco Score badge and a blush circular accent.
- Editorial and auth artwork uses abstract organic forms and product silhouettes rather than landscape/nature clichés.
- All interactive symbols come from Lucide; illustrations are decorative unless they communicate product identity, in which case provide concise accessible labels.

### Motion

- Use short 150–250ms transitions for hover lift, border/color changes, accordions, drawers, and button feedback.
- Add one restrained hero entrance sequence and subtle product artwork float only where it does not compete with shopping content.
- Disable nonessential transform/float animations under `prefers-reduced-motion`.

## 6. Shared component behavior

### Global store shell

- Announcement bar: short shipping/rewards message and a secondary Learn link.
- Header desktop: EcoKart wordmark, categories link, central search affordance, Learn / Reuse links, wishlist, cart count, and account.
- Header mobile: wordmark, search, cart, and menu trigger; expanded menu exposes the remaining routes.
- Footer: marketplace, sustainability, help, seller, and account groups plus compact brand statement and trust indicators.
- Newsletter / eco CTA: appears on consumer content pages but is omitted from checkout, auth, seller, and admin shells.

### Buttons and form controls

- Button variants: primary emerald, secondary outlined, quiet/text, cyan-highlight, and destructive only where required.
- Every control has visible hover, active, disabled, and focus-visible states.
- Form components include label, optional hint, and static validation-message slots so checkout/auth layouts already show the intended integration contract.

### Product card

- Favorite icon button in the artwork corner.
- Large custom product illustration.
- Eco Score badge plus qualitative rating.
- Product name, one-line sustainability attribute, price, star rating, and Add to Cart action.
- Hover reveals a small “Compare” affordance on pointer devices; all information remains available without hover.
- Reuse cards share the base geometry but switch to a “Pre-owned” condition badge and less retail-polished artwork treatment.

### Eco Score signature component

- Compact `EcoScoreBadge` for cards and tables.
- Expanded `EcoScorePanel` for product detail with total score, “Excellent Sustainability” label, five category progress rows, and a plain-language score rationale.
- Progress visualization uses accessible text values in addition to color/width.
- Cyan highlights comparison wins; avoid implying that color alone determines meaning.

## 7. Page-by-page composition

### Home (`/`)

1. Announcement bar and global header.
2. Cream hero containing an asymmetrical deep-emerald panel, editorial “Shop Better. Live Greener.” headline, short value proposition, primary “Shop sustainable” action, secondary Eco Score action, stylized product artwork, floating score 92 badge, and blush accent.
3. Six-category strip/grid: Personal Care, Home & Kitchen, Fashion, Stationery, Gardening, Zero Waste.
4. Featured product grid using four representative products.
5. Eco Score explainer with a sample score panel and three trust principles.
6. Trending products carousel-like horizontal row on small screens / four-column grid on desktop.
7. Sustainability banner with large avoided-waste metric.
8. EcoPoints section with cyan visual and rewards CTA.
9. Personal impact preview with compact metrics/chart and profile-impact CTA.
10. Personalized “Recommended for you” module using fixed “Reduce Plastic” preference copy.
11. Customer review cards.
12. Newsletter and footer.

### Products (`/products`)

- Breadcrumb, editorial page header, search-result count, sort select, and active-filter chips.
- Desktop sticky filter sidebar with Category, Price, Eco Score, Material, Packaging, and Certification groups.
- Mobile filter button opens/discloses the same controls above the grid.
- Responsive product grid: 1 column on narrow phones, 2 on larger phones/tablets, 3 alongside the desktop sidebar.
- Static controls visibly toggle or expand locally if implemented, but the fixture product results remain fixed by scope decision.

### Product detail (`/products/:id`)

- Resolve route ID against typed product fixtures.
- Breadcrumb and two-column gallery/information area.
- Gallery uses one large `ProductArtwork` stage and selectable thumbnail treatments.
- Information area: brand, verified badge, name, rating, price, compact Eco Score, description, quantity, Add to Cart, Buy Now, and Wishlist.
- Below-fold content uses an anchored tab/accordion pattern for Materials, Packaging, Manufacturing, Environmental Impact, Certifications, and Reviews.
- Expanded Eco Score panel is the visual centerpiece of the evidence section.
- Related-product row closes the page.

### Compare (`/compare`)

- Intro header and two selected-product summary cards.
- Responsive comparison: semantic table on desktop; stacked labeled comparison rows on mobile.
- Compare price, total score, material, packaging, durability, reusable, biodegradable, certification, and end-of-life.
- Highlight the stronger environmental value with cyan tint plus a text/icon marker.
- Finish with a “Better sustainable choice” card for the bamboo product.

### Cart (`/cart`)

- Desktop item table and mobile stacked line-item cards.
- Static quantity steppers and remove controls for representative cart items.
- Sticky desktop order summary with subtotal, delivery, discount, total, promo field, and Checkout link.
- Dedicated avoided-plastic card: approximately 240g avoided, with a small illustrated equivalence.
- Cross-sell row with two lower-emphasis recommendations.

### Checkout (`/checkout`)

- Minimal header treatment to reduce distraction.
- Main form sections for Contact Information, Delivery Address, Delivery Method, and Payment.
- Desktop sticky order summary; mobile summary collapses above the final action.
- Product rows, subtotal, delivery, total, and one concise eco-impact line.
- Static field content and payment selections illustrate layout only; “Place order” provides local visual acknowledgement rather than processing.

### Wishlist (`/wishlist`)

- “Saved products” header with item count.
- Product grid using saved variants with Add to Cart and Remove controls.
- Include an inline empty-state design contract in the component system, but show the populated state by default.

### Profile and impact (`/profile`, `/profile/impact`)

- Shared responsive account sidebar: Personal Information, Orders, Wishlist, Eco Impact, EcoPoints, Addresses, Settings.
- Profile overview includes member identity, editable-looking personal fields, recent order summary, default address, and EcoPoints snapshot.
- Impact page includes Products (14), Plastic Avoided (2.8 kg), and EcoPoints (1,240) metric cards; a six-month cyan/emerald bar chart; contribution breakdown; milestone card; and latest sustainable actions.
- On mobile, sidebar becomes a compact horizontal select/menu pattern.

### Rewards (`/rewards`)

- Emerald hero with 1,240-point balance and progress to the next tier.
- Four ways-to-earn rows: sustainable purchase, return packaging, buy plastic-free, recycle eligible product.
- Blush-tinted reward cards with point costs and Redeem buttons.
- Compact activity history and rewards terms note.

### Recycle (`/recycle`)

- Intro explaining return/recycle value.
- Five-step process: Choose Item, Schedule Pickup, Collection, Reuse / Recycle, EcoPoints.
- Desktop connected horizontal flow; mobile vertical sequence.
- Eligible-items preview and a static pickup eligibility/check area.
- FAQ accordion covering condition, packaging, points, and accepted products.

### Reuse (`/reuse`)

- Distinct but related marketplace hero.
- Buy / Sell / Donate / Swap segmented navigation.
- Pre-owned listing cards with condition, price, seller trust, and View Item.
- “How Reuse works” strip and circular-economy impact metric.
- Static selected tab styling; no listing creation workflow beyond the presentational Sell entry point.

### Learn (`/learn`)

- Editorial header and featured Zero-Waste Living guide.
- Category chips: Plastic Reduction, Recycling, Sustainable Fashion, Eco Home, Certifications, Zero Waste.
- Mixed editorial card grid with reading time, category, and concise excerpts.
- Eco-certification glossary teaser and newsletter CTA.

### Seller (`/seller`)

- Dashboard shell with sidebar items: Overview, Products, Add Product, Orders, Inventory, Sustainability, Certifications, Analytics.
- Overview metrics: Sales ₹84,500, Orders 124, Products 36, Pending Verification 4.
- Sales mini-chart, recent orders table, inventory warnings, and sustainability-verification queue.
- Links to the dedicated verification route.

### Seller verification (`/seller/verification`)

- Page header and status explainer.
- Six-stage stepper: Product, Materials, Packaging, Manufacturing, Certifications, Supporting Documents.
- Static current-stage form composition and supporting-document drop-zone styling.
- Verification criteria sidebar and Submit for Verification action.
- Show a compact approved-state badge example labeled “EcoKart Verified” without pretending the static form was submitted.

### Admin (`/admin`)

- Dashboard shell with Dashboard, Users, Sellers, Products, Orders, Verification, Complaints, Categories, Analytics, Settings.
- Overview metrics for total users, sellers, products, pending verification, orders, and revenue.
- Verification queue table, recent complaints, platform activity chart, and category distribution.
- Use denser spacing than consumer pages while retaining the same typography and token system.

### Auth and preferences (`/login`, `/signup`, `/signup/preferences`)

- Desktop split screen: blush/cream illustrated brand panel and clean white form panel; collapse to form-first mobile layout with compact brand banner.
- Login: email, password, remember-me, forgot password, primary login, and signup link.
- Signup: name, email, password, terms, create-account action, and login link.
- Preferences: selectable cards for Reduce Plastic, Zero Waste, Sustainable Fashion, Sustainable Home, and Reduce Energy; Continue leads to the home route where the fixed recommendation section demonstrates the outcome.
- Inputs are presentational/local only; no credentials are stored or transmitted.

### Not found

- Branded abstract illustration, concise error message, and links to Home and Products.

## 8. Static data and interfaces

Create typed models that document future backend boundaries without adding an API layer:

- `Product`: id, slug, name, brand, category, price, rating, reviewCount, shortAttribute, artworkVariant, ecoScore, scoreLabel, scoreBreakdown, materials, packaging, manufacturing, impact, certifications, verified, reuseCondition.
- `EcoScoreBreakdown`: materials, packaging, durability, production, endOfLife.
- `Category`, `Review`, `CartLine`, `Reward`, `Article`, `DashboardMetric`, `OrderSummary`.
- Centralize representative fixture values so ProductCard, detail, compare, cart, wishlist, recommendations, and dashboard snippets do not drift.
- Use Indian rupee formatting consistently through `Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" })`.

## 9. Responsive and accessibility strategy

- Design from narrow mobile upward, with explicit layout changes near standard Tailwind breakpoints rather than fixed desktop assumptions.
- Replace dense tables with labeled cards/rows on small screens; do not rely on horizontal page scrolling except for intentional product strips.
- Keep tap targets at least 44px where practical.
- Use semantic `header`, `nav`, `main`, `section`, `aside`, `footer`, lists, forms, labels, and tables.
- Maintain one logical page-level heading per route and ordered heading hierarchy.
- Add a skip-to-content link.
- Give icon-only actions accessible labels and keep visible focus rings.
- Ensure overlays/drawers can be closed by keyboard and return focus to their trigger if implemented.
- Pair all score/status colors with labels, values, or icons.
- Respect reduced-motion and avoid autoplaying/carousel-only content.

## 10. Implementation sequence

1. **Foundation:** install routing/icon dependencies; establish font, theme, reset/base styles, token utilities, and route skeleton.
2. **Primitives and shell:** implement buttons, fields, cards, typography, icon buttons, badges, store header/mobile menu, footer, newsletter, and layouts.
3. **Fixtures and commerce system:** create typed product/content data, product artwork variants, ProductCard, Eco Score components, grids, rating, quantity, and summaries.
4. **Core shopping routes:** implement Home, Products, Product detail, Compare, Cart, Checkout, and Wishlist with responsive adaptations.
5. **Account and sustainability routes:** implement Profile, Impact, Rewards, Recycle, Reuse, and Learn.
6. **Operational routes:** implement Seller, Seller Verification, and Admin dashboard shells and content.
7. **Auth and edge routes:** implement Login, Signup, Preferences, missing-product, and not-found states.
8. **Polish:** tune spacing, typography, illustration consistency, focus states, mobile navigation, reduced motion, and copy consistency.
9. **Verification:** format, build, and manually inspect representative narrow and wide layouts through the existing supervised preview server.

## 11. Verification plan

Use the repository-prescribed commands and do not start another development server.

1. Run `pnpm format` after implementation.
2. Run `pnpm build` as the production/type-integrity verification.
3. If formatting changes files, review the diff and rerun `pnpm build` if affected source changed.
4. Use the existing preview only for manual route checks; do not run `pnpm dev`.
5. Manually check at minimum:
   - `/` at mobile and desktop widths.
   - `/products` filter/sidebar behavior and product-card wrapping.
   - One known and one unknown `/products/:id` URL.
   - `/compare`, `/cart`, and `/checkout` mobile transformations.
   - `/profile/impact`, `/seller`, and `/admin` dashboard responsiveness.
   - `/login` split-layout collapse.
   - Direct navigation and browser back/forward for all routes.
   - Keyboard focus visibility, mobile menu closure, form labels, and reduced-motion behavior.
6. Review the final diff to ensure no generated artifacts, secrets, or unrelated files were changed.

## 12. Completion boundary

This phase ends with a polished, route-complete static frontend prototype. A later integration phase can introduce API clients, authentication guards, schema validation, durable global state, URL-synchronized filters, real cart/checkout behavior, uploads, seller/admin permissions, analytics, and backend-driven recommendation logic without redesigning the visual architecture or route structure.
