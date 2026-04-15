import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetricCard from "../components/MetricCard";
import { API_BASE } from "../config";
import type { Application, DashboardMetrics } from "../types";

const LIMIT = 5;

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / LIMIT);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchApplications() {
      const response = await fetch(
        `${API_BASE}/applications?search=${search}&page=${page}&limit=${LIMIT}`,
      );
      const result = await response.json();
      setApplications(result.data ?? []);
      setTotal(result.total);
    }

    fetchApplications();
  }, [search, page]);

  useEffect(() => {
    async function fetchMetrics() {
      const response = await fetch(`${API_BASE}/dashboard`);
      const data = await response.json();
      setMetrics(data);
    }

    fetchMetrics();
  }, []);

  async function submitLetter(id: string) {
    const response = await fetch(`${API_BASE}/send_letter/${id}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to send letter");
    }

    const [metricsResponse, appsResponse] = await Promise.all([
      fetch(`${API_BASE}/dashboard`),
      fetch(`${API_BASE}/applications?search=${search}&page=${page}&limit=${LIMIT}`),
    ]);

    const metricsData = await metricsResponse.json();
    const appsData = await appsResponse.json();
    setMetrics(metricsData);
    setApplications(appsData.data ?? []);
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-semibold mb-6">Applications</h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search address or reference"
        className="mb-4 w-full bg-gray-800 border border-gray-700 p-2"
      />

      {metrics && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <MetricCard
            label="Total Spend"
            value={`£${metrics.total_spend}`}
          />
          <MetricCard
            label="Total Letters"
            value={metrics.total_letters}
          />
        </div>
      )}

      <div className="border border-gray-800">
        <div className="grid grid-cols-6 bg-gray-900 text-sm text-gray-400 p-3 border-b border-gray-800">
          <span>Reference</span>
          <span>Address</span>
          <span className="text-center">Letters</span>
          <span className="text-center">Cost</span>
          <span className="text-center">Status</span>
          <span className="text-right">Actions</span>
        </div>

        {applications.map((application) => (
          <div
            key={application.id}
            onClick={() => navigate(`/application/${application.id}`)}
            className="grid grid-cols-6 p-3 border-b border-gray-800 text-sm items-center cursor-pointer hover:bg-white/5"
          >
            <span>{application.reference}</span>
            <span className="truncate">{application.address}</span>
            <span className="text-center">{application.letter_count}</span>
            <span className="text-center">£{application.total_cost}</span>

            <div className="text-center">
              <span
                className={`px-2 py-1 text-xs border ${
                  application.letter_count > 0
                    ? "text-green-400 border-green-400"
                    : "text-gray-500 border-gray-700"
                }`}
              >
                {application.letter_count > 0 ? "Sent" : "Not Sent"}
              </span>
            </div>

            <div className="flex gap-2 justify-end">
              <Link
                to={`/preview/${application.id}`}
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-1 border border-gray-700 hover:bg-white/10 text-xs"
              >
                Preview
              </Link>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  submitLetter(application.id);
                }}
                className="px-3 py-1 border border-gray-700 hover:bg-white/10 text-xs"
              >
                Send
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4 items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <p className="text-sm text-gray-400">
          Page {page} of {totalPages}
        </p>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
