import { FaMicrophone } from 'react-icons/fa';
import { BsStopCircleFill } from 'react-icons/bs';
import { IoMdMic } from 'react-icons/io';

export default function LiveTranscription({
  isListening,
  setIsListening,
  setTranscribedText,
  setStatus,
  setProgress,
  progress,
  recognitionRef,
  selectedLanguage
}) {
  const startListening = () => {
    setStatus('Listening... Speak now');
    setIsListening(true);
    setTranscribedText('');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = selectedLanguage;

    recognitionRef.current.onresult = (event) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        }
      }
      
      setTranscribedText(prev => prev + finalTranscript);
      if (finalTranscript.length > 0) {
        setProgress(prev => Math.min(prev + 10, 90));
      }
    };

    recognitionRef.current.onerror = (event) => {
      setStatus(`Error: ${event.error}`);
      setIsListening(false);
      setProgress(0);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setStatus('Transcription ready');
    setProgress(100);
    setTimeout(() => setProgress(0), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={startListening}
          disabled={isListening}
          className={`flex-1 py-3 px-6 rounded-lg text-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${
            isListening ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 shadow-md'
          }`}
          aria-label={isListening ? 'Recording in progress' : 'Start recording'}
          aria-busy={isListening}
        >
          <FaMicrophone className="w-6 h-6" />
          {isListening ? 'Recording...' : 'Start Recording'}
        </button>
        <button
          onClick={stopListening}
          disabled={!isListening}
          className="flex-1 py-3 px-6 rounded-lg text-lg font-medium text-white bg-red-600 hover:bg-red-700 shadow-md transition-all flex items-center justify-center gap-2"
          aria-label="Stop recording"
        >
          <BsStopCircleFill className="w-6 h-6" />
          Stop Recording
        </button>
      </div>

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

      <div className={`p-4 rounded-lg ${isListening ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'}`}>
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm font-medium">
            {isListening ? 'Listening...' : 'Microphone is ready'}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          {isListening ? 'Speak clearly into your microphone' : 'Press "Start Recording" to begin'}
        </p>
      </div>
    </div>
  );
}