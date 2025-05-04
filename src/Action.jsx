import { FaFileAlt, FaFileWord, FaTrash } from 'react-icons/fa';
import { RiFileCopyLine } from 'react-icons/ri';

export default function ActionButtons({ transcribedText, setTranscribedText, setStatus }) {
  const saveAsFile = (format) => {
    if (!transcribedText.trim()) {
      alert('No text to save!');
      return;
    }

    const blob = new Blob([transcribedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcription-${new Date().toISOString().slice(0,10)}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcribedText)
      .then(() => {
        setStatus('Copied to clipboard!');
        setTimeout(() => setStatus('Transcription ready'), 2000);
      })
      .catch(err => {
        setStatus('Failed to copy');
        console.error('Copy failed:', err);
      });
  };

  const clearText = () => {
    setTranscribedText('');
    setStatus('Ready to begin');
  };

  return (
    <div className="mt-6 flex flex-wrap gap-3 justify-center">
      <button
        onClick={() => saveAsFile('txt')}
        className="px-5 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        aria-label="Save as text file"
      >
        <FaFileAlt className="w-5 h-5" />
        Save as TXT
      </button>
      <button
        onClick={() => saveAsFile('doc')}
        className="px-5 py-2.5 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        aria-label="Save as Word document"
      >
        <FaFileWord className="w-5 h-5" />
        Save as DOC
      </button>
      <button
        onClick={copyToClipboard}
        className="px-5 py-2.5 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        aria-label="Copy to clipboard"
      >
        <RiFileCopyLine className="w-5 h-5" />
        Copy Text
      </button>
      <button
        onClick={clearText}
        className="px-5 py-2.5 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        aria-label="Clear all text"
      >
        <FaTrash className="w-5 h-5" />
        Clear All
      </button>
    </div>
  );
}