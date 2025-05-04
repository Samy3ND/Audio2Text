import { useState, useRef, useEffect } from 'react';
import Header from './Header';
import MainContent from './Hero';
import Footer from './Footer';
import { languages } from './constants';

export default function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [status, setStatus] = useState('Ready to begin');
  const [selectedLanguage, setSelectedLanguage] = useState('ne-NP');
  const [activeTab, setActiveTab] = useState('live');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileError, setFileError] = useState('');
  const recognitionRef = useRef(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <MainContent
        isListening={isListening}
        setIsListening={setIsListening}
        transcribedText={transcribedText}
        setTranscribedText={setTranscribedText}
        status={status}
        setStatus={setStatus}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
        progress={progress}
        setProgress={setProgress}
        fileError={fileError}
        setFileError={setFileError}
        recognitionRef={recognitionRef}
        languages={languages}
      />
      
      <Footer />
    </div>
  );
}