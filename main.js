const lightness = document.getElementById('lightness');
const chroma = document.getElementById('chroma');
const hue = document.getElementById('hue');
const colorPreview = document.getElementById('color-preview');
const lchValue = document.getElementById('lch-value-display');
const random = document.getElementById('random');
const reset = document.getElementById('reset');

const getRandomValue = () => Math.floor(Math.random() * 101);

const sanitizeValue = (input) => {
  let value = input.value.replace(/\D/g, '');
  value = parseInt(value, 10);
  if (isNaN(value)) {
    input.value = '';
    return;
  }
  if (value < 0) value = 0;
  if (value > 100) value = 100;
  input.value = value;
};

const update = () => {
  const l = parseInt(lightness.value) || 0;
  const c = parseInt(chroma.value) || 0;
  const h = parseInt(hue.value) || 0;
  const hueDegrees = Math.round(h * 3.6);
  const chromaInteger = Math.round(c * 1.5);
  // CORRIGIDO: Removido o '%' do Lightness
  const lchString = `lch(${l} ${chromaInteger} ${hueDegrees})`;
  colorPreview.style.backgroundColor = lchString;
  lchValue.textContent = lchString;
};

const randomColor = () => {
  lightness.value = getRandomValue();
  chroma.value = getRandomValue();
  hue.value = getRandomValue();
  update();
};

const clearAll = () => {
  hue.value = '';
  chroma.value = '';
  lightness.value = '';
  update();
};

const handleInput = (e) => {
  sanitizeValue(e.target);
  update();
};

const setupEventListeners = () => {
  lightness.addEventListener('input', handleInput);
  chroma.addEventListener('input', handleInput);
  hue.addEventListener('input', handleInput);
  random.addEventListener('click', randomColor);
  reset.addEventListener('click', clearAll);
};

const init = () => {
  setupEventListeners();
  update();
};

document.addEventListener('DOMContentLoaded', init);
