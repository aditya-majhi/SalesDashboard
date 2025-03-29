import { useState } from "react";

// Components
import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import DraggableDashboardItem from "@/components/dashboard/DragableDashboardItem";
import TimePeriodSelector from "@/components/dashboard/TimePeriodSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Download, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Hooks and Utils
import useProductData from "@/hooks/useProductData";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";

const ProductDashboard = () => {
  const { data, filters, setFilters } = useProductData();

  // DND setup
  const [items, setItems] = useState([
    "stats",
    "sales",
    "categories",
    "inventory",
    "topProducts",
    "underperforming",
    "performance",
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over.id.toString());

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Filter options
  const categoryOptions = [
    { value: "All Categories", label: "All Categories" },
    { value: "Electronics", label: "Electronics" },
    { value: "Clothing", label: "Clothing" },
    { value: "Home & Kitchen", label: "Home & Kitchen" },
    { value: "Sports", label: "Sports" },
    { value: "Beauty", label: "Beauty" },
  ];

  const priceOptions = [
    { value: "All Prices", label: "All Prices" },
    { value: "$0-$50", label: "$0-$50" },
    { value: "$51-$100", label: "$51-$100" },
    { value: "$101-$200", label: "$101-$200" },
    { value: "$201+", label: "$201+" },
  ];

  const sortOptions = [
    { value: "Revenue", label: "Revenue" },
    { value: "Units Sold", label: "Units Sold" },
    { value: "Profit Margin", label: "Profit Margin" },
    { value: "Stock Level", label: "Stock Level" },
  ];

  // Filter change handler
  const handleFilterChange = (type: string, value: string) => {
    setFilters(type, value);
  };

  // Badge color based on status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Low Stock":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "Out of Stock":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  // Badge color based on suggestion
  const getSuggestionBadgeColor = (suggestion: string) => {
    switch (suggestion) {
      case "Discount":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Bundle":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "Discontinue":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  // Function to export data as CSV
  const handleExport = (dataType: string) => {
    let headers = "";
    let csvData: string[] = [];
    let filename = "";

    // Create different CSV content based on export type
    if (dataType === "inventory") {
      headers = "Category,Current Stock,Optimal Stock,Status\n";
      csvData = data.inventoryData.data.map((item: any) => {
        const status =
          item.current / item.optimal < 0.25
            ? "Low Stock"
            : item.current / item.optimal < 0.5
            ? "Medium Stock"
            : "Good Stock";
        return `${item.name},${item.current},${item.optimal},${status}`;
      });
      filename = "inventory-status";
    } else if (dataType === "topProducts") {
      headers =
        "ID,Name,Category,Price,Stock,Units Sold,Revenue,Rating,Status\n";
      csvData = data.topProducts.map(
        (product: any) =>
          `${product.id},${product.name},${product.category},${product.price},${product.stock},${product.sales.units},${product.sales.revenue},${product.rating},${product.status}`
      );
      filename = "top-products";
    } else if (dataType === "underperforming") {
      headers =
        "ID,Name,Category,Price,Stock,Units Sold,Revenue,Rating,Suggestion\n";
      csvData = data.underperformingProducts.map(
        (product: any) =>
          `${product.id},${product.name},${product.category},${product.price},${product.stock},${product.sales.units},${product.sales.revenue},${product.rating},${product.suggestion}`
      );
      filename = "underperforming-products";
    }

    const csvContent = headers + csvData.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create download link and trigger click
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${filename}-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Product Performance</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Tracking product sales, inventory, and performance metrics
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <TimePeriodSelector
            selectedPeriod={filters.timePeriod}
            dateRange={data.dateRange}
            onSelectPeriod={(period) =>
              handleFilterChange("timePeriod", period)
            }
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent py-2 px-3"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            {categoryOptions.map((option) => (
              <option
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price Range</label>
          <select
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent py-2 px-3"
            value={filters.priceRange}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          >
            {priceOptions.map((option) => (
              <option
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sort By</label>
          <select
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent py-2 px-3"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          >
            {sortOptions.map((option) => (
              <option
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items}>
          <div className="grid grid-cols-1 gap-6">
            {items.map((item) => {
              if (item === "stats") {
                return (
                  <DraggableDashboardItem
                    key="stats"
                    id="stats"
                    isDraggable={false}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {data.stats.map((stat) => (
                        <StatCard key={stat.id} stat={stat} />
                      ))}
                    </div>
                  </DraggableDashboardItem>
                );
              }

              if (item === "sales") {
                return (
                  <DraggableDashboardItem
                    key="sales"
                    id="sales"
                    isDraggable={false}
                  >
                    <ChartCard
                      type="line"
                      title="Monthly Sales Performance"
                      data={data.monthlySalesData}
                    />
                  </DraggableDashboardItem>
                );
              }

              if (item === "categories") {
                return (
                  <DraggableDashboardItem
                    key="categories"
                    id="categories"
                    isDraggable={false}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <ChartCard
                        type="donut"
                        title="Product Category Distribution"
                        data={data.categoryDistribution}
                      />
                      <ChartCard
                        type="donut"
                        title="Price Point Distribution"
                        data={data.priceDistribution}
                      />
                    </div>
                  </DraggableDashboardItem>
                );
              }

              if (item === "inventory") {
                return (
                  <DraggableDashboardItem
                    key="inventory"
                    id="inventory"
                    isDraggable={false}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Inventory Status</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleExport("inventory")}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Export Data
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              View All Inventory
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {data.inventoryData.data.map((category) => (
                            <div key={category.name}>
                              <div className="flex justify-between items-center mb-2">
                                <div className="font-medium">
                                  {category.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {category.current} / {category.optimal} units
                                </div>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div
                                  className={`h-2.5 rounded-full ${
                                    category.current / category.optimal < 0.25
                                      ? "bg-red-600"
                                      : category.current / category.optimal <
                                        0.5
                                      ? "bg-orange-500"
                                      : "bg-emerald-500"
                                  }`}
                                  style={{
                                    width: `${Math.min(
                                      100,
                                      (category.current / category.optimal) *
                                        100
                                    )}%`,
                                  }}
                                ></div>
                              </div>
                              {category.current / category.optimal < 0.25 && (
                                <div className="flex items-center mt-1 text-red-600 dark:text-red-400 text-xs">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Low stock alert
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </DraggableDashboardItem>
                );
              }

              if (item === "topProducts") {
                return (
                  <DraggableDashboardItem
                    key="topProducts"
                    id="topProducts"
                    isDraggable={false}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Top Selling Products</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleExport("topProducts")}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Export Data
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              View All Products
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-right">
                                  Price
                                </TableHead>
                                <TableHead className="text-right">
                                  Units Sold
                                </TableHead>
                                <TableHead className="text-right">
                                  Revenue
                                </TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {data.topProducts.map((product) => (
                                <TableRow key={product.id}>
                                  <TableCell>
                                    <div>
                                      <div className="font-medium">
                                        {product.name}
                                      </div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {product.id}
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>{product.category}</TableCell>
                                  <TableCell className="text-right">
                                    {formatCurrency(product.price)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {formatNumber(product.sales.units)}
                                  </TableCell>
                                  <TableCell className="text-right font-medium">
                                    {formatCurrency(product.sales.revenue)}
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      className={getStatusBadgeColor(
                                        product.status
                                      )}
                                    >
                                      {product.status}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </DraggableDashboardItem>
                );
              }

              if (item === "underperforming") {
                return (
                  <DraggableDashboardItem
                    key="underperforming"
                    id="underperforming"
                    isDraggable={false}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Underperforming Products</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleExport("underperforming")}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Export Data
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              View All Underperforming
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-right">
                                  Price
                                </TableHead>
                                <TableHead className="text-right">
                                  Stock
                                </TableHead>
                                <TableHead className="text-right">
                                  Revenue
                                </TableHead>
                                <TableHead>Suggested Action</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {data.underperformingProducts.map((product) => (
                                <TableRow key={product.id}>
                                  <TableCell>
                                    <div>
                                      <div className="font-medium">
                                        {product.name}
                                      </div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {product.id}
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>{product.category}</TableCell>
                                  <TableCell className="text-right">
                                    {formatCurrency(product.price)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {formatNumber(product.stock)}
                                  </TableCell>
                                  <TableCell className="text-right font-medium">
                                    {formatCurrency(product.sales.revenue)}
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      className={getSuggestionBadgeColor(
                                        product.suggestion
                                      )}
                                    >
                                      {product.suggestion}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </DraggableDashboardItem>
                );
              }

              return null;
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ProductDashboard;
