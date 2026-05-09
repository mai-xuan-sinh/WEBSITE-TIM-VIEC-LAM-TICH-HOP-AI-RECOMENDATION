<<<<<<< HEAD
=======
document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const userTypeCards = document.querySelectorAll(".type-card");
  const userTypeInput = document.getElementById("userType");
  const employerFields = document.getElementById("employerFields");
  const registerBtn = document.getElementById("registerBtn");
  const agreeCheckbox = document.getElementById("agree");
  
  // Input fields
  const fullnameInput = document.getElementById("fullname");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const companyNameInput = document.getElementById("companyName");
  const companyAddressInput = document.getElementById("companyAddress");
  const companyTypeSelect = document.querySelector("#employerFields select");

  // Password toggle
  const togglePass = document.querySelector(".toggle-pass");
  
  // Modal elements
  const modal = document.getElementById("policyModal");
  const openPolicyBtn = document.getElementById("openPolicy");
  const closeBtn = document.querySelector(".close");

  // ========== 1. USER TYPE TOGGLE ==========
  userTypeCards.forEach(card => {
    card.addEventListener("click", () => {
      userTypeCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      userTypeInput.value = card.getAttribute("data-value");
      
      if (userTypeInput.value === "employer") {
        employerFields.style.display = "block";
      } else {
        employerFields.style.display = "none";
      }
    });
  });

  employerFields.style.display = "none";

  // ========== 2. PASSWORD TOGGLE ==========
  if (togglePass) {
    togglePass.addEventListener("click", function() {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      this.classList.toggle("fa-eye");
      this.classList.toggle("fa-eye-slash");
    });
  }

  // ========== 3. MODAL POLICY ==========
  if (openPolicyBtn) {
    openPolicyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // ========== 4. VALIDATION FUNCTIONS ==========
  
  const validateFullName = (name) => {
    if (!name || name.trim().length < 2) {
      return { valid: false, message: "Họ và tên phải có ít nhất 2 ký tự" };
    }
    if (/\d/.test(name)) {
      return { valid: false, message: "Họ và tên không được chứa số" };
    }
    return { valid: true, message: "" };
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!phone) {
      return { valid: false, message: "Số điện thoại không được để trống" };
    }
    if (!phoneRegex.test(phone)) {
      return { valid: false, message: "Số điện thoại không hợp lệ (VD: 0912345678)" };
    }
    return { valid: true, message: "" };
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!email) {
      return { valid: false, message: "Email không được để trống" };
    }
    if (!emailRegex.test(email)) {
      return { valid: false, message: "Email không hợp lệ (VD: ten@domain.com)" };
    }
    return { valid: true, message: "" };
  };

  const validatePassword = (password) => {
    if (!password) {
      return { valid: false, message: "Mật khẩu không được để trống" };
    }
    if (password.length < 6) {
      return { valid: false, message: "Mật khẩu phải có ít nhất 6 ký tự" };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: "Mật khẩu phải có ít nhất 1 chữ hoa" };
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: "Mật khẩu phải có ít nhất 1 chữ thường" };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: "Mật khẩu phải có ít nhất 1 số" };
    }
    return { valid: true, message: "" };
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return { valid: false, message: "Mật khẩu nhập lại không khớp" };
    }
    return { valid: true, message: "" };
  };

  const validateEmployerFields = () => {
    if (userTypeInput.value !== "employer") {
      return { valid: true, message: "" };
    }
    
    const companyName = companyNameInput?.value?.trim() || "";
    const companyAddress = companyAddressInput?.value?.trim() || "";
    const companyType = companyTypeSelect?.value || "";
    
    if (!companyName) {
      return { valid: false, message: "Vui lòng nhập tên công ty", field: "companyName" };
    }
    if (companyName.length < 2) {
      return { valid: false, message: "Tên công ty phải có ít nhất 2 ký tự", field: "companyName" };
    }
    if (!companyAddress) {
      return { valid: false, message: "Vui lòng nhập địa chỉ công ty", field: "companyAddress" };
    }
    if (!companyType || companyType === "-- Loại công ty --") {
      return { valid: false, message: "Vui lòng chọn loại công ty", field: "companyType" };
    }
    return { valid: true, message: "" };
  };

  const isEmailExists = (email) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.email === email);
  };

  const isPhoneExists = (phone) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.phone === phone);
  };

  // ========== 5. UI ERROR HANDLING ==========
  const showError = (inputElement, message) => {
    const existingError = inputElement.parentElement?.querySelector(".error-message");
    if (existingError) existingError.remove();
    
    inputElement.parentElement?.classList.add("error");
    inputElement.style.border = "none";
    
    const errorSpan = document.createElement("span");
    errorSpan.className = "error-message";
    errorSpan.innerText = message;
    
    inputElement.parentElement?.appendChild(errorSpan);
  };

  const showCheckboxError = (message) => {
    const optionsDiv = document.querySelector(".options");
    const existingError = optionsDiv.querySelector(".error-message");
    if (existingError) existingError.remove();
    
    optionsDiv.classList.add("has-error");
    
    const errorSpan = document.createElement("span");
    errorSpan.className = "error-message";
    errorSpan.innerText = message;
    optionsDiv.appendChild(errorSpan);
  };

  const clearErrors = () => {
    document.querySelectorAll(".error-message").forEach(err => err.remove());
    document.querySelectorAll(".input-group").forEach(group => {
      group.classList.remove("error");
    });
    document.querySelectorAll(".input-group input, .input-group select").forEach(input => {
      input.style.border = "";
    });
    document.querySelector(".options")?.classList.remove("has-error");
  };

  // ========== 6. REGISTER FUNCTION ==========
  const handleRegister = () => {
    clearErrors();
    
    const fullname = fullnameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const userType = userTypeInput.value;
    const agree = agreeCheckbox.checked;
    
    let hasError = false;
    
    // Fullname
    const nameValidation = validateFullName(fullname);
    if (!nameValidation.valid) {
      showError(fullnameInput, nameValidation.message);
      hasError = true;
    }
    
    // Phone
    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.valid) {
      showError(phoneInput, phoneValidation.message);
      hasError = true;
    } else if (isPhoneExists(phone)) {
      showError(phoneInput, "Số điện thoại đã được đăng ký");
      hasError = true;
    }
    
    // Email
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      showError(emailInput, emailValidation.message);
      hasError = true;
    } else if (isEmailExists(email)) {
      showError(emailInput, "Email đã được đăng ký");
      hasError = true;
    }
    
    // Password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      showError(passwordInput, passwordValidation.message);
      hasError = true;
    }
    
    // Confirm password
    const confirmValidation = validateConfirmPassword(password, confirmPassword);
    if (!confirmValidation.valid) {
      showError(confirmPasswordInput, confirmValidation.message);
      hasError = true;
    }
    
    // Employer fields
    const employerValidation = validateEmployerFields();
    if (!employerValidation.valid) {
      if (employerValidation.field === "companyName" && companyNameInput) {
        showError(companyNameInput, employerValidation.message);
      } else if (employerValidation.field === "companyAddress" && companyAddressInput) {
        showError(companyAddressInput, employerValidation.message);
      } else if (employerValidation.field === "companyType" && companyTypeSelect) {
        showError(companyTypeSelect, employerValidation.message);
      } else if (!employerValidation.field) {
        if (companyNameInput && !companyNameInput.value.trim()) showError(companyNameInput, employerValidation.message);
        if (companyAddressInput && !companyAddressInput.value.trim()) showError(companyAddressInput, employerValidation.message);
        if (companyTypeSelect && (!companyTypeSelect.value || companyTypeSelect.value === "-- Loại công ty --")) showError(companyTypeSelect, employerValidation.message);
      }
      hasError = true;
    }
    
    // Terms
    if (!agree) {
      showCheckboxError("Bạn cần đồng ý với điều khoản & bảo mật");
      hasError = true;
    }
    
    if (hasError) return;
    
    // ========== 7. SAVE USER ==========
    const newUser = {
      id: Date.now(),
      name: fullname,
      phone: phone,
      email: email,
      password: password,
      userType: userType,
      createdAt: new Date().toISOString(),
      about: `Xin chào ${fullname}, đây là trang hồ sơ cá nhân của bạn trên hệ thống Danang Work.`
    };
    
    if (userType === "employer") {
      newUser.companyName = companyNameInput.value.trim();
      newUser.companyAddress = companyAddressInput.value.trim();
      newUser.companyType = companyTypeSelect.value;
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
    input?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleRegister();
    });
  });
});

>>>>>>> cb92c107390391dbaa1c9671e46a58fd601a12dd
// TYPE SWITCH
const typeCards = document.querySelectorAll('.type-card');
const employerFields = document.getElementById('employerFields');

typeCards.forEach(card => {
  card.onclick = () => {
    typeCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    if (card.dataset.value === "employer") {
      employerFields.style.display = "block";
    } else {
      employerFields.style.display = "none";
    }
  };
});

// SHOW PASSWORD
document.querySelectorAll('.toggle-pass').forEach(icon => {
  icon.onclick = () => {
    const input = icon.previousElementSibling;
    input.type = input.type === "password" ? "text" : "password";
    icon.classList.toggle("fa-eye-slash");
  };
});




const modal = document.getElementById("policyModal");
const openBtn = document.getElementById("openPolicy");
const closeBtn = document.querySelector(".close");

// mở
openBtn.onclick = (e) => {
  e.preventDefault();
  modal.classList.add("show");
};

// đóng bằng X
closeBtn.onclick = () => {
  modal.classList.remove("show");
};

// click ra ngoài thì đóng
window.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
};










const registerBtn = document.getElementById("registerBtn");

registerBtn.onclick = () => {
  const userType = document.querySelector(".type-card.active").dataset.value;

  const fullname = document.getElementById("fullname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
const confirmPassword = document.getElementById("confirmPassword").value.trim();

  const agree = document.getElementById("agree").checked;

  const companyName = document.getElementById("companyName")?.value.trim();
  const companyAddress = document.getElementById("companyAddress")?.value.trim();
  const companyType = document.getElementById("companyType")?.value;

  // VALIDATE
  if (!fullname || !phone || !email || !password || !confirmPassword) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp!");
    return;
  }

  if (!agree) {
    alert("Bạn phải đồng ý điều khoản!");
    return;
  }

  if (userType === "employer") {
    if (!companyName || !companyAddress || companyType === "-- Loại công ty --") {
      alert("Vui lòng nhập đầy đủ thông tin công ty!");
      return;
    }
  }

  // TẠO USER OBJECT
  const user = {
    username: fullname,
    phone,
    email,
    password,
    role: userType,
    company: userType === "employer" ? {
      name: companyName,
      address: companyAddress,
      type: companyType
    } : null
  };

  // LẤY DANH SÁCH USER
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // CHECK EMAIL TRÙNG
  const exist = users.find(u => u.email === email);
  if (exist) {
    alert("Email đã tồn tại!");
    return;
  }

  // LƯU
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Đăng ký thành công!");

  // RESET FORM
  window.location.href = "login.html";
<<<<<<< HEAD
};
=======
};
>>>>>>> cb92c107390391dbaa1c9671e46a58fd601a12dd
