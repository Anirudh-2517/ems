import axios from 'axios';
const EMPLOYEE_BASE_URL = "http://localhost:8085/api/employees";

class EmployeeService {
    getEmployees() {
        return axios.get(EMPLOYEE_BASE_URL);
    }

    createEmployee(employee) {
        return axios.post(EMPLOYEE_BASE_URL, employee);
    }

    getEmployeeById(employeeId) {
        return axios.get(`${EMPLOYEE_BASE_URL}/${employeeId}`);
    }

    updateEmployee(employeeId, employee) {
        if (employeeId === '_add') {
            return this.createEmployee(employee);
        }
        return axios.put(`${EMPLOYEE_BASE_URL}/${employeeId}`, employee);
    }

    DeleteEmployee(employeeId) {
        return axios.delete(`${EMPLOYEE_BASE_URL}/${employeeId}`);
    }
    login(username, password) {
        return new Promise(async (resolve, reject) => {
            const hashPassword = (str) => {
                let hash = 0;
                for (let i = 0; i < str.length; i++) {
                    const char = str.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char;
                    hash = hash & hash;
                }
                return hash.toString();
            };

            const hashedPassword = hashPassword(password);
            const adminHash = hashPassword("admin123");
            const defaultEmpHash = hashPassword("employee@1");

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
            } else if (hashedPassword === defaultEmpHash) {
                return resolve({
                    data: {
                        id: Math.floor(Math.random() * 1000),
                        username: username,
                        role: "EMPLOYEE",
                        name: username,
                        email: `${username}@ems.com`
                    }
                });
            } else {
                setTimeout(() => {
                    reject(new Error("Invalid credentials"));
                }, 500);
            }
        });
    }
}

export default new EmployeeService();