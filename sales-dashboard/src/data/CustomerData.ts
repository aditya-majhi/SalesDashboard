import { User, UsersRound, ShoppingBag, Activity } from "lucide-react";

// Demo data for customer analytics
const customerData = {
    stats: [
        {
            id: "total_customers",
            title: "Total Customers",
            value: 24758,
            changePercentage: 12.8,
            changeDirection: "up" as const,
            goal: 30000,
            achieved: 82,
            icon: User,
            iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
            iconColor: "text-blue-600 dark:text-blue-400",
            progressColor: "bg-blue-500"
        },
        {
            id: "active_customers",
            title: "Active Customers",
            value: 18346,
            changePercentage: 8.2,
            changeDirection: "up" as const,
            goal: 20000,
            achieved: 92,
            icon: Activity,
            iconBgClass: "bg-green-100 dark:bg-green-900/30",
            iconColor: "text-green-600 dark:text-green-400",
            progressColor: "bg-green-500"
        },
        {
            id: "new_customers",
            title: "New Customers (MTD)",
            value: 1245,
            changePercentage: 4.5,
            changeDirection: "down" as const,
            goal: 1500,
            achieved: 83,
            icon: UsersRound,
            iconBgClass: "bg-purple-100 dark:bg-purple-900/30",
            iconColor: "text-purple-600 dark:text-purple-400",
            progressColor: "bg-purple-500"
        },
        {
            id: "clv",
            title: "Avg. Lifetime Value",
            value: 1284.53,
            prefix: "$",
            changePercentage: 2.1,
            changeDirection: "up" as const,
            goal: 1350,
            achieved: 95,
            icon: ShoppingBag,
            iconBgClass: "bg-amber-100 dark:bg-amber-900/30",
            iconColor: "text-amber-600 dark:text-amber-400",
            progressColor: "bg-amber-500"
        }
    ],

    // Customer acquisition data
    acquisitionData: {
        data: [
            { name: "Direct", value: 30 },
            { name: "Organic Search", value: 25 },
            { name: "Paid Search", value: 20 },
            { name: "Social Media", value: 15 },
            { name: "Referral", value: 10 }
        ],
        colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"]
    },

    // Customer retention data
    retentionData: {
        data: Array.from({ length: 12 }, (_, i) => ({
            name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
            value: 75 + Math.floor(Math.random() * 15)
        }))
    },

    // Customer segmentation by age
    ageSegmentation: {
        data: [
            { name: "18-24", value: 15 },
            { name: "25-34", value: 32 },
            { name: "35-44", value: 28 },
            { name: "45-54", value: 18 },
            { name: "55+", value: 7 }
        ],
        colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"]
    },

    // Customer segmentation by region
    regionData: {
        data: [
            { name: "North America", value: 45 },
            { name: "Europe", value: 25 },
            { name: "Asia Pacific", value: 20 },
            { name: "Latin America", value: 7 },
            { name: "Other", value: 3 }
        ],
        colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"]
    },

    // Customer engagement over time
    engagementData: {
        data: Array.from({ length: 30 }, (_, i) => ({
            name: `Day ${i + 1}`,
            visits: Math.floor(Math.random() * 500) + 800,
            purchases: Math.floor(Math.random() * 100) + 100
        }))
    },

    // Top customers by value
    topCustomers: [
        {
            id: 1,
            name: "Thomas Mitchell",
            email: "thomas.m@example.com",
            totalSpent: 12760.45,
            ordersCount: 23,
            loyaltyLevel: "Diamond",
            lastPurchase: "Oct 25, 2023"
        },
        {
            id: 2,
            name: "Sarah Williams",
            email: "sarah.w@example.com",
            totalSpent: 9845.20,
            ordersCount: 18,
            loyaltyLevel: "Platinum",
            lastPurchase: "Oct 28, 2023"
        },
        {
            id: 3,
            name: "Robert Johnson",
            email: "robert.j@example.com",
            totalSpent: 8350.75,
            ordersCount: 15,
            loyaltyLevel: "Gold",
            lastPurchase: "Oct 22, 2023"
        },
        {
            id: 4,
            name: "Jennifer Lopez",
            email: "jennifer.l@example.com",
            totalSpent: 7120.30,
            ordersCount: 14,
            loyaltyLevel: "Gold",
            lastPurchase: "Oct 26, 2023"
        },
        {
            id: 5,
            name: "Michael Brown",
            email: "michael.b@example.com",
            totalSpent: 6540.90,
            ordersCount: 12,
            loyaltyLevel: "Silver",
            lastPurchase: "Oct 20, 2023"
        }
    ],

    // Customer feedback data
    feedbackData: [
        {
            id: "#FB-1024",
            customer: {
                name: "Emma Thompson",
                email: "emma.t@example.com"
            },
            rating: 5,
            comment: "Exceptional service and product quality. Will definitely be a returning customer!",
            date: "Oct 28, 2023",
            status: "Positive" as const
        },
        {
            id: "#FB-1023",
            customer: {
                name: "David Wilson",
                email: "david.w@example.com"
            },
            rating: 2,
            comment: "Delivery was much slower than expected. Product is fine but I expected faster shipping.",
            date: "Oct 27, 2023",
            status: "Negative" as const
        },
        {
            id: "#FB-1022",
            customer: {
                name: "Sophia Martinez",
                email: "sophia.m@example.com"
            },
            rating: 4,
            comment: "Great products but the mobile app could use some improvements for a better shopping experience.",
            date: "Oct 26, 2023",
            status: "Positive" as const
        },
        {
            id: "#FB-1021",
            customer: {
                name: "James Taylor",
                email: "james.t@example.com"
            },
            rating: 3,
            comment: "Average experience. Nothing exceptional, but everything worked as expected.",
            date: "Oct 25, 2023",
            status: "Neutral" as const
        },
        {
            id: "#FB-1020",
            customer: {
                name: "Olivia Robinson",
                email: "olivia.r@example.com"
            },
            rating: 1,
            comment: "Very disappointed with customer service response time when I had an issue with my order.",
            date: "Oct 24, 2023",
            status: "Negative" as const
        }
    ],

    dateRange: {
        start: "Oct 1, 2023",
        end: "Oct 30, 2023"
    }
};

export default customerData;