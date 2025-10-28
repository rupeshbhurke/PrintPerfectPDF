document.getElementById('exportBtn').addEventListener('click', async () => {
  const style = document.getElementById('styleSelect').value;

  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tabId = tabs[0].id;

    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["content/content.js"]
    });

    chrome.tabs.sendMessage(tabId, { action: "EXPORT_PDF", style });
    window.close();
  });
});
