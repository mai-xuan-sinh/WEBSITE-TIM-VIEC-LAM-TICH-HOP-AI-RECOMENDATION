document.addEventListener("DOMContentLoaded", function() {

    // ================= 1. XỬ LÝ LOGIC PROFILE & ĐĂNG XUẤT =================
    const btnLogout = document.getElementById('btnLogout');
    const userBox = document.getElementById('userBox');
    const authButtons = document.getElementById('authButtons');
    const profileClick = document.getElementById('profileClick');

    // Chuyển hướng thực tế sang trang Profile
    if(profileClick) {
        profileClick.addEventListener('click', () => {
            window.location.href = "profile.html";
        });
    }

    // Click vào Đăng xuất
    if(btnLogout) {
        btnLogout.addEventListener('click', () => {
            userBox.style.opacity = '0';
            setTimeout(() => {
                userBox.style.display = 'none';
                authButtons.style.display = 'flex';
                authButtons.style.opacity = '1';
            }, 300);
        });
    }

    // ================= 2. XỬ LÝ MENU SIDEBAR BÊN TRÁI =================
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    const contentSections = document.querySelectorAll('.content-section');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Bước 1: Xóa class active của tất cả menu item
            menuItems.forEach(li => li.classList.remove('active'));
            // Bước 2: Thêm class active cho item vừa click
            item.classList.add('active');
            
            // Bước 3: Lấy ID của section cần hiển thị
            const targetId = item.getAttribute('data-target');
            
            // Bước 4: Ẩn tất cả section và hiển thị section tương ứng
            contentSections.forEach(sec => {
                sec.classList.remove('active');
                if (sec.id === targetId) {
                    sec.classList.add('active');
                }
            });
        });
    });

    // ================= 3. XỬ LÝ ACCORDION CÂU HỎI THƯỜNG GẶP =================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Kiểm tra xem item hiện tại có đang mở không
            const isActive = item.classList.contains('active');

            // Đóng tất cả các FAQ khác lại (nếu muốn mở nhiều tab cùng lúc thì bỏ đoạn này)
            faqItems.forEach(faq => faq.classList.remove('active'));

            // Nếu nó chưa mở thì thêm class active để mở ra
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

});