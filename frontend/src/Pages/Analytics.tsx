import {useState, useEffect} from 'react'

type DashboardMetrics = {
  total_spend: number;
  total_letters: number;
};

type Lead = {
  id: number;
  external_id: number;
  ref: string;
  address: string;
  letter_count: number;
  letter_cost: number;
  created_at?: string
};



export default function Analytics() {
    const [metrics, setMetrics] = useState<DashboardMetrics>()
    const [leads, setLeads] = useState<Lead[]>([]);

      useEffect(() => {
        async function getAllLeads() {
          const response = await fetch(
            `http://127.0.0.1:8000/applications`,
          );
          const result = await response.json();
          setLeads(result.data);

        }

        getAllLeads();
      }, []);

    const topLeads = [...leads]
      .sort((a, b) => b.letter_count - a.letter_count)
      .slice(0, 5);

      const recentLeads = [...leads]
        .filter((lead) => lead.letter_count > 0)
        .sort(
          (a, b) =>
            new Date(b.created_at!).getTime() -
            new Date(a.created_at!).getTime(),
          //   Only use ! when you KNOW backend always sends it
        )
        .slice(0, 5);
      

    useEffect(()=>{
        async function getMetrics(){
            const response = await fetch(`http://127.0.0.1:8000/dashboard`);
            const data = await response.json()
            setMetrics(data)
        }
        getMetrics()

    },[])


  const avgCost =
    metrics && metrics.total_letters > 0
    ? metrics.total_spend / metrics.total_letters
    : 0;


  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 border border-gray-800 bg-gray-900">
        <p className="text-sm text-gray-400">Total Spend</p>
        <p className="text-xl">£{metrics?.total_spend.toFixed(2)}</p>
      </div>

      <div className="p-4 border border-gray-800 bg-gray-900">
        <p className="text-sm text-gray-400">Total Letters</p>
        <p className="text-xl">{metrics?.total_letters}</p>
      </div>

      <div className="p-4 border border-gray-800 bg-gray-900">
        <p className="text-sm text-gray-400">Avg Cost / Letter</p>
        <p className="text-xl">£{avgCost.toFixed(2)}</p>
      </div>

      <div className="mt-6 border border-gray-800 bg-gray-900 p-4">
        <p className="text-sm text-gray-400 mb-3">Top Leads</p>

        {topLeads.map((lead) => (
          <div
            key={lead.id}
            className="flex justify-between text-sm border-b border-gray-800 py-2"
          >
            <span>{lead.address}</span>
            <span>{lead.letter_count}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 border border-gray-800 bg-gray-900 p-4">
        <p className="text-sm text-gray-400 mb-3">Recent Activity</p>
        {recentLeads.map((lead) => {
          const formattedDate = new Date(lead.created_at!).toLocaleString();

          return (
            <div
              key={lead.id}
              className="flex justify-between text-sm border-b border-gray-800 py-2"
            >
              <div>
                <p>{lead.address}</p>
                <p className="text-xs text-gray-500">{formattedDate}</p>
              </div>

              <span>Sent {lead.letter_count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
