import { Switch, Route, useLocation } from "wouter";
import { AuthProvider, useAuth } from '@/context/AuthContext';
import Login from '@/pages/Login';
import { Layout } from '@/components/layout/Layout';
import EmployeeDashboard from '@/pages/employee/Dashboard';
import ApplyLeave from '@/pages/employee/ApplyLeave';
import LeaveHistory from '@/pages/employee/History';
import Profile from '@/pages/employee/Profile';
import AdminDashboard from '@/pages/admin/Dashboard';
import ViewLeaves from '@/pages/admin/ViewLeaves';
import Charts from '@/pages/admin/Charts';
import Employees from '@/pages/admin/Employees';

function ProtectedRoute({ component: Component, role }: { component: any, role?: 'Admin' | 'Employee' }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) return null;

  if (!user) {
    // Redirect logic should probably be in useEffect to avoid state update during render
    // But for this mock, returning null and letting the parent re-render or the user click login is fine
    // However, we can use a redirect effect here
    if (window.location.pathname !== '/') {
        setTimeout(() => setLocation('/'), 0);
    }
    return null;
  }

  if (role && user.role !== role) {
    return <div className="text-white p-8">Unauthorized Access</div>;
  }

  return (
    <Layout>
      <Component />
    </Layout>
  );
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      
      {/* Employee Routes */}
      <Route path="/employee/dashboard">
        <ProtectedRoute component={EmployeeDashboard} role="Employee" />
      </Route>
      <Route path="/employee/apply-leave">
        <ProtectedRoute component={ApplyLeave} role="Employee" />
      </Route>
      <Route path="/employee/history">
        <ProtectedRoute component={LeaveHistory} role="Employee" />
      </Route>
      <Route path="/employee/profile">
        <ProtectedRoute component={Profile} role="Employee" />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/dashboard">
        <ProtectedRoute component={AdminDashboard} role="Admin" />
      </Route>
      <Route path="/admin/view-leaves">
        <ProtectedRoute component={ViewLeaves} role="Admin" />
      </Route>
      <Route path="/admin/departments">
         <ProtectedRoute component={Employees} role="Admin" />
      </Route>
       <Route path="/admin/employees">
         <ProtectedRoute component={Employees} role="Admin" />
      </Route>
       <Route path="/admin/charts">
         <ProtectedRoute component={Charts} role="Admin" />
      </Route>

      <Route>
        <div className="text-white p-8 text-center">404 - Page Not Found</div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
