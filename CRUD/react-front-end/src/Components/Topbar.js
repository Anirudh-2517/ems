import React from 'react';

const Topbar = ({ user, onLogout }) => {
    return (
        <div style={{ background: '#000000', padding: '18px 32px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <span style={{ color: '#fff', marginRight: '20px', fontSize: '16px' }}>
                <i className="fa fa-user-circle me-2"></i>
                Welcome, {user.name}
            </span>
            <button onClick={onLogout} style={{ background: '#000000', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: '4px', fontSize: '15px', cursor: 'pointer' }}>
                <i className="fa fa-sign-out me-1"></i>
            </button>
        </div>
    );
};

export default Topbar;