// ============================================
// COLORFUL PROFESSIONAL RESUME - JAVASCRIPT
// Neelo Byron Nkhuna Resume Interactive Features
// Version: 1.0
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Resume loaded successfully!');
    
    // Initialize all interactive features
    initSkillBarAnimations();
    initPrintFunctionality();
    initHoverEffects();
    initFormValidation();
    initThemeSettings();
    initDynamicContent();
    initProgressTracking();
    initContactForm();
});

// ========== SKILL BAR ANIMATIONS ==========
function initSkillBarAnimations() {
    console.log('Initializing skill bar animations...');
    
    const skillBars = document.querySelectorAll('.skill-level');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const targetWidth = skillLevel.getAttribute('data-width') || skillLevel.style.width;
                
                // Reset to 0 for animation
                skillLevel.style.width = '0%';
                
                // Animate to target width
                setTimeout(() => {
                    skillLevel.style.width = targetWidth;
                    skillLevel.classList.add('animated');
                    
                    // Add completion event
                    setTimeout(() => {
                        skillLevel.dispatchEvent(new CustomEvent('animationComplete'));
                    }, 1500);
                }, 300);
                
                observer.unobserve(skillLevel);
            }
        });
    }, observerOptions);
    
    // Store original widths and observe elements
    skillBars.forEach(bar => {
        const computedWidth = window.getComputedStyle(bar).width;
        bar.setAttribute('data-width', computedWidth);
        bar.style.width = '0%'; // Start hidden
        observer.observe(bar);
    });
    
    // Add click to reveal details functionality
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('click', function() {
            const skillName = this.querySelector('.skill-name span').textContent;
            const skillPercent = this.querySelector('.skill-name span:last-child').textContent;
            
            showSkillDetails(skillName, skillPercent);
        });
    });
}

function showSkillDetails(skillName, skillPercent) {
    const modal = document.createElement('div');
    modal.className = 'skill-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>${skillName} - ${skillPercent}</h3>
            <p>This represents my proficiency level in ${skillName}. Click on any skill to see more details about my experience and projects related to this skill.</p>
            <div class="skill-examples">
                <h4>Related Experience:</h4>
                <ul>
                    <li>Practical application in professional projects</li>
                    <li>Continuous learning and improvement</li>
                    <li>Real-world problem solving</li>
                </ul>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .skill-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }
        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            position: relative;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .close-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 28px;
            cursor: pointer;
            color: #FF6B6B;
        }
        .close-modal:hover {
            color: #2E3192;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
        style.remove();
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
}

// ========== PRINT FUNCTIONALITY ==========
function initPrintFunctionality() {
    console.log('Initializing print functionality...');
    
    const printButton = document.querySelector('.print-button');
    if (!printButton) {
        console.warn('Print button not found');
        return;
    }
    
    printButton.addEventListener('click', handlePrint);
    
    // Add keyboard shortcut (Ctrl/Cmd + P)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            handlePrint();
        }
    });
}

function handlePrint() {
    console.log('Preparing for print...');
    
    // Show print preview modal
    const printModal = document.createElement('div');
    printModal.className = 'print-modal';
    printModal.innerHTML = `
        <div class="print-modal-content">
            <h3><i class="fas fa-print"></i> Print / Export Resume</h3>
            <p>Select your preferred option:</p>
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
                <h4><i class="fas fa-lightbulb"></i> Tips for Best Results:</h4>
                <ul>
                    <li>Use "Save as PDF" for digital copies</li>
                    <li>Select "Color" in print settings</li>
                    <li>Use A4 or Letter paper size</li>
                    <li>Enable background graphics</li>
                </ul>
            </div>
        </div>
    `;
    
    document.body.appendChild(printModal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .print-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1001;
            backdrop-filter: blur(5px);
        }
        .print-modal-content {
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        }
        .print-options {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin: 25px 0;
            flex-wrap: wrap;
        }
        .print-option-btn {
            padding: 12px 25px;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
        }
        .print-option-btn[data-action="print"] {
            background: linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%);
            color: white;
        }
        .print-option-btn[data-action="pdf"] {
            background: linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%);
            color: white;
        }
        .print-option-btn[data-action="cancel"] {
            background: #f0f0f0;
            color: #666;
        }
        .print-option-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        .print-tips {
            background: #f9fdff;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
            text-align: left;
            border-left: 5px solid #1BFFFF;
        }
        .print-tips h4 {
            color: #2E3192;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
    `;
    document.head.appendChild(style);
    
    // Handle print options
    printModal.querySelectorAll('.print-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            
            switch(action) {
                case 'print':
                    window.print();
                    break;
                case 'pdf':
                    alert('To save as PDF: Click "Print" then choose "Save as PDF" in the print dialog.');
                    window.print();
                    break;
                case 'cancel':
                    // Do nothing, just close
                    break;
            }
            
            printModal.remove();
            style.remove();
        });
    });
    
    // Close modal on background click
    printModal.addEventListener('click', (e) => {
        if (e.target === printModal) {
            printModal.remove();
            style.remove();
        }
    });
}

// ========== HOVER EFFECTS ==========
function initHoverEffects() {
    console.log('Initializing hover effects...');
    
    // Enhanced item hover effects
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = '0 10px 25px rgba(46, 49, 146, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Certification item effects
    const certItems = document.querySelectorAll('.certification-item');
    certItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderLeftColor = '#FF6B6B';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderLeftColor = '#2E3192';
        });
    });
    
    // Contact item effects
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.15)';
        });
    });
    
    // Company name highlight
    const companyName = document.querySelector('.company-highlight');
    if (companyName) {
        companyName.addEventListener('mouseover', function() {
            this.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        });
        
        companyName.addEventListener('mouseout', function() {
            this.style.textShadow = 'none';
        });
    }
}

// ========== FORM VALIDATION ==========
function initFormValidation() {
    console.log('Initializing form validation...');
    
    // Check for any forms (for future expansion)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm(this);
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            highlightInvalid(input);
        } else {
            removeHighlight(input);
        }
    });
    
    if (isValid) {
        showSuccessMessage('Form submitted successfully!');
        form.reset();
    } else {
        showErrorMessage('Please fill in all required fields.');
    }
    
    return isValid;
}

function highlightInvalid(element) {
    element.style.borderColor = '#FF6B6B';
    element.style.boxShadow = '0 0 0 2px rgba(255, 107, 107, 0.2)';
}

function removeHighlight(element) {
    element.style.borderColor = '';
    element.style.boxShadow = '';
}

// ========== THEME SETTINGS ==========
function initThemeSettings() {
    console.log('Initializing theme settings...');
    
    // Create theme toggle if not exists
    if (!document.querySelector('.theme-toggle')) {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-palette"></i>';
        themeToggle.title = 'Toggle Theme';
        
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%);
            color: white;
            border: none;
            cursor: pointer;
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(themeToggle);
        
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('resume-theme');
    if (savedTheme === 'dark') {
        applyDarkTheme();
    }
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    
    if (isDark) {
        removeDarkTheme();
        localStorage.setItem('resume-theme', 'light');
    } else {
        applyDarkTheme();
        localStorage.setItem('resume-theme', 'dark');
    }
}

function applyDarkTheme() {
    document.body.classList.add('dark-theme');
    document.body.style.backgroundColor = '#1a1a2e';
    document.querySelector('.theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
}

function removeDarkTheme() {
    document.body.classList.remove('dark-theme');
    document.body.style.backgroundColor = '';
    document.querySelector('.theme-toggle').innerHTML = '<i class="fas fa-moon"></i>';
}

// ========== DYNAMIC CONTENT ==========
function initDynamicContent() {
    console.log('Initializing dynamic content...');
    
    // Update current year in footer
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
    }
    
    // Add last updated timestamp
    const lastUpdated = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const updateElement = document.querySelector('.last-updated');
    if (updateElement) {
        updateElement.textContent = `Last updated: ${lastUpdated}`;
    }
    
    // Add experience duration calculation
    calculateExperienceDuration();
}

function calculateExperienceDuration() {
    const experienceItems = document.querySelectorAll('.item-date');
    
    experienceItems.forEach(item => {
        const text = item.textContent;
        if (text.includes('Present')) {
            const startYear = text.match(/\d{4}/)?.[0];
            if (startYear) {
                const currentYear = new Date().getFullYear();
                const duration = currentYear - parseInt(startYear);
                const durationText = ` (${duration}+ years)`;
                
                if (!item.textContent.includes(durationText)) {
                    item.textContent += durationText;
                }
            }
        }
    });
}

// ========== PROGRESS TRACKING ==========
function initProgressTracking() {
    console.log('Initializing progress tracking...');
    
    // Track skill progress
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.setAttribute('data-skill-id', `skill-${index + 1}`);
    });
    
    // Add progress bars to certifications
    const certItems = document.querySelectorAll('.certification-item');
    certItems.forEach(item => {
        if (item.textContent.includes('In Progress')) {
            addProgressIndicator(item);
        }
    });
}

function addProgressIndicator(element) {
    const progressBar = document.createElement('div');
    progressBar.className = 'cert-progress';
    progressBar.innerHTML = `
        <div class="progress-text">Study Progress: 65%</div>
        <div class="progress-track">
            <div class="progress-fill"></div>
        </div>
    `;
    
    element.appendChild(progressBar);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .cert-progress {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px dashed #ddd;
        }
        .progress-text {
            font-size: 0.85rem;
            color: #666;
            margin-bottom: 8px;
        }
        .progress-track {
            height: 6px;
            background: #e8f4ff;
            border-radius: 3px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #2E3192 0%, #1BFFFF 100%);
            width: 65%;
            border-radius: 3px;
            animation: progressPulse 2s infinite;
        }
        @keyframes progressPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
    `;
    document.head.appendChild(style);
}

// ========== CONTACT FORM ==========
function initContactForm() {
    console.log('Initializing contact form...');
    
    // Create floating contact button
    const contactButton = document.createElement('button');
    contactButton.className = 'contact-float-btn';
    contactButton.innerHTML = '<i class="fas fa-envelope"></i>';
    contactButton.title = 'Quick Contact';
    
    contactButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%);
        color: white;
        border: none;
        cursor: pointer;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        box-shadow: 0 5px 20px rgba(255, 107, 107, 0.4);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(contactButton);
    
    contactButton.addEventListener('click', showContactForm);
    contactButton.addEventListener('mouseenter', () => {
        contactButton.style.transform = 'scale(1.1)';
    });
    contactButton.addEventListener('mouseleave', () => {
        contactButton.style.transform = 'scale(1)';
    });
}

function showContactForm() {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="contact-modal-content">
            <span class="close-contact">&times;</span>
            <h3><i class="fas fa-paper-plane"></i> Quick Contact</h3>
            <p>Want to get in touch? Send me a message!</p>
            
            <form id="quickContactForm">
                <div class="form-group">
                    <input type="text" placeholder="Your Name" required>
                </div>
                <div class="form-group">
                    <input type="email" placeholder="Your Email" required>
                </div>
                <div class="form-group">
                    <textarea placeholder="Your Message" rows="4" required></textarea>
                </div>
                <button type="submit" class="submit-btn">
                    <i class="fas fa-paper-plane"></i> Send Message
                </button>
            </form>
            
            <div class="contact-info-modal">
                <h4><i class="fas fa-address-card"></i> Direct Contact:</h4>
                <div class="contact-detail">
                    <i class="fas fa-envelope"></i>
                    <span>byronnkhuna@gmail.com</span>
                </div>
                <div class="contact-detail">
                    <i class="fas fa-phone"></i>
                    <span>079 298 5272</span>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .contact-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1002;
            backdrop-filter: blur(5px);
        }
        .contact-modal-content {
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            position: relative;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        }
        .close-contact {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 28px;
            cursor: pointer;
            color: #FF6B6B;
        }
        .close-contact:hover {
            color: #2E3192;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e8f4ff;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #1BFFFF;
            box-shadow: 0 0 0 3px rgba(27, 255, 255, 0.1);
        }
        .submit-btn {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.3s ease;
        }
        .submit-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(46, 49, 146, 0.3);
        }
        .contact-info-modal {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px dashed #ddd;
        }
        .contact-detail {
            display: flex;
            align-items: center;
            gap: 15px;
            margin: 15px 0;
            padding: 10px;
            background: #f9fdff;
            border-radius: 8px;
        }
    `;
    document.head.appendChild(style);
    
    // Form submission
    const form = modal.querySelector('#quickContactForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simulate form submission
        showSuccessMessage(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
        
        // Close modal after delay
        setTimeout(() => {
            modal.remove();
            style.remove();
        }, 2000);
    });
    
    // Close functionality
    modal.querySelector('.close-contact').addEventListener('click', () => {
        modal.remove();
        style.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
}

// ========== NOTIFICATION SYSTEM ==========
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showErrorMessage(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1003;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
        max-width: 350px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #FF6B6B 0%, #f44336 100%)';
    }
    
    document.body.appendChild(notification);
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove after animation
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Update any scroll-based elements
        updateScrollBasedElements();
    }, 100);
});

function updateScrollBasedElements() {
    // Update any elements that depend on scroll position
    const header = document.querySelector('.header');
    if (header) {
        const scrollTop = window.pageYOffset;
        if (scrollTop > 50) {
            header.style.opacity = '0.95';
        } else {
            header.style.opacity = '1';
        }
    }
}

// ========== ERROR HANDLING ==========
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showErrorMessage('An error occurred. Please refresh the page.');
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSkillBarAnimations,
        initPrintFunctionality,
        initHoverEffects,
        toggleTheme,
        showContactForm
    };
}