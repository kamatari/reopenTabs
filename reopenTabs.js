chrome.browserAction.setBadgeText({text:"100"});

var microsecondsPerDay = 1000 * 60 * 60 * 24;
var dayBefore = (new Date).getTime() - microsecondsPerDay;
var closeTabArray = new Array();

chrome.tabs.onRemoved.addListener(
	function(tabId89) {
		chrome.tabs.get(tabId89, function(tab){

		})
	}
)

//
chrome.history.search({
	'text': '',
	'startTime':dayBefore
	},
	function(history){
		//console.log(history);
		//var closedTabs = history.shift()
		//alert(closedTabs.url);
	}
);

chrome.tabs.onCreated.addListener(
	function(openTab) {
		console.log(openTab)
	}
)

chrome.history.onVisited.addListener(
	function(new_history) {
		closeTabArray.push(new_history.url);
		//alert(closeTabArray);
	}
);

chrome.browserAction.onClicked.addListener(function() {
	//var action_url = 'http://google.com/';
	//chrome.tabs.create(object createProperties, function callback)
}
);

//	chrome.tabs.create({
//  		selected: true,
//		url: event.srcElement.href
//	});
