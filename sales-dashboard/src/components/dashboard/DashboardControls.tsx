import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download } from "lucide-react";
import { motion } from "framer-motion";

interface FiltersType {
  timePeriod: string;
  product: string;
  region: string;
  channel: string;
}

interface FilterOption {
  value: string;
  label: string;
}

interface DashboardControlsProps {
  filters: FiltersType;
  onFilterChange: (filterType: string, value: string) => void;
  onExport?: () => void;
}

const productOptions: FilterOption[] = [
  { value: "All Products", label: "All Products" },
  { value: "Electronics", label: "Electronics" },
  { value: "Clothing", label: "Clothing" },
  { value: "Home & Garden", label: "Home & Garden" },
  { value: "Sports & Outdoors", label: "Sports & Outdoors" },
];

const regionOptions: FilterOption[] = [
  { value: "All Regions", label: "All Regions" },
  { value: "North America", label: "North America" },
  { value: "Europe", label: "Europe" },
  { value: "Asia Pacific", label: "Asia Pacific" },
  { value: "Latin America", label: "Latin America" },
];

const channelOptions: FilterOption[] = [
  { value: "All Channels", label: "All Channels" },
  { value: "Direct Sales", label: "Direct Sales" },
  { value: "Online Store", label: "Online Store" },
  { value: "Marketplace", label: "Marketplace" },
  { value: "Retail Partners", label: "Retail Partners" },
];

const DashboardControls = ({
  filters,
  onFilterChange,
  onExport,
}: DashboardControlsProps) => {
  // Default export function if none provided
  const handleExport = () => {
    if (onExport) {
      onExport();
      return;
    }

    // Create CSV content
    const headers = "Date,Revenue,Orders,Customers\n";
    const data = [
      "2023-01-01,12500,142,98",
      "2023-01-02,14200,158,112",
      "2023-01-03,13800,145,103",
      "2023-01-04,15600,172,125",
      "2023-01-05,16200,183,138",
    ].join("\n");

    const csvContent = headers + data;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create download link and trigger click
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `dashboard-report-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        <FilterDropdown
          label="Product"
          options={productOptions}
          selectedValue={filters.product}
          onSelect={(value) => onFilterChange("product", value)}
        />
        <FilterDropdown
          label="Region"
          options={regionOptions}
          selectedValue={filters.region}
          onSelect={(value) => onFilterChange("region", value)}
        />
        <FilterDropdown
          label="Channel"
          options={channelOptions}
          selectedValue={filters.channel}
          onSelect={(value) => onFilterChange("channel", value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            <span>Export</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const FilterDropdown = ({
  options,
  selectedValue,
  onSelect,
}: FilterDropdownProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="px-3 py-2 text-sm">
          <span>{selectedValue}</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0">
        <div className="py-1">
          {options.map((option) => (
            <motion.button
              key={option.value}
              className={`w-full text-left px-4 py-2 text-sm ${
                selectedValue === option.value
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onClick={() => onSelect(option.value)}
              whileHover={{
                backgroundColor:
                  selectedValue === option.value
                    ? undefined
                    : "rgba(0,0,0,0.05)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DashboardControls;
