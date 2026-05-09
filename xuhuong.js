document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. XỬ LÝ LOGIC PROFILE & ĐĂNG XUẤT ---
    const btnLogout = document.getElementById('btnLogout');
    const userBox = document.getElementById('userBox');
    const authButtons = document.getElementById('authButtons');
    const profileClick = document.getElementById('profileClick');

    // Chuyển hướng thực tế sang trang Profile
    if(profileClick) {
        profileClick.addEventListener('click', () => {
            window.location.href = "profile.html";
        });
    }

    // Click vào Đăng xuất
    if(btnLogout) {
        btnLogout.addEventListener('click', () => {
            userBox.style.opacity = '0';
            setTimeout(() => {
                userBox.style.display = 'none';
                authButtons.style.display = 'flex';
                authButtons.style.opacity = '1';
            }, 300);
        });
    }

    // --- 2. XỬ LÝ CHUYỂN TABS ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            
            const targetId = btn.getAttribute('data-target');
            if (targetId) document.getElementById(targetId).classList.add('active');
        });
    });

    // --- 3. BỘ DỮ LIỆU ĐỘNG ---
    const yearlyData = {
        "2024": { 
            stats: { job: "98,000+", comp: "4,100+", cand: "35,000+", sal: "13.5 Tr" }, 
            industries: [25, 18, 17, 15, 20, 10, 12, 7], growth: [20, 15, 10, 8, 5, 4, 8, 12],
            banner: { pct: "+15%", comp: "so với 2023", sub: "Phục hồi sau đại dịch" }
        },
        "2025": { 
            stats: { job: "110,000+", comp: "4,800+", cand: "40,000+", sal: "14.2 Tr" }, 
            industries: [28, 22, 19, 16, 23, 11, 14, 8], growth: [25, 20, 15, 12, 8, 6, 10, 15],
            banner: { pct: "+18%", comp: "so với 2024", sub: "Tăng trưởng ổn định" }
        },
        "2026": { 
            stats: { job: "121,000+", comp: "5,200+", cand: "45,000+", sal: "15.2 Tr" }, 
            industries: [32, 27, 21, 18, 26, 12, 15, 9], growth: [35, 28, 20, 15, 12, 10, 18, 5],
            banner: { pct: "+21%", comp: "so với 2025", sub: "Chuyển đổi số & Kinh tế xanh" }
        },
        "2027": { 
            stats: { job: "135,000+", comp: "5,800+", cand: "52,000+", sal: "16.5 Tr" }, 
            industries: [38, 32, 24, 20, 30, 14, 18, 12], growth: [40, 32, 22, 18, 14, 12, 20, 8],
            banner: { pct: "+24%", comp: "so với 2026", sub: "Bùng nổ AI & Tự động hóa" }
        },
        "2028": { 
            stats: { job: "150,000+", comp: "6,500+", cand: "60,000+", sal: "18.0 Tr" }, 
            industries: [45, 38, 28, 22, 35, 16, 21, 15], growth: [45, 35, 25, 20, 16, 14, 22, 10],
            banner: { pct: "+28%", comp: "so với 2027", sub: "Đô thị thông minh toàn diện" }
        },
        "2029": { 
            stats: { job: "168,000+", comp: "7,200+", cand: "68,000+", sal: "19.5 Tr" }, 
            industries: [52, 45, 32, 25, 40, 18, 24, 18], growth: [50, 40, 28, 22, 18, 16, 25, 12],
            banner: { pct: "+32%", comp: "so với 2028", sub: "Trung tâm công nghệ quốc tế" }
        },
        "2030": { 
            stats: { job: "190,000+", comp: "8,500+", cand: "80,000+", sal: "21.5 Tr" }, 
            industries: [60, 55, 38, 28, 48, 22, 28, 22], growth: [60, 45, 32, 25, 20, 18, 30, 15],
            banner: { pct: "+35%", comp: "so với 2029", sub: "Kỷ nguyên số hóa toàn phần" }
        }
    };

    // --- 4. XỬ LÝ ĐỔI NĂM RENDER LẠI TOÀN BỘ DATA ---
    const yearBtns = document.querySelectorAll('.year-btn');
    const elStatJob = document.getElementById('stat-job');
    const elStatComp = document.getElementById('stat-comp');
    const elStatCand = document.getElementById('stat-cand');
    const elStatSal = document.getElementById('stat-sal');
    const elJobNums = document.querySelectorAll('.job-num');
    const elGrowthNums = document.querySelectorAll('.growth-num');
    const elGrowthBars = document.querySelectorAll('.growth-bar');
    
    // Element Banner Trên Cùng
    const badgeYear = document.getElementById('current-badge-year');
    const titleYear = document.getElementById('current-title-year');

    // Element Banner Xu Hướng Cuối Trang
    const bTitle = document.getElementById('banner-title');
    const bSub = document.getElementById('banner-sub');
    const bPct = document.getElementById('banner-pct');
    const bComp = document.getElementById('banner-comp');

    yearBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            yearBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const y = btn.getAttribute('data-year');
            const data = yearlyData[y];
            
            if(badgeYear) badgeYear.textContent = y;
            if(titleYear) titleYear.textContent = `Đà Nẵng ${y}`;

            if(data) {
                elStatJob.textContent = data.stats.job;
                elStatComp.textContent = data.stats.comp;
                elStatCand.textContent = data.stats.cand;
                elStatSal.textContent = data.stats.sal;

                elJobNums.forEach((el, index) => {
                    el.style.opacity = 0;
                    setTimeout(() => {
                        el.textContent = data.industries[index] + "k";
                        el.style.opacity = 1;
                    }, 200);
                });

                elGrowthNums.forEach((el, index) => {
                    el.textContent = "+" + data.growth[index] + "%";
                });
                
                elGrowthBars.forEach((bar, index) => {
                    let widthPercent = data.growth[index] * 1.5; 
                    if(widthPercent > 100) widthPercent = 100;
                    bar.style.width = widthPercent + "%";
                });

                if(bTitle) bTitle.textContent = `Xu hướng ${y}`;
                if(bSub) bSub.textContent = data.banner.sub;
                if(bPct) bPct.textContent = data.banner.pct;
                if(bComp) bComp.textContent = data.banner.comp;
            }
        });
    });

    // Mặc định chọn năm 2026
    const defaultBtn = document.querySelector('.year-btn[data-year="2026"]');
    if(defaultBtn) defaultBtn.click();
});