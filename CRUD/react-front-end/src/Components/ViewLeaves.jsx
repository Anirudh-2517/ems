import { useEffect, useState } from "react";
import LeaveService from "../Services/LeaveService";
import EmployeeService from "../Services/EmployeeService";

const statusStyle = {
    APPROVED: { bg: "#eaf3de", color: "#3b6d11", dot: "#639922" },
    REJECTED: { bg: "#fcebeb", color: "#a32d2d", dot: "#e24b4a" },
    PENDING:  { bg: "#faeeda", color: "#854f0b", dot: "#ef9f27" },
};

const StatCard = ({ label, value, color, dot, active, onClick }) => (
    <div onClick={onClick} style={{ background: active ? color + "0f" : "#fff", border: active ? `1.5px solid ${color}` : "0.5px solid #e5e7eb", borderRadius: "12px", padding: "16px 22px", minWidth: "130px", cursor: "pointer", transition: "all 0.15s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "6px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: dot, display: "inline-block" }} />
            <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.7px", textTransform: "uppercase", color: "#9ca3af" }}>{label}</span>
        </div>
        <div style={{ fontSize: "28px", fontWeight: "700", color, lineHeight: 1 }}>{value}</div>
    </div>
);

const ViewLeaves = () => {
    const [leaves, setLeaves] = useState([]);
    const [filter, setFilter] = useState(null);

    useEffect(() => {
        LeaveService.getLeaves().then(res => setLeaves(res.data)).catch(console.error);
    }, []);

    const updateStatus = (id, status) =>
        LeaveService.updateLeaveStatus(id, status).then(() =>
            setLeaves(prev => prev.map(l => l.lid === id ? { ...l, status } : l))
        );

    const count = s => leaves.filter(l => l.status === s).length;
    const filtered = filter ? leaves.filter(l => l.status === filter) : leaves;
    const toggleFilter = s => setFilter(prev => prev === s ? null : s);

    const col = { padding: "13px 20px", fontSize: "13px", color: "#374151", borderBottom: "0.5px solid #f3f4f6" };

    return (
        <div style={{ padding: "36px 40px", background: "#f9fafb", minHeight: "100vh", fontFamily: "'Inter', 'DM Sans', sans-serif" }}>

            <div style={{ marginBottom: "32px" }}>
                <h2 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: "700", color: "#111827", letterSpacing: "-0.3px" }}>Leave Requests</h2>
                <p style={{ margin: 0, fontSize: "13px", color: "#9ca3af" }}>{filter ? `Showing ${filtered.length} ${filter.toLowerCase()} · ` : `${leaves.length} total submissions · `}<span onClick={() => setFilter(null)} style={{ color: filter ? "#414447" : "transparent", cursor: "pointer", fontWeight: 600, textDecoration: "underline" }}>Clear filter</span></p>
            </div>

            <div style={{ display: "flex", gap: "14px", marginBottom: "28px" }}>
                <StatCard label="Pending"  value={count("PENDING")}  color={statusStyle.PENDING.color}  dot={statusStyle.PENDING.dot}  active={filter === "PENDING"}  onClick={() => toggleFilter("PENDING")}  />
                <StatCard label="Approved" value={count("APPROVED")} color={statusStyle.APPROVED.color} dot={statusStyle.APPROVED.dot} active={filter === "APPROVED"} onClick={() => toggleFilter("APPROVED")} />
                <StatCard label="Rejected" value={count("REJECTED")} color={statusStyle.REJECTED.color} dot={statusStyle.REJECTED.dot} active={filter === "REJECTED"} onClick={() => toggleFilter("REJECTED")} />
            </div>

            <div style={{ background: "#fff", borderRadius: "12px", border: "0.5px solid #e5e7eb", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#414447" }}>
                            {["#", "Employee ID", "Leave Type", "Start Date", "End Date", "Status", "Action"].map(h => (
                                <th key={h} style={{ padding: "13px 20px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.6px", textTransform: "uppercase", color: "#d1d5db", textAlign: "left" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((leave, i) => {
                            const s = statusStyle[leave.status] || statusStyle.PENDING;
                            return (
                                <tr key={leave.lid} style={{ transition: "background 0.1s" }}
                                    onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
                                    onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                                    <td style={{ ...col, color: "#c4c9d4", fontWeight: "500" }}>{String(i + 1).padStart(2, "0")}</td>
                                    <td style={{ ...col, fontWeight: "600", color: "#111827" }}>{leave.employee?.id}</td>
                                    <td style={col}>{leave.leaveType}</td>
                                    <td style={{ ...col, color: "#6b7280" }}>{leave.startDate}</td>
                                    <td style={{ ...col, color: "#6b7280" }}>{leave.endDate}</td>
                                    <td style={col}>
                                        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: s.bg, color: s.color, padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }}>
                                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.dot }} />
                                            {leave.status.charAt(0) + leave.status.slice(1).toLowerCase()}
                                        </span>
                                    </td>
                                    <td style={col}>
                                        {leave.status === "PENDING" ? (
                                            <div style={{ display: "flex", gap: "8px" }}>
                                                <button onClick={() => updateStatus(leave.lid, "APPROVED")} style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "6px 14px", borderRadius: "7px", border: "0.5px solid #bbf7d0", background: "#f0fdf4", color: "#166534", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                                                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#166534" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                    Approve
                                                </button>
                                                <button onClick={() => updateStatus(leave.lid, "REJECTED")} style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "6px 14px", borderRadius: "7px", border: "0.5px solid #fecaca", background: "#fff5f5", color: "#991b1b", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                                                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="#991b1b" strokeWidth="1.8" strokeLinecap="round"/></svg>
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span style={{ fontSize: "12px", color: "#c4c9d4", fontStyle: "italic" }}>Completed</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewLeaves;