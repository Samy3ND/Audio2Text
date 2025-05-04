import { IoMdDocument } from 'react-icons/io';

export default function TranscriptionResult({ transcribedText, activeTab }) {
  return (
    <div className="mt-6">
      <div 
        className="border border-gray-200 rounded-xl bg-white shadow-inner overflow-hidden"
        aria-live="polite"
        aria-atomic="true"
      >
        {transcribedText ? (
          <div className="p-4 max-h-96 overflow-y-auto">
            <p className="whitespace-pre-wrap text-gray-800">{transcribedText}</p>
          </div>
        ) : (
          <div className="p-8 text-center">
            <IoMdDocument className="w-16 h-16 mx-auto text-gray-300" />
            <h3 className="mt-2 text-lg font-medium text-gray-700">No transcription yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'live' 
                ? 'Start recording to see your transcription here' 
                : 'Upload an audio file to transcribe it'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}