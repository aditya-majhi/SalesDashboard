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
    const data = dashboardData; // Fetch or import your data here

    return data;
};

export default useDashboardData;
