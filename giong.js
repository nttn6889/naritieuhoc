/* Nari Tiểu Học — giọng đọc tiếng Việt dùng chung cho mọi trang.
   1. Máy có giọng tiếng Việt (iPhone, phần lớn máy dùng Chrome) → speechSynthesis của máy (đọc được cả khi mất mạng).
   2. Máy không có giọng tiếng Việt (nhiều máy Samsung, nhất là app cài từ Samsung Internet), hoặc 1,5 giây chưa bắt đầu đọc
      → giọng dự phòng trên mạng (Google) phát bằng <audio>. Lần sau máy nhớ (nth-vweb) để đọc ngay, khỏi chờ.
   3. Cả hai đều không được (mất mạng, không có giọng) → hiện #voiceNote “mẹ đọc to giúp bé”.
   Mẹ chọn tay trong Góc của mẹ: localStorage nth-voice = 'auto' | 'may' (giọng của máy) | 'web' (giọng trên mạng).
   Google không trả tiếng khi yêu cầu mang theo địa chỉ trang (Referer) → trang dùng referrer no-referrer.
   Dùng: NTH.say(câu, {rate, pitch, done}) · NTH.stop() · NTH.mode([m]) · NTH.info(). */
(function(){
  /* không gửi Referer, nếu không Google trả lỗi cho giọng dự phòng */
  try{
    if(!document.querySelector('meta[name="referrer"]')){
      var m = document.createElement('meta'); m.name = 'referrer'; m.content = 'no-referrer';
      (document.head || document.documentElement).appendChild(m);
    }
  }catch(e){}
  /* 15/11: trước khi sửa giọng, mẹ có thể đã bấm 🔊 (thành 🔇) khi thử cho có tiếng → bật lại tiếng một lần cho mọi trò */
  try{
    if(!localStorage.getItem('nth-snd-on1')){
      ['ncc-snd', 'nso-snd', 'ns69-snd', 'nvs-snd'].forEach(function(k){ var v = localStorage.getItem(k); if(v === '0' || v === 'false') localStorage.removeItem(k); });
      localStorage.setItem('nth-snd-on1', '1');
    }
  }catch(e){}
  var ss = window.speechSynthesis || null, voices = [], vi = null, au = null, seq = 0, unlocked = false;
  function get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function set(k, v){ try{ if(v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); }catch(e){} }
  /* nhật ký giọng đọc (40 dòng cuối, localStorage nth-vlog) để mẹ chụp màn hình gửi khi máy không nghe tiếng; xem ở me/#giong-doc */
  function log(m){
    try{
      var a = JSON.parse(localStorage.getItem('nth-vlog') || '[]'), d = new Date();
      a.push(('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2) + ' ' +
        (location.pathname.split('/').slice(-2, -1)[0] || '/') + (location.hash || '') + ' · ' + m);
      localStorage.setItem('nth-vlog', JSON.stringify(a.slice(-40)));
    }catch(e){}
  }
  try{ window.addEventListener('error', function(e){ log('LỖI TRANG: ' + (e.message || '?') + ' @' + (e.lineno || '')); }); }catch(e){}
  function load(){
    try{ voices = ss ? (ss.getVoices() || []) : []; }catch(e){ voices = []; }
    vi = voices.filter(function(v){ return /^vi/i.test(v.lang); })[0] || null;
  }
  if(ss){ load(); try{ ss.addEventListener('voiceschanged', load); }catch(e){} }
  setTimeout(function(){ load(); log('mở trang · giọng máy: ' + (ss ? voices.length + ' giọng, tiếng Việt: ' + (vi ? vi.name : 'không') : 'không có') +
    ' · chế độ: ' + (get('nth-voice') || 'auto') + (get('nth-vweb') ? ' (đã nhớ giọng mạng)' : '') + ' · ' + navigator.userAgent.replace(/^Mozilla\/5\.0 /, '').slice(0, 140)); }, 400);
  function note(show){ var n = document.getElementById('voiceNote'); if(n) n.hidden = !show; }
  function mode(){ var v = get('nth-voice'); return v === 'may' || v === 'web' ? v : 'auto'; }
  /* lần chạm đầu tiên: “mở khóa” loa cho <audio> (Android chặn phát tiếng khi chưa chạm) */
  var SILENT = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
  function unlock(){
    if(unlocked) return; unlocked = true;
    try{
      if(!au){ au = new Audio(); au.preload = 'auto'; }
      if(!au.src || au.paused){ au.src = SILENT; var p = au.play(); if(p && p.catch) p.catch(function(){}); }
    }catch(e){}
  }
  ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(function(ev){
    try{ window.addEventListener(ev, unlock, {capture: true, passive: true}); }catch(e){}
  });
  /* câu dài thì chia nhỏ (giọng mạng nhận tối đa ~200 chữ) */
  function parts(t){
    var out = [], cur = '';
    (String(t).match(/[^.!?,;:…]+[.!?,;:…]*\s*/g) || [String(t)]).forEach(function(s){
      s = s.trim(); if(!s) return;
      if((cur + ' ' + s).length > 180 && cur){ out.push(cur); cur = s; } else cur = cur ? cur + ' ' + s : s;
    });
    if(cur) out.push(cur);
    return out.length ? out : [String(t)];
  }
  var srcOk = 0; /* nguồn giọng mạng đã chạy được thì lần sau dùng luôn */
  var SRC = [
    'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=vi&q=',
    'https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=vi&q='
  ];
  function web(t, o, my){
    var list = parts(t), i = 0, s = srcOk, k = 0; /* k: lượt phát, lỗi của lượt cũ thì bỏ qua */
    if(!au){ au = new Audio(); au.preload = 'auto'; }
    try{ au.referrerPolicy = 'no-referrer'; au.setAttribute('referrerpolicy', 'no-referrer'); }catch(e){}
    function fail(e, kk){
      if(my !== seq || kk !== k) return;
      k += 1000; /* lượt này đã xử lý lỗi rồi */
      log('giọng mạng ' + (s + 1) + ' lỗi: ' + (e && e.name ? e.name : 'mã ' + (au.error ? au.error.code : '?')));
      /* NotAllowedError = trình duyệt chặn tự phát khi bé chưa chạm màn hình → im lặng, không báo lỗi */
      if(e && e.name === 'NotAllowedError'){ o.fin(); return; }
      if(s < SRC.length - 1){ s++; srcOk = s; play(); return; } /* nguồn này hỏng thì thử nguồn kia */
      note(true); o.fin();
    }
    function play(){
      var kk = ++k;
      au.onended = function(){ if(my !== seq || kk !== k) return; i++; next(); };
      au.onerror = function(){ fail(null, kk); };
      au.onplaying = function(){ if(my === seq){ note(false); log('giọng mạng ' + (s + 1) + ' đang phát'); if(mode() === 'auto') set('nth-vweb', '1'); } };
      au.src = SRC[s] + encodeURIComponent(list[i]);
      au.playbackRate = o.rate < .9 ? .9 : 1;
      var p; try{ p = au.play(); }catch(e){ fail(e, kk); return; }
      if(p && p.catch) p.catch(function(e){ fail(e, kk); });
    }
    function next(){
      if(my !== seq) return;
      if(i >= list.length){ o.fin(); return; }
      play();
    }
    next();
  }
  function stop(){
    seq++;
    try{ if(au){ au.onended = au.onerror = au.onplaying = null; au.pause(); } }catch(e){}
    try{ if(ss && (ss.speaking || ss.pending)) ss.cancel(); }catch(e){}
  }
  function say(t, opt){
    opt = opt || {};
    var fired = false, o = {rate: opt.rate || .85, pitch: opt.pitch || 1.1,
      fin: function(){ if(!fired){ fired = true; if(opt.done) opt.done(); } }};
    stop();
    var my = seq;
    if(!t){ o.fin(); return; }
    load();
    var md = mode();
    log('đọc “' + String(t).slice(0, 24) + '”');
    if(md === 'web' || !ss){ web(t, o, my); return; }
    if(md === 'auto' && ((voices.length && !vi) || get('nth-vweb'))){ web(t, o, my); return; }
    try{
      var u = new SpeechSynthesisUtterance(t), started = false;
      u.lang = 'vi-VN'; if(vi) u.voice = vi; u.rate = o.rate; u.pitch = o.pitch;
      var t0 = 0;
      u.onstart = function(){ log('giọng máy bắt đầu'); started = true; t0 = Date.now(); note(false); };
      u.onend = function(){
        if(my === seq && t0) log('giọng máy đọc xong sau ' + (Date.now() - t0) + 'ms');
        if(my !== seq){ o.fin(); return; }
        /* máy báo đọc xong ngay mà không ra tiếng (giọng Việt chưa tải về, nhiều máy Android) → dùng giọng mạng, lần sau dùng luôn */
        var quick = !t0 || Date.now() - t0 < Math.min(400, String(t).length * 40);
        if(quick && md === 'auto'){ log('giọng máy xong quá nhanh (' + (t0 ? Date.now() - t0 + 'ms' : 'không bắt đầu') + ') → giọng mạng'); started = true; set('nth-vweb', '1'); web(t, o, my); return; }
        started = true; o.fin();
      };
      u.onerror = function(e){ log('giọng máy lỗi: ' + e.error); if(!started && my === seq && e.error !== 'interrupted' && e.error !== 'canceled'){ if(md === 'may'){ note(true); o.fin(); } else web(t, o, my); } };
      setTimeout(function(){ if(my === seq) ss.speak(u); }, 60); /* Android hay nuốt câu nói ngay sau cancel */
      setTimeout(function(){
        if(started || my !== seq || ss.speaking) return;
        log('giọng máy 1,5 giây chưa đọc');
        try{ ss.cancel(); }catch(e){}
        if(md === 'may'){ note(true); o.fin(); } else web(t, o, my);
      }, 1500);
    }catch(e){ if(md === 'may'){ note(true); o.fin(); } else web(t, o, my); }
  }
  window.NTH = {
    say: say, stop: stop, log: log,
    /* tên bé (mẹ nhập lần đầu ở trang chính, đổi ở Góc của mẹ), localStorage nth-name, chỉ trên máy này.
       NTH.name() đọc, NTH.name('An') đặt, NTH.name('') xóa · NTH.ten(1) = tên hoặc “Bé” (đầu câu) / NTH.ten() = tên hoặc “bé” */
    name: function(v){
      if(v !== undefined){ v = String(v).replace(/[<>&"'`\\]/g, '').replace(/\s+/g, ' ').trim().slice(0, 20); set('nth-name', v || null); }
      return (get('nth-name') || '').trim();
    },
    ten: function(cap){ var n = (get('nth-name') || '').trim(); return n || (cap ? 'Bé' : 'bé'); },
    logText: function(){ try{ return JSON.parse(localStorage.getItem('nth-vlog') || '[]').join('\n'); }catch(e){ return ''; } },
    logClear: function(){ set('nth-vlog', null); },
    /* NTH.mode() đọc, NTH.mode('auto'|'may'|'web') đặt; đặt lại thì quên điều máy đã tự học */
    mode: function(m){ if(m){ set('nth-voice', m === 'auto' ? null : m); set('nth-vweb', null); } return mode(); },
    info: function(){ load(); return {may: !!ss, voices: voices.length, vi: vi ? vi.name : '', mode: mode(), webRemembered: !!get('nth-vweb')}; }
  };
})();
