import { useEffect, useState } from "react";
import MetricCard from "../components/MetricCard";
import { API_BASE } from "../config";
import type { DashboardMetrics } from "../types";

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  useEffect(() => {
    async function load() {
      const response = await fetch(`${API_BASE}/dashboard`);
      const data = await response.json();
      setMetrics(data);
    }

    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <header className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-semibold">HoundData Overview</h1>
        <p className="text-gray-400 mt-1">Spend and activity.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <MetricCard
          label="Total Spend"
          value={metrics ? `£${metrics.total_spend.toFixed(2)}` : "..."}
        />
        <MetricCard
          label="Total Letters Sent"
          value={metrics ? metrics.total_letters : "..."}
        />
      </div>
    </div>
  );
}
