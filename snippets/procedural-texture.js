// Фрагмент из SHMOT4 WORLD. © @developeraw, все права защищены.
//
// Резиновая плитка спортзала, нарисованная на канве: 512 px = 2 × 2 плитки по 1 м.
// Ничего не скачивается, текстура повторяется по полу, свет запечён отдельно в вершины.

const rng = seed => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

function drawGymFloor(g, W, H) {
  const r = rng(41), T = W / 2;
  // плитки с лёгкой разницей тона
  for (let y = 0; y < 2; y++) for (let x = 0; x < 2; x++) {
    const c = 30 + r() * 7 | 0;
    g.fillStyle = `rgb(${c},${c + 1},${c + 4})`; g.fillRect(x * T, y * T, T, T);
  }
  // резиновая крошка: синие, серые и тёмные вкрапления
  for (let i = 0; i < 9000; i++) {
    const k = r(), sz = 1 + r() * 2.2;
    g.fillStyle = k < 0.2 ? 'rgba(52,96,210,0.75)' : k < 0.28 ? 'rgba(200,205,215,0.45)' : k < 0.62 ? 'rgba(72,74,82,0.6)' : 'rgba(0,0,0,0.5)';
    g.fillRect(r() * W, r() * H, sz, sz);
  }
  // потёртости
  g.strokeStyle = 'rgba(255,255,255,0.035)'; g.lineWidth = 7;
  for (let i = 0; i < 7; i++) {
    const x = r() * W, y = r() * H;
    g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 40, y + r() * 60 - 30, x + 30 + 90 * r(), y + r() * 40 - 20); g.stroke();
  }
  // швы между плитками
  g.fillStyle = 'rgba(0,0,0,0.7)';
  for (const q of [0, T]) { g.fillRect(q, 0, 2, H); g.fillRect(0, q, W, 2); }
}
