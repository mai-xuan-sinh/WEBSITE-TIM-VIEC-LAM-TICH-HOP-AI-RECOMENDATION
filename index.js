// ================== BIẾN TOÀN CỤC ==================
let currentUser = null;
let allJobsData = [];

// ================== LẤY JOBS TỪ NHIỀU NGUỒN ==================
function getAllJobsFromStorage() {
    let combined = [];
    
    // Lấy từ jobs-data.js
    if (typeof allJobs !== 'undefined' && allJobs.length > 0) {
        combined = [...allJobs];
    }
    
    // Lấy từ localStorage jobs (nơi Admin duyệt)
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    
    // Lấy từ hr_jobs (nơi HR đăng tin)
    const hrJobs = JSON.parse(localStorage.getItem("hr_jobs")) || [];
    
    // Gộp tất cả
    combined = [...combined, ...storedJobs, ...hrJobs];
    
    // Lọc chỉ lấy jobs có status = "active" hoặc "approved"
    const activeJobs = combined.filter(job => {
        if (job.status && job.status !== 'active' && job.status !== 'approved') {
            return false;
        }
        return job.title && job.title.trim() !== '';
    });
    
    // Loại bỏ trùng lặp theo id
    const uniqueJobs = [];
    const ids = new Set();
    for (const job of activeJobs) {
        if (!ids.has(job.id)) {
            ids.add(job.id);
            uniqueJobs.push(job);
        }
    }
    
    // Sắp xếp theo id mới nhất lên đầu
    uniqueJobs.sort((a, b) => b.id - a.id);
    
    return uniqueJobs;
}

// ================== LOAD DỮ LIỆU ==================
function loadJobsData() {
    // Lấy jobs từ nhiều nguồn
    allJobsData = getAllJobsFromStorage();
    
    if (allJobsData.length > 0) {
        console.log('✅ Đã tải', allJobsData.length, 'công việc');
        return true;
    }
    
    // Fallback: chờ jobs-data.js load
    if (typeof allJobs !== 'undefined' && allJobs.length > 0) {
        allJobsData = getAllJobsFromStorage();
        return true;
    }
    
    return false;
}

// ================== CẬP NHẬT UI AUTH ==================
function updateAuthUI() {
    const authDiv = document.getElementById('authButtons');
    const userDiv = document.getElementById('userBox');
    
    if (!authDiv || !userDiv) return;
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (user) {
        currentUser = user;
        authDiv.style.display = 'none';
        userDiv.style.display = 'block';
        userDiv.innerHTML = `
            <div class="user-info">
                <div class="user-avatar" onclick="goToProfile()" style="cursor: pointer;">${(user.name || user.fullname || 'U').charAt(0).toUpperCase()}</div>
                <span class="user-name" onclick="goToProfile()" style="cursor: pointer;">${escapeHtml(user.name || user.fullname || user.email?.split('@')[0])}</span>
                <button class="logout-btn" onclick="handleLogout()">Đăng xuất</button>
            </div>
        `;
    } else {
        currentUser = null;
        authDiv.style.display = 'flex';
        userDiv.style.display = 'none';
        userDiv.innerHTML = '';
    }
}

function goToProfile() {
    window.location.href = 'profile.html';
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

function handleLogout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('rememberUser');
    window.location.href = 'index.html';
}

// ================== RENDER AI RECOMMENDATIONS ==================
function renderAIRecommendations() {
    const container = document.getElementById('aiRecommendations');
    if (!container) return;
    
    // Đảm bảo dữ liệu jobs được cập nhật
    if (allJobsData.length === 0) {
        allJobsData = getAllJobsFromStorage();
    }
    
    if (!allJobsData || allJobsData.length === 0) {
        container.innerHTML = '<div class="loading-ai"><i class="fas fa-spinner fa-pulse"></i> Đang tải dữ liệu...</div>';
        return;
    }
    
    // Nếu chưa đăng nhập hoặc không có AI engine, hiển thị job phổ biến
    if (!currentUser || typeof aiEngine === 'undefined') {
        const popularJobs = allJobsData.slice(0, 6);
        container.innerHTML = popularJobs.map(job => `
            <div class="job-card ai-card">
                <div class="match-percent">Phổ biến</div>
                <div class="job-title">${escapeHtml(job.title)}</div>
                <div class="company"><i class="fas fa-building"></i> ${escapeHtml(job.company)}</div>
                <div class="details">
                    <span><i class="fas fa-map-pin"></i> ${escapeHtml(job.location || job.district || 'Đà Nẵng')}</span>
                    <span><i class="fas fa-money-bill-wave"></i> ${escapeHtml(job.salary || 'Thỏa thuận')}</span>
                </div>
                <div class="tech-stack">${(job.skills || []).slice(0, 3).map(s => `<span>${escapeHtml(s)}</span>`).join('')}</div>
                <button class="apply-btn" onclick="goToJobDetail(${job.id})">Xem chi tiết</button>
            </div>
        `).join('');
        return;
    }
    
    // Dùng AI để gợi ý
    if (aiEngine && aiEngine.recommendJobsForCandidate) {
        const recommendations = aiEngine.recommendJobsForCandidate(currentUser.id || currentUser.email, 6);
        
        if (recommendations && recommendations.length > 0) {
            container.innerHTML = recommendations.map(job => `
                <div class="job-card ai-card">
                    <div class="match-percent">${Math.min(Math.floor((job.score || 0) / 10), 99)}% phù hợp</div>
                    <div class="job-title">${escapeHtml(job.title)}</div>
                    <div class="company"><i class="fas fa-building"></i> ${escapeHtml(job.company)}</div>
                    <div class="details">
                        <span><i class="fas fa-map-pin"></i> ${escapeHtml(job.location || job.district || 'Đà Nẵng')}</span>
                        <span><i class="fas fa-money-bill-wave"></i> ${escapeHtml(job.salary || 'Thỏa thuận')}</span>
                    </div>
                    <div class="tech-stack">${(job.skills || []).slice(0, 3).map(s => `<span>${escapeHtml(s)}</span>`).join('')}</div>
                    <button class="apply-btn" onclick="goToJobDetail(${job.id})">Xem chi tiết</button>
                </div>
            `).join('');
        } else {
            // Fallback: hiển thị job phổ biến
            const popularJobs = allJobsData.slice(0, 6);
            container.innerHTML = popularJobs.map(job => `
                <div class="job-card ai-card">
                    <div class="match-percent">Đề xuất</div>
                    <div class="job-title">${escapeHtml(job.title)}</div>
                    <div class="company"><i class="fas fa-building"></i> ${escapeHtml(job.company)}</div>
                    <div class="details">
                        <span><i class="fas fa-map-pin"></i> ${escapeHtml(job.location || job.district || 'Đà Nẵng')}</span>
                        <span><i class="fas fa-money-bill-wave"></i> ${escapeHtml(job.salary || 'Thỏa thuận')}</span>
                    </div>
                    <div class="tech-stack">${(job.skills || []).slice(0, 3).map(s => `<span>${escapeHtml(s)}</span>`).join('')}</div>
                    <button class="apply-btn" onclick="goToJobDetail(${job.id})">Xem chi tiết</button>
                </div>
            `).join('');
        }
    } else {
        // Fallback khi AI engine chưa sẵn sàng
        const popularJobs = allJobsData.slice(0, 6);
        container.innerHTML = popularJobs.map(job => `
            <div class="job-card ai-card">
                <div class="match-percent">Đề xuất</div>
                <div class="job-title">${escapeHtml(job.title)}</div>
                <div class="company"><i class="fas fa-building"></i> ${escapeHtml(job.company)}</div>
                <div class="details">
                    <span><i class="fas fa-map-pin"></i> ${escapeHtml(job.location || job.district || 'Đà Nẵng')}</span>
                    <span><i class="fas fa-money-bill-wave"></i> ${escapeHtml(job.salary || 'Thỏa thuận')}</span>
                </div>
                <div class="tech-stack">${(job.skills || []).slice(0, 3).map(s => `<span>${escapeHtml(s)}</span>`).join('')}</div>
                <button class="apply-btn" onclick="goToJobDetail(${job.id})">Xem chi tiết</button>
            </div>
        `).join('');
    }
}

// ================== XỬ LÝ ỨNG TUYỂN ==================
function applyJob(jobId) {
    // Đảm bảo dữ liệu jobs được cập nhật
    if (allJobsData.length === 0) {
        allJobsData = getAllJobsFromStorage();
    }
    
    const job = allJobsData.find(j => j.id == jobId);
    if (!job) return;
    
    if (!currentUser) {
        if (confirm('Bạn cần đăng nhập để ứng tuyển. Đăng nhập ngay?')) {
            window.location.href = 'login.html';
        }
        return;
    }
    
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    const alreadyApplied = applications.some(app => app.jobId === jobId && app.userEmail === currentUser.email);
    
    if (!alreadyApplied) {
        const newApplication = {
            id: Date.now(),
            jobId: job.id,
            jobTitle: job.title,
            company: job.company,
            location: job.location || job.district,
            salary: job.salary,
            userEmail: currentUser.email,
            userName: currentUser.name || currentUser.fullname,
            date: new Date().toLocaleDateString('vi-VN'),
            status: 'pending'
        };
        applications.push(newApplication);
        localStorage.setItem('applications', JSON.stringify(applications));
        
        // Cập nhật hr_candidates
        let hrCandidates = JSON.parse(localStorage.getItem('hr_candidates')) || [];
        const existingIndex = hrCandidates.findIndex(c => 
            c.jobId === jobId && (c.email === currentUser.email || c.candidateEmail === currentUser.email)
        );
        
        if (existingIndex === -1) {
            const newCandidate = {
                id: newApplication.id,
                name: newApplication.userName,
                email: currentUser.email,
                candidateEmail: currentUser.email,
                phone: currentUser.phone || '',
                position: job.title,
                company: job.company,
                jobId: jobId,
                skills: [],
                experience: '',
                education: '',
                address: '',
                intro: '',
                date: newApplication.date,
                fullDate: new Date().toISOString(),
                status: 'pending'
            };
            hrCandidates.push(newCandidate);
            localStorage.setItem('hr_candidates', JSON.stringify(hrCandidates));
        }
        
        // Track AI behavior
        if (typeof trackJobApply !== 'undefined') {
            trackJobApply(jobId);
        }
        
        alert(`✅ Ứng tuyển thành công!\n\nVị trí: ${job.title}\nCông ty: ${job.company}`);
    } else {
        alert(`⚠️ Bạn đã ứng tuyển vị trí này trước đó!`);
    }
}

// ================== XEM CHI TIẾT ==================
function goToJobDetail(jobId) {
    window.location.href = `job-detail.html?id=${jobId}`;
}

// ================== REFRESH DATA ==================
function refreshJobsData() {
    allJobsData = getAllJobsFromStorage();
    renderAIRecommendations();
    console.log('🔄 Đã làm mới dữ liệu jobs, hiện có:', allJobsData.length, 'việc làm');
}

// ================== KHỞI TẠO ==================
function init() {
    // Tải dữ liệu jobs
    if (!loadJobsData()) {
        const checkInterval = setInterval(() => {
            if (typeof allJobs !== 'undefined' && allJobs.length > 0) {
                clearInterval(checkInterval);
                allJobsData = getAllJobsFromStorage();
                renderAIRecommendations();
            }
        }, 100);
        
        // Timeout sau 3 giây
        setTimeout(() => {
            clearInterval(checkInterval);
            if (allJobsData.length === 0) {
                allJobsData = getAllJobsFromStorage();
                renderAIRecommendations();
            }
        }, 3000);
    } else {
        renderAIRecommendations();
    }
    
    // Cập nhật UI auth
    updateAuthUI();
    
    // Hero background
    const heroSection = document.getElementById('dynamicHero');
    if (heroSection) {
        heroSection.style.backgroundImage = "url('img/bannerchinh.jpg')";
        heroSection.style.backgroundSize = "cover";
        heroSection.style.backgroundPosition = "center";
    }
    
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        heroBadge.textContent = "ĐÀ NẴNG";
    }
    
    // Lắng nghe storage event để cập nhật khi có thay đổi từ Admin/HR
    window.addEventListener('storage', function(e) {
        if (e.key === 'currentUser' || e.key === 'isLoggedIn') {
            updateAuthUI();
            refreshJobsData();
        }
        if (e.key === 'jobs' || e.key === 'hr_jobs') {
            console.log('🔄 Phát hiện thay đổi jobs từ storage, đang cập nhật...');
            refreshJobsData();
        }
    });
    
    // Custom event cho realtime update
    window.addEventListener('jobs-updated', function() {
        refreshJobsData();
    });
}

// ================== EXPORT GLOBAL ==================
window.goToJobDetail = goToJobDetail;
window.applyJob = applyJob;
window.handleLogout = handleLogout;
window.goToProfile = goToProfile;
window.refreshJobsData = refreshJobsData;

// ================== KHỞI CHẠY ==================
document.addEventListener('DOMContentLoaded', init);