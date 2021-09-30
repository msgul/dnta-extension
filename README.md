# DNTA (Do not trust anyone) Extension

DNTA is a  **open-source**  MIT-licensed  **browser extension**  that is designed to provide end-to-end symetric encryption between users on  all untrusted websites. 

## Features

- Select or generate a secret key and store it in your local storage.
- Encrypt your message with only one key press before sending to anyone.
- Decrypt all of the encrypted messages displayed on your page. 

## Installation

-   Either clone this repository or download as a ZIP file.
-   Extract the contents into your preferred working directory.
-   Open your Google Chrome browser.
-   Enter  `chrome://extensions/`  into the address bar.
-   Enable "Developer Mode" on the top right.
-   Click on "Load unpacked extension...".
-   Navigate to your extracted directory, and click "OK".
-   Your dnta extension should now be alongside your address bar, with a red lock icon.

## Libraries used

- CryptoJs : For simple AES encryption.
- Bootstrap : To make better UI for popup.
- JQuery : To use Bootstrap and its components.
