/**
 * ==========================================================================
 * WORK LOG MODULE (Vanilla JS ES6+)
 * Personal Portfolio - Ahmad Rayhan Anrito Pratama
 * Handles:
 * 1. Interactive Category Filtering with Smooth Transition Animations
 * 2. Fullscreen Lightbox Zoom Modal (Trigger, Close via Button, ESC & Backdrop Click)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initWorkLogFilters();
  initWorkLogModal();
});

/**
 * 1. INTERACTIVE CATEGORY FILTERS
 * Filters worklog cards smoothly based on category: 'all', 'in-progress', 'research', 'final-polish'
 */
function initWorkLogFilters() {
  const filterButtons = document.querySelectorAll('.worklog-tab-btn');
  const worklogCards = document.querySelectorAll('.worklog-card');

  if (!filterButtons.length || !worklogCards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and set on clicked button
      filterButtons.forEach((button) => button.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter') || 'all';

      // Animate filtering transition
      worklogCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || cardCategory === filterValue;

        if (shouldShow) {
          // Reveal card with smooth opacity and transform
          card.classList.remove('is-hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px) scale(0.98)';
          
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, index * 40); // Subtle staggered delay
        } else {
          // Fade out and hide non-matching cards
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px) scale(0.98)';
          setTimeout(() => {
            card.classList.add('is-hidden');
          }, 280);
        }
      });
    });
  });
}

/**
 * 2. LIGHTBOX ZOOM MODAL (OVERLAY FULLSCREEN)
 * Handles open modal on card image / inspect button click and closing via X button, ESC key, or backdrop click.
 */
function initWorkLogModal() {
  const modalBackdrop = document.getElementById('worklog-modal');
  if (!modalBackdrop) return;

  const modalImg = document.getElementById('worklog-modal-img');
  const modalTitle = document.getElementById('worklog-modal-title');
  const modalDate = document.getElementById('worklog-modal-date');
  const modalBadge = document.getElementById('worklog-modal-badge');
  const modalDesc = document.getElementById('worklog-modal-desc');
  const modalCloseBtn = document.getElementById('worklog-modal-close');

  const triggerElements = document.querySelectorAll('.js-worklog-modal-trigger');

  // Open Modal function
  const openModal = (card) => {
    const title = card.getAttribute('data-title') || 'Work Log Detail';
    const date = card.getAttribute('data-date') || '';
    const badgeHtml = card.getAttribute('data-badge') || '';
    const imageSrc = card.getAttribute('data-image') || '';
    const description = card.getAttribute('data-detail') || '';

    if (modalImg && imageSrc) {
      modalImg.src = imageSrc;
      modalImg.alt = title;
    }
    if (modalTitle) modalTitle.textContent = title;
    if (modalDate) modalDate.textContent = date;
    if (modalBadge) modalBadge.innerHTML = badgeHtml;
    if (modalDesc) modalDesc.textContent = description;

    // Show modal with fade-in animation
    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock body scroll

    // Focus close button for keyboard accessibility
    if (modalCloseBtn) {
      setTimeout(() => modalCloseBtn.focus(), 100);
    }
  };

  // Close Modal function
  const closeModal = () => {
    if (!modalBackdrop.classList.contains('is-open')) return;
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore body scroll
  };

  // Attach click listener to each card media container and action button
  triggerElements.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const parentCard = trigger.closest('.worklog-card');
      if (parentCard) {
        openModal(parentCard);
      }
    });
  });

  // 1. Close on clicking close X button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // 2. Close on clicking outside modal container (backdrop click)
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // 3. Close on pressing ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      closeModal();
    }
  });
}
