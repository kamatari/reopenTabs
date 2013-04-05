chrome.browserAction.setBadgeBackgroundColor({color:[116, 169, 214, 255]})

var microsecondsPerDay = 1000 * 60 * 60 * 24;
var dayBefore = (new Date).getTime() - microsecondsPerDay;
var openTabArray = new Array();
var closeTabArray = new Array();
var closedTabsCount;

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
		openTabArray[openTab.id] = openTab.url;
	}
)

chrome.tabs.onRemoved.addListener(
	function(closeTabId) {
		closeTabArray.push(openTabArray[closeTabId]);
		closedTabsCount = closeTabArray.length;
		chrome.browserAction.setBadgeText({text:String(closedTabsCount)});
	}
)

//chrome.browserAction.onClicked.addListener(function(tabs.Tab tab) {...});
