import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 text-sm py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
        <p>© {new Date().getFullYear()} All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          <a 
            href="https://github.com/Samy3nd" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white"
            aria-label="GitHub repository"
          >
            <FaGithub size={18} />
          </a>
          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}