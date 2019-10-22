function bgtest()
{
	alert("background的bgtest函数！");
}

// 右键菜单
chrome.contextMenus.create({
	title: "测试右键菜单",
	onclick: function(){
		alert('您点击了右键菜单!');
		chrome.tabs.create({url: 'chrome://bookmarks'});
	}
})

// chrome.contextMenus.create({
// 	title: '使用度娘搜索：%s', // %s表示选中的文字
// 	contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
// 	onclick: function(params)
// 	{
// 		// 注意不能使用location.href，因为location是属于background的window对象
// 		chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)});
// 	}
// });

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log('收到来自content-script的消息：');
	console.log(request, sender, sendResponse);
	sendResponse('我是background，我已收到你的消息：' + JSON.stringify(request));
});

// backgrond向context_scripts发送消息
function TT(){
	
	sendMessageToContentScript('context_scripts你好，我是backgrond！', (response) => {
	if(response) alert('backgrond收到来自content-script的回复：'+response);
	});
}

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
