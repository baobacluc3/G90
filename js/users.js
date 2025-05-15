import { apiRequest } from './api.js';

// ===== CODE CŨ CỦA BẠN =====
async function loadUsers() {
    const result = await apiRequest('/users');
    if (result.success) {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        result.data.forEach(user => {
            userList.innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.status}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editUser('${user.id}')">Sửa</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.id}')">Xóa</button>
                    </td>
                </tr>
            `;
        });
    }
}

function createDefaultAdmins() {
    const defaultAdmins = [
        {
            email: 'admin@gmail.com',
            password: 'admin123',
            role: 'admin'
        }
    ];

    let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    defaultAdmins.forEach(admin => {
        const exists = users.some(user => user.email === admin.email);
        if (!exists) {
            users.push(admin);
            console.log(`✔️ Admin '${admin.email}' đã được thêm.`);
        }
    });

    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

// Gọi khi file `users.js` load
createDefaultAdmins();

function handleLogin(email, password) {
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        if (user.role === 'admin') {
            window.location.href = '../admin/project.html';
        } else {
            window.location.href = '../home.html';
        }
    } else {
        alert('Sai tài khoản hoặc mật khẩu!');
    }
}

// ===== CODE MỚI THÊM VÀO =====
// Hàm kiểm tra người dùng đã đăng nhập
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('loggedInUser')) || null;
}

// Hàm đăng nhập với server
async function loginUser(email, password) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        
        if (result.success) {
            // Lưu thông tin user vào localStorage
            const userInfo = {
                ...result.user,
                role: result.user.ID_ChucVu === 1 ? 'admin' : 'user'
            };
            localStorage.setItem('loggedInUser', JSON.stringify(userInfo));
            return userInfo;
        }
        return null;
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        return null;
    }
}

// Hàm đăng xuất
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/pages/auth/login.html';
}

// Hàm kiểm tra quyền admin
function checkAdminAccess() {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
        alert('Bạn không có quyền truy cập trang này!');
        window.location.href = '/pages/auth/login.html';
        return false;
    }
    return true;
}

// Export functions for use in other files
window.getCurrentUser = getCurrentUser;
window.loginUser = loginUser;
window.logout = logout;
window.checkAdminAccess = checkAdminAccess;

// Load users if on admin page
if (document.getElementById('userList')) {
    loadUsers();
}