import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { products, type Product } from "./data"

type CartItem = {
  product: Product
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  addItem: (product: Product, quantity?: number) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)
const storageKey = "ecokart-cart"
const legacySeedMigrationKey = "ecokart-cart-legacy-seed-removed"
const legacySeedProductIds = new Set(["bamboo-toothbrush", "refill-bottle"])

const initialItems: CartItem[] = []

function loadCart() {
  try {
    const stored = localStorage.getItem(storageKey)
    if (!stored) return initialItems

    let saved = JSON.parse(stored) as {
      productId: string
      quantity: number
    }[]
    if (!localStorage.getItem(legacySeedMigrationKey)) {
      saved = saved.filter(
        ({ productId }) => !legacySeedProductIds.has(productId),
      )
      localStorage.setItem(storageKey, JSON.stringify(saved))
      localStorage.setItem(legacySeedMigrationKey, "complete")
    }
    return saved.flatMap(({ productId, quantity }) => {
      const product = products.find((item) => item.id === productId)
      return product && quantity > 0 ? [{ product, quantity }] : []
    })
  } catch {
    return initialItems
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart)

  const saveItems = (nextItems: CartItem[]) => {
    setItems(nextItems)
    localStorage.setItem(
      storageKey,
      JSON.stringify(
        nextItems.map(({ product, quantity }) => ({
          productId: product.id,
          quantity,
        })),
      ),
    )
  }

  useEffect(() => {
    if (localStorage.getItem(legacySeedMigrationKey)) return
    saveItems(
      items.filter(({ product }) => !legacySeedProductIds.has(product.id)),
    )
    localStorage.setItem(legacySeedMigrationKey, "complete")
  }, [])

  const addItem = (product: Product, quantity = 1) => {
    const current = items.find((item) => item.product.id === product.id)
    saveItems(
      current
        ? items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...items, { product, quantity }],
    )
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      saveItems(items.filter((item) => item.product.id !== productId))
      return
    }
    saveItems(
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    )
  }

  const removeItem = (productId: string) => {
    saveItems(items.filter((item) => item.product.id !== productId))
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) throw new Error("useCart must be used inside CartProvider")
  return cart
}
