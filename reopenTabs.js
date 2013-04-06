// reopenTabs.js
// Created by kamatari

var openedTabArray	= new Array();
var closedTabArray	= new Array();
var badgeColor		= new Array(116, 169, 214, 255);
var stockTabsCount	= 0;

// extension¤¬Í­¸ú¤Ë¤Ê¤Ã¤¿»þÅÀ¤Ç³«¤¤¤Æ¤¤¤ëtab¤Î¾ðÊó¤ò½¸¤á¤ë
if (openedTabArray.length == 0) {
	chrome.windows.getAll({"populate" : true}, setAllTabInfo);
}

function setAllTabInfo(AllTabInfo) {
	for (var i=0; i<AllTabInfo.length; i++) {
		for (var j=0; j<AllTabInfo[i]['tabs'].length; j++) {
			openedTabArray[AllTabInfo[i]['tabs'][j].id] = AllTabInfo[i]['tabs'][j].url;
		}
	}
}

// ¥¢¥¤¥³¥ó¤Î¥Ð¥Ã¥¸¤Î¿§¤È¿ô¤ÎÀßÄê
chrome.browserAction.setBadgeBackgroundColor({color : badgeColor})
function updateBadgeCount() {
	stockTabsCount = closedTabArray.length;
	chrome.browserAction.setBadgeText({text : String(stockTabsCount)});
}

// ¿·¤·¤¯tab¤ò³«¤¤¤¿¤ê¹¹¿·¤·¤¿¤ê¤·¤¿»þ¤Î¾ðÊó¤òstock
chrome.tabs.onUpdated.addListener(
	function(updateTabId, changeInfo) {
		if (changeInfo.url != null) {
			openedTabArray[updateTabId] = changeInfo.url;
		}
	}
);

// tab¤òÊÄ¤¸¤¿»þ¤Ëextension¤ÇÉü³è¤µ¤»¤ëÇÛÎó¤òºîÀ®
chrome.tabs.onRemoved.addListener(
	function(closedTabId) {
		if (openedTabArray[closedTabId] != null) {
			closedTabArray.push(openedTabArray[closedTabId]);
			updateBadgeCount();
		}
	}
)

// extension¤Î¥¢¥¤¥³¥ó¤òclick¤·¤¿»þ¤Î½èÍý
chrome.browserAction.onClicked.addListener(
	function() {
		if (closedTabArray.length > 0) {
			chrome.tabs.create({"url" : closedTabArray.pop(),"selected":false});
			updateBadgeCount();
		}
	}
);
