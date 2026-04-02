import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../Services/EmployeeService";

const avatarColors = ["#e0e7ff", "#fce7f3", "#d1fae5", "#fef3c7", "#fee2e2", "#e0f2fe"];
const avatarText   = ["#4338ca", "#be185d", "#065f46", "#92400e", "#991b1b", "#0369a1"];
const colorIndex   = (id) => (typeof id === "number" ? id : String(id).charCodeAt(0)) % avatarColors.length;
const initials     = (f, l) => `${f?.[0] ?? ""}${l?.[0] ?? ""}`.toUpperCase();

const Field = ({ label, value, icon }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 0", borderBottom: "0.5px solid #f3f4f6" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#6b7280" }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: "11px", fontWeight: "600", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "3px" }}>{label}</div>
            <div style={{ fontSize: "15px", fontWeight: "600", color: "#111827" }}>{value ?? "—"}</div>
        </div>
    </div>
);

const ViewEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        if (id) EmployeeService.getEmployeeById(id).then(res => setEmployee(res.data)).catch(console.error);
    }, [id]);

    const ci = colorIndex(Number(id) || 0);

    return (
        <div style={{ padding: "36px 40px", background: "#f9fafb", minHeight: "100vh", fontFamily: "'DM Sans', 'Inter', sans-serif" }}>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                <button onClick={() => navigate("/employees ")}
                    onMouseEnter={e => e.currentTarget.style.background = "#f3f4f6"}
                    onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "8px", border: "0.5px solid #e5e7eb", background: "#fff", cursor: "pointer", color: "#374151", transition: "background 0.15s" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <div>
                    <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#111827", letterSpacing: "-0.3px" }}>Employee Details</h2>
                    <p style={{ margin: 0, fontSize: "13px", color: "#9ca3af" }}>Viewing profile for ID · {id}</p>
                </div>
            </div>

            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>

                <div style={{ background: "#414447", borderRadius: "14px", padding: "36px 28px", width: "260px", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
                    <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: avatarColors[ci], color: avatarText[ci], display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", fontWeight: "700", marginBottom: "16px", border: "3px solid rgba(255,255,255,0.1)" }}>
                        {initials(employee.firstName, employee.lastName)}
                    </div>
                    <h3 style={{ margin: "0 0 6px", fontSize: "17px", fontWeight: "700", color: "#fff", textAlign: "center" }}>
                        {employee.firstName} {employee.lastName}
                    </h3>
                    <span style={{ background: "rgba(255,255,255,0.12)", color: "#d1d5db", borderRadius: "6px", padding: "4px 12px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.4px" }}>Employee</span>

                    <div style={{ marginTop: "28px", width: "100%", borderTop: "0.5px solid rgba(255,255,255,0.12)", paddingTop: "24px" }}>
                        {[
                            { label: "Employee ID", value: `#${id}` },
                            { label: "Email", value: employee.email },
                        ].map(({ label, value }) => (
                            <div key={label} style={{ marginBottom: "16px" }}>
                                <div style={{ fontSize: "10px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: "3px" }}>{label}</div>
                                <div style={{ fontSize: "13px", color: "#e5e7eb", fontWeight: "500", wordBreak: "break-all" }}>{value ?? "—"}</div>
                            </div>
                        ))}
                    </div>

                    <button onClick={() => navigate(`/add-employee/${id}`)}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
                        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                        style={{ marginTop: "8px", width: "100%", padding: "10px", borderRadius: "9px", border: "none", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "background 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        Edit Profile
                    </button>
                </div>

                <div style={{ background: "#fff", borderRadius: "14px", border: "0.5px solid #e5e7eb", padding: "28px 32px", flex: 1 }}>
                    <div style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: "0.5px solid #f3f4f6" }}>
                        <h3 style={{ margin: "0 0 3px", fontSize: "15px", fontWeight: "700", color: "#111827" }}>Personal Information</h3>
                        <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>Basic profile and contact details</p>
                    </div>

                    <Field label="First Name" value={employee.firstName} icon={
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    }/>
                    <Field label="Last Name" value={employee.lastName} icon={
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    }/>
                    <Field label="Email Address" value={employee.email} icon={
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    }/>
                    <Field label="Employee ID" value={`#${id}`} icon={
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/></svg>
                    }/>
                </div>
            </div>
        </div>
    );
};

export default ViewEmployee;