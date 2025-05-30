type SummaryItem = {
  total: number | string;
  percentage_change: number;
  progression: string;
};

type MonthlyData = {
  name: string;
  long_name: string;
  value: number;
};

type RevenueChartData = {
  label: string;
  data: MonthlyData[];
};

type DashboardSummary = {
  totalRevenue: SummaryItem;
  totalOrders: SummaryItem;
  totalProducts: SummaryItem;
  totalUsers: SummaryItem;
  totalRevenueChart: {
    current: RevenueChartData;
    previous: RevenueChartData;
  };
};

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  image: string;
  status: "active" | "inactive";
  last_seen: Date;
};
