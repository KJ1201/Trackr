import useDashboard from "../hooks/useDashboard";
import { BarChart, XAxis, YAxis, Bar, Tooltip, PieChart, Pie, Cell, Legend} from 'recharts'

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!stats) return <div>No data yet.</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="flex gap-4 mb-8">
        <div className="border border-black p-1 rounded-lg">
          <h3>Total</h3>
          <p>{stats.total}</p>
        </div>
        <div>
          <h3>Active</h3>
          <p>{stats.active}</p>
        </div>
        <div>
          <h3>Offers</h3>
          <p>{stats.offers}</p>
        </div>
      </div>

      <div>
        <h2>Applications Per Week</h2>
        {stats.by_week.length === 0 ? (
          <p>No Data</p>
        ) : (
          <BarChart width={600} height={300} data={stats.by_week}>
            <XAxis
              dataKey="week"
              label={{ value: "Week", position: "insideBottom" }}
            ></XAxis>
            <YAxis allowDecimals={false}></YAxis>
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6"></Bar>
          </BarChart>
        )}
      </div>

      <div>
        <h2>Applications By Status</h2>
        {stats.by_status.length === 0 ? (
          <p>No data yet</p>
        ) : (
          <PieChart width={400} height={300}>
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
                  fill={STATUS_COLORS[entry.status] || "#8884d8"}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
