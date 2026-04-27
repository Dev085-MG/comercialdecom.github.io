/**
 * ============================================================
 * COMERCIAL DECOM — main.js
 * ============================================================
 * Versão:     2.0
 * Criado:     27/04/2026
 * Descrição:  Script principal da landing page.
 *             Funcionalidades:
 *             1. Catálogo de produtos (dados reais dos flyers)
 *             2. Renderização dinâmica dos cards
 *             3. Filtro de categorias com acessibilidade
 *             4. Menu hambúrguer mobile com trap de foco
 *             5. Header com classe "scrolled" ao rolar
 *             6. Link ativo no menu baseado na seção visível
 *             7. Rastreamento de cliques (Google Analytics 4)
 *             8. Ano atual automático no footer
 *             9. Lazy loading de animações (IntersectionObserver)
 * ============================================================
 */

'use strict';

/* ============================================================
   1. CATÁLOGO DE PRODUTOS
   Fonte: Flyers "Ofertão do Dia" (screenshots WhatsApp reais)
   Estrutura FAB: Feature → Advantage → Benefit
   ============================================================ */

/**
 * @typedef {Object} Produto
 * @property {number}  id         - Identificador único
 * @property {string}  nome       - Nome comercial do produto
 * @property {string}  categoria  - Categoria (usado no filtro)
 * @property {number}  preco      - Preço em R$ (Number)
 * @property {string}  descricao  - Descrição FAB curta
 * @property {string}  badge      - Label do badge (ex: "🔥 Oferta")
 * @property {string}  badgeTipo  - Classe CSS do badge
 * @property {string}  emoji      - Ícone representativo
 * @property {string}  whatsapp   - Mensagem pré-formatada para wa.me
 */

/** @type {Produto[]} */
const PRODUTOS_DECOM = [
  {
    id: 1,
    nome: "Lâmpada LED Super Bulbo Elgin 65W",
    categoria: "Elétrica",
    preco: 96.00,
    descricao: "Alta potência para galpões e obras. Economia de até 80% vs. incandescente.",
    badge: "🔥 Oferta",
    badgeTipo: "",
    emoji: "💡",
    whatsapp: "Olá! Quero a Lâmpada LED Elgin 65W por R$96,00"
  },
  {
    id: 2,
    nome: "Lâmpada LED Tashibra 30W",
    categoria: "Elétrica",
    preco: 22.90,
    descricao: "Iluminação potente para salas e áreas externas. Base E27 padrão.",
    badge: "✅ Disponível",
    badgeTipo: "",
    emoji: "💡",
    whatsapp: "Olá! Quero a Lâmpada LED Tashibra 30W por R$22,90"
  },
  {
    id: 3,
    nome: "Lâmpada LED Forluz 20W",
    categoria: "Elétrica",
    preco: 9.99,
    descricao: "Ideal para residências. Luz branca, baixo consumo, instalação simples.",
    badge: "🏷️ Mais Vendido",
    badgeTipo: "produto-card__badge--vendido",
    emoji: "💡",
    whatsapp: "Olá! Quero a Lâmpada LED Forluz 20W por R$9,99"
  },
  {
    id: 4,
    nome: "Extensão Elétrica Branca Techina 10M",
    categoria: "Elétrica",
    preco: 39.99,
    descricao: "10 metros de alcance, plugue padrão ABNT NBR 14136. Segura para obra.",
    badge: "🔥 Oferta",
    badgeTipo: "",
    emoji: "🔌",
    whatsapp: "Olá! Quero a Extensão Elétrica Techina 10M por R$39,99"
  },
  {
    id: 5,
    nome: "Serra Bimetal Starret",
    categoria: "Ferramentas",
    preco: 15.99,
    descricao: "Lâmina bimetálica de alta resistência. Corta metal, PVC e alumínio.",
    badge: "🔥 Oferta",
    badgeTipo: "",
    emoji: "🔧",
    whatsapp: "Olá! Quero a Serra Bimetal Starret por R$15,99"
  },
  {
    id: 6,
    nome: "Refletor Tachibra 1600lm 20W Preto",
    categoria: "Elétrica",
    preco: 31.99,
    descricao: "Iluminação externa de alta eficiência. Resistente à chuva, ideal para fachadas.",
    badge: "✅ Disponível",
    badgeTipo: "",
    emoji: "🔦",
    whatsapp: "Olá! Quero o Refletor Tachibra 20W Preto por R$31,99"
  },
  {
    id: 7,
    nome: "Assento Sanitário Herc Preto",
    categoria: "Acabamentos",
    preco: 43.99,
    descricao: "Tampa e assento de alta durabilidade. Encaixe universal, design moderno.",
    badge: "✅ Disponível",
    badgeTipo: "",
    emoji: "🚿",
    whatsapp: "Olá! Quero o Assento Sanitário Herc Preto por R$43,99"
  },
  {
    id: 8,
    nome: "Carrinho de Mão Preto",
    categoria: "Ferramentas",
    preco: 189.90,
    descricao: "Transporte de materiais pesados com facilidade. Roda maciça e estrutura robusta.",
    badge: "✅ Disponível",
    badgeTipo: "",
    emoji: "🛒",
    whatsapp: "Olá! Quero o Carrinho de Mão Preto por R$189,90"
  },
  {
    id: 9,
    nome: "Escada Alumínio 5 Andares",
    categoria: "Ferramentas",
    preco: 239.90,
    descricao: "Leve, resistente e antiderrapante. Uso profissional em obras e manutenção.",
    badge: "✅ Disponível",
    badgeTipo: "",
    emoji: "🪜",
    whatsapp: "Olá! Quero a Escada Alumínio 5 Andares por R$239,90"
  },
  {
    id: 10,
    nome: "Tinta Secamax Hidrotintas 1,2L",
    categoria: "Pintura",
    preco: 10.40,
    descricao: "Esmalte sintético para interior e exterior. Acabamento brilhante e lavável.",
    badge: "🎨 Cores Variadas",
    badgeTipo: "",
    emoji: "🎨",
    whatsapp: "Olá! Quero a Tinta Secamax Hidrotintas 1,2L por R$10,40"
  },
  {
    id: 11,
    nome: "Tinta Hipercor Balde 15L",
    categoria: "Pintura",
    preco: 89.90,
    descricao: "Tinta acrílica econômica para grandes superfícies. Alto rendimento.",
    badge: "🏷️ Mais Vendido",
    badgeTipo: "produto-card__badge--vendido",
    emoji: "🪣",
    whatsapp: "Olá! Quero a Tinta Hipercor Balde 15L por R$89,90"
  },
  {
    id: 12,
    nome: "Pia Inox 1,20M",
    categoria: "Hidráulica",
    preco: 239.99,
    descricao: "Aço inox resistente à corrosão. Medida padrão 1,20m, fácil instalação.",
    badge: "✅ Disponível",
    badgeTipo: "",
    emoji: "🚰",
    whatsapp: "Olá! Quero a Pia Inox 1,20M por R$239,99"
  },
  {
    id: 13,
    nome: "Argamassa ACII Techmassa 15KG",
    categoria: "Alvenaria",
    preco: 11.99,
    descricao: "Argamassa colante ABNT NBR 14087 para cerâmicas, pisos e paredes.",
    badge: "🔥 Oferta",
    badgeTipo: "",
    emoji: "🧱",
    whatsapp: "Olá! Quero a Argamassa Techmassa ACII 15kg por R$11,99"
  },
  {
    id: 14,
    nome: "Torneira Banheiro 1/4 Volta",
    categoria: "Hidráulica",
    preco: 34.90,
    descricao: "Abertura rápida em 90°, economia de água e instalação simples.",
    badge: "✅ Disponível",
    badgeTipo: "",
    emoji: "🚿",
    whatsapp: "Olá! Quero a Torneira Banheiro 1/4 Volta por R$34,90"
  },
  {
    id: 15,
    nome: "Disjuntor Bipolar 20A",
    categoria: "Elétrica",
    preco: 18.50,
    descricao: "Proteção confiável para circuitos elétricos residenciais e comerciais.",
    badge: "✅ Disponível",
    badgeTipo: "",
    emoji: "⚡",
    whatsapp: "Olá! Quero o Disjuntor Bipolar 20A por R$18,50"
  }
];

/* ============================================================
   2. UTILITÁRIOS AUXILIARES
   ============================================================ */

/**
 * Formata número como moeda brasileira
 * @param  {number} valor - Valor numérico
 * @returns {string}       - Ex: "R$ 9,99"
 *
 * @example
 * formatarPreco(9.99)  // → "9,99"
 * formatarPreco(239.9) // → "239,90"
 */
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/**
 * Gera a URL de WhatsApp com mensagem pré-formatada
 * Inclui parâmetro UTM para rastrear origem no GA4
 * @param  {string} mensagem - Texto da mensagem
 * @returns {string}          - URL completa wa.me
 */
function gerarLinkWhatsApp(mensagem) {
  const numero   = '5585994311431';
  const texto    = encodeURIComponent(mensagem);
  return `https://wa.me/${numero}?text=${texto}`;
}

/**
 * Envia evento para o Google Analytics 4
 * Verifica se gtag está disponível antes de disparar
 * @param {string} nomeEvento  - Nome do evento GA4
 * @param {Object} parametros  - Parâmetros adicionais do evento
 */
function rastrearEvento(nomeEvento, parametros = {}) {
  if (typeof gtag === 'function') {
    gtag('event', nomeEvento, {
      event_category: 'engajamento',
      ...parametros
    });
  }
}

/* ============================================================
   3. RENDERIZAÇÃO DOS CARDS DE PRODUTO
   ============================================================ */

/**
 * Gera o HTML de um card de produto individual
 * Segue padrão FAB: Feature (nome/categoria) →
 *                   Advantage (descrição) →
 *                   Benefit (preço + CTA)
 *
 * @param  {Produto} produto - Objeto produto do catálogo
 * @returns {string}          - HTML string do card
 *
 * @example
 * // Entrada:
 * criarCardProduto(PRODUTOS_DECOM[2])
 *
 * // Saída esperada:
 * // <li class="produto-card" data-categoria="Elétrica">
 * //   <div class="produto-card__icon-wrap">...💡...</div>
 * //   <div class="produto-card__body">
 * //     <span class="produto-card__categoria">Elétrica</span>
 * //     <h3>Lâmpada LED Forluz 20W</h3>
 * //     ...R$ 9,99...
 * //     <a href="https://wa.me/...">Pedir pelo WhatsApp</a>
 * //   </div>
 * // </li>
 */
function criarCardProduto(produto) {
  const linkWA    = gerarLinkWhatsApp(produto.whatsapp);
  const precoFmt  = formatarPreco(produto.preco);

  /*
   * Template literal com HTML semântico:
   * - data-categoria: usado pelo filtro JS
   * - aria-label no botão: descreve a ação completa
   * - aria-hidden nos emojis: evita leitura duplicada
   */
  return `
    <li
      class="produto-card"
      data-categoria="${produto.categoria}"
      data-id="${produto.id}">

      <!-- Área do ícone/emoji com badge -->
      <div class="produto-card__icon-wrap">
        <span class="produto-card__badge ${produto.badgeTipo}">
          ${produto.badge}
        </span>
        <span aria-hidden="true" role="img" title="${produto.nome}">
          ${produto.emoji}
        </span>
      </div>

      <!-- Corpo do card -->
      <div class="produto-card__body">

        <!-- Categoria (chip) -->
        <span class="produto-card__categoria">
          ${produto.categoria}
        </span>

        <!-- Nome do produto — H3 (hierarquia: H2 na seção) -->
        <h3 class="produto-card__nome">${produto.nome}</h3>

        <!-- Descrição FAB -->
        <p class="produto-card__desc">${produto.descricao}</p>

        <!-- Preço em destaque -->
        <div
          class="produto-card__preco"
          aria-label="Preço: R$ ${precoFmt}">
          <span
            class="produto-card__preco-prefixo"
            aria-hidden="true">R$&nbsp;</span>${precoFmt}
        </div>

        <!-- CTA WhatsApp — conversão principal -->
        <a
          href="${linkWA}"
          class="produto-card__btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pedir ${produto.nome} pelo WhatsApp — R$ ${precoFmt}"
          data-evento="whatsapp_produto"
          data-produto-id="${produto.id}"
          data-produto-nome="${produto.nome}">
          <span aria-hidden="true">💬</span>
          Pedir pelo WhatsApp
        </a>

      </div>
    </li>
  `;
}

/**
 * Renderiza lista de produtos no grid da página
 * Usa DocumentFragment para performance (1 único reflow)
 *
 * @param {Produto[]} lista - Array de produtos a renderizar
 * @param {string}    [categoria="todos"] - Categoria ativa no filtro
 *
 * @example
 * // Renderiza todos os produtos
 * renderizarProdutos(PRODUTOS_DECOM);
 *
 * // Renderiza apenas Elétrica
 * renderizarProdutos(PRODUTOS_DECOM, 'Elétrica');
 *
 * // Resultado esperado:
 * // Grid preenchido com cards filtrando por categoria
 * // Mensagem "Nenhum produto encontrado" se lista vazia
 */
function renderizarProdutos(lista, categoria = 'todos') {

  const grid = document.getElementById('produtos-grid');
  if (!grid) return;

  /* Filtra por categoria se não for "todos" */
  const produtosFiltrados = categoria === 'todos'
    ? lista
    : lista.filter(p => p.categoria === categoria);

  /* Limpa o grid atual */
  grid.innerHTML = '';

  /* Caso nenhum produto seja encontrado */
  if (produtosFiltrados.length === 0) {
    grid.innerHTML = `
      <li class="produtos-vazio" role="status">
        <span aria-hidden="true">🔍</span>
        Nenhum produto encontrado nesta categoria.
        <br>
        <a
          href="https://wa.me/5585994311431?text=Olá!%20Procuro%20produtos%20de%20${encodeURIComponent(categoria)}"
          target="_blank"
          rel="noopener noreferrer">
          Consultar disponibilidade pelo WhatsApp →
        </a>
      </li>
    `;
    return;
  }

  /*
   * DocumentFragment: adiciona todos os nós ao DOM
   * em uma única operação → melhor performance
   */
  const fragmento = document.createDocumentFragment();
  const tempDiv   = document.createElement('div');

  produtosFiltrados.forEach(produto => {
    tempDiv.innerHTML = criarCardProduto(produto);
    const cardEl = tempDiv.firstElementChild;

    /* Adiciona delay de animação escalonado */
    const indice = produtosFiltrados.indexOf(produto);
    cardEl.style.animationDelay = `${indice * 60}ms`;

    fragmento.appendChild(cardEl);
  });

  grid.appendChild(fragmento);

  /* Registra eventos de clique nos botões WhatsApp do grid */
  registrarEventosBotoesProduto();
}

/* ============================================================
   4. FILTRO DE CATEGORIAS
   ============================================================ */

/**
 * Inicializa o sistema de filtro de categorias
 * Atualiza aria-pressed para acessibilidade
 * Rastreia cliques no GA4
 *
 * Resultado esperado:
 * - Clicar em "Elétrica" → mostra apenas produtos elétricos
 * - Botão ativo recebe classe "filtro-btn--ativo"
 * - aria-pressed="true" no botão ativo
 * - aria-pressed="false" nos demais
 */
function inicializarFiltros() {

  const botoesFiltro = document.querySelectorAll('.filtro-btn');
  if (!botoesFiltro.length) return;

  botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {

      const categoria = botao.dataset.categoria;

      /* Atualiza estado visual e ARIA em todos os botões */
      botoesFiltro.forEach(btn => {
        btn.classList.remove('filtro-btn--ativo');
        btn.setAttribute('aria-pressed', 'false');
      });

      botao.classList.add('filtro-btn--ativo');
      botao.setAttribute('aria-pressed', 'true');

      /* Renderiza produtos filtrados */
      renderizarProdutos(PRODUTOS_DECOM, categoria);

      /* Rastreia no GA4 */
      rastrearEvento('filtro_categoria', {
        event_label: categoria,
        event_category: 'produtos'
      });
    });
  });
}

/* ============================================================
   5. RASTREAMENTO DE EVENTOS WHATSAPP
   ============================================================ */

/**
 * Registra rastreamento GA4 em todos os links de WhatsApp da página
 * Usa delegação de eventos no document para capturar
 * links renderizados dinamicamente (cards de produto)
 *
 * Eventos rastreados:
 * - whatsapp_header          → CTA do header
 * - whatsapp_hero_principal  → CTA principal do hero
 * - whatsapp_sobre           → Botão da seção Sobre
 * - whatsapp_cta_central     → Botão do CTA central
 * - whatsapp_contato         → Botão da seção Contato
 * - whatsapp_botao_flutuante → Botão flutuante
 * - whatsapp_produto         → Botões individuais nos cards
 */
function inicializarRastreamento() {

  /*
   * Event delegation: um único listener no document
   * captura cliques em qualquer link de WhatsApp,
   * mesmo os gerados dinamicamente pelo JS
   */
  document.addEventListener('click', (evento) => {

    const elemento = evento.target.closest('[data-evento]');
    if (!elemento) return;

    const nomeEvento   = elemento.dataset.evento;
    const produtoNome  = elemento.dataset.produtoNome || null;
    const produtoId    = elemento.dataset.produtoId   || null;

    rastrearEvento(nomeEvento, {
      event_label:  produtoNome || nomeEvento,
      produto_id:   produtoId,
      produto_nome: produtoNome,
      event_category: 'conversao'
    });
  });
}

/**
 * Registra eventos específicos nos botões de produto
 * após renderização dinâmica
 * (complementa o event delegation acima)
 */
function registrarEventosBotoesProduto() {
  const botoesProduto = document.querySelectorAll('[data-evento="whatsapp_produto"]');

  botoesProduto.forEach(botao => {
    botao.addEventListener('click', () => {
      rastrearEvento('whatsapp_produto_click', {
        produto_id:   botao.dataset.produtoId,
        produto_nome: botao.dataset.produtoNome,
        event_category: 'conversao',
        event_label: botao.dataset.produtoNome
      });
    });
  });
}

/* ============================================================
   6. MENU HAMBÚRGUER MOBILE
   ============================================================ */

/**
 * Inicializa o menu hambúrguer para mobile
 * Funcionalidades:
 * - Toggle do drawer de navegação
 * - Trap de foco (acessibilidade WCAG 2.1 — 2.4.3)
 * - Fecha ao pressionar Escape
 * - Fecha ao clicar fora do menu
 * - Atualiza aria-expanded
 *
 * Resultado esperado (mobile):
 * - Clique no hambúrguer → abre drawer da direita
 * - Ícone vira X
 * - Clique no X, fora do menu ou Escape → fecha
 * - Tab mantido dentro do menu enquanto aberto
 */
/* ============================================================
   CONTINUAÇÃO — js/main.js
   A partir da função inicializarMenuMobile()
   ============================================================ */

/**
 * Inicializa o menu hambúrguer para mobile
 * - Toggle do drawer de navegação
 * - Trap de foco (WCAG 2.1 — 2.4.3)
 * - Fecha ao pressionar Escape
 * - Fecha ao clicar fora do menu
 * - Atualiza aria-expanded
 *
 * @example
 * // Resultado esperado no mobile:
 * // Clique hambúrguer → abre drawer + ícone vira X
 * // Clique fora ou Escape → fecha drawer
 */
function inicializarMenuMobile() {

  const toggle = document.getElementById('menu-toggle');
  const nav    = document.getElementById('nav-menu');

  if (!toggle || !nav) return;

  /**
   * Retorna todos os elementos focáveis dentro do nav
   * Usado para trap de foco (acessibilidade)
   * @returns {Element[]}
   */
  const getFocaveis = () => [
    ...nav.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ].filter(el => !el.hasAttribute('hidden'));

  /** Abre o menu drawer */
  function abrirMenu() {
    nav.classList.add('nav--aberto');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; /* Bloqueia scroll do body */

    /* Foca o primeiro elemento do menu */
    const focaveis = getFocaveis();
    if (focaveis.length) focaveis[0].focus();
  }

  /** Fecha o menu drawer */
  function fecharMenu() {
    nav.classList.remove('nav--aberto');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggle.focus(); /* Retorna foco ao botão que abriu */
  }

  /** Alterna entre aberto/fechado */
  function toggleMenu() {
    const estaAberto = toggle.getAttribute('aria-expanded') === 'true';
    estaAberto ? fecharMenu() : abrirMenu();
  }

  /* Evento principal do botão hambúrguer */
  toggle.addEventListener('click', toggleMenu);

  /*
   * TRAP DE FOCO — WCAG 2.1 Success Criterion 2.4.3
   * Mantém o Tab circulando dentro do menu enquanto aberto
   */
  nav.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Tab') return;

    const focaveis = getFocaveis();
    if (!focaveis.length) return;

    const primeiro = focaveis[0];
    const ultimo   = focaveis[focaveis.length - 1];

    if (evento.shiftKey) {
      /* Shift+Tab: se no primeiro elemento, vai para o último */
      if (document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      }
    } else {
      /* Tab: se no último elemento, vai para o primeiro */
      if (document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    }
  });

  /* Fecha com tecla Escape */
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      fecharMenu();
    }
  });

  /* Fecha ao clicar fora do menu */
  document.addEventListener('click', (evento) => {
    const clicouFora =
      !nav.contains(evento.target) &&
      !toggle.contains(evento.target);

    if (clicouFora && toggle.getAttribute('aria-expanded') === 'true') {
      fecharMenu();
    }
  });

  /* Fecha ao clicar em um link do menu (single-page navigation) */
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      if (toggle.getAttribute('aria-expanded') === 'true') {
        fecharMenu();
      }
    });
  });
}

/* ============================================================
   7. HEADER — EFEITO SCROLL
   Adiciona classe "header--scrolled" quando página rola
   Permite aplicar estilos diferentes (sombra, fundo opaco)
   ============================================================ */

/**
 * Monitora scroll e aplica classe visual ao header
 * Usa requestAnimationFrame para otimizar performance
 *
 * Resultado esperado:
 * - Página no topo  → header transparente/normal
 * - Após rolar 50px → header recebe classe "header--scrolled"
 */
function inicializarHeaderScroll() {

  const header    = document.querySelector('.header');
  if (!header) return;

  let ticking = false; /* Flag para requestAnimationFrame */

  function atualizarHeader() {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    /* Throttle via rAF — evita execuções excessivas */
    if (!ticking) {
      requestAnimationFrame(atualizarHeader);
      ticking = true;
    }
  }, { passive: true }); /* passive: melhora performance do scroll */
}

/* CSS necessário para o efeito (adicionar ao style.css): */
/*
.header--scrolled {
  background-color: rgba(26, 26, 26, 0.98);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
*/

/* ============================================================
   8. LINK ATIVO NO MENU — SCROLL SPY
   Destaca o link do menu correspondente à seção visível
   Usa IntersectionObserver para performance máxima
   ============================================================ */

/**
 * Ativa o link de navegação da seção atualmente visível
 * Usa IntersectionObserver (sem eventos de scroll custosos)
 *
 * Resultado esperado:
 * - Usuário rola até #ofertas → link "Ofertas" fica ativo
 * - Muda automaticamente conforme rola a página
 */
function inicializarScrollSpy() {

  const secoes  = document.querySelectorAll('section[id]');
  const links   = document.querySelectorAll('.nav__link[href^="#"]');

  if (!secoes.length || !links.length) return;

  /**
   * Mapeia href → elemento link para lookup rápido
   * @type {Map<string, Element>}
   */
  const mapaLinks = new Map();
  links.forEach(link => {
    mapaLinks.set(link.getAttribute('href').slice(1), link);
  });

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach(entrada => {
        const idSecao = entrada.target.id;
        const linkAtivo = mapaLinks.get(idSecao);

        if (!linkAtivo) return;

        if (entrada.isIntersecting) {
          /* Remove ativo de todos */
          links.forEach(l => {
            l.removeAttribute('aria-current');
            l.classList.remove('nav__link--ativo');
          });

          /* Ativa o link correspondente */
          linkAtivo.setAttribute('aria-current', 'page');
          linkAtivo.classList.add('nav__link--ativo');
        }
      });
    },
    {
      /*
       * rootMargin negativo: seção precisa estar
       * pelo menos 20% visível para ser considerada ativa
       */
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    }
  );

  secoes.forEach(secao => observer.observe(secao));
}

/* ============================================================
   9. ANIMAÇÕES DE ENTRADA — INTERSECTION OBSERVER
   Anima elementos quando entram na viewport
   Respeita prefers-reduced-motion
   ============================================================ */

/**
 * Aplica animações de entrada aos cards e seções
 * conforme o usuário rola a página
 *
 * Resultado esperado:
 * - Cards de diferencial, produto e depoimento
 *   aparecem com fadeInUp ao entrar na tela
 * - Usuários com prefers-reduced-motion não veem animações
 */
function inicializarAnimacoesEntrada() {

  /* Respeita preferência de acessibilidade */
  const prefereReduzido = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefereReduzido) return;

  /* Seleciona elementos animáveis */
  const elementosAnimaveis = document.querySelectorAll(
    '.diferencial-card, .depoimento-card, .categoria-card, .contato-card'
  );

  if (!elementosAnimaveis.length) return;

  /* Estado inicial: invisível */
  elementosAnimaveis.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada, indice) => {
        if (!entrada.isIntersecting) return;

        /* Delay escalonado para efeito cascata */
        setTimeout(() => {
          entrada.target.style.opacity    = '1';
          entrada.target.style.transform  = 'translateY(0)';
        }, indice * 80);

        /* Para de observar após animar (executa uma vez) */
        observer.unobserve(entrada.target);
      });
    },
    {
      threshold: 0.1, /* 10% visível já dispara */
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elementosAnimaveis.forEach(el => observer.observe(el));
}

/* ============================================================
   10. ANO AUTOMÁTICO NO FOOTER
   ============================================================ */

/**
 * Atualiza automaticamente o ano de copyright no footer
 * Evita precisar editar o HTML a cada virada de ano
 *
 * @example
 * // HTML: <span id="ano-atual"></span>
 * // Resultado: <span id="ano-atual">2026</span>
 */
function atualizarAnoFooter() {
  const elemento = document.getElementById('ano-atual');
  if (elemento) {
    elemento.textContent = new Date().getFullYear();
  }
}

/* ============================================================
   11. SMOOTH SCROLL PARA LINKS INTERNOS
   Fallback para browsers sem suporte ao CSS scroll-behavior
   ============================================================ */

/**
 * Implementa smooth scroll para links âncora internos
 * com offset para compensar o header fixo
 *
 * @example
 * // Clicar em <a href="#ofertas"> →
 * // rola suavemente até a seção #ofertas
 * // com offset de 80px (altura do header)
 */
function inicializarSmoothScroll() {

  const OFFSET_HEADER = 80; /* Altura do header fixo em px */

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (evento) => {

      const href    = link.getAttribute('href');
      if (href === '#') return; /* Ignora links vazios */

      const destino = document.querySelector(href);
      if (!destino) return;

      evento.preventDefault();

      const posicaoTopo = destino.getBoundingClientRect().top
        + window.pageYOffset
        - OFFSET_HEADER;

      window.scrollTo({
        top:      posicaoTopo,
        behavior: 'smooth'
      });

      /*
       * Atualiza a URL sem recarregar a página
       * Melhora UX ao compartilhar links diretos
       */
      history.pushState(null, '', href);
    });
  });
}

/* ============================================================
   12. INICIALIZAÇÃO PRINCIPAL
   Ponto de entrada — executa tudo após DOM carregado
   ============================================================ */

/**
 * Inicializa todos os módulos da página
 * DOMContentLoaded: garante que o HTML está parseado
 * antes de qualquer manipulação do DOM
 *
 * Ordem de inicialização (prioridade):
 * 1. Produtos (conteúdo principal)
 * 2. Filtros (dependem dos produtos)
 * 3. Rastreamento (deve estar pronto cedo)
 * 4. Menu mobile
 * 5. Header scroll
 * 6. Scroll spy
 * 7. Animações (menos crítico)
 * 8. Utilitários
 */
document.addEventListener('DOMContentLoaded', () => {

  try {

    /* 1. Renderiza catálogo completo de produtos */
    renderizarProdutos(PRODUTOS_DECOM);

    /* 2. Ativa sistema de filtro por categoria */
    inicializarFiltros();

    /* 3. Configura rastreamento GA4 via event delegation */
    inicializarRastreamento();

    /* 4. Menu hambúrguer mobile com trap de foco */
    inicializarMenuMobile();

    /* 5. Efeito visual do header ao rolar */
    inicializarHeaderScroll();

    /* 6. Link ativo baseado na seção visível */
    inicializarScrollSpy();

    /* 7. Animações de entrada nos cards */
    inicializarAnimacoesEntrada();

    /* 8. Ano automático no footer */
    atualizarAnoFooter();

    /* 9. Smooth scroll com offset do header */
    inicializarSmoothScroll();

    console.info(
      '%c✅ Comercial Decom — Scripts carregados com sucesso',
      'color: #25D366; font-weight: bold; font-size: 12px;'
    );

  } catch (erro) {
    /*
     * Em produção, substituir console.error por
     * um serviço de monitoramento (ex: Sentry)
     */
    console.error('Erro na inicialização:', erro);
  }

});