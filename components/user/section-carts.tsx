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

export function UserSectionCards({ data }: { data: UserStatsData }) {
  return (
    <div className=" grid grid-cols-1 gap-4 px-4  lg:px-6 lg:grid-cols-2 xl:grid-cols-4">
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
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Toatal Active Users </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalActiveUsers?.total_active_users || 0}
          </CardTitle>
          {/* <CardAction>
            <Badge variant="outline">
              {data?.totalActiveUsers?.progression === "up" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingUp className="size-4" />+
                </div>
              ) : data?.totalActiveUsers?.progression === "down" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingDown />-
                </div>
              ) : null}
              {data?.totalActiveUsers?.percentage_change}%
            </Badge>
          </CardAction> */}
        </CardHeader>
        {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data?.totalActiveUsers?.progression + " "}
            {data?.totalActiveUsers?.percentage_change}% this period{" "}
            {data?.totalActiveUsers?.progression === "up" ? (
              <IconTrendingUp className="size-4" />
            ) : data?.totalActiveUsers?.progression === "down" ? (
              <IconTrendingDown className="size-4" />
            ) : null}
          </div>
        </CardFooter> */}
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Toatal Inactive Users </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalInactiveUsers?.total_inactive_users || 0}
          </CardTitle>
          {/* <CardAction>
            <Badge variant="outline">
              {data?.totalInactiveUsers?.progression === "up" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingUp className="size-4" />+
                </div>
              ) : data?.totalInactiveUsers?.progression === "down" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingDown />-
                </div>
              ) : null}
              {data?.totalInactiveUsers?.percentage_change}%
            </Badge>
          </CardAction> */}
        </CardHeader>
        {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data?.totalInactiveUsers?.progression + " "}
            {data?.totalInactiveUsers?.percentage_change}% this period{" "}
            {data?.totalInactiveUsers?.progression === "up" ? (
              <IconTrendingUp className="size-4" />
            ) : data?.totalInactiveUsers?.progression === "down" ? (
              <IconTrendingDown className="size-4" />
            ) : null}
          </div>
        </CardFooter> */}
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Toatal Banned Users </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalBannedUsers?.total_banned_users || 0}
          </CardTitle>
          {/* <CardAction>
            <Badge variant="outline">
              {data?.totalBannedUsers?.progression === "up" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingUp className="size-4" />+
                </div>
              ) : data?.totalBannedUsers?.progression === "down" ? (
                <div className="flex items-center gap-1">
                  <IconTrendingDown />-
                </div>
              ) : null}
              {data?.totalBannedUsers?.percentage_change}%
            </Badge>
          </CardAction> */}
        </CardHeader>
        {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data?.totalBannedUsers?.progression + " "}
            {data?.totalBannedUsers?.percentage_change}% this period{" "}
            {data?.totalBannedUsers?.progression === "up" ? (
              <IconTrendingUp className="size-4" />
            ) : data?.totalBannedUsers?.progression === "down" ? (
              <IconTrendingDown className="size-4" />
            ) : null}
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
}
