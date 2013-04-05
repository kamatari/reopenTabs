var openedTabArray	= new Array();
var closedTabArray	= new Array();
var badgeColor		= new Array(116, 169, 214, 255);
var stockTabsCount	= 0;

chrome.browserAction.setBadgeBackgroundColor({color:badgeColor})

chrome.tabs.onCreated.addListener(
	function(openTab) {
		openedTabArray[openTab.id] = openTab.url;
	}
)

chrome.tabs.onRemoved.addListener(
	function(closedTabId) {
		closedTabArray.push(openedTabArray[closedTabId]);
		updateBadgeCount();
	}
)

chrome.browserAction.onClicked.addListener(
	function() {
		chrome.tabs.create({"url":closedTabArray.pop(),"selected":false});
		updateBadgeCount();
	}
);

function updateBadgeCount() {
	stockTabsCount = closedTabArray.length;
	chrome.browserAction.setBadgeText({text:String(stockTabsCount)});
}
