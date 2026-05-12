// notify-bridge.js - Đơn giản, chỉ hỗ trợ realtime
(function() {
    if (window._notifyBridgeLoaded) return;
    window._notifyBridgeLoaded = true;

    // Tạo BroadcastChannel nếu hỗ trợ
    try {
        var channel = new BroadcastChannel('danangwork_notify');
        window.notifyChannel = channel;
        
        channel.onmessage = function(event) {
            if (event.data && event.data.type === 'NEW_NOTIFICATION') {
                console.log('📢 Realtime notification received:', event.data.data);
                // Kích hoạt làm mới thông báo
                if (typeof window.refreshNotifications === 'function') {
                    setTimeout(function() { window.refreshNotifications(); }, 100);
                }
            }
        };
        console.log('🔔 Notify bridge initialized');
    } catch(e) {
        console.warn('BroadcastChannel not supported');
    }
})();