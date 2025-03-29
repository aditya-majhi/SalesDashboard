import { useState } from "react";
import marketingData from "@/data/MarketingData";
import { StatData } from "@/components/dashboard/StatCard";

interface MarketingDashboardData {
    stats: StatData[];
    channelPerformance: {
        data: {
            name: string;
            visits: number;
            conversions: number;
            spend: number;
        }[];
    };
    campaignPerformance: {
        data: {
            id: string;
            name: string;
            channel: string;
            budget: number;
            spent: number;
            clicks: number;
            conversions: number;
            ctr: number;
            roas: number;
            status: "Active" | "Paused" | "Completed";
        }[];
    };
    channelAttribution: {
        data: { name: string; value: number }[];
        colors: string[];
    };
    socialMediaPerformance: {
        data: {
            name: string;
            followers: number;
            engagement: number;
            leads: number;
        }[];
    };
    funnelData: {
        data: { name: string; value: number }[];
    };
    geographicPerformance: {
        data: {
            name: string;
            visitors: number;
            conversions: number;
            conversionRate: number;
        }[];
    };
    performanceTrends: {
        data: {
            name: string;
            visits: number;
            leads: number;
            conversions: number;
        }[];
    };
    dateRange: {
        start: string;
        end: string;
    };
}

interface FiltersType {
    timePeriod: string;
    channel: string;
    campaign: string;
    region: string;
}

const useMarketingData = (): {
    data: MarketingDashboardData;
    filters: FiltersType;
    setFilters: (type: string, value: string) => void;
} => {
    // We're using the demo data directly without fetching
    const data = marketingData;

    // Add filters state
    const [filters, setFilters] = useState<FiltersType>({
        timePeriod: "This Year",
        channel: "All Channels",
        campaign: "All Campaigns",
        region: "All Regions"
    });

    // Update filters
    const handleFilterChange = (type: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [type]: value
        }));

        // In a real app, this would trigger a new data fetch
        // For demo purposes, we're not changing the data
    };

    return {
        data,
        filters,
        setFilters: handleFilterChange
    };
};

export default useMarketingData;