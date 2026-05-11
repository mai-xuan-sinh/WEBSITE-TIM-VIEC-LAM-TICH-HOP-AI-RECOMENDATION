// ==================== AI RECOMMENDATION ENGINE ====================
// Dựa trên dữ liệu jobs-data.js (400+ công việc)

class AIRecommendationEngine {
    constructor() {
        this.allJobs = [];
        this.users = [];
        this.userBehavior = {}; // Lưu hành vi tìm kiếm của user
        this.skillsDatabase = this.initSkillsDatabase();
    }

    // ==================== KHỞI TẠO CƠ SỞ DỮ LIỆU KỸ NĂNG ====================
    initSkillsDatabase() {
        return {
            // Kỹ năng công nghệ
            techSkills: {
                "ReactJS": ["React", "React Native", "Redux", "NextJS"],
                "NodeJS": ["Node.js", "Express", "NestJS"],
                "Python": ["Django", "Flask", "FastAPI", "Machine Learning", "AI"],
                "Java": ["Spring Boot", "Java Core", "Hibernate"],
                "PHP": ["Laravel", "CodeIgniter", "Symfony"],
                "Flutter": ["Dart", "Cross Platform", "Mobile"],
                "Swift": ["iOS", "Apple", "Xcode"],
                "Kotlin": ["Android", "Jetpack", "Mobile"],
                "Docker": ["Container", "Kubernetes", "DevOps"],
                "AWS": ["Cloud", "EC2", "S3", "Lambda"],
                "SQL": ["MySQL", "PostgreSQL", "Database"],
                "MongoDB": ["NoSQL", "Database"],
                "Figma": ["UI/UX", "Design", "Prototype"],
                "Photoshop": ["Design", "Photo Editing", "Graphic"],
                "Illustrator": ["Vector", "Logo Design", "Branding"]
            },
            // Kỹ năng mềm
            softSkills: {
                "Giao tiếp": ["Communication", "Presentation", "Negotiation"],
                "Làm việc nhóm": ["Teamwork", "Collaboration", "Coordination"],
                "Tiếng Anh": ["English", "IELTS", "TOEIC", "Foreign Language"],
                "Quản lý dự án": ["Project Management", "Agile", "Scrum", "Kanban"],
                "Giải quyết vấn đề": ["Problem Solving", "Critical Thinking", "Analytical"]
            },
            // Ngành nghề mapping
            industryMapping: {
                "Công nghệ thông tin": ["React", "NodeJS", "Python", "Java", "PHP", "Flutter", "DevOps", "Cloud", "AI", "Mobile", "Backend", "Frontend", "Fullstack", "Database", "Security"],
                "Logistics - Vận hành": ["Logistics", "Warehouse", "Supply Chain", "Inventory", "Shipping", "Import Export", "Distribution"],
                "Kinh doanh - Marketing": ["Sales", "Marketing", "SEO", "Content", "Brand", "Digital Marketing", "Facebook Ads", "Google Ads", "CRM"],
                "Du lịch - Khách sạn": ["Tour", "Hotel", "Resort", "Hospitality", "Travel", "Reception", "Tourism"],
                "Xây dựng - Bất động sản": ["Construction", "AutoCAD", "Architect", "Interior", "Civil Engineer", "Real Estate", "Property"],
                "Thiết kế - Sáng tạo": ["Designer", "Graphic", "UI/UX", "Artist", "Creative", "Visual", "Photo", "Video"],
                "Giáo dục - Đào tạo": ["Teaching", "Education", "Training", "Instructor", "Academic"],
                "Tài chính - Ngân hàng": ["Finance", "Banking", "Accounting", "Credit", "Investment", "Treasury", "Audit"]
            }
        };
    }

    // ==================== LẤY DỮ LIỆU TỪ LOCALSTORAGE ====================
    loadData() {
        // Lấy dữ liệu jobs từ global variable allJobs (đã có trong jobs-data.js)
        if (typeof allJobs !== 'undefined') {
            this.allJobs = allJobs;
        } else {
            this.allJobs = JSON.parse(localStorage.getItem('allJobs')) || [];
        }
        
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Lấy hành vi người dùng
        const savedBehavior = localStorage.getItem('userBehavior');
        if (savedBehavior) {
            this.userBehavior = JSON.parse(savedBehavior);
        }
    }

    // ==================== LƯU HÀNH VI NGƯỜI DÙNG ====================
    saveUserBehavior(userId) {
        localStorage.setItem('userBehavior', JSON.stringify(this.userBehavior[userId] || {}));
    }

    // ==================== CẬP NHẬT HÀNH VI TÌM KIẾM ====================
    updateUserBehavior(userId, action, data) {
        if (!this.userBehavior[userId]) {
            this.userBehavior[userId] = {
                searchHistory: [],
                viewedJobs: [],
                appliedJobs: [],
                savedJobs: [],
                interests: {
                    fields: {},
                    skills: {},
                    locations: {}
                }
            };
        }
        
        const behavior = this.userBehavior[userId];
        
        switch(action) {
            case 'search':
                behavior.searchHistory.unshift({
                    keyword: data.keyword,
                    timestamp: new Date().toISOString()
                });
                if (behavior.searchHistory.length > 20) behavior.searchHistory.pop();
                break;
            case 'view':
                if (!behavior.viewedJobs.includes(data.jobId)) {
                    behavior.viewedJobs.unshift(data.jobId);
                    if (behavior.viewedJobs.length > 30) behavior.viewedJobs.pop();
                }
                break;
            case 'apply':
                if (!behavior.appliedJobs.includes(data.jobId)) {
                    behavior.appliedJobs.unshift(data.jobId);
                }
                break;
            case 'save':
                if (!behavior.savedJobs.includes(data.jobId)) {
                    behavior.savedJobs.unshift(data.jobId);
                }
                break;
        }
        
        // Cập nhật interests dựa trên job đã xem
        if (data.job) {
            const job = data.job;
            // Tần suất lĩnh vực
            behavior.interests.fields[job.field] = (behavior.interests.fields[job.field] || 0) + 1;
            // Tần suất kỹ năng
            if (job.skills) {
                job.skills.forEach(skill => {
                    const skillKey = skill.toLowerCase();
                    behavior.interests.skills[skillKey] = (behavior.interests.skills[skillKey] || 0) + 1;
                });
            }
            // Tần suất địa điểm
            const location = job.district || job.location?.split(',')[0];
            if (location) {
                behavior.interests.locations[location] = (behavior.interests.locations[location] || 0) + 1;
            }
        }
        
        this.saveUserBehavior(userId);
    }

    // ==================== 1. GỢI Ý VIỆC LÀM CHO ỨNG VIÊN ====================
    recommendJobsForCandidate(userId, limit = 10) {
        this.loadData();
        
        // Tìm thông tin user
        const user = this.users.find(u => u.id === userId || u.email === userId);
        if (!user) return this.getPopularJobs(limit);
        
        const behavior = this.userBehavior[userId] || { interests: { fields: {}, skills: {}, locations: {} } };
        
        // Tính điểm cho từng công việc
        const scoredJobs = this.allJobs.map(job => {
            let score = 0;
            
            // 1. Dựa trên lĩnh vực yêu thích (30%)
            const fieldScore = behavior.interests.fields[job.field] || 0;
            score += fieldScore * 30;
            
            // 2. Dựa trên kỹ năng (40%)
            let skillMatchCount = 0;
            if (job.skills) {
                job.skills.forEach(skill => {
                    const skillLower = skill.toLowerCase();
                    if (behavior.interests.skills[skillLower]) {
                        skillMatchCount += behavior.interests.skills[skillLower];
                    }
                    // So sánh với kỹ năng của user trong profile
                    if (user.skills && user.skills.some(us => us.toLowerCase().includes(skillLower))) {
                        skillMatchCount += 2;
                    }
                });
            }
            score += Math.min(skillMatchCount * 10, 400);
            
            // 3. Dựa trên địa điểm (15%)
            const jobLocation = job.district || job.location?.split(',')[0];
            const locationScore = behavior.interests.locations[jobLocation] || 0;
            score += locationScore * 15;
            
            // 4. Dựa trên mức lương phù hợp (5%)
            if (user.expectedSalary && job.salary) {
                const jobSalary = parseInt(job.salary) || 0;
                if (jobSalary >= user.expectedSalary * 0.8) {
                    score += 50;
                }
            }
            
            // 5. Chưa ứng tuyển (ưu tiên job chưa apply - 10%)
            if (!behavior.appliedJobs?.includes(job.id)) {
                score += 100;
            }
            
            return { ...job, score };
        });
        
        // Sắp xếp theo điểm số và lấy top N
        const recommended = scoredJobs.sort((a, b) => b.score - a.score).slice(0, limit);
        
        return recommended;
    }

    // ==================== 2. GỢI Ý CÔNG VIỆC DỰA TRÊN CV ====================
    recommendByCV(cvData, limit = 10) {
        this.loadData();
        
        const scoredJobs = this.allJobs.map(job => {
            let score = 0;
            
            // So sánh vị trí mong muốn
            if (cvData.position && job.title.toLowerCase().includes(cvData.position.toLowerCase())) {
                score += 200;
            }
            
            // So sánh kỹ năng
            if (cvData.skills && job.skills) {
                const cvSkills = cvData.skills.toLowerCase().split(/[,\s]+/);
                job.skills.forEach(skill => {
                    if (cvSkills.some(cs => skill.toLowerCase().includes(cs) || cs.includes(skill.toLowerCase()))) {
                        score += 50;
                    }
                });
            }
            
            // So sánh địa điểm
            if (cvData.address && (job.location?.includes(cvData.address) || job.district?.includes(cvData.address))) {
                score += 80;
            }
            
            return { ...job, score };
        });
        
        return scoredJobs.sort((a, b) => b.score - a.score).slice(0, limit);
    }

    // ==================== 3. PHÂN TÍCH HỒ SƠ ỨNG VIÊN ====================
    analyzeCandidateProfile(user) {
        const analysis = {
            name: user.name || user.fullname,
            email: user.email,
            skills: user.skills || [],
            experience: user.experience || null,
            education: user.education || null,
            strengths: [],
            weaknesses: [],
            missingSkills: [],
            recommendedCourses: [],
            matchPercent: 0
        };
        
        // Phân tích kỹ năng hiện có
        if (analysis.skills.length === 0) {
            analysis.weaknesses.push("🔴 Chưa có thông tin kỹ năng. Hãy cập nhật kỹ năng để nhận gợi ý chính xác hơn.");
        } else {
            analysis.strengths.push(`🟢 Có ${analysis.skills.length} kỹ năng được ghi nhận: ${analysis.skills.join(", ")}`);
        }
        
        // Phân tích kinh nghiệm
        if (analysis.experience) {
            const expYear = parseInt(analysis.experience);
            if (expYear >= 3) {
                analysis.strengths.push(`🟢 Kinh nghiệm ${analysis.experience} - Phù hợp vị trí Senior`);
            } else if (expYear >= 1) {
                analysis.strengths.push(`🟢 Kinh nghiệm ${analysis.experience} - Phù hợp vị trí Junior/Middle`);
            } else {
                analysis.weaknesses.push("🟡 Kinh nghiệm còn ít, nên bắt đầu với vị trí Fresher/Intern");
            }
        } else {
            analysis.weaknesses.push("🟡 Chưa cập nhật thông tin kinh nghiệm làm việc.");
        }
        
        // Gợi ý kỹ năng cần bổ sung dựa trên xu hướng thị trường
        const topSkills = this.getTopSkillsFromJobs();
        const missingTopSkills = topSkills.filter(skill => 
            !analysis.skills.some(us => us.toLowerCase().includes(skill.toLowerCase()))
        ).slice(0, 5);
        
        if (missingTopSkills.length > 0) {
            analysis.missingSkills = missingTopSkills;
            analysis.recommendedCourses = missingTopSkills.map(skill => ({
                skill: skill,
                course: `Khóa học ${skill} chuyên sâu`,
                platform: "Coursera/Udemy"
            }));
            analysis.weaknesses.push(`🟡 Thiếu các kỹ năng hot: ${missingTopSkills.join(", ")}`);
        }
        
        // Tính % hoàn thiện hồ sơ
        let completePercent = 20; // Base
        if (analysis.skills.length > 0) completePercent += Math.min(analysis.skills.length * 5, 30);
        if (analysis.experience) completePercent += 20;
        if (analysis.education) completePercent += 15;
        if (user.phone) completePercent += 10;
        if (user.address) completePercent += 5;
        analysis.matchPercent = Math.min(completePercent, 100);
        
        return analysis;
    }

    // ==================== 4. GỢI Ý KỸ NĂNG CẦN HỌC THÊM ====================
    getTopSkillsFromJobs(limit = 10) {
        const skillCount = {};
        
        this.allJobs.forEach(job => {
            if (job.skills) {
                job.skills.forEach(skill => {
                    const skillKey = skill.toLowerCase();
                    skillCount[skillKey] = (skillCount[skillKey] || 0) + 1;
                });
            }
        });
        
        return Object.entries(skillCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([skill]) => skill);
    }

    // ==================== 5. GỢI Ý ỨNG VIÊN CHO NHÀ TUYỂN DỤNG ====================
    recommendCandidatesForEmployer(jobId, limit = 10) {
        this.loadData();
        
        const job = this.allJobs.find(j => j.id == jobId);
        if (!job) return [];
        
        const scoredCandidates = this.users.filter(user => user.role !== 'employer').map(user => {
            let score = 0;
            
            // So sánh kỹ năng
            if (user.skills && job.skills) {
                job.skills.forEach(jobSkill => {
                    if (user.skills.some(us => us.toLowerCase().includes(jobSkill.toLowerCase()))) {
                        score += 20;
                    }
                });
            }
            
            // So sánh lĩnh vực
            if (user.field === job.field) {
                score += 50;
            }
            
            // So sánh địa điểm
            const userLocation = user.district || user.address;
            if (userLocation && (job.location?.includes(userLocation) || job.district?.includes(userLocation))) {
                score += 30;
            }
            
            // Kinh nghiệm
            if (user.experience) {
                const expYear = parseInt(user.experience);
                if (expYear >= 3) score += 40;
                else if (expYear >= 1) score += 20;
                else score += 10;
            }
            
            return { ...user, matchScore: score };
        });
        
        return scoredCandidates.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit);
    }

    // ==================== 6. LẤY CÔNG VIỆC PHỔ BIẾN ====================
    getPopularJobs(limit = 10) {
        this.loadData();
        return this.allJobs.slice(0, limit);
    }

    // ==================== 7. THỐNG KÊ XU HƯỚNG THỊ TRƯỜNG ====================
    getMarketTrends() {
        this.loadData();
        
        const trends = {
            topFields: {},
            topSkills: {},
            avgSalaryByField: {},
            demandByLocation: {}
        };
        
        // Thống kê theo lĩnh vực
        this.allJobs.forEach(job => {
            // Lĩnh vực
            trends.topFields[job.field] = (trends.topFields[job.field] || 0) + 1;
            
            // Kỹ năng
            if (job.skills) {
                job.skills.forEach(skill => {
                    trends.topSkills[skill] = (trends.topSkills[skill] || 0) + 1;
                });
            }
            
            // Địa điểm
            const location = job.district || job.location?.split(',')[0];
            if (location) {
                trends.demandByLocation[location] = (trends.demandByLocation[location] || 0) + 1;
            }
        });
        
        // Sắp xếp
        trends.topFields = Object.entries(trends.topFields).sort((a, b) => b[1] - a[1]);
        trends.topSkills = Object.entries(trends.topSkills).sort((a, b) => b[1] - a[1]).slice(0, 10);
        trends.demandByLocation = Object.entries(trends.demandByLocation).sort((a, b) => b[1] - a[1]);
        
        return trends;
    }

    // ==================== 8. CÁ NHÂN HÓA DANH SÁCH VIỆC LÀM ====================
    personalizeJobList(userId, page = 1, pageSize = 12) {
        const recommended = this.recommendJobsForCandidate(userId, pageSize * 2);
        
        // Trộn giữa gợi ý AI và công việc phổ biến
        const popular = this.getPopularJobs(pageSize);
        const mixed = [...recommended];
        
        // Thêm công việc phổ biến chưa có trong danh sách gợi ý
        popular.forEach(job => {
            if (!mixed.some(j => j.id === job.id)) {
                mixed.push(job);
            }
        });
        
        const start = (page - 1) * pageSize;
        return mixed.slice(start, start + pageSize);
    }
}

// ==================== KHỞI TẠO AI ENGINE ====================
const aiEngine = new AIRecommendationEngine();

// ==================== HÀM HIỂN THỊ GỢI Ý TRÊN GIAO DIỆN ====================

// Hiển thị gợi ý việc làm AI trên trang chủ
function renderAIRecommendations(userId) {
    const container = document.getElementById('aiRecommendations');
    if (!container) return;
    
    const recommendations = aiEngine.recommendJobsForCandidate(userId, 6);
    
    if (recommendations.length === 0) {
        container.innerHTML = '<div class="no-data">Đang cập nhật gợi ý...</div>';
        return;
    }
    
    container.innerHTML = recommendations.map(job => `
        <div class="job-card ai-card">
            <div class="match-percent">${Math.min(Math.floor(job.score / 10), 99)}% phù hợp</div>
            <div class="job-title">${job.title}</div>
            <div class="company"><i class="fas fa-building"></i> ${job.company}</div>
            <div class="details">
                <span><i class="fas fa-map-pin"></i> ${job.location || job.district}</span>
                <span><i class="fas fa-clock"></i> Full-time</span>
            </div>
            <div class="tech-stack">${(job.skills || []).slice(0, 3).map(s => `<span>${s}</span>`).join('')}</div>
            <button class="apply-btn" onclick="viewJobDetail(${job.id})">Xem chi tiết</button>
        </div>
    `).join('');
}

// Hiển thị phân tích hồ sơ
function showProfileAnalysis(user) {
    const analysis = aiEngine.analyzeCandidateProfile(user);
    const container = document.getElementById('profileAnalysis');
    if (!container) return;
    
    container.innerHTML = `
        <div class="analysis-card">
            <h3><i class="fas fa-chart-line"></i> Đánh giá hồ sơ</h3>
            <div class="progress-circle">
                <div class="progress-value">${analysis.matchPercent}%</div>
                <div class="progress-label">Mức độ hoàn thiện</div>
            </div>
            <div class="strengths">
                <h4><i class="fas fa-check-circle"></i> Điểm mạnh</h4>
                <ul>${analysis.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
            </div>
            <div class="weaknesses">
                <h4><i class="fas fa-exclamation-triangle"></i> Cần cải thiện</h4>
                <ul>${analysis.weaknesses.map(w => `<li>${w}</li>`).join('')}</ul>
            </div>
            ${analysis.missingSkills.length > 0 ? `
            <div class="recommended-skills">
                <h4><i class="fas fa-graduation-cap"></i> Kỹ năng nên học thêm</h4>
                <div class="skill-tags">
                    ${analysis.missingSkills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    `;
}

// Hiển thị xu hướng thị trường
function renderMarketTrends() {
    const trends = aiEngine.getMarketTrends();
    const container = document.getElementById('marketTrends');
    if (!container) return;
    
    container.innerHTML = `
        <div class="trends-grid">
            <div class="trend-card">
                <h4><i class="fas fa-chart-line"></i> Top lĩnh vực tuyển dụng</h4>
                <ul>
                    ${trends.topFields.slice(0, 5).map(([field, count]) => `
                        <li><span>${field}</span><span class="count">${count} việc</span></li>
                    `).join('')}
                </ul>
            </div>
            <div class="trend-card">
                <h4><i class="fas fa-code"></i> Top kỹ năng được săn đón</h4>
                <ul>
                    ${trends.topSkills.map(([skill, count]) => `
                        <li><span>${skill}</span><span class="count">${count} tin</span></li>
                    `).join('')}
                </ul>
            </div>
            <div class="trend-card">
                <h4><i class="fas fa-map-marker-alt"></i> Nhu cầu theo khu vực</h4>
                <ul>
                    ${trends.demandByLocation.slice(0, 5).map(([location, count]) => `
                        <li><span>${location}</span><span class="count">${count} việc</span></li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Hàm cập nhật hành vi khi xem job
function trackJobView(jobId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.id) {
        const job = allJobs.find(j => j.id == jobId);
        if (job) {
            aiEngine.updateUserBehavior(currentUser.id, 'view', { jobId, job });
        }
    }
}

// Hàm cập nhật khi ứng tuyển
function trackJobApply(jobId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.id) {
        const job = allJobs.find(j => j.id == jobId);
        if (job) {
            aiEngine.updateUserBehavior(currentUser.id, 'apply', { jobId, job });
        }
    }
}

// ==================== EXPORT CHO CÁC TRANG KHÁC ====================
window.aiEngine = aiEngine;
window.renderAIRecommendations = renderAIRecommendations;
window.showProfileAnalysis = showProfileAnalysis;
window.renderMarketTrends = renderMarketTrends;
window.trackJobView = trackJobView;
window.trackJobApply = trackJobApply;