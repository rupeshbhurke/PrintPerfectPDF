const progressBox = document.getElementById('progressBox');
const exportBtn = document.getElementById('exportBtn');

function setProgress(text) {
  if (progressBox) progressBox.textContent = text;
}

exportBtn.addEventListener('click', async () => {
  const style = document.getElementById('styleSelect').value;

  setProgress("Preparing content...");
  exportBtn.disabled = true;

  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tabId = tabs[0].id;

    // Inject script if needed
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["content/content.js"]
    });

    chrome.tabs.sendMessage(tabId, { action: "EXPORT_PDF", style });
  });
});

// Receive progress updates
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.progress) {
    setProgress(msg.progress);
  }
  if (msg.done) {
    exportBtn.disabled = false;
    setProgress("Done ✅");
  }
});
