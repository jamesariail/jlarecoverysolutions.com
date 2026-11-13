/* JLA Recovery Solutions | site behavior (menu, header, reveal, contact form) */
(function () {
    'use strict';
    document.documentElement.classList.remove('no-js');

    // Mobile menu
    var toggle = document.querySelector('.menu-toggle');
    var nav = document.querySelector('.site-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            }
        });
    }

    // Header shadow on scroll
    var header = document.querySelector('.site-header');
    if (header) {
        var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // Reveal on scroll
    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && items.length) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
            });
        }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });
        items.forEach(function (el) { io.observe(el); });
    } else {
        items.forEach(function (el) { el.classList.add('in'); });
    }

    // Footer year
    var year = document.getElementById('year');
    if (year) { year.textContent = new Date().getFullYear(); }

    // Contact form (Formspree)
    var form = document.getElementById('contact-form');
    var msg = document.getElementById('form-message');
    function show(text, type) {
        if (!msg) { return; }
        msg.textContent = text;
        msg.className = 'form-message ' + type;
        msg.style.display = 'block';
        msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var honeypot = form.querySelector('input[name="website"]');
            if (honeypot && honeypot.value !== '') {
                show('Thank you. Your message has been sent.', 'success');
                form.reset();
                return;
            }
            var btn = form.querySelector('button[type="submit"]');
            var label = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = 'Sending...';
            fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
                .then(function (res) {
                    if (res.ok) {
                        show(form.getAttribute('data-success') || 'Thank you. I will respond to your message within one to two business days.', 'success');
                        form.reset();
                    } else {
                        show('There was an error sending your message. Please try again or connect with me on LinkedIn.', 'error');
                    }
                })
                .catch(function () {
                    show('There was an error sending your message. Please try again or connect with me on LinkedIn.', 'error');
                })
                .then(function () {
                    btn.disabled = false;
                    btn.innerHTML = label;
                });
        });
    }
})();
