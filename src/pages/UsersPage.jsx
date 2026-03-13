import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Pencil, Trash2, UserPlus, ChevronUp, ChevronDown } from "lucide-react";
import { useUsers } from "../context/UsersContext";

const avatarColors = ["#7c3aed","#4f46e5","#0ea5e9","#10b981","#f59e0b","#ec4899"];

export default function UsersPage() {
  const { users, deleteUser } = useUsers();
  const [search, setSearch]           = useState("");
  const [sortKey, setSortKey]         = useState("name");
  const [sortDir, setSortDir]         = useState("asc");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = users
    .filter(u =>
      (filterStatus === "All" || u.status === filterStatus) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
       u.email.toLowerCase().includes(search.toLowerCase()) ||
       u.role.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      const av = a[sortKey]?.toLowerCase?.() ?? a[sortKey];
      const bv = b[sortKey]?.toLowerCase?.() ?? b[sortKey];
      return sortDir === "asc" ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

  return (
    <div>
      <div className="flex items-center justify-between mb-8 animate-fade-up">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Users</h1>
          <p style={{ color:"#6b6b8e" }}>{filtered.length} of {users.length} users</p>
        </div>
        <Link to="/add-user" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
          style={{ background:"linear-gradient(135deg,#7c3aed,#4f46e5)" }}>
          <UserPlus size={15} /> Add User
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:"#4a4a6a" }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background:"#13131c", border:"1px solid #1f1f2e", color:"#e8e8f0" }} />
        </div>
        {["All","Active","Inactive","Pending"].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: filterStatus===s ? "rgba(124,58,237,0.2)" : "#13131c",
              border:`1px solid ${filterStatus===s ? "#7c3aed" : "#1f1f2e"}`,
              color: filterStatus===s ? "#c4b5fd" : "#6b6b8e",
            }}>{s}</button>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background:"#13131c", border:"1px solid #1f1f2e" }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom:"1px solid #1f1f2e" }}>
              {[["name","User"],["role","Role"],["status","Status"],["joined","Joined"]].map(([key,label]) => (
                <th key={key} onClick={() => handleSort(key)}
                  className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider cursor-pointer"
                  style={{ color:"#4a4a6a" }}>
                  {label} {sortKey===key ? (sortDir==="asc" ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>) : null}
                </th>
              ))}
              <th className="px-6 py-4 text-xs font-medium uppercase text-right" style={{ color:"#4a4a6a" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0
              ? <tr><td colSpan={5} className="text-center py-16" style={{ color:"#4a4a6a" }}>No users found.</td></tr>
              : filtered.map((user, i) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors"
                  style={{ borderBottom: i < filtered.length-1 ? "1px solid #1a1a28" : "none" }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: avatarColors[i % avatarColors.length] }}>{user.avatar}</div>
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs" style={{ color:"#4a4a6a" }}>{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2.5 py-1 rounded-lg" style={{ background:"#1a1a28", color:"#a78bfa" }}>{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{
                        background: user.status==="Active" ? "rgba(16,185,129,0.12)" : user.status==="Inactive" ? "rgba(239,68,68,0.12)" : "rgba(245,158,11,0.12)",
                        color: user.status==="Active" ? "#4ade80" : user.status==="Inactive" ? "#f87171" : "#fbbf24",
                      }}>{user.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color:"#6b6b8e" }}>{user.joined}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/edit-user/${user.id}`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background:"rgba(79,70,229,0.12)", color:"#818cf8" }}>
                        <Pencil size={13} />
                      </Link>
                      <button onClick={() => deleteUser(user.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background:"rgba(239,68,68,0.1)", color:"#f87171" }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}