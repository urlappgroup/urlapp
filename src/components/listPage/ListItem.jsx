
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
const ListItem = ({ itemData,showType="list" }) => {

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
    <div className="ua-post-item"  >

      <a className="ua-post-title" onClick={() => openAppHtml()} >{itemData.title}</a>

      <p className="ua-post-summary" title={itemData.desc} onClick={() => openAppHtml()} >{itemData.desc}</p>

      <div className="ua-post-metadata" title={"appId:" + itemData.appId}>
        {itemData.userName}
        &nbsp;· {formatDateTime(itemData.updateTime)}
        &nbsp;· {itemData.tag} · {itemData.marks} · {itemData.license}
        &nbsp;· <a class="ua-run-button" href="#" onClick={() => openAppHtml()} ><div class="ua-play-icon"></div>运行</a>
        &nbsp;· <a href="#" onClick={() => copyDataUrlToClipboard()}>复制urlapp</a> 
        &nbsp;· {itemData.appDocName && <a href="#" onClick={() => openAppDetailPage()} >使用说明</a>}
        &nbsp;· <a href={appUrl} download={itemData.title}>下载</a>
        &nbsp;· <a href="#" onClick={() => shareCurPage()} >分享</a>
        {itemData.discussUrl && " · "}{itemData.discussUrl && <a href={itemData.discussUrl}  >讨论和反馈</a>}
        &nbsp;· <a href={"https://github.com/urlappgroup/urlapp/discussions/categories/report-violation"}  >举报</a>
      </div>


    </div>

  )
}


export default ListItem 