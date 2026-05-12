// floating.js - Cập nhật realtime notification
document.addEventListener("DOMContentLoaded", () => {
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
  const notifyDot = document.getElementById("notifyDot");

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
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  }

  // Hiển thị toast thông báo nổi
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;
    toast.innerHTML = `
      <i class="fas ${type === 'info' ? 'fa-info-circle' : (type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle')}"></i>
      <span>${message}</span>
    `;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 30px;
      background: ${type === 'success' ? '#10b981' : (type === 'warning' ? '#f59e0b' : '#0ea5e9')};
      color: white;
      padding: 12px 20px;
      border-radius: 12px;
      z-index: 10001;
      animation: slideIn 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(function() {
        if (toast.parentElement) toast.remove();
      }, 300);
    }, 4000);
  }

  // Thêm animation cho toast
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Escape HTML để tránh XSS
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
    
    if (!currentUser) {
      notifyList.innerHTML = `
        <div class="notify-item empty">
          <i class="fas fa-lock"></i> Đăng nhập để xem thông báo
        </div>
      `;
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
    const unreadCount = userNotifs.filter(function(n) {
      return !n.read;
    }).length;
    
    if (notifyDot) {
      if (unreadCount > 0) {
        notifyDot.style.display = "block";
        notifyDot.setAttribute('data-count', unreadCount);
      } else {
        notifyDot.style.display = "none";
      }
    }
    
    if (userNotifs.length === 0) {
      notifyList.innerHTML = `
        <div class="notify-item empty">
          <i class="fas fa-bell-slash"></i> Không có thông báo mới
        </div>
      `;
      return;
    }
    
    notifyList.innerHTML = userNotifs.map(function(notif, idx) {
      let iconHtml = '';
      let iconColor = '';
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
      
      const timeAgo = formatTimeAgo(notif.createdAt);
      
      return `
        <div class="notify-item ${notif.read ? 'read' : 'unread'}" data-notif-id="${notif.id}" data-notif-index="${idx}" onclick="handleNotifyClick(${idx})">
          <div class="notify-icon" style="color: ${iconColor};">${iconHtml}</div>
          <div class="notify-content">
            <div class="notify-title">${escapeHtml(notif.title)}</div>
            <div class="notify-message">${escapeHtml(notif.content)}</div>
            <div class="notify-time">${timeAgo}</div>
          </div>
          ${!notif.read ? '<div class="notify-dot"></div>' : ''}
        </div>
      `;
    }).join('');
  }

  // Xử lý click vào thông báo
  window.handleNotifyClick = function(index) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    let candidateNotifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
    let userNotifs = candidateNotifs.filter(function(n) {
      return n.userId === currentUser.email;
    });
    const notif = userNotifs[index];
    
    if (notif) {
      // Đánh dấu đã đọc
      if (!notif.read) {
        const originalNotif = candidateNotifs.find(function(n) {
          return n.id === notif.id;
        });
        if (originalNotif) {
          originalNotif.read = true;
          localStorage.setItem('candidate_notifications', JSON.stringify(candidateNotifs));
        }
      }
      
      // Hiển thị chi tiết dựa trên loại thông báo
      if (notif.type === 'interview' && notif.interviewDetails) {
        const details = notif.interviewDetails;
        const formattedDate = new Date(details.date).toLocaleDateString('vi-VN');
        alert(`📅 CHI TIẾT LỊCH PHỎNG VẤN\n\n` +
              `Vị trí: ${details.position}\n` +
              `Thời gian: ${details.time} - Ngày ${formattedDate}\n` +
              `Hình thức: ${details.type === 'online' ? 'Online' : 'Trực tiếp'}\n` +
              `Địa điểm: ${details.location}\n` +
              `${details.note ? `Ghi chú: ${details.note}\n` : ''}\n` +
              `💡 Vui lòng đến đúng giờ và chuẩn bị đầy đủ hồ sơ!`);
      } else if (notif.type === 'approved') {
        alert(`✅ ${notif.title}\n\n${notif.content}\n\n💡 Nhà tuyển dụng sẽ liên hệ với bạn để sắp xếp lịch phỏng vấn.`);
      } else if (notif.type === 'rejected') {
        alert(`❌ ${notif.title}\n\n${notif.content}\n\n💡 Đừng nản lòng! Hãy tiếp tục ứng tuyển các vị trí khác nhé!`);
      } else {
        alert(`📢 ${notif.title}\n\n${notif.content}`);
      }
      
      // Tải lại danh sách
      loadNotifications();
    }
  };

  // Đánh dấu tất cả đã đọc
  window.markAllNotificationsRead = function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    let candidateNotifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
    let hasChanges = false;
    
    candidateNotifs.forEach(function(n) {
      if (n.userId === currentUser.email && !n.read) {
        n.read = true;
        hasChanges = true;
      }
    });
    
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
        // Ẩn dot khi mở panel
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
  const markAllReadBtn = document.getElementById("markAllReadBtn");
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      window.markAllNotificationsRead();
    });
  }

  // Nút làm mới
  const refreshNotifBtn = document.getElementById("refreshNotifBtn");
  if (refreshNotifBtn) {
    refreshNotifBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      window.refreshNotifications();
    });
  }

  // ========== REALTIME NOTIFICATION ==========
  // Biến lưu hash thông báo cũ
  let lastNotifsHash = '';
  
  // 1. Lắng nghe sự kiện storage từ tab khác
  window.addEventListener("storage", function(e) {
    if (e.key === 'candidate_notifications' || e.key === 'currentUser') {
      console.log('🔄 Phát hiện thay đổi thông báo từ tab khác');
      loadNotifications();
      
      // Hiển thị toast thông báo mới khi có thay đổi
      if (e.key === 'candidate_notifications' && e.newValue) {
        try {
          const oldNotifs = e.oldValue ? JSON.parse(e.oldValue) : [];
          const newNotifs = JSON.parse(e.newValue);
          const currentUser = JSON.parse(localStorage.getItem('currentUser'));
          
          if (currentUser) {
            const oldUserNotifs = oldNotifs.filter(function(n) {
              return n.userId === currentUser.email;
            });
            const newUserNotifs = newNotifs.filter(function(n) {
              return n.userId === currentUser.email;
            });
            
            if (newUserNotifs.length > oldUserNotifs.length) {
              const newNotif = newUserNotifs[0];
              if (newNotif && !newNotif.read) {
                showToast('📢 ' + newNotif.title, 'info');
              }
            }
          }
        } catch(err) {
          console.error('Lỗi xử lý storage event:', err);
        }
      }
    }
  });
  
  // 2. Polling mỗi 5 giây để kiểm tra thông báo mới
  function checkForNewNotifications() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    let candidateNotifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
    let userNotifs = candidateNotifs.filter(function(n) {
      return n.userId === currentUser.email;
    });
    
    // Tạo hash từ danh sách thông báo
    const currentHash = JSON.stringify(userNotifs.map(function(n) {
      return { id: n.id, read: n.read };
    }));
    
    if (currentHash !== lastNotifsHash && lastNotifsHash !== '') {
      // Có thay đổi, tìm thông báo mới
      let oldNotifs = [];
      try {
        oldNotifs = JSON.parse(lastNotifsHash);
      } catch(err) {
        oldNotifs = [];
      }
      
      // Tìm thông báo mới
      for (var i = 0; i < userNotifs.length; i++) {
        var newNotif = userNotifs[i];
        var existed = false;
        
        for (var j = 0; j < oldNotifs.length; j++) {
          if (oldNotifs[j].id === newNotif.id) {
            existed = true;
            break;
          }
        }
        
        if (!existed && newNotif.type) {
          // Thông báo mới
          var message = '';
          if (newNotif.type === 'approved') message = '✅ Hồ sơ của bạn đã được duyệt!';
          else if (newNotif.type === 'interview') message = '📅 Bạn có lịch phỏng vấn mới!';
          else if (newNotif.type === 'rejected') message = '❌ Hồ sơ chưa được duyệt';
          else message = '📢 ' + newNotif.title;
          
          showToast(message, 'info');
          break;
        }
      }
    }
    
    lastNotifsHash = currentHash;
    
    // Cập nhật dot
    if (notifyDot) {
      const unreadCount = userNotifs.filter(function(n) {
        return !n.read;
      }).length;
      
      if (unreadCount > 0) {
        notifyDot.style.display = "block";
        notifyDot.setAttribute('data-count', unreadCount);
      } else {
        notifyDot.style.display = "none";
      }
    }
  }
  
  // Polling mỗi 5 giây
  setInterval(function() {
    loadNotifications();
    checkForNewNotifications();
  }, 5000);
  
  // 3. Custom event cho realtime trong cùng tab
  window.dispatchCustomNotificationEvent = function(notification) {
    var event = new CustomEvent('newNotification', { detail: notification });
    window.dispatchEvent(event);
  };
  
  window.addEventListener('newNotification', function(e) {
    console.log('📢 Nhận thông báo mới:', e.detail);
    loadNotifications();
    showToast('📢 ' + (e.detail?.title || 'Thông báo mới'), 'info');
  });
  
  // Tải thông báo lần đầu
  loadNotifications();
});