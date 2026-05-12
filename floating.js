// floating.js - Cập nhật hiển thị thông báo thực từ localStorage
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
    let userNotifs = candidateNotifs.filter(n => n.userId === currentUser.email);
    
    // Sắp xếp mới nhất lên đầu
    userNotifs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Đếm số chưa đọc
    const unreadCount = userNotifs.filter(n => !n.read).length;
    
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
    
    notifyList.innerHTML = userNotifs.map((notif, idx) => {
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

  // Xử lý click vào thông báo
  window.handleNotifyClick = function(index) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    let candidateNotifs = JSON.parse(localStorage.getItem('candidate_notifications')) || [];
    let userNotifs = candidateNotifs.filter(n => n.userId === currentUser.email);
    const notif = userNotifs[index];
    
    if (notif) {
      // Đánh dấu đã đọc
      if (!notif.read) {
        const originalNotif = candidateNotifs.find(n => n.id === notif.id);
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
    
    candidateNotifs.forEach(n => {
      if (n.userId === currentUser.email && !n.read) {
        n.read = true;
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      localStorage.setItem('candidate_notifications', JSON.stringify(candidateNotifs));
      loadNotifications();
      alert('✅ Đã đánh dấu tất cả thông báo là đã đọc!');
    }
  };

  // Xử lý click vào nút chuông
  notifyBtn.addEventListener("click", (e) => {
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

  // Đóng panel khi click ra ngoài
  document.addEventListener("click", (e) => {
    if (!notifyBtn.contains(e.target) && !notifyPanel.contains(e.target)) {
      notifyPanel.style.display = "none";
    }
  });

  // Nút đánh dấu đã đọc
  document.getElementById("markAllReadBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    window.markAllNotificationsRead();
  });

  // Lắng nghe sự kiện storage để cập nhật realtime
  window.addEventListener("storage", (e) => {
    if (e.key === 'candidate_notifications' || e.key === 'currentUser') {
      loadNotifications();
    }
  });

  // Tải thông báo khi trang load
  loadNotifications();
  
  // Refresh mỗi 30 giây
  setInterval(() => {
    loadNotifications();
  }, 30000);
});