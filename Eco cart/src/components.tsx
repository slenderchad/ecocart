import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react"
import { Link, NavLink, Outlet, useNavigate } from "react-router"
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Heart,
  Leaf,
  LogOut,
  Menu,
  Minus,
  Package,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  X,
} from "lucide-react"
import {
  categories,
  money,
  products,
  scoreBreakdown,
  type Artwork,
  type Product,
} from "./data"
import { useCart } from "./cart"
import { getInitials, useAuth } from "./auth"

export function Button({
  children,
  to,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  disabled = false,
  ariaPressed,
}: {
  children: ReactNode
  to?: string
  variant?: "primary" | "secondary" | "quiet" | "cyan" | "blush" | "ghost"
  className?: string
  type?: "button" | "submit"
  onClick?: () => void
  disabled?: boolean
  ariaPressed?: boolean
}) {
  const cls = `btn btn-${variant} ${className}`
  return to ? (
    <Link className={cls} to={to}>
      {children}
    </Link>
  ) : (
    <button
      className={cls}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={ariaPressed}
    >
      {children}
    </button>
  )
}

export function IconButton({
  label,
  children,
  onClick,
  className = "",
  ariaPressed,
}: {
  label: string
  children: ReactNode
  onClick?: () => void
  className?: string
  ariaPressed?: boolean
}) {
  return (
    <button
      className={`icon-btn ${className}`}
      aria-label={label}
      aria-pressed={ariaPressed}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  action,
}: {
  eyebrow?: string
  title: string
  copy?: string
  action?: ReactNode
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
      {action}
    </div>
  )
}

export function Logo() {
  return (
    <Link to="/" className="logo">
      <span className="logo-mark">
        <Leaf size={17} />
      </span>
      EcoKart
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)
  const { itemCount } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  return (
    <>
      <div className="announcement">
        <span>Free carbon-neutral delivery above ₹999</span>
        <Link to="/rewards">
          Earn 2× EcoPoints this week <ArrowRight size={13} />
        </Link>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Primary navigation">
            <NavLink to="/products">Shop</NavLink>
            <NavLink to="/reuse">Reuse</NavLink>
            <NavLink to="/learn">Learn</NavLink>
          </nav>
          <ProductSearch />
          <div className="header-actions">
            <IconButton
              label={mobileSearch ? "Close search" : "Search"}
              onClick={() => setMobileSearch(!mobileSearch)}
            >
              <Search size={20} />
            </IconButton>
            <Link
              className="icon-link hide-mobile"
              aria-label="Wishlist"
              to="/wishlist"
            >
              <Heart size={20} />
            </Link>
            <Link
              className="icon-link cart-link"
              aria-label={`Cart, ${itemCount} ${
                itemCount === 1 ? "item" : "items"
              }`}
              to="/cart"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && <span>{itemCount}</span>}
            </Link>
            <Link
              className="icon-link hide-mobile"
              aria-label={user ? `Profile for ${user.name}` : "Sign in"}
              to={user ? "/profile" : "/login"}
            >
              <CircleUserRound size={21} />
            </Link>
            {user && (
              <IconButton
                label="Log out"
                onClick={() => {
                  logout()
                  navigate("/login")
                }}
              >
                <LogOut size={19} />
              </IconButton>
            )}
            <IconButton
              label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </IconButton>
          </div>
        </div>
        {mobileSearch && (
          <div className="mobile-search container">
            <ProductSearch
              autoFocus
              onNavigate={() => setMobileSearch(false)}
            />
          </div>
        )}
        {open && (
          <nav className="mobile-menu container" aria-label="Mobile navigation">
            {[
              ["Shop all", "/products"],
              ["Wishlist", "/wishlist"],
              ["Reuse marketplace", "/reuse"],
              ["EcoKart Learn", "/learn"],
              ["Rewards", "/rewards"],
              ["Recycle", "/recycle"],
              ["My profile", "/profile"],
            ].map(([label, to]) => (
              <Link key={to} to={to} onClick={() => setOpen(false)}>
                {label}
                <ChevronRight size={18} />
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  )
}

function ProductSearch({
  autoFocus = false,
  onNavigate,
}: {
  autoFocus?: boolean
  onNavigate?: () => void
}) {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const matches = query.trim()
    ? products
        .filter((product) =>
          `${product.name} ${product.brand} ${product.category}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
        )
        .slice(0, 5)
    : []

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  useEffect(() => {
    const closeSearch = (event: MouseEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) setFocused(false)
    }
    document.addEventListener("mousedown", closeSearch)
    return () => document.removeEventListener("mousedown", closeSearch)
  }, [])

  const openProduct = (product: Product) => {
    setQuery("")
    setFocused(false)
    onNavigate?.()
    navigate(`/products/${product.id}`)
  }

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    if (matches[0]) openProduct(matches[0])
  }

  return (
    <div className="product-search" ref={searchRef}>
      <form className="search-box" role="search" onSubmit={submitSearch}>
        <Search size={18} />
        <label className="sr-only" htmlFor={`product-search-${autoFocus}`}>
          Search products by name
        </label>
        <input
          ref={inputRef}
          id={`product-search-${autoFocus}`}
          type="search"
          value={query}
          placeholder="Search products by name"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={focused && query.length > 0}
          aria-controls={`search-results-${autoFocus}`}
          onFocus={() => setFocused(true)}
          onChange={(event) => {
            setQuery(event.target.value)
            setFocused(true)
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setFocused(false)
              inputRef.current?.blur()
            }
          }}
        />
        {query ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
          >
            <X size={15} />
          </button>
        ) : (
          <kbd>⌘ K</kbd>
        )}
      </form>
      {focused && query.trim() && (
        <div
          className="search-suggestions"
          id={`search-results-${autoFocus}`}
          role="listbox"
        >
          {matches.length > 0 ? (
            matches.map((product) => (
              <button
                type="button"
                role="option"
                key={product.id}
                onClick={() => openProduct(product)}
              >
                <ProductArtwork kind={product.artwork} compact />
                <span>
                  <b>{product.name}</b>
                  <small>
                    {product.brand} · {money.format(product.price)}
                  </small>
                </span>
                <ArrowRight size={15} />
              </button>
            ))
          ) : (
            <div className="search-no-results">
              <Search size={17} />
              <span>
                <b>No matching products</b>
                <small>Try a product name like “Bamboo” or “Tote”.</small>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function Newsletter() {
  return (
    <section className="newsletter container">
      <div>
        <span className="eyebrow light">A better inbox</span>
        <h2>Good choices, thoughtfully shared.</h2>
        <p>Fresh finds, useful guides and rewards—never noise.</p>
      </div>
      <form className="newsletter-form">
        <label className="sr-only" htmlFor="news-email">
          Email address
        </label>
        <input id="news-email" type="email" placeholder="you@example.com" />
        <Button>
          Join the list <ArrowRight size={16} />
        </Button>
      </form>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>A considered marketplace for a lighter everyday.</p>
          <span className="verified-note">
            <Check size={14} /> Every claim reviewed
          </span>
        </div>
        {[
          [
            "Marketplace",
            ["Shop all", "New arrivals", "Best sellers", "Reuse"],
          ],
          [
            "Sustainability",
            ["Eco Score", "Our standards", "Recycle", "Impact"],
          ],
          ["Company", ["About", "Learn", "Sell on EcoKart", "Help"]],
        ].map(([title, links]) => (
          <div key={title as string}>
            <h3>{title}</h3>
            {(links as string[]).map((x) => (
              <Link key={x} to="/products">
                {x}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>© 2025 EcoKart</span>
        <span>Designed for progress, not perfection.</span>
      </div>
    </footer>
  )
}

export function StoreLayout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Newsletter />
      <Footer />
    </>
  )
}

export function ProductArtwork({
  kind,
  compact = false,
}: {
  kind: Artwork
  compact?: boolean
}) {
  return (
    <div
      className={`art art-${kind} ${compact ? "art-compact" : ""}`}
      role="img"
      aria-label={`${kind} product illustration`}
    >
      <span className="art-orbit" />
      <span className="art-leaf leaf-one" />
      <span className="art-leaf leaf-two" />
      {kind === "brush" && (
        <>
          <i className="brush-handle" />
          <i className="brush-head" />
        </>
      )}
      {kind === "bottle" && (
        <>
          <i className="bottle-body" />
          <i className="bottle-pump" />
          <b>REFILL</b>
        </>
      )}
      {kind === "tote" && (
        <>
          <i className="tote-body" />
          <i className="tote-handle" />
          <b>EARTH</b>
        </>
      )}
      {kind === "candle" && (
        <>
          <i className="jar" />
          <i className="flame" />
          <b>SLOW</b>
        </>
      )}
      {kind === "planter" && (
        <>
          <i className="pot" />
          <i className="stem" />
          <i className="plant-leaf p1" />
          <i className="plant-leaf p2" />
        </>
      )}
      {kind === "notebook" && (
        <>
          <i className="book" />
          <i className="book-band" />
          <b>NOTES</b>
        </>
      )}
      {kind === "cleaner" && (
        <>
          <i className="tin" />
          <i className="tab t1" />
          <i className="tab t2" />
          <b>CLEAN</b>
        </>
      )}
      {kind === "shirt" && (
        <>
          <i className="shirt" />
          <b>LINEN</b>
        </>
      )}
    </div>
  )
}

export function EcoBadge({ score }: { score: number }) {
  return (
    <span className="eco-badge">
      <Leaf size={12} /> {score} <small>Eco Score</small>
    </span>
  )
}

export function Stars({
  rating,
  reviews,
}: {
  rating: number
  reviews?: number
}) {
  return (
    <span className="rating">
      <Star size={14} fill="currentColor" /> {rating}
      {reviews !== undefined && <small>({reviews})</small>}
    </span>
  )
}

export function ProductCard({
  product,
  reuse = false,
}: {
  product: Product
  reuse?: boolean
}) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [saved, setSaved] = useState(false)

  const addToCart = () => {
    addItem(product)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <article className="product-card">
      <div className="product-visual">
        <IconButton
          label={`${saved ? "Remove" : "Save"} ${product.name}`}
          className={`save-button ${saved ? "saved" : ""}`}
          ariaPressed={saved}
          onClick={() => setSaved((current) => !current)}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </IconButton>
        {reuse && (
          <span className="condition">{product.condition || "Pre-owned"}</span>
        )}
        <Link
          to={`/products/${product.id}`}
          aria-label={`View ${product.name}`}
        >
          <ProductArtwork kind={product.artwork} compact />
        </Link>
        <EcoBadge score={product.score} />
      </div>
      <div className="product-info">
        <span className="product-brand">{product.brand}</span>
        <h3>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p>{product.note}</p>
        <div className="product-meta">
          <strong>{money.format(product.price)}</strong>
          <Stars rating={product.rating} />
        </div>
        {reuse ? (
          <Button to={`/products/${product.id}`} variant="secondary">
            View item
          </Button>
        ) : (
          <Button variant={added ? "cyan" : "secondary"} onClick={addToCart}>
            {added ? (
              <>
                <Check size={15} /> Added to cart
              </>
            ) : (
              <>
                <ShoppingBag size={15} /> Add to cart
              </>
            )}
          </Button>
        )}
      </div>
    </article>
  )
}

export function ProductGrid({
  items = products.slice(0, 4),
  reuse = false,
}: {
  items?: Product[]
  reuse?: boolean
}) {
  return (
    <div className="product-grid">
      {items.map((p) => (
        <ProductCard product={p} reuse={reuse} key={p.id} />
      ))}
    </div>
  )
}

export function EcoScorePanel() {
  return (
    <div className="score-panel">
      <div className="score-total">
        <div className="score-ring">
          <Leaf size={22} />
          <strong>92</strong>
          <span>/100</span>
        </div>
        <div>
          <span className="eyebrow">Eco Score</span>
          <h3>Excellent sustainability</h3>
          <p>
            Independent product evidence, translated into one clearer score.
          </p>
        </div>
      </div>
      <div className="score-bars">
        {scoreBreakdown.map(([label, value]) => (
          <div className="score-row" key={label}>
            <span>{label}</span>
            <div>
              <i style={{ width: `${value}%` }} />
            </div>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="score-why">
        <Sparkles size={18} />
        <p>
          <strong>Why this score?</strong> High renewable-material usage,
          minimal packaging, and a long usable life make the biggest difference.
        </p>
      </div>
    </div>
  )
}

export function Breadcrumbs({ items }: { items: string[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {items.map((x, i) => (
        <span key={x}>
          <ChevronRight size={13} />
          {i === items.length - 1 ? (
            <b>{x}</b>
          ) : (
            <Link to="/products">{x}</Link>
          )}
        </span>
      ))}
    </nav>
  )
}

export function Quantity({
  value = 1,
  onChange,
  allowRemove = false,
}: {
  value?: number
  onChange?: (value: number) => void
  allowRemove?: boolean
}) {
  const [internalValue, setInternalValue] = useState(value)
  const quantity = onChange ? value : internalValue
  const changeQuantity = (nextValue: number) => {
    if (onChange) onChange(nextValue)
    else setInternalValue(Math.max(1, nextValue))
  }

  return (
    <div className="quantity" aria-label="Quantity">
      <IconButton
        label={
          allowRemove && quantity === 1 ? "Remove item" : "Decrease quantity"
        }
        onClick={() =>
          changeQuantity(allowRemove ? quantity - 1 : Math.max(1, quantity - 1))
        }
      >
        <Minus size={16} />
      </IconButton>
      <span aria-live="polite">{quantity}</span>
      <IconButton
        label="Increase quantity"
        onClick={() => changeQuantity(quantity + 1)}
      >
        <Plus size={16} />
      </IconButton>
    </div>
  )
}

export function MetricCard({
  icon,
  label,
  value,
  note,
}: {
  icon: ReactNode
  label: string
  value: string
  note?: string
}) {
  return (
    <div className="metric-card">
      <span className="metric-icon">{icon}</span>
      <p>{label}</p>
      <strong>{value}</strong>
      {note && <small>{note}</small>}
    </div>
  )
}

const accountLinks = [
  ["Personal information", "/profile"],
  ["Orders", "/profile"],
  ["Wishlist", "/wishlist"],
  ["Eco impact", "/profile/impact"],
  ["EcoPoints", "/rewards"],
  ["Addresses", "/profile"],
  ["Settings", "/profile"],
]
const sellerLinks = [
  ["Overview", "/seller"],
  ["Products", "/seller"],
  ["Add product", "/seller"],
  ["Orders", "/seller"],
  ["Inventory", "/seller"],
  ["Sustainability", "/seller/verification"],
  ["Certifications", "/seller/verification"],
  ["Analytics", "/seller"],
]
const adminLinks = [
  ["Dashboard", "/admin"],
  ["Users", "/admin"],
  ["Sellers", "/admin"],
  ["Products", "/admin"],
  ["Orders", "/admin"],
  ["Verification", "/admin"],
  ["Complaints", "/admin"],
  ["Categories", "/admin"],
  ["Analytics", "/admin"],
  ["Settings", "/admin"],
]

export function DashboardLayout({
  mode = "account",
}: {
  mode?: "account" | "seller" | "admin"
}) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const links =
    mode === "seller"
      ? sellerLinks
      : mode === "admin"
        ? adminLinks
        : accountLinks
  return (
    <div className={`dash-shell dash-${mode}`}>
      <aside className="dash-sidebar">
        <Logo />
        <div className="dash-label">
          {mode === "account"
            ? "My account"
            : mode === "seller"
              ? "Seller studio"
              : "Admin console"}
        </div>
        <nav>
          {links.map(([label, to], i) => (
            <NavLink key={`${label}-${i}`} to={to} end={i === 0}>
              <span>{label}</span>
              <ChevronRight size={15} />
            </NavLink>
          ))}
        </nav>
        <Link className="back-store" to="/">
          ← Back to store
        </Link>
        {mode === "account" && user && (
          <Button
            className="dash-logout"
            variant="quiet"
            onClick={() => {
              logout()
              navigate("/login")
            }}
          >
            <LogOut size={15} /> Log out
          </Button>
        )}
      </aside>
      <main className="dash-main">
        <div className="dash-mobile-head">
          <Logo />
          <Menu />
        </div>
        <Outlet />
      </main>
    </div>
  )
}

export function MiniChart() {
  return (
    <div className="chart" aria-label="Six month activity chart">
      {[42, 58, 46, 75, 68, 92].map((x, i) => (
        <div key={i}>
          <i style={{ height: `${x}%` }} />
          <span>{["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}</span>
        </div>
      ))}
    </div>
  )
}

export function DashboardHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow?: string
  title: string
  copy?: string
}) {
  const { user } = useAuth()
  const displayName = user?.name ?? "EcoKart Member"
  return (
    <header className="dashboard-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
      <div className="dashboard-user">
        <span>{getInitials(displayName)}</span>
        <div>
          <strong>{displayName}</strong>
          <small>
            {user
              ? `Member since ${new Date(user.createdAt).getFullYear()}`
              : "Sign in to personalise"}
          </small>
        </div>
      </div>
    </header>
  )
}

export function DashboardIcon({
  type,
}: {
  type: "chart" | "package" | "leaf"
}) {
  return type === "chart" ? (
    <BarChart3 />
  ) : type === "package" ? (
    <Package />
  ) : (
    <Leaf />
  )
}

export { categories, products }
