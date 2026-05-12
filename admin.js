// ==================== TÀI KHOẢN ADMIN CỐ ĐỊNH ====================
const ADMIN_USER = {
    id: 999,
    email: "admin@danangwork.com",
    password: "Admin@123",
    name: "Quản trị viên",
    fullname: "Quản trị viên hệ thống",
    role: "admin",
    status: "active",
    createdAt: new Date().toISOString()
};

// Khởi tạo admin trong localStorage nếu chưa có
function initAdminAccount() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const adminExists = users.some(u => u.email === ADMIN_USER.email);
    if (!adminExists) {
        users.push(ADMIN_USER);
        localStorage.setItem("users", JSON.stringify(users));
    }
    
    // Đồng thời lưu danh sách admin riêng
    let admins = JSON.parse(localStorage.getItem("admins")) || [];
    const adminInList = admins.some(a => a.email === ADMIN_USER.email);
    if (!adminInList) {
        admins.push(ADMIN_USER);
        localStorage.setItem("admins", JSON.stringify(admins));
    }
}

// ==================== KIỂM TRA ĐĂNG NHẬP ADMIN ====================
function checkAdminAuth() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser || currentUser.role !== "admin") {
        window.location.href = "login.html";
        return false;
    }
    
    document.getElementById("adminName").innerText = currentUser.name || currentUser.fullname || "Admin";
    return true;
}

// ==================== KHỞI TẠO DỮ LIỆU MẪU ====================
function initSampleData() {
    // Khởi tạo danh mục ngành nghề
    if (!localStorage.getItem("industries")) {
        localStorage.setItem("industries", JSON.stringify([
            "Công nghệ thông tin", "Du lịch - Khách sạn", "Xây dựng - Bất động sản",
            "Kinh doanh - Marketing", "Logistics - Vận hành", "Giáo dục - Đào tạo",
            "Tài chính - Ngân hàng", "Thiết kế - Sáng tạo"
        ]));
    }
    
    // Khởi tạo danh mục kỹ năng
    if (!localStorage.getItem("skills")) {
        localStorage.setItem("skills", JSON.stringify([
            "ReactJS", "NodeJS", "Python", "Java", "PHP", "Flutter",
            "SQL", "MongoDB", "AWS", "Docker", "Figma", "Photoshop"
        ]));
    }
    
    // Khởi tạo danh mục địa điểm
    if (!localStorage.getItem("locations")) {
        localStorage.setItem("locations", JSON.stringify([
            "Hải Châu", "Thanh Khê", "Liên Chiểu", "Ngũ Hành Sơn", "Sơn Trà", "Cẩm Lệ", "Hòa Vang"
        ]));
    }
    
    // Khởi tạo loại hình công việc
    if (!localStorage.getItem("jobTypes")) {
        localStorage.setItem("jobTypes", JSON.stringify([
            "Toàn thời gian", "Bán thời gian", "Thực tập", "Freelance", "Remote"
        ]));
    }
    
    // Khởi tạo tin tức mẫu
    if (!localStorage.getItem("news")) {
        localStorage.setItem("news", JSON.stringify([
            { id: 1, title: "DANANG WORK ra mắt tính năng AI Recommendation", type: "news", date: "2026-05-01", status: "active" },
            { id: 2, title: "Thông báo nghỉ lễ 30/4 - 1/5", type: "notice", date: "2026-04-20", status: "active" },
            { id: 3, title: "Banner khuyến mãi gói đăng tin", type: "banner", date: "2026-05-10", status: "active" }
        ]));
    }
    
    // Khởi tạo yêu cầu hỗ trợ mẫu
    if (!localStorage.getItem("supportTickets")) {
        localStorage.setItem("supportTickets", JSON.stringify([
            { id: 1, userId: 1, userName: "Nguyễn Văn A", title: "Không thể đăng nhập", content: "Em không thể đăng nhập vào tài khoản", date: "2026-05-10", status: "pending" },
            { id: 2, userId: 2, userName: "Công ty ABC", title: "Tin đăng bị lỗi", content: "Tin đăng của công ty em không hiển thị", date: "2026-05-11", status: "processing" }
        ]));
    }
    
    // Khởi tạo giao dịch mẫu
    if (!localStorage.getItem("transactions")) {
        localStorage.setItem("transactions", JSON.stringify([
            { id: "TXN001", userName: "Công ty FPT", package: "Gói Premium 1 tháng", amount: 500000, date: "2026-05-01", status: "completed" },
            { id: "TXN002", userName: "Công ty Viettel", package: "Gói Basic", amount: 200000, date: "2026-05-05", status: "completed" },
            { id: "TXN003", userName: "Công ty SunGroup", package: "Gói Premium 3 tháng", amount: 1200000, date: "2026-05-10", status: "pending" }
        ]));
    }
}

// ==================== CẬP NHẬT THỐNG KÊ TỔNG QUAN ====================
function updateDashboardStats() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const jobs = JSON.parse(localStorage.getItem("hr_jobs")) || (typeof allJobs !== 'undefined' ? allJobs : []);
    const applications = JSON.parse(localStorage.getItem("applications")) || [];
    const companies = JSON.parse(localStorage.getItem("companies")) || [];
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    
    const candidates = users.filter(u => u.role === "candidate" || u.userType === "candidate");
    const employers = users.filter(u => u.role === "employer" || u.userType === "employer");
    const pendingJobs = jobs.filter(j => j.status === "pending");
    
    const totalRevenue = transactions.filter(t => t.status === "completed").reduce((sum, t) => sum + (t.amount || 0), 0);
    
    document.getElementById("totalUsers").innerText = users.length;
    document.getElementById("totalEmployers").innerText = employers.length;
    document.getElementById("totalCandidates").innerText = candidates.length;
    document.getElementById("totalJobs").innerText = jobs.length;
    document.getElementById("totalApplications").innerText = applications.length;
    document.getElementById("totalCompanies").innerText = companies.length;
    document.getElementById("pendingJobs").innerText = pendingJobs.length;
    document.getElementById("revenue").innerText = totalRevenue.toLocaleString();
    
    // Cập nhật báo cáo
    document.getElementById("reportTotalUsers").innerText = users.length;
    document.getElementById("reportTotalJobs").innerText = jobs.length;
    document.getElementById("reportTotalApps").innerText = applications.length;
    document.getElementById("reportActiveCompanies").innerText = companies.filter(c => c.status === "active").length;
    
    // Cập nhật doanh thu
    const today = new Date().toISOString().split('T')[0];
    const thisWeek = getWeekRange();
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    const revenueToday = transactions.filter(t => t.status === "completed" && t.date === today).reduce((sum, t) => sum + (t.amount || 0), 0);
    const revenueWeek = transactions.filter(t => t.status === "completed" && t.date >= thisWeek.start && t.date <= thisWeek.end).reduce((sum, t) => sum + (t.amount || 0), 0);
    const revenueMonth = transactions.filter(t => t.status === "completed" && new Date(t.date).getMonth() === thisMonth).reduce((sum, t) => sum + (t.amount || 0), 0);
    const revenueYear = transactions.filter(t => t.status === "completed" && new Date(t.date).getFullYear() === thisYear).reduce((sum, t) => sum + (t.amount || 0), 0);
    
    document.getElementById("revenueToday").innerText = revenueToday.toLocaleString() + "đ";
    document.getElementById("revenueWeek").innerText = revenueWeek.toLocaleString() + "đ";
    document.getElementById("revenueMonth").innerText = revenueMonth.toLocaleString() + "đ";
    document.getElementById("revenueYear").innerText = revenueYear.toLocaleString() + "đ";
}

function getWeekRange() {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start: start.toISOString().split('T')[0], end: end.toISOString().split('T')[0] };
}

// ==================== QUẢN LÝ NGƯỜI DÙNG ====================
let currentUserPage = 1;
const usersPerPage = 10;

function renderUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const searchTerm = document.getElementById("searchUser")?.value.toLowerCase() || "";
    const filterRole = document.querySelector("#tab-users .filter-tab.active")?.dataset.filter || "all";
    
    let filtered = users;
    if (searchTerm) {
        filtered = filtered.filter(u => u.name?.toLowerCase().includes(searchTerm) || u.email?.toLowerCase().includes(searchTerm));
    }
    if (filterRole !== "all") {
        filtered = filtered.filter(u => u.role === filterRole || u.userType === filterRole);
    }
    
    const start = (currentUserPage - 1) * usersPerPage;
    const paginated = filtered.slice(start, start + usersPerPage);
    
    const tbody = document.getElementById("userList");
    tbody.innerHTML = paginated.map(user => `
        <tr>
            <td>${user.id}</td>
            <td><div class="company-logo-cell" style="background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: white; font-weight: bold;">${(user.name?.charAt(0) || user.email?.charAt(0) || "U").toUpperCase()}</div></td>
            <td>${user.name || user.fullname || "---"}</td>
            <td>${user.email}</td>
            <td>${user.phone || "---"}</td>
            <td>${user.role === "admin" ? "Quản trị viên" : (user.role === "employer" || user.userType === "employer" ? "Nhà tuyển dụng" : "Ứng viên")}</td>
            <td><span class="status-badge ${user.status === "banned" ? "status-inactive" : "status-active"}">${user.status === "banned" ? "Đã khóa" : "Hoạt động"}</span></td>
            <td>${new Date(user.createdAt).toLocaleDateString("vi-VN") || "---"}</td>
            <td>
                <button class="btn-outline btn-sm" onclick="editUser(${user.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-danger btn-sm" onclick="deleteUser(${user.id})"><i class="fas fa-trash"></i></button>
                <button class="btn-warning btn-sm" onclick="toggleUserStatus(${user.id})"><i class="fas ${user.status === "banned" ? "fa-unlock" : "fa-lock"}"></i></button>
            </td>
        </tr>
    `).join("");
    
    // Pagination
    const totalPages = Math.ceil(filtered.length / usersPerPage);
    const paginationDiv = document.getElementById("userPagination");
    if (paginationDiv) {
        let pages = "";
        for (let i = 1; i <= totalPages; i++) {
            pages += `<button class="${i === currentUserPage ? "active" : ""}" onclick="goToUserPage(${i})">${i}</button>`;
        }
        paginationDiv.innerHTML = pages;
    }
}

function goToUserPage(page) {
    currentUserPage = page;
    renderUsers();
}

function openUserModal(userId = null) {
    document.getElementById("userModal").classList.add("active");
    if (userId) {
        document.getElementById("userModalTitle").innerText = "Sửa người dùng";
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.id === userId);
        if (user) {
            document.getElementById("userId").value = user.id;
            document.getElementById("userFullname").value = user.name || user.fullname || "";
            document.getElementById("userEmail").value = user.email;
            document.getElementById("userPhone").value = user.phone || "";
            document.getElementById("userRole").value = user.role === "admin" ? "admin" : (user.role === "employer" ? "employer" : "candidate");
            document.getElementById("userStatus").value = user.status === "banned" ? "banned" : "active";
            document.getElementById("userPassword").value = "";
        }
    } else {
        document.getElementById("userModalTitle").innerText = "Thêm người dùng";
        document.getElementById("userForm").reset();
        document.getElementById("userId").value = "";
    }
}

function closeUserModal() {
    document.getElementById("userModal").classList.remove("active");
}

function saveUser() {
    const id = document.getElementById("userId").value;
    const fullname = document.getElementById("userFullname").value;
    const email = document.getElementById("userEmail").value;
    const phone = document.getElementById("userPhone").value;
    const role = document.getElementById("userRole").value;
    const status = document.getElementById("userStatus").value;
    const password = document.getElementById("userPassword").value;
    
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    if (id) {
        // Edit
        const index = users.findIndex(u => u.id == id);
        if (index !== -1) {
            users[index].name = fullname;
            users[index].fullname = fullname;
            users[index].phone = phone;
            users[index].role = role;
            users[index].status = status;
            if (password) users[index].password = password;
        }
    } else {
        // Add new
        const newUser = {
            id: Date.now(),
            name: fullname,
            fullname: fullname,
            email: email,
            phone: phone,
            password: password || "123456",
            role: role,
            status: status,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
    }
    
    localStorage.setItem("users", JSON.stringify(users));
    closeUserModal();
    renderUsers();
    updateDashboardStats();
    showToast("Lưu người dùng thành công!", "success");
}

function editUser(id) {
    openUserModal(id);
}

function deleteUser(id) {
    if (confirm("Bạn có chắc muốn xóa người dùng này?")) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.filter(u => u.id !== id);
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
        updateDashboardStats();
        showToast("Đã xóa người dùng!", "success");
    }
}

function toggleUserStatus(id) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.id === id);
    if (user) {
        user.status = user.status === "banned" ? "active" : "banned";
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
        showToast(`Đã ${user.status === "banned" ? "khóa" : "mở khóa"} tài khoản!`, "success");
    }
}

// ==================== QUẢN LÝ VIỆC LÀM ====================
let currentJobPage = 1;
const jobsPerPage = 10;
let pendingJobId = null;

function renderJobs() {
    let jobs = JSON.parse(localStorage.getItem("hr_jobs")) || (typeof allJobs !== 'undefined' ? allJobs : []);
    const searchTerm = document.getElementById("searchJob")?.value.toLowerCase() || "";
    const filterStatus = document.querySelector("#tab-jobs .filter-tab.active")?.dataset.filter || "all";
    
    let filtered = jobs;
    if (searchTerm) {
        filtered = filtered.filter(j => j.title?.toLowerCase().includes(searchTerm) || j.company?.toLowerCase().includes(searchTerm));
    }
    if (filterStatus !== "all") {
        filtered = filtered.filter(j => j.status === filterStatus);
    }
    
    const start = (currentJobPage - 1) * jobsPerPage;
    const paginated = filtered.slice(start, start + jobsPerPage);
    
    const tbody = document.getElementById("jobList");
    tbody.innerHTML = paginated.map(job => `
        <tr>
            <td>${job.id}</td>
            <td><strong>${job.title || "---"}</strong></td>
            <td>${job.company || "---"}</td>
            <td>${job.field || "---"}</td>
            <td>${job.location || job.district || "---"}</td>
            <td><span class="status-badge ${job.status === "active" ? "status-active" : (job.status === "pending" ? "status-pending" : "status-inactive")}">${job.status === "active" ? "Đang đăng" : (job.status === "pending" ? "Chờ duyệt" : "Từ chối")}</span></td>
            <td>${job.postDate || job.date || "---"}</td>
            <td>
                <button class="btn-outline btn-sm" onclick="editJob(${job.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-danger btn-sm" onclick="deleteJob(${job.id})"><i class="fas fa-trash"></i></button>
                ${job.status === "pending" ? `<button class="btn-primary btn-sm" onclick="openApproveJobModal(${job.id})"><i class="fas fa-check-circle"></i> Duyệt</button>` : ""}
            </td>
        </tr>
    `).join("");
    
    const totalPages = Math.ceil(filtered.length / jobsPerPage);
    const paginationDiv = document.getElementById("jobPagination");
    if (paginationDiv) {
        let pages = "";
        for (let i = 1; i <= totalPages; i++) {
            pages += `<button class="${i === currentJobPage ? "active" : ""}" onclick="goToJobPage(${i})">${i}</button>`;
        }
        paginationDiv.innerHTML = pages;
    }
}

function goToJobPage(page) {
    currentJobPage = page;
    renderJobs();
}

function openApproveJobModal(jobId) {
    pendingJobId = jobId;
    const jobs = JSON.parse(localStorage.getItem("hr_jobs")) || (typeof allJobs !== 'undefined' ? allJobs : []);
    const job = jobs.find(j => j.id == jobId);
    if (job) {
        document.getElementById("jobApproveContent").innerHTML = `
            <p><strong>Tiêu đề:</strong> ${job.title}</p>
            <p><strong>Công ty:</strong> ${job.company}</p>
            <p><strong>Mô tả:</strong> ${job.desc || "Chưa có mô tả"}</p>
            <p><strong>Mức lương:</strong> ${job.salary || "Thỏa thuận"}</p>
            <p><strong>Địa điểm:</strong> ${job.location || job.district || "Đà Nẵng"}</p>
        `;
        document.getElementById("jobRejectReason").value = "";
        document.getElementById("jobApproveModal").classList.add("active");
    }
}

function closeJobApproveModal() {
    document.getElementById("jobApproveModal").classList.remove("active");
    pendingJobId = null;
}

function approveJob() {
    if (pendingJobId) {
        let jobs = JSON.parse(localStorage.getItem("hr_jobs")) || (typeof allJobs !== 'undefined' ? [...allJobs] : []);
        const index = jobs.findIndex(j => j.id == pendingJobId);
        if (index !== -1) {
            jobs[index].status = "active";
            jobs[index].approvedAt = new Date().toISOString();
            localStorage.setItem("hr_jobs", JSON.stringify(jobs));
            renderJobs();
            updateDashboardStats();
            showToast("Đã duyệt tin tuyển dụng!", "success");
        }
        closeJobApproveModal();
    }
}

function rejectJob() {
    if (pendingJobId) {
        const reason = document.getElementById("jobRejectReason").value;
        let jobs = JSON.parse(localStorage.getItem("hr_jobs")) || (typeof allJobs !== 'undefined' ? [...allJobs] : []);
        const index = jobs.findIndex(j => j.id == pendingJobId);
        if (index !== -1) {
            jobs[index].status = "rejected";
            jobs[index].rejectReason = reason;
            localStorage.setItem("hr_jobs", JSON.stringify(jobs));
            renderJobs();
            showToast("Đã từ chối tin tuyển dụng!", "warning");
        }
        closeJobApproveModal();
    }
}

function editJob(id) {
    // Chuyển sang tab chỉnh sửa hoặc mở modal
    showToast("Tính năng đang phát triển", "info");
}

function deleteJob(id) {
    if (confirm("Bạn có chắc muốn xóa tin tuyển dụng này?")) {
        let jobs = JSON.parse(localStorage.getItem("hr_jobs")) || (typeof allJobs !== 'undefined' ? [...allJobs] : []);
        jobs = jobs.filter(j => j.id != id);
        localStorage.setItem("hr_jobs", JSON.stringify(jobs));
        renderJobs();
        updateDashboardStats();
        showToast("Đã xóa tin tuyển dụng!", "success");
    }
}

function openJobModal() {
    showToast("Tính năng đang phát triển", "info");
}

// ==================== QUẢN LÝ CÔNG TY ====================
function renderCompanies() {
    let companies = JSON.parse(localStorage.getItem("companies")) || [];
    const searchTerm = document.getElementById("searchCompany")?.value.toLowerCase() || "";
    
    let filtered = companies;
    if (searchTerm) {
        filtered = filtered.filter(c => c.name?.toLowerCase().includes(searchTerm));
    }
    
    const tbody = document.getElementById("companyList");
    tbody.innerHTML = filtered.map(company => `
        <tr>
            <td>${company.id}</td>
            <td><div class="company-logo-cell"><img src="${company.logo || 'https://placehold.co/40'}" alt="${company.name}" onerror="this.src='https://placehold.co/40'"></div></td>
            <td><strong>${company.name}</strong></td>
            <td>${company.address || "---"}</td>
            <td>${company.phone || "---"}</td>
            <td><span class="status-badge ${company.status === "active" ? "status-active" : (company.status === "pending" ? "status-pending" : "status-inactive")}">${company.status === "active" ? "Hoạt động" : (company.status === "pending" ? "Chờ duyệt" : "Đã khóa")}</span></td>
            <td>
                <button class="btn-outline btn-sm" onclick="editCompany(${company.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-danger btn-sm" onclick="deleteCompany(${company.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join("");
}

function openCompanyModal(companyId = null) {
    document.getElementById("companyModal").classList.add("active");
    
    // Load industries vào select
    const industries = JSON.parse(localStorage.getItem("industries")) || [];
    const industrySelect = document.getElementById("companyIndustry");
    industrySelect.innerHTML = '<option>-- Chọn lĩnh vực --</option>' + industries.map(ind => `<option value="${ind}">${ind}</option>`).join("");
    
    if (companyId) {
        document.getElementById("companyModalTitle").innerText = "Sửa công ty";
        const companies = JSON.parse(localStorage.getItem("companies")) || [];
        const company = companies.find(c => c.id === companyId);
        if (company) {
            document.getElementById("companyId").value = company.id;
            document.getElementById("companyName").value = company.name;
            document.getElementById("companyLogo").value = company.logo || "";
            document.getElementById("companyAddress").value = company.address || "";
            document.getElementById("companyPhone").value = company.phone || "";
            document.getElementById("companyEmail").value = company.email || "";
            document.getElementById("companyIndustry").value = company.industry || "";
            document.getElementById("companyStatus").value = company.status || "pending";
        }
    } else {
        document.getElementById("companyModalTitle").innerText = "Thêm công ty";
        document.getElementById("companyForm").reset();
        document.getElementById("companyId").value = "";
    }
}

function closeCompanyModal() {
    document.getElementById("companyModal").classList.remove("active");
}

function saveCompany() {
    const id = document.getElementById("companyId").value;
    const name = document.getElementById("companyName").value;
    const logo = document.getElementById("companyLogo").value;
    const address = document.getElementById("companyAddress").value;
    const phone = document.getElementById("companyPhone").value;
    const email = document.getElementById("companyEmail").value;
    const industry = document.getElementById("companyIndustry").value;
    const status = document.getElementById("companyStatus").value;
    
    let companies = JSON.parse(localStorage.getItem("companies")) || [];
    
    if (id) {
        const index = companies.findIndex(c => c.id == id);
        if (index !== -1) {
            companies[index] = { ...companies[index], name, logo, address, phone, email, industry, status };
        }
    } else {
        const newCompany = {
            id: Date.now(),
            name, logo, address, phone, email, industry, status,
            createdAt: new Date().toISOString()
        };
        companies.push(newCompany);
    }
    
    localStorage.setItem("companies", JSON.stringify(companies));
    closeCompanyModal();
    renderCompanies();
    updateDashboardStats();
    showToast("Lưu công ty thành công!", "success");
}

function editCompany(id) {
    openCompanyModal(id);
}

function deleteCompany(id) {
    if (confirm("Bạn có chắc muốn xóa công ty này?")) {
        let companies = JSON.parse(localStorage.getItem("companies")) || [];
        companies = companies.filter(c => c.id !== id);
        localStorage.setItem("companies", JSON.stringify(companies));
        renderCompanies();
        showToast("Đã xóa công ty!", "success");
    }
}

// ==================== QUẢN LÝ CV ====================
function renderCVs() {
    const cvs = JSON.parse(localStorage.getItem("savedCVs")) || [];
    const searchTerm = document.getElementById("searchCV")?.value.toLowerCase() || "";
    
    let filtered = cvs;
    if (searchTerm) {
        filtered = filtered.filter(cv => cv.fullName?.toLowerCase().includes(searchTerm) || cv.email?.toLowerCase().includes(searchTerm));
    }
    
    const tbody = document.getElementById("cvList");
    tbody.innerHTML = filtered.map((cv, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${cv.fullName || "---"}</strong></td>
            <td>${cv.email || "---"}</td>
            <td>${cv.phone || "---"}</td>
            <td>${cv.position || "---"}</td>
            <td>${cv.createdAt || "---"}</td>
            <td><button class="btn-outline btn-sm" onclick="viewCVDetail(${index})"><i class="fas fa-eye"></i> Xem</button>
                <button class="btn-danger btn-sm" onclick="deleteCV(${index})"><i class="fas fa-trash"></i> Xóa</button>
             </tr>
    `).join("");
}

function viewCVDetail(index) {
    const cvs = JSON.parse(localStorage.getItem("savedCVs")) || [];
    const cv = cvs[index];
    if (cv) {
        alert(`📄 THÔNG TIN CV\n\nHọ tên: ${cv.fullName}\nEmail: ${cv.email}\nSĐT: ${cv.phone}\nVị trí: ${cv.position}\nGiới thiệu: ${cv.intro}\nKỹ năng: ${cv.skills}\nKinh nghiệm: ${cv.experience}`);
    }
}

function deleteCV(index) {
    if (confirm("Xóa CV này?")) {
        let cvs = JSON.parse(localStorage.getItem("savedCVs")) || [];
        cvs.splice(index, 1);
        localStorage.setItem("savedCVs", JSON.stringify(cvs));
        renderCVs();
        showToast("Đã xóa CV!", "success");
    }
}

// ==================== QUẢN LÝ DANH MỤC ====================
function renderCategories() {
    const industries = JSON.parse(localStorage.getItem("industries")) || [];
    const skills = JSON.parse(localStorage.getItem("skills")) || [];
    const locations = JSON.parse(localStorage.getItem("locations")) || [];
    const jobTypes = JSON.parse(localStorage.getItem("jobTypes")) || [];
    
    document.getElementById("industryList").innerHTML = industries.map((item, i) => `<div style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid #e2e8f0;"><span>${item}</span><button class="btn-danger btn-sm" onclick="deleteCategory('industry', ${i})"><i class="fas fa-trash"></i></button></div>`).join("");
    document.getElementById("skillList").innerHTML = skills.map((item, i) => `<div style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid #e2e8f0;"><span>${item}</span><button class="btn-danger btn-sm" onclick="deleteCategory('skill', ${i})"><i class="fas fa-trash"></i></button></div>`).join("");
    document.getElementById("locationList").innerHTML = locations.map((item, i) => `<div style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid #e2e8f0;"><span>${item}</span><button class="btn-danger btn-sm" onclick="deleteCategory('location', ${i})"><i class="fas fa-trash"></i></button></div>`).join("");
    document.getElementById("jobTypeList").innerHTML = jobTypes.map((item, i) => `<div style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid #e2e8f0;"><span>${item}</span><button class="btn-danger btn-sm" onclick="deleteCategory('jobType', ${i})"><i class="fas fa-trash"></i></button></div>`).join("");
}

function addCategory(type) {
    const name = prompt("Nhập tên danh mục mới:");
    if (name) {
        let list = JSON.parse(localStorage.getItem(`${type}s`)) || [];
        list.push(name);
        localStorage.setItem(`${type}s`, JSON.stringify(list));
        renderCategories();
        showToast(`Đã thêm ${name} vào danh mục!`, "success");
    }
}

function deleteCategory(type, index) {
    let list = JSON.parse(localStorage.getItem(`${type}s`)) || [];
    list.splice(index, 1);
    localStorage.setItem(`${type}s`, JSON.stringify(list));
    renderCategories();
    showToast("Đã xóa danh mục!", "success");
}

// ==================== QUẢN LÝ NỘI DUNG ====================
function renderContent() {
    const news = JSON.parse(localStorage.getItem("news")) || [];
    const filterType = document.querySelector("#tab-content .filter-tab.active")?.dataset.news || "all";
    
    let filtered = news;
    if (filterType !== "all") {
        filtered = news.filter(n => n.type === filterType);
    }
    
    const tbody = document.getElementById("contentList");
    tbody.innerHTML = filtered.map(item => `
        <tr>
            <td>${item.id}</td>
            <td><a href="#" onclick="viewNewsDetail(${item.id})">${item.title}</a></td>
            <td>${item.type === "news" ? "Tin tức" : (item.type === "notice" ? "Thông báo" : "Banner")}</td>
            <td>${item.date}</td>
            <td><span class="status-badge ${item.status === "active" ? "status-active" : "status-inactive"}">${item.status === "active" ? "Hiển thị" : "Ẩn"}</span></td>
            <td>
                <button class="btn-outline btn-sm" onclick="editNews(${item.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-danger btn-sm" onclick="deleteNews(${item.id})"><i class="fas fa-trash"></i></button>
             </tr>
    `).join("");
}

function openNewsModal(newsId = null) {
    showToast("Tính năng đang phát triển", "info");
}

function editNews(id) {
    showToast("Tính năng đang phát triển", "info");
}

function deleteNews(id) {
    if (confirm("Xóa nội dung này?")) {
        let news = JSON.parse(localStorage.getItem("news")) || [];
        news = news.filter(n => n.id !== id);
        localStorage.setItem("news", JSON.stringify(news));
        renderContent();
        showToast("Đã xóa!", "success");
    }
}

function viewNewsDetail(id) {
    const news = JSON.parse(localStorage.getItem("news")) || [];
    const item = news.find(n => n.id === id);
    if (item) {
        alert(`📰 ${item.title}\n\nLoại: ${item.type}\nNgày: ${item.date}`);
    }
}

// ==================== QUẢN LÝ HỖ TRỢ ====================
function renderSupport() {
    const tickets = JSON.parse(localStorage.getItem("supportTickets")) || [];
    const filterStatus = document.querySelector("#tab-support .filter-tab.active")?.dataset.support || "pending";
    
    let filtered = tickets;
    if (filterStatus !== "all") {
        filtered = tickets.filter(t => t.status === filterStatus);
    }
    
    const tbody = document.getElementById("supportList");
    tbody.innerHTML = filtered.map(ticket => `
        <tr>
            <td>${ticket.id}</td>
            <td>${ticket.userName}</td>
            <td>${ticket.title}</td>
            <td>${ticket.content.substring(0, 50)}...</td>
            <td>${ticket.date}</td>
            <td><span class="status-badge ${ticket.status === "pending" ? "status-pending" : (ticket.status === "processing" ? "status-warning" : "status-active")}">${ticket.status === "pending" ? "Chờ xử lý" : (ticket.status === "processing" ? "Đang xử lý" : "Đã giải quyết")}</span></td>
            <td>
                <button class="btn-outline btn-sm" onclick="viewSupportTicket(${ticket.id})"><i class="fas fa-eye"></i></button>
                <button class="btn-primary btn-sm" onclick="updateSupportStatus(${ticket.id}, 'processing')"><i class="fas fa-spinner"></i></button>
                <button class="btn-success btn-sm" onclick="updateSupportStatus(${ticket.id}, 'resolved')"><i class="fas fa-check"></i></button>
             </tr>
    `).join("");
}

function viewSupportTicket(id) {
    const tickets = JSON.parse(localStorage.getItem("supportTickets")) || [];
    const ticket = tickets.find(t => t.id === id);
    if (ticket) {
        alert(`📧 YÊU CẦU HỖ TRỢ\n\nNgười gửi: ${ticket.userName}\nTiêu đề: ${ticket.title}\nNội dung: ${ticket.content}\nNgày gửi: ${ticket.date}\nTrạng thái: ${ticket.status}`);
    }
}

function updateSupportStatus(id, status) {
    let tickets = JSON.parse(localStorage.getItem("supportTickets")) || [];
    const index = tickets.findIndex(t => t.id === id);
    if (index !== -1) {
        tickets[index].status = status;
        localStorage.setItem("supportTickets", JSON.stringify(tickets));
        renderSupport();
        showToast(`Đã cập nhật trạng thái!`, "success");
    }
}

// ==================== QUẢN LÝ GIAO DỊCH ====================
function renderTransactions() {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const tbody = document.getElementById("transactionList");
    tbody.innerHTML = transactions.map(trans => `
        <tr>
            <td>${trans.id}</td>
            <td>${trans.userName}</td>
            <td>${trans.package}</td>
            <td>${trans.amount.toLocaleString()}đ</td>
            <td>${trans.date}</td>
            <td><span class="status-badge ${trans.status === "completed" ? "status-active" : "status-pending"}">${trans.status === "completed" ? "Hoàn thành" : "Chờ xử lý"}</span></td>
         </tr>
    `).join("");
}

// ==================== UTILITY FUNCTIONS ====================
function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast-message ${type}`;
    toast.innerHTML = `<i class="fas ${type === "success" ? "fa-check-circle" : (type === "error" ? "fa-exclamation-circle" : "fa-info-circle")}"></i> ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function setCurrentDate() {
    const now = new Date();
    document.getElementById("currentDate").innerText = now.toLocaleDateString("vi-VN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// ==================== TAB NAVIGATION ====================
function initTabs() {
    const menuItems = document.querySelectorAll(".sidebar-menu li");
    const tabContents = document.querySelectorAll(".tab-content");
    const pageTitle = document.getElementById("pageTitle");
    const pageSubtitle = document.querySelector(".page-title p");
    
    const titles = {
        dashboard: "Tổng quan",
        users: "Quản lý người dùng",
        jobs: "Quản lý việc làm",
        companies: "Quản lý công ty",
        cvs: "Quản lý CV",
        categories: "Danh mục hệ thống",
        reports: "Báo cáo & Thống kê",
        content: "Quản lý nội dung",
        support: "Hỗ trợ người dùng",
        revenue: "Thống kê doanh thu"
    };
    
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menuItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            
            const tabId = item.dataset.tab;
            tabContents.forEach(content => content.classList.remove("active"));
            document.getElementById(`tab-${tabId}`).classList.add("active");
            
            pageTitle.innerText = titles[tabId] || "Quản trị hệ thống";
            pageSubtitle.innerText = `Quản lý ${titles[tabId]?.toLowerCase() || "hệ thống"}`;
            
            // Load dữ liệu cho từng tab
            if (tabId === "users") renderUsers();
            if (tabId === "jobs") renderJobs();
            if (tabId === "companies") renderCompanies();
            if (tabId === "cvs") renderCVs();
            if (tabId === "categories") renderCategories();
            if (tabId === "content") renderContent();
            if (tabId === "support") renderSupport();
            if (tabId === "revenue") renderTransactions();
        });
    });
}

function initFilterListeners() {
    // Filter cho users
    document.querySelectorAll("#tab-users .filter-tab").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll("#tab-users .filter-tab").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentUserPage = 1;
            renderUsers();
        });
    });
    
    // Filter cho jobs
    document.querySelectorAll("#tab-jobs .filter-tab").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll("#tab-jobs .filter-tab").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentJobPage = 1;
            renderJobs();
        });
    });
    
    // Filter cho content
    document.querySelectorAll("#tab-content .filter-tab").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll("#tab-content .filter-tab").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderContent();
        });
    });
    
    // Filter cho support
    document.querySelectorAll("#tab-support .filter-tab").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll("#tab-support .filter-tab").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderSupport();
        });
    });
    
    // Search listeners
    document.getElementById("searchUser")?.addEventListener("input", () => { currentUserPage = 1; renderUsers(); });
    document.getElementById("searchJob")?.addEventListener("input", () => { currentJobPage = 1; renderJobs(); });
    document.getElementById("searchCompany")?.addEventListener("input", renderCompanies);
    document.getElementById("searchCV")?.addEventListener("input", renderCVs);
}

// ==================== ADMIN LOGOUT ====================
function handleAdminLogout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// ==================== KHỞI TẠO ====================
document.addEventListener("DOMContentLoaded", () => {
    if (!checkAdminAuth()) return;
    
    initAdminAccount();
    initSampleData();
    setCurrentDate();
    updateDashboardStats();
    initTabs();
    initFilterListeners();
    
    // Load initial data
    renderUsers();
    renderJobs();
    renderCompanies();
    renderCVs();
    renderCategories();
    renderContent();
    renderSupport();
    renderTransactions();
});