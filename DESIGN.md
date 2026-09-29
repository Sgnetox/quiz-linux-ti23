---
version: "alpha"
name: "exit 0"
description: "Quiz de Linux da turma TI23. A direção vem do console da VM Debian 13 da disciplina, não de uma paleta escolhida."
colors:
  tty-base: "#0b0d0e"
  tty-painel: "#121517"
  tty-elevado: "#171b1d"
  tty-pressao: "#1d2225"
  texto: "#e8e6e3"
  texto-2: "#a8b0b4"
  texto-3: "#798489"
  texto-4: "#4d565a"
  primary: "#4ec9d4"
  iface: "#4ec9d4"
  iface-forte: "#7fdde5"
  endereco: "#d977c8"
  canal-1: "#57ab5a"
  canal-2: "#e5534b"
  botao-texto: "#05191c"
typography:
  titulo:
    fontFamily: "IBM Plex Mono"
    fontSize: "56px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  subtitulo:
    fontFamily: "IBM Plex Sans"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.5
  enunciado:
    fontFamily: "IBM Plex Sans"
    fontSize: "22px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  corpo:
    fontFamily: "IBM Plex Sans"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  alternativa:
    fontFamily: "IBM Plex Sans"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  botao:
    fontFamily: "IBM Plex Sans"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.5
  mono-etiqueta:
    fontFamily: "IBM Plex Mono"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  mono-meta:
    fontFamily: "IBM Plex Mono"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
  numero-grande:
    fontFamily: "IBM Plex Mono"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  e1: "4px"
  e2: "8px"
  e3: "12px"
  e4: "16px"
  e5: "24px"
  e6: "32px"
  e7: "48px"
  e8: "64px"
components:
  titulo-inicial:
    backgroundColor: "{colors.tty-base}"
    textColor: "{colors.texto}"
    typography: "{typography.titulo}"
  subtitulo-inicial:
    backgroundColor: "{colors.tty-base}"
    textColor: "{colors.iface}"
    typography: "{typography.subtitulo}"
  descricao:
    backgroundColor: "{colors.tty-base}"
    textColor: "{colors.texto-2}"
    typography: "{typography.corpo}"
  enunciado-pergunta:
    backgroundColor: "{colors.tty-base}"
    textColor: "{colors.texto}"
    typography: "{typography.enunciado}"
  categoria:
    backgroundColor: "{colors.tty-base}"
    textColor: "{colors.iface}"
    typography: "{typography.mono-meta}"
  alternativa-padrao:
    backgroundColor: "{colors.tty-painel}"
    textColor: "{colors.texto}"
    typography: "{typography.alternativa}"
  alternativa-hover:
    backgroundColor: "{colors.tty-pressao}"
    textColor: "{colors.texto}"
    typography: "{typography.alternativa}"
  botao-principal:
    backgroundColor: "{colors.iface}"
    textColor: "{colors.botao-texto}"
    typography: "{typography.botao}"
  retorno-acerto:
    backgroundColor: "{colors.tty-painel}"
    textColor: "{colors.canal-1}"
    typography: "{typography.mono-etiqueta}"
  retorno-erro:
    backgroundColor: "{colors.tty-painel}"
    textColor: "{colors.canal-2}"
    typography: "{typography.mono-etiqueta}"
  retorno-explicacao:
    backgroundColor: "{colors.tty-painel}"
    textColor: "{colors.texto-2}"
    typography: "{typography.alternativa}"
  aproveitamento:
    backgroundColor: "{colors.tty-painel}"
    textColor: "{colors.endereco}"
    typography: "{typography.numero-grande}"
  meta-painel:
    backgroundColor: "{colors.tty-painel}"
    textColor: "{colors.texto-3}"
    typography: "{typography.mono-etiqueta}"
---

# exit 0: direção de design

## Overview

Um quiz de comandos de Linux para a turma TI23. Quem abre é o professor,
corrigindo, e o aluno revisando antes da prova. O que a pessoa precisa fazer é
uma coisa só: responder uma pergunta por vez e entender o porquê quando errar.

O sentimento é o de um terminal: escuro, denso, sem enfeite, com a informação
carregada pela tipografia e por três cores que significam alguma coisa. Nada de
cartão colorido, ilustração ou gradiente.

A direção não foi escolhida num catálogo. Ela saiu dos mais de trinta prints de
console que a disciplina produziu na VM Debian 13: fundo quase preto, texto
branco-osso, e os acentos que o `ip -c` usa de verdade.

## Colors

Um matiz de superfície só, quatro degraus de luz. Cor é recurso escasso: cerca
de 90% da tela é estrutura neutra.

- `tty-base` a tela, `tty-painel` o bloco de conteúdo, `tty-elevado` a
  alternativa, `tty-pressao` o hover. Cada degrau é alguns pontos de luz, não um
  salto.
- Quatro níveis de texto: `texto` para o principal, `texto-2` apoio, `texto-3`
  metadado, `texto-4` desligado.
- `primary` existe porque o formato espera um token com esse nome; é o mesmo
  ciano do `iface`, que é como ele se chama no resto do projeto.
- **`iface` (ciano) é o único acento.** É a cor com que o `ip -c` pinta o nome da
  interface. Marca o que é interativo e o que é comando.
- `canal-1` (verde) e `canal-2` (vermelho) são **semânticos, nunca decorativos**:
  acerto e erro, `stdout` e `stderr`, `UP` e `DOWN`.
- `endereco` (magenta) é a cor com que o `ip -c` pinta endereço. Aqui aparece uma
  única vez: no número do aproveitamento.

## Typography

IBM Plex Sans e IBM Plex Mono. A escolha é motivada, não estética: a família
Plex foi desenhada para a IBM, a empresa dos terminais e mainframes de onde o
Unix veio. A mono não é fantasia: o conteúdo do quiz **são** comandos, e comando
se lê em monoespaçada.

Escala com razão ~1.25 a partir de 16px, arredondada para inteiros:
`12 · 13 · 15 · 16 · 18 · 22 · 40 · 56`.

A hierarquia usa três alavancas juntas, nunca só o tamanho: corpo em
`texto-2/400`, valor em `texto/500`, metadado em `texto-3` monoespaçado e
minúsculo. Título e número grande levam tracking negativo; corpo fica em 1.6 de
entrelinha.

Todo número que muda na tela (placar, aproveitamento) usa `tabular-nums`, para a
largura não pular.

## Layout

Coluna única, 720px no máximo. Não há navegação: a tela tem uma tarefa só, e
inventar uma barra lateral seria mobília.

Base de espaçamento 4px, usada só em múltiplos. A densidade é de painel de
ferramenta, não de folheto: 12–16px dentro dos controles, 24–32px entre grupos,
48px acima do título.

O ritmo é desigual de propósito: as alternativas ficam juntas (8px), e o bloco de
retorno abre 24px de ar antes de aparecer.

Abaixo de 560px a ficha do aluno passa de duas colunas para uma e os botões
ocupam a largura toda.

## Elevation & Depth

**Uma estratégia só: superfície mais borda de baixa opacidade. Sem sombra.** Em
fundo escuro sombra não aparece, e quem separa os planos é a diferença de luz.

As bordas são `rgba(232,230,227,0.09)` no padrão e `0.16` na ênfase. Passam
despercebidas até você procurar por elas, que é o objetivo.

O único anel é o de foco, em `iface` com 3px de afastamento, para ser óbvio no
teclado.

## Shapes

Escala de raio por tamanho do elemento: 4px no bloco da régua e na tecla, 8px em
botão e alternativa, 12px em cartão e bloco de saída. Nada de raio grande em
elemento pequeno.

O bloco de retorno e o item de revisão usam borda só à esquerda, e por isso têm
raio zero desse lado, porque canto arredondado com borda de um lado só fica torto.

## Components

**A régua de códigos de saída** é a assinatura. Um bloco por pergunta, no topo:
cinza quando não respondida, verde quando o código foi 0, vermelho quando foi 1.
Substitui a barra de progresso genérica e carrega duas informações no mesmo
espaço: onde você está e como está indo.

**O retorno como canal.** Acertou, a linha diz `canal 1 · correto · exit 0`;
errou, `canal 2 · incorreto · exit 1`. É o conteúdo da aula de redirecionamento
aplicado à própria interface.

**O resultado é saída de terminal**, não um gráfico: um prompt `$`, o comando, o
bloco de valores, e um `$ echo $?` com o código. O aproveitamento é o único
número grande da tela inteira, e o único lugar onde o magenta aparece.

**Alternativas** são `<button>` de verdade, numeradas de 1 a 4, respondíveis pelo
teclado. Altura mínima de 52px, acima dos 44 da WCAG.

## Do's and Don'ts

**Faça**

- Use `canal-1` e `canal-2` só para acerto e erro. Se a cor não significa nada,
  ela vira ruído.
- Deixe o ciano ser o único acento. Um segundo acento dilui o primeiro.
- Anime só `transform` e `opacity`, abaixo de 300ms, com `ease-out`.
- Respeite `prefers-reduced-motion`: as transições caem para quase zero.

**Não faça**

- Verde-Matrix sobre preto com fonte "hacker". É o clichê que o projeto rejeita
  explicitamente; a paleta real do console é branco-osso com acentos.
- Gráfico de rosca ou barra de porcentagem no resultado. O resultado é texto de
  terminal.
- Emoji de certo e errado. O vocabulário do produto é código de saída, 0 e 1.
- Sombra para separar plano. A profundidade aqui é luz e borda.
- Cor em elemento decorativo. Cinza constrói estrutura, cor comunica estado.
