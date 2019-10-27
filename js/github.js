function Github(user,repos,token) {
    this.user = user
    this.repos = repos
    this.token = token
    this.url = 'https://api.github.com'
    this.headers = {'Authorization': 'token NWUxZTgyMDQ3N2RhNzNhMTQ3ZjZjOGViYzA0OWU3MDIzZThlOGE5MQo ','Content-type': 'application/json'}
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
            "content": "IyAyMDE5IG5ldyBmaWxlCg=="
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
    }

    this.get = function(filepath) {
        var r;
        $.ajax({
            type: 'GET',
            url: this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + filepath,
            headers: this.headers,
            async: false,
            success: function(result) {
                console.log('github get success' + JSON.stringify(result),result['sha'])
                r = result
                return result
            },
            error: function(e) {
                console.log(e.status)
            }
        })
        return r
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
    }
}

var user1 = {'name': 'diego', 'age': 18}
function SaveToken(data) {
    chrome.storage.local.set(data,function() {
        console.log('Token已保存 ' + data)
    })
}
SaveToken({'user1':user1});

// https://chajian.baidu.com/developer/extensions/storage.html
// https://www.jianshu.com/p/f6ac6e3ee7a3
function GetToken(key) {
    var data;
    chrome.storage.local.get(key,function(result) {
        console.log('get token ' + JSON.stringify(result))
        data = result
        console.log('name: ' + result['user1'].name + '<br>' + 'age: ' + result['user1'].age );
        return result 
    })
    console.log('token data',data);
    return data
}