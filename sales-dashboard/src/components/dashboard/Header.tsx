import { useState } from "react";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sun,
  Moon,
  Bell,
  Laptop,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  onShowNotification: (message: string, description?: string) => void;
}

const Header = ({ onShowNotification }: HeaderProps) => {
  const { theme, setTheme } = useTheme();

  const [hasNotifications, setHasNotifications] = useState(true);

  const showUserMenu = () => {
    onShowNotification("User menu clicked");
  };

  const showNotifications = () => {
    setHasNotifications(false);
    onShowNotification(
      "You have 3 new notifications",
      "2 messages and 1 alert"
    );
  };

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.h2
            className="text-lg font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            SalesRoom Analytics
          </motion.h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <Search className="h-4 w-4 mr-2" />
              <span className="text-sm">Search</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <span className="text-sm">Filters</span>
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {theme === "dark" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Laptop className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                className="h-9 w-9 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
                onClick={showUserMenu}
              >
                <span className="font-medium text-sm">JD</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
