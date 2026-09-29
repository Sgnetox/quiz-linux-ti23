# exit 0: Quiz de Linux

Aplicação interativa de perguntas e respostas sobre os comandos e conceitos de
Linux estudados na disciplina.

**Aluno:** Lucas Fernando Vasconcelos da Silva
**Turma:** TI23, Técnico em Informática · Colégio Sinodal Progresso
**Componente:** Sistemas Operacionais Linux · **Professor:** Cristiano Forte

### ▶ [Abrir o quiz](https://sgnetox.github.io/quiz-linux-ti23/)

Não precisa instalar nem baixar nada: é HTML, CSS e JavaScript puros, e abre
direto no navegador.

---

## O que a aplicação faz

- Sorteia **20 perguntas** de um banco de **52**, então cada partida é diferente.
- Embaralha as alternativas a cada pergunta.
- Mostra a **explicação técnica** logo depois de cada resposta, certa ou errada.
- Conta acertos e erros e calcula o aproveitamento.
- No fim, lista **o que você errou** e qual era a resposta certa.
- Responde por mouse ou pelo teclado: `1` a `4` escolhem, `Enter` avança.

## As perguntas

As 52 perguntas cobrem as oito categorias pedidas no enunciado, mais SSH e
conceitos gerais:

| Categoria | Perguntas |
|---|---|
| Navegação e arquivos | 6 |
| Permissões | 6 |
| SSH | 6 |
| Visualização de arquivos | 5 |
| Usuários e grupos | 5 |
| Redirecionamento | 5 |
| Rede | 5 |
| Diagnóstico e captura | 5 |
| Conceitos | 5 |
| Processos | 4 |

Boa parte delas **não saiu de livro: saiu de medição na VM Debian 13 da
disciplina.** Por exemplo, a pergunta sobre apagar um arquivo `444` dentro de um
diretório `777`, a da `umask 027`, a do `PermitRootLogin` padrão do Debian 13 e a
do `ip link set down` numa placa com DHCP. Todas foram executadas e conferidas
antes de virar pergunta. As explicações dizem quando é esse o caso.

## Como foi feito

```
index.html          as três telas: inicial, pergunta e resultado
css/estilo.css      a folha de estilo, com os tokens de cor
js/perguntas.js     o banco de 52 perguntas
js/quiz.js          o sorteio, o embaralhamento e a contagem
DESIGN.md           a direção de design e os tokens
```

**Sem framework e sem dependência.** A única coisa que vem de fora são as fontes
IBM Plex, pelo Google Fonts. Se ficarem indisponíveis, o navegador cai para a
fonte do sistema e o quiz continua funcionando.

### Dois detalhes que valem explicar

**O embaralhamento não é enfeite.** No arquivo de perguntas, a alternativa certa
foi escrita sempre em primeiro lugar, para ficar fácil de revisar o conteúdo. Se
elas fossem exibidas nessa ordem, bastaria clicar sempre na primeira e gabaritar.
O embaralhamento em tempo de execução é o que faz o quiz valer alguma coisa.

**O sorteio usa Fisher-Yates.** O `array.sort(() => Math.random() - 0.5)`, que é o
que aparece na maioria dos tutoriais, não embaralha de verdade: a distribuição
fica torta e o resultado depende de como o navegador implementou o `sort`.

Testado: em 2.000 rodadas, a posição da alternativa correta ficou em 24,7% /
25,0% / 25,2% / 25,1%, ou seja, uniforme. E clicando ao acaso 40 vezes, a média foi de
**5,13 acertos em 20**, contra os 5 esperados de quem chuta entre quatro opções.

## A interface

A direção veio do console da própria VM da disciplina, não de uma paleta
escolhida: fundo quase preto, texto branco-osso e os acentos que o `ip -c` usa de
verdade: ciano no nome da interface, magenta no endereço, verde e vermelho em
`UP` e `DOWN`.

Três decisões que seguem daí:

- **A régua no topo** é uma fileira de blocos, um por pergunta, que preenche
  verde quando o código de saída é `0` e vermelho quando é `1`. Substitui a barra
  de progresso comum e mostra duas coisas no mesmo espaço.
- **O retorno de cada resposta** é escrito como canal: `canal 1 · correto · exit 0`
  ou `canal 2 · incorreto · exit 1`. É o conteúdo da aula de redirecionamento
  aplicado à própria interface.
- **O resultado é saída de terminal**, com um prompt `$`, o bloco de valores e um
  `$ echo $?` no fim. Não há gráfico de rosca.

A direção completa, com os tokens, está em [`DESIGN.md`](DESIGN.md).

## Acessibilidade

- Todo o quiz funciona só com o teclado, e o foco é sempre visível.
- As alternativas são `<button>` de verdade, com área de toque de 52px.
- O retorno usa `aria-live`, então leitor de tela anuncia a correção.
- Todos os pares de texto e fundo passam o mínimo AA da WCAG 2.2, medido: o mais
  apertado é o texto de metadado, em 4,77:1.
- Com `prefers-reduced-motion`, as animações praticamente somem.

## Rodando na sua máquina

Basta abrir o `index.html` no navegador. Se preferir servir:

```bash
git clone https://github.com/Sgnetox/quiz-linux-ti23.git
cd quiz-linux-ti23
python -m http.server 8000
```

E abrir <http://localhost:8000>.

---

*Trabalho da disciplina de Sistemas Operacionais Linux, TI23, 2026.*
