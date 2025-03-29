import {
    DollarSign,
    ShoppingBag,
    Users,
    ShoppingCart
} from "lucide-react";

// Demo data for the dashboard
const dashboardData = {
    stats: [
        {
            id: "revenue",
            title: "Total Revenue",
            value: 879432,
            prefix: "$",
            changePercentage: 21.3,
            changeDirection: "up" as const,
            goal: 1125000,
            achieved: 78,
            icon: DollarSign,
            iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
            iconColor: "text-blue-600 dark:text-blue-400",
            progressColor: "bg-blue-500"
        },
        {
            id: "sales",
            title: "Total Sales",
            value: 12590,
            changePercentage: 13.2,
            changeDirection: "up" as const,
            goal: 14800,
            achieved: 85,
            icon: ShoppingBag,
            iconBgClass: "bg-purple-100 dark:bg-purple-900/30",
            iconColor: "text-purple-600 dark:text-purple-400",
            progressColor: "bg-purple-500"
        },
        {
            id: "customers",
            title: "New Customers",
            value: 2814,
            changePercentage: 8.4,
            changeDirection: "up" as const,
            goal: 4150,
            achieved: 68,
            icon: Users,
            iconBgClass: "bg-green-100 dark:bg-green-900/30",
            iconColor: "text-green-600 dark:text-green-400",
            progressColor: "bg-green-500"
        },
        {
            id: "aov",
            title: "Avg. Order Value",
            value: 69.85,
            prefix: "$",
            changePercentage: 3.2,
            changeDirection: "down" as const,
            goal: 82.5,
            achieved: 65,
            icon: ShoppingCart,
            iconBgClass: "bg-amber-100 dark:bg-amber-900/30",
            iconColor: "text-amber-600 dark:text-amber-400",
            progressColor: "bg-amber-500"
        }
    ],

    revenueData: {
        data: Array.from({ length: 30 }, (_, i) => ({
            name: `Oct ${i + 1}`,
            value: Math.floor(Math.random() * 50000) + 10000
        }))
    },

    categoryData: {
        data: [
            { name: "Electronics", value: 35 },
            { name: "Clothing", value: 25 },
            { name: "Home & Garden", value: 20 },
            { name: "Sports & Outdoors", value: 15 },
            { name: "Accessories", value: 5 }
        ],
        colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"]
    },

    regionData: {
        data: [
            { name: "North America", value: 40 },
            { name: "Europe", value: 30 },
            { name: "Asia Pacific", value: 20 },
            { name: "Latin America", value: 7 },
            { name: "Middle East & Africa", value: 3 }
        ],
        colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"]
    },

    topProducts: [
        {
            id: 1,
            name: "Premium Headphones XR-500",
            revenue: 34890,
            percentage: 92
        },
        {
            id: 2,
            name: "Wireless Earbuds Pro",
            revenue: 28460,
            percentage: 78
        },
        {
            id: 3,
            name: "Smart Watch Series 7",
            revenue: 24780,
            percentage: 65
        },
        {
            id: 4,
            name: "Bluetooth Speaker XL",
            revenue: 18340,
            percentage: 53
        },
        {
            id: 5,
            name: "Ultra HD Action Camera",
            revenue: 15670,
            percentage: 42
        }
    ],

    recentTransactions: [
        {
            id: "#ORD-7895",
            customer: {
                name: "Emma Wilson",
                email: "emma.w@example.com"
            },
            product: "Smart Watch Series 7",
            date: "Oct 28, 2023",
            amount: 299.99,
            status: "Completed" as const
        },
        {
            id: "#ORD-7894",
            customer: {
                name: "James Brown",
                email: "james.b@example.com"
            },
            product: "Wireless Earbuds Pro",
            date: "Oct 27, 2023",
            amount: 159.99,
            status: "Completed" as const
        },
        {
            id: "#ORD-7893",
            customer: {
                name: "Alex Johnson",
                email: "alex.j@example.com"
            },
            product: "Premium Headphones XR-500",
            date: "Oct 26, 2023",
            amount: 249.99,
            status: "Processing" as const
        },
        {
            id: "#ORD-7892",
            customer: {
                name: "Sarah Davis",
                email: "sarah.d@example.com"
            },
            product: "Ultra HD Action Camera",
            date: "Oct 25, 2023",
            amount: 329.99,
            status: "Cancelled" as const
        },
        {
            id: "#ORD-7891",
            customer: {
                name: "Michael Lee",
                email: "michael.l@example.com"
            },
            product: "Bluetooth Speaker XL",
            date: "Oct 24, 2023",
            amount: 129.99,
            status: "Shipped" as const
        }
    ],

    dateRange: {
        start: "Oct 1, 2023",
        end: "Oct 30, 2023"
    }
};

export default dashboardData;
