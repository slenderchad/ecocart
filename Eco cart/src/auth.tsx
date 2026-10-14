import { createContext, useContext, useState, type ReactNode } from "react"

export type Account = {
  name: string
  email: string
  createdAt: string
}

type AuthContextValue = {
  user: Account | null
  signUp: (name: string, email: string) => void
  signIn: (email: string, name?: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)
const accountStorageKey = "ecokart-account"
const sessionStorageKey = "ecokart-session"

function loadAccount(): Account | null {
  try {
    if (localStorage.getItem(sessionStorageKey) !== "active") return null
    const stored = localStorage.getItem(accountStorageKey)
    if (!stored) return null

    const account = JSON.parse(stored) as Partial<Account>
    return account.name && account.email && account.createdAt
      ? {
          name: account.name,
          email: account.email,
          createdAt: account.createdAt,
        }
      : null
  } catch {
    return null
  }
}

function nameFromEmail(email: string) {
  const localPart = email.split("@")[0] ?? ""
  const words = localPart.split(/[._-]+/).filter(Boolean)
  if (!words.length) return "EcoKart Member"
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function getInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
  return initials || "EK"
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Account | null>(loadAccount)

  const saveSession = (account: Account) => {
    localStorage.setItem(accountStorageKey, JSON.stringify(account))
    localStorage.setItem(sessionStorageKey, "active")
    setUser(account)
  }

  const signUp = (name: string, email: string) => {
    saveSession({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    })
  }

  const signIn = (email: string, name?: string) => {
    const normalizedEmail = email.trim().toLowerCase()
    let savedAccount: Account | null = null
    try {
      const stored = localStorage.getItem(accountStorageKey)
      if (stored) savedAccount = JSON.parse(stored) as Account
    } catch {
      savedAccount = null
    }

    saveSession(
      savedAccount?.email === normalizedEmail
        ? savedAccount
        : {
            name: name?.trim() || nameFromEmail(normalizedEmail),
            email: normalizedEmail,
            createdAt: new Date().toISOString(),
          },
    )
  }

  const logout = () => {
    localStorage.removeItem(sessionStorageKey)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const auth = useContext(AuthContext)
  if (!auth) throw new Error("useAuth must be used inside AuthProvider")
  return auth
}
