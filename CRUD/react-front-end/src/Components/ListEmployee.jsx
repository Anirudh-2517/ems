import { useEffect, useState } from "react";
import EmployeeService from "../Services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ViewIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
);
const EditIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
);
const TrashIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
        <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
);

const initials = (f, l) => `${f?.[0] ?? ""}${l?.[0] ?? ""}`.toUpperCase();

const avatarColors = ["#e0e7ff", "#fce7f3", "#d1fae5", "#fef3c7", "#fee2e2", "#e0f2fe"];
const avatarText   = ["#4338ca", "#be185d", "#065f46", "#92400e", "#991b1b", "#0369a1"];
const colorIndex   = (id) => (typeof id === "number" ? id : String(id).charCodeAt(0)) % avatarColors.length;

const ListEmployee = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);

    const editEmployee = (id) => navigate(`/add-employee/${id}`);
    const deleteEmployee = (id) => {
        EmployeeService.DeleteEmployee(id).then(() =>
            setEmployees(employees.filter(emp => emp.id !== id))
        );
    };
    const viewEmployee = (id) => navigate(`/view-employee/${id}`);

    useEffect(() => {
        EmployeeService.getEmployees().then((res) => setEmployees(res.data)).catch(err => console.log(err));
    }, []);

    const col = { padding: "13px 20px", fontSize: "13px", color: "#374151", borderBottom: "0.5px solid #f3f4f6", verticalAlign: "middle" };

    return (
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px" }}>
                <div>
                    <h2 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: "700", color: "#111827", letterSpacing: "-0.3px" }}>Employees</h2>
                    <p style={{ margin: 0, fontSize: "13px", color: "#9ca3af" }}>{employees.length} total members</p>
                </div>
                <button
                    onClick={() => navigate("/add-employee/:id")}
                    style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "9px 18px", background: "#414447", border: "none", borderRadius: "9px", color: "#fff", fontSize: "13px", fontWeight: "600", cursor: "pointer", letterSpacing: "0.2px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add Employee
                </button>
            </div>

            <div style={{ background: "#fff", borderRadius: "12px", border: "0.5px solid #e5e7eb", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#414447" }}>
                            {["#", "Employee", "Email", "Actions"].map(h => (
                                <th key={h} style={{ padding: "13px 20px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.6px", textTransform: "uppercase", color: "#d1d5db", textAlign: h === "Actions" ? "center" : "left" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan={4} style={{ padding: "48px", textAlign: "center", color: "#c4c9d4", fontSize: "13px" }}>No employees found</td>
                            </tr>
                        ) : employees.map((employee, index) => {
                            const ci = colorIndex(employee.id);
                            return (
                                <tr key={employee.id}
                                    onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
                                    onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                                    style={{ transition: "background 0.1s" }}>
                                    <td style={{ ...col, color: "#c4c9d4", fontWeight: "500", width: "52px" }}>{String(index + 1).padStart(2, "0")}</td>
                                    <td style={{ ...col }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                                            <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: avatarColors[ci], color: avatarText[ci], display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", flexShrink: 0 }}>
                                                {initials(employee.firstName, employee.lastName)}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: "600", color: "#111827", fontSize: "14px" }}>{employee.firstName} {employee.lastName}</div>
                                                <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "1px" }}>ID · {employee.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ ...col, color: "#6b7280" }}>{employee.email}</td>
                                    <td style={{ ...col, textAlign: "center" }}>
                                        <div style={{ display: "inline-flex", gap: "4px" }}>
                                            {[
                                                { action: () => viewEmployee(employee.id),   icon: <ViewIcon />,  title: "View",   hover: "#e0f2fe", color: "#0369a1" },
                                                { action: () => editEmployee(employee.id),   icon: <EditIcon />,  title: "Edit",   hover: "#f0fdf4", color: "#166534" },
                                                { action: () => deleteEmployee(employee.id), icon: <TrashIcon />, title: "Delete", hover: "#fff5f5", color: "#991b1b" },
                                            ].map(({ action, icon, title, hover, color }) => (
                                                <button key={title} onClick={action} title={title}
                                                    onMouseEnter={e => { e.currentTarget.style.background = hover; e.currentTarget.style.color = color; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9ca3af"; }}
                                                    style={{ width: "30px", height: "30px", borderRadius: "7px", border: "none", background: "transparent", color: "#9ca3af", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s" }}>
                                                    {icon}
                                                </button>
                                            ))}
                                        </div>
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

export default ListEmployee;