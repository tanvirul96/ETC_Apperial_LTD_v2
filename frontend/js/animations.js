function initAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Add observer to all elements with class 'animate-on-scroll'
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll, section');
  
  elementsToAnimate.forEach(el => {
    // We add the class to sections automatically to animate them on scroll
    if (el.tagName.toLowerCase() === 'section' && !el.classList.contains('animate-on-scroll')) {
      el.classList.add('animate-on-scroll');
    }
    observer.observe(el);
  });
}

// Main initialization function
function initApp() {
  // Load components
  if (typeof loadHeader === 'function') loadHeader();
  if (typeof loadFooter === 'function') loadFooter();
  
  // Init animations
  initAnimations();
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
