# Bodega CAJU 🌰

**Aplicativo Web Mobile Lúdico e Gamificado de Educação Financeira para Pequenos Negócios**  
*Disciplina de Educação Financeira · Curso de Ciências Econômicas · Universidade Regional do Cariri (URCA) — Crato-CE*  
*Outubro de 2026 · Versão 1.0*

---

## 📖 Visão Geral do Produto

A **Bodega CAJU** é uma aplicação web mobile (PWA, offline-first) em que o estudante ou pequeno empreendedor assume a gestão de um negócio no Cariri cearense (em **Vila Araripe**, cidade inspirada em Crato, Juazeiro do Norte, Barbalha e Nova Olinda). 

Ao longo de **12 estações** na **Trilha da Chapada**, guiado pelo mentor **Mestre Caju**, o jogador aprende finanças práticas conectadas à **Metodologia CAJU** (*Cidades, Análise Institucional, Jurídico e Ubíquo*) e à realidade do semiárido cearense.

---

## 🎮 Negócios Jogáveis

1. **Marmitaria da Socorro** (Crato/Vila Araripe): Vendas por WhatsApp, custos variáveis altos, estoque perecível.
2. **Barraca de Romaria do Seu Expedito** (Juazeiro do Norte): Artigos religiosos, sazonalidade extrema, capital de giro.
3. **Ateliê Couro & Palha** (Nova Olinda/Crato): Artesanato do Cariri, precificação por valor percebido, turismo e Geopark Araripe.
4. **Bodega do Bairro da Vila** (Barbalha): Secos e molhados, caderneta de fiado, PMR e capital social.
5. **Banca na Feira do Crato**: Agricultura familiar, perecibilidade de hortifrúti, perdas e crédito Agroamigo.

---

## 🗺️ As 12 Estações & O Ciclo Didático em 7 Momentos

Cada uma das 12 estações contém o ciclo didático completo:
1. **Causo (Mestre Caju)**: Narrativa em linguagem sertaneja/cordel com áudio nativo (*SpeechSynthesis*).
2. **Cartas de Saber**: Microconteúdos com conceitos, fórmulas, exemplos do Cariri e alertas.
3. **Oficina Interativa**: Simulador prático onde o jogador altera variáveis e observa impactos diretos no caixa do negócio.
4. **Desafio**: 5 questões de múltipla escolha com cálculo passo a passo e gabarito comentado imediato.
5. **Lente CAJU**: Análise estruturada nos 4 pilares (Cidades, Análise Institucional, Jurídico, Ubíquo) + Pergunta reflexiva aberta.
6. **Realidade Local**: Dados reais do Sebrae Ceará (2025/2026), Banco Central (Copom / Selic 13,75%), Crediamigo BNB e pesquisas da URCA.
7. **Missão de Campo & Selo**: Tarefa prática no mundo real (entrevistas na feira/comércio) que concede o **Selo de Ouro**.

### Resumo das 12 Oficinas:
- **Estação 1**: *A Gaveta Misturada* (Separação de gastos Casa x Negócio e definição do Pró-Labore)
- **Estação 2**: *Quem Explica?* (Associação de 4 dilemas reais às 5 teorias financeiras + NEI)
- **Estação 3**: *Calendário da Safra* (Orçamento de 12 meses, romarias e dimensionamento da reserva)
- **Estação 4**: *O Apuro do Dia 10* (Fluxo de caixa diário, déficit e negociação de prazos)
- **Estação 5**: *Raio-X da Marmita* (Classificação de CVu e diluição de custos fixos com escala)
- **Estação 6**: *Calculadora de Markup Divisor* (Precificação correta com taxas de maquininha e imposto)
- **Estação 7**: *A Régua dos Prazos* (PME, PMR, PMP, Ciclo Operacional, Ciclo Financeiro e NCG)
- **Estação 8**: *Balcão de Crédito* (Comparador de propostas: Crediamigo aval solidário, Banco e Agiota, CET e limite 30%)
- **Estação 9**: *Feira dos Investimentos* (Payback, ROI, rentabilidade real acima da Selic e detector de golpes)
- **Estação 10**: *O Painel do Negócio* (Semáforo de indicadores: Margem de Contribuição, Ponto de Equilíbrio, Liquidez Corrente e Giro)
- **Estação 11**: *Checklist de Compliance* (Fiscalização sanitária, MEI, DAS e Reforma Tributária CBS/IBS)
- **Estação 12**: *Matriz de Riscos 3x3* (Mitigação de secas, choques de fornecedor e prevenção de golpes do Pix falso)

---

## 🛠️ Ferramentas & Módulos Extras

- **Modo Empreendedor**:
  - *Caderninho Digital*: Registro diário de entradas e saídas com cálculo automático de saldo.
  - *Caderninho do Fiado*: Controle de créditos concedidos com botão direto para cobrar com mensagem amigável via WhatsApp.
  - *Calculadora de Markup*: Ferramenta ágil para uso no balcão da loja.
  - *Ficha Técnica*: Cadastro de receitas e cálculo da margem por produto.
- **Modo Revisão (Simulado Avaliação 2)**:
  - Banco de questões das etapas 3 e 5 a 10 com cronômetro regressivo (25 min), fórmulas nos enunciados, calculadora embutida e gabarito comentado.
- **Painel Docente & Comunidade**:
  - Visão geral da turma, alunos em risco, questões com maior erro para revisão presencial e exportação de dados anonimizados em **CSV** para fins acadêmicos.
  - *Modo Aval Solidário*: Cooperação comunitária inspirada no microcrédito orientado do BNB.
  - *Mini-Matriz Institucional*: Consolidação colaborativa dos dados das missões de campo por município (Crato, Juazeiro, Barbalha, Nova Olinda).
- **Acessibilidade & Ubiquidade**:
  - PWA instalável com Service Worker e manifesto para uso offline.
  - Modo Alto Contraste e ajuste dinâmico do tamanho de fonte.
  - Narração em áudio (*Text-to-Speech*) em português para os causos do Mestre Caju.

---

## 🚀 Como Executar o Projeto

No terminal, na pasta do projeto:

```bash
# 1. Instalar dependências (já realizado)
npm install

# 2. Iniciar servidor de desenvolvimento local
npm run dev

# 3. Gerar build de produção otimizado
npm run build
```

O aplicativo estará acessível em `http://localhost:5173`.
No celular ou emulando no navegador (F12 > Device Toolbar > 360px a 412px), adicione à tela inicial para experimentar o fluxo PWA nativo!
