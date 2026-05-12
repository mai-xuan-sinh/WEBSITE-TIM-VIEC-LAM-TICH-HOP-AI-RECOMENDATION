// notify-bridge.js - Real-time notification bridge
(function() {
    if (window._notifyBridgeLoaded) return;
    window._notifyBridgeLoaded = true;

    // Hàm gửi thông báo realtime (được gọi từ HR)
    window.sendRealtimeNotification = function(notification) {
        console.log('📤 Gửi thông báo realtime:', notification);
        
        // Lưu vào localStorage
        let notifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
        notifs.unshift(notification);
        localStorage.setItem('candidate_notifications', JSON.stringify(notifs));
        
        // Dispatch custom event cho cùng tab
        window.dispatchEvent(new CustomEvent('realtime-notification', { detail: notification }));
        
        // Gửi qua BroadcastChannel nếu có
        try {
            if (window.notifyChannel) {
                window.notifyChannel.postMessage({ type: 'NEW_NOTIFICATION', data: notification });
            } else {
                var channel = new BroadcastChannel('danangwork_notify');
                window.notifyChannel = channel;
                channel.postMessage({ type: 'NEW_NOTIFICATION', data: notification });
            }
        } catch(e) {}
    };

    // Lắng nghe từ BroadcastChannel
    try {
        var channel = new BroadcastChannel('danangwork_notify');
        window.notifyChannel = channel;
        
        channel.onmessage = function(event) {
            if (event.data && event.data.type === 'NEW_NOTIFICATION') {
                console.log('📢 Nhận thông báo realtime từ channel:', event.data.data);
                window.dispatchEvent(new CustomEvent('realtime-notification', { detail: event.data.data }));
            }
        };
        console.log('🔔 Notify bridge initialized with BroadcastChannel');
    } catch(e) {
        console.warn('BroadcastChannel not supported, using storage event only');
    }
})();