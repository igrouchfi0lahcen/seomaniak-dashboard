import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, User, Mail, Shield, Activity, Calendar } from "lucide-react";
import { useUsers } from "../context/UsersContext";
import { ROLES, STATUSES } from "../data/users";

const inputStyle = {
  background:"#0f0f13", border:"1px solid #1f1f2e", color:"#e8e8f0",
  borderRadius:"12px", padding:"10px 14px", width:"100%",
  fontSize:"14px", outline:"none", transition:"border-color 0.2s",
};

function Field({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color:"#a0a0c0" }}>
        <Icon size={14} style={{ color:"#7c3aed" }} />{label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs" style={{ color:"#f87171" }}>⚠ {error.message}</p>}
    </div>
  );
}

export default function UserFormPage() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const { users, addUser, updateUser } = useUsers();
  const isEdit     = Boolean(id);
  const existing   = isEdit ? users.find(u => u.id === Number(id)) : null;

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm({
    defaultValues: { name:"", email:"", role:"Developer", status:"Active", joined: new Date().toISOString().split("T")[0] },
  });

  useEffect(() => { if (existing) reset(existing); }, [existing, reset]);

  const onSubmit = (data) => {
    if (isEdit) {
      updateUser({ ...existing, ...data });
    } else {
      addUser({ ...data, id: Date.now(), avatar: data.name.split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2) });
    }
    navigate("/users");
  };

  const focus = e => { e.target.style.borderColor = "#7c3aed"; };
  const blur  = e => { e.target.style.borderColor = "#1f1f2e"; };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8 animate-fade-up">
        <button onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background:"#13131c", border:"1px solid #1f1f2e", color:"#6b6b8e" }}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-3xl font-display font-bold text-white">
            {isEdit ? "Edit User" : "Add New User"}
          </h1>
          <p style={{ color:"#6b6b8e" }}>
            {isEdit ? `Editing ${existing?.name}` : "Fill in the details to create a new user."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="rounded-2xl p-8 animate-fade-up"
          style={{ background:"#13131c", border:"1px solid #1f1f2e", animationDelay:"80ms" }}>
          <div className="grid gap-6">
            <Field label="Full Name" icon={User} error={errors.name}>
              <input {...register("name", {
                required:"Full name is required",
                minLength:{ value:3, message:"At least 3 characters" },
                pattern:{ value:/^[a-zA-ZÀ-ÿ\s'-]+$/, message:"Letters only" },
              })} placeholder="e.g. Sofia Andrade" style={inputStyle} onFocus={focus} onBlur={blur} />
            </Field>

            <Field label="Email Address" icon={Mail} error={errors.email}>
              <input {...register("email", {
                required:"Email is required",
                pattern:{ value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message:"Enter a valid email" },
              })} type="email" placeholder="e.g. sofia@seomaniak.ma" style={inputStyle} onFocus={focus} onBlur={blur} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Role" icon={Shield} error={errors.role}>
                <select {...register("role", { required:"Role is required" })}
                  style={{ ...inputStyle, cursor:"pointer" }} onFocus={focus} onBlur={blur}>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
              <Field label="Status" icon={Activity} error={errors.status}>
                <select {...register("status", { required:"Status is required" })}
                  style={{ ...inputStyle, cursor:"pointer" }} onFocus={focus} onBlur={blur}>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Join Date" icon={Calendar} error={errors.joined}>
              <input {...register("joined", { required:"Date is required" })}
                type="date" style={{ ...inputStyle, colorScheme:"dark" }} onFocus={focus} onBlur={blur} />
            </Field>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 animate-fade-up" style={{ animationDelay:"160ms" }}>
          <button type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white hover:opacity-90"
            style={{ background:"linear-gradient(135deg,#7c3aed,#4f46e5)" }}>
            <Save size={15} />{isEdit ? "Save Changes" : "Create User"}
          </button>
          <button type="button" onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl text-sm font-medium"
            style={{ background:"#13131c", border:"1px solid #1f1f2e", color:"#6b6b8e" }}>
            Cancel
          </button>
          {isEdit && isDirty && (
            <p className="text-xs ml-auto" style={{ color:"#f59e0b" }}>● Unsaved changes</p>
          )}
        </div>
      </form>
    </div>
  );
}