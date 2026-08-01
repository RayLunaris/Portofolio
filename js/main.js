/**
 * Main JavaScript Module
 * Handles Sticky Header, Mobile Navigation, Active Link Highlighting, & Scroll Animations
 * Personal Portfolio - Ahmad Rayhan Anrito Pratama
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.querySelector('.back-to-top');

  /* ==========================================================================
     1. Sticky Header
     ========================================================================== */
  const handleHeaderScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Initial check

  /* ==========================================================================
     2. Mobile Navigation Menu Toggle
     ========================================================================== */
  if (mobileToggle && navMenu) {
    const toggleMobileMenu = () => {
      const isOpen = navMenu.classList.toggle('is-active');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      
      // Toggle Lucide Icon
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.setAttribute('data-lucide', 'x');
        } else {
          icon.setAttribute('data-lucide', 'menu');
        }
        if (window.lucide) {
          window.lucide.createIcons();
        }
      }
    };

    mobileToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('is-active') &&
          !navMenu.contains(e.target) &&
          !mobileToggle.contains(e.target)) {
        toggleMobileMenu();
      }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-active')) {
        toggleMobileMenu();
      }
    });
  }

  /* ==========================================================================
     3. Smooth Scroll & Close Mobile Menu on Click
     ========================================================================== */
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetSection = document.querySelector(href);
        if (targetSection) {
          e.preventDefault();
          targetSection.scrollIntoView({ behavior: 'smooth' });

          // Close mobile menu if active
          if (navMenu && navMenu.classList.contains('is-active')) {
            navMenu.classList.remove('is-active');
            if (mobileToggle) {
              mobileToggle.setAttribute('aria-expanded', 'false');
              const icon = mobileToggle.querySelector('i');
              if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                if (window.lucide) {
                  window.lucide.createIcons();
                }
              }
            }
          }
        }
      }
    });
  });

  /* ==========================================================================
     4. Active Link Highlighting on Scroll (IntersectionObserver)
     ========================================================================== */
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  /* ==========================================================================
     5. Scroll Reveal Animations for Sections & Cards
     ========================================================================== */
  const animateElements = document.querySelectorAll('.hero-content, .about-grid, .skill-category, .project-card, .contact-grid');

  animateElements.forEach(el => el.classList.add('fade-in-section'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     6. Back To Top Button Smooth Scroll
     ========================================================================== */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
