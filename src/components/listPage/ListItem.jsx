import '@/App.css'
import { useNavigate } from 'react-router-dom';


function formatDateTime(timestamp) {
  const date = new Date(timestamp);

  // 获取日期和时间的各个组成部分
  const year = date.getFullYear(); // 年份
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份，getMonth() 返回 0-11，所以需要 +1
  const day = String(date.getDate()).padStart(2, '0'); // 天，getDate() 返回1-31
  const hours = String(date.getHours()).padStart(2, '0'); // 小时
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 分钟
  const seconds = String(date.getSeconds()).padStart(2, '0'); // 秒

  // 按照YYYY-MM-DD HH:mm:ss的格式手动拼接字符串
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}
const ListItem = ({ itemData, showType="list" }) => {

  if (!itemData) {
    itemData = {}
  }
  const getAppHtmlPath =  (item) => {
    return '/apps/' + item.appId + '/' + item.fileName;
  };

  const openAppHtml =  () => {
    window.open(getAppHtmlPath(itemData), '_blank');
  };
  const onItemCardClick =  () => {
    if(showType=="detail"){
      openAppHtml()
    }else{
      openAppDetailPage()
    }
  };
  let navigate = useNavigate();

  const openAppDetailPage =  () => {
    navigate('/detailPage?appId=' + itemData.appId);
  };

  const shareCurPage =  () => {
   
    const url = window.location.href;

    navigator.clipboard.writeText(url).then(() => {
      const promptMessage = `当前页面url已复制到剪贴板,也可以手动复制`;
      prompt(promptMessage, url);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });

  };

  function uint8ArrayToBase64(byteArray) {
    let binaryString = "";
    for (let i = 0; i < byteArray.byteLength; i += 1024) {
      const chunk = byteArray.subarray(i, Math.min(i + 1024, byteArray.byteLength));
      binaryString += String.fromCharCode.apply(null, chunk);
    }
    return btoa(binaryString);
  }
  async function copyDataUrlToClipboard() {

    console.log(getAppHtmlPath(itemData))
    const response = await fetch(getAppHtmlPath(itemData));
    const text = await response.text();

    const encoder = new TextEncoder();
    const data = encoder.encode(text); // 将字符串编码为二进制数据
    const base64 = uint8ArrayToBase64(new Uint8Array(data));

    if (base64.length > 256 * 1024) {
      alert("url大小超过256k,浏览器可能会会截断url导致加载异常(如chrome最大支持512k),试试直接打开或者下载文件后使用")
    }

    console.log(base64); // 输出 "5L2g5aW977yM5LiW55WM"

    var url = "data:text/html;base64," + base64;
    copyToClipboard(url)
  }


  function copyToClipboard(textToCopy) {
    navigator.clipboard.writeText(textToCopy).then(function () {

    }).catch(function (err) {
      console.error('无法复制文本: ', err);
    });
  }

  let appUrl=getAppHtmlPath(itemData);
  // console.log(appUrl)

  return (
    <div className="group p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* 标题部分 */}
          <a 
            className="inline-block text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 cursor-pointer transition-all duration-300" 
            onClick={() => openAppHtml()}
          >
            {itemData.title}
          </a>

          {/* 描述部分 */}
          <p 
            className="mt-2 text-sm text-gray-600 ua-post-summary group-hover:text-gray-800 transition-colors duration-300" 
            title={itemData.desc} 
            onClick={() => openAppHtml()}
          >
            {itemData.desc}
          </p>

          {/* 合并元信息和操作按钮到一行 */}
          <div className="mt-3 flex items-center justify-between text-xs">
            {/* 左侧元信息 */}
            <div className="flex items-center gap-2 text-gray-500">
              <span title={itemData.userName}>{itemData.userName}</span>
              <span title={formatDateTime(itemData.updateTime)}>{formatDateTime(itemData.updateTime)}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-600">
                {itemData.tag}
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-600">
                {itemData.marks}
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {itemData.license}
              </span>
            </div>

            {/* 右侧操作按钮 */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => openAppHtml()}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                运行
              </button>

              <button
                onClick={() => copyDataUrlToClipboard()}
                className="px-2 py-1 rounded-md border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-all duration-300"
              >
                复制
              </button>

              {itemData.appDocName && (
                <button
                  onClick={() => openAppDetailPage()}
                  className="px-2 py-1 rounded-md border border-purple-200 text-purple-600 hover:bg-purple-50 transition-all duration-300"
                >
                  说明
                </button>
              )}

              <a
                href={appUrl}
                download={itemData.title}
                className="px-2 py-1 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-300"
              >
                下载
              </a>

              <button
                onClick={() => shareCurPage()}
                className="px-2 py-1 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-300"
              >
                分享
              </button>

              {itemData.discussUrl && (
                <a
                  href={itemData.discussUrl}
                  className="px-2 py-1 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-300"
                >
                  反馈
                </a>
              )}

              <a
                href="https://github.com/urlappgroup/urlapp/discussions/categories/report-violation"
                className="px-2 py-1 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-300"
              >
                举报
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
