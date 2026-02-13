import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import { LEAD_STATUS } from '../../utils/constants';

export default function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchingLead, setFetchingLead] = useState(true);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    fetchLead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchLead = async () => {
    setFetchingLead(true);
    try {
      const { data } = await api.get('/api/employee/leads');
      const lead = data.find(l => l.id === parseInt(id));
      if (lead) {
        setValue('name', lead.name);
        setValue('email', lead.email);
        setValue('phone', lead.phone);
        setValue('source', lead.source || '');
        setValue('status', lead.status);
        setValue('interestedPercentage', lead.interestedPercentage);
      } else {
        toast.error('Lead not found');
        navigate('/leads');
      }
    } catch (error) {
      toast.error('Failed to fetch lead');
      navigate('/leads');
    } finally {
      setFetchingLead(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.put(`/api/employee/leads/${id}`, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        source: data.source,
        status: data.status,
        interestedPercentage: parseInt(data.interestedPercentage),
      });
      toast.success('Lead updated successfully');
      navigate('/leads');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update lead');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingLead) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Lead</h1>
        <p className="text-gray-600 mt-2">Update lead information</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter lead name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              {...register('phone', { required: 'Phone is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Source
            </label>
            <input
              type="text"
              {...register('source')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter lead source"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              {...register('status', { required: 'Status is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.values(LEAD_STATUS).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interested Percentage *
            </label>
            <input
              type="number"
              min="0"
              max="100"
              {...register('interestedPercentage', { 
                required: 'Interested percentage is required',
                min: { value: 0, message: 'Must be at least 0' },
                max: { value: 100, message: 'Must be at most 100' }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0-100"
            />
            {errors.interestedPercentage && (
              <p className="mt-1 text-sm text-red-600">{errors.interestedPercentage.message}</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Update Lead'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/leads')}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
