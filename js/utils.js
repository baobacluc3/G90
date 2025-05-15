function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(elementId, message, isSuccess = false) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = `text-${isSuccess ? 'success' : 'danger'} mt-3 text-center`;
    element.style.display = 'block';
}

export { validateEmail, showMessage };