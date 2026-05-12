// floating.js - Giải pháp đồng bộ thông báo cho toàn bộ Website
(function() {
    if (window._floatingLoaded) return;
    window._floatingLoaded = true;

    // 1. Tự động load notification.js nếu chưa có
    function loadDependencies() {
        const scriptSrc = "notification.js"; // Đảm bảo đường dẫn này đúng với project của bạn
        if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
            const script = document.createElement("script");
            script.src = scriptSrc;
            script.async = true;
            document.head.appendChild(script);
        }
    }

    // 2. Chèn CSS trực tiếp để đảm bảo giao diện xanh-trắng chuẩn
    function injectStyles() {
        if (document.getElementById("floating-auto-style")) return;
        const style = document.createElement("style");
        style.id = "floating-auto-style";
        style.innerHTML = `
            .notify-panel {
                display: none; flex-direction: column; position: fixed;
                bottom: 85px; right: 20px; width: 380px; max-height: 500px;
                background: white; border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2); z-index: 9999;
                overflow: hidden; border: 1px solid #eee; font-family: 'Inter', sans-serif;
            }
            .notify-panel.active { display: flex !important; animation: slideIn 0.3s ease; }
            .notify-header {
                padding: 15px; background: #2563eb; color: white;
                display: flex; justify-content: space-between; align-items: center;
            }
            .notify-header h3 { margin: 0; font-size: 18px; display: flex; align-items: center; gap: 10px; }
            .header-btns { display: flex; gap: 8px; }
            .mark-read-btn {
                background: rgba(255, 255, 255, 0.2); color: white; border: none;
                padding: 6px 12px; border-radius: 20px; font-size: 12px; cursor: pointer;
            }
            .notify-list { overflow-y: auto; flex: 1; background: #fff; min-height: 200px; }
            #notifyDot { 
                display: none; position: absolute; top: 0; right: 0; 
                width: 12px; height: 12px; background: #ef4444; 
                border-radius: 50%; border: 2px solid white; 
            }
            @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `;
        document.head.appendChild(style);
    }

    // 3. Khởi tạo giao diện
    function initFloatingActions() {
        injectStyles();
        loadDependencies();

        let wrapper = document.querySelector(".floating-actions");
        if (!wrapper) {
            wrapper = document.createElement("div");
            wrapper.className = "floating-actions";
            document.body.appendChild(wrapper);
        }

        wrapper.innerHTML = `
            <a href="yeuthich.html" class="fab fab-heart" title="Yêu thích"><i class="fas fa-heart"></i></a>
            <div class="fab fab-bell" id="notifyBtn" style="position:relative; cursor:pointer;" title="Thông báo">
                <i class="fas fa-bell"></i>
                <span id="notifyDot"></span>
            </div>
            <div class="notify-panel" id="notifyPanel">
                <div class="notify-header">
                    <h3><i class="fas fa-bell"></i> Thông báo</h3>
                    <div class="header-btns">
                        <button id="markAllReadBtn" class="mark-read-btn">Đánh dấu đã đọc</button>
                        <button id="refreshNotifBtn" class="mark-read-btn"><i class="fas fa-sync-alt"></i></button>
                    </div>
                </div>
                <div id="notifyList" class="notify-list">
                    <div style="padding:40px; text-align:center; color:#888;">
                        <p>Đang kết nối dữ liệu...</p>
                    </div>
                </div>
            </div>
        `;

        const notifyBtn = document.getElementById("notifyBtn");
        const notifyPanel = document.getElementById("notifyPanel");

        // Sự kiện mở thông báo
        notifyBtn.onclick = function(e) {
            e.stopPropagation();
            notifyPanel.classList.toggle('active');
            
            // Chỉ gọi load nếu function đã tồn tại (đã load xong script)
            if (typeof window.loadNotifications === 'function') {
                window.loadNotifications();
            } else {
                console.log("Đang đợi script notification.js...");
            }
        };

        // Click ra ngoài đóng panel
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) notifyPanel.classList.remove('active');
        });

        // Gán các hàm dự phòng để tránh lỗi khi script chưa kịp tải
        window.loadNotifications = window.loadNotifications || function() { console.warn("Dữ liệu đang tải..."); };
        window.refreshNotifications = window.refreshNotifications || function() { location.reload(); };
        window.markAllNotificationsRead = window.markAllNotificationsRead || function() { console.warn("Chưa tải xong script xử lý."); };

        // Gán sự kiện cho nút bấm
        document.getElementById('markAllReadBtn').onclick = (e) => {
            e.stopPropagation();
            window.markAllNotificationsRead();
        };
        document.getElementById('refreshNotifBtn').onclick = (e) => {
            e.stopPropagation();
            window.refreshNotifications();
        };
    }

    // Chạy khi DOM sẵn sàng
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initFloatingActions);
    } else {
        initFloatingActions();
    }
})();