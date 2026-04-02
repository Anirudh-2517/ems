import axios from "axios";

const LEAVE_BASE_URL = "http://localhost:8085/api/leaves";

class LeaveService {

    getLeaves() {
        return axios.get(LEAVE_BASE_URL);
    }

    createLeave(leave) {
        return axios.post(LEAVE_BASE_URL, leave);
    }

    getLeaveById(lid) {
        return axios.get(LEAVE_BASE_URL + '/' + lid);
    }

    updateLeave(lid, leave) {
        return axios.put(LEAVE_BASE_URL + '/' + lid, leave);
    }

    deleteLeave(lid) {
        return axios.delete(LEAVE_BASE_URL + '/' + lid);
    }

    updateLeaveStatus(id, status) {
        return axios.put(`${LEAVE_BASE_URL}/${id}/status?status=${status}`);
    }

    getLeavesByEmployee(id) {
        return axios.get(`${LEAVE_BASE_URL}/employee/${id}`);
    }
}

export default new LeaveService();