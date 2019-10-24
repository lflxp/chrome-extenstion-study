function Github(user,repos,token) {
    this.user = user
    this.repos = repos
    this.token = token
    this.url = 'https://api.github.com'
    this.headers = {'Authorization': 'token $tokens','Content-type': 'application/json'}
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
}

function SaveToken(token) {
    chrome.storage.local.set({'SaveToken':token},function() {
        console.log('Token已保存 ' + token)
    })
}

// https://chajian.baidu.com/developer/extensions/storage.html
function GetToken(key) {
    var data = chrome.storage.local.get(key,function(response) {
        console.log('get token' + response[0])
        return response 
    })
    return data
}