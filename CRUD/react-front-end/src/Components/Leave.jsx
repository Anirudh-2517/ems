import { useState } from "react";
import LeaveService from "../Services/LeaveService";
import { useNavigate } from "react-router-dom";

const inputStyle = {
  width: '100%', padding: '11px 14px', border: '1.5px solid #ccc', borderRadius: 8,
  fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: '#000', background: '#fff',
  outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box'
};

const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 6, letterSpacing: 0.5, textTransform: 'uppercase' };

const Leave = () => {
  const navigate = useNavigate();
  const [leave, setLeave] = useState({ leaveType: '', startDate: '', endDate: '', reason: '', status: 'PENDING', employee: { id: '' } });
  const [focused, setFocused] = useState('');
  const today = new Date().toISOString().split("T")[0];

  const change = e => { const { name, value } = e.target; name === 'id' ? setLeave({ ...leave, employee: { id: value } }) : setLeave({ ...leave, [name]: value }); };
  const save = e => { e.preventDefault(); if (leave.endDate < leave.startDate) return alert('End date cannot be before start date'); LeaveService.createLeave(leave).then(() => navigate('/dashboard', { state: { success: true } })); };
  const focusStyle = f => focused === f ? { borderColor: '#000', boxShadow: '0 0 0 3px rgba(0,0,0,0.12)', background: '#fff' } : {};

  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ padding: '24px 28px', background: '#fff', color: '#000' }}>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Apply for Leave</h2>
        <p style={{ margin: 0, fontSize: 12, color: '#555', marginTop: 2 }}>Fill in all required fields</p>
      </div>
      <div style={{ padding: 28 }}>
        <form onSubmit={save}>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Employee ID</label>
            <input type="text" name="id" placeholder="e.g. EMP-1042" value={leave.employee.id} onChange={change} onFocus={() => setFocused('id')} onBlur={() => setFocused('')} style={{ ...inputStyle, ...focusStyle('id') }} required/>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Leave Type</label>
            <select name="leaveType" value={leave.leaveType} onChange={change} onFocus={() => setFocused('leaveType')} onBlur={() => setFocused('')} style={{ ...inputStyle, ...focusStyle('leaveType'), appearance: 'none', cursor: 'pointer', paddingRight: 36, color: leave.leaveType ? '#000' : '#aaa' }} required>
              <option value="" disabled>Select leave type</option>
              <option value="sick leave">🤒 Sick Leave</option>
              <option value="holiday leave">🌴 Holiday Leave</option>
              <option value="earned leave">⭐ Earned Leave</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
            <div>
              <label style={labelStyle}>Start Date</label>
              <input type="date" min={today} name="startDate" value={leave.startDate} onChange={change} onFocus={() => setFocused('startDate')} onBlur={() => setFocused('')} style={{ ...inputStyle, ...focusStyle('startDate'), color: leave.startDate ? '#000' : '#aaa' }} required/>
            </div>
            <div>
              <label style={labelStyle}>End Date</label>
              <input type="date" min={leave.startDate || today} name="endDate" value={leave.endDate} onChange={change} onFocus={() => setFocused('endDate')} onBlur={() => setFocused('')} style={{ ...inputStyle, ...focusStyle('endDate'), color: leave.endDate ? '#000' : '#aaa' }} required/>
            </div>
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Reason <span style={{ color: '#888', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
            <textarea name="reason" placeholder="Briefly describe the reason for your leave..." value={leave.reason} onChange={change} onFocus={() => setFocused('reason')} onBlur={() => setFocused('')} rows={3} style={{ ...inputStyle, ...focusStyle('reason'), resize: 'vertical', minHeight: 80, lineHeight: 1.5 }}/>
          </div>
          <div style={{ borderTop: '1px solid #eee', marginBottom: 22 }}/>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" style={{ flex: 1, background: '#000', color: '#fff', border: 'none', padding: 12, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Submit Request</button>
            <button type="button" onClick={() => navigate('/')} style={{ flex: 1, background: '#fff', color: '#000', border: '1.5px solid #ccc', padding: 12, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Leave;