// One little playable idea. No requests, audio, storage or background simulation.
(() => {
  const canvas = document.querySelector('#idea-game');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  if (!context) return;
  context.imageSmoothingEnabled = false;
  const game = canvas.closest('.pixel-game');
  const overlay = game.querySelector('#game-overlay');
  const title = game.querySelector('#game-title');
  const prompt = game.querySelector('#game-prompt');
  const start = game.querySelector('#game-start');
  start.disabled = false;
  const pause = game.querySelector('#game-pause');
  const restart = game.querySelector('#game-restart');
  const status = game.querySelector('#game-status');
  const buttons = [...game.querySelectorAll('[data-game-control]')];
  const platforms = [
    { x: 0, y: 220, w: 94, h: 20 }, { x: 116, y: 220, w: 204, h: 20 },
    { x: 47, y: 183, w: 55, h: 8 }, { x: 126, y: 151, w: 48, h: 8 },
    { x: 202, y: 119, w: 48, h: 8 }, { x: 264, y: 87, w: 40, h: 8 }
  ];
  const sparkPositions = [[30, 204], [75, 169], [150, 137], [224, 105], [280, 73]];
  const sprite = ['00100100','01111110','11011011','11111111','11111111','01111110','01111110','01000010'];
  const input = new Set();
  let state = 'ready', player, sparks, collected = 0, frame = 0, last = 0;
  let accumulator = 0, jumpBuffer = 0, coyote = 0, facing = 1;

  const announce = text => { status.textContent = text; };
  const clearInput = () => {
    input.clear();
    buttons.forEach(button => button.classList.remove('is-pressed'));
    jumpBuffer = 0;
  };
  const spawn = () => {
    player = { x: 16, y: 204, vx: 0, vy: 0, w: 12, h: 16, grounded: true };
    coyote = .1;
  };
  const setState = next => {
    state = next;
    canvas.dataset.state = next;
    buttons.forEach(button => { button.disabled = next !== 'playing'; });
    pause.disabled = next === 'ready' || next === 'won';
    restart.disabled = next === 'ready';
    pause.textContent = next === 'paused' ? 'Resume' : 'Pause';
  };
  const panel = (heading, text, action) => {
    title.textContent = heading;
    prompt.textContent = text;
    start.textContent = action;
    overlay.hidden = false;
  };
  const beginLoop = () => {
    last = performance.now(); accumulator = 0;
    frame = requestAnimationFrame(tick);
  };
  const play = () => {
    cancelAnimationFrame(frame); clearInput();
    collected = 0; sparks = sparkPositions.map(([x, y]) => ({ x, y, taken: false }));
    spawn(); facing = 1; setState('playing'); overlay.hidden = true;
    announce('Sparks: 0/5. Reach the flag.');
    canvas.focus({ preventScroll: true }); beginLoop();
  };
  const resume = () => {
    if (state !== 'paused') return;
    clearInput(); setState('playing'); overlay.hidden = true;
    announce(`Sparks: ${collected}/5. Keep going!`);
    canvas.focus({ preventScroll: true }); beginLoop();
  };
  const suspend = () => {
    if (state !== 'playing') return;
    cancelAnimationFrame(frame); clearInput(); setState('paused');
    panel('TAKE A BREATH.', 'Your little adventure will be right here.', 'Resume');
    announce('Paused. Your sparks are safe.'); draw();
  };
  start.addEventListener('click', () => state === 'paused' ? resume() : play());
  pause.addEventListener('click', () => state === 'playing' ? suspend() : resume());
  restart.addEventListener('click', play);

  const keyControl = code => ({ ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', Space: 'jump', ArrowUp: 'jump', KeyW: 'jump' })[code];
  canvas.addEventListener('keydown', event => {
    if (event.code === 'Escape') { event.preventDefault(); state === 'playing' ? suspend() : resume(); return; }
    if (event.code === 'KeyR' && state !== 'ready') { event.preventDefault(); play(); return; }
    const control = keyControl(event.code);
    if (!control || state !== 'playing') return;
    event.preventDefault();
    if (control === 'jump') { if (!event.repeat) jumpBuffer = .14; }
    else input.add(event.code);
  });
  canvas.addEventListener('keyup', event => {
    if (keyControl(event.code) && state === 'playing') event.preventDefault();
    input.delete(event.code);
  });
  buttons.forEach(button => {
    const control = button.dataset.gameControl;
    button.addEventListener('pointerdown', event => {
      if (state !== 'playing') return;
      event.preventDefault(); canvas.focus({ preventScroll: true });
      button.setPointerCapture(event.pointerId);
      button.classList.add('is-pressed');
      if (control === 'jump') jumpBuffer = .14;
      else input.add('touch-' + control);
    });
    const release = () => { input.delete('touch-' + control); button.classList.remove('is-pressed'); };
    button.addEventListener('pointerup', release);
    button.addEventListener('pointercancel', release);
    button.addEventListener('lostpointercapture', release);
  });
  game.addEventListener('focusout', event => { if (!game.contains(event.relatedTarget)) suspend(); });
  window.addEventListener('blur', suspend);
  document.addEventListener('visibilitychange', () => { if (document.hidden) suspend(); });
  new IntersectionObserver(entries => { if (!entries[0].isIntersecting) suspend(); }).observe(game);

  function update(dt) {
    const left = input.has('ArrowLeft') || input.has('KeyA') || input.has('touch-left');
    const right = input.has('ArrowRight') || input.has('KeyD') || input.has('touch-right');
    player.vx = (Number(right) - Number(left)) * 100;
    if (player.vx) facing = Math.sign(player.vx);
    coyote = player.grounded ? .1 : Math.max(0, coyote - dt);
    jumpBuffer = Math.max(0, jumpBuffer - dt);
    if (jumpBuffer > 0 && coyote > 0) {
      player.vy = -255; player.grounded = false; jumpBuffer = 0; coyote = 0;
    }
    player.x = Math.max(0, Math.min(320 - player.w, player.x + player.vx * dt));
    const previousFeet = player.y + player.h;
    player.vy = Math.min(400, player.vy + 720 * dt);
    player.y += player.vy * dt; player.grounded = false;
    if (player.vy >= 0) {
      for (const platform of platforms) {
        if (player.x + player.w > platform.x && player.x < platform.x + platform.w && previousFeet <= platform.y + .2 && player.y + player.h >= platform.y) {
          player.y = platform.y - player.h; player.vy = 0; player.grounded = true; break;
        }
      }
    }
    if (player.y > 260) { spawn(); announce(`Try again! Sparks kept: ${collected}/5.`); }
    for (const spark of sparks) {
      if (!spark.taken && Math.abs(player.x + player.w / 2 - spark.x) < 13 && Math.abs(player.y + player.h / 2 - spark.y) < 15) {
        spark.taken = true; collected++; announce(`Sparks: ${collected}/5. ${collected === 5 ? 'Now reach the flag!' : 'Nice idea!'}`);
      }
    }
    if (collected === 5 && player.x + player.w > 292 && player.y + player.h <= 89 && player.y + player.h >= 57) {
      clearInput(); setState('won');
      panel('NICE IDEA.', 'Five sparks collected. You made it happen.', 'Play again');
      announce('You won! Five sparks, one playable idea.');
    }
  }

  function draw() {
    const c = context;
    c.fillStyle = '#fff'; c.fillRect(0, 0, 320, 240);
    c.fillStyle = '#e8e8e8';
    // Quiet pixel scenery, never an animated distraction before Play.
    for (let x = 0; x < 320; x += 16) {
      const height = 14 + ((x * 7) % 39);
      c.fillRect(x, 220 - height, 15, height);
    }
    c.strokeStyle = '#ddd'; c.lineWidth = 1;
    for (let x = 8; x < 320; x += 24) for (let y = 42; y < 210; y += 24) { c.fillStyle = '#ddd'; c.fillRect(x, y, 1, 1); }
    c.fillStyle = '#000'; c.font = 'bold 9px monospace'; c.textBaseline = 'top';
    c.fillText('IDEA HOP', 10, 10); c.textAlign = 'right'; c.fillText(`SPARKS ${collected}/5`, 310, 10); c.textAlign = 'left';
    for (const platform of platforms) {
      c.fillStyle = '#000'; c.fillRect(platform.x, platform.y, platform.w, platform.h);
      c.fillStyle = '#fff';
      for (let x = platform.x + 4; x < platform.x + platform.w - 2; x += 12) c.fillRect(x, platform.y + 3, 4, 1);
    }
    // Checkered destination flag.
    c.fillStyle = '#000'; c.fillRect(299, 57, 2, 30);
    for (let x = 0; x < 4; x++) for (let y = 0; y < 3; y++) {
      c.fillStyle = (x + y) % 2 ? '#fff' : '#000'; c.fillRect(283 + x * 4, 57 + y * 4, 4, 4);
    }
    for (const spark of sparks) if (!spark.taken) {
      c.fillStyle = '#000'; c.fillRect(spark.x - 1, spark.y - 5, 3, 11); c.fillRect(spark.x - 5, spark.y - 1, 11, 3);
      c.fillStyle = '#fff'; c.fillRect(spark.x, spark.y, 1, 1);
    }
    const px = Math.round(player.x) - 2, py = Math.round(player.y);
    c.fillStyle = '#000';
    sprite.forEach((row, y) => [...row].forEach((pixel, x) => {
      if (pixel === '1') c.fillRect(px + (facing > 0 ? x : 7 - x) * 2, py + y * 2, 2, 2);
    }));
    c.fillStyle = '#fff'; c.fillRect(px + (facing > 0 ? 10 : 4), py + 5, 2, 2);
  }
  function tick(now) {
    if (state !== 'playing') return;
    accumulator += Math.min(.05, (now - last) / 1000); last = now;
    while (accumulator >= 1 / 120 && state === 'playing') { update(1 / 120); accumulator -= 1 / 120; }
    draw();
    if (state === 'playing') frame = requestAnimationFrame(tick);
  }
  sparks = sparkPositions.map(([x, y]) => ({ x, y, taken: false }));
  spawn(); setState('ready'); draw();
})();
