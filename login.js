document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const rememberCheckbox = document.getElementById("rememberMe");
  const togglePass = document.querySelector(".toggle-pass");

  if (!loginBtn || !emailInput || !passwordInput || !rememberCheckbox) {
    console.error("❌ Missing login elements in DOM");
    return;
  }

  // ==================== TẠO TÀI KHOẢN CỐ ĐỊNH ====================
  function createFixedAccounts() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Xóa cũ để tránh trùng
    users = users.filter(u => u.email !== "admin@danangwork.com" && u.email !== "hr@danangwork.com");
    
    const adminAccount = {
      id: 999,
      email: "admin@danangwork.com",
      password: "Admin@123",
      role: "admin",
      name: "Quản trị viên",
      fullname: "Quản trị viên hệ thống",
      status: "active",
      createdAt: new Date().toISOString()
    };
    
    const hrAccount = {
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
    };
    
    users.push(adminAccount, hrAccount);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("✅ Tài khoản đã sẵn sàng");
  }
  
  createFixedAccounts();

  // ==================== VALIDATE PASSWORD STRENGTH ====================
  function validatePasswordStrength(password) {
    if (!password || password.length === 0) {
      return { valid: false, message: "Mật khẩu không được để trống!" };
    }
    if (password.length < 6) {
      return { valid: false, message: "Mật khẩu phải có ít nhất 6 ký tự!" };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: "Mật khẩu phải có ít nhất 1 chữ hoa (A-Z)!" };
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: "Mật khẩu phải có ít nhất 1 chữ thường (a-z)!" };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: "Mật khẩu phải có ít nhất 1 chữ số (0-9)!" };
    }
    return { valid: true, message: "Mật khẩu hợp lệ" };
  }

  function validateEmail(email) {
    if (!email || email.trim().length === 0) {
      return { valid: false, message: "Email không được để trống!" };
    }
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: "Email không hợp lệ!" };
    }
    return { valid: true };
  }

  // Toggle password
  if (togglePass && passwordInput) {
    togglePass.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      togglePass.classList.toggle("fa-eye-slash");
    });
  }

  // Set default values
  emailInput.value = "admin@danangwork.com";
  passwordInput.value = "Admin@123";
  rememberCheckbox.checked = false;

  // ==================== XỬ LÝ ĐĂNG NHẬP ====================
  function handleLogin() {
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("❌ Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("❌ Sai email hoặc mật khẩu!\n\nAdmin: admin@danangwork.com / Admin@123\nHR: hr@danangwork.com / 123456");
      return;
    }

    // ĐẢM BẢO ROLE ĐƯỢC LƯU ĐÚNG
    let finalRole = user.role;
    if (!finalRole || finalRole === "candidate") {
      if (user.email === "admin@danangwork.com") finalRole = "admin";
      else if (user.email === "hr@danangwork.com") finalRole = "hr";
      else finalRole = "candidate";
    }

    const currentUser = {
      id: user.id,
      email: user.email,
      name: user.name || user.fullname || user.email.split("@")[0],
      fullname: user.fullname || user.name || user.email.split("@")[0],
      role: finalRole,
      userType: finalRole === "hr" || finalRole === "employer" ? "employer" : (finalRole === "admin" ? "admin" : "candidate")
    };

    if (finalRole === "hr" && user.company) {
      currentUser.company = user.company;
    }

    // Lưu currentUser
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    
    // XÁC NHẬN ĐÃ LƯU ĐÚNG
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("Đã lưu currentUser:", savedUser);
    console.log("Role đã lưu:", savedUser.role);

    alert(`✅ Đăng nhập thành công!\nChào mừng ${currentUser.name}`);

    // REDIRECT DỰA TRÊN ROLE ĐÃ LƯU
    if (finalRole === "admin") {
      window.location.href = "admin.html";
    } else if (finalRole === "hr") {
      window.location.href = "hr-dashboard.html";
    } else {
      window.location.href = "index.html";
    }
  }

  loginBtn.addEventListener("click", handleLogin);

  [emailInput, passwordInput].forEach(input => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleLogin();
    });
  });

  // ==================== QUÊN MẬT KHẨU (CÓ RÀNG BUỘC) ====================
  const forgotPopup = document.getElementById("forgotPopup");
  const forgotEmail = document.getElementById("forgotEmail");
  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const passwordRequirement = document.getElementById("passwordRequirement");
  
  const forgotBtn = document.getElementById("forgotBtn");
  if (forgotBtn) {
    forgotBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // Reset form
      if (forgotEmail) forgotEmail.value = "";
      if (newPassword) newPassword.value = "";
      if (confirmPassword) confirmPassword.value = "";
      if (passwordRequirement) {
        passwordRequirement.style.color = "#888";
        passwordRequirement.innerHTML = "📌 Mật khẩu cần: chữ hoa, chữ thường, số, tối thiểu 6 ký tự";
      }
      if (forgotPopup) forgotPopup.style.display = "flex";
    });
  }
  
  const closeForgot = document.getElementById("closeForgot");
  if (closeForgot) {
    closeForgot.addEventListener("click", () => {
      if (forgotPopup) forgotPopup.style.display = "none";
    });
  }
  
  // Hiển thị yêu cầu mật khẩu realtime
  if (newPassword) {
    newPassword.addEventListener("input", function() {
      const validation = validatePasswordStrength(this.value);
      if (passwordRequirement) {
        if (!validation.valid && this.value.length > 0) {
          passwordRequirement.style.color = "#ef4444";
          passwordRequirement.innerHTML = `⚠️ ${validation.message}`;
        } else if (validation.valid) {
          passwordRequirement.style.color = "#22c55e";
          passwordRequirement.innerHTML = `✅ ${validation.message}`;
        } else {
          passwordRequirement.style.color = "#888";
          passwordRequirement.innerHTML = `📌 Mật khẩu cần: chữ hoa, chữ thường, số, tối thiểu 6 ký tự`;
        }
      }
    });
  }
  
  const resetPasswordBtn = document.getElementById("resetPasswordBtn");
  if (resetPasswordBtn) {
    resetPasswordBtn.addEventListener("click", () => {
      const email = forgotEmail?.value.trim().toLowerCase() || "";
      const newPass = newPassword?.value || "";
      const confirmPass = confirmPassword?.value || "";
      
      // Validate email
      const emailValidation = validateEmail(email);
      if (!emailValidation.valid) {
        alert(`❌ ${emailValidation.message}`);
        if (forgotEmail) forgotEmail.focus();
        return;
      }
      
      // Validate password strength
      const passwordValidation = validatePasswordStrength(newPass);
      if (!passwordValidation.valid) {
        alert(`❌ ${passwordValidation.message}`);
        if (newPassword) newPassword.focus();
        return;
      }
      
      // Validate confirm password
      if (newPass !== confirmPass) {
        alert("❌ Mật khẩu xác nhận không khớp!");
        if (confirmPassword) confirmPassword.focus();
        return;
      }
      
      let users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex(u => u.email === email);
      
      if (userIndex === -1) {
        alert("❌ Email không tồn tại trong hệ thống!");
        if (forgotEmail) forgotEmail.focus();
        return;
      }
      
      // Cập nhật mật khẩu mới
      users[userIndex].password = newPass;
      localStorage.setItem("users", JSON.stringify(users));
      
      alert(`✅ Đổi mật khẩu thành công!\n\nMật khẩu mới của bạn đã được cập nhật.\nVui lòng đăng nhập lại.`);
      if (forgotPopup) forgotPopup.style.display = "none";
      
      // Tự động điền email vào form đăng nhập
      if (emailInput) emailInput.value = email;
      if (passwordInput) passwordInput.value = "";
    });
  }
  
  // Đóng popup khi click ra ngoài
  window.addEventListener("click", (e) => {
    if (forgotPopup && e.target === forgotPopup) {
      forgotPopup.style.display = "none";
    }
  });
  
});