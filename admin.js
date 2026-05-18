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

// ==================== FORCE FIX ADMIN ACCOUNT ====================
function forceFixAdminAccount() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let hasChanges = false;
    
    let adminAccount = users.find(u => u.email === "admin@danangwork.com");
    
    if (!adminAccount) {
        users.push(ADMIN_USER);
        hasChanges = true;
        console.log("✅ Đã tạo tài khoản Admin");
    } else if (adminAccount.role !== "admin") {
        adminAccount.role = "admin";
        hasChanges = true;
        console.log("🔄 Đã sửa role Admin thành 'admin'");
    }
    
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.email === "admin@danangwork.com" && currentUser.role !== "admin") {
        currentUser.role = "admin";
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        console.log("🔄 Đã sửa role trong currentUser cho Admin");
    }
    
    if (hasChanges) {
        localStorage.setItem("users", JSON.stringify(users));
    }
}
forceFixAdminAccount();

// ==================== KIỂM TRA ĐĂNG NHẬP ADMIN ====================
function checkAdminAuth() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser || currentUser.role !== "admin") {
        if (currentUser && currentUser.email === "admin@danangwork.com") {
            currentUser.role = "admin";
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            console.log("🔄 Đã sửa role Admin trong checkAdminAuth");
            document.getElementById("adminName").innerText = currentUser.name || "Admin";
            return true;
        }
        window.location.href = "login.html";
        return false;
    }
    
    document.getElementById("adminName").innerText = currentUser.name || "Admin";
    return true;
}

// ==================== VALIDATION FUNCTIONS ====================
function validateFullName(name) {
    if (!name || name.trim().length === 0) {
        return { valid: false, message: "Họ tên không được để trống!" };
    }
    if (name.trim().length < 2) {
        return { valid: false, message: "Họ tên phải có ít nhất 2 ký tự!" };
    }
    if (/\d/.test(name)) {
        return { valid: false, message: "Họ tên không được chứa số!" };
    }
    if (/[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~`]/.test(name)) {
        return { valid: false, message: "Họ tên không được chứa ký tự đặc biệt!" };
    }
    if (!/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸửữựỵỷỹ\s]+$/.test(name)) {
        return { valid: false, message: "Họ tên chỉ được chứa chữ cái và dấu cách!" };
    }
    return { valid: true };
}

function validateFullNameRealtime() {
    const nameField = document.getElementById("userFullname");
    if (!nameField) return;
    
    const name = nameField.value.trim();
    const validation = validateFullName(name);
    const parent = nameField.closest('.form-group') || nameField.parentElement;
    const oldError = parent.querySelector('.name-error');
    
    if (oldError) oldError.remove();
    
    if (!validation.valid && name.length > 0) {
        nameField.style.border = "1px solid #ef4444";
        const errorSpan = document.createElement("span");
        errorSpan.className = "name-error";
        errorSpan.style.color = "#ef4444";
        errorSpan.style.fontSize = "11px";
        errorSpan.style.marginTop = "4px";
        errorSpan.style.display = "block";
        errorSpan.innerText = validation.message;
        parent.appendChild(errorSpan);
    } else if (validation.valid && name.length > 0) {
        nameField.style.border = "1px solid #22c55e";
    } else {
        nameField.style.border = "";
    }
}

function validatePhoneNumber(phone) {
    if (!phone || phone.trim().length === 0) {
        return { valid: false, message: "Số điện thoại không được để trống!" };
    }
    if (/[a-zA-Z]/.test(phone)) {
        return { valid: false, message: "Số điện thoại không được chứa chữ cái!" };
    }
    if (/[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~`]/.test(phone)) {
        return { valid: false, message: "Số điện thoại không được chứa ký tự đặc biệt!" };
    }
    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
        return { valid: false, message: "Số điện thoại không hợp lệ! (VD: 0912345678)" };
    }
    return { valid: true };
}

function validatePhoneRealtime() {
    const phoneField = document.getElementById("userPhone");
    if (!phoneField) return;
    
    const phone = phoneField.value.trim();
    const validation = validatePhoneNumber(phone);
    const parent = phoneField.closest('.form-group') || phoneField.parentElement;
    const oldError = parent.querySelector('.phone-error');
    
    if (oldError) oldError.remove();
    
    if (!validation.valid && phone.length > 0) {
        phoneField.style.border = "1px solid #ef4444";
        const errorSpan = document.createElement("span");
        errorSpan.className = "phone-error";
        errorSpan.style.color = "#ef4444";
        errorSpan.style.fontSize = "11px";
        errorSpan.style.marginTop = "4px";
        errorSpan.style.display = "block";
        errorSpan.innerText = validation.message;
        parent.appendChild(errorSpan);
    } else if (validation.valid && phone.length > 0) {
        phoneField.style.border = "1px solid #22c55e";
    } else {
        phoneField.style.border = "";
    }
}

function validateEditJobForm() {
    const title = document.getElementById("editJobTitle").value.trim();
    const company = document.getElementById("editJobCompany").value.trim();
    const field = document.getElementById("editJobField").value;
    const location = document.getElementById("editJobLocation").value.trim();
    const salary = document.getElementById("editJobSalary").value.trim();
    const desc = document.getElementById("editJobDesc").value.trim();
    const status = document.getElementById("editJobStatus").value;
    
    let isValid = true;
    
    document.querySelectorAll(".edit-job-error").forEach(el => el.remove());
    document.querySelectorAll("#editJobModal input, #editJobModal select, #editJobModal textarea").forEach(el => {
        el.classList.remove("error");
        el.style.border = "";
    });
    
    if (!title) {
        showEditJobError("editJobTitle", "Vui lòng nhập tiêu đề tin!");
        isValid = false;
    } else if (title.length < 5) {
        showEditJobError("editJobTitle", "Tiêu đề phải có ít nhất 5 ký tự!");
        isValid = false;
    }
    
    if (!company) {
        showEditJobError("editJobCompany", "Vui lòng nhập tên công ty!");
        isValid = false;
    }
    
    if (!field || field === "") {
        showEditJobError("editJobField", "Vui lòng chọn lĩnh vực!");
        isValid = false;
    }
    
    if (!location) {
        showEditJobError("editJobLocation", "Vui lòng nhập địa điểm!");
        isValid = false;
    }
    
    if (!salary) {
        showEditJobError("editJobSalary", "Vui lòng nhập mức lương!");
        isValid = false;
    }
    
    if (!desc) {
        showEditJobError("editJobDesc", "Vui lòng nhập mô tả công việc!");
        isValid = false;
    } else if (desc.length < 20) {
        showEditJobError("editJobDesc", "Mô tả phải có ít nhất 20 ký tự!");
        isValid = false;
    }
    
    if (!status) {
        showEditJobError("editJobStatus", "Vui lòng chọn trạng thái!");
        isValid = false;
    }
    
    return isValid;
}

function showEditJobError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    field.classList.add("error");
    field.style.border = "1px solid #ef4444";
    
    let parent = field.closest('.form-group');
    if (!parent) parent = field.parentElement;
    
    const oldError = parent.querySelector('.edit-job-error');
    if (oldError) oldError.remove();
    
    const errorSpan = document.createElement("span");
    errorSpan.className = "edit-job-error";
    errorSpan.style.color = "#ef4444";
    errorSpan.style.fontSize = "11px";
    errorSpan.style.marginTop = "4px";
    errorSpan.style.display = "block";
    errorSpan.innerText = message;
    parent.appendChild(errorSpan);
}

function clearEditJobErrors() {
    document.querySelectorAll(".edit-job-error").forEach(el => el.remove());
    document.querySelectorAll("#editJobModal input, #editJobModal select, #editJobModal textarea").forEach(el => {
        el.classList.remove("error");
        el.style.border = "";
    });
}

function setupEditJobRealtimeValidation() {
    const fields = ["editJobTitle", "editJobCompany", "editJobLocation", "editJobSalary", "editJobDesc"];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener("input", function() {
                const parent = this.closest('.form-group') || this.parentElement;
                const oldError = parent.querySelector('.edit-job-error');
                if (oldError) oldError.remove();
                this.classList.remove("error");
                this.style.border = "";
            });
        }
    });
    
    const selects = ["editJobField", "editJobStatus"];
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.addEventListener("change", function() {
                const parent = this.closest('.form-group') || this.parentElement;
                const oldError = parent.querySelector('.edit-job-error');
                if (oldError) oldError.remove();
                this.classList.remove("error");
                this.style.border = "";
            });
        }
    });
}

// ==================== QUẢN LÝ YÊU CẦU XÓA TỪ HR ====================
function renderDeleteRequests() {
    const notifications = JSON.parse(localStorage.getItem("admin_notifications")) || [];
    const deleteRequests = notifications.filter(n => n.type === "delete_request" && !n.resolved);
    
    const container = document.getElementById("deleteRequestsList");
    if (!container) return;
    
    if (deleteRequests.length === 0) {
        container.innerHTML = '<div class="empty-state" style="text-align:center; padding:40px; color:#94a3b8;">📭 Không có yêu cầu xóa nào</div>';
        return;
    }
    
    container.innerHTML = deleteRequests.map(req => `
        <div class="delete-request-card" data-id="${req.id}">
            <div class="request-header">
                <strong>🗑️ Yêu cầu xóa tin</strong>
                <span class="request-date">${new Date(req.createdAt).toLocaleString('vi-VN')}</span>
            </div>
            <div class="request-content">
                <p><strong>Tiêu đề:</strong> ${escapeHtml(req.jobTitle)}</p>
                <p><strong>Công ty:</strong> ${escapeHtml(req.jobCompany)}</p>
                <p><strong>Lý do:</strong> ${escapeHtml(req.reason)}</p>
            </div>
            <div class="request-actions">
                <button class="btn-success btn-sm" onclick="approveDeleteRequest(${req.id}, ${req.jobId})"><i class="fas fa-check"></i> Duyệt xóa</button>
                <button class="btn-danger btn-sm" onclick="rejectDeleteRequest(${req.id})"><i class="fas fa-times"></i> Từ chối</button>
            </div>
        </div>
    `).join('');
}

// Duyệt yêu cầu xóa
function approveDeleteRequest(notifId, jobId) {
    if (!confirm("Xác nhận duyệt xóa tin tuyển dụng này?")) return;
    
    let hrJobs = JSON.parse(localStorage.getItem("hr_jobs")) || [];
    const deletedJob = hrJobs.find(j => String(j.id) === String(jobId));
    hrJobs = hrJobs.filter(j => String(j.id) !== String(jobId));
    localStorage.setItem("hr_jobs", JSON.stringify(hrJobs));
    
    let requests = JSON.parse(localStorage.getItem('jobDeleteRequests')) || [];
    requests = requests.filter(r => String(r.jobId) !== String(jobId));
    localStorage.setItem('jobDeleteRequests', JSON.stringify(requests));
    
    let hrNotifications = JSON.parse(localStorage.getItem("hr_notifications")) || [];
    hrNotifications.unshift({
        id: Date.now(),
        title: "✅ Tin tuyển dụng đã được xóa",
        content: `Admin đã phê duyệt yêu cầu xóa tin: "${deletedJob?.title || 'Tin tuyển dụng'}".`,
        type: "system",
        time: new Date().toLocaleTimeString('vi-VN'),
        read: false
    });
    localStorage.setItem("hr_notifications", JSON.stringify(hrNotifications));
    
    window.dispatchEvent(new StorageEvent('storage', {
        key: 'hr_jobs',
        newValue: JSON.stringify(hrJobs)
    }));
    window.dispatchEvent(new StorageEvent('storage', {
        key: 'hr_notifications',
        newValue: JSON.stringify(hrNotifications)
    }));
    
    alert("✅ Đã xóa tin và gửi thông báo cho HR!");
    renderDeleteRequests();
}

// Từ chối yêu cầu xóa
function rejectDeleteRequest(notifId) {
    const reason = prompt("Nhập lý do từ chối yêu cầu xóa:", "Tin vẫn còn giá trị sử dụng");
    if (!reason) return;
    
    let notifications = JSON.parse(localStorage.getItem("admin_notifications")) || [];
    const notifIndex = notifications.findIndex(n => n.id == notifId);
    const jobId = notifications[notifIndex]?.jobId;
    
    let hrJobs = JSON.parse(localStorage.getItem("hr_jobs")) || [];
    const jobIndex = hrJobs.findIndex(j => j.id == jobId);
    if (jobIndex !== -1) {
        hrJobs[jobIndex].status = "active";
        delete hrJobs[jobIndex].deleteRequest;
        localStorage.setItem("hr_jobs", JSON.stringify(hrJobs));
    }
    
    if (notifIndex !== -1) {
        notifications[notifIndex].resolved = true;
        notifications[notifIndex].status = "rejected";
        notifications[notifIndex].rejectReason = reason;
        notifications[notifIndex].resolvedAt = new Date().toISOString();
    }
    localStorage.setItem("admin_notifications", JSON.stringify(notifications));
    
    let hrNotifications = JSON.parse(localStorage.getItem("hr_notifications")) || [];
    hrNotifications.unshift({
        id: Date.now(),
        title: "❌ Yêu cầu xóa tin bị từ chối",
        content: `Yêu cầu xóa tin "${notifications[notifIndex]?.jobTitle || 'không xác định'}" đã bị từ chối. Lý do: ${reason}`,
        type: "delete_rejected",
        time: "Vừa xong",
        read: false
    });
    localStorage.setItem("hr_notifications", JSON.stringify(hrNotifications));
    
    renderDeleteRequests();
    renderJobs();
    
    alert("❌ Đã từ chối yêu cầu xóa!");
}

// ==================== XÁC MINH THANH TOÁN ====================
function renderPaymentVerifications() {
    const pendingPayments = JSON.parse(localStorage.getItem('pending_payments')) || [];
    const container = document.getElementById('paymentVerificationsList');
    
    if (!container) return;
    
    if (pendingPayments.length === 0) {
        container.innerHTML = '<div class="empty-state" style="text-align:center;padding:40px;"><i class="fas fa-check-circle" style="font-size:48px;color:#10b981;"></i><p style="margin-top:12px;">Không có yêu cầu xác minh thanh toán nào</p></div>';
        return;
    }
    
    container.innerHTML = pendingPayments.map(payment => `
        <div class="payment-request-card" style="background:white;border-radius:16px;padding:20px;margin-bottom:16px;border:1px solid #e2e8f0;">
            <div class="request-header" style="display:flex;justify-content:space-between;margin-bottom:12px;">
                <strong style="color:#ef4444;">💰 Yêu cầu xác minh thanh toán</strong>
                <span style="font-size:12px;color:#64748b;">${new Date(payment.submittedAt).toLocaleString('vi-VN')}</span>
            </div>
            <div class="request-content">
                <p><strong>Tin tuyển dụng:</strong> ${escapeHtml(payment.jobTitle)}</p>
                <p><strong>Công ty:</strong> ${escapeHtml(payment.company)}</p>
                <p><strong>Mã giao dịch:</strong> <span style="color:#ef4444;font-weight:bold;">${payment.transactionCode}</span></p>
                <p><strong>Số tiền cần xác minh:</strong> <span style="color:#10b981;font-weight:bold;">${payment.amount.toLocaleString('vi-VN')}đ</span></p>
                <div class="payment-proof" style="margin-top:12px;">
                    <strong>Ảnh chụp chuyển khoản:</strong>
                    <div style="margin-top:8px;">
                        <img src="${payment.paymentProof}" alt="Proof" style="max-width:100%;max-height:200px;border-radius:8px;border:1px solid #e2e8f0;">
                    </div>
                </div>
            </div>
            <div class="request-actions" style="display:flex;gap:12px;margin-top:16px;justify-content:flex-end;">
                <button class="btn-success btn-sm" onclick="verifyPayment('${payment.id}', true, ${payment.amount})" style="background:#10b981;color:white;border:none;padding:8px16px;border-radius:8px;cursor:pointer;">
                    <i class="fas fa-check-circle"></i> Xác nhận đã nhận tiền
                </button>
                <button class="btn-danger btn-sm" onclick="verifyPayment('${payment.id}', false, ${payment.amount})" style="background:#ef4444;color:white;border:none;padding:8px16px;border-radius:8px;cursor:pointer;">
                    <i class="fas fa-times-circle"></i> Từ chối (sai số tiền)
                </button>
            </div>
        </div>
    `).join('');
}

window.verifyPayment = function(paymentId, isVerified, expectedAmount) {
    if (!confirm(isVerified ? 'Xác nhận đã nhận đủ tiền và duyệt tin đăng?' : 'Từ chối yêu cầu này?')) return;
    
    let pendingPayments = JSON.parse(localStorage.getItem('pending_payments')) || [];
    const paymentIndex = pendingPayments.findIndex(p => String(p.id) === String(paymentId));
    
    if (paymentIndex === -1) return;
    
    const payment = pendingPayments[paymentIndex];
    let hrJobs = JSON.parse(localStorage.getItem('hr_jobs')) || [];
    const jobIndex = hrJobs.findIndex(j => String(j.id) === String(payment.id));
    
    if (isVerified) {
        if (jobIndex !== -1) {
            hrJobs[jobIndex].status = 'active';
            hrJobs[jobIndex].paymentStatus = 'verified';
            hrJobs[jobIndex].verifiedAt = new Date().toISOString();
            localStorage.setItem('hr_jobs', JSON.stringify(hrJobs));
        }
        
        pendingPayments.splice(paymentIndex, 1);
        localStorage.setItem('pending_payments', JSON.stringify(pendingPayments));
        
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.unshift({
            id: payment.transactionCode,
            companyName: payment.company,
            package: "Đăng tin",
            days: payment.duration || 7,
            amount: payment.amount,
            date: new Date().toISOString().split('T')[0],
            status: "completed"
        });
        localStorage.setItem('transactions', JSON.stringify(transactions));
        
        let hrNotifications = JSON.parse(localStorage.getItem('hr_notifications')) || [];
        hrNotifications.unshift({
            id: Date.now(),
            title: "✅ Thanh toán thành công! Tin đã được duyệt",
            content: `Thanh toán ${expectedAmount.toLocaleString('vi-VN')}đ cho tin "${payment.jobTitle}" đã được xác nhận. Tin của bạn đã được đăng tải.`,
            type: "payment_success",
            time: "Vừa xong",
            read: false
        });
        localStorage.setItem('hr_notifications', JSON.stringify(hrNotifications));
        
        alert(`✅ Đã xác nhận thanh toán ${expectedAmount.toLocaleString('vi-VN')}đ và duyệt tin!`);
    } else {
        if (jobIndex !== -1) {
            hrJobs.splice(jobIndex, 1);
            localStorage.setItem('hr_jobs', JSON.stringify(hrJobs));
        }
        
        pendingPayments.splice(paymentIndex, 1);
        localStorage.setItem('pending_payments', JSON.stringify(pendingPayments));
        
        let hrNotifications = JSON.parse(localStorage.getItem('hr_notifications')) || [];
        hrNotifications.unshift({
            id: Date.now(),
            title: "❌ Thanh toán không thành công",
            content: `Yêu cầu đăng tin "${payment.jobTitle}" bị từ chối do số tiền chuyển khoản không chính xác. Vui lòng thử lại.`,
            type: "payment_failed",
            time: "Vừa xong",
            read: false
        });
        localStorage.setItem('hr_notifications', JSON.stringify(hrNotifications));
        
        alert(`❌ Đã từ chối yêu cầu! HR sẽ nhận được thông báo.`);
    }
    
    renderPaymentVerifications();
    if (typeof renderJobs === 'function') renderJobs();
    updateStats();
};

// ==================== ĐỒNG BỘ DỮ LIỆU TỪ FILE GỐC ====================
function syncJobsFromData() {
    if (typeof allJobs !== 'undefined' && allJobs.length > 0) {
        let existingJobs = JSON.parse(localStorage.getItem("hr_jobs")) || [];
        let hasChanges = false;
        
        allJobs.forEach(job => {
            const exists = existingJobs.some(j => j.id === job.id);
            if (!exists) {
                existingJobs.push({
                    ...job,
                    status: job.status || "active",
                    postDate: job.postDate || new Date().toLocaleDateString('vi-VN')
                });
                hasChanges = true;
            }
        });
        
        if (hasChanges) {
            localStorage.setItem("hr_jobs", JSON.stringify(existingJobs));
            console.log(`✅ Đã đồng bộ ${allJobs.length} việc làm từ jobs-data.js`);
        }
        return existingJobs;
    }
    return JSON.parse(localStorage.getItem("hr_jobs")) || [];
}

function syncCompaniesFromData() {
    if (typeof companyData !== 'undefined') {
        let existingCompanies = JSON.parse(localStorage.getItem("companies")) || [];
        let hasChanges = false;
        
        Object.keys(companyData).forEach(key => {
            const company = companyData[key];
            const exists = existingCompanies.some(c => c.name === company.name);
            if (!exists) {
                existingCompanies.push({
                    id: Date.now() + Math.random() * 1000,
                    name: company.name,
                    logo: company.logo,
                    address: company.location,
                    phone: company.contact?.phone || "",
                    email: company.contact?.email || "",
                    industry: company.industry || "Đa ngành",
                    size: company.size || "",
                    rating: company.rating || "4.5",
                    desc: company.desc || "",
                    benefits: company.benefits || [],
                    status: "active",
                    createdAt: new Date().toISOString()
                });
                hasChanges = true;
            }
        });
        
        if (hasChanges) {
            localStorage.setItem("companies", JSON.stringify(existingCompanies));
            console.log(`✅ Đã đồng bộ ${Object.keys(companyData).length} công ty từ data-congty.js`);
        }
        return existingCompanies;
    }
    return JSON.parse(localStorage.getItem("companies")) || [];
}

function initSyncData() {
    syncJobsFromData();
    syncCompaniesFromData();
}

// ==================== KHỞI TẠO DỮ LIỆU MẪU ====================
function initAdminAccount() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const adminExists = users.some(u => u.email === ADMIN_USER.email);
    if (!adminExists) {
        users.push(ADMIN_USER);
        localStorage.setItem("users", JSON.stringify(users));
    }
}

function initSampleData() {
    if (!localStorage.getItem("industries")) {
        localStorage.setItem("industries", JSON.stringify([
            "Công nghệ thông tin", "Du lịch - Khách sạn", "Xây dựng - Bất động sản",
            "Kinh doanh - Marketing", "Logistics - Vận hành", "Giáo dục - Đào tạo",
            "Tài chính - Ngân hàng", "Thiết kế - Sáng tạo"
        ]));
    }
    if (!localStorage.getItem("skills")) {
        localStorage.setItem("skills", JSON.stringify([
            "ReactJS", "NodeJS", "Python", "Java", "PHP", "Flutter",
            "SQL", "MongoDB", "AWS", "Docker", "Figma", "Photoshop"
        ]));
    }
    if (!localStorage.getItem("locations")) {
        localStorage.setItem("locations", JSON.stringify([
            "Hải Châu", "Thanh Khê", "Liên Chiểu", "Ngũ Hành Sơn", "Sơn Trà", "Cẩm Lệ"
        ]));
    }
    if (!localStorage.getItem("jobTypes")) {
        localStorage.setItem("jobTypes", JSON.stringify([
            "Toàn thời gian", "Bán thời gian", "Thực tập", "Freelance", "Remote"
        ]));
    }
    if (!localStorage.getItem("supportTickets")) {
        localStorage.setItem("supportTickets", JSON.stringify([
            { id: 1, userName: "Nguyễn Văn A", title: "Không thể đăng nhập", content: "Em không thể đăng nhập vào tài khoản", date: "2026-05-10", status: "pending" },
            { id: 2, userName: "Công ty ABC", title: "Tin đăng bị lỗi", content: "Tin đăng của công ty em không hiển thị", date: "2026-05-11", status: "processing" }
        ]));
    }
    if (!localStorage.getItem("transactions")) {
        localStorage.setItem("transactions", JSON.stringify([
            { id: "TXN001", companyName: "FPT Software", package: "Premium", days: 30, amount: 1500000, date: "2026-05-01", status: "completed" },
            { id: "TXN002", companyName: "Vinpearl Resort", package: "Premium", days: 30, amount: 1500000, date: "2026-05-05", status: "completed" },
            { id: "TXN003", companyName: "Sun Group", package: "Basic", days: 7, amount: 350000, date: "2026-05-10", status: "pending" },
            { id: "TXN004", companyName: "Viettel Post", package: "Basic", days: 7, amount: 350000, date: "2026-05-12", status: "completed" }
        ]));
    }
}

// ==================== CẬP NHẬT THỐNG KÊ ====================
function getWeekRange() {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start: start.toISOString().split('T')[0], end: end.toISOString().split('T')[0] };
}

function updateStats() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const jobs = JSON.parse(localStorage.getItem("hr_jobs")) || [];
    const applications = JSON.parse(localStorage.getItem("applications")) || [];
    const companies = JSON.parse(localStorage.getItem("companies")) || [];
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    
    const employers = users.filter(u => u.role === "employer" || u.userType === "employer" || u.role === "hr");
    const candidates = users.filter(u => u.role === "candidate");
    const pendingJobs = jobs.filter(j => j.status === "pending");
    const totalRevenue = transactions.filter(t => t.status === "completed").reduce((sum, t) => sum + (t.amount || 0), 0);
    
    const elements = {
        totalUsers: users.length,
        totalEmployers: employers.length,
        totalCandidates: candidates.length,
        totalJobs: jobs.length,
        totalApplications: applications.length,
        totalCompanies: companies.length,
        pendingJobs: pendingJobs.length,
        totalRevenue: totalRevenue.toLocaleString()
    };
    
    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.innerText = value;
    }
    
    const reportTotalUsers = document.getElementById("reportTotalUsers");
    const reportTotalJobs = document.getElementById("reportTotalJobs");
    const reportTotalApps = document.getElementById("reportTotalApps");
    const reportActiveCompanies = document.getElementById("reportActiveCompanies");
    
    if (reportTotalUsers) reportTotalUsers.innerText = users.length;
    if (reportTotalJobs) reportTotalJobs.innerText = jobs.length;
    if (reportTotalApps) reportTotalApps.innerText = applications.length;
    if (reportActiveCompanies) reportActiveCompanies.innerText = companies.filter(c => c.status === "active").length;
    
    const today = new Date().toISOString().split('T')[0];
    const thisWeek = getWeekRange();
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    const revenueToday = transactions.filter(t => t.status === "completed" && t.date === today).reduce((s, t) => s + t.amount, 0);
    const revenueWeek = transactions.filter(t => t.status === "completed" && t.date >= thisWeek.start && t.date <= thisWeek.end).reduce((s, t) => s + t.amount, 0);
    const revenueMonth = transactions.filter(t => t.status === "completed" && new Date(t.date).getMonth() === thisMonth && new Date(t.date).getFullYear() === thisYear).reduce((s, t) => s + t.amount, 0);
    const revenueYear = transactions.filter(t => t.status === "completed" && new Date(t.date).getFullYear() === thisYear).reduce((s, t) => s + t.amount, 0);
    
    const revenueElements = {
        revenueToday: revenueToday,
        revenueWeek: revenueWeek,
        revenueMonth: revenueMonth,
        revenueYear: revenueYear
    };
    
    for (const [id, value] of Object.entries(revenueElements)) {
        const el = document.getElementById(id);
        if (el) el.innerText = value.toLocaleString() + "đ";
    }
    
    renderTransactions();
}

// ==================== RENDER TRANSACTIONS ====================
function renderTransactions(data) {
    const transactions = data || JSON.parse(localStorage.getItem("transactions")) || [];
    const tbody = document.getElementById("transactionList");
    if (!tbody) return;
    
    if (transactions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:40px; color:#94a3b8;">📢 Chưa có dữ liệu giao dịch</td></tr>`;
        return;
    }
    
    tbody.innerHTML = transactions.map(t => `
        <tr>
            <td>${t.id || t.transactionCode || "---"}</td>
            <td>${t.companyName || t.jobTitle || "Hệ thống"}</td>
            <td><span class="status-badge" style="background:#f0f9ff; color:#0369a1; border:none;">${t.package || "Đăng tin"}</span></td>
            <td>${t.duration || t.days || 0} ngày</td>
            <td style="color: #10b981; font-weight: 700;">${(Number(t.amount) || 0).toLocaleString()}đ</td>
            <td>${t.date ? new Date(t.date).toLocaleDateString('vi-VN') : (t.startDate || "---")}</td>
            <td>
                <span class="status-badge ${t.status === 'completed' ? 'status-active' : 'status-pending'}">
                    ${t.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý'}
                </span>
            </td>
        </tr>
    `).join("");
}

// ==================== QUẢN LÝ NGƯỜI DÙNG ====================
let currentUserPage = 1;
const usersPerPage = 10;

function renderUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const searchTerm = document.getElementById("searchUser")?.value.toLowerCase() || "";
    const filterRole = document.querySelector("#tab-users .filter-tab.active")?.dataset.filter || "all";
    
    let filtered = users;
    if (searchTerm) filtered = filtered.filter(u => u.name?.toLowerCase().includes(searchTerm) || u.email?.toLowerCase().includes(searchTerm));
    if (filterRole !== "all") filtered = filtered.filter(u => u.role === filterRole || u.userType === filterRole);
    
    const start = (currentUserPage - 1) * usersPerPage;
    const paginated = filtered.slice(start, start + usersPerPage);
    
    const tbody = document.getElementById("userList");
    if (!tbody) return;
    
    tbody.innerHTML = paginated.map(user => `
        <tr>
            <td>${user.id}</td>
            <td><div class="company-logo-cell" style="background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: white; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center;">${(user.name?.charAt(0) || user.email?.charAt(0) || "U").toUpperCase()}</div></td>
            <td>${user.name || user.fullname || "---"}</td>
            <td>${user.email}</td>
            <td>${user.phone || "---"}</td>
            <td>${user.role === "admin" ? "Quản trị viên" : (user.role === "employer" || user.role === "hr" ? "Nhà tuyển dụng" : "Ứng viên")}</td>
            <td><span class="status-badge ${user.status === "banned" ? "status-inactive" : "status-active"}">${user.status === "banned" ? "Đã khóa" : "Hoạt động"}</span></td>
            <td>${user.createdAt ? new Date(user.createdAt).toLocaleDateString("vi-VN") : "---"}</td>
            <td>
                <button class="btn-outline btn-sm" onclick="editUser(${user.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-danger btn-sm" onclick="deleteUser(${user.id})"><i class="fas fa-trash"></i></button>
                <button class="btn-warning btn-sm" onclick="toggleUserStatus(${user.id})"><i class="fas ${user.status === "banned" ? "fa-unlock" : "fa-lock"}"></i></button>
              </td>
        </tr>
    `).join("");
    
    const totalPages = Math.ceil(filtered.length / usersPerPage);
    const paginationDiv = document.getElementById("userPagination");
    if (paginationDiv) {
        paginationDiv.innerHTML = totalPages > 1 ? Array.from({length: totalPages}, (_, i) => `<button class="${i+1 === currentUserPage ? 'active' : ''}" onclick="goToUserPage(${i+1})">${i+1}</button>`).join('') : '';
    }
}

function goToUserPage(page) { currentUserPage = page; renderUsers(); }

function openUserModal(userId = null) {
    const modal = document.getElementById("userModal");
    if (!modal) return;
    modal.classList.add("active");
    
    const emailField = document.getElementById("userEmail");
    const phoneField = document.getElementById("userPhone");
    const nameField = document.getElementById("userFullname");
    
    if (userId) {
        document.getElementById("userModalTitle").innerText = "Sửa người dùng";
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.id === userId);
        if (user) {
            document.getElementById("userId").value = user.id;
            document.getElementById("userFullname").value = user.name || user.fullname || "";
            document.getElementById("userEmail").value = user.email;
            document.getElementById("userPhone").value = user.phone || "";
            document.getElementById("userRole").value = user.role === "admin" ? "admin" : (user.role === "employer" || user.role === "hr" ? "employer" : "candidate");
            document.getElementById("userStatus").value = user.status === "banned" ? "banned" : "active";
            document.getElementById("userPassword").value = "";
            
            if (emailField) {
                emailField.readOnly = true;
                emailField.style.backgroundColor = "#f1f5f9";
                emailField.style.cursor = "not-allowed";
            }
        }
    } else {
        document.getElementById("userModalTitle").innerText = "Thêm người dùng";
        document.getElementById("userForm").reset();
        document.getElementById("userId").value = "";
        document.getElementById("userPassword").value = "";
        
        if (emailField) {
            emailField.readOnly = false;
            emailField.style.backgroundColor = "";
            emailField.style.cursor = "text";
        }
    }
    
    if (phoneField) {
        phoneField.removeEventListener('input', validatePhoneRealtime);
        phoneField.addEventListener('input', validatePhoneRealtime);
    }
    
    if (nameField) {
        nameField.removeEventListener('input', validateFullNameRealtime);
        nameField.addEventListener('input', validateFullNameRealtime);
    }
}

function closeUserModal() { 
    const modal = document.getElementById("userModal");
    if (modal) modal.classList.remove("active");
    
    const emailField = document.getElementById("userEmail");
    if (emailField) {
        emailField.readOnly = false;
        emailField.style.backgroundColor = "";
        emailField.style.cursor = "text";
    }
    
    const phoneField = document.getElementById("userPhone");
    if (phoneField) {
        phoneField.style.border = "";
        const phoneParent = phoneField.closest('.form-group') || phoneField.parentElement;
        const phoneError = phoneParent.querySelector('.phone-error');
        if (phoneError) phoneError.remove();
    }
    
    const nameField = document.getElementById("userFullname");
    if (nameField) {
        nameField.style.border = "";
        const nameParent = nameField.closest('.form-group') || nameField.parentElement;
        const nameError = nameParent.querySelector('.name-error');
        if (nameError) nameError.remove();
    }
}

function saveUser() {
    const id = document.getElementById("userId").value;
    const fullname = document.getElementById("userFullname").value;
    const email = document.getElementById("userEmail").value;
    const phone = document.getElementById("userPhone").value;
    const role = document.getElementById("userRole").value;
    const status = document.getElementById("userStatus").value;
    const password = document.getElementById("userPassword").value;
    
    const nameValidation = validateFullName(fullname);
    if (!nameValidation.valid) {
        alert(`❌ ${nameValidation.message}`);
        document.getElementById("userFullname").focus();
        return;
    }
    
    const phoneValidation = validatePhoneNumber(phone);
    if (!phoneValidation.valid) {
        alert(`❌ ${phoneValidation.message}`);
        document.getElementById("userPhone").focus();
        return;
    }
    
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    if (id) {
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
        if (users.some(u => u.email === email)) {
            alert("❌ Email đã tồn tại trong hệ thống!");
            document.getElementById("userEmail").focus();
            return;
        }
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
    updateStats();
    alert("✅ Lưu người dùng thành công!");
}

function editUser(id) { openUserModal(id); }
function deleteUser(id) { if(confirm("Xóa người dùng này?")){ let users = JSON.parse(localStorage.getItem("users")) || []; users = users.filter(u => u.id !== id); localStorage.setItem("users", JSON.stringify(users)); renderUsers(); updateStats(); alert("Đã xóa!"); } }
function toggleUserStatus(id) { let users = JSON.parse(localStorage.getItem("users")) || []; const user = users.find(u => u.id === id); if(user){ user.status = user.status === "banned" ? "active" : "banned"; localStorage.setItem("users", JSON.stringify(users)); renderUsers(); alert(`Đã ${user.status === "banned" ? "khóa" : "mở khóa"} tài khoản!`); } }

// ==================== QUẢN LÝ VIỆC LÀM ====================
let currentJobPage = 1;
const jobsPerPage = 10;
let editingJobId = null;
let currentApproveJobId = null;

function renderJobs() {
    let jobs = syncJobsFromData();
    
    const searchTerm = document.getElementById("searchJob")?.value.toLowerCase() || "";
    const filterStatus = document.querySelector("#tab-jobs .filter-tab.active")?.dataset.filter || "all";
    
    let filtered = jobs;
    if (searchTerm) filtered = filtered.filter(j => j.title?.toLowerCase().includes(searchTerm) || j.company?.toLowerCase().includes(searchTerm));
    if (filterStatus !== "all") filtered = filtered.filter(j => j.status === filterStatus);
    
    const start = (currentJobPage - 1) * jobsPerPage;
    const paginated = filtered.slice(start, start + jobsPerPage);
    
    const tbody = document.getElementById("jobList");
    if (!tbody) return;
    
    if (paginated.length === 0 && filtered.length > 0) {
        currentJobPage = Math.max(1, Math.ceil(filtered.length / jobsPerPage));
        renderJobs();
        return;
    }
    
    tbody.innerHTML = paginated.map(job => `
        <tr>
            <td>${job.id}</td>
            <td><strong>${escapeHtml(job.title || "---")}</strong></td>
            <td>${escapeHtml(job.company || "---")}</td>
            <td>${escapeHtml(job.field || "---")}</td>
            <td>${escapeHtml(job.location || job.district || "---")}</td>
            <td><span class="status-badge ${job.status === "active" ? "status-active" : (job.status === "pending" ? "status-pending" : "status-inactive")}">
                ${job.status === "active" ? "Đang đăng" : (job.status === "pending" ? "Chờ duyệt" : "Đã ẩn")}
            </span></td>
            <td>${job.postDate || job.date || "---"}</td>
            <td>
                ${job.status === "pending" ? `<button class="btn-warning btn-sm" onclick="openApproveModal(${job.id})"><i class="fas fa-check-circle"></i> Duyệt</button>` : ''}
                <button class="btn-outline btn-sm" onclick="editJob(${job.id})"><i class="fas fa-edit"></i></button>
                ${job.status !== "deleted" ? `<button class="btn-danger btn-sm" onclick="deleteJob(${job.id})"><i class="fas fa-trash"></i> Xóa</button>` : ''}
                <button class="btn-primary btn-sm" onclick="toggleJobStatus(${job.id})"><i class="fas ${job.status === "active" ? "fa-eye-slash" : "fa-eye"}"></i> ${job.status === "active" ? "Ẩn" : "Hiện"}</button>
              </td>
        </tr>
    `).join("");
    
    const totalPages = Math.ceil(filtered.length / jobsPerPage);
    const paginationDiv = document.getElementById("jobPagination");
    if (paginationDiv) {
        paginationDiv.innerHTML = totalPages > 1 ? Array.from({length: totalPages}, (_, i) => `<button class="${i+1 === currentJobPage ? 'active' : ''}" onclick="goToJobPage(${i+1})">${i+1}</button>`).join('') : '';
    }
}

function goToJobPage(page) { currentJobPage = page; renderJobs(); }

function editJob(id) {
    let jobs = syncJobsFromData();
    const job = jobs.find(j => j.id == id);
    if (job) {
        editingJobId = id;
        document.getElementById("editJobId").value = id;
        document.getElementById("editJobTitle").value = job.title || "";
        document.getElementById("editJobCompany").value = job.company || "";
        document.getElementById("editJobLocation").value = job.location || job.district || "";
        document.getElementById("editJobSalary").value = job.salary || "";
        document.getElementById("editJobDesc").value = job.desc || "";
        document.getElementById("editJobStatus").value = job.status || "active";
        
        const industries = JSON.parse(localStorage.getItem("industries")) || [];
        const fieldSelect = document.getElementById("editJobField");
        if (fieldSelect) {
            fieldSelect.innerHTML = industries.map(ind => `<option value="${escapeHtml(ind)}" ${job.field === ind ? 'selected' : ''}>${escapeHtml(ind)}</option>`).join("");
        }
        
        clearEditJobErrors();
        setupEditJobRealtimeValidation();
        
        document.getElementById("editJobModal").classList.add("active");
    }
}

function closeEditJobModal() { 
    document.getElementById("editJobModal").classList.remove("active"); 
    editingJobId = null;
    clearEditJobErrors();
}

function updateJob() {
    if (!validateEditJobForm()) {
        const firstError = document.querySelector('.edit-job-error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        alert("❌ Vui lòng điền đầy đủ thông tin bắt buộc!");
        return;
    }
    
    if (!editingJobId) return;
    let jobs = syncJobsFromData();
    
    const index = jobs.findIndex(j => j.id == editingJobId);
    if (index !== -1) {
        jobs[index] = {
            ...jobs[index],
            title: document.getElementById("editJobTitle").value,
            company: document.getElementById("editJobCompany").value,
            field: document.getElementById("editJobField").value,
            location: document.getElementById("editJobLocation").value,
            salary: document.getElementById("editJobSalary").value,
            desc: document.getElementById("editJobDesc").value,
            status: document.getElementById("editJobStatus").value,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem("hr_jobs", JSON.stringify(jobs));
        
        if (typeof allJobs !== 'undefined') {
            const originalIndex = allJobs.findIndex(j => j.id == editingJobId);
            if (originalIndex !== -1) allJobs[originalIndex] = jobs[index];
        }
        
        renderJobs();
        updateStats();
        closeEditJobModal();
        alert("✅ Đã cập nhật tin tuyển dụng!");
    }
}

function deleteJob(id) {
    if (confirm("Xóa tin tuyển dụng này?\n\nLưu ý: Hành động này sẽ xóa vĩnh viễn tin khỏi hệ thống!")) {
        let jobs = syncJobsFromData();
        jobs = jobs.filter(j => j.id != id);
        localStorage.setItem("hr_jobs", JSON.stringify(jobs));
        
        let globalJobs = JSON.parse(localStorage.getItem("jobs")) || [];
        globalJobs = globalJobs.filter(j => j.id != id);
        localStorage.setItem("jobs", JSON.stringify(globalJobs));
        
        if (typeof allJobs !== 'undefined') {
            const index = allJobs.findIndex(j => j.id == id);
            if (index !== -1) allJobs.splice(index, 1);
        }
        
        renderJobs();
        updateStats();
        
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'hr_jobs',
            newValue: JSON.stringify(jobs)
        }));
        
        alert("Đã xóa tin tuyển dụng thành công!");
    }
}

function toggleJobStatus(id) {
    let jobs = syncJobsFromData();
    const index = jobs.findIndex(j => j.id == id);
    if (index !== -1) {
        jobs[index].status = jobs[index].status === "active" ? "inactive" : "active";
        localStorage.setItem("hr_jobs", JSON.stringify(jobs));
        
        if (typeof allJobs !== 'undefined') {
            const originalIndex = allJobs.findIndex(j => j.id == id);
            if (originalIndex !== -1) allJobs[originalIndex].status = jobs[index].status;
        }
        
        renderJobs();
        updateStats();
        alert(`Đã ${jobs[index].status === "active" ? "hiển thị" : "ẩn"} tin tuyển dụng!`);
    }
}

// ==================== DUYỆT / TỪ CHỐI BÀI ĐĂNG ====================
function openApproveModal(jobId) {
    let jobs = syncJobsFromData();
    const job = jobs.find(j => j.id == jobId);
    if (!job) return;
    
    currentApproveJobId = jobId;
    
    const content = document.getElementById("jobApproveContent");
    if (content) {
        content.innerHTML = `
            <p><strong>Tiêu đề:</strong> ${escapeHtml(job.title || "---")}</p>
            <p><strong>Công ty:</strong> ${escapeHtml(job.company || "---")}</p>
            <p><strong>Lĩnh vực:</strong> ${escapeHtml(job.field || "---")}</p>
            <p><strong>Mức lương:</strong> ${escapeHtml(job.salary || "---")}</p>
            <p><strong>Địa điểm:</strong> ${escapeHtml(job.location || job.district || "---")}</p>
            <p><strong>Mô tả:</strong> ${(job.desc || "Chưa có mô tả").substring(0, 200)}${(job.desc || "").length > 200 ? "..." : ""}</p>
        `;
    }
    
    document.getElementById("jobApproveModal").classList.add("active");
}

function approveJob() {
    if (!currentApproveJobId) {
        alert("Không có tin tuyển dụng nào được chọn!");
        return;
    }
    
    let jobs = syncJobsFromData();
    const index = jobs.findIndex(j => j.id == currentApproveJobId);
    
    if (index !== -1) {
        jobs[index].status = "active";
        localStorage.setItem("hr_jobs", JSON.stringify(jobs));
        
        if (typeof allJobs !== 'undefined') {
            const existingIndex = allJobs.findIndex(j => j.id == currentApproveJobId);
            if (existingIndex !== -1) {
                allJobs[existingIndex] = { ...allJobs[existingIndex], ...jobs[index] };
            } else {
                allJobs.unshift(jobs[index]);
            }
        }
        
        let globalJobs = JSON.parse(localStorage.getItem("jobs")) || [];
        const globalIndex = globalJobs.findIndex(j => j.id == currentApproveJobId);
        if (globalIndex !== -1) {
            globalJobs[globalIndex] = jobs[index];
        } else {
            globalJobs.unshift(jobs[index]);
        }
        localStorage.setItem("jobs", JSON.stringify(globalJobs));
        
        let hrNotifications = JSON.parse(localStorage.getItem("hr_notifications")) || [];
        hrNotifications.unshift({
            id: Date.now(),
            title: "✅ Tin tuyển dụng được duyệt",
            content: `Tin "${jobs[index].title}" đã được Admin duyệt và đăng tải thành công.`,
            type: "job_approved",
            time: "Vừa xong",
            read: false
        });
        localStorage.setItem("hr_notifications", JSON.stringify(hrNotifications));
        
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'hr_jobs',
            newValue: JSON.stringify(jobs)
        }));
        
        alert("✅ Đã duyệt và đăng tin thành công!");
        closeJobApproveModal();
        renderJobs();
        updateStats();
    } else {
        alert("Không tìm thấy tin tuyển dụng!");
    }
}

function rejectJob() {
    if (!currentApproveJobId) {
        alert("Không có tin tuyển dụng nào được chọn!");
        return;
    }
    
    const reason = document.getElementById("jobRejectReason")?.value || "Không có lý do";
    let jobs = syncJobsFromData();
    const index = jobs.findIndex(j => j.id == currentApproveJobId);
    
    if (index !== -1) {
        jobs[index].status = "rejected";
        jobs[index].rejectReason = reason;
        localStorage.setItem("hr_jobs", JSON.stringify(jobs));
        
        if (typeof allJobs !== 'undefined') {
            const originalIndex = allJobs.findIndex(j => j.id == currentApproveJobId);
            if (originalIndex !== -1) allJobs[originalIndex].status = "rejected";
        }
        
        let hrNotifications = JSON.parse(localStorage.getItem("hr_notifications")) || [];
        hrNotifications.unshift({
            id: Date.now(),
            title: "❌ Tin tuyển dụng bị từ chối",
            content: `Tin "${jobs[index].title}" đã bị Admin từ chối. Lý do: ${reason}`,
            type: "job_rejected",
            time: "Vừa xong",
            read: false
        });
        localStorage.setItem("hr_notifications", JSON.stringify(hrNotifications));
        
        alert(`❌ Đã từ chối tin tuyển dụng.\nLý do: ${reason}`);
        closeJobApproveModal();
        renderJobs();
        updateStats();
    } else {
        alert("Không tìm thấy tin tuyển dụng!");
    }
}

function closeJobApproveModal() {
    document.getElementById("jobApproveModal").classList.remove("active");
    currentApproveJobId = null;
    const reasonInput = document.getElementById("jobRejectReason");
    if (reasonInput) reasonInput.value = "";
}

// ==================== QUẢN LÝ CÔNG TY ====================
function renderCompanies() {
    let companies = syncCompaniesFromData();
    
    const searchTerm = document.getElementById("searchCompany")?.value.toLowerCase() || "";
    let filtered = searchTerm ? companies.filter(c => c.name?.toLowerCase().includes(searchTerm)) : companies;
    
    const tbody = document.getElementById("companyList");
    if (!tbody) return;
    
    tbody.innerHTML = filtered.map(company => `
        <tr>
            <td>${company.id}</td>
            <td><div class="company-logo-cell"><img src="${company.logo || 'https://placehold.co/40'}" style="width:35px;height:35px;object-fit:contain; border-radius: 8px;" onerror="this.src='https://placehold.co/40'"></div></td>
            <td><strong>${escapeHtml(company.name)}</strong></td>
            <td>${escapeHtml(company.address || "---")}</td>
            <td>${escapeHtml(company.phone || "---")}</td>
            <td>${escapeHtml(company.industry || "---")}</td>
            <td><span class="status-badge ${company.status === "active" ? "status-active" : (company.status === "pending" ? "status-pending" : "status-inactive")}">
                ${company.status === "active" ? "Hoạt động" : (company.status === "pending" ? "Chờ duyệt" : "Đã khóa")}
            </span></td>
            <td>
                <button class="btn-outline btn-sm" onclick="editCompany(${company.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-danger btn-sm" onclick="deleteCompany(${company.id})"><i class="fas fa-trash"></i></button>
              </td>
        </tr>
    `).join("");
}

function openCompanyModal(companyId = null) {
    const modal = document.getElementById("companyModal");
    if (!modal) return;
    modal.classList.add("active");
    
    const industries = JSON.parse(localStorage.getItem("industries")) || [];
    const industrySelect = document.getElementById("companyIndustry");
    if (industrySelect) {
        industrySelect.innerHTML = '<option value="">-- Chọn lĩnh vực --</option>' + industries.map(ind => `<option value="${escapeHtml(ind)}">${escapeHtml(ind)}</option>`).join("");
    }
    
    if (companyId) {
        document.getElementById("companyModalTitle").innerText = "Sửa công ty";
        const companies = syncCompaniesFromData();
        const company = companies.find(c => c.id === companyId);
        if (company) {
            document.getElementById("companyId").value = company.id;
            document.getElementById("companyName").value = company.name;
            document.getElementById("companyLogo").value = company.logo || "";
            document.getElementById("companyAddress").value = company.address || "";
            document.getElementById("companyPhone").value = company.phone || "";
            document.getElementById("companyEmail").value = company.email || "";
            if (industrySelect) industrySelect.value = company.industry || "";
            document.getElementById("companyStatus").value = company.status || "active";
        }
    } else {
        document.getElementById("companyModalTitle").innerText = "Thêm công ty";
        document.getElementById("companyForm").reset();
        document.getElementById("companyId").value = "";
        document.getElementById("companyStatus").value = "active";
    }
}

function closeCompanyModal() { document.getElementById("companyModal").classList.remove("active"); }

function saveCompany() {
    const id = document.getElementById("companyId").value;
    const name = document.getElementById("companyName").value;
    const logo = document.getElementById("companyLogo").value;
    const address = document.getElementById("companyAddress").value;
    const phone = document.getElementById("companyPhone").value;
    const email = document.getElementById("companyEmail").value;
    const industry = document.getElementById("companyIndustry")?.value || "";
    const status = document.getElementById("companyStatus").value;
    
    if (!name) {
        alert("Vui lòng nhập tên công ty!");
        return;
    }
    
    let companies = syncCompaniesFromData();
    
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
    updateStats();
    alert("✅ Lưu công ty thành công!");
}

function editCompany(id) { openCompanyModal(id); }

function deleteCompany(id) {
    if (confirm("Bạn có chắc muốn xóa công ty này?\n\n⚠️ CẢNH BÁO: Việc xóa công ty sẽ:\n- Xóa công ty khỏi danh sách\n- Xóa TẤT CẢ tin tuyển dụng của công ty này\n- Xóa TẤT CẢ ứng tuyển vào các tin đó\n- Không thể khôi phục!")) {
        
        let companies = syncCompaniesFromData();
        const company = companies.find(c => c.id === id);
        const companyName = company?.name;
        
        if (!companyName) {
            alert("Không tìm thấy công ty!");
            return;
        }
        
        companies = companies.filter(c => c.id !== id);
        localStorage.setItem("companies", JSON.stringify(companies));
        
        let hrJobs = JSON.parse(localStorage.getItem("hr_jobs")) || [];
        const deletedJobs = hrJobs.filter(j => j.company === companyName);
        hrJobs = hrJobs.filter(j => j.company !== companyName);
        localStorage.setItem("hr_jobs", JSON.stringify(hrJobs));
        
        let globalJobs = JSON.parse(localStorage.getItem("jobs")) || [];
        globalJobs = globalJobs.filter(j => j.company !== companyName);
        localStorage.setItem("jobs", JSON.stringify(globalJobs));
        
        if (typeof allJobs !== 'undefined') {
            for (let i = 0; i < allJobs.length; i++) {
                if (allJobs[i].company === companyName) {
                    allJobs.splice(i, 1);
                    i--;
                }
            }
        }
        
        let applications = JSON.parse(localStorage.getItem("applications")) || [];
        const deletedAppCount = applications.filter(a => a.company === companyName).length;
        applications = applications.filter(a => a.company !== companyName);
        localStorage.setItem("applications", JSON.stringify(applications));
        
        let hrCandidates = JSON.parse(localStorage.getItem("hr_candidates")) || [];
        hrCandidates = hrCandidates.filter(c => c.company !== companyName);
        localStorage.setItem("hr_candidates", JSON.stringify(hrCandidates));
        
        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactions = transactions.filter(t => t.companyName !== companyName && t.jobTitle !== companyName);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        
        let interviews = JSON.parse(localStorage.getItem("hr_interviews")) || [];
        interviews = interviews.filter(i => i.company !== companyName);
        localStorage.setItem("hr_interviews", JSON.stringify(interviews));
        
        let hrNotifications = JSON.parse(localStorage.getItem("hr_notifications")) || [];
        hrNotifications.unshift({
            id: Date.now(),
            title: "🏢 Công ty đã bị xóa khỏi hệ thống",
            content: `Công ty "${companyName}" đã bị Admin xóa khỏi hệ thống. Tất cả tin tuyển dụng và dữ liệu liên quan đã được xóa.`,
            type: "company_deleted",
            time: "Vừa xong",
            read: false
        });
        localStorage.setItem("hr_notifications", JSON.stringify(hrNotifications));
        
        renderCompanies();
        if (typeof renderJobs === 'function') renderJobs();
        if (typeof renderCandidates === 'function') renderCandidates();
        if (typeof renderInterviews === 'function') renderInterviews();
        updateStats();
        
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'companies',
            newValue: JSON.stringify(companies)
        }));
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'hr_jobs',
            newValue: JSON.stringify(hrJobs)
        }));
        
        alert(`✅ Đã xóa công ty "${companyName}" thành công!\n\n📊 Đã xóa:\n- ${deletedJobs.length} tin tuyển dụng\n- ${deletedAppCount} lượt ứng tuyển`);
    }
}

// ==================== QUẢN LÝ CV ====================
function renderCVs() {
    const cvs = JSON.parse(localStorage.getItem("savedCVs")) || [];
    const searchTerm = document.getElementById("searchCV")?.value.toLowerCase() || "";
    let filtered = searchTerm ? cvs.filter(cv => cv.fullName?.toLowerCase().includes(searchTerm) || cv.email?.toLowerCase().includes(searchTerm)) : cvs;
    
    const tbody = document.getElementById("cvList");
    if (!tbody) return;
    
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:40px;">📭 Chưa có CV nào được lưu<\/td><\/tr>`;
        return;
    }
    
    tbody.innerHTML = filtered.map((cv, i) => `
        <tr>
            <td>${i+1}</td>
            <td>${escapeHtml(cv.fullName || "---")}</td>
            <td>${escapeHtml(cv.email || "---")}</td>
            <td>${escapeHtml(cv.phone || "---")}</td>
            <td>${escapeHtml(cv.position || "---")}</td>
            <td>${cv.createdAt || "---"}</td>
            <td>
                <button class="btn-outline btn-sm" onclick="viewCVDetail(${i})"><i class="fas fa-eye"></i> Xem</button>
                <button class="btn-danger btn-sm" onclick="deleteCV(${i})"><i class="fas fa-trash"></i> Xóa</button>
              </td>
        </tr>
    `).join("");
}

function viewCVDetail(index) {
    const cvs = JSON.parse(localStorage.getItem("savedCVs")) || [];
    const cv = cvs[index];
    if (cv) {
        alert(`📄 THÔNG TIN CV\n\nHọ tên: ${cv.fullName || "---"}\nEmail: ${cv.email || "---"}\nSĐT: ${cv.phone || "---"}\nVị trí: ${cv.position || "---"}\nGiới thiệu: ${cv.intro || "---"}\nKỹ năng: ${cv.skills || "---"}\nKinh nghiệm: ${cv.experience || "---"}`);
    }
}

function deleteCV(index) {
    if (confirm("Xóa CV này?")) {
        let cvs = JSON.parse(localStorage.getItem("savedCVs")) || [];
        cvs.splice(index, 1);
        localStorage.setItem("savedCVs", JSON.stringify(cvs));
        renderCVs();
        alert("Đã xóa CV!");
    }
}

// ==================== QUẢN LÝ DANH MỤC ====================
function renderCategories() {
    const industries = JSON.parse(localStorage.getItem("industries")) || [];
    const skills = JSON.parse(localStorage.getItem("skills")) || [];
    const locations = JSON.parse(localStorage.getItem("locations")) || [];
    const jobTypes = JSON.parse(localStorage.getItem("jobTypes")) || [];
    
    const industryDiv = document.getElementById("industryList");
    const skillDiv = document.getElementById("skillList");
    const locationDiv = document.getElementById("locationList");
    const jobTypeDiv = document.getElementById("jobTypeList");
    
    if (industryDiv) {
        industryDiv.innerHTML = industries.map((item, i) => `<div style="display:flex;justify-content:space-between;padding:8px;border-bottom:1px solid #e2e8f0;"><span>${escapeHtml(item)}</span><button class="btn-danger btn-sm" onclick="deleteCategory('industry',${i})"><i class="fas fa-trash"></i></button></div>`).join("");
    }
    if (skillDiv) {
        skillDiv.innerHTML = skills.map((item, i) => `<div style="display:flex;justify-content:space-between;padding:8px;border-bottom:1px solid #e2e8f0;"><span>${escapeHtml(item)}</span><button class="btn-danger btn-sm" onclick="deleteCategory('skill',${i})"><i class="fas fa-trash"></i></button></div>`).join("");
    }
    if (locationDiv) {
        locationDiv.innerHTML = locations.map((item, i) => `<div style="display:flex;justify-content:space-between;padding:8px;border-bottom:1px solid #e2e8f0;"><span>${escapeHtml(item)}</span><button class="btn-danger btn-sm" onclick="deleteCategory('location',${i})"><i class="fas fa-trash"></i></button></div>`).join("");
    }
    if (jobTypeDiv) {
        jobTypeDiv.innerHTML = jobTypes.map((item, i) => `<div style="display:flex;justify-content:space-between;padding:8px;border-bottom:1px solid #e2e8f0;"><span>${escapeHtml(item)}</span><button class="btn-danger btn-sm" onclick="deleteCategory('jobType',${i})"><i class="fas fa-trash"></i></button></div>`).join("");
    }
}

function addCategory(type) {
    const name = prompt("Nhập tên danh mục mới:");
    if (name && name.trim()) {
        let list = JSON.parse(localStorage.getItem(`${type}s`)) || [];
        list.push(name.trim());
        localStorage.setItem(`${type}s`, JSON.stringify(list));
        renderCategories();
        alert(`✅ Đã thêm "${name}" vào danh mục!`);
        
        window.dispatchEvent(new StorageEvent('storage', {
            key: `${type}s`,
            newValue: JSON.stringify(list)
        }));
    }
}

function deleteCategory(type, index) {
    let list = JSON.parse(localStorage.getItem(`${type}s`)) || [];
    const deleted = list[index];
    if (confirm(`Xóa "${deleted}" khỏi danh mục?`)) {
        list.splice(index, 1);
        localStorage.setItem(`${type}s`, JSON.stringify(list));
        renderCategories();
        alert("Đã xóa danh mục!");
        
        window.dispatchEvent(new StorageEvent('storage', {
            key: `${type}s`,
            newValue: JSON.stringify(list)
        }));
    }
}

// ==================== QUẢN LÝ HỖ TRỢ ====================
function renderSupport() {
    const tickets = JSON.parse(localStorage.getItem("supportTickets")) || [];
    const filter = document.querySelector("#tab-support .filter-tab.active")?.dataset.support || "pending";
    let filtered = tickets.filter(t => t.status === filter);
    
    const tbody = document.getElementById("supportList");
    if (!tbody) return;
    
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:40px;">📭 Không có yêu cầu hỗ trợ nào<\/td><\/tr>`;
        return;
    }
    
    tbody.innerHTML = filtered.map(t => `
        <tr>
            <td>${t.id}</td>
            <td>${escapeHtml(t.userName)}</td>
            <td>${escapeHtml(t.title)}</td>
            <td>${escapeHtml(t.content.substring(0, 50))}${t.content.length > 50 ? "..." : ""}</td>
            <td>${t.date}</td>
            <td><span class="status-badge ${t.status === "pending" ? "status-pending" : (t.status === "processing" ? "status-warning" : "status-active")}">
                ${t.status === "pending" ? "Chờ xử lý" : (t.status === "processing" ? "Đang xử lý" : "Đã giải quyết")}
            </span></td>
            <td>
                <button class="btn-primary btn-sm" onclick="updateSupportStatus(${t.id},'processing')"><i class="fas fa-spinner"></i> Xử lý</button>
                <button class="btn-success btn-sm" onclick="updateSupportStatus(${t.id},'resolved')"><i class="fas fa-check"></i> Hoàn thành</button>
              </td>
        </tr>
    `).join("");
}

function updateSupportStatus(id, status) {
    let tickets = JSON.parse(localStorage.getItem("supportTickets")) || [];
    const index = tickets.findIndex(t => t.id === id);
    if (index !== -1) {
        tickets[index].status = status;
        localStorage.setItem("supportTickets", JSON.stringify(tickets));
        renderSupport();
        alert(`✅ Đã cập nhật trạng thái!`);
    }
}

// ==================== ĐỒNG BỘ DỮ LIỆU TỪ HR ====================
function initAdminStorageListener() {
    window.addEventListener("storage", (e) => {
        if (e.key === "hr_jobs") {
            console.log("🔄 Phát hiện thay đổi jobs từ HR, đang cập nhật...");
            renderJobs();
            updateStats();
        }
        if (e.key === "companies") {
            console.log("🔄 Phát hiện thay đổi companies, đang cập nhật...");
            renderCompanies();
            updateStats();
        }
        if (e.key === "transactions") {
            console.log("🔄 Phát hiện thay đổi transactions, đang cập nhật...");
            updateStats();
            renderTransactions();
        }
        if (e.key === "users") {
            console.log("🔄 Phát hiện thay đổi users, đang cập nhật...");
            renderUsers();
            updateStats();
        }
        if (e.key === "applications") {
            console.log("🔄 Phát hiện thay đổi applications, đang cập nhật...");
            updateStats();
        }
        if (e.key === "industries" || e.key === "skills" || e.key === "locations" || e.key === "jobTypes") {
            console.log(`🔄 Phát hiện thay đổi danh mục: ${e.key}, đang cập nhật...`);
            renderCategories();
        }
        if (e.key === "pending_payments") {
            console.log("🔄 Phát hiện thay đổi pending_payments, đang cập nhật...");
            renderPaymentVerifications();
        }
    });
}

// ==================== UTILITY ====================
function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function setCurrentDate() {
    const now = new Date();
    const dateEl = document.getElementById("currentDate");
    if (dateEl) {
        dateEl.innerText = now.toLocaleDateString("vi-VN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
}

// ==================== TAB NAVIGATION ====================
function initTabs() {
    const menuItems = document.querySelectorAll(".sidebar-menu li");
    const tabContents = document.querySelectorAll(".tab-content");
    const pageTitle = document.getElementById("pageTitle");
    
    const titles = {
        dashboard: "Tổng quan",
        users: "Quản lý người dùng",
        jobs: "Quản lý việc làm",
        companies: "Quản lý công ty",
        cvs: "Quản lý CV",
        categories: "Danh mục hệ thống",
        reports: "Báo cáo & Thống kê",
        support: "Hỗ trợ người dùng",
        deleterequests: "Yêu cầu xóa",
        payments: "Xác minh thanh toán"
    };
    
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menuItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            const tabId = item.dataset.tab;
            tabContents.forEach(c => c.classList.remove("active"));
            const activeTab = document.getElementById(`tab-${tabId}`);
            if (activeTab) activeTab.classList.add("active");
            if (pageTitle) pageTitle.innerText = titles[tabId] || "Quản trị hệ thống";
            
            if (tabId === "users") renderUsers();
            if (tabId === "jobs") renderJobs();
            if (tabId === "companies") renderCompanies();
            if (tabId === "cvs") renderCVs();
            if (tabId === "categories") renderCategories();
            if (tabId === "support") renderSupport();
            if (tabId === "deleterequests") renderDeleteRequests();
            if (tabId === "payments") renderPaymentVerifications();
        });
    });
}

function initFilters() {
    document.querySelectorAll("#tab-users .filter-tab").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll("#tab-users .filter-tab").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentUserPage = 1;
            renderUsers();
        });
    });
    
    document.querySelectorAll("#tab-jobs .filter-tab").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll("#tab-jobs .filter-tab").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentJobPage = 1;
            renderJobs();
        });
    });
    
    document.querySelectorAll("#tab-support .filter-tab").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll("#tab-support .filter-tab").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderSupport();
        });
    });
    
    const searchUser = document.getElementById("searchUser");
    const searchJob = document.getElementById("searchJob");
    const searchCompany = document.getElementById("searchCompany");
    const searchCV = document.getElementById("searchCV");
    
    if (searchUser) searchUser.addEventListener("input", () => { currentUserPage = 1; renderUsers(); });
    if (searchJob) searchJob.addEventListener("input", () => { currentJobPage = 1; renderJobs(); });
    if (searchCompany) searchCompany.addEventListener("input", renderCompanies);
    if (searchCV) searchCV.addEventListener("input", renderCVs);
}

function handleAdminLogout() {
    if (confirm("Đăng xuất khỏi hệ thống?")) {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    }
}

// ==================== RENDER YÊU CẦU XÓA (PHẦN 2) ====================
function renderDeleteRequestsAlt() {
    const container = document.getElementById('deleteRequestsList');
    if (!container) return;

    let requests = [];
    try {
        requests = JSON.parse(localStorage.getItem('jobDeleteRequests')) || [];
    } catch (error) {
        console.error('Lỗi đọc yêu cầu xóa:', error);
        requests = [];
    }

    if (requests.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="text-align:center;padding:50px;color:#666;">
                <i class="fas fa-inbox" style="font-size:48px;margin-bottom:12px;"></i>
                <p>Hiện chưa có yêu cầu xóa nào.</p>
            </div>
        `;
        return;
    }

    let html = `
        <table class="data-table">
            <thead>
                <tr><th>ID</th><th>Tin tuyển dụng</th><th>Công ty</th><th>Lý do</th><th>Ngày gửi</th><th>Thao tác</th></tr></thead>
            <tbody>
    `;

    requests.forEach((req, index) => {
        html += `
            <tr>
                <td>#${req.jobId || '---'}</td>
                <td><strong>${req.jobTitle || 'Không có tiêu đề'}</strong></td>
                <td>${req.companyName || 'Không rõ công ty'}</td>
                <td><span style="color:#e74c3c;">${req.reason || 'Không có lý do'}</span></td>
                <td>${req.requestDate || '---'}</td>
                <td style="white-space:nowrap;">
                    <button class="btn-primary" onclick="confirmDeleteJob('${req.jobId}', ${index})" style="padding:6px 10px;border:none;border-radius:6px;cursor:pointer;background:#e74c3c;color:white;font-size:12px;">
                        <i class="fas fa-check"></i> Duyệt xóa
                    </button>
                    <button class="btn-outline" onclick="rejectDeleteRequestAlt(${index})" style="padding:6px 10px;border:1px solid #ccc;border-radius:6px;cursor:pointer;margin-left:6px;font-size:12px;">
                        Từ chối
                    </button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

function confirmDeleteJob(jobId, requestIndex) {
    const confirmDelete = confirm('Xác nhận xóa vĩnh viễn tin tuyển dụng này?');
    if (!confirmDelete) return;

    let requests = JSON.parse(localStorage.getItem('jobDeleteRequests')) || [];
    requests.splice(requestIndex, 1);
    localStorage.setItem('jobDeleteRequests', JSON.stringify(requests));

    let allJobsList = JSON.parse(localStorage.getItem('jobs')) || [];
    allJobsList = allJobsList.filter(job => String(job.id) !== String(jobId));
    localStorage.setItem('jobs', JSON.stringify(allJobsList));

    let hrJobs = JSON.parse(localStorage.getItem('hr_jobs')) || [];
    const jobInfo = hrJobs.find(j => String(j.id) === String(jobId));
    hrJobs = hrJobs.filter(job => String(job.id) !== String(jobId));
    localStorage.setItem('hr_jobs', JSON.stringify(hrJobs));

    let hrNotifications = JSON.parse(localStorage.getItem('hr_notifications')) || [];
    hrNotifications.unshift({
        id: Date.now(),
        title: "✅ Tin đã được xóa",
        content: `Tin tuyển dụng "${jobInfo?.title || 'của bạn'}" đã được Admin phê duyệt xóa thành công.`,
        type: "system",
        time: new Date().toLocaleTimeString('vi-VN'),
        read: false
    });
    localStorage.setItem('hr_notifications', JSON.stringify(hrNotifications));

    window.dispatchEvent(new StorageEvent('storage', { key: 'hr_jobs' }));
    window.dispatchEvent(new StorageEvent('storage', { key: 'hr_notifications' }));

    alert('Đã duyệt xóa và thông báo cho HR!');
    renderDeleteRequestsAlt();
}

function rejectDeleteRequestAlt(index) {
    const confirmReject = confirm('Bạn muốn từ chối yêu cầu này?');
    if (!confirmReject) return;

    let requests = JSON.parse(localStorage.getItem('jobDeleteRequests')) || [];
    requests.splice(index, 1);
    localStorage.setItem('jobDeleteRequests', JSON.stringify(requests));
    renderDeleteRequestsAlt();
}

// ==================== KHỞI TẠO ====================
document.addEventListener("DOMContentLoaded", () => {
    initAdminAccount();
    if (!checkAdminAuth()) return;
    
    initSyncData();
    initSampleData();
    setCurrentDate();
    updateStats();
    initTabs();
    initFilters();
    initAdminStorageListener();
    
    renderUsers();
    renderJobs();
    renderCompanies();
    renderCVs();
    renderCategories();
    renderSupport();
    renderTransactions();
    renderDeleteRequestsAlt();
    renderPaymentVerifications();
});

// Export global functions
window.goToUserPage = goToUserPage;
window.openUserModal = openUserModal;
window.closeUserModal = closeUserModal;
window.saveUser = saveUser;
window.editUser = editUser;
window.deleteUser = deleteUser;
window.toggleUserStatus = toggleUserStatus;
window.goToJobPage = goToJobPage;
window.editJob = editJob;
window.closeEditJobModal = closeEditJobModal;
window.updateJob = updateJob;
window.deleteJob = deleteJob;
window.toggleJobStatus = toggleJobStatus;
window.openApproveModal = openApproveModal;
window.approveJob = approveJob;
window.rejectJob = rejectJob;
window.closeJobApproveModal = closeJobApproveModal;
window.openCompanyModal = openCompanyModal;
window.closeCompanyModal = closeCompanyModal;
window.saveCompany = saveCompany;
window.editCompany = editCompany;
window.deleteCompany = deleteCompany;
window.viewCVDetail = viewCVDetail;
window.deleteCV = deleteCV;
window.addCategory = addCategory;
window.deleteCategory = deleteCategory;
window.updateSupportStatus = updateSupportStatus;
window.handleAdminLogout = handleAdminLogout;
window.approveDeleteRequest = approveDeleteRequest;
window.rejectDeleteRequest = rejectDeleteRequest;
window.renderDeleteRequests = renderDeleteRequestsAlt;
window.verifyPayment = verifyPayment;
window.renderPaymentVerifications = renderPaymentVerifications;