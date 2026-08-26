# Prompt de evolução da plataforma OLITEF Estudos

## Missão

Transforme e evolua o projeto atual numa **plataforma mobile-first de aprendizagem, preparação e revisão inteligente para a OLITEF**. O produto não deve ser apenas uma página de quiz nem um banco passivo de perguntas. Deve ajudar o aluno a compreender educação financeira, praticar, errar sem medo, entender o erro, corrigir a lacuna, repetir o conceito em novos contextos e acompanhar a sua evolução até à prova.

Analise o projeto existente, tome decisões técnicas fundamentadas, implemente as melhorias, execute os testes, corrija os problemas encontrados e só depois apresente o resultado. Não fique apenas a sugerir funcionalidades.

## Pesquisa e fontes oficiais

Antes de alterar significativamente o projeto, consulte prioritariamente as fontes oficiais da OLITEF:

- https://www.olitef.com.br/
- https://www.olitef.com.br/baixar-provas-anteriores

Analise os níveis, conteúdos, macrotemas, temas, subtemas, habilidades, estilo das questões, dificuldade, linguagem, provas anteriores, simulados, Caderno do Estudante, tipos de raciocínio e progressão dos assuntos. Use esses materiais como referência pedagógica e estrutural, respeitando direitos de autor, termos de utilização e limites de reprodução. Não copie indevidamente conteúdo protegido; crie questões originais inspiradas nos conceitos e nos formatos observados.

Quando houver conflito entre uma suposição e uma informação oficial, prefira a fonte oficial e registe a origem do conteúdo.

## Princípio pedagógico central

Implemente este ciclo de aprendizagem:

> Conteúdo → exemplo → questão → resposta → explicação → diagnóstico → revisão → nova questão → repetição espaçada → domínio.

Um acerto isolado não deve ser tratado como domínio. O sistema deve considerar taxa de acerto, número de tentativas, tempo de resposta, dificuldade, reincidência de erros, desempenho em questões novas, recência, assuntos fortes e assuntos frágeis.

Depois de cada resposta, mostre mais do que “certo” ou “errado”. Apresente o resultado, explique o raciocínio, mostre o passo a passo quando necessário, identifique a possível armadilha, destaque uma regra curta e proponha uma questão semelhante. O erro deve ser tratado como oportunidade de aprendizagem, com mensagens como “Boa tentativa. Agora vamos entender o raciocínio.”

Sempre que possível, explique também cada alternativa: por que está correta, qual conceito foi confundido e que erro normalmente conduz às opções incorretas. Não invente a causa psicológica ou conceitual de um erro; quando os dados não forem suficientes, explique apenas por que a resposta não satisfaz a condição da questão.

## Banco de questões

Crie uma arquitetura escalável para centenas, milhares ou dezenas de milhares de questões, sem sacrificar a qualidade. Cada questão deve possuir, no mínimo:

| Campo | Finalidade |
|---|---|
| Identificador e versão | Rastreabilidade e atualização segura |
| Nível e ano escolar | Adequação pedagógica |
| Macrotema, tema e subtema | Organização do conteúdo |
| Habilidade e tipo de raciocínio | Diagnóstico de aprendizagem |
| Dificuldade | Seleção adaptativa |
| Enunciado e alternativas | Experiência de resposta |
| Resposta correta | Correção verificável |
| Explicação, dica e exemplo | Aprendizagem após a resposta |
| Justificativa das alternativas | Transformação do erro em aprendizagem |
| Tags, tempo estimado e origem | Pesquisa, filtragem e análise |
| Estado de revisão | Rascunho, validada, aprovada ou desativada |

Uma questão só pode ser publicada quando tiver resposta verificável, uma única alternativa correta, alternativas plausíveis, explicação clara, conteúdo associado, dificuldade válida, ausência de ambiguidade e ausência de erro matemático ou financeiro.

Se houver IA disponível, utilize-a para gerar rascunhos, explicações, dicas, exemplos, variações e questões semelhantes, mas nunca confie cegamente no resultado. Valide respostas matemáticas programaticamente sempre que possível, detete alternativas duplicadas, respostas múltiplas, inconsistências e explicações contraditórias. Conteúdo gerado por IA deve iniciar como **RASCUNHO** e só ser publicado depois de revisão e validação.

Permita pesquisar, filtrar, ordenar, importar, exportar, editar, versionar, revisar e desativar questões. Evite repetir constantemente a mesma questão usando histórico, cooldown, seleção ponderada, rotação e dificuldade adaptativa. Quando uma questão aparecer novamente para revisão, indique claramente que se trata de uma revisão.

Crie variações de uma mesma habilidade para verificar se o aluno aprendeu o conceito e não apenas decorou uma resposta. O banco deve poder suportar múltipla escolha, cálculo, interpretação, situação-problema, verdadeiro/falso, associação, ordenação, resposta numérica e questões contextualizadas, mantendo como prioridade o estilo observado na OLITEF.

## Modos de estudo

Implemente, progressivamente, os seguintes modos:

1. **Aprender:** microexplicação e exemplo antes da questão.
2. **Praticar:** questões focadas num tema.
3. **Revisar:** conteúdos que estão esquecidos ou próximos da data de revisão.
4. **Meus erros:** apenas questões relacionadas com erros anteriores.
5. **Quiz Inteligente:** seleção automática baseada no desempenho real.
6. **Simulado OLITEF:** prova estruturada conforme as regras oficiais vigentes.
7. **Desafio:** questões mais difíceis para alunos preparados.
8. **Revisão rápida:** sessões de 5, 10 ou 15 minutos.

No modo “Meus erros”, mostre a pergunta, resposta escolhida, resposta correta, explicação, tema, data, número de tentativas e evolução. O botão “Rever os meus erros” deve montar automaticamente uma sessão focada nas lacunas do aluno.

Inclua também “Não entendi”, com explicação curta, explicação detalhada, exemplo prático, exemplo do quotidiano, questão resolvida e nova tentativa. A explicação deve adaptar linguagem e complexidade ao nível escolar.

## Aprendizagem adaptativa e revisão espaçada

Crie um índice de domínio por tema que não seja apenas “acertos divididos por questões”. Considere dificuldade, quantidade de evidências, recência, reincidência de erros, desempenho em questões novas e estabilidade ao longo do tempo.

Implemente repetição espaçada com intervalos ajustáveis. Um ponto de partida pode ser 1, 3, 7, 14 e 30 dias, mas os intervalos devem diminuir quando o aluno erra e aumentar quando acerta consistentemente.

Crie a função central `getNextStudyRecommendation()`. Ela deve considerar nível, domínio, erros, revisões pendentes, dificuldade, histórico e tempo disponível, retornando assunto, prioridade, tipo de atividade, quantidade recomendada e motivo. Exemplo: “Revisar juros compostos; prioridade alta porque o desempenho está em 54% e ocorreram três erros recentes.”

## Níveis e conteúdos

Estruture o conteúdo como:

> Nível → macrotema → tema → subtema → habilidade → questões.

Suporte os níveis oficiais encontrados nos materiais, incluindo **Nível 1 — 6.º e 7.º anos**, **Nível 2 — 8.º e 9.º anos** e **Nível 3 — Ensino Médio**, confirmando os detalhes da edição vigente antes de fixar regras. O aluno deve selecionar o nível ou recebê-lo do cadastro. Não misture questões inadequadas ao nível sem justificativa pedagógica.

## Dashboard do aluno

Crie um dashboard mobile-first que mostre progresso, domínio por tema, sequência de estudos, questões respondidas, taxa de acerto, assuntos fortes, assuntos frágeis, revisões pendentes, erros recentes e recomendação de estudo baseada em dados reais.

Inclua “Meu plano de estudo”, com uma rotina automática e flexível, por exemplo: hoje, 15 minutos, cinco questões de um tema, três de outro e duas revisões; amanhã, uma revisão do assunto frágil; em três dias, uma nova avaliação. Permita alterar a meta sem criar pressão excessiva.

Ao finalizar uma sessão, mostre quantidade de questões, acertos, evolução em relação a sessões anteriores, principal ponto fraco, data sugerida para revisão e próxima recomendação. Nunca invente estatísticas.

## Simulado e avaliação

Crie um modo prova sem feedback imediato. Durante o simulado, permita cronómetro, progresso, navegação, marcação e revisão, sem revelar respostas. Depois, mostre análise geral, desempenho por macrotema, desempenho por dificuldade, tempo médio, questões erradas, assuntos frágeis, recomendações e plano de revisão. A estrutura do Simulado OLITEF deve ser baseada nas regras oficiais vigentes, nunca inventada.

## Mobile, acessibilidade e experiência

Desenvolva primeiro para telemóvel, e não como um desktop reduzido. Teste pelo menos 360 px, 390 px, 412 px e 430 px, além de ecrãs maiores. Priorize uso com uma mão, toque, carregamento rápido, conexão lenta, leitura confortável, botões grandes, navegação simples, orientação vertical e estados de carregamento claros.

Verifique contraste, tamanho de fonte, áreas de toque, foco, teclado, semântica HTML, `aria-label`, leitores de ecrã, mensagens de erro, textos alternativos e redução de animações. Não dependa apenas de cor para indicar certo ou errado.

Ao abrir a aplicação, o aluno deve saber imediatamente o que estudar. Mostre ações como “Continuar a estudar”, “Quiz rápido”, “Rever erros” e “Meu progresso”, além de uma recomendação personalizada. Use XP, níveis, sequências, medalhas e desafios apenas para reforçar consistência, melhoria, domínio e recuperação de erros; não premie simplesmente velocidade ou quantidade.

## Tutor e vídeos

Se existir IA disponível, crie um tutor contextual que possa responder a pedidos como “Não entendi juros compostos”, “Explique de forma mais simples”, “Dê-me um exemplo”, “Crie uma questão parecida” e “Por que a minha resposta está errada?”. O tutor deve incentivar o raciocínio do aluno, não entregar automaticamente todas as respostas. As chaves de API devem permanecer no backend ou em mecanismo seguro.

Associe vídeos educativos do YouTube apenas por links públicos incorporados, depois de verificar a adequação etária, a disponibilidade e a origem. O vídeo deve complementar a microexplicação, nunca substituir a questão nem a explicação escrita.

## Performance, PWA e privacidade

Priorize lazy loading, cache, componentes leves, carregamento progressivo, imagens otimizadas e funcionamento razoável em internet lenta. Se for compatível com a arquitetura, implemente PWA para instalação no ecrã inicial e cache de conteúdos já carregados. O modo offline não deve causar perda, duplicação ou conflito de respostas; sincronize com segurança quando a conexão voltar.

Como o público inclui menores de idade, minimize a recolha de dados, não recolha informações desnecessárias, trate dados educacionais apenas para finalidades essenciais e considere a LGPD e o melhor interesse de crianças e adolescentes. Nunca exponha chaves, tokens, credenciais ou dados sensíveis.

## Administração e qualidade

A área do professor ou administrador deve permitir criar, editar, importar, categorizar, revisar, aprovar, desativar e analisar questões, conteúdos e materiais autorizados. Mostre indicadores de questões com taxa de erro muito alta, possível ambiguidade, dificuldade inadequada ou baixa utilização.

Registe eventos úteis, respeitando a privacidade: questão iniciada, resposta, acerto, erro, tempo, revisão, abandono e conclusão. Use esses dados para melhorar recomendações e identificar conteúdos problemáticos.

## Método de execução

Antes de implementar, faça uma auditoria completa do projeto atual: framework, banco de dados, autenticação, componentes, rotas, estado, APIs, armazenamento, deploy, interface, comportamento mobile, acessibilidade e funcionalidades já existentes. Liste o que funciona, o que está incompleto, o que precisa de refatoração e o que deve ser preservado. Não reescreva tudo sem necessidade e não remova funcionalidades existentes sem justificativa.

Depois, crie um plano técnico, implemente as melhorias por etapas e valide cada etapa. Tome decisões autónomas; só interrompa quando faltar informação indispensável. Em caso de conflito entre requisitos, use esta prioridade: aprendizagem real, correção do conteúdo, experiência mobile, acessibilidade, performance, segurança, escalabilidade, UX e estética.

## Testes e entrega

Execute testes de autenticação, cadastro, quiz, resposta, correção, explicação, pontuação, progresso, histórico, revisão, simulado, responsividade, acessibilidade e fluxos de professor. Teste também em dispositivos móveis e corrija todos os erros encontrados.

No final, entregue um relatório objetivo com quatro secções: **Implementado**, **Melhorias**, **Problemas encontrados e corrigidos** e **Pendências reais**. Não declare uma funcionalidade como concluída se ela não tiver sido implementada e testada.

O resultado esperado é este:

> Um aluno entra pelo telemóvel, informa o seu nível, começa a estudar e o sistema descobre o que ele precisa aprender, apresenta conteúdo, faz perguntas, explica os erros, cria novas questões, agenda revisões e acompanha a sua evolução até à prova.

Não construa apenas um banco de questões. Construa um **sistema de aprendizagem real para a OLITEF**: analise, decida, implemente, teste, corrija, otimize e só então finalize.
