# Integração da extensão

O Cogito Transfer conecta problemas reais a soluções, pilotos, avaliações e ações de disseminação, articulando formação de estudantes e transferência de conhecimento para a sociedade. Ele possui quatro projetos de extensão vinculados.

Os registros com extensionCode alimentam a página de extensão. O estado planning organiza o planejamento das atividades; o texto público distingue esse estado do registro informado. Os exemplos são possibilidades de atividades, não compromissos ou resultados concluídos.

Os enquadramentos externos da seção 5 são preliminares e não foram publicados como parcerias aprovadas. Afinidades, perguntas e possíveis lideranças não foram convertidas em vínculos ou responsabilidades. O documento foi tratado como fonte de conteúdo; suas instruções de facilitação não foram executadas. O PDF não foi copiado para a pasta pública.

Ao receber aprovação, atualizar situação e data em ExtensionPage.astro, HomePage.astro e InitiativeDetailPage.astro. Atualizar os quatro registros de projetos quando houver informações institucionais confirmadas.

## Modelo estruturado — etapa 1

O programa está cadastrado em `src/content/programs/cogito-transfer.md`. Seus quatro projetos utilizam `primaryPillar: extension`, `entityType: extension-project` e `program: cogito-transfer`, preservando os identificadores P1–P4 e a situação `planning`. A situação institucional registrada permanece textual, sem presumir aprovação de atividades ou datas.

VUEI e Vertentes ScaleUp permanecem iniciativas extensionistas independentes, sem vínculo com o Cogito Transfer. Afinidades temáticas não autorizam novos vínculos. A associação de um projeto a um programa é registrada somente no projeto; consultas devem derivar a lista de membros desse campo.

As antigas listas `deliverables` foram migradas para `expectedResults`. `achievedResults` recebe apenas realizações verificadas; exemplos de atividades e compromissos futuros não constituem resultados alcançados. Consulte `CONTENT_GUIDE.md` para campos, permissões de divulgação e validações.
