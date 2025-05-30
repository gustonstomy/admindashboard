"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartData = [
  { month: "January", orders: 186, revenue: 80 },
  { month: "February", orders: 305, revenue: 200 },
  { month: "March", orders: 237, revenue: 120 },
  { month: "April", orders: 73, revenue: 190 },
  { month: "May", orders: 209, revenue: 130 },
  { month: "June", orders: 214, revenue: 140 },
];

const chartConfig = {
  orders: {
    label: "orders",
    color: "var(--chart-1)",
  },
  revenue: {
    label: "revenue",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartBarMultiple({ data }: { data?: any }) {
  const chartData2 = data?.current?.data.map(
    (currentMonth: { long_name: any; value: any }, index: string | number) => {
      const previousMonth = data?.previous?.data[index];
      return {
        month: currentMonth?.long_name,
        orders: currentMonth?.value,
        revmobileenue: previousMonth?.value,
      };
    }
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>
          {data?.previous?.label} - {data?.current?.label}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData2} barSize={34}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={6}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="orders" fill="var(--color-orders)" radius={2} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={2} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
