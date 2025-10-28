// background.js (MV3 service worker)

console.log('PrintPerfect PDF v0.2.0 installed ✅');

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Fallback path: content asks us to read CSS and return the text
  if (msg?.action === 'GET_CSS_TEXT' && msg?.style) {
    const url = chrome.runtime.getURL(`pdf/styles/${msg.style}.css`);
    fetch(url)
      .then(r => r.text())
      .then(css => sendResponse({ ok: true, css }))
      .catch(err => sendResponse({ ok: false, error: String(err) }));
    return true; // keep message channel open for async sendResponse
  }
});
