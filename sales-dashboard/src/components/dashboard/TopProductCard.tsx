import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

export interface Product {
  id: number;
  name: string;
  revenue: number;
  percentage: number;
}

interface TopProductsCardProps {
  products: Product[];
}

const TopProductsCard = ({ products }: TopProductsCardProps) => {
  return (
    <Card className="dashboard-card overflow-hidden transition-all duration-300 hover:shadow-md h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Top Products</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Download as CSV</DropdownMenuItem>
              <DropdownMenuItem>View all products</DropdownMenuItem>
              <DropdownMenuItem>Change time period</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded bg-gray-200 dark:bg-gray-700 mr-3 flex-shrink-0 flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  #{index + 1}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">{product.name}</h4>
                  <span className="text-sm font-semibold">
                    ${product.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${product.percentage}%` }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                      delay: 0.2 + index * 0.1,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProductsCard;
