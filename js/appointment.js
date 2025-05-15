import { apiRequest } from './api.js';

async function loadAppointments() {
    const result = await apiRequest('/appointments');
    if (result.success) {
        const appointmentList = document.getElementById('appointmentList');
        appointmentList.innerHTML = '';
        result.data.forEach(appointment => {
            appointmentList.innerHTML += `
                <tr>
                    <td>${appointment.petName}</td>
                    <td>${appointment.service}</td>
                    <td>${appointment.date}</td>
                    <td>${appointment.time}</td>
                    <td>
                        <select class="form-select" onchange="updateStatus('${appointment.id}', this.value)">
                            <option value="Chờ xác nhận" ${appointment.status === 'Chờ xác nhận' ? 'selected' : ''}>Chờ xác nhận</option>
                            <option value="Đã xác nhận" ${appointment.status === 'Đã xác nhận' ? 'selected' : ''}>Đã xác nhận</option>
                            <option value="Hoàn thành" ${appointment.status === 'Hoàn thành' ? 'selected' : ''}>Hoàn thành</option>
                        </select>
                    </td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteAppointment('${appointment.id}')">Xóa</button>
                    </td>
                </tr>
            `;
        });
    }
}

async function updateStatus(appointmentId, newStatus) {
    const result = await apiRequest(`/appointments/${appointmentId}/status`, 'PUT', { status: newStatus });
    if (result.success) {
        alert('Cập nhật trạng thái thành công!');
    }
}

async function deleteAppointment(id) {
    if (confirm('Bạn có chắc muốn xóa lịch hẹn này?')) {
        const result = await apiRequest(`/appointments/${id}`, 'DELETE');
        if (result.success) loadAppointments();
    }
}

loadAppointments();