import useDashboard from "../hooks/useDashboard";
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";

const STATUS_COLORS = {
  applied: "#3b82f6",
  pending: "#f59e0b",
  interview: "#8b5cf6",
  offer: "#10b981",
  rejected: "#ef4444",
  withdrawn: "#6b7280",
};

function Dashboard() {
  const { stats, loading, error } = useDashboard();

  const chartConfig = {
    count: { label: "Applications", color: "#3b82f6" },
    applied: { label: "Applied", color: "#3b82f6" },
    pending: { label: "Pending", color: "#f59e0b" },
    interview: { label: "Interview", color: "#8b5cf6" },
    offer: { label: "Offer", color: "#10b981" },
    rejected: { label: "Rejected", color: "#ef4444" },
    withdrawn: { label: "Withdrawn", color: "#6b7280" },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!stats) return <div>No data yet.</div>;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Applications</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stats.total}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Active Applications</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stats.active}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Offers</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stats.offers}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.by_week.length === 0 ? (
          <p>No Data</p>
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Applications per week</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={stats.by_week}>
                  <XAxis dataKey="week"></XAxis>
                  <YAxis allowDecimals={false}></YAxis>

                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--chart-1)"></Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}
        {stats.by_status.length === 0 ? (
          <p>No data yet</p>
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Applications by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <PieChart>
                  <Pie
                    data={stats.by_status}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ status, count }) => `${status}: ${count}`}
                  >
                    {stats.by_status.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={STATUS_COLORS[entry.status] || "var(--chart-1)"}
                      />
                    ))}
                  </Pie>

                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
