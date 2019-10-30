function Github() {
    // this.user = user
    // this.repos = repos
    // this.token = token
    this.user = ''
    this.repos = ''
    this.token = ''
    this.key = ['username','repos','token','tags'];
    
    this.url = 'https://api.github.com'
    this.tags = 'tags'
    this.session = 'session'
    this.bookmarks = 'bookmarks'

    this.test = function() {
        console.log('ajax test')
        // https://www.e-learn.cn/content/wangluowenzhang/14974
        // https://blog.csdn.net/xianhenyuan/article/details/92669817
        $.ajax({
            type: 'GET',
            url: 'https://www.baidu.com',
            success: function(result) {
                console.log(result)
                alert('baidu' + result)
            },
            error: function(e) {
                console.log(e.status)
                alert('error '+ e.status)
            }
        })
    }

    // https://www.jianshu.com/p/14437764eff3
    this.stringtobase64 = function(info) {
        return window.btoa(info)
    }

    this.base64tostring = function(info) {
        return window.atob(info)
    }

    /*
    传输方法：PUT
    访问路径：https://api.github.com/repos/用户名/仓库名/contents/文件路径
    JSON格式：
        {
        "message": "commit from INSOMNIA",
        "content": "$sha="
        }
    */
    this.create = function(filepath) {
        var data = {
            "message": "commit init",
            "content": "eyJkZWZhdWx0IjpbeyJuYW1lIjoidGl0bGUiLCJ1cmwiOiJodHRwOi8vYmFpZHUuY29tIiwiaWNvbiI6IjEyMyIsInRpbWUiOiIyMDE5LTAxLTAxIn1dfQo="
        }

        chrome.storage.local.get(this.key,function(result) {
            this.url = 'https://api.github.com'
            this.user = result.username
            this.repos = result.repos
            this.token = result.token
            this.headers = {'Authorization': 'token '+this.token,'Content-type': 'application/json'}
            console.log('1111 '+ this.user+this.repos+this.token)
            if (this.user === '' || this.user === undefined) {
                alert('user is nil')
                return
            }

            $.ajax({
                type: 'PUT',
                url: this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + filepath,
                headers: this.headers,
                data: JSON.stringify(data),
                dataType: 'json',
                success: function(result) {
                    console.log('github add success' + result)
                },
                error: function(e) {
                    console.log(e.status)
                    alert('error '+ e.status)
                }
            })
        })
        
    }

    // 远程加载
    this.get = function(filepath) {
        // 全量清空 然后再加载
        chrome.bookmarks.getTree((re) => {
            // console.log('reeee',JSON.stringify(re),re[0])
            removeall(re);

            chrome.storage.local.get(this.key,function(result) {
                this.url = 'https://api.github.com'
                this.user = result.username
                this.repos = result.repos
                this.token = result.token
                this.headers = {'Authorization': 'token '+this.token,'Content-type': 'application/json'}
                console.log('1111 '+ this.user+this.repos+this.token)
                if (this.user === '' || this.user === undefined) {
                    alert('user is nil')
                    return
                }
                $.ajax({
                    type: 'GET',
                    url: this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + filepath,
                    headers: this.headers,
                    async: false,
                    success: function(result) {
                        console.log('github get success' + JSON.stringify(result),result['content'],window.atob(result['content']))
                        // chrome.storage.local.set({'tags':result['content']},function(){
                        //     console.log('get data set local set');
                        // })
    
                        // 全量清空 然后再加载
                        // chrome.bookmarks.removeTree('0',(rt) => {
                        //     console.log('removeTree',JSON.stringify(rt));
                        //     chrome.bookmarks.create(JSON.parse(window.atob(result['content'])),(result) => {
                        //         console.log('create new Tree',JSON.stringify(result));
                        //     })
                        // })
                        addAll(JSON.parse(window.atob(result['content'])),'');
                        // addAll(window.atob(result['content']),'');
                        // addAll(result['content'],'');
                        alert('同步完成');
                    },
                    error: function(e) {
                        console.log(e.status)
                    }
                })
            })
        });
    }

    // todo 远程同步
    this.updateTags = function(filepath,message) {
        chrome.storage.local.get(this.key,function(result) {
            let _this = this
            this.url = 'https://api.github.com'
            this.user = result.username
            this.repos = result.repos
            this.token = result.token
            var tags = result.tags
            this.headers = {'Authorization': 'token '+this.token,'Content-type': 'application/json'}
            console.log('1111 '+ this.user+this.repos+this.token)
            if (this.user === '' || this.user === undefined) {
                alert('user is nil')
                return
            }

            var urls = this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + filepath
            console.log('urls',urls);
            console.log('sync tags ',JSON.stringify(tags));
            $.ajax({
                type: 'GET',
                url: urls,
                headers: this.headers,
                dataType: 'json',
                success: function(result) {
                    console.log('github get success' + JSON.stringify(result),result['sha'])
                    chrome.bookmarks.getTree((re) => {
                        console.log('reeee',JSON.stringify(re))
                        // "content": window.btoa(encodeURIComponent(JSON.stringify(re))),
                        var data = {
                            "message": '全量同步bookmarks',
                            "content": window.btoa(unescape(encodeURIComponent(JSON.stringify(re)))),
                            "sha": result['sha']
                        }
                    
                        var urls = _this.url + '/repos/' + _this.user + '/' + _this.repos + '/contents/' + filepath
                        console.log('urls',urls,data)
                        $.ajax({
                            type: 'PUT',
                            url: urls,
                            headers: _this.headers,
                            data: JSON.stringify(data),
                            dataType: 'json',
                            success: function(result1) {
                                console.log('github update success' + JSON.stringify(result1))
                            },
                            error: function(e) {
                                console.log('update update error',e.status)
                            }
                        })
                    })
                },
                error: function(e) {
                    console.log('update get error',e.status)
                }
            })
        })
    }

    /*
    传输方法：PUT
    访问路径：https://api.github.com/repos/用户名/仓库名/contents/文件路径
    JSON格式：
        {
        "message": "update from INSOMNIA",
        "content": "$sha",
        "sha": "$sha"
        }
    */
    this.update = function(filepath,message,content) {
        chrome.storage.local.get(this.key,function(result) {
            this.url = 'https://api.github.com'
            this.user = result.username
            this.repos = result.repos
            this.token = result.token
            this.headers = {'Authorization': 'token '+this.token,'Content-type': 'application/json'}
            console.log('1111 '+ this.user+this.repos+this.token)
            if (this.user === '' || this.user === undefined) {
                alert('user is nil')
                return
            }

            var urls = this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + filepath
            console.log('urls',urls)
            $.ajax({
                type: 'GET',
                url: urls,
                headers: this.headers,
                dataType: 'json',
                success: function(result) {
                    console.log('github get success' + JSON.stringify(result),result['sha'])
                    var data = {
                        "message": message,
                        "content": window.btoa(content),
                        "sha": result['sha']
                    }

                    console.log('urls',urls)
                    $.ajax({
                        type: 'PUT',
                        url: urls,
                        headers: this.headers,
                        data: JSON.stringify(data),
                        dataType: 'json',
                        success: function(result1) {
                            console.log('github update success' + JSON.stringify(result1))
                        },
                        error: function(e) {
                            console.log('update update error',e.status)
                        }
                    })
                },
                error: function(e) {
                    console.log('update get error',e.status)
                }
            })
        })
    }

    /*
    传输方法：DELETE
    访问路径：https://api.github.com/repos/用户名/仓库名/contents/文件路径
    JSON格式：
    {
    "message": "delete a file",
    "sha": "$sha"
    }
    */
    this.delete = function(filepath,message) {
        chrome.storage.local.get(this.key,function(result) {
            this.url = 'https://api.github.com'
            this.user = result.username
            this.repos = result.repos
            this.token = result.token
            this.headers = {'Authorization': 'token '+this.token,'Content-type': 'application/json'}
            console.log('1111 '+ this.user+this.repos+this.token)
            if (this.user === '' || this.user === undefined) {
                alert('user is nil')
                return
            }

            var urls = this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + filepath
            console.log('urls',urls)
            $.ajax({
                type: 'GET',
                url: urls,
                headers: this.headers,
                dataType: 'json',
                success: function(result) {
                    console.log('github get success' + JSON.stringify(result),result['sha'])
                    var data = {
                        "message": message,
                        "sha": result['sha']
                    }

                    console.log('urls',urls)
                    $.ajax({
                        type: 'DELETE',
                        url: urls,
                        headers: this.headers,
                        data: JSON.stringify(data),
                        dataType: 'json',
                        success: function(result1) {
                            console.log('github delete success' + JSON.stringify(result1))
                        },
                        error: function(e) {
                            console.log('delete error',e.status)
                        }
                    })
                },
                error: function(e) {
                    console.log('delete error',e.status)
                }
            })
        })
    }
}

function SaveToken(data) {
    chrome.storage.local.set(data,function() {
        console.log('Token已保存 ' + data)
    })
}

// https://chajian.baidu.com/developer/extensions/storage.html
// https://www.jianshu.com/p/f6ac6e3ee7a3
// https://www.e-learn.cn/content/wangluowenzhang/48908
function GetToken(key) {
    var username = '';
	var repos = '';
	var token = '';
    chrome.storage.local.get(key,function(result) {
        username = result['username'];
        repos = result['repos'];
        token = result['token'];
        console.log('get token ' + JSON.stringify(result));
    })
    return username+ ' ' + repos+ ' '+ token 
}

function GetGithub() {
    // function Github(user,repos,token) 
    var username = '';
	var repos = '';
	var token = '';
    var key = ['username','repos','token'];
    chrome.storage.local.get(key,function(result){
        username = result.username;
        repos = result.repos;
        token = result.token;
		console.log(username+repos+token);
        // $('#username').val(username);
        // $('#repos').val(repos);
        // $('#token').val(token);
        console.log('over set token');
    })
}

// todo 直接popup.js获取
// 1. 本地获取
// var localdata;
// function getlocaldata() {
//     chrome.storage.local.get('tags',function(result){
//         localdata = result;
//     })
// }
// 2. 本地存储
// 3. 本地修改
// 4. 本地删除

// var user1 = {'name': 'diego', 'age': 18}
// chrome.storage.local.set({'user1':user1},function() {
//     console.log('Token user1 save')
// })

// chrome.storage.local.get('username',function(result) {
//     $('#brand').val(result.username);
// })

// http://docs.getxhr.com/ChromeExtensionDocument/bookmarks.html
// http://docs.getxhr.com/ChromeExtensionDocument/samples.html#39c879e6ea31a83cb901ae55a5fcf76a
function getbookmarks() {
    // chrome.bookmarks.get('书签栏',function(result) {
    //     console.log('result',JSON.stringify(result))
    // })

    // chrome.bookmarks.getRecent(10,function(result){
    //     console.log('result',JSON.stringify(result));
    // })

    // chrome.bookmarks.getSubTree('1',function(result){
    //     console.log('result',JSON.stringify(result));
    // })

    chrome.bookmarks.getTree(cb);
}

function cb(result) {
    console.log('result',JSON.stringify(result));
}

function cbsync(result) {
    console.log('github get success' + JSON.stringify(result),result['sha'])
    chrome.bookmarks.getTree((re) => {
        var data = {
            "message": '全量同步bookmarks',
            "content": window.btoa(encodeURIComponent(JSON.stringify(re))),
            "sha": result['sha']
        }
    
        var urls = 'https://api.github.com/repos/' + this.user + '/' + this.repos + '/contents/' + filepath
        console.log('urls',urls)
        $.ajax({
            type: 'PUT',
            url: urls,
            headers: this.headers,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(result1) {
                console.log('github update success' + JSON.stringify(result1))
            },
            error: function(e) {
                console.log('update update error',e)
            }
        })
    })
}

// 递归全量清空
// todo remove v.id in [0,1,2,3]
function removeall(data) {
    data.forEach((v) => {
        if (v.url === undefined) {
            chrome.bookmarks.removeTree(v.id,function(rs) {
            // chrome.bookmarks.remove(v.id,function(rs) {
                console.log('remove tree success',v.id,JSON.stringify(rs))
            })
            removeall(v.children)
        }
        chrome.bookmarks.remove(v.id,function(rr) {
            console.log('remove single',v.id,JSON.stringify(rr))
        })
    })
}

// 递归全量导入
// bookmark ( object )
// parentId ( optional string )
// Defaults to the Other Bookmarks folder.
// index ( optional integer )
// title ( optional string )
// url ( optional string )
function addAll(data,parentname) {
    console.log('addAll',data)
    // debugger
    data.forEach((v) => {
        if (v.children !== undefined) {
            // chrome.bookmarks.search(parentname,function(trs) {
            //     console.log('search ',v.title,v.index,v.url,parentname,JSON.stringify(trs))
            //     if (trs.length > 0) {
            //         trs.forEach((tt) => {
            //             var tmp = {
            //                 parentId: tt.id,
            //                 title: v.title
            //             }
            //             // Unchecked runtime.lastError: Can't find parent bookmark for id.
            //             chrome.bookmarks.create(tmp,function(rs) {
            //                 console.log('add mulu ',v.id,v.title,JSON.stringify(rs))
            //             })
            //         })
            //     } else {
            //         var tmp = {
            //             parentId: v.parentId,
            //             title: v.title
            //         }
            //         // Unchecked runtime.lastError: Can't find parent bookmark for id.
            //         chrome.bookmarks.create(tmp,function(rs) {
            //             console.log('add mulu ',v.id,v.title,parentname,JSON.stringify(rs))
            //         })
            //     }
            // })
            
            var tmp = {
                parentId: "1",
                title: v.title
            }
            // Unchecked runtime.lastError: Can't find parent bookmark for id.
            chrome.bookmarks.create(tmp,function(rs) {
                console.log('add mulu ',v.id,v.title,parentname,JSON.stringify(rs))
            })
            addAll(v.children,v.title)
        }
        var tmp = {
            parentId: "1",
            title: v.title,
            url: v.url
        }
        chrome.bookmarks.create(tmp,function(rrs) {
            console.log('add url ',v.id,v.title,v.url,parentname,JSON.stringify(rrs)) 
        })
        // chrome.bookmarks.search(parentname,function(trs) {
        //     console.log('search ',v.title,v.index,v.url,parentname,JSON.stringify(trs))
        //     if (trs.length>0) {
        //         trs.forEach((tt) => {
        //             var tmp = {
        //                 parentId: tt.id,
        //                 title: v.title,
        //                 url: v.url
        //             }
        //             chrome.bookmarks.create(tmp,function(rrs) {
        //                 console.log('add url ',v.id,v.title,v.url,parentname,JSON.stringify(rrs)) 
        //             })
        //         })
        //     } else {
        //         var tmp = {
        //             parentId: v.parentId,
        //             title: v.title,
        //             url: v.url
        //         }
        //         chrome.bookmarks.create(tmp,function(rrs) {
        //             console.log('add url ',v.id,v.title,v.url,parentname,JSON.stringify(rrs)) 
        //         })
        //     }
        // })
    })
}