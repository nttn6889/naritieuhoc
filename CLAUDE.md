# Nari Tiểu Học — trang học cho bé (phần đầu: Chuẩn bị vào lớp 1, học cùng bé Nam San)

Site tĩnh, kho `nttn6889/naritieuhoc` (tên cũ `be-hoc`). Mẹ chốt tên **Nari Tiểu Học** (7/11/2026): lâu dài theo bé suốt tiểu học
(lớp 1–5, sau có thể thêm mục luyện thi Trạng Nguyên Tiếng Việt — không dùng “Trạng Nguyên” làm tên chính vì trùng tên cuộc thi chính thức).
Trang chủ chia mục theo cấp: hiện có **Chuẩn bị vào lớp 1** (bé 4–6 tuổi), sau thêm Lớp 1, Lớp 2…
Chạy bằng GitHub Pages từ nhánh `main`, thư mục gốc (địa chỉ tạm https://nttn6889.github.io/naritieuhoc/). Tên miền định mua **naritieuhoc.vn**
(+ .com chuyển về); khi có thì thêm file `CNAME` và hướng dẫn mẹ cài DNS (tạm thời có thể dùng `tieuhoc.naritopik.com`).
Dự án tách khỏi Nari TOPIK (kho `narikoreanbox`, `nari-lop`), chỉ chung chữ “Nari” — không trộn nội dung.

- Nam San là con gái của chủ kho, 5 tuổi, là nhân vật của trang. Kho công khai: **không đưa ảnh, ngày sinh, trường lớp hay thông tin riêng nào khác của bé**.
- Người dùng: các mẹ ở Việt Nam, bé chơi bằng ngón tay trên điện thoại / máy tính bảng. Nút to, chữ to, câu ngắn, giọng nhẹ nhàng; có mục “Gợi ý cho mẹ”.
- Chữ cái dạy theo **âm** của sách Tiếng Việt 1 (bờ, cờ…), không theo tên chữ. Viết chữ: chỉ dạy những chữ mẹ gửi vở (20/11: i, t trong `hoc-chu/`), còn lại tô nét / tô số.
- Mỗi bài một thư mục (`so-6-9/`…), một file `index.html` tự chứa (CSS + JS trong file, font Google Baloo 2 + Nunito). Làm bài mới thì thêm thẻ vào `me/index.html`
  (bỏ thẻ “Sắp có” tương ứng), thêm ô ở trang chủ nếu cần, và có nút 🏠 về `../`.
- Giọng đọc: **`giong.js` ở gốc** (gắn `<script src="../giong.js">` trước script của trang; hàm `say` của trang gọi `NTH.say(câu, {rate, pitch, done})`).
  Máy có giọng `vi` → `speechSynthesis`; máy không có giọng Việt (10/11: máy Samsung của mẹ cài app không nghe tiếng, iPhone thì được) hoặc 1,5 giây chưa đọc → giọng dự phòng
  `translate.google.com/translate_tts` (tl=vi) bằng `<audio>`; cả hai hỏng (mất mạng) mới hiện `#voiceNote` “mẹ đọc to giúp bé nhé”.
  15/11: Samsung vẫn không nghe → Google không trả tiếng khi có Referer, nên mọi trang có `<meta name="referrer" content="no-referrer">` (giong.js cũng tự gắn);
  nguồn `translate.google.com` (tw-ob) hỏng thì thử `translate.googleapis.com` (gtx); lần chạm đầu “mở khóa” `<audio>`; máy đã phải dùng giọng mạng thì nhớ `nth-vweb`
  để lần sau đọc ngay. Mẹ chọn tay ở `me/#giong-doc` (Tự chọn / Giọng trên mạng / Giọng của máy + Thử nghe), lưu `nth-voice`.
  Sau đó số nghe được mà chữ cái không: giọng máy báo xong quá nhanh (< min(400ms, 40ms × số ký tự)) thì coi là không ra tiếng → giọng mạng + `nth-vweb`;
  bật lại 🔊 một lần cho mọi trò (`nth-snd-on1` xóa `ncc/nso/ns69/nvs-snd` = 0); trang dừng giọng bằng `NTH.stop()`, không gọi thẳng `speechSynthesis`.
  Nhật ký giọng đọc: `giong.js` ghi 40 dòng cuối (mở trang + UA + số giọng, từng câu đọc, giọng máy/mạng nào, lỗi, lỗi JS trang) vào `nth-vlog`;
  mẹ xem / chụp ở `me/#giong-doc` (ô gập “Nhật ký giọng đọc”). Giọng mạng: mỗi lượt phát có mã riêng, lỗi của lượt cũ bỏ qua (trước đây làm bỏ sót nguồn thứ hai). Trang mới cũng gắn `giong.js`. Sau này có thể thay bằng file mp3 mẹ tự thu.
- **Tên bé** (15/11, mẹ: Nam San thích nghe “Nam San giỏi quá” nhưng bé khác dùng thì phải gọi đúng tên bé đó): lần đầu mở trang chính hiện hộp
  “Bé tên là gì?” (🔊, ô nhập, ✔, Bỏ qua → `nth-name-asked`); đổi / xóa ở `me/#ten-be`. Lưu `nth-name` (chỉ trên máy, lọc ký tự `<>&"'`, tối đa 20).
  Dùng `NTH.name()` / `NTH.ten(1)` (tên hoặc “Bé”) / `NTH.ten()` (tên hoặc “bé”) từ `giong.js`. Lời khen `PRAISE` có “<tên> giỏi lắm!” + “Giỏi quá, <tên> ơi!”,
  tiêu đề “<tên> ơi, mình học …”, nút 👋 tên ở trang chính (chạm → “Chào <tên>!”). **Không viết cứng “Nam San” vào câu đọc / lời khen nữa.**
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

- `hoc-chu/` **Học chữ theo vở** (20/11, mẹ gửi ảnh vở bé đang học: Bài 1 i, Bài 2 t, trang “Làm quen ô li”, mẫu viết i/t có chấm số nét).
  Menu: Bài 1 i · Bài 2 t · Đường kẻ · Viết chữ i · Viết chữ t (ô “Vở của bé” ở Chơi tự do trang chủ, 2 thẻ trong `me/`).
  Bài đọc `#bai-i|bai-t` (bảng `LES`, đi như trang vở): Nhận biết (in thường / in hoa / viết thường = nét SVG / viết hoa = font Dancing Script, tranh khóa, 2 câu lục bát
  **Nari tự viết**) · Tìm tranh có chữ · Luyện đọc (i + 6 dấu; t ghép i a o ô ơ e ê y × 6 dấu, bỏ tõ tỡ tỹ tọ tẹ như vở) · (t) Đọc từ + câu · Nối từ với tranh · Tô đám mây có chữ → ★, rồi sang tập viết.
  Không chép từ / câu / thơ của vở, chỉ theo cấu trúc bài.
  Tập viết `#viet-i|viet-t` (bảng `WR`): **ô li** khung 100 × 146, mỗi li 25, đường kẻ 1–5 ở y 125/100/75/50/25 (số đường kẻ in bên trái), cây trái / nhà phải.
  i cao 2 li: hất (đk2→3) · móc ngược (đk3→1→2) · dấu chấm (nét `dot`, chạm là được). t cao 3 li: hất · lia lên đk4, móc ngược xuống đk1 lên đk2 · nét ngang trên đk3.
  ① xem (số thứ tự nét đỏ ở chỗ đặt bút) ② tô từng nét (judge như viet-so, ngưỡng nhỏ hơn) ③ tự viết (so mẫu, mẫu lật gương = móc quay sai, i thiếu chấm thì nhắc).
  `#duong-ke`: 8 câu chạm đúng đường kẻ n, 4 câu đầu có số, sau tự đếm từ dưới lên. localStorage `nhc-stars`, `nhc-snd`, `nhc-done` (i, t, dk), `nhc-vdone`.
  **21/11 mẹ: bé chưa dùng điện thoại thạo → bài đọc thành trình chiếu** (`slidesOf` / `deck` / `show`): mỗi trang một việc nhỏ (1 dạng chữ, 1 cặp tranh chọn 1,
  1 hàng dấu, 1 từ, 1 câu, 1 câu nối chọn 1 trong 3 tranh, 4 đám mây), ◀ ▶ to, thanh tiến bộ, đúng thì tự sang trang, trang cuối ★ + ✏️ Tập viết.
  Dọc: hàng biểu tượng các phần ở trên; **ngang (≥ 600px): menu các phần bên trái**, ◀ ▶ hai bên. Cỡ chữ / hình theo `cqmin` (`.slide` là container).
  Tập viết, Đường kẻ: `.panel.split` (`.side` lời dặn + nút / `.main` bảng viết) — dọc một cột (order), ngang chia trái / phải.
  Bài tiếp theo trong vở: thêm vào `LES` + `WR`, ô menu, regex `[it]` trong `render()`.

## Dự định
Vần có âm cuối (an, am…) · chữ ghép (ch, nh, ng, gh, ngh…) · số 1–20 · chữ / số dễ nhầm (b–d, p–q, 2–5) · phiếu tô in A4.
