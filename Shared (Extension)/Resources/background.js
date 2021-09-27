browser.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (tab.status == 'complete') {
      browser.tabs.sendMessage(tabId, {"message": "counteragent"});
  }
});
