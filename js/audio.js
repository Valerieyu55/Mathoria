/* MATHORIA 音樂與音效 — 以 Web Audio 即時合成，不需任何音樂檔、無版權疑慮。
   API：MATHORIA_AUDIO.start() / stop() / toggle() / isOn() / sfx("click"|"xp"|"boss"|"levelup"|"evolve"|"open") */
window.MATHORIA_AUDIO = (function () {
  let ctx, master, musicBus, sfxBus, delay, running = false, timer = null, nextTime = 0, step = 0;
  const PREF = "mathoria.sound";
  const BPM = 84, STEP = 60 / BPM / 2;              /* 八分音符 */
  const f = n => 440 * Math.pow(2, (n - 69) / 12);  /* MIDI → Hz */
  /* 和弦進行（D 大調，I–V–vi–IV），每個和弦 8 個八分音符 */
  const CHORDS = [[62, 66, 69, 73], [57, 61, 64, 69], [59, 62, 66, 71], [55, 59, 62, 67]];
  const BASS = [38, 45, 47, 43];
  const SCALE = [62, 64, 66, 69, 71, 74, 76, 78, 81];   /* D 大調五聲音階 */
  const MELODY = [74, 76, 78, 81, 78, 76, 74, 0, 71, 74, 76, 74, 71, 69, 0, 0,
                  66, 69, 71, 74, 71, 69, 66, 0, 64, 66, 69, 66, 64, 62, 0, 0];

  function ensure() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0.9; master.connect(ctx.destination);
    musicBus = ctx.createGain(); musicBus.gain.value = 0; musicBus.connect(master);
    sfxBus = ctx.createGain(); sfxBus.gain.value = 0.7; sfxBus.connect(master);
    /* 簡易空間感：回饋延遲 */
    delay = ctx.createDelay(1.0); delay.delayTime.value = 0.34;
    const fb = ctx.createGain(); fb.gain.value = 0.32;
    const tone = ctx.createBiquadFilter(); tone.type = "lowpass"; tone.frequency.value = 2200;
    delay.connect(tone); tone.connect(fb); fb.connect(delay);
    const wet = ctx.createGain(); wet.gain.value = 0.35; delay.connect(wet); wet.connect(master);
    musicBus.connect(delay);
  }
  function osc(type, freq, t0, dur, gainPeak, bus, opts = {}) {
    const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(freq, t0);
    if (opts.detune) o.detune.value = opts.detune;
    const g = ctx.createGain();
    const a = opts.attack ?? 0.01, r = opts.release ?? 0.2;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gainPeak, t0 + a);
    g.gain.setValueAtTime(gainPeak, Math.max(t0 + a, t0 + dur - r));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    let node = o;
    if (opts.lp) { const fl = ctx.createBiquadFilter(); fl.type = "lowpass"; fl.frequency.value = opts.lp; o.connect(fl); node = fl; }
    node.connect(g); g.connect(bus);
    if (opts.vibrato) { const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 5; lg.gain.value = opts.vibrato; lfo.connect(lg); lg.connect(o.frequency); lfo.start(t0); lfo.stop(t0 + dur + 0.1); }
    o.start(t0); o.stop(t0 + dur + 0.05);
  }
  /* 每個八分音符排程一次 */
  function schedule(t, i) {
    const bar = Math.floor(i / 8) % 4, pos = i % 8, chord = CHORDS[bar];
    if (pos === 0) {                                   /* 和弦鋪底（每小節） */
      chord.forEach(n => { osc("triangle", f(n), t, STEP * 8, 0.045, musicBus, { attack: 0.6, release: 1.2, lp: 1400, detune: -6 });
                           osc("sine", f(n + 12), t, STEP * 8, 0.02, musicBus, { attack: 0.8, release: 1.2, detune: 7 }); });
      osc("sine", f(BASS[bar]), t, STEP * 8, 0.12, musicBus, { attack: 0.05, release: 0.6 });
    }
    /* 豎琴分解和弦：偶數拍 */
    const arpNote = chord[(pos + bar) % 4] + (pos >= 4 ? 12 : 0);
    if (pos % 2 === 0) osc("sine", f(arpNote + 12), t, STEP * 1.6, 0.07, musicBus, { attack: 0.005, release: 0.4 });
    /* 鐘聲：每小節第 6 拍 */
    if (pos === 6) osc("sine", f(chord[2] + 24), t, STEP * 3, 0.03, musicBus, { attack: 0.005, release: 1.0 });
    /* 旋律：長笛（每 32 拍循環，第二輪開始） */
    const m = MELODY[i % 32];
    if (m && i >= 32) osc("sine", f(m), t, STEP * 1.1, 0.075, musicBus, { attack: 0.04, release: 0.25, vibrato: 3 });
  }
  function tick() {
    while (nextTime < ctx.currentTime + 0.35) { schedule(nextTime, step); nextTime += STEP; step++; }
  }
  function start() {
    ensure(); if (ctx.state === "suspended") ctx.resume();
    if (running) return; running = true;
    step = 0; nextTime = ctx.currentTime + 0.1;
    musicBus.gain.cancelScheduledValues(ctx.currentTime);
    musicBus.gain.setValueAtTime(0.0001, ctx.currentTime);
    musicBus.gain.exponentialRampToValueAtTime(1, ctx.currentTime + 2.5);
    timer = setInterval(tick, 90);
    localStorage.setItem(PREF, "on");
  }
  function stop() {
    if (!running) return; running = false;
    musicBus.gain.cancelScheduledValues(ctx.currentTime);
    musicBus.gain.setValueAtTime(musicBus.gain.value, ctx.currentTime);
    musicBus.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
    clearInterval(timer);
    localStorage.setItem(PREF, "off");
  }
  function toggle() { running ? stop() : start(); return running; }
  function isOn() { return running; }
  function wantsOn() { return localStorage.getItem(PREF) !== "off"; }
  /* 音效 */
  function sfx(name) {
    try { ensure(); if (ctx.state === "suspended") ctx.resume(); } catch (e) { return; }
    const t = ctx.currentTime + 0.01;
    const seq = (notes, dur, gap, type = "sine", peak = 0.18) => notes.forEach((n, k) => osc(type, f(n), t + k * gap, dur, peak, sfxBus, { attack: 0.005, release: dur * 0.6 }));
    switch (name) {
      case "click": seq([86], 0.08, 0, "triangle", 0.08); break;
      case "open": seq([74, 81], 0.18, 0.09, "triangle", 0.12); break;
      case "xp": seq([76, 83, 88], 0.22, 0.09); break;
      case "boss": seq([62, 69, 74, 81, 86], 0.35, 0.11, "triangle", 0.16); seq([50], 0.9, 0, "sine", 0.2); break;
      case "levelup": seq([74, 78, 81, 86, 93], 0.4, 0.12); break;
      case "evolve": seq([62, 66, 69, 74, 78, 81, 86, 90, 93, 98], 0.6, 0.1); seq([50, 57], 1.6, 0.5, "triangle", 0.15); break;
      case "fail": seq([70, 64], 0.25, 0.14, "square", 0.05); break;
    }
  }
  return { start, stop, toggle, isOn, wantsOn, sfx };
})();
