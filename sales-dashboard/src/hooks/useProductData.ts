import { useState } from "react";
import productData from "@/data/ProductData";
import { StatData } from "@/components/dashboard/StatCard";

interface ProductPerformanceData {
    stats: StatData[];
    monthlySalesData: {
        data: { name: string; value: number }[];
    };
    categoryDistribution: {
        data: { name: string; value: number }[];
        colors: string[];
    };
    priceDistribution: {
        data: { name: string; value: number }[];
        colors: string[];
    };
    inventoryData: {
        data: { name: string; current: number; optimal: number }[];
    };
    topProducts: {
        id: string;
        name: string;
        category: string;
        price: number;
        stock: number;
        sales: {
            units: number;
            revenue: number;
        };
        rating: number;
        status: "In Stock" | "Low Stock" | "Out of Stock";
    }[];
    underperformingProducts: {
        id: string;
        name: string;
        category: string;
        price: number;
        stock: number;
        sales: {
            units: number;
            revenue: number;
        };
        rating: number;
        suggestion: "Discount" | "Bundle" | "Discontinue";
    }[];
    performanceTimeline: {
        data: {
            name: string;
            electronics: number;
            clothing: number;
            home: number;
            sports: number;
        }[];
    };
    dateRange: {
        start: string;
        end: string;
    };
}

interface FiltersType {
    timePeriod: string;
    category: string;
    priceRange: string;
    sortBy: string;
}

const useProductData = (): {
    data: ProductPerformanceData;
    filters: FiltersType;
    setFilters: (type: string, value: string) => void;
} => {
    // We're using the demo data directly without fetching
    const data = productData;

    // Add filters state
    const [filters, setFilters] = useState<FiltersType>({
        timePeriod: "This Year",
        category: "All Categories",
        priceRange: "All Prices",
        sortBy: "Revenue"
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

export default useProductData;