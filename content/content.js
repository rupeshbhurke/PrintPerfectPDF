// content/content.js

(function showBootToast() {
  try {
    const b = document.createElement('div');
    b.textContent = 'PrintPerfect PDF: content script active';
    Object.assign(b.style, {
      position: 'fixed', bottom: '12px', right: '12px',
      zIndex: 2147483647, background: '#111', color: '#fff',
      fontFamily: 'Arial, sans-serif', fontSize: '12px',
      padding: '8px 10px', borderRadius: '6px',
      boxShadow: '0 2px 8px rgba(0,0,0,.3)', opacity: .95
    });
    document.documentElement.appendChild(b);
    setTimeout(() => b.remove(), 1800);
  } catch {}
})();

console.log('%cPrintPerfect PDF content script loaded', 'color:#0a84ff;font-weight:bold');

function log(...a){ try { console.log('[PPPDF]', ...a); } catch {} }
function err(...a){ try { console.error('[PPPDF]', ...a); } catch {} }

async function applyStyleAndPrint(style) {
  // 1) Primary path: build absolute URL using runtime.id
  try {
    const extId = chrome?.runtime?.id;
    if (extId) {
      const href = `chrome-extension://${extId}/pdf/styles/${style}.css`;
      log('Using runtime.id URL:', href);
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => { log('Style loaded'); setTimeout(() => window.print(), 300); };
      link.onerror = () => { err('Link failed, falling back to inline CSS'); inlineCssFallback(style); };
      document.head.appendChild(link);
      return;
    } else {
      err('chrome.runtime.id not available; will use inline fallback');
    }
  } catch (e) {
    err('Primary path exception:', e);
  }

  // 2) Fallback: ask background for CSS text and inject <style>
  inlineCssFallback(style);
}

function inlineCssFallback(style) {
  const t = document.createElement('div');
  t.textContent = `Preparing PDF… style: ${style}`;
  Object.assign(t.style, {
    position: 'fixed', bottom: '12px', right: '12px',
    zIndex: 2147483647, background: '#0a84ff', color: '#fff',
    fontFamily: 'Arial, sans-serif', fontSize: '12px',
    padding: '8px 10px', borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0,0,0,.3)'
  });
  document.documentElement.appendChild(t);
  setTimeout(() => t.remove(), 1400);

  chrome.runtime.sendMessage({ action: 'GET_CSS_TEXT', style }, (resp) => {
    if (!resp?.ok) {
      err('Failed to get CSS text from background:', resp?.error);
      // still try to print so the user gets something
      setTimeout(() => window.print(), 300);
      return;
    }
    const styleTag = document.createElement('style');
    styleTag.textContent = resp.css || '/* empty style */';
    document.head.appendChild(styleTag);
    log('Inline CSS injected; calling print()');
    setTimeout(() => window.print(), 300);
  });
}

// Listen for popup message
chrome.runtime.onMessage.addListener((msg) => {
  if (msg?.action === 'EXPORT_PDF') {
    log('Message received: EXPORT_PDF, style=', msg.style);
    applyStyleAndPrint(msg.style || 'clean');
  }
});
