(function () {
  var scene = document.documentElement;
  if (!scene) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tods = ['dawn', 'day', 'dusk', 'night'];
  var wxs = ['sun', 'rain', 'wind', 'snow'];
  var dists = 6, mottos = 4;
  var flip = 'a';

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) scene.setAttribute('data-tod', 'night');
  if (reduced) return;

  setInterval(function () {
    var cur = scene.getAttribute('data-tod') || 'day';
    var t = tods[(tods.indexOf(cur) + 1) % tods.length];
    var pool = wxs.filter(function (x) { return x !== scene.getAttribute('data-wx'); });
    scene.setAttribute('data-tod', t);
    scene.setAttribute('data-wx', pool[Math.floor(Math.random() * pool.length)]);
    flip = flip === 'a' ? 'b' : 'a';
    scene.setAttribute('data-flip', flip);
  }, 9000);

  setInterval(function () {
    var cur = +scene.getAttribute('data-mi');
    var pool = [];
    for (var i = 0; i < mottos; i++) if (i !== cur) pool.push(i);
    scene.setAttribute('data-mi', pool[Math.floor(Math.random() * pool.length)]);
  }, 12000);

  var advance = function () {
    scene.setAttribute('data-di', (+scene.getAttribute('data-di') + 1) % dists);
  };
  var sign = document.getElementById('signpass');
  if (sign) {
    sign.addEventListener('animationiteration', function (e) { if (e.target === sign) advance(); });
  } else {
    setInterval(advance, 4200);
  }
})();
