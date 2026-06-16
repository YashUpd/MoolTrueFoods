# MoolTrue Foods — Complete Project Documentation

> **What this is:** A structured, file-by-file explanation of the entire MoolTrue Foods codebase. Every file, every concept, every important keyword is explained so you can confidently walk anyone through your project.

---

## Table of Contents

1. [Project Architecture Overview](#1-project-architecture-overview)
2. [Root Configuration Files](#2-root-configuration-files)
3. [Frontend — Entry Points](#3-frontend--entry-points)
4. [Frontend — Context (Global State Management)](#4-frontend--context-global-state-management)
5. [Frontend — API Client Layer](#5-frontend--api-client-layer)
6. [Frontend — Reusable Components](#6-frontend--reusable-components)
7. [Frontend — Pages](#7-frontend--pages)
8. [Backend — Server Entry & Configuration](#8-backend--server-entry--configuration)
9. [Backend — Database (Prisma ORM)](#9-backend--database-prisma-orm)
10. [Backend — Routes](#10-backend--routes)
11. [Backend — Controllers (Business Logic)](#11-backend--controllers-business-logic)
12. [Backend — Middleware](#12-backend--middleware)
13. [Backend — Real-Time Chat (Socket.io + AI)](#13-backend--real-time-chat-socketio--ai)
14. [Backend — Database Seeding](#14-backend--database-seeding)
15. [DevOps — Docker & Deployment](#15-devops--docker--deployment)
16. [Concept Glossary](#16-concept-glossary)

---

## 1. Project Architecture Overview

MoolTrue Foods is a **full-stack e-commerce web application** built with a modern JavaScript stack. It has two independent codebases that communicate over HTTP APIs and WebSockets:

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                       │
│                                                                  │
│  src/                                                            │
│  ├─ main.jsx          ← React entry point                       │
│  ├─ App.jsx           ← Routing + Providers                     │
│  ├─ api/client.js     ← Centralized HTTP client                 │
│  ├─ context/          ← Global state (Auth, Cart, Wishlist)      │
│  ├─ components/       ← Reusable UI (Navbar, ProductCard, etc.)  │
│  ├─ pages/            ← Route-level pages (Home, Shop, Admin)    │
│  └─ data/products.js  ← Static fallback product data            │
│                                                                  │
│  Communicates via: fetch() HTTP requests + Socket.io WebSockets  │
└─────────────────────┬───────────────────────────────────────────┘
                      │  /api/*  proxied via Vite dev server
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Express + Node.js)                    │
│                                                                  │
│  server/src/                                                     │
│  ├─ index.js          ← Express server setup                    │
│  ├─ db.js             ← Prisma database client singleton        │
│  ├─ socket.js         ← Socket.io real-time chat + AI bot       │
│  ├─ seed.js           ← Database seeder script                  │
│  ├─ routes/           ← URL → Controller mapping                │
│  ├─ controllers/      ← Business logic (auth, products, orders) │
│  └─ middleware/       ← JWT auth guard + Cloudinary upload       │
│                                                                  │
│  Database: PostgreSQL (via Prisma ORM)                           │
│  File Storage: Cloudinary (CDN for product images)               │
│  Payments: Razorpay (Indian payment gateway)                     │
│  AI Chat: Groq LLM API + Xenova sentence transformers           │
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend Framework | React 19 | Component-based UI library |
| Build Tool | Vite 8 | Fast dev server with HMR (Hot Module Replacement) |
| Styling | Tailwind CSS 4 + Vanilla CSS | Utility-first CSS + custom component styles |
| Routing | React Router v7 | Client-side page navigation |
| Animations | Framer Motion | Page transitions, cart drawer animations |
| Auth (Client) | `@react-oauth/google` | Google One-Tap Sign-In widget |
| Backend | Express.js | HTTP API framework for Node.js |
| Database | PostgreSQL | Relational database for users, products, orders |
| ORM | Prisma | Type-safe database query builder |
| Auth (Server) | JWT + bcryptjs | Stateless authentication tokens + password hashing |
| File Upload | Multer + Cloudinary | Image upload processing + CDN storage |
| Payments | Razorpay | Indian payment gateway (UPI, cards, netbanking) |
| Real-time | Socket.io | WebSocket-based live chat |
| AI Chatbot | Groq LLM API + Xenova Transformers | Customer support bot with semantic guardrails |
| Containerization | Docker + Docker Compose | One-command local development stack |
| Deployment | Vercel (frontend) + Render (backend) | Cloud hosting |

---

## 2. Root Configuration Files

### `index.html` — The HTML Shell

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MoolTrue Foods - 100% Organic & Farm Fresh</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**Purpose:** This is the *only* HTML file in the entire app. It is the shell that React fills in dynamically.

**Key concepts:**
- `<div id="root">` — React's "mount point." The entire React component tree gets injected inside this empty div.
- `<script type="module" src="/src/main.jsx">` — The `type="module"` tells the browser this is an ES Module, enabling `import`/`export` syntax natively. Vite intercepts this and processes it through its build pipeline.
- `<link rel="preconnect">` — Tells the browser to establish an early connection to Google Fonts servers *before* the CSS file is needed. This reduces latency when loading the custom `Outfit` font.
- `crossorigin` attribute — Required for fonts because browsers enforce CORS on font downloads.

---

### `package.json` (Frontend)

```json
{
  "name": "mooltruefoods",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": { ... },
  "devDependencies": { ... }
}
```

**Key concepts:**
- `"type": "module"` — Tells Node.js to treat all `.js` files as ES Modules (allows `import`/`export` instead of `require()`/`module.exports`).
- `"private": true` — Prevents accidental publishing to the npm registry.
- `"scripts"` — Named terminal commands. Running `npm run dev` executes `vite`, which starts the local development server.
- `dependencies` — Packages needed in production (React, Framer Motion, React Router, Socket.io-client).
- `devDependencies` — Packages needed only during development (ESLint, Vite, Tailwind, TypeScript types).

---

### `vite.config.js` — Build Tool Configuration

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true,
    watch: { usePolling: true },
    proxy: {
      '/api': {
        target: process.env.DOCKER ? 'http://backend:5000' : 'http://localhost:5000',
        changeOrigin: true,
      },
      '/socket.io': {
        target: process.env.DOCKER ? 'http://backend:5000' : 'http://localhost:5000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
```

**Purpose:** Configures Vite's dev server and build behavior.

**Key concepts:**
- `defineConfig()` — A Vite helper that provides TypeScript intellisense for the config object.
- `plugins` — Vite plugins are loaded at startup. `react()` enables JSX compilation and Fast Refresh (instant UI updates without losing component state). `tailwindcss()` compiles Tailwind utility classes.
- `proxy` — The frontend runs on port 5173, but the backend runs on port 5000. Without a proxy, the browser would block API calls due to **CORS** (Cross-Origin Resource Sharing). The proxy intercepts any frontend request starting with `/api` and silently forwards it to the backend, making the browser think both are on the same origin.
- `process.env.DOCKER` — An environment variable set in `docker-compose.yml`. Inside Docker, services communicate using their container names (`http://backend:5000`), not `localhost`.
- `ws: true` — Enables WebSocket proxying for Socket.io connections.
- `usePolling: true` — On Windows with Docker, file system events don't propagate reliably across the container boundary. Polling forces Vite to periodically check files for changes.

---

### `vercel.json` — Frontend Deployment

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Purpose:** When deployed on Vercel, this tells the server to route *all* URL paths to `index.html`, letting React Router handle navigation client-side. Without this, visiting `mooltruefoods.in/shop` directly would return a 404 because no physical `shop.html` file exists on the server.

---

## 3. Frontend — Entry Points

### `src/main.jsx` — React Bootstrap

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Purpose:** The very first JavaScript that executes in the browser. It creates a React root and renders the `<App />` component into the `#root` div.

**Key concepts:**
- `createRoot()` — The React 18+ API for initializing a concurrent-mode React application. Older apps used `ReactDOM.render()`.
- `StrictMode` — A development-only wrapper that intentionally double-renders components to detect unsafe side effects, deprecated APIs, and impure renders. It has zero effect in production.
- `import './index.css'` — Importing a CSS file in a JS file is a Vite feature. Vite injects the CSS into the page automatically.

---

### `src/App.jsx` — Application Shell

This is the "orchestrator" file. It sets up:
1. **Global Providers** (authentication, cart, wishlist state accessible everywhere)
2. **Route definitions** (which URL shows which page)
3. **Route guards** (protecting admin and checkout pages)
4. **Page transition animations**

```javascript
function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<AnimatedRoutes />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                  <ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="support" element={<AdminSupport />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}
```

**Key concepts:**

- **Provider Pattern** — `<AuthProvider>`, `<CartProvider>`, `<WishlistProvider>` are React Context providers. They wrap the entire app so any child component can access shared state (e.g., the current user, cart items) via custom hooks (`useAuth()`, `useCart()`, `useWishlist()`) without passing props manually through every level of the component tree. This solves the "prop drilling" problem.

- **`import.meta.env.VITE_GOOGLE_CLIENT_ID`** — Vite exposes environment variables prefixed with `VITE_` to the frontend code. `import.meta.env` is the Vite-specific way to access them (like `process.env` in Node.js, but for the browser).

- **`BrowserRouter`** — Uses the HTML5 History API (`pushState`/`replaceState`) to keep the URL in sync with the UI without full page reloads. Alternatives include `HashRouter` (uses `#` fragments) and `MemoryRouter` (no URL changes).

- **Route Guards:**

```javascript
function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem('admin_token')
  return token ? children : <Navigate to="/admin/login" replace />
}
```

This is a **Higher-Order Component (HOC)** pattern. It wraps admin pages and checks if a JWT token exists in `localStorage`. If not, it redirects to the login page. The `replace` prop on `<Navigate>` means the redirect replaces the current browser history entry, so pressing "Back" won't loop back to the blocked page.

- **Nested Routes:**

```javascript
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="products" element={<AdminProducts />} />
</Route>
```

`AdminLayout` is a shared layout (sidebar + header) that wraps all admin sub-pages. It uses React Router's `<Outlet />` component internally to render the matched child route. `index` means "render this when the path is exactly `/admin`."

- **Page Transitions with AnimatePresence:**

```javascript
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
)
```

`framer-motion` animates mount/unmount of React components. `initial` = starting state, `animate` = final state, `exit` = state when removing. `<AnimatePresence>` wraps the routes so that when a route changes, the *exiting* page can play its `exit` animation before being removed from the DOM.

---

## 4. Frontend — Context (Global State Management)

### `src/context/AuthContext.jsx` — Authentication State

**Purpose:** Manages the entire authentication lifecycle — login, signup, Google OAuth, logout, and session persistence across page refreshes.

```javascript
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token') || localStorage.getItem('admin_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const activeToken = localStorage.getItem('token') || localStorage.getItem('admin_token')
      if (!activeToken) { setLoading(false); return }
      try {
        const res = await authAPI.getMe()
        if (res && res.success) { setUser(res.user); setToken(activeToken) }
        else { handleLogout() }
      } catch (e) { handleLogout() }
      finally { setLoading(false) }
    }
    initializeAuth()
  }, [])
  // ...
}
```

**Key concepts:**

- **`useState(() => ...)`** — Lazy initialization. The function inside `useState` only runs on the first render, preventing `localStorage.getItem()` from being called on every re-render. This is a performance optimization.

- **`useEffect(() => { ... }, [])`** — The empty dependency array `[]` means this effect runs only once when the component mounts. It acts like `componentDidMount` in class components. Here it checks if a stored JWT token is still valid by calling the `/api/auth/me` endpoint.

- **`loading` state** — While the app is verifying the token on startup, `loading` is `true`. This prevents the UI from briefly showing a "logged out" state before confirming the user is actually logged in (prevents UI "flicker").

- **Exposed values via Provider:**
```javascript
value={{
  user, token, loading,
  login, signup, googleLogin, logout,
  isAuthenticated: !!user,
  isAdmin: user?.role === 'admin' || user?.role === 'superadmin',
}}
```
The `!!` operator converts any value to a boolean. `!!null` = `false`, `!!{name: "Yash"}` = `true`. The `?.` is optional chaining — if `user` is `null`, `user?.role` returns `undefined` instead of throwing an error.

---

### `src/context/CartContext.jsx` — Shopping Cart State

**Purpose:** Manages cart items, persists them to `localStorage`, and provides helper functions for add/remove/update operations.

```javascript
const [cartItems, setCartItems] = useState(() => {
  try {
    const storedCart = localStorage.getItem('mooltrue_cart')
    return storedCart ? JSON.parse(storedCart) : []
  } catch (error) { return [] }
})

useEffect(() => {
  localStorage.setItem('mooltrue_cart', JSON.stringify(cartItems))
}, [cartItems])
```

**Key concepts:**

- **`localStorage` persistence** — The cart survives page refreshes and browser restarts. On mount, it reads from `localStorage`. On every change (the `useEffect` with `[cartItems]` dependency), it writes back.

- **Immutable state updates:**
```javascript
const addToCart = (product, quantity = 1) => {
  setCartItems(prevItems => {
    const existingItem = prevItems.find(item => item.id === product.id)
    if (existingItem) {
      return prevItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    }
    return [...prevItems, { ...product, quantity }]
  })
}
```
React requires state to be updated immutably (you must create a new array/object, not mutate the existing one). The **spread operator** (`...item`) creates a shallow copy of the object with the modified property. `prevItems.map()` returns a new array, and `[...prevItems, newItem]` appends an item to a new copy of the array.

- **Derived state (computed values):**
```javascript
const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
```
These are not stored in state — they are computed on every render from `cartItems`. `reduce()` iterates over the array and accumulates a single value. The `0` is the initial value of the accumulator `acc`.

---

### `src/context/WishlistContext.jsx` — Wishlist State

**Purpose:** Stores an array of product IDs (not full product objects) and persists them to `localStorage`.

**Key concept — storing IDs vs full objects:** The wishlist only stores `[1, 5, 7]` (product IDs), not full product objects. This is more efficient and avoids stale data. When displaying the Wishlist page, the app fetches fresh product data from the API and filters by the stored IDs.

---

## 5. Frontend — API Client Layer

### `src/api/client.js` — Centralized HTTP Client

```javascript
let BASE_URL = import.meta.env.VITE_API_URL || ''

const getToken = () => localStorage.getItem('admin_token')

const buildHeaders = (auth = false, isFormData = false) => {
  const headers = {}
  if (!isFormData) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

const request = async (method, endpoint, body = null, auth = false) => {
  const isFormData = body instanceof FormData
  const config = { method, headers: buildHeaders(auth, isFormData) }
  if (body) config.body = isFormData ? body : JSON.stringify(body)
  const response = await fetch(`${BASE_URL}${endpoint}`, config)
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || `HTTP ${response.status} error`)
  return data
}
```

**Purpose:** Provides a single `request()` function that all API calls go through. This centralizes error handling, authentication headers, and base URL resolution.

**Key concepts:**

- **`Bearer ${token}`** — The standard format for JWT-based authentication. The word "Bearer" is a convention defined in the OAuth 2.0 spec meaning "the holder of this token is authorized."

- **`FormData` detection** — When uploading files (like product images), the body is a `FormData` object. In that case, we must NOT set `Content-Type` manually because the browser automatically sets it to `multipart/form-data` with the correct boundary string. Setting it manually would break the upload.

- **Organized API exports:**
```javascript
export const productsAPI = {
  getAll: (params = {}) => { ... },
  getOne: (id) => request('GET', `/api/products/${id}`),
  create: (formData) => request('POST', '/api/products', formData, true),
  update: (id, formData) => request('PUT', `/api/products/${id}`, formData, true),
  delete: (id) => request('DELETE', `/api/products/${id}`, null, true),
}
```
This is the **Service Layer pattern**. Instead of scattering `fetch()` calls across components, all API calls are defined in one file. Components simply call `productsAPI.getAll()`. The `true` flag enables authentication.

---

## 6. Frontend — Reusable Components

### `Navbar.jsx` — Navigation Bar

**Purpose:** The global navigation bar with logo, links, search bar with auto-suggestions, cart icon with badge, wishlist icon, and user profile dropdown.

**Key concepts:**
- **`useRef`** — Used for the search container reference. `useRef` creates a persistent reference to a DOM element that survives re-renders. Combined with a `mousedown` event listener, it detects clicks outside the search dropdown to close it.
- **`useNavigate()`** — A React Router hook that returns a function for programmatic navigation (e.g., `navigate('/shop?search=ghee')` after a search submission).
- **Conditional rendering** — `{cartCount > 0 && <span className="badge">{cartCount}</span>}` only renders the badge when the cart is not empty. This uses JavaScript's short-circuit evaluation.

### `Hero.jsx` — Landing Page Hero Section

**Purpose:** The large banner section on the home page with animated floating glass-morphic cards, statistics, and a CTA button.

**Key concepts:**
- **Staggered animations** — Each floating card has an increasing `delay` value (`0.8s`, `1.0s`, `1.2s`) so they appear one after another, creating a cascading reveal effect.
- **Glass-morphism** — CSS effect using `backdrop-filter: blur()` and semi-transparent backgrounds to create frosted glass-like cards.

### `ProductCard.jsx` — Product Display Card

**Purpose:** Reusable card component displaying a single product with image, name, price, rating, wishlist heart, and add-to-cart functionality.

**Key concepts:**
- **`e.stopPropagation()`** — The entire card is clickable (navigates to product details). But buttons inside it (Add to Cart, Wishlist) should NOT trigger the card click. `stopPropagation()` prevents the click event from "bubbling up" to the parent card.
- **`onError` image fallback** — `onError={(e) => { e.target.src = 'fallback-url' }}` — If a product image fails to load (404, broken CDN), this replaces it with a default image instead of showing a broken image icon.

### `CartDrawer.jsx` — Sliding Cart Panel

**Purpose:** A side panel that slides in from the right, showing all cart items with quantity controls and a checkout button.

**Key concepts:**
- **Spring physics animations** — `transition={{ type: 'spring', damping: 25, stiffness: 200 }}` — Instead of linear easing, the drawer uses physics-based spring motion for a natural, bouncy feel. `damping` controls how quickly the spring settles; `stiffness` controls the spring force.
- **Body scroll lock** — `document.body.style.overflow = 'hidden'` prevents the background page from scrolling while the drawer is open.
- **Free shipping progress bar** — Calculates `(cartTotal / 1000) * 100` to animate the progress toward free shipping (₹1000 threshold).

### `ChatWidget.jsx` — Live Chat Widget

**Purpose:** A floating chat button in the bottom-right corner that opens a full chat interface. Supports bot conversations, human escalation to admin, chat history, and message persistence.

**Key concepts:**
- **`socket.io-client`** — Establishes a persistent WebSocket connection with the backend. Unlike HTTP (request-response), WebSockets enable real-time, bidirectional communication (the server can push messages to the client without the client asking).
- **Session tokens** — A unique random token (`sess_abc123_1234567890`) stored in `localStorage` identifies each chat session. This allows message history to persist even after page refreshes.
- **`useRef` for socket and session** — Refs are used to hold the socket instance and current session because event handlers (like `s.on('message_received', ...)`) capture the variable values from when they were created (closure). Without refs, handlers would see stale state values.
- **`ReactMarkdown`** — Renders bot messages as Markdown (bold text, lists, code blocks) instead of plain text.
- **`chatKey` state** — Incrementing this value forces React to destroy and recreate the socket connection (because the `useEffect` depends on it). This is used when the user starts a new chat session.

---

## 7. Frontend — Pages

### `Home.jsx` — Landing Page

**Purpose:** The main marketing page with Hero section, product categories, featured products grid, customer testimonials, quality reasons, and a CTA section.

**Key concept — API with static fallback:**
```javascript
const [productsList, setProductsList] = useState(products) // starts with static data

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await productsAPI.getAll()
      if (res && res.data && res.data.length > 0) setProductsList(res.data)
    } catch (e) { /* Keep using static fallback */ }
  }
  fetchProducts()
}, [])
```
The page initially renders with hardcoded products from `src/data/products.js`, then replaces them with real database data once the API responds. This provides instant content while the API loads, improving perceived performance.

### `Shop.jsx` — Product Catalog

**Purpose:** Full product listing with filtering by category, search, price range slider, and sorting.

**Key concepts:**

- **`useMemo`** — Memoizes expensive computations. The filtering and sorting logic only re-runs when its dependencies (`productsList`, `searchQuery`, `selectedCategory`, `maxPrice`, `sortBy`) change, not on every render.

- **Search relevance ranking:**
```javascript
result.sort((a, b) => {
  const aExact = aName === query ? 1 : 0    // Exact match → highest priority
  const aStartsWith = aName.startsWith(query) ? 1 : 0  // Starts with → second
  const aNameMatch = aName.includes(query) ? 1 : 0     // Contains → third
  // ...
})
```
Products are sorted by relevance: exact name matches first, then names starting with the query, then names containing the query, then falls back to the selected sort method.

- **`useSearchParams`** — A React Router hook for reading URL query parameters. When a user searches from the Navbar or Home page, it navigates to `/shop?search=ghee`. This hook reads that `search` parameter and pre-fills the search field.

### `Login.jsx` — Authentication Page

**Purpose:** Combined Sign In / Sign Up page with email+password credentials and Google OAuth.

**Key concepts:**
- **Tab-based form** — `activeTab` state switches between `'signin'` and `'signup'` without navigating to a different URL. The form fields adjust dynamically (signup shows a Name field, signin doesn't).
- **Redirect after login** — `const redirect = searchParams.get('redirect') || '/'` — If the user was redirected to login from the checkout page (via `?redirect=checkout`), they are sent back to checkout after successful login.
- **`<GoogleLogin>`** — A pre-built React component from `@react-oauth/google` that renders Google's branded Sign-In button and handles the OAuth flow.

### `Checkout.jsx` — Order Placement

**Purpose:** Multi-step checkout with delivery form, payment method selection (COD/UPI/Card), coupon system, order summary, and animated success screen.

**Key concepts:**
- **Checkout stages** — `checkoutStage` cycles through `'idle'` → `'processing'` → `'success'`. Each stage renders a completely different UI using `AnimatePresence`.
- **Coupon system** — Simple client-side validation: `WELCOME20` and `MOOLTRUE20` give 20% off. In production, this would be validated server-side.
- **Derived pricing (computed on render, not stored in state):**
```javascript
const discountAmount = Math.round((cartTotal * discountPercent) / 100)
const deliveryFee = cartTotal >= 1000 ? 0 : 60
const gstTax = Math.round(afterDiscountTotal * 0.05)
const grandTotal = afterDiscountTotal + deliveryFee + gstTax
```

---

## 8. Backend — Server Entry & Configuration

### `server/package.json`

```json
{
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "build": "prisma generate && prisma db push",
    "db:seed": "node src/seed.js"
  }
}
```

**Key concepts:**
- `nodemon` — A development tool that watches files and automatically restarts the server when changes are detected.
- `prisma generate` — Reads `schema.prisma` and generates the Prisma Client (a type-safe query builder) into `node_modules/@prisma/client`.
- `prisma db push` — Syncs the Prisma schema to the actual database (creates/alters tables without migration files).

### `server/src/index.js` — Express Server

```javascript
import 'dotenv/config'
import { createServer } from 'http'
import express from 'express'
import cors from 'cors'
```

**Key concepts:**

- **`import 'dotenv/config'`** — A side-effect import. It doesn't export anything — it just runs, loading variables from `.env` into `process.env`. Must be the first import so all subsequent code can access env vars.

- **`createServer(app)`** — Wraps the Express app in a raw Node.js HTTP server. This is required because Socket.io needs to attach to the HTTP server directly (not the Express instance).

- **CORS Configuration:**
```javascript
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('CORS blocked'))
    }
  },
  credentials: true,
}))
```
`origin` is a function that receives the requesting domain. `!origin` allows requests with no origin header (like Postman, mobile apps, or server-to-server). `credentials: true` allows cookies and auth headers to be sent cross-origin.

- **`express.json({ limit: '10mb' })`** — Middleware that parses incoming JSON request bodies. The default limit is 100KB; we increase it to 10MB to support base64-encoded images.

- **Global Error Handler:**
```javascript
app.use((err, req, res, next) => { ... })
```
Express recognizes this as an error handler because it has **4 parameters** (not 3). Any `throw` or `next(err)` call in any route jumps to this handler. It catches Multer file size errors (`LIMIT_FILE_SIZE`) and image type errors specifically.

---

### `server/src/db.js` — Prisma Client Singleton

```javascript
const globalForPrisma = global
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
})
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
export default prisma
```

**Purpose:** Creates a single shared Prisma database connection.

**Key concepts:**
- **Singleton pattern** — In development, `nodemon` restarts the server on every file change. Each restart would normally create a NEW database connection, eventually exhausting the connection pool. By storing the instance on `global` (Node.js's global object), we reuse the same connection across restarts.
- **`??` (Nullish coalescing operator)** — Returns the right side if the left side is `null` or `undefined`. Different from `||` which also triggers for `0`, `''`, and `false`.

---

## 9. Backend — Database (Prisma ORM)

### `server/prisma/schema.prisma` — Database Schema

This file defines the entire database structure. Prisma reads it and generates both the database tables AND a type-safe JavaScript client.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

- `generator client` — Tells Prisma to generate a JavaScript/TypeScript client library. When you run `npx prisma generate`, it creates the `@prisma/client` package in `node_modules`.
- `datasource db` — Specifies PostgreSQL as the database provider and reads the connection URL from the `DATABASE_URL` environment variable.

#### User Model

```prisma
model User {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  name         String
  passwordHash String?
  picture      String?
  role         String   @default("customer")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  orders       Order[]
}
```

**Key Prisma keywords:**
- `@id` — Marks this field as the primary key (unique identifier for each row).
- `@default(autoincrement())` — The database automatically assigns incrementing integer IDs (1, 2, 3...).
- `@unique` — Creates a database-level unique constraint. Two users cannot have the same email.
- `String?` — The `?` makes the field **optional** (nullable). `passwordHash` is null for Google OAuth users who don't have a password.
- `@default("customer")` — If no value is provided when creating a user, it defaults to "customer".
- `@default(now())` — Automatically sets to the current timestamp when a row is created.
- `@updatedAt` — Prisma automatically updates this timestamp whenever the row is modified.
- `Order[]` — A **relation field**. One User can have many Orders (one-to-many relationship). This doesn't create a database column — it's a virtual field that Prisma uses for `include` queries.

#### Product Model

```prisma
model Product {
  id           Int         @id @default(autoincrement())
  description  String      @db.Text
  nutrition    Json?
  orderItems   OrderItem[]
  @@map("products")
}
```

- `@db.Text` — Maps to PostgreSQL's `TEXT` type instead of the default `VARCHAR(191)`. This allows unlimited-length text for product descriptions.
- `Json?` — Stores the nutrition object `{ calories, protein, carbs, fat, fiber }` as a JSON column. PostgreSQL natively supports JSON data types.
- `@@map("products")` — By default, Prisma uses the model name (`Product`) as the table name. `@@map` overrides it to use a custom table name (`products`, lowercase plural).

#### Order & OrderItem Models (Junction Table)

```prisma
model OrderItem {
  orderId   Int
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId Int
  product   Product @relation(fields: [productId], references: [id], onDelete: Restrict)
}
```

**Key concepts:**
- **Junction table** — `OrderItem` connects Orders and Products in a many-to-many relationship. One order can have many products, and one product can appear in many orders.
- `@relation(fields: [orderId], references: [id])` — Defines a foreign key. `orderId` in this table references `id` in the Order table.
- `onDelete: Cascade` — If an Order is deleted, all its OrderItems are automatically deleted too.
- `onDelete: Restrict` — Prevents deleting a Product if any OrderItems reference it. This protects order history integrity.
- `onDelete: SetNull` — (used on Order→User relation) If a User is deleted, their orders remain but `userId` becomes `null`.

#### ChatSession & ChatMessage Models

```prisma
model ChatSession {
  id            Int           @id @default(autoincrement())
  sessionToken  String        @unique
  status        String        @default("bot") // "bot" | "human" | "closed"
  messages      ChatMessage[]
}
```

The chat system stores all conversations in the database. `status` tracks whether the conversation is being handled by the AI bot, has been escalated to a human admin, or has been closed.

---

## 10. Backend — Routes

Routes define *which URL* maps to *which controller function*. They follow RESTful conventions.

### `server/src/routes/authRoutes.js`

```javascript
router.post('/google', googleLogin)        // POST /api/auth/google
router.post('/signup', signup)             // POST /api/auth/signup
router.post('/login', login)               // POST /api/auth/login
router.get('/me', protect, getMe)          // GET  /api/auth/me (requires JWT)
```

### `server/src/routes/productRoutes.js`

```javascript
// Public (anyone can access)
router.get('/', getProducts)               // GET  /api/products
router.get('/:id', getProduct)             // GET  /api/products/5

// Admin only (requires JWT + admin role)
router.post('/', protect, adminOnly, upload.single('image'), createProduct)
router.put('/:id', protect, adminOnly, upload.single('image'), updateProduct)
router.delete('/:id', protect, adminOnly, deleteProduct)
```

**Key concepts:**
- **Middleware chaining** — `protect, adminOnly, upload.single('image'), createProduct` — Express executes these functions left-to-right. Each calls `next()` to pass control to the next one. If any middleware calls `res.status(401).json(...)` instead of `next()`, the chain stops.
- **`/:id`** — A URL parameter. In `/api/products/5`, `req.params.id` equals `"5"`.
- **`upload.single('image')`** — Multer middleware that extracts a single file from the `image` form field and attaches it to `req.file`.
- **HTTP methods:**
  - `GET` = Read data (safe, no side effects)
  - `POST` = Create new resource
  - `PUT` = Replace/update entire resource
  - `PATCH` = Partially update resource
  - `DELETE` = Remove resource

---

## 11. Backend — Controllers (Business Logic)

### `authController.js` — Authentication Logic

#### Google Login with `upsert`

```javascript
const user = await prisma.user.upsert({
  where: { email: email.toLowerCase() },
  update: { name, picture, role },
  create: { email: email.toLowerCase(), name, picture, role },
})
```

**`upsert` explained:** This is one of the most important Prisma operations. It combines "UPDATE" and "INSERT" into a single atomic operation:
1. First, it looks for a user with the given email (`where`).
2. If found → it updates that user's name, picture, and role (`update`).
3. If NOT found → it creates a new user with those fields (`create`).

This is perfect for OAuth login because a user might be logging in for the first time (needs `create`) or returning (needs `update` to refresh their profile picture, etc.). Without `upsert`, you'd need to write two separate queries with a conditional check.

**Other important Prisma query methods used in this project:**

| Method | Purpose | Example |
|--------|---------|---------|
| `findUnique` | Find one record by a unique field | `prisma.user.findUnique({ where: { email } })` |
| `findMany` | Find multiple records with filtering, sorting, pagination | `prisma.order.findMany({ where: { status: 'pending' }, orderBy: { createdAt: 'desc' }, take: 20, skip: 0 })` |
| `create` | Insert a new row | `prisma.product.create({ data: { name, price } })` |
| `update` | Modify an existing row | `prisma.order.update({ where: { id }, data: { status: 'shipped' } })` |
| `upsert` | Create if not exists, update if exists | See above |
| `delete` | Remove a row | `prisma.product.delete({ where: { id } })` |
| `deleteMany` | Remove multiple rows | `prisma.orderItem.deleteMany()` |
| `count` | Count matching rows | `prisma.order.count({ where: { status: 'pending' } })` |
| `aggregate` | Compute sum, average, min, max | `prisma.order.aggregate({ _sum: { grandTotal: true } })` |

**Other Prisma query modifiers:**

| Modifier | Purpose | Example |
|----------|---------|---------|
| `include` | Eager-load related data (SQL JOIN) | `include: { orderItems: { include: { product: true } } }` |
| `select` | Pick specific fields (reduces data transfer) | `select: { id: true, name: true }` |
| `orderBy` | Sort results | `orderBy: { createdAt: 'desc' }` |
| `take` | Limit number of results (pagination) | `take: 20` |
| `skip` | Skip results (pagination offset) | `skip: 40` (skip first 40, get next 20) |
| `where` | Filter conditions | `where: { price: { lte: 500 }, category: 'Spices' }` |

#### JWT Token Generation

```javascript
const token = jwt.sign(
  { userId: user.id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
)
```

**JWT explained:** JSON Web Tokens are a stateless authentication mechanism. The server creates a signed token containing the user's ID and role, then sends it to the client. On future requests, the client sends this token back in the `Authorization` header. The server verifies the signature without needing to query the database for session data.

#### Password Hashing with bcrypt

```javascript
const salt = await bcrypt.genSalt(10)
const passwordHash = await bcrypt.hash(password, salt)
// Later, for login:
const isMatch = await bcrypt.compare(password, user.passwordHash)
```

**`bcrypt` explained:** Passwords are never stored in plain text. `bcrypt.hash()` transforms the password into an irreversible hash using a random salt (to prevent rainbow table attacks). The number `10` is the "cost factor" — it controls how many hashing rounds occur (higher = slower but more secure). `bcrypt.compare()` checks if a plain text password matches a stored hash.

---

### `productController.js` — Product CRUD

**Key patterns:**
- **Nullish coalescing for partial updates:** `name: name ?? existing.name` — If the request body doesn't include `name` (it's `undefined`), keep the existing value. The `??` operator only triggers on `null`/`undefined`, not on empty strings or `0`.
- **Prisma error codes:** `error.code === 'P2003'` — Prisma throws specific error codes. `P2003` means "foreign key constraint failed" — this happens when trying to delete a product that has associated order items.

---

### `orderController.js` — Order Management

**Key patterns:**

- **Nested `create` for related records:**
```javascript
const order = await prisma.order.create({
  data: {
    orderNumber, customerName, ...,
    orderItems: {
      create: items.map(item => ({
        productId: parseInt(item.productId),
        quantity: parseInt(item.quantity),
        price: parseFloat(item.price),
      })),
    },
  },
  include: { orderItems: { include: { product: true } } },
})
```
Prisma can create an order AND its order items in a single atomic transaction. The `orderItems: { create: [...] }` syntax creates related records automatically.

- **`Promise.all` for parallel queries:**
```javascript
const [totalOrders, totalRevenue, pendingOrders, ...] = await Promise.all([
  prisma.order.count(),
  prisma.order.aggregate({ _sum: { grandTotal: true } }),
  prisma.order.count({ where: { orderStatus: 'pending' } }),
])
```
Instead of awaiting 5 queries sequentially (slow), `Promise.all` runs them all simultaneously and waits for all to complete. This is significantly faster for dashboard statistics.

- **Conditional spread for partial updates:**
```javascript
data: {
  ...(orderStatus && { orderStatus }),
  ...(paymentStatus && { paymentStatus }),
}
```
This only includes `orderStatus` in the update data if it was provided in the request. `{ orderStatus }` is shorthand for `{ orderStatus: orderStatus }` (ES6 property shorthand).

---

### `paymentController.js` — Razorpay Integration

**Key concepts:**

- **Lazy initialization (Singleton):**
```javascript
let razorpay = null
const getRazorpay = () => {
  if (razorpay) return razorpay
  razorpay = new Razorpay({ key_id: ..., key_secret: ... })
  return razorpay
}
```
The Razorpay client is created only when first needed, not at import time. This avoids crashes if the API keys aren't configured.

- **Paise conversion:** `amount: Math.round(amount * 100)` — Razorpay's API works in paise (1 INR = 100 paise), similar to how Stripe uses cents.

- **HMAC signature verification:**
```javascript
const body = razorpay_order_id + '|' + razorpay_payment_id
const expectedSignature = crypto
  .createHmac('sha256', keySecret)
  .update(body)
  .digest('hex')

if (expectedSignature !== razorpay_signature) {
  return res.status(400).json({ error: 'Invalid signature.' })
}
```
After payment, Razorpay sends a signature. We recreate the same signature using our secret key and the HMAC-SHA256 algorithm. If they match, the payment is genuine (not tampered with). This is a standard cryptographic verification pattern used by all payment gateways.

---

## 12. Backend — Middleware

### `authMiddleware.js` — JWT Authentication Guard

```javascript
export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided.' })
  }
  const token = authHeader.split(' ')[1]
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
  req.user = user
  next()
}

export const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
    next()
  } else {
    res.status(403).json({ error: 'Admin access required.' })
  }
}
```

**Key concepts:**
- **Middleware** — A function that sits between the request and the response. It can modify the request object, end the response, or call `next()` to pass control to the next middleware/handler.
- **`req.user = user`** — Attaches the authenticated user to the request object so downstream controllers can access it.
- **401 vs 403** — `401 Unauthorized` means "you haven't proven who you are." `403 Forbidden` means "I know who you are, but you don't have permission."

### `uploadMiddleware.js` — Cloudinary Image Upload

```javascript
const storage = multer.memoryStorage()

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (allowedTypes.includes(file.mimetype)) cb(null, true)
    else cb(new Error('Only JPEG, PNG, and WebP images are allowed'), false)
  },
})
```

**Key concepts:**
- **`multer.memoryStorage()`** — Instead of saving uploaded files to disk, stores them in memory (as a `Buffer`). This is ideal when you immediately upload to a cloud service like Cloudinary.
- **`fileFilter`** — Validates the file MIME type before accepting it. Rejects non-image files.
- **Cloudinary upload with transformations:**
```javascript
export const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'mooltruefoods/products',
        transformation: [
          { width: 800, height: 800, crop: 'fill', gravity: 'auto' },
          { quality: 'auto', fetch_format: 'auto' },
        ],
      },
      (error, result) => { if (error) reject(error); else resolve(result) }
    )
    // Convert buffer to readable stream and pipe to Cloudinary
    const readable = new Readable()
    readable.push(buffer)
    readable.push(null)
    readable.pipe(stream)
  })
}
```
Cloudinary automatically resizes images to 800×800, intelligently crops them (`gravity: 'auto'` detects the subject), optimizes quality, and converts to the best format (WebP for supported browsers).

---

## 13. Backend — Real-Time Chat (Socket.io + AI)

### `server/src/socket.js` — The Chat Engine

This is the most complex file in the project. It powers:
1. An **AI chatbot** (via Groq LLM API) with semantic guardrails
2. **Live human escalation** to admin
3. **Real-time message broadcasting** via WebSocket rooms
4. **Order tracking** via NLP pattern matching

#### Semantic Guardrails (Pre-LLM Filtering)

```javascript
import { pipeline } from '@xenova/transformers'

const ANCHORS = [
  "I want to buy organic food...",
  "What is the price of this product?",
  "When will my order be delivered?",
  // ...
]

// On startup: generate embeddings for anchor sentences
extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
for (const text of ANCHORS) {
  const output = await extractor(text, { pooling: 'mean', normalize: true })
  anchorEmbeddings.push(Array.from(output.data))
}
```

**Concept explained:** Before sending a user's message to the expensive LLM API, the system checks if the message is even *related* to MoolTrue Foods:

1. **Anchor sentences** define the "semantic space" of valid topics (buying food, checking prices, delivery, support).
2. The user's message is converted to a **vector embedding** (a list of 384 numbers representing the meaning of the text).
3. **Cosine similarity** measures how close the user's message is to each anchor.
4. If the maximum similarity is below 0.25, the message is off-topic (e.g., "write me Python code") and is rejected without calling the LLM, saving API costs.

```javascript
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0
  for (let i = 0; i < vecA.length; i++) dotProduct += vecA[i] * vecB[i]
  return dotProduct  // vectors are already normalized
}
```

#### Socket.io Architecture

```javascript
io.on('connection', (socket) => {
  // Customer joins a chat session
  socket.on('join_session', async ({ sessionToken }) => {
    let session = await prisma.chatSession.findUnique({ where: { sessionToken } })
    if (!session) {
      session = await prisma.chatSession.create({ ... }) // New session with welcome message
    }
    socket.join(`session_${session.id}`) // Join a Socket.io "room"
    socket.emit('session_ready', session) // Send session data back to client
  })

  // Customer sends a message
  socket.on('send_message', async ({ sessionToken, text }) => {
    if (session.status === 'bot') {
      const reply = await processLocalNLP(text, session.id)
      if (reply === 'handoff') {
        // Escalate to human admin
        await prisma.chatSession.update({ data: { status: 'human' } })
        io.emit('new_escalation', session) // Alert all connected admins
      } else {
        // Send bot reply
        io.to(`session_${session.id}`).emit('message_received', botMsg)
      }
    }
  })

  // Admin joins a session, sends messages, closes sessions
  socket.on('admin_join_session', ...)
  socket.on('admin_send_message', ...)
  socket.on('admin_close_session', ...)
})
```

**Key concepts:**
- **Socket.io rooms** — `socket.join('session_5')` adds the client to a named group. `io.to('session_5').emit(...)` sends a message to everyone in that room (the customer AND any admin watching that session). This is how real-time message broadcasting works.
- **`socket.emit()` vs `io.emit()` vs `io.to().emit()`:**
  - `socket.emit()` — sends to the specific connected client only
  - `io.emit()` — broadcasts to ALL connected clients
  - `io.to('room').emit()` — broadcasts to everyone in a specific room

---

## 14. Backend — Database Seeding

### `server/src/seed.js`

```javascript
async function main() {
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()

  for (const product of products) {
    await prisma.product.create({ data: product })
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
```

**Purpose:** Populates the database with initial product data. Deletes existing data first (safe for development only).

**Key concepts:**
- **Deletion order matters** — `orderItem` must be deleted before `order`, and `order` before `product`, because of foreign key constraints. You can't delete a product if order items reference it.
- **`prisma.$disconnect()`** — Properly closes the database connection pool when the script finishes. Without this, the Node.js process might hang.
- **`.finally()`** — Runs regardless of whether the promise resolved or rejected (guaranteed cleanup).

---

## 15. DevOps — Docker & Deployment

### `docker-compose.yml` — Multi-Service Orchestration

```yaml
services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: mtf_user
      POSTGRES_PASSWORD: mtf_secure_password
      POSTGRES_DB: mtf_local_db
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./server
    entrypoint: >
      sh -c "
        sleep 5 &&
        npx prisma db push &&
        node src/seed.js &&
        npm run dev
      "
    depends_on: [db]

  frontend:
    build: .
    environment:
      - DOCKER=true
    depends_on: [backend]

networks:
  mtf-network:
    driver: bridge

volumes:
  postgres_data:
```

**Key concepts:**
- **`services`** — Each service (db, backend, frontend) runs in its own isolated container, like separate virtual machines.
- **`depends_on`** — Ensures containers start in order: db first, then backend, then frontend.
- **`volumes: postgres_data`** — A named volume that persists database data between container restarts. Without this, all data would be lost when you stop Docker.
- **`/app/node_modules`** — An anonymous volume that prevents the host machine's `node_modules` from overwriting the container's. This is critical because native modules compiled for Windows won't work inside a Linux container.
- **`entrypoint`** — Overrides the Dockerfile's CMD. The backend waits 5 seconds for PostgreSQL to initialize, then pushes the schema, seeds data, and starts the server.
- **`mtf-network: bridge`** — A Docker bridge network that allows containers to communicate using service names as hostnames (e.g., `http://backend:5000`, `http://db:5432`).

### Frontend `Dockerfile`

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
```

**Key concepts:**
- `FROM node:20-alpine` — Uses the Alpine Linux variant of Node.js (much smaller image, ~50MB vs ~350MB).
- `COPY package*.json ./` + `RUN npm ci` — Copies dependency files first and installs them. Docker caches this layer, so if your code changes but dependencies don't, `npm ci` is skipped on rebuild.
- `npm ci` — Like `npm install` but faster and stricter. It deletes `node_modules` and installs exactly what's in `package-lock.json` (deterministic).

### Backend `Dockerfile`

```dockerfile
FROM node:20-slim
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
COPY prisma ./prisma/
RUN npx prisma generate
```

Uses `node:20-slim` (Debian-based instead of Alpine) because Prisma's query engine requires `openssl` and works more reliably on Debian. The Prisma client is generated during the build so it's ready when the container starts.

---

## 16. Concept Glossary

| Term | Explanation |
|------|-------------|
| **JSX** | JavaScript XML — a syntax extension that lets you write HTML-like code inside JavaScript. `<div className="box">` gets compiled to `React.createElement('div', { className: 'box' })`. |
| **Component** | A reusable, self-contained piece of UI. Can be a function that returns JSX. |
| **Props** | Short for "properties" — data passed from a parent component to a child component, like HTML attributes. |
| **State** | Data that belongs to a component and can change over time (e.g., `useState()`). When state changes, the component re-renders. |
| **Hook** | Functions starting with `use` (e.g., `useState`, `useEffect`, `useContext`) that let function components access React features. |
| **Context** | A way to pass data through the component tree without passing props manually at every level. |
| **Middleware** | A function that processes requests before they reach the route handler. Used for auth, logging, parsing, etc. |
| **ORM** | Object-Relational Mapping — a tool (Prisma) that lets you query databases using JavaScript objects instead of raw SQL. |
| **JWT** | JSON Web Token — a compact, signed token for stateless authentication. Contains encoded user data + cryptographic signature. |
| **CORS** | Cross-Origin Resource Sharing — a browser security mechanism that blocks requests from one domain to another unless the server explicitly allows it. |
| **WebSocket** | A protocol for full-duplex (two-way) communication over a single TCP connection. Unlike HTTP, the server can push data to the client without the client asking. |
| **REST** | Representational State Transfer — an architectural style where each URL represents a resource, and HTTP methods (GET, POST, PUT, DELETE) represent operations. |
| **HMAC** | Hash-based Message Authentication Code — a way to verify both the integrity and authenticity of data using a secret key. Used in payment verification. |
| **Embedding** | A numerical representation (vector) of text that captures its semantic meaning. Similar texts have similar embeddings. |
| **Cosine Similarity** | A measure of similarity between two vectors (0 = completely different, 1 = identical meaning). |
| **Upsert** | A database operation that creates a record if it doesn't exist, or updates it if it does. Combines INSERT and UPDATE. |
| **Migration** | A version-controlled database schema change. `prisma db push` syncs schema without migration files; `prisma migrate` creates migration files for production. |
| **HMR** | Hot Module Replacement — Vite's ability to update specific modules in the browser without a full page reload, preserving component state. |
| **SSR vs CSR** | Server-Side Rendering vs Client-Side Rendering. This app uses CSR — the server sends an empty HTML shell, and React builds the UI in the browser. |
| **Singleton** | A design pattern ensuring only one instance of a class/object exists. Used for the Prisma client and Razorpay client. |
