import { useState } from "react";

// Components
import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import DraggableDashboardItem from "@/components/dashboard/DragableDashboardItem";
import TimePeriodSelector from "@/components/dashboard/TimePeriodSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Download,
} from "lucide-react";

// Hooks and Utils
import useMarketingData from "@/hooks/useMarketingData";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";

const MarketingDashboard = () => {
  const { data, filters, setFilters } = useMarketingData();

  // DND setup
  const [items, setItems] = useState([
    "stats",
    "channels",
    "attribution",
    "campaigns",
    "social",
    "funnel",
    "geography",
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over.id.toString());

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Filter options
  const channelOptions = [
    { value: "All Channels", label: "All Channels" },
    { value: "Social Media", label: "Social Media" },
    { value: "Search", label: "Search" },
    { value: "Email", label: "Email" },
    { value: "Display", label: "Display" },
    { value: "Affiliates", label: "Affiliates" },
  ];

  const campaignOptions = [
    { value: "All Campaigns", label: "All Campaigns" },
    { value: "Summer Sale", label: "Summer Sale" },
    { value: "New Product Launch", label: "New Product Launch" },
    { value: "Retargeting", label: "Retargeting" },
    { value: "Holiday Special", label: "Holiday Special" },
  ];

  const regionOptions = [
    { value: "All Regions", label: "All Regions" },
    { value: "North America", label: "North America" },
    { value: "Europe", label: "Europe" },
    { value: "Asia", label: "Asia" },
    { value: "Other", label: "Other Regions" },
  ];

  // Filter change handler
  const handleFilterChange = (type: string, value: string) => {
    setFilters(type, value);
  };

  // Calculate metrics
  const calculateConversionRate = (visits: number, conversions: number) => {
    return ((conversions / visits) * 100).toFixed(2);
  };

  const calculateCPA = (spend: number, conversions: number) => {
    return (spend / conversions).toFixed(2);
  };

  // Function to export data as CSV
  const handleExport = (dataType: string) => {
    let headers = "";
    let csvData: string[] = [];
    let filename = "";

    // Create different CSV content based on export type
    if (dataType === "channels") {
      headers = "Channel,Visits,Conversions,Conversion Rate,Spend,CPA\n";
      csvData = data.channelPerformance.data.map((channel: any) => {
        const convRate = calculateConversionRate(
          channel.visits,
          channel.conversions
        );
        const cpa =
          channel.spend > 0
            ? calculateCPA(channel.spend, channel.conversions)
            : "N/A";
        return `${channel.name},${channel.visits},${channel.conversions},${convRate}%,${channel.spend},${cpa}`;
      });
      filename = "channel-performance";
    } else if (dataType === "campaigns") {
      headers =
        "ID,Name,Channel,Budget,Spent,Clicks,Conversions,CTR,ROAS,Status\n";
      csvData = data.campaignPerformance.data.map(
        (campaign: any) =>
          `${campaign.id},${campaign.name},${campaign.channel},${campaign.budget},${campaign.spent},${campaign.clicks},${campaign.conversions},${campaign.ctr}%,${campaign.roas}x,${campaign.status}`
      );
      filename = "campaign-performance";
    } else if (dataType === "social") {
      headers = "Platform,Followers,Engagement,Leads Generated\n";
      csvData = data.socialMediaPerformance.data.map(
        (platform: any) =>
          `${platform.name},${platform.followers},${platform.engagement},${platform.leads}`
      );
      filename = "social-media-performance";
    } else if (dataType === "geography") {
      headers = "Region,Visitors,Conversions,Conversion Rate\n";
      csvData = data.geographicPerformance.data.map(
        (region: any) =>
          `${region.name},${region.visitors},${region.conversions},${region.conversionRate}%`
      );
      filename = "geographic-performance";
    }

    const csvContent = headers + csvData.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create download link and trigger click
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${filename}-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Marketing Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track campaign performance, channel efficiency, and ROI
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <TimePeriodSelector
            selectedPeriod={filters.timePeriod}
            dateRange={data.dateRange}
            onSelectPeriod={(period) =>
              handleFilterChange("timePeriod", period)
            }
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">
            Marketing Channel
          </label>
          <select
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent py-2 px-3"
            value={filters.channel}
            onChange={(e) => handleFilterChange("channel", e.target.value)}
          >
            {channelOptions.map((option) => (
              <option
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Campaign</label>
          <select
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent py-2 px-3"
            value={filters.campaign}
            onChange={(e) => handleFilterChange("campaign", e.target.value)}
          >
            {campaignOptions.map((option) => (
              <option
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Region</label>
          <select
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent py-2 px-3"
            value={filters.region}
            onChange={(e) => handleFilterChange("region", e.target.value)}
          >
            {regionOptions.map((option) => (
              <option
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items}>
          <div className="grid grid-cols-1 gap-6">
            {items.map((item) => {
              if (item === "stats") {
                return (
                  <DraggableDashboardItem
                    key="stats"
                    id="stats"
                    isDraggable={false}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {data.stats.map((stat) => (
                        <StatCard key={stat.id} stat={stat} />
                      ))}
                    </div>
                  </DraggableDashboardItem>
                );
              }

              if (item === "channels") {
                return (
                  <DraggableDashboardItem
                    key="channels"
                    id="channels"
                    isDraggable={false}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Channel Performance</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleExport("channels")}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Export Data
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Channel</TableHead>
                                <TableHead className="text-right">
                                  Visits
                                </TableHead>
                                <TableHead className="text-right">
                                  Conv.
                                </TableHead>
                                <TableHead className="text-right">
                                  Conv. Rate
                                </TableHead>
                                <TableHead className="text-right">
                                  Spend
                                </TableHead>
                                <TableHead className="text-right">
                                  CPA
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {data.channelPerformance.data.map((channel) => (
                                <TableRow key={channel.name}>
                                  <TableCell className="font-medium">
                                    {channel.name}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {formatNumber(channel.visits)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {formatNumber(channel.conversions)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {calculateConversionRate(
                                      channel.visits,
                                      channel.conversions
                                    )}
                                    %
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {formatCurrency(channel.spend)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {channel.spend > 0
                                      ? formatCurrency(
                                          Number(
                                            calculateCPA(
                                              channel.spend,
                                              channel.conversions
                                            )
                                          )
                                        )
                                      : "N/A"}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </DraggableDashboardItem>
                );
              }

              if (item === "attribution") {
                return (
                  <DraggableDashboardItem
                    key="attribution"
                    id="attribution"
                    isDraggable={false}
                  >
                    <ChartCard
                      type="donut"
                      title="Channel Attribution"
                      data={data.channelAttribution}
                    />
                  </DraggableDashboardItem>
                );
              }

              if (item === "campaigns") {
                return (
                  <DraggableDashboardItem
                    key="campaigns"
                    id="campaigns"
                    isDraggable={false}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Campaign Performance</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleExport("campaigns")}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Export Data
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              View All Campaigns
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Campaign</TableHead>
                                <TableHead>Channel</TableHead>
                                <TableHead className="text-right">
                                  Budget
                                </TableHead>
                                <TableHead className="text-right">
                                  Spent
                                </TableHead>
                                <TableHead className="text-right">
                                  CTR
                                </TableHead>
                                <TableHead className="text-right">
                                  ROAS
                                </TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {data.campaignPerformance.data.map((campaign) => (
                                <TableRow key={campaign.id}>
                                  <TableCell>
                                    <div>
                                      <div className="font-medium">
                                        {campaign.name}
                                      </div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {campaign.id}
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>{campaign.channel}</TableCell>
                                  <TableCell className="text-right">
                                    {formatCurrency(campaign.budget)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {formatCurrency(campaign.spent)}
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                      {Math.round(
                                        (campaign.spent / campaign.budget) * 100
                                      )}
                                      %
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {campaign.ctr}%
                                    {campaign.ctr > 3 ? (
                                      <TrendingUp className="inline ml-1 h-3 w-3 text-green-500" />
                                    ) : (
                                      <TrendingDown className="inline ml-1 h-3 w-3 text-red-500" />
                                    )}
                                  </TableCell>
                                  <TableCell className="text-right font-medium">
                                    {campaign.roas}x
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant="outline"
                                      className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    >
                                      {campaign.status}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </DraggableDashboardItem>
                );
              }

              if (item === "social") {
                return (
                  <DraggableDashboardItem
                    key="social"
                    id="social"
                    isDraggable={false}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Social Media Performance</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleExport("social")}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Export Data
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              View Detailed Reports
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Platform</TableHead>
                                <TableHead className="text-right">
                                  Followers
                                </TableHead>
                                <TableHead className="text-right">
                                  Engagement Rate
                                </TableHead>
                                <TableHead className="text-right">
                                  Leads Generated
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {data.socialMediaPerformance.data.map(
                                (platform) => (
                                  <TableRow key={platform.name}>
                                    <TableCell className="font-medium">
                                      {platform.name}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      {formatNumber(platform.followers)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      {platform.engagement}%
                                    </TableCell>
                                    <TableCell className="text-right">
                                      {formatNumber(platform.leads)}
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </DraggableDashboardItem>
                );
              }

              if (item === "funnel") {
                return (
                  <DraggableDashboardItem
                    key="funnel"
                    id="funnel"
                    isDraggable={false}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Marketing Funnel</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mx-auto max-w-3xl">
                          {data.funnelData.data.map((stage, index) => (
                            <div key={stage.name} className="my-4">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium">
                                  {stage.name}
                                </span>
                                <span className="text-sm">
                                  {formatNumber(stage.value)}
                                </span>
                              </div>
                              <div
                                className="w-full bg-blue-500 dark:bg-blue-600 rounded-lg"
                                style={{
                                  height: `${60 - index * 10}px`,
                                  opacity: 1 - index * 0.15,
                                }}
                              ></div>
                              {index < data.funnelData.data.length - 1 && (
                                <div className="flex justify-center my-1">
                                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-300 dark:border-t-gray-600"></div>
                                </div>
                              )}
                              {index < data.funnelData.data.length - 1 && (
                                <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                                  {(
                                    (data.funnelData.data[index + 1].value /
                                      stage.value) *
                                    100
                                  ).toFixed(1)}
                                  % conversion
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </DraggableDashboardItem>
                );
              }

              if (item === "geography") {
                return (
                  <DraggableDashboardItem
                    key="geography"
                    id="geography"
                    isDraggable={false}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Geographic Performance</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleExport("geography")}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Export Data
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              View Map Visualization
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Region</TableHead>
                                <TableHead className="text-right">
                                  Visitors
                                </TableHead>
                                <TableHead className="text-right">
                                  Conversions
                                </TableHead>
                                <TableHead className="text-right">
                                  Conv. Rate
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {data.geographicPerformance.data.map((region) => (
                                <TableRow key={region.name}>
                                  <TableCell className="font-medium">
                                    {region.name}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {formatNumber(region.visitors)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {formatNumber(region.conversions)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {region.conversionRate.toFixed(2)}%
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </DraggableDashboardItem>
                );
              }

              return null;
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default MarketingDashboard;
