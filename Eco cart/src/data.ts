export type Artwork = "brush" | "bottle" | "tote" | "candle" | "planter" | "notebook" | "cleaner" | "shirt"

export type Product = {
  id: string
  name: string
  brand: string
  category: string
  price: number
  rating: number
  reviews: number
  note: string
  artwork: Artwork
  score: number
  verified?: boolean
  condition?: string
}

export const products: Product[] = [
  {
    id: "bamboo-toothbrush",
    name: "Bamboo Toothbrush",
    brand: "Bare Basics",
    category: "Personal Care",
    price: 149,
    rating: 4.8,
    reviews: 184,
    note: "Plastic-free · Compostable",
    artwork: "brush",
    score: 92,
    verified: true,
  },
  {
    id: "refill-bottle",
    name: "Amber Refill Bottle",
    brand: "Common Good",
    category: "Home & Kitchen",
    price: 449,
    rating: 4.7,
    reviews: 92,
    note: "Refillable · Recycled glass",
    artwork: "bottle",
    score: 89,
    verified: true,
  },
  {
    id: "everyday-tote",
    name: "Everyday Market Tote",
    brand: "Terra Loom",
    category: "Fashion",
    price: 699,
    rating: 4.9,
    reviews: 126,
    note: "Organic cotton · Fair trade",
    artwork: "tote",
    score: 94,
    verified: true,
  },
  {
    id: "coconut-candle",
    name: "Coconut Wax Candle",
    brand: "Soft Earth",
    category: "Home & Kitchen",
    price: 549,
    rating: 4.6,
    reviews: 71,
    note: "Clean burn · Reusable jar",
    artwork: "candle",
    score: 86,
  },
  {
    id: "desk-planter",
    name: "Self-Watering Planter",
    brand: "Grow Slow",
    category: "Gardening",
    price: 799,
    rating: 4.8,
    reviews: 63,
    note: "Recycled ceramic · Durable",
    artwork: "planter",
    score: 91,
    verified: true,
  },
  {
    id: "paper-notebook",
    name: "Upcycled Paper Journal",
    brand: "Paper Again",
    category: "Stationery",
    price: 299,
    rating: 4.7,
    reviews: 108,
    note: "Tree-free · Hand bound",
    artwork: "notebook",
    score: 88,
  },
  {
    id: "cleaning-tabs",
    name: "Multi-Surface Cleaning Tabs",
    brand: "Kind Home",
    category: "Zero Waste",
    price: 349,
    rating: 4.9,
    reviews: 205,
    note: "Zero plastic · Non-toxic",
    artwork: "cleaner",
    score: 96,
    verified: true,
  },
  {
    id: "linen-shirt",
    name: "Easy Linen Shirt",
    brand: "Pale Blue",
    category: "Fashion",
    price: 1890,
    rating: 4.5,
    reviews: 48,
    note: "Low-water linen · Natural dye",
    artwork: "shirt",
    score: 84,
  },
]

export const categories = [
  ["Personal Care", "brush"],
  ["Home & Kitchen", "bottle"],
  ["Fashion", "tote"],
  ["Stationery", "notebook"],
  ["Gardening", "planter"],
  ["Zero Waste", "cleaner"],
] as const

export const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

export const scoreBreakdown = [
  ["Materials", 95],
  ["Packaging", 90],
  ["Durability", 94],
  ["Production", 88],
  ["End-of-life", 92],
] as const

export const articles = [
  {
    category: "Zero Waste",
    title: "A gentler way to begin zero-waste living",
    time: "6 min read",
    artwork: "bottle" as Artwork,
  },
  {
    category: "Materials",
    title: "Bamboo, linen, hemp: what really makes a material better?",
    time: "8 min read",
    artwork: "tote" as Artwork,
  },
  {
    category: "Recycling",
    title: "The recycling symbols worth knowing",
    time: "4 min read",
    artwork: "cleaner" as Artwork,
  },
]
