// floating.js - Phiên bản ổn định
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
                    <button id="markAllReadBtn" class="mark-read-btn">Đánh dấu đã đọc</button>
                    <button id="refreshNotifBtn" class="mark-read-btn" style="margin-left:8px;background:#0ea5e9;"><i class="fas fa-sync-alt"></i> Làm mới</button>
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
            const date = new Date(isoDate);
            const now = new Date();
            const diffMins = Math.floor((now - date) / 60000);
            if (diffMins < 1) return 'Vừa xong';
            if (diffMins < 60) return diffMins + ' phút trước';
            if (diffMins < 1440) return Math.floor(diffMins / 60) + ' giờ trước';
            return date.toLocaleDateString('vi-VN');
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
            toast.innerHTML = '<i class="fas ' + (type === 'success' ? 'fa-check-circle' : (type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle')) + '"></i><span>' + message + '</span>';
            toast.style.cssText = 'position:fixed;bottom:100px;right:30px;background:' + (type === 'success' ? '#10b981' : (type === 'warning' ? '#f59e0b' : '#0ea5e9')) + ';color:white;padding:12px 20px;border-radius:12px;z-index:10001;animation:slideIn 0.3s ease;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
            document.body.appendChild(toast);
            setTimeout(function() {
                toast.style.animation = 'slideOut 0.3s ease';
                setTimeout(function() { if (toast.parentElement) toast.remove(); }, 300);
            }, 4000);
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
                if (allNotifs[i].userId === currentUser.email) {
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
                notifyDot.style.display = unreadCount > 0 ? 'block' : 'none';
                if (unreadCount > 0) notifyDot.setAttribute('data-count', unreadCount);
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
                html += '<div class="notify-item ' + (notif.read ? 'read' : 'unread') + '" data-id="' + notif.id + '" data-index="' + k + '" onclick="window.handleNotifyClick(' + k + ')">' +
                    '<div class="notify-icon" style="color:' + color + ';">' + icon + '</div>' +
                    '<div class="notify-content">' +
                        '<div class="notify-title">' + escapeHtml(notif.title) + '</div>' +
                        '<div class="notify-message">' + escapeHtml(notif.content.substring(0, 100)) + (notif.content.length > 100 ? '...' : '') + '</div>' +
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
                if (allNotifs[i].userId === currentUser.email) userNotifs.push(allNotifs[i]);
            }
            var notif = userNotifs[index];
            if (notif) {
                if (!notif.read) {
                    for (var j = 0; j < allNotifs.length; j++) {
                        if (allNotifs[j].id === notif.id) {
                            allNotifs[j].read = true;
                            break;
                        }
                    }
                    localStorage.setItem('candidate_notifications', JSON.stringify(allNotifs));
                }
                if (notif.type === 'interview' && notif.interviewDetails) {
                    var d = notif.interviewDetails;
                    alert('📅 LỊCH PHỎNG VẤN\n\nVị trí: ' + d.position + '\nThời gian: ' + d.time + ' - Ngày ' + new Date(d.date).toLocaleDateString('vi-VN') + '\nHình thức: ' + (d.type === 'online' ? 'Online' : 'Trực tiếp') + '\nĐịa điểm: ' + d.location + '\n' + (d.note ? 'Ghi chú: ' + d.note : ''));
                } else if (notif.type === 'approved') {
                    alert('✅ ' + notif.title + '\n\n' + notif.content);
                } else {
                    alert('📢 ' + notif.title + '\n\n' + notif.content);
                }
                loadNotifications();
            }
        };

        window.markAllNotificationsRead = function() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) return;
            let allNotifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
            var changed = false;
            for (var i = 0; i < allNotifs.length; i++) {
                if (allNotifs[i].userId === currentUser.email && !allNotifs[i].read) {
                    allNotifs[i].read = true;
                    changed = true;
                }
            }
            if (changed) {
                localStorage.setItem('candidate_notifications', JSON.stringify(allNotifs));
                loadNotifications();
                showToast('Đã đánh dấu tất cả là đã đọc', 'success');
            }
        };

        window.refreshNotifications = function() {
            loadNotifications();
            showToast('Đã làm mới thông báo', 'info');
        };

        if (notifyBtn) {
            notifyBtn.onclick = function(e) {
                e.stopPropagation();
                loadNotifications();
                notifyPanel.style.display = notifyPanel.style.display === 'flex' ? 'none' : 'flex';
                if (notifyDot) notifyDot.style.display = 'none';
            };
        }

        document.addEventListener('click', function(e) {
            if (notifyBtn && notifyPanel && !notifyBtn.contains(e.target) && !notifyPanel.contains(e.target)) {
                notifyPanel.style.display = 'none';
            }
        });

        document.getElementById('markAllReadBtn')?.addEventListener('click', function(e) {
            e.stopPropagation();
            window.markAllNotificationsRead();
        });
        document.getElementById('refreshNotifBtn')?.addEventListener('click', function(e) {
            e.stopPropagation();
            window.refreshNotifications();
        });

        // Lắng nghe storage event từ tab khác
        window.addEventListener('storage', function(e) {
            if (e.key === 'candidate_notifications' || e.key === 'currentUser') {
                console.log('🔄 Phát hiện thay đổi thông báo, cập nhật...');
                loadNotifications();
            }
        });

        // Polling mỗi 3 giây
        setInterval(loadNotifications, 3000);

        loadNotifications();
        console.log('🔔 Floating notifications initialized');
    });
})();