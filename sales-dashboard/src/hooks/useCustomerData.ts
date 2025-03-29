import { useState } from "react";
import customerData from "@/data/CustomerData";
import { StatData } from "@/components/dashboard/StatCard";

interface CustomerAnalyticsData {
    stats: StatData[];
    acquisitionData: {
        data: { name: string; value: number }[];
        colors: string[];
    };
    retentionData: {
        data: { name: string; value: number }[];
    };
    ageSegmentation: {
        data: { name: string; value: number }[];
        colors: string[];
    };
    regionData: {
        data: { name: string; value: number }[];
        colors: string[];
    };
    engagementData: {
        data: { name: string; visits: number; purchases: number }[];
    };
    topCustomers: {
        id: number;
        name: string;
        email: string;
        totalSpent: number;
        ordersCount: number;
        loyaltyLevel: string;
        lastPurchase: string;
    }[];
    feedbackData: {
        id: string;
        customer: {
            name: string;
            email: string;
        };
        rating: number;
        comment: string;
        date: string;
        status: "Positive" | "Negative" | "Neutral";
    }[];
    dateRange: {
        start: string;
        end: string;
    };
}

interface FiltersType {
    timePeriod: string;
    region: string;
    segment: string;
    channel: string;
}

const useCustomerData = (): {
    data: CustomerAnalyticsData;
    filters: FiltersType;
    setFilters: (type: string, value: string) => void;
} => {
    // We're using the demo data directly without fetching
    const data = customerData;

    // Add filters state
    const [filters, setFilters] = useState<FiltersType>({
        timePeriod: "This Month",
        region: "All Regions",
        segment: "All Segments",
        channel: "All Channels"
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

export default useCustomerData;