import { ArrowLeft } from "lucide-react"
import {
  createBrowserRouter,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router"
import { AuthProvider } from "../auth"
import { CartProvider } from "../cart"
import { Button, DashboardLayout, StoreLayout } from "../components"
import {
  AdminPage,
  CartPage,
  CheckoutPage,
  ComparePage,
  HomePage,
  ImpactPage,
  LearnPage,
  LoginPage,
  NotFoundPage,
  PreferencesPage,
  ProductDetailPage,
  ProductsPage,
  ProfilePage,
  RecyclePage,
  ReusePage,
  RewardsPage,
  SellerPage,
  SellerVerificationPage,
  SignupPage,
  WishlistPage,
} from "../pages"

function BackNavigation() {
  const location = useLocation()
  const navigate = useNavigate()
  if (location.pathname === "/") return null

  return (
    <Button
      variant="secondary"
      className="global-back-button"
      onClick={() =>
        location.key === "default" ? navigate("/") : navigate(-1)
      }
    >
      <ArrowLeft size={16} /> Back
    </Button>
  )
}

function AppProviders() {
  return (
    <AuthProvider>
      <CartProvider>
        <BackNavigation />
        <Outlet />
      </CartProvider>
    </AuthProvider>
  )
}

export const router = createBrowserRouter([
  {
    Component: AppProviders,
    children: [
      {
        Component: StoreLayout,
        children: [
          { index: true, Component: HomePage },
          { path: "products", Component: ProductsPage },
          { path: "products/:id", Component: ProductDetailPage },
          { path: "compare", Component: ComparePage },
          { path: "cart", Component: CartPage },
          { path: "wishlist", Component: WishlistPage },
          { path: "rewards", Component: RewardsPage },
          { path: "recycle", Component: RecyclePage },
          { path: "reuse", Component: ReusePage },
          { path: "learn", Component: LearnPage },
        ],
      },
      { path: "checkout", Component: CheckoutPage },
      {
        Component: DashboardLayout,
        children: [
          { path: "profile", Component: ProfilePage },
          { path: "profile/impact", Component: ImpactPage },
        ],
      },
      {
        Component: () => <DashboardLayout mode="seller" />,
        children: [
          { path: "seller", Component: SellerPage },
          { path: "seller/verification", Component: SellerVerificationPage },
        ],
      },
      {
        Component: () => <DashboardLayout mode="admin" />,
        children: [{ path: "admin", Component: AdminPage }],
      },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignupPage },
      { path: "signup/preferences", Component: PreferencesPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
])
