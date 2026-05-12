document.addEventListener("DOMContentLoaded", () => {
  const userTypeCards = document.querySelectorAll(".type-card");
  const userTypeInput = document.getElementById("userType");
  const employerFields = document.getElementById("employerFields");
  const registerBtn = document.getElementById("registerBtn");
  const agreeCheckbox = document.getElementById("agree");
  
  const fullnameInput = document.getElementById("fullname");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const companyNameInput = document.getElementById("companyName");
  const companyAddressInput = document.getElementById("companyAddress");
  const companyTypeSelect = document.querySelector("#employerFields select");

  const togglePass = document.querySelector(".toggle-pass");
  const modal = document.getElementById("policyModal");
  const openPolicyBtn = document.getElementById("openPolicy");
  const closeBtn = document.querySelector(".close");

  // USER TYPE TOGGLE
  userTypeCards.forEach(card => {
    card.addEventListener("click", () => {
      userTypeCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      userTypeInput.value = card.getAttribute("data-value");
      employerFields.style.display = userTypeInput.value === "employer" ? "block" : "none";
    });
  });

  // PASSWORD TOGGLE
  if (togglePass) {
    togglePass.addEventListener("click", function() {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      this.classList.toggle("fa-eye");
      this.classList.toggle("fa-eye-slash");
    });
  }

  // MODAL POLICY
  if (openPolicyBtn) {
    openPolicyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("show");
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("show"));
  window.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("show"); });

  // VALIDATION FUNCTIONS
  const validateFullName = (name) => {
    if (!name || name.trim().length < 2) return { valid: false, message: "Họ và tên phải có ít nhất 2 ký tự" };
    if (/\d/.test(name)) return { valid: false, message: "Họ và tên không được chứa số" };
    return { valid: true };
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!phone) return { valid: false, message: "Số điện thoại không được để trống" };
    if (!phoneRegex.test(phone)) return { valid: false, message: "Số điện thoại không hợp lệ (VD: 0912345678)" };
    return { valid: true };
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!email) return { valid: false, message: "Email không được để trống" };
    if (!emailRegex.test(email)) return { valid: false, message: "Email không hợp lệ (VD: ten@domain.com)" };
    return { valid: true };
  };

  const validatePassword = (password) => {
    if (!password) return { valid: false, message: "Mật khẩu không được để trống" };
    if (password.length < 6) return { valid: false, message: "Mật khẩu phải có ít nhất 6 ký tự" };
    if (!/[A-Z]/.test(password)) return { valid: false, message: "Mật khẩu phải có ít nhất 1 chữ hoa" };
    if (!/[a-z]/.test(password)) return { valid: false, message: "Mật khẩu phải có ít nhất 1 chữ thường" };
    if (!/[0-9]/.test(password)) return { valid: false, message: "Mật khẩu phải có ít nhất 1 số" };
    return { valid: true };
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) return { valid: false, message: "Mật khẩu nhập lại không khớp" };
    return { valid: true };
  };

  const validateEmployerFields = () => {
    if (userTypeInput.value !== "employer") return { valid: true };
    const companyName = companyNameInput?.value?.trim() || "";
    const companyAddress = companyAddressInput?.value?.trim() || "";
    const companyType = companyTypeSelect?.value || "";
    if (!companyName) return { valid: false, message: "Vui lòng nhập tên công ty" };
    if (companyName.length < 2) return { valid: false, message: "Tên công ty phải có ít nhất 2 ký tự" };
    if (!companyAddress) return { valid: false, message: "Vui lòng nhập địa chỉ công ty" };
    if (!companyType || companyType === "-- Loại công ty --") return { valid: false, message: "Vui lòng chọn loại công ty" };
    return { valid: true };
  };

  const isEmailExists = (email) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.email === email);
  };

  const isPhoneExists = (phone) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.phone === phone);
  };

  // SHOW ERROR
  const showError = (inputElement, message) => {
    const existingError = inputElement.parentElement?.querySelector(".error-message");
    if (existingError) existingError.remove();
    inputElement.style.border = "1px solid #ef4444";
    const errorSpan = document.createElement("span");
    errorSpan.className = "error-message";
    errorSpan.style.color = "#ef4444";
    errorSpan.style.fontSize = "12px";
    errorSpan.style.marginTop = "5px";
    errorSpan.innerText = message;
    inputElement.parentElement?.appendChild(errorSpan);
  };

  const clearErrors = () => {
    document.querySelectorAll(".error-message").forEach(err => err.remove());
    document.querySelectorAll("input, select").forEach(input => input.style.border = "");
  };

  const showCheckboxError = (message) => {
    const optionsDiv = document.querySelector(".options");
    const existingError = optionsDiv.querySelector(".error-message");
    if (existingError) existingError.remove();
    const errorSpan = document.createElement("span");
    errorSpan.className = "error-message";
    errorSpan.style.color = "#ef4444";
    errorSpan.style.fontSize = "12px";
    errorSpan.style.display = "block";
    errorSpan.innerText = message;
    optionsDiv.appendChild(errorSpan);
  };

  // REGISTER HANDLER
  const handleRegister = () => {
    clearErrors();
    
    const fullname = fullnameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const userType = userTypeInput.value;
    const agree = agreeCheckbox.checked;
    
    let hasError = false;

    const nameValidation = validateFullName(fullname);
    if (!nameValidation.valid) { showError(fullnameInput, nameValidation.message); hasError = true; }
    
    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.valid) { showError(phoneInput, phoneValidation.message); hasError = true; }
    else if (isPhoneExists(phone)) { showError(phoneInput, "Số điện thoại đã được đăng ký"); hasError = true; }
    
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) { showError(emailInput, emailValidation.message); hasError = true; }
    else if (isEmailExists(email)) { showError(emailInput, "Email đã được đăng ký"); hasError = true; }
    
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) { showError(passwordInput, passwordValidation.message); hasError = true; }
    
    const confirmValidation = validateConfirmPassword(password, confirmPassword);
    if (!confirmValidation.valid) { showError(confirmPasswordInput, confirmValidation.message); hasError = true; }
    
    const employerValidation = validateEmployerFields();
    if (!employerValidation.valid) {
      if (!companyNameInput?.value.trim()) showError(companyNameInput, employerValidation.message);
      else if (!companyAddressInput?.value.trim()) showError(companyAddressInput, employerValidation.message);
      else if (companyTypeSelect && (!companyTypeSelect.value || companyTypeSelect.value === "-- Loại công ty --")) showError(companyTypeSelect, employerValidation.message);
      hasError = true;
    }
    
    if (!agree) { showCheckboxError("Bạn cần đồng ý với điều khoản & bảo mật"); hasError = true; }
    
    if (hasError) return;

    // SAVE USER
    const newUser = {
      id: Date.now(),
      name: fullname,
      fullname: fullname,
      phone: phone,
      email: email,
      password: password,
      userType: userType,
      role: userType === "employer" ? "employer" : "candidate",
      createdAt: new Date().toISOString()
    };
    
    if (userType === "employer") {
      newUser.company = {
        name: companyNameInput.value.trim(),
        address: companyAddressInput.value.trim(),
        type: companyTypeSelect.value
      };
    }
    
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    
    alert("Đăng ký thành công! Chào mừng bạn đến với Danang Work.");
    window.location.href = "index.html";
  };
  
  registerBtn.addEventListener("click", handleRegister);
  
  // Enter key support
  const inputs = [fullnameInput, phoneInput, emailInput, passwordInput, confirmPasswordInput, companyNameInput, companyAddressInput];
  inputs.forEach(input => {
    input?.addEventListener("keypress", (e) => { if (e.key === "Enter") handleRegister(); });
  });
});