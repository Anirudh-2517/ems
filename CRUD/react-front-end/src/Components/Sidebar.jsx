import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const linkStyle = { display: 'block', padding: '12px 24px', color: '#fff', textDecoration: 'none', fontSize: '15px' };

const Sidebar = ({ role }) => {
    const location = useLocation();

    const getStyle = (path) => ({
        ...linkStyle,
        background: location.pathname === path ? '#212529' : 'transparent',
    });

    return (
        <div style={{ width: '240px', minHeight: '100vh', background: '#000', borderRight: '1px solid #343a40', padding: '20px 0' }}
            onMouseOver={e => { if (e.target.tagName === 'A') e.target.style.background = '#212529'; }}
            onMouseOut={e => { if (e.target.tagName === 'A') e.target.style.background = location.pathname === e.target.getAttribute('href') ? '#000' : 'transparent'; }}>

            <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff', padding: '0 24px 20px', borderBottom: '1px solid #343a40', marginBottom: '10px' }}>
                Employee Management
            </div>

            <nav>
                {role === 'ADMIN' && (
                    <>
                        <Link to="/" style={getStyle('/')}>
                            <i className="fa fa-desktop me-2"></i> Dashboard
                        </Link>
                        <Link to="/employees" style={getStyle('/employees')}>
                            <i className="fa fa-users me-2"></i> Employees
                        </Link>
                        <Link to="/add-employee/_add" style={getStyle('/add-employee/_add')}>
                            <i className="fa fa-user-plus me-2"></i> Add Employee
                        </Link>
                        <Link to="/view-leaves" style={getStyle('/view-leaves')}>
                            <i className="fa fa-calendar me-2"></i> View Leaves
                        </Link>
                    </>
                )}
                {role === 'EMPLOYEE' && (
                    <>
                        <Link to="/dashboard" style={getStyle('/dashboard')}>
                            <i className="fa fa-user-circle me-2"></i> My Profile
                        </Link>

                        <Link to="/leave-dashboard" style={getStyle('/leave-dashboard')}>
                            <i className="fa fa-calendar me-2"></i> Apply Leave
                        </Link>
                        {/* <Link to="/my-leaves" style={getStyle('/my-leaves')}>
                            <i className="fa fa-calendar me-2"></i> My Leaves
                        </Link> */}
                    </>
                )}
            </nav>
        </div>
    );
};

export default Sidebar;