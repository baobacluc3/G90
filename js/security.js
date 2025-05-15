import { apiRequest } from './api.js';

async function loadRoles() {
    const result = await apiRequest('/users/roles');
    if (result.success) {
        const roleList = document.getElementById('roleList');
        roleList.innerHTML = '';
        result.data.forEach(user => {
            roleList.innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>
                        <select class="form-select" onchange="updateRole('${user.id}', this.value)">
                            <option value="user" ${user.role === 'user' ? 'selected' : ''}>Người Dùng</option>
                            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Quản Trị Viên</option>
                        </select>
                    </td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="lockUser('${user.id}')">Khóa</button>
                    </td>
                </tr>
            `;
        });
    }
}

async function updateRole(userId, newRole) {
    const result = await apiRequest(`/users/${userId}/role`, 'PUT', { role: newRole });
    if (result.success) {
        alert('Cập nhật vai trò thành công!');
    }
}

async function lockUser(userId) {
    if (confirm('Bạn có chắc muốn khóa người dùng này?')) {
        const result = await apiRequest(`/users/${userId}/lock`, 'PUT');
        if (result.success) loadRoles();
    }
}

loadRoles();