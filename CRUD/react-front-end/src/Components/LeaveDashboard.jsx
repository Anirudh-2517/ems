import React from 'react';
import Leave from './Leave';
import ViewMyLeaves from './ViewMyLeaves';

function LeaveDashboard({ user }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4f8 0%, #e8edf5 100%)',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      padding: '40px 32px',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto 36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #1a1f36, #3b4784)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#1a1f36', letterSpacing: '-0.3px' }}>
            Leave Management
          </h1>
        </div>
        <p style={{ margin: 0, color: '#6b7694', fontSize: '14px', paddingLeft: '48px' }}>
          Submit requests and track your leave history in one place
        </p>
      </div>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '480px 1fr',
        gap: '28px',
        alignItems: 'start',
      }}>
        <Leave />
        <ViewMyLeaves user={user} />
      </div>
    </div>
  );
}

export default LeaveDashboard;