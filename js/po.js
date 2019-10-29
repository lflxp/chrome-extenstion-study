
// popup调用background的js函数
$('#bg').click(() => {
	//alert("调用background的js函数");
	var bg = chrome.extension.getBackgroundPage();
	console.log(123123, bg)
	bg.bgtest();
});

$('#jump').click(() => {
	newTab()
})

// https://www.cnblogs.com/hjqbit/p/7260110.html
// chrome扩展程序获取当前页面URL和HTML内容

$('#ttt').click(() => {
	var username = document.getElementById("username").value;
	var repos = document.getElementById("repos").value;
	var token  = document.getElementById("token").value;
	console.log(username,repos,token)
	alert(username+repos+token);
	var bg = chrome.extension.getBackgroundPage();

	bg.SaveToken({"username":username,"repos":repos,"token":token})
})

$('#baidu').click(() => {
	var bg = chrome.extension.getBackgroundPage();
	var token = bg.GetToken(['username','repos','token']);
	alert('token '+ token);
	alert('token '+ JSON.stringify(token));
	alert(document.location.href);
	chrome.tabs.getSelected(null, function (tab) {
        alert(tab.url);
    });
	// var github = new bg.Github("lflxp","tags",'999')
	// github.test()
})

$('#gettoken').click(() => {
	var bg = chrome.extension.getBackgroundPage();
	bg.setoken();
})

// var user1 = {'name': 'diego', 'age': 18}
$('#get').click(() => {
	var bg = chrome.extension.getBackgroundPage();

	// var t = new bg.GetToken('user1')
	// alert('token11 '+t['user1'].name);
	// var github = new bg.Github("lflxp","tags",'999')
	var github = new bg.Github()
	var rrr = github.get('tags/create')
	alert('rrr'+JSON.stringify(rrr))
	console.log('get rrr',rrr)
})

$('#create').click(() => {
	var bg = chrome.extension.getBackgroundPage();
	var github = new bg.Github("lflxp","tags",'999')
	github.create('tags/create')
})

$('#update').click(() => {
	var bg = chrome.extension.getBackgroundPage();
	var github = new bg.Github("lflxp","tags",'999')
	var message = 'update'
	var content = 'update status'
	github.update('tags/create',message,content)
})

$('#delete').click(() => {
	var bg = chrome.extension.getBackgroundPage();
	var github = new bg.Github("lflxp","tags",'999')
	var message = 'delete'
	github.delete('tags/create',message)
})

$('#github').click(() => {
	var bg = chrome.extension.getBackgroundPage();
	var github = new bg.Github("lflxp","tags",'999')
	github.create('tags/998')
})

 // popup主动发消息给content-script
$('#con').click(() => {
	alert("popup发送消息给content-script");
	sendMessageToContentScript('你好，我是popup！', (response) => {
		if(response) alert('收到来自content-script的回复：'+response);
	});
});

// popup调用background的js函数
$('#bgtocon').click(() => {
	var bg = chrome.extension.getBackgroundPage();
	bg.TT();
});

// 获取当前选项卡ID
function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

// 向content-script主动发送消息
function sendMessageToContentScript(message, callback)
{
	getCurrentTabId((tabId) =>
	{
		chrome.tabs.sendMessage(tabId, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}

