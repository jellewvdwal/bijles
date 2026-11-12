(function () {
  var track = document.getElementById('slides');
  var slides = track.querySelectorAll('.slide');
  var dots = document.getElementById('dots');
  var current = 0, timer;
  slides.forEach(function (_, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', (document.documentElement.lang === 'en' ? 'Review ' : 'Beoordeling ') + (i + 1));
    b.addEventListener('click', function () { go(i); restart(); });
    dots.appendChild(b);
  });
  function mark(i) {
    current = i;
    dots.querySelectorAll('button').forEach(function (d, j) { d.setAttribute('aria-current', j === i ? 'true' : 'false'); });
  }
  function go(i) {
    i = (i + slides.length) % slides.length;
    track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: 'smooth' });
    mark(i);
  }
  track.addEventListener('scroll', function () {
    var i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== current) mark(i);
  }, { passive: true });
  document.getElementById('prev').addEventListener('click', function () { go(current - 1); restart(); });
  document.getElementById('next').addEventListener('click', function () { go(current + 1); restart(); });
  function restart() {
    clearInterval(timer);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = setInterval(function () { go(current + 1); }, 9000);
    }
  }
  var slider = track.parentElement;
  slider.addEventListener('mouseenter', function () { clearInterval(timer); });
  slider.addEventListener('mouseleave', restart);
  slider.addEventListener('focusin', function () { clearInterval(timer); });
  mark(0);
  restart();
})();
