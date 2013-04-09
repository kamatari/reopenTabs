// reopenTabs.js
// Created by kamatari

var MaxTabArrayNum	= 1000;
var stockTabsCount	= 0;
var badgeColor		= new Array(116, 169, 214, 255);
var openedTabArray	= new Array();
var closedTabArray	= new Array();

chrome.browserAction.setBadgeBackgroundColor({color : badgeColor})

// extensionが有効になった時点で開いているtabの情報をstock
if (openedTabArray.length == 0) {
	chrome.windows.getAll({"populate" : true}, setAllTabInfo);
	updateBadgeCount();
}

// 新しくtabを開いた時と更新された時のurlをstock
chrome.tabs.onUpdated.addListener(
	function(updateTabId, changeInfo) {
		if (changeInfo.url != null) {
			openedTabArray[updateTabId] = changeInfo.url;
			checkLengthAndArrayShift(openedTabArray);
		}
	}
);

// 閉じたtabのurlをstock
chrome.tabs.onRemoved.addListener(
	function(closedTabId) {
		if (openedTabArray[closedTabId] != null) {
			closedTabArray.push(openedTabArray[closedTabId]);
			checkLengthAndArrayShift(closedTabArray);
			updateBadgeCount();
		}
	}
);

// extensionのアイコンをclickで,stockしてあるurlで新規tabを作成
chrome.browserAction.onClicked.addListener(
	function() {
		if (closedTabArray.length > 0) {
			chrome.tabs.create({"url" : closedTabArray.pop(),"selected":false});
			updateBadgeCount();
		}
	}
);


function setAllTabInfo(AllTabInfo) {
	for (var i=0; i<AllTabInfo.length; i++) {
		for (var j=0; j<AllTabInfo[i]['tabs'].length; j++) {
			openedTabArray[AllTabInfo[i]['tabs'][j].id] = AllTabInfo[i]['tabs'][j].url;
		}
	}
}

function checkLengthAndArrayShift(urlArray) {
	var arrayCount = countLength(urlArray);
	if (arrayCount > MaxTabArrayNum) {
		for (key in urlArray) {
			delete urlArray[key];
			arrayCount--;
			if (arrayCount <= MaxTabArrayNum) {break;}
		}
	}
}

function countLength(inputArray) {
	var count = 0;
	for (var key in inputArray) { count++; }
	return count;
}

function updateBadgeCount() {
	stockTabsCount = closedTabArray.length;
	chrome.browserAction.setBadgeText({text : String(stockTabsCount)});
}
