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

  // Tạo tài khoản cố định
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

});