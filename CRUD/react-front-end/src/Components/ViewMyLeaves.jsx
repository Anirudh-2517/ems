import React, { useEffect, useState } from 'react';
import LeaveService from '../Services/LeaveService';

const STATUS_CONFIG = {
  APPROVED: { color: '#000', bg: '#fff', border: '#000', dot: '#000', label: 'Approved' },
  REJECTED: { color: '#000', bg: '#fff', border: '#000', dot: '#000', label: 'Rejected' },
  PENDING: { color: '#000', bg: '#fff', border: '#000', dot: '#000', label: 'Pending' },
};
const LEAVE_ICONS = { 'sick leave': '🤒', 'holiday leave': '🌴', 'earned leave': '⭐' };
const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot }} />
      {cfg.label}
    </span>
  );
};
const EmptyState = () => (
  <div style={{ textAlign: 'center', padding: '56px 24px', color: '#888' }}>
    <div style={{ width: 64, height: 64, borderRadius: 16, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    </div>
    <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>No leaves found</p>
    <p style={{ margin: 4, fontSize: 13 }}>Your leave requests will appear here</p>
  </div>
);
function ViewMyLeaves({ user }) {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  useEffect(() => {
    LeaveService.getLeavesByEmployee(user.id)
      .then(res => { setLeaves(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user.id]);
  const filtered = filter === 'ALL' ? leaves : leaves.filter(l => l.status === filter);
  const counts = { ALL: leaves.length, APPROVED: leaves.filter(l => l.status === 'APPROVED').length, PENDING: leaves.filter(l => l.status === 'PENDING').length, REJECTED: leaves.filter(l => l.status === 'REJECTED').length };
  const formatDate = d => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
  const tabStyle = active => ({ padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', background: active ? '#000' : 'transparent', color: active ? '#fff' : '#888', transition: 'all 0.15s' });
  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', color: '#000' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 16 }}>{'My Leaves'}</h2>
          <p style={{ margin: 0, fontSize: 12, color: '#888' }}>{leaves.length} total request{leaves.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #eee', display: 'flex', gap: 4, background: '#f9f9f9' }}>
        {['ALL', 'APPROVED', 'PENDING', 'REJECTED'].map(tab => (
          <button key={tab} onClick={() => setFilter(tab)} style={tabStyle(filter === tab)}>
            {tab === 'ALL' ? `All (${counts.ALL})` : `${tab.charAt(0) + tab.slice(1).toLowerCase()} (${counts[tab]})`}
          </button>
        ))}
      </div>
      {loading ? <div style={{ padding: 48, textAlign: 'center', color: '#888' }}>Loading leave records...</div> :
      filtered.length === 0 ? <EmptyState /> :
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>{['Type','Duration','Days','Status'].map(h => <th key={h} style={{ padding: '11px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', borderBottom: '1px solid #eee' }}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((l, idx) => {
              const icon =LEAVE_ICONS[l.leaveType?.toLowerCase()] || '📋';
              const start = new Date(l.startDate), end = new Date(l.endDate);
              const days = Math.round((end-start)/(1000*60*60*24))+1;
              return (
                <tr key={l.lid} style={{ borderBottom: idx === filtered.length-1 ? 'none' : '1px solid #eee' }}>
                  <td style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#000', textTransform: 'capitalize' }}>{l.leaveType}</div>
                      <div style={{ fontSize: 11, color: '#888', marginTop: 1 }}>ID: {l.lid}</div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: '#000', fontWeight: 500 }}>
                    {formatDate(l.startDate)} - {formatDate(l.endDate)}
                  </td>
                  <td style={{ padding: '14px 20px' }}><span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 6, background: '#f5f5f5', fontSize: 13, fontWeight: 700, color: '#000' }}>{days}d</span></td>
                  <td style={{ padding: '14px 20px' }}><StatusBadge status={l.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>}
      {filtered.length > 0 && <div style={{ padding: '12px 24px', borderTop: '1px solid #eee', background: '#f9f9f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#888' }}>
        <span>Showing {filtered.length} of {leaves.length} records</span>
        <span>Last updated: {new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}</span>
      </div>}
    </div>
  );
}
export default ViewMyLeaves;