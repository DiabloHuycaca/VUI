/* ==========================================================================
   GAME CONTROLLER & JUMP SCARE ORCHESTRATOR
   Quản lý tiến trình chơi, bắt sự kiện click và kích hoạt cú nổ Jump Scare
   ========================================================================== */

// Fallback ảnh kinh dị bằng Base64 đề phòng lỗi đường dẫn ảnh
const SCARE_IMAGE_B64 = "scare.jpg";

let currentLevel = 1;
let foundDifferences = new Set();
let gameTimer = null;
let seconds = 0;
let scareTriggered = false;

// Toạ độ 2 điểm khác biệt ở Màn 1 (bán kính nhận diện 40px)
const level1Diffs = [
  { id: 1, x: 290, y: 220, r: 40 }, // Quả dâu vàng
  { id: 2, x: 85, y: 140, r: 40 }   // Chú bướm hồng
];

/* Khởi tạo bong bóng bay khi trang tải xong */
document.addEventListener('DOMContentLoaded', () => {
  createFloatingBubbles();
  preloadScareImage();
  initCanvasListeners();
});

/**
 * Sinh bong bóng icon dễ thương bay từ dưới lên
 */
function createFloatingBubbles() {
  const container = document.getElementById('bg-bubbles');
  if (!container) return;
  const bubbleIcons = ['🌸', '✨', '🍓', '🐾', '💕', '⭐', '🐰', '🎀'];

  for (let i = 0; i < 20; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    b.textContent = bubbleIcons[Math.floor(Math.random() * bubbleIcons.length)];
    b.style.left = Math.random() * 100 + 'vw';
    b.style.animationDuration = (8 + Math.random() * 8) + 's';
    b.style.animationDelay = (Math.random() * 8) + 's';
    b.style.fontSize = (18 + Math.random() * 16) + 'px';
    container.appendChild(b);
  }
}

/**
 * Tải trước ảnh hù ma vào bộ nhớ đệm
 */
function preloadScareImage() {
  const scareImg = document.getElementById('scare-image');
  if (scareImg) {
    const preloader = new Image();
    preloader.src = scareImg.src;
  }
}

/**
 * Bắt đầu vào game (Màn 1)
 */
function startGame() {
  ensureAudio();

  document.getElementById('landing').style.display = 'none';
  const game = document.getElementById('game');
  game.style.display = 'flex';

  currentLevel = 1;
  foundDifferences.clear();
  document.getElementById('stat-found').textContent = '0';
  document.getElementById('stat-total').textContent = '2';

  renderLevel1();

  // Khởi động đồng hồ bấm giờ ngây thơ
  seconds = 0;
  clearInterval(gameTimer);
  gameTimer = setInterval(() => {
    seconds++;
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    document.getElementById('nav-timer').textContent = `⏱️ ${mm}:${ss}`;
  }, 1000);
}

/**
 * Vẽ 2 bức tranh Màn 1
 */
function renderLevel1() {
  const cL = document.getElementById('canvas-left');
  const cR = document.getElementById('canvas-right');
  if (cL && cR) {
    drawCuteCatScene(cL.getContext('2d'), 380, 285, false, foundDifferences);
    drawCuteCatScene(cR.getContext('2d'), 380, 285, true, foundDifferences);
  }
}

/**
 * Lắng nghe sự kiện click trên 2 khung tranh
 */
function initCanvasListeners() {
  ['canvas-left', 'canvas-right'].forEach(canvasId => {
    const cvs = document.getElementById(canvasId);
    if (!cvs) return;

    cvs.addEventListener('click', (e) => {
      if (scareTriggered) return;

      const rect = cvs.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (currentLevel === 1) {
        handleLevel1Click(clickX, clickY, cvs.parentElement);
      } else if (currentLevel === 2) {
        // BẤT KỲ CLICK NÀO Ở MÀN 2 ĐỀU KÍCH HOẠT JUMP SCARE NGAY LẬP TỨC!
        triggerScare();
      }
    });
  });
}

/**
 * Xử lý click ở Màn 1
 */
function handleLevel1Click(x, y, cardWrapper) {
  let matched = false;

  level1Diffs.forEach(diff => {
    const dist = Math.hypot(x - diff.x, y - diff.y);
    if (dist <= diff.r && !foundDifferences.has(diff.id)) {
      matched = true;
      foundDifferences.add(diff.id);

      // Tiếng chuông Ting Ting!
      playCuteDing();

      // Đánh dấu vòng tròn phát sáng
      createFoundMarker(diff.x, diff.y, cardWrapper);

      document.getElementById('stat-found').textContent = foundDifferences.size;

      // Khi tìm đủ 2 điểm -> Chiến thắng Màn 1!
      if (foundDifferences.size === 2) {
        clearInterval(gameTimer);
        setTimeout(() => {
          playVictoryFanfare();
          document.getElementById('level-modal').style.display = 'flex';
        }, 500);
      }
    }
  });

  if (!matched) {
    playSoftPop();
  }
}

/**
 * Tạo vòng tròn hồng phát sáng đánh dấu điểm đúng
 */
function createFoundMarker(x, y, wrapper) {
  const ring = document.createElement('div');
  ring.className = 'found-ring';
  ring.style.left = (x + 10) + 'px';
  ring.style.top = (y + 30) + 'px';
  wrapper.appendChild(ring);
}

/**
 * TIẾN VÀO MÀN 2: BẪY GIÁN ĐIỆP (CỰC KHÓ)
 */
function startLevel2() {
  ensureAudio();
  document.getElementById('level-modal').style.display = 'none';
  currentLevel = 2;

  // Cập nhật giao diện sang chế độ siêu khó
  document.getElementById('nav-level').innerHTML = '<span>🍄</span> Màn 2: Rừng Đom Đóm (Cực Khó)';
  document.getElementById('stat-found').textContent = '0';
  document.getElementById('stat-total').textContent = '1';
  document.getElementById('game-hint').style.display = 'none';
  document.getElementById('level2-hint').style.display = 'block';

  // Xoá các vòng tròn đánh dấu cũ
  document.querySelectorAll('.found-ring').forEach(el => el.remove());

  // Vẽ khung cảnh đêm huyền bí
  const cL = document.getElementById('canvas-left');
  const cR = document.getElementById('canvas-right');
  drawTwilightScene(cL.getContext('2d'), 380, 285);
  drawTwilightScene(cR.getContext('2d'), 380, 285);

  // Đếm ngược tự động: Sau 6.5s nạn nhân dán mắt vào tìm -> BÙM!
  setTimeout(() => {
    if (!scareTriggered && currentLevel === 2) {
      triggerScare();
    }
  }, 6500);
}

/**
 * KÍCH HOẠT JUMP SCARE KINH HOÀNG
 */
function triggerScare() {
  if (scareTriggered) return;
  scareTriggered = true;

  clearInterval(gameTimer);

  // Ẩn tất cả màn chơi & modal
  document.getElementById('game').style.display = 'none';
  document.getElementById('level-modal').style.display = 'none';
  document.getElementById('landing').style.display = 'none';

  // Bật màn hình hù ma toàn màn hình
  const overlay = document.getElementById('scare-overlay');
  overlay.style.display = 'flex';
  overlay.classList.add('active');

  // Phát tiếng thét kinh dị
  playScareSound();

  // Rung thiết bị di động
  if (navigator.vibrate) {
    navigator.vibrate([300, 100, 300, 100, 400]);
  }

  // Chớp nháy màn hình đỏ đen điên cuồng
  let flashes = 0;
  const flashTimer = setInterval(() => {
    flashes++;
    overlay.style.background = flashes % 2 === 0 ? '#000' : '#4a0000';
    if (flashes > 10) {
      clearInterval(flashTimer);
      overlay.style.background = '#000';
    }
  }, 70);

  // Chuyển sang màn hình Troll sau 3.2 giây
  setTimeout(() => {
    overlay.style.display = 'none';
    overlay.classList.remove('active');
    document.getElementById('aftermath').style.display = 'flex';
  }, 3200);
}
