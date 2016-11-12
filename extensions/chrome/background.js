chrome.browserAction.onClicked.addListener(function (activeTab) {
    chrome.tabs.create({url: "http://cmg.prostejov.cz/bakaweb"});
});
