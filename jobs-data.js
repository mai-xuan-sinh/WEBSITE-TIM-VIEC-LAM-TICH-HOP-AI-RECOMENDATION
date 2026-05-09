// jobs-data.js
const allJobs = [
   {
    id: 1,
    title: "Fullstack Developer",
    company: "FPT Software",
    field: "Công nghệ thông tin",
    district: "Liên Chiểu",
    location: "Quận Liên Chiểu, Đà Nẵng",
    skills: ["ReactJS", "NodeJS", "MySQL", "REST API"],
    salary: "18-30M",
    image: "img/IT1.jpg",
    desc: "Phát triển hệ thống web fullstack và tối ưu hiệu năng ứng dụng."
    
  },
  {
    id: 2,
    title: "Mobile App Developer",
    company: "Rikkeisoft",
    field: "Công nghệ thông tin",
    district: "Liên Chiểu",
    location: "Quận Liên Chiểu, Đà Nẵng",
    skills: ["Flutter", "Firebase", "Android", "iOS"],
    salary: "20-32M",
    image: "img/IT2.png",
    desc: "Phát triển ứng dụng mobile đa nền tảng cho doanh nghiệp."
  },
  {
    id: 3,
    title: "AI / Machine Learning Engineer",
    company: "FPT Software",
    field: "Công nghệ thông tin",
    district: "Liên Chiểu",
    location: "Quận Liên Chiểu, Đà Nẵng",
    skills: ["Python", "TensorFlow", "Machine Learning"],
    salary: "25-40M",
    image: "img/IT3.jpg",
    desc: "Xây dựng và huấn luyện mô hình AI cho doanh nghiệp."
  },
  {
    id: 4,
    title: "System Administrator",
    company: "University of Da Nang",
    field: "Công nghệ thông tin",
    district: "Liên Chiểu",
    location: "Quận Liên Chiểu, Đà Nẵng",
    skills: ["Linux", "Network", "System Admin"],
    salary: "15-25M",
    image: "img/IT4.jpg",
    desc: "Quản trị hệ thống máy chủ và mạng nội bộ."
  },
  {
    id: 5,
    title: "Nhân viên Xuất Nhập Khẩu",
    company: "DHL",
    field: "Logistics - Vận hành",
    district: "Liên Chiểu",
    location: "Quận Liên Chiểu, Đà Nẵng",
    skills: ["Hải quan", "Chứng từ", "Tiếng Anh"],
    salary: "12-20M",
    image: "img/log1.jpg",
    desc: "Xử lý chứng từ và thủ tục xuất nhập khẩu quốc tế."
  },
  {
    id: 6,
    title: "Supply Chain Analyst",
    company: "DHL",
    field: "Logistics - Vận hành",
    district: "Liên Chiểu",
    location: "Quận Liên Chiểu, Đà Nẵng",
    skills: ["Excel", "Power BI", "Supply Chain"],
    salary: "16-28M",
    image: "img/log2.jpg",
    desc: "Phân tích dữ liệu chuỗi cung ứng và tối ưu vận hành."
  },
  {
    id: 7,
    title: "Quản lý Kho",
    company: "DHL",
    field: "Logistics - Vận hành",
    district: "Liên Chiểu",
    location: "Quận Liên Chiểu, Đà Nẵng",
    skills: ["ERP", "Quản lý kho", "Kiểm kê"],
    salary: "15-26M",
    image: "img/log3.jpg",
    desc: "Quản lý hoạt động xuất nhập và lưu trữ hàng hóa."
  },
  {
    id: 8,
    title: "Giảng viên Đại học",
    company: "University of Da Nang",
    field: "Giáo dục - Đào tạo",
    district: "Liên Chiểu",
    location: "Quận Liên Chiểu, Đà Nẵng",
    skills: ["Giảng dạy", "Nghiên cứu", "Thuyết trình"],
    salary: "14-24M",
    image: "img/edu1.jpg",
    desc: "Giảng dạy và hướng dẫn sinh viên đại học."
  },
  {
    id: 9,
    title: "Biên soạn Giáo trình",
    company: "University of Da Nang",
    field: "Giáo dục - Đào tạo",
    district: "Liên Chiểu",
    location: "Quận Liên Chiểu, Đà Nẵng",
    skills: ["Soạn giáo án", "Nghiên cứu", "Word"],
    salary: "10-18M",
    image: "img/edu2.jpg",
    desc: "Biên soạn tài liệu học tập và giáo trình đào tạo."
  },
  {
    id: 10,
    title: "Graphic Designer",
    company: "DN Creative Studio",
    field: "Thiết kế - Sáng tạo",
    district: "Liên Chiểu",
    location: "Quận Liên Chiểu, Đà Nẵng",
    skills: ["Photoshop", "Illustrator", "Social Design"],
    salary: "10-18M",
    image: "img/design1.jpg",
    desc: "Thiết kế banner và hình ảnh truyền thông cho doanh nghiệp."
  },
  {
    id: 11,
    title: "Telesales",
    company: "WinCommerce",
    field: "Kinh doanh - Marketing",
    district: "Thanh Khê",
    location: "Quận Thanh Khê, Đà Nẵng",
    skills: ["Giao tiếp", "Tư vấn", "Chốt sale"],
    salary: "8-15M",
    image: "img/marketing1.jpg",
    desc: "Liên hệ và tư vấn khách hàng về sản phẩm dịch vụ."
  },
  {
    id: 12,
    title: "Quản lý Cửa hàng",
    company: "Circle K",
    field: "Kinh doanh - Marketing",
    district: "Thanh Khê",
    location: "Quận Thanh Khê, Đà Nẵng",
    skills: ["Quản lý", "Điều phối", "CSKH"],
    salary: "12-22M",
    image: "img/marketing2.jpg",
    desc: "Quản lý hoạt động vận hành cửa hàng tiện lợi."
  },
  {
    id: 13,
    title: "Thu ngân",
    company: "WinCommerce",
    field: "Kinh doanh - Marketing",
    district: "Thanh Khê",
    location: "Quận Thanh Khê, Đà Nẵng",
    skills: ["Thu ngân", "Excel", "CSKH"],
    salary: "7-12M",
    image: "img/marketing3.jpg",
    desc: "Thanh toán hóa đơn và hỗ trợ khách hàng tại quầy."
  },
  {
    id: 14,
    title: "Sales B2B",
    company: "WinCommerce",
    field: "Kinh doanh - Marketing",
    district: "Thanh Khê",
    location: "Quận Thanh Khê, Đà Nẵng",
    skills: ["Đàm phán", "Bán hàng", "Kinh doanh"],
    salary: "12-25M",
    image: "img/marketing4.jpg",
    desc: "Tìm kiếm khách hàng doanh nghiệp và mở rộng thị trường."
  },
  {
    id: 15,
    title: "Logistics Coordinator",
    company: "Bee Logistics",
    field: "Logistics - Vận hành",
    district: "Thanh Khê",
    location: "Quận Thanh Khê, Đà Nẵng",
    skills: ["Điều phối", "Excel", "Logistics"],
    salary: "10-18M",
    image: "img/log4.jpg",
    desc: "Theo dõi vận chuyển và điều phối đơn hàng logistics."
  },
  {
    id: 16,
    title: "Nhân viên Kho vận",
    company: "Viettel Post",
    field: "Logistics - Vận hành",
    district: "Thanh Khê",
    location: "Quận Thanh Khê, Đà Nẵng",
    skills: ["Kho vận", "Kiểm kê", "ERP"],
    salary: "8-14M",
    image: "img/log5.jpg",
    desc: "Quản lý hàng hóa và hoạt động kho vận."
  },
  {
    id: 17,
    title: "Nhân viên Giao nhận",
    company: "Viettel Post",
    field: "Logistics - Vận hành",
    district: "Thanh Khê",
    location: "Quận Thanh Khê, Đà Nẵng",
    skills: ["Giao hàng", "Điều phối", "CSKH"],
    salary: "8-15M",
    image: "img/log6.jpg",
    desc: "Vận chuyển và giao hàng đến khách hàng."
  },
  {
    id: 18,
    title: "Giáo viên Tiếng Anh",
    company: "Apollo English",
    field: "Giáo dục - Đào tạo",
    district: "Thanh Khê",
    location: "Quận Thanh Khê, Đà Nẵng",
    skills: ["IELTS", "Tiếng Anh", "Giảng dạy"],
    salary: "12-22M",
    image: "img/edu3.jpg",
    desc: "Giảng dạy tiếng Anh cho học viên thiếu nhi và người lớn."
  },
  {
    id: 19,
    title: "Trợ giảng",
    company: "Apollo English",
    field: "Giáo dục - Đào tạo",
    district: "Thanh Khê",
    location: "Quận Thanh Khê, Đà Nẵng",
    skills: ["Hỗ trợ lớp học", "Tiếng Anh", "Giao tiếp"],
    salary: "7-12M",
    image: "img/edu4.jpg",
    desc: "Hỗ trợ giáo viên và học viên trong quá trình học tập."
  },
  {
    id: 20,
    title: "Graphic Designer",
    company: "Pixel Creative Studio",
    field: "Thiết kế - Sáng tạo",
    district: "Thanh Khê",
    location: "Quận Thanh Khê, Đà Nẵng",
    skills: ["Photoshop", "Illustrator", "Banner Design"],
    salary: "10-18M",
    image: "img/design2.jpg",
    desc: "Thiết kế banner và ấn phẩm truyền thông sáng tạo."
  },

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
  },
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
  },
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
  },
  {
    id: 999,
    title: "Chuyên viên tín dụng",
    company: "Ngân hàng Vietcombank Đà Nẵng",
    field: "Tài chính - Ngân hàng",
    location: "Hải Châu",
    salary: "12 - 18 triệu",
    skills: ["Excel", "Tài chính", "Kế toán"]
},
{
    id: 1000,
    title: "Nhân viên giao dịch ngân hàng",
    company: "BIDV Đà Nẵng",
    field: "Tài chính - Ngân hàng",
    location: "Thanh Khê",
    salary: "10 - 15 triệu",
    skills: ["Giao tiếp", "Ngân hàng", "Tin học"]
},

{
  id: 265,
  title: "DevOps Engineer",
  company: "CloudTech Danang",
  field: "Công nghệ thông tin",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Docker", "Kubernetes", "CI/CD"],
  salary: "25-40M",
  image: "img/it5.jpg",
  desc: "Triển khai và quản lý hệ thống CI/CD cho doanh nghiệp."
},
{
  id: 266,
  title: "Cyber Security Engineer",
  company: "SecureNet Vietnam",
  field: "Công nghệ thông tin",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Security", "Firewall", "Linux"],
  salary: "22-38M",
  image: "img/it6.jpg",
  desc: "Bảo mật hệ thống mạng và dữ liệu doanh nghiệp."
},
{
  id: 267,
  title: "Business Analyst",
  company: "FPT Digital",
  field: "Công nghệ thông tin",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Business Analysis", "SQL", "Agile"],
  salary: "18-30M",
  image: "img/it7.jpg",
  desc: "Phân tích yêu cầu nghiệp vụ và làm việc với đội phát triển."
},
{
  id: 268,
  title: "Game Developer",
  company: "Dragon Game Studio",
  field: "Công nghệ thông tin",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Unity", "C#", "Game Design"],
  salary: "18-35M",
  image: "img/it8.jpg",
  desc: "Phát triển game mobile và PC bằng Unity."
},
{
  id: 269,
  title: "Cloud Engineer",
  company: "AWS Vietnam DN",
  field: "Công nghệ thông tin",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["AWS", "Cloud", "Linux"],
  salary: "24-42M",
  image: "img/it9.jpg",
  desc: "Triển khai và quản lý hạ tầng điện toán đám mây."
},

{
  id: 270,
  title: "Nhân viên Điều phối Kho",
  company: "Fast Logistics",
  field: "Logistics - Vận hành",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Kho vận", "Điều phối", "ERP"],
  salary: "10-18M",
  image: "img/log7.jpg",
  desc: "Điều phối hoạt động xuất nhập kho và vận chuyển."
},
{
  id: 271,
  title: "Import Export Executive",
  company: "Global Trade VN",
  field: "Logistics - Vận hành",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Xuất nhập khẩu", "Tiếng Anh", "Chứng từ"],
  salary: "14-24M",
  image: "img/log8.jpg",
  desc: "Quản lý hồ sơ và chứng từ xuất nhập khẩu."
},
{
  id: 272,
  title: "Warehouse Supervisor",
  company: "Central Logistics",
  field: "Logistics - Vận hành",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Warehouse", "Leadership", "Inventory"],
  salary: "16-28M",
  image: "img/log9.jpg",
  desc: "Giám sát hoạt động kho và quản lý nhân sự."
},
{
  id: 273,
  title: "Supply Chain Executive",
  company: "Supply Hub Danang",
  field: "Logistics - Vận hành",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Supply Chain", "Excel", "Planning"],
  salary: "15-26M",
  image: "img/log10.jpg",
  desc: "Theo dõi và tối ưu chuỗi cung ứng doanh nghiệp."
},
{
  id: 274,
  title: "Fleet Coordinator",
  company: "Miền Trung Transport",
  field: "Logistics - Vận hành",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Điều phối xe", "Vận tải", "GPS"],
  salary: "11-19M",
  image: "img/log11.jpg",
  desc: "Quản lý đội xe và theo dõi vận chuyển hàng hóa."
},

{
  id: 275,
  title: "Giáo viên Toán",
  company: "Skyline Education",
  field: "Giáo dục - Đào tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Giảng dạy", "Toán học", "Sư phạm"],
  salary: "10-18M",
  image: "img/edu5.jpg",
  desc: "Giảng dạy môn Toán cho học sinh THCS và THPT."
},
{
  id: 276,
  title: "Giáo viên IELTS",
  company: "IELTS Master Center",
  field: "Giáo dục - Đào tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["IELTS", "English", "Teaching"],
  salary: "15-28M",
  image: "img/edu6.jpg",
  desc: "Giảng dạy IELTS và luyện thi tiếng Anh."
},
{
  id: 277,
  title: "Academic Coordinator",
  company: "Global Education",
  field: "Giáo dục - Đào tạo",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Quản lý đào tạo", "Academic", "Communication"],
  salary: "14-24M",
  image: "img/edu7.jpg",
  desc: "Điều phối chương trình học và quản lý học viên."
},
{
  id: 278,
  title: "Chuyên viên Tuyển sinh",
  company: "FPT Education",
  field: "Giáo dục - Đào tạo",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Tư vấn", "Tuyển sinh", "CSKH"],
  salary: "9-16M",
  image: "img/edu8.jpg",
  desc: "Tư vấn và hỗ trợ học viên đăng ký khóa học."
},

{
  id: 279,
  title: "Senior Graphic Designer",
  company: "Creative House",
  field: "Thiết kế - Sáng tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Photoshop", "Illustrator", "Branding"],
  salary: "18-30M",
  image: "img/design10.jpg",
  desc: "Thiết kế nhận diện thương hiệu và ấn phẩm truyền thông."
},
{
  id: 280,
  title: "Visual Designer",
  company: "Media Art Studio",
  field: "Thiết kế - Sáng tạo",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Visual Design", "Figma", "Creative"],
  salary: "14-24M",
  image: "img/design11.jpg",
  desc: "Thiết kế hình ảnh cho social media và website."
},
{
  id: 281,
  title: "Storyboard Artist",
  company: "Animation Studio VN",
  field: "Thiết kế - Sáng tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Storyboard", "Drawing", "Creative"],
  salary: "12-22M",
  image: "img/design12.jpg",
  desc: "Thiết kế storyboard cho video quảng cáo và animation."
},
{
  id: 282,
  title: "Creative Designer",
  company: "Brand Creative Lab",
  field: "Thiết kế - Sáng tạo",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Creative", "Branding", "Design"],
  salary: "15-26M",
  image: "img/design13.jpg",
  desc: "Phát triển ý tưởng và thiết kế chiến dịch sáng tạo."
},

{
  id: 283,
  title: "Social Media Executive",
  company: "Digital Growth Media",
  field: "Kinh doanh - Marketing",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Social Media", "Content", "Facebook"],
  salary: "10-18M",
  image: "img/mkt10.jpg",
  desc: "Quản lý nội dung và phát triển mạng xã hội doanh nghiệp."
},
{
  id: 284,
  title: "Trade Marketing Executive",
  company: "Retail Marketing VN",
  field: "Kinh doanh - Marketing",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Trade Marketing", "POSM", "Sales"],
  salary: "14-24M",
  image: "img/mkt11.jpg",
  desc: "Triển khai chương trình marketing tại điểm bán."
},
{
  id: 285,
  title: "Copywriter",
  company: "Creative Content Lab",
  field: "Kinh doanh - Marketing",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Copywriting", "SEO", "Content"],
  salary: "12-20M",
  image: "img/mkt12.jpg",
  desc: "Viết nội dung quảng cáo và truyền thông thương hiệu."
},
{
  id: 286,
  title: "Marketing Planner",
  company: "Brand Strategy Agency",
  field: "Kinh doanh - Marketing",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Planning", "Marketing", "Strategy"],
  salary: "16-28M",
  image: "img/mkt13.jpg",
  desc: "Lập kế hoạch marketing cho chiến dịch thương hiệu."
},

{
  id: 287,
  title: "Resort Receptionist",
  company: "Luxury Resort Danang",
  field: "Du lịch - Khách sạn",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Reception", "English", "Hospitality"],
  salary: "9-16M",
  image: "img/travel1.jpg",
  desc: "Đón tiếp và hỗ trợ khách lưu trú tại resort."
},
{
  id: 288,
  title: "Tour Consultant",
  company: "Danang Tourism",
  field: "Du lịch - Khách sạn",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Tour", "Sales", "Customer Service"],
  salary: "10-20M",
  image: "img/travel2.jpg",
  desc: "Tư vấn tour du lịch cho khách trong và ngoài nước."
},
{
  id: 289,
  title: "Event Coordinator",
  company: "Beach Event Center",
  field: "Du lịch - Khách sạn",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Event", "Communication", "Planning"],
  salary: "14-25M",
  image: "img/travel3.jpg",
  desc: "Tổ chức và điều phối sự kiện khách sạn - resort."
},
{
  id: 290,
  title: "Spa Therapist",
  company: "Luxury Spa Danang",
  field: "Du lịch - Khách sạn",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Spa", "Massage", "Customer Care"],
  salary: "10-18M",
  image: "img/travel4.jpg",
  desc: "Chăm sóc khách hàng và thực hiện liệu trình spa."
},

{
  id: 291,
  title: "Site Engineer",
  company: "Central Construction",
  field: "Xây dựng - Bất động sản",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Construction", "AutoCAD", "Site Supervision"],
  salary: "16-30M",
  image: "img/build9.jpg",
  desc: "Giám sát công trình và quản lý tiến độ thi công."
},
{
  id: 292,
  title: "Real Estate Consultant",
  company: "Danang Property",
  field: "Xây dựng - Bất động sản",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Sales BĐS", "Tư vấn", "Marketing"],
  salary: "15-40M",
  image: "img/build10.jpg",
  desc: "Tư vấn mua bán và đầu tư bất động sản."
},
{
  id: 293,
  title: "Interior Architect",
  company: "Modern Living Studio",
  field: "Xây dựng - Bất động sản",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Interior", "SketchUp", "3Ds Max"],
  salary: "18-32M",
  image: "img/build11.jpg",
  desc: "Thiết kế không gian nội thất cho nhà ở và văn phòng."
},
{
  id: 294,
  title: "QS Engineer",
  company: "Build Cost VN",
  field: "Xây dựng - Bất động sản",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["QS", "Excel", "Construction"],
  salary: "15-26M",
  image: "img/build12.jpg",
  desc: "Lập dự toán và quản lý chi phí công trình."
},

{
  id: 295,
  title: "Chuyên viên Quan hệ Khách hàng",
  company: "ACB Đà Nẵng",
  field: "Tài chính - Ngân hàng",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Ngân hàng", "CSKH", "Tư vấn"],
  salary: "12-22M",
  image: "img/bank1.jpg",
  desc: "Chăm sóc và hỗ trợ khách hàng sử dụng dịch vụ ngân hàng."
},
{
  id: 296,
  title: "Kế toán Nội bộ",
  company: "Finance Group VN",
  field: "Tài chính - Ngân hàng",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Kế toán", "Excel", "Báo cáo"],
  salary: "10-18M",
  image: "img/bank2.jpg",
  desc: "Theo dõi thu chi và lập báo cáo tài chính nội bộ."
},
{
  id: 297,
  title: "ReactJS Developer",
  company: "TechSoft Danang",
  field: "Công nghệ thông tin",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["ReactJS", "JavaScript", "API"],
  salary: "18-32M",
  image: "img/it10.jpg",
  desc: "Phát triển giao diện web hiện đại bằng ReactJS."
},
{
  id: 298,
  title: "iOS Developer",
  company: "Apple Dev Studio",
  field: "Công nghệ thông tin",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Swift", "iOS", "Firebase"],
  salary: "22-36M",
  image: "img/it11.jpg",
  desc: "Xây dựng ứng dụng iOS cho doanh nghiệp."
},
{
  id: 299,
  title: "Android Developer",
  company: "Mobile Future",
  field: "Công nghệ thông tin",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Kotlin", "Android", "REST API"],
  salary: "20-34M",
  image: "img/it12.jpg",
  desc: "Phát triển ứng dụng Android hiệu năng cao."
},
{
  id: 300,
  title: "AI Engineer",
  company: "AI Vision VN",
  field: "Công nghệ thông tin",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Python", "TensorFlow", "AI"],
  salary: "25-45M",
  image: "img/it13.jpg",
  desc: "Xây dựng mô hình trí tuệ nhân tạo cho doanh nghiệp."
},
{
  id: 301,
  title: "Database Administrator",
  company: "SQL Data Center",
  field: "Công nghệ thông tin",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["SQL Server", "Oracle", "Database"],
  salary: "18-30M",
  image: "img/it14.jpg",
  desc: "Quản trị cơ sở dữ liệu và tối ưu hiệu năng hệ thống."
},

{
  id: 302,
  title: "Logistics Staff",
  company: "Fast Delivery VN",
  field: "Logistics - Vận hành",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Kho vận", "Excel", "ERP"],
  salary: "9-16M",
  image: "img/log12.jpg",
  desc: "Theo dõi đơn hàng và hoạt động logistics."
},
{
  id: 303,
  title: "Warehouse Manager",
  company: "Storage Hub",
  field: "Logistics - Vận hành",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Warehouse", "Leadership", "Inventory"],
  salary: "18-30M",
  image: "img/log13.jpg",
  desc: "Quản lý hoạt động kho hàng và nhân sự."
},
{
  id: 304,
  title: "Transportation Executive",
  company: "Transport Express",
  field: "Logistics - Vận hành",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Vận tải", "Điều phối", "Logistics"],
  salary: "12-22M",
  image: "img/log14.jpg",
  desc: "Điều phối và giám sát hoạt động vận tải."
},
{
  id: 305,
  title: "Purchasing Officer",
  company: "Procurement VN",
  field: "Logistics - Vận hành",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Mua hàng", "Đàm phán", "Excel"],
  salary: "10-18M",
  image: "img/log15.jpg",
  desc: "Quản lý đơn hàng và nhà cung cấp."
},
{
  id: 306,
  title: "Import Export Specialist",
  company: "Sea Logistics",
  field: "Logistics - Vận hành",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Xuất nhập khẩu", "Tiếng Anh", "Hải quan"],
  salary: "15-26M",
  image: "img/log16.jpg",
  desc: "Thực hiện chứng từ xuất nhập khẩu quốc tế."
},

{
  id: 307,
  title: "Giáo viên Vật lý",
  company: "Future School",
  field: "Giáo dục - Đào tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Giảng dạy", "Vật lý", "Sư phạm"],
  salary: "10-18M",
  image: "img/edu9.jpg",
  desc: "Giảng dạy môn Vật lý cho học sinh THPT."
},
{
  id: 308,
  title: "Giáo viên Tin học",
  company: "Tech Education",
  field: "Giáo dục - Đào tạo",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Tin học", "Python", "Teaching"],
  salary: "12-20M",
  image: "img/edu10.jpg",
  desc: "Giảng dạy tin học và lập trình cơ bản."
},
{
  id: 309,
  title: "Tutor IELTS",
  company: "English Plus",
  field: "Giáo dục - Đào tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["IELTS", "Speaking", "English"],
  salary: "14-24M",
  image: "img/edu11.jpg",
  desc: "Hỗ trợ học viên luyện thi IELTS."
},
{
  id: 310,
  title: "Training Assistant",
  company: "Academy VN",
  field: "Giáo dục - Đào tạo",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Training", "Communication", "Office"],
  salary: "8-14M",
  image: "img/edu12.jpg",
  desc: "Hỗ trợ công tác đào tạo và học viên."
},
{
  id: 311,
  title: "Academic Advisor",
  company: "Global Academy",
  field: "Giáo dục - Đào tạo",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Tư vấn", "Education", "Communication"],
  salary: "10-18M",
  image: "img/edu13.jpg",
  desc: "Tư vấn lộ trình học tập cho học viên."
},

{
  id: 312,
  title: "Brand Designer",
  company: "Creative Branding",
  field: "Thiết kế - Sáng tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Branding", "Illustrator", "Photoshop"],
  salary: "15-28M",
  image: "img/design14.jpg",
  desc: "Thiết kế bộ nhận diện thương hiệu doanh nghiệp."
},
{
  id: 313,
  title: "Motion Designer",
  company: "Motion Studio",
  field: "Thiết kế - Sáng tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["After Effects", "Motion", "Animation"],
  salary: "16-28M",
  image: "img/design15.jpg",
  desc: "Thiết kế hiệu ứng chuyển động cho video."
},
{
  id: 314,
  title: "Illustrator Artist",
  company: "Art Creative",
  field: "Thiết kế - Sáng tạo",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Illustrator", "Drawing", "Creative"],
  salary: "12-20M",
  image: "img/design16.jpg",
  desc: "Thiết kế minh họa cho dự án truyền thông."
},
{
  id: 315,
  title: "Senior UI Designer",
  company: "UX Creative Lab",
  field: "Thiết kế - Sáng tạo",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["UI", "Figma", "Prototype"],
  salary: "18-32M",
  image: "img/design17.jpg",
  desc: "Thiết kế giao diện hiện đại cho ứng dụng web."
},
{
  id: 316,
  title: "Video Producer",
  company: "Media Production",
  field: "Thiết kế - Sáng tạo",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Video", "Premiere", "Creative"],
  salary: "14-24M",
  image: "img/design18.jpg",
  desc: "Sản xuất video quảng cáo và social media."
},

{
  id: 317,
  title: "SEO Content Writer",
  company: "Content Factory",
  field: "Kinh doanh - Marketing",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["SEO", "Content", "Writing"],
  salary: "10-18M",
  image: "img/mkt14.jpg",
  desc: "Viết bài SEO cho website doanh nghiệp."
},
{
  id: 318,
  title: "Ads Optimizer",
  company: "Digital Growth",
  field: "Kinh doanh - Marketing",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Facebook Ads", "Google Ads", "Analytics"],
  salary: "14-26M",
  image: "img/mkt15.jpg",
  desc: "Tối ưu chiến dịch quảng cáo online."
},
{
  id: 319,
  title: "Brand Executive",
  company: "Branding VN",
  field: "Kinh doanh - Marketing",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Brand", "Marketing", "Creative"],
  salary: "15-28M",
  image: "img/mkt16.jpg",
  desc: "Xây dựng và phát triển thương hiệu doanh nghiệp."
},
{
  id: 320,
  title: "Affiliate Marketing",
  company: "Affiliate Hub",
  field: "Kinh doanh - Marketing",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Affiliate", "Sales", "Marketing"],
  salary: "12-22M",
  image: "img/mkt17.jpg",
  desc: "Triển khai hệ thống tiếp thị liên kết."
},
{
  id: 321,
  title: "PR Executive",
  company: "Media Connect",
  field: "Kinh doanh - Marketing",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["PR", "Communication", "Event"],
  salary: "12-24M",
  image: "img/mkt18.jpg",
  desc: "Phụ trách truyền thông và quan hệ công chúng."
},
{
  id: 322,
  title: "Resort Receptionist",
  company: "Ocean Resort Danang",
  field: "Du lịch - Khách sạn",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Lễ tân", "Tiếng Anh", "CSKH"],
  salary: "9-16M",
  image: "img/hotel10.jpg",
  desc: "Đón tiếp và hỗ trợ khách lưu trú tại resort."
},
{
  id: 323,
  title: "Bartender",
  company: "Sky Bar Danang",
  field: "Du lịch - Khách sạn",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Pha chế", "Cocktail", "Giao tiếp"],
  salary: "10-18M",
  image: "img/hotel11.jpg",
  desc: "Pha chế đồ uống và phục vụ khách hàng."
},
{
  id: 324,
  title: "Tour Operator",
  company: "Central Travel",
  field: "Du lịch - Khách sạn",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Tour", "Điều phối", "Du lịch"],
  salary: "12-22M",
  image: "img/hotel12.jpg",
  desc: "Điều hành và quản lý tour du lịch."
},
{
  id: 325,
  title: "Chef de Partie",
  company: "Luxury Hotel",
  field: "Du lịch - Khách sạn",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Nấu ăn", "Bếp Âu", "Ẩm thực"],
  salary: "16-28M",
  image: "img/hotel13.jpg",
  desc: "Chuẩn bị món ăn tiêu chuẩn nhà hàng khách sạn."
},
{
  id: 326,
  title: "Bellman",
  company: "Golden Bay Hotel",
  field: "Du lịch - Khách sạn",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Hỗ trợ khách", "Giao tiếp", "Dịch vụ"],
  salary: "7-12M",
  image: "img/hotel14.jpg",
  desc: "Hỗ trợ hành lý và hướng dẫn khách lưu trú."
},

{
  id: 327,
  title: "Site Engineer",
  company: "Danang Construction",
  field: "Xây dựng - Bất động sản",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["AutoCAD", "Construction", "Site"],
  salary: "16-30M",
  image: "img/build20.jpg",
  desc: "Giám sát công trình xây dựng dân dụng."
},
{
  id: 328,
  title: "Real Estate Consultant",
  company: "Green Land VN",
  field: "Xây dựng - Bất động sản",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Sales", "BĐS", "Tư vấn"],
  salary: "15-40M",
  image: "img/build21.jpg",
  desc: "Tư vấn khách hàng về dự án bất động sản."
},
{
  id: 329,
  title: "Interior Architect",
  company: "Modern Space",
  field: "Xây dựng - Bất động sản",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["3Ds Max", "Interior", "SketchUp"],
  salary: "18-32M",
  image: "img/build22.jpg",
  desc: "Thiết kế không gian nội thất hiện đại."
},
{
  id: 330,
  title: "Construction Supervisor",
  company: "Build Smart",
  field: "Xây dựng - Bất động sản",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Giám sát", "Kỹ thuật", "Tiến độ"],
  salary: "15-28M",
  image: "img/build23.jpg",
  desc: "Theo dõi tiến độ và chất lượng công trình."
},
{
  id: 331,
  title: "QS Engineer",
  company: "Central Engineering",
  field: "Xây dựng - Bất động sản",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["QS", "Excel", "Bóc tách"],
  salary: "14-26M",
  image: "img/build24.jpg",
  desc: "Bóc tách khối lượng và lập dự toán công trình."
},

{
  id: 332,
  title: "Financial Analyst",
  company: "ACB Danang",
  field: "Tài chính - Ngân hàng",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Excel", "Finance", "Analysis"],
  salary: "16-30M",
  image: "img/bank10.jpg",
  desc: "Phân tích tài chính và lập báo cáo doanh nghiệp."
},
{
  id: 333,
  title: "Bank Teller",
  company: "Sacombank Đà Nẵng",
  field: "Tài chính - Ngân hàng",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Ngân hàng", "CSKH", "Giao tiếp"],
  salary: "10-16M",
  image: "img/bank11.jpg",
  desc: "Hỗ trợ giao dịch và chăm sóc khách hàng."
},
{
  id: 334,
  title: "Investment Consultant",
  company: "VPS Securities",
  field: "Tài chính - Ngân hàng",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Đầu tư", "Chứng khoán", "Tư vấn"],
  salary: "18-40M",
  image: "img/bank12.jpg",
  desc: "Tư vấn đầu tư và quản lý danh mục tài sản."
},
{
  id: 335,
  title: "Internal Accountant",
  company: "Finance Hub",
  field: "Tài chính - Ngân hàng",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Kế toán", "Excel", "Báo cáo"],
  salary: "12-20M",
  image: "img/bank13.jpg",
  desc: "Quản lý sổ sách và báo cáo tài chính nội bộ."
},
{
  id: 336,
  title: "Credit Officer",
  company: "MB Bank Đà Nẵng",
  field: "Tài chính - Ngân hàng",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Tín dụng", "Tài chính", "Thẩm định"],
  salary: "14-24M",
  image: "img/bank14.jpg",
  desc: "Thẩm định và hỗ trợ hồ sơ tín dụng khách hàng."
},
{
  id: 337,
  title: "DevOps Engineer",
  company: "CloudTech Vietnam",
  field: "Công nghệ thông tin",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Docker", "AWS", "CI/CD"],
  salary: "22-40M",
  image: "img/it20.jpg",
  desc: "Triển khai và tối ưu hệ thống cloud cho doanh nghiệp."
},
{
  id: 338,
  title: "Cyber Security Specialist",
  company: "SecureNet VN",
  field: "Công nghệ thông tin",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Security", "Network", "Firewall"],
  salary: "25-42M",
  image: "img/it21.jpg",
  desc: "Đảm bảo an toàn và bảo mật hệ thống mạng."
},
{
  id: 339,
  title: "Game Developer",
  company: "Game Studio DN",
  field: "Công nghệ thông tin",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Unity", "C#", "Game"],
  salary: "18-35M",
  image: "img/it22.jpg",
  desc: "Phát triển game mobile và PC."
},
{
  id: 340,
  title: "Business Analyst",
  company: "Smart Solutions",
  field: "Công nghệ thông tin",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["BA", "SQL", "Communication"],
  salary: "16-28M",
  image: "img/it23.jpg",
  desc: "Phân tích yêu cầu và làm việc với khách hàng."
},
{
  id: 341,
  title: "Cloud Engineer",
  company: "VN Cloud",
  field: "Công nghệ thông tin",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["AWS", "Azure", "Linux"],
  salary: "24-38M",
  image: "img/it24.jpg",
  desc: "Xây dựng và quản trị hạ tầng cloud."
},

{
  id: 342,
  title: "Fleet Coordinator",
  company: "Speed Logistics",
  field: "Logistics - Vận hành",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Điều phối", "GPS", "Excel"],
  salary: "10-18M",
  image: "img/log20.jpg",
  desc: "Điều phối xe vận tải và theo dõi giao hàng."
},
{
  id: 343,
  title: "Warehouse Supervisor",
  company: "Mega Warehouse",
  field: "Logistics - Vận hành",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Kho vận", "ERP", "Leadership"],
  salary: "16-28M",
  image: "img/log21.jpg",
  desc: "Giám sát hoạt động kho và nhân viên."
},
{
  id: 344,
  title: "Supply Chain Executive",
  company: "Supply Chain Pro",
  field: "Logistics - Vận hành",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Supply Chain", "Excel", "Planning"],
  salary: "15-26M",
  image: "img/log22.jpg",
  desc: "Quản lý chuỗi cung ứng và kế hoạch vận hành."
},
{
  id: 345,
  title: "Shipping Staff",
  company: "Ocean Cargo",
  field: "Logistics - Vận hành",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Shipping", "Hải quan", "Tiếng Anh"],
  salary: "12-20M",
  image: "img/log23.jpg",
  desc: "Theo dõi đơn hàng vận chuyển quốc tế."
},
{
  id: 346,
  title: "Procurement Executive",
  company: "Procurement Hub",
  field: "Logistics - Vận hành",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Mua hàng", "Negotiation", "ERP"],
  salary: "12-22M",
  image: "img/log24.jpg",
  desc: "Làm việc với nhà cung cấp và quản lý mua hàng."
},

{
  id: 347,
  title: "Giáo viên Toán",
  company: "Future Education",
  field: "Giáo dục - Đào tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Teaching", "Math", "Communication"],
  salary: "10-18M",
  image: "img/edu20.jpg",
  desc: "Giảng dạy môn Toán cho học sinh THCS và THPT."
},
{
  id: 348,
  title: "English Trainer",
  company: "Global English",
  field: "Giáo dục - Đào tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["IELTS", "Teaching", "English"],
  salary: "14-24M",
  image: "img/edu21.jpg",
  desc: "Đào tạo tiếng Anh giao tiếp và IELTS."
},
{
  id: 349,
  title: "Academic Coordinator",
  company: "Bright Academy",
  field: "Giáo dục - Đào tạo",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Education", "Management", "Office"],
  salary: "12-20M",
  image: "img/edu22.jpg",
  desc: "Điều phối chương trình học và giáo viên."
},
{
  id: 350,
  title: "Teaching Assistant",
  company: "Smart School",
  field: "Giáo dục - Đào tạo",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Teaching", "English", "Support"],
  salary: "7-12M",
  image: "img/edu23.jpg",
  desc: "Hỗ trợ giáo viên trong quá trình giảng dạy."
},
{
  id: 351,
  title: "STEM Instructor",
  company: "Tech Kids Center",
  field: "Giáo dục - Đào tạo",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["STEM", "Scratch", "Python"],
  salary: "12-22M",
  image: "img/edu24.jpg",
  desc: "Dạy STEM và lập trình cho học sinh."
},

{
  id: 352,
  title: "Creative Designer",
  company: "Creative House",
  field: "Thiết kế - Sáng tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Photoshop", "Branding", "Illustrator"],
  salary: "14-24M",
  image: "img/design20.jpg",
  desc: "Thiết kế ấn phẩm truyền thông sáng tạo."
},
{
  id: 353,
  title: "TikTok Video Creator",
  company: "Social Media Hub",
  field: "Thiết kế - Sáng tạo",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["TikTok", "Video", "Editing"],
  salary: "10-18M",
  image: "img/design21.jpg",
  desc: "Sản xuất video TikTok cho thương hiệu."
},
{
  id: 354,
  title: "3D Artist",
  company: "3D Vision Studio",
  field: "Thiết kế - Sáng tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["3Ds Max", "Render", "Modeling"],
  salary: "18-30M",
  image: "img/design22.jpg",
  desc: "Thiết kế mô hình và phối cảnh 3D."
},
{
  id: 355,
  title: "UI Designer",
  company: "UX Master",
  field: "Thiết kế - Sáng tạo",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Figma", "UI", "Prototype"],
  salary: "15-26M",
  image: "img/design23.jpg",
  desc: "Thiết kế giao diện web và mobile app."
},
{
  id: 356,
  title: "Photographer Assistant",
  company: "Lavender Team",
  field: "Thiết kế - Sáng tạo",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Camera", "Photoshop", "Editing"],
  salary: "8-14M",
  image: "img/design24.jpg",
  desc: "Hỗ trợ chụp ảnh và chỉnh sửa hình ảnh."
},

{
  id: 357,
  title: "Sales Executive",
  company: "Business Growth",
  field: "Kinh doanh - Marketing",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Sales", "Communication", "CRM"],
  salary: "12-24M",
  image: "img/mkt20.jpg",
  desc: "Tìm kiếm và chăm sóc khách hàng doanh nghiệp."
},
{
  id: 358,
  title: "SEO Executive",
  company: "SEO Master",
  field: "Kinh doanh - Marketing",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["SEO", "Google Analytics", "Content"],
  salary: "12-22M",
  image: "img/mkt21.jpg",
  desc: "Tối ưu SEO website và tăng traffic."
},
{
  id: 359,
  title: "Social Media Executive",
  company: "Media Buzz",
  field: "Kinh doanh - Marketing",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Facebook", "TikTok", "Content"],
  salary: "10-18M",
  image: "img/mkt22.jpg",
  desc: "Quản lý nội dung mạng xã hội doanh nghiệp."
},
{
  id: 360,
  title: "Market Research Analyst",
  company: "Insight VN",
  field: "Kinh doanh - Marketing",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Research", "Excel", "Analytics"],
  salary: "14-26M",
  image: "img/mkt23.jpg",
  desc: "Phân tích thị trường và hành vi khách hàng."
},
{
  id: 361,
  title: "Event Marketing Staff",
  company: "Event Plus",
  field: "Kinh doanh - Marketing",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Event", "Marketing", "Communication"],
  salary: "10-18M",
  image: "img/mkt24.jpg",
  desc: "Tổ chức và triển khai sự kiện marketing."
},
{
  id: 362,
  title: "Hotel Reservation Staff",
  company: "Blue Ocean Hotel",
  field: "Du lịch - Khách sạn",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Booking", "CSKH", "Tiếng Anh"],
  salary: "9-16M",
  image: "img/hotel20.jpg",
  desc: "Tiếp nhận và xử lý đặt phòng khách sạn."
},
{
  id: 363,
  title: "Restaurant Supervisor",
  company: "Luxury Restaurant",
  field: "Du lịch - Khách sạn",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Restaurant", "Leadership", "Service"],
  salary: "14-24M",
  image: "img/hotel21.jpg",
  desc: "Giám sát hoạt động phục vụ nhà hàng."
},
{
  id: 364,
  title: "Travel Consultant",
  company: "Danang Tourism",
  field: "Du lịch - Khách sạn",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Travel", "Sales", "Communication"],
  salary: "10-20M",
  image: "img/hotel22.jpg",
  desc: "Tư vấn tour và dịch vụ du lịch cho khách hàng."
},
{
  id: 365,
  title: "Spa Receptionist",
  company: "Luxury Spa",
  field: "Du lịch - Khách sạn",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Reception", "Communication", "Service"],
  salary: "8-14M",
  image: "img/hotel23.jpg",
  desc: "Hỗ trợ khách hàng và đặt lịch dịch vụ spa."
},
{
  id: 366,
  title: "Housekeeping Supervisor",
  company: "Sunrise Resort",
  field: "Du lịch - Khách sạn",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Housekeeping", "Leadership", "Service"],
  salary: "12-20M",
  image: "img/hotel24.jpg",
  desc: "Quản lý đội ngũ buồng phòng khách sạn."
},

{
  id: 367,
  title: "Civil Engineer",
  company: "Urban Build",
  field: "Xây dựng - Bất động sản",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["AutoCAD", "Construction", "Engineering"],
  salary: "18-32M",
  image: "img/build30.jpg",
  desc: "Thiết kế và giám sát công trình dân dụng."
},
{
  id: 368,
  title: "Property Consultant",
  company: "Golden Land",
  field: "Xây dựng - Bất động sản",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["BĐS", "Sales", "Communication"],
  salary: "15-40M",
  image: "img/build31.jpg",
  desc: "Tư vấn và chăm sóc khách hàng bất động sản."
},
{
  id: 369,
  title: "MEP Engineer",
  company: "Smart MEP",
  field: "Xây dựng - Bất động sản",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["MEP", "AutoCAD", "Electrical"],
  salary: "16-30M",
  image: "img/build32.jpg",
  desc: "Thiết kế hệ thống điện nước cho công trình."
},
{
  id: 370,
  title: "Interior Designer",
  company: "Luxury Interior",
  field: "Xây dựng - Bất động sản",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Interior", "SketchUp", "3Ds Max"],
  salary: "18-30M",
  image: "img/build33.jpg",
  desc: "Thiết kế nội thất căn hộ và villa."
},
{
  id: 371,
  title: "Project Coordinator",
  company: "Future Construction",
  field: "Xây dựng - Bất động sản",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Project", "Planning", "Communication"],
  salary: "14-26M",
  image: "img/build34.jpg",
  desc: "Điều phối và theo dõi tiến độ dự án."
},

{
  id: 372,
  title: "Finance Executive",
  company: "Finance Group VN",
  field: "Tài chính - Ngân hàng",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Finance", "Excel", "Analysis"],
  salary: "14-24M",
  image: "img/bank20.jpg",
  desc: "Quản lý và phân tích dữ liệu tài chính."
},
{
  id: 373,
  title: "Customer Service Banker",
  company: "Techcombank Đà Nẵng",
  field: "Tài chính - Ngân hàng",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["CSKH", "Banking", "Communication"],
  salary: "10-18M",
  image: "img/bank21.jpg",
  desc: "Hỗ trợ khách hàng sử dụng dịch vụ ngân hàng."
},
{
  id: 374,
  title: "Audit Assistant",
  company: "Audit VN",
  field: "Tài chính - Ngân hàng",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Audit", "Accounting", "Excel"],
  salary: "12-22M",
  image: "img/bank22.jpg",
  desc: "Hỗ trợ kiểm toán và báo cáo tài chính."
},
{
  id: 375,
  title: "Insurance Consultant",
  company: "Prudential Danang",
  field: "Tài chính - Ngân hàng",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Insurance", "Sales", "Consulting"],
  salary: "12-30M",
  image: "img/bank23.jpg",
  desc: "Tư vấn giải pháp bảo hiểm cho khách hàng."
},
{
  id: 376,
  title: "Treasury Staff",
  company: "Treasury Hub",
  field: "Tài chính - Ngân hàng",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Treasury", "Finance", "Excel"],
  salary: "15-28M",
  image: "img/bank24.jpg",
  desc: "Quản lý dòng tiền và hoạt động ngân quỹ."
},
{
  id: 377,
  title: "Software Engineer",
  company: "DanaTech Solutions",
  field: "Công nghệ thông tin",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Java", "Spring Boot", "MySQL"],
  salary: "20-35M",
  image: "img/it30.jpg",
  desc: "Phát triển phần mềm doanh nghiệp và hệ thống quản lý."
},
{
  id: 378,
  title: "Frontend VueJS Developer",
  company: "VN Web Studio",
  field: "Công nghệ thông tin",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["VueJS", "JavaScript", "CSS"],
  salary: "16-28M",
  image: "img/it31.jpg",
  desc: "Phát triển giao diện website bằng VueJS."
},
{
  id: 379,
  title: "QA Automation Engineer",
  company: "Testing Hub",
  field: "Công nghệ thông tin",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Selenium", "Automation", "Testing"],
  salary: "18-30M",
  image: "img/it32.jpg",
  desc: "Tự động hóa quy trình kiểm thử phần mềm."
},


{
  id: 380,
  title: "Customs Clearance Staff",
  company: "Global Cargo",
  field: "Logistics - Vận hành",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Hải quan", "Xuất nhập khẩu", "Tiếng Anh"],
  salary: "12-22M",
  image: "img/log30.jpg",
  desc: "Xử lý thủ tục thông quan hàng hóa."
},
{
  id: 381,
  title: "Logistics Planner",
  company: "Supply Hub VN",
  field: "Logistics - Vận hành",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Planning", "Supply Chain", "Excel"],
  salary: "14-24M",
  image: "img/log31.jpg",
  desc: "Lập kế hoạch và tối ưu chuỗi cung ứng."
},
{
  id: 382,
  title: "Inventory Controller",
  company: "Warehouse Pro",
  field: "Logistics - Vận hành",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Inventory", "ERP", "Excel"],
  salary: "10-18M",
  image: "img/log32.jpg",
  desc: "Kiểm soát tồn kho và báo cáo hàng hóa."
},

{
  id: 383,
  title: "Giáo viên Hóa học",
  company: "Education Future",
  field: "Giáo dục - Đào tạo",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Teaching", "Chemistry", "Education"],
  salary: "10-18M",
  image: "img/edu30.jpg",
  desc: "Giảng dạy môn Hóa học cho học sinh THPT."
},
{
  id: 384,
  title: "Academic Support Staff",
  company: "Global Education",
  field: "Giáo dục - Đào tạo",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Office", "Communication", "Education"],
  salary: "8-14M",
  image: "img/edu31.jpg",
  desc: "Hỗ trợ vận hành và quản lý lớp học."
},
{
  id: 385,
  title: "Online English Teacher",
  company: "English Connect",
  field: "Giáo dục - Đào tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["English", "Online Teaching", "IELTS"],
  salary: "12-22M",
  image: "img/edu32.jpg",
  desc: "Giảng dạy tiếng Anh trực tuyến cho học viên."
},

{
  id: 386,
  title: "Visual Designer",
  company: "Creative Vision",
  field: "Thiết kế - Sáng tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Photoshop", "Illustrator", "Design"],
  salary: "14-24M",
  image: "img/design30.jpg",
  desc: "Thiết kế hình ảnh truyền thông cho thương hiệu."
},
{
  id: 387,
  title: "Animation Designer",
  company: "Motion Lab",
  field: "Thiết kế - Sáng tạo",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Animation", "After Effects", "Creative"],
  salary: "16-28M",
  image: "img/design31.jpg",
  desc: "Thiết kế hoạt họa và motion graphic."
},
{
  id: 388,
  title: "Creative Photographer",
  company: "Studio Plus",
  field: "Thiết kế - Sáng tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Photography", "Photoshop", "Lighting"],
  salary: "10-18M",
  image: "img/design32.jpg",
  desc: "Chụp ảnh quảng cáo và sản phẩm thương hiệu."
},

{
  id: 389,
  title: "Digital Ads Specialist",
  company: "Ads Performance",
  field: "Kinh doanh - Marketing",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Facebook Ads", "Google Ads", "Analytics"],
  salary: "14-26M",
  image: "img/mkt30.jpg",
  desc: "Triển khai chiến dịch quảng cáo online."
},
{
  id: 390,
  title: "CRM Executive",
  company: "Customer Hub",
  field: "Kinh doanh - Marketing",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["CRM", "Customer Service", "Excel"],
  salary: "12-20M",
  image: "img/mkt31.jpg",
  desc: "Quản lý và chăm sóc dữ liệu khách hàng."
},
{
  id: 391,
  title: "Telemarketing Staff",
  company: "Sales Connect",
  field: "Kinh doanh - Marketing",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Sales", "Communication", "Call Center"],
  salary: "8-16M",
  image: "img/mkt32.jpg",
  desc: "Gọi điện tư vấn và chăm sóc khách hàng."
},

{
  id: 392,
  title: "Travel Operation Executive",
  company: "Asia Travel",
  field: "Du lịch - Khách sạn",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Tour", "Operation", "Communication"],
  salary: "12-22M",
  image: "img/hotel30.jpg",
  desc: "Điều hành và quản lý lịch trình tour."
},
{
  id: 393,
  title: "Resort Customer Service",
  company: "Luxury Resort",
  field: "Du lịch - Khách sạn",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["CSKH", "English", "Service"],
  salary: "9-16M",
  image: "img/hotel31.jpg",
  desc: "Hỗ trợ khách hàng trong thời gian lưu trú."
},
{
  id: 394,
  title: "Tour Sale Executive",
  company: "Holiday Vietnam",
  field: "Du lịch - Khách sạn",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Sales", "Travel", "Communication"],
  salary: "10-20M",
  image: "img/hotel32.jpg",
  desc: "Tư vấn và bán tour du lịch."
},

{
  id: 395,
  title: "Construction Planner",
  company: "Build Future",
  field: "Xây dựng - Bất động sản",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Planning", "Construction", "Excel"],
  salary: "15-28M",
  image: "img/build40.jpg",
  desc: "Lập kế hoạch thi công và tiến độ dự án."
},
{
  id: 396,
  title: "Real Estate Sales Executive",
  company: "Danang Property",
  field: "Xây dựng - Bất động sản",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Sales", "BĐS", "Consulting"],
  salary: "18-45M",
  image: "img/build41.jpg",
  desc: "Kinh doanh và tư vấn bất động sản."
},
{
  id: 397,
  title: "Landscape Architect",
  company: "Green Space Studio",
  field: "Xây dựng - Bất động sản",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Landscape", "SketchUp", "Design"],
  salary: "16-30M",
  image: "img/build42.jpg",
  desc: "Thiết kế cảnh quan và không gian xanh."
},

{
  id: 398,
  title: "Banking Consultant",
  company: "VietinBank Đà Nẵng",
  field: "Tài chính - Ngân hàng",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Finance", "Consulting", "Communication"],
  salary: "12-22M",
  image: "img/bank30.jpg",
  desc: "Tư vấn sản phẩm và dịch vụ ngân hàng."
},
{
  id: 399,
  title: "Tax Accountant",
  company: "Finance Solution",
  field: "Tài chính - Ngân hàng",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Tax", "Accounting", "Excel"],
  salary: "14-24M",
  image: "img/bank31.jpg",
  desc: "Thực hiện báo cáo thuế và kế toán doanh nghiệp."
},
{
  id: 400,
  title: "Loan Specialist",
  company: "HD Bank Đà Nẵng",
  field: "Tài chính - Ngân hàng",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Loan", "Finance", "Customer Service"],
  salary: "15-26M",
  image: "img/bank32.jpg",
  desc: "Hỗ trợ khách hàng vay vốn và tín dụng."
},
{
  id: 401,
  title: "Investment Advisor",
  company: "Investment Hub",
  field: "Tài chính - Ngân hàng",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Investment", "Finance", "Analysis"],
  salary: "20-40M",
  image: "img/bank33.jpg",
  desc: "Tư vấn đầu tư tài chính và quản lý tài sản."
},

{
  id: 402,
  title: "DevOps Engineer",
  company: "CloudTech Vietnam",
  field: "Công nghệ thông tin",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Docker", "Kubernetes", "AWS"],
  salary: "25-40M",
  image: "img/it33.jpg",
  desc: "Triển khai và quản lý hạ tầng cloud cho hệ thống doanh nghiệp."
},
{
  id: 403,
  title: "Cyber Security Analyst",
  company: "SecureNet Đà Nẵng",
  field: "Công nghệ thông tin",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Security", "Firewall", "Network"],
  salary: "20-35M",
  image: "img/it34.jpg",
  desc: "Giám sát và đảm bảo an toàn thông tin hệ thống."
},
{
  id: 404,
  title: "PHP Laravel Developer",
  company: "WebSoft Solutions",
  field: "Công nghệ thông tin",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["PHP", "Laravel", "MySQL"],
  salary: "16-28M",
  image: "img/it35.jpg",
  desc: "Phát triển website và hệ thống quản trị doanh nghiệp."
},

{
  id: 405,
  title: "Freight Coordinator",
  company: "Pacific Logistics",
  field: "Logistics - Vận hành",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Logistics", "Excel", "Coordination"],
  salary: "12-20M",
  image: "img/log33.jpg",
  desc: "Điều phối vận chuyển hàng hóa nội địa và quốc tế."
},
{
  id: 406,
  title: "Warehouse Supervisor",
  company: "Smart Warehouse",
  field: "Logistics - Vận hành",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Warehouse", "ERP", "Management"],
  salary: "14-24M",
  image: "img/log34.jpg",
  desc: "Quản lý và giám sát hoạt động kho hàng."
},
{
  id: 407,
  title: "Procurement Executive",
  company: "Supply Connect",
  field: "Logistics - Vận hành",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Procurement", "Negotiation", "Excel"],
  salary: "13-22M",
  image: "img/log35.jpg",
  desc: "Tìm kiếm và làm việc với nhà cung cấp."
},

{
  id: 408,
  title: "Giáo viên Toán THPT",
  company: "Skyline Education",
  field: "Giáo dục - Đào tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Teaching", "Math", "Presentation"],
  salary: "10-18M",
  image: "img/edu33.jpg",
  desc: "Giảng dạy môn Toán cho học sinh THPT."
},
{
  id: 409,
  title: "Academic Counselor",
  company: "Edu Future",
  field: "Giáo dục - Đào tạo",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Consulting", "Communication", "Education"],
  salary: "9-16M",
  image: "img/edu34.jpg",
  desc: "Tư vấn khóa học và hỗ trợ học viên."
},
{
  id: 410,
  title: "Training Assistant",
  company: "Global Skills Center",
  field: "Giáo dục - Đào tạo",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Training", "Office", "Communication"],
  salary: "8-14M",
  image: "img/edu35.jpg",
  desc: "Hỗ trợ tổ chức và quản lý lớp đào tạo."
},

{
  id: 411,
  title: "Social Media Designer",
  company: "Creative Social Hub",
  field: "Thiết kế - Sáng tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Photoshop", "Canva", "Social Media"],
  salary: "10-18M",
  image: "img/design33.jpg",
  desc: "Thiết kế hình ảnh cho Facebook và Instagram."
},
{
  id: 412,
  title: "3D Artist",
  company: "3D Vision Studio",
  field: "Thiết kế - Sáng tạo",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["3Ds Max", "Blender", "Rendering"],
  salary: "18-32M",
  image: "img/design34.jpg",
  desc: "Thiết kế mô hình 3D cho quảng cáo và game."
},
{
  id: 413,
  title: "Brand Identity Designer",
  company: "Brand House",
  field: "Thiết kế - Sáng tạo",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Branding", "Illustrator", "Logo Design"],
  salary: "14-26M",
  image: "img/design35.jpg",
  desc: "Thiết kế bộ nhận diện thương hiệu cho doanh nghiệp."
},

{
  id: 414,
  title: "Business Development Executive",
  company: "Growth Marketing",
  field: "Kinh doanh - Marketing",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Sales", "Business", "Negotiation"],
  salary: "15-28M",
  image: "img/mkt33.jpg",
  desc: "Phát triển thị trường và khách hàng doanh nghiệp."
},
{
  id: 415,
  title: "Marketing Planner",
  company: "Strategy Media",
  field: "Kinh doanh - Marketing",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Planning", "Marketing", "Creative"],
  salary: "14-24M",
  image: "img/mkt34.jpg",
  desc: "Lập kế hoạch marketing cho chiến dịch truyền thông."
},
{
  id: 416,
  title: "SEO Content Writer",
  company: "SEO Plus Agency",
  field: "Kinh doanh - Marketing",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["SEO", "Content", "Writing"],
  salary: "10-18M",
  image: "img/mkt35.jpg",
  desc: "Viết bài chuẩn SEO cho website doanh nghiệp."
},

{
  id: 417,
  title: "Hotel Reservation Officer",
  company: "Ocean Hotel",
  field: "Du lịch - Khách sạn",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Booking", "English", "Communication"],
  salary: "9-16M",
  image: "img/hotel33.jpg",
  desc: "Tiếp nhận và xử lý đặt phòng khách sạn."
},
{
  id: 418,
  title: "Event Coordinator",
  company: "Luxury Events",
  field: "Du lịch - Khách sạn",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Events", "Planning", "Communication"],
  salary: "12-22M",
  image: "img/hotel34.jpg",
  desc: "Tổ chức và điều phối sự kiện khách sạn."
},
{
  id: 419,
  title: "Spa Receptionist",
  company: "Golden Spa Resort",
  field: "Du lịch - Khách sạn",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Reception", "Customer Service", "English"],
  salary: "8-14M",
  image: "img/hotel35.jpg",
  desc: "Tiếp đón và hỗ trợ khách hàng tại spa resort."
},

{
  id: 420,
  title: "Site Engineer",
  company: "Urban Build",
  field: "Xây dựng - Bất động sản",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Construction", "AutoCAD", "Supervision"],
  salary: "16-30M",
  image: "img/build43.jpg",
  desc: "Giám sát hiện trường và quản lý thi công."
},
{
  id: 421,
  title: "Interior Architect",
  company: "Luxury Living Studio",
  field: "Xây dựng - Bất động sản",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Interior", "SketchUp", "3Ds Max"],
  salary: "18-34M",
  image: "img/build44.jpg",
  desc: "Thiết kế nội thất nhà ở và căn hộ cao cấp."
},
{
  id: 422,
  title: "Project Coordinator",
  company: "Future Construction",
  field: "Xây dựng - Bất động sản",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Project", "Management", "Planning"],
  salary: "15-26M",
  image: "img/build45.jpg",
  desc: "Điều phối tiến độ và nhân sự dự án xây dựng."
},

{
  id: 423,
  title: "Financial Analyst",
  company: "Finance Hub",
  field: "Tài chính - Ngân hàng",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Finance", "Excel", "Analysis"],
  salary: "18-32M",
  image: "img/bank34.jpg",
  desc: "Phân tích dữ liệu tài chính và lập báo cáo."
},
{
  id: 424,
  title: "Internal Auditor",
  company: "Audit Solutions",
  field: "Tài chính - Ngân hàng",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Audit", "Accounting", "Reporting"],
  salary: "16-28M",
  image: "img/bank35.jpg",
  desc: "Kiểm tra và đánh giá hoạt động tài chính nội bộ."
},
{
  id: 425,
  title: "Payment Support Specialist",
  company: "Digital Bank VN",
  field: "Tài chính - Ngân hàng",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Banking", "Support", "Communication"],
  salary: "12-20M",
  image: "img/bank36.jpg",
  desc: "Hỗ trợ xử lý giao dịch và thanh toán ngân hàng."
},
{
  id: 426,
  title: "Credit Risk Officer",
  company: "ACB Đà Nẵng",
  field: "Tài chính - Ngân hàng",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Credit", "Risk", "Finance"],
  salary: "18-30M",
  image: "img/bank37.jpg",
  desc: "Đánh giá và kiểm soát rủi ro tín dụng khách hàng."
},

{
  id: 402,
  title: "DevOps Engineer",
  company: "CloudTech Vietnam",
  field: "Công nghệ thông tin",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Docker", "Kubernetes", "AWS"],
  salary: "25-40M",
  image: "img/it33.jpg",
  desc: "Triển khai và quản lý hạ tầng cloud cho hệ thống doanh nghiệp."
},
{
  id: 403,
  title: "Cyber Security Analyst",
  company: "SecureNet Đà Nẵng",
  field: "Công nghệ thông tin",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Security", "Firewall", "Network"],
  salary: "20-35M",
  image: "img/it34.jpg",
  desc: "Giám sát và đảm bảo an toàn thông tin hệ thống."
},
{
  id: 404,
  title: "PHP Laravel Developer",
  company: "WebSoft Solutions",
  field: "Công nghệ thông tin",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["PHP", "Laravel", "MySQL"],
  salary: "16-28M",
  image: "img/it35.jpg",
  desc: "Phát triển website và hệ thống quản trị doanh nghiệp."
},

{
  id: 405,
  title: "Freight Coordinator",
  company: "Pacific Logistics",
  field: "Logistics - Vận hành",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Logistics", "Excel", "Coordination"],
  salary: "12-20M",
  image: "img/log33.jpg",
  desc: "Điều phối vận chuyển hàng hóa nội địa và quốc tế."
},
{
  id: 406,
  title: "Warehouse Supervisor",
  company: "Smart Warehouse",
  field: "Logistics - Vận hành",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Warehouse", "ERP", "Management"],
  salary: "14-24M",
  image: "img/log34.jpg",
  desc: "Quản lý và giám sát hoạt động kho hàng."
},
{
  id: 407,
  title: "Procurement Executive",
  company: "Supply Connect",
  field: "Logistics - Vận hành",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Procurement", "Negotiation", "Excel"],
  salary: "13-22M",
  image: "img/log35.jpg",
  desc: "Tìm kiếm và làm việc với nhà cung cấp."
},

{
  id: 408,
  title: "Giáo viên Toán THPT",
  company: "Skyline Education",
  field: "Giáo dục - Đào tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Teaching", "Math", "Presentation"],
  salary: "10-18M",
  image: "img/edu33.jpg",
  desc: "Giảng dạy môn Toán cho học sinh THPT."
},
{
  id: 409,
  title: "Academic Counselor",
  company: "Edu Future",
  field: "Giáo dục - Đào tạo",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Consulting", "Communication", "Education"],
  salary: "9-16M",
  image: "img/edu34.jpg",
  desc: "Tư vấn khóa học và hỗ trợ học viên."
},
{
  id: 410,
  title: "Training Assistant",
  company: "Global Skills Center",
  field: "Giáo dục - Đào tạo",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Training", "Office", "Communication"],
  salary: "8-14M",
  image: "img/edu35.jpg",
  desc: "Hỗ trợ tổ chức và quản lý lớp đào tạo."
},

{
  id: 411,
  title: "Social Media Designer",
  company: "Creative Social Hub",
  field: "Thiết kế - Sáng tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Photoshop", "Canva", "Social Media"],
  salary: "10-18M",
  image: "img/design33.jpg",
  desc: "Thiết kế hình ảnh cho Facebook và Instagram."
},
{
  id: 412,
  title: "3D Artist",
  company: "3D Vision Studio",
  field: "Thiết kế - Sáng tạo",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["3Ds Max", "Blender", "Rendering"],
  salary: "18-32M",
  image: "img/design34.jpg",
  desc: "Thiết kế mô hình 3D cho quảng cáo và game."
},
{
  id: 413,
  title: "Brand Identity Designer",
  company: "Brand House",
  field: "Thiết kế - Sáng tạo",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Branding", "Illustrator", "Logo Design"],
  salary: "14-26M",
  image: "img/design35.jpg",
  desc: "Thiết kế bộ nhận diện thương hiệu cho doanh nghiệp."
},

{
  id: 414,
  title: "Business Development Executive",
  company: "Growth Marketing",
  field: "Kinh doanh - Marketing",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Sales", "Business", "Negotiation"],
  salary: "15-28M",
  image: "img/mkt33.jpg",
  desc: "Phát triển thị trường và khách hàng doanh nghiệp."
},
{
  id: 415,
  title: "Marketing Planner",
  company: "Strategy Media",
  field: "Kinh doanh - Marketing",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Planning", "Marketing", "Creative"],
  salary: "14-24M",
  image: "img/mkt34.jpg",
  desc: "Lập kế hoạch marketing cho chiến dịch truyền thông."
},
{
  id: 416,
  title: "SEO Content Writer",
  company: "SEO Plus Agency",
  field: "Kinh doanh - Marketing",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["SEO", "Content", "Writing"],
  salary: "10-18M",
  image: "img/mkt35.jpg",
  desc: "Viết bài chuẩn SEO cho website doanh nghiệp."
},

{
  id: 417,
  title: "Hotel Reservation Officer",
  company: "Ocean Hotel",
  field: "Du lịch - Khách sạn",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Booking", "English", "Communication"],
  salary: "9-16M",
  image: "img/hotel33.jpg",
  desc: "Tiếp nhận và xử lý đặt phòng khách sạn."
},
{
  id: 418,
  title: "Event Coordinator",
  company: "Luxury Events",
  field: "Du lịch - Khách sạn",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Events", "Planning", "Communication"],
  salary: "12-22M",
  image: "img/hotel34.jpg",
  desc: "Tổ chức và điều phối sự kiện khách sạn."
},
{
  id: 419,
  title: "Spa Receptionist",
  company: "Golden Spa Resort",
  field: "Du lịch - Khách sạn",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Reception", "Customer Service", "English"],
  salary: "8-14M",
  image: "img/hotel35.jpg",
  desc: "Tiếp đón và hỗ trợ khách hàng tại spa resort."
},

{
  id: 420,
  title: "Site Engineer",
  company: "Urban Build",
  field: "Xây dựng - Bất động sản",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Construction", "AutoCAD", "Supervision"],
  salary: "16-30M",
  image: "img/build43.jpg",
  desc: "Giám sát hiện trường và quản lý thi công."
},
{
  id: 421,
  title: "Interior Architect",
  company: "Luxury Living Studio",
  field: "Xây dựng - Bất động sản",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Interior", "SketchUp", "3Ds Max"],
  salary: "18-34M",
  image: "img/build44.jpg",
  desc: "Thiết kế nội thất nhà ở và căn hộ cao cấp."
},
{
  id: 422,
  title: "Project Coordinator",
  company: "Future Construction",
  field: "Xây dựng - Bất động sản",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Project", "Management", "Planning"],
  salary: "15-26M",
  image: "img/build45.jpg",
  desc: "Điều phối tiến độ và nhân sự dự án xây dựng."
},

{
  id: 423,
  title: "Financial Analyst",
  company: "Finance Hub",
  field: "Tài chính - Ngân hàng",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Finance", "Excel", "Analysis"],
  salary: "18-32M",
  image: "img/bank34.jpg",
  desc: "Phân tích dữ liệu tài chính và lập báo cáo."
},
{
  id: 424,
  title: "Internal Auditor",
  company: "Audit Solutions",
  field: "Tài chính - Ngân hàng",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Audit", "Accounting", "Reporting"],
  salary: "16-28M",
  image: "img/bank35.jpg",
  desc: "Kiểm tra và đánh giá hoạt động tài chính nội bộ."
},
{
  id: 425,
  title: "Payment Support Specialist",
  company: "Digital Bank VN",
  field: "Tài chính - Ngân hàng",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Banking", "Support", "Communication"],
  salary: "12-20M",
  image: "img/bank36.jpg",
  desc: "Hỗ trợ xử lý giao dịch và thanh toán ngân hàng."
},
{
  id: 426,
  title: "Credit Risk Officer",
  company: "ACB Đà Nẵng",
  field: "Tài chính - Ngân hàng",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Credit", "Risk", "Finance"],
  salary: "18-30M",
  image: "img/bank37.jpg",
  desc: "Đánh giá và kiểm soát rủi ro tín dụng khách hàng."
},
{
  id: 427,
  title: "React Native Developer",
  company: "Mobile Future",
  field: "Công nghệ thông tin",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["React Native", "JavaScript", "Firebase"],
  salary: "18-32M",
  image: "img/it36.jpg",
  desc: "Phát triển ứng dụng mobile đa nền tảng."
},
{
  id: 428,
  title: "Database Administrator",
  company: "DataCore Vietnam",
  field: "Công nghệ thông tin",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["SQL Server", "Database", "Backup"],
  salary: "20-34M",
  image: "img/it37.jpg",
  desc: "Quản trị và tối ưu hệ thống cơ sở dữ liệu."
},
{
  id: 429,
  title: "Technical Support Engineer",
  company: "IT Service Hub",
  field: "Công nghệ thông tin",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Support", "Network", "Hardware"],
  salary: "12-20M",
  image: "img/it38.jpg",
  desc: "Hỗ trợ kỹ thuật và xử lý sự cố hệ thống."
},

{
  id: 430,
  title: "Shipping Documentation Staff",
  company: "Sea Cargo VN",
  field: "Logistics - Vận hành",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Documentation", "Export", "English"],
  salary: "11-19M",
  image: "img/log36.jpg",
  desc: "Quản lý chứng từ vận chuyển quốc tế."
},
{
  id: 431,
  title: "Transport Supervisor",
  company: "Danang Transport",
  field: "Logistics - Vận hành",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Transport", "Management", "Planning"],
  salary: "14-25M",
  image: "img/log37.jpg",
  desc: "Giám sát hoạt động vận tải hàng hóa."
},
{
  id: 432,
  title: "Supply Chain Coordinator",
  company: "Central Supply",
  field: "Logistics - Vận hành",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Supply Chain", "ERP", "Excel"],
  salary: "15-26M",
  image: "img/log38.jpg",
  desc: "Điều phối hoạt động chuỗi cung ứng doanh nghiệp."
},

{
  id: 433,
  title: "Giáo viên Vật lý",
  company: "Tri Thức Việt",
  field: "Giáo dục - Đào tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Physics", "Teaching", "Presentation"],
  salary: "11-19M",
  image: "img/edu36.jpg",
  desc: "Giảng dạy môn Vật lý cho học sinh THPT."
},
{
  id: 434,
  title: "Trợ lý Giáo vụ",
  company: "Future Academy",
  field: "Giáo dục - Đào tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Office", "Communication", "Education"],
  salary: "8-13M",
  image: "img/edu37.jpg",
  desc: "Hỗ trợ quản lý hồ sơ và lịch học."
},
{
  id: 435,
  title: "IELTS Instructor",
  company: "English Master",
  field: "Giáo dục - Đào tạo",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["IELTS", "English", "Teaching"],
  salary: "15-28M",
  image: "img/edu38.jpg",
  desc: "Giảng dạy luyện thi IELTS cho học viên."
},

{
  id: 436,
  title: "Illustrator Artist",
  company: "Creative Pencil",
  field: "Thiết kế - Sáng tạo",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Illustrator", "Drawing", "Creative"],
  salary: "12-22M",
  image: "img/design36.jpg",
  desc: "Thiết kế minh họa cho truyền thông và quảng cáo."
},
{
  id: 437,
  title: "TikTok Video Creator",
  company: "Trend Media",
  field: "Thiết kế - Sáng tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["TikTok", "Video Editing", "Creative"],
  salary: "10-18M",
  image: "img/design37.jpg",
  desc: "Sáng tạo nội dung video ngắn trên TikTok."
},
{
  id: 438,
  title: "Packaging Designer",
  company: "Box Creative",
  field: "Thiết kế - Sáng tạo",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Packaging", "Illustrator", "Branding"],
  salary: "14-24M",
  image: "img/design38.jpg",
  desc: "Thiết kế bao bì sản phẩm cho thương hiệu."
},

{
  id: 439,
  title: "Customer Success Executive",
  company: "CRM Plus",
  field: "Kinh doanh - Marketing",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Customer Service", "Communication", "CRM"],
  salary: "10-18M",
  image: "img/mkt36.jpg",
  desc: "Hỗ trợ và chăm sóc khách hàng doanh nghiệp."
},
{
  id: 440,
  title: "Affiliate Marketing Executive",
  company: "Performance Hub",
  field: "Kinh doanh - Marketing",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Affiliate", "Marketing", "Analytics"],
  salary: "14-26M",
  image: "img/mkt37.jpg",
  desc: "Triển khai và quản lý chiến dịch affiliate marketing."
},
{
  id: 441,
  title: "PR Executive",
  company: "Media Connect",
  field: "Kinh doanh - Marketing",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["PR", "Communication", "Content"],
  salary: "12-22M",
  image: "img/mkt38.jpg",
  desc: "Xây dựng hình ảnh thương hiệu và truyền thông."
},

{
  id: 442,
  title: "Restaurant Supervisor",
  company: "Golden Beach Hotel",
  field: "Du lịch - Khách sạn",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Restaurant", "Management", "Customer Service"],
  salary: "14-24M",
  image: "img/hotel36.jpg",
  desc: "Quản lý hoạt động nhà hàng trong khách sạn."
},
{
  id: 443,
  title: "Bellman Staff",
  company: "Luxury Sea Resort",
  field: "Du lịch - Khách sạn",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Hospitality", "Communication", "Support"],
  salary: "7-12M",
  image: "img/hotel37.jpg",
  desc: "Hỗ trợ hành lý và đón tiếp khách lưu trú."
},
{
  id: 444,
  title: "Travel Consultant",
  company: "Viet Holiday",
  field: "Du lịch - Khách sạn",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Travel", "Sales", "Communication"],
  salary: "10-20M",
  image: "img/hotel38.jpg",
  desc: "Tư vấn lịch trình và dịch vụ du lịch."
},

{
  id: 445,
  title: "Construction QA/QC",
  company: "Build Control",
  field: "Xây dựng - Bất động sản",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["QA/QC", "Construction", "Inspection"],
  salary: "15-27M",
  image: "img/build46.jpg",
  desc: "Kiểm tra chất lượng công trình xây dựng."
},
{
  id: 446,
  title: "Urban Planning Specialist",
  company: "City Vision",
  field: "Xây dựng - Bất động sản",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Planning", "Urban", "AutoCAD"],
  salary: "18-32M",
  image: "img/build47.jpg",
  desc: "Thiết kế và quy hoạch đô thị."
},
{
  id: 447,
  title: "Real Estate Consultant",
  company: "Property Link",
  field: "Xây dựng - Bất động sản",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Consulting", "Sales", "BĐS"],
  salary: "16-40M",
  image: "img/build48.jpg",
  desc: "Tư vấn đầu tư và giao dịch bất động sản."
},

{
  id: 448,
  title: "Treasury Executive",
  company: "Finance Group VN",
  field: "Tài chính - Ngân hàng",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Treasury", "Finance", "Excel"],
  salary: "18-30M",
  image: "img/bank38.jpg",
  desc: "Quản lý dòng tiền và hoạt động ngân quỹ."
},
{
  id: 449,
  title: "Bank Customer Advisor",
  company: "Sacombank Đà Nẵng",
  field: "Tài chính - Ngân hàng",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Banking", "Customer Service", "Sales"],
  salary: "12-20M",
  image: "img/bank39.jpg",
  desc: "Tư vấn dịch vụ tài chính cho khách hàng cá nhân."
},
{
  id: 450,
  title: "Corporate Accountant",
  company: "Business Finance",
  field: "Tài chính - Ngân hàng",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Accounting", "Reporting", "Excel"],
  salary: "14-24M",
  image: "img/bank40.jpg",
  desc: "Thực hiện kế toán và báo cáo tài chính doanh nghiệp."
},
{
  id: 451,
  title: "Insurance Consultant",
  company: "Prudential Danang",
  field: "Tài chính - Ngân hàng",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Insurance", "Consulting", "Communication"],
  salary: "10-25M",
  image: "img/bank41.jpg",
  desc: "Tư vấn giải pháp bảo hiểm và tài chính cá nhân."
},
{
  id: 452,
  title: "AI Engineer",
  company: "Smart AI Lab",
  field: "Công nghệ thông tin",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Python", "AI", "Machine Learning"],
  salary: "28-45M",
  image: "img/it39.jpg",
  desc: "Xây dựng và huấn luyện mô hình trí tuệ nhân tạo."
},
{
  id: 453,
  title: "Game Developer",
  company: "Game Studio VN",
  field: "Công nghệ thông tin",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Unity", "C#", "Game"],
  salary: "20-36M",
  image: "img/it40.jpg",
  desc: "Phát triển game mobile và PC."
},
{
  id: 454,
  title: "Cloud Engineer",
  company: "VN Cloud Tech",
  field: "Công nghệ thông tin",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["AWS", "Azure", "Linux"],
  salary: "24-38M",
  image: "img/it41.jpg",
  desc: "Quản lý và triển khai hạ tầng cloud."
},

{
  id: 455,
  title: "Import Export Coordinator",
  company: "Pacific Import Export",
  field: "Logistics - Vận hành",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Import Export", "Documentation", "English"],
  salary: "12-22M",
  image: "img/log39.jpg",
  desc: "Điều phối hoạt động xuất nhập khẩu hàng hóa."
},
{
  id: 456,
  title: "Fleet Management Staff",
  company: "Transport Hub",
  field: "Logistics - Vận hành",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Fleet", "Management", "Logistics"],
  salary: "14-24M",
  image: "img/log40.jpg",
  desc: "Quản lý đội xe vận chuyển hàng hóa."
},
{
  id: 457,
  title: "Logistics Data Analyst",
  company: "Supply Data VN",
  field: "Logistics - Vận hành",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Excel", "Power BI", "Analytics"],
  salary: "16-28M",
  image: "img/log41.jpg",
  desc: "Phân tích dữ liệu vận hành logistics."
},

{
  id: 458,
  title: "Giáo viên Sinh học",
  company: "Bright Future School",
  field: "Giáo dục - Đào tạo",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Biology", "Teaching", "Presentation"],
  salary: "10-18M",
  image: "img/edu39.jpg",
  desc: "Giảng dạy môn Sinh học cho học sinh THPT."
},
{
  id: 459,
  title: "Study Abroad Consultant",
  company: "Global Study Center",
  field: "Giáo dục - Đào tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Consulting", "English", "Communication"],
  salary: "12-22M",
  image: "img/edu40.jpg",
  desc: "Tư vấn du học và hồ sơ học tập quốc tế."
},
{
  id: 460,
  title: "Preschool Teacher",
  company: "Happy Kids School",
  field: "Giáo dục - Đào tạo",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Teaching", "Kids", "Communication"],
  salary: "8-15M",
  image: "img/edu41.jpg",
  desc: "Chăm sóc và giảng dạy trẻ mầm non."
},

{
  id: 461,
  title: "Creative Copywriter",
  company: "Idea Creative",
  field: "Thiết kế - Sáng tạo",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Writing", "Creative", "Content"],
  salary: "10-18M",
  image: "img/design39.jpg",
  desc: "Sáng tạo nội dung quảng cáo và truyền thông."
},
{
  id: 462,
  title: "UI Motion Designer",
  company: "Motion UX Studio",
  field: "Thiết kế - Sáng tạo",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Figma", "Motion", "After Effects"],
  salary: "16-28M",
  image: "img/design40.jpg",
  desc: "Thiết kế animation cho giao diện ứng dụng."
},
{
  id: 463,
  title: "Advertising Designer",
  company: "Ads Creative Agency",
  field: "Thiết kế - Sáng tạo",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Photoshop", "Illustrator", "Branding"],
  salary: "12-22M",
  image: "img/design41.jpg",
  desc: "Thiết kế banner và ấn phẩm quảng cáo."
},

{
  id: 464,
  title: "Sales Executive",
  company: "Business Connect",
  field: "Kinh doanh - Marketing",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Sales", "Negotiation", "Communication"],
  salary: "12-25M",
  image: "img/mkt39.jpg",
  desc: "Tìm kiếm và chăm sóc khách hàng doanh nghiệp."
},
{
  id: 465,
  title: "Media Planner",
  company: "Media House VN",
  field: "Kinh doanh - Marketing",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Planning", "Media", "Marketing"],
  salary: "14-26M",
  image: "img/mkt40.jpg",
  desc: "Lập kế hoạch truyền thông cho thương hiệu."
},
{
  id: 466,
  title: "Marketing Automation Specialist",
  company: "Auto Marketing Hub",
  field: "Kinh doanh - Marketing",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["CRM", "Automation", "Email Marketing"],
  salary: "16-28M",
  image: "img/mkt41.jpg",
  desc: "Tự động hóa quy trình marketing doanh nghiệp."
},

{
  id: 467,
  title: "Hotel Sales Executive",
  company: "Ocean View Resort",
  field: "Du lịch - Khách sạn",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Sales", "Hotel", "Communication"],
  salary: "12-24M",
  image: "img/hotel39.jpg",
  desc: "Kinh doanh dịch vụ khách sạn và resort."
},
{
  id: 468,
  title: "Travel Content Creator",
  company: "Travel Media Hub",
  field: "Du lịch - Khách sạn",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Content", "Photography", "TikTok"],
  salary: "10-18M",
  image: "img/hotel40.jpg",
  desc: "Sáng tạo nội dung quảng bá du lịch."
},
{
  id: 469,
  title: "Hotel HR Executive",
  company: "Luxury Hospitality",
  field: "Du lịch - Khách sạn",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["HR", "Recruitment", "Communication"],
  salary: "12-20M",
  image: "img/hotel41.jpg",
  desc: "Tuyển dụng và quản lý nhân sự khách sạn."
},

{
  id: 470,
  title: "Civil Site Supervisor",
  company: "Danang Construction",
  field: "Xây dựng - Bất động sản",
  district: "Liên Chiểu",
  location: "Quận Liên Chiểu, Đà Nẵng",
  skills: ["Construction", "Supervision", "AutoCAD"],
  salary: "16-30M",
  image: "img/build49.jpg",
  desc: "Giám sát thi công công trình dân dụng."
},
{
  id: 471,
  title: "Property Investment Consultant",
  company: "Golden Land VN",
  field: "Xây dựng - Bất động sản",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Investment", "Real Estate", "Sales"],
  salary: "18-45M",
  image: "img/build50.jpg",
  desc: "Tư vấn đầu tư bất động sản cho khách hàng."
},
{
  id: 472,
  title: "Interior Project Manager",
  company: "Luxury Interior",
  field: "Xây dựng - Bất động sản",
  district: "Cẩm Lệ",
  location: "Quận Cẩm Lệ, Đà Nẵng",
  skills: ["Project", "Interior", "Management"],
  salary: "20-35M",
  image: "img/build51.jpg",
  desc: "Quản lý dự án thiết kế và thi công nội thất."
},

{
  id: 473,
  title: "Finance Controller",
  company: "Central Finance",
  field: "Tài chính - Ngân hàng",
  district: "Hải Châu",
  location: "Quận Hải Châu, Đà Nẵng",
  skills: ["Finance", "Accounting", "Reporting"],
  salary: "20-36M",
  image: "img/bank42.jpg",
  desc: "Kiểm soát tài chính và báo cáo doanh nghiệp."
},
{
  id: 474,
  title: "Personal Banker",
  company: "Techcombank Đà Nẵng",
  field: "Tài chính - Ngân hàng",
  district: "Thanh Khê",
  location: "Quận Thanh Khê, Đà Nẵng",
  skills: ["Banking", "Customer Service", "Finance"],
  salary: "12-22M",
  image: "img/bank43.jpg",
  desc: "Tư vấn và hỗ trợ khách hàng cá nhân."
},
{
  id: 475,
  title: "Accounting Executive",
  company: "Finance Support VN",
  field: "Tài chính - Ngân hàng",
  district: "Sơn Trà",
  location: "Quận Sơn Trà, Đà Nẵng",
  skills: ["Accounting", "Excel", "Tax"],
  salary: "13-22M",
  image: "img/bank44.jpg",
  desc: "Quản lý sổ sách và báo cáo kế toán."
},
{
  id: 476,
  title: "Investment Consultant",
  company: "Future Investment",
  field: "Tài chính - Ngân hàng",
  district: "Ngũ Hành Sơn",
  location: "Quận Ngũ Hành Sơn, Đà Nẵng",
  skills: ["Investment", "Finance", "Consulting"],
  salary: "18-34M",
  image: "img/bank45.jpg",
  desc: "Tư vấn đầu tư và quản lý tài sản khách hàng."
},
];

/// ================== HIỂN THỊ THẺ NGÀNH ==================
function renderFieldCards() {
  const fieldContainer = document.getElementById("fieldCards");
  if (!fieldContainer) return;

  const fieldCounts = getFieldCounts();

  fieldContainer.innerHTML = "";

  Object.entries(fieldCounts).forEach(([field, total]) => {
    fieldContainer.innerHTML += `
      <div class="field-card" data-field="${field}">
        <h3>${field}</h3>
        <p>${total} công việc</p>
      </div>
    `;
  });

  document.querySelectorAll(".field-card").forEach(card => {
    card.addEventListener("click", () => {
      const field = card.dataset.field;
      const filteredJobs = allJobs.filter(job => job.field === field);
      renderJobs(filteredJobs);
    });
  });
}

// ================== RENDER JOB ==================
function renderJobs(jobs) {
  const jobsContainer = document.getElementById("jobsContainer");
  if (!jobsContainer) return;

  if (!jobs || jobs.length === 0) {
    jobsContainer.innerHTML = `
      <p class="no-job">Không có công việc phù hợp</p>
    `;
    return;
  }

  jobsContainer.innerHTML = jobs.map(job => `
    <div class="job-item" onclick="goToJobDetail(${job.id})">
      ${createJobCard(job)}
    </div>
  `).join("");

  // FIX: gắn đúng job theo id thay vì index
  document.querySelectorAll(".btn-apply").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const jobId = btn.getAttribute("data-id");
      applyJob(e, jobId);
    });
  });
}

// ================== CARD JOB ==================
function createJobCard(job) {
  const skills = Array.isArray(job.skills) ? job.skills : [];

  return `
    <div class="job-card">
      <div class="card-top">
        <div class="comp-logo ${job.logoColor || "blue"}">
          ${job.logo || (job.company ? job.company.charAt(0) : "?" )}
        </div>

        <div class="job-meta">
          <h3>${job.title || ""}</h3>
          <p class="comp-name">${job.company || ""}</p>
        </div>

        <button class="btn-fav">
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>

      <div class="card-mid">
        <span>
          <i class="fa-solid fa-location-dot"></i>
          ${job.location || ""}
        </span>

        <span class="salary">
          <i class="fa-solid fa-money-bill-wave"></i>
          ${job.salary || ""}
        </span>

        <span>
          <i class="fa-solid fa-briefcase"></i>
          ${job.type || "Full-time"}
        </span>
      </div>

      <div class="card-tags">
        ${skills.map(tag => `<span>${tag}</span>`).join("")}
      </div>

      <div class="card-bottom">
        <span class="date">
          <i class="fa-regular fa-calendar"></i>
          ${job.date || "2024-03-20"}
        </span>

        <button class="btn-apply" data-id="${job.id}">
          Ứng tuyển
        </button>
      </div>
    </div>
  `;
}

// ================= CHUYỂN TRANG CHI TIẾT =================
function goToJobDetail(jobId) {
  window.location.href = `job-detail.html?id=${jobId}`;
}

// ================= NÚT ỨNG TUYỂN =================
function applyJob(event, jobId) {
  event.stopPropagation();
  localStorage.setItem("applyJobId", jobId);
  window.location.href = `apply.html?id=${jobId}`;
}
window.viewDetail = function(event, id) {

    event.stopPropagation();

    window.location.href =
        `job-detail.html?id=${id}`;
};

// ================= AUTO LOAD =================
document.addEventListener("DOMContentLoaded", () => {
  renderFieldCards();
  renderJobs(allJobs);
  window.allJobs = allJobs;
});
document.querySelectorAll(".field-tag").forEach(tag => {
  tag.addEventListener("click", () => {
    const field = tag.textContent.toLowerCase();

    // chuyển về trang danh sách + lưu filter
    localStorage.setItem("selectedField", field);
    window.location.href = "trangvieclam.html";
  });
});
function renderRelatedCompanies(currentCompany, currentField) {
    const container = document.getElementById("relatedCompanies");
    if (!container) return;

    const companiesSet = new Map();

    // lấy tất cả job cùng field → gom công ty
    for (const key in jobsData) {
        jobsData[key].forEach(job => {
            if (
                job.field === currentField &&
                job.company !== currentCompany
            ) {
                companiesSet.set(job.company, job);
            }
        });
    }

    const companies = Array.from(companiesSet.values()).slice(0, 5);

    container.innerHTML = companies.map(job => `
        <div class="company-item">
            <img src="${job.image}" alt="">
            <div class="company-info">
                <h4>${job.company}</h4>
                <span>${job.field}</span>
            </div>
        </div>
    `).join("");
}
document.addEventListener("DOMContentLoaded", () => {
    const currentCompany = "CÔNG TY TNHH CÔNG NGHỆ CAO MICRO ONE";
    const currentField = "Cơ khí / Tự động hóa";

    renderRelatedCompanies(currentCompany, currentField);
});