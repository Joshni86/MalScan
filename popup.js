// popup.js
document.getElementById("saveBtn").addEventListener("click", () => {
  const key = document.getElementById("apiKeyInput").value;
  chrome.storage.local.set({ vt_api_key: key }, () => {
    alert("API Key saved!");
  });
});
