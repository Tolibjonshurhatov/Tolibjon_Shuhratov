/* =========================================================
   contact.js
   MUHIM: Bu fayl Telegram bot tokenini umuman bilmaydi va
   ko'rmaydi. Forma faqat o'zingizning backend endpointingizga
   ("/api/send") so'rov yuboradi. Token backend serverda,
   environment variable sifatida saqlanadi (qarang: api/send.js
   va .env.example). Shu tufayli token brauzer kodida hech
   qachon ko'rinmaydi.
   ========================================================= */

(function () {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const contact = form.contact.value.trim();
    const message = form.message.value.trim();

    if (!name || !contact || !message) {
      showStatus('Iltimos, barcha maydonlarni to\'ldiring.', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Yuborilmoqda...';
    showStatus('', '');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, contact: contact, message: message })
      });

      if (!res.ok) throw new Error('Server xatosi');

      showStatus('Xabaringiz yuborildi! Tez orada javob beraman.', 'success');
      form.reset();
    } catch (err) {
      showStatus(
        'Xabar yuborilmadi. Iltimos, to\'g\'ridan-to\'g\'ri Telegram orqali yozing.',
        'error'
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Xabar yuborish';
    }
  });

  function showStatus(text, type) {
    statusEl.textContent = text;
    statusEl.className = 'form-status' + (type ? ' is-' + type : '');
  }
})();
