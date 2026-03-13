import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, UserPlus, Settings, LogOut, Zap } from "lucide-react";

const navItems = [
  { to: "/",         icon: LayoutDashboard, label: "Dashboard" },
  { to: "/users",    icon: Users,           label: "Users" },
  { to: "/add-user", icon: UserPlus,        label: "Add User" },
  { to: "/settings", icon: Settings,        label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 flex flex-col z-30"
      style={{ background:"#13131c", borderRight:"1px solid #1f1f2e" }}>

      <div className="flex items-center gap-3 px-6 py-6 mb-2">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center animate-pulse-glow"
          style={{ background:"linear-gradient(135deg,#7c3aed,#4f46e5)" }}>
          <Zap size={18} className="text-white" />
        </div>
        <span className="font-display text-lg font-bold tracking-wide text-white">Seomaniak</span>
      </div>

      <p className="px-6 text-xs font-medium uppercase tracking-widest mb-3" style={{ color:"#4a4a6a" }}>
        Main Menu
      </p>

      <nav className="flex-1 flex flex-col gap-1 px-3">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive ? "text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`
            }
            style={({ isActive }) => isActive ? {
              background:"linear-gradient(135deg,rgba(124,58,237,0.25),rgba(79,70,229,0.15))",
              borderLeft:"2px solid #7c3aed", color:"#c4b5fd"
            } : {}}
          >
            <Icon size={18} />{label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 pb-6">
        <div className="rounded-xl p-4 flex items-center gap-3" style={{ background:"#1a1a28" }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background:"linear-gradient(135deg,#7c3aed,#4f46e5)" }}>FA</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Fahd Ahsayni</p>
            <p className="text-xs truncate" style={{ color:"#6b6b8e" }}>Technical Supervisor</p>
          </div>
          <button className="text-gray-500 hover:text-red-400 transition-colors"><LogOut size={15} /></button>
        </div>
      </div>
    </aside>
  );
}