(() => {
  const panel = document.createElement('div');
  panel.style.cssText = `
    position:fixed;top:12px;left:12px;
    background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding:16px;
    border:none;border-radius:12px;
    z-index:10000;font:13px/1.4 system-ui, sans-serif;
    box-shadow:0 8px 32px rgba(0,0,0,0.3);
    cursor:move;min-width:360px;
    color:#fff;
  `;
  panel.innerHTML = `
    <div id="ac-header" style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px;cursor:pointer;">
      <h3 style="margin:0;font-size:16px;font-weight:600;letter-spacing:0.5px;">AutoClicker Pro</h3>
      <div style="display:flex;align-items:center;gap:8px;">
        <button id="ac-minimize" style="display:flex;align-items:center;justify-content:center;
                width:28px;height:28px;background:rgba(255,255,255,0.2);
                border:none;border-radius:6px;cursor:pointer;transition:all 0.2s;color:#fff;font-size:18px;">
          −
        </button>
        <a id="ac-github" href="https://github.com/ZodaciOS" target="_blank"
           style="display:flex;align-items:center;justify-content:center;
                  width:32px;height:32px;background:rgba(255,255,255,0.2);
                  border-radius:8px;padding:4px;transition:all 0.2s;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
               width="20" height="20" fill="white" aria-label="GitHub">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 
            2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
            0-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 
            2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
            0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 
            0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 
            1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 
            1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 
            3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 
            1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 
            0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>
      </div>
    </div>
    <div id="ac-content" style="transition:all 0.3s ease;overflow:hidden;">
      <div style="background:rgba(255,255,255,0.15);padding:12px;border-radius:8px;backdrop-filter:blur(10px);">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          <button id="ac-toggle" style="flex:1;padding:10px 20px;font-size:14px;font-weight:600;
                  border:none;border-radius:8px;cursor:pointer;
                  background:#fff;color:#667eea;
                  transition:all 0.2s;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
            Start
          </button>
          <button id="ac-reset" style="padding:10px 16px;font-size:13px;font-weight:600;
                  border:none;border-radius:8px;cursor:pointer;
                  background:rgba(255,255,255,0.25);color:#fff;
                  transition:all 0.2s;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
            Reset
          </button>
        </div>
        <div style="margin-bottom:8px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <span style="font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Clicks Per Second</span>
            <input id="ac-cps-input" type="number" min="1" value="8"
                   title="Custom CPS" 
                   style="width:70px;padding:4px 8px;border:2px solid rgba(255,255,255,0.3);
                          border-radius:6px;background:rgba(255,255,255,0.2);color:#fff;
                          font-weight:600;text-align:center;">
          </div>
          <input id="ac-cps" type="range" min="1" max="100" value="8" 
                 style="width:100%;height:6px;border-radius:3px;
                        background:rgba(255,255,255,0.3);
                        outline:none;-webkit-appearance:none;cursor:pointer;">
        </div>
        <div id="ac-warning" style="display:none;margin-top:10px;padding:8px 12px;
                                     background:rgba(255,59,48,0.9);border-radius:6px;
                                     font-size:12px;font-weight:500;
                                     animation:slideIn 0.3s ease;">
          ⚠️ Warning: CPS over 100 may cause lag or crashes!
        </div>
        <div id="ac-trusted-check" style="margin-top:10px;padding:8px 12px;
                                           border-radius:6px;font-size:12px;font-weight:500;
                                           display:flex;align-items:center;gap:8px;">
          <span id="ac-trusted-icon"></span>
          <span id="ac-trusted-text">Checking compatibility...</span>
        </div>
      </div>
      <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center;
                  padding:10px;background:rgba(0,0,0,0.2);border-radius:8px;">
        <span id="ac-status" style="font-weight:600;font-size:13px;">● Idle</span>
        <span style="font-size:11px;opacity:0.8;">Press Space to toggle</span>
      </div>
      <div id="ac-stats" style="margin-top:10px;display:flex;justify-content:space-between;
                                 padding:10px;background:rgba(0,0,0,0.2);border-radius:8px;
                                 font-size:12px;">
        <span><strong>Total:</strong> <span id="ac-total">0</span></span>
        <span><strong>Time:</strong> <span id="ac-time">00:00:00</span></span>
      </div>
    </div>
    <style>
      @keyframes slideIn {
        from { opacity:0; transform:translateY(-10px); }
        to { opacity:1; transform:translateY(0); }
      }
      #ac-toggle:hover {
        transform:translateY(-2px);
        box-shadow:0 4px 12px rgba(0,0,0,0.2);
      }
      #ac-reset:hover {
        background:rgba(255,255,255,0.35);
        transform:translateY(-2px);
      }
      #ac-github:hover {
        background:rgba(255,255,255,0.3);
        transform:scale(1.1);
      }
      #ac-minimize:hover {
        background:rgba(255,255,255,0.3);
      }
      #ac-header:hover {
        opacity:0.95;
      }
      #ac-cps::-webkit-slider-thumb {
        -webkit-appearance:none;
        appearance:none;
        width:18px;height:18px;
        border-radius:50%;
        background:#fff;
        cursor:pointer;
        box-shadow:0 2px 6px rgba(0,0,0,0.2);
      }
      #ac-cps::-moz-range-thumb {
        width:18px;height:18px;
        border-radius:50%;
        background:#fff;
        cursor:pointer;
        border:none;
        box-shadow:0 2px 6px rgba(0,0,0,0.2);
      }
    </style>
  `;
  document.body.appendChild(panel);

  const toggleBtn = panel.querySelector('#ac-toggle');
  const resetBtn = panel.querySelector('#ac-reset');
  const cpsSlider = panel.querySelector('#ac-cps');
  const cpsInput = panel.querySelector('#ac-cps-input');
  const statusEl = panel.querySelector('#ac-status');
  const githubLink = panel.querySelector('#ac-github');
  const totalEl = panel.querySelector('#ac-total');
  const timeEl = panel.querySelector('#ac-time');
  const warningEl = panel.querySelector('#ac-warning');
  const minimizeBtn = panel.querySelector('#ac-minimize');
  const contentEl = panel.querySelector('#ac-content');
  const headerEl = panel.querySelector('#ac-header');
  const trustedCheckEl = panel.querySelector('#ac-trusted-check');
  const trustedIconEl = panel.querySelector('#ac-trusted-icon');
  const trustedTextEl = panel.querySelector('#ac-trusted-text');

  let isMinimized = false;
  function toggleMinimize() {
    isMinimized = !isMinimized;
    if (isMinimized) {
      contentEl.style.maxHeight = '0px';
      contentEl.style.marginTop = '0px';
      contentEl.style.opacity = '0';
      minimizeBtn.textContent = '+';
      panel.style.minWidth = '280px';
    } else {
      contentEl.style.maxHeight = '500px';
      contentEl.style.marginTop = '12px';
      contentEl.style.opacity = '1';
      minimizeBtn.textContent = '−';
      panel.style.minWidth = '360px';
    }
  }

  minimizeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMinimize();
  });

  headerEl.addEventListener('click', (e) => {
    if (e.target === minimizeBtn || e.target === githubLink || githubLink.contains(e.target)) return;
    toggleMinimize();
  });

  function checkIsTrustedEnforcement() {
    const testEl = document.createElement('div');
    testEl.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;';
    document.body.appendChild(testEl);
    
    let clickFired = false;
    let isTrustedValue = null;
    
    const listener = (e) => {
      clickFired = true;
      isTrustedValue = e.isTrusted;
    };
    testEl.addEventListener('click', listener);
    
    testEl.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    
    testEl.removeEventListener('click', listener);
    document.body.removeChild(testEl);
    
    if (clickFired && isTrustedValue === false) {
      trustedCheckEl.style.background = 'rgba(52,211,153,0.25)';
      trustedCheckEl.style.border = '1px solid rgba(52,211,153,0.5)';
      trustedIconEl.textContent = '✓';
      trustedIconEl.style.color = '#34d399';
      trustedTextEl.textContent = 'isTrusted not enforced - Script will work!';
      trustedTextEl.style.color = '#d1fae5';
    } else {
      trustedCheckEl.style.background = 'rgba(251,191,36,0.25)';
      trustedCheckEl.style.border = '1px solid rgba(251,191,36,0.5)';
      trustedIconEl.textContent = '⚠';
      trustedIconEl.style.color = '#fbbf24';
      trustedTextEl.textContent = 'This site may enforce isTrusted - Script might not work';
      trustedTextEl.style.color = '#fef3c7';
    }
  }
  
  setTimeout(checkIsTrustedEnforcement, 500);

  let draggingPanel = false, panelOffsetX = 0, panelOffsetY = 0;
  panel.addEventListener('mousedown', e => {
    const interactive = e.target.closest('input, button, a, svg');
    if (interactive) return;
    draggingPanel = true;
    panelOffsetX = e.clientX - panel.offsetLeft;
    panelOffsetY = e.clientY - panel.offsetTop;
  });
  document.addEventListener('mouseup', () => draggingPanel = false);
  document.addEventListener('mousemove', e => {
    if (!draggingPanel) return;
    panel.style.left = `${e.clientX - panelOffsetX}px`;
    panel.style.top = `${e.clientY - panelOffsetY}px`;
  });

  const defaultCursorX = 160;
  const defaultCursorY = 160;
  
  const parkingBox = document.createElement('div');
  parkingBox.style.cssText = `
    width:60px;height:60px;
    position:fixed;top:${defaultCursorY}px;left:${defaultCursorX}px;
    z-index:9997;pointer-events:none;
    border:2px dashed rgba(102,126,234,0.5);
    border-radius:12px;
    background:rgba(102,126,234,0.05);
    transform:translate(-50%,-50%);
    box-shadow:0 2px 8px rgba(102,126,234,0.2);
  `;
  document.body.appendChild(parkingBox);

  const cursor = document.createElement('div');
  cursor.style.cssText = `
    width:36px;height:36px;border-radius:50%;
    position:fixed;top:${defaultCursorY}px;left:${defaultCursorX}px;
    z-index:9999;pointer-events:none;
    box-shadow:0 0 0 2px rgba(102,126,234,0.8) inset, 0 0 12px rgba(102,126,234,0.5);
    background:rgba(102,126,234,0.2);
    transform:translate(-50%,-50%);
    transition:all 0.3s ease;
  `;
  document.body.appendChild(cursor);

  const handle = document.createElement('div');
  handle.style.cssText = `
    position:fixed;top:${defaultCursorY}px;left:${defaultCursorX}px;z-index:10001;
    width:20px;height:20px;border-radius:50%;
    background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    cursor:grab;box-shadow:0 2px 8px rgba(0,0,0,0.3);
    transition:all 0.3s ease;
  `;
  document.body.appendChild(handle);

  let draggingCursor = false, offX = 0, offY = 0;
  handle.addEventListener('mousedown', e => {
    draggingCursor = true; handle.style.cursor = 'grabbing';
    handle.style.transition = 'none';
    cursor.style.transition = 'none';
    offX = e.clientX - handle.offsetLeft; offY = e.clientY - handle.offsetTop;
    e.preventDefault();
  });
  document.addEventListener('mouseup', () => { 
    draggingCursor = false; 
    handle.style.cursor = 'grab';
    handle.style.transition = 'all 0.3s ease';
    cursor.style.transition = 'all 0.3s ease';
  });
  document.addEventListener('mousemove', e => {
    if (!draggingCursor) return;
    const x = e.clientX - offX, y = e.clientY - offY;
    handle.style.left = `${x}px`; handle.style.top = `${y}px`;
    cursor.style.left = `${x}px`; cursor.style.top = `${y}px`;
  });

  resetBtn.addEventListener('click', () => {
    handle.style.left = `${defaultCursorX}px`;
    handle.style.top = `${defaultCursorY}px`;
    cursor.style.left = `${defaultCursorX}px`;
    cursor.style.top = `${defaultCursorY}px`;
  });

  let highCpsConfirmed = false;
  let warningTimeout = null;
  function showHighCpsWarning(v) {
    if (v > 100) {
      warningEl.style.display = 'block';
      if (warningTimeout) clearTimeout(warningTimeout);
      warningTimeout = setTimeout(() => {
        warningEl.style.display = 'none';
      }, 5000);
      if (!highCpsConfirmed) {
        highCpsConfirmed = true;
      }
    } else {
      warningEl.style.display = 'none';
      if (warningTimeout) clearTimeout(warningTimeout);
    }
  }

  cpsSlider.addEventListener('input', () => {
    cpsInput.value = cpsSlider.value;
    showHighCpsWarning(parseInt(cpsSlider.value));
    if (running) start();
  });

  cpsInput.addEventListener('input', () => {
    const val = parseInt(cpsInput.value);
    if (val >= 1 && val <= 100) {
      cpsSlider.value = val;
    }
    showHighCpsWarning(val);
    if (running) start();
  });

  let running = false;
  let rafId = null;
  let lastTime = 0;
  let accumulator = 0;
  let totalClicks = 0;
  let startEpoch = 0;

  function formatTime(ms) {
    const totalSec = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  function updateStats(clicksThisFrame) {
    if (clicksThisFrame > 0) {
      totalClicks += clicksThisFrame;
      totalEl.textContent = String(totalClicks);
    }
    const elapsed = performance.now() - startEpoch;
    timeEl.textContent = formatTime(elapsed);
  }

  function dispatchClicksAtPoint(x, y, count) {
    const optsBase = { bubbles: true, cancelable: true, clientX: x, clientY: y, view: window };
    let fired = 0;
    for (let i = 0; i < count; i++) {
      const el = document.elementFromPoint(x, y);
      if (!el) break;
      if (panel.contains(el) || handle.contains(el) || githubLink.contains(el)) continue;
      el.dispatchEvent(new MouseEvent('mousedown', optsBase));
      el.dispatchEvent(new MouseEvent('mouseup', optsBase));
      el.dispatchEvent(new MouseEvent('click', optsBase));
      fired++;
    }
    return fired;
  }

  function getCpsRaw() {
    let v = parseFloat(cpsInput.value);
    if (!isFinite(v) || v <= 0) v = parseFloat(cpsSlider.value);
    return Math.max(1, v);
  }

  function loop(ts) {
    if (!running) return;
    if (!lastTime) lastTime = ts;
    const dt = (ts - lastTime) / 1000;
    lastTime = ts;

    const cps = getCpsRaw();
    accumulator += cps * dt;

    const clicksThisFrameDesired = Math.floor(accumulator);
    accumulator -= clicksThisFrameDesired;

    const rect = cursor.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    let fired = 0;
    if (clicksThisFrameDesired > 0) {
      fired = dispatchClicksAtPoint(x, y, clicksThisFrameDesired);
    }

    updateStats(fired);
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    const cps = getCpsRaw();
    showHighCpsWarning(cps);
    stop();
    running = true;
    lastTime = 0;
    accumulator = 0;
    startEpoch = performance.now();
    statusEl.textContent = `● Running (${cps} CPS)`;
    toggleBtn.textContent = 'Stop';
    toggleBtn.style.background = '#ff4444';
    toggleBtn.style.color = '#fff';
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    accumulator = 0;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    toggleBtn.textContent = 'Start';
    toggleBtn.style.background = '#fff';
    toggleBtn.style.color = '#667eea';
    statusEl.textContent = '● Idle';
  }

  toggleBtn.addEventListener('click', () => (running ? stop() : start()));

  document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
      e.preventDefault();
      running ? stop() : start();
    }
  });
})();
