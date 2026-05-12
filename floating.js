// floating.js - Chỉ xử lý UI, không xử lý logic thông báo
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

        // Toggle panel
        if (notifyBtn) {
            notifyBtn.onclick = function(e) {
                e.stopPropagation();
                if (typeof window.loadNotifications === 'function') {
                    window.loadNotifications();
                }
                if (notifyPanel.style.display === 'flex') {
                    notifyPanel.style.display = 'none';
                } else {
                    notifyPanel.style.display = 'flex';
                }
            };
        }

        // Đóng panel khi click ra ngoài
        document.addEventListener('click', function(e) {
            if (notifyBtn && notifyPanel && !notifyBtn.contains(e.target) && !notifyPanel.contains(e.target)) {
                notifyPanel.style.display = 'none';
            }
        });

        // Nút đánh dấu đã đọc
        const markAllReadBtn = document.getElementById('markAllReadBtn');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (typeof window.markAllNotificationsRead === 'function') {
                    window.markAllNotificationsRead();
                }
            });
        }

        // Nút làm mới
        const refreshNotifBtn = document.getElementById('refreshNotifBtn');
        if (refreshNotifBtn) {
            refreshNotifBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (typeof window.refreshNotifications === 'function') {
                    window.refreshNotifications();
                }
            });
        }

        console.log('🔔 Floating UI ready');
    });
})();