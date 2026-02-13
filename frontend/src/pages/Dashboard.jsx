import { useState, useEffect } from 'react';
import { Users, FileText, CheckCircle, TrendingUp } from 'lucide-react';
import api from '../api/axios';
import useAuthStore from '../store/authStore';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchDashboardStats = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      let endpoint = '';
      switch (user.role) {
        case 'ADMIN':
          endpoint = '/api/admin/dashboard';
          break;
        case 'MANAGER':
          endpoint = '/api/manager/dashboard';
          break;
        case 'TEAM_LEAD':
          endpoint = '/api/teamlead/dashboard';
          break;
        case 'EMPLOYEE':
          endpoint = '/api/employee/dashboard';
          break;
        default:
          endpoint = '/api/employee/dashboard';
      }
      
      const { data } = await api.get(endpoint);
      setStats(data);
    } catch (error) {
      toast.error('Failed to load dashboard stats');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No dashboard data available</p>
      </div>
    );
  }

  const calculateConversionRate = () => {
    if (!stats.totalLeads || stats.totalLeads === 0) return '0';
    return ((stats.convertedLeads / stats.totalLeads) * 100).toFixed(1);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {user.role === 'ADMIN' && (
          <>
            <StatCard
              title="Total Users"
              value={stats.totalUsers || 0}
              icon={Users}
            />
            <StatCard
              title="Total Clients"
              value={stats.totalClients || 0}
              icon={CheckCircle}
            />
          </>
        )}
        
        {(user.role === 'MANAGER' || user.role === 'TEAM_LEAD') && (
          <StatCard
            title={user.role === 'MANAGER' ? 'Team Leads' : 'Team Members'}
            value={user.role === 'MANAGER' ? stats.teamLeadsCount || 0 : stats.teamMembersCount || 0}
            icon={Users}
          />
        )}

        <StatCard
          title="Total Leads"
          value={stats.totalLeads || 0}
          icon={FileText}
        />
        
        <StatCard
          title="Converted Leads"
          value={stats.convertedLeads || 0}
          icon={CheckCircle}
        />
        
        <StatCard
          title="Conversion Rate"
          value={`${calculateConversionRate()}%`}
          icon={TrendingUp}
        />
      </div>

      {/* Additional Stats Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {user.role === 'ADMIN' && 'System Overview'}
          {user.role === 'MANAGER' && 'Team Performance'}
          {user.role === 'TEAM_LEAD' && 'Team Performance'}
          {user.role === 'EMPLOYEE' && 'My Performance'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Leads</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalLeads || 0}</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-600">Converted</p>
            <p className="text-2xl font-bold text-green-600">{stats.convertedLeads || 0}</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {(stats.totalLeads || 0) - (stats.convertedLeads || 0)}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-600">Success Rate</p>
            <p className="text-2xl font-bold text-blue-600">{calculateConversionRate()}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
