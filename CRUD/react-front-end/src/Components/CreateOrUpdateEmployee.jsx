import { useEffect, useState } from "react";
import EmployeeService from "../Services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const CreateOrUpdateEmployee = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isNew = id === '_add';
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!firstName.trim()) {
            newErrors.firstName = "Please enter first name";
        }

        if (!lastName.trim()) {
            newErrors.lastName = "Please enter last name";
        }

        if (!email.trim()) {
            newErrors.email = "Please enter email address";
        }

        setErrors(newErrors);

        // Stop if errors exist
        if (Object.keys(newErrors).length > 0) return;

        const employee = { firstName, lastName, email };

        if (isNew) {
            EmployeeService.createEmployee(employee)
                .then(() => navigate("/employees"));
        } else {
            EmployeeService.updateEmployee(id, employee)
                .then(() => navigate("/employees"));
        }
    };

    useEffect(() => {
        if (isNew) return;
        EmployeeService.getEmployeeById(id).then(res => {
            const emp = res.data;
            setFirstName(emp.firstName);
            setLastName(emp.lastName);
            setEmail(emp.email);
        }).catch(err => console.log(err));
    }, []);

    return (
        <div style={{ padding: '48px 36px', background: '#e9ecef', minHeight: '100vh' }}>

            <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontWeight: '700', color: '#000', margin: 0 }}>
                    <i className={`fa ${isNew ? 'fa-user-plus' : 'fa-edit'} me-2`}></i>
                    {isNew ? 'Add Employee' : 'Update Employee'}
                </h3>
                <p style={{ color: '#6c757d', marginTop: '4px', fontSize: '14px' }}>
                    {isNew ? 'Fill in the details below to register a new employee.' : 'Edit the employee details below.'}
                </p>
                <hr style={{ borderColor: '#ced4da' }} />
            </div>

            <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>

                <div style={{ background: '#fff', borderRadius: '10px', padding: '36px', flex: 1, maxWidth: '560px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
                    <form onSubmit={saveOrUpdateEmployee}>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ fontWeight: '600', fontSize: '14px', color: '#000', display: 'block', marginBottom: '7px' }}>
                                <i className="fa fa-id-badge me-2 text-secondary"></i>First Name
                            </label>
                            <input type="text" className="form-control" placeholder="Enter first name"
                                style={{ padding: '12px 14px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ced4da' }}
                                value={firstName} onChange={e => setFirstName(e.target.value)} required />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ fontWeight: '600', fontSize: '14px', color: '#000', display: 'block', marginBottom: '7px' }}>
                                <i className="fa fa-id-badge me-2 text-secondary"></i>Last Name
                            </label>
                            <input type="text" className="form-control" placeholder="Enter last name"
                                style={{ padding: '12px 14px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ced4da' }}
                                value={lastName} onChange={e => setLastName(e.target.value)} required />
                        </div>

                        <div style={{ marginBottom: '28px' }}>
                            <label style={{ fontWeight: '600', fontSize: '14px', color: '#000', display: 'block', marginBottom: '7px' }}>
                                <i className="fa fa-envelope me-2 text-secondary"></i>Email Address
                            </label>
                            <input type="email" className="form-control" placeholder="Enter email address"
                                style={{ padding: '12px 14px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ced4da' }}
                                value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button type="submit" style={{ flex: 1, background: '#212529', color: '#fff', border: 'none', padding: '13px', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
                                <i className={`fa ${isNew ? 'fa-save' : 'fa-refresh'} me-2`}></i>{isNew ? 'Save Employee' : 'Update Employee'}
                            </button>
                            <button type="button" onClick={() => navigate("/employees")} style={{ flex: 1, background: '#fff', color: '#000', border: '1px solid #ced4da', padding: '13px', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
                                <i className="fa fa-arrow-left me-2"></i>Back
                            </button>
                        </div>
                    </form>
                </div>

                <div style={{ background: '#fff', borderRadius: '10px', padding: '28px', width: '220px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
                    <p style={{ fontWeight: '700', fontSize: '14px', color: '#000', marginBottom: '16px' }}>
                        <i className="fa fa-info-circle me-2"></i>Guidelines
                    </p>
                    {[
                        { icon: 'fa-check', text: 'First & last name are required' },
                        { icon: 'fa-check', text: 'Use a valid email address' },
                        { icon: 'fa-check', text: 'Email must be unique' },
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '12px', fontSize: '13px', color: '#495057' }}>
                            <i className={`fa ${item.icon}`} style={{ color: '#212529', marginTop: '2px' }}></i>
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default CreateOrUpdateEmployee;