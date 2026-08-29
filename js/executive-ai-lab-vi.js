(function () {
  var copy = { growth: 'cơ hội tăng trưởng', customers: 'nguyên nhân khách hàng rời đi', execution: 'điểm nghẽn thực thi' };
  function update() {
    var question = document.querySelector('[name="question"]:checked').value;
    var connected = document.querySelector('[name="context"]:checked').value === 'connected';
    var human = document.querySelector('[name="review"]:checked').value === 'human';
    var state = 'TÍN HIỆU PHÂN MẢNH', title = 'Câu trả lời nhanh chưa chắc là câu trả lời cấp doanh nghiệp.';
    var body = 'Hệ thống có thể tóm tắt tài liệu đã chọn về ' + copy[question] + ', nhưng chưa thấy mâu thuẫn giữa các bộ phận hoặc biết bằng chứng nào đủ chuẩn để ra quyết định.';
    var confidence = '32%', risk = 'CAO';
    if (connected) { state = 'TRÍ TUỆ ĐƯỢC KẾT NỐI'; title = 'Doanh nghiệp có thể nhìn thấy chính mình rõ hơn.'; body = 'Các mô thức xuyên bộ phận trở nên rõ hơn, nhưng quyền truy cập rộng hơn cũng đặt ra câu hỏi về thẩm quyền, nguồn gốc và nguồn dữ liệu nào đáng tin cậy.'; confidence = '67%'; risk = 'TRUNG BÌNH'; }
    if (connected && human) { state = 'HỆ THỐNG SẴN SÀNG HỖ TRỢ QUYẾT ĐỊNH'; title = 'Trí tuệ chỉ hữu ích khi trách nhiệm được thiết kế ngay từ đầu.'; body = 'Bằng chứng được kết nối làm rõ ' + copy[question] + '. Lãnh đạo chuyên môn kiểm tra giả định, xử lý xung đột và chịu trách nhiệm cho quyết định tiếp theo.'; confidence = '86%'; risk = 'ĐƯỢC KIỂM SOÁT'; }
    if (!connected && human) { state = 'CÓ CON NGƯỜI XÁC THỰC / BỐI CẢNH CHƯA ĐỦ'; title = 'Trách nhiệm giúp nâng chất lượng. Bối cảnh thiếu vẫn giới hạn quyết định.'; body = 'Lãnh đạo chuyên môn có thể phản biện câu trả lời, nhưng tri thức phân mảnh vẫn khiến nhiều tín hiệu và mâu thuẫn quan trọng nằm ngoài tầm nhìn.'; confidence = '51%'; risk = 'TRUNG BÌNH'; }
    document.getElementById('answerState').textContent = state; document.getElementById('answerTitle').textContent = title; document.getElementById('answerBody').textContent = body; document.getElementById('confidence').textContent = confidence; document.getElementById('risk').textContent = risk;
  }
  document.querySelectorAll('.controls input').forEach(function (input) { input.addEventListener('change', update); });
}());
