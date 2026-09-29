/* ==========================================================================
   Banco de perguntas do Quiz de Linux
   TI23 - Sistemas Operacionais Linux - prof. Cristiano Forte

   As categorias sao as sugeridas no enunciado. As perguntas saem do conteudo
   das aulas 2 a 8, e varias delas foram MEDIDAS na VM Debian 13 da disciplina,
   nao copiadas de livro. Onde a resposta depende da versao ou da distribuicao,
   a explicacao diz isso.

   Formato de cada pergunta:
     categoria   texto curto, vira etiqueta na tela
     enunciado   a pergunta
     alternativas  array de 4 strings
     correta     indice (0 a 3) da alternativa certa
     explicacao  o porque, em uma ou duas frases
   ========================================================================== */

const PERGUNTAS = [

  /* ---------------------------------------------------- navegacao e arquivos */
  {
    categoria: "Navegação e arquivos",
    enunciado: "Qual comando mostra o caminho completo do diretório em que você está?",
    alternativas: ["pwd", "cd", "ls -l", "whereami"],
    correta: 0,
    explicacao: "pwd significa print working directory. Ele imprime o caminho absoluto, começando na raiz."
  },
  {
    categoria: "Navegação e arquivos",
    enunciado: "O que <code>cd -</code> faz?",
    alternativas: [
      "Volta para o diretório anterior",
      "Sobe um nível na árvore",
      "Vai para a raiz do sistema",
      "Vai para o diretório do usuário"
    ],
    correta: 0,
    explicacao: "O hífen alterna entre o diretório atual e o anterior. Subir um nível é cd .. e ir para o home é cd sozinho."
  },
  {
    categoria: "Navegação e arquivos",
    enunciado: "Qual comando cria a estrutura <code>/tmp/a/b/c</code> de uma vez, mesmo sem <code>a</code> e <code>b</code> existirem?",
    alternativas: [
      "mkdir -p /tmp/a/b/c",
      "mkdir /tmp/a/b/c",
      "mkdir -r /tmp/a/b/c",
      "touch -p /tmp/a/b/c"
    ],
    correta: 0,
    explicacao: "O -p cria os diretórios pais que faltarem. Sem ele, mkdir falha com No such file or directory."
  },
  {
    categoria: "Navegação e arquivos",
    enunciado: "Qual a diferença entre <code>rmdir</code> e <code>rm -r</code>?",
    alternativas: [
      "rmdir só apaga diretório vazio; rm -r apaga com conteúdo",
      "São sinônimos",
      "rmdir apaga arquivos; rm -r apaga diretórios",
      "rmdir pede confirmação; rm -r não"
    ],
    correta: 0,
    explicacao: "rmdir recusa diretório que não esteja vazio, o que é uma proteção. rm -r desce na árvore e apaga tudo."
  },
  {
    categoria: "Navegação e arquivos",
    enunciado: "O comando <code>touch relatorio.txt</code> num arquivo que JÁ existe faz o quê?",
    alternativas: [
      "Atualiza a data de modificação, sem tocar no conteúdo",
      "Esvazia o arquivo",
      "Falha, porque o arquivo já existe",
      "Cria uma cópia numerada"
    ],
    correta: 0,
    explicacao: "A função original do touch é mexer nos carimbos de tempo. Criar arquivo vazio é só o efeito colateral quando ele não existe."
  },
  {
    categoria: "Navegação e arquivos",
    enunciado: "Para copiar um diretório inteiro com o que tem dentro, o comando é:",
    alternativas: ["cp -r origem destino", "cp origem destino", "cp -a origem", "mv -r origem destino"],
    correta: 0,
    explicacao: "Sem o -r o cp recusa diretórios. O -a (archive) também serve e ainda preserva permissões e datas."
  },

  /* ------------------------------------- visualizacao e manipulacao de arquivos */
  {
    categoria: "Visualização de arquivos",
    enunciado: "Qual comando mostra as 5 ÚLTIMAS linhas de um arquivo?",
    alternativas: ["tail -n 5 arquivo", "head -n 5 arquivo", "cat -5 arquivo", "less -5 arquivo"],
    correta: 0,
    explicacao: "tail mostra o fim e head mostra o começo. O tail -f ainda acompanha o arquivo crescendo, que é como se lê log."
  },
  {
    categoria: "Visualização de arquivos",
    enunciado: "O que <code>grep -c erro /var/log/syslog</code> devolve?",
    alternativas: [
      "A quantidade de linhas que contêm \"erro\"",
      "As linhas com \"erro\", coloridas",
      "A quantidade de vezes que \"erro\" aparece, contando repetições na mesma linha",
      "As 3 primeiras linhas com \"erro\""
    ],
    correta: 0,
    explicacao: "O -c conta LINHAS que casaram, não ocorrências. Uma linha com a palavra três vezes conta como 1."
  },
  {
    categoria: "Visualização de arquivos",
    enunciado: "Por que <code>ip link | grep lo</code> não é um bom jeito de filtrar o loopback?",
    alternativas: [
      "O grep casa qualquer trecho com as letras l+o, então pega também a linha link/loopback",
      "O grep não funciona com a saída do ip",
      "Porque lo não é um nome válido de interface",
      "Porque o ip precisa da opção -g para aceitar filtro"
    ],
    correta: 0,
    explicacao: "Medido na VM: o comando devolve duas linhas, e a segunda veio por acidente. O correto é ip link show lo ou grep -w lo."
  },
  {
    categoria: "Visualização de arquivos",
    enunciado: "Qual comando conta quantas LINHAS tem um arquivo?",
    alternativas: ["wc -l arquivo", "wc -w arquivo", "wc -c arquivo", "count -l arquivo"],
    correta: 0,
    explicacao: "No wc, -l é linhas, -w palavras e -c bytes. Sem opção nenhuma ele mostra os três."
  },
  {
    categoria: "Visualização de arquivos",
    enunciado: "A diferença prática entre <code>more</code> e <code>less</code> é:",
    alternativas: [
      "O less navega para frente e para trás; o more, historicamente, só para frente",
      "O less só abre arquivo binário",
      "O more é mais novo que o less",
      "Não há diferença, são o mesmo programa"
    ],
    correta: 0,
    explicacao: "Daí a piada do nome: less is more. O less também não carrega o arquivo inteiro antes de mostrar, o que importa em arquivo grande."
  },

  /* ----------------------------------------------------------------- permissoes */
  {
    categoria: "Permissões",
    enunciado: "O que significa a permissão <code>755</code> num diretório?",
    alternativas: [
      "Dono lê, escreve e entra; grupo e outros leem e entram",
      "Dono lê e escreve; ninguém mais acessa",
      "Todos leem, escrevem e executam",
      "Dono lê; grupo escreve; outros executam"
    ],
    correta: 0,
    explicacao: "7 = rwx, 5 = r-x. Em diretório o x não é executar: é poder entrar nele e atravessá-lo."
  },
  {
    categoria: "Permissões",
    enunciado: "Um arquivo com permissão <code>444</code> dentro de um diretório <code>777</code>. Um usuário comum consegue APAGAR esse arquivo?",
    alternativas: [
      "Sim, porque apagar depende do w do diretório, não do arquivo",
      "Não, porque o arquivo é somente leitura",
      "Só com sudo",
      "Só se for o dono do arquivo"
    ],
    correta: 0,
    explicacao: "Medido na VM nos dois sentidos. Apagar é alterar a LISTA do diretório, então quem manda é o w do diretório. É a divergência do slide 6 da aula 6."
  },
  {
    categoria: "Permissões",
    enunciado: "Com <code>umask 027</code>, qual a permissão de um arquivo recém-criado?",
    alternativas: ["640", "639", "750", "644"],
    correta: 0,
    explicacao: "A umask não subtrai, ela apaga bits: 666 e o complemento de 027. O 639 do slide nem existe em octal, porque 9 não é dígito octal."
  },
  {
    categoria: "Permissões",
    enunciado: "Para que serve o bit SUID num executável?",
    alternativas: [
      "O programa roda com os privilégios do DONO do arquivo, não de quem executou",
      "O programa só pode ser executado pelo dono",
      "O arquivo não pode ser apagado",
      "O programa roda em segundo plano"
    ],
    correta: 0,
    explicacao: "É como o passwd deixa um usuário comum alterar o /etc/shadow, que é do root. Aparece como s no lugar do x do dono."
  },
  {
    categoria: "Permissões",
    enunciado: "O que o sticky bit faz num diretório como o <code>/tmp</code>?",
    alternativas: [
      "Cada um só apaga os próprios arquivos, mesmo o diretório sendo de escrita para todos",
      "Impede qualquer um de apagar arquivos",
      "Faz os arquivos ficarem em memória",
      "Obriga novos arquivos a herdarem o grupo do diretório"
    ],
    correta: 0,
    explicacao: "Sem ele, num diretório 777 qualquer um apagaria o arquivo do outro. Herdar o grupo é o SGID, não o sticky."
  },
  {
    categoria: "Permissões",
    enunciado: "Qual comando troca DONO e GRUPO de um arquivo de uma vez só?",
    alternativas: [
      "chown lucas:alunos arquivo",
      "chmod lucas:alunos arquivo",
      "chgrp lucas:alunos arquivo",
      "chown -g lucas alunos arquivo"
    ],
    correta: 0,
    explicacao: "A sintaxe é dono:grupo. O chgrp só mexe no grupo, e o chmod não mexe em dono nenhum, só em permissão."
  },

  /* ---------------------------------------------------------- usuarios e grupos */
  {
    categoria: "Usuários e grupos",
    enunciado: "Qual a diferença entre <code>whoami</code> e <code>id</code>?",
    alternativas: [
      "whoami mostra só o nome; id mostra UID, GID e todos os grupos",
      "São sinônimos",
      "whoami só funciona como root",
      "id mostra o nome e whoami o número"
    ],
    correta: 0,
    explicacao: "O id é o comando de diagnóstico de verdade: mostra a identidade completa, inclusive os grupos secundários."
  },
  {
    categoria: "Usuários e grupos",
    enunciado: "Onde ficam guardadas as SENHAS dos usuários no Linux moderno?",
    alternativas: [
      "/etc/shadow",
      "/etc/passwd",
      "/etc/group",
      "/etc/login.defs"
    ],
    correta: 0,
    explicacao: "O /etc/passwd é legível por todos e só tem o x no lugar da senha. O hash fica no /etc/shadow, que nesta VM é root:shadow 640."
  },
  {
    categoria: "Usuários e grupos",
    enunciado: "Qual a diferença entre <code>useradd</code> e <code>adduser</code> no Debian?",
    alternativas: [
      "useradd é o comando de baixo nível; adduser é um script interativo que cria home, define shell e pede senha",
      "São o mesmo comando, com nomes diferentes",
      "useradd é do Debian e adduser do Red Hat",
      "adduser só cria usuário de sistema"
    ],
    correta: 0,
    explicacao: "Medido na aula 5: os criados com adduser entraram também no grupo users, e os do useradd não. Não são intercambiáveis."
  },
  {
    categoria: "Usuários e grupos",
    enunciado: "O comando <code>groupadd suporte</code> cria o quê?",
    alternativas: [
      "Um grupo chamado suporte, sem nenhum membro",
      "Um grupo e um usuário de mesmo nome",
      "Um usuário chamado suporte",
      "Um grupo, já com o usuário atual dentro"
    ],
    correta: 0,
    explicacao: "Criar o grupo e pôr gente dentro são passos separados. Para acrescentar alguém: usermod -aG suporte lucas, e o -a é obrigatório, senão você substitui os grupos dele."
  },
  {
    categoria: "Usuários e grupos",
    enunciado: "Uma conta criada com <code>useradd -m aluno</code>, sem senha definida, aparece no <code>passwd -S</code> como:",
    alternativas: [
      "L, de locked",
      "P, de password",
      "NP, de no password",
      "A, de active"
    ],
    correta: 0,
    explicacao: "Medido na aula 8. A conta fica bloqueada, e só entra por chave SSH porque o Debian traz UsePAM yes. Num sshd_config mínimo, o login falharia."
  },

  /* ------------------------------------------------------------ redirecionamento */
  {
    categoria: "Redirecionamento",
    enunciado: "Qual a diferença entre <code>></code> e <code>>></code>?",
    alternativas: [
      "> sobrescreve o arquivo; >> acrescenta no fim",
      "> acrescenta; >> sobrescreve",
      "> é para texto e >> para binário",
      "Não há diferença"
    ],
    correta: 0,
    explicacao: "O > apaga o conteúdo antes de escrever, sem avisar. É o erro que custa trabalho salvo."
  },
  {
    categoria: "Redirecionamento",
    enunciado: "O que <code>comando 2> erros.txt</code> faz?",
    alternativas: [
      "Manda só a saída de ERRO para o arquivo; a saída normal continua na tela",
      "Manda toda a saída para o arquivo",
      "Executa o comando duas vezes",
      "Manda a saída normal para o arquivo e o erro para a tela"
    ],
    correta: 0,
    explicacao: "O 2 é o descritor do stderr. O 1 é o stdout e o 0 é o stdin. Por isso 2> separa erro de resultado."
  },
  {
    categoria: "Redirecionamento",
    enunciado: "O que <code>2>&1</code> significa?",
    alternativas: [
      "Mande a saída de erro para o mesmo lugar da saída padrão",
      "Mande a saída padrão para o erro",
      "Execute e repita o último comando",
      "Redirecione para o arquivo chamado 1"
    ],
    correta: 0,
    explicacao: "O & antes do 1 é o que diz \"o canal 1\", e não \"o arquivo chamado 1\". É o que faz erro e resultado caírem juntos no mesmo arquivo."
  },
  {
    categoria: "Redirecionamento",
    enunciado: "O pipe <code>|</code> liga o quê a quê?",
    alternativas: [
      "A saída padrão do comando da esquerda na entrada padrão do da direita",
      "A saída de erro da esquerda na entrada da direita",
      "Dois arquivos",
      "Dois terminais diferentes"
    ],
    correta: 0,
    explicacao: "É a filosofia Unix: programas pequenos encadeados. Repare que o pipe NÃO leva o stderr junto, só o stdout."
  },
  {
    categoria: "Redirecionamento",
    enunciado: "Para ver na tela E salvar em arquivo ao mesmo tempo, usa-se:",
    alternativas: [
      "comando | tee arquivo.txt",
      "comando > arquivo.txt",
      "comando >> arquivo.txt",
      "comando 2>&1 arquivo.txt"
    ],
    correta: 0,
    explicacao: "O nome vem do T de encanamento: a saída se divide em dois caminhos. Com tee -a ele acrescenta em vez de sobrescrever."
  },

  /* ------------------------------------------------------------------- processos */
  {
    categoria: "Processos",
    enunciado: "Qual comando mostra os processos de TODOS os usuários, com detalhes?",
    alternativas: ["ps aux", "ps", "ps -l", "jobs"],
    correta: 0,
    explicacao: "O ps sozinho mostra só os processos do seu terminal. O jobs mostra apenas as tarefas do shell atual."
  },
  {
    categoria: "Processos",
    enunciado: "Qual a diferença entre <code>kill</code> e <code>kill -9</code>?",
    alternativas: [
      "kill pede para o processo terminar (SIGTERM); kill -9 o mata sem ele poder tratar (SIGKILL)",
      "kill -9 é mais lento",
      "kill mata o processo; kill -9 mata o terminal",
      "São a mesma coisa"
    ],
    correta: 0,
    explicacao: "O SIGTERM deixa o programa salvar e fechar direito. O SIGKILL é o último recurso, porque não dá essa chance."
  },
  {
    categoria: "Processos",
    enunciado: "Você rodou um comando e ele travou o terminal. Ctrl+Z e depois <code>bg</code> fazem o quê?",
    alternativas: [
      "Suspendem o processo e o retomam em segundo plano, liberando o terminal",
      "Encerram o processo",
      "Reiniciam o comando do zero",
      "Mandam a saída para um arquivo"
    ],
    correta: 0,
    explicacao: "O Ctrl+Z suspende, o bg retoma em segundo plano e o fg traz de volta para a frente. O jobs lista o que está nesse estado."
  },
  {
    categoria: "Processos",
    enunciado: "O <code>top</code> e o <code>htop</code> se diferenciam principalmente por:",
    alternativas: [
      "O htop tem interface colorida, rolagem e permite matar processo pelo teclado; não vem instalado por padrão",
      "O top é mais novo",
      "O htop só roda como root",
      "O top não mostra uso de memória"
    ],
    correta: 0,
    explicacao: "O top está em qualquer Unix; o htop é um extra que se instala. Numa máquina alheia, conte com o top."
  },

  /* ------------------------------------------------------------------------ rede */
  {
    categoria: "Rede",
    enunciado: "No Debian moderno, qual comando mostra os endereços IP das interfaces?",
    alternativas: [
      "ip address show",
      "ipconfig",
      "netstat -i",
      "ifconfig, que é o único disponível"
    ],
    correta: 0,
    explicacao: "O ip é do iproute2, o padrão atual. O ifconfig é do net-tools, que NÃO vem instalado no Debian 13 por padrão."
  },
  {
    categoria: "Rede",
    enunciado: "Por que o Debian 13 chama a placa de <code>enp0s3</code> e não de <code>eth0</code>?",
    alternativas: [
      "São nomes previsíveis, derivados da posição da placa no barramento PCI",
      "Porque eth0 é reservado para rede sem fio",
      "Porque o nome é sorteado no boot",
      "Porque eth0 só existe em Red Hat"
    ],
    correta: 0,
    explicacao: "en = ethernet, p0 = barramento PCI 0, s3 = slot 3. A vantagem é o nome não mudar quando você acrescenta outra placa."
  },
  {
    categoria: "Rede",
    enunciado: "Você derruba uma interface com <code>ip link set dev X down</code>. O endereço IP dela some?",
    alternativas: [
      "Depende: se o IP foi posto na mão, fica; se veio de DHCP, o cliente devolve a concessão e ele some",
      "Sempre some",
      "Nunca some",
      "Some, e a interface tem de ser recriada"
    ],
    correta: 0,
    explicacao: "Medido nos dois casos. Na dummy10, com IP manual, o endereço ficou. Na enp0s3, o dhcpcd devolveu a concessão e levou junto a rota padrão."
  },
  {
    categoria: "Rede",
    enunciado: "Qual comando mostra as portas em que a máquina está ESCUTANDO?",
    alternativas: ["ss -ltn", "ping -l", "ip route show", "curl -l"],
    correta: 0,
    explicacao: "No ss, -l é listening, -t é TCP e -n evita resolver nomes. Ele substituiu o netstat, que era do net-tools."
  },
  {
    categoria: "Rede",
    enunciado: "Qual a diferença entre <code>curl</code> e <code>wget</code>, na prática?",
    alternativas: [
      "curl imprime na saída padrão por padrão; wget salva em arquivo por padrão",
      "curl só funciona com HTTPS",
      "wget não segue redirecionamento nunca",
      "São o mesmo programa"
    ],
    correta: 0,
    explicacao: "Por isso curl entra em pipe com naturalidade, e wget é a escolha para baixar arquivo ou espelhar site."
  },

  /* ---------------------------------------------------- diagnostico e captura */
  {
    categoria: "Diagnóstico e captura",
    enunciado: "O que a opção <code>-nn</code> do tcpdump faz?",
    alternativas: [
      "Não resolve nomes de host nem de porta, mostrando números",
      "Captura só dois pacotes",
      "Não grava em arquivo",
      "Mostra o conteúdo em hexadecimal"
    ],
    correta: 0,
    explicacao: "Sem ele, o tcpdump faz consultas DNS que aparecem dentro da própria captura e atrapalham a leitura."
  },
  {
    categoria: "Diagnóstico e captura",
    enunciado: "Você rodou <code>tcpdump -i enp0s3 arp</code> com um ping em paralelo e não capturou nada. Por quê?",
    alternativas: [
      "O vizinho já estava no cache ARP, então não houve pergunta a capturar",
      "O tcpdump não captura ARP",
      "Faltou rodar como root",
      "A interface estava desligada"
    ],
    correta: 0,
    explicacao: "ARP só acontece quando falta descobrir um MAC. A correção é apagar o vizinho COM a captura já ligada: ip neigh del."
  },
  {
    categoria: "Diagnóstico e captura",
    enunciado: "Capturando com <code>tcpdump -A</code>, o que se vê numa sessão HTTP e numa sessão SSH?",
    alternativas: [
      "No HTTP dá para ler a requisição e o conteúdo; no SSH só a versão e a negociação, o resto é cifrado",
      "Nos dois dá para ler tudo",
      "Nos dois o conteúdo é ilegível",
      "No HTTP é ilegível e no SSH legível"
    ],
    correta: 0,
    explicacao: "Medido na atividade cliente/servidor. É a demonstração prática de por que não se usa protocolo em texto claro."
  },
  {
    categoria: "Diagnóstico e captura",
    enunciado: "O que <code>ip route get 8.8.8.8</code> responde?",
    alternativas: [
      "Por qual interface e gateway um pacote para aquele destino sairia",
      "Se o endereço responde ping",
      "O nome DNS do endereço",
      "A rota mais curta em número de saltos"
    ],
    correta: 0,
    explicacao: "É o comando que evita um diagnóstico errado: ele diz o caminho que o kernel escolheria, antes de você culpar a rede."
  },
  {
    categoria: "Diagnóstico e captura",
    enunciado: "Qual comando consulta um registro DNS com detalhe, mostrando a resposta do servidor?",
    alternativas: ["dig", "ping", "ss", "hostname"],
    correta: 0,
    explicacao: "O dig mostra a pergunta, a resposta e qual servidor respondeu. O nslookup faz o básico e é mais antigo."
  },

  /* ---------------------------------------------------------------------- SSH */
  {
    categoria: "SSH",
    enunciado: "Qual arquivo configura o SERVIDOR SSH?",
    alternativas: [
      "/etc/ssh/sshd_config",
      "/etc/ssh/ssh_config",
      "~/.ssh/config",
      "/etc/ssh/authorized_keys"
    ],
    correta: 0,
    explicacao: "O d de sshd é de daemon. Confundir com ssh_config, que é do cliente, é o erro mais comum: você edita, reinicia e nada muda."
  },
  {
    categoria: "SSH",
    enunciado: "No Debian 13, qual é o valor padrão de <code>PermitRootLogin</code>?",
    alternativas: [
      "prohibit-password: o root entra por chave, nunca por senha",
      "yes",
      "no",
      "forced-commands-only"
    ],
    correta: 0,
    explicacao: "Medido na VM. A linha vem COMENTADA no arquivo, e linha comentada só documenta o padrão. Para ver o valor real: sshd -T."
  },
  {
    categoria: "SSH",
    enunciado: "Qual comando mostra a configuração EFETIVA do sshd, já resolvendo padrões e arquivos incluídos?",
    alternativas: ["sshd -T", "sshd -t", "cat /etc/ssh/sshd_config", "systemctl status ssh"],
    correta: 0,
    explicacao: "O -T imprime o que está valendo; o -t (minúsculo) só valida a sintaxe. Fazer grep no arquivo engana, porque ignora comentário e Include."
  },
  {
    categoria: "SSH",
    enunciado: "Antes de reiniciar o sshd depois de editar a configuração, o passo que evita perder o acesso é:",
    alternativas: [
      "Rodar sshd -t para validar a sintaxe",
      "Rodar systemctl status ssh",
      "Fazer backup do arquivo",
      "Trocar a porta para 2222"
    ],
    correta: 0,
    explicacao: "Se o arquivo tiver erro, o serviço não sobe, e numa máquina remota você fica trancado do lado de fora. O -t valida sem aplicar."
  },
  {
    categoria: "SSH",
    enunciado: "O que a chave privada <code>~/.ssh/id_ed25519</code> com permissão 644 provoca?",
    alternativas: [
      "O ssh ignora a chave e avisa UNPROTECTED PRIVATE KEY FILE",
      "Nada, 644 é o recomendado",
      "A chave é apagada por segurança",
      "O servidor recusa a conexão antes de ler a chave"
    ],
    correta: 0,
    explicacao: "Medido. O ssh se recusa a usar chave que outros possam ler. O correto é 600 na chave e 700 no diretório .ssh."
  },
  {
    categoria: "SSH",
    enunciado: "Para que serve a diretiva <code>Banner /etc/issue.net</code>?",
    alternativas: [
      "Mostra um texto ANTES da autenticação, inclusive para quem vai ser recusado",
      "Mostra um texto depois do login bem-sucedido",
      "Define a mensagem de erro de senha errada",
      "Registra os acessos em /etc/issue.net"
    ],
    correta: 0,
    explicacao: "Por aparecer antes de autenticar, é aviso e não proteção. Não se põe ali versão do sistema, que é informação de graça para quem tenta entrar."
  },

  /* --------------------------------------------------------- conceitos gerais */
  {
    categoria: "Conceitos",
    enunciado: "No prompt do shell, qual a diferença entre terminar com <code>$</code> e com <code>#</code>?",
    alternativas: [
      "$ é usuário comum; # é root",
      "$ é bash e # é sh",
      "$ é local e # é remoto",
      "# indica que o comando falhou"
    ],
    correta: 0,
    explicacao: "É a primeira coisa a olhar antes de apertar Enter. O # avisa que o comando vale para o sistema inteiro."
  },
  {
    categoria: "Conceitos",
    enunciado: "O que significa um comando terminar com código de saída <code>0</code>?",
    alternativas: [
      "Deu certo",
      "Deu erro",
      "Foi interrompido",
      "Não produziu saída"
    ],
    correta: 0,
    explicacao: "Zero é sucesso e qualquer outro valor é falha, cada um com seu significado. Vê-se com echo $? logo depois do comando."
  },
  {
    categoria: "Conceitos",
    enunciado: "Para que serve o diretório <code>/etc</code>?",
    alternativas: [
      "Guarda os arquivos de configuração do sistema",
      "Guarda os programas executáveis",
      "Guarda os arquivos temporários",
      "Guarda os diretórios dos usuários"
    ],
    correta: 0,
    explicacao: "Pelo FHS: /etc é configuração, /bin e /usr/bin são programas, /tmp é temporário e /home é dos usuários."
  },
  {
    categoria: "Conceitos",
    enunciado: "O que o <code>/proc</code> e o <code>/sys</code> têm em comum?",
    alternativas: [
      "São sistemas de arquivos virtuais: o conteúdo é gerado pelo kernel na hora da leitura",
      "São as cópias de segurança do sistema",
      "Guardam os logs",
      "São montados a partir da rede"
    ],
    correta: 0,
    explicacao: "Por isso cat /sys/class/net/enp0s3/speed é chamado de \"direto do kernel\": não há arquivo no disco, a resposta é montada na hora."
  },
  {
    categoria: "Conceitos",
    enunciado: "Por que o Linux diferencia <code>Cat</code> de <code>cat</code>?",
    alternativas: [
      "Porque o sistema de arquivos e os comandos diferenciam maiúsculas de minúsculas",
      "Porque Cat é um atalho para cat",
      "Porque Cat só funciona como root",
      "Não diferencia: os dois funcionam"
    ],
    correta: 0,
    explicacao: "Cat devolve command not found. É a diferença que mais pega quem vem do Windows, onde o nome de arquivo não distingue caixa."
  }
];

/* Deixa o banco disponivel para o quiz.js. Sem modulos ES para o arquivo
   abrir direto do disco (file://) sem servidor, se precisar. */
window.PERGUNTAS = PERGUNTAS;
