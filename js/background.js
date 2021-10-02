chrome.runtime.onInstalled.addListener(() => {
    value = "mykey"
    chrome.storage.local.set({key: value}, function() {
        console.log("default key set to:", value);
    });
});
