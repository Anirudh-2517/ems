import axios from "axios";

const LEAVE_BASE_URL = "http://localhost:8085/api/leaves";

class LeaveService {

    // Get all leaves
    getLeaves() {
        return axios.get(LEAVE_BASE_URL);
    }

    // Apply/create a new leave
    createLeave(leave) {
        return axios.post(LEAVE_BASE_URL, leave);
    }

    // Get leave by ID
    getLeaveById(leaveId) {
        return axios.get(`${LEAVE_BASE_URL}/${leaveId}`);
    }

    // Update leave details
    updateLeave(leaveId, leave) {
        return axios.put(`${LEAVE_BASE_URL}/${leaveId}`, leave);
    }

    // Delete a leave
    deleteLeave(leaveId) {
        return axios.delete(`${LEAVE_BASE_URL}/${leaveId}`);
    }

    // Update only the status of a leave
    updateLeaveStatus(leaveId, status) {
        return axios.put(`${LEAVE_BASE_URL}/${leaveId}/status`, null, { params: { status } });
    }

    // Get all leaves for a specific employee
    getLeavesByEmployee(employeeId) {
        return axios.get(`${LEAVE_BASE_URL}/employee/${employeeId}`);
    }
}

export default new LeaveService();