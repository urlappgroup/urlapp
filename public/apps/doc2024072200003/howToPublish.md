# 概述
本文说明如何发布一个urlapp到本站  

出于内容安全和服务可用性架构设计考虑，不提供实时录入urlapp的方法，需要有一个人工审核流程  
目前,我们通过以下渠道接收urlapp的发布和更新
- 通过github [发布板块地址](https://github.com/urlappgroup/urlapp/discussions/categories/publish-urlapp)

# 使用github discussions提交
[发布板块地址](https://github.com/urlappgroup/urlapp/discussions/categories/publish-urlapp)

点击【New discussion】，选择category为publish-urlapp，提交一个urlapp发布请求

后续平台收录进展会通过回帖，修改状态方式反馈

发布和更新可以独立发帖，但是建议附带第一次发布app帖子的跳转链接，平台会以首次发布帖子的讨论和评价作为排序指标参考


# 发布请求格式

### 标题格式
[发布/更新]app名称-版本号

|  字段   | 说明  |示例  |
|  ----  | ----  |----  |
| 更新类型  | [发布]或者[发布] | [发布] |
| app名称  | app的中文名字 | 示例app |
| 版本号 | app的版本号 | v1.0.0 |
| 完整标题  | 上述元素拼接好的标题 | [发布]示例app-v1.0.0 |


### 正文
正文填写app相关信息，以json方式提供
|  字段   | 说明  |示例  |
|  ----  | ----  |----  |
| title  | app标题 | html文本编辑 |
| desc  | app说明，展示在标题下方，建议不要超过3行100字 | 一个极简文本编辑页面,适合临时文本编辑/查看场景.还能贴入图片 |
| tag  | 分类标签，目前只支持（在线工具,游戏,微应用,原型设计），urlapp平台可能会跟进需要修改分类 | 文本编辑 |
| fileName  | app的html文件名称，最大200k | textEditor.html |
| appDocName  | (可选)app的html说明文档文件名称，允许附加一个说明文档，最大1M，会在详情页展示 | textEditor.html |
| userName  | 用户昵称 | 张三 |
| userEmail  | 重要！这个邮箱用来确认app归属，只使用这个邮箱确认app归属人，可以不是发送邮件的邮箱 | aaa@126.com |
| version  | app版本号，“v1.0.0”格式 | v1.0.0 |
| license  | 开源协议名称，建议使用MIT或者Apache-2.0 | Apache-2.0 |
| appId  | 平台为app生成的唯一id，更新时需提交，创建时不用填 |  app2024072200001|
 

示例：
``` 
    {
        "title": "html文本编辑",
        "desc": "一个极简文本编辑页面,适合临时文本编辑/查看场景.还能贴入图片",
        "tag": "文本编辑",
        "fileName": "textEditor.html",
        "appDocName": "appDoc.html",
        "userName": "meepo",
        "userEmail": "meepo@meepo.com",
        "version": "v1.0.0",
        "license": "Apache-2.0",
        "appId": "app2024072200009"
    }
``` 
### 附件填写
urlapp的html文件，只支持一个html文件  
！！文件需要压缩zip，否则github不让上传
 
