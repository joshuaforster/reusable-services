import { useEffect, useState } from "react";

type DashboardMetrics = {
  total_spend: number;
  total_letters: number;
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  async function fetchMetrics() {
    const response = await fetch("http://127.0.0.1:8000/dashboard");
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    async function load() {
      const data = await fetchMetrics();
      setMetrics(data);
    }

    load();
  }, []);

  const summaryMetrics = [
    {
      id: 1,
      label: "Total Spend",
      value: metrics ? `£${metrics.total_spend.toFixed(2)}` : "...",
    },
    {
      id: 2,
      label: "Total Letters Sent",
      value: metrics ? metrics.total_letters : "...",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <header className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-semibold">HoundData Overview</h1>
        <p className="text-gray-400 mt-1">Spend and activity.</p>
      </header>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {summaryMetrics.map((metric) => (
          <div
            key={metric.id}
            className="p-6 bg-gray-900 border border-gray-800"
          >
            <p className="text-sm text-gray-400 mb-2">{metric.label}</p>
            <p className="text-3xl font-medium">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
