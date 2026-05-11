document.addEventListener("DOMContentLoaded", () => {
  const authButtons = document.getElementById("authButtons");
  const userBox = document.getElementById("userBox");

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    if (authButtons) authButtons.style.display = "flex";
    return;
  }

  if (authButtons) authButtons.style.display = "none";

  // LẤY TÊN CHUẨN (QUAN TRỌNG)
  const displayName =
    user.fullname ||
    user.name ||
    user.username ||
    (user.email ? user.email.split("@")[0] : "User");

  userBox.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;">

      <a href="profile.html"
         style="display:flex;align-items:center;gap:8px;text-decoration:none;color:inherit;">

        <i class="fas fa-user-circle" style="font-size:20px;"></i>

        <span>${displayName}</span>

      </a>

      <button id="logoutBtn"
              style="padding:5px 10px;border:none;border-radius:6px;cursor:pointer;">
        Đăng xuất
      </button>

    </div>
  `;

  document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("currentUser");
    location.reload();
  };
});