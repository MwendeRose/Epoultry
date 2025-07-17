import Cookies from 'js-cookie';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import * as FaIcons from 'react-icons/fa';
import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import './App.css';

import Birds from './pages/Birds';
import Cage from './pages/Cage';
import Consumption from './pages/Consumption';
import Customer from './pages/Customer';
import Dashboard from './pages/Dashboard';
import Eggs from './pages/Eggs';
import Employee from './pages/Employee';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Manure from './pages/Manure';
import Medicine from './pages/Medicine';
import Mortality from './pages/Mortality';
import Orders from './pages/Orders';
import Payroll from './pages/Payroll';
import Production from './pages/Production';
import Register from './pages/Register';
import Shop from './pages/Shop';
import Products from './pages/Products';
import ManageInventory from './pages/ManageInventory';
import ManageSupplies from './pages/ManageSupplies';
import GenerateReports from './pages/GenerateReports';
import ProcessOrders from './pages/ProcessOrders';
import FarmToFarm from './pages/FarmToFarm';
import ProductRange from './pages/ProductRange';
import Careers from './pages/Careers';
import SupplyDetails from './pages/SupplyDetails';
import OrderRequests from './pages/OrderRequests';
import TrackOrders from './pages/trackorders';
import PlaceOrders from './pages/placeorders';
import BookNow from './pages/BookNow';
import LearningHub from './pages/LearningHub';

const Purchase = () => {
  const location = useLocation();
  const activeTab = new URLSearchParams(location.search).get('type');

  return (
    <>
      {activeTab === 'BIRDS' && <Birds />}
      {activeTab === 'FEED' && <Feed />}
      {!activeTab && <div>Please select a purchase type.</div>}
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Cookies.get('authToken');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [cart, setCart] = useState([]); 
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/farm-to-farm" element={<FarmToFarm />} />
        <Route path="/ProcessOrders" element={<ProcessOrders />} />
        <Route path="/product-range" element={<ProductRange />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/ManageInventory" element={<ManageInventory />} />
        <Route path="/ManageSupplies" element={<ManageSupplies />} />
        <Route path="/GenerateReports" element={<GenerateReports />} />
        <Route path="/supply-details/:item" element={<SupplyDetails />} />
        <Route path="/OrderRequests" element={<OrderRequests />} />
        <Route path="/trackorders" element={<TrackOrders />} />
        <Route path="/PlaceOrders" element={<PlaceOrders />} />
        <Route path="/shop" element={<Products cart={cart} setCart={setCart} />} />
        <Route path="/BookNow" element={<BookNow />}/>
        <Route path="/LearningHub" element={<LearningHub />} />

    

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppContent cart={cart} setCart={setCart} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

const AppContent = ({ cart, setCart }) => {
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
                <Link
                  to="/Purchase?type=BIRDS"
                  onClick={() => handleTabClick('BirdsPurchase')}
                >
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
          <Route path="/Mortality" element={<Mortality />} />
          <Route path="/Consumption" element={<Consumption />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Purchase" element={<Purchase />} />
          <Route path="/farmManager/process-orders" element={<ProcessOrders />} />
          <Route path="/farmManager/manage-inventory" element={<ManageInventory />} />
          <Route path="/farmManager/manage-supplies" element={<ManageSupplies />} />
          <Route path="/farmManager/generate-reports" element={<GenerateReports />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
