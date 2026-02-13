import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, TrendingUp } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getStatusColor, formatDate } from '../../utils/helpers';

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchLead = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/employee/leads');
      const foundLead = data.find(l => l.id === parseInt(id));
      if (foundLead) {
        setLead(foundLead);
      } else {
        toast.error('Lead not found');
        navigate('/leads');
      }
    } catch (error) {
      toast.error('Failed to fetch lead details');
      navigate('/leads');
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

  if (!lead) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() => navigate('/leads')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Leads
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
            <span className={`inline-block px-3 py-1 text-sm rounded-full mt-2 ${getStatusColor(lead.status)}`}>
              {lead.status}
            </span>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end text-blue-600">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span className="text-2xl font-bold">{lead.interestedPercentage}%</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Interest Level</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <Mail className="h-5 w-5 mr-3 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{lead.email}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <Phone className="h-5 w-5 mr-3 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{lead.phone}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <Calendar className="h-5 w-5 mr-3 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Created At</p>
                <p className="font-medium">{formatDate(lead.createdAt)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {lead.source && (
              <div>
                <p className="text-sm text-gray-600">Source</p>
                <p className="font-medium text-gray-900">{lead.source}</p>
              </div>
            )}

            {lead.assignedTo && (
              <div>
                <p className="text-sm text-gray-600">Assigned To</p>
                <p className="font-medium text-gray-900">
                  {lead.assignedTo.name} ({lead.assignedTo.email})
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => navigate(`/leads/${lead.id}/edit`)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit Lead
          </button>
          <button
            onClick={() => navigate('/leads')}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}
