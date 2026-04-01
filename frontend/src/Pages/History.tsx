import { useState, useEffect } from "react";

type Application = {
  id: string;
  reference: string;
  address: string;
  proposal: string;
  letter_count: number;
  total_cost: number;
};

export default function History() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    async function getLeads() {
      const response = await fetch("http://127.0.0.1:8000/applications?status=history");
      const result = await response.json();
      setApplications(result.data);
    }

    getLeads();
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
            <span>{application.id}</span>
            <span>{application.address}</span>
            <span>{application.letter_count}</span>
            <span>£{application.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
