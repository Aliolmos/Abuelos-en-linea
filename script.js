
(function(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var c = document.getElementById('petals'), ctx = c.getContext('2d'), W, H, dpr, petals = [];
  function size(){ dpr = Math.min(window.devicePixelRatio||1, 2); W = innerWidth; H = innerHeight; c.width = W*dpr; c.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); }
  size(); addEventListener('resize', size);
  var N = innerWidth < 600 ? 12 : 22;
  function mk(top){ return { x: Math.random()*W, y: top ? -20 : Math.random()*H, s: 5+Math.random()*7, vy: .35+Math.random()*.6, vx: .2+Math.random()*.5, r: Math.random()*6.28, vr: (Math.random()-.5)*.03, sw: Math.random()*6.28, a: .35+Math.random()*.4 }; }
  for (var i=0;i<N;i++) petals.push(mk(false));
  var COLS = ['#ffcd29', '#02bdf4', '#f6f6e9', '#f0578c'];
  function petal(p){
    if (p.c === undefined) { p.c = COLS[Math.floor(Math.random()*COLS.length)]; p.k = Math.random() < .7 ? 0 : 1; }
    ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r); ctx.globalAlpha = p.a; ctx.fillStyle = p.c; ctx.beginPath();
    var s = p.s;
    if (p.k === 0) {
      /* estrellita de cuatro puntas, como las de la tapa */
      ctx.moveTo(0,-s); ctx.quadraticCurveTo(s*.18,-s*.18,s,0); ctx.quadraticCurveTo(s*.18,s*.18,0,s);
      ctx.quadraticCurveTo(-s*.18,s*.18,-s,0); ctx.quadraticCurveTo(-s*.18,-s*.18,0,-s);
    } else {
      /* corazoncito */
      ctx.moveTo(0,s*.7); ctx.bezierCurveTo(-s*1.2,-s*.1,-s*.5,-s*1.1,0,-s*.35); ctx.bezierCurveTo(s*.5,-s*1.1,s*1.2,-s*.1,0,s*.7);
    }
    ctx.closePath(); ctx.fill(); ctx.restore();
  }
  function tick(){
    ctx.clearRect(0,0,W,H);
    for (var i=0;i<petals.length;i++){
      var p = petals[i]; p.sw += .02; p.y += p.vy; p.x += p.vx + Math.sin(p.sw)*.4; p.r += p.vr;
      if (p.y > H+20 || p.x > W+20) petals[i] = mk(true);
      petal(p);
    }
    requestAnimationFrame(tick);
  }
  tick();
})();
