'use client'
export default function StatCard({
  icon,
  label,
  value,
  desc,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col items-start gap-3 hover:border-cyan-500 transition">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-lg font-semibold">{label}</h3>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}