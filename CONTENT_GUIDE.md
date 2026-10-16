# Guia para cadastrar conteúdo

Crie arquivos Markdown (`.md`) nas pastas abaixo. Use nomes curtos, sem espaços ou acentos, como `nome-sobrenome.md`. O nome do arquivo, sem `.md`, é o identificador usado nos vínculos; preserve-o ao editar registros existentes.

| O que cadastrar | Pasta                        |
| --------------- | ---------------------------- |
| Integrantes     | `src/content/people/`        |
| Iniciativas     | `src/content/initiatives/`   |
| Programas       | `src/content/programs/`      |
| Publicações     | `src/content/publications/`  |
| Notícias        | `src/content/news/`          |
| Oportunidades   | `src/content/opportunities/` |

Copie um registro da mesma pasta e substitua os dados. Os campos ficam entre duas linhas `---`, no início do arquivo. Nos campos bilíngues, preencha `en` e `pt`; em listas, use `[]` quando não houver itens. Remova campos opcionais sem informação. Substitua todos os exemplos antes de publicar.

## Adicionar um Integrante

Crie `src/content/people/nome-sobrenome.md`:

```yaml
---
name: Nome Sobrenome
category: undergraduate
institution: Nome da instituição
role: { en: Undergraduate student, pt: Estudante de graduação }
topic: { en: Software testing, pt: Testes de software }
summary:
  en: Short biography in English.
  pt: Breve apresentação em português.
areas: [software-testing]
initiatives: []
links:
  email: mailto:nome@instituicao.br
order: 20
---
```

- `category`: `faculty`, `postdoc`, `phd`, `masters`, `undergraduate`, `collaborator`, `staff`, `visiting` ou `alumni`.
- `institution` e `topic` são opcionais: omita quando não houver informação confirmada. Descreva interesses em `summary`; interesse em um projeto não confirma participação e não deve gerar um vínculo em `initiatives`.
- `areas`: identificadores das áreas listadas ao final deste guia.
- `initiatives`: identificadores das iniciativas das quais a pessoa participa. O vínculo pode ser cadastrado aqui ou no campo `people` da iniciativa; não é necessário repetir nos dois arquivos.
- `links` é opcional. Aceita `email`, `github`, `orcid`, `scholar`, `lattes`, `linkedin` e `website`. Use URLs completas; para e-mail, use `mailto:`.
- Para adicionar foto, coloque a imagem em `public/images/` e informe `photo: /images/nome-sobrenome.jpg`.
- `order` é opcional: números menores aparecem primeiro.

## Adicionar uma Iniciativa

Crie `src/content/initiatives/nome-da-iniciativa.md`:

```yaml
---
title: { en: Initiative name, pt: Nome da iniciativa }
summary: { en: Short summary., pt: Resumo breve. }
primaryPillar: research
entityType: research-project
kind: research
kindLabel: { en: Research project, pt: Projeto de pesquisa }
status: planning
statusLabel: { en: Scope under definition, pt: Escopo em definição }
areas: [software-testing]
people: []
work:
  en: [Describe the planned activities.]
  pt: [Descreva as atividades planejadas.]
expectedResults:
  en: [Describe the expected outcomes.]
  pt: [Descreva os resultados esperados.]
skills: [Testing]
participation:
  en: [Undergraduate research]
  pt: [Iniciação científica]
---
```

Escolha a classificação adequada:

| Campo           | Valores                                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `primaryPillar` | `research`, `extension`, `technology`                                                                                                     |
| `entityType`    | `research-project`, `extension-project`, `technology-project`, `tool`, `product`, `internal-project`, `initiative`, `technology-solution` |
| `kind`          | `research`, `applied`, `product`, `extension`, `consulting`, `internal`                                                                   |
| `status`        | `planning`, `active`, `completed`, `paused`; preserve `open` apenas nos registros legados ainda não normalizados                          |

Projetos de pesquisa usam o pilar `research`; projetos de extensão, `extension`; projetos tecnológicos, ferramentas, produtos, soluções e projetos internos, `technology`. Uma área temática não define a natureza do projeto. `kind` e `kindLabel` também precisam ser preenchidos.

Campos opcionais:

- `shortTitle`: título curto, com `en` e `pt`.
- `relatedPillars`: outros pilares relacionados, sem repetir o principal.
- `defined`: listas `en` e `pt` de informações já estabelecidas.
- `program`: identificador de um programa cadastrado. Para projetos do Cogito Transfer, use `cogito-transfer`; `extensionCode` aceita `P1` a `P4` somente nesse programa e não representa número de registro institucional.
- `funding`: preencha `agency` e `process`; `period` é opcional.
- `featured: true`: indica preferência editorial para destaque na página inicial; iniciativas em execução têm prioridade.
- `order`: ordem editorial, respeitando o agrupamento por situação.

### Relacionar Iniciativas

Cadastre somente vínculos confirmados, usando identificadores existentes:

```yaml
relatedInitiatives:
  - initiative: identificador-da-outra-iniciativa
    relation: uses
```

`relation` aceita `originates`, `uses`, `complements`, `applies-knowledge-from` ou `linked-to`. Não repita a mesma iniciativa nem vincule um registro a si próprio. O vínculo aparece também no sentido inverso, sem exigir outro cadastro.

### Cadastrar Resultados

Use `expectedResults` para entregas futuras. Para realizações concluídas e verificadas:

```yaml
achievedResults:
  - description: { en: Verified outcome., pt: Resultado verificado. }
    date: '2026-10-16'
    url: https://endereco-do-artefato.org
```

Somente `description` é obrigatório em cada resultado. Os campos opcionais são `type`, `date` (`AAAA-MM-DD`), `url` e `indicator`, por exemplo `{ value: 10, unit: { en: participants, pt: participantes } }`. Não registre uma previsão como realização concluída.

### Informar estágio e organização

Preencha esses campos apenas quando houver informação confirmada e a iniciativa pertencer ao pilar tecnológico, principal ou secundário.

- `developmentStage`: `concept`, `proof-of-concept`, `prototype`, `mvp`, `product-in-development`, `available` ou `deployed`. O estágio não substitui `status`.
- `organization`: exige `name`, `relationship` e `disclosure`.
- `relationship`: `proponent` (proponente), `client`, `development-partner`, `collaborating-institution` ou `funder`; não confunda financiador com cliente.
- `disclosure: authorized` permite exibir o nome e, opcionalmente, `website` e `logo`.
- `disclosure: anonymous` exige `publicLabel: { en: Private organization, pt: Organização privada }` e não permite website ou logo.
- `disclosure: restricted` oculta a relação e não aceita identificação pública, website ou logo. O repositório pode ser público: não cadastre informações sigilosas nos arquivos.

## Adicionar um Programa

Crie um arquivo em `src/content/programs/` com:

```yaml
---
name: { en: Program name, pt: Nome do programa }
description: { en: Program purpose., pt: Propósito do programa. }
primaryPillar: extension
objectives:
  en: [Program objective.]
  pt: [Objetivo do programa.]
institutionalStatus:
  en: Confirmed institutional status.
  pt: Situação institucional confirmada.
---
```

`audience` (público atendido, com `en` e `pt`) e `achievedResults` são opcionais. Para vincular projetos, preencha `program` nos arquivos das iniciativas; o pilar do programa deve constar entre os pilares do projeto. Não cadastre o mesmo programa também como iniciativa.

## Adicionar uma Publicação

Copie `src/content/publications/_template.md` para um novo arquivo `.md` e substitua os dados bibliográficos. Para publicar, use `draft: false`.

Campos obrigatórios: `title`, `authors` (lista), `venue`, `year` (número inteiro) e `type`.

- `type`: `journal`, `conference`, `workshop`, `book`, `chapter`, `thesis`, `preprint`, `conference-abstract` ou `abstract`.
- `doi`: DOI sem o prefixo `https://doi.org/`; `url`: endereço completo, quando disponível.
- `areas` e `initiatives` são listas opcionais de identificadores.
- `abstract`, quando preenchido, usa `en` e `pt`.

Mantenha publicações históricas sem vínculo com iniciativas atuais quando não houver associação confirmada. Não deduza vínculos apenas pelo título, tema ou autores.

## Adicionar uma Notícia

Crie um arquivo em `src/content/news/` com `title`, `summary`, `date`, `displayDate` e `categoryLabel`. Título, resumo, data para exibição e categoria para exibição usam `en` e `pt`:

```yaml
---
title: { en: News title, pt: Título da notícia }
summary: { en: Short news summary., pt: Resumo breve da notícia. }
date: '2026-10-16'
displayDate: { en: 'October 16, 2026', pt: 16 de outubro de 2026 }
category: event
categoryLabel: { en: Event, pt: Evento }
draft: false
---
```

`category` aceita `award`, `paper`, `event`, `talk` ou `general`. Campos opcionais: `initiatives`, `people` e `areas` (listas de identificadores), `featured`, `order` e `links` (lista de objetos com `label` e `url`). Use `draft: true` para manter a notícia fora do site.

## Adicionar uma Oportunidade

Crie um arquivo em `src/content/opportunities/`:

```yaml
---
title: { en: Opportunity title, pt: Título da oportunidade }
summary: { en: Short description., pt: Descrição breve. }
type: undergraduate
status: expressions-of-interest
initiative: identificador-da-iniciativa
people: []
areas: [software-testing]
skills: [Testing]
---
```

- `type`: `research`, `undergraduate`, `thesis`, `masters`, `phd`, `collaboration` ou `engineering`.
- `status`: `open` para oportunidades abertas; `expressions-of-interest` para manifestações de interesse; `closed` para encerradas.
- `initiative`: identificador obrigatório de uma iniciativa existente.
- `people`: identificadores das pessoas responsáveis, quando confirmadas.
- Campos opcionais: `commitment` (dedicação ou modalidade, com `en` e `pt`), `funded` (`true` ou `false`) e `order`.

A situação da oportunidade é independente da situação de execução da iniciativa.

## Identificadores das Áreas

Use estes valores nos campos `areas`:

- `ai-for-software-engineering` — IA para Engenharia de Software.
- `software-quality` — Qualidade de Software, Dívida Técnica e Refatoração.
- `software-testing` — Testes de Software e Confiabilidade.
- `configurable-mobile-iot` — Sistemas Configuráveis, Mobile e IoT.
- `collaborative-empirical-se` — Engenharia de Software Colaborativa e Empírica.
- `innovation-transfer` — Inovação, Empreendedorismo e Transferência de Tecnologia.
