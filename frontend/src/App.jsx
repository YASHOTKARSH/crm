import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/RoleBasedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LeadsList from './pages/Leads/LeadsList';
import CreateLead from './pages/Leads/CreateLead';
import EditLead from './pages/Leads/EditLead';
import LeadDetails from './pages/Leads/LeadDetails';
import UsersList from './pages/Users/UsersList';
import CreateUser from './pages/Users/CreateUser';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            
            {/* Lead routes - accessible by all authenticated users */}
            <Route path="/leads" element={<LeadsList />} />
            <Route path="/leads/create" element={<CreateLead />} />
            <Route path="/leads/:id/edit" element={<EditLead />} />
            <Route path="/leads/:id" element={<LeadDetails />} />
            
            {/* Admin-only routes */}
            <Route element={<RoleBasedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/create" element={<CreateUser />} />
            </Route>
          </Route>
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
