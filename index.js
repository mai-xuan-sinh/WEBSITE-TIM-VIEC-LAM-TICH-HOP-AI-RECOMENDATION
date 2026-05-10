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
},
{
  id: 25,
  title: "Graphic Designer",
  company: "DN Creative Studio",
  field: "Thiết kế - Sáng tạo",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: [
    "Photoshop",
    "Illustrator",
    "Thiết kế banner",
    "Social Media Design"
  ],
  salary: "10-18M",
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  desc: "Thiết kế banner, poster, hình ảnh truyền thông cho các chiến dịch marketing và mạng xã hội."
},
{
  id: 26,
  title: "UI/UX Designer",
  company: "SeaTech Đà Nẵng",
  field: "Thiết kế - Sáng tạo",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: [
    "Figma",
    "Wireframe",
    "Prototype",
    "UI Mobile App"
  ],
  salary: "15-22M",
  image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
  desc: "Thiết kế giao diện website và ứng dụng mobile thân thiện với người dùng."
},
{
  id: 27,
  title: "Video Editor",
  company: "Media Wave Studio",
  field: "Thiết kế - Sáng tạo",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: [
    "Premiere Pro",
    "After Effects",
    "Dựng video TikTok",
    "Chỉnh màu"
  ],
  salary: "12-20M",
  image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb",
  desc: "Biên tập và dựng video quảng cáo, video social media cho khách hàng doanh nghiệp."
},
{
  id: 28,
  title: "Content Creator",
  company: "Lime Creative",
  field: "Thiết kế - Sáng tạo",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: [
    "Sáng tạo nội dung",
    "Canva",
    "Quay dựng cơ bản",
    "TikTok"
  ],
  salary: "8-14M",
  image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  desc: "Lên ý tưởng và sản xuất nội dung sáng tạo cho Facebook, TikTok và Instagram."
},
{
  id: 29,
  title: "Thiết kế 3D Nội thất",
  company: "Nội Thất ArtHome",
  field: "Thiết kế - Sáng tạo",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: [
    "3Ds Max",
    "SketchUp",
    "Render",
    "Thiết kế nội thất"
  ],
  salary: "14-25M",
  image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  desc: "Thiết kế phối cảnh 3D và không gian nội thất hiện đại cho nhà ở và văn phòng."
}
  ],
  "thanh-khe": [
    {
  id: 29,
  title: "Frontend Developer",
  company: "TechVision Đà Nẵng",
  field: "Công nghệ thông tin",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["HTML", "CSS", "JavaScript", "ReactJS"],
  salary: "15-25M",
  image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  desc: "Phát triển giao diện website và tối ưu trải nghiệm người dùng."
},
{
  id: 30,
  title: "Backend Developer",
  company: "DN Software Solutions",
  field: "Công nghệ thông tin",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["NodeJS", "ExpressJS", "MySQL", "REST API"],
  salary: "18-30M",
  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  desc: "Xây dựng hệ thống backend và phát triển API cho ứng dụng web."
},
{
  id: 31,
  title: "UI/UX Designer",
  company: "Creative Tech Studio",
  field: "Công nghệ thông tin",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Figma", "Prototype", "Wireframe", "UI Design"],
  salary: "12-20M",
  image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
  desc: "Thiết kế giao diện website và ứng dụng thân thiện với người dùng."
},
{
  id: 32,
  title: "Tester QA/QC",
  company: "SmartDev Vietnam",
  field: "Công nghệ thông tin",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Manual Test", "Bug Report", "Test Case"],
  salary: "10-18M",
  image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28",
  desc: "Kiểm thử phần mềm và đảm bảo chất lượng sản phẩm trước khi triển khai."
},
{
  id: 33,
  title: "Mobile App Developer",
  company: "AppFast Studio",
  field: "Công nghệ thông tin",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Flutter", "Firebase", "Android", "iOS"],
  salary: "20-32M",
  image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
  desc: "Phát triển ứng dụng mobile đa nền tảng cho Android và iOS."
},
{
  id: 34,
  title: "Lễ Tân Khách Sạn",
  company: "Khách sạn Samdi Đà Nẵng",
  field: "Du lịch - Khách sạn",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Lễ tân", "Giao tiếp", "Tiếng Anh"],
  salary: "8-14M",
  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  desc: "Đón tiếp khách hàng, hỗ trợ check-in/check-out và chăm sóc khách lưu trú."
},
{
  id: 35,
  title: "Nhân viên Buồng Phòng",
  company: "Gold Boutique Hotel",
  field: "Du lịch - Khách sạn",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Dọn phòng", "Chăm sóc khách hàng"],
  salary: "7-12M",
  image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  desc: "Vệ sinh và chuẩn bị phòng đạt tiêu chuẩn phục vụ khách sạn."
},
{
  id: 36,
  title: "Nhân viên Điều Hành Tour",
  company: "Đà Nẵng Travel Group",
  field: "Du lịch - Khách sạn",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Điều hành tour", "Giao tiếp", "Xử lý tình huống"],
  salary: "10-18M",
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  desc: "Sắp xếp lịch trình và quản lý các tour du lịch trong và ngoài thành phố."
},
{
  id: 37,
  title: "Hướng Dẫn Viên Du Lịch",
  company: "Viet Sun Travel",
  field: "Du lịch - Khách sạn",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Thuyết trình", "Tiếng Anh", "Hướng dẫn tour"],
  salary: "12-22M",
  image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60",
  desc: "Hướng dẫn khách tham quan các địa điểm du lịch nổi tiếng tại Đà Nẵng."
},
{
  id: 38,
  title: "Nhân viên Phục vụ Nhà hàng",
  company: "Eden Plaza Danang",
  field: "Du lịch - Khách sạn",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Phục vụ", "Giao tiếp", "Chăm sóc khách hàng"],
  salary: "7-13M",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  desc: "Phục vụ khách hàng tại nhà hàng khách sạn và hỗ trợ tổ chức tiệc."
},
{
  id: 39,
  title: "Quản Lý Khách Sạn",
  company: "Thanh Khê Riverside Hotel",
  field: "Du lịch - Khách sạn",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Quản lý", "Điều phối nhân sự", "Vận hành khách sạn"],
  salary: "18-30M",
  image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
  desc: "Quản lý hoạt động khách sạn, nhân sự và chất lượng dịch vụ lưu trú."
},
{
  id: 40,
  title: "Nhân viên Digital Marketing",
  company: "Sky Media Đà Nẵng",
  field: "Kinh doanh - Marketing",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Facebook Ads", "Google Ads", "SEO"],
  salary: "10-18M",
  image: "https://images.unsplash.com/photo-1557838923-2985c318be48",
  desc: "Triển khai chiến dịch quảng cáo online và tối ưu hiệu quả marketing."
},
{
  id: 41,
  title: "Nhân viên Kinh doanh",
  company: "Công ty Thương mại Minh Phát",
  field: "Kinh doanh - Marketing",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Tư vấn khách hàng", "Bán hàng", "Giao tiếp"],
  salary: "8-20M + KPI",
  image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
  desc: "Tìm kiếm khách hàng và phát triển thị trường cho công ty."
},
{
  id: 42,
  title: "Content Marketing",
  company: "Creative Agency DN",
  field: "Kinh doanh - Marketing",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Viết content", "SEO", "Social Media"],
  salary: "8-14M",
  image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  desc: "Sáng tạo nội dung cho website, fanpage và chiến dịch truyền thông."
},
{
  id: 43,
  title: "Chuyên viên SEO Website",
  company: "WebPlus Đà Nẵng",
  field: "Kinh doanh - Marketing",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["SEO", "Google Analytics", "Keyword Research"],
  salary: "10-16M",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  desc: "Tối ưu website và tăng thứ hạng tìm kiếm trên Google."
},
{
  id: 44,
  title: "Nhân viên Telesales",
  company: "Công ty Dịch vụ Viễn thông Miền Trung",
  field: "Kinh doanh - Marketing",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Tư vấn", "Giao tiếp", "Chốt sale"],
  salary: "7-15M + thưởng",
  image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  desc: "Liên hệ khách hàng tiềm năng và giới thiệu dịch vụ của công ty."
},
{
  id: 45,
  title: "Brand Marketing Executive",
  company: "Dana Branding Studio",
  field: "Kinh doanh - Marketing",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Branding", "Marketing Strategy", "Creative Thinking"],
  salary: "12-22M",
  image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  desc: "Xây dựng chiến lược thương hiệu và triển khai các chiến dịch marketing."
},
{
  id: 46,
  title: "Kỹ Sư Xây Dựng",
  company: "Công ty Xây dựng Thành Phát",
  field: "Xây dựng - Bất động sản",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["AutoCAD", "Giám sát công trình", "Đọc bản vẽ"],
  salary: "14-25M",
  image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
  desc: "Giám sát thi công công trình dân dụng và đảm bảo tiến độ xây dựng."
},
{
  id: 47,
  title: "Kiến Trúc Sư Nội Thất",
  company: "Dana Home Design",
  field: "Xây dựng - Bất động sản",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["SketchUp", "3Ds Max", "Thiết kế nội thất"],
  salary: "15-28M",
  image: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  desc: "Thiết kế không gian nội thất hiện đại cho nhà ở và văn phòng."
},
{
  id: 48,
  title: "Nhân viên Kinh doanh Bất động sản",
  company: "Thanh Khê Land",
  field: "Xây dựng - Bất động sản",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Tư vấn", "Bán hàng", "Marketing BĐS"],
  salary: "10-35M + hoa hồng",
  image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  desc: "Tư vấn và hỗ trợ khách hàng mua bán các dự án bất động sản."
},
{
  id: 49,
  title: "Giám Sát Công Trình",
  company: "Công ty XD Minh Quân",
  field: "Xây dựng - Bất động sản",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Quản lý công trình", "Kỹ thuật xây dựng"],
  salary: "13-22M",
  image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
  desc: "Theo dõi tiến độ và chất lượng thi công tại công trình."
},
{
  id: 50,
  title: "Kỹ Thuật Viên Điện Nước",
  company: "MEP Đà Nẵng",
  field: "Xây dựng - Bất động sản",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Điện nước", "Lắp đặt hệ thống", "Bảo trì"],
  salary: "10-18M",
  image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
  desc: "Thi công và bảo trì hệ thống điện nước cho công trình dân dụng."
},
{
  id: 51,
  title: "Thiết Kế Kết Cấu",
  company: "BuildTech Solutions",
  field: "Xây dựng - Bất động sản",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["SAP2000", "ETABS", "Thiết kế kết cấu"],
  salary: "16-30M",
  image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
  desc: "Thiết kế kết cấu cho các công trình nhà ở và tòa nhà thương mại."
},
{
  id: 52,
  title: "Nhân viên Điều phối Logistics",
  company: "Đà Nẵng Logistics Express",
  field: "Logistics - Vận hành",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Điều phối hàng hóa", "Quản lý đơn hàng", "Excel"],
  salary: "10-18M",
  image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
  desc: "Theo dõi và điều phối quá trình vận chuyển hàng hóa trong khu vực miền Trung."
},
{
  id: 53,
  title: "Nhân viên Kho Vận",
  company: "Kho Vận Miền Trung",
  field: "Logistics - Vận hành",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Quản lý kho", "Kiểm kê", "Xuất nhập hàng"],
  salary: "8-14M",
  image: "https://images.unsplash.com/photo-1553413077-190dd305871c",
  desc: "Quản lý hàng hóa xuất nhập và kiểm kê kho định kỳ."
},
{
  id: 54,
  title: "Nhân viên Xuất Nhập Khẩu",
  company: "Global Shipping Đà Nẵng",
  field: "Logistics - Vận hành",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Chứng từ", "Hải quan", "Tiếng Anh"],
  salary: "12-20M",
  image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3",
  desc: "Xử lý chứng từ xuất nhập khẩu và làm việc với đối tác vận chuyển quốc tế."
},
{
  id: 55,
  title: "Nhân viên Điều hành Vận tải",
  company: "Vận Tải Thành Công",
  field: "Logistics - Vận hành",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Điều phối xe", "Lập kế hoạch vận chuyển"],
  salary: "10-16M",
  image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  desc: "Sắp xếp và theo dõi lịch trình vận chuyển hàng hóa mỗi ngày."
},
{
  id: 56,
  title: "Nhân viên Mua hàng",
  company: "DN Supply Chain",
  field: "Logistics - Vận hành",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Đàm phán", "Tìm nhà cung cấp", "Quản lý đơn hàng"],
  salary: "9-17M",
  image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
  desc: "Làm việc với nhà cung cấp và đảm bảo nguồn hàng ổn định cho doanh nghiệp."
},
{
  id: 57,
  title: "Quản lý Kho",
  company: "Warehouse Pro Đà Nẵng",
  field: "Logistics - Vận hành",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Quản lý nhân sự", "Kiểm kê kho", "ERP"],
  salary: "15-25M",
  image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780",
  desc: "Quản lý hoạt động kho vận và tối ưu quy trình lưu trữ hàng hóa."
},
{
  id: 58,
  title: "Chuyên viên Quan hệ Khách hàng Cá nhân",
  company: "Sacombank Thanh Khê",
  field: "Tài chính - Ngân hàng",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Tư vấn tài chính", "Chăm sóc khách hàng", "Kỹ năng bán hàng"],
  salary: "12-20M",
  image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
  desc: "Tư vấn các sản phẩm vay vốn, tiết kiệm và dịch vụ tài chính cá nhân."
},
{
  id: 59,
  title: "Kiểm soát viên Nội bộ",
  company: "VPBank Đà Nẵng",
  field: "Tài chính - Ngân hàng",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Kiểm toán", "Phân tích dữ liệu", "Kiểm soát rủi ro"],
  salary: "15-24M",
  image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
  desc: "Theo dõi và kiểm tra các giao dịch nhằm đảm bảo tuân thủ quy định tài chính."
},
{
  id: 60,
  title: "Nhân viên Thanh toán Quốc tế",
  company: "ACB Thanh Khê",
  field: "Tài chính - Ngân hàng",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Tiếng Anh", "Swift", "Xử lý chứng từ"],
  salary: "13-22M",
  image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
  desc: "Thực hiện giao dịch chuyển tiền quốc tế và xử lý chứng từ xuất nhập khẩu."
},
{
  id: 61,
  title: "Chuyên viên Phát triển Thẻ",
  company: "Techcombank Đà Nẵng",
  field: "Tài chính - Ngân hàng",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Tư vấn sản phẩm", "Marketing tài chính", "Giao tiếp"],
  salary: "10-18M + thưởng",
  image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
  desc: "Tư vấn mở thẻ tín dụng và triển khai các chương trình ưu đãi khách hàng."
},
{
  id: 62,
  title: "Nhân viên Quản lý Hồ sơ Vay",
  company: "HD Bank Thanh Khê",
  field: "Tài chính - Ngân hàng",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Kiểm tra hồ sơ", "Excel", "Xử lý dữ liệu"],
  salary: "9-16M",
  image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
  desc: "Tiếp nhận và quản lý hồ sơ vay vốn của khách hàng cá nhân và doanh nghiệp."
},
{
  id: 63,
  title: "Chuyên viên Đầu tư Tài chính",
  company: "Dana Capital Group",
  field: "Tài chính - Ngân hàng",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Phân tích đầu tư", "Chứng khoán", "Lập kế hoạch tài chính"],
  salary: "18-32M",
  image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0",
  desc: "Phân tích thị trường tài chính và tư vấn chiến lược đầu tư cho khách hàng."
},
{
  id: 64,
  title: "Graphic Designer",
  company: "Pixel Creative Studio",
  field: "Thiết kế - Sáng tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Photoshop", "Illustrator", "Thiết kế banner"],
  salary: "10-18M",
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  desc: "Thiết kế banner, poster và hình ảnh truyền thông cho các chiến dịch quảng cáo."
},
{
  id: 65,
  title: "UI/UX Designer",
  company: "Creative Mind Agency",
  field: "Thiết kế - Sáng tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Figma", "Wireframe", "Prototype"],
  salary: "14-24M",
  image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
  desc: "Thiết kế giao diện website và ứng dụng tối ưu trải nghiệm người dùng."
},
{
  id: 66,
  title: "Video Editor",
  company: "Media House Đà Nẵng",
  field: "Thiết kế - Sáng tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Premiere Pro", "After Effects", "Dựng video"],
  salary: "12-20M",
  image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb",
  desc: "Biên tập video quảng cáo, TikTok và nội dung social media cho thương hiệu."
},
{
  id: 67,
  title: "Motion Graphic Designer",
  company: "Wave Animation Studio",
  field: "Thiết kế - Sáng tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["After Effects", "Animation", "Motion Design"],
  salary: "15-26M",
  image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
  desc: "Thiết kế animation và hiệu ứng motion cho video marketing và TVC."
},
{
  id: 68,
  title: "Content Creator",
  company: "Lemon Creative",
  field: "Thiết kế - Sáng tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Canva", "TikTok", "Sáng tạo nội dung"],
  salary: "8-15M",
  image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  desc: "Lên ý tưởng và sản xuất nội dung sáng tạo cho Facebook, TikTok và Instagram."
},
{
  id: 69,
  title: "Thiết kế Nội thất 3D",
  company: "Modern Space Design",
  field: "Thiết kế - Sáng tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["3Ds Max", "SketchUp", "Render nội thất"],
  salary: "16-28M",
  image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  desc: "Thiết kế phối cảnh 3D và không gian nội thất cho căn hộ và văn phòng."
}

  ],
  "hai-chau": [
    {
  id: 70,
  title: "Frontend Developer",
  company: "Hải Châu Software",
  field: "Công nghệ thông tin",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["HTML", "CSS", "JavaScript", "ReactJS"],
  salary: "15-25M",
  image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  desc: "Phát triển giao diện website responsive và tối ưu trải nghiệm người dùng."
},
{
  id: 71,
  title: "Backend Developer",
  company: "DN Tech Solutions",
  field: "Công nghệ thông tin",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["NodeJS", "ExpressJS", "MySQL"],
  salary: "18-30M",
  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  desc: "Xây dựng API và phát triển hệ thống backend cho ứng dụng web."
},
{
  id: 72,
  title: "Mobile App Developer",
  company: "App Vision Studio",
  field: "Công nghệ thông tin",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Flutter", "Firebase", "Android", "iOS"],
  salary: "20-35M",
  image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
  desc: "Phát triển ứng dụng mobile đa nền tảng cho doanh nghiệp và startup."
},
{
  id: 73,
  title: "Tester QA/QC",
  company: "Smart QA Vietnam",
  field: "Công nghệ thông tin",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Manual Testing", "Bug Tracking", "Test Case"],
  salary: "10-18M",
  image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28",
  desc: "Kiểm thử phần mềm và đảm bảo chất lượng sản phẩm trước khi triển khai."
},
{
  id: 74,
  title: "UI/UX Designer",
  company: "Creative UI Lab",
  field: "Công nghệ thông tin",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Figma", "Prototype", "Wireframe"],
  salary: "14-24M",
  image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
  desc: "Thiết kế giao diện ứng dụng và cải thiện trải nghiệm người dùng."
},
{
  id: 75,
  title: "Data Analyst",
  company: "Data Hub Đà Nẵng",
  field: "Công nghệ thông tin",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["SQL", "Power BI", "Python", "Excel"],
  salary: "16-28M",
  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  desc: "Phân tích dữ liệu doanh nghiệp và xây dựng dashboard báo cáo trực quan."
},
{
  id: 76,
  title: "Lễ Tân Khách Sạn",
  company: "Satya Hotel Danang",
  field: "Du lịch - Khách sạn",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Lễ tân", "Tiếng Anh", "Giao tiếp khách hàng"],
  salary: "8-15M",
  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  desc: "Đón tiếp khách, hỗ trợ check-in/check-out và giải đáp thông tin lưu trú."
},
{
  id: 77,
  title: "Nhân viên Buồng Phòng",
  company: "Central Hotel Đà Nẵng",
  field: "Du lịch - Khách sạn",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Dọn phòng", "Chăm sóc khách hàng"],
  salary: "7-12M",
  image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  desc: "Vệ sinh và chuẩn bị phòng nghỉ đạt tiêu chuẩn khách sạn."
},
{
  id: 78,
  title: "Điều Hành Tour Du Lịch",
  company: "Danang Travel Agency",
  field: "Du lịch - Khách sạn",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Điều phối tour", "Lập kế hoạch", "Xử lý tình huống"],
  salary: "10-18M",
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  desc: "Tổ chức lịch trình và quản lý các tour du lịch trong nước."
},
{
  id: 79,
  title: "Hướng Dẫn Viên Du Lịch",
  company: "Viet Discovery Tour",
  field: "Du lịch - Khách sạn",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Thuyết trình", "Tiếng Anh", "Kỹ năng hướng dẫn"],
  salary: "12-22M",
  image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60",
  desc: "Hướng dẫn khách tham quan các điểm du lịch nổi bật tại miền Trung."
},
{
  id: 80,
  title: "Nhân viên Nhà hàng Khách sạn",
  company: "Dragon River Hotel",
  field: "Du lịch - Khách sạn",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Phục vụ", "Giao tiếp", "Chăm sóc khách hàng"],
  salary: "7-14M",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  desc: "Phục vụ khách tại nhà hàng và hỗ trợ tổ chức tiệc trong khách sạn."
},
{
  id: 81,
  title: "Quản Lý Khách Sạn",
  company: "Sunshine Riverside Hotel",
  field: "Du lịch - Khách sạn",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Quản lý vận hành", "Điều phối nhân sự", "Dịch vụ khách hàng"],
  salary: "18-32M",
  image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
  desc: "Điều hành hoạt động khách sạn và đảm bảo chất lượng dịch vụ lưu trú."
},
{
  id: 82,
  title: "Nhân viên Digital Marketing",
  company: "Hải Châu Media",
  field: "Kinh doanh - Marketing",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Facebook Ads", "Google Ads", "SEO"],
  salary: "10-18M",
  image: "https://images.unsplash.com/photo-1557838923-2985c318be48",
  desc: "Quản lý và tối ưu chiến dịch quảng cáo trên các nền tảng số."
},
{
  id: 83,
  title: "Content Marketing",
  company: "Creative Content Studio",
  field: "Kinh doanh - Marketing",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Viết content", "SEO", "Social Media"],
  salary: "8-15M",
  image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  desc: "Sáng tạo nội dung cho website, fanpage và chiến dịch truyền thông."
},
{
  id: 84,
  title: "Nhân viên Kinh doanh",
  company: "Dana Commerce Group",
  field: "Kinh doanh - Marketing",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Tư vấn khách hàng", "Bán hàng", "Đàm phán"],
  salary: "9-22M + KPI",
  image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
  desc: "Tìm kiếm khách hàng và phát triển thị trường cho doanh nghiệp."
},
{
  id: 85,
  title: "SEO Specialist",
  company: "Top Search Agency",
  field: "Kinh doanh - Marketing",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["SEO", "Google Analytics", "Keyword Research"],
  salary: "12-20M",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  desc: "Tối ưu website nhằm tăng thứ hạng tìm kiếm trên Google."
},
{
  id: 86,
  title: "Telesales Executive",
  company: "Miền Trung Telecom",
  field: "Kinh doanh - Marketing",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Tư vấn", "Chốt sale", "Giao tiếp"],
  salary: "7-15M + thưởng",
  image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  desc: "Liên hệ khách hàng tiềm năng và giới thiệu dịch vụ công ty."
},
{
  id: 87,
  title: "Brand Marketing Executive",
  company: "Vision Branding",
  field: "Kinh doanh - Marketing",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Branding", "Creative Thinking", "Marketing Strategy"],
  salary: "14-25M",
  image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  desc: "Xây dựng chiến lược thương hiệu và triển khai chiến dịch marketing."
},
{
  id: 88,
  title: "Kỹ Sư Xây Dựng Dân Dụng",
  company: "Hải Châu Construction",
  field: "Xây dựng - Bất động sản",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["AutoCAD", "Đọc bản vẽ", "Giám sát công trình"],
  salary: "14-26M",
  image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
  desc: "Giám sát thi công và đảm bảo chất lượng các công trình dân dụng."
},
{
  id: 89,
  title: "Kiến Trúc Sư",
  company: "Modern House Design",
  field: "Xây dựng - Bất động sản",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["SketchUp", "3Ds Max", "Thiết kế kiến trúc"],
  salary: "16-30M",
  image: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  desc: "Thiết kế kiến trúc nhà ở, văn phòng và không gian thương mại hiện đại."
},
{
  id: 90,
  title: "Nhân viên Kinh doanh Bất động sản",
  company: "Danang Real Estate",
  field: "Xây dựng - Bất động sản",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Tư vấn khách hàng", "Đàm phán", "Marketing BĐS"],
  salary: "12-35M + hoa hồng",
  image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  desc: "Tư vấn và hỗ trợ khách hàng mua bán căn hộ, đất nền và dự án bất động sản."
},
{
  id: 91,
  title: "Giám Sát Công Trình",
  company: "Minh Phát Engineering",
  field: "Xây dựng - Bất động sản",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Quản lý tiến độ", "Giám sát thi công", "Kỹ thuật xây dựng"],
  salary: "13-22M",
  image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
  desc: "Theo dõi tiến độ thi công và kiểm tra chất lượng công trình."
},
{
  id: 92,
  title: "Kỹ Thuật Viên Điện Nước",
  company: "MEP Solutions Đà Nẵng",
  field: "Xây dựng - Bất động sản",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Thi công điện nước", "Bảo trì hệ thống", "Lắp đặt"],
  salary: "10-18M",
  image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
  desc: "Thi công và bảo trì hệ thống điện nước cho công trình xây dựng."
},
{
  id: 93,
  title: "Thiết Kế Nội Thất 3D",
  company: "Space Interior Studio",
  field: "Xây dựng - Bất động sản",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["3Ds Max", "Render", "Thiết kế nội thất"],
  salary: "15-28M",
  image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  desc: "Thiết kế phối cảnh nội thất 3D cho căn hộ, nhà phố và showroom."
},
{
  id: 94,
  title: "Nhân viên Điều phối Vận chuyển",
  company: "Hải Châu Logistics",
  field: "Logistics - Vận hành",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Điều phối xe", "Theo dõi đơn hàng", "Excel"],
  salary: "10-18M",
  image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
  desc: "Điều phối phương tiện vận chuyển và theo dõi tiến độ giao hàng mỗi ngày."
},
{
  id: 95,
  title: "Nhân viên Kho Vận",
  company: "Central Warehouse",
  field: "Logistics - Vận hành",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Kiểm kê hàng hóa", "Xuất nhập kho", "Quản lý kho"],
  salary: "8-14M",
  image: "https://images.unsplash.com/photo-1553413077-190dd305871c",
  desc: "Quản lý hàng hóa xuất nhập và kiểm kê kho định kỳ."
},
{
  id: 96,
  title: "Nhân viên Xuất Nhập Khẩu",
  company: "Global Shipping Vietnam",
  field: "Logistics - Vận hành",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Chứng từ", "Hải quan", "Tiếng Anh"],
  salary: "12-22M",
  image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3",
  desc: "Xử lý hồ sơ xuất nhập khẩu và làm việc với đối tác vận chuyển quốc tế."
},
{
  id: 97,
  title: "Nhân viên Điều hành Kho",
  company: "Danang Supply Chain",
  field: "Logistics - Vận hành",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Quản lý kho", "Điều phối nhân sự", "ERP"],
  salary: "12-20M",
  image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780",
  desc: "Giám sát hoạt động kho hàng và tối ưu quy trình lưu trữ."
},
{
  id: 98,
  title: "Nhân viên Mua hàng",
  company: "Smart Procurement",
  field: "Logistics - Vận hành",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Đàm phán", "Tìm nhà cung cấp", "Quản lý đơn hàng"],
  salary: "9-17M",
  image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
  desc: "Làm việc với nhà cung cấp và quản lý quy trình mua hàng doanh nghiệp."
},
{
  id: 99,
  title: "Quản lý Chuỗi Cung Ứng",
  company: "Supply Chain Hub",
  field: "Logistics - Vận hành",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Supply Chain", "Phân tích dữ liệu", "Quản lý vận hành"],
  salary: "18-32M",
  image: "https://images.unsplash.com/photo-1529074963764-98f45c47344b",
  desc: "Quản lý và tối ưu chuỗi cung ứng nhằm nâng cao hiệu quả vận hành doanh nghiệp."
},
{
  id: 106,
  title: "Graphic Designer",
  company: "Creative Box Studio",
  field: "Thiết kế - Sáng tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Photoshop", "Illustrator", "Thiết kế banner"],
  salary: "10-18M",
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  desc: "Thiết kế banner, poster và ấn phẩm truyền thông cho doanh nghiệp."
},
{
  id: 107,
  title: "UI/UX Designer",
  company: "UX Lab Vietnam",
  field: "Thiết kế - Sáng tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Figma", "Prototype", "Wireframe"],
  salary: "15-26M",
  image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
  desc: "Thiết kế giao diện website và ứng dụng tối ưu trải nghiệm người dùng."
},
{
  id: 108,
  title: "Video Editor",
  company: "Motion Media Agency",
  field: "Thiết kế - Sáng tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Premiere Pro", "After Effects", "Dựng video"],
  salary: "12-22M",
  image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb",
  desc: "Biên tập video quảng cáo và nội dung social media cho thương hiệu."
},
{
  id: 109,
  title: "Motion Graphic Designer",
  company: "Animation House",
  field: "Thiết kế - Sáng tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Animation", "After Effects", "Motion Design"],
  salary: "16-28M",
  image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
  desc: "Thiết kế motion graphic và hiệu ứng chuyển động cho TVC và video marketing."
},
{
  id: 110,
  title: "Content Creator",
  company: "Lemon Studio",
  field: "Thiết kế - Sáng tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["TikTok", "Canva", "Sáng tạo nội dung"],
  salary: "8-16M",
  image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  desc: "Sản xuất nội dung sáng tạo cho TikTok, Facebook và Instagram."
},
{
  id: 111,
  title: "Thiết kế Nội thất 3D",
  company: "Modern Interior Studio",
  field: "Thiết kế - Sáng tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["3Ds Max", "SketchUp", "Render"],
  salary: "15-30M",
  image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  desc: "Thiết kế phối cảnh nội thất 3D cho căn hộ, showroom và văn phòng."
},
  ],
  "ngu-hanh-son": [

  ],
  // ================== NGŨ HÀNH SƠN ==================
"ngu-hanh-son": [
  {
    id: 112,
    title: "Giáo viên STEM / Lập trình",
    company: "FPT University",
    field: "Giáo dục - Đào tạo",
    district: "Ngũ Hành Sơn",
    location: "Quận Ngũ Hành Sơn, Đà Nẵng",
    skills: ["Python", "Scratch", "Giảng dạy", "STEM"],
    salary: "12-22M",
    image: "img/edu1.jpg",
    desc: "Giảng dạy STEM và lập trình cho sinh viên và học sinh."
  },
  {
    id: 113,
    title: "Chuyên viên Đào tạo",
    company: "FPT University",
    field: "Giáo dục - Đào tạo",
    district: "Ngũ Hành Sơn",
    location: "Quận Ngũ Hành Sơn, Đà Nẵng",
    skills: ["Đào tạo", "Kỹ năng mềm", "Thuyết trình"],
    salary: "10-18M",
    image: "img/edu2.jpg",
    desc: "Xây dựng chương trình đào tạo và hỗ trợ học viên."
  },
  {
    id: 114,
    title: "Lễ Tân Khách Sạn",
    company: "Furama Resort Danang",
    field: "Du lịch - Khách sạn",
    district: "Ngũ Hành Sơn",
    location: "Quận Ngũ Hành Sơn, Đà Nẵng",
    skills: ["Lễ tân", "Tiếng Anh", "Chăm sóc khách hàng"],
    salary: "9-16M",
    image: "img/hotel1.jpg",
    desc: "Đón tiếp khách và hỗ trợ check-in/check-out."
  },
  {
    id: 115,
    title: "Nhân viên Nhà hàng",
    company: "Sun Group",
    field: "Du lịch - Khách sạn",
    district: "Ngũ Hành Sơn",
    location: "Quận Ngũ Hành Sơn, Đà Nẵng",
    skills: ["Phục vụ", "Giao tiếp", "Nhà hàng"],
    salary: "8-14M",
    image: "img/hotel2.jpg",
    desc: "Phục vụ khách hàng tại nhà hàng và resort."
  },
  {
    id: 116,
    title: "Quản lý Dự án Xây dựng",
    company: "Sun Group",
    field: "Xây dựng - Bất động sản",
    district: "Ngũ Hành Sơn",
    location: "Quận Ngũ Hành Sơn, Đà Nẵng",
    skills: ["Quản lý dự án", "AutoCAD", "Giám sát công trình"],
    salary: "20-35M",
    image: "img/build1.jpg",
    desc: "Quản lý tiến độ và chất lượng công trình xây dựng."
  },
  {
    id: 117,
    title: "Quản lý Công trình",
    company: "Sun Group",
    field: "Xây dựng - Bất động sản",
    district: "Ngũ Hành Sơn",
    location: "Quận Ngũ Hành Sơn, Đà Nẵng",
    skills: ["Kỹ thuật xây dựng", "Quản lý nhân sự"],
    salary: "18-30M",
    image: "img/build2.jpg",
    desc: "Điều phối hoạt động thi công và quản lý công trình."
  },
  {
    id: 118,
    title: "Đầu bếp Khách sạn",
    company: "Furama Resort Danang",
    field: "Du lịch - Khách sạn",
    district: "Ngũ Hành Sơn",
    location: "Quận Ngũ Hành Sơn, Đà Nẵng",
    skills: ["Nấu ăn", "Ẩm thực", "Bếp Âu - Á"],
    salary: "12-22M",
    image: "img/hotel3.jpg",
    desc: "Chuẩn bị món ăn cho khách du lịch và sự kiện."
  },
  {
    id: 119,
    title: "Nhân viên Đặt phòng",
    company: "Vinpearl Resort",
    field: "Du lịch - Khách sạn",
    district: "Ngũ Hành Sơn",
    location: "Quận Ngũ Hành Sơn, Đà Nẵng",
    skills: ["Booking", "Tiếng Anh", "CSKH"],
    salary: "9-15M",
    image: "img/hotel4.jpg",
    desc: "Tiếp nhận và xử lý booking khách sạn."
  },
  {
    id: 120,
    title: "Thiết kế Nội thất Resort",
    company: "Luxury Interior Studio",
    field: "Thiết kế - Sáng tạo",
    district: "Ngũ Hành Sơn",
    location: "Quận Ngũ Hành Sơn, Đà Nẵng",
    skills: ["3Ds Max", "SketchUp", "Render"],
    salary: "15-28M",
    image: "img/design1.jpg",
    desc: "Thiết kế không gian nội thất cho resort và villa cao cấp."
  },
  {
    id: 121,
    title: "Content Creator Du lịch",
    company: "Danang Travel Media",
    field: "Thiết kế - Sáng tạo",
    district: "Ngũ Hành Sơn",
    location: "Quận Ngũ Hành Sơn, Đà Nẵng",
    skills: ["TikTok", "Canva", "Quay dựng video"],
    salary: "10-18M",
    image: "img/design2.jpg",
    desc: "Sản xuất nội dung quảng bá du lịch và resort."
  }
],

// ================== SƠN TRÀ ==================
"son-tra": [
  {
    id: 122,
    title: "Hướng Dẫn Viên Du Lịch",
    company: "Danago Travel",
    field: "Du lịch - Khách sạn",
    district: "Sơn Trà",
    location: "Quận Sơn Trà, Đà Nẵng",
    skills: ["Thuyết trình", "Tiếng Anh", "Tour Guide"],
    salary: "12-22M",
    image: "img/tour1.jpg",
    desc: "Hướng dẫn khách tham quan các điểm du lịch nổi tiếng."
  },
  {
    id: 123,
    title: "Điều Hành Tour",
    company: "Vietnam Booking",
    field: "Du lịch - Khách sạn",
    district: "Sơn Trà",
    location: "Quận Sơn Trà, Đà Nẵng",
    skills: ["Điều phối", "Lập kế hoạch", "Giao tiếp"],
    salary: "10-18M",
    image: "img/tour2.jpg",
    desc: "Sắp xếp lịch trình và quản lý tour du lịch."
  },
  {
    id: 124,
    title: "Sale Tour",
    company: "Libra Travel",
    field: "Du lịch - Khách sạn",
    district: "Sơn Trà",
    location: "Quận Sơn Trà, Đà Nẵng",
    skills: ["Sales", "CSKH", "Du lịch"],
    salary: "10-20M",
    image: "img/tour3.jpg",
    desc: "Tư vấn và bán tour du lịch cho khách hàng."
  },
  {
    id: 125,
    title: "Quản lý Khách sạn",
    company: "InterContinental Danang",
    field: "Du lịch - Khách sạn",
    district: "Sơn Trà",
    location: "Quận Sơn Trà, Đà Nẵng",
    skills: ["Quản lý", "Điều phối", "Hospitality"],
    salary: "25-40M",
    image: "img/tour4.jpg",
    desc: "Quản lý vận hành khách sạn và dịch vụ nghỉ dưỡng."
  },
  {
    id: 126,
    title: "Chăm sóc Khách hàng Du lịch",
    company: "Danago Travel",
    field: "Du lịch - Khách sạn",
    district: "Sơn Trà",
    location: "Quận Sơn Trà, Đà Nẵng",
    skills: ["CSKH", "Giao tiếp", "Tiếng Anh"],
    salary: "8-15M",
    image: "img/tour5.jpg",
    desc: "Hỗ trợ và chăm sóc khách du lịch trước và sau tour."
  },
  {
    id: 127,
    title: "Video Editor",
    company: "Travel Media Studio",
    field: "Thiết kế - Sáng tạo",
    district: "Sơn Trà",
    location: "Quận Sơn Trà, Đà Nẵng",
    skills: ["Premiere", "After Effects", "TikTok"],
    salary: "12-22M",
    image: "img/design3.jpg",
    desc: "Dựng video quảng bá du lịch và resort."
  },
  {
    id: 128,
    title: "Creative Content Creator",
    company: "TikPlus Media",
    field: "Thiết kế - Sáng tạo",
    district: "Sơn Trà",
    location: "Quận Sơn Trà, Đà Nẵng",
    skills: ["Content", "TikTok", "Facebook"],
    salary: "10-18M",
    image: "img/design4.jpg",
    desc: "Sáng tạo nội dung truyền thông cho mạng xã hội."
  },
  {
    id: 129,
    title: "Art Director",
    company: "Bee Creative",
    field: "Thiết kế - Sáng tạo",
    district: "Sơn Trà",
    location: "Quận Sơn Trà, Đà Nẵng",
    skills: ["Creative Direction", "Branding", "Design"],
    salary: "20-35M",
    image: "img/design5.jpg",
    desc: "Định hướng sáng tạo cho chiến dịch truyền thông."
  },
  {
    id: 130,
    title: "Nhân viên Marketing Resort",
    company: "Son Tra Resort",
    field: "Kinh doanh - Marketing",
    district: "Sơn Trà",
    location: "Quận Sơn Trà, Đà Nẵng",
    skills: ["Digital Marketing", "SEO", "Social Media"],
    salary: "12-20M",
    image: "img/marketing1.jpg",
    desc: "Quảng bá dịch vụ nghỉ dưỡng và khách sạn."
  },
  {
    id: 131,
    title: "Photographer",
    company: "Lavender Studio",
    field: "Thiết kế - Sáng tạo",
    district: "Sơn Trà",
    location: "Quận Sơn Trà, Đà Nẵng",
    skills: ["Photography", "Photoshop", "Lightroom"],
    salary: "10-18M",
    image: "img/design6.jpg",
    desc: "Chụp ảnh du lịch, resort và sự kiện truyền thông."
  }
],

// ================== CẨM LỆ ==================
"cam-le": [
  {
    id: 132,
    title: "Kỹ Sư Xây Dựng",
    company: "Coteccons",
    field: "Xây dựng - Bất động sản",
    district: "Cẩm Lệ",
    location: "Quận Cẩm Lệ, Đà Nẵng",
    skills: ["AutoCAD", "Giám sát công trình", "Đọc bản vẽ"],
    salary: "15-28M",
    image: "img/build3.jpg",
    desc: "Giám sát thi công và đảm bảo chất lượng công trình."
  },
  {
    id: 133,
    title: "Kiến Trúc Sư",
    company: "Hoa Binh Construction Group",
    field: "Xây dựng - Bất động sản",
    district: "Cẩm Lệ",
    location: "Quận Cẩm Lệ, Đà Nẵng",
    skills: ["SketchUp", "3Ds Max", "Thiết kế kiến trúc"],
    salary: "18-32M",
    image: "img/build4.jpg",
    desc: "Thiết kế công trình dân dụng và thương mại."
  },
  {
    id: 134,
    title: "Kỹ Sư Giám Sát Công Trình",
    company: "Coteccons",
    field: "Xây dựng - Bất động sản",
    district: "Cẩm Lệ",
    location: "Quận Cẩm Lệ, Đà Nẵng",
    skills: ["Giám sát", "Kỹ thuật xây dựng", "Quản lý tiến độ"],
    salary: "16-30M",
    image: "img/build5.jpg",
    desc: "Theo dõi tiến độ và chất lượng công trình xây dựng."
  },
  {
    id: 135,
    title: "Kỹ Sư Dự Toán / QS",
    company: "Hoa Binh Construction Group",
    field: "Xây dựng - Bất động sản",
    district: "Cẩm Lệ",
    location: "Quận Cẩm Lệ, Đà Nẵng",
    skills: ["QS", "Excel", "Bóc tách khối lượng"],
    salary: "14-26M",
    image: "img/build6.jpg",
    desc: "Lập dự toán và kiểm soát chi phí công trình."
  },
  {
    id: 136,
    title: "Kỹ Sư MEP",
    company: "Trung Nam Group",
    field: "Xây dựng - Bất động sản",
    district: "Cẩm Lệ",
    location: "Quận Cẩm Lệ, Đà Nẵng",
    skills: ["MEP", "Điện nước", "AutoCAD"],
    salary: "16-30M",
    image: "img/build7.jpg",
    desc: "Thiết kế và triển khai hệ thống MEP cho công trình."
  },
  {
    id: 137,
    title: "Kỹ Sư Cầu Đường",
    company: "Trung Nam Group",
    field: "Xây dựng - Bất động sản",
    district: "Cẩm Lệ",
    location: "Quận Cẩm Lệ, Đà Nẵng",
    skills: ["Hạ tầng", "Cầu đường", "Giám sát"],
    salary: "18-34M",
    image: "img/build8.jpg",
    desc: "Thi công và giám sát các công trình giao thông."
  },
  {
    id: 138,
    title: "Nhân viên Kinh doanh Logistics",
    company: "Danalog",
    field: "Logistics - Vận hành",
    district: "Cẩm Lệ",
    location: "Quận Cẩm Lệ, Đà Nẵng",
    skills: ["Sales", "Logistics", "Đàm phán"],
    salary: "10-20M",
    image: "img/log1.jpg",
    desc: "Tìm kiếm khách hàng và phát triển dịch vụ logistics."
  },
  {
    id: 139,
    title: "Nhân viên Mua hàng",
    company: "Danalog",
    field: "Logistics - Vận hành",
    district: "Cẩm Lệ",
    location: "Quận Cẩm Lệ, Đà Nẵng",
    skills: ["Mua hàng", "Excel", "Đàm phán"],
    salary: "9-16M",
    image: "img/log2.jpg",
    desc: "Quản lý đơn hàng và làm việc với nhà cung cấp."
  },
  {
    id: 140,
    title: "Nhân viên Kho Vận",
    company: "Cam Le Logistics",
    field: "Logistics - Vận hành",
    district: "Cẩm Lệ",
    location: "Quận Cẩm Lệ, Đà Nẵng",
    skills: ["Kiểm kê", "Xuất nhập kho", "ERP"],
    salary: "8-14M",
    image: "img/log3.jpg",
    desc: "Quản lý hàng hóa và hoạt động kho vận."
  },
  {
    id: 141,
    title: "Điều phối Vận tải",
    company: "Miền Trung Transport",
    field: "Logistics - Vận hành",
    district: "Cẩm Lệ",
    location: "Quận Cẩm Lệ, Đà Nẵng",
    skills: ["Điều phối", "Lập kế hoạch", "Vận tải"],
    salary: "10-18M",
    image: "img/log4.jpg",
    desc: "Theo dõi và điều phối hoạt động vận chuyển hàng hóa."
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