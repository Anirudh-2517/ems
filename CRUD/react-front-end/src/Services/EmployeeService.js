import axios from 'axios';
const EMPLOYEE_BASE_URL = "http://localhost:8085/api/employees";

class EmployeeService {
    // Get all employees
    getEmployees() {
        return axios.get(EMPLOYEE_BASE_URL);
    }

    // Create a new employee
    createEmployee(employee) {
        return axios.post(EMPLOYEE_BASE_URL, employee);
    }

    // Get employee by ID
    getEmployeeById(employeeId) {
        return axios.get(`${EMPLOYEE_BASE_URL}/${employeeId}`);
    }

    // Update employee
    updateEmployee(employeeId, employee) {
        if (employeeId === '_add') {
            return this.createEmployee(employee);
        }
        return axios.put(`${EMPLOYEE_BASE_URL}/${employeeId}`, employee);
    }

    // Delete employee
    deleteEmployee(employeeId) {
        return axios.delete(`${EMPLOYEE_BASE_URL}/${employeeId}`);
    }

    // Mock login logic (admin & default employee)
    login(username, password) {
        const hashPassword = (str) => {
            return str.split('').reduce((hash, char) => {
                hash = ((hash << 5) - hash) + char.charCodeAt(0);
                return hash & hash;
            }, 0).toString();
        };

        const hashedPassword = hashPassword(password);
        const adminHash = hashPassword("admin123");
        const defaultEmpHash = hashPassword("employee@1");

        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(EMPLOYEE_BASE_URL);
                const employees = response.data;
                const user = employees.find(emp => emp.email === username);

                if (user && hashedPassword === defaultEmpHash) {
                    return resolve({
                        data: {
                            id: user.id,
                            username: `${user.firstName}.${user.lastName}`,
                            role: "EMPLOYEE",
                            name: `${user.firstName} ${user.lastName}`,
                            email: user.email
                        }
                    });
                }
            } catch (err) {
                console.warn("Backend fetch failed, falling back to default logic", err);
            }

            // Admin login
            if (username === "admin" && hashedPassword === adminHash) {
                return resolve({
                    data: {
                        id: 1,
                        username: "admin",
                        role: "ADMIN",
                        name: "Admin User",
                        email: "admin@ems.com"
                    }
                });
            }

            // Default employee fallback
            if (hashedPassword === defaultEmpHash) {
                return resolve({
                    data: {
                        id: Math.floor(Math.random() * 1000),
                        username: username,
                        role: "EMPLOYEE",
                        name: username,
                        email: `${username}@ems.com`
                    }
                });
            }

            setTimeout(() => reject(new Error("Invalid credentials")), 500);
        });
    }
}

export default new EmployeeService();