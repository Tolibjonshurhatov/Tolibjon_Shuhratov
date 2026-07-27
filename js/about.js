/* =========================================================
   about.js
   Har bir .about-block o'zining data-year qiymatiga ega.
   Foydalanuvchi scroll qilganda, ekran markazidagi blokka mos
   yil .year-stamp__value ichida yumshoq almashadi.
   ========================================================= */

(function () {
  const blocks = document.querySelectorAll('.about-block[data-year]');
  const yearEl = document.getElementById('yearValue');
  if (!blocks.length || !yearEl) return;

  let currentYear = yearEl.textContent.trim();

  function setYear(newYear) {
    if (newYear === currentYear) return;
    currentYear = newYear;
    yearEl.classList.add('is-swapping');
    setTimeout(function () {
      yearEl.textContent = newYear;
      yearEl.classList.remove('is-swapping');
    }, 180);
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setYear(entry.target.getAttribute('data-year'));
        }
      });
    },
    {
      /* Ekranning vertikal markaziga yaqinlashganda hisoblanadi */
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0
    }
  );

  blocks.forEach(function (block) { observer.observe(block); });
})();
