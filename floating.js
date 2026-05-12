document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".floating-actions")) return;

  const wrapper = document.createElement("div");
  wrapper.className = "floating-actions";

  wrapper.innerHTML = `
    <a href="yeuthich.html" class="fab fab-heart">
      <i class="fas fa-heart"></i>
    </a>

    <div class="fab fab-bell" id="notifyBtn">
      <i class="fas fa-bell"></i>
      <span class="dot" id="notifyDot"></span>
    </div>

    <div class="notify-panel" id="notifyPanel">
      <h3>Thông báo</h3>
      <div class="notify-item">📢 Có việc làm mới</div>
      <div class="notify-item">🏢 Công ty đang tuyển</div>
      <div class="notify-item">🔥 CV được xem</div>
    </div>
  `;

  document.body.appendChild(wrapper);

  const notifyBtn = document.getElementById("notifyBtn");
  const notifyPanel = document.getElementById("notifyPanel");
  const notifyDot = document.getElementById("notifyDot");

  let hasNotify = true;
  if (hasNotify) notifyDot.style.display = "block";

  notifyBtn.addEventListener("click", () => {
    notifyPanel.style.display =
      notifyPanel.style.display === "flex" ? "none" : "flex";

    notifyDot.style.display = "none";
  });
});