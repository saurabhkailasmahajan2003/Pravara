import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

function number(val) {
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
}

function emptyForm() {
  return {
    id: "",
    name: "",
    monthlySalary: "",
    mobileRecharge: "0",
    travelAllowance: "0",
    otherExpenses: "0",
  };
}

export default function Employees() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [errors, setErrors] = useState({});

  // Load/save from localStorage so data persists across refreshes
  useEffect(() => {
    const saved = localStorage.getItem("employees");
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(items));
  }, [items]);

  const totals = useMemo(() => {
    const totalEmployees = items.length;
    const totalPayroll = items.reduce((acc, e) => acc + number(e.monthlySalary) + number(e.mobileRecharge) + number(e.travelAllowance) + number(e.otherExpenses), 0);
    return { totalEmployees, totalPayroll };
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(e =>
      e.id.toLowerCase().includes(q) ||
      e.name.toLowerCase().includes(q)
    );
  }, [items, search]);

  function validate(f) {
    const err = {};
    if (!f.id) err.id = "Required";
    if (!f.name) err.name = "Required";
    const fields = ["monthlySalary", "mobileRecharge", "travelAllowance", "otherExpenses"];
    for (const key of fields) {
      const v = f[key];
      if (v === "" || v === null || v === undefined) {
        err[key] = "Required";
      } else if (Number.isNaN(Number(v)) || Number(v) < 0) {
        err[key] = "Must be a non-negative number";
      }
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!validate(form)) return;
    const record = {
      id: String(form.id).trim(),
      name: String(form.name).trim(),
      monthlySalary: Number(form.monthlySalary),
      mobileRecharge: Number(form.mobileRecharge),
      travelAllowance: Number(form.travelAllowance),
      otherExpenses: Number(form.otherExpenses),
    };
    if (editingIndex === null) {
      // prevent duplicate ids
      if (items.some(x => x.id.toLowerCase() === record.id.toLowerCase())) {
        setErrors({ id: "ID already exists" });
        return;
      }
      setItems(prev => [...prev, record]);
    } else {
      setItems(prev => prev.map((x, i) => (i === editingIndex ? record : x)));
    }
    closeForm();
  }

  function openAdd() {
    setForm(emptyForm());
    setEditingIndex(null);
    setErrors({});
    setOpen(true);
  }

  function openEdit(index) {
    const e = items[index];
    setForm({
      id: e.id,
      name: e.name,
      monthlySalary: String(e.monthlySalary),
      mobileRecharge: String(e.mobileRecharge),
      travelAllowance: String(e.travelAllowance),
      otherExpenses: String(e.otherExpenses),
    });
    setEditingIndex(index);
    setErrors({});
    setOpen(true);
  }

  function closeForm() {
    setOpen(false);
    setErrors({});
  }

  function remove(index) {
    const e = items[index];
    if (confirm(`Delete employee ${e.name}?`)) {
      setItems(prev => prev.filter((_, i) => i !== index));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Employees</h2>
          <p className="text-xs text-slate-500">Manage employee records. Add, edit, or delete entries.</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-md bg-black text-white px-3 py-2 text-sm font-medium hover:bg-black">
          <Plus size={16} /> Add Employee
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <SummaryCard label="Total Employees" value={totals.totalEmployees} />
        <SummaryCard label="Total Monthly Cost" value={`₹${totals.totalPayroll.toLocaleString()}`} />
        <div className="col-span-2 sm:col-span-2">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by ID or name" className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-[900px] w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <Th>ID</Th>
              <Th>Name</Th>
              <Th className="text-right">Monthly Salary</Th>
              <Th className="text-right">Mobile Recharge</Th>
              <Th className="text-right">Travel Allowance</Th>
              <Th className="text-right">Other Expenses</Th>
              <Th className="text-right">Total</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((e, i) => {
              const total = e.monthlySalary + e.mobileRecharge + e.travelAllowance + e.otherExpenses;
              return (
                <tr key={i}>
                  <Td>{e.id}</Td>
                  <Td>{e.name}</Td>
                  <TdRight>₹{e.monthlySalary.toLocaleString()}</TdRight>
                  <TdRight>₹{e.mobileRecharge.toLocaleString()}</TdRight>
                  <TdRight>₹{e.travelAllowance.toLocaleString()}</TdRight>
                  <TdRight>₹{e.otherExpenses.toLocaleString()}</TdRight>
                  <TdRight className="font-medium">₹{total.toLocaleString()}</TdRight>
                  <TdRight>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(i)} className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50"><Pencil size={14} /> Edit</button>
                      <button onClick={() => remove(i)} className="inline-flex items-center gap-1 rounded-md border border-rose-200 text-rose-700 px-2 py-1 hover:bg-rose-50"><Trash2 size={14} /> Delete</button>
                    </div>
                  </TdRight>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td className="py-6 text-center text-slate-500" colSpan={8}>No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/10">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">{editingIndex === null ? "Add Employee" : "Edit Employee"}</h3>
              <button onClick={closeForm} className="rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50">Close</button>
            </div>
            <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Employee ID" error={errors.id}>
                <input value={form.id} onChange={e=>setForm({...form, id: e.target.value})} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              </Field>
              <Field label="Employee Name" error={errors.name}>
                <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              </Field>
              <Field label="Monthly Salary (₹)" error={errors.monthlySalary}>
                <input type="number" min="0" value={form.monthlySalary} onChange={e=>setForm({...form, monthlySalary: e.target.value})} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              </Field>
              <Field label="Mobile Recharge (₹)" error={errors.mobileRecharge}>
                <input type="number" min="0" value={form.mobileRecharge} onChange={e=>setForm({...form, mobileRecharge: e.target.value})} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              </Field>
              <Field label="Travel Allowance (₹)" error={errors.travelAllowance}>
                <input type="number" min="0" value={form.travelAllowance} onChange={e=>setForm({...form, travelAllowance: e.target.value})} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              </Field>
              <Field label="Other Expenses (₹)" error={errors.otherExpenses}>
                <input type="number" min="0" value={form.otherExpenses} onChange={e=>setForm({...form, otherExpenses: e.target.value})} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              </Field>
              <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                <button type="button" onClick={closeForm} className="rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">Cancel</button>
                <button type="submit" className="rounded-md bg-black text-white px-3 py-2 text-sm font-medium hover:bg-black">{editingIndex === null ? "Add" : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function Th({ children, className = "" }) {
  return <th className={`py-2 pr-4 font-medium ${className}`}>{children}</th>;
}
function Td({ children }) {
  return <td className="py-3 pr-4">{children}</td>;
}
function TdRight({ children, className = "" }) {
  return <td className={`py-3 pr-4 text-right ${className}`}>{children}</td>;
}

function Field({ label, error, children }) {
  return (
    <label className="block text-sm">
      <span className="text-slate-700">{label}</span>
      <div className="mt-1">{children}</div>
      {error && <div className="mt-1 text-xs text-rose-600">{error}</div>}
    </label>
  );
}
