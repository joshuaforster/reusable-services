import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE } from "../config";
import type { Application } from "../types";

export default function ApplicationDetail() {
  const [application, setApplication] = useState<Application | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function load() {
      const response = await fetch(`${API_BASE}/application/${id}`);
      const data = await response.json();
      setApplication(data);
    }

    load();
  }, [id]);

  async function submitLetter(applicationId: string) {
    const response = await fetch(`${API_BASE}/send_letter/${applicationId}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to send letter");
    }

    const updated = await fetch(`${API_BASE}/application/${applicationId}`);
    const updatedData = await updated.json();
    setApplication(updatedData);
  }

  if (!application) {
    return <p className="text-white p-6">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 border border-gray-700 hover:bg-white/10 text-sm"
      >
        ← Back
      </button>

      <div className="max-w-3xl border border-gray-800 bg-gray-900 p-6 space-y-6">
        <div className="border-b border-gray-800 pb-4">
          <h1 className="text-2xl font-semibold">Application Details</h1>
          <p className="text-sm text-gray-400">Ref: {application.reference}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-1">Address</p>
          <p className="text-lg">{application.address}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-1">Proposal</p>
          <p className="text-sm text-gray-200">{application.proposal}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-800 p-4">
            <p className="text-sm text-gray-400">Letters Sent</p>
            <p className="text-xl">{application.letter_count}</p>
          </div>

          <div className="border border-gray-800 p-4">
            <p className="text-sm text-gray-400">Total Cost</p>
            <p className="text-xl">£{application.total_cost}</p>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Link
            to={`/preview/${application.id}`}
            className="px-4 py-2 border border-gray-700 hover:bg-white/10 text-sm"
          >
            Preview
          </Link>

          <button
            onClick={() => submitLetter(application.id)}
            className="px-4 py-2 border border-gray-700 hover:bg-white/10 text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
