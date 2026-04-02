import React, { useState } from 'react';
import './App.css';
import CreateOrUpdateEmployee from './Components/CreateOrUpdateEmployee';
import ListEmployee from './Components/ListEmployee';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewEmployee from './Components/ViewEmployee';
import LoginComponent from './Components/LoginComponent';
import EmployeeDashboard from './Components/EmployeeDashboard';
import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';
import ViewLeaves from './Components/ViewLeaves';
import LeaveDashboard from './Components/LeaveDashboard';
import AdminDashboard from './Components/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);
  if (!user) {
    return <LoginComponent onLogin={setUser} />;
  }
  return (
    <>
      <Router>
        <div className="app-wrapper">
          <Sidebar role={user.role} />
          <div className="main-panel">
            <Topbar user={user} onLogout={() => setUser(null)} />
            <div className="content-container">
              <Routes>
                {user.role === 'ADMIN' && (
                  <>
                    <Route exact path="/" element={<AdminDashboard />} />
                    <Route exact path="/employees" element={<ListEmployee />} />
                    <Route exact path="/add-employee/:id" element={<CreateOrUpdateEmployee />} />
                    <Route exact path="/view-employee/:id" element={<ViewEmployee />} />
                    <Route exact path="/view-leaves" element={<ViewLeaves />} />
                  </>
                )}
                {user.role === 'EMPLOYEE' && (
                  <>
                    <Route path="/" element={<EmployeeDashboard user={user} />} />
                    <Route path="/dashboard" element={<EmployeeDashboard user={user} />} />
                    <Route path="/leave-dashboard" element={<LeaveDashboard user={user} />} />
                  </>
                )}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;