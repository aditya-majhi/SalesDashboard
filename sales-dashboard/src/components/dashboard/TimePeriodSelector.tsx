import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface TimePeriodSelectorProps {
  selectedPeriod: string;
  dateRange: {
    start: string;
    end: string;
  };
  onSelectPeriod: (period: string) => void;
}

const periodOptions = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "Last 30 Days",
  "This Month",
  "Last Month",
  "Custom Range",
];

const TimePeriodSelector = ({
  selectedPeriod,
  onSelectPeriod,
}: TimePeriodSelectorProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="text-sm h-9 px-5 min-w-[140px] flex justify-between items-center"
              >
                <span>{selectedPeriod}</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0">
              <div className="py-1">
                {periodOptions.map((option) => (
                  <motion.button
                    key={option}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      selectedPeriod === option
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => onSelectPeriod(option)}
                    whileHover={{
                      backgroundColor:
                        selectedPeriod === option
                          ? undefined
                          : "rgba(0,0,0,0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="sm"
              className="h-9 px-5"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
              ) : null}
              <span>Refresh</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TimePeriodSelector;
