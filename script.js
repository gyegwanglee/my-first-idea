document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('idea-card');
  const inspireBtn = document.getElementById('inspire-btn');
  const cursorGlow = document.getElementById('cursor-glow');
  const mainTitleText = document.querySelector('#main-title .gradient-text');
  const badgeText = document.querySelector('.badge-text');
  const subQuote = document.querySelector('.sub-quote');

  // 총 4개의 문장 후보
  const sentences = [
    '오늘도 힘내세요!',
    '오늘도 해냈어요!',
    '조금씩 나아지고 있어요.',
    '이대로 계속 가봅시다.'
  ];

  const subQuotes = [
    '"위대한 모든 혁신은 아주 작은 생각 하나에서 시작됩니다."',
    '"당신의 노력이 결실을 맺는 날이 차곡차곡 다가오고 있습니다."',
    '"오늘의 작은 걸음이 내일의 커다란 도약이 됩니다."',
    '"지치지 않고 걸어가는 당신의 모든 날을 응원합니다."'
  ];

  let sentenceIndex = 0;

  // Mouse move cursor glow effect
  window.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
      cursorGlow.style.opacity = '1';
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }

    // 3D Card Tilt Effect
    if (card) {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;

      // Calculate tilt within reasonable bounds
      const maxTilt = 12;
      const tiltX = -(mouseY / (window.innerHeight / 2)) * maxTilt;
      const tiltY = (mouseX / (window.innerWidth / 2)) * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
    }
  });

  window.addEventListener('mouseleave', () => {
    if (cursorGlow) cursorGlow.style.opacity = '0';
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  });

  // Inspire button interaction & particle burst
  if (inspireBtn) {
    inspireBtn.addEventListener('click', (e) => {
      // Switch main sentence and sub quote with smooth fade transition
      sentenceIndex = (sentenceIndex + 1) % sentences.length;

      if (mainTitleText) {
        mainTitleText.style.opacity = '0';
        mainTitleText.style.transform = 'translateY(-6px)';
        mainTitleText.style.transition = 'all 0.18s ease';
      }

      if (subQuote) {
        subQuote.style.opacity = '0';
        subQuote.style.transform = 'translateY(6px)';
        subQuote.style.transition = 'all 0.18s ease';
      }

      setTimeout(() => {
        if (mainTitleText) {
          mainTitleText.textContent = sentences[sentenceIndex];
          mainTitleText.style.opacity = '1';
          mainTitleText.style.transform = 'translateY(0)';
        }
        if (subQuote) {
          subQuote.textContent = subQuotes[sentenceIndex];
          subQuote.style.opacity = '1';
          subQuote.style.transform = 'translateY(0)';
        }
        if (badgeText) {
          badgeText.textContent = `Cheer Up • ${sentences[sentenceIndex]}`;
        }

        // Update button color theme dynamically based on current sentence
        inspireBtn.classList.remove('btn-theme-yellow', 'btn-theme-orange', 'btn-theme-green');
        if (sentenceIndex === 1) {
          inspireBtn.classList.add('btn-theme-yellow'); // 오늘도 해냈어요! -> 노란색
        } else if (sentenceIndex === 2) {
          inspireBtn.classList.add('btn-theme-orange'); // 조금씩 나아지고 있어요. -> 주황색
        } else if (sentenceIndex === 3) {
          inspireBtn.classList.add('btn-theme-green');  // 이대로 계속 가봅시다. -> 초록색
        }
      }, 180);

      // Create Sparkles / Particles
      createParticleBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);
    });
  }

  function createParticleBurst(x, y) {
    const particleCount = 24;
    let colors = ['#3B82F6', '#60A5FA', '#93C5FD', '#0284C7', '#38BDF8', '#FFFFFF'];
    if (sentenceIndex === 1) {
      colors = ['#EAB308', '#FACC15', '#FEF08A', '#CA8A04', '#FFFFFF']; // Yellow theme
    } else if (sentenceIndex === 2) {
      colors = ['#F97316', '#FB923C', '#FFEDD5', '#EA580C', '#FFFFFF']; // Orange theme
    } else if (sentenceIndex === 3) {
      colors = ['#10B981', '#34D399', '#D1FAE5', '#059669', '#FFFFFF']; // Green theme
    }

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'sparkle-particle';

      const size = Math.random() * 6 + 4;
      const color = colors[Math.floor(Math.random() * colors.length)];

      const angle = (Math.PI * 2 / particleCount) * i + (Math.random() - 0.5);
      const velocity = Math.random() * 90 + 40;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 10px ${color}`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);

      document.body.appendChild(particle);

      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    }
  }

  // Initialize subtle floating ambient particles for blue cosmic feel
  function initAmbientParticles() {
    const particleCount = 20;
    const colors = ['#60A5FA', '#93C5FD', '#38BDF8', '#3B82F6'];
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'ambient-particle';
      const size = Math.random() * 3 + 2;
      const duration = Math.random() * 14 + 10;
      const delay = Math.random() * -20;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.backgroundColor = color;
      p.style.boxShadow = `0 0 8px ${color}`;
      p.style.left = `${Math.random() * 100}vw`;
      p.style.top = `${Math.random() * 100}vh`;
      p.style.animationDuration = `${duration}s`;
      p.style.animationDelay = `${delay}s`;
      
      document.body.appendChild(p);
    }
  }

  initAmbientParticles();
});

