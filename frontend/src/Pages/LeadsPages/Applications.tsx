import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

type Application = {
  id: string;
  reference: string;
  address: string;
  letter_count: number;
  total_cost: number;
};

type DashboardMetrics = {
  total_spend: number;
  total_letters: number;
};

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 5;
  const totalPages = Math.ceil(total / limit);

  const navigate = useNavigate();

  useEffect(() => {
    async function getApplications() {
      const response = await fetch(
        `http://127.0.0.1:8000/applications?query=${search}&page=${page}&limit=${limit}`,
      );

      const result = await response.json();

      setApplications(result.data);
      setTotal(result.total);
    }

    getApplications();
  }, [search, page]);

  useEffect(() => {
    async function getMetrics() {
      const response = await fetch("http://127.0.0.1:8000/dashboard");
      const data = await response.json();
      setMetrics(data);
    }

    getMetrics();
  }, []);

  async function submitLetter(id: string) {
    const response = await fetch(`http://127.0.0.1:8000/send_letter/${id}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to send letter");
    }

    // refresh metrics
    const metricsResponse = await fetch("http://127.0.0.1:8000/dashboard");
    const metricsData = await metricsResponse.json();
    setMetrics(metricsData);

    // refresh applications
    const appsResponse = await fetch(
      `http://127.0.0.1:8000/applications?query=${search}&page=${page}&limit=${limit}`,
    );

    const appsData = await appsResponse.json();
    setApplications(appsData.data);
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-semibold mb-6">Applications</h1>

      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search address or reference"
        className="mb-4 w-full bg-gray-800 border border-gray-700 p-2"
      />

      {metrics && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-900 border border-gray-800">
            <p className="text-sm text-gray-400">Total Spend</p>
            <p className="text-xl">£{metrics.total_spend}</p>
          </div>

          <div className="p-4 bg-gray-900 border border-gray-800">
            <p className="text-sm text-gray-400">Total Letters</p>
            <p className="text-xl">{metrics.total_letters}</p>
          </div>
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
                onClick={(event) => event.stopPropagation()}
                className="px-3 py-1 border border-gray-700 hover:bg-white/10 text-xs"
              >
                Preview
              </Link>

              <button
                onClick={(event) => {
                  event.stopPropagation();
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

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <p className="mt-4 text-sm text-gray-400">
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
