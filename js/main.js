// Main JavaScript Logic
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('is-active');
    });
  }

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('is-active')) {
        navMenu.classList.remove('is-active');
        if (mobileToggle) {
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Active Link Indicator on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-list a[href*=${sectionId}]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  });
});
