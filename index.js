window.addEventListener("keydown", function(event) {
    if(event.keyCode == 45) {encrypt();} 
    if(event.keyCode == 46){decrypt();}
});

function encrypt(){
    chrome.storage.local.get(['key'], function(result) {
        var all = document.getElementsByTagName("*");
        const symbol = "TOENCRYPT";
        console.log("ENCRYPTION STARTED!");
        for(elem of all){
            if(elem.childNodes[0]){
                if(elem.childNodes[0].nodeType == 3){
                    let text = elem.childNodes[0].nodeValue;
                    if(text.includes(symbol)){
                        plaintext = text.split(symbol)[1];
                        ciphertext = CryptoJS.AES.encrypt(plaintext, result.key).toString();
                        elem.childNodes[0].nodeValue = "ENCRYPTED" + ciphertext + "ENCRYPTED" 
                    }
                }
            }
        }

        console.log("ENCRYPTION DONE!");
    });
}

function decrypt() {
    chrome.storage.local.get(['key'], function(result) {
        var all = document.getElementsByTagName("*");
        const symbol = "ENCRYPTED";
        console.log("DECRYPTION STARTED!");


        for(elem of all){
            if(elem.childNodes[0]){
                if(elem.childNodes[0].nodeType == 3){
                    let text = elem.childNodes[0].nodeValue;
                    if(text.includes(symbol)){
                        ciphertext = text.split(symbol)[1];
                        try{
                            var bytes  = CryptoJS.AES.decrypt(ciphertext, result.key);
                            var original = bytes.toString(CryptoJS.enc.Utf8);
                            elem.childNodes[0].nodeValue = original;
                        } catch(e){
                            console.log("DECRYPTION ERROR!", e);
                        }
                        
                    }
                }
            }
        }
        console.log("DECRYPTION DONE!");
    });
}















