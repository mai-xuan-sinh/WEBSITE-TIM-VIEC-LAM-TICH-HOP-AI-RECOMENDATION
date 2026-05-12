// notification.js - Hệ thống thông báo thống nhất cho toàn bộ trang
(function() {
    if (window._notificationSystemLoaded) return;
    window._notificationSystemLoaded = true;

    // ==================== HÀM GỬI THÔNG BÁO ====================
    window.sendNotification = function(candidateEmail, title, content, type, interviewDetails) {
        if (!candidateEmail) {
            console.error('❌ Không có email ứng viên!');
            return false;
        }
        
        console.log('📤 Gửi thông báo đến:', candidateEmail, title);
        
        const newNotif = {
            id: Date.now(),
            userId: candidateEmail,
            title: title,
            content: content,
            type: type,
            read: false,
            createdAt: new Date().toISOString()
        };
        
        if (interviewDetails) newNotif.interviewDetails = interviewDetails;
        
        let notifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
        notifs.unshift(newNotif);
        if (notifs.length > 50) notifs.pop();
        localStorage.setItem('candidate_notifications', JSON.stringify(notifs));
        
        // BroadcastChannel
        try {
            const channel = new BroadcastChannel('danangwork_notify');
            channel.postMessage({ type: 'NEW_NOTIFICATION', data: newNotif });
            setTimeout(() => channel.close(), 100);
        } catch(e) {}
        
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'candidate_notifications',
            newValue: JSON.stringify(notifs)
        }));
        
        window.dispatchEvent(new CustomEvent('realtime-notification', { detail: newNotif }));
        
        console.log('✅ Đã gửi thông báo thành công');
        return true;
    };

    // ==================== HÀM LOAD THÔNG BÁO ====================
    window.loadNotifications = function() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const notifyList = document.getElementById('notifyList');
        const notifyDot = document.getElementById('notifyDot');
        
        if (!notifyList) return;
        
        if (!currentUser || !currentUser.email) {
            notifyList.innerHTML = '<div class="notify-item empty">🔒 Đăng nhập để xem thông báo</div>';
            if (notifyDot) notifyDot.style.display = 'none';
            return;
        }
        
        let allNotifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
        let userNotifs = allNotifs.filter(n => n.userId && n.userId.toLowerCase() === currentUser.email.toLowerCase());
        userNotifs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        let unreadCount = userNotifs.filter(n => !n.read).length;
        
        if (notifyDot) {
            notifyDot.style.display = unreadCount > 0 ? 'block' : 'none';
            if (unreadCount > 0) notifyDot.setAttribute('data-count', unreadCount);
        }
        
        if (userNotifs.length === 0) {
            notifyList.innerHTML = '<div class="notify-item empty">📭 Không có thông báo</div>';
            return;
        }
        
        notifyList.innerHTML = userNotifs.map((notif, idx) => {
            let icon = '';
            let color = '';
            switch(notif.type) {
                case 'approved': icon = '✅'; color = '#10b981'; break;
                case 'rejected': icon = '❌'; color = '#ef4444'; break;
                case 'interview': icon = '📅'; color = '#8b5cf6'; break;
                default: icon = '📢'; color = '#0ea5e9';
            }
            return `
                <div class="notify-item ${notif.read ? 'read' : 'unread'}" data-idx="${idx}" onclick="window.viewNotification(${idx})">
                    <div class="notify-icon" style="color:${color}">${icon}</div>
                    <div class="notify-content">
                        <div class="notify-title">${escapeHtml(notif.title)}</div>
                        <div class="notify-message">${escapeHtml(notif.content.substring(0, 80))}${notif.content.length > 80 ? '...' : ''}</div>
                        <div class="notify-time">${formatTimeAgo(notif.createdAt)}</div>
                    </div>
                    ${!notif.read ? '<div class="notify-dot"></div>' : ''}
                </div>
            `;
        }).join('');
    };
    
    // Helper functions
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));
    }
    
    function formatTimeAgo(isoDate) {
        if (!isoDate) return 'Vừa xong';
        try {
            const date = new Date(isoDate);
            const now = new Date();
            const diffMins = Math.floor((now - date) / 60000);
            if (diffMins < 1) return 'Vừa xong';
            if (diffMins < 60) return diffMins + ' phút trước';
            if (diffMins < 1440) return Math.floor(diffMins / 60) + ' giờ trước';
            return date.toLocaleDateString('vi-VN');
        } catch(e) { return 'Vừa xong'; }
    }
    
    // ==================== XEM CHI TIẾT THÔNG BÁO ====================
    window.viewNotification = function(index) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('Vui lòng đăng nhập!');
            window.location.href = 'login.html';
            return;
        }
        
        let allNotifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
        let userNotifs = allNotifs.filter(n => n.userId && n.userId.toLowerCase() === currentUser.email.toLowerCase());
        let notif = userNotifs[index];
        
        if (!notif) return;
        
        // Đánh dấu đã đọc
        for (let i = 0; i < allNotifs.length; i++) {
            if (allNotifs[i].id === notif.id) {
                allNotifs[i].read = true;
                break;
            }
        }
        localStorage.setItem('candidate_notifications', JSON.stringify(allNotifs));
        
        // Hiển thị chi tiết
        if (notif.type === 'interview' && notif.interviewDetails) {
            let d = notif.interviewDetails;
            alert(`📅 CHI TIẾT LỊCH PHỎNG VẤN\n\nVị trí: ${d.position}\nThời gian: ${d.time}\nNgày: ${new Date(d.date).toLocaleDateString('vi-VN')}\nHình thức: ${d.type === 'online' ? 'Online' : 'Trực tiếp'}\nĐịa điểm: ${d.location}\n${d.note ? 'Ghi chú: ' + d.note : ''}`);
        } else if (notif.type === 'approved') {
            alert(`✅ ${notif.title}\n\n${notif.content}\n\n💡 Nhà tuyển dụng sẽ liên hệ với bạn để sắp xếp lịch phỏng vấn.`);
        } else if (notif.type === 'rejected') {
            alert(`❌ ${notif.title}\n\n${notif.content}\n\n💡 Đừng nản lòng! Hãy tiếp tục ứng tuyển các vị trí khác nhé!`);
        } else {
            alert(`📢 ${notif.title}\n\n${notif.content}`);
        }
        
        // Reload lại danh sách
        window.loadNotifications();
    };
    
    // ==================== ĐÁNH DẤU TẤT CẢ ĐÃ ĐỌC ====================
    window.markAllNotificationsRead = function() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;
        
        let allNotifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
        let changed = false;
        
        for (let i = 0; i < allNotifs.length; i++) {
            if (allNotifs[i].userId && allNotifs[i].userId.toLowerCase() === currentUser.email.toLowerCase() && !allNotifs[i].read) {
                allNotifs[i].read = true;
                changed = true;
            }
        }
        
        if (changed) {
            localStorage.setItem('candidate_notifications', JSON.stringify(allNotifs));
            window.loadNotifications();
            showToast('Đã đánh dấu tất cả là đã đọc', 'success');
        } else {
            showToast('Không có thông báo chưa đọc', 'info');
        }
    };
    
    // ==================== LÀM MỚI THÔNG BÁO ====================
    window.refreshNotifications = function() {
        window.loadNotifications();
        showToast('Đã làm mới thông báo', 'success');
    };
    
    // ==================== TOAST MESSAGE ====================
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = 'toast-message ' + type;
        toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i><span>${escapeHtml(message)}</span>`;
        toast.style.cssText = 'position:fixed;bottom:100px;right:30px;background:' + (type === 'success' ? '#10b981' : '#0ea5e9') + ';color:white;padding:12px 20px;border-radius:12px;z-index:10001;animation:slideIn 0.3s ease;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => { if (toast.parentElement) toast.remove(); }, 300);
        }, 3000);
    }
    
    // ==================== HÀM ĐIỀU HƯỚNG PROFILE ====================
    window.goToProfile = function() {
        window.location.href = 'profile.html';
    };
    
    // ==================== HÀM ĐĂNG XUẤT ====================
    window.handleLogout = function() {
        if (confirm('Bạn có chắc muốn đăng xuất?')) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            localStorage.removeItem('rememberUser');
            window.location.href = 'index.html';
        }
    };
    
    // ==================== UPDATE AUTH UI ====================
    window.updateAuthUI = function() {
        const authDiv = document.getElementById('authButtons');
        const userDiv = document.getElementById('userBox');
        if (!authDiv || !userDiv) return;
        
        const user = JSON.parse(localStorage.getItem('currentUser'));
        
        if (user && user.email) {
            const displayName = user.name || user.fullname || user.username || user.email.split('@')[0];
            authDiv.style.display = 'none';
            userDiv.style.display = 'block';
            userDiv.innerHTML = `
                <div class="user-info" style="display: flex; align-items: center; gap: 10px;">
                    <div class="user-avatar" onclick="goToProfile()" style="cursor: pointer;">
                        ${displayName.charAt(0).toUpperCase()}
                    </div>
                    <span class="user-name" onclick="goToProfile()" style="cursor: pointer; font-weight: 600;">
                        ${displayName}
                    </span>
                    <button class="logout-btn" onclick="handleLogout()">Đăng xuất</button>
                </div>
            `;
        } else {
            authDiv.style.display = 'flex';
            userDiv.style.display = 'none';
            userDiv.innerHTML = '';
        }
    };
    
    // ==================== KHỞI TẠO ====================
    document.addEventListener('DOMContentLoaded', function() {
        window.updateAuthUI();
        window.loadNotifications();
        
        // Lắng nghe storage event
        window.addEventListener('storage', function(e) {
            if (e.key === 'candidate_notifications') {
                window.loadNotifications();
            }
            if (e.key === 'currentUser' || e.key === 'isLoggedIn') {
                window.updateAuthUI();
                window.loadNotifications();
            }
        });
    });
    
    // CSS cho toast animation nếu chưa có
    if (!document.querySelector('#toast-animation')) {
        const style = document.createElement('style');
        style.id = 'toast-animation';
        style.textContent = `
            @keyframes slideOut { 
                from { transform: translateX(0); opacity: 1; } 
                to { transform: translateX(100%); opacity: 0; } 
            }
            @keyframes slideIn { 
                from { transform: translateX(100%); opacity: 0; } 
                to { transform: translateX(0); opacity: 1; } 
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('🔔 Notification system loaded');
})();