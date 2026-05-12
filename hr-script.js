document.addEventListener("DOMContentLoaded", () => {
    
    // ==================== FORCE FIX HR ACCOUNT ====================
    function forceFixHRAccount() {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let hasChanges = false;
        
        let hrAccount = users.find(u => u.email === "hr@danangwork.com");
        
        if (!hrAccount) {
            users.push({
                id: 1,
                email: "hr@danangwork.com",
                password: "123456",
                role: "hr",
                name: "HR Manager",
                fullname: "HR Manager",
                status: "active",
                createdAt: new Date().toISOString(),
                company: {
                    name: "Công ty Công nghệ Đà Nẵng",
                    address: "Đà Nẵng, Việt Nam"
                }
            });
            hasChanges = true;
            console.log("✅ Đã tạo tài khoản HR");
        } else if (hrAccount.role !== "hr") {
            hrAccount.role = "hr";
            hasChanges = true;
            console.log("🔄 Đã sửa role HR thành 'hr'");
        }
        
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.email === "hr@danangwork.com" && currentUser.role !== "hr") {
            currentUser.role = "hr";
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            console.log("🔄 Đã sửa role trong currentUser cho HR");
        }
        
        if (hasChanges) {
            localStorage.setItem("users", JSON.stringify(users));
        }
    }
    
    forceFixHRAccount();
    
    // ==================== TÀI KHOẢN HR CỐ ĐỊNH ====================
    const fixedHRUser = {
        id: 1,
        username: "HR Manager",
        fullname: "HR Manager",
        email: "hr@danangwork.com",
        password: "123456",
        role: "hr",
        userType: "employer",
        company: { 
            name: "Công ty Công nghệ Đà Nẵng", 
            address: "Đà Nẵng, Việt Nam", 
            phone: "0905123456" 
        }
    };
    
    localStorage.setItem("hrAccounts", JSON.stringify([fixedHRUser]));
    let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const hrExists = existingUsers.some(u => u.email === fixedHRUser.email);
    if (!hrExists) {
        existingUsers.push(fixedHRUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));
    }
    
    // ==================== KIỂM TRA ĐĂNG NHẬP ====================
    let currentUser = null;
    let userStr = localStorage.getItem("currentUser");
    if (userStr) {
        try { currentUser = JSON.parse(userStr); } catch(e) { currentUser = null; }
    }
    
    // Kiểm tra với nhiều điều kiện
    const isValidHR = currentUser && (currentUser.role === "hr" || currentUser.role === "employer" || currentUser.email === "hr@danangwork.com");
    
    if (!isValidHR) {
        // Thử sửa role nếu là HR nhưng bị lỗi
        if (currentUser && currentUser.email === "hr@danangwork.com") {
            currentUser.role = "hr";
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            console.log("🔄 Đã sửa role HR trong kiểm tra đăng nhập");
        } else {
            window.location.href = "login.html";
            return;
        }
    }
    
    // Hiển thị thông tin HR
    const hrNameEl = document.getElementById("hrName");
    const hrCompanyEl = document.getElementById("hrCompanyName");
    if (hrNameEl) hrNameEl.innerText = currentUser.username || currentUser.name || "HR Manager";
    if (hrCompanyEl) hrCompanyEl.innerText = currentUser.company?.name || "Công ty Công nghệ Đà Nẵng";
    
    // ==================== ĐĂNG XUẤT ====================
    document.getElementById("hrLogoutBtn")?.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        sessionStorage.removeItem("currentUser");
        window.location.href = "login.html";
    });
    
    // ==================== DATA MODELS ====================
    let jobs = JSON.parse(localStorage.getItem("hr_jobs")) || [];
    let candidates = JSON.parse(localStorage.getItem("hr_candidates")) || [
        { id: 1, name: "Trần Văn A", position: "Frontend Dev", date: "Hôm nay", status: "approved", email: "a@email.com", phone: "0912345678", address: "Hải Châu, Đà Nẵng", skills: ["ReactJS", "JavaScript", "HTML/CSS"], experience: "3 năm", education: "Đại học Bách Khoa" },
        { id: 2, name: "Lê Thị B", position: "UI/UX Designer", date: "Hôm qua", status: "approved", email: "b@email.com", phone: "0923456789", address: "Sơn Trà, Đà Nẵng", skills: ["Figma", "Adobe XD", "UI Design"], experience: "4 năm", education: "Đại học Kiến trúc" },
        { id: 3, name: "Nguyễn Văn C", position: "Backend Developer", date: "2 ngày trước", status: "pending", email: "c@email.com", phone: "0934567890", address: "Liên Chiểu, Đà Nẵng", skills: ["Node.js", "Python", "Django"], experience: "5 năm", education: "Đại học Bách Khoa" },
        { id: 4, name: "Phạm Thị D", position: "Data Analyst", date: "3 ngày trước", status: "pending", email: "d@email.com", phone: "0945678901", address: "Ngũ Hành Sơn, Đà Nẵng", skills: ["SQL", "Python", "Power BI"], experience: "2 năm", education: "Đại học Kinh tế" },
        { id: 5, name: "Hoàng Văn E", position: "Marketing Specialist", date: "4 ngày trước", status: "pending", email: "e@email.com", phone: "0956789012", address: "Thanh Khê, Đà Nẵng", skills: ["SEO", "Content Marketing", "Facebook Ads"], experience: "3 năm", education: "Đại học Kinh tế" },
        { id: 6, name: "Ngô Thị F", position: "Fullstack Developer", date: "5 ngày trước", status: "approved", email: "f@email.com", phone: "0967890123", address: "Hải Châu, Đà Nẵng", skills: ["ReactJS", "Node.js", "MongoDB"], experience: "4 năm", education: "Đại học Bách Khoa" }
    ];
    let interviews = JSON.parse(localStorage.getItem("hr_interviews")) || [];
    
    let notifications = JSON.parse(localStorage.getItem("hr_notifications")) || [
        { id: 1, title: "Ứng viên mới", content: "Nguyễn Văn C đã ứng tuyển vị trí Backend Developer", type: "application", time: "5 phút trước", read: false, link: "#" },
        { id: 2, title: "Phỏng vấn sắp diễn ra", content: "Buổi phỏng vấn với Trần Văn A lúc 14:00 hôm nay", type: "interview", time: "1 giờ trước", read: false, link: "#" },
        { id: 3, title: "Hồ sơ được duyệt", content: "Hồ sơ của Lê Thị B đã được duyệt", type: "application", time: "2 giờ trước", read: true, link: "#" }
    ];
    
    let activities = JSON.parse(localStorage.getItem("hr_activities")) || ["✨ Chào mừng bạn đến với HR Pro"];
    
    if (interviews.length === 0) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        interviews = [
            { id: Date.now(), candidate: "Trần Văn A", position: "Frontend Dev", date: tomorrow.toISOString().split('T')[0], time: "09:00", type: "online", location: "https://meet.google.com/example", interviewer: "HR Manager", duration: "45", note: "Mang theo portfolio", status: "upcoming" },
            { id: Date.now() + 1, candidate: "Lê Thị B", position: "UI/UX Designer", date: tomorrow.toISOString().split('T')[0], time: "14:00", type: "offline", location: "Văn phòng công ty - Tầng 5", interviewer: "HR Manager", duration: "60", note: "Mang theo hồ sơ in", status: "upcoming" }
        ];
        localStorage.setItem("hr_interviews", JSON.stringify(interviews));
    }
    
    // ==================== HELPER FUNCTIONS ====================
    function escapeHtml(str) { if (!str) return ''; return str.replace(/[&<>]/g, m => m === '&' ? '&amp;' : m === '<' ? '&lt;' : '&gt;'); }
    
    function addActivity(msg) {
        const timestamp = new Date().toLocaleTimeString('vi-VN');
        activities.unshift(`🕒 ${timestamp} - ${msg}`);
        if (activities.length > 20) activities.pop();
        localStorage.setItem("hr_activities", JSON.stringify(activities));
        renderActivityFeed();
        updateStats();
    }
    
    function renderActivityFeed() {
        const feed = document.getElementById("activity-feed");
        if (feed) {
            if (activities.length === 0) feed.innerHTML = '<li><span class="dot"></span> 📌 Chào mừng bạn đến với HR Pro</li>';
            else feed.innerHTML = activities.slice(0, 8).map(a => `<li><span class="dot"></span> ${escapeHtml(a)}</li>`).join('');
        }
    }
    
    function updateStats() {
        document.getElementById("dash-active-jobs").innerText = jobs.filter(j => j.status === 'active').length;
        document.getElementById("dash-pending-cv").innerText = candidates.filter(c => c.status === 'pending').length;
        document.getElementById("dash-interviews").innerText = interviews.length;
        const approved = candidates.filter(c => c.status === 'approved').length;
        document.getElementById("dash-approved").innerText = approved;
        const total = candidates.length;
        const approvalRate = document.getElementById("approvalRate");
        if (approvalRate && total > 0) approvalRate.innerText = Math.round((approved / total) * 100) + "%";
        else if (approvalRate) approvalRate.innerText = "0%";
        document.getElementById("activeCompanies").innerText = "1";
        
        const unreadCount = notifications.filter(n => !n.read).length;
        const badgeCount = document.querySelector(".badge-count");
        if (badgeCount) badgeCount.innerText = unreadCount > 0 ? unreadCount : "0";
    }
    
    // ==================== THÔNG BÁO ====================
    function renderNotifications() {
        const container = document.getElementById("notification-list");
        if (!container) return;
        if (notifications.length === 0) {
            container.innerHTML = '<div class="notification-empty"><i class="fa-regular fa-bell-slash"></i><p>Không có thông báo nào</p></div>';
            return;
        }
        container.innerHTML = notifications.map(notif => `
            <div class="notification-item ${!notif.read ? 'unread' : ''}" data-id="${notif.id}" onclick="markNotificationRead(${notif.id})">
                <div class="notification-icon ${notif.type}">
                    <i class="fas ${notif.type === 'application' ? 'fa-file-signature' : (notif.type === 'interview' ? 'fa-calendar-check' : 'fa-bell')}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${escapeHtml(notif.title)}</div>
                    <div class="notification-desc">${escapeHtml(notif.content)}</div>
                    <div class="notification-time">${notif.time}</div>
                </div>
            </div>
        `).join('');
    }
    
    function addNotification(title, content, type = "system") {
        const newNotif = {
            id: Date.now(),
            title: title,
            content: content,
            type: type,
            time: "Vừa xong",
            read: false,
            link: "#"
        };
        notifications.unshift(newNotif);
        if (notifications.length > 30) notifications.pop();
        localStorage.setItem("hr_notifications", JSON.stringify(notifications));
        renderNotifications();
        updateStats();
    }
    
    window.markNotificationRead = function(id) {
        const index = notifications.findIndex(n => n.id === id);
        if (index !== -1 && !notifications[index].read) {
            notifications[index].read = true;
            localStorage.setItem("hr_notifications", JSON.stringify(notifications));
            renderNotifications();
            updateStats();
        }
    };
    
    window.markAllNotificationsRead = function() {
        notifications.forEach(n => n.read = true);
        localStorage.setItem("hr_notifications", JSON.stringify(notifications));
        renderNotifications();
        updateStats();
        document.querySelector(".notification-panel")?.classList.remove("show");
    };
    
    function toggleNotificationPanel() {
        const panel = document.getElementById("notificationPanel");
        if (panel) panel.classList.toggle("show");
    }
    
    document.addEventListener("click", function(e) {
        const panel = document.getElementById("notificationPanel");
        const bellBtn = document.querySelector(".action-btn.relative");
        if (panel && panel.classList.contains("show") && bellBtn && !bellBtn.contains(e.target) && !panel.contains(e.target)) {
            panel.classList.remove("show");
        }
    });
    
    // ==================== RENDER JOBS ====================
    function renderJobs() {
        const container = document.getElementById("job-cards-container");
        if (!container) return;
        if (jobs.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fa-solid fa-briefcase"></i><h3>Chưa có tin tuyển dụng</h3><p>Nhấn "Đăng tin mới" để tạo tin tuyển dụng</p></div>';
        } else {
            container.innerHTML = jobs.map((job, i) => `
                <div class="job-card">
                    <div class="job-card-header"><div class="job-card-title">${escapeHtml(job.title)}</div><div class="job-card-salary">${escapeHtml(job.salary) || 'Thỏa thuận'}</div></div>
                    <div class="job-card-details"><div><i class="fa-regular fa-calendar"></i> Hạn: ${job.deadline || job.postDate || 'Chưa cập nhật'}</div><div><i class="fa-solid fa-location-dot"></i> ${job.location || 'Đà Nẵng'}</div></div>
                    <div class="job-card-footer"><span class="tag ${job.status === 'active' ? 'tag-success' : 'tag-warning'}">${job.status === 'active' ? 'Đang mở' : 'Đã đóng'}</span>
                    <div><button class="btn-sm" style="color:var(--danger)" onclick="deleteJob(${i})"><i class="fa-solid fa-trash"></i> Xóa</button></div></div>
                </div>
            `).join('');
        }
        updateStats();
        localStorage.setItem("hr_jobs", JSON.stringify(jobs));
    }
    
    window.deleteJob = function(idx) {
        if (confirm("Xóa tin này?")) {
            const title = jobs[idx].title;
            jobs.splice(idx, 1);
            renderJobs();
            addActivity('🗑️ Xóa tin: ' + title);
            addNotification('Đã xóa tin tuyển dụng', `Tin "${title}" đã được xóa khỏi hệ thống`, "system");
        }
    };
    
    // ==================== RENDER CANDIDATES ====================
    function renderCandidates() {
        const container = document.getElementById("candidate-list");
        if (!container) return;
        let data = JSON.parse(localStorage.getItem("hr_candidates")) || candidates;
        const filterValue = document.getElementById("candidateFilter")?.value || "all";
        const positionValue = document.getElementById("positionFilter")?.value || "all";
        
        let filtered = data;
        if (filterValue !== "all") filtered = filtered.filter(c => c.status === filterValue);
        if (positionValue !== "all") filtered = filtered.filter(c => c.position === positionValue);
        
        container.innerHTML = filtered.map(c => {
            const statusText = c.status === 'pending' ? 'Chờ duyệt' : (c.status === 'approved' ? 'Đã duyệt' : 'Từ chối');
            const statusClass = c.status === 'pending' ? 'tag-warning' : (c.status === 'approved' ? 'tag-success' : 'tag-danger');
            return `
                <tr>
                    <td><strong>${escapeHtml(c.name)}</strong></td><td>${escapeHtml(c.position)}</td><td>${c.date}</td>
                    <td><span class="tag ${statusClass}">${statusText}</span></td>
                    <td><button class="btn-sm view-cv-btn" data-id="${c.id}"><i class="fa-solid fa-eye"></i> Xem CV</button>
                    ${c.status === 'pending' ? `<button class="btn-sm btn-primary approve-cv-btn" data-id="${c.id}" style="background:#10b981;color:white"><i class="fa-solid fa-check"></i> Duyệt</button>
                    <button class="btn-sm reject-cv-btn" data-id="${c.id}" style="background:#ef4444;color:white"><i class="fa-solid fa-times"></i> Từ chối</button>` : ''}
                    ${c.status === 'approved' ? `<button class="btn-sm create-interview-btn" data-id="${c.id}" data-name="${escapeHtml(c.name)}" data-position="${escapeHtml(c.position)}" style="background:var(--primary);color:white"><i class="fa-regular fa-calendar-plus"></i> Tạo lịch PV</button>` : ''}</td>
                </tr>
            `;
        }).join('');
        
        document.querySelectorAll(".view-cv-btn").forEach(btn => btn.onclick = () => showCVModal(data.find(c => c.id === parseInt(btn.dataset.id))));
        document.querySelectorAll(".approve-cv-btn").forEach(btn => btn.onclick = () => { approveCandidate(parseInt(btn.dataset.id)); });
        document.querySelectorAll(".reject-cv-btn").forEach(btn => btn.onclick = () => { rejectCandidate(parseInt(btn.dataset.id)); });
        document.querySelectorAll(".create-interview-btn").forEach(btn => btn.onclick = () => openCreateInterviewModal(parseInt(btn.dataset.id), btn.dataset.name, btn.dataset.position));
        updateStats();
    }
    
    function approveCandidate(id) {
        let data = JSON.parse(localStorage.getItem("hr_candidates")) || candidates;
        const candidate = data.find(c => c.id === id);
        if (candidate && candidate.status === 'pending') {
            candidate.status = "approved";
            localStorage.setItem("hr_candidates", JSON.stringify(data));
            renderCandidates();
            addActivity('✅ Đã duyệt hồ sơ của ' + candidate.name);
            addNotification('Hồ sơ được duyệt', `Hồ sơ của ${candidate.name} đã được duyệt, có thể tiến hành phỏng vấn`, "application");
            alert('✅ Đã duyệt hồ sơ của ' + candidate.name);
        }
    }
    
    function rejectCandidate(id) {
        if (confirm("Từ chối hồ sơ này?")) {
            let data = JSON.parse(localStorage.getItem("hr_candidates")) || candidates;
            const candidate = data.find(c => c.id === id);
            if (candidate && candidate.status === 'pending') {
                candidate.status = "rejected";
                localStorage.setItem("hr_candidates", JSON.stringify(data));
                renderCandidates();
                addActivity('❌ Đã từ chối hồ sơ của ' + candidate.name);
                addNotification('Hồ sơ bị từ chối', `Rất tiếc, hồ sơ của ${candidate.name} không phù hợp với yêu cầu`, "system");
                alert('❌ Đã từ chối hồ sơ của ' + candidate.name);
            }
        }
    }
    
    function showCVModal(candidate) {
        const modal = document.getElementById("cvModal");
        if (!modal || !candidate) return;
        document.getElementById("cvContent").innerHTML = `
            <div class="cv-avatar"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(candidate.name)}&backgroundColor=2563eb" style="width:120px;height:120px;border-radius:50%;"></div>
            <div class="cv-info"><h2>${escapeHtml(candidate.name)}</h2>
                <p><i class="fa-solid fa-briefcase"></i> <strong>Vị trí:</strong> ${escapeHtml(candidate.position)}</p>
                <p><i class="fa-solid fa-envelope"></i> <strong>Email:</strong> ${escapeHtml(candidate.email)}</p>
                <p><i class="fa-solid fa-phone"></i> <strong>SĐT:</strong> ${escapeHtml(candidate.phone)}</p>
                <p><i class="fa-solid fa-location-dot"></i> <strong>Địa chỉ:</strong> ${escapeHtml(candidate.address)}</p>
                <div class="skills-tags"><strong>Kỹ năng:</strong> ${(candidate.skills || []).map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}</div>
                <p><i class="fa-solid fa-graduation-cap"></i> <strong>Học vấn:</strong> ${escapeHtml(candidate.education)}</p>
                <p><i class="fa-solid fa-clock"></i> <strong>Kinh nghiệm:</strong> ${escapeHtml(candidate.experience)}</p>
            </div>`;
        modal.classList.add("show");
    }
    
    // ==================== TÌM ỨNG VIÊN ====================
    function searchCandidates() {
        const keyword = document.getElementById("searchKeyword")?.value.toLowerCase() || "";
        const skill = document.getElementById("searchSkill")?.value.toLowerCase() || "";
        const experience = document.getElementById("searchExperience")?.value || "";
        const location = document.getElementById("searchLocation")?.value.toLowerCase() || "";
        
        let data = JSON.parse(localStorage.getItem("hr_candidates")) || candidates;
        let filtered = data.filter(c => c.status === "approved");
        
        if (keyword) filtered = filtered.filter(c => c.name.toLowerCase().includes(keyword) || c.position.toLowerCase().includes(keyword));
        if (skill) filtered = filtered.filter(c => (c.skills || []).some(s => s.toLowerCase().includes(skill)));
        if (experience) filtered = filtered.filter(c => c.experience === experience);
        if (location) filtered = filtered.filter(c => c.address.toLowerCase().includes(location));
        
        const container = document.getElementById("searchResults");
        if (!container) return;
        
        if (filtered.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fa-solid fa-user-slash"></i><h3>Không tìm thấy ứng viên</h3><p>Hãy thử với từ khóa khác</p></div>';
            return;
        }
        
        container.innerHTML = filtered.map(c => {
            const matchScore = Math.min(Math.floor((c.skills?.length || 0) * 15 + (parseInt(c.experience) || 0) * 10), 100);
            return `
                <div class="candidate-result-card">
                    <div class="candidate-info">
                        <h4>${escapeHtml(c.name)}</h4>
                        <p><i class="fa-solid fa-briefcase"></i> ${escapeHtml(c.position)}</p>
                        <p><i class="fa-solid fa-location-dot"></i> ${escapeHtml(c.address)}</p>
                        <p><i class="fa-solid fa-clock"></i> Kinh nghiệm: ${escapeHtml(c.experience)}</p>
                        <div class="candidate-skills">${(c.skills || []).slice(0, 5).map(s => `<span class="skill-badge">${escapeHtml(s)}</span>`).join('')}</div>
                    </div>
                    <div class="candidate-actions" style="text-align:center">
                        <div class="match-score">${matchScore}% phù hợp</div>
                        <button class="btn-sm" style="margin-top:12px; background:var(--primary); color:white" onclick="inviteInterview(${c.id}, '${escapeHtml(c.name)}', '${escapeHtml(c.position)}')"><i class="fa-regular fa-calendar-plus"></i> Mời phỏng vấn</button>
                        <button class="btn-sm" style="margin-top:8px" onclick="viewCandidateCV(${c.id})"><i class="fa-solid fa-eye"></i> Xem CV</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    window.inviteInterview = function(id, name, position) {
        openCreateInterviewModal(id, name, position);
    };
    
    window.viewCandidateCV = function(id) {
        let data = JSON.parse(localStorage.getItem("hr_candidates")) || candidates;
        const candidate = data.find(c => c.id === id);
        if (candidate) showCVModal(candidate);
    };
    
    // ==================== TẠO LỊCH PHỎNG VẤN ====================
    function openCreateInterviewModal(candidateId, candidateName, position) {
        const modal = document.getElementById("createInterviewModal");
        if (modal) {
            document.getElementById("createInterviewCandidateId").value = candidateId;
            document.getElementById("createInterviewCandidate").value = candidateName;
            document.getElementById("createInterviewPosition").value = position;
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            document.getElementById("createInterviewDate").value = tomorrow.toISOString().split('T')[0];
            document.getElementById("createInterviewTime").value = "09:00";
            modal.classList.add("show");
        }
    }
    
    document.getElementById("createInterviewForm")?.addEventListener("submit", function(e) {
        e.preventDefault();
        const candidateName = document.getElementById("createInterviewCandidate").value;
        const position = document.getElementById("createInterviewPosition").value;
        const interviewDate = document.getElementById("createInterviewDate").value;
        const interviewTime = document.getElementById("createInterviewTime").value;
        const interviewType = document.getElementById("createInterviewType").value;
        const interviewLocation = document.getElementById("createInterviewLocation").value;
        const interviewer = document.getElementById("createInterviewInterviewer").value;
        const duration = document.getElementById("createInterviewDuration").value;
        const note = document.getElementById("createInterviewNote").value;
        
        if (!candidateName || !position || !interviewDate || !interviewTime) {
            alert("❌ Vui lòng điền đầy đủ thông tin bắt buộc!");
            return;
        }
        
        const newInterview = {
            id: Date.now(),
            candidate: candidateName,
            position: position,
            date: interviewDate,
            time: interviewTime,
            type: interviewType,
            location: interviewLocation || (interviewType === 'online' ? 'Link sẽ gửi sau' : 'Văn phòng công ty'),
            interviewer: interviewer || 'HR Department',
            duration: duration || '45',
            note: note || '',
            status: 'upcoming'
        };
        
        let allInterviews = JSON.parse(localStorage.getItem("hr_interviews")) || interviews;
        allInterviews.push(newInterview);
        localStorage.setItem("hr_interviews", JSON.stringify(allInterviews));
        interviews = allInterviews;
        
        renderInterviews();
        addActivity('📅 Đã tạo lịch phỏng vấn cho ' + candidateName);
        addNotification('Lịch phỏng vấn mới', `Đã tạo lịch phỏng vấn với ${candidateName} vào lúc ${interviewTime} ngày ${interviewDate}`, "interview");
        
        document.getElementById("createInterviewModal").classList.remove("show");
        alert("✅ Đã tạo lịch phỏng vấn thành công!");
        
        const interviewMenuItem = document.querySelector(".menu-item[data-target='view-interviews']");
        if (interviewMenuItem) interviewMenuItem.click();
        this.reset();
    });
    
    // ==================== RENDER INTERVIEWS ====================
    function renderInterviews() {
        const container = document.getElementById("interviews-container");
        const emptyState = document.getElementById("interview-empty-state");
        if (!container) return;
        
        let allInterviews = JSON.parse(localStorage.getItem("hr_interviews")) || interviews;
        const filterStatus = document.querySelector("#view-interviews .filter-tab.active")?.dataset.filter || "all";
        const searchTerm = document.getElementById("interviewSearch")?.value.toLowerCase() || "";
        
        let filtered = allInterviews;
        if (filterStatus !== "all") filtered = filtered.filter(i => i.status === filterStatus);
        if (searchTerm) filtered = filtered.filter(i => i.candidate.toLowerCase().includes(searchTerm));
        
        if (filtered.length === 0) {
            container.innerHTML = "";
            if (emptyState) emptyState.style.display = "block";
            updateStats();
            return;
        }
        if (emptyState) emptyState.style.display = "none";
        
        container.innerHTML = filtered.map((i, idx) => {
            const date = new Date(i.date);
            const statusClass = i.status === 'upcoming' ? 'status-upcoming' : (i.status === 'completed' ? 'status-completed' : 'status-cancelled');
            const statusText = i.status === 'upcoming' ? 'Sắp diễn ra' : (i.status === 'completed' ? 'Đã hoàn thành' : 'Đã hủy');
            const typeIcon = i.type === 'online' ? 'fa-video' : (i.type === 'phone' ? 'fa-phone' : 'fa-building');
            const typeText = i.type === 'online' ? 'Online' : (i.type === 'phone' ? 'Phone' : 'Offline');
            return `
                <div class="interview-card">
                    <div class="interview-card-header"><h4>${escapeHtml(i.position)}</h4><div class="interview-position">${escapeHtml(i.candidate)}</div><span class="interview-status ${statusClass}">${statusText}</span></div>
                    <div class="interview-card-body">
                        <div class="interview-datetime"><div class="interview-date"><div class="day">${date.getDate()}</div><div class="month">Th${date.getMonth() + 1}</div></div>
                        <div class="interview-time"><i class="fa-regular fa-clock"></i> ${i.time || '08:00'} (${i.duration || 45} phút)</div></div>
                        <div class="interview-info"><p><i class="fa-solid ${typeIcon}"></i> Hình thức: ${typeText}</p><p><i class="fa-solid fa-location-dot"></i> ${i.location || 'Chưa cập nhật'}</p>${i.interviewer ? `<p><i class="fa-solid fa-users"></i> Người PV: ${escapeHtml(i.interviewer)}</p>` : ''}</div>
                        ${i.note ? `<div class="interview-note"><i class="fa-regular fa-note-sticky"></i> ${escapeHtml(i.note)}</div>` : ''}
                    </div>
                    <div class="interview-card-footer">
                        <button class="btn-sm" onclick="editInterview(${idx})"><i class="fa-solid fa-pen"></i> Sửa</button>
                        <button class="btn-sm" style="color:var(--danger)" onclick="deleteInterview(${idx})"><i class="fa-solid fa-trash"></i> Xóa</button>
                        ${i.status === 'upcoming' ? `<button class="btn-sm" style="background:#10b981;color:white" onclick="completeInterview(${idx})"><i class="fa-solid fa-check-circle"></i> Hoàn thành</button>` : ''}
                        ${i.status === 'upcoming' ? `<button class="btn-sm" style="background:#f59e0b;color:white" onclick="cancelInterviewModal(${idx})"><i class="fa-solid fa-ban"></i> Hủy</button>` : ''}
                    </div>
                </div>
            `;
        }).join('');
        updateStats();
    }
    
    window.editInterview = function(idx) {
        let allInterviews = JSON.parse(localStorage.getItem("hr_interviews")) || interviews;
        const i = allInterviews[idx];
        document.getElementById("editInterviewId").value = idx;
        document.getElementById("editInterviewCandidate").value = i.candidate;
        document.getElementById("editInterviewPosition").value = i.position;
        document.getElementById("editInterviewDate").value = i.date;
        document.getElementById("editInterviewTime").value = i.time || '08:00';
        document.getElementById("editInterviewType").value = i.type || 'online';
        document.getElementById("editInterviewLocation").value = i.location || '';
        document.getElementById("editInterviewStatus").value = i.status || 'upcoming';
        document.getElementById("editInterviewModal").classList.add("show");
    };
    
    window.deleteInterview = function(idx) {
        if (confirm("Xóa lịch phỏng vấn này?")) {
            let allInterviews = JSON.parse(localStorage.getItem("hr_interviews")) || [];
            const deleted = allInterviews[idx];
            allInterviews.splice(idx, 1);
            localStorage.setItem("hr_interviews", JSON.stringify(allInterviews));
            interviews = allInterviews;
            renderInterviews();
            addActivity('🗑️ Xóa lịch phỏng vấn: ' + (deleted ? deleted.candidate : 'không xác định'));
            addNotification('Đã hủy lịch phỏng vấn', `Lịch phỏng vấn với ${deleted?.candidate || 'ứng viên'} đã bị hủy`, "system");
            alert("Đã xóa lịch phỏng vấn!");
        }
    };
    
    window.completeInterview = function(idx) {
        let allInterviews = JSON.parse(localStorage.getItem("hr_interviews")) || interviews;
        if (confirm("Xác nhận hoàn thành buổi phỏng vấn với " + allInterviews[idx].candidate + "?")) {
            allInterviews[idx].status = 'completed';
            localStorage.setItem("hr_interviews", JSON.stringify(allInterviews));
            interviews = allInterviews;
            renderInterviews();
            addActivity('✅ Hoàn thành phỏng vấn: ' + allInterviews[idx].candidate);
            addNotification('Phỏng vấn hoàn thành', `Buổi phỏng vấn với ${allInterviews[idx].candidate} đã hoàn thành`, "interview");
            alert("Đã đánh dấu hoàn thành buổi phỏng vấn!");
        }
    };
    
    let pendingCancelIndex = null;
    window.cancelInterviewModal = function(idx) {
        pendingCancelIndex = idx;
        document.getElementById("cancelReason").value = "";
        document.getElementById("cancelInterviewModal").classList.add("show");
    };
    
    document.getElementById("cancelConfirmBtn")?.addEventListener("click", function() {
        if (pendingCancelIndex !== null) {
            let allInterviews = JSON.parse(localStorage.getItem("hr_interviews")) || interviews;
            const reason = document.getElementById("cancelReason").value.trim() || "Không có lý do";
            allInterviews[pendingCancelIndex].status = 'cancelled';
            allInterviews[pendingCancelIndex].cancelReason = reason;
            localStorage.setItem("hr_interviews", JSON.stringify(allInterviews));
            interviews = allInterviews;
            renderInterviews();
            addActivity('❌ Đã hủy lịch phỏng vấn của ' + allInterviews[pendingCancelIndex].candidate + ' - Lý do: ' + reason);
            addNotification('Lịch phỏng vấn bị hủy', `Lịch phỏng vấn với ${allInterviews[pendingCancelIndex].candidate} đã bị hủy. Lý do: ${reason}`, "system");
            document.getElementById("cancelInterviewModal").classList.remove("show");
            pendingCancelIndex = null;
            alert("Đã hủy lịch phỏng vấn!");
        }
    });
    
    document.getElementById("cancelNoBtn")?.addEventListener("click", () => {
        document.getElementById("cancelInterviewModal").classList.remove("show");
        pendingCancelIndex = null;
    });
    document.getElementById("closeCancelModal")?.addEventListener("click", () => {
        document.getElementById("cancelInterviewModal").classList.remove("show");
        pendingCancelIndex = null;
    });
    
    document.getElementById("editInterviewForm")?.addEventListener("submit", function(e) {
        e.preventDefault();
        const idx = parseInt(document.getElementById("editInterviewId").value);
        let allInterviews = JSON.parse(localStorage.getItem("hr_interviews")) || interviews;
        allInterviews[idx] = { ...allInterviews[idx],
            date: document.getElementById("editInterviewDate").value,
            time: document.getElementById("editInterviewTime").value,
            type: document.getElementById("editInterviewType").value,
            location: document.getElementById("editInterviewLocation").value,
            status: document.getElementById("editInterviewStatus").value
        };
        localStorage.setItem("hr_interviews", JSON.stringify(allInterviews));
        interviews = allInterviews;
        renderInterviews();
        addActivity("✏️ Cập nhật lịch phỏng vấn");
        document.getElementById("editInterviewModal").classList.remove("show");
        alert("Đã cập nhật!");
    });
    
    // ==================== JOB POSTING MODAL ====================
    let currentStep = 1;
    function showStep(step) {
        currentStep = step;
        document.getElementById("step1").classList.toggle("active", step === 1);
        document.getElementById("step2").classList.toggle("active", step === 2);
        document.getElementById("step3").classList.toggle("active", step === 3);
        document.querySelectorAll(".step").forEach((el, i) => el.classList.toggle("active", i + 1 === step));
    }
    
    document.getElementById("btn-add-job")?.addEventListener("click", () => { document.getElementById("jobPostModal").classList.add("show"); showStep(1); });
    document.getElementById("closeJobPostModal")?.addEventListener("click", () => document.getElementById("jobPostModal").classList.remove("show"));
    document.getElementById("nextToStep2")?.addEventListener("click", () => showStep(2));
    document.getElementById("backToStep1")?.addEventListener("click", () => showStep(1));
    document.getElementById("nextToStep3")?.addEventListener("click", () => showStep(3));
    document.getElementById("backToStep2")?.addEventListener("click", () => showStep(2));
    
    // ==================== MENU NAVIGATION ====================
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelectorAll(".menu-item").forEach(m => m.classList.remove("active"));
            document.querySelectorAll(".view-section").forEach(s => s.classList.remove("active"));
            this.classList.add("active");
            const target = this.dataset.target;
            document.getElementById(target)?.classList.add("active");
            
            if (target === "view-candidates") renderCandidates();
            if (target === "view-jobs") renderJobs();
            if (target === "view-interviews") renderInterviews();
            if (target === "view-search") searchCandidates();
        });
    });
    
    // ==================== CLOSE MODALS ====================
    document.getElementById("closeCvModal")?.addEventListener("click", () => document.getElementById("cvModal").classList.remove("show"));
    document.getElementById("closeCreateInterviewModal")?.addEventListener("click", () => document.getElementById("createInterviewModal").classList.remove("show"));
    document.getElementById("closeEditInterviewModal")?.addEventListener("click", () => document.getElementById("editInterviewModal").classList.remove("show"));
    window.onclick = (e) => {
        if (e.target.classList?.contains("modal")) e.target.classList.remove("show");
    };
    
    // ==================== FILTERS & SEARCH ====================
    document.getElementById("candidateFilter")?.addEventListener("change", () => renderCandidates());
    document.getElementById("positionFilter")?.addEventListener("change", () => renderCandidates());
    document.getElementById("interviewSearch")?.addEventListener("input", () => renderInterviews());
    document.querySelectorAll(".filter-tab").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll("#view-interviews .filter-tab").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            renderInterviews();
        });
    });
    
    document.getElementById("refreshDashboardBtn")?.addEventListener("click", () => {
        renderJobs();
        renderCandidates();
        renderInterviews();
        renderActivityFeed();
        updateStats();
        addActivity("🔄 Làm mới dữ liệu");
        alert("Đã làm mới!");
    });
    
    window.approveCandidate = approveCandidate;
    window.rejectCandidate = rejectCandidate;
    window.searchCandidates = searchCandidates;
    window.toggleNotificationPanel = toggleNotificationPanel;
    window.markAllNotificationsRead = markAllNotificationsRead;
    
    // KHỞI TẠO
    renderJobs();
    renderCandidates();
    renderInterviews();
    renderActivityFeed();
    renderNotifications();
    updateStats();
    
    const positionFilter = document.getElementById("positionFilter");
    if (positionFilter) {
        const positions = [...new Set(candidates.map(c => c.position))];
        positions.forEach(pos => { const option = document.createElement("option"); option.value = pos; option.textContent = pos; positionFilter.appendChild(option); });
    }
});
