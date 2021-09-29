
const key = document.getElementById("in-key");
const view = document.getElementById("but-view");
const set = document.getElementById("but-set");
const rand = document.getElementById("but-rand");

set.addEventListener("click", async () => {
    value = key.value;

    if(value !== ""){
        chrome.storage.local.set({key: value}, function() {
            console.log('Value is set to ' + value);
            window.close();
        });
    }
});

view.addEventListener("click", async () => {
    chrome.storage.local.get(['key'], function(result) {
        key.value = result.key;
    });
});

rand.addEventListener("click", async () => {
    key.value = randKey(20);
});

function randKey(length) {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for(let i=0;i<length;i++){
        result += characters.charAt(Math.floor(Math.random()*charactersLength));
    }
    return result;
}





