
import '@/App.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

//item:title,desc,open,ver,updTime,ctime,userName,appid,tags

function formatDateTime(timestamp) {
  // 假设这是你的毫秒级时间戳

  // 创建一个新的Date对象
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
export default ({ itemData }) => {
  if (!itemData) {
    itemData = {}
  }

  // const [fileContent, setFileContent] = useState('');
  // useEffect(() => {
  //   const loadFile = async () => {
  //     console.log('/appFile/' + itemData.fileName)

  //     const response = await fetch('/appFile/' + itemData.fileName);
  //     const text = await response.text();
  //     // console.log("load="+text)
  //     setFileContent(text);
  //   };

  //   loadFile();
  // }, []);

  const openHtml = async () => {

    // console.log('/appFile/' + itemData.fileName)
    // const response = await fetch('/appFile/' + itemData.fileName);
    // const text = await response.text();


    // // console.log(htmlContent)
    // const blob = new Blob([text], { type: 'text/html' });
    // const blobUrl = URL.createObjectURL(blob);
    // window.open(blobUrl, '_blank');


    window.open('/appFile/' + itemData.fileName, '_blank');
  };

  function uint8ArrayToBase64(byteArray) {
    let binaryString = "";
    for (let i = 0; i < byteArray.byteLength; i += 1024) {
      const chunk = byteArray.subarray(i, Math.min(i + 1024, byteArray.byteLength));
      binaryString += String.fromCharCode.apply(null, chunk);
    }
    return btoa(binaryString);
  }
  async function  copyDataUrlToClipboard() {

    console.log('/appFile/' + itemData.fileName)
    const response = await fetch('/appFile/' + itemData.fileName);
    const text = await response.text();

    const encoder = new TextEncoder();
    const data = encoder.encode(text); // 将字符串编码为二进制数据
    // const base64 = btoa(String.fromCharCode(...new Uint8Array(data))); // 将二进制数据转换为Base64编码
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
      // alert('url已复制到剪贴板,可粘贴到浏览器url使用');
      // showPopup();
    }).catch(function (err) {
      console.error('无法复制文本: ', err);
    });
  }

  let downUrl = '/appFile/' + itemData.fileName;

  return (
    <div className="ua-post-item"  >

      <a className="ua-post-title"    onClick={() => openHtml()} >{itemData.title}</a>

      <p className="ua-post-summary" title={itemData.desc} onClick={() => openHtml()} >{itemData.desc}</p>

      <div className="ua-post-metadata">
        {itemData.userName}
        &nbsp;· {formatDateTime(itemData.updateTime)} 
        &nbsp;· {itemData.tag} · {itemData.marks} 
        &nbsp;· <a href="#" onClick={() => copyDataUrlToClipboard()}>复制url</a> · <a href="#" onClick={() => openHtml()} >直接打开</a> 
        &nbsp;· <a href={downUrl} download={itemData.title}>下载</a>
       </div>


    </div>

  )
}
