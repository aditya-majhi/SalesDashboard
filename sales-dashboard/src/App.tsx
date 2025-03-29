import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import CustomersPage from "@/pages/Customers";
import ProductsPage from "@/pages/Products";
import MarketingPage from "@/pages/Marketing";
import { ThemeProvider, useTheme } from "@/lib/theme";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Icons
import {
  LayoutDashboard,
  Users,
  Package,
  LineChart,
  Sun,
  Moon,
  Bell,
  Search,
  Menu,
  Download,
  LucideIcon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "./components/dashboard/Footer";

// Navigation items
type NavItem = {
  title: string;
  path: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    title: "Products",
    path: "/products",
    icon: Package,
  },
  {
    title: "Marketing",
    path: "/marketing",
    icon: LineChart,
  },
];

function Navigation() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const showNotifications = () => {
    setHasNotifications(false);
  };

  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <motion.h2
              className="text-lg font-bold text-gray-900 dark:text-white mr-8"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              SalesRoom
            </motion.h2>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center px-1 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <Search className="h-4 w-4 mr-2" />
                <span className="text-sm">Search</span>
              </Button>
            </div>

            {/* Theme Toggle */}
            <div className="relative">
              <div
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                {theme === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={showNotifications}
              >
                <Bell className="h-5 w-5" />
                <AnimatePresence>
                  {hasNotifications && (
                    <motion.span
                      className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    />
                  )}
                </AnimatePresence>
              </Button>
            </div>

            {/* User Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button className="h-9 w-9 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600">
                <span className="font-medium text-sm">AM</span>
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <div className="md:hidden">
                  <Menu className="h-10 w-10 p-2 cursor-pointer rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" />
                </div>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[80%] max-w-sm bg-background"
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location === item.path;

                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                            isActive
                              ? "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          <Icon className="h-5 w-5 mr-3" />
                          {item.title}
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="mt-6 space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Search className="h-4 w-4 mr-2" />
                      <span>Search</span>
                    </Button>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-blue-500 text-white flex items-center justify-center">
                        <span className="font-medium text-sm">JD</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          john.doe@example.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/customers" component={CustomersPage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/marketing" component={MarketingPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
