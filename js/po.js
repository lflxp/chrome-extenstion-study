
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

$('#baidu').click(() => {
	var bg = chrome.extension.getBackgroundPage();
	console.log(123123, bg)
	bg.SaveToken('123')
	var token = bg.GetToken("SaveToken")
	alert('token '+ token)
	var github = new bg.Github("lflxp","tags",'999')
	github.test()
})

$('#get').click(() => {
	var bg = chrome.extension.getBackgroundPage();

	var t = bg.GetToken('user1')
	alert('token11 '+t['user1'].name);
	var github = new bg.Github("lflxp","tags",'999')
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

