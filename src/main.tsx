import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from "@tanstack/react-router";
import "@/index.css";
import App from "@/App.tsx";
import LenisProvider from "./lib/Lenis";
import AuthPage from "@/Components/Auth/AuthPage";
import PSSelectionPage from "@/Components/Auth/PSSelectionPage";
import { AuthProvider } from "@/lib/auth";

// Create a root route
const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  ),
})

// Create the index route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <LenisProvider>
      <App />
    </LenisProvider>
  ),
})

// Create the auth route
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthPage,
})

// Create the PS Selection route
const psSelectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ps_selection',
  component: PSSelectionPage,
})

// Create the route tree
// const routeTree = rootRoute.addChildren([indexRoute, authRoute, psSelectionRoute])
const routeTree = rootRoute.addChildren([indexRoute])

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// force page to start at top on every load/reload
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);