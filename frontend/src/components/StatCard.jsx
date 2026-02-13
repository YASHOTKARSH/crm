import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, trend, trendValue }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              {trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500 mr-1" />}
              {trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500 mr-1" />}
              {trend === 'neutral' && <Minus className="h-4 w-4 text-gray-500 mr-1" />}
              <span className={`text-sm ${
                trend === 'up' ? 'text-green-600' : 
                trend === 'down' ? 'text-red-600' : 
                'text-gray-600'
              }`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="bg-blue-100 p-3 rounded-full">
            <Icon className="h-8 w-8 text-blue-600" />
          </div>
        )}
      </div>
    </div>
  );
}
