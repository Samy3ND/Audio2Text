import { useState, useRef } from 'react';
import { FaFileUpload } from 'react-icons/fa';

export default function FileUpload({
  isProcessing,
  setIsProcessing,
  setTranscribedText,
  setStatus,
  setProgress,
  progress,
  fileError,
  setFileError
}) {
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/m4a', 'audio/ogg'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
      return 'Invalid file type. Please upload MP3, WAV, M4A, or OGG files.';
    }
    
    if (file.size > maxSize) {
      return 'File too large. Maximum size is 10MB.';
    }
    
    return '';
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const error = validateFile(file);
    if (error) {
      setFileError(error);
      return;
    }
    
    setFileError('');
    setStatus('Processing audio file...');
    setIsProcessing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setTranscribedText("This is where the transcribed text from your audio file would appear. In a real implementation, you would process the audio file here.");
          setStatus('Transcription complete');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
        onClick={() => fileInputRef.current.click()}
        role="button"
        aria-label="Upload audio file"
        tabIndex="0"
        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current.click()}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-blue-600">Processing your file...</p>
          </div>
        ) : (
          <>
            <FaFileUpload className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-700">Upload Audio File</h3>
            <p className="mt-1 text-sm text-gray-500">
              MP3, WAV, M4A, or OGG files (max 10MB)
            </p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-all"
              aria-label="Select audio file"
            >
              Select File
            </button>
          </>
        )}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".mp3,.wav,.m4a,.ogg"
          className="hidden"
          aria-label="Audio file input"
        />
      </div>

      {fileError && (
        <div className="text-red-600 text-sm text-center">
          <span className="inline mr-1">✕</span>
          {fileError}
        </div>
      )}

      {progress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      )}
    </div>
  );
}