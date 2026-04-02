import { useEffect, useState } from "react";
import LeaveService from "../Services/LeaveService";
import EmployeeService from "../Services/EmployeeService";

const icons = {
    employees: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
    ),
    pending: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
    ),
    approved: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
        </svg>
    ),
    rejected: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
    ),
    leaves: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
    ),
};

const statusStyle = {
    APPROVED: { bg: "#eaf3de", color: "#3b6d11", dot: "#639922" },
    REJECTED: { bg: "#fcebeb", color: "#a32d2d", dot: "#e24b4a" },
    PENDING:  { bg: "#faeeda", color: "#854f0b", dot: "#ef9f27" },
};

const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
};

const StatCard = ({ icon, label, value, accent, sub }) => (
    <div style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: "14px", padding: "22px 24px", display: "flex", flexDirection: "column", gap: "14px", flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: accent + "15", color: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {icon}
            </div>
        </div>
        <div>
            <div style={{ fontSize: "30px", fontWeight: "700", color: "#111827", letterSpacing: "-1px", lineHeight: 1 }}>{value ?? "—"}</div>
            <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "5px", fontWeight: "500" }}>{label}</div>
            {sub && <div style={{ fontSize: "11px", color: accent, marginTop: "4px", fontWeight: "600" }}>{sub}</div>}
        </div>
    </div>
);

const AdminDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    const adminName = localStorage.getItem("adminName") || "Admin User";
    const today = new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

    useEffect(() => {
        Promise.all([
            EmployeeService.getEmployees().then(r => setEmployees(r.data)),
            LeaveService.getLeaves().then(r => setLeaves(r.data)),
        ])
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const count = s => leaves.filter(l => l.status === s).length;
    const recentLeaves = [...leaves].reverse().slice(0, 5);

    const col = { padding: "13px 18px", fontSize: "13px", color: "#374151", borderBottom: "0.5px solid #f3f4f6" };

    if (loading) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", color: "#9ca3af", fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}>
            Loading dashboard...
        </div>
    );

    return (
        <div style={{ padding: "36px 20px", background: "#f9fafb", minHeight: "100vh", fontFamily: "'DM Sans', 'Inter', sans-serif'" }}>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", gap: "12px" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#9ca3af", fontWeight: "500" }}>{today}</p>
                    <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "700", color: "#111827", letterSpacing: "-0.5px" }}>
                        {getGreeting()}, {adminName.split(" ")[0]} 👋
                    </h1>
                    <p style={{ margin: "6px 0 0", fontSize: "14px", color: "#6b7280" }}>Here's what's happening across your organization today.</p>
                </div>
                <div style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: "10px", padding: "10px 18px", fontSize: "13px", color: "#374151", fontWeight: "500", minWidth: "100px", textAlign: "center" }}>
                    {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </div>
            </div>

            <div style={{ display: "flex", gap: "16px", marginBottom: "28px", flexWrap: "wrap" }}>
                <StatCard icon={icons.employees} label="Total Employees"  value={employees.length}   accent="#414447" sub="Active workforce" />
                <StatCard icon={icons.leaves}    label="Total Requests"   value={leaves.length}      accent="#6366f1" sub="All time" />
                <StatCard icon={icons.pending}   label="Pending Approval" value={count("PENDING")}   accent="#f59e0b" sub={count("PENDING") > 0 ? "Needs attention" : "All clear"} />
                <StatCard icon={icons.approved}  label="Approved Leaves"  value={count("APPROVED")}  accent="#22c55e" />
                <StatCard icon={icons.rejected}  label="Rejected Leaves"  value={count("REJECTED")}  accent="#ef4444" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>

                <div style={{ background: "#fff", borderRadius: "14px", border: "0.5px solid #e5e7eb", overflow: "hidden" }}>
                    <div style={{ padding: "20px 24px 16px", borderBottom: "0.5px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#111827" }}>Recent Leave Requests</h3>
                            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#9ca3af" }}>Latest {recentLeaves.length} submissions</p>
                        </div>
                    </div>
                    {recentLeaves.length === 0 ? (
                        <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af", fontSize: "13px" }}>No leave requests yet</div>
                    ) : (
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ background: "#f9fafb" }}>
                                        {["Employee", "Type", "Duration", "Status"].map(h => (
                                            <th key={h} style={{ padding: "10px 18px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase", color: "#9ca3af", textAlign: "left" }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentLeaves.map(leave => {
                                        const s = statusStyle[leave.status] || statusStyle.PENDING;
                                        const days = leave.startDate && leave.endDate
                                            ? Math.max(1, Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / 86400000) + 1)
                                            : "—";
                                        return (
                                            <tr key={leave.lid} onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"} onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                                                <td style={{ ...col, fontWeight: "600", color: "#111827" }}>{leave.employee?.id ?? "—"}</td>
                                                <td style={col}>{leave.leaveType}</td>
                                                <td style={{ ...col, color: "#6b7280" }}>{days} day{days !== 1 ? "s" : ""}</td>
                                                <td style={col}>
                                                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: s.bg, color: s.color, padding: "3px 9px", borderRadius: "5px", fontSize: "11px", fontWeight: "600" }}>
                                                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: s.dot }} />
                                                        {leave.status.charAt(0) + leave.status.slice(1).toLowerCase()}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div style={{ background: "#fff", borderRadius: "14px", border: "0.5px solid #e5e7eb", overflow: "hidden" }}>
                    <div style={{ padding: "20px 24px 16px", borderBottom: "0.5px solid #f3f4f6" }}>
                        <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#111827" }}>Leave Breakdown</h3>
                        <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#9ca3af" }}>Status distribution</p>
                    </div>
                    <div style={{ padding: "24px" }}>
                        {leaves.length === 0 ? (
                            <div style={{ textAlign: "center", color: "#9ca3af", fontSize: "13px", padding: "20px 0" }}>No data available</div>
                        ) : (
                            [
                                { label: "Approved", key: "APPROVED", ...statusStyle.APPROVED },
                                { label: "Pending",  key: "PENDING",  ...statusStyle.PENDING  },
                                { label: "Rejected", key: "REJECTED", ...statusStyle.REJECTED },
                            ].map(({ label, key, bg, color, dot }) => {
                                const val = count(key);
                                const pct = leaves.length ? Math.round((val / leaves.length) * 100) : 0;
                                return (
                                    <div key={key} style={{ marginBottom: "20px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>
                                                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: dot }} />
                                                {label}
                                            </span>
                                            <span style={{ fontSize: "13px", color: "#6b7280" }}>{val} &nbsp;<span style={{ color: "#c4c9d4" }}>· {pct}%</span></span>
                                        </div>
                                        <div style={{ height: "6px", background: "#f3f4f6", borderRadius: "99px", overflow: "hidden" }}>
                                            <div style={{ height: "100%", width: `${pct}%`, background: dot, borderRadius: "99px", transition: "width 0.6s ease" }} />
                                        </div>
                                    </div>
                                );
                            })
                        )}

                        {leaves.length > 0 && (
                            <div style={{ marginTop: "28px", padding: "16px", background: "#f9fafb", borderRadius: "10px", border: "0.5px solid #f3f4f6" }}>
                                <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: "600", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Approval Rate</p>
                                <p style={{ margin: 0, fontSize: "26px", fontWeight: "700", color: "#111827", letterSpacing: "-0.5px" }}>
                                    {leaves.length ? Math.round((count("APPROVED") / leaves.length) * 100) : 0}%
                                    <span style={{ fontSize: "13px", fontWeight: "400", color: "#9ca3af", marginLeft: "8px" }}>of all requests approved</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;