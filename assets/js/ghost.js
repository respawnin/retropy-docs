
// ghost.js — Interactive Ghost Terminal Effects

document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.dialogue-box');
  const portrait = document.querySelector('.portrait img');
  const canvas = document.querySelector('.smoke-canvas');

  // Typewriter lines (optional override per page)
  const dialogues = [
    "I see you, traveler of text.",
    "What wisdom do you seek in the static?",
    "Documentation… or incantation?",
    "Another page, another phantom.",
    "The answers lie within the code.",
    "Even the docs whisper, if you listen closely.",
    "Read carefully. Some glyphs bite.",
    "The ghost guards the index well.",
    "Scroll, and be judged.",
    "You are not alone in this repository."
  ];

  let currentIndex = -1;
  let typingIndex = 0;

  function setupCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.description-box pre');

    codeBlocks.forEach((pre) => {
      const languageContainer = pre.closest('[class*="language-"]');

      if (!languageContainer || languageContainer.classList.contains('language-plaintext')) {
        return;
      }

      if (pre.parentElement && pre.parentElement.classList.contains('code-block')) {
        return;
      }

      const wrapper = document.createElement('div');
      wrapper.className = 'code-block';

      const button = document.createElement('button');
      button.className = 'code-copy-button';
      button.type = 'button';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code to clipboard');

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(button);
      wrapper.appendChild(pre);

      button.addEventListener('click', async () => {
        const code = pre.innerText;

        try {
          await navigator.clipboard.writeText(code);
          button.textContent = 'Copied';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 1500);
        } catch (error) {
          button.textContent = 'Failed';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 1500);
        }
      });
    });
  }

  function getNextLine() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * dialogues.length);
    } while (newIndex === currentIndex);
    currentIndex = newIndex;
    return dialogues[newIndex];
  }

  function typeText(text) {
    typingIndex = 0;
    function type() {
      if (!box) return;
      box.innerHTML = text.slice(0, typingIndex + 1) + '<span class="cursor">|</span>';
      typingIndex++;
      if (typingIndex < text.length) {
        setTimeout(type, 35);
      }
    }
    type();
  }

  function refreshDialogue() {
    if (box) typeText(getNextLine());
  }

  // Pulse + glitch effect on portrait click
  if (portrait && box) {
    portrait.addEventListener('click', () => {
      portrait.classList.add("pulse");
      setTimeout(() => portrait.classList.remove("pulse"), 400);

      box.classList.add("glitch");
      setTimeout(() => {
        box.classList.remove("glitch");
        refreshDialogue();
      }, 200);
    });
  }

  // Start dialogue
  refreshDialogue();
  setupCodeBlocks();

  // --- SMOKE PARTICLES ---
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resizeCanvas() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
    }

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 20;
        this.size = Math.floor(Math.random() * 8 + 6); // Larger smoke
        this.opacity = 0.2 + Math.random() * 0.2;
        this.speed = 0.3 + Math.random() * 0.5;
        this.life = 0;
        this.maxLife = 100 + Math.random() * 50;
      }

      update() {
        this.y -= this.speed;
        this.life++;
        if (this.life > this.maxLife) this.reset();
      }

      draw(ctx) {
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.size, this.size);
      }
    }

    function initParticles(count = 40) {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function animateSmoke() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.update();
        p.draw(ctx);
      }
      requestAnimationFrame(animateSmoke);
    }

    resizeCanvas();
    initParticles();
    animateSmoke();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
  }
});
