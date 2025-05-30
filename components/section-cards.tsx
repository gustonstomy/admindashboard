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

export function SectionCards({ data }: { data: DashboardSummary }) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Toatal Revenue </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalRevenue?.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {data?.totalRevenue?.progression === "up" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingUp className="size-4" />+
                </div>
              ) : data?.totalRevenue?.progression === "down" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingDown />-
                </div>
              ) : null}
              {data?.totalRevenue?.percentage_change}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data?.totalRevenue?.progression + " "}
            {data?.totalRevenue?.percentage_change}% this period{" "}
            {data?.totalRevenue?.progression === "up" ? (
              <IconTrendingUp className="size-4" />
            ) : data?.totalRevenue?.progression === "down" ? (
              <IconTrendingDown className="size-4" />
            ) : null}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Toatal Orders </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalOrders?.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {data?.totalOrders?.progression === "up" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingUp className="size-4" />+
                </div>
              ) : data?.totalOrders?.progression === "down" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingDown />-
                </div>
              ) : null}
              {data?.totalOrders?.percentage_change}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data?.totalOrders?.progression + " "}
            {data?.totalOrders?.percentage_change}% this period{" "}
            {data?.totalOrders?.progression === "up" ? (
              <IconTrendingUp className="size-4" />
            ) : data?.totalOrders?.progression === "down" ? (
              <IconTrendingDown className="size-4" />
            ) : null}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Toatal Products </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalProducts?.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {data?.totalProducts?.progression === "up" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingUp className="size-4" />+
                </div>
              ) : data?.totalProducts?.progression === "down" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingDown />-
                </div>
              ) : null}
              {data?.totalProducts?.percentage_change}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data?.totalProducts?.progression + " "}
            {data?.totalProducts?.percentage_change}% this period{" "}
            {data?.totalProducts?.progression === "up" ? (
              <IconTrendingUp className="size-4" />
            ) : data?.totalProducts?.progression === "down" ? (
              <IconTrendingDown className="size-4" />
            ) : null}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Toatal Users </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalUsers?.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {data?.totalUsers?.progression === "up" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingUp className="size-4" />+
                </div>
              ) : data?.totalUsers?.progression === "down" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingDown />-
                </div>
              ) : null}
              {data?.totalUsers?.percentage_change}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data?.totalUsers?.progression + " "}
            {data?.totalUsers?.percentage_change}% this period{" "}
            {data?.totalUsers?.progression === "up" ? (
              <IconTrendingUp className="size-4" />
            ) : data?.totalUsers?.progression === "down" ? (
              <IconTrendingDown className="size-4" />
            ) : null}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
