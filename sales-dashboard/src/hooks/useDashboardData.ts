import { useState, useEffect } from "react";
import dashboardData from "@/data/DashboardData";
import { StatData } from "@/components/dashboard/StatCard";
import { Product } from "@/components/dashboard/TopProductCard";
import { Transaction } from "@/components/dashboard/RecentTransactionCard";

interface DashboardData {
    stats: StatData[];
    revenueData: {
        data: { name: string; value: number }[];
    };
    categoryData: {
        data: { name: string; value: number }[];
        colors: string[];
    };
    regionData: {
        data: { name: string; value: number }[];
        colors: string[];
    };
    topProducts: Product[];
    recentTransactions: Transaction[];
    dateRange: {
        start: string;
        end: string;
    };
}

const useDashboardData = (): DashboardData => {
    const [data, setData] = useState<DashboardData>(dashboardData);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate data loading delay for demonstration
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // You could add filtering functionality here
    // For example:
    // const filterDataByPeriod = (period: string) => {
    //   // Filter logic here
    // };

    return data;
};

export default useDashboardData;
