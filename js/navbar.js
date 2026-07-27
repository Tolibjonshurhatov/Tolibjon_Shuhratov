/* =========================================================
   navbar.js
   - Scroll qilganda navbarga "is-scrolled" klassini qo'shadi (blur effekti)
   - Burger tugmasi mobil menyuni silliq ochib-yopadi
   ========================================================= */

(function () {
  const nav = document.getElementById('siteNav');
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');

  if (!nav) return;

  /* --- Scroll blur --- */
  const SCROLL_THRESHOLD = 12;

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Burger menu --- */
  if (burger && links) {
    burger.addEventListener('click', function () {
      const isOpen = links.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Havolaga bosilganda menyu avtomatik yopiladi (mobil) */
    links.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
})();
