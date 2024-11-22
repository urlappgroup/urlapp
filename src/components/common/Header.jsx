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
            <a href="/detailPage?appId=doc2024072200001" className="text-sm text-purple-200 hover:text-white transition duration-300">
              关于
            </a>
            <a href="/listPage?tag=文档" className="text-sm text-purple-200 hover:text-white transition duration-300">
              文档
            </a>
            <a 
              href="https://github.com/urlappgroup/urlapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-200 hover:text-white transition duration-300"
            >
              <svg height="24" width="24" viewBox="0 0 16 16" className="fill-current">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
