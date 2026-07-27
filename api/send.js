/**
 * api/send.js
 * ---------------------------------------------------------
 * Bu — Vercel Serverless Function (Node.js) namunasi.
 * Vazifasi: contact.html formasidan kelgan ma'lumotni olib,
 * Telegram Bot API orqali sizga xabar yuboradi.
 *
 * MUHIM: TELEGRAM_BOT_TOKEN bu yerda YOZILMAGAN.
 * U faqat hosting platformangizning "Environment Variables"
 * bo'limida saqlanadi (masalan Vercel Dashboard -> Settings ->
 * Environment Variables). Shu sabab token HECH QACHON git
 * repo'ga yoki brauzer kodiga tushmaydi.
 *
 * Deploy qilish (Vercel misolida):
 *   1. Ushbu "portfolio" papkani GitHub'ga yuklang.
 *   2. vercel.com'da repo'ni import qiling.
 *   3. Settings -> Environment Variables bo'limida qo'shing:
 *        TELEGRAM_BOT_TOKEN = <sizning bot tokeningiz>
 *        TELEGRAM_CHAT_ID   = <sizning chat/kanal ID'ingiz>
 *   4. Deploy qiling — /api/send avtomatik ishlay boshlaydi.
 * ---------------------------------------------------------
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Faqat POST so\'rovlar qabul qilinadi' });
  }

  const { name, contact, message } = req.body || {};

  if (!name || !contact || !message) {
    return res.status(400).json({ error: 'Barcha maydonlar to\'ldirilishi shart' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ error: 'Server sozlanmagan (env variables yo\'q)' });
  }

  const text =
    '📩 Yangi xabar (portfolio sayti)\n\n' +
    'Ism: ' + name + '\n' +
    'Kontakt: ' + contact + '\n' +
    'Xabar: ' + message;

  try {
    const tgRes = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: text })
    });

    if (!tgRes.ok) throw new Error('Telegram API xatosi');

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Xabar yuborishda xatolik' });
  }
}
