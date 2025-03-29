import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import useCounter from "@/hooks/useCounter";
import { LucideIcon } from "lucide-react";

export interface StatData {
  id: string;
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  changePercentage: number;
  changeDirection: "up" | "down";
  goal: number;
  achieved: number;
  icon: LucideIcon;
  iconBgClass: string;
  iconColor: string;
  progressColor: string;
}

interface StatCardProps {
  stat: StatData;
}

const StatCard = ({ stat }: StatCardProps) => {
  const value = useCounter(stat.value);
  const Icon = stat.icon;

  return (
    <Card className="dashboard-card overflow-hidden transition-all duration-300 hover:shadow-md h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {stat.title}
            </p>
            <motion.h3
              className="text-2xl font-bold mt-1"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {stat.prefix}
              {value}
              {stat.suffix}
            </motion.h3>
            <div className="flex items-center mt-2">
              <motion.span
                className={`flex items-center text-sm font-medium ${
                  stat.changeDirection === "up"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {stat.changeDirection === "up" ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                {stat.changePercentage}%
              </motion.span>
              <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                vs last period
              </span>
            </div>
          </div>
          <motion.div
            className={`p-3 ${stat.iconBgClass} rounded-full`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
          >
            <Icon className={`h-5 w-5 ${stat.iconColor}`} />
          </motion.div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`${stat.progressColor} h-2 rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${stat.achieved}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>
              Goal: {stat.prefix}
              {stat.goal.toLocaleString()}
            </span>
            <span>{stat.achieved}% achieved</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
