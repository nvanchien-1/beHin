/**
 * beHin Dashboard – dashboard.js
 * Logic: header scroll, booking form, price calculator, scroll animations, back-to-top
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Banner state & logic ── */
  const bannerThumbEls = document.querySelectorAll('.banner-thumb');
  const bannerSrcs = [...bannerThumbEls].map(t => t.querySelector('img')?.src);
  let currentBannerIdx = 0;

  window.switchBanner = function(src, thumbEl) {
    const bannerImg = document.getElementById('bannerImg');
    if (bannerImg) {
      bannerImg.style.opacity = '0';
      bannerImg.style.transform = 'scale(1.04)';
      setTimeout(() => {
        bannerImg.src = src;
        bannerImg.style.transition = 'opacity 0.45s ease, transform 0.6s ease';
        bannerImg.style.opacity = '1';
        bannerImg.style.transform = 'scale(1)';
      }, 200);
    }
    bannerThumbEls.forEach((t, idx) => {
      const isActive = t === thumbEl;
      t.classList.toggle('active', isActive);
      if (isActive) currentBannerIdx = idx;
    });
    // Reset auto-slide timer if manual switch happens
    resetBannerTimer();
  };

  /* ── Banner Auto-slideshow ── */
  let bannerInterval;
  function startBannerTimer() {
    if (bannerThumbEls.length === 0) return;
    bannerInterval = setInterval(() => {
      currentBannerIdx = (currentBannerIdx + 1) % bannerSrcs.length;
      switchBanner(bannerSrcs[currentBannerIdx], bannerThumbEls[currentBannerIdx]);
    }, 6000); // Increased to 6s for better reading
  }
  function resetBannerTimer() {
    clearInterval(bannerInterval);
    startBannerTimer();
  }
  startBannerTimer();

  /* ── Header scroll effect ── */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);

    // Back-to-top button
    const backTop = document.getElementById('backTop');
    if (backTop) backTop.classList.toggle('hidden', window.scrollY < 300);
  });

  /* ── Set default dates ── */
  const checkinEl  = document.getElementById('checkin');
  const checkoutEl = document.getElementById('checkout');
  if (checkinEl && checkoutEl) {
    const today    = new Date();
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
    const twoDays  = new Date(today); twoDays.setDate(today.getDate() + 2);

    checkinEl.min  = today.toISOString().split('T')[0];
    checkoutEl.min = tomorrow.toISOString().split('T')[0];
    checkinEl.value  = tomorrow.toISOString().split('T')[0];
    checkoutEl.value = twoDays.toISOString().split('T')[0];
    calcPrice();
  }

  /* ── Price Calculator ── */
  function calcPrice() {
    const checkin  = checkinEl?.value;
    const checkout = checkoutEl?.value;
    const guests   = parseInt(document.getElementById('guests')?.value || 2);
    const totalEl  = document.getElementById('formTotal');
    if (!checkin || !checkout || !totalEl) return;

    const nights = Math.max(0, (new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
    if (nights <= 0) { totalEl.textContent = ''; return; }

    const basePerNight = 1_850_000;
    const extraGuest   = guests > 2 ? (guests - 2) * 200_000 : 0;
    const cleaningFee  = 300_000;
    let   discount     = 0;
    let   discountNote = '';

    if (nights >= 7) { discount = 0.20; discountNote = ' (giảm 20%)'; }
    else if (nights >= 3) { discount = 0.10; discountNote = ' (giảm 10%)'; }

    const subtotal = (basePerNight + extraGuest) * nights;
    const total    = Math.round(subtotal * (1 - discount)) + cleaningFee;

    totalEl.innerHTML = `
      🗓️ ${nights} đêm · ${guests} khách${discountNote}<br/>
      <span style="font-size:16px">Tổng ước tính: <strong>${total.toLocaleString('vi-VN')} ₫</strong></span>
    `;
  }

  document.getElementById('checkin')?.addEventListener('change', () => {
    const c = document.getElementById('checkin');
    const o = document.getElementById('checkout');
    if (c && o && o.value <= c.value) {
      const next = new Date(c.value); next.setDate(next.getDate() + 1);
      o.value = next.toISOString().split('T')[0];
    }
    calcPrice();
  });
  document.getElementById('checkout')?.addEventListener('change', calcPrice);
  document.getElementById('guests')?.addEventListener('change', calcPrice);

  /* ── Booking Form Submission ── */
  window.handleBooking = function (e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const form = document.getElementById('bookForm');
    const success = document.getElementById('bookingSuccess');

    btn.textContent = 'Đang gửi...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // Simulate API call
    setTimeout(() => {
      form.classList.add('hidden');
      success.classList.remove('hidden');
    }, 1500);
  };

  /* ── Scroll-in Animations (IntersectionObserver) ── */
  const animEls = document.querySelectorAll(
    '.section-header, .amenity-card, .gallery-card, .food-card, .place-card, .loc-item, .contact-card, .rules-list-numbered li, .policy-item, .price-row, .host-card'
  );

  animEls.forEach(el => el.classList.add('animate-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Staggered animation for grid items
  document.querySelectorAll('.amenities-grid, .gallery-grid, .food-grid, .places-grid').forEach(grid => {
    [...grid.children].forEach((child, i) => {
      child.classList.add('animate-up');
      const orig = observer.observe.bind(observer);
      const wrappedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 70);
            wrappedObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      wrappedObserver.observe(child);
    });
  });

  animEls.forEach(el => observer.observe(el));

  /* ── Active nav highlight on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header-nav a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = '#1a8fa8';
          }
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => navObserver.observe(s));

  /* ── Gallery open (future lightbox hook) ── */
  document.getElementById('openGallery')?.addEventListener('click', () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('bookBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  });

  /* ══════════════════════════════════════════════
     ROOM GALLERY – slider logic
     ══════════════════════════════════════════════ */

  // State per room: current slide index
  const roomState = {};

  // Maps room key → total slide count
  const roomCounts = {
    phong_1: 13, phong_2: 12, phong_khach: 12, phong_bep: 11, view: 20
  };

  // Build dot indicators for each room
  function initSliderDots() {
    Object.keys(roomCounts).forEach(room => {
      const dotsContainer = document.getElementById(`dots-${room}`);
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < roomCounts[room]; i++) {
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Ảnh ${i + 1}`);
        dot.onclick = () => goToSlide(room, i);
        dotsContainer.appendChild(dot);
      }
      roomState[room] = 0;
    });
  }

  function updateDots(room, idx) {
    const dots = document.querySelectorAll(`#dots-${room} .slider-dot`);
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  function goToSlide(room, idx) {
    const track = document.getElementById(`track-${room}`);
    if (!track) return;
    const total = roomCounts[room] || 0;
    idx = (idx + total) % total;
    roomState[room] = idx;
    track.style.transform = `translateX(-${idx * 100}%)`;
    updateDots(room, idx);
  }

  // Public – called by HTML onclick
  window.slideRoom = function(room, dir) {
    const current = roomState[room] || 0;
    goToSlide(room, current + dir);
  };

  window.switchRoom = function(room, tabEl) {
    // Switch panels
    document.querySelectorAll('.room-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(`panel-${room}`)?.classList.add('active');
    // Switch tabs
    document.querySelectorAll('.room-tab').forEach(t => t.classList.remove('active'));
    if (tabEl) tabEl.classList.add('active');
  };

  // Keyboard nav for slider
  document.addEventListener('keydown', e => {
    const activePanel = document.querySelector('.room-panel.active');
    if (!activePanel) return;
    const room = activePanel.id.replace('panel-', '');
    if (e.key === 'ArrowLeft')  slideRoom(room, -1);
    if (e.key === 'ArrowRight') slideRoom(room, 1);
    if (e.key === 'Escape') closeLightbox();
  });

  /* ══════════════════════════════════════════════
     LIGHTBOX
     ══════════════════════════════════════════════ */
  let lightboxImages = [];
  let lightboxCurrent = 0;

  window.openLightbox = function(src, caption) {
    // Collect all slides from the current active panel
    const activePanel = document.querySelector('.room-panel.active');
    if (activePanel) {
      lightboxImages = [...activePanel.querySelectorAll('.slide img')].map(img => ({
        src: img.src,
        caption: img.alt
      }));
      lightboxCurrent = lightboxImages.findIndex(img => img.src.includes(src.split('/').pop()));
      if (lightboxCurrent < 0) lightboxCurrent = 0;
    } else {
      lightboxImages = [{ src, caption }];
      lightboxCurrent = 0;
    }

    showLightboxAt(lightboxCurrent);
    document.getElementById('lightboxOverlay')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function showLightboxAt(idx) {
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    const item = lightboxImages[idx];
    if (!img || !item) return;
    img.src = item.src;
    img.alt = item.caption || '';
    if (cap) cap.textContent = item.caption ? `${item.caption}  —  ${idx + 1} / ${lightboxImages.length}` : '';
  }

  window.closeLightbox = function() {
    document.getElementById('lightboxOverlay')?.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.lightboxNav = function(dir) {
    lightboxCurrent = (lightboxCurrent + dir + lightboxImages.length) % lightboxImages.length;
    showLightboxAt(lightboxCurrent);
  };

  // Init dots on load
  initSliderDots();

  /* ══════════════════════════════════════════════
     TOUCH SWIPE – Sliders & Lightbox
     ══════════════════════════════════════════════ */
  function addSwipe(el, onSwipeLeft, onSwipeRight) {
    let startX = 0, startY = 0, isDragging = false;
    el.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
    }, { passive: true });

    el.addEventListener('touchend', e => {
      if (!isDragging) return;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        dx < 0 ? onSwipeLeft() : onSwipeRight();
      }
      isDragging = false;
    }, { passive: true });
  }

  // Attach swipe to each slider
  Object.keys(roomCounts).forEach(room => {
    const sliderEl = document.getElementById(`slider-${room}`);
    if (sliderEl) {
      addSwipe(sliderEl,
        () => slideRoom(room, 1),   // swipe left → next
        () => slideRoom(room, -1)   // swipe right → prev
      );
    }
  });

  // Attach swipe to Hero Banner
  const bannerWrap = document.querySelector('.banner-wrap');
  if (bannerWrap) {
    addSwipe(bannerWrap,
      () => { // swipe left -> next
        const next = (currentBannerIdx + 1) % bannerSrcs.length;
        switchBanner(bannerSrcs[next], bannerThumbEls[next]);
      },
      () => { // swipe right -> prev
        const prev = (currentBannerIdx - 1 + bannerSrcs.length) % bannerSrcs.length;
        switchBanner(bannerSrcs[prev], bannerThumbEls[prev]);
      }
    );
  }

  // Attach swipe to lightbox
  const lightboxEl = document.getElementById('lightboxOverlay');
  if (lightboxEl) {
    addSwipe(lightboxEl,
      () => lightboxNav(1),   // swipe left → next
      () => lightboxNav(-1)   // swipe right → prev
    );
  }

  /* ══════════════════════════════════════════════
     MOBILE HAMBURGER NAV – simple toggle
     ══════════════════════════════════════════════ */
  // Inject hamburger button if not already present
  const headerInner = document.querySelector('.header-inner');
  const headerNav = document.querySelector('.header-nav');
  if (headerInner && headerNav && !document.getElementById('hamburger')) {
    const hamburger = document.createElement('button');
    hamburger.id = 'hamburger';
    hamburger.innerHTML = `<span></span><span></span><span></span>`;
    hamburger.setAttribute('aria-label', 'Menu');
    hamburger.style.cssText = `
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px 4px;
      margin-left: auto;
      margin-right: 8px;
      z-index: 1000;
    `;
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.cssText = 'display:block;width:24px;height:2px;background:var(--dark);border-radius:2px;transition:0.3s';
    });

    headerInner.insertBefore(hamburger, document.querySelector('.btn-book') || headerInner.lastChild);

    // Show hamburger only on ≤768px
    const mql = window.matchMedia('(max-width: 768px)');
    const toggleHamburger = (e) => {
      hamburger.style.display = e.matches ? 'flex' : 'none';
    };
    toggleHamburger(mql);
    mql.addEventListener('change', toggleHamburger);

    // Create mobile drawer nav
    const mobileNav = document.createElement('nav');
    mobileNav.id = 'mobileNav';
    mobileNav.style.cssText = `
      position: fixed;
      top: 64px;
      left: 0; right: 0;
      background: rgba(255,255,255,0.98);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      z-index: 998;
      padding: 12px 0 20px;
      transform: translateY(-8px);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.25s ease, opacity 0.25s ease;
      display: flex;
      flex-direction: column;
      gap: 4px;
    `;

    const navItems = [
      { href: '#gallery', label: '🏠 Không gian' },
      { href: '#amenities', label: '✨ Tiện ích' },
      { href: '#rules', label: '📋 Nội quy' },
      { href: '#policy', label: '💳 Chính sách' },
      { href: '#food', label: '🍜 Ẩm thực' },
      { href: '#places', label: '🗺️ Khám phá' },
      { href: '#location', label: '📍 Vị trí' },
      { href: '#contact', label: '📞 Liên hệ chủ nhà' },
    ];

    navItems.forEach(item => {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      a.style.cssText = `
        display: block;
        padding: 11px 24px;
        font-size: 15px;
        font-weight: 500;
        color: var(--text);
        border-bottom: 1px solid var(--border);
        transition: color 0.15s, background 0.15s;
      `;
      a.addEventListener('mouseover', () => a.style.background = 'var(--bg)');
      a.addEventListener('mouseout', () => a.style.background = '');
      a.addEventListener('click', () => closeMobileNav());
      mobileNav.appendChild(a);
    });

    document.body.appendChild(mobileNav);

    let navOpen = false;
    function closeMobileNav() {
      navOpen = false;
      mobileNav.style.opacity = '0';
      mobileNav.style.transform = 'translateY(-8px)';
      mobileNav.style.pointerEvents = 'none';
      hamburger.setAttribute('aria-expanded', 'false');
    }
    function openMobileNav() {
      navOpen = true;
      mobileNav.style.opacity = '1';
      mobileNav.style.transform = 'translateY(0)';
      mobileNav.style.pointerEvents = 'auto';
      hamburger.setAttribute('aria-expanded', 'true');
    }

    hamburger.addEventListener('click', () => {
      navOpen ? closeMobileNav() : openMobileNav();
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (navOpen && !mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
        closeMobileNav();
      }
    });
  }

});


