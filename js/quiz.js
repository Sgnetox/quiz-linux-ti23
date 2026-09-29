/* ==========================================================================
   exit 0 — Quiz de Linux — lógica
   TI23 — Sistemas Operacionais Linux

   Sem dependência nenhuma: o arquivo abre direto no navegador.

   Dois cuidados que valem explicar, porque não são óbvios lendo o código:

   1. No banco, a alternativa correta foi escrita sempre em primeiro lugar,
      para ficar fácil de revisar o conteúdo. Se as alternativas fossem
      mostradas nessa ordem, bastaria clicar sempre na primeira. Por isso o
      embaralhamento das ALTERNATIVAS não é enfeite: é o que faz o quiz valer.

   2. O sorteio usa Fisher-Yates. O `array.sort(() => Math.random() - 0.5)`
      que se vê por aí não embaralha de verdade: distribui mal e depende da
      implementação do sort.
   ========================================================================== */

(function () {
  "use strict";

  var TOTAL_DA_RODADA = 20;

  var estado = {
    perguntas: [],
    indice: 0,
    acertos: 0,
    erros: 0,
    respondida: false,
    errosDetalhe: []
  };

  /* ------------------------------------------------------------- utilidades */

  function $(id) { return document.getElementById(id); }

  /** Fisher-Yates: cada permutação com a mesma probabilidade. */
  function embaralhar(lista) {
    var copia = lista.slice();
    for (var i = copia.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = copia[i]; copia[i] = copia[j]; copia[j] = t;
    }
    return copia;
  }

  /** Sorteia as perguntas da rodada e embaralha as alternativas de cada uma. */
  function montarRodada(banco, quantas) {
    return embaralhar(banco).slice(0, quantas).map(function (p) {
      var textoCerto = p.alternativas[p.correta];
      var alternativas = embaralhar(p.alternativas);
      return {
        categoria: p.categoria,
        enunciado: p.enunciado,
        alternativas: alternativas,
        correta: alternativas.indexOf(textoCerto),
        explicacao: p.explicacao
      };
    });
  }

  function trocarTela(idAtivo) {
    ["tela-inicio", "tela-quiz", "tela-resultado"].forEach(function (id) {
      var el = $(id);
      var ativo = id === idAtivo;
      el.hidden = !ativo;
      el.classList.toggle("tela--ativa", ativo);
    });
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  /* ------------------------------------------------------------------ régua */

  function montarRegua(quantas) {
    var regua = $("regua");
    regua.innerHTML = "";
    for (var i = 0; i < quantas; i++) {
      var li = document.createElement("li");
      li.className = "regua__bloco";
      regua.appendChild(li);
    }
  }

  function marcarRegua(indice, classe) {
    var blocos = $("regua").children;
    if (!blocos[indice]) return;
    blocos[indice].className = "regua__bloco " + classe;
  }

  /* --------------------------------------------------------------- perguntas */

  function mostrarPergunta() {
    var p = estado.perguntas[estado.indice];
    estado.respondida = false;

    $("num-atual").textContent = estado.indice + 1;
    $("categoria").textContent = p.categoria;
    $("enunciado").innerHTML = p.enunciado;

    marcarRegua(estado.indice, "regua__bloco--atual");

    var lista = $("alternativas");
    lista.innerHTML = "";

    p.alternativas.forEach(function (texto, i) {
      var li = document.createElement("li");
      var botao = document.createElement("button");
      botao.type = "button";
      botao.className = "alternativa";
      botao.dataset.indice = String(i);

      var tecla = document.createElement("span");
      tecla.className = "alternativa__tecla";
      tecla.textContent = String(i + 1);
      tecla.setAttribute("aria-hidden", "true");

      var rotulo = document.createElement("span");
      rotulo.innerHTML = texto;

      botao.appendChild(tecla);
      botao.appendChild(rotulo);
      botao.addEventListener("click", function () { responder(i); });

      li.appendChild(botao);
      lista.appendChild(li);
    });

    var retorno = $("retorno");
    retorno.hidden = true;
    retorno.className = "retorno";
    $("btn-proxima").hidden = true;
  }

  function responder(escolhida) {
    if (estado.respondida) return;
    estado.respondida = true;

    var p = estado.perguntas[estado.indice];
    var acertou = escolhida === p.correta;

    if (acertou) {
      estado.acertos++;
      marcarRegua(estado.indice, "regua__bloco--ok");
    } else {
      estado.erros++;
      marcarRegua(estado.indice, "regua__bloco--erro");
      estado.errosDetalhe.push({
        enunciado: p.enunciado,
        certa: p.alternativas[p.correta]
      });
    }

    $("placar-acertos").textContent = estado.acertos;
    $("placar-erros").textContent = estado.erros;

    var botoes = $("alternativas").querySelectorAll(".alternativa");
    botoes.forEach(function (b, i) {
      b.disabled = true;
      if (i === p.correta) {
        b.classList.add("alternativa--certa");
      } else if (i === escolhida) {
        b.classList.add("alternativa--errada");
      } else {
        b.classList.add("alternativa--apagada");
      }
    });

    var retorno = $("retorno");
    retorno.className = "retorno " + (acertou ? "retorno--ok" : "retorno--erro");
    $("retorno-veredito").textContent = acertou
      ? "canal 1 · correto · exit 0"
      : "canal 2 · incorreto · exit 1";
    $("retorno-explicacao").innerHTML = p.explicacao;
    retorno.hidden = false;

    var proxima = $("btn-proxima");
    proxima.hidden = false;
    proxima.textContent = estado.indice + 1 < estado.perguntas.length
      ? "Próxima"
      : "Ver o resultado";
    proxima.focus();
  }

  function avancar() {
    if (!estado.respondida) return;
    estado.indice++;
    if (estado.indice < estado.perguntas.length) {
      mostrarPergunta();
    } else {
      mostrarResultado();
    }
  }

  /* --------------------------------------------------------------- resultado */

  function mostrarResultado() {
    var total = estado.perguntas.length;
    var pct = Math.round((estado.acertos / total) * 100);

    $("r-total").textContent = total;
    $("r-acertos").textContent = estado.acertos;
    $("r-erros").textContent = estado.erros;
    $("r-aproveitamento").textContent = pct + "%";

    var codigo = $("r-codigo");
    codigo.textContent = estado.erros === 0 ? "0" : "1";
    codigo.className = "saida__codigo" + (estado.erros === 0 ? "" : " saida__codigo--erro");

    $("r-veredito").textContent = vereditoPara(pct);

    var lista = $("revisao-lista");
    lista.innerHTML = "";

    if (estado.errosDetalhe.length === 0) {
      var vazio = document.createElement("li");
      vazio.className = "revisao--limpa";
      vazio.textContent = "Nada. Você acertou as " + total + ".";
      lista.appendChild(vazio);
    } else {
      estado.errosDetalhe.forEach(function (e) {
        var li = document.createElement("li");
        li.className = "revisao__item";

        var perg = document.createElement("p");
        perg.className = "revisao__pergunta";
        perg.innerHTML = e.enunciado;

        var resp = document.createElement("p");
        resp.className = "revisao__resposta";
        resp.innerHTML = "certa: <b>" + e.certa + "</b>";

        li.appendChild(perg);
        li.appendChild(resp);
        lista.appendChild(li);
      });
    }

    trocarTela("tela-resultado");
  }

  function vereditoPara(pct) {
    if (pct === 100) return "Gabaritou. As 20 corretas.";
    if (pct >= 80)  return "Bom resultado. O conteúdo está consolidado.";
    if (pct >= 60)  return "Passou, mas vale revisar o que ficou para trás.";
    if (pct >= 40)  return "Metade do caminho. Releia as explicações acima.";
    return "Hora de voltar ao material da disciplina.";
  }

  /* ------------------------------------------------------------------ início */

  function iniciar() {
    var banco = window.PERGUNTAS || [];
    var quantas = Math.min(TOTAL_DA_RODADA, banco.length);

    estado = {
      perguntas: montarRodada(banco, quantas),
      indice: 0,
      acertos: 0,
      erros: 0,
      respondida: false,
      errosDetalhe: []
    };

    $("num-total").textContent = quantas;
    $("placar-acertos").textContent = "0";
    $("placar-erros").textContent = "0";
    montarRegua(quantas);

    trocarTela("tela-quiz");
    mostrarPergunta();
  }

  /* ------------------------------------------------------------- teclado ---- */

  document.addEventListener("keydown", function (ev) {
    if ($("tela-quiz").hidden) return;

    if (!estado.respondida && ev.key >= "1" && ev.key <= "4") {
      var i = Number(ev.key) - 1;
      var botoes = $("alternativas").querySelectorAll(".alternativa");
      if (botoes[i]) { ev.preventDefault(); responder(i); }
      return;
    }

    if (estado.respondida && (ev.key === "Enter" || ev.key === " ")) {
      if (document.activeElement === $("btn-proxima")) return; /* o botão já trata */
      ev.preventDefault();
      avancar();
    }
  });

  /* ------------------------------------------------------------------ liga -- */

  /* Expoe as duas funcoes puras para o teste automatizado rodar em Node.
     No navegador `module` nao existe, entao este bloco simplesmente nao roda. */
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { embaralhar: embaralhar, montarRodada: montarRodada };
    return;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var banco = window.PERGUNTAS || [];
    $("total-banco").textContent = banco.length;

    $("btn-iniciar").addEventListener("click", iniciar);
    $("btn-proxima").addEventListener("click", avancar);
    $("btn-refazer").addEventListener("click", iniciar);
  });
})();
