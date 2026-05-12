// notify-bridge.js - Real-time notification bridge (FULLY FIXED)
(function() {
    if (window._notifyBridgeLoaded) return;
    window._notifyBridgeLoaded = true;

    console.log('🔔 Notify bridge initializing...');

    // Lắng nghe từ BroadcastChannel
    try {
        const channel = new BroadcastChannel('danangwork_notify');
        
        channel.onmessage = function(event) {
            if (event.data && event.data.type === 'NEW_NOTIFICATION') {
                console.log('📢 Nhận thông báo realtime từ channel:', event.data.data);
                
                let notifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
                const exists = notifs.some(n => n.id === event.data.data.id);
                
                if (!exists) {
                    notifs.unshift(event.data.data);
                    localStorage.setItem('candidate_notifications', JSON.stringify(notifs));
                }
                
                // Dispatch event cho cùng tab
                window.dispatchEvent(new CustomEvent('realtime-notification', { 
                    detail: event.data.data 
                }));
            }
        };
        
        console.log('✅ BroadcastChannel initialized');
    } catch(e) {
        console.warn('BroadcastChannel not supported:', e);
    }

    // Polling để đảm bảo đồng bộ
    let lastNotifCount = 0;
    let lastNotifIds = '';
    
    setInterval(function() {
        try {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser || !currentUser.email) return;
            
            let notifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
            let userNotifs = notifs.filter(n => n.userId === currentUser.email);
            
            const currentIds = userNotifs.map(n => n.id + '_' + n.read).join(',');
            
            if (currentIds !== lastNotifIds && lastNotifIds !== '') {
                console.log('🔄 Phát hiện thông báo mới qua polling');
                const newNotif = userNotifs[0];
                if (newNotif && !newNotif.read) {
                    window.dispatchEvent(new CustomEvent('realtime-notification', { 
                        detail: newNotif 
                    }));
                }
            }
            
            lastNotifIds = currentIds;
            lastNotifCount = userNotifs.length;
        } catch(e) {}
    }, 3000);
    
    console.log('🔔 Notify bridge ready');
})();