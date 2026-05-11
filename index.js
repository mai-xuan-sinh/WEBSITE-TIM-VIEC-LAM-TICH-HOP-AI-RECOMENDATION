// ================== BIẾN TOÀN CỤC ==================
let currentUser = null;
let allJobsData = [];

// ================== LOAD DỮ LIỆU ==================
function loadJobsData() {
    if (typeof allJobs !== 'undefined' && allJobs.length > 0) {
        allJobsData = allJobs;
        console.log('✅ Đã tải', allJobsData.length, 'công việc');
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
                <div class="user-avatar">${(user.name || user.fullname || 'U').charAt(0).toUpperCase()}</div>
                <span class="user-name">${user.name || user.fullname || user.email?.split('@')[0]}</span>
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

function handleLogout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('rememberUser');
    window.location.href = 'index.html';
}

// ================== RENDER AI RECOMMENDATIONS (DUY NHẤT) ==================
function renderAIRecommendations() {
    const container = document.getElementById('aiRecommendations');
    if (!container) return;
    
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
                <div class="job-title">${job.title}</div>
                <div class="company"><i class="fas fa-building"></i> ${job.company}</div>
                <div class="details">
                    <span><i class="fas fa-map-pin"></i> ${job.location || job.district || 'Đà Nẵng'}</span>
                    <span><i class="fas fa-money-bill-wave"></i> ${job.salary || 'Thỏa thuận'}</span>
                </div>
                <div class="tech-stack">${(job.skills || []).slice(0, 3).map(s => `<span>${s}</span>`).join('')}</div>
                <button class="apply-btn" onclick="goToJobDetail(${job.id})">Xem chi tiết</button>
            </div>
        `).join('');
        return;
    }
    
    // Dùng AI để gợi ý
    if (aiEngine && aiEngine.recommendJobsForCandidate) {
        const recommendations = aiEngine.recommendJobsForCandidate(currentUser.id || currentUser.email, 6);
        
        if (recommendations.length > 0) {
            container.innerHTML = recommendations.map(job => `
                <div class="job-card ai-card">
                    <div class="match-percent">${Math.min(Math.floor((job.score || 0) / 10), 99)}% phù hợp</div>
                    <div class="job-title">${job.title}</div>
                    <div class="company"><i class="fas fa-building"></i> ${job.company}</div>
                    <div class="details">
                        <span><i class="fas fa-map-pin"></i> ${job.location || job.district || 'Đà Nẵng'}</span>
                        <span><i class="fas fa-money-bill-wave"></i> ${job.salary || 'Thỏa thuận'}</span>
                    </div>
                    <div class="tech-stack">${(job.skills || []).slice(0, 3).map(s => `<span>${s}</span>`).join('')}</div>
                    <button class="apply-btn" onclick="goToJobDetail(${job.id})">Xem chi tiết</button>
                </div>
            `).join('');
        } else {
            // Fallback
            const popularJobs = allJobsData.slice(0, 6);
            container.innerHTML = popularJobs.map(job => `
                <div class="job-card ai-card">
                    <div class="match-percent">Đề xuất</div>
                    <div class="job-title">${job.title}</div>
                    <div class="company"><i class="fas fa-building"></i> ${job.company}</div>
                    <div class="details">
                        <span><i class="fas fa-map-pin"></i> ${job.location || job.district || 'Đà Nẵng'}</span>
                        <span><i class="fas fa-money-bill-wave"></i> ${job.salary || 'Thỏa thuận'}</span>
                    </div>
                    <div class="tech-stack">${(job.skills || []).slice(0, 3).map(s => `<span>${s}</span>`).join('')}</div>
                    <button class="apply-btn" onclick="goToJobDetail(${job.id})">Xem chi tiết</button>
                </div>
            `).join('');
        }
    }
}

// ================== XỬ LÝ ỨNG TUYỂN ==================
function applyJob(jobId) {
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

// ================== KHỞI TẠO ==================
function init() {
    // Tải dữ liệu jobs
    if (!loadJobsData()) {
        const checkInterval = setInterval(() => {
            if (typeof allJobs !== 'undefined' && allJobs.length > 0) {
                clearInterval(checkInterval);
                allJobsData = allJobs;
                renderAIRecommendations();
            }
        }, 100);
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
    
    // Lắng nghe storage event
    window.addEventListener('storage', function(e) {
        if (e.key === 'currentUser' || e.key === 'isLoggedIn') {
            updateAuthUI();
            renderAIRecommendations();
        }
    });
}

// ================== EXPORT GLOBAL ==================
window.goToJobDetail = goToJobDetail;
window.applyJob = applyJob;
window.handleLogout = handleLogout;

// ================== KHỞI CHẠY ==================
document.addEventListener('DOMContentLoaded', init);