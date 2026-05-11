document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const rememberCheckbox = document.getElementById("rememberMe");

  // TÀI KHOẢN HR DUY NHẤT
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

  // KHỞI TẠO LOCALSTORAGE
  function initHRUser() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const hrExists = users.some(u => u.email === HR_USER.email);
    if (!hrExists) {
      users.push(HR_USER);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }
  initHRUser();

  // HIỂN THỊ MẬT KHẨU
  const togglePass = document.querySelector(".toggle-pass");
  if (togglePass) {
    togglePass.addEventListener("click", function() {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      this.classList.toggle("fa-eye-slash");
    });
  }

  // TỰ ĐỘNG ĐIỀN TÀI KHOẢN HR
  const savedUser = JSON.parse(localStorage.getItem("rememberUser"));
  if (savedUser && savedUser.email && savedUser.password) {
    emailInput.value = savedUser.email;
    passwordInput.value = savedUser.password;
    rememberCheckbox.checked = true;
  } else {
    emailInput.value = HR_USER.email;
    passwordInput.value = HR_USER.password;
    rememberCheckbox.checked = false;
  }

  // XỬ LÝ ĐĂNG NHẬP
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
      alert("❌ Sai email hoặc mật khẩu. Vui lòng thử lại!");
      return;
    }

    const currentUser = {
      id: user.id,
      email: user.email,
      name: user.name || user.fullname || user.email.split("@")[0],
      fullname: user.fullname || user.name || user.email.split("@")[0],
      role: user.role,
      userType: user.role === "hr" ? "employer" : "candidate"
    };

    if (user.role === "hr" && user.company) {
      currentUser.company = user.company;
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    if (remember) {
      localStorage.setItem("rememberUser", JSON.stringify({ email: user.email, password: user.password }));
    } else {
      localStorage.removeItem("rememberUser");
    }

    alert(`✅ Đăng nhập thành công!\nChào mừng ${currentUser.name}`);

    if (user.role === "hr") {
      window.location.href = "hr-dashboard.html";
    } else {
      window.location.href = "index.html";
    }
  }

  loginBtn.addEventListener("click", handleLogin);

  // Xử lý phím Enter
  emailInput.addEventListener("keypress", (e) => { if (e.key === "Enter") handleLogin(); });
  passwordInput.addEventListener("keypress", (e) => { if (e.key === "Enter") handleLogin(); });
});