import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LetterIframe from "../components/LetterIframe";
import { PrimaryButton } from "../components/buttons";
import { API_BASE } from "../config";
import type { Application } from "../types";

export default function LetterPreview() {
  const { id } = useParams();
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    if (!id) return;

    async function load() {
      const response = await fetch(`${API_BASE}/application/${id}`);
      const data = await response.json();
      setApplication(data);
    }

    load();
  }, [id]);

  if (!id) {
    return <p className="text-white text-3xl">No preview available</p>;
  }

  async function handleSend() {
    await fetch(`${API_BASE}/send_letter/${id}`, { method: "POST" });

    const response = await fetch(`${API_BASE}/application/${id}`);
    const data = await response.json();
    setApplication(data);
  }

  const alreadySent = application ? application.letter_count > 0 : false;

  return (
    <div className="space-y-6">
      <LetterIframe id={id} />

      {application && (
        <div className="text-sm text-gray-400">
          <p>Letters sent: {application.letter_count}</p>
          <p>Total cost: £{application.total_cost}</p>
        </div>
      )}

      <PrimaryButton onClick={handleSend} disabled={alreadySent}>
        {alreadySent ? "Already Sent" : "Send Letter (£1.20)"}
      </PrimaryButton>
    </div>
  );
}
