// Classe principal que representa o jogo
class Game {
  constructor(optionsCount = 4) {
    this.optionsCount = optionsCount; // Número de opções de cores
    this.colors = [];                 // Lista de cores da rodada
    this.correctColor = null;        // Cor correta da rodada
    this.score = 0;                  // Pontuação atual
    this.round = 1;                  // Rodada atual
  }

  // Gera uma cor aleatória em formato hexadecimal
  generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Inicia uma nova rodada: reseta as cores e escolhe a cor correta
  startNewRound() {
    this.colors = [];
    while (this.colors.length < this.optionsCount) {
      const newColor = this.generateRandomColor();
      if (!this.colors.includes(newColor)) {
        this.colors.push(newColor);
      }
    }
    this.correctColor = this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}

// Seleciona os elementos do DOM
const colorCodeEl = document.getElementById('color-code');
const optionsContainer = document.getElementById('options-container');
const scoreEl = document.getElementById('score');
const roundEl = document.getElementById('round');
const feedbackEl = document.getElementById('feedback-message');
const resetBtn = document.getElementById('reset-button');

// Cria a instância do jogo
const game = new Game();

// Atualiza a interface com base no estado do jogo
function renderGame() {
  // Atualiza placar e rodada
  scoreEl.textContent = game.score;
  roundEl.textContent = game.round;

  // Exibe o código da cor correta
  colorCodeEl.textContent = game.correctColor;

  // Limpa opções anteriores
  optionsContainer.innerHTML = '';

  // Cria os blocos de cor
  game.colors.forEach(color => {
    const colorDiv = document.createElement('div');
    colorDiv.classList.add('color-option');
    colorDiv.style.backgroundColor = color;
    colorDiv.dataset.color = color;
    optionsContainer.appendChild(colorDiv);
  });
}

// Gerencia o clique nas opções
optionsContainer.addEventListener('click', (event) => {
  const clicked = event.target;
  if (!clicked.classList.contains('color-option')) return;

  const chosenColor = clicked.dataset.color;

  // Desativa cliques após resposta
  optionsContainer.style.pointerEvents = 'none';

  if (chosenColor === game.correctColor) {
    feedbackEl.textContent = 'Correto!';
    clicked.classList.add('correct');
    game.score++;
  } else {
    feedbackEl.textContent = 'Incorreto!';
    clicked.classList.add('wrong');

    // Destaca a opção correta
    const correctDiv = [...document.querySelectorAll('.color-option')]
      .find(div => div.dataset.color === game.correctColor);
    correctDiv.classList.add('correct');
  }

  resetBtn.classList.add('visible');
});

// Avança para a próxima rodada
resetBtn.addEventListener('click', () => {
  game.round++;
  game.startNewRound();
  renderGame();
  feedbackEl.textContent = '';
  resetBtn.classList.remove('visible');
  optionsContainer.style.pointerEvents = 'auto';
});

// Inicializa o jogo
game.startNewRound();
renderGame();
