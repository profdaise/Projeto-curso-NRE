let sementeEmoji = "🌰"; // Emoji de semente (estado inicial)
let brotoEmoji = "🌱";  // Emoji de broto
let plantaEmoji = "🌳"; // Emoji de planta

let sementesPlantadas = []; // Array para guardar a posição e o tempo de cada emoji plantado
let pontuacao = 0;          // Variável para a pontuação
let jogoTerminou = false;   // Controla se o jogo terminou (vitória ou derrota)
let venceu = false;         // Indica se o jogador venceu

const PONTOS_PARA_GANHAR = 50; // Quantas sementes para vencer

const TEMPO_PARA_BROTO = 2000; // Tempo em milissegundos para virar broto (2 segundos)
const TEMPO_PARA_PLANTA = 5000; // Tempo em milissegundos para virar planta (5 segundos)

let tempoInicialJogo; // Tempo (millis()) quando o jogo começa
const TEMPO_LIMITE_SEGUNDOS = 30; // Tempo total do jogo em segundos

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  // Define o tempo inicial do jogo assim que o setup é chamado
  tempoInicialJogo = millis();
}

function draw() {
  background(100, 150, 50);

  // --- Cronômetro ---
  let tempoDecorrido = (millis() - tempoInicialJogo) / 1000; // Tempo decorrido em segundos
  let tempoRestante = TEMPO_LIMITE_SEGUNDOS - tempoDecorrido;

  // Garante que o tempo restante não seja negativo
  if (tempoRestante < 0) {
    tempoRestante = 0;
  }

  // Verifica se o tempo acabou e o jogo ainda não terminou por vitória
  if (tempoRestante <= 0 && !jogoTerminou) {
    jogoTerminou = true;
    venceu = false; // O jogador perdeu
  }

  // --- Exibição de Informações (Pontuação e Cronômetro) ---
  fill(255); // Cor branca para o texto
  textSize(20);
  text(`Sementes: ${pontuacao}/${PONTOS_PARA_GANHAR}`, width / 2, 30);
  text(`Tempo: ${floor(tempoRestante)}s`, width / 2, 60); // Exibe o tempo restante arredondado

  // --- Desenha Sementes/Plantas ---
  for (let i = 0; i < sementesPlantadas.length; i++) {
    let semente = sementesPlantadas[i];
    let emojiAtual = sementeEmoji;

    let tempoPassado = millis() - semente.tempoPlantio;

    if (tempoPassado >= TEMPO_PARA_PLANTA) {
      emojiAtual = plantaEmoji;
    } else if (tempoPassado >= TEMPO_PARA_BROTO) {
      emojiAtual = brotoEmoji;
    }

    fill(0);
    textSize(40);
    text(emojiAtual, semente.x, semente.y);
  }

  // --- Mensagens de Fim de Jogo (Vitória ou Derrota) ---
  if (jogoTerminou) {
    fill(0, 0, 0, 150); // Fundo escuro semi-transparente
    rect(0, 0, width, height);

    if (venceu) {
      fill(255, 255, 0); // Amarelo para vitória
      textSize(50);
      text("VOCÊ GANHOU!", width / 2, height / 2);
    } else {
      fill(255, 0, 0); // Vermelho para derrota
      textSize(50);
      text("TEMPO ESGOTADO! VOCÊ PERDEU!", width / 2, height / 2);
      textSize(25);
      text("Tente novamente!", width / 2, height / 2 + 50); // Mensagem extra
    }
  }
}

function mousePressed() {
  // Apenas permite plantar se o jogo não terminou
  if (!jogoTerminou) {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      sementesPlantadas.push({ x: mouseX, y: mouseY, tempoPlantio: millis() });
      pontuacao++;

      if (pontuacao >= PONTOS_PARA_GANHAR) {
        jogoTerminou = true;
        venceu = true; // O jogador venceu
      }
    }
  }
}