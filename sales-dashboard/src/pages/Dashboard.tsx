import { useState } from "react";
import { motion } from "framer-motion";
import TimePeriodSelector from "@/components/dashboard/TimePeriodSelector";
import DashboardControls from "@/components/dashboard/DashboardControls";
import StatCard, { StatData } from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import TopProductsCard, {
  Product,
} from "@/components/dashboard/TopProductCard";
import RecentTransactionsCard, {
  Transaction,
} from "@/components/dashboard/RecentTransactionCard";
import Notification from "@/components/dashboard/Notification";
import DraggableDashboardItem from "@/components/dashboard/DragableDashboardItem";
import useDashboardData from "@/hooks/useDashboardData";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

const Dashboard = () => {
  const {
    stats,
    revenueData,
    categoryData,
    regionData,
    topProducts,
    recentTransactions,
    dateRange,
  } = useDashboardData();

  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    description?: string;
  }>({
    show: false,
    message: "",
  });

  // Define types for the dashboard items with discriminated unions for better type safety
  type StatItem = {
    id: string;
    type: "stat";
    data: StatData;
  };

  type ChartItem = {
    id: string;
    type: "revenue-chart" | "category-chart" | "region-chart";
    data:
      | { data: { name: string; value: number }[] }
      | { data: { name: string; value: number }[]; colors: string[] };
  };

  type ProductsItem = {
    id: string;
    type: "products";
    data: Product[];
  };

  type TransactionsItem = {
    id: string;
    type: "transactions";
    data: Transaction[];
  };

  type DashboardItem = StatItem | ChartItem | ProductsItem | TransactionsItem;

  // Layout state for grid items
  const [items, setItems] = useState<DashboardItem[]>([
    { id: "revenue-card", type: "stat", data: stats[0] },
    { id: "sales-card", type: "stat", data: stats[1] },
    { id: "customers-card", type: "stat", data: stats[2] },
    { id: "aov-card", type: "stat", data: stats[3] },
    { id: "revenue-trend-card", type: "revenue-chart", data: revenueData },
    { id: "category-sales-card", type: "category-chart", data: categoryData },
    { id: "top-products-card", type: "products", data: topProducts },
    { id: "region-sales-card", type: "region-chart", data: regionData },
    { id: "recent-sales-card", type: "transactions", data: recentTransactions },
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
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        showNotification("Layout updated", "Dashboard layout has been updated");
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const showNotification = (message: string, description?: string) => {
    setNotification({
      show: true,
      message,
      description,
    });

    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  // Filter state
  const [filters, setFilters] = useState({
    timePeriod: "Last 30 Days",
    product: "All Products",
    region: "All Regions",
    channel: "All Channels",
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    showNotification(`Filter applied: ${value}`);
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Tracking all sales and revenue data in one place.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <TimePeriodSelector
            selectedPeriod={filters.timePeriod}
            dateRange={dateRange}
            onSelectPeriod={(period) =>
              handleFilterChange("timePeriod", period)
            }
          />
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6 overflow-x-hidden">
        <DashboardControls
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 w-full max-w-full"
          >
            <SortableContext
              items={items.slice(0, 4).map((item) => item.id)}
              strategy={rectSortingStrategy}
            >
              {items.slice(0, 4).map((item) => (
                <DraggableDashboardItem
                  key={item.id}
                  id={item.id}
                  isDraggable={false}
                >
                  {item.type === "stat" && <StatCard stat={item.data} />}
                </DraggableDashboardItem>
              ))}
            </SortableContext>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 w-full max-w-full"
          >
            <SortableContext
              items={items.slice(4, 6).map((item) => item.id)}
              strategy={rectSortingStrategy}
            >
              {items.slice(4, 6).map((item) => (
                <DraggableDashboardItem
                  key={item.id}
                  id={item.id}
                  isDraggable={false}
                  className={
                    item.id === "revenue-trend-card" ? "lg:col-span-2" : ""
                  }
                >
                  {(item.type === "revenue-chart" ||
                    item.type === "category-chart") && (
                    <ChartCard
                      type={item.id === "revenue-trend-card" ? "line" : "donut"}
                      title={
                        item.id === "revenue-trend-card"
                          ? "Revenue Trend"
                          : "Sales by Category"
                      }
                      data={item.data}
                    />
                  )}
                </DraggableDashboardItem>
              ))}
            </SortableContext>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 w-full max-w-full"
          >
            <SortableContext
              items={items.slice(6, 8).map((item) => item.id)}
              strategy={rectSortingStrategy}
            >
              {items.slice(6, 8).map((item) => (
                <DraggableDashboardItem
                  key={item.id}
                  id={item.id}
                  isDraggable={false}
                >
                  {item.type === "products" && (
                    <TopProductsCard products={item.data} />
                  )}
                  {item.type === "region-chart" && (
                    <ChartCard
                      type="bar"
                      title="Sales by Region"
                      data={item.data}
                    />
                  )}
                </DraggableDashboardItem>
              ))}
            </SortableContext>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-full"
          >
            <SortableContext
              items={items.slice(8).map((item) => item.id)}
              strategy={rectSortingStrategy}
            >
              {items.slice(8).map((item) => (
                <DraggableDashboardItem
                  key={item.id}
                  id={item.id}
                  isDraggable={false}
                >
                  {item.type === "transactions" && (
                    <RecentTransactionsCard transactions={item.data} />
                  )}
                </DraggableDashboardItem>
              ))}
            </SortableContext>
          </motion.div>
        </DndContext>
      </main>

      <Notification
        show={notification.show}
        message={notification.message}
        description={notification.description}
        onClose={hideNotification}
      />
    </div>
  );
};

export default Dashboard;
