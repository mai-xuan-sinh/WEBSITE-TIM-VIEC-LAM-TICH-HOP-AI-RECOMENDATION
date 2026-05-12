// floating.js - Phiên bản sửa lỗi realtime notification
(function() {
    'use strict';
    
    // Chỉ khởi tạo một lần
    if (window._floatingInitialized) return;
    window._floatingInitialized = true;

    document.addEventListener("DOMContentLoaded", function() {
        if (document.querySelector(".floating-actions")) return;

        const wrapper = document.createElement("div");
        wrapper.className = "floating-actions";

        wrapper.innerHTML = `
            <a href="yeuthich.html" class="fab fab-heart">
                <i class="fas fa-heart"></i>
            </a>
            <div class="fab fab-bell" id="notifyBtn">
                <i class="fas fa-bell"></i>
                <span class="dot" id="notifyDot"></span>
            </div>
            <div class="notify-panel" id="notifyPanel">
                <div class="notify-header">
                    <h3><i class="fas fa-bell"></i> Thông báo</h3>
                    <button id="markAllReadBtn" class="mark-read-btn">Đánh dấu đã đọc</button>
                    <button id="refreshNotifBtn" class="mark-read-btn" style="margin-left: 8px; background: #0ea5e9;">
                        <i class="fas fa-sync-alt"></i> Làm mới
                    </button>
                </div>
                <div id="notifyList" class="notify-list">
                    <div class="notify-item empty">📢 Đang tải thông báo...</div>
                </div>
            </div>
        `;

        document.body.appendChild(wrapper);

        const notifyBtn = document.getElementById("notifyBtn");
        const notifyPanel = document.getElementById("notifyPanel");
        let notifyDot = document.getElementById("notifyDot");

        // Format thời gian tương đối
        function formatTimeAgo(isoDate) {
            if (!isoDate) return 'Vừa xong';
            const date = new Date(isoDate);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);
            
            if (diffMins < 1) return 'Vừa xong';
            if (diffMins < 60) return diffMins + ' phút trước';
            if (diffHours < 24) return diffHours + ' giờ trước';
            if (diffDays < 7) return diffDays + ' ngày trước';
            return date.toLocaleDateString('vi-VN');
        }

        // Hiển thị toast thông báo nổi
        function showToast(message, type) {
            type = type || 'info';
            const toast = document.createElement('div');
            toast.className = 'toast-message ' + type;
            toast.innerHTML = '<i class="fas ' + (type === 'info' ? 'fa-info-circle' : (type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle')) + '"></i><span>' + message + '</span>';
            toast.style.cssText = 'position: fixed; bottom: 100px; right: 30px; background: ' + (type === 'success' ? '#10b981' : (type === 'warning' ? '#f59e0b' : '#0ea5e9')) + '; color: white; padding: 12px 20px; border-radius: 12px; z-index: 10001; animation: slideIn 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.15);';
            document.body.appendChild(toast);
            setTimeout(function() {
                toast.style.animation = 'slideOut 0.3s ease';
                setTimeout(function() { if (toast.parentElement) toast.remove(); }, 300);
            }, 4000);
        }

        // Thêm animation cho toast
        if (!document.querySelector('#toast-style')) {
            const style = document.createElement('style');
            style.id = 'toast-style';
            style.textContent = '@keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }';
            document.head.appendChild(style);
        }

        // Escape HTML
        function escapeHtml(str) {
            if (!str) return '';
            return str.replace(/[&<>]/g, function(m) {
                if (m === '&') return '&amp;';
                if (m === '<') return '&lt;';
                if (m === '>') return '&gt;';
                return m;
            });
        }

        // Tải thông báo từ localStorage
        function loadNotifications() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const notifyList = document.getElementById('notifyList');
            
            if (!notifyList) return;
            
            if (!currentUser || !currentUser.email) {
                notifyList.innerHTML = '<div class="notify-item empty"><i class="fas fa-lock"></i> Đăng nhập để xem thông báo</div>';
                if (notifyDot) notifyDot.style.display = 'none';
                return;
            }

            let candidateNotifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
            let userNotifs = candidateNotifs.filter(function(n) {
                return n.userId === currentUser.email;
            });
            
            // Sắp xếp mới nhất lên đầu
            userNotifs.sort(function(a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            
            // Đếm số chưa đọc
            var unreadCount = 0;
            for (var i = 0; i < userNotifs.length; i++) {
                if (!userNotifs[i].read) unreadCount++;
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
                notifyList.innerHTML = '<div class="notify-item empty"><i class="fas fa-bell-slash"></i> Không có thông báo mới</div>';
                return;
            }
            
            var html = '';
            for (var idx = 0; idx < userNotifs.length; idx++) {
                var notif = userNotifs[idx];
                var iconHtml = '';
                var iconColor = '';
                switch(notif.type) {
                    case 'approved': 
                        iconHtml = '<i class="fas fa-check-circle"></i>';
                        iconColor = '#10b981';
                        break;
                    case 'rejected': 
                        iconHtml = '<i class="fas fa-times-circle"></i>';
                        iconColor = '#ef4444';
                        break;
                    case 'interview': 
                        iconHtml = '<i class="fas fa-calendar-alt"></i>';
                        iconColor = '#8b5cf6';
                        break;
                    default: 
                        iconHtml = '<i class="fas fa-info-circle"></i>';
                        iconColor = '#0ea5e9';
                }
                
                var timeAgo = formatTimeAgo(notif.createdAt);
                
                html += '<div class="notify-item ' + (notif.read ? 'read' : 'unread') + '" data-notif-id="' + notif.id + '" data-notif-index="' + idx + '" onclick="handleNotifyClick(' + idx + ')">' +
                    '<div class="notify-icon" style="color: ' + iconColor + ';">' + iconHtml + '</div>' +
                    '<div class="notify-content">' +
                        '<div class="notify-title">' + escapeHtml(notif.title) + '</div>' +
                        '<div class="notify-message">' + escapeHtml(notif.content) + '</div>' +
                        '<div class="notify-time">' + timeAgo + '</div>' +
                    '</div>' +
                    (!notif.read ? '<div class="notify-dot"></div>' : '') +
                '</div>';
            }
            notifyList.innerHTML = html;
        }

        // Xử lý click vào thông báo
        window.handleNotifyClick = function(index) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) return;
            
            let candidateNotifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
            let userNotifs = candidateNotifs.filter(function(n) {
                return n.userId === currentUser.email;
            });
            var notif = userNotifs[index];
            
            if (notif) {
                // Đánh dấu đã đọc
                if (!notif.read) {
                    for (var i = 0; i < candidateNotifs.length; i++) {
                        if (candidateNotifs[i].id === notif.id) {
                            candidateNotifs[i].read = true;
                            break;
                        }
                    }
                    localStorage.setItem('candidate_notifications', JSON.stringify(candidateNotifs));
                }
                
                // Hiển thị chi tiết
                if (notif.type === 'interview' && notif.interviewDetails) {
                    var details = notif.interviewDetails;
                    var formattedDate = new Date(details.date).toLocaleDateString('vi-VN');
                    alert('📅 CHI TIẾT LỊCH PHỎNG VẤN\n\n' +
                          'Vị trí: ' + details.position + '\n' +
                          'Thời gian: ' + details.time + ' - Ngày ' + formattedDate + '\n' +
                          'Hình thức: ' + (details.type === 'online' ? 'Online' : 'Trực tiếp') + '\n' +
                          'Địa điểm: ' + details.location + '\n' +
                          (details.note ? 'Ghi chú: ' + details.note + '\n' : '') +
                          '💡 Vui lòng đến đúng giờ và chuẩn bị đầy đủ hồ sơ!');
                } else if (notif.type === 'approved') {
                    alert('✅ ' + notif.title + '\n\n' + notif.content + '\n\n💡 Nhà tuyển dụng sẽ liên hệ với bạn để sắp xếp lịch phỏng vấn.');
                } else if (notif.type === 'rejected') {
                    alert('❌ ' + notif.title + '\n\n' + notif.content + '\n\n💡 Đừng nản lòng! Hãy tiếp tục ứng tuyển các vị trí khác nhé!');
                } else {
                    alert('📢 ' + notif.title + '\n\n' + notif.content);
                }
                
                loadNotifications();
            }
        };

        // Đánh dấu tất cả đã đọc
        window.markAllNotificationsRead = function() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) return;
            
            let candidateNotifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
            var hasChanges = false;
            
            for (var i = 0; i < candidateNotifs.length; i++) {
                if (candidateNotifs[i].userId === currentUser.email && !candidateNotifs[i].read) {
                    candidateNotifs[i].read = true;
                    hasChanges = true;
                }
            }
            
            if (hasChanges) {
                localStorage.setItem('candidate_notifications', JSON.stringify(candidateNotifs));
                loadNotifications();
                showToast('Đã đánh dấu tất cả thông báo là đã đọc!', 'success');
            }
        };

        // Làm mới thủ công
        window.refreshNotifications = function() {
            loadNotifications();
            showToast('Đã làm mới thông báo!', 'info');
        };

        // Xử lý click vào nút chuông
        if (notifyBtn) {
            notifyBtn.addEventListener("click", function(e) {
                e.stopPropagation();
                loadNotifications();
                
                if (notifyPanel.style.display === "flex") {
                    notifyPanel.style.display = "none";
                } else {
                    notifyPanel.style.display = "flex";
                    if (notifyDot) notifyDot.style.display = "none";
                }
            });
        }

        // Đóng panel khi click ra ngoài
        document.addEventListener("click", function(e) {
            if (notifyBtn && notifyPanel && !notifyBtn.contains(e.target) && !notifyPanel.contains(e.target)) {
                notifyPanel.style.display = "none";
            }
        });

        // Nút đánh dấu đã đọc
        var markAllReadBtn = document.getElementById("markAllReadBtn");
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener("click", function(e) {
                e.stopPropagation();
                window.markAllNotificationsRead();
            });
        }

        // Nút làm mới
        var refreshNotifBtn = document.getElementById("refreshNotifBtn");
        if (refreshNotifBtn) {
            refreshNotifBtn.addEventListener("click", function(e) {
                e.stopPropagation();
                window.refreshNotifications();
            });
        }

        // Lưu hash thông báo cũ
        var lastNotifsHash = '';
        var lastUnreadCount = 0;

        // Kiểm tra thông báo mới
        function checkForNewNotifications() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser || !currentUser.email) return;
            
            var candidateNotifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
            var userNotifs = [];
            for (var i = 0; i < candidateNotifs.length; i++) {
                if (candidateNotifs[i].userId === currentUser.email) {
                    userNotifs.push(candidateNotifs[i]);
                }
            }
            
            // Tạo hash đơn giản
            var currentHash = '';
            for (var j = 0; j < userNotifs.length; j++) {
                currentHash += userNotifs[j].id + ':' + (userNotifs[j].read ? '1' : '0') + ',';
            }
            
            // Đếm unread
            var currentUnread = 0;
            for (var k = 0; k < userNotifs.length; k++) {
                if (!userNotifs[k].read) currentUnread++;
            }
            
            // Nếu có thông báo mới (hash khác)
            if (currentHash !== lastNotifsHash && lastNotifsHash !== '') {
                // Tìm thông báo mới
                for (var m = 0; m < userNotifs.length; m++) {
                    var exists = false;
                    if (lastNotifsHash.indexOf(userNotifs[m].id + ':') !== -1) {
                        exists = true;
                    }
                    if (!exists && userNotifs[m].type) {
                        var message = '';
                        if (userNotifs[m].type === 'approved') message = '✅ Hồ sơ của bạn đã được duyệt!';
                        else if (userNotifs[m].type === 'interview') message = '📅 Bạn có lịch phỏng vấn mới!';
                        else if (userNotifs[m].type === 'rejected') message = '❌ Hồ sơ chưa được duyệt';
                        else message = '📢 ' + userNotifs[m].title;
                        
                        showToast(message, 'info');
                        break;
                    }
                }
            }
            
            lastNotifsHash = currentHash;
            
            // Cập nhật dot
            if (notifyDot) {
                if (currentUnread > 0) {
                    notifyDot.style.display = 'block';
                    notifyDot.setAttribute('data-count', currentUnread);
                } else {
                    notifyDot.style.display = 'none';
                }
            }
        }

        // Lắng nghe storage event (từ tab khác)
        window.addEventListener("storage", function(e) {
            if (e.key === 'candidate_notifications' || e.key === 'currentUser') {
                console.log('🔄 Phát hiện thay đổi thông báo từ tab khác');
                loadNotifications();
                checkForNewNotifications();
            }
        });
        
        // Polling mỗi 3 giây
        setInterval(function() {
            loadNotifications();
            checkForNewNotifications();
        }, 3000);
        
        // Custom event
        window.dispatchCustomNotificationEvent = function(notification) {
            var event = new CustomEvent('newNotification', { detail: notification });
            window.dispatchEvent(event);
        };
        
        window.addEventListener('newNotification', function(e) {
            console.log('📢 Nhận thông báo mới:', e.detail);
            loadNotifications();
            if (e.detail && e.detail.title) {
                showToast('📢 ' + e.detail.title, 'info');
            }
        });
        
        // Tải lần đầu
        loadNotifications();
    });
})();