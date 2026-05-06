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
// ✅ THÊM vì code của bạn dùng jobsPerPage nhưng chưa khai báo
const jobsPerPage = 6;
let currentPage = 1;

function displayJobs(jobList) {
  const jobContainer = document.getElementById("jobContainer");
  jobContainer.innerHTML = "";

  const start = (currentPage - 1) * jobsPerPage;
  const end = start + jobsPerPage;
  const jobsToShow = jobList.slice(start, end);

  jobsToShow.forEach(job => {
    const jobCard = `
      <div class="job-card">
        <img src="${job.image}" alt="">
        <h3>${job.title}</h3>
        <p>${job.company}</p>
        <p>${job.address}</p>
        <p class="salary">${job.salary}</p>
      </div>
    `;
    jobContainer.innerHTML += jobCard;
  });

  setupPagination(jobList);
}

function setupPagination(jobList) {
  const pageCount = Math.ceil(jobList.length / jobsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;

    if (i === currentPage) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      currentPage = i;
      displayJobs(jobList);
    });

    pagination.appendChild(btn);
  }
} 

const jobsData = {
  "lien-chieu": [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Công Ty TNHH Thiết Kế Công Nghệ Thông Tin LOVAWEB",
      field: "Công nghệ thông tin",
      skills: ["react", "javascript"],
      salary: "15-25M",
      image: "img/IT1.jpg",
      desc: "Làm UI, React, teamwork Agile."
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Interate Corp",
      field: "Công nghệ thông tin",
      skills: ["nodejs", "python"],
      salary: "20-30M",
      image: "img/IT2.png",
      desc: "Digital platform, marketing technology."
    },
    {
      id: 3,
      title: "Network + System administrator",
      company: "Chi nhánh Công ty TNHH MTV Giải Pháp TNET",
      field: "Công nghệ thông tin",
      skills: ["Backend", "Python"],
      salary: "25-30M",
      image: "img/IT3.jpg",
      desc: "Phần mềm, mạng, đào tạo CNTT."
    },
    {
      id: 4,
      title: "IT phần cứng, mạng",
      company: "ATTech Đà Nẵng",
      field: "Công nghệ thông tin",
      skills: ["Phần cứng"],
      salary: "25-30M",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      desc: "Phần cứng, đào tạo CNTT."
    },
    {
      id: 5,
      title: "Phát triển phần mềm",
      company: "Công Ty TNHH Phát Triển Phần Mềm Thương Hiệu Việt",
      field: "Công nghệ thông tin",
      skills: ["Frontend", "Backend"],
      salary: "10-15M",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      desc: "Muốn làm web developer."
    },
   {
      id: 6,
      title: "Công Ty Du Lịch (tour – lữ hành)",
      company: "Công Ty TNHH Dịch Vụ Và Du Lịch S Pearl",
      field: "Du lịch - Khách sạn",
      skills: ["Marketing / website du lịch"],
      salary: "10-20M",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      desc: "Sales tour, điều hành tour."
    },
    {
      id: 7,
      title: "Lễ Tân Khách Sạn",
      company: "Mikazuki Japanese Resorts & Spa Đà Nẵng",
      field: "Du lịch - Khách sạn",
      skills: ["Lễ tân, quản lý, vận hành"],
      salary: "10-20M",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      desc: "Lễ tân, quản lý, vận hành."
    },
    {
      id: 8,
      title: "Nhân Viên Buồng Phòng",
      company: "Mikazuki Japanese Resorts & Spa Đà Nẵng",
      field: "Du lịch - Khách sạn",
      skills: ["Buồng phòng,chăm sóc khách hàng"],
      salary: "10-20M",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      desc: "Buồng phòng, chăm sóc khách hàng."
    },
    {
      id: 9,
      title: "Hương Dẫn Viên Du Lịch",
      company: "The Nature Villas & Resort",
      field: "Du lịch - Khách sạn",
      skills: ["Tham quan, hướng dẫn viên du lịch"],
      salary: "10-20M",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      desc: "Tham quan, hướng dẫn viên du lịch."
    },
    {
      id: 10,
      title: "Phục Vụ Nhà Hàng",
      company: "Vietland Discovery",
      field: "Du lịch - Khách sạn",
      skills: ["Phục vụ, chăm sóc khách hàng"],
      salary: "10-20M",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      desc: "Phục vụ, chăm sóc khách hàng."
    },
    {
  id: 11,
  title: "Nhân viên Marketing Online",
  company: "Công ty TNHH Media Đà Nẵng",
  field: "Kinh doanh - Marketing",
  skills: ["Facebook Ads, Content, SEO"],
  salary: "8-15M",
  image: "https://images.unsplash.com/photo-1557838923-2985c318be48",
  desc: "Quản lý chiến dịch quảng cáo và nội dung trên mạng xã hội."
},
{
  id: 12,
  title: "Nhân viên Kinh doanh B2B",
  company: "Công ty Thương mại Hòa Khánh",
  field: "Kinh doanh - Marketing",
  skills: ["Giao tiếp, đàm phán, bán hàng"],
  salary: "10-20M",
  image: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
  desc: "Tìm kiếm khách hàng doanh nghiệp và phát triển thị trường."
},
{
  id: 13,
  title: "Content Marketing",
  company: "Agency Sáng Tạo Liên Chiểu",
  field: "Kinh doanh - Marketing",
  skills: ["Viết content, sáng tạo, SEO"],
  salary: "7-12M",
  image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  desc: "Viết bài quảng cáo, quản lý nội dung website và fanpage."
},
{
  id: 14,
  title: "Nhân viên Telesales",
  company: "Công ty Dịch vụ Viễn thông Đà Nẵng",
  field: "Kinh doanh - Marketing",
  skills: ["Gọi điện, tư vấn, chốt sale"],
  salary: "6-12M + KPI",
  image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  desc: "Gọi điện tư vấn và giới thiệu dịch vụ cho khách hàng."
},
{
  id: 15,
  title: "Chuyên viên Digital Marketing",
  company: "Công ty Công nghệ Hòa Khánh",
  field: "Kinh doanh - Marketing",
  skills: ["Google Ads, Analytics, SEO"],
  salary: "12-20M",
  image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  desc: "Triển khai và tối ưu các chiến dịch marketing số."
},
{
  id: 16,
  title: "Kỹ sư Xây dựng",
  company: "Công ty Xây dựng Hòa Khánh",
  field: "Xây dựng - Bất động sản",
  skills: ["Giám sát công trình, AutoCAD, đọc bản vẽ"],
  salary: "12-20M",
  image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
  desc: "Giám sát thi công công trình và đảm bảo tiến độ xây dựng."
},
{
  id: 17,
  title: "Nhân viên Kinh doanh Bất động sản",
  company: "Công ty BĐS Liên Chiểu Land",
  field: "Xây dựng - Bất động sản",
  skills: ["Tư vấn, bán hàng, marketing bất động sản"],
  salary: "10-30M + hoa hồng",
  image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  desc: "Tư vấn và môi giới các sản phẩm bất động sản tại khu vực Liên Chiểu."
},
{
  id: 18,
  title: "Giao dịch viên Ngân hàng",
  company: "Ngân hàng TMCP Á Châu (ACB)",
  field: "Tài chính - Ngân hàng",
  skills: ["Giao dịch, tư vấn khách hàng, xử lý hồ sơ"],
  salary: "9-14M",
  image: "https://images.unsplash.com/photo-1565514020179-026b92b4a49c",
  desc: "Thực hiện giao dịch tiền gửi, rút tiền và hỗ trợ khách hàng tại quầy."
},
{
  id: 19,
  title: "Chuyên viên Tín dụng",
  company: "Ngân hàng BIDV Liên Chiểu",
  field: "Tài chính - Ngân hàng",
  skills: ["Thẩm định hồ sơ, phân tích tài chính"],
  salary: "12-20M",
  image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
  desc: "Thẩm định hồ sơ vay vốn và quản lý danh mục khách hàng."
},
{
  id: 20,
  title: "Nhân viên Thu hồi nợ",
  company: "Công ty Tài chính FE Credit",
  field: "Tài chính - Ngân hàng",
  skills: ["Đàm phán, giao tiếp, xử lý tình huống"],
  salary: "10-18M",
  image: "https://images.unsplash.com/photo-1581090700227-1e8a9c2f3d8b",
  desc: "Liên hệ khách hàng, hỗ trợ thu hồi các khoản nợ quá hạn."
},
{
  id: 21,
  title: "Nhân viên Kế toán nội bộ",
  company: "Công ty Thương mại Liên Chiểu",
  field: "Tài chính - Ngân hàng",
  skills: ["Hạch toán, Excel, báo cáo tài chính"],
  salary: "8-13M",
  image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
  desc: "Quản lý sổ sách kế toán và lập báo cáo tài chính nội bộ."
},
{
  id: 22,
  title: "Tư vấn Bảo hiểm Tài chính",
  company: "Prudential Đà Nẵng",
  field: "Tài chính - Ngân hàng",
  skills: ["Tư vấn, bán hàng, chăm sóc khách hàng"],
  salary: "10-25M",
  image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d",
  desc: "Tư vấn các sản phẩm bảo hiểm và giải pháp tài chính cá nhân."
},
{
  id: 23,
  title: "Nhân viên Phân tích tài chính",
  company: "Công ty Đầu tư Hòa Khánh",
  field: "Tài chính - Ngân hàng",
  skills: ["Phân tích dữ liệu, lập báo cáo, Excel nâng cao"],
  salary: "12-22M",
  image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
  desc: "Phân tích hiệu quả đầu tư và lập kế hoạch tài chính."
},
{
  id: 24,
  title: "Nhân viên Hỗ trợ tín dụng",
  company: "Ngân hàng VietinBank",
  field: "Tài chính - Ngân hàng",
  skills: ["Hồ sơ tín dụng, nhập liệu, kiểm tra giấy tờ"],
  salary: "9-15M",
  image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f",
  desc: "Hỗ trợ xử lý hồ sơ vay vốn và kiểm tra chứng từ."
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