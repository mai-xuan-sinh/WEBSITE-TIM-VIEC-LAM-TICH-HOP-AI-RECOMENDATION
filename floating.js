// floating.js - Phiên bản ổn định cho tất cả trang (FULLY FIXED)
(function() {
    if (window._floatingLoaded) return;
    window._floatingLoaded = true;

    document.addEventListener("DOMContentLoaded", function() {
        if (document.querySelector(".floating-actions")) return;

        const wrapper = document.createElement("div");
        wrapper.className = "floating-actions";
        wrapper.innerHTML = `
            <a href="yeuthich.html" class="fab fab-heart"><i class="fas fa-heart"></i></a>
            <div class="fab fab-bell" id="notifyBtn"><i class="fas fa-bell"></i><span class="dot" id="notifyDot"></span></div>
            <div class="notify-panel" id="notifyPanel">
                <div class="notify-header">
                    <h3><i class="fas fa-bell"></i> Thông báo</h3>
                    <div style="display: flex; gap: 8px;">
                        <button id="markAllReadBtn" class="mark-read-btn">Đánh dấu đã đọc</button>
                        <button id="refreshNotifBtn" class="mark-read-btn" style="background:#0ea5e9;"><i class="fas fa-sync-alt"></i> Làm mới</button>
                    </div>
                </div>
                <div id="notifyList" class="notify-list"><div class="notify-item empty">📢 Đang tải...</div></div>
            </div>
        `;
        document.body.appendChild(wrapper);

        const notifyBtn = document.getElementById("notifyBtn");
        const notifyPanel = document.getElementById("notifyPanel");
        const notifyDot = document.getElementById("notifyDot");

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

        function escapeHtml(str) {
            if (!str) return '';
            return str.replace(/[&<>]/g, function(m) {
                if (m === '&') return '&amp;';
                if (m === '<') return '&lt;';
                if (m === '>') return '&gt;';
                return m;
            });
        }

        function showToast(message, type) {
            type = type || 'info';
            const toast = document.createElement('div');
            toast.className = 'toast-message ' + type;
            const icon = type === 'success' ? 'fa-check-circle' : (type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle');
            toast.innerHTML = '<i class="fas ' + icon + '"></i><span>' + escapeHtml(message) + '</span>';
            toast.style.cssText = 'position:fixed;bottom:100px;right:30px;background:' + (type === 'success' ? '#10b981' : (type === 'warning' ? '#f59e0b' : '#0ea5e9')) + ';color:white;padding:12px 20px;border-radius:12px;z-index:10001;animation:slideIn 0.3s ease;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
            document.body.appendChild(toast);
            setTimeout(function() {
                toast.style.animation = 'slideOut 0.3s ease';
                setTimeout(function() { if (toast.parentElement) toast.remove(); }, 300);
            }, 5000);
        }

        if (!document.querySelector('#toast-animation')) {
            const style = document.createElement('style');
            style.id = 'toast-animation';
            style.textContent = '@keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } } @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }';
            document.head.appendChild(style);
        }

        function loadNotifications() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const notifyList = document.getElementById('notifyList');
            if (!notifyList) return;

            if (!currentUser || !currentUser.email) {
                notifyList.innerHTML = '<div class="notify-item empty"><i class="fas fa-lock"></i> Đăng nhập để xem thông báo</div>';
                if (notifyDot) notifyDot.style.display = 'none';
                return;
            }

            let allNotifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
            let userNotifs = [];
            
            for (var i = 0; i < allNotifs.length; i++) {
                if (allNotifs[i].userId && allNotifs[i].userId.toLowerCase() === currentUser.email.toLowerCase()) {
                    userNotifs.push(allNotifs[i]);
                }
            }
            
            userNotifs.sort(function(a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            var unreadCount = 0;
            for (var j = 0; j < userNotifs.length; j++) {
                if (!userNotifs[j].read) unreadCount++;
            }

            if (notifyDot) {
                if (unreadCount > 0) {
                    notifyDot.style.display = 'block';
                    notifyDot.setAttribute('data-count', unreadCount);
                } else {
                    notifyDot.style.display = 'none';
                }
            }

            if (userNotifs.length === 0) {
                notifyList.innerHTML = '<div class="notify-item empty"><i class="fas fa-bell-slash"></i> Không có thông báo</div>';
                return;
            }

            var html = '';
            for (var k = 0; k < userNotifs.length; k++) {
                var notif = userNotifs[k];
                var icon = '', color = '';
                switch(notif.type) {
                    case 'approved': icon = '<i class="fas fa-check-circle"></i>'; color = '#10b981'; break;
                    case 'rejected': icon = '<i class="fas fa-times-circle"></i>'; color = '#ef4444'; break;
                    case 'interview': icon = '<i class="fas fa-calendar-alt"></i>'; color = '#8b5cf6'; break;
                    default: icon = '<i class="fas fa-bell"></i>'; color = '#0ea5e9';
                }
                var shortContent = notif.content.length > 100 ? notif.content.substring(0, 100) + '...' : notif.content;
                html += '<div class="notify-item ' + (notif.read ? 'read' : 'unread') + '" data-id="' + notif.id + '" data-index="' + k + '" onclick="window.handleNotifyClick(' + k + ')">' +
                    '<div class="notify-icon" style="color:' + color + ';">' + icon + '</div>' +
                    '<div class="notify-content">' +
                        '<div class="notify-title">' + escapeHtml(notif.title) + '</div>' +
                        '<div class="notify-message">' + escapeHtml(shortContent) + '</div>' +
                        '<div class="notify-time">' + formatTimeAgo(notif.createdAt) + '</div>' +
                    '</div>' +
                    (!notif.read ? '<div class="notify-dot"></div>' : '') +
                '</div>';
            }
            notifyList.innerHTML = html;
        }

        window.handleNotifyClick = function(index) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) return;
            
            let allNotifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
            let userNotifs = [];
            
            for (var i = 0; i < allNotifs.length; i++) {
                if (allNotifs[i].userId && allNotifs[i].userId.toLowerCase() === currentUser.email.toLowerCase()) {
                    userNotifs.push(allNotifs[i]);
                }
            }
            
            var notif = userNotifs[index];
            if (!notif) return;
            
            // Đánh dấu đã đọc
            if (!notif.read) {
                for (var j = 0; j < allNotifs.length; j++) {
                    if (allNotifs[j].id === notif.id) {
                        allNotifs[j].read = true;
                        break;
                    }
                }
                localStorage.setItem('candidate_notifications', JSON.stringify(allNotifs));
            }
            
            // Hiển thị chi tiết thông báo
            if (notif.type === 'interview' && notif.interviewDetails) {
                var d = notif.interviewDetails;
                alert('📅 CHI TIẾT LỊCH PHỎNG VẤN\n\n' +
                    'Vị trí: ' + d.position + '\n' +
                    'Thời gian: ' + d.time + ' - Ngày ' + new Date(d.date).toLocaleDateString('vi-VN') + '\n' +
                    'Hình thức: ' + (d.type === 'online' ? 'Online' : 'Trực tiếp') + '\n' +
                    'Địa điểm: ' + d.location + 
                    (d.note ? '\nGhi chú: ' + d.note : ''));
            } else if (notif.type === 'approved') {
                alert('✅ ' + notif.title + '\n\n' + notif.content + '\n\n💡 Nhà tuyển dụng sẽ liên hệ với bạn để sắp xếp lịch phỏng vấn.');
            } else if (notif.type === 'rejected') {
                alert('❌ ' + notif.title + '\n\n' + notif.content + '\n\n💡 Đừng nản lòng! Hãy tiếp tục ứng tuyển các vị trí khác nhé!');
            } else {
                alert('📢 ' + notif.title + '\n\n' + notif.content);
            }
            
            loadNotifications();
        };

        window.markAllNotificationsRead = function() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) return;
            
            let allNotifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
            var changed = false;
            
            for (var i = 0; i < allNotifs.length; i++) {
                if (allNotifs[i].userId && allNotifs[i].userId.toLowerCase() === currentUser.email.toLowerCase() && !allNotifs[i].read) {
                    allNotifs[i].read = true;
                    changed = true;
                }
            }
            
            if (changed) {
                localStorage.setItem('candidate_notifications', JSON.stringify(allNotifs));
                loadNotifications();
                showToast('Đã đánh dấu tất cả là đã đọc', 'success');
            } else {
                showToast('Không có thông báo chưa đọc', 'info');
            }
        };

        window.refreshNotifications = function() {
            loadNotifications();
            showToast('Đã làm mới thông báo', 'success');
        };

        if (notifyBtn) {
            notifyBtn.onclick = function(e) {
                e.stopPropagation();
                loadNotifications();
                if (notifyPanel.style.display === 'flex') {
                    notifyPanel.style.display = 'none';
                } else {
                    notifyPanel.style.display = 'flex';
                    if (notifyDot) notifyDot.style.display = 'none';
                }
            };
        }

        document.addEventListener('click', function(e) {
            if (notifyBtn && notifyPanel && !notifyBtn.contains(e.target) && !notifyPanel.contains(e.target)) {
                notifyPanel.style.display = 'none';
            }
        });

        const markAllReadBtn = document.getElementById('markAllReadBtn');
        const refreshNotifBtn = document.getElementById('refreshNotifBtn');
        
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                window.markAllNotificationsRead();
            });
        }
        
        if (refreshNotifBtn) {
            refreshNotifBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                window.refreshNotifications();
            });
        }

        // Lắng nghe storage event từ các tab khác
        window.addEventListener('storage', function(e) {
            if (e.key === 'candidate_notifications' || e.key === 'currentUser') {
                console.log('🔄 Phát hiện thay đổi storage, cập nhật thông báo...');
                loadNotifications();
                
                if (e.key === 'candidate_notifications' && e.newValue) {
                    try {
                        const newNotifs = JSON.parse(e.newValue);
                        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                        if (currentUser && newNotifs.length > 0) {
                            const newNotif = newNotifs[0];
                            if (newNotif.userId === currentUser.email && !newNotif.read) {
                                const icon = newNotif.type === 'approved' ? '✅' : (newNotif.type === 'interview' ? '📅' : '📢');
                                showToast(icon + ' ' + newNotif.title, 'info');
                            }
                        }
                    } catch(err) {}
                }
            }
        });

        // Lắng nghe custom event realtime
        window.addEventListener('realtime-notification', function(e) {
            console.log('📢 Nhận thông báo realtime:', e.detail);
            loadNotifications();
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (e.detail && e.detail.userId === currentUser?.email) {
                const icon = e.detail.type === 'approved' ? '✅' : (e.detail.type === 'interview' ? '📅' : '📢');
                showToast(icon + ' ' + e.detail.title, 'info');
            }
        });

        // Polling mỗi 2 giây để đảm bảo đồng bộ
        setInterval(loadNotifications, 2000);
        
        // Khởi tạo lần đầu
        loadNotifications();
        
        console.log('🔔 Floating notifications ready');
    });
})();