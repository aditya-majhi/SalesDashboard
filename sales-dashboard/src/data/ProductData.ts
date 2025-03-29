import { Package, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";

// Demo data for product performance
const productData = {
    stats: [
        {
            id: "total_products",
            title: "Total Products",
            value: 1254,
            changePercentage: 5.3,
            changeDirection: "up" as const,
            goal: 1500,
            achieved: 84,
            icon: Package,
            iconBgClass: "bg-indigo-100 dark:bg-indigo-900/30",
            iconColor: "text-indigo-600 dark:text-indigo-400",
            progressColor: "bg-indigo-500"
        },
        {
            id: "top_performer",
            title: "Top Performer",
            value: 148.5,
            prefix: "$K",
            changePercentage: 12.1,
            changeDirection: "up" as const,
            goal: 150,
            achieved: 99,
            icon: TrendingUp,
            iconBgClass: "bg-emerald-100 dark:bg-emerald-900/30",
            iconColor: "text-emerald-600 dark:text-emerald-400",
            progressColor: "bg-emerald-500"
        },
        {
            id: "low_stock",
            title: "Low Stock Items",
            value: 28,
            changePercentage: 3.2,
            changeDirection: "down" as const,
            goal: 0,
            achieved: 72,
            icon: AlertTriangle,
            iconBgClass: "bg-orange-100 dark:bg-orange-900/30",
            iconColor: "text-orange-600 dark:text-orange-400",
            progressColor: "bg-orange-500"
        },
        {
            id: "avg_profit",
            title: "Avg. Profit Margin",
            value: 32.7,
            prefix: "",
            suffix: "%",
            changePercentage: 1.5,
            changeDirection: "up" as const,
            goal: 35,
            achieved: 93,
            icon: DollarSign,
            iconBgClass: "bg-cyan-100 dark:bg-cyan-900/30",
            iconColor: "text-cyan-600 dark:text-cyan-400",
            progressColor: "bg-cyan-500"
        }
    ],

    // Monthly sales data
    monthlySalesData: {
        data: Array.from({ length: 12 }, (_, i) => ({
            name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
            value: Math.floor(Math.random() * 50000) + 80000
        }))
    },

    // Product category distribution
    categoryDistribution: {
        data: [
            { name: "Electronics", value: 35 },
            { name: "Clothing", value: 25 },
            { name: "Home & Kitchen", value: 20 },
            { name: "Sports", value: 12 },
            { name: "Beauty", value: 8 }
        ],
        colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"]
    },

    // Price point distribution
    priceDistribution: {
        data: [
            { name: "$0-$50", value: 40 },
            { name: "$51-$100", value: 30 },
            { name: "$101-$200", value: 20 },
            { name: "$201+", value: 10 }
        ],
        colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"]
    },

    // Inventory levels
    inventoryData: {
        data: Array.from({ length: 6 }, (_, i) => ({
            name: ["Electronics", "Clothing", "Home", "Sports", "Beauty", "Other"][i],
            current: Math.floor(Math.random() * 500) + 500,
            optimal: Math.floor(Math.random() * 200) + 800
        }))
    },

    // Top selling products
    topProducts: [
        {
            id: "PRD-5678",
            name: "Ultra HD Smart TV 55\"",
            category: "Electronics",
            price: 699.99,
            stock: 124,
            sales: {
                units: 89,
                revenue: 62299.11
            },
            rating: 4.8,
            status: "In Stock" as const
        },
        {
            id: "PRD-9012",
            name: "Wireless Noise Cancelling Headphones",
            category: "Electronics",
            price: 249.99,
            stock: 78,
            sales: {
                units: 187,
                revenue: 46748.13
            },
            rating: 4.9,
            status: "In Stock" as const
        },
        {
            id: "PRD-3456",
            name: "Premium Ergonomic Office Chair",
            category: "Home & Kitchen",
            price: 189.99,
            stock: 45,
            sales: {
                units: 201,
                revenue: 38187.99
            },
            rating: 4.7,
            status: "Low Stock" as const
        },
        {
            id: "PRD-7890",
            name: "Professional Blender 2000X",
            category: "Home & Kitchen",
            price: 129.99,
            stock: 92,
            sales: {
                units: 256,
                revenue: 33277.44
            },
            rating: 4.6,
            status: "In Stock" as const
        },
        {
            id: "PRD-1234",
            name: "Athletic Running Shoes",
            category: "Sports",
            price: 79.99,
            stock: 156,
            sales: {
                units: 378,
                revenue: 30236.22
            },
            rating: 4.5,
            status: "In Stock" as const
        }
    ],

    // Underperforming products
    underperformingProducts: [
        {
            id: "PRD-2468",
            name: "Basic Desk Lamp",
            category: "Home & Kitchen",
            price: 24.99,
            stock: 342,
            sales: {
                units: 12,
                revenue: 299.88
            },
            rating: 3.2,
            suggestion: "Discount" as const
        },
        {
            id: "PRD-1357",
            name: "Standard HDMI Cable 6ft",
            category: "Electronics",
            price: 9.99,
            stock: 521,
            sales: {
                units: 37,
                revenue: 369.63
            },
            rating: 3.5,
            suggestion: "Bundle" as const
        },
        {
            id: "PRD-3690",
            name: "Cotton T-Shirt Pack",
            category: "Clothing",
            price: 19.99,
            stock: 267,
            sales: {
                units: 19,
                revenue: 379.81
            },
            rating: 2.8,
            suggestion: "Discontinue" as const
        }
    ],

    // Product performance over time
    performanceTimeline: {
        data: Array.from({ length: 12 }, (_, i) => ({
            name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
            electronics: Math.floor(Math.random() * 100) + 100,
            clothing: Math.floor(Math.random() * 70) + 50,
            home: Math.floor(Math.random() * 60) + 40,
            sports: Math.floor(Math.random() * 40) + 20
        }))
    },

    dateRange: {
        start: "Jan 1, 2023",
        end: "Dec 31, 2023"
    }
};

export default productData;