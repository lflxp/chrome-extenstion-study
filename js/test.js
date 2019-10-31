// 清空书签
$('#clear').click(() =>{
    let bg = chrome.extension.getBackgroundPage();
    bg.clearBookmarks();
    alert('bookmarks清空完毕');
})

// getChildren
$('#getchildren').click(() => {
    let bg = chrome.extension.getBackgroundPage();
    bg.getChildrens();
})

$('#gets').click(() => {
    let bg = chrome.extension.getBackgroundPage();
    bg.gets();
})

$('#createfolder').click(() => {
    let bg = chrome.extension.getBackgroundPage();
    bg.createbookmarksfolder();
})

$('#createmarks').click(() => {
    let bg = chrome.extension.getBackgroundPage();
    bg.createbookmarks();
})

$('#upload').click(() => {
    var bg = chrome.extension.getBackgroundPage();
	bg.setoken();
	// 同步线上
	var github = new bg.Github()
	var filepath = 'tags/create'
	var message = 'update now'
	github.updateTags(filepath,message)
})

$('#download').click(() => {
    var bg = chrome.extension.getBackgroundPage();
	var github = new bg.Github()
	var rrr = github.get('tags/create')
	console.log('get rrr',rrr)
})

$('#gettree').click(() => {
    var bg = chrome.extension.getBackgroundPage();
    bg.getTree();
})