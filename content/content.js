// ✅ PrintPerfectPDF content.js — Clean & Stable Version

console.log('🚀 PrintPerfectPDF content script loaded');
console.log('📄 Current page URL:', window.location.href);
console.log('📊 Page title:', document.title);

// Send status updates back to popup UI
function report(text) {
  console.log('📢 Status update:', text);
  try {
    chrome.runtime.sendMessage({ progress: text });
    console.log('✅ Status message sent successfully');
  } catch (error) {
    console.error('❌ Failed to send status message:', error);
  }
}

// Receive command from popup
chrome.runtime.onMessage.addListener((msg) => {
  console.log('📨 Message received from popup:', msg);
  
  if (msg.action === "EXPORT_PDF") {
    const style = msg.style || "clean";
    console.log('🎨 PDF export initiated with style:', style);
    prepareAndPrint(style);
  } else {
    console.log('⚠️ Unknown message action:', msg.action);
  }
});

// ✅ Core export sequence
async function prepareAndPrint(style) {
  console.log('🔄 Starting PDF preparation process...');
  console.log('⏱️ Start time:', new Date().toISOString());
  const startTime = performance.now();
  
  try {
    console.log('📖 Document ready state:', document.readyState);
    console.log('📏 Initial page dimensions:', {
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth
    });

    report("Expanding content...");
    console.log('🔄 Step 1: Starting autoscroll to load content...');
    await autoscrollToLoad();
    console.log('✅ Step 1 completed: Content expansion finished');

    report("Loading images...");
    console.log('🔄 Step 2: Starting lazy image loading...');
    const imgs = await eagerizeLazyImages();
    console.log(`🖼️ Found ${imgs.length} images to process`);
    
    let processedImages = 0;
    for (const img of imgs) {
      console.log(`🔄 Processing image ${processedImages + 1}/${imgs.length}:`, img.src || img.dataset.src || 'no-src');
      await decodeImage(img);
      processedImages++;
      if (processedImages % 10 === 0) {
        console.log(`✅ Processed ${processedImages}/${imgs.length} images`);
      }
    }
    console.log('✅ Step 2 completed: All images processed');

    report("Finalizing fonts...");
    console.log('🔄 Step 3: Starting font loading...');
    console.log('🔤 Document fonts ready state:', document.fonts.status);
    await waitFonts();
    console.log('✅ Step 3 completed: Font loading finished');

    report("Applying style...");
    console.log('🔄 Step 4: Applying print styles...');
    console.log('🎨 Selected style:', style);
    await applyStyle(style);
    console.log('✅ Step 4 completed: Styles applied');

    report("Opening print dialog...");
    console.log('🔄 Step 5: Opening print dialog...');
    console.log('🖨️ Calling window.print()');
    window.print();
    console.log('✅ Step 5 completed: Print dialog opened');

    const endTime = performance.now();
    const totalTime = (endTime - startTime).toFixed(2);
    console.log('🎉 PDF preparation completed successfully!');
    console.log('⏱️ Total processing time:', totalTime, 'ms');
    console.log('📊 Final page dimensions:', {
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight
    });

    setTimeout(() => {
      console.log('📤 Sending completion message to extension');
      chrome.runtime.sendMessage({ done: true });
    }, 500);

  } catch (err) {
    const endTime = performance.now();
    const totalTime = (endTime - startTime).toFixed(2);
    console.error("❌ PDF export failed after", totalTime, "ms");
    console.error("❌ Error details:", err);
    console.error("❌ Error stack:", err.stack);
    chrome.runtime.sendMessage({ progress: "Failed ❌" });
  }
}

/* ============================================================================
 ✅ Utility Functions Below (KEPT from your earlier working version)
============================================================================ */

// Expand infinite scroll pages
async function autoscrollToLoad(maxLoops = 8, pauseMs = 500) {
  console.log('📜 Starting autoscroll with params:', { maxLoops, pauseMs });
  const initialHeight = document.documentElement.scrollHeight;
  console.log('📏 Initial scroll height:', initialHeight);
  
  let prev = 0;
  for (let i = 0; i < maxLoops; i++) {
    console.log(`🔄 Autoscroll loop ${i + 1}/${maxLoops}`);
    const beforeScroll = document.documentElement.scrollHeight;
    
    window.scrollTo(0, document.documentElement.scrollHeight);
    console.log('📍 Scrolled to bottom, height:', document.documentElement.scrollHeight);
    
    await new Promise(res => setTimeout(res, pauseMs));
    
    const cur = document.documentElement.scrollHeight;
    console.log('📏 Height after pause:', cur, 'vs previous:', prev);
    
    if (cur === prev) {
      console.log('✅ No more content to load, breaking at loop', i + 1);
      break;
    }
    prev = cur;
  }
  
  window.scrollTo(0, 0);
  const finalHeight = document.documentElement.scrollHeight;
  console.log('📜 Autoscroll completed. Final height:', finalHeight, 'Growth:', finalHeight - initialHeight);
}

// Force-load lazy images
async function eagerizeLazyImages() {
  console.log('🖼️ Starting lazy image processing...');
  const imgs = Array.from(document.images || []);
  console.log('🔍 Found', imgs.length, 'total images on page');
  
  let lazyCount = 0;
  let dataAttributeCount = 0;
  
  for (const img of imgs) {
    let modified = false;
    
    // Convert lazy loading to eager
    if (img.loading === "lazy") {
      img.loading = "eager";
      lazyCount++;
      modified = true;
      console.log('🔄 Converted lazy loading for:', img.src || 'no-src');
    }
    
    // Handle data attributes
    const ds = img.dataset || {};
    if (!img.src && (ds.src || ds.srcset)) {
      const oldSrc = img.src;
      img.src = ds.src || "";
      dataAttributeCount++;
      modified = true;
      console.log('🔄 Applied data-src:', ds.src, 'was:', oldSrc);
    }
    if (ds.srcset) {
      img.srcset = ds.srcset;
      modified = true;
      console.log('🔄 Applied data-srcset:', ds.srcset);
    }
    
    if (modified) {
      console.log('✅ Modified image:', {
        src: img.src,
        loading: img.loading,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      });
    }
  }
  
  console.log('📊 Image processing summary:', {
    total: imgs.length,
    lazyConverted: lazyCount,
    dataAttributeApplied: dataAttributeCount
  });
  
  return imgs;
}

// Ensure images are decoded before print
async function decodeImage(img) {
  const startTime = performance.now();
  console.log('🖼️ Decoding image:', img.src || 'no-src', {
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    loading: img.loading
  });
  
  try {
    if (img.decode) {
      console.log('🔄 Using img.decode() method...');
      await img.decode();
      const endTime = performance.now();
      console.log('✅ Image decoded successfully in', (endTime - startTime).toFixed(2), 'ms');
      return;
    } else {
      console.log('⚠️ img.decode() not available, using fallback method');
    }
  } catch (error) {
    console.warn('⚠️ img.decode() failed, using fallback:', error.message);
  }
  
  // Fallback method
  console.log('🔄 Using fallback image loading method...');
  await new Promise((res) => {
    if (img.complete) {
      console.log('✅ Image already complete');
      return res();
    }
    
    console.log('⏳ Waiting for image to load...');
    let resolved = false;
    
    const onLoad = () => {
      if (!resolved) {
        resolved = true;
        const endTime = performance.now();
        console.log('✅ Image loaded successfully in', (endTime - startTime).toFixed(2), 'ms');
        res();
      }
    };
    
    const onError = (error) => {
      if (!resolved) {
        resolved = true;
        const endTime = performance.now();
        console.warn('⚠️ Image failed to load after', (endTime - startTime).toFixed(2), 'ms:', error);
        res(); // Still resolve to continue processing
      }
    };
    
    const onTimeout = () => {
      if (!resolved) {
        resolved = true;
        const endTime = performance.now();
        console.warn('⚠️ Image loading timed out after', (endTime - startTime).toFixed(2), 'ms');
        res();
      }
    };
    
    img.addEventListener("load", onLoad, { once: true });
    img.addEventListener("error", onError, { once: true });
    setTimeout(onTimeout, 10000);
  });
}

// Wait for all fonts to finish loading
async function waitFonts(timeoutMs = 15000) {
  console.log('🔤 Starting font loading wait...');
  console.log('📊 Initial font status:', document.fonts.status);
  console.log('📈 Fonts to load:', document.fonts.size);
  
  const startTime = performance.now();
  
  try {
    // Log summary of fonts (not individual ones to reduce noise)
    if (document.fonts.size > 0) {
      const fontFamilies = new Set();
      let loadedCount = 0;
      for (const font of document.fonts) {
        fontFamilies.add(font.family);
        if (font.status === 'loaded') loadedCount++;
      }
      console.log('🔤 Font families on page:', Array.from(fontFamilies).join(', '));
      console.log('📊 Initially loaded fonts:', loadedCount, '/', document.fonts.size);
    }
    
    console.log('⏳ Waiting for fonts to load (timeout:', timeoutMs, 'ms)...');
    await Promise.race([
      document.fonts.ready,
      new Promise(res => setTimeout(res, timeoutMs))
    ]);
    
    const endTime = performance.now();
    const loadTime = (endTime - startTime).toFixed(2);
    
    console.log('✅ Font loading completed in', loadTime, 'ms');
    console.log('📊 Final font status:', document.fonts.status);
    
    // Check final font loading status
    let loadedCount = 0;
    let failedCount = 0;
    const failedFonts = [];
    
    for (const font of document.fonts) {
      if (font.status === 'loaded') {
        loadedCount++;
      } else {
        failedCount++;
        // Only log unique font families that failed, not every duplicate
        const fontKey = `${font.family} ${font.style} ${font.weight}`;
        if (!failedFonts.includes(fontKey)) {
          failedFonts.push(fontKey);
        }
      }
    }
    
    // Only log failed fonts if there are any, and only unique ones
    if (failedFonts.length > 0) {
      console.warn('⚠️ Some fonts failed to load:', failedFonts.join(', '));
    }
    
    console.log('📊 Font loading summary:', {
      total: document.fonts.size,
      loaded: loadedCount,
      failed: failedCount,
      uniqueFailures: failedFonts.length,
      timeMs: loadTime
    });
    
  } catch (error) {
    const endTime = performance.now();
    const loadTime = (endTime - startTime).toFixed(2);
    console.error('❌ Font loading error after', loadTime, 'ms:', error);
  }
}

// Apply selected style + print base stylesheet
async function applyStyle(style) {
  console.log('🎨 Starting style application...');
  console.log('🎯 Target style:', style);
  console.log('🔧 Extension ID:', chrome.runtime.id);
  
  try {
    // Apply base print stylesheet
    console.log('🔄 Applying base print stylesheet...');
    const baseUrl = chrome.runtime.getURL('pdf/styles/printbase.css');
    console.log('📎 Base CSS URL:', baseUrl);
    
    const baseLink = document.createElement('link');
    baseLink.rel = 'stylesheet';
    baseLink.href = baseUrl;
    baseLink.id = 'printperfect-base-styles';
    
    // Add load/error handlers for base stylesheet
    const basePromise = new Promise((resolve, reject) => {
      baseLink.onload = () => {
        console.log('✅ Base stylesheet loaded successfully');
        resolve();
      };
      baseLink.onerror = (error) => {
        console.error('❌ Base stylesheet failed to load:', error);
        console.error('❌ Failed URL:', baseUrl);
        reject(new Error('Base stylesheet failed to load'));
      };
      // Set a timeout for loading
      setTimeout(() => {
        if (baseLink.sheet) {
          console.log('✅ Base stylesheet loaded via timeout check');
          resolve();
        } else {
          console.warn('⚠️ Base stylesheet timeout, but continuing...');
          resolve(); // Don't reject, continue anyway
        }
      }, 3000);
    });
    
    document.head.appendChild(baseLink);
    console.log('📝 Base stylesheet link added to head');
    
    // Apply style-specific stylesheet
    console.log('🔄 Applying style-specific stylesheet...');
    const styleUrl = chrome.runtime.getURL(`pdf/styles/${style}.css`);
    console.log('📎 Style CSS URL:', styleUrl);
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = styleUrl;
    link.id = `printperfect-${style}-styles`;
    
    // Add load/error handlers for style stylesheet
    const stylePromise = new Promise((resolve, reject) => {
      link.onload = () => {
        console.log('✅ Style stylesheet loaded successfully');
        resolve();
      };
      link.onerror = (error) => {
        console.error('❌ Style stylesheet failed to load:', error);
        console.error('❌ Failed URL:', styleUrl);
        reject(new Error(`Style stylesheet (${style}) failed to load`));
      };
      // Set a timeout for loading
      setTimeout(() => {
        if (link.sheet) {
          console.log('✅ Style stylesheet loaded via timeout check');
          resolve();
        } else {
          console.warn('⚠️ Style stylesheet timeout, but continuing...');
          resolve(); // Don't reject, continue anyway
        }
      }, 3000);
    });
    
    document.head.appendChild(link);
    console.log('📝 Style stylesheet link added to head');
    
    // Wait for both stylesheets to load (with timeout)
    console.log('⏳ Waiting for stylesheets to load...');
    const startTime = performance.now();
    
    try {
      await Promise.race([
        Promise.all([basePromise, stylePromise]),
        new Promise((resolve) => 
          setTimeout(() => {
            console.log('⚠️ Stylesheet loading timeout reached, continuing...');
            resolve();
          }, 5000)
        )
      ]);
      
      const endTime = performance.now();
      const loadTime = (endTime - startTime).toFixed(2);
      console.log('✅ Stylesheet loading completed in', loadTime, 'ms');
      
    } catch (error) {
      const endTime = performance.now();
      const loadTime = (endTime - startTime).toFixed(2);
      console.warn('⚠️ Stylesheet loading issue after', loadTime, 'ms:', error.message);
      console.log('🔄 Continuing with print anyway...');
    }
    
    // Log current stylesheets in document
    const stylesheets = Array.from(document.styleSheets);
    console.log('📊 Total stylesheets in document:', stylesheets.length);
    const printPerfectSheets = stylesheets.filter(sheet => 
      sheet.href && (sheet.href.includes('printbase') || sheet.href.includes(style))
    );
    console.log('🎨 PrintPerfect stylesheets loaded:', printPerfectSheets.length);
    
    // Verify the stylesheets are accessible
    printPerfectSheets.forEach(sheet => {
      try {
        console.log('📋 Loaded stylesheet:', sheet.href, 'Rules:', sheet.cssRules?.length || 'N/A');
      } catch (e) {
        console.warn('⚠️ Cannot access stylesheet rules:', sheet.href, e.message);
      }
    });
    
  } catch (error) {
    console.error('❌ Style application failed:', error);
    console.error('❌ Error stack:', error.stack);
    throw error; // Re-throw to be caught by prepareAndPrint
  }
}
