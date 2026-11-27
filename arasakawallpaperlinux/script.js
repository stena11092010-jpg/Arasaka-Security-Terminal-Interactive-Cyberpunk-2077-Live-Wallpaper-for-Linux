(() => {
  "use strict";
  /* ===== НАСТРОЙКИ: поменяйте город и часовые пояса под себя ===== */
  const CFG = {
    city: "БИРОБИДЖАН", lat: 48.79, lon: 132.92,
    zones: [["ТОКИО", "Asia/Tokyo"], ["МОСКВА", "Europe/Moscow"], ["ЛОС-АНДЖЕЛЕС", "America/Los_Angeles"]],
  };
  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, "0");
  const nav = navigator;

  /* ---- журнал (только реальные события) ---- */
  function log(msg, hl) {
    const d = new Date(), el = $("log"), l = document.createElement("div");
    l.className = hl ? "imp" : ""; l.innerHTML = '<span class="t">' + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds()) + "</span> " + (hl ? '<span class="hl">' + msg + "</span>" : msg);
    el.appendChild(l);
    while (el.children.length > 40) el.removeChild(el.firstChild);
  }

  /* ---- часы, дата, календарь ---- */
  const tm = (tz) => new Date().toLocaleTimeString("ru-RU", { timeZone: tz, hourCycle: "h23" });
  let calDay = -1;
  const WD = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  let view = null, sel = null;
  function calendar() {
    const t = new Date();
    if (!view) view = { y: t.getFullYear(), m: t.getMonth() };
    const { y, m } = view, first = (new Date(y, m, 1).getDay() + 6) % 7, n = new Date(y, m + 1, 0).getDate();
    let h = WD.map((x) => "<b>" + x + "</b>").join("");
    for (let i = 0; i < first; i++) h += "<span></span>";
    for (let i = 1; i <= n; i++) {
      const isT = y === t.getFullYear() && m === t.getMonth() && i === t.getDate();
      const isS = sel && sel.y === y && sel.m === m && sel.d === i;
      h += '<span data-d="' + i + '" class="' + (isT ? "today " : "") + (isS ? "sel" : "") + '">' + i + "</span>";
    }
    $("cal").innerHTML = h;
    $("calh").textContent = new Date(y, m, 1).toLocaleDateString("ru-RU", { month: "long", year: "numeric" }).toUpperCase();
    let s = "СЕГОДНЯ";
    if (sel) {
      const days = Math.round((new Date(sel.y, sel.m, sel.d) - new Date(t.getFullYear(), t.getMonth(), t.getDate())) / 864e5);
      const dt = new Date(sel.y, sel.m, sel.d).toLocaleDateString("ru-RU", { day: "numeric", month: "long" }).toUpperCase();
      s = days === 0 ? "СЕГОДНЯ" : days > 0 ? "ДО " + dt + ": " + days + " ДН." : dt + ": ПРОШЛО " + -days + " ДН.";
    }
    $("calSel").textContent = s;
  }
  function clocks() {
    const d = new Date();
    $("clock").textContent = tm();
    $("date").textContent = d.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).toUpperCase();
    $("world").innerHTML = CFG.zones.map(([n, z]) => "<div><small>" + n + "</small><b>" + tm(z) + "</b></div>").join("");
    if (d.getDate() !== calDay) { calDay = d.getDate(); calendar(); }
  }

  /* ---- погода (Open-Meteo, без ключа) ---- */
  const wmo = (c) => c === 0 ? "ЯСНО" : c < 3 ? "МАЛООБЛАЧНО" : c === 3 ? "ПАСМУРНО" : c < 50 ? "ТУМАН" : c < 60 ? "МОРОСЬ" : c < 70 ? "ДОЖДЬ" : c < 80 ? "СНЕГ" : c < 85 ? "ЛИВЕНЬ" : c < 90 ? "СНЕГОПАД" : "ГРОЗА";
  let wxFailed = false, wxTab = "d";
  const wxd = { d: "", h: "" };
  async function weather() {
    try {
      const u = "https://api.open-meteo.com/v1/forecast?latitude=" + CFG.lat + "&longitude=" + CFG.lon +
        "&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m&timezone=auto&forecast_days=4&wind_speed_unit=ms";
      const j = await (await fetch(u)).json(), c = j.current, dl = j.daily;
      $("wt").textContent = Math.round(c.temperature_2m) + "°";
      $("wd").textContent = wmo(c.weather_code);
      $("wf").textContent = "ОЩУЩАЕТСЯ " + Math.round(c.apparent_temperature) + "°";
      $("ww").textContent = Math.round(c.wind_speed_10m) + " М/С";
      $("wh").textContent = c.relative_humidity_2m + "%";
      wxd.d = dl.time.slice(1).map((t, i) => "<div><small>" + new Date(t + "T12:00").toLocaleDateString("ru-RU", { weekday: "short" }).toUpperCase() + "</small><b>" + Math.round(dl.temperature_2m_max[i + 1]) + "°</b><small>" + Math.round(dl.temperature_2m_min[i + 1]) + "°</small></div>").join("");
      const k = Math.max(0, j.hourly.time.findIndex((t) => t >= c.time.slice(0, 13) + ":00"));
      wxd.h = [1, 2, 3, 4, 5, 6].map((n) => { const x = k + n * 2; return "<div><small>" + j.hourly.time[x].slice(11, 16) + "</small><b>" + Math.round(j.hourly.temperature_2m[x]) + "°</b></div>"; }).join("");
      renderFc();
      wxFailed = false;
    } catch (e) {
      $("wd").textContent = "НЕТ ДАННЫХ";
      if (!wxFailed) log("ПОГОДА: ОШИБКА ЗАПРОСА", true);
      wxFailed = true;
    }
  }

  /* ---- нагрузка ПК: отдаёт Lively (LivelyInfo.json -> --system-information) ---- */
  const H = { cpu: [], gpu: [], ram: [] }; let metric = "cpu";
  function spark(id, a, max) {
    const c = $(id), x = c.getContext("2d"), w = c.width, hh = c.height;
    x.clearRect(0, 0, w, hh);
    if (a.length < 2) return;
    const m = max || Math.max(...a, 1), st = w / 59, x0 = w - (a.length - 1) * st;
    x.beginPath();
    a.forEach((v, i) => { const px = x0 + i * st, py = hh - 3 - (v / m) * (hh - 6); i ? x.lineTo(px, py) : x.moveTo(px, py); });
    x.strokeStyle = "#ff2a3a"; x.lineWidth = 2; x.stroke();
    x.lineTo(w, hh); x.lineTo(x0, hh); x.fillStyle = "rgba(212,16,30,.18)"; x.fill();
  }
  window.livelySystemInformation = (raw) => {
    const o = JSON.parse(raw);
    const set = (k, v) => { v = Math.max(0, Math.min(100, v || 0)); $(k).textContent = Math.round(v) + "%"; $(k + "B").style.width = v + "%"; H[k].push(v); if (H[k].length > 60) H[k].shift(); };
    set("cpu", o.CurrentCpu); set("gpu", o.CurrentGpu3D); set("ram", (1 - o.CurrentRamAvail / o.TotalRam) * 100);
    spark("spLoad", H[metric], 100);
    const mb = (x) => ((x * 8) / 1048576).toFixed(1) + " МБИТ/С";
    $("nd").textContent = mb(o.CurrentNetDown); $("nu").textContent = mb(o.CurrentNetUp);
    $("sysnote").hidden = true;
  };

  /* ---- плеер: Lively (обложка, эквалайзер) + помощник Windows (шкала, кнопки) ---- */
  const HELPER = "http://127.0.0.1:5511";
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  let lastTrack = "", artData = null;
  const TH = [];
  const histRender = () => { $("thist").innerHTML = TH.length ? TH.map((t, i) => (i + 1) + ". " + esc(t)).join("<br>") : "ИСТОРИЯ ПУСТА"; };
  const np = { ok: false, status: "", pos: 0, dur: 0, at: 0, seek: false };
  const fmtT = (ms) => { const s = Math.max(0, Math.round(ms / 1000)); return ((s / 60) | 0) + ":" + pad(s % 60); };
  function applyArt() {
    const a = $("art");
    if (artData) { a.style.backgroundImage = "url(data:image/" + (artData.startsWith("/9j") ? "jpeg" : "png") + ";base64," + artData + ")"; a.textContent = ""; }
    else { a.style.backgroundImage = ""; a.textContent = "♪"; }
  }
  function setTrack(o) {
    if (!o) {
      $("tt").textContent = "НИЧЕГО НЕ ИГРАЕТ"; $("ta").textContent = ""; $("tl").textContent = "";
      if (lastTrack) log("ПЛЕЕР: ВОСПРОИЗВЕДЕНИЕ ОСТАНОВЛЕНО");
      lastTrack = ""; return;
    }
    $("tt").textContent = o.Title || "БЕЗ НАЗВАНИЯ"; $("ta").textContent = o.Artist || ""; $("tl").textContent = o.AlbumTitle || "";
    const key = (o.Artist || "") + " — " + (o.Title || "");
    if (key !== lastTrack) { lastTrack = key; TH.unshift(key); TH.length = Math.min(TH.length, 5); histRender(); log("ИГРАЕТ: " + esc(key), true); }
  }
  window.livelyCurrentTrack = (raw) => {
    let o = null;
    try { o = JSON.parse(raw); } catch (e) {}
    artData = o && o.Thumbnail ? o.Thumbnail : null; applyArt();
    if (!np.ok) setTrack(o);
  };
  async function npPoll() {
    const ac = new AbortController(), to = setTimeout(() => ac.abort(), 1500);
    try {
      const o = await (await fetch(HELPER + "/state", { signal: ac.signal, cache: "no-store" })).json();
      if (!np.ok) log("ПЛЕЕР: ПОМОЩНИК ПОДКЛЮЧЁН", true);
      np.ok = true;
      if (o.title === undefined) { np.status = ""; setTrack(null); }
      else { Object.assign(np, { status: o.status, pos: o.pos, dur: o.dur, at: performance.now(), seek: !!o.canSeek }); setTrack({ Title: o.title, Artist: o.artist, AlbumTitle: o.album }); }
    } catch (e) { if (np.ok) log("ПЛЕЕР: ПОМОЩНИК НЕДОСТУПЕН", true); np.ok = false; np.status = ""; }
    clearTimeout(to);
    $("npnote").hidden = np.ok;
    renderNp();
  }
  function renderNp() {
    const playing = np.status === "Playing", has = np.ok && np.dur > 0;
    const pos = has ? Math.min(np.dur, np.pos + (playing ? performance.now() - np.at : 0)) : 0;
    $("tpos").textContent = has ? fmtT(pos) : "--:--"; $("tdur").textContent = has ? fmtT(np.dur) : "--:--";
    $("seekFill").style.width = has ? (pos / np.dur) * 100 + "%" : "0";
    $("bPlay").textContent = playing ? "❚❚" : "▶";
    $("npCtl").classList.toggle("off", !np.ok);
    $("seek").classList.toggle("off", !(has && np.seek));
  }
  const cmd = (p) => {
    if (!np.ok) { log("ПЛЕЕР: ЗАПУСТИТЕ media-helper.bat", true); return; }
    fetch(HELPER + p, { mode: "no-cors", cache: "no-store" }).catch(() => {});
    setTimeout(npPoll, 250);
  };
  $("bPrev").addEventListener("click", () => cmd("/prev"));
  $("bPlay").addEventListener("click", () => cmd("/playpause"));
  $("bNext").addEventListener("click", () => cmd("/next"));
  $("seekBar").addEventListener("click", (e) => {
    if (!np.ok || !np.dur || !np.seek) return;
    const r = e.currentTarget.getBoundingClientRect();
    cmd("/seek?ms=" + Math.round(((e.clientX - r.left) / r.width) * np.dur));
  });

  /* ---- эквалайзер: Lively --audio (128 значений 0..1, первые 64 - левый канал) ---- */
  const eqc = $("eq"), eqx = eqc.getContext("2d");
  const raw = new Array(64).fill(0), sm = new Array(64).fill(0), peak = new Array(64).fill(0);
  let audioAt = 0;
  window.livelyAudioListener = (a) => { for (let i = 0; i < 64; i++) raw[i] = ((a[i] || 0) + (a[i + 64] || 0)) / 2; audioAt = performance.now(); };
  function eqLoop() {
    requestAnimationFrame(eqLoop);
    if (!eqc.offsetParent) return;
    const w = eqc.width, h = eqc.height, base = h - 4, on = performance.now() - audioAt < 1500;
    for (let i = 0; i < 64; i++) { const t = on ? raw[i] : 0; sm[i] += (t - sm[i]) * (t > sm[i] ? 0.5 : 0.12); peak[i] = Math.max(sm[i], peak[i] - 0.012); }
    eqx.clearRect(0, 0, w, h);
    const z1 = w * 0.3, z2 = w * 0.68;
    const bw = z1 / 6;
    for (let i = 0; i < 6; i++) { /* БАС: толстые столбцы + метки пиков */
      const v = Math.min(1, sm[i] * 1.4), bh = 3 + v * (h - 10), x = i * bw;
      eqx.fillStyle = "rgba(212,16,30,.9)"; eqx.fillRect(x + 3, base - bh, bw - 6, bh);
      eqx.fillStyle = "#fff"; eqx.fillRect(x + 3, base - Math.min(1, peak[i] * 1.4) * (h - 10) - 4, bw - 6, 2);
    }
    eqx.beginPath(); /* СРЕДНИЕ: ломаная линия */
    for (let i = 0; i < 24; i++) {
      const v = Math.min(1, sm[6 + i] * 1.8), x = z1 + 8 + (i / 23) * (z2 - z1 - 16), y = base - 3 - v * (h - 14);
      i ? eqx.lineTo(x, y) : eqx.moveTo(x, y);
    }
    eqx.strokeStyle = "#ff2a3a"; eqx.lineWidth = 2; eqx.lineJoin = "round"; eqx.shadowColor = "#d4101e"; eqx.shadowBlur = 8; eqx.stroke(); eqx.shadowBlur = 0;
    const n = 34, hw = (w - z2 - 8) / n;
    for (let i = 0; i < n; i++) { /* ВЕРХА: тонкие штрихи с «зависающими» точками */
      const k = 30 + i, v = Math.min(1, sm[k] * 2.6), x = z2 + 8 + i * hw, bh = 2 + v * (h - 14), ww = Math.max(1, hw - 2);
      eqx.fillStyle = "rgba(255,42,58,.55)"; eqx.fillRect(x, base - bh, ww, bh);
      eqx.fillStyle = "#fff"; eqx.fillRect(x, base - Math.min(1, peak[k] * 2.6) * (h - 14) - 5, ww, 2);
    }
    eqx.fillStyle = "rgba(212,16,30,.35)"; eqx.fillRect(z1, 4, 1, h - 8); eqx.fillRect(z2, 4, 1, h - 8);
  }

  /* ---- батарея и сеть ---- */
  const bat = { lvl: null, chg: false };
  let low = false;
  (nav.getBattery ? nav.getBattery() : Promise.reject()).then((b) => {
    const u = () => { bat.lvl = b.level; bat.chg = b.charging; };
    u(); b.addEventListener("levelchange", () => { u(); if (b.level < 0.2 && !b.charging && !low) { low = true; log("ЗАРЯД НИЖЕ 20%", true); } if (b.charging) low = false; });
    b.addEventListener("chargingchange", () => { u(); log(b.charging ? "ПИТАНИЕ: ОТ СЕТИ" : "ПИТАНИЕ: ОТ БАТАРЕИ", true); });
  }).catch(() => {});
  function status() {
    $("st").textContent = "СЕТЬ: " + (nav.onLine ? "В СЕТИ" : "НЕТ СОЕДИНЕНИЯ") + (bat.lvl == null ? "" : "   ЗАРЯД: " + Math.round(bat.lvl * 100) + "%" + (bat.chg ? " (ЗАРЯДКА)" : ""));
  }

  /* ---- анимация входа ---- */
  const FX = () => Array.from(document.querySelectorAll(".top,.col .panel,.mid,.foot"));
  const reveal = () => FX().forEach((e, i) => setTimeout(() => e.classList.add("shown"), i * 110));
  let booting = false;
  function boot() {
    if (booting) return;
    booting = true;
    const el = $("boot"), out = $("bootLog"), bar = $("bootBar"), ok = $("bootOk");
    FX().forEach((e) => { e.classList.add("fx"); e.classList.remove("shown"); });
    el.classList.remove("off"); ok.classList.remove("on"); out.textContent = ""; bar.style.width = "0";
    const L = ["ARASAKA OS 4.2 // ЗАГРУЗКА ЯДРА", "ПРОВЕРКА ПРОПУСКА ............ OK", "МОНТИРОВАНИЕ ЗАЩИЩЁННОГО ТОМА .. OK", "РУКОПОЖАТИЕ NETWATCH .......... OK", "ЗАГРУЗКА ИНТЕРФЕЙСА ........... OK"];
    let i = 0;
    (function step() {
      if (i < L.length) { out.textContent += L[i++] + "\n"; bar.style.width = (i / L.length) * 100 + "%"; setTimeout(step, 320); }
      else { ok.classList.add("on"); setTimeout(() => { el.classList.add("off"); reveal(); booting = false; }, 900); }
    })();
  }

  /* ---- интерактивность (мышь) ---- */
  const pos = {}; let zi = 20;
  try { Object.assign(pos, JSON.parse(localStorage.getItem("arasakaPos") || "{}")); } catch (e) {}
  const place = (p, k) => { p.style.translate = pos[k] ? pos[k][0] + "px " + pos[k][1] + "px" : ""; };
  document.querySelectorAll(".panel").forEach((p) => {
    const h = p.querySelector("h2"), k = h.firstChild.textContent;
    h.title = "Клик: свернуть. Перетащите, чтобы переместить окно"; place(p, k);
    h.addEventListener("pointerdown", (e) => {
      if (e.button) return;
      const sx = e.clientX, sy = e.clientY, o = pos[k] || [0, 0]; let moved = false;
      h.setPointerCapture(e.pointerId);
      const mv = (ev) => {
        const dx = ev.clientX - sx, dy = ev.clientY - sy;
        if (!moved && Math.hypot(dx, dy) < 5) return;
        if (!moved) { moved = true; p.classList.add("drag"); p.style.zIndex = ++zi; }
        pos[k] = [o[0] + dx, o[1] + dy]; place(p, k);
      };
      const up = () => {
        h.removeEventListener("pointermove", mv); h.removeEventListener("pointerup", up); p.classList.remove("drag");
        if (moved) { h._m = true; try { localStorage.setItem("arasakaPos", JSON.stringify(pos)); } catch (e) {} }
      };
      h.addEventListener("pointermove", mv); h.addEventListener("pointerup", up);
    });
    h.addEventListener("click", () => { if (h._m) { h._m = false; return; } p.classList.toggle("min"); });
  });
  $("resetWin").addEventListener("click", () => {
    Object.keys(pos).forEach((k) => delete pos[k]);
    try { localStorage.removeItem("arasakaPos"); } catch (e) {}
    document.querySelectorAll(".panel").forEach((p) => { p.style.translate = ""; p.classList.remove("min"); });
  });

  /* ---- погода: вкладки ---- */
  const renderFc = () => { $("days").innerHTML = wxd[wxTab]; };
  document.querySelectorAll("[data-t]").forEach((b) => b.addEventListener("click", () => {
    wxTab = b.dataset.t; document.querySelectorAll("[data-t]").forEach((x) => x.classList.toggle("on", x === b)); renderFc();
  }));

  /* ---- нагрузка: выбор графика; плеер: история; журнал: фильтр ---- */
  document.querySelectorAll(".m").forEach((r) => r.addEventListener("click", () => {
    metric = r.dataset.m; document.querySelectorAll(".m").forEach((x) => x.classList.toggle("sel", x === r)); spark("spLoad", H[metric], 100);
  }));
  $("npTrack").addEventListener("click", () => { $("thist").hidden = !$("thist").hidden; histRender(); });
  document.querySelectorAll("[data-f]").forEach((b) => b.addEventListener("click", () => {
    $("log").classList.toggle("imp", b.dataset.f === "imp"); document.querySelectorAll("[data-f]").forEach((x) => x.classList.toggle("on", x === b));
  }));
  $("logClr").addEventListener("click", () => { $("log").innerHTML = ""; });

  /* ---- интернет: доступ, пинг, тест скорости ---- */
  const P = []; let inet = null;
  async function ping() {
    const ac = new AbortController(), to = setTimeout(() => ac.abort(), 4000), t = performance.now();
    let ok = false, ms = 0;
    try { await fetch("https://www.gstatic.com/generate_204?" + Date.now(), { mode: "no-cors", cache: "no-store", signal: ac.signal }); ok = true; ms = Math.round(performance.now() - t); } catch (e) {}
    clearTimeout(to);
    if (ok) { P.push(ms); if (P.length > 60) P.shift(); }
    $("inet").textContent = !nav.onLine ? "НЕТ СЕТИ" : ok ? "ДОСТУП ЕСТЬ" : "НЕТ ИНТЕРНЕТА";
    $("inet").className = ok ? "ok" : "bad";
    if (inet !== null && inet !== ok) log(ok ? "ИНТЕРНЕТ: ДОСТУП ВОССТАНОВЛЕН" : "ИНТЕРНЕТ: ДОСТУП ПОТЕРЯН", true);
    inet = ok;
    const avg = P.length ? Math.round(P.reduce((a, b) => a + b, 0) / P.length) : null;
    const jit = P.length > 1 ? Math.round(P.slice(1).reduce((a, v, i) => a + Math.abs(v - P[i]), 0) / (P.length - 1)) : 0;
    $("ping").textContent = ok ? ms + " МС" : "—";
    $("avg").textContent = avg == null ? "—" : avg + " МС / " + jit + " МС";
    const c = nav.connection;
    $("ctype").textContent = c && c.effectiveType ? c.effectiveType.toUpperCase() + (c.downlink ? " ~" + c.downlink + " МБИТ/С" : "") : "—";
    spark("spPing", P);
  }
  async function speedTest() {
    const b = $("spBtn");
    if (b.disabled) return;
    b.disabled = true; b.textContent = "ТЕСТ...";
    try {
      const t = performance.now();
      const buf = await (await fetch("https://speed.cloudflare.com/__down?bytes=10000000&r=" + Date.now(), { cache: "no-store" })).arrayBuffer();
      const mbps = (buf.byteLength * 8) / 1e6 / ((performance.now() - t) / 1000), d = new Date();
      $("spRes").textContent = mbps.toFixed(1) + " МБИТ/С (" + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ")";
      log("ТЕСТ СКОРОСТИ: " + mbps.toFixed(1) + " МБИТ/С", true);
    } catch (e) { $("spRes").textContent = "ОШИБКА ТЕСТА"; log("ТЕСТ СКОРОСТИ: ОШИБКА", true); }
    b.disabled = false; b.textContent = "ТЕСТ СКОРОСТИ";
  }
  $("spBtn").addEventListener("click", speedTest);

  $("emblem").addEventListener("click", boot);
  $("calPrev").addEventListener("click", () => { view.m--; if (view.m < 0) { view.m = 11; view.y--; } calendar(); });
  $("calNext").addEventListener("click", () => { view.m++; if (view.m > 11) { view.m = 0; view.y++; } calendar(); });
  $("calSel").addEventListener("click", () => { view = null; sel = null; calendar(); });
  $("cal").addEventListener("click", (e) => { const d = e.target.dataset && e.target.dataset.d; if (d) { sel = { y: view.y, m: view.m, d: +d }; calendar(); } });

  /* ---- запуск ---- */
  $("city").textContent = CFG.city;
  clocks(); setInterval(clocks, 1000);
  status(); setInterval(status, 2000);
  weather(); setInterval(weather, 15 * 60 * 1000);
  ping(); setInterval(ping, 5000);
  eqLoop(); npPoll(); setInterval(npPoll, 1000); setInterval(renderNp, 250);
  log("СЕАНС ОТКРЫТ", true);
  boot();
  addEventListener("online", () => log("СЕТЬ: ПОДКЛЮЧЕНО", true));
  addEventListener("offline", () => log("СЕТЬ: СОЕДИНЕНИЕ ПОТЕРЯНО", true));
  document.addEventListener("visibilitychange", () => log(document.hidden ? "ЭКРАН: СВЁРНУТО" : "ЭКРАН: АКТИВЕН"));
  addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "f") document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  });
})();

  /* ===== LINUX COMPATIBILITY ===== */
  // Poll local helper for system stats if Lively is not injecting data
  let linuxSys = false;
  async function pollLinuxSys() {
    try {
      const r = await fetch("http://127.0.0.1:5511/sys", { cache: "no-store" });
      if (r.ok) {
        const o = await r.json();
        // Reuse the Lively callback format
        if (typeof window.livelySystemInformation === "function") {
          window.livelySystemInformation(JSON.stringify(o));
          linuxSys = true;
          const note = document.getElementById("sysnote");
          if (note) note.hidden = true;
        }
      }
    } catch (e) {}
  }
  setInterval(pollLinuxSys, 2000);
  // Also try immediately
  setTimeout(pollLinuxSys, 500);

  // Update the note text for Linux
  const origNote = document.getElementById("sysnote");
  if (origNote) origNote.textContent = "Данные ПК: запустите linux-helper.py рядом с обоями";
