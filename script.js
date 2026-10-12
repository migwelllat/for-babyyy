const intro = document.getElementById('intro');
const main = document.getElementById('main');
const openButton = document.getElementById('openEnvelope');
const audio = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
const petalField = document.getElementById('petalField');
let opened = false;

// A few subtle floating petals, kept behind the content.
for (let i = 0; i < 13; i += 1) {
  const petal = document.createElement('span');
  petal.className = 'falling-petal';
  petal.textContent = ['✿', '❀', '♡'][i % 3];
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.animationDuration = `${13 + Math.random() * 13}s`;
  petal.style.animationDelay = `${-Math.random() * 24}s`;
  petal.style.fontSize = `${10 + Math.random() * 9}px`;
  petalField.appendChild(petal);
}

openButton.addEventListener('click', () => {
  if (opened) return;
  opened = true;
  openButton.classList.add('is-opening');
  intro.classList.add('is-opening');
  window.setTimeout(() => {
    intro.classList.add('is-hidden');
    main.classList.add('is-visible');
    main.inert = false;
    audio.play().then(() => {
      musicLabel.textContent = 'Pause music';
      musicToggle.setAttribute('aria-label', 'Pause music');
    }).catch(() => {
      musicLabel.textContent = 'Play music';
      musicToggle.setAttribute('aria-label', 'Play music');
    });
  }, 720);
});

musicToggle.addEventListener('click', async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicLabel.textContent = 'Pause music';
      musicToggle.setAttribute('aria-label', 'Pause music');
    } catch (error) {
      musicLabel.textContent = 'Tap to play';
    }
  } else {
    audio.pause();
    musicLabel.textContent = 'Play music';
    musicToggle.setAttribute('aria-label', 'Play music');
  }
});
