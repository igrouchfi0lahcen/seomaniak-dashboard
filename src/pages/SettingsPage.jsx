import { Bell, Lock, Globe, Palette } from "lucide-react";

const sections = [
  { icon: Bell,    label: "Notifications", settings: [
    { label:"Email notifications", desc:"Receive updates via email",    on: true  },
    { label:"Push alerts",         desc:"Browser push notifications",   on: false },
  ]},
  { icon: Lock,    label: "Security",      settings: [
    { label:"Two-factor auth",  desc:"Require 2FA on login",      on: false },
    { label:"Session timeout",  desc:"Auto logout after 30 min",  on: true  },
  ]},
  { icon: Globe,   label: "Regional",      settings: [
    { label:"Timezone", desc:"Africa/Casablanca (GMT+1)", on: true },
    { label:"Language", desc:"English (EN)",              on: true },
  ]},
  { icon: Palette, label: "Appearance",    settings: [
    { label:"Dark mode",       desc:"Use dark color scheme",  on: true  },
    { label:"Compact sidebar", desc:"Reduce sidebar padding", on: false },
  ]},
];

function Toggle({ on }) {
  return (
    <div className="w-11 h-6 rounded-full relative"
      style={{ background: on ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#2a2a3a" }}>
      <div className="w-4 h-4 rounded-full bg-white absolute top-1 transition-all"
        style={{ left: on ? "calc(100% - 20px)" : "4px" }} />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8 animate-fade-up">
        <h1 className="text-3xl font-display font-bold text-white">Settings</h1>
        <p style={{ color:"#6b6b8e" }}>Manage your dashboard preferences.</p>
      </div>
      <div className="space-y-4">
        {sections.map(({ icon: Icon, label, settings }, si) => (
          <div key={label} className="rounded-2xl p-6 animate-fade-up"
            style={{ background:"#13131c", border:"1px solid #1f1f2e", animationDelay:`${si*80}ms` }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:"rgba(124,58,237,0.15)" }}>
                <Icon size={16} style={{ color:"#a78bfa" }} />
              </div>
              <h2 className="font-display font-bold text-white">{label}</h2>
            </div>
            <div className="space-y-4">
              {settings.map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{s.label}</p>
                    <p className="text-xs mt-0.5" style={{ color:"#4a4a6a" }}>{s.desc}</p>
                  </div>
                  <Toggle on={s.on} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}