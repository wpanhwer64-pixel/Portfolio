/* ================================================================
   WAJID DEV — PORTFOLIO SCRIPT
   Author: Wajid
   Version: 1.0
================================================================ */

/* ----------------------------------------------------------------
   1. PRELOADER
---------------------------------------------------------------- */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const preFill   = document.getElementById('preFill');

  // Animate fill bar
  let width = 0;
  const fillInterval = setInterval(() => {
    width = Math.min(width + Math.random() * 25, 100);
    preFill.style.width = width + '%';
    if (width >= 100) {
      clearInterval(fillInterval);
      setTimeout(() => preloader.classList.add('hidden'), 400);
    }
  }, 120);
});

/* ----------------------------------------------------------------
   2. CUSTOM CURSOR
---------------------------------------------------------------- */
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth follower
(function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
})();

/* ----------------------------------------------------------------
   3. NAVBAR — scroll & active link
---------------------------------------------------------------- */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Add scrolled class when user scrolls
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  highlightNav();
}, { passive: true });

// Highlight nav link matching visible section
function highlightNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}

/* ----------------------------------------------------------------
   4. HAMBURGER MENU
---------------------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close menu on nav-link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// Close menu on nav-btn click
document.querySelector('.nav-btn')?.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
});

/* ----------------------------------------------------------------
   5. TYPING ANIMATION
---------------------------------------------------------------- */
const typedEl    = document.getElementById('typedText');
const typeWords  = [
  'beautiful websites',
  'seamless UX',
  'React applications',
  'responsive UIs',
  'full-stack solutions',
  'pixel-perfect designs'
];
let   wordIdx  = 0;
let   charIdx  = 0;
let   deleting = false;
let   typeSpeed = 100;

function typeLoop() {
  const currentWord = typeWords[wordIdx];

  if (!deleting) {
    // Typing
    typedEl.textContent = currentWord.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === currentWord.length) {
      deleting = true;
      typeSpeed = 2000; // Pause before deleting
    } else {
      typeSpeed = 100;
    }
  } else {
    // Deleting
    typedEl.textContent = currentWord.substring(0, charIdx - 1);
    charIdx--;
    typeSpeed = 50;
    if (charIdx === 0) {
      deleting = false;
      wordIdx  = (wordIdx + 1) % typeWords.length;
      typeSpeed = 400;
    }
  }
  setTimeout(typeLoop, typeSpeed);
}
setTimeout(typeLoop, 800);

/* ----------------------------------------------------------------
   6. COUNTER ANIMATION (hero stats)
---------------------------------------------------------------- */
function animateCounter(el, target) {
  let current = 0;
  const step  = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 50);
}

// Observe stat numbers
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      animateCounter(el, target);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(n => statObserver.observe(n));

/* ----------------------------------------------------------------
   7. SKILL BAR ANIMATION
---------------------------------------------------------------- */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.dataset.width + '%';
      skillObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(f => skillObserver.observe(f));

/* ----------------------------------------------------------------
   8. SCROLL ANIMATIONS (data-aos simulation)
---------------------------------------------------------------- */
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Apply delay if set
      const delay = entry.target.dataset.aosDelay || 0;
      setTimeout(() => {
        entry.target.classList.add('aos-animate');
      }, parseInt(delay));
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

aosElements.forEach(el => aosObserver.observe(el));

/* ----------------------------------------------------------------
   9. PORTFOLIO FILTER
---------------------------------------------------------------- */
const filterBtns  = document.querySelectorAll('.filter-btn');
const portItems   = document.querySelectorAll('.port-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portItems.forEach(item => {
      const cat = item.dataset.category;
      if (filter === 'all' || cat === filter) {
        item.classList.remove('hidden');
        // Re-trigger animation
        item.classList.remove('aos-animate');
        setTimeout(() => item.classList.add('aos-animate'), 50);
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/* ----------------------------------------------------------------
   10. PROJECT & TESTIMONIAL SWIPERS
---------------------------------------------------------------- */
// Projects Swiper
const projectSwiper = new Swiper('.projectSwiper', {
  slidesPerView: 1,
  spaceBetween: 24,
  grabCursor: true,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.projectSwiper .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.projectSwiper .swiper-button-next',
    prevEl: '.projectSwiper .swiper-button-prev',
  },
  breakpoints: {
    640:  { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }
});

// Testimonials Swiper
const testiSwiper = new Swiper('.testimonialsSwiper', {
  slidesPerView: 1,
  spaceBetween: 24,
  grabCursor: true,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.testimonialsSwiper .swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }
});

/* ----------------------------------------------------------------
   11. CONTACT FORM
---------------------------------------------------------------- */
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  // Basic validation
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  // Simulate send (replace with real API call)
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
    submitBtn.disabled  = false;
    formSuccess.classList.add('show');
    contactForm.reset();
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1800);
});

/* ----------------------------------------------------------------
   12. SMOOTH SCROLL for anchor links
---------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.offsetTop - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80);
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ----------------------------------------------------------------
   13. PARALLAX ORB (subtle mouse parallax)
---------------------------------------------------------------- */
const orbs = document.querySelectorAll('.orb');
document.addEventListener('mousemove', e => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  orbs.forEach((orb, i) => {
    const strength = (i + 1) * 15;
    orb.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  });
});

/* ----------------------------------------------------------------
   14. NAVBAR back-to-top (footer button)
---------------------------------------------------------------- */
document.querySelector('.back-top')?.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ----------------------------------------------------------------
   15. 3D TILT EFFECT on service cards
---------------------------------------------------------------- */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) *  8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ----------------------------------------------------------------
   16. HERO IMAGE — subtle 3D float on mouse
---------------------------------------------------------------- */
const heroImgWrap = document.querySelector('.hero-img-container');
if (heroImgWrap) {
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    heroImgWrap.style.transform = `perspective(600px) rotateX(${dy * -5}deg) rotateY(${dx * 5}deg)`;
  });
}

console.log('%c Wajid Dev Portfolio 🚀 ', 'background:#7c6af7;color:#fff;font-size:14px;padding:8px 16px;border-radius:6px;font-weight:bold;');
