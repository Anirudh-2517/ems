import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from "react-router-dom";

const EmployeeDashboard = ({ user }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [msg, setMsg] = useState("");
    useEffect(() => {
        if (location.state?.success) {
            setMsg("Your leave application has been applied");
            setTimeout(() => setMsg(""), 3000);
        }
    }, [location]);
    return (
        <div style={{ padding: '48px 36px', background: '#e9ecef', minHeight: '100vh' }}>
            {msg && (
                <div style={{ position: "fixed", top: "20px", right: "20px", background: "#28a745", color: "#fff", padding: "12px 20px", borderRadius: "6px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
                }}>
                    {msg}
                </div>
            )}
            <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontWeight: '700', color: '#000', margin: 0 }}>
                    <i className="fa fa-tachometer me-2"></i>My Dashboard
                </h3>
                <p style={{ color: '#6c757d', marginTop: '4px', fontSize: '14px' }}>Your personal profile and account details</p>
                <hr style={{ borderColor: '#ced4da' }} />
            </div>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'stretch' }}>

                <div style={{ background: '#212529', borderRadius: '10px', padding: '48px 36px', textAlign: 'center', width: '300px', boxShadow: '0 2px 16px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Employee"
                        style={{ width: '140px', height: '140px', borderRadius: '50%', border: '4px solid #fff', marginBottom: '24px' }} />
                    <h4 style={{ fontWeight: '700', color: '#fff', marginBottom: '8px' }}>{user.name}</h4>
                    <span style={{ background: '#6c757d', color: '#fff', borderRadius: '20px', padding: '6px 20px', fontSize: '13px' }}>{user.role}</span>
                    <div style={{ marginTop: '32px', width: '100%', borderTop: '1px solid #495057', paddingTop: '24px' }}>
                        <div style={{ fontSize: '12px', color: '#adb5bd', marginBottom: '4px' }}>Employee ID</div>
                        <div style={{ fontSize: '16px', color: '#fff', fontWeight: '600' }}>#{user.id}</div>
                    </div>
                </div>
                <div style={{ background: '#fff', borderRadius: '10px', padding: '40px', flex: 1, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
                    <p style={{ fontWeight: '700', fontSize: '16px', color: '#000', marginBottom: '28px' }}>
                        <i className="fa fa-info-circle me-2"></i>Account Information
                    </p>
                    {[
                        { label: 'Full Name', value: user.name, icon: 'fa-user' },
                        { label: 'Username', value: user.username, icon: 'fa-id-card' },
                        { label: 'Email Address', value: user.email, icon: 'fa-envelope' },
                    ].map((item, i, arr) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '18px 0', borderBottom: i < arr.length - 1 ? '1px solid #e9ecef' : 'none' }}>
                            <div style={{ background: '#e9ecef', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <i className={`fa ${item.icon}`} style={{ color: '#212529', fontSize: '18px' }}></i>
                            </div>
                            <div>
                                <div style={{ fontSize: '13px', color: '#6c757d', marginBottom: '4px' }}>{item.label}</div>
                                <div style={{ fontSize: '17px', fontWeight: '600', color: '#000' }}>{item.value}</div>
                            </div>
                        </div>
                    ))}
                    {/* <div style={{ marginTop: '32px' }}>
                        <button
                            onClick={() => navigate("/apply-leave", { state: { employeeId: user.id } })}
                            style={{
                                background: '#212529',
                                color: '#fff',
                                border: 'none',
                                padding: '12px 20px',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}  >
                            <i className="fa fa-calendar me-2"></i>Apply Leave
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;