document.addEventListener("DOMContentLoaded", () => {
  const userBox = document.getElementById("userBox");
  const authButtons = document.getElementById("authButtons");

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    // Ẩn login/register
    if (authButtons) authButtons.style.display = "none";

    // Hiện user + logout
    if (userBox) {
      userBox.innerHTML = `
        <div class="user-info">
          <a href="profile.html" style="display:flex;align-items:center;gap:8px;text-decoration:none;color:inherit;">
            <i class="fas fa-user-circle avatar-icon"></i>
            <span class="username">${user.username}</span>
          </a>
          <button id="logoutBtn">Đăng xuất</button>
        </div>
      `;

      // xử lý logout
      document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        location.reload();
      });
    }
  }
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const usernameText = document.getElementById("usernameText");
  const userBox = document.getElementById("userBox");
  const logoutBtn = document.getElementById("logoutBtn");

  if (user) {
    usernameText.textContent = user.fullname || user.username;

    // đảm bảo có thể click vào profile
    userBox.href = "profile.html";
  } else {
    usernameText.textContent = "Khách";
    userBox.href = "login.html";
  }

  if (logoutBtn) {
    logoutBtn.onclick = () => {
      localStorage.removeItem("currentUser");
      window.location.reload();
    };
  }
});
});