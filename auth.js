document.addEventListener("DOMContentLoaded", () => {
  const authButtons = document.getElementById("authButtons");

  function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user && user.email) {
      if (authButtons) authButtons.style.display = "none";
      
      if (userBox) {
        const displayName = user.name || user.fullname || user.username || user.email.split("@")[0];
        userBox.style.display = "block";
        userBox.innerHTML = `
          <div class="user-info">
            <div class="user-avatar">${displayName.charAt(0).toUpperCase()}</div>
            <span class="user-name">${displayName}</span>
            <button id="logoutBtn" class="logout-btn">Đăng xuất</button>
          </div>
        `;
        
        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userName");
            localStorage.removeItem("rememberUser");
            window.location.href = "index.html";
          });
        }
      }
    } else {
      if (authButtons) authButtons.style.display = "flex";
      if (userBox) {
        userBox.style.display = "none";
        userBox.innerHTML = "";
      }
    }
  }

  updateAuthUI();
  
  window.addEventListener("storage", updateAuthUI);
});