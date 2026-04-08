/**
 * beHin Dashboard – dashboard.js
 * Logic: header scroll, booking form, price calculator, scroll animations, back-to-top
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── switchBanner – thumbnail click to swap main image ── */
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
    document.querySelectorAll('.banner-thumb').forEach(t => t.classList.remove('active'));
    if (thumbEl) thumbEl.classList.add('active');
  };

  /* ── Auto-slideshow every 5s ── */
  const thumbEls = document.querySelectorAll('.banner-thumb');
  if (thumbEls.length > 0) {
    let slideIdx = 0;
    const srcs = [...thumbEls].map(t => t.querySelector('img')?.src);
    setInterval(() => {
      slideIdx = (slideIdx + 1) % srcs.length;
      if (srcs[slideIdx]) switchBanner(srcs[slideIdx], thumbEls[slideIdx]);
    }, 5000);
  }

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

});
