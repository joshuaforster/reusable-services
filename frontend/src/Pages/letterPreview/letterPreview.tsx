import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LetterIframe from "../components/iframe";
import { PrimaryButton } from "../../components/buttons";

type Lead = {
  id: number;
  letter_count: number;
  letter_cost: number;
};

export default function LetterPreview() {
  const { id } = useParams();
  const [lead, setLead] = useState<Lead | null>(null);

  useEffect(() => {
    async function getLead() {
      const response = await fetch(`http://127.0.0.1:8000/application/${id}`);
      const data = await response.json();
      setLead(data);
    }

    if (id) {
      getLead();
    }
  }, [id]);

  if (!id) {
    return <p className="text-white text-3xl">No preview available</p>;
  }

  async function handleSend() {
    await fetch(`http://127.0.0.1:8000/send_letter/${id}`, {
      method: "POST",
    });

    // refresh lead after send
    const response = await fetch(`http://127.0.0.1:8000/application/${id}`);
    const data = await response.json();
    setLead(data);
  }

  const alreadySent = lead ? lead.letter_count > 0 : false;

  return (
    <div className="space-y-6">
      <LetterIframe id={id} />

      {lead && (
        <div className="text-sm text-gray-400">
          <p>Letters sent: {lead.letter_count}</p>
          <p>Total cost: £{lead.letter_cost}</p>
        </div>
      )}

      <PrimaryButton onClick={handleSend} disabled={alreadySent}>
        {alreadySent ? "Already Sent" : "Send Letter (£1.20)"}
      </PrimaryButton>
    </div>
  );
}
