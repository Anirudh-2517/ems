import React, { useState } from 'react';
import EmployeeService from '../Services/EmployeeService';

const LoginComponent = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await EmployeeService.login(username, password);
            const userData = response.data;
            localStorage.setItem("loggedInUser", JSON.stringify(userData));
            onLogin(userData);
        } catch (err) {
            setError('Invalid Username or Password');
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
            <div style={{ background: '#fff', borderRadius: '8px', padding: '40px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', boxSizing: 'border-box' }}>
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <div style={{ background: '#6c757d', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                        <i className="fa fa-briefcase" style={{ color: '#fff', fontSize: '22px' }}></i>
                    </div>
                    <h4 style={{ fontWeight: '700', color: '#343a40', marginBottom: '4px' }}>EMS Login</h4>
                    <small style={{ color: '#6c757d' }}>Employee Management System</small>
                </div>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#495057', marginBottom: '6px', display: 'block' }}>
                            <i className="fa fa-user me-2"></i>Username
                        </label>
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username" required
                            style={{ borderRadius: '6px', border: '1px solid #ced4da', padding: '10px 14px', fontSize: '14px', width: '100%', boxSizing: 'border-box' }} />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#495057', marginBottom: '6px', display: 'block' }}>
                            <i className="fa fa-lock me-2"></i>Password
                        </label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password" required
                            style={{ borderRadius: '6px', border: '1px solid #ced4da', padding: '10px 14px', fontSize: '14px', width: '100%', boxSizing: 'border-box' }} />
                    </div>

                    {error && (
                        <div style={{ background: '#f8d7da', color: '#842029', border: '1px solid #f5c2c7', borderRadius: '6px', padding: '10px 14px', fontSize: '13px', marginBottom: '16px' }}>
                            <i className="fa fa-exclamation-circle me-2"></i>{error}
                        </div>
                    )}

                    <button type="submit" style={{ width: '100%', background: '#414447', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
                        <i className="fa fa-sign-in me-2"></i>Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;