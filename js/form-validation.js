/**
 * Form Validation & Submission JavaScript Module
 * Client-side validation, error handling, XSS protection, and form submission handling
 * Personal Portfolio - Ahmad Rayhan Anrito Pratama
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('btn-submit');

  if (!form) return;

  const fields = {
    name: {
      element: document.getElementById('name'),
      validate: (val) => {
        if (!val.trim()) return 'Nama lengkap wajib diisi.';
        if (val.trim().length < 2) return 'Nama minimal 2 karakter.';
        return '';
      }
    },
    email: {
      element: document.getElementById('email'),
      validate: (val) => {
        if (!val.trim()) return 'Alamat email wajib diisi.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val.trim())) return 'Format email tidak valid (contoh: nama@email.com).';
        return '';
      }
    },
    subject: {
      element: document.getElementById('subject'),
      validate: (val) => {
        if (!val.trim()) return 'Subjek pesan wajib diisi.';
        if (val.trim().length < 3) return 'Subjek minimal 3 karakter.';
        return '';
      }
    },
    message: {
      element: document.getElementById('message'),
      validate: (val) => {
        if (!val.trim()) return 'Isi pesan wajib diisi.';
        if (val.trim().length < 10) return 'Pesan minimal 10 karakter.';
        return '';
      }
    }
  };

  /**
   * Helper function for XSS sanitization
   * Escapes special HTML characters to prevent XSS attacks
   */
  const sanitizeHTML = (str) => {
    return str.replace(/[&<>"']/g, (match) => {
      const escapeChars = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return escapeChars[match] || match;
    });
  };

  /**
   * Display or clear field-level error messages
   */
  const showError = (fieldKey, errorMessage) => {
    const fieldObj = fields[fieldKey];
    if (!fieldObj || !fieldObj.element) return;

    const input = fieldObj.element;
    const parent = input.parentElement;

    // Clear existing error message
    let errorElem = parent.querySelector('.error-message');
    if (!errorElem) {
      errorElem = document.createElement('span');
      errorElem.className = 'error-message';
      parent.appendChild(errorElem);
    }

    if (errorMessage) {
      input.classList.add('input-error');
      errorElem.textContent = errorMessage;
      errorElem.style.display = 'block';
    } else {
      input.classList.remove('input-error');
      errorElem.textContent = '';
      errorElem.style.display = 'none';
    }
  };

  /**
   * Validate a single field
   */
  const validateField = (fieldKey) => {
    const fieldObj = fields[fieldKey];
    if (!fieldObj || !fieldObj.element) return true;

    const rawValue = fieldObj.element.value;
    const errorMessage = fieldObj.validate(rawValue);
    showError(fieldKey, errorMessage);
    return !errorMessage;
  };

  // Attach real-time listeners for input & blur events
  Object.keys(fields).forEach(key => {
    const fieldObj = fields[key];
    if (fieldObj && fieldObj.element) {
      fieldObj.element.addEventListener('blur', () => validateField(key));
      fieldObj.element.addEventListener('input', () => {
        if (fieldObj.element.classList.contains('input-error')) {
          validateField(key);
        }
      });
    }
  });

  /**
   * Form Submission Handler
   */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const formData = {};

    // Validate all fields
    Object.keys(fields).forEach(key => {
      const isFieldValid = validateField(key);
      if (!isFieldValid) {
        isValid = false;
      } else {
        formData[key] = sanitizeHTML(fields[key].element.value.trim());
      }
    });

    if (!isValid) {
      if (formStatus) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Mohon periksa kembali kolom isian yang belum sesuai.';
      }
      return;
    }

    // Show loading state on submit button
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    submitBtn.innerHTML = 'Mengirim Pesan... <i data-lucide="loader-2" class="spin"></i>';
    if (window.lucide) window.lucide.createIcons();

    if (formStatus) {
      formStatus.style.display = 'none';
      formStatus.className = 'form-status';
    }

    // Simulate Server API Call (e.g. Formspree / Web3Forms integration)
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.innerHTML = originalBtnHTML;
      if (window.lucide) window.lucide.createIcons();

      // Show Success Status Banner
      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.textContent = `Terima kasih ${formData.name}! Pesan Anda telah berhasil terkirim. Saya akan segera membalas email Anda.`;
      }

      // Reset form
      form.reset();
      Object.keys(fields).forEach(key => showError(key, ''));

      // Hide success message after 8 seconds
      setTimeout(() => {
        if (formStatus && formStatus.classList.contains('success')) {
          formStatus.style.display = 'none';
        }
      }, 8000);
    }, 1200);
  });
});
