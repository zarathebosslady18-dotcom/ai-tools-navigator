/* Founder site behaviour: links, soft gate, contact form, placeholders. */
(function () {
  'use strict';
  var FS = window.FS || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Year */
  document.querySelectorAll('#year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Resolve [DOMAIN] placeholders (canonical, OG image) from config */
  document.querySelectorAll('[data-canonical]').forEach(function (el) {
    el.href = FS.domain + el.getAttribute('href').replace('[DOMAIN]', '');
  });
  document.querySelectorAll('[data-og-image]').forEach(function (el) {
    el.content = FS.domain + el.getAttribute('content').replace('[DOMAIN]', '');
  });

  /* Wire configured links */
  document.querySelectorAll('[data-link]').forEach(function (el) {
    var key = el.getAttribute('data-link');
    if (key === 'calendly' && FS.calendly) el.href = FS.calendly;
    if (key === 'email') el.href = 'mailto:' + FS.email;
    if (key === 'whatsapp' && FS.whatsapp) el.href = FS.whatsapp;
  });
  document.querySelectorAll('a[href="[GITHUB]"]').forEach(function (el) {
    el.href = FS.github || '#';
  });

  /* ---- Soft password gate (cosmetic; session-persisted) ---- */
  async function sha256hex(s) {
    var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
    return Array.from(new Uint8Array(buf)).map(function (b) {
      return b.toString(16).padStart(2, '0');
    }).join('');
  }

  var gateForm = document.getElementById('gate-form');
  var gateBody = document.getElementById('systems-body');
  if (gateForm && gateBody) {
    var UNLOCK_KEY = 'fs_gate_unlocked_v1';
    try {
      if (sessionStorage.getItem(UNLOCK_KEY) === '1') {
        gateForm.parentElement.querySelector('.lede').style.display = 'none';
        gateForm.hidden = true;
        gateBody.hidden = false;
      }
    } catch (e) { /* storage unavailable — gate works per submission */ }

    gateForm.addEventListener('submit', async function (ev) {
      ev.preventDefault();
      var pass = document.getElementById('gate-pass').value;
      var note = gateForm.querySelector('.form-note');
      if (pass === FS.systemsPass) {
        try { sessionStorage.setItem(UNLOCK_KEY, '1'); } catch (e) {}
        gateBody.hidden = false;
        gateForm.hidden = true;
        note.textContent = 'Unlocked. Welcome back.';
        if (!reduceMotion) gateBody.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        note.textContent = 'Not that one — try again.';
        document.getElementById('gate-pass').select();
      }
    });
  }

  /* ---- Contact form: Supabase if configured, graceful fallback otherwise ---- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var fd = new FormData(form);
      var payload = {};
      fd.forEach(function (v, k) { payload[k] = v; });
      var note = form.querySelector('.form-note');

      var text =
        'Name: ' + (payload.name || '') +
        '\nEmail: ' + (payload.email || '') +
        '\nBusiness: ' + (payload.business || '—') +
        '\n\n' + (payload.message || '');

      if (FS.supabase && FS.supabase.url && FS.supabase.key) {
        fetch(FS.supabase.url + '/rest/v1/' + FS.supabase.table, {
          method: 'POST',
          headers: {
            apikey: FS.supabase.key,
            Authorization: 'Bearer ' + FS.supabase.key,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
          body: JSON.stringify(payload),
        })
          .then(function (r) {
            if (!r.ok) throw new Error('http ' + r.status);
            note.textContent = 'Received — I reply within one business day.';
            form.reset();
          })
          .catch(function () {
            window.open(FS.whatsapp || 'mailto:' + FS.email + '?subject=' +
              encodeURIComponent('Intro from ' + (payload.name || '')) +
              '&body=' + encodeURIComponent(text), '_blank');
            note.textContent = 'Couldn’t reach the inbox — opened WhatsApp/email with your message prefilled.';
          });
      } else {
        var target = FS.whatsapp
          ? FS.whatsapp.split('?')[0] + '?text=' + encodeURIComponent(text)
          : 'mailto:' + FS.email + '?subject=' + encodeURIComponent('Intro from ' + (payload.name || '')) + '&body=' + encodeURIComponent(text);
        window.open(target, '_blank');
        note.textContent = 'Opened WhatsApp/email with your message prefilled — hit send and I’ll reply within one business day.';
      }
    });
  }
})();
