(function () {
  'use strict';

  var form = document.getElementById('contactForm');
  if (!form) return;

  var status = document.getElementById('contactStatus');
  var submit = document.getElementById('contactSubmit');

  var REQUIRED = [
    ['firstName', 'first name'],
    ['lastName', 'last name'],
    ['companyName', 'company name'],
    ['email', 'email'],
  ];

  function setStatus(message, kind) {
    status.textContent = message;
    status.className = 'contact-form__status' + (kind ? ' contact-form__status--' + kind : '');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var values = {};
    var missing = [];
    for (var i = 0; i < REQUIRED.length; i++) {
      var name = REQUIRED[i][0];
      values[name] = form.elements[name].value.trim();
      if (!values[name]) missing.push(REQUIRED[i][1]);
    }
    values.phone = form.elements.phone.value.trim();
    values.website = form.elements.website.value.trim();

    if (missing.length > 0) {
      setStatus('Please fill in your ' + missing.join(', ') + '.', 'error');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
      setStatus('Please enter a valid email address.', 'error');
      return;
    }

    submit.disabled = true;
    submit.textContent = 'Sending…';
    setStatus('');

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then(function (response) {
        return response.json().then(function (body) {
          return { ok: response.ok, body: body };
        });
      })
      .then(function (result) {
        if (!result.ok) {
          throw new Error(result.body && result.body.error ? result.body.error : 'Something went wrong.');
        }
        // The form is replaced rather than reset: leaving the fields filled
        // invites a second identical submission.
        form.innerHTML =
          '<p class="contact-form__success">Thanks — your message is on its way. We\'ll be in touch shortly.</p>';
      })
      .catch(function (error) {
        submit.disabled = false;
        submit.textContent = 'Send';
        setStatus(error.message || 'We could not send your message. Please email info@cloudassistone.com.', 'error');
      });
  });
})();
