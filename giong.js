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
  var ss = window.speechSynthesis || null, voices = [], vi = null, au = null, seq = 0, unlocked = false;
  function get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function set(k, v){ try{ if(v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); }catch(e){} }
  function load(){
    try{ voices = ss ? (ss.getVoices() || []) : []; }catch(e){ voices = []; }
    vi = voices.filter(function(v){ return /^vi/i.test(v.lang); })[0] || null;
  }
  if(ss){ load(); try{ ss.addEventListener('voiceschanged', load); }catch(e){} }
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
  var SRC = [
    'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=vi&q=',
    'https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=vi&q='
  ];
  function web(t, o, my){
    var list = parts(t), i = 0, s = 0;
    if(!au){ au = new Audio(); au.preload = 'auto'; }
    try{ au.referrerPolicy = 'no-referrer'; au.setAttribute('referrerpolicy', 'no-referrer'); }catch(e){}
    function fail(e){
      if(my !== seq) return;
      /* NotAllowedError = trình duyệt chặn tự phát khi bé chưa chạm màn hình → im lặng, không báo lỗi */
      if(e && e.name === 'NotAllowedError'){ o.fin(); return; }
      if(s < SRC.length - 1){ s++; play(); return; } /* nguồn này hỏng thì thử nguồn kia */
      note(true); o.fin();
    }
    function play(){
      au.onended = function(){ if(my !== seq) return; i++; next(); };
      au.onerror = function(){ fail(); };
      au.onplaying = function(){ if(my === seq){ note(false); if(mode() === 'auto' && !vi) set('nth-vweb', '1'); } };
      au.src = SRC[s] + encodeURIComponent(list[i]);
      au.playbackRate = o.rate < .9 ? .9 : 1;
      var p; try{ p = au.play(); }catch(e){ fail(e); return; }
      if(p && p.catch) p.catch(fail);
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
    if(md === 'web' || !ss){ web(t, o, my); return; }
    if(md === 'auto' && ((voices.length && !vi) || (!vi && get('nth-vweb')))){ web(t, o, my); return; }
    try{
      var u = new SpeechSynthesisUtterance(t), started = false;
      u.lang = 'vi-VN'; if(vi) u.voice = vi; u.rate = o.rate; u.pitch = o.pitch;
      u.onstart = function(){ started = true; note(false); };
      u.onend = function(){ started = true; o.fin(); };
      u.onerror = function(e){ if(!started && my === seq && e.error !== 'interrupted' && e.error !== 'canceled'){ if(md === 'may'){ note(true); o.fin(); } else web(t, o, my); } };
      setTimeout(function(){ if(my === seq) ss.speak(u); }, 60); /* Android hay nuốt câu nói ngay sau cancel */
      setTimeout(function(){
        if(started || my !== seq || ss.speaking) return;
        try{ ss.cancel(); }catch(e){}
        if(md === 'may'){ note(true); o.fin(); } else web(t, o, my);
      }, 1500);
    }catch(e){ if(md === 'may'){ note(true); o.fin(); } else web(t, o, my); }
  }
  window.NTH = {
    say: say, stop: stop,
    /* NTH.mode() đọc, NTH.mode('auto'|'may'|'web') đặt; đặt lại thì quên điều máy đã tự học */
    mode: function(m){ if(m){ set('nth-voice', m === 'auto' ? null : m); set('nth-vweb', null); } return mode(); },
    info: function(){ load(); return {may: !!ss, voices: voices.length, vi: vi ? vi.name : '', mode: mode(), webRemembered: !!get('nth-vweb')}; }
  };
})();
