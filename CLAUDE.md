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
- Mỗi bài một thư mục (`so-6-9/`…), một file `index.html` tự chứa (CSS + JS trong file, font Google Baloo 2 + Nunito). Làm bài mới thì thêm thẻ vào `me/index.html`
  (bỏ thẻ “Sắp có” tương ứng), thêm ô ở trang chủ nếu cần, và có nút 🏠 về `../`.
- Giọng đọc: `speechSynthesis` tiếng Việt (`vi-VN`) của máy; máy không có giọng Việt thì hiện “mẹ đọc to giúp bé nhé”. Sau này có thể thay bằng file mp3 mẹ tự thu.
- Màu: cam `#F07A35` / xanh `#2E7BE0` trên nền `#EEF5FF`. Trong trò chơi phân biệt, các số cùng một màu mực để bé nhìn hình dáng chứ không nhìn màu.
- Sao thưởng, cài đặt lưu localStorage (`ns69-stars`, `ns69-snd`); bọc try/catch.
- Kiểm tra bằng Playwright khung 390px trước khi push.
- **Cài như app** (8/11, máy Samsung của mẹ không thêm được vào màn hình chính): `manifest.webmanifest` ở gốc (start_url `./`, icon 192/512 + maskable 512 nền `#EFEAF8`),
  `sw.js` ở gốc (lấy mạng trước, mất mạng dùng bản lưu, cache `nth-v1`). Trang mới phải gắn `<link rel="manifest" href="../manifest.webmanifest">`, `theme-color`
  và dòng đăng ký `sw.js` (scope `../`) trước `</body>` như các bài đã có.

## Logo (mẹ chốt 7/11: hướng A bản 1)
- Cùng họ logo Nari TOPIK: quyển sách mở + nét lượn chép nguyên (tím `#53468F` / vàng `#D4A843`), thay tháp Namsan bằng **bút chì cam** (`#F07A35`, khâu xanh `#2E7BE0`)
  đầu là **ngôi sao vàng**. Chữ “Nari” tím + “Tiểu Học” cam (Baloo 2), khẩu hiệu **Vui từng bài – Vững từng lớp** (xanh). Nền ảnh đại diện `#EFEAF8`.
- `logo/nari-tieu-hoc-bieu-tuong.svg` (chỉ hình), `-icon.svg` (tròn nền tím nhạt, dùng làm favicon), `-icon-180.png`, `-icon-512.png`. Bản nháp so sánh: https://claude.ai/artifact/Hx35G27AocMsH4fewNaebf
- Chưa làm: logo có chữ đổi thành nét vẽ (như `tools/logo/mklogo.py` của narikoreanbox), bản đơn giản cho cỡ rất nhỏ.

## Thiết kế “app cho bé” (mẹ dặn 8/11)
App dành cho **bé dùng trước**: gần như không có chữ, không có hướng dẫn cho mẹ trên màn của bé; lời dặn nào cũng nói với bé và có nút 🔊 để nghe.
Lựa chọn nào cũng là **ô to có màu + hình riêng + 1–2 chữ**, chạm là cô đọc tên rồi mới vào. Mọi nội dung cho mẹ gom về `me/` (Góc của mẹ)
hoặc ô gập “👩 Dành cho mẹ ›” cuối trang mỗi trò.
- Trong mỗi trò (`so-6-9`, `chu-cai`, `viet-so`): thanh trên chỉ có biểu tượng 🏠 (về trang chính) / ⬅ (về menu trò) · ★ số sao · 🔊/🔇.
  Khối CSS + JS “app cho bé” giống nhau ở cả 3 file: `kidTiles()` (ô `.menu .tile` 2 cột, 3 cột màn rộng, nền lấy màu biểu tượng, ẩn “Bài n” và dòng mô tả,
  chạm → `say(tên)` rồi `go`), `kidHello()` (nút 🔊 tròn trong `.hero`, đọc tiêu đề + câu phụ đã ẩn), `kidEars()` (nút 🔊 cạnh mỗi `.panel>h1/h2`,
  đọc tiêu đề + dòng `.hint`/`.ask` ngay sau). Gọi trong `render()`. Trò mới làm cùng cách này.
- `chu-cai`: chọn nhóm chữ là việc của mẹ → nằm trong “Dành cho mẹ”; trang đầu: menu 5 trò rồi bảng “Học từng chữ”.

## Trang chủ (`index.html`) và Góc của mẹ (`me/`)
Trang chủ chỉ cho bé (tiền tiểu học, 4–6 tuổi), mẹ chốt 8/11 dạng **lộ trình**: logo · khối **Đường đến lớp 1** (🔊, thanh tiến bộ 🧒→🏫, ★ x/40,
kệ 8 bạn thú 🐶🐱🐰🐼🦊🐯🦄🦁 — mỗi 5 bài xong mở 1 hộp quà, lần đầu mở có màn chúc mừng, localStorage `nth-gifts`) · nút ▶ to vào bài đang học
(bài đầu tiên chưa xong) · **con đường** 40 bài uốn lượn: 29 chữ theo thứ tự `BOOK` (ô tròn, cam nguyên âm / xanh phụ âm → `chu-cai/#bai-<chữ>`)
xen 11 bài số (ô vuông tím: 1…9 → `so/#so-n`, “6 9” ôn → `so-6-9/`, rồi 0), cứ 5 bài một 🎁, cuối là 🏫 Lớp 1. Bài xong có ★ (đọc `ncc-done`,
`nso-done`; bài 6 9 tính xong khi đã vào, `nth-seen`). Không khóa bài. Thứ tự tính trong JS (`numAt`): bài số đặt ở `floor((k+.5)*40/11)`.
· **Chơi tự do**: 4 ô Số (→ `so/`) · Chữ cái · Đánh vần · Tập viết. Chạm bài / ô: cô đọc tên (`data-say`) rồi chuyển trang · nút nhỏ “👩 Góc của mẹ” → `me/` · chân trang.
`me/index.html`: giới thiệu cho mẹ, danh sách bài chi tiết theo kỹ năng (Số đếm / Chữ cái / Tô nét; “Chơi ›” hoặc “Sắp có”), Học như thế nào,
Gợi ý cho mẹ, ô gập “Lên tiểu học: Lớp 1 – Lớp 5 · sắp có”. Bài mới: thêm ô ở trang chủ (nếu là trò mới cho bé) **và** thẻ trong `me/`.

## Bài đã có
- `so/` **10 chữ số 0–9** (8/11): trang đầu lưới 10 ô số (màu riêng `COL`/`CBG`, chấm đếm, ★ khi xong) + ô Sáu và Chín · Tập viết · Ai đứng đúng.
  Bài `#so-n` 4 bước (biểu tượng 👀 🍎 🔍 ✏️ ở đầu, chạm để nhảy bước): Làm quen (số to, chạm từng đồ vật để đếm “một, hai…”, 0 = đĩa trống) ·
  Đếm hình (3 lượt, chọn 1 trong 3 số, nhiễu `CONF` + số liền kề) · Tìm số (lưới 12, 3 số đúng) → xong thì `nso-done[n]=1`, ★, hộp chúc mừng ✏️ / ➡ số tiếp / 🏠 ·
  Tập viết → `viet-so/#so-n`. Thứ tự học 1→9 rồi 0. localStorage `nso-stars`, `nso-snd`, `nso-done`.
- `so-6-9/` Số 6 và số 9 (bé Nam San chưa nhớ 6, 9 khi đếm ngược 12 → 1): Làm quen (Bạn Sáu tròn dưới / Bạn Chín tròn trên, cách viết, chấm 5+1 / 5+4,
  lộn ngược 6 thành 9) · Tìm số · Đếm hình · Đếm ngược / xuôi 12 ↔ 1 (lượt đầu thiếu 6, 9; lượt sau thiếu thêm) · Tập viết (tô theo nét, chấm đỏ chỗ chưa tô).
  Link `so-6-9/#lam-quen|tim-so|dem-hinh|dem-nguoc|tap-viet`. Bản đầu nằm ở artifact https://claude.ai/artifact/H1vNUgXtd4M9QFL5VfdJMJ (giờ sửa ở kho này).
- `chu-cai/` 29 chữ cái theo âm (a, á(ă), ớ(â), bờ, cờ…; k “ca”, q “cu”, y “i dài”), mỗi chữ một từ + tranh emoji (bảng `RAW` trong file).
  Mẹ chọn nhóm chữ (Tất cả · a ă â · o ô ơ · e ê i y u ư · b c d đ g h · k l m n p q · r s t v x), các trò lấy chữ trong nhóm.
  Làm quen (thẻ chữ to, chữ hoa, từ gạch chân chữ, bảng chữ cam = nguyên âm / xanh = phụ âm) · Nghe và chọn (5 câu) ·
  Tranh có âm gì (từ thiếu một chữ, 5 câu) · Tìm chữ (lưới 12, nhiễu bằng chữ dễ nhầm `CONF`). Trò nghe không cho â/ơ, i/y đứng cùng nhau.
  **Bài từng chữ** `#bai-<chữ>` theo cách sách Tiếng Việt 1 (Kết nối tri thức): bảng `BOOK` xếp chữ theo thứ tự sách
  (a, b+huyền, c+sắc, e, ê, o+hỏi, ô+nặng, d, đ, ơ+ngã, i, k, h, l, u, ư, m, n, g, r, s, t, q, v, x, y; ă, â, p để sau vì đi cùng vần / ph),
  mỗi bài: tiếng mẫu, từ ngữ có nghĩa + tranh, câu. **Từ và câu do Nari tự viết (không chép sách), chỉ dùng chữ + dấu đã học tới bài đó**
  để bé tự đánh vần được — thêm từ mới phải giữ luật này (kiểm bằng script so chữ/dấu với các bài trước).
  Các bước: Nhận biết (tranh + câu nghe, gạch chân chữ) · Âm mới (chữ, `SHAPE`, dấu mới, 3 tranh `WORDS`) · Đánh vần (tiếng mẫu, chỉ hiện dấu đã học; từ ngữ chạm
  để nghe “bờ – o – bo – huyền – bò”) · Tai thính (3 lượt; nhiễu tránh âm giống `EAR`) · Tìm chữ · Đọc câu (chạm từng tiếng, cô đọc mẫu, “Mẹ hỏi bé” nói theo tranh).
  **Đánh vần** `#danh-van`: chọn phụ âm + nguyên âm → “bờ – a – ba”, 6 dấu thanh “ba – huyền – bà”; tự đổi c→k, g→gh trước e ê i, q→qu (qui→quy) và nhắc luật;
  tiếng có nghĩa hiện tranh (`MEAN`), dưới có “Từ có nghĩa bắt đầu bằng …” lấy từ `BOOK` + `MEAN`. Cuối trang có “Dạy bé đánh vần thế nào?”.
  localStorage `ncc-stars`, `ncc-snd`, `ncc-grp`, `ncc-done`. Link `chu-cai/#lam-quen|nghe-chon|tranh|tim-chu|danh-van|bai-b`.
  Ghi chú: công cụ ghi file có thể đổi `\u0300`… thành ký tự dấu ghép thật trong JS — vẫn chạy đúng.

- `viet-so/` Tập viết số 0–9 (8/11: Nam San viết 6, 9 ngược — móc quay sai phía). Bảng viết có **🌳 cây bên trái, 🏠 nhà bên phải** làm mốc hướng,
  3 dòng kẻ (khung 100 × 146: trên y 16, giữa 72, dưới 130). Mỗi số = các bước trong `D` ([đoạn nét SVG, lời hướng dẫn “về phía cây / nhà”], `tip`).
  ① Xem cách viết (nét chạy từng bước, chấm bút đi theo, chạm bước để xem lại) · ② Tô từng nét (chỉ hiện nét của bước đang làm: chấm xanh đặt bút, mũi tên, vòng đỏ cuối;
  `judge` kiểm tra đi theo đường, phủ ≥ 80 % và **chiều đi** — đi ngược thì xóa, nhắc “bắt đầu ở chấm xanh”) · ③ Tự viết (không có mẫu; so với mẫu và với **mẫu lật gương**,
  giống bản lật hơn thì báo “số bị quay ngược” + `tip`). Trò **Ai đứng đúng?** `#dung-nguoc` (chọn số đúng giữa số thật và số lật gương, 8 câu, nhiều 6 và 9).
  localStorage `nvs-stars`, `nvs-snd`, `nvs-done`. Link `viet-so/#so-6`. Thẻ ở mục Tô nét trang chủ; `so-6-9/#tap-viet` có nút sang đây.

## Dự định
Vần có âm cuối (an, am…) · chữ ghép (ch, nh, ng, gh, ngh…) · số 1–20 · chữ / số dễ nhầm (b–d, p–q, 2–5) · phiếu tô in A4.
