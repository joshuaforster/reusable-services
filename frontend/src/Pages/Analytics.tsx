import { useState, useEffect } from "react";
import MetricCard from "../components/MetricCard";
import { API_BASE } from "../config";
import type { Application, DashboardMetrics } from "../types";

export default function Analytics() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    async function load() {
      const [appsResponse, metricsResponse] = await Promise.all([
        fetch(`${API_BASE}/applications`),
        fetch(`${API_BASE}/dashboard`),
      ]);
      const appsResult = await appsResponse.json();
      const metricsData = await metricsResponse.json();
      setApplications(appsResult.data ?? []);
      setMetrics(metricsData);
    }

    load();
  }, []);

  const topApplications = [...applications]
    .sort((a, b) => b.letter_count - a.letter_count)
    .slice(0, 5);

  const avgCost =
    metrics && metrics.total_letters > 0
      ? metrics.total_spend / metrics.total_letters
      : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <MetricCard
          label="Total Spend"
          value={`£${metrics?.total_spend.toFixed(2) ?? "..."}`}
        />
        <MetricCard
          label="Total Letters"
          value={metrics?.total_letters ?? "..."}
        />
        <MetricCard label="Avg Cost / Letter" value={`£${avgCost.toFixed(2)}`} />
      </div>

      <div className="border border-gray-800 bg-gray-900 p-4">
        <p className="text-sm text-gray-400 mb-3">Top Applications by Letters</p>

        {topApplications.map((app) => (
          <div
            key={app.id}
            className="flex justify-between text-sm border-b border-gray-800 py-2"
          >
            <span>{app.address}</span>
            <span>{app.letter_count} letters</span>
          </div>
        ))}
      </div>
    </div>
  );
}
