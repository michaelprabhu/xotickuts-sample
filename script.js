/* Xotic Kuts sample preview - progressive enhancement only.
   Navigation, phone, email and every source link work without this file. */
(function () {
  'use strict';

  var links = Array.prototype.slice.call(
    document.querySelectorAll('.nav__list a[href^="#"]')
  );
  if (!links.length || typeof IntersectionObserver === 'undefined') {
    return;
  }

  var sections = links
    .map(function (link) {
      return document.getElementById(link.getAttribute('href').slice(1));
    })
    .filter(Boolean);

  if (!sections.length) {
    return;
  }

  var visibleIds = Object.create(null);
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        visibleIds[entry.target.id] = entry.isIntersecting;
      });
      var activeSection = sections.filter(function (section) {
        return visibleIds[section.id];
      })[0];
      links.forEach(function (link) {
        if (activeSection && link.getAttribute('href') === '#' + activeSection.id) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
