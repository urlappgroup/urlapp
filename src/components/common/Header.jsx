import '@/App.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/listPage?searchKey=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 hover:from-purple-100 hover:to-white transition duration-300">
                urlapp
              </span>
            </a>
          </div>

          {/* Search Section */}
          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索应用..."
                className="w-full h-8 pl-3 pr-8 text-sm rounded-lg bg-white/10 backdrop-blur-md 
                         text-white placeholder-purple-200 border border-purple-400/30
                         focus:outline-none focus:ring-2 focus:ring-purple-300/50
                         transition duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-200 
                         hover:text-white transition duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Navigation Section */}
          <nav className="flex items-center space-x-4">
            <a href="/about" className="text-sm text-purple-200 hover:text-white transition duration-300">
              关于
            </a>
            <a href="/docs" className="text-sm text-purple-200 hover:text-white transition duration-300">
              文档
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
