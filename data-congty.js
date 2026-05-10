const companyData = {
    // 1. FPT Software
    "fpt": {
        name: "FPT Software",
        logo: "img/fpt.jpg",
        location: "Hải Châu, Đà Nẵng",
        size: "5000+ nhân viên",
        rating: "4.5",
        recommend: "85%",
        desc: "FPT Software là công ty xuất khẩu dịch vụ phần mềm hàng đầu Đông Nam Á. Tại Đà Nẵng, FPT sở hữu campus FPT Complex hiện đại bậc nhất. Chúng tôi chuyên cung cấp dịch vụ chuyển đổi số, AI, Cloud cho các đối tác toàn cầu với môi trường làm việc chuẩn quốc tế.",
        benefits: ["Lương tháng 13 & Thưởng dự án", "Bảo hiểm FPT Care", "Xe đưa đón nhân viên"],
        contact: { web: "fptsoftware.com", phone: "0236 3958 777", email: "recruitment@fsoft.com.vn" }
    },

    // 2. Phi Long Technology
    "philong": {
        name: "Phi Long Technology",
        logo: "img/philong-logo.jpg",
        location: "Hải Châu, Đà Nẵng",
        size: "2000+ nhân viên",
        rating: "4.5",
        recommend: "90%",
        desc: "Phi Long Technology là một trong những doanh nghiệp CNTT hàng đầu tại miền Trung. Chúng tôi cung cấp giải pháp công nghệ toàn diện, phân phối thiết bị IT và triển khai các hệ thống thông minh cho doanh nghiệp và người tiêu dùng.",
        benefits: ["Thưởng doanh số cao", "Môi trường trẻ trung", "Đào tạo kỹ năng liên tục"],
        contact: { web: "philong.com.vn", phone: "0236 3888 000", email: "tuyendung@philong.com.vn" }
    },

    // 3. Enclave Software
    "enclave": {
        name: "Enclave Software",
        logo: "img/images.png",
        location: "Sơn Trà, Đà Nẵng",
        size: "300+ nhân viên",
        rating: "4.5",
        recommend: "80%",
        desc: "Được thành lập từ năm 2007, Enclave là một trong những công ty phần mềm có lịch sử lâu đời tại Đà Nẵng. Chúng tôi tự hào xây dựng một môi trường làm việc giống như kỹ sư tại Thung lũng Silicon với văn hóa kỹ thuật chuyên sâu.",
        benefits: ["Lương cạnh tranh", "Thời gian làm việc linh hoạt", "Cung cấp bữa ăn trưa"],
        contact: { web: "enclave.vn", phone: "0236 3222 333", email: "jobs@enclave.vn" }
    },

    // 4. Vinpearl Resort & Spa
    "vinpearl": {
        name: "Vinpearl Resort & Spa",
        logo: "img/spa.png",
        location: "Ngũ Hành Sơn, Đà Nẵng",
        size: "1000+ nhân viên",
        rating: "4.5",
        recommend: "85%",
        desc: "Thuộc tập đoàn Vingroup, Vinpearl Resort & Spa Đà Nẵng là biểu tượng của sự sang trọng. Chúng tôi mang đến cơ hội nghề nghiệp tuyệt vời trong ngành dịch vụ khách sạn với lộ trình đào tạo và thăng tiến rõ ràng.",
<<<<<<< HEAD
        benefits: ["Chế độ đãi ngộ của Vingroup", "Thưởng các dịp Lễ Tết", "Hỗ trợ nhà ở cho nhân viên"],
=======
benefits: ["Chế độ đãi ngộ của Vingroup", "Thưởng các dịp Lễ Tết", "Hỗ trợ nhà ở cho nhân viên"],
>>>>>>> ab57221f699c18fec3a1d357d88d53bafb604382
        contact: { web: "vinpearl.com", phone: "1900 23 23 89", email: "hr.danang@vinpearl.com" }
    },

    // 5. InterContinental Danang
    "intercontinental": {
        name: "InterContinental Danang",
        logo: "img/intercontinental.png",
        location: "Bán đảo Sơn Trà, Đà Nẵng",
        size: "800+ nhân viên",
        rating: "4.5",
        recommend: "100%",
        desc: "Khu nghỉ dưỡng sang trọng bậc nhất thế giới tọa lạc tại Bán đảo Sơn Trà. InterContinental Danang Sun Peninsula Resort mang đến trải nghiệm làm việc trong môi trường đa văn hóa, chuyên nghiệp và đẳng cấp quốc tế.",
        benefits: ["Bảo hiểm sức khỏe quốc tế", "Môi trường sử dụng tiếng Anh", "Bữa ăn cao cấp theo ca"],
        contact: { web: "danang.intercontinental.com", phone: "0236 393 8888", email: "careers.icdanang@ihg.com" }
    },

    // 6. Tập đoàn Sun Group
    "sungroup": {
        name: "Tập đoàn Sun Group",
        logo: "img/logo-sungroup-2020.jpg",
        location: "Hải Châu, Đà Nẵng",
        size: "3000+ nhân viên",
        rating: "4.5",
        recommend: "100%",
        desc: "Sun Group là tập đoàn kinh tế tư nhân hàng đầu Việt Nam, chủ đầu tư của các dự án mang dấu ấn vượt thời gian tại Đà Nẵng như Bà Nà Hills, Công viên Châu Á (Asia Park) và các khu nghỉ dưỡng cao cấp.",
        benefits: ["Cơ hội thăng tiến rộng mở", "Sử dụng dịch vụ nội bộ miễn phí", "Thu nhập thuộc top thị trường"],
        contact: { web: "sungroup.com.vn", phone: "0236 381 9181", email: "tuyendung.mt@sungroup.com.vn" }
    },

    // 7. Trung Nam Group
    "trungnam": {
        name: "Trung Nam Group",
        logo: "img/logo-trung-nam-group.png",
        location: "Liên Chiểu, Đà Nẵng",
        size: "1500+ nhân viên",
        rating: "4.5",
        recommend: "100%",
        desc: "Tập đoàn Trung Nam (Trungnam Group) là doanh nghiệp tiên phong trong các lĩnh vực Năng lượng, Hạ tầng - Xây dựng, Bất động sản và Công nghiệp thông tin điện tử tại Việt Nam.",
        benefits: ["Tham gia các siêu dự án", "Chế độ thưởng dự án hấp dẫn", "Đào tạo nghiệp vụ chuyên sâu"],
        contact: { web: "trungnamgroup.com.vn", phone: "0236 381 9182", email: "hr@trungnamgroup.com.vn" }
    },

    // 8. Lotte Mart Đà Nẵng
    "lottemart": {
        name: "Lotte Mart Đà Nẵng",
        logo: "img/logo-lotte-mart-vector-2.webp",
        location: "Hải Châu, Đà Nẵng",
        size: "500+ nhân viên",
        rating: "4.5",
        recommend: "100%",
<<<<<<< HEAD
        desc: "Lotte Mart là một trong những trung tâm thương mại và siêu thị lớn nhất tại Đà Nẵng, thuộc tập đoàn Lotte Hàn Quốc. Chúng tôi mang đến môi trường làm việc năng động trong lĩnh vực bán lẻ.",
=======
desc: "Lotte Mart là một trong những trung tâm thương mại và siêu thị lớn nhất tại Đà Nẵng, thuộc tập đoàn Lotte Hàn Quốc. Chúng tôi mang đến môi trường làm việc năng động trong lĩnh vực bán lẻ.",
>>>>>>> ab57221f699c18fec3a1d357d88d53bafb604382
        benefits: ["Mua sắm nội bộ giá ưu đãi", "Chế độ bảo hiểm đầy đủ", "Cơ hội làm việc tại Hàn Quốc"],
        contact: { web: "lottemart.com.vn", phone: "0236 368 1666", email: "tuyendung.dn@lotte.vn" }
    },

    // 9. Viettel Post Đà Nẵng
    "viettel": {
        name: "Viettel Post Đà Nẵng",
        logo: "img/viet.png",
        location: "Toàn Đà Nẵng",
        size: "1000+ nhân viên",
        rating: "4.5",
        recommend: "100%",
        desc: "Tổng Công ty Cổ phần Bưu chính Viettel (Viettel Post) là đơn vị thành viên của Tập đoàn Công nghiệp Viễn thông Quân đội Viettel. Môi trường kỷ luật, chuyên nghiệp và nhiều cơ hội phát triển đột phá.",
        benefits: ["Thu nhập theo năng lực", "Phúc lợi quân đội", "Khám sức khỏe định kỳ cao cấp"],
        contact: { web: "viettelpost.com.vn", phone: "1900 8095", email: "tuyendung@viettelpost.com.vn" }
    },

    // 10. Agribank Đà Nẵng
    "agribank": {
        name: "Agribank Đà Nẵng",
        logo: "img/agr.png",
        location: "Hải Châu, Đà Nẵng",
        size: "800+ nhân viên",
        rating: "4.5",
        recommend: "100%",
        desc: "Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam (Agribank) chi nhánh Đà Nẵng mang đến môi trường làm việc ổn định, phúc lợi tốt cùng các hoạt động phong trào sôi nổi trong hệ thống ngân hàng nhà nước.",
        benefits: ["Môi trường làm việc ổn định", "Thưởng các ngày Lễ/Tết lớn", "Lương bổng theo quy định nhà nước"],
        contact: { web: "agribank.com.vn", phone: "0236 382 1111", email: "contact@agribank.com.vn" }
    }
};