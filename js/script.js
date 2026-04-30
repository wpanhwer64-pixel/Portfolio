/* ============================================================
   WAJID — VIP Portfolio | Master Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Preloader ---------- */
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.classList.add('hidden'));
    setTimeout(() => preloader.classList.add('hidden'), 3000); // fallback
  }

  /* ---------- Navbar scroll effect ---------- */
  const navbar = document.querySelector('.navbar');
  const scrollThreshold = 60;
  const handleNavScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > scrollThreshold);
  };
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  /* ---------- Hamburger menu ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- Active nav link ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---------- Scroll reveal ---------- */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------- Skill bar animation ---------- */
  const skillBars = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.dataset.width;
        entry.target.style.width = target;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ---------- Scroll to top button ---------- */
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Button ripple effect ---------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      circle.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  /* ---------- Typing animation (Home page) ---------- */
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const phrases = [
      'Creative Web Developer',
      'UI/UX Engineer',
      'Frontend Architect',
      'Digital Craftsman'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseEnd = 2000;
    const pauseStart = 500;

    function type() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === current.length) {
        delay = pauseEnd;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = pauseStart;
      }
      setTimeout(type, delay);
    }
    type();
  }

  /* ---------- Particle background (Home page) ---------- */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 80;

    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? 'rgba(212,175,55,' : 'rgba(0,245,255,';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(212,175,55,' + (0.08 * (1 - dist / 120)) + ')';
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ---------- Portfolio filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.animation = 'fadeInUp .5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const galleryItems = document.querySelectorAll('.gallery-item img');
  let currentGalleryIndex = 0;

  if (lightbox && lightboxImg) {
    galleryItems.forEach((img, index) => {
      img.addEventListener('click', () => {
        currentGalleryIndex = index;
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    if (prevBtn) prevBtn.addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
      lightboxImg.src = galleryItems[currentGalleryIndex].src;
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
      lightboxImg.src = galleryItems[currentGalleryIndex].src;
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
      if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    });
  }

  /* ---------- Testimonial carousel ---------- */
  const carouselTrack = document.querySelector('.testimonial-track');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;
  let autoSlide;

  function goToSlide(index) {
    if (!carouselTrack) return;
    const total = carouselTrack.children.length;
    currentSlide = ((index % total) + total) % total;
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    carouselDots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  if (carouselTrack) {
    carouselDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(autoSlide);
        goToSlide(i);
        startAutoSlide();
      });
    });
    startAutoSlide();
  }

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      // Simple validation
      if (!data.name || !data.email || !data.message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }
      showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
    });
  }

  /* ---------- Toast notification ---------- */
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position:fixed; bottom:30px; left:50%; transform:translateX(-50%);
      padding:16px 32px; border-radius:10px; font-size:0.95rem;
      color:#fff; z-index:99999; animation:fadeInUp .4s ease;
      background:${type === 'success' ? 'linear-gradient(135deg,#D4AF37,#00F5FF)' : '#ff4444'};
      box-shadow:0 8px 32px rgba(0,0,0,.4);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 3500);
  }

  /* ---------- Counter animation ---------- */
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        const suffix = entry.target.dataset.suffix || '';
        let count = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          entry.target.textContent = Math.floor(count) + suffix;
        }, 25);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- Timeline animation ---------- */
  const timelineItems = document.querySelectorAll('.timeline-item');
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        tlObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity .6s ease, transform .6s ease';
    tlObserver.observe(item);
  });
  // Override for visible
  const style = document.createElement('style');
  style.textContent = '.timeline-item.visible{opacity:1!important;transform:translateY(0)!important;}';
  document.head.appendChild(style);
});
