// notify-bridge.js - Broadcast channel bridge
(function() {
    if (window._notifyBridgeLoaded) return;
    window._notifyBridgeLoaded = true;

    console.log('🔔 Notify bridge initializing...');

    try {
        const channel = new BroadcastChannel('danangwork_notify');
        
        channel.onmessage = function(event) {
            if (event.data && event.data.type === 'NEW_NOTIFICATION') {
                console.log('📢 Nhận thông báo realtime:', event.data.data);
                
                let notifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
                const exists = notifs.some(n => n.id === event.data.data.id);
                
                if (!exists) {
                    notifs.unshift(event.data.data);
                    localStorage.setItem('candidate_notifications', JSON.stringify(notifs));
                }
                
                // Reload notifications nếu đang mở
                if (typeof window.loadNotifications === 'function') {
                    window.loadNotifications();
                }
            }
        };
        
        console.log('✅ BroadcastChannel initialized');
    } catch(e) {
        console.warn('BroadcastChannel not supported:', e);
    }
})();