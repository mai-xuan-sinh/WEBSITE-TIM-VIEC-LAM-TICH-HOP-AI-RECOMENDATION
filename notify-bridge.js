// notify-bridge.js - Tăng cường realtime notification giữa các tab
(function() {
    'use strict';
    
    // Tạo BroadcastChannel
    const channelName = 'danangwork_notify_channel';
    let broadcastChannel = null;
    
    try {
        broadcastChannel = new BroadcastChannel(channelName);
        window.danangworkNotifyChannel = broadcastChannel;
    } catch(e) {
        console.warn('BroadcastChannel not supported, fallback to storage event');
    }
    
    // Lắng nghe thông báo từ channel
    if (broadcastChannel) {
        broadcastChannel.onmessage = (event) => {
            const { type, data } = event.data;
            
            if (type === 'NEW_NOTIFICATION') {
                console.log('📢 Nhận thông báo realtime:', data);
                
                // Kích hoạt tải lại thông báo
                if (typeof loadNotifications === 'function') {
                    loadNotifications();
                }
                
                // Hiển thị toast
                showNotificationToast(data);
                
                // Dispatch custom event
                window.dispatchEvent(new CustomEvent('realtime-notification', { detail: data }));
            }
            
            if (type === 'MARK_ALL_READ') {
                if (typeof loadNotifications === 'function') {
                    loadNotifications();
                }
            }
        };
    }
    
    // Hiển thị toast thông báo
    function showNotificationToast(notif) {
        if (!notif) return;
        
        // Kiểm tra chỉ hiển thị cho user hiện tại
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.email !== notif.userId) return;
        
        const toast = document.createElement('div');
        toast.className = 'realtime-toast';
        
        let iconHtml = '';
        let bgColor = '#0ea5e9';
        
        switch(notif.type) {
            case 'approved':
                iconHtml = '<i class="fas fa-check-circle"></i>';
                bgColor = '#10b981';
                break;
            case 'rejected':
                iconHtml = '<i class="fas fa-times-circle"></i>';
                bgColor = '#ef4444';
                break;
            case 'interview':
                iconHtml = '<i class="fas fa-calendar-alt"></i>';
                bgColor = '#8b5cf6';
                break;
            default:
                iconHtml = '<i class="fas fa-bell"></i>';
                bgColor = '#0ea5e9';
        }
        
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="font-size: 20px; color: ${bgColor};">${iconHtml}</div>
                <div>
                    <div style="font-weight: 700; margin-bottom: 4px;">${escapeHtml(notif.title)}</div>
                    <div style="font-size: 13px; opacity: 0.9;">${escapeHtml(notif.content.substring(0, 100))}${notif.content.length > 100 ? '...' : ''}</div>
                </div>
            </div>
            <button onclick="this.parentElement.remove()" style="background: none; border: none; color: rgba(255,255,255,0.7); cursor: pointer; font-size: 16px;">&times;</button>
        `;
        
        toast.style.cssText = `
            position: fixed;
            bottom: 110px;
            right: 30px;
            background: ${bgColor};
            color: white;
            padding: 14px 18px;
            border-radius: 16px;
            z-index: 10002;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            min-width: 320px;
            max-width: 400px;
            cursor: pointer;
        `;
        
        // Thêm animation
        const style = document.createElement('style');
        if (!document.querySelector('#realtime-toast-style')) {
            style.id = 'realtime-toast-style';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                .realtime-toast {
                    animation: slideInRight 0.3s ease;
                }
                .realtime-toast.hiding {
                    animation: slideOutRight 0.3s ease;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(toast);
        
        // Click vào toast để xem chi tiết
        toast.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                // Mở panel thông báo
                const notifyBtn = document.getElementById('notifyBtn');
                const notifyPanel = document.getElementById('notifyPanel');
                if (notifyBtn && notifyPanel) {
                    notifyBtn.click();
                }
                toast.remove();
            }
        });
        
        // Tự động ẩn sau 5 giây
        setTimeout(() => {
            if (toast.parentElement) {
                toast.classList.add('hiding');
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
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
    
    // Hàm gửi thông báo từ HR
    window.sendRealtimeNotification = function(notification) {
        if (broadcastChannel) {
            broadcastChannel.postMessage({
                type: 'NEW_NOTIFICATION',
                data: notification
            });
        }
        
        // Cũng dispatch storage event
        let notifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
        notifs.unshift(notification);
        localStorage.setItem('candidate_notifications', JSON.stringify(notifs));
    };
    
    // Hàm đánh dấu đã đọc tất cả (realtime)
    window.markAllReadRealtime = function(userEmail) {
        if (broadcastChannel) {
            broadcastChannel.postMessage({
                type: 'MARK_ALL_READ',
                data: { userEmail }
            });
        }
    };
    
    console.log('🔔 Notify bridge initialized - Real-time notifications ready');
})();