var input_event = new Event('input', {
    'bubbles': true,
    'cancelable': true
});

window.addEventListener("keydown", function(event) {

    if(event.keyCode == 45 || event.keyCode == 46){
        chrome.storage.local.get(['dnta'], function(result) {
            if(result.dnta){
                if(event.keyCode == 45)
                    encrypt();
                else
                    decrypt();
            }
        });
    }
});

function encrypt(){
    chrome.storage.local.get(['key'], function(result) {
        console.log("ENCRYPTION STARTED!");
        let active = document.activeElement;

        // for <input> elements
        if(active.value && active.value != ""){
            try{
                let plaintext = active.value;
                ciphertext = CryptoJS.AES.encrypt(plaintext, result.key).toString();
                active.value = ciphertext;
                active.dispatchEvent(input_event);
            } catch(e){
                console.log("ENCRYPTION ERROR", e);
            }
        } // for other elements
        else if(typeof active !== "undefined"){
            let textnodes = textNodesUnder(active);
            let textnode = textnodes[0];

            try{
                let plaintext = textnode.nodeValue;
                ciphertext = CryptoJS.AES.encrypt(plaintext, result.key).toString();
                textnode.nodeValue = ciphertext;
                textnode.dispatchEvent(input_event);
            } catch(e){
                console.log("ENCRYPTION ERROR", e);
            }
            console.log("ENCRYPTION DONE!");
        } else{
            console.log("ENCRYPTION ERROR", "NO ACTIVE ELEMENT");
        }
    });
}

function decrypt() {
    chrome.storage.local.get(['key'], function(result) {
        const symbol = "U2FsdGVkX1"; // Salted_
        console.log("DECRYPTION STARTED!");
        let textnodes = textNodesUnder(document.body);

        for(let textnode of textnodes){
            let text = textnode.nodeValue;
            let index = text.indexOf(symbol)
            if(index != -1){
                let pre = text.slice(0, index);
                let splitted = text.slice(index).split(/ (.+)/);
                let ciphertext = splitted[0];
                //textsplit = text.split(symbol);
                //ciphertext = symbol + textsplit[1].split(/\s+/)[0];
                console.log(ciphertext);
                try{
                    var bytes  = CryptoJS.AES.decrypt(ciphertext, result.key);
                    var original = bytes.toString(CryptoJS.enc.Utf8);
                    if(original == "") throw "Wrong Key"

                    textnode.nodeValue = pre + original + " 🔓 " + (splitted[1] || "");
                } catch(e){
                    console.log("DECRYPTION ERROR!", e);
                }
            }
        }
        console.log("DECRYPTION DONE!");
    });
}

function textNodesUnder(node){
    var all = [];
    for (node=node.firstChild;node;node=node.nextSibling){
        if (node.nodeType == 3) {
            all.push(node);
        }
        else {
            all = all.concat(textNodesUnder(node));
        }
    }
    return all;
}
