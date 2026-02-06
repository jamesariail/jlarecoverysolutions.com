/**
 * JLA Recovery Solutions - Main JavaScript
 *
 * Table of Contents:
 * 1. Mobile Navigation
 * 2. Smooth Scrolling
 * 3. Active Navigation State
 * 4. Contact Form Handling
 * 5. Scroll Animations (Optional)
 * 6. Utility Functions
 */

(function() {
    'use strict';

    // ============================================
    // 1. MOBILE NAVIGATION
    // ============================================

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');

    if (mobileMenuBtn && nav) {
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');

            // Update ARIA attributes
            const isExpanded = nav.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
            nav.setAttribute('aria-hidden', !isExpanded);
        });

        // Close menu when clicking a link
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
                mobileMenuBtn.focus();
            }
        });
    }

    // ============================================
    // 2. SMOOTH SCROLLING
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (targetId === '#' || targetId === '') {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                // Account for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

    // ============================================
    // 3. ACTIVE NAVIGATION STATE
    // ============================================

    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const filename = currentPath.split('/').pop() || 'index.html';

        navLinks.forEach(function(link) {
            link.classList.remove('active');

            const linkHref = link.getAttribute('href');

            // Check if link matches current page
            if (linkHref === filename ||
                (filename === '' && linkHref === 'index.html') ||
                (filename === 'index.html' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink();

    // ============================================
    // 4. CONTACT FORM HANDLING
    // ============================================

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // Check honeypot field (spam protection)
            const honeypot = contactForm.querySelector('input[name="website"]');
            if (honeypot && honeypot.value !== '') {
                // Likely a bot, silently fail
                showFormMessage('Thank you! Your message has been sent.', 'success');
                contactForm.reset();
                return;
            }

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';

            // Gather form data
            const formData = new FormData(contactForm);

            try {
                // Send to Formspree
                // Replace YOUR_FORM_ID with your actual Formspree form ID
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showFormMessage('Thank you! I\'ll respond to your message within 1-2 business days.', 'success');
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        showFormMessage('There was an error sending your message. Please try again or email me directly.', 'error');
                    } else {
                        showFormMessage('There was an error sending your message. Please try again.', 'error');
                    }
                }
            } catch (error) {
                showFormMessage('There was an error sending your message. Please try again or email me directly.', 'error');
            }

            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
    }

    function showFormMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = 'form-message ' + type;
            formMessage.style.display = 'block';

            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Auto-hide success messages after 10 seconds
            if (type === 'success') {
                setTimeout(function() {
                    formMessage.style.display = 'none';
                }, 10000);
            }
        }
    }

    // ============================================
    // 5. SCROLL ANIMATIONS (Optional Enhancement)
    // ============================================

    // Intersection Observer for fade-in animations
    // Only runs if user hasn't requested reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with data-animate attribute
        document.querySelectorAll('[data-animate]').forEach(function(el) {
            observer.observe(el);
        });
    }

    // ============================================
    // 6. UTILITY FUNCTIONS
    // ============================================

    // Debounce function for scroll/resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Header scroll effect (subtle shadow on scroll)
    const header = document.querySelector('header');

    if (header) {
        let lastScroll = 0;

        window.addEventListener('scroll', debounce(function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 10) {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
            }

            lastScroll = currentScroll;
        }, 10));
    }

    // Log site load for debugging (remove in production if desired)
    console.log('JLA Recovery Solutions - Site loaded successfully');

})();
