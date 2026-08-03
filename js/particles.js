/**
 * Interactive Ambient Particles System
 * Scoped strictly to the Hero (#home) introduction section.
 */
(function () {
  'use strict';

  const canvas = document.getElementById('ambient-particles');
  const heroSection = document.getElementById('home');
  if (!canvas || !heroSection) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let sparks = [];

  const mouse = {
    x: -1000,
    y: -1000,
    active: false,
    radius: 160
  };

  // Warm Fiery Color Palette
  const particleColors = [
    { r: 230, g: 80, b: 27 },   // Flame Orange (#E6501B)
    { r: 195, g: 17, b: 12 },   // Crimson (#C3110C)
    { r: 116, g: 10, b: 3 },    // Deep Maroon (#740A03)
    { r: 255, g: 138, b: 80 },  // Fiery Glow Peach (#FF8A50)
    { r: 255, g: 160, b: 110 }  // Warm Highlight (#FFA06E)
  ];

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = heroSection.clientWidth;
    height = heroSection.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  }

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + Math.random() * 30;

      const isOrb = Math.random() > 0.75;
      this.radius = isOrb ? Math.random() * 10 + 4 : Math.random() * 3 + 1.2;
      this.baseRadius = this.radius;

      const speedMult = prefersReducedMotion ? 0.15 : 0.45;
      this.vx = (Math.random() - 0.5) * 0.3 * speedMult;
      this.vy = -(Math.random() * 0.45 + 0.15) * speedMult;

      this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      this.alpha = Math.random() * 0.45 + 0.15;
      this.baseAlpha = this.alpha;

      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = Math.random() * 0.012 + 0.005;
      this.amplitude = Math.random() * 0.7 + 0.3;
    }

    update() {
      this.angle += this.angleSpeed;
      this.x += this.vx + Math.sin(this.angle) * this.amplitude;
      this.y += this.vy;

      // Mouse interactivity within hero section
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          const pushAngle = Math.atan2(dy, dx);
          this.x += Math.cos(pushAngle) * force * 2.5;
          this.y += Math.sin(pushAngle) * force * 2.5;
          this.radius = this.baseRadius + force * 4;
        } else {
          this.radius += (this.baseRadius - this.radius) * 0.05;
        }
      }

      this.alpha = this.baseAlpha + Math.sin(this.angle * 2) * 0.12;
      this.alpha = Math.max(0.05, Math.min(0.75, this.alpha));

      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;

      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius * 2
      );

      const { r, g, b } = this.color;
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.95)`);
      gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.4)`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class Spark {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.radius = Math.random() * 3 + 1.5;
      this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      this.alpha = 1;
      this.decay = Math.random() * 0.03 + 0.025;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.96;
      this.vy *= 0.96;
      this.alpha -= this.decay;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.alpha;
      const { r, g, b } = this.color;
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    resizeCanvas();
    particles = [];
    const particleCount = Math.floor(Math.min(width, 1400) / 32);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    const maxDist = 110;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.18;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = `rgba(230, 80, 27, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }

      if (mouse.active) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.35;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = `rgba(255, 138, 80, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    if (!prefersReducedMotion) {
      drawConnections();
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      sparks[i].update();
      sparks[i].draw();
      if (sparks[i].alpha <= 0) {
        sparks.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  // Mouse move events inside hero section
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  heroSection.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  heroSection.addEventListener('click', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    for (let i = 0; i < 12; i++) {
      sparks.push(new Spark(clickX, clickY));
    }
  });

  // Resize listener
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeCanvas();
    }, 150);
  });

  initParticles();
  animate();
})();
