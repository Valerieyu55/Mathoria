/* MATHORIA 音樂與音效 — 以 Web Audio 即時合成，不需任何音樂檔、無版權疑慮。
   API：MATHORIA_AUDIO.start() / stop() / toggle() / isOn() / wantsOn()
        sfx(name)        — 音效（見下方 SFX 清單）
        voice(who)       — 對話打字聲（player / pet / boss / narrator）
        theme("map"|"boss"|"victory") — 切換背景音樂 */
window.MATHORIA_AUDIO = (function () {
  let ctx, master, musicBus, sfxBus, delay, verbIn, noiseBuf, shaper;
  let running = false, timer = null, nextTime = 0, step = 0, THEME = "map";
  const PREF = "mathoria.sound";
  const f = n => 440 * Math.pow(2, (n - 69) / 12);  /* MIDI → Hz */

  function ensure() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4; comp.connect(ctx.destination);
    master = ctx.createGain(); master.gain.value = 0.9; master.connect(comp);
    musicBus = ctx.createGain(); musicBus.gain.value = 0; musicBus.connect(master);
    sfxBus = ctx.createGain(); sfxBus.gain.value = 0.75; sfxBus.connect(master);
    /* 空間感：回饋延遲（音樂與部分音效共用） */
    delay = ctx.createDelay(1.0); delay.delayTime.value = 0.34;
    const fb = ctx.createGain(); fb.gain.value = 0.3;
    const tone = ctx.createBiquadFilter(); tone.type = "lowpass"; tone.frequency.value = 2200;
    delay.connect(tone); tone.connect(fb); fb.connect(delay);
    const wet = ctx.createGain(); wet.gain.value = 0.32; delay.connect(wet); wet.connect(master);
    musicBus.connect(delay);
    verbIn = ctx.createGain(); verbIn.gain.value = 0.5; verbIn.connect(delay);
    /* 白噪音（爆炸、揮砍、風聲用） */
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    /* 失真曲線（魔王吼聲） */
    shaper = new Float32Array(1024); for (let i = 0; i < 1024; i++) { const x = i / 512 - 1; shaper[i] = Math.tanh(x * 4); }
  }

  /* 振盪器：type, 起始頻率, 起始時間, 長度, 音量, 輸出；opts: to(滑音終點), attack, release, lp, hp, detune, vibrato, dist, wet */
  function osc(type, freq, t0, dur, peak, bus, o = {}) {
    const n = ctx.createOscillator(); n.type = type; n.frequency.setValueAtTime(freq, t0);
    if (o.to) n.frequency.exponentialRampToValueAtTime(Math.max(20, o.to), t0 + (o.glide || dur));
    if (o.detune) n.detune.value = o.detune;
    const g = ctx.createGain(), a = o.attack ?? 0.01, r = o.release ?? 0.2;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + a);
    g.gain.setValueAtTime(peak, Math.max(t0 + a, t0 + dur - r));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    let node = n;
    if (o.dist) { const ws = ctx.createWaveShaper(); ws.curve = shaper; node.connect(ws); node = ws; }
    if (o.lp) { const fl = ctx.createBiquadFilter(); fl.type = "lowpass"; fl.frequency.value = o.lp; node.connect(fl); node = fl; }
    if (o.hp) { const fl = ctx.createBiquadFilter(); fl.type = "highpass"; fl.frequency.value = o.hp; node.connect(fl); node = fl; }
    node.connect(g); g.connect(bus); if (o.wet) { const w = ctx.createGain(); w.gain.value = o.wet; g.connect(w); w.connect(verbIn); }
    if (o.vibrato) { const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = o.vibRate || 5; lg.gain.value = o.vibrato; lfo.connect(lg); lg.connect(n.frequency); lfo.start(t0); lfo.stop(t0 + dur + 0.1); }
    n.start(t0); n.stop(t0 + dur + 0.05);
  }
  /* 濾波噪音：type(lowpass/bandpass/highpass), 起訖頻率 */
  function noise(t0, dur, peak, bus, o = {}) {
    const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true;
    const fl = ctx.createBiquadFilter(); fl.type = o.type || "lowpass"; fl.Q.value = o.q || 0.8;
    fl.frequency.setValueAtTime(o.from || 2000, t0);
    if (o.to) fl.frequency.exponentialRampToValueAtTime(o.to, t0 + dur);
    const g = ctx.createGain(), a = o.attack ?? 0.005;
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(peak, t0 + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    s.connect(fl); fl.connect(g); g.connect(bus);
    if (o.wet) { const w = ctx.createGain(); w.gain.value = o.wet; g.connect(w); w.connect(verbIn); }
    s.start(t0, Math.random()); s.stop(t0 + dur + 0.05);
  }

  /* ================= 背景音樂 ================= */
  const MAP = { bpm: 84,
    chords: [[62, 66, 69, 73], [57, 61, 64, 69], [59, 62, 66, 71], [55, 59, 62, 67]], bass: [38, 45, 47, 43],
    mel: [74, 76, 78, 81, 78, 76, 74, 0, 71, 74, 76, 74, 71, 69, 0, 0, 66, 69, 71, 74, 71, 69, 66, 0, 64, 66, 69, 66, 64, 62, 0, 0] };
  const BOSS = { bpm: 138,   /* A 小調：i – VI – III – VII，緊張的戰鬥曲 */
    chords: [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]], bass: [33, 29, 36, 31],
    mel: [69, 0, 72, 71, 69, 0, 64, 0, 65, 0, 69, 67, 65, 64, 62, 0, 64, 0, 67, 69, 72, 0, 71, 69, 67, 0, 71, 72, 74, 0, 76, 0] };
  const VIC = { bpm: 112,    /* C 大調凱旋 */
    chords: [[60, 64, 67, 72], [65, 69, 72, 77], [67, 71, 74, 79], [60, 64, 67, 72]], bass: [36, 41, 43, 36],
    mel: [72, 76, 79, 84, 79, 76, 77, 0, 77, 81, 84, 81, 79, 0, 79, 0, 79, 83, 86, 83, 79, 77, 76, 74, 72, 0, 76, 0, 72, 0, 0, 0] };
  const stepLen = () => 60 / (THEME === "boss" ? BOSS.bpm : THEME === "victory" ? VIC.bpm : MAP.bpm) / 2;

  function schedMap(t, i, S) {
    const bar = Math.floor(i / 8) % 4, pos = i % 8, chord = MAP.chords[bar];
    if (pos === 0) {
      chord.forEach(n => { osc("triangle", f(n), t, S * 8, 0.045, musicBus, { attack: 0.6, release: 1.2, lp: 1400, detune: -6 });
                           osc("sine", f(n + 12), t, S * 8, 0.02, musicBus, { attack: 0.8, release: 1.2, detune: 7 }); });
      osc("sine", f(MAP.bass[bar]), t, S * 8, 0.12, musicBus, { attack: 0.05, release: 0.6 });
    }
    const arp = chord[(pos + bar) % 4] + (pos >= 4 ? 12 : 0);
    if (pos % 2 === 0) osc("sine", f(arp + 12), t, S * 1.6, 0.07, musicBus, { attack: 0.005, release: 0.4 });
    if (pos === 6) osc("sine", f(chord[2] + 24), t, S * 3, 0.03, musicBus, { attack: 0.005, release: 1.0 });
    const m = MAP.mel[i % 32];
    if (m && i >= 32) osc("sine", f(m), t, S * 1.1, 0.075, musicBus, { attack: 0.04, release: 0.25, vibrato: 3 });
  }
  function schedBoss(t, i, S) {
    const bar = Math.floor(i / 8) % 4, pos = i % 8, chord = BOSS.chords[bar];
    /* 鼓組：大鼓 1、3、5、7（八分），小鼓 2、6 */
    if (pos % 4 === 0 || pos === 7) osc("sine", 140, t, 0.28, 0.5, musicBus, { to: 40, glide: 0.18, attack: 0.002, release: 0.15 });
    if (pos === 2 || pos === 6) { noise(t, 0.18, 0.22, musicBus, { type: "highpass", from: 1600 }); osc("triangle", 220, t, 0.1, 0.12, musicBus, { to: 140, attack: 0.002, release: 0.08 }); }
    noise(t, 0.04, pos % 2 ? 0.04 : 0.07, musicBus, { type: "highpass", from: 7000 });  /* 腳踏鈸 */
    /* 低音頑固音型 */
    osc("sawtooth", f(BOSS.bass[bar] + (pos === 3 || pos === 7 ? 12 : 0)), t, S * 0.9, 0.11, musicBus, { lp: 520, attack: 0.005, release: 0.08 });
    /* 弦樂斷奏 */
    if (pos % 2 === 0) chord.forEach(n => osc("sawtooth", f(n + 12), t, S * 0.7, 0.022, musicBus, { lp: 2400, attack: 0.005, release: 0.1, detune: (n % 2 ? 8 : -8) }));
    if (pos === 0) chord.forEach(n => osc("triangle", f(n), t, S * 8, 0.03, musicBus, { lp: 900, attack: 0.3, release: 0.8 }));
    const m = BOSS.mel[i % 32];
    if (m && i >= 16) osc("square", f(m), t, S * 0.95, 0.04, musicBus, { lp: 2000, attack: 0.01, release: 0.15, vibrato: 4 });
  }
  function schedVictory(t, i, S) {
    const bar = Math.floor(i / 8) % 4, pos = i % 8, chord = VIC.chords[bar];
    if (pos === 0) { chord.forEach(n => osc("sawtooth", f(n), t, S * 8, 0.025, musicBus, { lp: 1800, attack: 0.08, release: 1 }));
                     osc("sine", f(VIC.bass[bar]), t, S * 8, 0.14, musicBus, { release: 0.6 }); }
    if (pos % 4 === 0) osc("sine", 120, t, 0.25, 0.3, musicBus, { to: 45, glide: 0.15, attack: 0.002 });
    if (pos % 2 === 1) osc("sine", f(chord[(pos >> 1) % chord.length] + 24), t, S * 1.2, 0.04, musicBus, { attack: 0.003, release: 0.3 });
    const m = VIC.mel[i % 32];
    if (m) osc("triangle", f(m), t, S * 1.2, 0.09, musicBus, { attack: 0.01, release: 0.25, vibrato: 3 });
  }
  function tick() {
    const S = stepLen();
    while (nextTime < ctx.currentTime + 0.35) {
      (THEME === "boss" ? schedBoss : THEME === "victory" ? schedVictory : schedMap)(nextTime, step, S);
      nextTime += S; step++;
    }
  }
  function fadeMusic(to, sec) {
    const g = musicBus.gain, now = ctx.currentTime;
    g.cancelScheduledValues(now); g.setValueAtTime(Math.max(0.0001, g.value), now); g.exponentialRampToValueAtTime(Math.max(0.0001, to), now + sec);
  }
  function start() {
    ensure(); if (ctx.state === "suspended") ctx.resume();
    sfxBus.gain.value = 0.75;
    if (running) return; running = true;
    step = 0; nextTime = ctx.currentTime + 0.1;
    fadeMusic(1, 2.5);
    timer = setInterval(tick, 90);
    try { localStorage.setItem(PREF, "on"); } catch (e) {}
  }
  function stop() {
    if (!running) return; running = false;
    fadeMusic(0.0001, 0.6); sfxBus.gain.value = 0;
    clearInterval(timer);
    try { localStorage.setItem(PREF, "off"); } catch (e) {}
  }
  /* 換曲：淡出 → 換主題 → 淡入 */
  function theme(name) {
    if (name === THEME) return;
    if (!ctx || !running) { THEME = name; return; }
    fadeMusic(0.0001, 0.35);
    setTimeout(() => { THEME = name; step = 0; nextTime = ctx.currentTime + 0.05; if (running) fadeMusic(1, 0.8); }, 380);
  }
  function toggle() { running ? stop() : start(); return running; }
  function isOn() { return running; }
  function wantsOn() { try { return localStorage.getItem(PREF) !== "off"; } catch (e) { return true; } }
  const muted = () => { try { return localStorage.getItem(PREF) === "off"; } catch (e) { return false; } };

  /* ================= 音效 ================= */
  let lastHover = 0;
  function sfx(name) {
    if (muted()) return;
    try { ensure(); if (ctx.state === "suspended") ctx.resume(); } catch (e) { return; }
    const t = ctx.currentTime + 0.01, B = sfxBus;
    const seq = (notes, dur, gap, type = "sine", peak = 0.18, o = {}) => notes.forEach((n, k) => osc(type, f(n), t + k * gap, dur, peak, B, Object.assign({ attack: 0.005, release: dur * 0.6 }, o)));
    switch (name) {
      /* ---- 介面 ---- */
      case "hover": { const now = performance.now(); if (now - lastHover < 60) return; lastHover = now;
        osc("sine", 2400, t, 0.05, 0.025, B, { to: 2900, attack: 0.003, release: 0.04 }); break; }
      case "click": osc("triangle", 1300, t, 0.07, 0.09, B, { to: 900, attack: 0.002, release: 0.05 }); noise(t, 0.03, 0.04, B, { type: "highpass", from: 5000 }); break;
      case "confirm": seq([81, 88], 0.16, 0.07, "triangle", 0.12, { wet: 0.4 }); seq([100], 0.25, 0.12, "sine", 0.04, { wet: 0.6 }); break;
      case "close": seq([79, 72], 0.1, 0.06, "triangle", 0.08); break;
      case "tab": osc("square", f(79), t, 0.06, 0.04, B, { lp: 2200, attack: 0.002, release: 0.04 }); osc("sine", f(86), t + 0.03, 0.08, 0.05, B, { attack: 0.002 }); break;
      case "pick": seq([76, 83], 0.12, 0.05, "triangle", 0.11); noise(t, 0.08, 0.03, B, { type: "bandpass", from: 6000 }); break;
      case "toggle": osc("square", 600, t, 0.05, 0.05, B, { lp: 1600, attack: 0.002 }); osc("square", 900, t + 0.05, 0.05, 0.05, B, { lp: 1600, attack: 0.002 }); break;
      case "locked": osc("square", 150, t, 0.16, 0.09, B, { to: 90, lp: 700 }); osc("square", 130, t + 0.12, 0.18, 0.08, B, { to: 80, lp: 600 }); break;
      case "open": noise(t, 0.35, 0.06, B, { type: "bandpass", from: 400, to: 3000, q: 2 }); seq([74, 81, 86], 0.22, 0.07, "triangle", 0.1, { wet: 0.5 }); break;
      case "node": noise(t, 0.4, 0.05, B, { type: "bandpass", from: 300, to: 2500, q: 3 }); seq([69, 76, 81, 88], 0.3, 0.06, "sine", 0.1, { wet: 0.6 }); break;
      case "fail": seq([70, 64], 0.25, 0.14, "square", 0.05, { lp: 1800 }); break;
      case "type": osc("square", 1800 + Math.random() * 400, t, 0.02, 0.02, B, { lp: 3000, attack: 0.001, release: 0.015 }); break;
      /* ---- 獎勵 ---- */
      case "xp": seq([76, 83, 88], 0.2, 0.08, "square", 0.05, { lp: 3000 }); seq([95, 100], 0.3, 0.1, "sine", 0.06, { wet: 0.5 }); break;
      case "coin": seq([83, 88], 0.12, 0.07, "square", 0.06, { lp: 4000 }); break;
      case "levelup": seq([72, 76, 79, 84, 88, 91, 96], 0.35, 0.07, "square", 0.05, { lp: 3500 }); seq([84, 88, 91], 0.9, 0, "triangle", 0.07, { wet: 0.6, attack: 0.02 }); break;
      case "evolve":
        noise(t, 1.4, 0.08, B, { type: "bandpass", from: 200, to: 6000, q: 4, attack: 0.6 });
        seq([62, 66, 69, 74, 78, 81, 86, 90, 93, 98], 0.6, 0.1, "sine", 0.14, { wet: 0.5 });
        [62, 69, 74, 78].forEach(n => osc("sawtooth", f(n), t + 1.0, 1.8, 0.03, B, { lp: 2500, attack: 0.05, release: 1.2, wet: 0.5 }));
        osc("sine", 90, t + 1.0, 1.2, 0.3, B, { to: 40 }); break;
      /* ---- 對話 ---- */
      case "dlg-in": noise(t, 0.4, 0.07, B, { type: "bandpass", from: 300, to: 2400, q: 1.5, attack: 0.15 }); osc("sine", f(81), t + 0.2, 0.4, 0.05, B, { wet: 0.7 }); break;
      case "dlg-out": noise(t, 0.3, 0.05, B, { type: "bandpass", from: 2400, to: 300, q: 1.5 }); break;
      case "page": osc("sine", 700, t, 0.06, 0.07, B, { to: 1100, attack: 0.002, release: 0.04 }); break;
      case "m-shock": osc("sine", 500, t, 0.18, 0.13, B, { to: 1600, glide: 0.08 }); osc("square", f(96), t + 0.08, 0.15, 0.04, B, { lp: 4000 }); noise(t, 0.1, 0.05, B, { type: "highpass", from: 3000 }); break;
      case "m-angry": noise(t, 0.5, 0.18, B, { type: "lowpass", from: 300, to: 80 }); osc("sawtooth", 70, t, 0.45, 0.1, B, { to: 50, dist: true, lp: 400 }); break;
      case "m-happy": seq([84, 88, 91, 96], 0.18, 0.05, "sine", 0.07, { wet: 0.6 }); break;
      case "m-think": osc("sine", 520, t, 0.14, 0.08, B, { to: 420 }); osc("sine", 440, t + 0.16, 0.18, 0.07, B, { to: 340 }); break;
      case "boss-appear":
        noise(t, 1.6, 0.28, B, { type: "lowpass", from: 900, to: 60 });                                       /* 雷鳴 */
        osc("sawtooth", 110, t + 0.05, 1.1, 0.16, B, { to: 42, dist: true, lp: 900, vibrato: 6, vibRate: 11 });   /* 吼聲 */
        osc("sawtooth", 165, t + 0.05, 1.0, 0.08, B, { to: 60, dist: true, lp: 1200, vibrato: 8, vibRate: 13 });
        osc("sine", 55, t, 1.4, 0.35, B, { to: 30 }); break;
      /* ---- 戰鬥 ---- */
      case "charge": noise(t, 0.55, 0.1, B, { type: "bandpass", from: 300, to: 5000, q: 6, attack: 0.45 }); osc("sawtooth", 200, t, 0.55, 0.05, B, { to: 1400, lp: 3000, attack: 0.4 }); break;
      case "magic": osc("sine", 2200, t, 0.3, 0.12, B, { to: 300, glide: 0.25 }); osc("square", 1600, t, 0.2, 0.03, B, { to: 500, lp: 3000 }); seq([96, 100, 103], 0.2, 0.03, "sine", 0.04, { wet: 0.6 }); break;
      case "slash": noise(t, 0.22, 0.25, B, { type: "bandpass", from: 6000, to: 900, q: 1.2 }); break;
      case "hit": noise(t, 0.18, 0.4, B, { type: "lowpass", from: 3000, to: 200 }); osc("sine", 160, t, 0.22, 0.45, B, { to: 45, attack: 0.002, release: 0.15 }); osc("square", 90, t, 0.08, 0.08, B, { lp: 800, attack: 0.001 }); break;
      case "crit":
        noise(t, 0.3, 0.5, B, { type: "lowpass", from: 5000, to: 150 }); osc("sine", 200, t, 0.4, 0.55, B, { to: 35 });
        seq([93, 98], 0.6, 0.02, "triangle", 0.08, { wet: 0.8 }); osc("square", f(105), t, 0.3, 0.03, B, { lp: 6000 }); break;
      case "boss-hurt": osc("sawtooth", 180, t, 0.35, 0.12, B, { to: 70, dist: true, lp: 1000, vibrato: 10, vibRate: 15 }); break;
      case "counter": noise(t, 0.3, 0.3, B, { type: "bandpass", from: 1200, to: 200, q: 1 }); osc("sawtooth", 90, t, 0.4, 0.15, B, { to: 40, dist: true, lp: 600 }); break;
      case "explode":
        noise(t, 2.0, 0.6, B, { type: "lowpass", from: 4000, to: 40 }); noise(t + 0.15, 1.6, 0.2, B, { type: "bandpass", from: 1500, to: 200, q: 0.6, wet: 0.6 });
        osc("sine", 120, t, 1.6, 0.6, B, { to: 22, glide: 1.2 }); break;
      case "victory":
        [[72, 76, 79], [72, 76, 79], [72, 76, 79], [77, 81, 84], [79, 83, 86], [84, 88, 91]].forEach((ch, k) => {
          const at = t + [0, 0.14, 0.28, 0.46, 0.7, 0.98][k], d = k === 5 ? 1.6 : 0.16;
          ch.forEach(n => osc("sawtooth", f(n), at, d, 0.04, B, { lp: 3200, attack: 0.01, release: Math.min(0.12, d * 0.6), wet: 0.4 }));
          osc("square", f(ch[2]), at, d, 0.04, B, { lp: 2500, attack: 0.01, release: Math.min(0.12, d * 0.6) });
        });
        osc("sine", 100, t + 0.98, 0.5, 0.35, B, { to: 40 }); noise(t + 0.98, 1.4, 0.06, B, { type: "highpass", from: 6000 }); break;
      case "boss": sfx("crit"); break;   /* 舊名稱相容 */
    }
  }
  /* 對話打字聲：每個角色有自己的嗓音 */
  function voice(who) {
    if (muted() || !ctx) return;
    const t = ctx.currentTime + 0.005, B = sfxBus, r = Math.random();
    if (who === "pet") osc("sine", f(86 + Math.floor(r * 6)), t, 0.05, 0.05, B, { attack: 0.002, release: 0.03 });
    else if (who === "boss") osc("sawtooth", f(38 + Math.floor(r * 5)), t, 0.08, 0.06, B, { dist: true, lp: 700, attack: 0.003, release: 0.05 });
    else if (who === "narrator") osc("triangle", f(74 + Math.floor(r * 4)), t, 0.07, 0.035, B, { attack: 0.004, release: 0.05, wet: 0.5 });
    else osc("square", f(64 + Math.floor(r * 5)), t, 0.045, 0.03, B, { lp: 1600, attack: 0.002, release: 0.03 });
  }
  return { start, stop, toggle, isOn, wantsOn, sfx, voice, theme };
})();
