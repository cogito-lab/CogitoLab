# Validação da evolução do Cogito Lab

## Resultado da execução

| Verificação                    | Resultado                                                           |
| ------------------------------ | ------------------------------------------------------------------- |
| `npm run check`                | 0 erros, 0 avisos e 0 sugestões.                                    |
| `npm test`                     | 25 testes aprovados.                                                |
| `npm run build`                | 104 páginas geradas e relacionamentos validados.                    |
| `npm run test:browser`         | 17 testes na raiz e 13 testes funcionais com `/CogitoLab`.          |
| Acessibilidade automatizada    | 104 páginas × 2 temas na raiz, sem violações nas regras executadas. |
| `npm audit --audit-level=high` | 0 vulnerabilidades reportadas.                                      |

Execução com Node.js 24.22.0 e Chromium. Também foram inspecionadas visualmente a página Sobre em português a 320 pixels e a página inicial no tema escuro. As correções compatíveis de dependências transitivas foram registradas no lockfile; a versão do Astro permaneceu 7.3.2.

## Inventário revisado

| Conteúdo                                           | Quantidade |
| -------------------------------------------------- | ---------: |
| Pessoas                                            |         25 |
| Iniciativas                                        |         16 |
| Pesquisa / extensão / tecnologia                   |  3 / 6 / 7 |
| Em execução / abertas legadas / planejamento       | 10 / 5 / 1 |
| Programas / projetos vinculados ao Cogito Transfer |      1 / 4 |
| Publicações não marcadas como rascunho             |         48 |
| Notícias publicadas                                |          6 |
| Páginas geradas, incluindo erros 404               |        104 |

Foram acrescentados 14 integrantes, preservando os 11 cadastros anteriores e mantendo Wellington Carlos e Wellington Dias como pessoas distintas. Instituições e temas não informados não são exibidos; interesses não criam participação em projetos. Os identificadores e as rotas existentes foram preservados. AgroHub permanece ativo; os cinco registros legados `open` não foram convertidos em execução. VUEI e Vertentes ScaleUp continuam independentes do Cogito Transfer. A revisão corrigiu um erro de digitação na situação institucional do P2, sem alterar seu significado.

AgroSafety e Madeireira Corrêa Barros estão cadastradas como proponentes de ComercializAgro e Automação e Digitalização de Processos para PMEs, respectivamente. Não foram cadastrados estágios de desenvolvimento ou resultados tecnológicos e extensionistas concluídos. Esses campos permanecem opcionais e as respectivas seções continuam ocultas quando vazias. As publicações históricas permanecem disponíveis; as duas publicações explicitamente vinculadas a Qualidade e Confiabilidade de Software Gerado por IA aparecem nos detalhes desse projeto.

Dois registros de 2014 possuem o mesmo título, mas veículos e tipos diferentes: resumo no CIUFLA e artigo no SMES. Ambos foram preservados; a coincidência de título não foi usada para eliminar registros históricos. Não foram encontrados DOIs duplicados no inventário atual.

## Critérios de aceitação

| Critério                       | Evidência automatizada                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------- |
| CT-01 — Três pilares           | Navegação dos cartões da página inicial nos dois idiomas.                                               |
| CT-02 — Pesquisa               | Seis áreas preservadas, grupos científicos separados de aplicações.                                     |
| CT-03 — Cogito Transfer        | Programa e quatro projetos derivados dos registros.                                                     |
| CT-04 — Outras iniciativas     | VUEI e ScaleUp em agrupamento independente.                                                             |
| CT-05 — Ordenação              | Execução antes de conclusão e demais estados; teste de mudança de situação.                             |
| CT-06 — Filtros combinados     | Pilar, tipo, situação, área e busca; grupos vazios ocultos e limpeza.                                   |
| CT-07 — Múltiplos pilares      | Testes com participação secundária sem duplicar cartões.                                                |
| CT-08 — Projetos e Soluções    | Classificações, situações, filtros e links para detalhes.                                               |
| CT-09 — Organizações           | Testes unitários da projeção autorizada, anônima e restrita; ausência de campos vazios no navegador.    |
| CT-10 — Publicações históricas | Contextualização institucional, preservação da listagem e vínculos apenas explícitos.                   |
| CT-11 — Relacionamentos        | Testes unitários de direções e reciprocidade; navegação pessoa ↔ iniciativa no navegador.               |
| CT-12 — Resultados             | Separação entre previstos e alcançados, sem promover entregas futuras a resultados.                     |
| CT-13 — Conteúdo opcional      | Seções ausentes sem registros correspondentes.                                                          |
| CT-14 — Idiomas                | Paridade de páginas, alternância, metadados e links contextuais.                                        |
| CT-15 — Integridade            | Build valida referências; testes cobrem inexistências, duplicações, autorrelações e incompatibilidades. |
| CT-16 — Compatibilidade        | Verificação HTTP de páginas, recursos locais e âncoras com raiz e prefixo de publicação.                |

Os casos de organizações anônimas e restritas e relações entre iniciativas sem registros reais são exercitados com objetos de teste, sem publicar exemplos fictícios no conteúdo institucional. As duas proponentes autorizadas também são verificadas no catálogo tecnológico.

## Qualidade e manutenção

- `npm run check`: esquemas e diagnósticos Astro/TypeScript.
- `npm test`: classificação, ordenação, resultados condicionais, traduções, relacionamentos e permissões de divulgação.
- `npm run build`: geração estática e integridade de referências.
- `npm run test:browser`: links, filtros, layouts de 320 a 1440 pixels, teclado, armazenamento indisponível, catálogo sem JavaScript, metadados e hierarquia de títulos.
- A auditoria axe verifica as regras automatizáveis WCAG 2 A/AA e 2.1 A/AA em todas as páginas geradas, nos temas claro e escuro. Cada tema é carregado em um documento novo para avaliar cores estáveis.
- `npm audit --audit-level=high`: a mesma verificação de dependências utilizada no CI.

A validação utiliza Node.js 24 e Chromium. A suíte deve ser executada após o build, tanto na raiz quanto com `ASTRO_BASE=/CogitoLab`; o servidor de testes lê o prefixo do artefato gerado. Consulte os comandos em [README.md](./README.md).

Foram revisados nomes acessíveis, hierarquia de títulos, foco visível, isolamento e retorno de foco do menu móvel, contraste nos dois temas, rótulos de publicação, competências e conteúdo editorial. O link de salto permite focar diretamente o conteúdo principal. As relações continuam utilizando os mesmos registros e não são inferidas por tema, autor ou financiamento.

Os testes de acessibilidade automatizados não constituem certificação completa de conformidade; avaliação manual com tecnologias assistivas permanece uma atividade complementar. A revisão do conteúdo usa as informações confirmadas no repositório e nesta solicitação, sem validar externamente resultados, financiamentos ou parcerias.

As orientações editoriais estão em [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) e [EXTENSION_CONTENT.md](./EXTENSION_CONTENT.md). Ao adicionar registros, atualizar os testes que representam o inventário atual e repetir a validação completa.

