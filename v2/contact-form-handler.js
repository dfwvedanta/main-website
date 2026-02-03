
// ================================
// Contact Form Handler
// ================================

function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');

    if (!form) return;

    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showStatus('Thank you for your message! We will get back to you soon.', 'success');
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const originalBtnText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showStatus('Thank you for your message! We will get back to you soon.', 'success');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            showStatus('Sorry, there was an error sending your message. Please email us directly at dfwvedanta@gmail.com', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });

    function showStatus(message, statusType) {
        statusDiv.textContent = message;
        statusDiv.style.display = 'block';
        statusDiv.style.backgroundColor = statusType === 'success' ? '#d4edda' : '#f8d7da';
        statusDiv.style.color = statusType === 'success' ? '#155724' : '#721c24';
        statusDiv.style.border = '1px solid ' + (statusType === 'success' ? '#c3e6cb' : '#f5c6cb');

        statusDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        if (statusType === 'success') {
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 10000);
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}
