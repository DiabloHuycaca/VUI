/* ==========================================================================
   CANVAS GRAPHICS ENGINE
   Vẽ trực tiếp 2 màn chơi hoạt hình ngộ nghĩnh và đầy màu sắc bằng Canvas API
   ========================================================================== */

/**
 * MÀN 1: BÉ MÈO VÀ VƯỜN DÂU TÂY
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} w Chiều rộng canvas
 * @param {number} h Chiều cao canvas
 * @param {boolean} isRightSide Bức tranh bên phải (chứa điểm khác biệt)
 * @param {Set} differencesFound Tập hợp các điểm đã tìm thấy
 */
function drawCuteCatScene(ctx, w, h, isRightSide, differencesFound) {
  ctx.clearRect(0, 0, w, h);

  // Bầu trời nắng ấm gradient
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#d4f0ff');
  sky.addColorStop(0.65, '#fff5ea');
  sky.addColorStop(1, '#c8f7c5');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Cầu vồng lung linh phía xa
  const rainbowColors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff'];
  rainbowColors.forEach((col, idx) => {
    ctx.strokeStyle = col;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(w * 0.25, h * 0.65, 140 - idx * 4, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
  });

  // Mây trắng bồng bềnh
  ctx.fillStyle = '#ffffff';
  [
    { x: 70, y: 55, r: 24 }, { x: 95, y: 50, r: 30 }, { x: 120, y: 55, r: 22 },
    { x: 290, y: 70, r: 22 }, { x: 315, y: 65, r: 28 }, { x: 338, y: 70, r: 20 }
  ].forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Mặt trời mỉm cười đáng yêu
  ctx.fillStyle = '#ffea79';
  ctx.beginPath();
  ctx.arc(320, 50, 26, 0, Math.PI * 2);
  ctx.fill();
  // Má hồng mặt trời
  ctx.fillStyle = '#ff9999';
  ctx.beginPath();
  ctx.arc(312, 54, 4, 0, Math.PI * 2);
  ctx.arc(328, 54, 4, 0, Math.PI * 2);
  ctx.fill();
  // Miệng cười
  ctx.strokeStyle = '#d48800';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(320, 52, 6, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Đồi cỏ xanh thoai thoải
  ctx.fillStyle = '#a8e6cf';
  ctx.beginPath();
  ctx.ellipse(w * 0.3, h * 0.95, w * 0.6, h * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#88d8b0';
  ctx.beginPath();
  ctx.ellipse(w * 0.75, h * 0.98, w * 0.6, h * 0.28, 0, 0, Math.PI * 2);
  ctx.fill();

  // CHÚ MÈO TRẮNG BÉO MẦM Ở CHÍNH GIỮA
  const catX = w * 0.48;
  const catY = h * 0.65;

  // Thân mèo
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(catX, catY + 25, 52, 45, 0, 0, Math.PI * 2);
  ctx.fill();

  // Đầu mèo
  ctx.beginPath();
  ctx.ellipse(catX, catY - 20, 42, 38, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tai mèo
  ctx.beginPath();
  ctx.moveTo(catX - 35, catY - 35);
  ctx.lineTo(catX - 25, catY - 65);
  ctx.lineTo(catX - 8, catY - 45);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(catX + 8, catY - 45);
  ctx.lineTo(catX + 25, catY - 65);
  ctx.lineTo(catX + 35, catY - 35);
  ctx.fill();

  // Lòng tai hồng
  ctx.fillStyle = '#ffb3c1';
  ctx.beginPath();
  ctx.moveTo(catX - 30, catY - 38);
  ctx.lineTo(catX - 24, catY - 58);
  ctx.lineTo(catX - 12, catY - 44);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(catX + 12, catY - 44);
  ctx.lineTo(catX + 24, catY - 58);
  ctx.lineTo(catX + 30, catY - 38);
  ctx.fill();

  // Khuôn mặt mèo cười tít mắt ^ ^
  ctx.strokeStyle = '#4a4a4a';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(catX - 16, catY - 22, 6, Math.PI * 1.1, Math.PI * 1.9);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(catX + 16, catY - 22, 6, Math.PI * 1.1, Math.PI * 1.9);
  ctx.stroke();

  // Mũi hồng
  ctx.fillStyle = '#ff758c';
  ctx.beginPath();
  ctx.ellipse(catX, catY - 14, 4, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Miệng mèo :3
  ctx.strokeStyle = '#4a4a4a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(catX - 4, catY - 9, 4, 0.2, Math.PI - 0.2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(catX + 4, catY - 9, 4, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Má hồng phúng phính
  ctx.fillStyle = '#ffccd5';
  ctx.beginPath();
  ctx.ellipse(catX - 25, catY - 12, 7, 5, 0, 0, Math.PI * 2);
  ctx.ellipse(catX + 25, catY - 12, 7, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Đuôi mèo cong cong
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(catX - 45, catY + 35);
  ctx.quadraticCurveTo(catX - 75, catY + 20, catX - 70, catY - 5);
  ctx.stroke();

  // Nơ cổ xinh xắn màu hồng
  ctx.fillStyle = '#ff4d6d';
  ctx.beginPath();
  ctx.ellipse(catX, catY + 12, 6, 6, 0, 0, Math.PI * 2);
  ctx.ellipse(catX - 10, catY + 12, 8, 5, -0.3, 0, Math.PI * 2);
  ctx.ellipse(catX + 10, catY + 12, 8, 5, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Quả dâu 1 (Gốc cỏ bên trái)
  drawStrawberry(ctx, 110, 235, false);

  // ĐIỂM KHÁC BIỆT 1: Quả dâu bên phải
  // Bên trái: Quả dâu đỏ tươi.
  // Bên phải: Quả dâu vàng kim óng ánh!
  if (isRightSide) {
    drawStrawberry(ctx, 290, 220, true);
  } else {
    drawStrawberry(ctx, 290, 220, false);
  }

  // ĐIỂM KHÁC BIỆT 2: Chú bướm cạnh đuôi mèo
  // Bên trái: Bướm xanh lam biển.
  // Bên phải: Bướm hồng kẹo ngọt!
  if (!isRightSide) {
    drawButterfly(ctx, 85, 140, '#70d6ff');
  } else {
    drawButterfly(ctx, 85, 140, '#ff99c8');
  }

  // Vài bông hoa cúc trắng trên bãi cỏ
  drawDaisy(ctx, 180, 245, '#fff');
  drawDaisy(ctx, 220, 255, '#fff');
}

/**
 * Vẽ quả dâu tây
 */
function drawStrawberry(ctx, x, y, isGolden) {
  ctx.save();
  ctx.fillStyle = isGolden ? '#ffb703' : '#ff3366';
  ctx.beginPath();
  ctx.moveTo(x, y - 12);
  ctx.quadraticCurveTo(x + 16, y - 12, x + 14, y + 10);
  ctx.quadraticCurveTo(x, y + 22, x, y + 22);
  ctx.quadraticCurveTo(x, y + 22, x - 14, y + 10);
  ctx.quadraticCurveTo(x - 16, y - 12, x, y - 12);
  ctx.fill();

  // Cuống lá xanh
  ctx.fillStyle = isGolden ? '#38b000' : '#2ec4b6';
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.ellipse(x + i * 8, y - 12, 5, 3, i * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Hạt dâu
  ctx.fillStyle = isGolden ? '#ffffff' : '#ffeaa7';
  [
    { dx: -5, dy: -2 }, { dx: 4, dy: -3 }, { dx: 0, dy: 5 },
    { dx: -5, dy: 10 }, { dx: 5, dy: 9 }
  ].forEach(pt => {
    ctx.beginPath();
    ctx.arc(x + pt.dx, y + pt.dy, 1.2, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

/**
 * Vẽ chú bướm xinh
 */
function drawButterfly(ctx, x, y, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x - 8, y - 6, 9, 6, -0.4, 0, Math.PI * 2);
  ctx.ellipse(x + 8, y - 6, 9, 6, 0.4, 0, Math.PI * 2);
  ctx.ellipse(x - 6, y + 5, 6, 4, 0.3, 0, Math.PI * 2);
  ctx.ellipse(x + 6, y + 5, 6, 4, -0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#4a4a4a';
  ctx.beginPath();
  ctx.ellipse(x, y, 2, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/**
 * Vẽ hoa cúc họa mi
 */
function drawDaisy(ctx, x, y, color) {
  ctx.save();
  ctx.fillStyle = color;
  for (let i = 0; i < 5; i++) {
    const ang = (i * Math.PI * 2) / 5;
    ctx.beginPath();
    ctx.arc(x + Math.cos(ang) * 7, y + Math.sin(ang) * 7, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/**
 * MÀN 2: RỪNG ĐOM ĐÓM HUYỀN BÍ (BẪY TẬP TRUNG CAO ĐỘ)
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} w Chiều rộng canvas
 * @param {number} h Chiều cao canvas
 */
function drawTwilightScene(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);

  // Bầu trời đêm tím huyền ảo
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#1d1135');
  sky.addColorStop(0.5, '#2e1c59');
  sky.addColorStop(1, '#1b2a47');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Trăng khuyết lung linh
  ctx.fillStyle = '#fff9d2';
  ctx.beginPath();
  ctx.arc(70, 60, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1d1135';
  ctx.beginPath();
  ctx.arc(80, 56, 25, 0, Math.PI * 2);
  ctx.fill();

  // Ngôi sao nhỏ lấp lánh
  ctx.fillStyle = '#fff';
  [
    { x: 140, y: 35 }, { x: 220, y: 55 }, { x: 300, y: 40 },
    { x: 180, y: 80 }, { x: 330, y: 90 }, { x: 260, y: 30 }
  ].forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Đồi cỏ đêm
  ctx.fillStyle = '#0f2027';
  ctx.beginPath();
  ctx.ellipse(w * 0.5, h * 0.98, w * 0.7, h * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();

  // Nấm dạ quang phát sáng
  drawGlowMushroom(ctx, 110, 220, '#ff4081');
  drawGlowMushroom(ctx, 280, 225, '#00e5ff');
  drawGlowMushroom(ctx, 250, 240, '#76ff03');

  // Bé thỏ trắng đang ngủ say
  const bx = w * 0.5;
  const by = h * 0.72;
  ctx.fillStyle = '#f0f3f4';
  ctx.beginPath();
  ctx.ellipse(bx, by, 38, 28, 0, 0, Math.PI * 2);
  ctx.fill();
  // Đầu thỏ
  ctx.beginPath();
  ctx.arc(bx - 26, by - 8, 20, 0, Math.PI * 2);
  ctx.fill();
  // Tai thỏ rũ xuống
  ctx.beginPath();
  ctx.ellipse(bx - 42, by - 5, 18, 7, 0.2, 0, Math.PI * 2);
  ctx.fill();
  // Mắt ngủ
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(bx - 32, by - 9, 4, Math.PI * 1.1, Math.PI * 1.9);
  ctx.stroke();
  // Má hồng
  ctx.fillStyle = '#ff80ab';
  ctx.beginPath();
  ctx.arc(bx - 32, by - 3, 3, 0, Math.PI * 2);
  ctx.fill();

  // Các đốm đom đóm phát sáng lập lòe (khiến người chơi phải nhìn thật sát)
  const fireflies = [
    { x: 180, y: 170, c: '#ffeb3b' },
    { x: 215, y: 155, c: '#69f0ae' },
    { x: 310, y: 165, c: '#ff4081' },
    { x: 145, y: 195, c: '#40c4ff' },
    { x: 235, y: 210, c: '#ffff00' }
  ];
  fireflies.forEach(f => {
    ctx.shadowColor = f.c;
    ctx.shadowBlur = 15;
    ctx.fillStyle = f.c;
    ctx.beginPath();
    ctx.arc(f.x, f.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

/**
 * Vẽ nấm dạ quang
 */
function drawGlowMushroom(ctx, x, y, capColor) {
  ctx.save();
  // Thân nấm
  ctx.fillStyle = '#e0e0e0';
  ctx.beginPath();
  ctx.ellipse(x, y + 10, 6, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  // Mũ nấm phát sáng
  ctx.shadowColor = capColor;
  ctx.shadowBlur = 20;
  ctx.fillStyle = capColor;
  ctx.beginPath();
  ctx.arc(x, y - 4, 18, Math.PI, 0);
  ctx.fill();
  ctx.shadowBlur = 0;
  // Đốm trắng trên mũ
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x - 8, y - 10, 2.5, 0, Math.PI * 2);
  ctx.arc(x + 6, y - 12, 3, 0, Math.PI * 2);
  ctx.arc(x, y - 16, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
