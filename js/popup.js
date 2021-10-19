
const key = document.getElementById("in-key");
const view = document.getElementById("but-view");
const set = document.getElementById("but-set");
const rand = document.getElementById("but-rand");
const toggle = document.getElementById("on-off");

chrome.storage.local.get(['dnta'], function(result) {

    if(result.dnta){
        toggle.checked = true;
    } else{
        toggle.checked = false;
    }
});

set.addEventListener("click", async () => {
    value = key.value;

    if(value !== ""){
        chrome.storage.local.set({key: value}, function() {
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

toggle.addEventListener("change", async () => {

    if(toggle.checked)
        chrome.storage.local.set({dnta: true}, function() {});
    else
        chrome.storage.local.set({dnta: false}, function() {});
});