// reopenTabs.js
// Created by kamatari

var MaxTabArrayNum	= 9999;
var openedTabArray	= new Array();
var closedTabArray	= new Array();

// extension???????????????tab????stock
if (openedTabArray.length == 0) {
	chrome.windows.getAll({"populate" : true}, setAllTabInfo);
}

// ???tab?????????????url?stock
chrome.tabs.onUpdated.addListener(
	function(updateTabId, changeInfo) {
		if (changeInfo.url != null) {
			openedTabArray[updateTabId] = changeInfo.url;
			checkLengthAndArrayShift(openedTabArray);
		}
	}
);

// ???tab?url?stock
chrome.tabs.onRemoved.addListener(
	function(closedTabId) {
		if (openedTabArray[closedTabId] != null) {
			closedTabArray.push(openedTabArray[closedTabId]);
			checkLengthAndArrayShift(closedTabArray);
		}
	}
);

// extension??????click?,stock????url???tab???
chrome.browserAction.onClicked.addListener(
	function() {
		if (closedTabArray.length > 0) {
			chrome.tabs.create({"url" : closedTabArray.pop(),"selected":false});
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