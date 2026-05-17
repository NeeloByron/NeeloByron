// ============================================
// NEELO BYRON NKHUNA - RESUME SCRIPTS
// Version: 2.0
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initSkillBars();
  initHoverEffects();
  initTheme();
  initFABs();
  initPrintButton();
  initDynamicDates();
  initCertProgress();
});

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.body.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';

    // Subtle header opacity on scroll
    const header = document.querySelector('.header');
    if (header) {
      header.style.opacity = scrolled > 60 ? '0.95' : '1';
    }
  }, { passive: true });
}

// ============================================================
// SKILL BAR ANIMATIONS (IntersectionObserver)
// ============================================================
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-level');

  // Store the target widths and reset to 0
  bars.forEach(bar => {
    bar.dataset.targetWidth = bar.style.width || '0%';
    bar.style.width = '0%';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        // Small delay for stagger effect
        setTimeout(() => {
          bar.style.width = bar.dataset.targetWidth;
        }, 150);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(bar => observer.observe(bar));
}

// ============================================================
// HOVER EFFECTS (items, certs, tech)
// ============================================================
function initHoverEffects() {
  // Tech items glow
  document.querySelectorAll('.tech-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.boxShadow = '0 5px 20px rgba(59, 130, 246, 0.4)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.boxShadow = '';
    });
  });

  // Certification border color shift
  document.querySelectorAll('.certification-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.borderLeftColor = '#8b5cf6';
    });
    el.addEventListener('mouseleave', () => {
      el.style.borderLeftColor = '';
    });
  });
}

// ============================================================
// THEME TOGGLE (dark / light)
// ============================================================
function initTheme() {
  const saved = localStorage.getItem('resume-theme');
  if (saved === 'light') applyTheme('light');
}

function applyTheme(mode) {
  if (mode === 'light') {
    document.body.classList.add('light-theme');
    localStorage.setItem('resume-theme', 'light');
    updateThemeFAB('light');
  } else {
    document.body.classList.remove('light-theme');
    localStorage.setItem('resume-theme', 'dark');
    updateThemeFAB('dark');
  }
}

function updateThemeFAB(mode) {
  const btn = document.getElementById('fab-theme');
  if (!btn) return;
  btn.innerHTML = mode === 'light'
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun"></i>';
  btn.title = mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
}

// ============================================================
// FLOATING ACTION BUTTONS
// ============================================================
function initFABs() {
  // Contact FAB
  const fabContact = document.createElement('button');
  fabContact.id    = 'fab-contact';
  fabContact.className = 'fab';
  fabContact.innerHTML = '<i class="fas fa-envelope"></i>';
  fabContact.title = 'Quick Contact';
  fabContact.addEventListener('click', showContactModal);
  document.body.appendChild(fabContact);

  // Theme FAB
  const fabTheme = document.createElement('button');
  fabTheme.id    = 'fab-theme';
  fabTheme.className = 'fab';
  fabTheme.innerHTML = '<i class="fas fa-sun"></i>';
  fabTheme.title = 'Switch to light mode';
  fabTheme.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-theme');
    applyTheme(isLight ? 'dark' : 'light');
  });
  document.body.appendChild(fabTheme);

  // Set initial icon based on saved theme
  const saved = localStorage.getItem('resume-theme');
  updateThemeFAB(saved === 'light' ? 'light' : 'dark');
}

// ============================================================
// PRINT BUTTON
// ============================================================
function initPrintButton() {
  const btn = document.querySelector('.print-button');
  if (!btn) return;

  btn.addEventListener('click', e => {
    e.preventDefault();
    showPrintModal();
  });

  // Keyboard shortcut Ctrl/Cmd + P
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      showPrintModal();
    }
  });
}

function showPrintModal() {
  const overlay = createModalOverlay();
  overlay.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" aria-label="Close">&times;</button>
      <h3><i class="fas fa-print"></i> Print / Export Resume</h3>
      <p style="color: var(--text-muted); margin-bottom: 4px;">Select your preferred option:</p>
      <div class="print-options">
        <button class="print-option-btn" data-action="print">
          <i class="fas fa-print"></i> Print Now
        </button>
        <button class="print-option-btn" data-action="pdf">
          <i class="fas fa-file-pdf"></i> Save as PDF
        </button>
        <button class="print-option-btn" data-action="cancel">
          <i class="fas fa-times"></i> Cancel
        </button>
      </div>
      <div class="print-tips">
        <h4><i class="fas fa-lightbulb"></i> Tips for Best Results</h4>
        <ul>
          <li>Use "Save as PDF" for digital sharing</li>
          <li>Enable <strong>background graphics</strong> in print settings</li>
          <li>Choose A4 or Letter paper size</li>
          <li>Select <strong>Color</strong> printing</li>
        </ul>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  trapFocus(overlay);

  overlay.querySelectorAll('.print-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (action === 'print' || action === 'pdf') {
        if (action === 'pdf') {
          showToast('In the print dialog, choose "Save as PDF" as the destination.', 'success');
        }
        setTimeout(() => window.print(), 300);
      }
      removeModal(overlay);
    });
  });

  bindModalClose(overlay);
}

// ============================================================
// CONTACT MODAL
// ============================================================
function showContactModal() {
  const overlay = createModalOverlay();
  overlay.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" aria-label="Close">&times;</button>
      <h3><i class="fas fa-paper-plane"></i> Quick Contact</h3>
      <p style="color: var(--text-muted); margin-bottom: 18px;">Send me a message and I'll get back to you!</p>

      <form id="contact-form" novalidate>
        <div class="form-group">
          <input type="text" name="name" placeholder="Your Name" required autocomplete="name" />
        </div>
        <div class="form-group">
          <input type="email" name="email" placeholder="Your Email" required autocomplete="email" />
        </div>
        <div class="form-group">
          <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
        </div>
        <button type="submit" class="submit-btn">
          <i class="fas fa-paper-plane"></i> Send Message
        </button>
      </form>

      <div class="contact-modal-divider">
        <h4><i class="fas fa-address-card"></i> Direct Contact</h4>
        <div class="contact-modal-row">
          <i class="fas fa-envelope"></i>
          <span>byronnkhuna@gmail.com</span>
        </div>
        <div class="contact-modal-row">
          <i class="fas fa-phone"></i>
          <span>079 298 5272</span>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  trapFocus(overlay);

  const form = overlay.querySelector('#contact-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const name = form.querySelector('[name="name"]').value.trim();
    showToast(`Thank you, ${name}! Your message has been sent.`, 'success');
    removeModal(overlay);
  });

  bindModalClose(overlay);
}

// ============================================================
// FORM VALIDATION
// ============================================================
function validateForm(form) {
  let valid = true;

  form.querySelectorAll('[required]').forEach(field => {
    field.classList.remove('invalid');
    if (!field.value.trim()) {
      field.classList.add('invalid');
      valid = false;
    }
    // Basic email check
    if (field.type === 'email' && field.value.trim()) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
      if (!emailOk) {
        field.classList.add('invalid');
        valid = false;
      }
    }
  });

  if (!valid) showToast('Please fill in all required fields correctly.', 'error');
  return valid;
}

// ============================================================
// DYNAMIC DATE CALCULATIONS
// ============================================================
function initDynamicDates() {
  // Update footer year
  const footer = document.querySelector('.footer p');
  if (footer) {
    footer.innerHTML = footer.innerHTML.replace(/\d{4}/, new Date().getFullYear());
  }

  // Calculate duration for roles that say "Present"
  document.querySelectorAll('.item-date').forEach(el => {
    if (el.textContent.includes('Present')) {
      const match = el.textContent.match(/(\w+\s)?\d{4}/);
      if (match) {
        const startYear = parseInt(match[0].match(/\d{4}/)[0]);
        const years = new Date().getFullYear() - startYear;
        if (years > 0 && !el.textContent.includes('year')) {
          el.textContent += ` (${years}+ yr${years > 1 ? 's' : ''})`;
        }
      }
    }
  });
}

// ============================================================
// CERTIFICATION IN-PROGRESS INDICATOR
// ============================================================
function initCertProgress() {
  document.querySelectorAll('.cert-status').forEach(el => {
    if (el.textContent.trim() === 'In Progress') {
      el.classList.add('in-progress');
      // Append progress bar to parent cert item
      const certItem = el.closest('.certification-item');
      if (certItem) {
        const progress = document.createElement('div');
        progress.className = 'cert-progress';
        progress.innerHTML = `
          <div class="cert-progress-label">Study progress: 65%</div>
          <div class="cert-progress-track">
            <div class="cert-progress-fill"></div>
          </div>
        `;
        certItem.appendChild(progress);
      }
    }
  });
}

// ============================================================
// MODAL HELPERS
// ============================================================
function createModalOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  return overlay;
}

function removeModal(overlay) {
  overlay.style.animation = 'fade-in 0.2s ease reverse';
  setTimeout(() => overlay.remove(), 200);
}

function bindModalClose(overlay) {
  // Close button
  overlay.querySelector('.modal-close')?.addEventListener('click', () => removeModal(overlay));

  // Click outside
  overlay.addEventListener('click', e => {
    if (e.target === overlay) removeModal(overlay);
  });

  // Escape key
  const escHandler = e => {
    if (e.key === 'Escape') {
      removeModal(overlay);
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

function trapFocus(element) {
  const focusable = element.querySelectorAll(
    'button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;
  focusable[0].focus();
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type = 'success') {
  // Remove any existing toast
  document.querySelector('.toast')?.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3200);
}

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================
window.addEventListener('error', e => {
  console.error('Resume JS error:', e.error);
});

// ============================================================
// MODULE EXPORT (if used as a module)
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    showContactModal,
    showPrintModal,
    applyTheme,
    showToast,
  };
}