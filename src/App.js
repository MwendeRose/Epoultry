import React from 'react';
import ReactDOM from 'react-dom/client';
import * as FaIcons from 'react-icons/fa';
import { Link, Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Birds from './pages/Birds';
import Cage from './pages/Cage';
import Consumption from './pages/Consumption';
import Customer from './pages/Customer';
import Dashboard from './pages/Dashboard';
import Eggs from './pages/Eggs';
import Employee from './pages/Employee';
import Feed from './pages/Feed';
import Logout from './pages/Logout';
import Manure from './pages/Manure';
import Medicine from './pages/Medicine';
import Mortality from './pages/Mortality';
import Orders from './pages/Orders';
import Payroll from './pages/Payroll';
import Production from './pages/Production';
import Sales from './pages/Sales';

const Purchase = () => {
    const location = useLocation();
    const activeTab = new URLSearchParams(location.search).get('type');

    return (
        <>
            {activeTab === 'BIRDS' && <Birds/>}
            {activeTab === 'FEED' && <Feed/>}
            {!activeTab && <div>Please select a purchase type.</div>}
        </>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

const AppContent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const activeTab = location.pathname.substring(1) || 'Dashboard';

    const handleTabClick = (tab) => {
        navigate(`/${tab}`);
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <ul className="nav">
                    <li className={activeTab === 'Dashboard' ? 'active' : ''}>
                        <Link to="/Dashboard" onClick={() => handleTabClick('Dashboard')}>
                            <FaIcons.FaChartLine /> Dashboard
                        </Link>
                    </li>
                    <li className={activeTab === 'Cage' ? 'active' : ''}>
                        <Link to="/Cage" onClick={() => handleTabClick('Cage')}>
                            <FaIcons.FaCube /> Cage
                        </Link>
                    </li>
                    <li className={activeTab === 'Customer' ? 'active' : ''}>
                        <Link to="/Customer" onClick={() => handleTabClick('Customer')}>
                            <FaIcons.FaUserFriends /> Customer
                        </Link>
                    </li>
                    <li className={activeTab === 'Employee' ? 'active' : ''}>
                        <Link to="/Employee" onClick={() => handleTabClick('Employee')}>
                            <FaIcons.FaUserTie /> Employee
                        </Link>
                    </li>
                    <li className={activeTab === 'Medicine' ? 'active' : ''}>
                        <Link to="/Medicine" onClick={() => handleTabClick('Medicine')}>
                            <FaIcons.FaMedkit /> Medicine
                        </Link>
                    </li>
                    <li className={activeTab === 'Manure' ? 'active' : ''}>
                        <Link to="/Manure" onClick={() => handleTabClick('Manure')}>
                            <FaIcons.FaLeaf /> Manure
                        </Link>
                    </li>
                    <li className={activeTab === 'Production' ? 'active' : ''}>
                        <Link to="/Production" onClick={() => handleTabClick('Production')}>
                            <FaIcons.FaChartBar /> Production
                        </Link>
                    </li>
                    <li className={activeTab === 'Birds' ? 'active' : ''}>
                        <Link to="/Birds" onClick={() => handleTabClick('Birds')}>
                            <FaIcons.FaDove /> Birds
                        </Link>
                        <ul className="nested-links">
                            <li className={activeTab === 'Mortality' ? 'active' : ''}>
                                <Link to="/Mortality" onClick={() => handleTabClick('Mortality')}>
                                    <FaIcons.FaSkullCrossbones /> Mortality
                                </Link>
                            </li>
                            <li className={activeTab === 'BirdsPurchase' ? 'active' : ''}>
                                <Link to="/Purchase?type=BIRDS" onClick={() => handleTabClick('BirdsPurchase')}>
                                    <FaIcons.FaShoppingCart /> Birds Purchase
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={activeTab === 'Feed' ? 'active' : ''}>
                        <Link to="/Feed" onClick={() => handleTabClick('Feed')}>
                            <FaIcons.FaSeedling /> Feed
                        </Link>
                    </li>
                    <li className={activeTab === 'FeedPurchase' ? 'active' : ''}>
                        <Link to="/Purchase?type=FEED" onClick={() => handleTabClick('FeedPurchase')}>
                            <FaIcons.FaShoppingCart /> Feed Purchase
                        </Link>
                    </li>
                    <li className={activeTab === 'Orders' ? 'active' : ''}>
                        <Link to="/Orders" onClick={() => handleTabClick('Orders')}>
                            <FaIcons.FaShoppingCart /> Orders
                        </Link>
                    </li>
                    <li className={activeTab === 'Payroll' ? 'active' : ''}>
                        <Link to="/Payroll" onClick={() => handleTabClick('Payroll')}>
                            <FaIcons.FaMoneyBillWave /> Payroll
                        </Link>
                    </li>
                    <li className={activeTab === 'Logout' ? 'active' : ''}>
                        <Link to="/Logout" onClick={() => handleTabClick('Logout')}>
                            <FaIcons.FaSignOutAlt /> Logout
                        </Link>
                    </li>
                    <li className={activeTab === 'Eggs' ? 'active' : ''}>
                        <Link to="/Eggs" onClick={() => handleTabClick('Eggs')}>
                            <FaIcons.FaEgg /> Eggs
                        </Link>
                    </li>
                    <li className={activeTab === 'Sales' ? 'active' : ''}>
                        <Link to="/Sales" onClick={() => handleTabClick('Sales')}>
                            <FaIcons.FaDollarSign /> Sales
                        </Link>
                    </li>
                    <li className={activeTab === 'Consumption' ? 'active' : ''}>
                        <Link to="/Consumption" onClick={() => handleTabClick('Consumption')}>
                            <FaIcons.FaUtensils /> Consumption
                        </Link>
                    </li>
                </ul>
            </aside>

            <main className="main-content">
                <Routes>
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Eggs" element={<Eggs />} />
                    <Route path="/Birds" element={<Birds />} />
                    <Route path="/Feed" element={<Feed />} />
                    <Route path="/Cage" element={<Cage />} />
                    <Route path="/Customer" element={<Customer />} />
                    <Route path="/Employee" element={<Employee />} />
                    <Route path="/Medicine" element={<Medicine />} />
                    <Route path="/Manure" element={<Manure />} />
                    <Route path="/Payroll" element={<Payroll />} />
                    <Route path="/Logout" element={<Logout />} />
                    <Route path="/Production" element={<Production />} />
                    <Route path="/Sales" element={<Sales />} />
                    <Route path="/Mortality" element={<Mortality />} />
                    <Route path="/Consumption" element={<Consumption />} />
                    <Route path="/Orders" element={<Orders />} />
                    <Route path="/Purchase" element={<Purchase />} />
                    <Route path="*" element={<Dashboard />} />
                </Routes>
            </main>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;