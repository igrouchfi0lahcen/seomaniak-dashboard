import { Users, UserCheck, UserX, Clock, TrendingUp, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { useUsers } from "../context/UsersContext";
import StatCard from "../components/StatCard";

const avatarColors = ["#7c3aed","#4f46e5","#0ea5e9","#10b981","#f59e0b","#ec4899"];

export default function Dashboard() {
  const { users } = useUsers();
  const active   = users.filter(u => u.status === "Active").length;
  const inactive = users.filter(u => u.status === "Inactive").length;
  const pending  = users.filter(u => u.status === "Pending").length;

  const stats = [
    { icon: Users,     label: "Total Users",    value: users.length, change: 12,  color: "#7c3aed" },
    { icon: UserCheck, label: "Active Users",   value: active,       change: 8,   color: "#10b981" },
    { icon: UserX,     label: "Inactive Users", value: inactive,     change: -3,  color: "#f87171" },
    { icon: Clock,     label: "Pending",        value: pending,      change: 5,   color: "#f59e0b" },
  ];

  return (
    <div>
      <div className="mb-8 animate-fade-up">
        <h1 className="text-3xl font-display font-bold text-white mb-1">Welcome back 👋</h1>
        <p style={{ color:"#6b6b8e" }}>Here's what's happening with your team today.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 80} />)}
      </div>

      <div className="grid gap-6" style={{ gridTemplateColumns:"1fr 320px" }}>
        {/* Recent users table */}
        <div className="rounded-2xl animate-fade-up" style={{ background:"#13131c", border:"1px solid #1f1f2e", animationDelay:"320ms" }}>
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <h2 className="font-display font-bold text-white text-lg">Recent Users</h2>
            <Link to="/users" className="text-xs font-medium px-3 py-1.5 rounded-lg"
              style={{ color:"#7c3aed", background:"rgba(124,58,237,0.1)" }}>View all →</Link>
          </div>
          <div className="px-6 pb-6">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom:"1px solid #1f1f2e" }}>
                  {["User","Role","Status","Joined"].map(h => (
                    <th key={h} className="text-left pb-3 text-xs font-medium uppercase tracking-wider" style={{ color:"#4a4a6a" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.slice(0,5).map((user, i) => (
                  <tr key={user.id} style={{ borderBottom: i < 4 ? "1px solid #1a1a28" : "none" }}>
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: avatarColors[i % avatarColors.length] }}>{user.avatar}</div>
                        <div>
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs" style={{ color:"#4a4a6a" }}>{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className="text-xs px-2 py-1 rounded-lg" style={{ background:"#1a1a28", color:"#a78bfa" }}>{user.role}</span>
                    </td>
                    <td className="py-3.5">
                      <span className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{
                          background: user.status==="Active" ? "rgba(16,185,129,0.12)" : user.status==="Inactive" ? "rgba(239,68,68,0.12)" : "rgba(245,158,11,0.12)",
                          color: user.status==="Active" ? "#4ade80" : user.status==="Inactive" ? "#f87171" : "#fbbf24",
                        }}>{user.status}</span>
                    </td>
                    <td className="py-3.5 text-xs" style={{ color:"#6b6b8e" }}>{user.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity feed */}
        <div className="rounded-2xl animate-fade-up" style={{ background:"#13131c", border:"1px solid #1f1f2e", animationDelay:"400ms" }}>
          <div className="flex items-center gap-2 px-6 pt-6 pb-4">
            <Activity size={16} style={{ color:"#7c3aed" }} />
            <h2 className="font-display font-bold text-white text-lg">Activity</h2>
          </div>
          <div className="px-6 pb-6 space-y-4">
            {[
              { text:"Sofia added a new user",    time:"2 min ago", dot:"#10b981" },
              { text:"Karim updated his profile", time:"1h ago",    dot:"#7c3aed" },
              { text:"Nora was set to inactive",  time:"3h ago",    dot:"#f87171" },
              { text:"Youssef joined the team",   time:"1d ago",    dot:"#f59e0b" },
              { text:"Dashboard was accessed",    time:"2d ago",    dot:"#0ea5e9" },
              { text:"System settings updated",   time:"3d ago",    dot:"#6b6b8e" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background:a.dot }} />
                <div>
                  <p className="text-sm text-white">{a.text}</p>
                  <p className="text-xs mt-0.5" style={{ color:"#4a4a6a" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl p-6 flex items-center justify-between animate-fade-up"
        style={{ background:"linear-gradient(135deg,rgba(124,58,237,0.15),rgba(79,70,229,0.08))", border:"1px solid rgba(124,58,237,0.2)", animationDelay:"480ms" }}>
        <div className="flex items-center gap-3">
          <TrendingUp size={22} style={{ color:"#a78bfa" }} />
          <div>
            <p className="font-display font-bold text-white">Ready to grow your team?</p>
            <p className="text-sm" style={{ color:"#6b6b8e" }}>Add a new user and assign their role.</p>
          </div>
        </div>
        <Link to="/add-user" className="px-5 py-2.5 rounded-xl text-sm font-medium text-white"
          style={{ background:"linear-gradient(135deg,#7c3aed,#4f46e5)" }}>+ Add User</Link>
      </div>
    </div>
  );
}