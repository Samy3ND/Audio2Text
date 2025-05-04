import { IoMdMic } from 'react-icons/io';
import { FaFileUpload } from 'react-icons/fa';

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex border-b">
      <button
        onClick={() => setActiveTab('live')}
        className={`flex-1 py-4 font-medium text-lg ${activeTab === 'live' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        aria-label="Live transcription tab"
        aria-selected={activeTab === 'live'}
      >
        <span className="flex items-center justify-center gap-2">
          <IoMdMic className="w-5 h-5" />
          Live Transcription
        </span>
      </button>
      <button
        onClick={() => setActiveTab('upload')}
        className={`flex-1 py-4 font-medium text-lg ${activeTab === 'upload' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        aria-label="Upload audio tab"
        aria-selected={activeTab === 'upload'}
      >
        <span className="flex items-center justify-center gap-2">
          <FaFileUpload className="w-5 h-5" />
          Upload Audio
        </span>
      </button>
    </div>
  );
}