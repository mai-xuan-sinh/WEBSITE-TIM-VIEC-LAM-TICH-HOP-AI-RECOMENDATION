document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const rememberCheckbox = document.getElementById("rememberMe");
  const togglePass = document.querySelector(".toggle-pass");

  // =====================
  // HR ACCOUNT DEFAULT
  // =====================
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

  // =====================
  // INIT HR USER
  // =====================
  function initHR() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some(u => u.email === HR_USER.email);

    if (!exists) {
      users.push(HR_USER);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

  initHR();

  // =====================
  // SHOW PASSWORD
  // =====================
  if (togglePass) {
    togglePass.addEventListener("click", () => {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;

      togglePass.classList.toggle("fa-eye-slash");
    });
  }

  // =====================
  // LOAD REMEMBER USER
  // =====================
  const saved = JSON.parse(localStorage.getItem("rememberUser"));
  if (saved) {
    emailInput.value = saved.email || "";
    passwordInput.value = saved.password || "";
    rememberCheckbox.checked = true;
  }

  // =====================
  // LOGIN FUNCTION
  // =====================
  function handleLogin() {

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Vui lòng nhập email và mật khẩu!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Sai email hoặc mật khẩu!");
      return;
    }

    const currentUser = {
      id: user.id,
      email: user.email,
      name: user.name || user.fullname,
      role: user.role
    };

    if (user.company) {
      currentUser.company = user.company;
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // remember
    if (rememberCheckbox.checked) {
      localStorage.setItem("rememberUser", JSON.stringify({
        email,
        password
      }));
    } else {
      localStorage.removeItem("rememberUser");
    }

    alert("Đăng nhập thành công!");

    // redirect
    if (user.role === "hr") {
      window.location.href = "hr-dashboard.html";
    } else {
      window.location.href = "index.html";
    }
  }

  // =====================
  // EVENT
  // =====================
  loginBtn.addEventListener("click", handleLogin);

  document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleLogin();
  });

});