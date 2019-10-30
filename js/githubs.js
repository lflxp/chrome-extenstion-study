class Github {
    constructor(params) {
        this.user = params.user
        this.repos = params.repos
        this.token = params.token
        this.key = ['username','repos','token','tags'];
    
        this.url = 'https://api.github.com'
        this.tags = 'tags'
        this.session = 'session'
        this.bookmarks = 'bookmarks'
    }

    test() {
        debugger
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
    stringtobase64(info) {
        return window.btoa(info)
    }

    base64tostring(info) {
        return window.atob(info)
    }

    /*
    let 作用域比var更广 
    传输方法：PUT
    访问路径：https://api.github.com/repos/用户名/仓库名/contents/文件路径
    JSON格式：
        {
        "message": "commit from INSOMNIA",
        "content": "$sha="
        }
    */
    create(filepath,callback) {
        let data = {
            "message": "commit init",
            "content": "eyJkZWZhdWx0IjpbeyJuYW1lIjoidGl0bGUiLCJ1cmwiOiJodHRwOi8vYmFpZHUuY29tIiwiaWNvbiI6IjEyMyIsInRpbWUiOiIyMDE5LTAxLTAxIn1dfQo="
        }

        // 写法一 (result) 调用class作用域对象this
        chrome.storage.local.get(this.key,(result) => {
            this.user = result.username
            this.repos = result.repos
            this.token = result.token
            this.headers = {'Authorization': 'token '+this.token,'Content-type': 'application/json'}
            debugger
            if (this.user === '' || this.user === undefined) {
                return 'user is nil'
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

        // 写法二 function(result) 调用class作用域对象this
        var _this = this
        chrome.storage.local.get(this.key,function(result) {
            _this.user = result.username
            _this.repos = result.repos
            _this.token = result.token
            _this.headers = {'Authorization': 'token '+this.token,'Content-type': 'application/json'}
            debugger
            if (_this.user === '' || _this.user === undefined) {
                return 'user is nil'
            }

            $.ajax({
                type: 'PUT',
                url: _this.url + '/repos/' + _this.user + '/' + _this.repos + '/contents/' + filepath,
                headers: _this.headers,
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

        // 写法三 (result) 调用class作用域对象this并网络代码封装
        var _this = this
        chrome.storage.local.get(this.key,function(result) {
            _this.user = result.username
            _this.repos = result.repos
            _this.token = result.token
            _this.headers = {'Authorization': 'token '+this.token,'Content-type': 'application/json'}
            debugger
            if (_this.user === '' || _this.user === undefined) {
                return 'user is nil'
            }

            callback(params)
            // $.ajax({
            //     type: 'PUT',
            //     url: _this.url + '/repos/' + _this.user + '/' + _this.repos + '/contents/' + filepath,
            //     headers: _this.headers,
            //     data: JSON.stringify(data),
            //     dataType: 'json',
            //     success: function(result) {
            //         console.log('github add success' + result)
            //     },
            //     error: function(e) {
            //         console.log(e.status)
            //         alert('error '+ e.status)
            //     }
            // })
        })
    }

    createCallbackDemo(result,filepath,data) {
        // 后期user\repos\token由params提供
        this.user = result.username
        this.repos = result.repos
        this.token = result.token
        this.headers = {'Authorization': 'token '+this.token,'Content-type': 'application/json'}
        debugger
        if (this.user === '' || this.user === undefined) {
            return 'user is nil'
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

    // todo
}

function cb(result) {
    // todo
    console.log('ajax request')
}

// let github = new Github({'user':'lxp'})
github.create('tags/create',cb)