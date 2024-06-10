# 概述
本文说明如何发布一个urlapp到本站  

出于内容安全和服务可用性架构设计考虑，不提供实时录入urlapp的方法，需要有一个人工审核流程
目前,我们通过以下2种渠道接收urlapp的发布和更新
- 通过邮件 urlappgroup@gmail.com
- 通过github [发布板块地址](https://github.com/urlappgroup/urlapp/discussions/categories/publish-urlapp)

# 提交发布请求
两种方式提交的内容格式完全一样，只是提交的渠道不同
## 1使用邮件发布
发送到邮箱urlappgroup@gmail.com
提交后后续进展会回复邮件

## 使用github discussions提交
[发布板块地址](https://github.com/urlappgroup/urlapp/discussions/categories/publish-urlapp)

点击【New discussion】，选择category为publish-urlapp，提交一个urlapp发布请求

后续进展会通过回帖，修改状态方式反馈


# 发布请求格式
### 邮箱
urlappgroup@gmail.com
### 标题格式
[发布]appId-app名称

|  字段   | 说明  |示例  |
|  ----  | ----  |----  |
| appId  | 唯一确定一个app，由邮箱和app驼峰名称拼接得到 | abc@163.com/demoApp |
| app名称  | app的中文名字 | 示例app |
| 邮件标题  | 拼接好的邮件标题 | [发布]abc@163.com/demoApp-示例app |

### 正文
正文填写app相关信息，以json方式提供
|  字段   | 说明  |示例  |
|  ----  | ----  |----  |
| title  | app标题 | html文本编辑 |
| desc  | app说明，展示在标题下方，建议不要超过3行100字 | 一个极简文本编辑页面,适合临时文本编辑/查看场景.还能贴入图片 |
| tag  | 分类标签，填写你认为合理的分类标签，但是urlapp平台会根据需要修改 | 文本编辑 |
| fileName  | app的html文件名称 | textEditor.html |
| userName  | 用户昵称 | 张三 |
| userEmail  | 重要！这个邮箱用来确认app归属，只使用这个邮箱确认app归属人，可以不是发送邮件的邮箱 | aaa@126.com |
| version  | app版本号，“v1.0.0”格式 | v1.0.0 |
| license  | 开源协议名称，建议使用MIT或者Apache-2.0 | Apache-2.0 |
| appId  | 唯一确定app的id，由作者邮箱+驼峰app名称拼接 | abc@163.com/textEditor |
 

示例：
``` 
    {
        "title": "html文本编辑",
        "desc": "一个极简文本编辑页面,适合临时文本编辑/查看场景.还能贴入图片",
        "tag": "文本编辑",
        "fileName": "textEditor.html",
        "userName": "meepo",
        "userEmail": "meepo@meepo.com",
        "version": "v1.0.0",
        "license": "Apache-2.0",
        "appId": "meepo@meepo.com/textEditor"
    }
``` 
### 附件填写
urlapp的html文件，只支持一个html文件
 
