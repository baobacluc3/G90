// Tải modal HTML
fetch('../../components/modal.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('modalContainer').innerHTML = data;
    });

function openModal(title, content, onConfirm) {
    const modal = new bootstrap.Modal(document.getElementById('commonModal'));
    document.getElementById('commonModalLabel').innerText = title;
    document.querySelector('.modal-body').innerText = content;

    const confirmBtn = document.getElementById('modalConfirmBtn');
    confirmBtn.onclick = function () {
        onConfirm();
        modal.hide();
    };

    modal.show();
}

document.addEventListener('DOMContentLoaded', function () {
    // Xử lý hiển thị/ẩn mật khẩu
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
            const passwordInput = this.previousElementSibling;
            const icon = this.querySelector('i');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
// Xử lý form đăng ký
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!fullName || !email || !password || !confirmPassword) {
        openModal('Lỗi', 'Vui lòng nhập đầy đủ thông tin!', function () {});
        return;
    }

    if (password !== confirmPassword) {
        openModal('Lỗi', 'Mật khẩu xác nhận không khớp!', function () {});
        return;
    }
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Kiểm tra email đã tồn tại chưa
    if (users.some(user => user.email === email)) {
        openModal('Lỗi', 'Email này đã được sử dụng!', function () {});
        return;
    }
    openModal('Xác Nhận Đăng Ký', `Bạn có muốn đăng ký tài khoản với email ${email} không?`, function () {
        // Thêm người dùng mới
        users.push({ fullName, email, password });
        localStorage.setItem('registeredUsers', JSON.stringify(users));

        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        window.location.href = 'login.html';
    });
    
});
});
