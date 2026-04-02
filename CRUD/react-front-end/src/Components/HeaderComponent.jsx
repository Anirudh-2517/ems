import { Link } from "react-router-dom";
const HeaderComponent = () => {
    return(
        <>
        <header className="header bg-dark" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '10px 20px' }}> 
            <nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                <div><Link to="/" className="navbar-brand">Employee Management App</Link></div>
                <div><Link to="/add-employee/-1" className="navbar">Add an Employee</Link></div>
            </nav>
        </header>
        </>
    );
}
export default HeaderComponent;