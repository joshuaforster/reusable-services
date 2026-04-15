type MetricCardProps = {
  label: string;
  value: string | number;
};

export default function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="p-4 bg-gray-900 border border-gray-800">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-xl">{value}</p>
    </div>
  );
}
