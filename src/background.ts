// Open register page on installation
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: "https://3d90d37c-7c71-42b1-81ed-57de8a317863.weweb-preview.io/",
    });
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "FROM_PAGE") {
    console.log("chrome.runtime.onMessage", message);
    chrome.runtime.sendMessage({
      type: "SAVE_TOKEN",
      profile: message.perfil_calmind,
    });
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SAVE_TOKEN") {
    chrome.storage.local.set({ calmind_profile: message.profile }, () => {
      console.log("Token salvo!");
    });
  }
});
