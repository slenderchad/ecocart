import { useState, type FormEvent, type ReactNode } from "react"
import { Link, useNavigate, useParams } from "react-router"
import {
  ArrowRight,
  Award,
  Box,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  FileCheck2,
  Filter,
  Gift,
  Heart,
  Leaf,
  LogOut,
  MapPin,
  Megaphone,
  Package,
  Recycle,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Store,
  Truck,
  Upload,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react"
import {
  Breadcrumbs,
  Button,
  DashboardHeader,
  EcoBadge,
  EcoScorePanel,
  IconButton,
  MetricCard,
  MiniChart,
  ProductArtwork,
  ProductGrid,
  Quantity,
  SectionHeading,
  Stars,
  categories,
  products,
} from "./components"
import { articles, money, type Artwork, type Product } from "./data"
import { useCart } from "./cart"
import { getInitials, useAuth } from "./auth"

export function HomePage() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow light">The considered marketplace</span>
          <h1>
            Shop better.
            <br />
            <em>Live greener.</em>
          </h1>
          <p>
            Beautiful, useful products chosen for the way they are made—and the
            difference they leave behind.
          </p>
          <div className="button-row">
            <Button to="/products">
              Shop sustainable <ArrowRight size={17} />
            </Button>
            <Button to="/compare" variant="ghost" className="btn-on-dark">
              Explore Eco Score
            </Button>
          </div>
          <div className="hero-proof">
            <span>
              <Check size={14} /> Verified claims
            </span>
            <span>
              <Check size={14} /> Carbon-neutral delivery
            </span>
          </div>
        </div>
        <div className="hero-art">
          <div className="blush-disc" />
          <ProductArtwork kind="bottle" />
          <div className="floating-score">
            <Leaf size={17} />
            <strong>92</strong>
            <span>Eco Score</span>
          </div>
          <div className="hero-note">
            Refill. Reuse.
            <br />
            Repeat beautifully.
          </div>
        </div>
      </section>

      <section className="section container category-section">
        <SectionHeading
          eyebrow="Shop by category"
          title="Better starts with the everyday."
          action={
            <Button to="/products" variant="quiet">
              View all <ArrowRight size={16} />
            </Button>
          }
        />
        <div className="category-grid">
          {categories.map(([name, art]) => (
            <Link to="/products" className="category-card" key={name}>
              <ProductArtwork kind={art} compact />
              <span>{name}</span>
              <ArrowRight size={17} />
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <SectionHeading
          eyebrow="The edit"
          title="Good things, carefully chosen."
          copy="Every product earns its place through material, packaging, durability and impact."
          action={
            <Button to="/products" variant="quiet">
              Shop all <ArrowRight size={16} />
            </Button>
          }
        />
        <ProductGrid />
      </section>

      <section className="section container score-story">
        <div className="score-intro">
          <span className="eyebrow">A score you can see through</span>
          <h2>
            Less guesswork.
            <br />
            More good choices.
          </h2>
          <p>
            Eco Score brings the whole product story into view—from materials
            and manufacturing to its useful life and what happens after.
          </p>
          <Button to="/compare" variant="secondary">
            See how products compare
          </Button>
        </div>
        <EcoScorePanel />
      </section>

      <section className="section section-tint">
        <div className="container">
          <SectionHeading
            eyebrow="Trending now"
            title="Small swaps. Lasting favorites."
          />
          <ProductGrid items={products.slice(4, 8)} />
        </div>
      </section>

      <section className="section container impact-banner">
        <div>
          <span className="eyebrow light">Together, this month</span>
          <strong>18,420 kg</strong>
          <p>of single-use plastic avoided by the EcoKart community.</p>
          <Button to="/profile/impact" variant="cyan">
            See your impact <ArrowRight size={16} />
          </Button>
        </div>
        <div className="impact-rings">
          <i />
          <i />
          <i />
          <span>
            <Leaf />
            <b>
              Better
              <br />
              by design
            </b>
          </span>
        </div>
      </section>

      <section className="section container split-feature">
        <div className="points-visual">
          <span className="points-pill">
            <Award size={18} /> EcoPoints
          </span>
          <strong>1,240</strong>
          <p>Your choices add up.</p>
          <div className="points-card">
            <span>Next reward</span>
            <b>₹250 off</b>
            <i>
              <em />
            </i>
          </div>
        </div>
        <div className="feature-copy">
          <span className="eyebrow">Rewards with a reason</span>
          <h2>Good for your wallet. Better for the world.</h2>
          <p>
            Earn points when you choose lower-impact products, return packaging,
            or send eligible items back for recycling.
          </p>
          <Button to="/rewards">
            Explore EcoPoints <ArrowRight size={16} />
          </Button>
        </div>
      </section>

      <section className="section container impact-preview">
        <div>
          <span className="eyebrow">Your Eco Journey</span>
          <h2>
            A lighter footprint,
            <br />
            made visible.
          </h2>
          <p>See the impact of every thoughtful purchase.</p>
          <Button to="/profile/impact" variant="secondary">
            View your dashboard
          </Button>
        </div>
        <div className="preview-card">
          <div className="preview-metrics">
            <span>
              <small>Products</small>
              <b>14</b>
            </span>
            <span>
              <small>Plastic avoided</small>
              <b>2.8 kg</b>
            </span>
            <span>
              <small>EcoPoints</small>
              <b>1,240</b>
            </span>
          </div>
          <MiniChart />
        </div>
      </section>

      <section className="section container recommendations">
        <SectionHeading
          eyebrow="Recommended for you"
          title="Because reducing plastic matters to you."
          copy="Refillable, reusable and intentionally free from single-use plastic."
        />
        <ProductGrid items={[products[0], products[1], products[6]]} />
      </section>

      <section className="section container">
        <SectionHeading
          eyebrow="From the community"
          title="Thoughtful things, honestly reviewed."
        />
        <div className="review-grid">
          {[
            [
              "“The Eco Score makes comparing so easy. I finally feel confident about what I’m bringing home.”",
              "Meera S.",
              "Mumbai",
            ],
            [
              "“Beautiful products, fast delivery, and no mountain of plastic in the box. Exactly what I wanted.”",
              "Rohan A.",
              "Bengaluru",
            ],
            [
              "“I came for the refill bottles and now use the recycle pickup too. It all feels considered.”",
              "Ishita K.",
              "Pune",
            ],
          ].map(([quote, name, city]) => (
            <article className="review-card" key={name}>
              <div className="review-stars">★★★★★</div>
              <blockquote>{quote}</blockquote>
              <div>
                <span>{name[0]}</span>
                <p>
                  <b>{name}</b>
                  <small>{city}</small>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

const FilterGroup = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => (
  <details open className="filter-group">
    <summary>
      {title}
      <ChevronDown size={16} />
    </summary>
    {children}
  </details>
)

export function ProductsPage() {
  const [mobileFilters, setMobileFilters] = useState(false)
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState("featured")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 })
  const [selectedFilters, setSelectedFilters] =
    useState<Record<string, string[]>>({
      Category: [],
      "Eco Score": [],
      Material: [],
      Packaging: [],
      Certification: [],
    })

  const toggleFilter = (group: string, value: string) => {
    setSelectedFilters((current) => ({
      ...current,
      [group]: current[group].includes(value)
        ? current[group].filter((item) => item !== value)
        : [...current[group], value],
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      Category: [],
      "Eco Score": [],
      Material: [],
      Packaging: [],
      Certification: [],
    })
    setPriceRange({ min: 0, max: 2000 })
    setQuery("")
  }

  const matchesText = (product: Product, value: string) =>
    `${product.name} ${product.brand} ${product.note}`
      .toLowerCase()
      .includes(value.toLowerCase())

  const filteredProducts = products
    .filter((product) => {
      const searchable =
        `${product.name} ${product.brand} ${product.category} ${product.note}`.toLowerCase()
      const matchesQuery = searchable.includes(query.trim().toLowerCase())
      const matchesCategory =
        selectedFilters.Category.length === 0 ||
        selectedFilters.Category.includes(product.category)
      const matchesScore =
        selectedFilters["Eco Score"].length === 0 ||
        selectedFilters["Eco Score"].some((range) => {
          if (range === "90 & above") return product.score >= 90
          if (range === "80–89")
            return product.score >= 80 && product.score < 90
          return product.score >= 70 && product.score < 80
        })
      const matchesMaterial =
        selectedFilters.Material.length === 0 ||
        selectedFilters.Material.some((value) => matchesText(product, value))
      const matchesPackaging =
        selectedFilters.Packaging.length === 0 ||
        selectedFilters.Packaging.some((value) => matchesText(product, value))
      const matchesCertification =
        selectedFilters.Certification.length === 0 ||
        selectedFilters.Certification.some((value) => {
          if (value === "EcoKart Verified") return product.verified
          return matchesText(product, value)
        })

      return (
        matchesQuery &&
        matchesCategory &&
        matchesScore &&
        matchesMaterial &&
        matchesPackaging &&
        matchesCertification &&
        product.price >= priceRange.min &&
        product.price <= priceRange.max
      )
    })
    .sort((a, b) => {
      if (sort === "score") return b.score - a.score
      if (sort === "price-low") return a.price - b.price
      if (sort === "price-high") return b.price - a.price
      if (sort === "rating") return b.rating - a.rating
      return 0
    })

  const activeFilters = Object.entries(selectedFilters).flatMap(
    ([group, values]) => values.map((value) => ({ group, value })),
  )
  const hasPriceFilter = priceRange.min > 0 || priceRange.max < 2000
  const activeFilterCount =
    activeFilters.length + (hasPriceFilter ? 1 : 0) + (query ? 1 : 0)
  const categoryCounts = products.reduce<Record<string, number>>(
    (counts, product) => ({
      ...counts,
      [product.category]: (counts[product.category] || 0) + 1,
    }),
    {},
  )

  const filterOptions = (
    group: string,
    options: string[],
    counts?: Record<string, number>,
  ) =>
    options.map((value) => (
      <label key={value}>
        <input
          type="checkbox"
          checked={selectedFilters[group].includes(value)}
          onChange={() => toggleFilter(group, value)}
        />
        <span>{value}</span>
        {counts && <small>{counts[value] || 0}</small>}
      </label>
    ))

  const filters = (
    <div className="filters">
      <div className="filter-title">
        <strong>Filters</strong>
        {activeFilterCount > 0 && (
          <button onClick={clearFilters}>Clear all</button>
        )}
      </div>
      <FilterGroup title="Category">
        {filterOptions(
          "Category",
          [
            "Personal Care",
            "Home & Kitchen",
            "Fashion",
            "Stationery",
            "Gardening",
            "Zero Waste",
          ],
          categoryCounts,
        )}
      </FilterGroup>
      <FilterGroup title="Price">
        <div className="price-range">
          <label>
            <span>Minimum</span>
            <input
              type="number"
              min="0"
              max={priceRange.max}
              value={priceRange.min}
              onChange={(event) =>
                setPriceRange((current) => ({
                  ...current,
                  min: Number(event.target.value),
                }))
              }
            />
          </label>
          <span>to</span>
          <label>
            <span>Maximum</span>
            <input
              type="number"
              min={priceRange.min}
              max="2000"
              value={priceRange.max}
              onChange={(event) =>
                setPriceRange((current) => ({
                  ...current,
                  max: Number(event.target.value),
                }))
              }
            />
          </label>
        </div>
      </FilterGroup>
      <FilterGroup title="Eco Score">
        {filterOptions("Eco Score", ["90 & above", "80–89", "70–79"])}
      </FilterGroup>
      <FilterGroup title="Material">
        {filterOptions("Material", [
          "Bamboo",
          "Organic cotton",
          "Recycled glass",
          "Linen",
        ])}
      </FilterGroup>
      <FilterGroup title="Packaging">
        {filterOptions("Packaging", [
          "Plastic-free",
          "Compostable",
          "Refillable",
        ])}
      </FilterGroup>
      <FilterGroup title="Certification">
        {filterOptions("Certification", ["EcoKart Verified", "Fair trade"])}
      </FilterGroup>
    </div>
  )
  return (
    <div className="container page">
      <Breadcrumbs items={["Shop"]} />
      <div className="page-header shop-header">
        <div>
          <span className="eyebrow">Conscious, not complicated</span>
          <h1>Shop all products</h1>
          <p>Everyday essentials selected for lower impact and longer life.</p>
        </div>
        <ProductArtwork kind="tote" compact />
      </div>
      <div className="listing-toolbar">
        <div className="listing-summary">
          <strong>{filteredProducts.length}</strong>
          <span>
            {filteredProducts.length === 1 ? "product" : "products"} found
          </span>
        </div>
        <div>
          <label className="listing-search">
            <Search size={16} />
            <span className="sr-only">Search products</span>
            <input
              type="search"
              placeholder="Search products"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button
                aria-label="Clear search"
                onClick={() => setQuery("")}
                type="button"
              >
                <X size={14} />
              </button>
            )}
          </label>
          <button
            className="filter-trigger"
            onClick={() => setMobileFilters(true)}
          >
            <Filter size={17} /> Filters
            {activeFilterCount > 0 && <b>{activeFilterCount}</b>}
          </button>
          <label>
            Sort by{" "}
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="score">Eco Score</option>
              <option value="rating">Top rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>
      {activeFilterCount > 0 && (
        <div className="active-filters" aria-label="Active filters">
          {query && (
            <button onClick={() => setQuery("")}>
              Search: “{query}” <X size={13} />
            </button>
          )}
          {activeFilters.map(({ group, value }) => (
            <button
              key={`${group}-${value}`}
              onClick={() => toggleFilter(group, value)}
            >
              {value} <X size={13} />
            </button>
          ))}
          {hasPriceFilter && (
            <button onClick={() => setPriceRange({ min: 0, max: 2000 })}>
              ₹{priceRange.min}–₹{priceRange.max} <X size={13} />
            </button>
          )}
          <button className="clear-filters" onClick={clearFilters}>
            Clear all
          </button>
        </div>
      )}
      <div className="listing-layout">
        <aside className="filter-sidebar">{filters}</aside>
        {filteredProducts.length > 0 ? (
          <ProductGrid items={filteredProducts} />
        ) : (
          <div className="listing-empty">
            <span>
              <Search size={24} />
            </span>
            <h2>No products match those filters</h2>
            <p>
              Try removing a filter or widening your price range to see more
              considered choices.
            </p>
            <Button onClick={clearFilters}>Reset filters</Button>
          </div>
        )}
      </div>
      {mobileFilters && (
        <div className="filter-drawer">
          <button
            className="drawer-backdrop"
            aria-label="Close filters"
            onClick={() => setMobileFilters(false)}
          />
          <div>
            <header>
              <strong>Filters</strong>
              <IconButton
                label="Close filters"
                onClick={() => setMobileFilters(false)}
              >
                <X />
              </IconButton>
            </header>
            {filters}
            <Button
              className="full drawer-apply"
              onClick={() => setMobileFilters(false)}
            >
              Show {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export function ProductDetailPage() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const [thumb, setThumb] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  if (!product)
    return (
      <div className="container missing">
        <ProductArtwork kind="planter" />
        <span className="eyebrow">Product not found</span>
        <h1>This item wandered off.</h1>
        <p>It may have been retired, renamed, or moved somewhere new.</p>
        <Button to="/products">Browse all products</Button>
      </div>
    )
  return (
    <div className="container page product-page">
      <Breadcrumbs items={["Shop", product.category, product.name]} />
      <div className="pdp-top">
        <div className="gallery">
          <div className="gallery-main">
            <ProductArtwork kind={product.artwork} />
            <EcoBadge score={product.score} />
          </div>
          <div className="thumbs">
            {[0, 1, 2, 3].map((i) => (
              <button
                className={thumb === i ? "active" : ""}
                onClick={() => setThumb(i)}
                key={i}
              >
                <ProductArtwork kind={product.artwork} compact />
              </button>
            ))}
          </div>
        </div>
        <div className="pdp-info">
          <div className="brand-line">
            <span>{product.brand}</span>
            {product.verified && (
              <b>
                <ShieldCheck size={15} /> EcoKart Verified
              </b>
            )}
          </div>
          <h1>{product.name}</h1>
          <div className="rating-line">
            <Stars rating={product.rating} reviews={product.reviews} />
            <span>·</span>
            <a href="#reviews">Read reviews</a>
          </div>
          <strong className="pdp-price">{money.format(product.price)}</strong>
          <small>Inclusive of all taxes</small>
          <div className="pdp-score">
            <EcoBadge score={product.score} />
            <span>
              <b>Excellent choice</b>
              <small>Top 8% in {product.category}</small>
            </span>
            <ChevronRight />
          </div>
          <p className="pdp-copy">
            A refined everyday essential made with carefully selected materials
            and designed to stay useful for longer. Better in your routine,
            gentler beyond it.
          </p>
          <ul className="pdp-points">
            <li>
              <Check /> Plastic-free packaging
            </li>
            <li>
              <Check /> Responsibly sourced materials
            </li>
            <li>
              <Check /> Carbon-neutral delivery
            </li>
          </ul>
          <div className="buy-row">
            <Quantity value={quantity} onChange={setQuantity} />
            <Button
              className="grow"
              variant={added ? "cyan" : "primary"}
              onClick={() => {
                addItem(product, quantity)
                setAdded(true)
                window.setTimeout(() => setAdded(false), 1800)
              }}
            >
              {added ? (
                <>
                  <Check size={17} /> Added {quantity} to cart
                </>
              ) : (
                <>
                  Add {quantity} to cart <ShoppingBag size={17} />
                </>
              )}
            </Button>
            <IconButton label="Save to wishlist">
              <Heart />
            </IconButton>
          </div>
          <Button to="/checkout" variant="secondary" className="full">
            Buy it now
          </Button>
          <div className="delivery-note">
            <Truck size={19} />
            <span>
              <b>Free delivery by Friday</b>
              <small>Easy 14-day returns</small>
            </span>
          </div>
        </div>
      </div>
      <div className="section product-evidence">
        <SectionHeading
          eyebrow="What makes it better"
          title="The whole product story."
          copy="Clear facts, not vague promises."
        />
        <EcoScorePanel />
        <div className="evidence-grid">
          {[
            [
              "Materials",
              "FSC-certified bamboo and plant-based bristles selected for lower embodied impact.",
              Leaf,
            ],
            [
              "Packaging",
              "A single recyclable paper sleeve. No film, foam, or unnecessary inserts.",
              Package,
            ],
            [
              "Manufacturing",
              "Made in a audited, lower-energy facility with responsible water practices.",
              Store,
            ],
            [
              "End of life",
              "Handle can return to the earth; remove bristles before home composting.",
              Recycle,
            ],
            [
              "Certifications",
              "FSC material chain and EcoKart claim verification reviewed annually.",
              FileCheck2,
            ],
            [
              "Environmental impact",
              "Estimated 30g of virgin plastic avoided per replacement cycle.",
              Sparkles,
            ],
          ].map(([title, copy, Icon]) => (
            <article key={title as string}>
              <Icon />
              <h3>{title as string}</h3>
              <p>{copy as string}</p>
              <Link to="/learn">
                Learn more <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </div>
      <section className="section" id="reviews">
        <SectionHeading eyebrow="Reviews" title="Loved in real routines." />
        <div className="review-summary">
          <strong>4.8</strong>
          <div>
            <div>★★★★★</div>
            <p>Based on {product.reviews} verified reviews</p>
          </div>
          <Button variant="secondary">Write a review</Button>
        </div>
      </section>
      <section className="section">
        <SectionHeading
          eyebrow="Pairs well with"
          title="Complete the thoughtful routine."
        />
        <ProductGrid items={products.slice(1, 4)} />
      </section>
    </div>
  )
}

export function ComparePage() {
  const rows = [
    ["Price", "₹149", "₹89"],
    ["Eco Score", "92", "31"],
    ["Material", "FSC bamboo", "Virgin plastic"],
    ["Packaging", "Recycled paper", "Plastic blister"],
    ["Durability", "High", "Medium"],
    ["Reusable", "Yes", "No"],
    ["Biodegradable", "Handle", "No"],
    ["End of life", "Compost / recycle", "Landfill"],
  ]
  return (
    <div className="container page compare-page">
      <Breadcrumbs items={["Compare"]} />
      <div className="page-header">
        <span className="eyebrow">Compare with confidence</span>
        <h1>
          See the difference,
          <br />
          side by side.
        </h1>
        <p>
          Price is only part of the story. Compare what products are made from,
          how they arrive and where they go next.
        </p>
      </div>
      <div className="compare-table">
        <div className="compare-head">
          <div>
            <span>Comparing</span>
            <b>8 product details</b>
          </div>
          <CompareProduct product={products[0]} />
          <CompareProduct
            product={{
              ...products[0],
              id: "plastic-brush",
              name: "Standard Plastic Brush",
              brand: "Everyday",
              price: 89,
              score: 31,
              note: "Conventional plastic",
              verified: false,
            }}
            conventional
          />
        </div>
        {rows.map(([label, a, b], i) => (
          <div className="compare-row" key={label}>
            <b>{label}</b>
            <span className={i > 0 ? "winner" : ""}>
              {i > 0 && <CheckCircle2 size={15} />}
              {a}
            </span>
            <span>{b}</span>
          </div>
        ))}
      </div>
      <div className="better-choice">
        <span className="choice-icon">
          <Leaf />
        </span>
        <div>
          <span className="eyebrow">Better sustainable choice</span>
          <h2>Bamboo Toothbrush</h2>
          <p>
            A 61-point Eco Score advantage, plastic-free packaging and a
            responsible end of life.
          </p>
        </div>
        <Button to="/products/bamboo-toothbrush">
          View product <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  )
}

function CompareProduct({
  product,
  conventional = false,
}: {
  product: Product
  conventional?: boolean
}) {
  return (
    <div className="compare-product">
      <button aria-label="Remove product">
        <X size={16} />
      </button>
      <ProductArtwork kind={product.artwork} compact />
      <span>{product.brand}</span>
      <strong>{product.name}</strong>
      <div>
        {conventional ? (
          <span className="low-score">31 Eco Score</span>
        ) : (
          <EcoBadge score={product.score} />
        )}
      </div>
    </div>
  )
}

export function CartPage() {
  const { items, itemCount, updateQuantity, removeItem } = useCart()

  if (items.length === 0)
    return (
      <div className="container page">
        <Breadcrumbs items={["Cart"]} />
        <div className="cart-empty">
          <span>
            <ShoppingBag />
          </span>
          <h1>Your cart is ready for better choices.</h1>
          <p>
            Add sustainable essentials and adjust quantities here whenever you
            need.
          </p>
          <Button to="/products">
            Browse products <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    )

  return (
    <div className="container page">
      <Breadcrumbs items={["Cart"]} />
      <div className="page-header compact">
        <span className="eyebrow">Your bag</span>
        <h1>
          My cart <sup>{itemCount}</sup>
        </h1>
      </div>
      <div className="cart-layout">
        <div>
          <div className="cart-head">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>
          {items.map(({ product, quantity }) => (
            <div className="cart-item" key={product.id}>
              <div className="cart-product">
                <ProductArtwork kind={product.artwork} compact />
                <div>
                  <span>{product.brand}</span>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                  <small>{product.note}</small>
                  <button onClick={() => removeItem(product.id)}>
                    <X size={13} /> Remove
                  </button>
                </div>
              </div>
              <strong>{money.format(product.price)}</strong>
              <Quantity
                value={quantity}
                allowRemove
                onChange={(nextQuantity) =>
                  updateQuantity(product.id, nextQuantity)
                }
              />
              <strong>{money.format(product.price * quantity)}</strong>
            </div>
          ))}
          <div className="plastic-note">
            <span>
              <Leaf />
            </span>
            <div>
              <strong>
                This order avoids approximately 240g of single-use plastic.
              </strong>
              <p>
                That’s around 12 disposable bottles kept out of the waste
                stream.
              </p>
            </div>
          </div>
        </div>
        <OrderSummary />
      </div>
      <section className="section">
        <SectionHeading
          eyebrow="You may also like"
          title="A few useful additions."
        />
        <ProductGrid items={products.slice(4, 7)} />
      </section>
    </div>
  )
}

function OrderSummary({ checkout = false }: { checkout?: boolean }) {
  const { items, subtotal } = useCart()
  const delivery = subtotal >= 999 ? 0 : 79
  const total = subtotal + delivery

  return (
    <aside className="order-summary">
      <h2>Order summary</h2>
      {checkout && (
        <div className="summary-products">
          {items.map(({ product, quantity }) => (
            <div key={product.id}>
              <ProductArtwork kind={product.artwork} compact />
              <span>
                <b>{product.name}</b>
                <small>Qty {quantity}</small>
              </span>
              <strong>{money.format(product.price * quantity)}</strong>
            </div>
          ))}
        </div>
      )}
      <label className="promo">
        <span>Promo code</span>
        <div>
          <input placeholder="Enter code" />
          <Button variant="secondary">Apply</Button>
        </div>
      </label>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{money.format(subtotal)}</dd>
        </div>
        <div>
          <dt>Delivery</dt>
          <dd className={delivery === 0 ? "free" : ""}>
            {delivery === 0 ? "Free" : money.format(delivery)}
          </dd>
        </div>
        <div className="total">
          <dt>Total</dt>
          <dd>{money.format(total)}</dd>
        </div>
      </dl>
      <div className="summary-impact">
        <Leaf size={16} /> +{Math.round(subtotal / 10)} EcoPoints with this
        order
      </div>
      <Button to={checkout ? undefined : "/checkout"} className="full">
        {checkout ? "Place order" : "Secure checkout"} <ArrowRight size={16} />
      </Button>
      <small className="secure">
        <ShieldCheck size={14} /> Secure payments · Easy returns
      </small>
    </aside>
  )
}

export function CheckoutPage() {
  return (
    <div className="checkout-page">
      <div className="checkout-top container">
        <Link to="/cart">← Return to cart</Link>
        <span>
          <ShieldCheck size={15} /> Secure checkout
        </span>
      </div>
      <div className="container checkout-grid">
        <div className="checkout-form">
          <div className="checkout-title">
            <span className="eyebrow">Almost there</span>
            <h1>Checkout</h1>
          </div>
          <FormSection number="1" title="Contact information">
            <div className="form-grid one">
              <Field
                label="Email address"
                placeholder="ananya@example.com"
                type="email"
              />
            </div>
          </FormSection>
          <FormSection number="2" title="Delivery address">
            <div className="form-grid">
              <Field label="First name" placeholder="Ananya" />
              <Field label="Last name" placeholder="Kapoor" />
              <Field
                className="span-2"
                label="Address"
                placeholder="24, Lavelle Road"
              />
              <Field label="City" placeholder="Bengaluru" />
              <Field label="Postal code" placeholder="560001" />
            </div>
          </FormSection>
          <FormSection number="3" title="Delivery method">
            <label className="choice-card selected">
              <input type="radio" defaultChecked name="delivery" />
              <Truck />
              <span>
                <b>Carbon-neutral delivery</b>
                <small>Arrives Friday, 14 June</small>
              </span>
              <strong>Free</strong>
            </label>
            <label className="choice-card">
              <input type="radio" name="delivery" />
              <Clock3 />
              <span>
                <b>Express delivery</b>
                <small>Arrives tomorrow</small>
              </span>
              <strong>₹99</strong>
            </label>
          </FormSection>
          <FormSection number="4" title="Payment">
            <label className="choice-card selected">
              <input type="radio" defaultChecked name="pay" />
              <CreditCard />
              <span>
                <b>Credit or debit card</b>
                <small>Visa, Mastercard, RuPay</small>
              </span>
            </label>
            <div className="form-grid">
              <Field
                className="span-2"
                label="Card number"
                placeholder="•••• •••• •••• 4242"
              />
              <Field label="Expiry" placeholder="MM / YY" />
              <Field label="CVV" placeholder="•••" />
            </div>
          </FormSection>
        </div>
        <OrderSummary checkout />
      </div>
    </div>
  )
}

function FormSection({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="form-section">
      <h2>
        <span>{number}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}
function Field({
  label,
  placeholder,
  type = "text",
  className = "",
  name,
  autoComplete,
  required = false,
}: {
  label: string
  placeholder: string
  type?: string
  className?: string
  name?: string
  autoComplete?: string
  required?: boolean
}) {
  return (
    <label className={`field ${className}`}>
      <span>{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
    </label>
  )
}

export function WishlistPage() {
  return (
    <div className="container page">
      <Breadcrumbs items={["Wishlist"]} />
      <div className="page-header compact">
        <span className="eyebrow">Kept for later</span>
        <h1>
          Saved products <sup>4</sup>
        </h1>
        <p>A considered shortlist for whenever you’re ready.</p>
      </div>
      <ProductGrid
        items={[products[2], products[4], products[5], products[6]]}
      />
    </div>
  )
}

export function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const displayName = user?.name ?? "EcoKart Member"
  const email = user?.email ?? "Sign in to add your email"
  const firstName = displayName.split(/\s+/)[0]
  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="dashboard-page">
      <DashboardHeader
        eyebrow="Account"
        title={`Good afternoon, ${firstName}.`}
        copy="Manage your details and see the good your choices are doing."
      />
      <div className="profile-grid">
        <section className="dash-card profile-card">
          <div className="card-title">
            <div>
              <span className="eyebrow">Personal information</span>
              <h2>Your details</h2>
            </div>
            <div className="profile-actions">
              <Button variant="quiet">Edit details</Button>
              {user && (
                <Button
                  variant="quiet"
                  className="logout-action"
                  onClick={handleLogout}
                >
                  <LogOut size={15} /> Log out
                </Button>
              )}
            </div>
          </div>
          <div className="avatar-row">
            <span className="avatar">{getInitials(displayName)}</span>
            <div>
              <b>{displayName}</b>
              <small>{email}</small>
              <small>{user ? "EcoKart member" : "You are browsing as a guest"}</small>
            </div>
          </div>
          <div className="info-grid">
            <span>
              <small>Birthday</small>
              <b>18 September 1995</b>
            </span>
            <span>
              <small>Member since</small>
              <b>
                {user
                  ? new Intl.DateTimeFormat("en", {
                      month: "long",
                      year: "numeric",
                    }).format(new Date(user.createdAt))
                  : "Not signed in"}
              </b>
            </span>
            <span>
              <small>Preferred delivery</small>
              <b>Carbon neutral</b>
            </span>
            <span>
              <small>Primary city</small>
              <b>Bengaluru</b>
            </span>
          </div>
        </section>
        <section className="dash-card points-snapshot">
          <span className="eyebrow light">EcoPoints</span>
          <strong>1,240</strong>
          <p>260 points to your next reward</p>
          <i>
            <em />
          </i>
          <Button to="/rewards" variant="cyan">
            View rewards
          </Button>
        </section>
        <section className="dash-card span-wide">
          <div className="card-title">
            <div>
              <span className="eyebrow">Recent order</span>
              <h2>On its way to you</h2>
            </div>
            <Link to="/profile">View all orders</Link>
          </div>
          <div className="recent-order">
            <ProductArtwork kind="bottle" compact />
            <div>
              <small>Order #EK240518</small>
              <b>3 considered essentials</b>
              <span>
                <Truck size={15} /> Arriving Friday
              </span>
            </div>
            <strong>₹1,248</strong>
            <Button variant="secondary">Track order</Button>
          </div>
        </section>
        <section className="dash-card address-card">
          <div className="card-title">
            <div>
              <span className="eyebrow">Default address</span>
              <h2>Home</h2>
            </div>
            <MapPin />
          </div>
          <p>
            {displayName}
            <br />
            24, Lavelle Road
            <br />
            Bengaluru, Karnataka 560001
          </p>
          <Button variant="quiet">Manage addresses</Button>
        </section>
      </div>
    </div>
  )
}

export function ImpactPage() {
  return (
    <div className="dashboard-page">
      <DashboardHeader
        eyebrow="Your impact"
        title="Small choices. Real progress."
        copy="A living record of the lighter footprint you’re building."
      />
      <div className="metric-grid three">
        <MetricCard
          icon={<ShoppingBag />}
          label="Sustainable products"
          value="14"
          note="+3 this month"
        />
        <MetricCard
          icon={<Recycle />}
          label="Plastic avoided"
          value="2.8 kg"
          note="About 140 bottles"
        />
        <MetricCard
          icon={<Award />}
          label="EcoPoints earned"
          value="1,240"
          note="Top 18% of members"
        />
      </div>
      <div className="impact-dashboard-grid">
        <section className="dash-card chart-card">
          <div className="card-title">
            <div>
              <span className="eyebrow">January—June</span>
              <h2>Your Eco Journey</h2>
            </div>
            <select aria-label="Chart period">
              <option>Last 6 months</option>
            </select>
          </div>
          <MiniChart />
          <div className="chart-legend">
            <span>
              <i /> Plastic avoided
            </span>
            <strong>+38% since January</strong>
          </div>
        </section>
        <section className="dash-card milestone-card">
          <div className="milestone-rings">
            <Award />
          </div>
          <span className="eyebrow">Next milestone</span>
          <h2>Planet Pal</h2>
          <p>You’re 3 sustainable purchases away.</p>
          <i>
            <em />
          </i>
          <small>12 of 15 purchases</small>
        </section>
      </div>
      <section className="dash-card contributions">
        <div className="card-title">
          <div>
            <span className="eyebrow">This year</span>
            <h2>Your contributions</h2>
          </div>
        </div>
        <div>
          {[
            [Recycle, "Plastic avoided", "2.8 kg", "140 bottles"],
            [Leaf, "Sustainable purchases", "14", "Across 6 categories"],
            [Package, "Packaging returned", "8", "All successfully recovered"],
            [Award, "EcoPoints earned", "1,240", "₹200 redeemed"],
          ].map(([Icon, label, value, note]) => (
            <article key={label as string}>
              <span>
                <Icon />
              </span>
              <div>
                <b>{label as string}</b>
                <small>{note as string}</small>
              </div>
              <strong>{value as string}</strong>
            </article>
          ))}
        </div>
      </section>
      <section className="dash-card impact-quote">
        <Sparkles />
        <blockquote>“Progress lives in the choices we repeat.”</blockquote>
        <p>
          Your choices have supported 9 verified responsible businesses this
          year.
        </p>
      </section>
    </div>
  )
}

export function RewardsPage() {
  const earn = [
    [ShoppingBag, "Sustainable purchase", "+50"],
    [Recycle, "Return packaging", "+30"],
    [Leaf, "Buy plastic-free", "+40"],
    [Package, "Recycle eligible product", "+75"],
  ]
  return (
    <div className="container page rewards-page">
      <Breadcrumbs items={["EcoPoints"]} />
      <section className="rewards-hero">
        <div>
          <span className="eyebrow light">Your EcoPoints</span>
          <strong>1,240</strong>
          <h1>Every action counts.</h1>
          <p>
            Keep making thoughtful choices. We’ll make sure they’re rewarded.
          </p>
          <div className="tier-progress">
            <span>
              <b>Seedling</b>
              <b>Planet Pal</b>
            </span>
            <i>
              <em />
            </i>
            <small>260 points to your next tier</small>
          </div>
        </div>
        <div className="reward-medal">
          <Award />
          <span>1,240</span>
          <small>points</small>
        </div>
      </section>
      <section className="section">
        <SectionHeading
          eyebrow="Ways to earn"
          title="Good habits, more rewarding."
        />
        <div className="earn-grid">
          {earn.map(([Icon, label, points]) => (
            <article key={label as string}>
              <span>
                <Icon />
              </span>
              <div>
                <b>{label as string}</b>
                <small>Completed automatically</small>
              </div>
              <strong>{points as string}</strong>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionHeading eyebrow="Redeem rewards" title="A little thank you." />
        <div className="reward-grid">
          {[
            ["₹100 off", "500", "On orders over ₹999"],
            ["Free delivery", "300", "On your next order"],
            ["₹250 off", "1,000", "On orders over ₹1,999"],
          ].map(([title, points, note], i) => (
            <article key={title} className={i === 2 ? "featured" : ""}>
              {i === 2 && <span className="popular">Best value</span>}
              <Gift />
              <h3>{title}</h3>
              <strong>
                {points} <small>points</small>
              </strong>
              <p>{note}</p>
              <Button variant="secondary">Redeem reward</Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export function RecyclePage() {
  const steps = [
    [Box, "Choose item", "Select an eligible purchase"],
    [Clock3, "Schedule pickup", "Pick a time that works"],
    [Truck, "Collection", "We collect from your door"],
    [Recycle, "Reuse / recycle", "It reaches the right partner"],
    [Award, "Earn EcoPoints", "Your action is rewarded"],
  ]
  return (
    <div className="container page recycle-page">
      <Breadcrumbs items={["Return & Recycle"]} />
      <section className="recycle-hero">
        <div>
          <span className="eyebrow">Return. Recover. Reward.</span>
          <h1>
            Give good products
            <br />a better next chapter.
          </h1>
          <p>
            From empty packaging to well-used essentials, we make responsible
            returns straightforward.
          </p>
          <Button>
            Start a return <ArrowRight size={16} />
          </Button>
        </div>
        <div className="cycle-art">
          <span>
            <Recycle />
          </span>
          <i className="cycle-a" />
          <i className="cycle-b" />
          <i className="cycle-c" />
        </div>
      </section>
      <section className="section process-section">
        <SectionHeading
          eyebrow="How it works"
          title="From your door to a better destination."
        />
        <div className="process-grid">
          {steps.map(([Icon, title, copy], i) => (
            <article key={title as string}>
              <small>0{i + 1}</small>
              <span>
                <Icon />
              </span>
              <h3>{title as string}</h3>
              <p>{copy as string}</p>
              {i < steps.length - 1 && <ArrowRight className="process-arrow" />}
            </article>
          ))}
        </div>
      </section>
      <section className="section eligibility">
        <div>
          <span className="eyebrow light">Ready when you are</span>
          <h2>Check what you can return.</h2>
          <p>Choose from your recent purchases or enter a product code.</p>
        </div>
        <div className="eligibility-card">
          <label>
            <span>Product or order number</span>
            <div>
              <input placeholder="e.g. EK240518" />
              <Button>Check eligibility</Button>
            </div>
          </label>
          <small>
            <Check /> Packaging, electronics and selected durable goods accepted
          </small>
        </div>
      </section>
      <section className="section faq-section">
        <SectionHeading
          eyebrow="Good to know"
          title="A few common questions."
        />
        <div>
          {[
            "What condition should my item be in?",
            "What packaging can I return?",
            "How quickly will I receive EcoPoints?",
            "Where do returned products go?",
          ].map((q, i) => (
            <details key={q} open={i === 0}>
              <summary>
                {q}
                <ChevronDown />
              </summary>
              <p>
                {i === 0
                  ? "Used is completely fine. Please clean the item, remove personal data where relevant, and pack it safely for collection."
                  : "We’ll show the exact requirements for each eligible product before you schedule a collection."}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}

export function ReusePage() {
  const reused = [
    {
      ...products[7],
      id: "vintage-denim",
      name: "Vintage Denim Jacket",
      brand: "Second Story",
      price: 850,
      score: 89,
      artwork: "shirt" as Artwork,
      condition: "Good condition",
      note: "Pre-owned · Small signs of wear",
    },
    {
      ...products[2],
      id: "woven-market-bag",
      name: "Woven Market Bag",
      brand: "ReLoved",
      price: 420,
      score: 93,
      condition: "Like new",
      note: "Pre-owned · Barely used",
    },
    {
      ...products[4],
      id: "ceramic-planter-set",
      name: "Ceramic Planter Set",
      brand: "Second Story",
      price: 650,
      score: 90,
      condition: "Very good",
      note: "Pre-owned · Set of two",
    },
    {
      ...products[5],
      id: "linen-journal-cover",
      name: "Linen Journal Cover",
      brand: "ReLoved",
      price: 280,
      score: 87,
      condition: "Good condition",
      note: "Pre-owned · Gentle patina",
    },
  ]
  return (
    <div className="page reuse-page">
      <section className="reuse-hero container">
        <div>
          <span className="eyebrow light">EcoKart Reuse</span>
          <h1>
            Still useful.
            <br />
            <em>Still beautiful.</em>
          </h1>
          <p>
            A second marketplace for things with plenty of life left in them.
          </p>
          <Button variant="cyan">
            Explore pre-owned <ArrowRight size={16} />
          </Button>
        </div>
        <div className="reuse-stack">
          <ProductArtwork kind="shirt" />
          <span>
            One less new thing.
            <br />
            <b>One more good story.</b>
          </span>
        </div>
      </section>
      <div className="container reuse-tabs">
        {["Buy", "Sell", "Donate", "Swap"].map((x, i) => (
          <button className={i === 0 ? "active" : ""} key={x}>
            {x}
          </button>
        ))}
      </div>
      <section className="section container">
        <SectionHeading
          eyebrow="Freshly re-listed"
          title="Pre-loved finds, ready for more."
          action={
            <Button variant="quiet">
              View all <ArrowRight size={16} />
            </Button>
          }
        />
        <ProductGrid items={reused} reuse />
      </section>
      <section className="section container reuse-how">
        <div>
          <span className="eyebrow">Circular by nature</span>
          <h2>
            Pass it on,
            <br />
            with confidence.
          </h2>
        </div>
        <div>
          {[
            [
              ShieldCheck,
              "Checked listings",
              "Clear condition notes and seller history.",
            ],
            [
              RotateCcw,
              "Simple handover",
              "Protected payment and delivery support.",
            ],
            [Leaf, "Impact included", "See the resources every reuse saves."],
          ].map(([Icon, title, copy]) => (
            <article key={title as string}>
              <Icon />
              <h3>{title as string}</h3>
              <p>{copy as string}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export function LearnPage() {
  return (
    <div className="container page learn-page">
      <Breadcrumbs items={["Learn"]} />
      <header className="learn-header">
        <span className="eyebrow">EcoKart Learn</span>
        <h1>
          Live lighter.
          <br />
          <em>Know why.</em>
        </h1>
        <p>
          Clear, useful guides for making sustainability feel less overwhelming
          and more everyday.
        </p>
      </header>
      <Link to="/learn" className="featured-guide">
        <div className="guide-art">
          <ProductArtwork kind="bottle" />
          <span>
            THE
            <br />
            LIGHTER
            <br />
            HOME
          </span>
        </div>
        <div>
          <span className="eyebrow">Featured guide · 10 min read</span>
          <h2>A realistic guide to zero-waste living</h2>
          <p>
            Forget perfection. Start with the things you use every day, build
            better habits slowly, and let the small changes add up.
          </p>
          <span className="read-link">
            Read the guide <ArrowRight />
          </span>
        </div>
      </Link>
      <div className="topic-chips">
        {[
          "Plastic Reduction",
          "Recycling",
          "Sustainable Fashion",
          "Eco Home",
          "Certifications",
          "Zero Waste",
        ].map((x) => (
          <button key={x}>{x}</button>
        ))}
      </div>
      <section className="section">
        <SectionHeading eyebrow="The latest" title="Ideas worth keeping." />
        <div className="article-grid">
          {articles.map((a) => (
            <article key={a.title}>
              <div>
                <ProductArtwork kind={a.artwork} compact />
              </div>
              <span>
                {a.category} · {a.time}
              </span>
              <h3>{a.title}</h3>
              <Link to="/learn">
                Read article <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="cert-glossary">
        <div>
          <span className="eyebrow light">The label decoder</span>
          <h2>
            Certifications,
            <br />
            in plain language.
          </h2>
          <p>
            GOTS, FSC, Fairtrade—understand what labels mean and what they
            don’t.
          </p>
          <Button variant="cyan">Open the glossary</Button>
        </div>
        <div className="cert-stamps">
          {["GOTS", "FSC", "B CORP"].map((x) => (
            <span key={x}>
              {x}
              <small>Decoded</small>
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}

export function SellerPage() {
  return (
    <div className="dashboard-page">
      <DashboardHeader
        eyebrow="Seller overview"
        title="Here’s how your store is doing."
        copy="Performance, orders and verification—all in one considered view."
      />
      <div className="metric-grid four">
        <MetricCard
          icon={<WalletCards />}
          label="Sales"
          value="₹84,500"
          note="+12.4% this month"
        />
        <MetricCard
          icon={<ShoppingBag />}
          label="Orders"
          value="124"
          note="18 ready to ship"
        />
        <MetricCard
          icon={<Package />}
          label="Products"
          value="36"
          note="3 low in stock"
        />
        <MetricCard
          icon={<FileCheck2 />}
          label="Pending verification"
          value="4"
          note="2 need your attention"
        />
      </div>
      <div className="seller-grid">
        <section className="dash-card chart-card">
          <div className="card-title">
            <div>
              <span className="eyebrow">Last 6 months</span>
              <h2>Sales overview</h2>
            </div>
            <select>
              <option>Revenue</option>
            </select>
          </div>
          <MiniChart />
          <div className="chart-legend">
            <span>
              <i /> Revenue
            </span>
            <strong>₹2.8L total</strong>
          </div>
        </section>
        <section className="dash-card verification-card">
          <div className="card-title">
            <div>
              <span className="eyebrow">Action needed</span>
              <h2>Verification</h2>
            </div>
            <span className="count-badge">4</span>
          </div>
          {[
            ["Bamboo Travel Kit", "Materials needed"],
            ["Cotton Market Tote", "Review in progress"],
            ["Kitchen Refill Set", "Certificate expiring"],
          ].map(([x, y], i) => (
            <Link to="/seller/verification" key={x}>
              <span className={`status-dot s${i}`} />
              <div>
                <b>{x}</b>
                <small>{y}</small>
              </div>
              <ChevronRight />
            </Link>
          ))}
          <Button
            to="/seller/verification"
            variant="secondary"
            className="full"
          >
            Manage verification
          </Button>
        </section>
      </div>
      <section className="dash-card order-table">
        <div className="card-title">
          <div>
            <span className="eyebrow">Recent activity</span>
            <h2>Latest orders</h2>
          </div>
          <Button variant="quiet">View all</Button>
        </div>
        <div className="table">
          <div className="tr th">
            <span>Order</span>
            <span>Customer</span>
            <span>Product</span>
            <span>Status</span>
            <span>Total</span>
          </div>
          {[
            ["#EK-8429", "Aditi Rao", "Market Tote", "Ready to ship", "₹699"],
            ["#EK-8428", "Kunal S.", "Bamboo Travel Kit", "Processing", "₹849"],
            [
              "#EK-8427",
              "Mira Patel",
              "Refill Starter Set",
              "Delivered",
              "₹1,249",
            ],
            ["#EK-8426", "Dev Mehta", "Linen Napkins", "Delivered", "₹599"],
          ].map((row) => (
            <div className="tr" key={row[0]}>
              {row.map((x, i) => (
                <span key={x} className={i === 3 ? "table-status" : ""}>
                  {x}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function SellerVerificationPage() {
  const steps = [
    "Product",
    "Materials",
    "Packaging",
    "Manufacturing",
    "Certifications",
    "Documents",
  ]
  return (
    <div className="dashboard-page">
      <DashboardHeader
        eyebrow="Sustainability"
        title="Product verification"
        copy="Show the evidence behind your product’s sustainability claims."
      />
      <div className="verification-stepper">
        {steps.map((x, i) => (
          <div className={i === 1 ? "active" : i < 1 ? "done" : ""} key={x}>
            <span>{i < 1 ? <Check /> : i + 1}</span>
            <b>{x}</b>
          </div>
        ))}
      </div>
      <div className="verification-layout">
        <section className="dash-card verification-form">
          <div className="card-title">
            <div>
              <span className="eyebrow">Step 2 of 6</span>
              <h2>Materials</h2>
              <p>
                Tell us what your product is made from and where those materials
                come from.
              </p>
            </div>
          </div>
          <div className="form-grid">
            <Field
              label="Primary material"
              placeholder="e.g. FSC-certified bamboo"
            />
            <label className="field">
              <span>Material category</span>
              <select>
                <option>Renewable natural material</option>
                <option>Recycled material</option>
              </select>
            </label>
            <Field
              className="span-2"
              label="Country of origin"
              placeholder="e.g. India"
            />
          </div>
          <label className="field">
            <span>Material details</span>
            <textarea
              placeholder="Describe the material composition, sourcing and any treatments..."
              rows={5}
            />
          </label>
          <label className="upload-zone">
            <Upload />
            <b>Upload supporting evidence</b>
            <span>
              Supplier declaration, certificate or material specification
            </span>
            <small>PDF, JPG or PNG · Max 10 MB</small>
            <input type="file" />
          </label>
          <div className="form-actions">
            <Button variant="secondary">Back</Button>
            <Button>
              Save & continue <ArrowRight size={16} />
            </Button>
          </div>
        </section>
        <aside className="dash-card criteria-card">
          <ShieldCheck />
          <span className="eyebrow">What we look for</span>
          <h2>Strong evidence builds trust.</h2>
          <ul>
            <li>
              <Check /> Clear material composition
            </li>
            <li>
              <Check /> Traceable supplier source
            </li>
            <li>
              <Check /> Current certifications
            </li>
            <li>
              <Check /> Honest limits and trade-offs
            </li>
          </ul>
          <p>
            Verification usually takes 3–5 business days once all stages are
            complete.
          </p>
          <div className="verified-example">
            <ShieldCheck />
            <span>
              <b>EcoKart Verified</b>
              <small>Approved products display this badge</small>
            </span>
          </div>
        </aside>
      </div>
    </div>
  )
}

export function AdminPage() {
  return (
    <div className="dashboard-page">
      <DashboardHeader
        eyebrow="Platform overview"
        title="Good morning, Admin."
        copy="Here’s what needs attention across EcoKart today."
      />
      <div className="metric-grid admin-metrics">
        {[
          [UsersRound, "Total users", "48,290", "+8.2%"],
          [Store, "Sellers", "1,284", "+24"],
          [Package, "Products", "8,642", "+183"],
          [FileCheck2, "Pending verification", "86", "12 overdue"],
          [ShoppingBag, "Orders", "12,408", "+11.6%"],
          [CircleDollarSign, "Revenue", "₹42.8L", "+14.2%"],
        ].map(([Icon, label, value, note]) => (
          <MetricCard
            key={label as string}
            icon={<Icon />}
            label={label as string}
            value={value as string}
            note={note as string}
          />
        ))}
      </div>
      <div className="admin-grid">
        <section className="dash-card chart-card">
          <div className="card-title">
            <div>
              <span className="eyebrow">Marketplace activity</span>
              <h2>Orders and revenue</h2>
            </div>
            <select>
              <option>Last 6 months</option>
            </select>
          </div>
          <MiniChart />
          <div className="chart-legend">
            <span>
              <i /> Orders
            </span>
            <strong>12.4K total</strong>
          </div>
        </section>
        <section className="dash-card queue-card">
          <div className="card-title">
            <div>
              <span className="eyebrow">Needs review</span>
              <h2>Verification queue</h2>
            </div>
            <span className="count-badge">86</span>
          </div>
          {[
            ["GreenNest Co.", "12 products", "High"],
            ["Bare Basics", "8 products", "Normal"],
            ["Terra Loom", "6 products", "Normal"],
            ["Kind Home", "4 products", "High"],
          ].map(([seller, count, priority]) => (
            <div key={seller}>
              <span
                className={priority === "High" ? "priority high" : "priority"}
              >
                {priority}
              </span>
              <div>
                <b>{seller}</b>
                <small>{count} pending</small>
              </div>
              <Button variant="quiet">Review</Button>
            </div>
          ))}
        </section>
      </div>
      <section className="dash-card order-table">
        <div className="card-title">
          <div>
            <span className="eyebrow">Platform health</span>
            <h2>Recent complaints</h2>
          </div>
          <Button variant="quiet">Open complaint centre</Button>
        </div>
        <div className="table">
          <div className="tr th">
            <span>Reference</span>
            <span>Type</span>
            <span>Reported by</span>
            <span>Priority</span>
            <span>Status</span>
          </div>
          {[
            ["#CP-4021", "Product claim", "Customer", "High", "Under review"],
            ["#CP-4020", "Late delivery", "Customer", "Normal", "Assigned"],
            ["#CP-4019", "Listing misuse", "Seller", "Normal", "Resolved"],
          ].map((row) => (
            <div className="tr" key={row[0]}>
              {row.map((x, i) => (
                <span key={x} className={i === 3 ? "table-status" : ""}>
                  {x}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function AuthPanel({ mode }: { mode: "login" | "signup" }) {
  const signup = mode === "signup"
  const navigate = useNavigate()
  const { signIn, signUp } = useAuth()
  const destination = signup ? "/signup/preferences" : "/"
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get("email") ?? "")
    if (signup) {
      signUp(String(data.get("name") ?? ""), email)
    } else {
      signIn(email)
    }
    navigate(destination)
  }
  const providers = [
    ["G", "Google", "google"],
    ["f", "Facebook", "facebook"],
    ["◎", "Instagram", "instagram"],
    ["X", "X", "x"],
  ] as const

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <Link className="auth-logo" to="/">
          <Leaf /> EcoKart
        </Link>
        <div>
          <span className="eyebrow light">
            {signup ? "Welcome to better" : "Welcome back"}
          </span>
          <h1>
            Shop better.
            <br />
            <em>Live greener.</em>
          </h1>
          <p>Thoughtful products. Clearer choices. A lighter everyday.</p>
        </div>
        <div className="auth-art">
          <ProductArtwork kind={signup ? "tote" : "planter"} />
          <span>
            <ShieldCheck /> Claims verified.
            <br />
            Choices made clearer.
          </span>
        </div>
      </div>
      <main className="auth-form-wrap">
        <Link className="auth-mobile-logo" to="/">
          <Leaf /> EcoKart
        </Link>
        <div className="auth-form">
          <span className="eyebrow">
            {signup ? "Create your account" : "Your EcoKart"}
          </span>
          <h2>{signup ? "Let’s get started." : "Welcome back."}</h2>
          <p>
            {signup
              ? "Join a marketplace made for better choices."
              : "Good to see you again. Sign in to continue."}
          </p>
          <div className="social-login-grid">
            {providers.map(([mark, provider, className]) => (
              <Button
                variant="secondary"
                className={`social-login social-${className}`}
                onClick={() => {
                  signIn(
                    `${provider.toLowerCase()}@ecokart.example`,
                    `${provider} Member`,
                  )
                  navigate(destination)
                }}
                key={provider}
              >
                <span aria-hidden="true">{mark}</span>
                {provider}
              </Button>
            ))}
          </div>
          <div className="auth-divider">
            <span>or continue with email</span>
          </div>
          <form onSubmit={handleSubmit}>
            {signup && (
              <Field
                label="Full name"
                placeholder="Ananya Kapoor"
                name="name"
                autoComplete="name"
                required
              />
            )}
            <Field
              label="Email address"
              placeholder="you@example.com"
              type="email"
              name="email"
              autoComplete="email"
              required
            />
            <Field
              label="Password"
              placeholder="At least 8 characters"
              type="password"
              name="password"
              autoComplete={signup ? "new-password" : "current-password"}
              required
            />
            <div className="auth-options">
              <label>
                <input type="checkbox" required={signup} />{" "}
                {signup
                  ? "I agree to the terms and privacy policy"
                  : "Remember me"}
              </label>
              {!signup && <Link to="/login">Forgot password?</Link>}
            </div>
            <Button type="submit" className="full">
              {signup ? "Create account" : "Sign in"} <ArrowRight size={16} />
            </Button>
          </form>
          <div className="auth-switch">
            {signup ? "Already have an account?" : "New to EcoKart?"}{" "}
            <Link to={signup ? "/login" : "/signup"}>
              {signup ? "Sign in" : "Create an account"}
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export function LoginPage() {
  return <AuthPanel mode="login" />
}
export function SignupPage() {
  return <AuthPanel mode="signup" />
}

const onboardingQuestions = [
  {
    eyebrow: "A little about you",
    title: "What best describes your day-to-day?",
    copy: "This helps us make recommendations feel relevant to your routine.",
    options: [
      [UserRound, "Student", "Learning, exploring, and building new habits"],
      [WalletCards, "Working professional", "Balancing thoughtful choices with a busy week"],
      [Store, "Business owner", "Building something with purpose"],
      [UsersRound, "Homemaker", "Making everyday home choices count"],
      [Sparkles, "Something else", "My path does not fit neatly in a box"],
    ],
  },
  {
    eyebrow: "Your eco-friendly vibe",
    title: "What do you love most about greener living?",
    copy: "Choose the idea that feels most like you right now.",
    options: [
      [Recycle, "Less plastic", "Refills, reusables, and plastic-free swaps"],
      [Heart, "Conscious fashion", "Better fibres, fair makers, and longer wear"],
      [Leaf, "A healthier home", "Cleaner materials for everyday spaces"],
      [ShieldCheck, "Ethical brands", "Clear claims and responsible production"],
      [Sparkles, "Learning as I go", "Simple ideas without pressure or perfection"],
    ],
  },
  {
    eyebrow: "Your marketplace",
    title: "What would you like to discover first?",
    copy: "We’ll use this to shape the products you see when you arrive.",
    options: [
      [Sparkles, "Personal care", "Gentler essentials for daily routines"],
      [Leaf, "Home & living", "Thoughtful upgrades for every room"],
      [ShoppingBag, "Fashion & accessories", "Useful pieces designed to last"],
      [Gift, "Meaningful gifts", "Better presents with a lighter footprint"],
      [Store, "A bit of everything", "Let EcoKart surprise me"],
    ],
  },
  {
    eyebrow: "Your next small win",
    title: "Which goal feels most important?",
    copy: "There’s no wrong place to begin. We’ll meet you where you are.",
    options: [
      [Recycle, "Reduce waste", "Cut down on single-use packaging"],
      [WalletCards, "Buy more mindfully", "Choose fewer, better things"],
      [UsersRound, "Support responsible makers", "Back people doing business better"],
      [Leaf, "Lower my impact", "Make everyday choices a little lighter"],
      [Search, "Find easy swaps", "Replace essentials one step at a time"],
    ],
  },
  {
    eyebrow: "One last thing",
    title: "How did you hear about EcoKart?",
    copy: "Your answer helps our community grow in the right places.",
    options: [
      [UsersRound, "Friends or family", "Someone I trust shared EcoKart"],
      [Heart, "Social media", "I found EcoKart in my feed"],
      [Megaphone, "An advertisement", "An EcoKart message caught my eye"],
      [Search, "Google or search", "I was looking for a better option"],
      [Gift, "Event or community", "I discovered EcoKart out in the world"],
    ],
  },
] as const

export function PreferencesPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const navigate = useNavigate()
  const question = onboardingQuestions[step]
  const selected = answers[step]
  const lastStep = step === onboardingQuestions.length - 1
  const moveForward = () => {
    if (lastStep) {
      navigate("/")
      return
    }
    setStep((current) => current + 1)
  }

  return (
    <div className="preferences-page">
      <Link className="onboarding-logo" to="/">
        <Leaf /> EcoKart
      </Link>
      <main className="onboarding-card">
        <div className="onboarding-topline">
          <div
            className="onboarding-progress"
            aria-label={`Step ${step + 1} of ${onboardingQuestions.length}`}
          >
            {onboardingQuestions.map((item, index) => (
              <span
                className={index <= step ? "active" : ""}
                key={item.title}
              />
            ))}
          </div>
          <span className="step-count">
            {String(step + 1).padStart(2, "0")} /{" "}
            {String(onboardingQuestions.length).padStart(2, "0")}
          </span>
        </div>
        <span className="eyebrow">{question.eyebrow}</span>
        <h1>{question.title}</h1>
        <p>{question.copy}</p>
        <div className="preference-grid">
          {question.options.map(([Icon, title, copy]) => {
            const active = selected === title
            return (
              <Button
                variant="secondary"
                className={`preference-option ${active ? "active" : ""}`}
                onClick={() =>
                  setAnswers((current) => ({ ...current, [step]: title }))
                }
                ariaPressed={active}
                key={title}
              >
                <span>
                  <Icon size={20} />
                </span>
                <div>
                  <b>{title}</b>
                  <small>{copy}</small>
                </div>
                <i>{active && <Check />}</i>
              </Button>
            )
          })}
        </div>
        <div className="preference-actions">
          <div>
            {step > 0 && (
              <Button
                variant="quiet"
                onClick={() => setStep((current) => current - 1)}
              >
                Back
              </Button>
            )}
            <Button variant="quiet" onClick={moveForward}>
              {lastStep ? "Skip & finish" : "Skip for now"}
            </Button>
          </div>
          <Button onClick={moveForward} disabled={!selected}>
            {lastStep ? "Finish setup" : "Continue"} <ArrowRight size={16} />
          </Button>
        </div>
      </main>
    </div>
  )
}

export function NotFoundPage() {
  return (
    <main className="not-found">
      <ProductArtwork kind="planter" />
      <span className="eyebrow">404 · Lost, not wasted</span>
      <h1>This page found a new purpose.</h1>
      <p>
        The link may be out of date, but there’s plenty more worth exploring.
      </p>
      <div className="button-row">
        <Button to="/">Go home</Button>
        <Button to="/products" variant="secondary">
          Browse products
        </Button>
      </div>
    </main>
  )
}
