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