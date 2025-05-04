export default function LanguageSelector({ languages, selectedLanguage, setSelectedLanguage }) {
  return (
    <div className="mb-8">
      <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select Language
      </label>
      <div 
        id="language-select"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2"
        role="listbox"
        aria-label="Available languages"
      >
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => setSelectedLanguage(lang.code)}
            className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${
              selectedLanguage === lang.code ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 hover:bg-gray-50'
            }`}
            role="option"
            aria-selected={selectedLanguage === lang.code}
            aria-label={`Select ${lang.name} language`}
          >
            <span className="text-lg" aria-hidden="true">{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}