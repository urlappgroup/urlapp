import '@/App.css'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-purple-100">
          {/* Logo & Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              urlapp
            </h3>
            <p className="text-sm text-purple-200">
              一个简单而强大的在线工具集合，让您的工作更轻松。
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-purple-200 hover:text-white transition duration-300">关于我们</a>
              </li>
              <li>
                <a href="/docs" className="text-purple-200 hover:text-white transition duration-300">使用文档</a>
              </li>
              <li>
                <a href="https://github.com/urlappgroup/urlapp" className="text-purple-200 hover:text-white transition duration-300">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">联系我们</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/urlappgroup/urlapp" className="text-purple-200 hover:text-white transition duration-300">
                  GitHub
                </a>
              </li>
              <li>
                <a href="mailto:urlappgroup@gmail.com" className="text-purple-200 hover:text-white transition duration-300">
                  urlappgroup@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
