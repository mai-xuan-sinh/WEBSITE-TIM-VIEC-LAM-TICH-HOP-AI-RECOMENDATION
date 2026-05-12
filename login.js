document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const rememberCheckbox = document.getElementById("rememberMe");
  const togglePass = document.querySelector(".toggle-pass");

  // CHECK DOM AN TOÀN
  if (!loginBtn || !emailInput || !passwordInput || !rememberCheckbox) {
    console.error("❌ Missing login elements in DOM");
    return;
  }

  // ==================== TÀI KHOẢN CỐ ĐỊNH ====================
  const FIXED_ACCOUNTS = [
    {
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
    },
    {
      id: 999,
      email: "admin@danangwork.com",
      password: "Admin@123",
      role: "admin",
      name: "Quản trị viên",
      fullname: "Quản trị viên hệ thống"
    }
  ];

  // ==================== KHỞI TẠO TÀI KHOẢN ====================
  function initAccounts() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let hasChanges = false;

    FIXED_ACCOUNTS.forEach(fixedUser => {
      const exists = users.some(u => u.email === fixedUser.email);
      if (!exists) {
        users.push({
          ...fixedUser,
          createdAt: new Date().toISOString(),
          status: "active"
        });
        hasChanges = true;
        console.log(`✅ Đã tạo tài khoản: ${fixedUser.email}`);
      } else {
        // Cập nhật lại thông tin nếu cần (đảm bảo đúng role)
        const index = users.findIndex(u => u.email === fixedUser.email);
        if (index !== -1 && users[index].role !== fixedUser.role) {
          users[index].role = fixedUser.role;
          users[index].password = fixedUser.password;
          hasChanges = true;
          console.log(`🔄 Đã cập nhật tài khoản: ${fixedUser.email}`);
        }
      }
    });

    if (hasChanges) {
      localStorage.setItem("users", JSON.stringify(users));
    }

    console.log("=== DANH SÁCH TÀI KHOẢN TRONG HỆ THỐNG ===");
    users.forEach(u => {
      console.log(`📧 ${u.email} | 🔑 ${u.password} | 👤 ${u.role || "candidate"}`);
    });
    console.log("===========================================");
  }

  // Gọi khởi tạo
  initAccounts();

  // TOGGLE PASSWORD (FIX SAFE + KHÔNG LỖI NULL)
  if (togglePass && passwordInput) {
    togglePass.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      togglePass.classList.toggle("fa-eye-slash");
    });
  }

  // REMEMBER USER
  const savedUser = JSON.parse(localStorage.getItem("rememberUser"));

  if (savedUser?.email && savedUser?.password) {
    emailInput.value = savedUser.email;
    passwordInput.value = savedUser.password;
    rememberCheckbox.checked = true;
  } else {
    // Mặc định hiển thị tài khoản Admin để dễ test
    emailInput.value = "admin@danangwork.com";
    passwordInput.value = "Admin@123";
    rememberCheckbox.checked = false;
  }

  // LOGIN HANDLER
  function handleLogin() {
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();
    const remember = rememberCheckbox.checked;

    if (!email || !password) {
      alert("❌ Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("❌ Sai email hoặc mật khẩu!\n\n📧 Tài khoản Admin: admin@danangwork.com\n🔑 Mật khẩu: Admin@123\n\n📧 Tài khoản HR: hr@danangwork.com\n🔑 Mật khẩu: 123456");
      return;
    }

    const currentUser = {
      id: user.id,
      email: user.email,
      name: user.name || user.fullname || user.email.split("@")[0],
      fullname: user.fullname || user.name || user.email.split("@")[0],
      role: user.role,
      userType: user.role === "hr" || user.role === "employer" ? "employer" : (user.role === "admin" ? "admin" : "candidate")
    };

    if (user.role === "hr" && user.company) {
      currentUser.company = user.company;
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // REMEMBER LOGIN
    if (remember) {
      localStorage.setItem(
        "rememberUser",
        JSON.stringify({ email: user.email, password: user.password })
      );
    } else {
      localStorage.removeItem("rememberUser");
    }

    alert(`✅ Đăng nhập thành công!\nChào mừng ${currentUser.name}`);

    // REDIRECT theo role
    if (user.role === "admin") {
      window.location.href = "admin.html";
    } else if (user.role === "hr") {
      window.location.href = "hr-dashboard.html";
    } else {
      window.location.href = "index.html";
    }
  }

  // EVENTS
  loginBtn.addEventListener("click", handleLogin);

  // ENTER KEY
  [emailInput, passwordInput].forEach(input => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleLogin();
    });
  });

});








