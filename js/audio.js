/* ==========================================================================
   AUDIO ENGINE (Web Audio API Synthesizers)
   Không cần tải file mp3 bên ngoài, tự sinh âm thanh trực tiếp trên trình duyệt.
   ========================================================================== */

const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

/**
 * Khởi tạo AudioContext khi người dùng tương tác lần đầu
 */
function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new AudioCtx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

/**
 * Âm thanh chuông "Ting Ting!" êm tai khi tìm đúng điểm khác biệt
 */
function playCuteDing() {
  ensureAudio();
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.08);

    gain.gain.setValueAtTime(0, audioCtx.currentTime + idx * 0.08);
    gain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + idx * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.08 + 0.6);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + idx * 0.08);
    osc.stop(audioCtx.currentTime + idx * 0.08 + 0.65);
  });
}

/**
 * Đoạn nhạc Fanfare vui nhộn khi hoàn thành Màn 1
 */
function playVictoryFanfare() {
  ensureAudio();
  const melody = [
    { f: 523.25, t: 0.0, d: 0.15 },
    { f: 659.25, t: 0.15, d: 0.15 },
    { f: 783.99, t: 0.3, d: 0.18 },
    { f: 1046.5, t: 0.48, d: 0.5 }
  ];
  melody.forEach(n => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(n.f, audioCtx.currentTime + n.t);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime + n.t);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + n.t + n.d);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + n.t);
    osc.stop(audioCtx.currentTime + n.t + n.d);
  });
}

/**
 * Tiếng bong bóng "pop" nhẹ nhàng khi click trượt
 */
function playSoftPop() {
  ensureAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.06);
  gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.09);
}

/**
 * TIẾNG THÉT HÙ MA KINH HOÀNG CỰC ĐẠI
 * Tổng hợp đa tần số gắt, sóng méo và nhiễu trắng âm lượng lớn
 */
function playScareSound() {
  ensureAudio();
  const duration = 3.0;
  const sampleRate = audioCtx.sampleRate;
  const buffer = audioCtx.createBuffer(2, sampleRate * duration, sampleRate);

  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      let s = 0;
      s += Math.sin(2 * Math.PI * 240 * t) * 0.45;
      s += Math.sin(2 * Math.PI * 480 * t * (1 + 0.15 * Math.sin(35 * t))) * 0.4;
      s += Math.sin(2 * Math.PI * 920 * t) * 0.35;
      s += Math.sin(2 * Math.PI * 1350 * t * (1 + 0.25 * Math.sin(55 * t))) * 0.3;
      s += (Math.random() * 2 - 1) * 0.4; // Nhiễu trắng méo tiếng
      s = Math.tanh(s * 4); // Distortion / Overdrive
      const env = Math.exp(-t * 0.95);
      data[i] = s * env * 0.95;
    }
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  const masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(1.0, audioCtx.currentTime);
  source.connect(masterGain);
  masterGain.connect(audioCtx.destination);
  source.start();
}
