document.addEventListener("DOMContentLoaded", () => {
  // ================== USER ==================
  const userBox = document.getElementById("userBox");
  const authButtons = document.getElementById("authButtons");
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    authButtons.style.display = "none";

    userBox.innerHTML = `
      <a href="profile.html" class="user-info">
        <i class="fa fa-user-circle avatar-icon"></i>
        <span class="username">${user.fullname || user.username}</span>
        <button id="logoutBtn" type="button">Đăng xuất</button>
      </a>
    `;

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        localStorage.removeItem("currentUser");
        location.reload();
      };
    }
  } else {
    authButtons.style.display = "flex";
    userBox.innerHTML = "";
  }

  // ================== SEARCH ==================
  const searchBtn = document.querySelector(".search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const keyword = document.getElementById("skillInput").value.toLowerCase();
      const district = document.getElementById("districtSelect").value;

      if (!district) {
        alert("Chọn quận trước!");
        return;
      }

      const jobs = jobsData[district] || [];

      const filtered = jobs.filter(job => {
        const skillsMatch = Array.isArray(job.skills)
          ? job.skills.some(skill => String(skill).toLowerCase().includes(keyword))
          : false;

        return (
          job.title.toLowerCase().includes(keyword) ||
          skillsMatch ||
          job.field.toLowerCase().includes(keyword)
        );
      });

      renderJobs(filtered, 1);

      document.getElementById("jobList")?.scrollIntoView({
        behavior: "smooth"
      });
    });
  }
});

// ================== DATA ==================
const jobsPerPage = 6; // ✅ THÊM vì code của bạn dùng jobsPerPage nhưng chưa khai báo

const jobsData = {
  "hai-chau": [
    {
      id: 1,
      title: "Frontend Developer",
      company: "FPT Software",
      field: "Công nghệ thông tin",
      skills: ["react", "javascript"],
      salary: "15-25M",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      desc: "Làm UI, React, teamwork Agile."
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Design Studio",
      field: "Thiết kế - Sáng tạo",
      skills: ["figma", "uiux"],
      salary: "12-18M",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
      desc: "Thiết kế giao diện web/app."
    },
    {
      id: 3,
      title: "Marketing Executive",
      company: "Danang Media",
      field: "Kinh doanh - Marketing",
      skills: ["marketing"],
      salary: "10-18M",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48",
      desc: "Chạy ads, quản lý chiến dịch."
    }
  ],

  "lien-chieu": [
    {
      id: 4,
      title: "Java Developer",
      company: "Công ty Cổ phần Phát triển Phần mềm ASIA (AsiaSoft)",
      field: "Công nghệ thông tin",
      skills: ["java", "spring"],
      salary: "20-30M",
      image: "img/asiaSoft.png",
      desc: "Phát triển hệ thống backend."
    },
    {
      id: 4,
      title: "Backend Developer",
      company: "Công ty Cổ phần Phần mềm BRAVO",
      field: "Công nghệ thông tin",
      skills: ["java", "spring"],
      salary: "20-30M",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      desc: "Phát triển hệ thống backend."
    },
    {
      id: 4,
      title: "Java Developer",
      company: "TMA Solutions",
      field: "Công nghệ thông tin",
      skills: ["java", "spring"],
      salary: "20-30M",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      desc: "Phát triển hệ thống backend."
    },
    {
      id: 4,
      title: "Java Developer",
      company: "TMA Solutions",
      field: "Công nghệ thông tin",
      skills: ["java", "spring"],
      salary: "20-30M",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      desc: "Phát triển hệ thống backend."
    },
    {
      id: 4,
      title: "Java Developer",
      company: "TMA Solutions",
      field: "Công nghệ thông tin",
      skills: ["java", "spring"],
      salary: "20-30M",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      desc: "Phát triển hệ thống backend."
    },
    {
      id: 4,
      title: "Java Developer",
      company: "TMA Solutions",
      field: "Công nghệ thông tin",
      skills: ["java", "spring"],
      salary: "20-30M",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      desc: "Phát triển hệ thống backend."
    },
    {
      id: 4,
      title: "Java Developer",
      company: "TMA Solutions",
      field: "Công nghệ thông tin",
      skills: ["java", "spring"],
      salary: "20-30M",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      desc: "Phát triển hệ thống backend."
    },
    {
      id: 10,
      title: "Java Developer",
      company: "TMA Solutions",
      field: "Công nghệ thông tin",
      skills: ["java", "spring"],
      salary: "20-30M",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      desc: "Phát triển hệ thống backend."
    },
    {
      id: 4,
      title: "Java Developer",
      company: "TMA Solutions",
      field: "Công nghệ thông tin",
      skills: ["java", "spring"],
      salary: "20-30M",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      desc: "Phát triển hệ thống backend."
    },
    {
      id: 5,
      title: "Kỹ sư xây dựng",
      company: "XD Miền Trung",
      field: "Xây dựng - Bất động sản",
      skills: ["autocad"],
      salary: "18-25M",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
      desc: "Giám sát công trình."
    },
    {
      id: 6,
      title: "Nhân viên kho",
      company: "Logistics VN",
      field: "Logistics - Vận hành",
      skills: ["warehouse"],
      salary: "8-12M",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
      desc: "Quản lý hàng hóa."
    }
  ],

  "ngu-hanh-son": [
    {
      id: 7,
      title: "Backend Developer",
      company: "Axon Active",
      field: "Công nghệ thông tin",
      skills: ["nodejs"],
      salary: "18-28M",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
      desc: "Xây dựng API."
    },
    {
      id: 8,
      title: "Lễ tân khách sạn",
      company: "Fusion Resort",
      field: "Du lịch - Khách sạn",
      skills: ["giao tiếp"],
      salary: "7-12M",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      desc: "Đón tiếp khách."
    }
  ],

  "son-tra": [
    {
      id: 9,
      title: "Hướng dẫn viên",
      company: "Danang Travel",
      field: "Du lịch - Khách sạn",
      skills: ["tour"],
      salary: "10-15M",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      desc: "Dẫn tour du lịch."
    },
    {
      id: 10,
      title: "Nhân viên nhà hàng",
      company: "Seafood Restaurant",
      field: "Dịch vụ - Nhà hàng",
      skills: ["phục vụ"],
      salary: "6-10M",
      image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee",
      desc: "Phục vụ khách."
    }
  ],

  "thanh-khe": [
    {
      id: 11,
      title: "Kế toán",
      company: "Finance Corp",
      field: "Tài chính - Ngân hàng",
      skills: ["excel"],
      salary: "12-18M",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
      desc: "Quản lý tài chính."
    },
    {
      id: 12,
      title: "Nhân sự",
      company: "HR Solutions",
      field: "Hành chính - Nhân sự",
      skills: ["hr"],
      salary: "10-15M",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      desc: "Tuyển dụng, quản lý nhân sự."
    }
  ],

  "cam-le": [
    {
      id: 13,
      title: "Công nhân sản xuất",
      company: "Factory DN",
      field: "Sản xuất - Kỹ thuật",
      skills: ["kỹ thuật"],
      salary: "8-12M",
      image: "https://images.unsplash.com/photo-1581091870627-3b1d4a6a8e2c",
      desc: "Làm việc dây chuyền."
    },
    {
      id: 14,
      title: "Giáo viên tiếng Anh",
      company: "English Center",
      field: "Giáo dục - Đào tạo",
      skills: ["english"],
      salary: "12-20M",
      image: "https://images.unsplash.com/photo-1584697964190-3a1a2c1f9c5d",
      desc: "Dạy tiếng Anh."
    }
  ]
};

function renderJobs(list, page = 1) {
  const jobList = document.getElementById("jobList");

  if (!list || list.length === 0) {
    jobList.innerHTML = "<p>Không tìm thấy công việc phù hợp</p>";
    return;
  }

  const start = (page - 1) * jobsPerPage;
  const paginatedJobs = list.slice(start, start + jobsPerPage);

  jobList.innerHTML = paginatedJobs.map(job => `
    <div class="job-card">
      <div class="job-img">
        <img src="${job.image}" alt="">
      </div>

      <div class="job-content">
        <div class="job-title">${job.title}</div>

        <div class="job-company">
          <i class="fas fa-building"></i> ${job.company}
        </div>

        <div class="job-info">
          <div><i class="fas fa-map-marker-alt"></i> ${getDistrictByJobId(job.id)}</div>
          <div><i class="fas fa-money-bill-wave"></i> ${job.salary}</div>
        </div>

        <button type="button" onclick="viewDetail(${job.id})">Xem chi tiết</button>
      </div>
    </div>
  `).join("");
}

function formatDistrict(key) {
  const map = {
    "hai-chau": "Hải Châu",
    "lien-chieu": "Liên Chiểu",
    "thanh-khe": "Thanh Khê",
    "ngu-hanh-son": "Ngũ Hành Sơn",
    "son-tra": "Sơn Trà",
    "cam-le": "Cẩm Lệ"
  };
  return map[key] || key;
}

function getDistrictByJobId(id) {
  for (const key in jobsData) {
    if (jobsData[key].some(j => j.id === id)) {
      return formatDistrict(key);
    }
  }
  return "Không rõ";
}