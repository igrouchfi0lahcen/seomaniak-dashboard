export default function StatCard({ icon: Icon, label, value, change, color, delay = 0 }) {
  const isPositive = change >= 0;
  return (
    <div className="rounded-2xl p-6 card-hover animate-fade-up"
      style={{ background:"#13131c", border:"1px solid #1f1f2e", animationDelay:`${delay}ms` }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background:`${color}18` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-lg"
          style={{
            background: isPositive ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
            color: isPositive ? "#4ade80" : "#f87171",
          }}>
          {isPositive ? "+" : ""}{change}%
        </span>
      </div>
      <p className="text-3xl font-display font-bold text-white mb-1">{value}</p>
      <p className="text-sm" style={{ color:"#6b6b8e" }}>{label}</p>
    </div>
  );
}