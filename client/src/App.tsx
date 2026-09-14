/* Quiet Luxury Editorial: the app shell keeps deep ink navigation, warm ivory surfaces, burnt-clay actions, and camera-like motion consistent across every route. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SavedPropertiesProvider } from "./contexts/SavedPropertiesContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useScrollMotion } from "./hooks/useScrollMotion";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { Route, Switch, useLocation } from "wouter";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Property from "./pages/Property";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect } from "react";

function ProtectedDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  useEffect(() => { if (!user) setLocation("/login"); }, [setLocation, user]);
  return user ? <Dashboard /> : null;
}

function Router() {
  const [location] = useLocation();
  useScrollMotion();
  useScrollReveal(location);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div key={location} className="page-transition">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/listings" component={Listings} />
        <Route path="/property" component={Property} />
        <Route path="/dashboard" component={ProtectedDashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <SavedPropertiesProvider>
            <TooltipProvider>
            <Toaster position="top-right" />
            <Router />
            </TooltipProvider>
          </SavedPropertiesProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
