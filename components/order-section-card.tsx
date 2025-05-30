import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OrderStatistic {
  total: number;
  percentage_change: number;
  progression: "up" | "down" | "";
}

interface RevenueStatistic {
  total: string;
  percentage_change: number;
  progression: "up" | "down" | "";
}

// Main data structure interface
interface OrderStatisticsData {
  total_orders: OrderStatistic;
  completed_orders: OrderStatistic;
  pending_orders: OrderStatistic;
  cancelled_orders: OrderStatistic;
  total_revenue: RevenueStatistic;
}

export function OrderSectionCards({
  OrderStatisticsData,
}: {
  OrderStatisticsData?: OrderStatisticsData;
}) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Orders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {OrderStatisticsData?.total_orders.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {OrderStatisticsData?.total_orders?.progression === "up" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingUp className="size-4" />+
                </div>
              ) : OrderStatisticsData?.total_orders?.progression === "down" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingDown />-
                </div>
              ) : null}
              {OrderStatisticsData?.total_orders?.percentage_change}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {OrderStatisticsData?.total_orders?.progression + " "}
            {OrderStatisticsData?.total_orders?.percentage_change}% this period{" "}
            {OrderStatisticsData?.total_orders?.progression === "up" ? (
              <IconTrendingUp className="size-4" />
            ) : OrderStatisticsData?.total_orders?.progression === "down" ? (
              <IconTrendingDown className="size-4" />
            ) : null}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pending Orders </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {OrderStatisticsData?.pending_orders.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {OrderStatisticsData?.pending_orders?.progression === "up" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingUp className="size-4" />+
                </div>
              ) : OrderStatisticsData?.pending_orders?.progression ===
                "down" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingDown />-
                </div>
              ) : null}
              {OrderStatisticsData?.pending_orders?.percentage_change}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {OrderStatisticsData?.pending_orders?.progression + " "}
            {OrderStatisticsData?.pending_orders?.percentage_change}% this
            period{" "}
            {OrderStatisticsData?.pending_orders?.progression === "up" ? (
              <IconTrendingUp className="size-4" />
            ) : OrderStatisticsData?.pending_orders?.progression === "down" ? (
              <IconTrendingDown className="size-4" />
            ) : null}
          </div>
        </CardFooter>
      </Card>
      {/* <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {OrderStatisticsData?.total_revenue.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {OrderStatisticsData?.total_revenue?.progression === "up" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingUp className="size-4" />+
                </div>
              ) : OrderStatisticsData?.total_revenue?.progression === "down" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingDown />-
                </div>
              ) : null}
              {OrderStatisticsData?.total_revenue?.percentage_change}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {OrderStatisticsData?.total_revenue?.progression + " "}
            {OrderStatisticsData?.total_revenue?.percentage_change}% this period{" "}
            {OrderStatisticsData?.total_revenue?.progression === "up" ? (
              <IconTrendingUp className="size-4" />
            ) : OrderStatisticsData?.total_revenue?.progression === "down" ? (
              <IconTrendingDown className="size-4" />
            ) : null}
          </div>
        </CardFooter>
      </Card> */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Completed Orders </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {OrderStatisticsData?.completed_orders.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {OrderStatisticsData?.completed_orders?.progression === "up" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingUp className="size-4" />+
                </div>
              ) : OrderStatisticsData?.completed_orders?.progression ===
                "down" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingDown />-
                </div>
              ) : null}
              {OrderStatisticsData?.completed_orders?.percentage_change}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {OrderStatisticsData?.completed_orders?.progression + " "}
            {OrderStatisticsData?.completed_orders?.percentage_change}% this
            period{" "}
            {OrderStatisticsData?.completed_orders?.progression === "up" ? (
              <IconTrendingUp className="size-4" />
            ) : OrderStatisticsData?.completed_orders?.progression ===
              "down" ? (
              <IconTrendingDown className="size-4" />
            ) : null}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Cancelled Orders </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {OrderStatisticsData?.cancelled_orders.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {OrderStatisticsData?.cancelled_orders?.progression === "up" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingUp className="size-4" />+
                </div>
              ) : OrderStatisticsData?.cancelled_orders?.progression ===
                "down" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingDown />-
                </div>
              ) : null}
              {OrderStatisticsData?.cancelled_orders?.percentage_change}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {OrderStatisticsData?.cancelled_orders?.progression + " "}
            {OrderStatisticsData?.cancelled_orders?.percentage_change}% this
            period{" "}
            {OrderStatisticsData?.cancelled_orders?.progression === "up" ? (
              <IconTrendingUp className="size-4" />
            ) : OrderStatisticsData?.cancelled_orders?.progression ===
              "down" ? (
              <IconTrendingDown className="size-4" />
            ) : null}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
