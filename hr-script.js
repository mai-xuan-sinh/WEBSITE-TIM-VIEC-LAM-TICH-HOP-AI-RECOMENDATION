document.addEventListener("DOMContentLoaded", () => {
    // ==================== TẠO 1 TÀI KHOẢN HR CỐ ĐỊNH DUY NHẤT ====================
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
    
    // Lưu tài khoản HR cố định vào localStorage
    localStorage.setItem("hrAccounts", JSON.stringify([fixedHRUser]));
    
    // Đồng thời lưu vào users
    let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    
    const hrExists = existingUsers.some(u => u.email === fixedHRUser.email);
    if (!hrExists) {
        existingUsers.push(fixedHRUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));
    }
    
    console.log("=== TÀI KHOẢN HR CỐ ĐỊNH ===");
    console.log("Email: hr@danangwork.com");
    console.log("Mật khẩu: 123456");
    console.log("Role mong đợi: hr");
    console.log("============================");
    
    // ==================== KIỂM TRA ĐĂNG NHẬP ====================
    let currentUser = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser");
    
    console.log("CurrentUser từ localStorage:", currentUser);
    
    if (currentUser) {
        try {
            currentUser = JSON.parse(currentUser);
            console.log("CurrentUser role:", currentUser.role);
        } catch(e) {
            console.log("Lỗi parse currentUser:", e);
            currentUser = null;
        }
    }
    
    const authGuardEl = document.getElementById("hr-auth-guard");
    const appLayoutEl = document.querySelector(".app-layout");
    
    // ========== QUAN TRỌNG: SỬA ĐIỀU KIỆN Ở ĐÂY ==========
    // Kiểm tra role là "hr" HOẶC "employer"
    const isValidHR = currentUser && (currentUser.role === "hr" || currentUser.role === "employer");
    
    console.log("isValidHR:", isValidHR);
    console.log("currentUser?.role:", currentUser?.role);
    
    if (!isValidHR) {
        // Chưa đăng nhập hoặc không phải HR -> hiển thị auth guard
        if (authGuardEl) authGuardEl.style.display = "flex";
        if (appLayoutEl) appLayoutEl.style.display = "none";
        return;
    }
    
    // Đã đăng nhập HR -> ẩn auth guard, hiển thị dashboard
    if (authGuardEl) authGuardEl.style.display = "none";
    if (appLayoutEl) appLayoutEl.style.display = "flex";
    
    const hrNameEl = document.getElementById("hrName");
    const hrCompanyEl = document.getElementById("hrCompanyName");
    
    if (hrNameEl) {
        hrNameEl.innerText = currentUser.username || currentUser.name || currentUser.fullname || "HR Manager";
    }
    if (hrCompanyEl) {
        hrCompanyEl.innerText = currentUser.company?.name || "Công ty Công nghệ Đà Nẵng";
    }
    
    // ==================== ĐĂNG XUẤT ====================
    const logoutBtn = document.getElementById("hrLogoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            sessionStorage.removeItem("currentUser");
            window.location.href = "login.html";
        });
    }
    
    // ==================== DATA MODELS ====================
    let jobs = JSON.parse(localStorage.getItem("hr_jobs")) || [];
    let candidates = JSON.parse(localStorage.getItem("hr_candidates")) || [
        { id: 1, name: "Trần Văn A", position: "Frontend Dev", date: "Hôm nay", status: "approved", email: "a@email.com", phone: "0912345678", address: "Hải Châu, Đà Nẵng", skills: ["React", "JavaScript"], experience: "3 năm" },
        { id: 2, name: "Lê Thị B", position: "UI/UX Designer", date: "Hôm qua", status: "approved", email: "b@email.com", phone: "0923456789", address: "Sơn Trà, Đà Nẵng", skills: ["Figma", "Adobe XD"], experience: "4 năm" },
        { id: 3, name: "Nguyễn Văn C", position: "Backend Developer", date: "2 ngày trước", status: "pending", email: "c@email.com", phone: "0934567890", address: "Liên Chiểu, Đà Nẵng", skills: ["Node.js", "Python"], experience: "5 năm" },
        { id: 4, name: "Phạm Thị D", position: "Data Analyst", date: "3 ngày trước", status: "pending", email: "d@email.com", phone: "0945678901", address: "Ngũ Hành Sơn, Đà Nẵng", skills: ["SQL", "Python"], experience: "2 năm" },
        { id: 5, name: "Hoàng Văn E", position: "Marketing Specialist", date: "4 ngày trước", status: "pending", email: "e@email.com", phone: "0956789012", address: "Thanh Khê, Đà Nẵng", skills: ["SEO", "Content Marketing"], experience: "3 năm" }
    ];
    let interviews = JSON.parse(localStorage.getItem("hr_interviews")) || [];
    let activities = JSON.parse(localStorage.getItem("hr_activities")) || ["✨ Chào mừng bạn đến với HR Pro"];
    
    // Tạo lịch phỏng vấn mẫu nếu chưa có
    if (interviews.length === 0) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        interviews = [
            {
                id: Date.now(),
                candidate: "Trần Văn A",
                position: "Frontend Dev",
                date: tomorrow.toISOString().split('T')[0],
                time: "09:00",
                type: "online",
                location: "https://meet.google.com/example",
                interviewer: "HR Manager",
                duration: "45",
                note: "Mang theo portfolio",
                status: "upcoming"
            },
            {
                id: Date.now() + 1,
                candidate: "Lê Thị B",
                position: "UI/UX Designer",
                date: tomorrow.toISOString().split('T')[0],
                time: "14:00",
                type: "offline",
                location: "Văn phòng công ty - Tầng 5, Tòa nhà B, Đà Nẵng",
                interviewer: "HR Manager, Team Lead",
                duration: "60",
                note: "Mang theo hồ sơ in và portfolio",
                status: "upcoming"
            }
        ];
        localStorage.setItem("hr_interviews", JSON.stringify(interviews));
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
            if (activities.length === 0) {
                feed.innerHTML = '<li>✨ Chào mừng bạn đến với HR Pro</li>';
            } else {
                feed.innerHTML = activities.slice(0, 8).map(function(a) {
                    return '<li><span class="dot"></span> ' + escapeHtml(a) + '</li>';
                }).join('');
            }
        }
    }
    
    function updateStats() {
        const activeJobs = document.getElementById("dash-active-jobs");
        const pendingCv = document.getElementById("dash-pending-cv");
        const interviewsCount = document.getElementById("dash-interviews");
        const approvedCount = document.getElementById("dash-approved");
        const approvalRate = document.getElementById("approvalRate");
        
        if (activeJobs) activeJobs.innerText = jobs.filter(function(j) { return j.status === 'active'; }).length;
        if (pendingCv) pendingCv.innerText = candidates.filter(function(c) { return c.status === 'pending'; }).length;
        if (interviewsCount) interviewsCount.innerText = interviews.length;
        
        const approved = candidates.filter(function(c) { return c.status === 'approved'; }).length;
        if (approvedCount) approvedCount.innerText = approved;
        
        const total = candidates.length;
        if (approvalRate && total > 0) {
            const rate = Math.round((approved / total) * 100);
            approvalRate.innerText = rate + "%";
        } else if (approvalRate) {
            approvalRate.innerText = "0%";
        }
        
        const activeCompanies = document.getElementById("activeCompanies");
        if (activeCompanies) activeCompanies.innerText = "1";
    }
    
    // ==================== RENDER JOBS ====================
    function renderJobs() {
        const container = document.getElementById("job-cards-container");
        if (!container) return;
        if (jobs.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fa-solid fa-briefcase"></i><h3>Chưa có tin tuyển dụng</h3><p>Nhấn "Đăng tin mới" để tạo tin tuyển dụng</p></div>';
        } else {
            var html = '';
            for (var i = 0; i < jobs.length; i++) {
                var job = jobs[i];
                html += '<div class="job-card">';
                html += '<div class="job-card-header"><div class="job-card-title">' + escapeHtml(job.title) + '</div><div class="job-card-salary">' + escapeHtml(job.salary) + '</div></div>';
                html += '<div class="job-card-details"><div class="job-card-detail"><i class="fa-regular fa-calendar"></i> Hạn: ' + (job.deadline || job.postDate || 'Chưa cập nhật') + '</div><div class="job-card-detail"><i class="fa-solid fa-location-dot"></i> ' + (job.location || 'Đà Nẵng') + '</div></div>';
                html += '<div class="job-card-footer"><span class="tag ' + (job.status === 'active' ? 'tag-success' : 'tag-warning') + '">' + (job.status === 'active' ? 'Đang mở' : 'Đã đóng') + '</span>';
                html += '<div><button class="btn-sm" style="color:var(--danger)" onclick="deleteJob(' + i + ')"><i class="fa-solid fa-trash"></i> Xóa</button></div></div></div>';
            }
            container.innerHTML = html;
        }
        updateStats();
        localStorage.setItem("hr_jobs", JSON.stringify(jobs));
    }
    
    window.deleteJob = function(idx) {
        if (confirm("Xóa tin này?")) {
            var title = jobs[idx].title;
            jobs.splice(idx, 1);
            renderJobs();
            addActivity('🗑️ Xóa tin: ' + title);
        }
    };
    
    // ==================== RENDER CANDIDATES ====================
    function renderCandidates() {
        const container = document.getElementById("candidate-list");
        if (!container) return;
        
        var data = JSON.parse(localStorage.getItem("hr_candidates")) || candidates;
        var filterValue = document.getElementById("candidateFilter")?.value || "all";
        var positionValue = document.getElementById("positionFilter")?.value || "all";
        
        var filtered = data;
        if (filterValue !== "all") {
            filtered = filtered.filter(function(c) { return c.status === filterValue; });
        }
        if (positionValue !== "all") {
            filtered = filtered.filter(function(c) { return c.position === positionValue; });
        }
        
        var html = '';
        for (var i = 0; i < filtered.length; i++) {
            var c = filtered[i];
            var statusText = c.status === 'pending' ? 'Chờ duyệt' : (c.status === 'approved' ? 'Đã duyệt' : 'Từ chối');
            var statusClass = c.status === 'pending' ? 'tag-warning' : (c.status === 'approved' ? 'tag-success' : 'tag-danger');
            
            html += '<tr>';
            html += '<td><strong>' + escapeHtml(c.name) + '</strong></td>';
            html += '<td>' + escapeHtml(c.position) + '</td>';
            html += '<td>' + c.date + '</td>';
            html += '<td><span class="tag ' + statusClass + '">' + statusText + '</span></td>';
            html += '<td>';
            html += '<button class="btn-sm view-cv-btn" data-id="' + c.id + '"><i class="fa-solid fa-eye"></i> Xem CV</button>';
            
            if (c.status === 'pending') {
                html += '<button class="btn-sm btn-primary approve-cv-btn" data-id="' + c.id + '" style="background:#10b981;color:white;margin-left:5px;"><i class="fa-solid fa-check"></i> Duyệt</button>';
                html += '<button class="btn-sm reject-cv-btn" data-id="' + c.id + '" style="background:#ef4444;color:white;margin-left:5px;"><i class="fa-solid fa-times"></i> Từ chối</button>';
            }
            
            if (c.status === 'approved') {
                html += '<button class="btn-sm create-interview-btn" data-id="' + c.id + '" data-name="' + escapeHtml(c.name) + '" data-position="' + escapeHtml(c.position) + '" style="background:#2d3b8c;color:white;margin-left:5px;"><i class="fa-regular fa-calendar-plus"></i> Tạo lịch PV</button>';
            }
            
            html += '</td></tr>';
        }
        
        container.innerHTML = html;
        
        document.querySelectorAll(".view-cv-btn").forEach(function(btn) {
            btn.onclick = function() {
                var id = parseInt(this.dataset.id);
                var candidate = data.find(function(c) { return c.id === id; });
                if (candidate) showCVModal(candidate);
            };
        });
        
        document.querySelectorAll(".approve-cv-btn").forEach(function(btn) {
            btn.onclick = function() {
                var id = parseInt(this.dataset.id);
                var candidatesData = JSON.parse(localStorage.getItem("hr_candidates")) || data;
                var candidate = candidatesData.find(function(c) { return c.id === id; });
                if (candidate && candidate.status === 'pending') {
                    candidate.status = "approved";
                    localStorage.setItem("hr_candidates", JSON.stringify(candidatesData));
                    renderCandidates();
                    addActivity('✅ Đã duyệt hồ sơ của ' + candidate.name);
                    alert('✅ Đã duyệt hồ sơ của ' + candidate.name);
                }
            };
        });
        
        document.querySelectorAll(".reject-cv-btn").forEach(function(btn) {
            btn.onclick = function() {
                var id = parseInt(this.dataset.id);
                if (confirm("Từ chối hồ sơ này?")) {
                    var candidatesData = JSON.parse(localStorage.getItem("hr_candidates")) || data;
                    var candidate = candidatesData.find(function(c) { return c.id === id; });
                    if (candidate && candidate.status === 'pending') {
                        candidate.status = "rejected";
                        localStorage.setItem("hr_candidates", JSON.stringify(candidatesData));
                        renderCandidates();
                        addActivity('❌ Đã từ chối hồ sơ của ' + candidate.name);
                        alert('❌ Đã từ chối hồ sơ của ' + candidate.name);
                    }
                }
            };
        });
        
        document.querySelectorAll(".create-interview-btn").forEach(function(btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                var id = parseInt(this.dataset.id);
                var name = this.dataset.name;
                var position = this.dataset.position;
                
                var modal = document.getElementById("createInterviewModal");
                if (modal) {
                    document.getElementById("createInterviewCandidateId").value = id;
                    document.getElementById("createInterviewCandidate").value = name;
                    document.getElementById("createInterviewPosition").value = position;
                    
                    var tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    document.getElementById("createInterviewDate").value = tomorrow.toISOString().split('T')[0];
                    document.getElementById("createInterviewTime").value = "09:00";
                    document.getElementById("createInterviewType").value = "online";
                    document.getElementById("createInterviewDuration").value = "45";
                    
                    modal.classList.add("show");
                }
            };
        });
        
        updateStats();
    }
    
    // ==================== CV MODAL ====================
    function showCVModal(candidate) {
        var modal = document.getElementById("cvModal");
        var cvContent = document.getElementById("cvContent");
        var cvActions = document.getElementById("cvActions");
        if (!modal || !cvContent) return;
        
        cvContent.innerHTML = '<div class="cv-avatar"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=' + encodeURIComponent(candidate.name) + '&backgroundColor=2d3b8c" style="width:120px;height:120px;border-radius:50%;"></div>' +
            '<div class="cv-info">' +
            '<h2>' + escapeHtml(candidate.name) + '</h2>' +
            '<p><i class="fa-solid fa-briefcase"></i> <strong>Vị trí:</strong> ' + escapeHtml(candidate.position) + '</p>' +
            '<p><i class="fa-solid fa-envelope"></i> <strong>Email:</strong> ' + escapeHtml(candidate.email) + '</p>' +
            '<p><i class="fa-solid fa-phone"></i> <strong>SĐT:</strong> ' + escapeHtml(candidate.phone) + '</p>' +
            '<p><i class="fa-solid fa-location-dot"></i> <strong>Địa chỉ:</strong> ' + escapeHtml(candidate.address) + '</p>' +
            '<p><i class="fa-solid fa-calendar"></i> <strong>Ngày nộp:</strong> ' + candidate.date + '</p>' +
            '<div class="cv-skills"><strong>Kỹ năng:</strong><div class="skills-tags">' + (candidate.skills || []).map(function(s) { return '<span class="skill-tag">' + escapeHtml(s) + '</span>'; }).join('') + '</div></div>' +
            '<div class="cv-experience"><strong>Kinh nghiệm:</strong><p>' + escapeHtml(candidate.experience) + '</p></div>' +
            '</div>';
        
        if (candidate.status === 'pending') {
            cvActions.innerHTML = '<button class="btn-primary" id="cvApproveBtn">Duyệt hồ sơ</button><button class="btn-outline" id="cvRejectBtn">Từ chối</button><button class="btn-outline" id="cvCloseBtn">Đóng</button>';
            var approveBtn = document.getElementById("cvApproveBtn");
            var rejectBtn = document.getElementById("cvRejectBtn");
            var closeBtn = document.getElementById("cvCloseBtn");
            if (approveBtn) {
                approveBtn.onclick = function() {
                    var candidatesData = JSON.parse(localStorage.getItem("hr_candidates"));
                    var c = candidatesData.find(function(cand) { return cand.id === candidate.id; });
                    if (c) c.status = "approved";
                    localStorage.setItem("hr_candidates", JSON.stringify(candidatesData));
                    renderCandidates();
                    modal.classList.remove("show");
                    alert('✅ Đã duyệt hồ sơ của ' + candidate.name);
                };
            }
            if (rejectBtn) rejectBtn.onclick = function() { modal.classList.remove("show"); };
            if (closeBtn) closeBtn.onclick = function() { modal.classList.remove("show"); };
        } else {
            cvActions.innerHTML = '<button class="btn-outline" id="cvCloseBtn">Đóng</button>';
            var closeBtn2 = document.getElementById("cvCloseBtn");
            if (closeBtn2) closeBtn2.onclick = function() { modal.classList.remove("show"); };
        }
        modal.classList.add("show");
    }
    
    // ==================== RENDER INTERVIEWS ====================
    function renderInterviews() {
        const container = document.getElementById("interviews-container");
        const emptyState = document.getElementById("interview-empty-state");
        if (!container) return;
        
        var allInterviews = JSON.parse(localStorage.getItem("hr_interviews")) || interviews;
        
        if (allInterviews.length === 0) {
            container.innerHTML = "";
            if (emptyState) emptyState.style.display = "block";
            updateStats();
            return;
        }
        
        if (emptyState) emptyState.style.display = "none";
        
        var html = '';
        for (var idx = 0; idx < allInterviews.length; idx++) {
            var i = allInterviews[idx];
            var date = new Date(i.date);
            var statusClass = i.status === 'upcoming' ? 'status-upcoming' : (i.status === 'completed' ? 'status-completed' : 'status-cancelled');
            var statusText = i.status === 'upcoming' ? 'Sắp diễn ra' : (i.status === 'completed' ? 'Đã hoàn thành' : 'Đã hủy');
            var typeIcon = i.type === 'online' ? 'fa-video' : (i.type === 'phone' ? 'fa-phone' : 'fa-building');
            var typeText = i.type === 'online' ? 'Online' : (i.type === 'phone' ? 'Phone' : 'Offline');
            html += '<div class="interview-card">';
            html += '<div class="interview-card-header">';
            html += '<h4>' + escapeHtml(i.position) + '</h4>';
            html += '<div class="interview-position">' + escapeHtml(i.candidate) + '</div>';
            html += '<span class="interview-status ' + statusClass + '">' + statusText + '</span>';
            html += '</div>';
            html += '<div class="interview-card-body">';
            html += '<div class="interview-datetime">';
            html += '<div class="interview-date"><div class="day">' + date.getDate() + '</div><div class="month">Th' + (date.getMonth() + 1) + '</div></div>';
            html += '<div class="interview-time"><i class="fa-regular fa-clock"></i> ' + (i.time || '08:00') + ' (' + (i.duration || 45) + ' phút)</div>';
            html += '</div>';
            html += '<div class="interview-info">';
            html += '<p><i class="fa-solid ' + typeIcon + '"></i> Hình thức: ' + typeText + '</p>';
            html += '<p><i class="fa-solid fa-location-dot"></i> ' + (i.location || 'Chưa cập nhật') + '</p>';
            if (i.interviewer) html += '<p><i class="fa-solid fa-users"></i> Người PV: ' + escapeHtml(i.interviewer) + '</p>';
            html += '</div>';
            if (i.note) html += '<div class="interview-note"><i class="fa-regular fa-note-sticky"></i> ' + escapeHtml(i.note) + '</div>';
            html += '</div>';
            html += '<div class="interview-card-footer">';
            html += '<button class="btn-sm" onclick="editInterview(' + idx + ')"><i class="fa-solid fa-pen"></i> Sửa</button>';
            html += '<button class="btn-sm" style="color:var(--danger)" onclick="deleteInterview(' + idx + ')"><i class="fa-solid fa-trash"></i> Xóa</button>';
            
            if (i.status === 'upcoming') {
                html += '<button class="btn-sm btn-primary" onclick="completeInterview(' + idx + ')" style="background:#10b981;color:white;"><i class="fa-solid fa-check-circle"></i> Hoàn thành</button>';
                html += '<button class="btn-sm" style="background:#fef3c7;color:#d97706;border:none" onclick="openCancelModal(' + idx + ')"><i class="fa-solid fa-ban"></i> Hủy lịch</button>';
            }
            
            if (i.status === 'completed') {
                html += '<span class="tag tag-success" style="background:#dff9e6;color:#0b6e41;padding:6px 12px;border-radius:30px;font-size:12px;"><i class="fa-solid fa-check"></i> Đã hoàn thành</span>';
            }
            if (i.status === 'cancelled') {
                html += '<span class="tag tag-danger" style="background:#fee2e2;color:#b91c1c;padding:6px 12px;border-radius:30px;font-size:12px;"><i class="fa-solid fa-ban"></i> Đã hủy</span>';
            }
            
            html += '</div></div>';
        }
        
        container.innerHTML = html;
        
        var interviewsCount = document.getElementById("dash-interviews");
        if (interviewsCount) interviewsCount.innerText = allInterviews.length;
        localStorage.setItem("hr_interviews", JSON.stringify(allInterviews));
    }
    
    window.editInterview = function(idx) {
        var allInterviews = JSON.parse(localStorage.getItem("hr_interviews")) || interviews;
        var i = allInterviews[idx];
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
            var allInterviews = JSON.parse(localStorage.getItem("hr_interviews")) || [];
            var deleted = allInterviews[idx];
            allInterviews.splice(idx, 1);
            localStorage.setItem("hr_interviews", JSON.stringify(allInterviews));
            interviews = allInterviews;
            renderInterviews();
            addActivity('🗑️ Xóa lịch phỏng vấn: ' + (deleted ? deleted.candidate : 'không xác định'));
            alert("Đã xóa lịch phỏng vấn!");
        }
    };
    
    window.completeInterview = function(idx) {
        var allInterviews = JSON.parse(localStorage.getItem("hr_interviews")) || interviews;
        if (confirm("Xác nhận hoàn thành buổi phỏng vấn với " + allInterviews[idx].candidate + "?")) {
            allInterviews[idx].status = 'completed';
            localStorage.setItem("hr_interviews", JSON.stringify(allInterviews));
            interviews = allInterviews;
            renderInterviews();
            addActivity('✅ Hoàn thành phỏng vấn: ' + allInterviews[idx].candidate);
            alert("Đã đánh dấu hoàn thành buổi phỏng vấn!");
        }
    };
    
    // Cancel Interview
    var pendingCancelIndex = null;
    window.openCancelModal = function(idx) {
        pendingCancelIndex = idx;
        document.getElementById("cancelReason").value = "";
        document.getElementById("cancelInterviewModal").classList.add("show");
    };
    
    document.getElementById("cancelConfirmBtn")?.addEventListener("click", function() {
        if (pendingCancelIndex !== null) {
            var allInterviews = JSON.parse(localStorage.getItem("hr_interviews")) || interviews;
            var reason = document.getElementById("cancelReason").value.trim() || "Không có lý do";
            allInterviews[pendingCancelIndex].status = 'cancelled';
            allInterviews[pendingCancelIndex].cancelReason = reason;
            localStorage.setItem("hr_interviews", JSON.stringify(allInterviews));
            renderInterviews();
            addActivity('❌ Đã hủy lịch phỏng vấn của ' + allInterviews[pendingCancelIndex].candidate + ' - Lý do: ' + reason);
            document.getElementById("cancelInterviewModal").classList.remove("show");
            pendingCancelIndex = null;
            alert("Đã hủy lịch phỏng vấn!");
        }
    });
    
    document.getElementById("cancelNoBtn")?.addEventListener("click", function() {
        document.getElementById("cancelInterviewModal").classList.remove("show");
        pendingCancelIndex = null;
    });
    
    document.getElementById("closeCancelModal")?.addEventListener("click", function() {
        document.getElementById("cancelInterviewModal").classList.remove("show");
        pendingCancelIndex = null;
    });
    
    document.getElementById("editInterviewForm")?.addEventListener("submit", function(e) {
        e.preventDefault();
        var idx = parseInt(document.getElementById("editInterviewId").value);
        var allInterviews = JSON.parse(localStorage.getItem("hr_interviews")) || interviews;
        allInterviews[idx] = {
            ...allInterviews[idx],
            date: document.getElementById("editInterviewDate").value,
            time: document.getElementById("editInterviewTime").value,
            type: document.getElementById("editInterviewType").value,
            location: document.getElementById("editInterviewLocation").value,
            status: document.getElementById("editInterviewStatus").value
        };
        localStorage.setItem("hr_interviews", JSON.stringify(allInterviews));
        renderInterviews();
        addActivity("✏️ Cập nhật lịch phỏng vấn");
        document.getElementById("editInterviewModal").classList.remove("show");
        alert("Đã cập nhật!");
    });
    
    // ==================== TẠO LỊCH PHỎNG VẤN ====================
    var createForm = document.getElementById("createInterviewForm");
    if (createForm) {
        createForm.addEventListener("submit", function(e) {
            e.preventDefault();
            var candidateName = document.getElementById("createInterviewCandidate").value;
            var position = document.getElementById("createInterviewPosition").value;
            var interviewDate = document.getElementById("createInterviewDate").value;
            var interviewTime = document.getElementById("createInterviewTime").value;
            var interviewType = document.getElementById("createInterviewType").value;
            var interviewLocation = document.getElementById("createInterviewLocation").value;
            var interviewer = document.getElementById("createInterviewInterviewer").value;
            var duration = document.getElementById("createInterviewDuration").value;
            var note = document.getElementById("createInterviewNote").value;
            
            if (!candidateName || !position || !interviewDate || !interviewTime) {
                alert("❌ Vui lòng điền đầy đủ thông tin bắt buộc!");
                return;
            }
            
            var newInterview = {
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
            
            var allInterviews = JSON.parse(localStorage.getItem("hr_interviews")) || interviews;
            allInterviews.push(newInterview);
            localStorage.setItem("hr_interviews", JSON.stringify(allInterviews));
            interviews = allInterviews;
            
            renderInterviews();
            addActivity('📅 Đã tạo lịch phỏng vấn cho ' + candidateName + ' - ' + position);
            
            document.getElementById("createInterviewModal").classList.remove("show");
            alert("✅ Đã tạo lịch phỏng vấn thành công cho " + candidateName + "!");
            
            var interviewMenuItem = document.querySelector(".menu-item[data-target='view-interviews']");
            if (interviewMenuItem) interviewMenuItem.click();
            
            createForm.reset();
        });
    }
    
    // ==================== JOB POSTING ====================
    var jobPostModal = document.getElementById("jobPostModal");
    var step1 = document.getElementById("step1");
    var step2 = document.getElementById("step2");
    var step3 = document.getElementById("step3");
    var steps = [step1, step2, step3];
    var stepIndicators = document.querySelectorAll(".step");
    
    function showStep(stepIndex) {
        for (var i = 0; i < steps.length; i++) {
            if (steps[i]) steps[i].classList.toggle("active", i === stepIndex);
        }
        for (var i = 0; i < stepIndicators.length; i++) {
            if (stepIndicators[i]) stepIndicators[i].classList.toggle("active", i === stepIndex);
        }
    }
    
    var addJobBtn = document.getElementById("btn-add-job");
    if (addJobBtn) {
        addJobBtn.addEventListener("click", function() {
            if (jobPostModal) jobPostModal.classList.add("show");
            showStep(0);
        });
    }
    
    var closeJobModal = document.getElementById("closeJobPostModal");
    if (closeJobModal) {
        closeJobModal.addEventListener("click", function() {
            if (jobPostModal) jobPostModal.classList.remove("show");
        });
    }
    
    var refreshBtn = document.getElementById("refreshDashboardBtn");
    if (refreshBtn) {
        refreshBtn.addEventListener("click", function() {
            renderJobs();
            renderCandidates();
            renderInterviews();
            renderActivityFeed();
            updateStats();
            addActivity("🔄 Làm mới dữ liệu");
            alert("Đã làm mới!");
        });
    }
    
    // Menu navigation
    var menuItems = document.querySelectorAll(".menu-item");
    for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener("click", function(e) {
            e.preventDefault();
            for (var j = 0; j < menuItems.length; j++) {
                menuItems[j].classList.remove("active");
            }
            this.classList.add("active");
            var sections = document.querySelectorAll(".view-section");
            for (var j = 0; j < sections.length; j++) {
                sections[j].classList.remove("active");
            }
            var target = this.getAttribute("data-target");
            var targetEl = document.getElementById(target);
            if (targetEl) targetEl.classList.add("active");
        });
    }
    
    // Close modals
    var closeCvBtn = document.getElementById("closeCvModal");
    if (closeCvBtn) {
        closeCvBtn.addEventListener("click", function() {
            var modal = document.getElementById("cvModal");
            if (modal) modal.classList.remove("show");
        });
    }
    
    var closeCreateBtn = document.getElementById("closeCreateInterviewModal");
    if (closeCreateBtn) {
        closeCreateBtn.addEventListener("click", function() {
            var modal = document.getElementById("createInterviewModal");
            if (modal) modal.classList.remove("show");
        });
    }
    
    var closeEditBtn = document.getElementById("closeEditInterviewModal");
    if (closeEditBtn) {
        closeEditBtn.addEventListener("click", function() {
            var modal = document.getElementById("editInterviewModal");
            if (modal) modal.classList.remove("show");
        });
    }
    
    window.onclick = function(e) {
        if (e.target === jobPostModal) jobPostModal.classList.remove("show");
        if (e.target === document.getElementById("cvModal")) document.getElementById("cvModal").classList.remove("show");
        if (e.target === document.getElementById("createInterviewModal")) document.getElementById("createInterviewModal").classList.remove("show");
        if (e.target === document.getElementById("editInterviewModal")) document.getElementById("editInterviewModal").classList.remove("show");
        if (e.target === document.getElementById("cancelInterviewModal")) document.getElementById("cancelInterviewModal").classList.remove("show");
    };
    
    // Khởi tạo
    renderJobs();
    renderCandidates();
    renderInterviews();
    renderActivityFeed();
    updateStats();
    
    // Cập nhật filter options cho vị trí
    var positionFilter = document.getElementById("positionFilter");
    if (positionFilter) {
        var positions = [...new Set(candidates.map(c => c.position))];
        positions.forEach(pos => {
            var option = document.createElement("option");
            option.value = pos;
            option.textContent = pos;
            positionFilter.appendChild(option);
        });
        
        positionFilter.addEventListener("change", function() {
            renderCandidates();
        });
    }
    
    var candidateFilter = document.getElementById("candidateFilter");
    if (candidateFilter) {
        candidateFilter.addEventListener("change", function() {
            renderCandidates();
        });
    }
    
    var interviewSearch = document.getElementById("interviewSearch");
    if (interviewSearch) {
        interviewSearch.addEventListener("input", function() { renderInterviews(); });
    }
    
    var filterTabs = document.querySelectorAll(".filter-tab");
    for (var i = 0; i < filterTabs.length; i++) {
        filterTabs[i].addEventListener("click", function() {
            for (var j = 0; j < filterTabs.length; j++) {
                filterTabs[j].classList.remove("active");
            }
            this.classList.add("active");
            renderInterviews();
        });
    }
});