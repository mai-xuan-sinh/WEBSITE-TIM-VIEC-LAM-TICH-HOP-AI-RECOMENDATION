document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const rememberCheckbox = document.getElementById("rememberMe");

  // ========== TÀI KHOẢN HR DUY NHẤT ==========
  const HR_USER = {
    id: 1,
    email: "hr@danangwork.com",
    password: "123456",
    role: "hr",
    name: "HR Manager",
    fullname: "HR Manager",
    company: {
      name: "Công ty Công nghệ Đà Nẵng",
      address: "Đà Nẵng, Việt Nam"
    }
  };

  // ========== KHỞI TẠO LOCALSTORAGE ==========
  function initHRUser() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Kiểm tra xem tài khoản HR đã tồn tại chưa
    const hrExists = users.some(u => u.email === HR_USER.email);
    
    if (!hrExists) {
      users.push(HR_USER);
      localStorage.setItem("users", JSON.stringify(users));
      console.log("✅ Đã khởi tạo tài khoản HR thành công!");
    } else {
      // Nếu đã tồn tại thì cập nhật lại cho chắc chắn
      const index = users.findIndex(u => u.email === HR_USER.email);
      if (index !== -1) {
        users[index] = { ...users[index], ...HR_USER };
        localStorage.setItem("users", JSON.stringify(users));
      }
      console.log("✅ Tài khoản HR đã tồn tại trong hệ thống");
    }
    
    console.log("📧 Email HR:", HR_USER.email);
    console.log("🔑 Mật khẩu HR:", HR_USER.password);
  }
  
  // Gọi hàm khởi tạo
  initHRUser();

  // ========== HIỂN THỊ MẬT KHẨU ==========
  const togglePass = document.querySelector(".toggle-pass");
  if (togglePass) {
    togglePass.addEventListener("click", function() {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      this.classList.toggle("fa-eye-slash");
    });
  }

  // ========== TỰ ĐỘNG ĐIỀN TÀI KHOẢN HR ==========
  // Kiểm tra nếu đã lưu tài khoản trước đó
  const savedUser = JSON.parse(localStorage.getItem("rememberUser"));
  
  if (savedUser && savedUser.email && savedUser.password) {
    // Nếu đã lưu thì điền tài khoản đã lưu
    emailInput.value = savedUser.email;
    passwordInput.value = savedUser.password;
    rememberCheckbox.checked = true;
  } else {
    // Mặc định điền tài khoản HR để dễ test
    emailInput.value = HR_USER.email;
    passwordInput.value = HR_USER.password;
    rememberCheckbox.checked = false;
  }

  // ========== HÀM HIỂN THỊ LỖI ==========
  function showError(message) {
    // Xóa lỗi cũ nếu có
    const oldError = document.getElementById("loginError");
    if (oldError) oldError.remove();
    
    // Tạo thông báo lỗi mới
    const errorDiv = document.createElement("div");
    errorDiv.id = "loginError";
    errorDiv.style.color = "#f87171";
    errorDiv.style.fontSize = "13px";
    errorDiv.style.marginTop = "-10px";
    errorDiv.style.marginBottom = "15px";
    errorDiv.style.textAlign = "left";
    errorDiv.style.paddingLeft = "10px";
    errorDiv.textContent = message;
    
    // Chèn sau input group cuối cùng
    const lastInputGroup = document.querySelector(".input-group:last-of-type");
    if (lastInputGroup && lastInputGroup.nextSibling) {
      lastInputGroup.parentNode.insertBefore(errorDiv, lastInputGroup.nextSibling);
    }
  }
  
  function clearError() {
    const errorDiv = document.getElementById("loginError");
    if (errorDiv) errorDiv.remove();
  }

  // ========== XỬ LÝ ĐĂNG NHẬP ==========
  function handleLogin() {
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();
    const remember = rememberCheckbox.checked;
    
    clearError();
    
    // Kiểm tra rỗng
    if (!email || !password) {
      showError("❌ Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }
    
    // Lấy danh sách users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Tìm user theo email và password
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      showError("❌ Sai email hoặc mật khẩu. Vui lòng thử lại!");
      return;
    }
    
    // Tạo đối tượng currentUser để lưu
    const currentUser = {
      id: user.id,
      email: user.email,
      name: user.name || user.fullname || user.email.split("@")[0],
      fullname: user.fullname || user.name || user.email.split("@")[0],
      role: user.role,
      userType: user.role === "hr" ? "employer" : "candidate"
    };
    
    // Thêm company nếu là HR
    if (user.role === "hr" && user.company) {
      currentUser.company = user.company;
    }
    
    // Lưu vào localStorage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    
    // Lưu ghi nhớ đăng nhập
    if (remember) {
      localStorage.setItem("rememberUser", JSON.stringify({ 
        email: user.email, 
        password: user.password 
      }));
    } else {
      localStorage.removeItem("rememberUser");
    }
    
    // Thông báo thành công
    alert(`✅ Đăng nhập thành công!\nChào mừng ${currentUser.name}`);
    
    // Chuyển hướng theo role
    if (user.role === "hr") {
      window.location.href = "hr-dashboard.html";
    } else {
      window.location.href = "index.html";
    }
  }
  
  // Gắn sự kiện cho nút đăng nhập
  loginBtn.addEventListener("click", handleLogin);
  
  // Xử lý phím Enter
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  
  emailInput.addEventListener("keypress", handleEnter);
  passwordInput.addEventListener("keypress", handleEnter);
  
  // ========== DEBUG LOG (XÓA SAU KHI CHẠY ỔN) ==========
  console.log("=== HỆ THỐNG ĐĂNG NHẬP ===");
  console.log("📧 Email HR:", HR_USER.email);
  console.log("🔑 Mật khẩu HR:", HR_USER.password);
  console.log("👤 Role HR:", HR_USER.role);
  const usersList = JSON.parse(localStorage.getItem("users")) || [];
  console.log("📋 Danh sách users trong hệ thống:", usersList.map(u => ({ 
    email: u.email, 
    role: u.role 
  })));
  console.log("=========================");
});