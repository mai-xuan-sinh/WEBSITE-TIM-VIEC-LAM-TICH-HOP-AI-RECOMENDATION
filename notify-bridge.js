// notify-bridge.js - Real-time notification bridge (FULLY FIXED)
(function() {
    if (window._notifyBridgeLoaded) return;
    window._notifyBridgeLoaded = true;

    console.log('🔔 Notify bridge initializing...');

    // Hàm gửi thông báo realtime (được gọi từ HR)
    window.sendRealtimeNotification = function(notification) {
        console.log('📤 Gửi thông báo realtime:', notification);
        
        // Lưu vào localStorage
        let notifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
        
        // Thêm thông báo mới vào đầu danh sách
        const newNotif = {
            id: Date.now(),
            userId: notification.userId,
            title: notification.title,
            content: notification.content,
            type: notification.type,
            read: false,
            createdAt: new Date().toISOString(),
            time: "Vừa xong"
        };
        
        if (notification.interviewDetails) {
            newNotif.interviewDetails = notification.interviewDetails;
        }
        
        notifs.unshift(newNotif);
        
        // Giới hạn 50 thông báo
        if (notifs.length > 50) notifs.pop();
        
        localStorage.setItem('candidate_notifications', JSON.stringify(notifs));
        
        // Dispatch storage event để các tab khác nhận được
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'candidate_notifications',
            newValue: JSON.stringify(notifs),
            oldValue: JSON.stringify(notifs.slice(1))
        }));
        
        // Gửi qua BroadcastChannel
        try {
            if (!window.notifyChannel) {
                window.notifyChannel = new BroadcastChannel('danangwork_notify');
            }
            window.notifyChannel.postMessage({ 
                type: 'NEW_NOTIFICATION', 
                data: newNotif 
            });
        } catch(e) {
            console.warn('BroadcastChannel error:', e);
        }
        
        // Dispatch custom event cho cùng tab
        window.dispatchEvent(new CustomEvent('realtime-notification', { detail: newNotif }));
        
        console.log('✅ Đã gửi thông báo realtime thành công');
        return newNotif;
    };

    // Hàm gửi thông báo từ HR (alias)
    window.sendNotificationToCandidate = function(candidateEmail, title, content, type, interviewDetails) {
        if (!candidateEmail) {
            console.warn('⚠️ Không có email ứng viên');
            return null;
        }
        
        return window.sendRealtimeNotification({
            userId: candidateEmail,
            title: title,
            content: content,
            type: type,
            interviewDetails: interviewDetails
        });
    };

    // Lắng nghe từ BroadcastChannel
    try {
        const channel = new BroadcastChannel('danangwork_notify');
        window.notifyChannel = channel;
        
        channel.onmessage = function(event) {
            if (event.data && event.data.type === 'NEW_NOTIFICATION') {
                console.log('📢 Nhận thông báo realtime từ channel:', event.data.data);
                
                // Lưu vào localStorage nếu chưa có
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

    // Kiểm tra thông báo mới định kỳ (polling fallback)
    let lastNotifCount = 0;
    
    setInterval(function() {
        try {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser || !currentUser.email) return;
            
            let notifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
            let userNotifs = notifs.filter(n => n.userId === currentUser.email);
            
            if (userNotifs.length !== lastNotifCount && lastNotifCount !== 0) {
                console.log('🔄 Phát hiện thông báo mới qua polling');
                window.dispatchEvent(new CustomEvent('realtime-notification', { 
                    detail: userNotifs[0] 
                }));
            }
            
            lastNotifCount = userNotifs.length;
        } catch(e) {}
    }, 5000);
    
    console.log('🔔 Notify bridge ready');
})();