import { TrendingUp, Target, Radio, LineChart } from "lucide-react";

// Demo data for marketing dashboard
const marketingData = {
    stats: [
        {
            id: "ad_spend",
            title: "Ad Spend",
            value: 58750,
            prefix: "$",
            changePercentage: 8.7,
            changeDirection: "up" as const,
            goal: 60000,
            achieved: 98,
            icon: LineChart,
            iconBgClass: "bg-rose-100 dark:bg-rose-900/30",
            iconColor: "text-rose-600 dark:text-rose-400",
            progressColor: "bg-rose-500"
        },
        {
            id: "roi",
            title: "Marketing ROI",
            value: 348,
            prefix: "",
            suffix: "%",
            changePercentage: 12.4,
            changeDirection: "up" as const,
            goal: 300,
            achieved: 100,
            icon: TrendingUp,
            iconBgClass: "bg-emerald-100 dark:bg-emerald-900/30",
            iconColor: "text-emerald-600 dark:text-emerald-400",
            progressColor: "bg-emerald-500"
        },
        {
            id: "cac",
            title: "Avg. Cost per Acquisition",
            value: 32.75,
            prefix: "$",
            changePercentage: 6.3,
            changeDirection: "down" as const,
            goal: 30,
            achieved: 91,
            icon: Target,
            iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
            iconColor: "text-blue-600 dark:text-blue-400",
            progressColor: "bg-blue-500"
        },
        {
            id: "campaigns",
            title: "Active Campaigns",
            value: 24,
            changePercentage: 4.2,
            changeDirection: "up" as const,
            goal: 25,
            achieved: 96,
            icon: Radio,
            iconBgClass: "bg-purple-100 dark:bg-purple-900/30",
            iconColor: "text-purple-600 dark:text-purple-400",
            progressColor: "bg-purple-500"
        }
    ],

    // Marketing channel performance
    channelPerformance: {
        data: [
            { name: "Social Media", visits: 32560, conversions: 987, spend: 12500 },
            { name: "Search Ads", visits: 28750, conversions: 1245, spend: 18200 },
            { name: "Email", visits: 21450, conversions: 876, spend: 4200 },
            { name: "Affiliates", visits: 15670, conversions: 532, spend: 7800 },
            { name: "Display Ads", visits: 12340, conversions: 321, spend: 9600 },
            { name: "Direct", visits: 8760, conversions: 254, spend: 0 }
        ]
    },

    // Campaign performance
    campaignPerformance: {
        data: [
            {
                id: "CAMP-001",
                name: "Summer Sale Promotion",
                channel: "Multiple",
                budget: 15000,
                spent: 14278,
                clicks: 28450,
                conversions: 742,
                ctr: 3.2,
                roas: 4.8,
                status: "Active" as const
            },
            {
                id: "CAMP-002",
                name: "New Product Launch",
                channel: "Social Media",
                budget: 12000,
                spent: 11876,
                clicks: 32560,
                conversions: 526,
                ctr: 2.8,
                roas: 3.6,
                status: "Active" as const
            },
            {
                id: "CAMP-003",
                name: "Retargeting Campaign",
                channel: "Display",
                budget: 8000,
                spent: 7245,
                clicks: 15780,
                conversions: 423,
                ctr: 4.1,
                roas: 5.2,
                status: "Active" as const
            },
            {
                id: "CAMP-004",
                name: "Holiday Special Offers",
                channel: "Email",
                budget: 5000,
                spent: 4876,
                clicks: 12450,
                conversions: 387,
                ctr: 3.5,
                roas: 6.7,
                status: "Active" as const
            },
            {
                id: "CAMP-005",
                name: "Loyalty Program Promotion",
                channel: "Multiple",
                budget: 10000,
                spent: 9875,
                clicks: 18560,
                conversions: 298,
                ctr: 2.1,
                roas: 3.2,
                status: "Active" as const
            }
        ]
    },

    // Channel attribution
    channelAttribution: {
        data: [
            { name: "Social Media", value: 28 },
            { name: "Search Ads", value: 32 },
            { name: "Email", value: 18 },
            { name: "Affiliates", value: 12 },
            { name: "Display Ads", value: 8 },
            { name: "Direct", value: 2 }
        ],
        colors: ["#4c1d95", "#1d4ed8", "#0891b2", "#059669", "#b45309", "#be123c"]
    },

    // Social media performance
    socialMediaPerformance: {
        data: [
            { name: "Facebook", followers: 58450, engagement: 3.2, leads: 876 },
            { name: "Instagram", followers: 124650, engagement: 4.8, leads: 1245 },
            { name: "Twitter", followers: 32580, engagement: 2.1, leads: 427 },
            { name: "LinkedIn", followers: 18750, engagement: 2.7, leads: 654 },
            { name: "TikTok", followers: 87650, engagement: 5.6, leads: 987 }
        ]
    },

    // Marketing funnel data
    funnelData: {
        data: [
            { name: "Impressions", value: 524680 },
            { name: "Clicks", value: 105730 },
            { name: "Leads", value: 32650 },
            { name: "Opportunities", value: 8765 },
            { name: "Customers", value: 3254 }
        ]
    },

    // Geographic performance
    geographicPerformance: {
        data: [
            { name: "North America", visitors: 175650, conversions: 2876, conversionRate: 1.64 },
            { name: "Europe", visitors: 124530, conversions: 1875, conversionRate: 1.51 },
            { name: "Asia", visitors: 98760, conversions: 1345, conversionRate: 1.36 },
            { name: "South America", visitors: 45670, conversions: 587, conversionRate: 1.29 },
            { name: "Australia", visitors: 32450, conversions: 465, conversionRate: 1.43 },
            { name: "Africa", visitors: 18760, conversions: 234, conversionRate: 1.25 }
        ]
    },

    // Performance trends
    performanceTrends: {
        data: Array.from({ length: 12 }, (_, i) => ({
            name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
            visits: Math.floor(Math.random() * 30000) + 80000,
            leads: Math.floor(Math.random() * 3000) + 5000,
            conversions: Math.floor(Math.random() * 500) + 1000
        }))
    },

    dateRange: {
        start: "Jan 1, 2023",
        end: "Dec 31, 2023"
    }
};

export default marketingData;