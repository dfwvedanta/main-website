// ================================
// Newsletter Subscription Handler
// ================================

function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const statusDiv = document.getElementById('newsletter-status');

    if (!form) return;

    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('subscribed') === 'true') {
        showStatus('Thank you for subscribing to our newsletter! Please check your email to confirm your subscription.', 'success');
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('newsletter-submit-btn');
        const originalBtnText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';

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
                showStatus('Thank you for subscribing! You will receive a confirmation email shortly.', 'success');
                form.reset();
            } else {
                throw new Error('Subscription failed');
            }
        } catch (error) {
            showStatus('Sorry, there was an error processing your subscription. Please try again or email us at dfwvedanta@gmail.com', 'error');
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
    document.addEventListener('DOMContentLoaded', initNewsletterForm);
} else {
    initNewsletterForm();
}
