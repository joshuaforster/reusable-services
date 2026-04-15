import { useState, useEffect } from "react";
import { API_BASE } from "../config";
import type { Application } from "../types";

type Campaign = {
  id: number;
  name: string;
  applicationIds: string[];
};

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [name, setName] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    async function load() {
      const response = await fetch(`${API_BASE}/applications`);
      const result = await response.json();
      setApplications(result.data ?? []);
    }

    load();
  }, []);

  function addCampaign() {
    setCampaigns([
      ...campaigns,
      { id: Date.now(), name, applicationIds: [] },
    ]);
    setName("");
  }

  function addApplicationToCampaign(campaignId: number, applicationId: string) {
    setCampaigns(
      campaigns.map((c) =>
        c.id === campaignId
          ? { ...c, applicationIds: [...c.applicationIds, applicationId] }
          : c,
      ),
    );
  }

  return (
    <div className="max-w-4xl text-white p-6">
      <h1 className="text-2xl mb-6">Campaigns</h1>

      <div className="mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Campaign name"
          className="bg-gray-800 border border-gray-700 p-2 mr-2"
        />

        <button
          onClick={addCampaign}
          className="px-3 py-2 border border-gray-700 hover:bg-white/10"
        >
          Add
        </button>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="border border-gray-800 p-4 bg-gray-900">
            <p className="font-semibold">{campaign.name}</p>
            <p className="text-xs text-gray-400 mb-3">
              Applications: {campaign.applicationIds.length}
            </p>

            <div className="flex gap-2 flex-wrap">
              {applications.map((application) => (
                <button
                  key={application.id}
                  onClick={() => addApplicationToCampaign(campaign.id, application.id)}
                  className="text-xs border border-gray-700 px-2 py-1"
                >
                  Add {application.reference}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
