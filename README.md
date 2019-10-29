# 学习网站

https://www.cnblogs.com/h2zZhou/p/7250064.html

http://blog.haoji.me/chrome-plugin-develop.html#popup-he-background

https://segmentfault.com/a/1190000011997656

https://www.cnblogs.com/deng-cc/p/9053539.html

# TODO

1. 书签保存方式使用json或者谷歌浏览器书签格式
2. 书签保存方式使用一个文件存储
3. 基于git版本控制提供多区域 多tag类型选择
4. 通过ip获取位置信息进行无缝切换
5. 利用github功能提供免费存储
6. 同步算法
7. 对接chrome书签 进行全量或增量同步

# 数据结构

{"default":[{'name':'title','url':'http://baidu.com','icon':'123','time':'2019-01-01'}]}
{"tags":{"default":[{'name':'title','url':'http://baidu.com','icon':'123','time':'2019-01-01'}]}}
e2RlZmF1bHQ6W3snbmFtZSc6J3RpdGxlJywndXJsJzonaHR0cDovL2JhaWR1LmNvbScsJ2ljb24nOicxMjMnLCd0aW1lJzonMjAxOS0wMS0wMSd9XX0K

# 数据结构1

{
    "doctype": "netscape-bookmark-file-1",
    "meta":{
        "http-equiv":"Content-Type",
        "content":"text/html; charset=UTF-8"
    },
    "title":"bookmarks",
    "h1":"Bookmarks",
    "dlp": [
        {
            "dt": {
                "h3":{
                    "add_date":"144412313888",
                    "last_modified":"15717231238",
                    "personal_toolbar_folder":"true",
                    "value":"书签栏"
                }
            }
        },
        {
            "dlp": [
                {
                    "dt":{
                        "a":{
                            "href":"http://www.baidu.com/nbbs",
                            "add_date":"15123987182388",
                            "icon":"data:image/png;base64,VBORw0KGgoAAAANSUhEUgAAABAAAAAQCA",
                            "value":"联想"
                        }
                    }
                },
                {
                    "dt":{
                        "a":{
                            "href":"http://www.baidu.com/nbbs",
                            "add_date":"15123987182388",
                            "icon":"data:image/png;base64,VBORw0KGgoAAAANSUhEUgAAABAAAAAQCA",
                            "value":"联想"
                        }
                    }
                },
                {
                    "dt":{
                        "a":{
                            "href":"http://www.baidu.com/nbbs",
                            "add_date":"15123987182388",
                            "icon":"data:image/png;base64,VBORw0KGgoAAAANSUhEUgAAABAAAAAQCA",
                            "value":"联想"
                        }
                    }
                },
                {
                    "dlp":[
                        {
                            "dt":{
                                "a":{
                                    "href":"http://www.baidu.com/nbbs",
                                    "add_date":"15123987182388",
                                    "icon":"data:image/png;base64,VBORw0KGgoAAAANSUhEUgAAABAAAAAQCA",
                                    "value":"联想"
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
}