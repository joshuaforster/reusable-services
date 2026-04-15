import { useState, useEffect } from "react";
import { API_BASE } from "../config";
import type { Application } from "../types";

export default function History() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    async function load() {
      const response = await fetch(`${API_BASE}/applications?status=history`);
      const result = await response.json();
      setApplications(result.data ?? []);
    }

    load();
  }, []);

  return (
    <div className="max-w-6xl text-white">
      <h1 className="text-2xl mb-6">History</h1>

      <div className="border border-gray-800">
        <div className="grid grid-cols-4 bg-gray-900 p-3 text-sm text-gray-400 border-b border-gray-800">
          <span>Ref</span>
          <span>Address</span>
          <span>Letters</span>
          <span>Cost</span>
        </div>

        {applications.map((application) => (
          <div
            key={application.id}
            className="grid grid-cols-4 p-3 border-b border-gray-800 text-sm items-center"
          >
            <span>{application.reference}</span>
            <span>{application.address}</span>
            <span>{application.letter_count}</span>
            <span>£{application.total_cost}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
