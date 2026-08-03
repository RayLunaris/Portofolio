/**
 * Interactive UI Animations
 * - 3D Tilt & Cursor Spotlight on Hover
 * - Magnetic Hover Effect for Buttons & Icons
 * - Scroll Reveal Animations via IntersectionObserver
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==================== 1. INTERACTIVE 3D TILT & CURSOR SPOTLIGHT ==================== */
  const tiltElements = document.querySelectorAll(
    '.project-card, .metric-card, .skill-category, .skill-card, .contact-form-container, .profile-ring'
  );

  tiltElements.forEach(el => {
    el.classList.add('tilt-card');

    el.addEventListener('mousemove', (e) => {
      if (prefersReducedMotion) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (-8deg to 8deg)
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      // Custom CSS variables for dynamic cursor glow position
      el.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      el.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });

  /* ==================== 2. MAGNETIC HOVER EFFECT FOR BUTTONS ==================== */
  const magneticButtons = document.querySelectorAll('.btn, .social-icon-link, .header-contact-btn, .back-to-top');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      if (prefersReducedMotion) return;

      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Move element towards mouse cursor slightly (magnetic pull)
      btn.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0) scale(1.06)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate3d(0, 0, 0) scale(1)';
    });
  });

  /* ==================== 3. SCROLL REVEAL ANIMATIONS ==================== */
  const revealTargets = document.querySelectorAll(
    '.section-header, .about-text, .metric-card, .skill-category, .project-card, .contact-info, .contact-form-container'
  );

  revealTargets.forEach((target, index) => {
    target.classList.add('reveal-element');
    // Stagger delays based on index inside container
    target.style.transitionDelay = `${(index % 3) * 0.12}s`;
  });

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealTargets.forEach(target => {
    revealObserver.observe(target);
  });
});
