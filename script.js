// ===== Custom bee cursor =====
const beeCursor = document.getElementById('bee-cursor');
let mx = -200, my = -200;
let cx = -200, cy = -200;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  cx += (mx - cx) * 0.18;
  cy += (my - cy) * 0.18;
  beeCursor.style.left = cx + 'px';
  beeCursor.style.top  = cy + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Escala al hacer hover sobre elementos clicables
document.querySelectorAll('a, button, .service-card, .why-card, .gallery-item, .schedule-box').forEach(el => {
  el.addEventListener('mouseenter', () => {
    beeCursor.style.transform = 'translate(-50%,-50%) scale(1.4)';
  });
  el.addEventListener('mouseleave', () => {
    beeCursor.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

// ===== Navbar scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== Hamburger menu =====
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');
hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ===== AOS (Animate on Scroll) manual =====
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.aosDelay || 0);
      setTimeout(() => {
        entry.target.classList.add('aos-visible');
      }, delay);
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

aosElements.forEach(el => aosObserver.observe(el));

// ===== Bee avatar speech bubble =====
const bubble = document.querySelector('.speech-bubble');
if (bubble) {
  setTimeout(() => {
    bubble.style.animation = 'bubblePop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards';
    bubble.style.opacity = '1';
  }, 1200);

  // Re-hide & re-show on loop
  setInterval(() => {
    bubble.style.opacity = '0';
    bubble.style.transition = 'opacity 0.4s';
    setTimeout(() => {
      bubble.style.transition = '';
      bubble.style.animation = 'none';
      void bubble.offsetWidth;
      bubble.style.animation = 'bubblePop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards';
      bubble.style.opacity = '1';
    }, 600);
  }, 7000);
}

// ===== Modal =====
const modalOverlay = document.getElementById('modal-overlay');

function openModal() {
  modalOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (!e || e.target === modalOverlay || e.currentTarget.classList.contains('modal-close') || e.currentTarget.classList.contains('btn-cancel')) {
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

// ===== Contact form =====
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const btn = form.querySelector('button[type="submit"]');

  btn.textContent = 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    form.classList.add('hidden');
    success.classList.remove('hidden');
  }, 1200);
}

// ===== Smooth active nav link highlighting =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--primary)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ===== Parallax en nubes del hero =====
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.hero .cloud').forEach((cloud, i) => {
    const speed = 0.08 + i * 0.03;
    cloud.style.transform = `translateX(${y * speed}px)`;
  });
});

// ===== Rastro de polen =====
const pollenColors = ['#FFD93D', '#FFE566', '#FFEC8A', '#FFC107', '#FFD93D', '#6BCB77'];
const pollenShapes = ['50%', '40% 60%', '60% 40%', '50% 30% 70% 50%'];
let lastPollenX = 0, lastPollenY = 0;

document.addEventListener('mousemove', e => {
  const dx = e.clientX - lastPollenX;
  const dy = e.clientY - lastPollenY;
  if (Math.abs(dx) + Math.abs(dy) < 12) return; // solo emitir al moverse suficiente
  lastPollenX = e.clientX;
  lastPollenY = e.clientY;

  const count = Math.floor(Math.random() * 2) + 1;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'pollen-particle';
    const size = 4 + Math.random() * 6;
    const offsetX = (Math.random() - 0.5) * 16;
    const offsetY = (Math.random() - 0.5) * 16;
    const color = pollenColors[Math.floor(Math.random() * pollenColors.length)];
    const radius = pollenShapes[Math.floor(Math.random() * pollenShapes.length)];
    const duration = 0.6 + Math.random() * 0.5;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX + offsetX}px;
      top: ${e.clientY + offsetY}px;
      background: ${color};
      border-radius: ${radius};
      animation-duration: ${duration}s;
      box-shadow: 0 0 ${size}px ${color};
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), duration * 1000);
  }
});
