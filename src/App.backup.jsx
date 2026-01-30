import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Order from './pages/Order';
import Vendor from './pages/Vendor';
import Login from './pages/Login';
import VendorLogin from './pages/VendorLogin';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vendor-login" element={<VendorLogin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
