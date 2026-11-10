/* Nari Tiểu Học — giọng đọc tiếng Việt dùng chung cho mọi trang.
   1. Máy có giọng tiếng Việt (iPhone, phần lớn máy dùng Chrome) → speechSynthesis của máy (đọc được cả khi mất mạng).
   2. Máy không có giọng tiếng Việt (nhiều máy Samsung, nhất là app cài từ Samsung Internet), hoặc 1,5 giây chưa bắt đầu đọc
      → giọng dự phòng trên mạng (Google) phát bằng <audio>.
   3. Cả hai đều không được (mất mạng, không có giọng) → hiện #voiceNote “mẹ đọc to giúp bé”.
   Dùng: NTH.say(câu, {rate, pitch, done}) · NTH.stop(). */
(function(){
  var ss = window.speechSynthesis || null, voices = [], vi = null, au = null, seq = 0;
  function load(){
    try{ voices = ss ? (ss.getVoices() || []) : []; }catch(e){ voices = []; }
    vi = voices.filter(function(v){ return /^vi/i.test(v.lang); })[0] || null;
  }
  if(ss){ load(); try{ ss.addEventListener('voiceschanged', load); }catch(e){} }
  function note(show){ var n = document.getElementById('voiceNote'); if(n) n.hidden = !show; }
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
  function web(t, o, my){
    var list = parts(t), i = 0;
    if(!au){ au = new Audio(); au.preload = 'auto'; }
    function next(){
      if(my !== seq) return;
      if(i >= list.length){ o.fin(); return; }
      au.onended = next;
      au.onerror = function(){ if(my === seq){ note(true); o.fin(); } };
      au.src = 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=vi&q=' + encodeURIComponent(list[i++]);
      au.playbackRate = o.rate < .9 ? .9 : 1;
      /* NotAllowedError = trình duyệt chặn tự phát khi bé chưa chạm màn hình → im lặng, không báo lỗi */
      var p = au.play(); if(p && p.catch) p.catch(function(e){ if(my === seq){ if(!e || e.name !== 'NotAllowedError') note(true); o.fin(); } });
    }
    next();
  }
  function stop(){
    seq++;
    try{ if(au) au.pause(); }catch(e){}
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
    if(!ss || (voices.length && !vi)){ web(t, o, my); return; }
    try{
      var u = new SpeechSynthesisUtterance(t), started = false;
      u.lang = 'vi-VN'; if(vi) u.voice = vi; u.rate = o.rate; u.pitch = o.pitch;
      u.onstart = function(){ started = true; note(false); };
      u.onend = function(){ started = true; o.fin(); };
      u.onerror = function(e){ if(!started && my === seq && e.error !== 'interrupted' && e.error !== 'canceled') web(t, o, my); };
      setTimeout(function(){ if(my === seq) ss.speak(u); }, 60); /* Android hay nuốt câu nói ngay sau cancel */
      setTimeout(function(){ if(!started && my === seq && !ss.speaking){ try{ ss.cancel(); }catch(e){} web(t, o, my); } }, 1500);
    }catch(e){ web(t, o, my); }
  }
  window.NTH = {say: say, stop: stop};
})();
