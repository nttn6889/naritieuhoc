# Nari Tiểu Học — trang học cho bé (phần đầu: Chuẩn bị vào lớp 1, học cùng bé Nam San)

Site tĩnh, kho `nttn6889/naritieuhoc` (tên cũ `be-hoc`). Mẹ chốt tên **Nari Tiểu Học** (7/11/2026): lâu dài theo bé suốt tiểu học
(lớp 1–5, sau có thể thêm mục luyện thi Trạng Nguyên Tiếng Việt — không dùng “Trạng Nguyên” làm tên chính vì trùng tên cuộc thi chính thức).
Trang chủ chia mục theo cấp: hiện có **Chuẩn bị vào lớp 1** (bé 4–6 tuổi), sau thêm Lớp 1, Lớp 2…
Chạy bằng GitHub Pages từ nhánh `main`, thư mục gốc (địa chỉ tạm https://nttn6889.github.io/naritieuhoc/). Tên miền định mua **naritieuhoc.vn**
(+ .com chuyển về); khi có thì thêm file `CNAME` và hướng dẫn mẹ cài DNS (tạm thời có thể dùng `tieuhoc.naritopik.com`).
Dự án tách khỏi Nari TOPIK (kho `narikoreanbox`, `nari-lop`), chỉ chung chữ “Nari” — không trộn nội dung.

- Nam San là con gái của chủ kho, 5 tuổi, là nhân vật của trang. Kho công khai: **không đưa ảnh, ngày sinh, trường lớp hay thông tin riêng nào khác của bé**.
- Người dùng: các mẹ ở Việt Nam, bé chơi bằng ngón tay trên điện thoại / máy tính bảng. Nút to, chữ to, câu ngắn, giọng nhẹ nhàng; có mục “Gợi ý cho mẹ”.
- Chữ cái dạy theo **âm** của sách Tiếng Việt 1 (bờ, cờ…), không theo tên chữ. Chưa dạy viết chữ, chỉ tô nét / tô số.
- Mỗi bài một thư mục (`so-6-9/`…), một file `index.html` tự chứa (CSS + JS trong file, font Google Baloo 2 + Nunito). Làm bài mới thì thêm thẻ vào `index.html` ở gốc
  (bỏ thẻ “Sắp có” tương ứng) và có nút “‹ Tất cả bài” về `../`.
- Giọng đọc: `speechSynthesis` tiếng Việt (`vi-VN`) của máy; máy không có giọng Việt thì hiện “mẹ đọc to giúp bé nhé”. Sau này có thể thay bằng file mp3 mẹ tự thu.
- Màu: cam `#F07A35` / xanh `#2E7BE0` trên nền `#EEF5FF`. Trong trò chơi phân biệt, các số cùng một màu mực để bé nhìn hình dáng chứ không nhìn màu.
- Sao thưởng, cài đặt lưu localStorage (`ns69-stars`, `ns69-snd`); bọc try/catch.
- Kiểm tra bằng Playwright khung 390px trước khi push.

## Logo (mẹ chốt 7/11: hướng A bản 1)
- Cùng họ logo Nari TOPIK: quyển sách mở + nét lượn chép nguyên (tím `#53468F` / vàng `#D4A843`), thay tháp Namsan bằng **bút chì cam** (`#F07A35`, khâu xanh `#2E7BE0`)
  đầu là **ngôi sao vàng**. Chữ “Nari” tím + “Tiểu Học” cam (Baloo 2), khẩu hiệu **Vui từng bài – Vững từng lớp** (xanh). Nền ảnh đại diện `#EFEAF8`.
- `logo/nari-tieu-hoc-bieu-tuong.svg` (chỉ hình), `-icon.svg` (tròn nền tím nhạt, dùng làm favicon), `-icon-180.png`, `-icon-512.png`. Bản nháp so sánh: https://claude.ai/artifact/Hx35G27AocMsH4fewNaebf
- Chưa làm: logo có chữ đổi thành nét vẽ (như `tools/logo/mklogo.py` của narikoreanbox), bản đơn giản cho cỡ rất nhỏ.

## Trang chủ (`index.html`)
Đầu trang logo ngang · khối mở đầu (Bạn Sáu, Bạn Chín, nút vào bài) · thanh cấp học Vào lớp 1 → Lớp 5 (chỉ “Vào lớp 1” đang học) · mục Chuẩn bị vào lớp 1 chia
thẻ kỹ năng Số đếm / Chữ cái / Tô nét (bài có thì là link xanh “Chơi ›”, chưa có thì “Sắp có”) · Học như thế nào (3 bước) · Gợi ý cho mẹ · chân trang.

## Bài đã có
- `so-6-9/` Số 6 và số 9 (bé Nam San chưa nhớ 6, 9 khi đếm ngược 12 → 1): Làm quen (Bạn Sáu tròn dưới / Bạn Chín tròn trên, cách viết, chấm 5+1 / 5+4,
  lộn ngược 6 thành 9) · Tìm số · Đếm hình · Đếm ngược / xuôi 12 ↔ 1 (lượt đầu thiếu 6, 9; lượt sau thiếu thêm) · Tập viết (tô theo nét, chấm đỏ chỗ chưa tô).
  Link `so-6-9/#lam-quen|tim-so|dem-hinh|dem-nguoc|tap-viet`. Bản đầu nằm ở artifact https://claude.ai/artifact/H1vNUgXtd4M9QFL5VfdJMJ (giờ sửa ở kho này).
- `chu-cai/` 29 chữ cái theo âm (a, á(ă), ớ(â), bờ, cờ…; k “ca”, q “cu”, y “i dài”), mỗi chữ một từ + tranh emoji (bảng `RAW` trong file).
  Mẹ chọn nhóm chữ (Tất cả · a ă â · o ô ơ · e ê i y u ư · b c d đ g h · k l m n p q · r s t v x), các trò lấy chữ trong nhóm.
  Làm quen (thẻ chữ to, chữ hoa, từ gạch chân chữ, bảng chữ cam = nguyên âm / xanh = phụ âm) · Nghe và chọn (5 câu) ·
  Tranh có âm gì (từ thiếu một chữ, 5 câu) · Tìm chữ (lưới 12, nhiễu bằng chữ dễ nhầm `CONF`). Trò nghe không cho â/ơ, i/y đứng cùng nhau.
  localStorage `ncc-stars`, `ncc-snd`, `ncc-grp`. Link `chu-cai/#lam-quen|nghe-chon|tranh|tim-chu`.

## Dự định
Ghép âm (ba, bà…) · chữ ghép (ch, nh, ng, gh, ngh…) · số 1–20 · chữ / số dễ nhầm (b–d, p–q, 2–5) · phiếu tô in A4.
