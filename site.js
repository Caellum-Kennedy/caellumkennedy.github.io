(function () {
  var docEl = document.documentElement;

  // --- Theme toggle ---
  document.getElementById('theme-toggle').addEventListener('click', function () {
    var next = docEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    docEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // --- Header background on scroll (always solid when data-solid is set) ---
  var header = document.getElementById('site-header');
  if (header.hasAttribute('data-solid')) {
    header.classList.add('scrolled');
  } else {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- Mobile nav ---
  var nav = document.getElementById('site-nav');
  var navToggle = document.getElementById('nav-toggle');
  navToggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.matches('.nav-link')) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // --- Scrollspy (same-page anchor links only) ---
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link')).filter(function (l) {
    return l.getAttribute('href').charAt(0) === '#';
  });
  var sections = links
    .map(function (l) { return document.querySelector(l.getAttribute('href')); })
    .filter(Boolean);
  if (sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) {
          if (l.getAttribute('href') === '#' + entry.target.id) {
            l.setAttribute('aria-current', 'true');
          } else {
            l.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  // --- FYP results comparison toggle ---
  var resultTabs = document.querySelectorAll('.results-tab');
  resultTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var mode = tab.getAttribute('data-mode');
      resultTabs.forEach(function (t) {
        t.setAttribute('aria-pressed', t === tab);
      });
      document.querySelectorAll('.results-chart').forEach(function (img) {
        img.classList.toggle('is-active', img.getAttribute('data-mode') === mode);
      });
      document.querySelectorAll('.results-note').forEach(function (n) {
        n.hidden = n.getAttribute('data-mode') !== mode;
      });
    });
  });

  // --- Footer year ---
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
