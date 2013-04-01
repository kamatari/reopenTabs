chrome.browserAction.setBadgeText({text:"100"});

var microsecondsPerDay = 1000 * 60 * 60 * 24;
var dayBefore = (new Date).getTime() - microsecondsPerDay;

chrome.tabs.onRemoved.addListener(
	function(tabId89) {
		chrome.tabs.get(tabId89, function(tab){
				alert(tab)
			})
//		chrome.history.search({
//			'text': '',
//			'startTime':dayBefore
//			},
//			function(history){
//				var closedTabs = history.shift()
//				alert(closedTabs.url);
//			}
//		);
	}
)

chrome.browserAction.onClicked.addListener(function() {
	//var action_url = 'http://google.com/';
	//chrome.tabs.create(object createProperties, function callback)
}
);

//	chrome.tabs.create({
//  		selected: true,
//		url: event.srcElement.href
//	});
