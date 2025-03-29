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
import { Star, StarHalf } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

// Hooks and Utils
import useCustomerData from "@/hooks/useCustomerData";
import { formatCurrency } from "@/lib/utils";
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

const CustomerDashboard = () => {
  const { data, filters, setFilters } = useCustomerData();
  const [isDraggable, setIsDraggable] = useState(false);

  // DND setup
  const [items, setItems] = useState([
    "stats",
    "acquisition",
    "retention",
    "engagement",
    "segments",
    "topCustomers",
    "feedback",
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
  const regionOptions = [
    { value: "All Regions", label: "All Regions" },
    { value: "North America", label: "North America" },
    { value: "Europe", label: "Europe" },
    { value: "Asia Pacific", label: "Asia Pacific" },
    { value: "Latin America", label: "Latin America" },
  ];

  const segmentOptions = [
    { value: "All Segments", label: "All Segments" },
    { value: "New", label: "New Customers" },
    { value: "Repeat", label: "Repeat Customers" },
    { value: "VIP", label: "VIP Customers" },
    { value: "At Risk", label: "At Risk Customers" },
  ];

  const channelOptions = [
    { value: "All Channels", label: "All Channels" },
    { value: "Direct", label: "Direct" },
    { value: "Organic Search", label: "Organic Search" },
    { value: "Paid Search", label: "Paid Search" },
    { value: "Social Media", label: "Social Media" },
    { value: "Referral", label: "Referral" },
  ];

  // Filter change handler
  const handleFilterChange = (type: string, value: string) => {
    setFilters(type, value);
  };

  // Render star rating
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    return <div className="flex">{stars}</div>;
  };

  // Badge color based on status
  const getFeedbackBadgeColor = (status: string) => {
    switch (status) {
      case "Positive":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Negative":
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
    if (dataType === "segmentation") {
      headers = "Age Group,Percentage\n";
      csvData = data.ageSegmentation.data.map(
        (item: any) => `${item.name},${item.value}`
      );
      filename = "customer-segmentation";
    } else if (dataType === "customers") {
      headers = "Name,Email,Total Spent,Orders,Loyalty Level,Last Purchase\n";
      csvData = data.topCustomers.map(
        (customer: any) =>
          `${customer.name},${customer.email},${customer.totalSpent},${customer.ordersCount},${customer.loyaltyLevel},${customer.lastPurchase}`
      );
      filename = "top-customers";
    } else if (dataType === "feedback") {
      headers = "Customer,Rating,Comment,Date,Status\n";
      csvData = data.feedbackData.map(
        (item: any) =>
          `${item.customer.name},${item.rating},"${item.comment}",${item.date},${item.status}`
      );
      filename = "customer-feedback";
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
          <h1 className="text-3xl font-bold">Customer Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Detailed insights into customer behavior and performance
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
          <label className="block text-sm font-medium mb-1">Region</label>
          <select
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent py-2 px-3"
            value={filters.region}
            onChange={(e) => handleFilterChange("region", e.target.value)}
          >
            {regionOptions.map((option) => (
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
          <label className="block text-sm font-medium mb-1">
            Customer Segment
          </label>
          <select
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent py-2 px-3"
            value={filters.segment}
            onChange={(e) => handleFilterChange("segment", e.target.value)}
          >
            {segmentOptions.map((option) => (
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
          <label className="block text-sm font-medium mb-1">
            Acquisition Channel
          </label>
          <select
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent py-2 px-3"
            value={filters.channel}
            onChange={(e) => handleFilterChange("channel", e.target.value)}
          >
            {channelOptions.map((option) => (
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
                    isDraggable={isDraggable}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {data.stats.map((stat) => (
                        <StatCard key={stat.id} stat={stat} />
                      ))}
                    </div>
                  </DraggableDashboardItem>
                );
              }

              if (item === "acquisition") {
                return (
                  <DraggableDashboardItem
                    key="acquisition"
                    id="acquisition"
                    isDraggable={isDraggable}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <ChartCard
                        type="donut"
                        title="Customer Acquisition Channels"
                        data={data.acquisitionData}
                      />
                      <ChartCard
                        type="donut"
                        title="Customer Demographics"
                        data={data.ageSegmentation}
                      />
                    </div>
                  </DraggableDashboardItem>
                );
              }

              if (item === "retention") {
                return (
                  <DraggableDashboardItem
                    key="retention"
                    id="retention"
                    isDraggable={isDraggable}
                  >
                    <ChartCard
                      type="line"
                      title="Customer Retention Rate"
                      data={data.retentionData}
                    />
                  </DraggableDashboardItem>
                );
              }

              if (item === "engagement") {
                return (
                  <DraggableDashboardItem
                    key="engagement"
                    id="engagement"
                    isDraggable={isDraggable}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Customer Engagement</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-auto">
                          <ChartCard
                            type="bar"
                            title="Regional Distribution"
                            data={data.regionData}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </DraggableDashboardItem>
                );
              }

              if (item === "segments") {
                return (
                  <DraggableDashboardItem
                    key="segments"
                    id="segments"
                    isDraggable={isDraggable}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Customer Segmentation</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleExport("segmentation")}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Export Data
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-4">
                              Age Distribution
                            </h4>
                            <div className="space-y-4">
                              {data.ageSegmentation.data.map((segment) => (
                                <div key={segment.name}>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm">
                                      {segment.name}
                                    </span>
                                    <span className="text-sm font-medium">
                                      {segment.value}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div
                                      className="bg-blue-600 h-2.5 rounded-full"
                                      style={{ width: `${segment.value}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-4">
                              Region Distribution
                            </h4>
                            <div className="space-y-4">
                              {data.regionData.data.map((region) => (
                                <div key={region.name}>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm">
                                      {region.name}
                                    </span>
                                    <span className="text-sm font-medium">
                                      {region.value}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div
                                      className="bg-purple-600 h-2.5 rounded-full"
                                      style={{ width: `${region.value}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </DraggableDashboardItem>
                );
              }

              if (item === "topCustomers") {
                return (
                  <DraggableDashboardItem
                    key="topCustomers"
                    id="topCustomers"
                    isDraggable={isDraggable}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Top Customers</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleExport("customers")}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Export Data
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              View All Customers
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Loyalty</TableHead>
                                <TableHead className="text-right">
                                  Orders
                                </TableHead>
                                <TableHead className="text-right">
                                  Spent
                                </TableHead>
                                <TableHead className="text-right">
                                  Last Purchase
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {data.topCustomers.map((customer) => (
                                <TableRow key={customer.id}>
                                  <TableCell>
                                    <div>
                                      <div className="font-medium">
                                        {customer.name}
                                      </div>
                                      <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {customer.email}
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant="outline"
                                      className="font-medium"
                                    >
                                      {customer.loyaltyLevel}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {customer.ordersCount}
                                  </TableCell>
                                  <TableCell className="text-right font-medium">
                                    {formatCurrency(customer.totalSpent)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {customer.lastPurchase}
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

              if (item === "feedback") {
                return (
                  <DraggableDashboardItem
                    key="feedback"
                    id="feedback"
                    isDraggable={isDraggable}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Customer Feedback</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleExport("feedback")}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Export Data
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              View All Feedback
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {data.feedbackData.map((feedback) => (
                            <div
                              key={feedback.id}
                              className="border-b border-gray-200 dark:border-gray-800 pb-4 last:border-0 last:pb-0"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="font-medium">
                                    {feedback.customer.name}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {feedback.date}
                                  </div>
                                </div>
                                <Badge
                                  className={getFeedbackBadgeColor(
                                    feedback.status
                                  )}
                                >
                                  {feedback.status}
                                </Badge>
                              </div>
                              <div className="flex items-center mb-2">
                                {renderRating(feedback.rating)}
                                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                  {feedback.rating.toFixed(1)}/5
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {feedback.comment}
                              </p>
                            </div>
                          ))}
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

export default CustomerDashboard;
