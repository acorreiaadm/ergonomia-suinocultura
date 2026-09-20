/**
 * AGROERGO SUÍNOS - Lógica de Controle
 * Dashboard de Exercícios, Hotspots na Imagem e Cronômetro
 */

// 1. Banco de Dados dos Exercícios
const exercisesDB = [
  { cat: 'costas', name: 'Ponte', how: 'Deite de barriga para cima, flexione os joelhos e apoie os pés. Contraia suavemente o abdômen e eleve o quadril, retornando devagar.', dose: '2-3 séries de 10-12 repetições', goal: 'Fortalecer a musculatura de quadril e tronco.', care: 'Não elevar o quadril se houver dor; evite arquear excessivamente a lombar.' },
  { cat: 'costas', name: 'Gato-camelo', how: 'Em quatro apoios, arredonde suavemente a coluna e depois retorne à posição confortável e neutra.', dose: '8-10 repetições lentas', goal: 'Promover mobilidade da coluna.', care: 'Não force a amplitude.' },
  { cat: 'costas', name: 'Mobilidade lombar', how: 'Deitado, com joelhos flexionados, deixe os joelhos se movimentarem suavemente para um lado e para o outro.', dose: '8-10 repetições para cada lado', goal: 'Reduzir rigidez e melhorar mobilidade.', care: 'Movimente dentro de uma amplitude confortável.' },
  { cat: 'costas', name: 'Alongamento joelho ao peito', how: 'Deitado, aproxime suavemente um joelho do peito; depois alterne ou aproxime os dois, conforme conforto.', dose: '20-30 segundos, 2 vezes', goal: 'Alongar suavemente a região lombar e glútea.', care: 'Não force nem provoque dor.' },
  { cat: 'punhos', name: 'Abrir e fechar as mãos', how: 'Abra os dedos completamente e depois feche suavemente as mãos.', dose: '15-20 repetições', goal: 'Promover mobilidade das mãos.', care: 'Evite apertar com força.' },
  { cat: 'punhos', name: 'Flexão e extensão dos punhos', how: 'Com os braços relaxados, movimente os punhos para cima e para baixo lentamente.', dose: '10 repetições em cada direção', goal: 'Melhorar mobilidade dos punhos.', care: 'Não ultrapasse uma amplitude confortável.' },
  { cat: 'punhos', name: 'Circundução dos punhos', how: 'Faça movimentos circulares lentos com os punhos.', dose: '10 círculos para cada lado', goal: 'Promover mobilidade.', care: 'Interrompa se surgir dor ou formigamento.' },
  { cat: 'punhos', name: 'Alongamento dos flexores e extensores', how: 'Estenda o braço à frente e, com a outra mão, conduza suavemente os dedos para cima ou para baixo.', dose: '20 segundos em cada posição, 2 vezes', goal: 'Alongar a musculatura do antebraço.', care: 'Alongue suavemente, sem dor.' },
  { cat: 'ombros', name: 'Retração das escápulas', how: 'Com os braços relaxados, leve suavemente os ombros para trás, aproximando as escápulas.', dose: '10 repetições, mantendo 3-5 segundos', goal: 'Ativar a musculatura estabilizadora dos ombros.', care: 'Não eleve os ombros.' },
  { cat: 'ombros', name: 'Elevação dos braços', how: 'Eleve os braços lentamente até uma altura confortável e retorne.', dose: '10 repetições', goal: 'Promover mobilidade dos ombros.', care: 'Não force a amplitude.' },
  { cat: 'ombros', name: 'Mobilidade dos ombros', how: 'Faça círculos lentos com os ombros para frente e para trás.', dose: '10 repetições em cada direção', goal: 'Reduzir rigidez e melhorar mobilidade.', care: 'Movimente sem dor.' },
  { cat: 'ombros', name: 'Alongamento de ombro', how: 'Cruze um braço à frente do corpo e aproxime-o suavemente do peito com o outro braço.', dose: '20-30 segundos por lado', goal: 'Alongar a região posterior do ombro.', care: 'Não faça movimentos bruscos.' },
  { cat: 'joelhos', name: 'Sentar e levantar', how: 'Sente-se em uma cadeira e levante-se de forma controlada, mantendo os joelhos alinhados com os pés.', dose: '2 séries de 8-12 repetições', goal: 'Fortalecer membros inferiores e melhorar a funcionalidade.', care: 'Use uma cadeira estável e reduza a amplitude se necessário.' },
  { cat: 'joelhos', name: 'Extensão do joelho', how: 'Sentado, estenda uma perna até uma posição confortável e retorne lentamente.', dose: '10 repetições por perna', goal: 'Fortalecer a musculatura da coxa.', care: 'Evite movimentos rápidos.' },
  { cat: 'joelhos', name: 'Alongamento de quadríceps', how: 'Em pé, segure o tornozelo e aproxime o calcanhar do glúteo.', dose: '20-30 segundos por lado', goal: 'Alongar a parte anterior da coxa.', care: 'Segure em apoio se necessário.' },
  { cat: 'quadril', name: 'Ponte de Glúteos', how: 'Deitado, com joelhos flexionados, eleve o quadril lentamente e retorne.', dose: '2-3 séries de 10-12 repetições', goal: 'Fortalecer glúteos e musculatura do tronco.', care: 'Movimente sem dor.' },
  { cat: 'quadril', name: 'Elevação lateral da perna', how: 'Em pé, segurando em apoio, eleve uma perna lateralmente sem inclinar o tronco.', dose: '2 séries de 10 repetições por lado', goal: 'Fortalecer a musculatura lateral do quadril.', care: 'Evite compensar inclinando o tronco.' },
  { cat: 'quadril', name: 'Elevação alternada dos joelhos', how: 'Em pé, eleve um joelho de cada vez, de forma controlada.', dose: '10 repetições por lado', goal: 'Promover mobilidade e ativação dos membros inferiores.', care: 'Use apoio se necessário.' },
  { cat: 'quadril', name: 'Alongamento de glúteos', how: 'Deitado, cruze uma perna sobre a outra e aproxime suavemente as pernas do corpo.', dose: '20-30 segundos por lado', goal: 'Alongar a região glútea.', care: 'Não force.' },
  { cat: 'pescoco', name: 'Rotação cervical', how: 'Olhe lentamente para a direita e para a esquerda, sem elevar os ombros.', dose: '5-10 repetições por lado', goal: 'Promover mobilidade cervical.', care: 'Evite movimentos bruscos.' },
  { cat: 'pescoco', name: 'Retração cervical', how: 'Olhando para frente, leve suavemente o queixo para trás, sem inclinar a cabeça.', dose: '8-10 repetições, mantendo 3-5 segundos', goal: 'Ativar a musculatura cervical e favorecer alinhamento.', care: 'Não empurre a cabeça para baixo.' },
  { cat: 'pescoco', name: 'Inclinação lateral', how: 'Incline a cabeça suavemente em direção ao ombro, sem elevar o ombro.', dose: '20 segundos por lado', goal: 'Alongar suavemente a musculatura lateral do pescoço.', care: 'Não force.' },
  { cat: 'pes', name: 'Mobilidade dos tornozelos', how: 'Faça círculos lentos com os pés.', dose: '10 círculos para cada lado', goal: 'Promover mobilidade dos tornozelos.', care: 'Movimente sem dor.' },
  { cat: 'pes', name: 'Elevação dos calcanhares', how: 'Em pé, segurando em apoio estável, eleve os calcanhares e retorne.', dose: '2 séries de 15 repetições', goal: 'Ativar panturrilhas e tornozelos.', care: 'Use apoio para segurança.' },
  { cat: 'pes', name: 'Movimentação dos dedos', how: 'Abra e relaxe os dedos dos pés lentamente.', dose: '10-15 repetições', goal: 'Promover mobilidade dos pés.', care: 'Não force os dedos.' },
  { cat: 'pes', name: 'Alongamento de panturrilha', how: 'Leve uma perna para trás, mantenha o calcanhar no chão e incline o corpo suavemente para frente.', dose: '20-30 segundos por lado', goal: 'Alongar a panturrilha.', care: 'Mantenha o equilíbrio com apoio.' }
];

// Dados Interativos para os Hotspots na Imagem 4K
const hotspotData = [
  {
    title: '1. Acesso ao Escamoteador',
    desc: 'A contenção e medicação de leitões exigem flexão da coluna lombar. Mantenha o corpo próximo à baia, flexione os joelhos e evite torções.',
    tip: 'Orientação: Apoie um dos membros inferiores para distribuir o peso e alterne o lado.'
  },
  {
    title: '2. Arraçoamento da Matriz',
    desc: 'O transporte e o abastecimento de comedouros geram sobrecarga nos ombros. Mantenha os baldes próximos ao corpo e use carrinhos auxiliares.',
    tip: 'Orientação: Nunca gire o tronco enquanto sustenta o balde de ração elevado.'
  },
  {
    title: '3. Limpeza das Baias',
    desc: 'A lavagem submete punhos e antebraços a vibrações contínuas. Mantenha a lança da lavadora empunhada com ambas as mãos na altura da cintura.',
    tip: 'Orientação: Realize micro-pausas de 20 segundos a cada baia limpa para relaxar os tendões.'
  }
];

// Funções Iniciais
function initDashboard() {
  const contentArea = document.getElementById('dash-content');
  const buttons = document.querySelectorAll('.dash-btn');

  function renderExercises(cat) {
    if (!contentArea) return;
    contentArea.innerHTML = '';
    const items = exercisesDB.filter(e => e.cat === cat);

    items.forEach(ex => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'dash-exercise-item';
      itemDiv.innerHTML = `
        <h3>${ex.name}</h3>
        <p><strong>Execução:</strong> ${ex.how}</p>
        <div class="dash-meta-grid">
          <div><strong>Dose Sugerida</strong>${ex.dose}</div>
          <div><strong>Objetivo Principal</strong>${ex.goal}</div>
          <div class="dash-meta-care"><strong>⚠ Ponto de Atenção</strong>${ex.care}</div>
        </div>
      `;
      contentArea.appendChild(itemDiv);
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderExercises(btn.getAttribute('data-filter'));
    });
  });

  renderExercises('costas'); 
}

function initTimer() {
  let timeLeft = 180;
  let timerInterval = null;

  const countEl = document.getElementById('timer-text');
  const btnToggle = document.getElementById('btn-timer-start');
  const btnReset = document.getElementById('btn-timer-reset');
  const checkboxes = document.querySelectorAll('.routine-checklist input[type="checkbox"]');

  function update() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    if (countEl) countEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        btnToggle.textContent = 'Continuar';
        return;
      }
      btnToggle.textContent = 'Pausar';
      timerInterval = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          update();
        } else {
          clearInterval(timerInterval);
          timerInterval = null;
          btnToggle.textContent = 'Concluído';
          alert('Pausa ativa concluída com sucesso!');
        }
      }, 1000);
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = null;
      timeLeft = 180;
      update();
      if (btnToggle) btnToggle.textContent = 'Iniciar';
      checkboxes.forEach(c => c.checked = false);
    });
  }
  update();
}

// ==========================================
// CONTROLE DO HOTSPOT INTERATIVO (Pinos na Imagem)
// ==========================================
function initHotspots() {
  const titleEl = document.getElementById('hotspot-title');
  const descEl = document.getElementById('hotspot-desc');
  const tipEl = document.getElementById('hotspot-tip');
  
  // Captura todos os botões (tanto os pinos da imagem quanto os botões laterais)
  const allButtons = [
    ...document.querySelectorAll('.btn-hotspot'),
    ...document.querySelectorAll('.hotspot-pin')
  ];

  allButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove 'active' de todos os botões e pinos
      allButtons.forEach(b => b.classList.remove('active'));
      
      const pointId = btn.getAttribute('data-point');
      const data = hotspotData[pointId];

      // Ativa o pino e o botão correspondente
      document.querySelectorAll(`[data-point="${pointId}"]`).forEach(b => b.classList.add('active'));

      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (tipEl) tipEl.textContent = data.tip;
    });
  });
}

// Inicializador Seguro
window.onload = function() {
  try { if (window.lucide) window.lucide.createIcons(); } catch(e){}
  try { initDashboard(); } catch(e){}
  try { initTimer(); } catch(e){}
  try { initHotspots(); } catch(e){}
};