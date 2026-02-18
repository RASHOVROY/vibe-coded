// ============================================
// Creator Onboarding — Script
// ============================================

// Google Sheets endpoint
const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbweHeoftjHVAoHmxXH58RcfkbuWqg40JslpzoEntaCzT-wJ_15SeU5aJMgrJ08eqmyuGg/exec';

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initForm();
    animateCreatorCount();
});

// ============================================
// Particle System
// ============================================

function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const x = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 15;
        const hue = Math.random() > 0.5 ? '263, 70%, 60%' : '187, 96%, 47%';

        particle.style.left = `${x}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = `hsla(${hue}, 0.4)`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);
    }
}

// ============================================
// Form Handling
// ============================================

function initForm() {
    const form = document.getElementById('onboarding-form');
    const submitBtn = document.getElementById('submit-btn');
    const successState = document.getElementById('success-state');

    // Clear errors on input
    document.querySelectorAll('.field-group input').forEach(input => {
        input.addEventListener('input', () => {
            const group = input.closest('.field-group');
            group.classList.remove('error');
            const errorEl = group.querySelector('.error-msg');
            if (errorEl) errorEl.textContent = '';
        });

        // Auto-add @ for X and Telegram fields
        if (input.id === 'x-handle' || input.id === 'telegram') {
            input.addEventListener('focus', () => {
                if (input.value === '') {
                    input.value = '@';
                }
            });
            input.addEventListener('blur', () => {
                if (input.value === '@') {
                    input.value = '';
                }
            });
            // Prevent double @@
            input.addEventListener('input', () => {
                if (input.value.startsWith('@@')) {
                    input.value = input.value.replace(/^@+/, '@');
                }
            });
        }
    });

    // Clear terms error on check
    const termsCheckbox = document.getElementById('terms-agree');
    termsCheckbox.addEventListener('change', () => {
        document.getElementById('terms-group').classList.remove('error');
        document.getElementById('terms-error').textContent = '';
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate
        const email = document.getElementById('email').value.trim();
        const xHandle = document.getElementById('x-handle').value.trim();
        const telegram = document.getElementById('telegram').value.trim();

        let isValid = true;

        // Email validation
        if (!email) {
            showError('email-group', 'email-error', 'Email address is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email-group', 'email-error', 'Please enter a valid email address');
            isValid = false;
        }

        // X handle validation
        if (!xHandle) {
            showError('x-group', 'x-error', 'X handle is required');
            isValid = false;
        } else if (!xHandle.startsWith('@')) {
            showError('x-group', 'x-error', 'Handle must start with @');
            isValid = false;
        } else if (xHandle.length < 2) {
            showError('x-group', 'x-error', 'Please enter a valid X handle');
            isValid = false;
        }

        // Telegram validation
        if (!telegram) {
            showError('telegram-group', 'telegram-error', 'Telegram username is required');
            isValid = false;
        } else if (!telegram.startsWith('@')) {
            showError('telegram-group', 'telegram-error', 'Username must start with @');
            isValid = false;
        } else if (telegram.length < 2) {
            showError('telegram-group', 'telegram-error', 'Please enter a valid Telegram username');
            isValid = false;
        }

        // Terms validation
        const termsChecked = document.getElementById('terms-agree').checked;
        if (!termsChecked) {
            const termsGroup = document.getElementById('terms-group');
            termsGroup.classList.add('error');
            document.getElementById('terms-error').textContent = 'You must agree to the Terms and Conditions';
            isValid = false;
        }

        if (!isValid) return;

        // Show loading state
        submitBtn.classList.add('loading');

        try {
            // Save to Google Sheets
            const response = await fetch(SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, xHandle, telegram })
            });

            // Show success
            submitBtn.classList.remove('loading');
            form.style.display = 'none';
            document.querySelector('.form-header').style.display = 'none';
            successState.classList.add('show');

            // Increment creator count
            incrementCreatorCount();

            console.log('✅ Creator saved to Google Sheets:', { email, xHandle, telegram });
        } catch (err) {
            submitBtn.classList.remove('loading');
            console.error('❌ Error saving:', err);
            showError('email-group', 'email-error', 'Something went wrong. Please try again.');
        }
    });
}

function showError(groupId, errorId, message) {
    const group = document.getElementById(groupId);
    const errorEl = document.getElementById(errorId);
    group.classList.add('error');
    errorEl.textContent = message;

    // Shake animation
    group.style.animation = 'shake 0.4s ease-out';
    setTimeout(() => {
        group.style.animation = '';
    }, 400);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================================
// Creator Count Animation
// ============================================

function animateCreatorCount() {
    const el = document.getElementById('creator-count');
    const target = 241;
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);

    el.textContent = '0';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(interval);
                    }
                    el.textContent = Math.floor(current).toLocaleString();
                }, 16);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(el);
}

function incrementCreatorCount() {
    const el = document.getElementById('creator-count');
    const current = parseInt(el.textContent.replace(/,/g, ''));
    el.textContent = (current + 1).toLocaleString();
}

// ============================================
// Shake animation (injected via CSS)
// ============================================

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);
