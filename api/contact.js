// Vercel serverless function backing the contact form.
//
// The rest of this site is static; this is the one server-side piece, added so
// "Get Started" can submit a form instead of opening the visitor's mail client.
// Mail goes through Resend's REST API over fetch, so the site still has no
// dependencies and no build step.

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const REQUEST_TIMEOUT_MS = 10000;
const MAX_FIELD = 200;

const FIELDS = [
  ['firstName', 'First name', true],
  ['lastName', 'Last name', true],
  ['email', 'Email', true],
  ['phone', 'Phone', false],
  ['companyName', 'Company name', true],
];

function clean(value) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, MAX_FIELD);
}

// CommonJS on purpose: the site has no package.json, so Vercel's Node runtime
// treats a .js function as CommonJS and ESM syntax would fail to parse.
module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  // Vercel parses JSON bodies, but a form posted without JS arrives as a
  // string, so both shapes are accepted.
  let body = request.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return response.status(400).json({ error: 'Could not read the submitted form.' });
    }
  }
  if (!body || typeof body !== 'object') {
    return response.status(400).json({ error: 'Could not read the submitted form.' });
  }

  // A bot filling every field including the hidden one is the cheapest spam
  // signal available; a real browser leaves it empty. Answer 200 so the bot
  // sees success and does not retry.
  if (clean(body.website)) {
    return response.status(200).json({ ok: true });
  }

  const values = {};
  const missing = [];
  for (const [key, label, required] of FIELDS) {
    values[key] = clean(body[key]);
    if (required && !values[key]) missing.push(label);
  }

  if (missing.length > 0) {
    return response.status(400).json({ error: `Please fill in: ${missing.join(', ')}.` });
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
    return response.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO || 'mgolino@outlook.com';

  if (!apiKey || !from) {
    console.error('Contact form is not configured: RESEND_API_KEY or CONTACT_EMAIL_FROM is missing.');
    return response.status(500).json({ error: 'The contact form is not configured yet. Please email info@cloudassistone.com.' });
  }

  const text = [
    'A new enquiry was submitted from the Cloud Assist One website.',
    '',
    `Name: ${values.firstName} ${values.lastName}`,
    `Company: ${values.companyName}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || 'Not provided'}`,
  ].join('\n');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const sent = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Website enquiry from ${values.companyName} — ${values.firstName} ${values.lastName}`,
        text,
        reply_to: values.email,
      }),
      signal: controller.signal,
    });

    if (!sent.ok) {
      const detail = await sent.text();
      console.error('Resend refused the contact email:', sent.status, detail.slice(0, 500));
      return response.status(502).json({ error: 'We could not send your message. Please email info@cloudassistone.com.' });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to send the contact email:', error);
    return response.status(502).json({ error: 'We could not send your message. Please email info@cloudassistone.com.' });
  } finally {
    clearTimeout(timeout);
  }
};
