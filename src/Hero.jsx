import { useState, useEffect } from 'react';
import Tabs from './Tabs';
import LanguageSelector from './LangSelect';
import LiveTranscription from './Live';
import FileUpload from './Fileupload';
import StatusIndicator from './Status';
import TranscriptionResult from './Result';
import ActionButtons from './Action';

export default function MainContent({
  isListening,
  setIsListening,
  transcribedText,
  setTranscribedText,
  status,
  setStatus,
  selectedLanguage,
  setSelectedLanguage,
  activeTab,
  setActiveTab,
  isProcessing,
  setIsProcessing,
  progress,
  setProgress,
  fileError,
  setFileError,
  recognitionRef,
  languages
}) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 -mt-8">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="p-6 md:p-8">
          <LanguageSelector 
            languages={languages}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />

          {activeTab === 'live' ? (
            <LiveTranscription
              isListening={isListening}
              setIsListening={setIsListening}
              setTranscribedText={setTranscribedText}
              setStatus={setStatus}
              setProgress={setProgress}
              progress={progress}
              recognitionRef={recognitionRef}
              selectedLanguage={selectedLanguage}
            />
          ) : (
            <FileUpload
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              setTranscribedText={setTranscribedText}
              setStatus={setStatus}
              setProgress={setProgress}
              progress={progress}
              fileError={fileError}
              setFileError={setFileError}
            />
          )}

          <StatusIndicator status={status} />
          
          <TranscriptionResult 
            transcribedText={transcribedText} 
            activeTab={activeTab} 
          />
          
          {transcribedText && (
            <ActionButtons
              transcribedText={transcribedText}
              setTranscribedText={setTranscribedText}
              setStatus={setStatus}
            />
          )}
        </div>
      </div>
    </main>
  );
}