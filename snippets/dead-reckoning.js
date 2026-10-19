// Фрагмент из SHMOT4 WORLD (упрощён). © @developeraw, все права защищены.
//
// Другие игроки присылают позицию и скорость редко: при повороте, старте или остановке и раз в 2 с в движении.
// Между сообщениями фигура идёт по прогнозу, а к правильному месту «срезает» плавно, а не телепортируется.

const DR_MAX = 3.5; // с: дольше по старой скорости не ведём, ждём новое сообщение

function stepPeer(p, now, dt) {
  // где игрок сейчас по последнему сообщению: точка + скорость × время
  const age = Math.min(DR_MAX, (now - p.dr.t) / 1000);
  const tx = p.dr.x + p.dr.vx * age, tz = p.dr.z + p.dr.vz * age;

  // чем больше расхождение, тем быстрее догоняем, но не быстрее 10 м/с (ходят 5,7 м/с)
  let dx = tx - p.cur.x, dz = tz - p.cur.z;
  const e = Math.hypot(dx, dz);
  const k = Math.min(1, dt * (5 + Math.min(10, e * 2.5)));
  const f = e > 1e-6 ? Math.min(e * k, dt * 10) / e : 0;
  dx *= f; dz *= f;
  p.cur.x += dx; p.cur.z += dz;

  // поворот по кратчайшей дуге
  const dyaw = Math.atan2(Math.sin(p.dr.yaw - p.cur.yaw), Math.cos(p.dr.yaw - p.cur.yaw));
  p.cur.yaw += dyaw * Math.min(1, dt * 10);

  // скорость шага анимации — по фактическому смещению, чтобы ноги совпадали с движением
  const measured = dt > 0 ? Math.hypot(dx, dz) / dt : 0;
  p.spd += (measured - p.spd) * Math.min(1, dt * 6);
}
