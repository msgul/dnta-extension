
const but = document.getElementById("but");
const key = document.getElementById("key");

but.addEventListener("click", async () => {
    value = key.value;
    if(value == ""){
        chrome.storage.local.get(['key'], function(result) {
            key.value = result.key;
        });
    } else
    chrome.storage.local.set({key: value}, function() {
        console.log('Value is set to ' + value);
        window.close();
    });

    
});







