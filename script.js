/**
 * beHin Loading Page – script.js
 * Enhanced: Progress bar, background slideshow, time update, auto-hide loading
 * Optimized: Performance, smooth animations, better image preloading
 */

document.addEventListener('DOMContentLoaded', () => {

  console.log('🚀 beHin Loading Page Initialized');

  /* ── DOM Refs ── */
  const loadingScreen = document.getElementById('loading-screen');
  const mainApp = document.getElementById('main-app');
  const loadingBarFill = document.getElementById('loadingBarFill');
  const loadingPercent = document.getElementById('loadingPercent');
  const panelBarFill = document.getElementById('panelBarFill');
  const panelPercent = document.getElementById('panelPercent');
  const scrollHint = document.getElementById('scrollHint');
  const statusTime = document.getElementById('statusTime');
  const bgImg1 = document.querySelector('.bg-img--1');
  const bgImg2 = document.querySelector('.bg-img--2');

  // Verify elements exist
  console.log('📋 DOM Elements:', {
    loadingScreen: !!loadingScreen,
    mainApp: !!mainApp,
    loadingBarFill: !!loadingBarFill,
    panelBarFill: !!panelBarFill,
  });

  /* ── State ── */
  let currentProgress = 0;
  let targetProgress = 0;
  let rafId = null;
  let bgSwapped = false;
  let imagesLoaded = 0;
  const totalImages = 2; // Number of background images

  /* ──────────────────────────────────────────
     1. LIVE STATUS BAR CLOCK
  ────────────────────────────────────────── */
  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    if (statusTime) statusTime.textContent = `${h}:${m}`;
  }
  updateClock();
  setInterval(updateClock, 10_000); // update every 10s

  /* ──────────────────────────────────────────
     2. PROGRESS BAR ENGINE
     Simulates realistic async loading with
     eased increments and variable speed.
  ────────────────────────────────────────── */
  function setProgress(value) {
    targetProgress = Math.min(100, Math.max(0, value));
    console.log(`📊 Progress set to target: ${targetProgress}%`);
  }

  function animateProgress() {
    if (currentProgress < targetProgress) {
      // Enhanced easing: faster at start, smoother in middle, accelerates near end
      const diff = targetProgress - currentProgress;
      let speed = 0;

      if (diff > 40) {
        speed = 2.2; // Fast initial progress
      } else if (diff > 20) {
        speed = 1.4; // Medium progress
      } else if (diff > 10) {
        speed = 0.8; // Slower for smoother feel
      } else {
        speed = 0.5; // Very smooth near target
      }

      currentProgress = Math.min(currentProgress + speed, targetProgress);

      const pct = Math.round(currentProgress);

      if (loadingBarFill) loadingBarFill.style.width = `${currentProgress}%`;
      if (panelBarFill) panelBarFill.style.width = `${currentProgress}%`;
      if (loadingPercent) loadingPercent.textContent = `${pct}%`;
      if (panelPercent) panelPercent.textContent = `${pct}%`;

      // Swap background image at 50%
      if (pct >= 50 && !bgSwapped) {
        bgSwapped = true;
        swapBackground();
      }
    }

    if (currentProgress >= 100) {
      console.log('🎯 Progress reached 100%! Completing...');
      cancelAnimationFrame(rafId);
      onLoadComplete();
      return;
    }

    rafId = requestAnimationFrame(animateProgress);
  }

  /* ──────────────────────────────────────────
     3. SIMULATED LOADING STAGES
     Mimics real resource loading phases with realistic timing.
  ────────────────────────────────────────── */
  const stages = [
    { target: 12, delay: 150 },   // Initial connection
    { target: 28, delay: 600 },   // CSS / fonts loading
    { target: 45, delay: 1200 },   // First images
    { target: 62, delay: 2000 },   // Scripts & API
    { target: 78, delay: 2800 },   // Additional resources
    { target: 88, delay: 3600 },   // Secondary images
    { target: 95, delay: 4400 },   // Finalizing
    { target: 100, delay: 5200 },   // Complete
  ];

  stages.forEach(({ target, delay }) => {
    setTimeout(() => {
      console.log(`⏱️  Stage trigger: ${target}%`);
      setProgress(target);
    }, delay);
  });

  console.log(`📍 8 loading stages scheduled (5.2s total duration)`);

  // Start animation loop immediately
  rafId = requestAnimationFrame(animateProgress);

  /* ──────────────────────────────────────────
     4. BACKGROUND IMAGE CROSS-FADE
  ────────────────────────────────────────── */
  function swapBackground() {
    if (!bgImg1 || !bgImg2) return;
    bgImg2.style.opacity = '1';
    setTimeout(() => {
      bgImg1.style.opacity = '0';
    }, 600);
  }

  /* ──────────────────────────────────────────
     5. LOAD COMPLETE HANDLER
  ────────────────────────────────────────── */
  function onLoadComplete() {
    console.log('✅ Loading complete! Transitioning to main app...');

    // Ensure bar shows 100%
    if (loadingBarFill) loadingBarFill.style.width = '100%';
    if (panelBarFill) panelBarFill.style.width = '100%';
    if (loadingPercent) loadingPercent.textContent = '100%';
    if (panelPercent) panelPercent.textContent = '100%';

    // Show scroll hint on mobile
    if (scrollHint) scrollHint.classList.remove('hidden');

    // Wait, then dismiss
    setTimeout(dismissLoading, 800);
  }

  /* ──────────────────────────────────────────
     6. DISMISS LOADING SCREEN
  ────────────────────────────────────────── */
  function dismissLoading() {
    if (!loadingScreen) {
      console.warn('❌ Loading screen not found');
      return;
    }

    console.log('🎬 Starting exit animation...');

    // Trigger CSS exit animation
    loadingScreen.classList.add('exit');

    // After animation ends, navigate to dashboard
    setTimeout(() => {
      console.log('🚀 Navigating to dashboard...');
       window.location.href = 'dashboard.html';
    }, 850); // match animation duration
  }

  /* ──────────────────────────────────────────
     7. SCROLL HINT CLICK (early dismiss)
  ────────────────────────────────────────── */
  if (scrollHint) {
    scrollHint.addEventListener('click', dismissLoading);
  }

  /* ──────────────────────────────────────────
     8. KEYBOARD SHORTCUT (Space / Enter = skip)
  ────────────────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      if (loadingScreen && !loadingScreen.classList.contains('exit')) {
        setProgress(100);
      }
    }
  });

  /* ──────────────────────────────────────────
     9. TAP / CLICK TO SKIP (after 2s)
  ────────────────────────────────────────── */
  let tapEnabled = false;
  setTimeout(() => { tapEnabled = true; }, 2000);

  if (loadingScreen) {
    loadingScreen.addEventListener('click', () => {
      if (tapEnabled && !loadingScreen.classList.contains('exit')) {
        setProgress(100);
      }
    });
  }

  /* ──────────────────────────────────────────
     9b. SAFETY TIMEOUT (Auto-dismiss after 8s)
     Ensures page shows content even if loading stalls
  ────────────────────────────────────────── */
  setTimeout(() => {
    if (loadingScreen && !loadingScreen.classList.contains('exit')) {
      console.log('Auto-dismissing loading screen (timeout)');
      setProgress(100);
    }
  }, 8000);

  /* ──────────────────────────────────────────
     10. PRELOAD IMAGES for smooth crossfade
     Enhanced: Tracks loading and adjusts progress accordingly
  ────────────────────────────────────────── */
  const imagesToPreload = [
    'assets/images/hero_bg.png',
    'assets/images/hero_interior.png',
  ];

  function preloadImages() {
    let loaded = 0;

    imagesToPreload.forEach((src) => {
      const img = new Image();

      img.onload = () => {
        loaded++;
        imagesLoaded = loaded;
        // Boost progress when images load (optional)
        if (currentProgress < 40) {
          setProgress(Math.min(40 + (loaded * 15), 60));
        }
      };

      img.onerror = () => {
        loaded++;
        imagesLoaded = loaded;
        console.warn(`Failed to preload image: ${src}`);
      };

      img.src = src;
    });
  }

  // Start preloading
  preloadImages();
});
