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

  // INIT USER LOCALSTORAGE
  function initHRUser() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const hrExists = users.some(u => u.email === HR_USER.email);

    if (!hrExists) {
      users.push(HR_USER);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

  initHRUser();

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
      alert("❌ Sai email hoặc mật khẩu!");
      return;
    }

    const currentUser = {
      id: user.id,
      email: user.email,
      name: user.name || user.fullname,
      role: user.role
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

    // REDIRECT
    window.location.href =
      user.role === "hr" ? "hr-dashboard.html" : "index.html";
  }

  // EVENTS
  loginBtn.addEventListener("click", handleLogin);

  // ENTER KEY (FIX CLEAN)
  [emailInput, passwordInput].forEach(input => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleLogin();
    });
  });

});








