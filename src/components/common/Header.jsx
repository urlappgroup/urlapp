import '@/App.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigate('/listPage?searchKey='+searchText);
    }
  }
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };
 
  return (
    <header className="flex items-center justify-between px-4 py-1 bg-white border-b border-gray-200">
      <a href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
        urlapp
      </a>

      <div className="flex items-center gap-3">
        <input 
          type="text" 
          id="searchInput" 
          onChange={handleChange}
          onKeyUp={handleKeyPress} 
          placeholder="请输入搜索关键词，按回车生效"
          className="w-64 px-2 py-0.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
        />

        <a 
          href="https://github.com/urlappgroup/urlapp" 
          className="text-gray-700 hover:text-gray-900 transition-colors"
          target="_blank" 
          title="访问我们的GitHub项目"
        >
          <svg 
            height="20" 
            aria-hidden="true" 
            viewBox="0 0 16 16" 
            version="1.1" 
            width="20" 
            className="fill-current"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
        </a>
      </div>
    </header>
  )
}
export default Header
