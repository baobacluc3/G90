import { apiRequest, showMessage } from './utils.js';

async function loadPets() {
    const result = await apiRequest('/pets');
    if (result.success) {
        const petSelect = document.getElementById('petSelect');
        result.data.forEach(pet => {
            const option = document.createElement('option');
            option.value = pet.id;
            option.textContent = pet.name;
            petSelect.appendChild(option);
        });
    }
}

async function loadServices() {
    const result = await apiRequest('/services');
    if (result.success) {
        const serviceSelect = document.getElementById('serviceSelect');
        result.data.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = service.name;
            serviceSelect.appendChild(option);
        });
    }
}

document.getElementById('bookingForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const petId = document.getElementById('petSelect').value;
    const serviceId = document.getElementById('serviceSelect').value;
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;

    const result = await apiRequest('/bookings', 'POST', { petId, serviceId, date, time });
    if (result.success) {
        showMessage('message', 'Đặt lịch thành công!', true);
        document.getElementById('bookingForm').reset();
    } else {
        showMessage('message', result.message || 'Đặt lịch thất bại');
    }
});

loadPets();
loadServices();