import { Mail, Phone, Calendar } from 'lucide-react';
import { getStatusColor, formatDate } from '../utils/helpers';

export default function LeadCard({ lead, onEdit, onDelete, onConvert }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
          <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${getStatusColor(lead.status)}`}>
            {lead.status}
          </span>
        </div>
        <span className="text-sm font-medium text-blue-600">{lead.interestedPercentage}%</span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="h-4 w-4 mr-2" />
          {lead.email}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-4 w-4 mr-2" />
          {lead.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          {formatDate(lead.createdAt)}
        </div>
      </div>

      {lead.source && (
        <p className="text-sm text-gray-500 mb-4">Source: {lead.source}</p>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(lead)}
          className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          Edit
        </button>
        {lead.status !== 'CONVERTED' && (
          <button
            onClick={() => onConvert(lead)}
            className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
          >
            Convert
          </button>
        )}
        <button
          onClick={() => onDelete(lead)}
          className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
