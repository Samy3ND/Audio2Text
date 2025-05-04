import { FaCheck, FaTimes } from 'react-icons/fa';

export default function StatusIndicator({ status }) {
  return (
    <div className="mt-6">
      <div 
        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
          status.includes('Error') 
            ? 'bg-red-100 text-red-800' 
            : status.includes('Processing') 
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
        }`}
        role="status"
        aria-live="polite"
      >
        {status.includes('Error') ? (
          <span className="flex items-center">
            <FaTimes className="w-4 h-4 mr-2" />
            {status}
          </span>
        ) : (
          <span className="flex items-center">
            <FaCheck className="w-4 h-4 mr-2" />
            {status}
          </span>
        )}
      </div>
    </div>
  );
}