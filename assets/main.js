document.addEventListener('DOMContentLoaded', () => {
  const navTrigger = document.getElementById('nav-trigger');
  const scrollButtons = document.querySelectorAll('[data-scroll]');
  const yearField = document.querySelector('[data-year]');
  const navLinks = document.querySelectorAll('.site-nav .page-link');

  if (yearField) {
    yearField.textContent = new Date().getFullYear();
  }

  scrollButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const targetSelector = btn.getAttribute('data-scroll');
      const target = targetSelector ? document.querySelector(targetSelector) : null;

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (navTrigger) {
        navTrigger.checked = false;
      }
    });
  });

  const setActiveNav = () => {
    const { pathname } = window.location;
    navLinks.forEach((link) => {
      if (link.pathname === pathname) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };
  setActiveNav();

  const pageSections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.hash === `#${currentId}`) {
            link.setAttribute('data-active', 'true');
          } else {
            link.removeAttribute('data-active');
          }
        });
      });
    },
    { threshold: 0.4 }
  );

  pageSections.forEach((section) => observer.observe(section));
});

