document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('idea-card');
  const inspireBtn = document.getElementById('inspire-btn');
  const cursorGlow = document.getElementById('cursor-glow');
  const subQuote = document.querySelector('.sub-quote');

  const quotes = [
    '"위대한 모든 혁신은 아주 작은 생각 하나에서 시작됩니다."',
    '"상상할 수 있는 모든 것은 현실이 될 수 있습니다."',
    '"시작하는 방법은 말을 멈추고 행동하기 시작하는 것입니다."',
    '"오늘 심은 생각의 씨앗이 내일의 울창한 숲이 됩니다."',
    '"가장 훌륭한 아이디어는 언제나 용기 있는 첫걸음 뒤에 찾아옵니다."'
  ];

  let quoteIndex = 0;

  // Mouse move cursor glow effect
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.opacity = '1';
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;

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
    cursorGlow.style.opacity = '0';
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  });

  // Inspire button interaction & particle burst
  inspireBtn.addEventListener('click', (e) => {
    // Switch Quote with fade transition
    quoteIndex = (quoteIndex + 1) % quotes.length;
    subQuote.style.opacity = '0';
    subQuote.style.transform = 'translateY(6px)';
    subQuote.style.transition = 'all 0.25s ease';

    setTimeout(() => {
      subQuote.textContent = quotes[quoteIndex];
      subQuote.style.opacity = '1';
      subQuote.style.transform = 'translateY(0)';
    }, 250);

    // Create Sparkles / Particles
    createParticleBurst(e.clientX, e.clientY);
  });

  function createParticleBurst(x, y) {
    const particleCount = 24;
    const colors = ['#3B82F6', '#60A5FA', '#93C5FD', '#0284C7', '#38BDF8', '#2563EB', '#FFFFFF'];

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
});
