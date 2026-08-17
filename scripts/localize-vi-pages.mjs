import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pages = ['radio.html', 'game.html', 'alignment-lab.html', 'advisory-lab.html', 'commerce-lab.html'];

const translations = new Map([
  ['About', 'Về chúng tôi'], ['What We Do', 'Dịch vụ'], ['Approach', 'Phương pháp'],
  ['Expert Network', 'Chuyên gia'], ['Work', 'Dự án'], ['Insights', 'Góc nhìn'],
  ['Book a Decision Session', 'Đặt lịch Decision Session'], ['Contact', 'Liên hệ'],
  ['← All Labs', '← Tất cả Labs'], ['Discuss the result', 'Trao đổi về kết quả'],
  ['© 2026 Brand Here. Ho Chi Minh City, Vietnam.', '© 2026 Brand Here. Thành phố Hồ Chí Minh, Việt Nam.'],

  ['Brand Here Radio — AI-assisted Original Music', 'Brand Here Radio — Âm nhạc nguyên bản có AI hỗ trợ'],
  ['Brand Here Radio · Sonic Experiment 01', 'Brand Here Radio · Thử nghiệm âm thanh 01'],
  ['What if a brand idea could be heard?', 'Nếu một ý tưởng thương hiệu có thể được lắng nghe?'],
  ['Original music developed through human judgement, brand strategy and generative AI. Not a prompt-and-publish exercise — a creative system shaped through direction, selection and refinement.', 'Âm nhạc nguyên bản được phát triển từ năng lực phán đoán của con người, chiến lược thương hiệu và AI tạo sinh. Đây không phải quy trình nhập prompt rồi đăng, mà là một hệ thống sáng tạo được định hướng, tuyển chọn và tinh chỉnh.'],
  ['Ready to play', 'Sẵn sàng phát'], ['Official Brand Here master · Final selected direction', 'Bản master chính thức của Brand Here · Hướng sáng tạo được lựa chọn'],
  ['Live lyrics', 'Lời bài hát đồng bộ'], ['Read the meaning as it moves.', 'Đọc ý nghĩa theo nhịp bài hát.'], ['Hide lyrics', 'Ẩn lời bài hát'],
  ['Lyrics are synchronized with MASTER A. Select a line to jump to that moment.', 'Lời bài hát được đồng bộ với MASTER A. Chọn một dòng để chuyển đến thời điểm tương ứng.'],
  ['The creative brief', 'Đề bài sáng tạo'],
  ['A brand anthem about moving from possibility to consequence — because ideas only matter when they change something real.', 'Một bản nhạc thương hiệu kể hành trình từ khả năng đến tác động — bởi ý tưởng chỉ có ý nghĩa khi tạo ra thay đổi thật.'],
  ["The project began with Brand Here's positioning and the tension at the centre of the business: AI can accelerate almost anything, but human judgement decides what deserves to exist. One core song was explored across multiple tempos, vocal structures and performance directions to find the expression with the strongest emotional and strategic fit.", "Dự án bắt đầu từ định vị của Brand Here và một mâu thuẫn cốt lõi: AI có thể tăng tốc gần như mọi thứ, nhưng phán đoán của con người quyết định điều gì xứng đáng tồn tại. Một bài hát chủ đạo được thử nghiệm qua nhiều nhịp độ, cấu trúc giọng hát và phong cách thể hiện để tìm ra phương án phù hợp nhất về cảm xúc lẫn chiến lược."],
  ['Human–AI collaboration', 'Hợp tác giữa con người và AI'], ['AI expanded the possibilities. Brand judgement shaped the result.', 'AI mở rộng khả năng. Phán đoán thương hiệu định hình kết quả.'],
  ['Brand Here defined the idea', 'Brand Here xác lập ý tưởng'], ['Positioning, creative brief, emotional arc and the role the music needed to play in the broader brand system.', 'Định vị, đề bài sáng tạo, mạch cảm xúc và vai trò của âm nhạc trong toàn bộ hệ thống thương hiệu.'],
  ['Lyrics developed collaboratively', 'Lời bài hát được phát triển cộng tác'], ['Human-written direction and judgement combined with AI-assisted exploration, rewriting and structural iteration.', 'Định hướng và phán đoán của con người kết hợp với AI để khám phá, viết lại và thử nghiệm cấu trúc.'],
  ['Generative production explored', 'Khám phá sản xuất bằng AI tạo sinh'], ['Music and vocal directions were generated across tempo, arrangement, performance style and voice configuration.', 'Các hướng âm nhạc và giọng hát được thử nghiệm qua nhịp độ, phối khí, phong cách thể hiện và cấu hình giọng ca.'],
  ['People selected and refined', 'Con người tuyển chọn và tinh chỉnh'], ['Outputs were compared, rejected, remixed and shaped into a coherent creative system rather than accepted at first pass.', 'Các phương án được so sánh, loại bỏ, phối lại và định hình thành một hệ thống sáng tạo nhất quán thay vì chấp nhận ngay kết quả đầu tiên.'],
  ['Beyond one song', 'Không chỉ một bài hát'], ['One idea.', 'Một ý tưởng.'], ['Many usable forms.', 'Nhiều hình thức ứng dụng.'],
  ['Full-length masters', 'Bản master đầy đủ'], ['Brand anthem and performance', 'Brand anthem và trình diễn'], ['60-second hero cut', 'Phiên bản chủ đạo 60 giây'], ['Brand film and launch content', 'Phim thương hiệu và nội dung ra mắt'], ['30-second social cut', 'Phiên bản mạng xã hội 30 giây'], ['Campaign and short-form video', 'Chiến dịch và video ngắn'], ['15-second hook', 'Đoạn hook 15 giây'], ['Paid media and content openers', 'Quảng cáo và mở đầu nội dung'], ['6-second sonic ident', 'Dấu hiệu âm thanh 6 giây'], ['Brand signature and mnemonic', 'Chữ ký và gợi nhớ thương hiệu'],
  ['Creative disclosure', 'Công bố phương thức sáng tạo'], ['AI-assisted original work', 'Tác phẩm nguyên bản có AI hỗ trợ'],
  ['Concept and creative direction by Brand Here. Lyrics developed through human–AI collaboration. Music and vocal production created with generative AI, then selected, refined and shaped through human judgement. The tracks on this page are presented as an experimental Brand Here creative project.', 'Ý tưởng và định hướng sáng tạo do Brand Here thực hiện. Lời bài hát được phát triển qua hợp tác giữa con người và AI. Âm nhạc và giọng hát được tạo bằng AI tạo sinh, sau đó được con người tuyển chọn, tinh chỉnh và định hình. Các bản nhạc trên trang là một dự án sáng tạo thử nghiệm của Brand Here.'],
  ['Ready to make a brand idea people can feel?', 'Sẵn sàng tạo một ý tưởng thương hiệu mà mọi người có thể cảm nhận?'],

  ['Bridge the Gap — A Brand Here Interactive Experiment', 'Bridge the Gap — Trải nghiệm tương tác của Brand Here'],
  ['Interactive Experiment 02 · Built with AI', 'Thử nghiệm tương tác 02 · Được xây dựng với AI'], ['Bridge', 'Vượt qua'], ['the Gap', 'khoảng cách'],
  ['Ideas only create impact when they make it across.', 'Ý tưởng chỉ tạo ra tác động khi vượt qua được khoảng cách.'],
  ['Guide the golden idea through the gaps between strategy and execution. Every barrier reflects a real reason transformation stalls.', 'Dẫn dắt ý tưởng vàng vượt qua khoảng cách giữa chiến lược và thực thi. Mỗi chướng ngại phản ánh một nguyên nhân thực tế khiến chuyển đổi bị đình trệ.'],
  ['Space or click', 'Phím cách hoặc nhấp chuột'], ['Tap the game', 'Chạm vào trò chơi'], ['Impact', 'Tác động'], ['Best', 'Cao nhất'], ['Current capability', 'Năng lực hiện tại'],
  ['Current State → Future State', 'Hiện trạng → Tương lai'], ['Can your idea', 'Liệu ý tưởng của bạn'], ['make it across?', 'có thể vượt qua?'], ['Build Impact by bridging each business gap.', 'Tạo tác động bằng cách vượt qua từng khoảng cách trong doanh nghiệp.'],
  ['Start the journey', 'Bắt đầu hành trình'], ['The idea stopped at', 'Ý tưởng đã dừng tại'], ['The Execution Gap', 'Khoảng cách thực thi'], ['Impact created', 'Tác động đã tạo'],
  ['Strategy needs ownership, capability and disciplined execution to become impact.', 'Chiến lược cần người chịu trách nhiệm, năng lực và kỷ luật thực thi để trở thành tác động.'], ['Try again', 'Thử lại'], ['Explore Strategy Consulting', 'Khám phá tư vấn chiến lược'],
  ['Motion-sensitive? The game pauses when this tab is not active. No personal data or score is transmitted.', 'Nhạy cảm với chuyển động? Trò chơi sẽ dừng khi tab không hoạt động. Không có dữ liệu cá nhân hay điểm số nào được truyền đi.'],
  ['What the game is teaching', 'Thông điệp của trò chơi'], ['Transformation is a sequence, not a leap.', 'Chuyển đổi là một chuỗi bước, không phải một cú nhảy.'],
  ['Clarity', 'Rõ hướng'], ['Choose the problem and direction that matter.', 'Chọn đúng vấn đề và hướng đi quan trọng.'], ['Strategy', 'Chiến lược'], ['Turn ambition into a coherent set of choices.', 'Biến tham vọng thành một hệ thống lựa chọn nhất quán.'], ['Capability', 'Năng lực'], ['Equip people, systems and partners to deliver.', 'Trang bị con người, hệ thống và đối tác để thực thi.'], ['Adoption', 'Ứng dụng'], ['Make the new way of working usable and owned.', 'Biến cách làm mới thành điều có thể sử dụng và được sở hữu.'], ['Scale', 'Mở rộng'], ['Build evidence, improve and expand what works.', 'Tạo bằng chứng, cải tiến và mở rộng điều hiệu quả.'],
  ['Built with AI. Shaped by judgement.', 'Được xây dựng với AI. Định hình bằng phán đoán.'], ['A playable explanation of Brand Here.', 'Một cách tương tác để hiểu Brand Here.'],
  ["This experiment turns Brand Here's consulting model into an experience. AI accelerated concept exploration, interface copy and code development. Human direction decided what the interaction should teach, how it should feel and what belongs in the final product.", 'Thử nghiệm này biến mô hình tư vấn của Brand Here thành một trải nghiệm. AI tăng tốc quá trình khám phá ý tưởng, viết nội dung giao diện và phát triển mã. Con người quyết định trải nghiệm cần truyền tải điều gì, tạo cảm giác ra sao và điều gì thuộc về sản phẩm cuối cùng.'],
  ['That is the broader point: AI can help a business move faster, but judgement is what makes the result relevant.', 'Đó cũng là thông điệp lớn hơn: AI có thể giúp doanh nghiệp đi nhanh hơn, nhưng phán đoán mới khiến kết quả trở nên phù hợp.'], ['Which gap is holding back your next move?', 'Khoảng cách nào đang cản trở bước đi tiếp theo của bạn?'],

  ['The Alignment Lab — Brand Here', 'Alignment Lab — Mô phỏng sự đồng hướng tổ chức'], ['Brand Here Labs · Strategy', 'Brand Here Labs · Chiến lược'],
  ['Alignment is not', 'Đồng hướng chưa chắc'], ['the goal.', 'đã là đích đến.'],
  ['Three forces govern how any group moves together: separation, alignment and cohesion. Every organisation is running some combination of them right now. Most leaders have never seen what their combination actually produces.', 'Ba lực chi phối cách một tập thể chuyển động: khoảng cách, đồng hướng và gắn kết. Mỗi tổ chức đang vận hành bằng một tổ hợp khác nhau, nhưng phần lớn lãnh đạo chưa từng nhìn thấy trạng thái mà tổ hợp đó tạo ra.'],
  ['The three forces', 'Ba lực tác động'], ['Adjust the balance and watch what emerges. The two numbers underneath are measured from the field in real time, not from your settings — they are what the balance actually produces.', 'Điều chỉnh sự cân bằng và quan sát trạng thái xuất hiện. Hai chỉ số bên dưới được đo trực tiếp từ trường chuyển động, phản ánh điều mà tổ hợp lực thực sự tạo ra.'],
  ['Separation', 'Khoảng cách'], ['How much room each person keeps. High separation protects autonomy and prevents collision.', 'Khoảng không mỗi người giữ lại. Khoảng cách cao bảo vệ tính tự chủ và tránh va chạm.'],
  ['Alignment', 'Đồng hướng'], ['How strongly each person matches the direction of those nearby. This is what most companies mean by "alignment".', 'Mức độ mỗi người điều chỉnh theo hướng của những người xung quanh. Đây là điều phần lớn doanh nghiệp gọi là “alignment”.'],
  ['Cohesion', 'Gắn kết'], ['How strongly each person is pulled toward the centre of the group. Culture, ritual and shared identity live here.', 'Mức độ mỗi người được kéo về trung tâm của tập thể. Văn hóa, nghi thức và bản sắc chung nằm ở đây.'],
  ['Silo', 'Cát cứ'], ['Groupthink', 'Tư duy nhóm'], ['Drift', 'Trôi hướng'], ['Coherent', 'Nhất quán'], ['A model, not a measurement. It is built to make a trade-off visible, not to score your company.', 'Đây là mô hình, không phải phép đo. Nó giúp làm rõ sự đánh đổi, không dùng để chấm điểm doanh nghiệp.'],
  ['The field', 'Trường chuyển động'], ['Each mark represents a person responding to the people around them.', 'Mỗi dấu chấm đại diện cho một người đang phản ứng với những người xung quanh.'], ['Move your cursor across the field. You can influence it. You cannot control it.', 'Di chuyển con trỏ qua trường. Bạn có thể tác động, nhưng không thể kiểm soát hoàn toàn.'], ['Directional order', 'Mức độ đồng hướng'], ['Dispersion', 'Độ phân tán'], ['What this produces', 'Trạng thái tạo ra'], ['Adjust a force to begin.', 'Điều chỉnh một lực để bắt đầu.'], ['Which state is your organisation in? →', 'Tổ chức của bạn đang ở trạng thái nào? →'],

  ['Advisory Decision Lab — Brand Here', 'Advisory Decision Lab — Chẩn đoán quyết định doanh nghiệp'], ['Brand Here Labs · Advisory', 'Brand Here Labs · Tư vấn'], ['Better questions.', 'Câu hỏi tốt hơn.'], ['Sharper decisions.', 'Quyết định sắc hơn.'],
  ['Four lightweight diagnostics reveal where clarity, capability, governance and specialist support may be holding the business back.', 'Bốn chẩn đoán nhanh cho thấy điểm nghẽn về sự rõ ràng, năng lực, quản trị hoặc hỗ trợ chuyên môn.'],
  ['Brand Signal', 'Tín hiệu thương hiệu'], ['AI Readiness', 'Mức độ sẵn sàng AI'], ['Compliance Game', 'Tình huống tuân thủ'], ['Advisory Team', 'Đội ngũ tư vấn'], ['Brand Signal Scanner', 'Kiểm tra tín hiệu thương hiệu'],
  ['Paste the main message from your homepage. The prototype checks whether a buyer can quickly understand who it is for, what it changes and why it is credible.', 'Dán thông điệp chính từ trang chủ. Công cụ sẽ kiểm tra liệu khách hàng có nhanh chóng hiểu thông điệp dành cho ai, tạo ra thay đổi gì và vì sao đáng tin hay không.'], ['Homepage message', 'Thông điệp trang chủ'], ['Scan the signal', 'Phân tích tín hiệu'], ['Local prototype: text stays in your browser.', 'Prototype cục bộ: nội dung chỉ nằm trong trình duyệt.'], ['Clarity score', 'Điểm rõ ràng'], ['Your signal will appear here.', 'Tín hiệu của bạn sẽ xuất hiện tại đây.'], ['Specific audience', 'Đối tượng cụ thể'], ['Clear outcome', 'Kết quả rõ ràng'], ['Credible evidence', 'Bằng chứng đáng tin'], ['Distinct point of view', 'Quan điểm khác biệt'], ['Book a Brand Clarity Review →', 'Đặt lịch rà soát độ rõ thương hiệu →'],
  ['Rate the organisation from 1 (early) to 5 (established).', 'Đánh giá tổ chức từ 1 (mới bắt đầu) đến 5 (đã thiết lập).'], ['Business priority is clear', 'Ưu tiên kinh doanh rõ ràng'], ['Data can be used safely', 'Dữ liệu có thể được sử dụng an toàn'], ['Leaders own adoption', 'Lãnh đạo chịu trách nhiệm về ứng dụng'], ['Governance is practical', 'Quản trị có tính thực tế'], ['Teams can redesign work', 'Đội ngũ có thể thiết kế lại công việc'], ['Calculate readiness', 'Tính mức độ sẵn sàng'], ['Readiness', 'Mức độ sẵn sàng'], ['Move the inputs to begin.', 'Điều chỉnh các thông số để bắt đầu.'], ['Data', 'Dữ liệu'], ['People', 'Con người'], ['Governance', 'Quản trị'], ['Request an AI Readiness Debrief →', 'Đặt lịch trao đổi về mức độ sẵn sàng AI →'],
  ['Compliance Decision Game', 'Tình huống ra quyết định tuân thủ'], ['A team member has pasted identifiable customer information into a public AI tool to draft a sales analysis. What do you do first?', 'Một thành viên đã nhập thông tin nhận diện khách hàng vào công cụ AI công cộng để soạn phân tích bán hàng. Bạn sẽ làm gì trước tiên?'], ['Ask them to delete it and continue privately', 'Yêu cầu xóa và tiếp tục xử lý riêng'], ['Pause use, preserve facts and notify the responsible privacy/security owner', 'Dừng sử dụng, lưu giữ thông tin sự việc và báo cho người phụ trách bảo mật hoặc quyền riêng tư'], ['Ban all generative AI immediately', 'Cấm ngay toàn bộ AI tạo sinh'], ['See the consequence', 'Xem hệ quả'], ['Decision balance', 'Cân bằng quyết định'], ['Risk control', 'Kiểm soát rủi ro'], ['Trust', 'Niềm tin'], ['Operating speed', 'Tốc độ vận hành'], ['Learning', 'Khả năng học hỏi'], ['Choose a response to see its trade-offs.', 'Chọn một phản ứng để xem các đánh đổi.'], ['Educational scenario only—not legal advice. A real incident requires review against applicable law, contracts and company policy.', 'Tình huống chỉ mang tính giáo dục, không phải tư vấn pháp lý. Sự cố thực tế cần được xem xét theo pháp luật, hợp đồng và chính sách công ty áp dụng.'], ['Arrange an AI & Data Risk Workshop →', 'Đặt lịch workshop về rủi ro AI và dữ liệu →'],
  ['Build Your Advisory Team', 'Xây dựng đội ngũ tư vấn'], ['Select the primary challenge.', 'Chọn thách thức chính.'], ['Business challenge', 'Thách thức kinh doanh'], ['New growth or market entry', 'Tăng trưởng mới hoặc vào thị trường'], ['AI transformation and adoption', 'Chuyển đổi và ứng dụng AI'], ['Compliance, privacy and trust', 'Tuân thủ, quyền riêng tư và niềm tin'], ['Executive visibility and credibility', 'Hình ảnh và uy tín lãnh đạo'], ['E-commerce scale', 'Mở rộng e-commerce'], ['Stage', 'Giai đoạn'], ['Diagnose the opportunity', 'Chẩn đoán cơ hội'], ['Design the roadmap', 'Thiết kế lộ trình'], ['Implement and transfer capability', 'Triển khai và chuyển giao năng lực'], ['Assemble the team', 'Đề xuất đội ngũ'], ['Suggested engagement', 'Cấu trúc tư vấn đề xuất'], ['A focused core, specialists when needed.', 'Một đội ngũ cốt lõi tập trung, bổ sung chuyên gia khi cần.'], ['Strategy lead', 'Cố vấn chiến lược'], ['Relevant domain expert', 'Chuyên gia lĩnh vực phù hợp'], ['Execution partner', 'Đối tác triển khai'], ['Brand Here separates consulting fees from approved third-party production and platform costs.', 'Brand Here tách riêng phí tư vấn với chi phí sản xuất, nền tảng hoặc bên thứ ba đã được phê duyệt.'], ['Scope an Advisory Sprint →', 'Xác định phạm vi Advisory Sprint →'],

  ['Commerce Growth Lab — Brand Here', 'Commerce Growth Lab — Mô phỏng tăng trưởng e-commerce'], ['Brand Here Labs · Commerce', 'Brand Here Labs · Thương mại'], ['Growth has to work', 'Tăng trưởng phải đứng vững'], ['on the spreadsheet.', 'trên bảng tính.'],
  ['Test whether the product story, unit economics and market-entry choices can support a functioning e-commerce operation—not just a launch campaign.', 'Kiểm tra liệu câu chuyện sản phẩm, hiệu quả kinh tế đơn hàng và lựa chọn vào thị trường có thể nâng đỡ một hoạt động e-commerce thực sự, chứ không chỉ một chiến dịch ra mắt.'], ['Profitability', 'Khả năng sinh lời'], ['Market Entry', 'Vào thị trường'], ['Listing Makeover', 'Tối ưu trang sản phẩm'], ['Profitability Calculator', 'Tính hiệu quả đơn hàng'], ['Enter values per order in the same currency.', 'Nhập các giá trị trên mỗi đơn hàng bằng cùng một đơn vị tiền tệ.'], ['Selling price', 'Giá bán'], ['Cost of goods', 'Giá vốn'], ['Platform fee (%)', 'Phí nền tảng (%)'], ['Fulfilment and packaging', 'Xử lý đơn hàng và đóng gói'], ['Return / cancellation rate (%)', 'Tỷ lệ hoàn hoặc hủy (%)'], ['Advertising cost per order', 'Chi phí quảng cáo mỗi đơn'], ['Calculate economics', 'Tính hiệu quả kinh tế'], ['Contribution per order', 'Lợi nhuận đóng góp mỗi đơn'], ['Contribution margin', 'Biên lợi nhuận đóng góp'], ['Break-even ROAS', 'ROAS hòa vốn'], ['Maximum CAC', 'CAC tối đa'], ['Profit at 10% discount', 'Lợi nhuận khi giảm giá 10%'], ['Revenue is not the same as profitable growth.', 'Doanh thu không đồng nghĩa với tăng trưởng có lợi nhuận.'], ['Review Your Unit Economics →', 'Rà soát unit economics →'],
  ['Market Entry Simulator', 'Mô phỏng vào thị trường'], ['Choose the commercial context to reveal a first-pass entry path.', 'Chọn bối cảnh thương mại để xem lộ trình vào thị trường ban đầu.'], ['Product category', 'Ngành hàng'], ['Beauty & personal care', 'Làm đẹp và chăm sóc cá nhân'], ['Health & wellness', 'Sức khỏe và chăm sóc toàn diện'], ['Home & lifestyle', 'Nhà cửa và phong cách sống'], ['Food & beverage', 'Thực phẩm và đồ uống'], ['B2B / specialist product', 'Sản phẩm B2B hoặc chuyên biệt'], ['Target market', 'Thị trường mục tiêu'], ['United States', 'Hoa Kỳ'], ['Primary channel', 'Kênh chính'], ['Direct-to-consumer website', 'Website bán trực tiếp đến người tiêu dùng'], ['Current readiness', 'Mức độ sẵn sàng hiện tại'], ['Product only', 'Mới có sản phẩm'], ['Selling locally', 'Đang bán trong nước'], ['Marketplace operation established', 'Đã vận hành ổn định trên sàn'], ['Ready for cross-border scale', 'Sẵn sàng mở rộng xuyên biên giới'], ['Build entry map', 'Tạo bản đồ thâm nhập'], ['Recommended posture', 'Định hướng đề xuất'], ['Validate before you scale.', 'Xác thực trước khi mở rộng.'], ['Customer fit', 'Mức độ phù hợp khách hàng'], ['Channel economics', 'Hiệu quả kinh tế theo kênh'], ['Localisation', 'Bản địa hóa'], ['Compliance', 'Tuân thủ'], ['Fulfilment', 'Vận hành đơn hàng'], ['Build Your Market Entry Plan →', 'Xây dựng kế hoạch vào thị trường →'],
  ['Product Listing Makeover', 'Tối ưu trang sản phẩm'], ['Turn a feature-heavy listing into a clearer hierarchy of buyer, benefit, proof and action.', 'Biến một listing nặng tính năng thành cấu trúc rõ ràng hơn về khách hàng, lợi ích, bằng chứng và hành động.'], ['Product name', 'Tên sản phẩm'], ['Primary customer', 'Khách hàng chính'], ['Key feature', 'Tính năng chính'], ['Primary benefit', 'Lợi ích chính'], ['Proof or trust signal', 'Bằng chứng hoặc tín hiệu tin cậy'], ['Create the makeover', 'Tạo phiên bản mới'], ['Before', 'Trước'], ['After', 'Sau'], ['Daily Reset Serum with 5% niacinamide and ceramides. Buy now.', 'Daily Reset Serum với 5% niacinamide và ceramide. Mua ngay.'], ['Calm the day. Reset your skin.', 'Dịu lại một ngày. Phục hồi làn da.'], ['A daily barrier-support serum for busy professionals with stressed skin.', 'Serum hỗ trợ hàng rào bảo vệ da hằng ngày dành cho người bận rộn có làn da căng thẳng.'], ['Benefit-led headline', 'Tiêu đề dẫn bằng lợi ích'], ['Relevant ingredient proof', 'Bằng chứng thành phần phù hợp'], ['Clear customer and use case', 'Khách hàng và tình huống sử dụng rõ ràng'], ['Request a Product Page Review →', 'Đặt lịch rà soát trang sản phẩm →']
]);

const head = {
  'radio.html': {
    title: 'Brand Here Radio — Âm nhạc nguyên bản có AI hỗ trợ',
    description: 'Nghe MAKE IT MATTER và khám phá cách Brand Here kết hợp chiến lược thương hiệu, định hướng sáng tạo của con người và AI tạo sinh.',
    en: 'radio.html'
  },
  'game.html': {
    title: 'Bridge the Gap — Trải nghiệm tương tác của Brand Here',
    description: 'Trải nghiệm tương tác về khoảng cách giữa chiến lược và thực thi, được Brand Here phát triển với sự hỗ trợ của AI.',
    en: 'game.html'
  },
  'alignment-lab.html': {
    title: 'Alignment Lab — Mô phỏng sự đồng hướng tổ chức',
    description: 'Khám phá sự đánh đổi giữa khoảng cách, đồng hướng và gắn kết trong tổ chức qua mô phỏng tương tác của Brand Here.',
    en: 'alignment-lab.html'
  },
  'advisory-lab.html': {
    title: 'Advisory Decision Lab — Chẩn đoán quyết định doanh nghiệp',
    description: 'Bốn công cụ chẩn đoán nhanh về thương hiệu, mức độ sẵn sàng AI, tuân thủ và đội ngũ tư vấn dành cho doanh nghiệp.',
    en: 'advisory-lab.html'
  },
  'commerce-lab.html': {
    title: 'Commerce Growth Lab — Mô phỏng tăng trưởng e-commerce',
    description: 'Kiểm tra hiệu quả đơn hàng, lựa chọn vào thị trường và cách trình bày sản phẩm trước khi mở rộng e-commerce.',
    en: 'commerce-lab.html'
  }
};

for (const page of pages) {
  const path = resolve(root, 'vi', page);
  let html = readFileSync(path, 'utf8');
  for (const [source, target] of translations) html = html.split(`>${source}<`).join(`>${target}<`);
  html = html
    .replaceAll('aria-label="Toggle navigation"', 'aria-label="Mở điều hướng"')
    .replaceAll('aria-label="Previous track"', 'aria-label="Bài trước"')
    .replaceAll('aria-label="Next track"', 'aria-label="Bài tiếp theo"')
    .replaceAll('aria-label="Track progress"', 'aria-label="Tiến độ bài hát"')
    .replaceAll('aria-label="Synchronized lyrics"', 'aria-label="Lời bài hát đồng bộ"')
    .replaceAll('placeholder="Paste your headline and introduction…"', 'placeholder="Dán tiêu đề và phần giới thiệu…"')
    .replace('Arrange an AI &amp; Data Risk Workshop →', 'Đặt lịch workshop về rủi ro AI và dữ liệu →')
    .replace('<strong>Desktop</strong> Space or click', '<strong>Máy tính</strong> Phím cách hoặc nhấp chuột')
    .replace('<strong>Mobile</strong> Tap the game', '<strong>Điện thoại</strong> Chạm vào trò chơi');
  if (page === 'advisory-lab.html') {
    html = html
      .replace('Business priority is clear <input', 'Ưu tiên kinh doanh rõ ràng <input')
      .replace('Data can be used safely <input', 'Dữ liệu có thể được sử dụng an toàn <input')
      .replace('Leaders own adoption <input', 'Lãnh đạo chịu trách nhiệm về ứng dụng <input')
      .replace('Governance is practical <input', 'Quản trị có tính thực tế <input')
      .replace('Teams can redesign work <input', 'Đội ngũ có thể thiết kế lại công việc <input');
  }
  const meta = head[page];
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${meta.description}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${meta.title}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${meta.description}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${meta.title}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${meta.description}">`);
  if (!html.includes('hreflang="vi"')) {
    html = html.replace(/(<link rel="canonical"[^>]*>)/, `$1\n<link rel="alternate" hreflang="en" href="https://brandhere.co/${meta.en}">\n<link rel="alternate" hreflang="vi" href="https://brandhere.co/vi/${page}">\n<link rel="alternate" hreflang="x-default" href="https://brandhere.co/${meta.en}">`);
  }
  writeFileSync(path, html);
}

const navItems = [
  ['about.html', 'Về chúng tôi'], ['what-we-do.html', 'Dịch vụ'],
  ['approach.html', 'Phương pháp'], ['experts.html', 'Chuyên gia'],
  ['partners.html', 'Đối tác'], ['labs.html', 'Labs'], ['work.html', 'Dự án'], ['insights.html', 'Góc nhìn']
];

for (const page of [...new Set(['index.html', ...pages, 'about.html', 'what-we-do.html', 'approach.html', 'experts.html', 'partners.html', 'labs.html', 'work.html', 'insights.html', 'decision-session.html', 'contact.html'])]) {
  const path = resolve(root, 'vi', page);
  let html = readFileSync(path, 'utf8');
  const links = navItems.map(([href, label]) => `<a${page === href ? ' class="active"' : ''} href="${href}">${label}</a>`).join('');
  html = html.replace(/<div class="nav-links" id="navLinks">[\s\S]*?<\/div>/, `<div class="nav-links" id="navLinks">${links}</div>`);
  html = html.replace(/(<div class="lang-switch"><a href=")[^"]*(">EN<\/a>)/, `$1../${page}$2`);
  writeFileSync(path, html);
}

// Final editorial pass: remove avoidable English from the Vietnamese experience
// while preserving proper names, registered credentials, song lyrics and product names.
const vietnamesePolish = new Map([
  ['Một chương mới, không phải một agency mới.', 'Một chương mới, không chỉ là một công ty truyền thông mới.'],
  ['integrated marketing communications agency', 'công ty truyền thông tiếp thị tích hợp'],
  ['e-commerce, digital transformation', 'thương mại điện tử, chuyển đổi số'],
  ['Prototype cục bộ', 'Bản thử nghiệm cục bộ'],
  ['workshop', 'buổi làm việc chuyên sâu'],
  ['e-commerce', 'thương mại điện tử'],
  ['best-practice framework', 'khung phương pháp thực tiễn tốt'],
  ['để scale và tránh những pilot không bao giờ đi vào production', 'để mở rộng quy mô và tránh những thử nghiệm không bao giờ đi vào vận hành thực tế'],
  ['unit economics', 'hiệu quả kinh tế trên từng đơn hàng'],
  ['product listing', 'trang giới thiệu sản phẩm'],
  ['Decision Map', 'Bản đồ quyết định'],
  ['Ethics, Compliance &amp; Risk', 'Đạo đức, Tuân thủ &amp; Rủi ro'],
  ['MedTech, enterprise risk, third-party risk, business continuity, policy implementation, data privacy', 'công nghệ y tế, rủi ro doanh nghiệp, rủi ro bên thứ ba, duy trì hoạt động kinh doanh, triển khai chính sách và bảo vệ dữ liệu cá nhân'],
  ['accountability, safeguards và controls', 'trách nhiệm giải trình, biện pháp bảo vệ và cơ chế kiểm soát'],
  ['SME', 'doanh nghiệp vừa và nhỏ'],
  ['working capital', 'vốn lưu động'],
  ['Technology Leadership &amp; Digital Platforms', 'Lãnh đạo công nghệ &amp; Nền tảng số'],
  ['fintech, connected devices, game và enterprise applications', 'công nghệ tài chính, thiết bị kết nối, trò chơi và ứng dụng doanh nghiệp'],
  ['engineering leadership', 'năng lực lãnh đạo kỹ thuật'],
  ['delivery risk', 'rủi ro triển khai'],
  ['production systems', 'hệ thống công nghệ vận hành thực tế'],
  ['E-commerce &amp; Growth Marketing Lead', 'Trưởng nhóm Thương mại điện tử &amp; Tiếp thị tăng trưởng'],
  ['full-funnel', 'toàn bộ hành trình chuyển đổi'],
  ['ride-hailing', 'gọi xe công nghệ'],
  ['compliance', 'tuân thủ'],
  ['AI pilot', 'chương trình thử nghiệm AI'],
  ['AI adoption', 'việc ứng dụng AI'],
  ['Finance, Medical, Compliance, Regional Leadership', 'Tài chính, Y khoa, Tuân thủ, Lãnh đạo khu vực'],
  ['market intelligence', 'phân tích thông tin thị trường'],
  ['scenario planning', 'lập kế hoạch theo kịch bản'],
  ['AI governance', 'quản trị AI'],
  ['data privacy', 'bảo vệ dữ liệu và quyền riêng tư'],
  ['thought leadership', 'nội dung dẫn dắt tư duy'],
  ['go-to-market', 'tiếp cận và thâm nhập thị trường'],
  ['use case', 'trường hợp ứng dụng'],
  ['Decision support', 'Hỗ trợ ra quyết định'],
  ['narrative', 'câu chuyện định vị'],
  ['E-commerce', 'Thương mại điện tử'],
  ['merchandising', 'quản trị danh mục và trưng bày sản phẩm'],
  ['forecasting', 'dự báo'],
  ['Case study', 'Câu chuyện dự án'],
  ['case study', 'dự án tiêu biểu'],
  ['stress-test', 'kiểm chứng'],
  ['viết và biên tập website', 'viết và biên tập trang web'],
  ['concept, storytelling, employer branding', 'ý tưởng, kể chuyện và thương hiệu nhà tuyển dụng'],
  ['retail activation', 'hoạt động kích hoạt tại điểm bán'],
  ['xây dựng brief', 'xây dựng đề bài'],
  ['production trọn gói', 'sản xuất trọn gói'],
  ['visual storytelling', 'kể chuyện bằng hình ảnh'],
  ['corporate film', 'phim doanh nghiệp'],
  ['motion graphics', 'đồ họa chuyển động'],
  ['creative direction', 'định hướng sáng tạo'],
  ['hybrid', 'kết hợp'],
  ['Brand anthem', 'Ca khúc thương hiệu'],
  ['Creative brief', 'Đề bài sáng tạo'],
  ['sáng lập agency', 'sáng lập công ty truyền thông'],
  ['Từng xây agency.', 'Từng xây công ty truyền thông.'],
  ['phần lớn agency không có', 'phần lớn công ty truyền thông không có'],
  ['một cơ cấu agency cố định', 'một cơ cấu công ty truyền thông cố định'],
  ['chương trình thử nghiệm AI không bao giờ đi vào production', 'chương trình thử nghiệm AI không bao giờ đi vào vận hành thực tế'],
  ['Nhiều pilot hoạt động tốt trong demo', 'Nhiều thử nghiệm hoạt động tốt trong bản trình diễn'],
  ['Những năm agency', 'Những năm xây dựng công ty truyền thông'],
  ['Những năm corporate', 'Những năm làm việc trong tập đoàn'],
  ['judgement về audience, message', 'khả năng đánh giá đối tượng và thông điệp'],
  ['Founder nên làm gì?', 'Nhà sáng lập nên làm gì?'],
  ['Phát triển concept, quay phim và storytelling dựa trên tiếng nói thật của nhân viên cho hoạt động employer branding.', 'Phát triển ý tưởng, quay phim và kể chuyện dựa trên tiếng nói thật của nhân viên cho hoạt động xây dựng thương hiệu nhà tuyển dụng.'],
  ['được dẫn dắt bằng judgement của con người', 'được dẫn dắt bằng khả năng đánh giá của con người'],
  ['Lựa chọn và trade-off', 'Lựa chọn và đánh đổi'],
  ['Third-party cost được tách riêng.', 'Chi phí bên thứ ba được tách riêng.'],
  ['AI · Compliance', 'AI · Tuân thủ'],
  ['năng lực, adoption và execution', 'năng lực, mức độ ứng dụng và khả năng thực thi'],
  ['Production trọn gói', 'Sản xuất trọn gói'],
  ['chi phí đối tác và production đã được phê duyệt', 'chi phí đối tác và sản xuất đã được phê duyệt'],
  ['quy trình hybrid', 'quy trình kết hợp'],
  ['nhập prompt rồi đăng', 'nhập câu lệnh rồi đăng'],
  ['Đạo đức, Compliance và Quản trị rủi ro', 'Đạo đức, Tuân thủ và Quản trị rủi ro'],
  ['kiểm toán, y tế, MedTech, bán lẻ đến chuỗi cung ứng; bao gồm enterprise risk, third-party risk, điều tra, business continuity, policy implementation và bảo vệ dữ liệu và quyền riêng tư', 'kiểm toán, y tế, công nghệ y tế, bán lẻ đến chuỗi cung ứng; bao gồm rủi ro doanh nghiệp, rủi ro bên thứ ba, điều tra, duy trì hoạt động kinh doanh, triển khai chính sách và bảo vệ dữ liệu cá nhân'],
  ['Bachelor of Commerce tại RMIT University Vietnam', 'bằng Cử nhân Thương mại tại Đại học RMIT Việt Nam'],
  ['FP&amp;A, cash-flow dự báo, management reporting, IFRS, kiểm toán, internal control, thuế, treasury, ERP', 'lập kế hoạch và phân tích tài chính (FP&amp;A), dự báo dòng tiền, báo cáo quản trị, IFRS, kiểm toán, kiểm soát nội bộ, thuế, ngân quỹ, ERP'],
  ['bộ phận finance', 'bộ phận tài chính'],
  ['Credentials gồm', 'Các chứng chỉ chuyên môn gồm'],
  ['fintech, hệ thống thanh toán, connected devices, game, enterprise applications', 'công nghệ tài chính, hệ thống thanh toán, thiết bị kết nối, trò chơi và ứng dụng doanh nghiệp'],
  ['Master of Computer Science', 'bằng Thạc sĩ Khoa học Máy tính'],
  ['Software Engineering', 'Kỹ thuật Phần mềm'],
  ['Technical Lead', 'Trưởng nhóm Kỹ thuật'],
  ['AWS infrastructure, full-stack web platforms, API và CRM', 'hạ tầng AWS, nền tảng web toàn diện, API và hệ thống quản trị quan hệ khách hàng (CRM)'],
  ['Growth Marketing', 'Tiếp thị tăng trưởng'],
  ['FMCG, F&amp;B', 'hàng tiêu dùng nhanh (FMCG), thực phẩm và đồ uống (F&amp;B)'],
  ['The Brand Here Method', 'Phương pháp Brand Here'],
  ['khung phương pháp thực tiễn tốt lý thuyết', 'một khuôn mẫu lý thuyết được cho là tối ưu']
  ,['từ agency đến lãnh đạo thương mại tập đoàn', 'từ công ty truyền thông đến lãnh đạo thương mại tập đoàn']
  ,['aria-label="Play MAKE IT MATTER · MASTER A"', 'aria-label="Phát MAKE IT MATTER · MASTER A"']
  ,['Decision timing:', 'Thời hạn ra quyết định:']
  ,['bằng bằng Thạc sĩ', 'bằng Thạc sĩ']
  ,['trò chơi và ứng dụng doanh nghiệp và tích hợp đối tác', 'trò chơi, ứng dụng doanh nghiệp và tích hợp đối tác']
  ,['việc ứng dụng AI thất bại', 'Việc ứng dụng AI thất bại']
  ,['đánh giá đối tượng và thông điệp và lý do', 'đánh giá đối tượng, thông điệp và lý do']
  ,['Mô hình kinh doanh, tiếp cận và thâm nhập thị trường và mở rộng thị trường', 'Mô hình kinh doanh, chiến lược thâm nhập và mở rộng thị trường']
  ,['<li>quản trị AI, bảo vệ dữ liệu và quyền riêng tư và chương trình đào tạo</li>', '<li>Quản trị AI, bảo vệ dữ liệu, quyền riêng tư và chương trình đào tạo</li>']
  ,['nội dung nội dung dẫn dắt tư duy', 'nội dung dẫn dắt tư duy']
  ,['tốt nghiệp bằng Cử nhân Thương mại', 'có bằng Cử nhân Thương mại']
  ,['các hệ thống công nghệ vận hành thực tế', 'các hệ thống công nghệ thực tế']
]);

const allVietnamesePages = ['index.html', 'about.html', 'what-we-do.html', 'approach.html', 'experts.html', 'partners.html', 'labs.html', 'work.html', 'insights.html', 'radio.html', 'game.html', 'alignment-lab.html', 'advisory-lab.html', 'commerce-lab.html', 'decision-session.html', 'contact.html', 'thank-you.html'];
for (const page of allVietnamesePages) {
  const path = resolve(root, 'vi', page);
  let html = readFileSync(path, 'utf8');
  for (const [source, target] of vietnamesePolish) html = html.split(source).join(target);
  html = html
    .replaceAll('initial-mở rộng quy mô', 'initial-scale')
    .replaceAll('radioLời bài hát', 'radioLyrics')
    .replaceAll('aria-label="Bridge the Gap game. Press space, click or tap to guide the golden idea through business barriers."', 'aria-label="Trò chơi Bridge the Gap. Nhấn phím cách, nhấp chuột hoặc chạm để dẫn ý tưởng vàng vượt qua các rào cản kinh doanh."')
    .replaceAll('aria-label="Play MAKE IT MATTER — Brand Here — MASTER A"', 'aria-label="Phát MAKE IT MATTER — Brand Here — MASTER A"')
    .replaceAll('alt="Alton Nguyen, Founder Brand Here"', 'alt="Alton Nguyen, Nhà sáng lập Brand Here"');
  writeFileSync(path, html);
}

const javascriptPolish = {
  'js/advisory-lab.js': new Map([
    ['Cố vấn chiến lược e-commerce', 'Cố vấn chiến lược thương mại điện tử'],
    ['Chuyên gia marketplace và performance', 'Chuyên gia sàn thương mại điện tử và tiếp thị hiệu suất']
  ]),
  'js/commerce-lab.js': new Map([
    ['chi phí hoặc acquisition trước khi mở rộng', 'chi phí hoặc chi phí thu hút khách hàng trước khi mở rộng'],
    ['Unit economics cơ bản', 'Hiệu quả kinh tế cơ bản'],
    ['overhead cũng hợp lý', 'chi phí quản lý chung cũng hợp lý'],
    ['nền tảng, media và fulfilment', 'nền tảng, truyền thông và xử lý đơn hàng'],
    ['Xác thực claim sản phẩm', 'Xác thực tuyên bố sản phẩm'],
    ['vận hành live commerce', 'hoạt động bán hàng trực tiếp'],
    ['đánh giá, fulfilment và hiệu quả tìm kiếm', 'đánh giá, xử lý đơn hàng và hiệu quả tìm kiếm'],
    ['Lập kế hoạch acquisition, dữ liệu first-party, niềm tin và fulfilment', 'Lập kế hoạch thu hút khách hàng, dữ liệu do doanh nghiệp trực tiếp thu thập, niềm tin và xử lý đơn hàng'],
    ['chạy pilot có kiểm soát', 'chạy thử nghiệm có kiểm soát'],
    ['CTA phù hợp từng kênh', 'lời kêu gọi hành động phù hợp từng kênh']
  ]),
  'js/vi-runtime.js': new Map([
    ['Tình huống Compliance', 'Tình huống tuân thủ'],
    ['unit economics và lựa chọn vào thị trường có đủ sức nâng đỡ một hoạt động e-commerce', 'hiệu quả kinh tế trên từng đơn hàng và lựa chọn vào thị trường có đủ sức nâng đỡ hoạt động thương mại điện tử'],
    ['Tối ưu listing', 'Tối ưu trang giới thiệu sản phẩm'],
    ['Tính unit economics', 'Tính hiệu quả từng đơn hàng'],
    ['Lyrics đồng bộ', 'Lời bài hát đồng bộ'],
    ['Ẩn lyrics', 'Ẩn lời bài hát'],
    ['Creative brief', 'Đề bài sáng tạo'],
    ['chi phí hoặc acquisition trước khi mở rộng', 'chi phí hoặc chi phí thu hút khách hàng trước khi mở rộng'],
    ['Unit economics cơ bản cho phép thử tăng trưởng, nếu repeat purchase và overhead cũng hợp lý', 'Hiệu quả kinh tế cơ bản cho phép thử tăng trưởng, nếu tỷ lệ mua lại và chi phí quản lý chung cũng hợp lý'],
    ['Dán headline và phần giới thiệu', 'Dán tiêu đề và phần giới thiệu'],
    ['Prototype cục bộ', 'Bản thử nghiệm cục bộ'],
    ['Lãnh đạo sở hữu quá trình adoption', 'Lãnh đạo chịu trách nhiệm về việc ứng dụng'],
    ['Governance có tính thực tế', 'Quản trị có tính thực tế'],
    ['các trade-off', 'các đánh đổi'],
    ['Một core team tập trung', 'Một đội ngũ nòng cốt tập trung'],
    ['Fulfilment và đóng gói', 'Xử lý đơn hàng và đóng gói'],
    ['Contribution mỗi đơn', 'Lợi nhuận đóng góp mỗi đơn'],
    ['Biên contribution', 'Biên lợi nhuận đóng góp'],
    ['judgement của con người', 'khả năng đánh giá của con người'],
    ['generative AI', 'AI tạo sinh'],
    ['Đây không phải prompt rồi đăng', 'Đây không phải nhập câu lệnh rồi đăng'],
    ['Lyrics được đồng bộ', 'Lời bài hát được đồng bộ'],
    ['Brand judgement', 'Năng lực đánh giá thương hiệu']
  ])
};

for (const [relativePath, replacements] of Object.entries(javascriptPolish)) {
  const path = resolve(root, relativePath);
  let source = readFileSync(path, 'utf8');
  for (const [from, to] of replacements) source = source.split(from).join(to);
  writeFileSync(path, source);
}

const homePath = resolve(root, 'index.html');
writeFileSync(homePath, readFileSync(homePath, 'utf8').replace('href="vi/index.html">VI', 'href="vi/">VI'));

const englishNavItems = [
  ['about.html', 'About'], ['what-we-do.html', 'What We Do'], ['approach.html', 'Approach'],
  ['experts.html', 'Experts'], ['partners.html', 'Partners'], ['labs.html', 'Labs'],
  ['work.html', 'Work'], ['insights.html', 'Insights']
];
for (const page of ['index.html', 'about.html', 'what-we-do.html', 'approach.html', 'experts.html', 'partners.html', 'labs.html', 'work.html', 'insights.html', 'radio.html', 'game.html', 'alignment-lab.html', 'advisory-lab.html', 'commerce-lab.html', 'decision-session.html', 'contact.html']) {
  const path = resolve(root, page);
  let html = readFileSync(path, 'utf8');
  const links = englishNavItems.map(([href, label]) => `<a${page === href ? ' class="active"' : ''} href="${href}">${label}</a>`).join('');
  html = html.replace(/<div class="nav-links" id="navLinks">[\s\S]*?<\/div>/, `<div class="nav-links" id="navLinks">${links}</div>`);
  writeFileSync(path, html);
}
