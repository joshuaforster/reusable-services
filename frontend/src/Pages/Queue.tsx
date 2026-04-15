import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../config";
import type { Application } from "../types";

export default function Queue() {
  const [applications, setApplications] = useState<Application[]>([]);

  async function fetchQueue() {
    const response = await fetch(`${API_BASE}/queue`);
    const result = await response.json();
    setApplications(result.data ?? []);
  }

  useEffect(() => {
    fetchQueue();
  }, []);

  async function submitLetter(id: string) {
    await fetch(`${API_BASE}/send_letter/${id}`, { method: "POST" });
    await fetchQueue();
  }

  return (
    <div className="max-w-6xl text-white">
      <h1 className="text-2xl mb-6">Send Queue</h1>

      <div className="border border-gray-800">
        <div className="grid grid-cols-3 bg-gray-900 p-3 text-sm text-gray-400 border-b border-gray-800">
          <span>Ref</span>
          <span>Address</span>
          <span>Actions</span>
        </div>

        {applications.map((application) => (
          <div
            key={application.id}
            className="grid grid-cols-3 p-3 border-b border-gray-800 text-sm items-center"
          >
            <span>{application.reference}</span>
            <span>{application.address}</span>

            <div className="flex gap-2">
              <Link
                to={`/preview/${application.id}`}
                className="px-3 py-1 border border-gray-700 hover:bg-white/10 text-xs"
              >
                Preview
              </Link>

              <Link
                to={`/application/${application.id}`}
                className="px-3 py-1 border border-gray-700 hover:bg-white/10 text-xs"
              >
                Details
              </Link>

              <button
                onClick={() => submitLetter(application.id)}
                className="px-3 py-1 border border-gray-700 hover:bg-white/10 text-xs"
              >
                Send
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
