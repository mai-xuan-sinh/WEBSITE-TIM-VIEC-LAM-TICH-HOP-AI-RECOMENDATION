document.addEventListener("DOMContentLoaded", function() {
    
    // 1. CHUYỂN ĐỔI TABS MƯỢT MÀ
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Hàm hỗ trợ chuyển tab (tái sử dụng được nhiều lần)
    function switchToTab(targetId) {
        // Xóa trạng thái active của tất cả các tab
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Kích hoạt tab đích
        const targetBtn = document.querySelector(`.tab-btn[data-target="${targetId}"]`);
        const targetPane = document.getElementById(targetId);
        
        if (targetBtn && targetPane) {
            targetBtn.classList.add('active');
            targetPane.classList.add('active');
        }
    }

    // Xử lý sự kiện click thủ công vào các nút tab
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchToTab(btn.getAttribute('data-target'));
        });
    });

    const avatarImg = document.getElementById('avatarImg');
    const inputAvatarUrl = document.getElementById('inputAvatarUrl');

    // 2. CẬP NHẬT ẢNH BẰNG NÚT CAMERA (Nhập URL trực tiếp)
    const btnChangeAvatar = document.getElementById('btnChangeAvatar');
    if(btnChangeAvatar && avatarImg) {
        btnChangeAvatar.addEventListener('click', () => {
            const newUrl = prompt("Vui lòng nhập đường dẫn (URL) hình ảnh mới của bạn:\n(Ví dụ: https://link-anh.jpg)");
            if (newUrl && newUrl.trim() !== "") {
                avatarImg.src = newUrl;
                if(inputAvatarUrl) inputAvatarUrl.value = newUrl; 
                alert("Cập nhật ảnh đại diện thành công!");
            }
        });
    }

    // 3. LƯU THÔNG TIN CÁ NHÂN VÀ TỰ ĐỘNG CHUYỂN VỀ TỔNG QUAN
    const formUpdateInfo = document.getElementById('formUpdateInfo');
    
    if(formUpdateInfo) {
        formUpdateInfo.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const lastName = document.getElementById('inputLastName').value.trim();
            const firstName = document.getElementById('inputFirstName').value.trim();
            const phone = document.getElementById('inputPhone').value.trim();
            const location = document.getElementById('inputLocation').value.trim();
            const job = document.getElementById('inputJob').value.trim();
            const bio = document.getElementById('inputBio').value.trim();
            
            // Nếu có nhập link ảnh mới trong form
            if(inputAvatarUrl && inputAvatarUrl.value.trim() !== "") {
                avatarImg.src = inputAvatarUrl.value.trim();
            }

            // Đồng bộ nội dung sang Cột trái (Sidebar)
            document.querySelector('.profile-name').textContent = `${lastName} ${firstName}`;
            document.querySelector('.profile-role').textContent = job;

            // Đồng bộ nội dung sang Tab Tổng quan
            document.getElementById('display-name').textContent = `${lastName} ${firstName}`;
            document.getElementById('display-job').textContent = job;
            document.getElementById('display-phone').textContent = phone || 'Chưa cập nhật';
            document.getElementById('display-location').textContent = location;
            document.getElementById('display-bio').textContent = bio;

            alert("Đã lưu thông tin thành công!");
            
            // TỰ ĐỘNG CHUYỂN VỀ TAB TỔNG QUAN SAU KHI LƯU XONG
            switchToTab('tab-tong-quan');
        });
    }

    // 4. CẬP NHẬT EMAIL VÀ TỰ ĐỘNG CHUYỂN VỀ TỔNG QUAN (CÓ CHECK TRÙNG)
    const formUpdateEmail = document.getElementById('formUpdateEmail');
    const currentEmail = document.getElementById('currentEmail');
    const newEmailInput = document.getElementById('newEmailInput');

    if(formUpdateEmail) {
        formUpdateEmail.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const newEmail = newEmailInput.value.trim();
            const oldEmail = currentEmail.value.trim();

            if (newEmail !== "") {
                // Kiểm tra điều kiện: Email mới không được trùng Email cũ
                if (newEmail === oldEmail) {
                    alert("Lỗi: Email mới không được trùng với Email hiện tại!");
                    return; // Dừng tiến trình lưu
                }

                currentEmail.value = newEmail;
                
                // Đồng bộ Email sang Tab Tổng Quan
                const displayEmail = document.getElementById('display-email');
                if(displayEmail) {
                    displayEmail.textContent = newEmail;
                }
                
                alert("Cập nhật Email thành công!");
                newEmailInput.value = ""; // Xóa trắng ô nhập liệu sau khi thành công

                // TỰ ĐỘNG CHUYỂN VỀ TAB TỔNG QUAN SAU KHI ĐỔI EMAIL XONG
                switchToTab('tab-tong-quan');
            }
        });
    }

    // 5. ĐĂNG XUẤT HỆ THỐNG
    const btnLogout = document.getElementById('btnLogout');
    if(btnLogout) {
        btnLogout.addEventListener('click', () => {
            const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?");
            if(confirmLogout) {
                window.location.href = "login.html"; 
            }
        });
    }
});
// Ví dụ hàm xử lý khi click cập nhật
function handleUpdate() {
    // Lấy giá trị mới từ form input
    const updatedName = document.getElementById('input-ho-ten').value;

    // Cập nhật lại Text cho các thẻ hiển thị trên giao diện
    document.getElementById('profile-card-name').innerText = updatedName;
    document.getElementById('overview-name').innerText = updatedName;
}
const form = document.getElementById('update-form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn trang tải lại

    const newName = document.getElementById('input-ho-ten').value;
    
    // Lưu vào LocalStorage
    localStorage.setItem('currentUserName', newName);
    
    // Cập nhật DOM
    renderName(newName);
});

// Hàm hiển thị tên được gọi mỗi khi trang load
window.onload = function() {
    const savedName = localStorage.getItem('currentUserName');
    if (savedName) {
        renderName(savedName);
    }
}

function renderName(name) {
    document.getElementById('profile-card-name').innerText = name;
    document.getElementById('overview-name').innerText = name;
}