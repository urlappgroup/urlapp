
# 什么是urlapp
urlapp是一种轻量开源app封装形式。
它使用Data URL规范（参考：[Data URL 规范](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)），封装一个单页面html应用为一个url，使用浏览器访问url可直接使用app。

# 特性对比
## 优点
* 无需安装，永久可用
  * urlapp已经包含app全部代码，不需要安装下载
* 全平台支持，只依赖浏览器
  * urlapp运行在浏览器上，而几乎所有平台都支持浏览器
* 易于分发
  * urlapp只是一段文本url，且非常轻量，你可以通过发帖的方式直接发布一个urlapp
* 开源
  * urlapp包含了全部源码，可以直接查看和修改
* 轻量秒开
  * 通常urlapp的尺寸在250k以下，浏览器限制了url长度
  * 打开时间只有几个毫秒
* 安全，浏览器对网页有严格限制
  * dataurl模式运行时，浏览器限制非常严格，大部分浏览器的api都被限制了
  * html模式运行时，浏览器会保证网页运行在沙盒中，保证安全

## 限制和风险
* app尺寸限制
  * 通常在250k以内，否则因浏览器url长度限制会被截断（但是可以以html文件形式运行解除限制）
* 出于安全原因，现代浏览器对dataurl做了更多限制
  * 不允许直接打开一个data url页面，只能手动复制到地址栏
  * 不能访问很多api，比如不能使用localStorage（但是可以以html文件形式运行解除限制）
* 代码篡改风险
  * 由于以源码形式分发，你拿到的urlapp可能已经被篡改并植入恶意代码了，需要仔细甄别
    * 尽可能使用url形式运行app，此时urlapp几乎获取不了任何用户信息
    * 避免向urlapp输入任何隐私信息，除非你确认app可信
    * 尽可能从官方渠道获取urlapp
* 代码强制开源
  * 由于urlapp以源码形式分发执行，urlapp天然就是开源的，无法避免软件被复制，修改
    * 建议使用开源协议保护版权



# 如何开发
urlapp本身就是一个单页面html应用，因此使用html+css+js开发一个html文件作为app即可

可以参考[Data URL 规范](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)自行编码为data url

urlapp项目附带一个转换工具:[html转dataurl](/appFile/makeDataUrl.html)

# 其他注意事项
1. html文件大小  
由于浏览器限制,过长url会被截断,目前chrome的限制大约是512k,建议html不超过256k

2. 中文编码  
请在html的header中添加<meta charset="UTF-8">,并使用utf8编码所有文本资源
