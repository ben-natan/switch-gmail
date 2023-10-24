chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        return
      }
    }, async () => {
      let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      if (!tab.url.includes("mail.google.com")) {
          console.log("Not on mail.google.com");
          return
      }

      // URL is in the form "https://mail.google.com/mail/u/1/#inbox"
      const splitUrl = tab.url.split("/");
      if (splitUrl[5] == "1") {
          splitUrl[5] = "0"
      } else {
          splitUrl[5] = "1"
      }

      chrome.tabs.update(undefined, { url: splitUrl.slice(0, 6).join("/") });
    });
});