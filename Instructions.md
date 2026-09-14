# Cogito Lab Website — Practical Challenge Specification

## 1. Context

**Cogito Lab** is a research group focused on Software Engineering, Artificial Intelligence, Software Quality, Testing, Mobile/IoT systems, and Innovation.

The objective of this practical challenge is to design and implement the **official Cogito Lab website**.

The developer is free to decide the website architecture, information hierarchy, visual identity, technologies, frameworks, navigation model, and component structure. The requirements below define **what information and capabilities must be represented**, not how the website should be implemented.

The website must be suitable for later adoption as the official public website of the research group.

---

## 2. General Requirements

The solution must:

- be implemented as a web application or static website;
- be maintained in a Git repository;
- be suitable for hosting through **GitHub**, preferably using **GitHub Pages**;
- provide both **Portuguese and English modes**;
- allow the user to switch between Portuguese and English;
- have a responsive interface suitable for desktop and mobile devices;
- organize the content in a way that the developer considers appropriate;
- prioritize clarity, maintainability, accessibility, and ease of future content updates;
- avoid coupling the content unnecessarily to the visual components;
- be prepared for future inclusion of new researchers, projects, publications, news, and research areas.

The developer may choose any technology stack considered appropriate.

---

## 3. Required Website Content

The developer may organize the following information into pages, sections, cards, menus, or other structures as considered appropriate.

### 3.1. Laboratory Identity

The website must clearly present:

- **Name:** Cogito Lab
- an explanation of the name and its inspiration in René Descartes' expression **“Cogito, ergo sum”**;
- a short description of the laboratory;
- its mission or research purpose;
- the institutions associated with the researchers;
- an area for visual identity, such as a logo or graphical representation.

The developer may propose the wording and visual presentation.

---

### 3.2. Research Areas

The website must present the six main research areas of Cogito Lab:

1. **Artificial Intelligence for Software Engineering**  
   Investigates the use of Artificial Intelligence, particularly Large Language Models and AI-assisted coding tools, to support software development activities. Topics include code generation, bug fixing, software maintenance, code review, refactoring, prompt engineering, AI agents for software engineering, and the evaluation of the quality, correctness, security, and usefulness of AI-generated software artifacts.

2. **Software Quality, Technical Debt & Refactoring**  
   Studies techniques to understand, assess, and improve the internal quality, maintainability, and evolution of software systems. Topics include technical debt, code smells, test smells, software maintainability, code quality metrics, software evolution, refactoring, automated refactoring, and the use of AI to identify and address quality problems.

3. **Software Testing & Reliability**  
   Focuses on methods, techniques, and tools for improving software testing and increasing the reliability of software systems. Topics include automated test generation, quality of test code, test coverage, fault detection, test smells, static and dynamic analysis, test-code refactoring, reliability assessment, and AI-assisted software testing.

4. **Configurable Systems, Mobile & IoT**  
   Investigates software systems whose behavior depends on combinations of features, resources, devices, or execution contexts. Topics include software variability, feature and resource interactions, configurable systems, mobile applications, Internet of Things systems, interaction failures, context-aware software, resource-constrained environments, and techniques for detecting and correcting failures in such systems.

5. **Collaborative Software Development & Empirical Software Engineering**  
   Studies how software is developed and evolved by teams, with emphasis on evidence obtained from real software projects and developers. Topics include merge conflicts, developer coordination, version control systems, collaborative development, software repositories, mining software repositories, software evolution, human and social aspects of software engineering, and empirical methods for understanding software development practices.

6. **Innovation, Entrepreneurship & Technology Transfer**  
   Investigates how scientific and technological knowledge can be transformed into innovation, new ventures, and socioeconomic impact. Topics include innovation ecosystems, academic entrepreneurship, startups, spin-offs, ideation, incubation, acceleration, technology transfer, intellectual property, innovation management, university-industry-government collaboration, open innovation, and regional development through science, technology, and entrepreneurship.

For each research area, the website should provide at least:

- title;
- short description;
- representative research topics;
- related projects;
- possibility of associating publications, software, datasets, or other research outputs.

The exact presentation is left to the developer.

---

### 3.3. People

The website must provide a section for the members of Cogito Lab.

The information model should support, when applicable:

- name;
- photograph;
- role in the laboratory;
- institutional affiliation;
- short biography;
- research interests;
- research areas within Cogito Lab;
- contact information;
- links such as:
  - Lattes;
  - ORCID;
  - Google Scholar;
  - GitHub;
  - LinkedIn;
  - personal/institutional homepage.

The solution should be prepared to represent different categories of members, for example:

- faculty/researchers;
- collaborators;
- PhD students;
- MSc students;
- undergraduate researchers;
- alumni.

The developer may decide whether all categories should be displayed separately.

---

### 3.4. Research Projects

The website must present the funded research and innovation projects associated with the group.

The initial set of projects is:

#### CNPq — Process 446729/2024-8

**Role:** Coordinator  
**Title:** _Evaluating the Quality of Artificial-Intelligence-Generated Code in Fixing Technical Debt and Merge Conflicts in Real-World Projects_  
Portuguese title: _Avaliação da Qualidade de Código Gerado por Inteligência Artificial na Resolução de Dívidas Técnicas e Conflitos de Integração em Projetos Reais._

#### CNPq — Process 406089/2025-6

**Role:** Subcoordinator  
**Title:** _LLM4IoT: Detecção e Correção de Falhas de Interação de Dispositivos com Grandes Modelos de Linguagem em Sistemas de Software IoT._

#### FAPEMIG — Process APQ-01488-24

**Role:** Subcoordinator  
**Title:** _Avaliação da Qualidade de Código de Teste Gerado por Inteligência Artificial em Aplicações para Dispositivos Móveis._

#### FAPEMIG — Process APQ-04113-25

**Role:** Subcoordinator  
**Title:** _Transformação Empreendedora: Consolidando o Ecossistema de Inovação no Unilavras._  
Related initiative: **VUEI**.

#### FAPEMIG — Process APQ-03990-26

**Role:** Collaborator  
**Title:** _Programa Vertentes ScaleUp._  
Related initiative: **Novo SEED**.

The project representation should support at least:

- funding agency;
- process/grant number;
- project title;
- short description;
- period;
- coordinator/subcoordinator/collaborators;
- participating institutions;
- related research areas;
- researchers and students involved;
- resulting publications;
- software, datasets, or other outputs;
- project status.

---

### 3.5. Publications

The website must support presentation of scientific publications associated with Cogito Lab.

At minimum, the data structure should be able to represent:

- title;
- authors;
- venue;
- year;
- publication type;
- DOI or external link;
- associated research areas;
- associated project(s);
- links to artifacts, datasets, source code, or supplementary material when available.

The developer may decide how publications are filtered, grouped, searched, or displayed.

It is acceptable to use representative/mock publication records for the MVP if necessary, provided they are clearly identified as sample data.

---

### 3.6. Software, Tools, and Research Data

The website should contain an area where the laboratory can later publish research artifacts, such as:

- software tools;
- prototypes;
- GitHub repositories;
- datasets;
- replication packages;
- APIs;
- experimental material.

Each item should be capable of being associated with:

- researchers;
- research areas;
- projects;
- publications.

---

### 3.7. News and Activities

The website should support publication of laboratory news and activities, such as:

- paper acceptance;
- conference participation;
- awards;
- thesis/dissertation defenses;
- new funded projects;
- new members;
- talks;
- workshops;
- hackathons;
- research visits;
- collaboration announcements.

The developer may use mock news items to demonstrate the feature.

---

### 3.8. Join Cogito Lab

The website must provide an area targeted at prospective students and collaborators.

It should be possible to communicate:

- opportunities for undergraduate research;
- MSc opportunities;
- PhD opportunities;
- scholarships;
- available research topics;
- collaboration opportunities;
- instructions for expressing interest in joining Cogito Lab.

The implementation does not need to include an application management system.

---

### 3.9. Partners and Funding

The website should provide space to present organizations associated with Cogito Lab, such as:

- universities and research institutions;
- funding agencies;
- innovation environments;
- research collaborators;
- industry partners, when applicable.

The solution should support logos and external links.

---

### 3.10. Contact

The website must provide an appropriate contact area.

It should be possible to represent:

- general laboratory contact;
- institutional location;
- email;
- social networks;
- GitHub organization;
- institutional links.

Actual contact information may be represented with placeholders in the MVP if it has not been provided.

---

## 4. Portuguese and English Support

The website must be usable in both:

- **Portuguese (PT-BR)**
- **English (EN)**

The developer may choose the internationalization strategy.

However:

- the language switch must be clearly accessible;
- the navigation and main content must be translated;
- switching languages should preserve the user's context whenever reasonably possible;
- adding or updating translations should not require unnecessary duplication of application logic.

The quality and maintainability of the chosen internationalization approach will be considered during evaluation.

---

## 5. Content Architecture

There is **no mandatory page structure**.

For example, the developer may choose:

- a single-page website;
- a multi-page institutional website;
- dedicated pages for research areas;
- dedicated pages for researchers;
- dedicated pages for projects;
- a combination of these approaches.

The developer is expected to decide the structure based on usability, scalability, and maintainability.

The evaluation will consider the rationale behind these decisions.

---

## 6. GitHub Hosting and Delivery

The project must be designed to be hosted using GitHub infrastructure.

The expected delivery includes:

- public or evaluator-accessible Git repository;
- complete source code;
- commit history;
- instructions for local execution;
- instructions for building the website;
- instructions for deployment;
- a deployed version whenever possible;
- automated deployment through GitHub Actions or another GitHub-compatible mechanism when considered appropriate.

The developer should assume that the website may later be maintained collaboratively by students and researchers.

---

## 7. Software Engineering Expectations

The challenge is not only about visual design.

The submitted solution should demonstrate appropriate Software Engineering practices, including:

- meaningful project organization;
- separation of concerns;
- maintainable code;
- reusable components when appropriate;
- input/content validation when relevant;
- appropriate handling of missing or invalid data;
- responsive behavior;
- accessibility considerations;
- automated testing;
- documentation;
- reproducible build and execution.

The candidate should make conscious decisions about what deserves automated testing.

---

## 8. Testing, Quality, and Reliability

The project must contain automated tests.

The developer is free to choose:

- testing tools;
- test levels;
- coverage targets;
- what parts of the application require more rigorous testing.

The submission must include:

- instructions for running the tests;
- a test coverage report or a reproducible way to generate it;
- a short explanation of the adopted testing strategy;
- identification of important scenarios that were tested;
- identification of relevant scenarios that were intentionally not tested and why.

**Test coverage percentage alone will not determine the quality of the submission.** The relevance and effectiveness of the tests will also be evaluated.

---

## 9. Use of Artificial Intelligence

The use of AI tools is **allowed and encouraged**.

Examples include, but are not limited to:

- ChatGPT;
- GitHub Copilot;
- Claude;
- Gemini;
- Cursor;
- other coding or generative AI tools.

The objective is not to evaluate whether the developer can avoid AI, but rather whether she can use AI critically and effectively.

The developer remains responsible for all submitted artifacts.

---

## 10. Development Log, AI Prompts, and Decision Trail

The developer must maintain a record of the development process.

This record should be stored inside the repository, for example in:

`DEVELOPMENT_LOG.md`

The log is an important part of the practical evaluation.

It should contain, when applicable:

### 10.1. Development iterations

For each relevant iteration:

- date or sequence number;
- goal of the iteration;
- task/problem being addressed;
- approach chosen;
- relevant implementation decision;
- result obtained;
- problems encountered;
- changes made after evaluating the result.

### 10.2. AI interactions

For relevant AI-assisted activities:

- AI tool/model used;
- prompt or instruction provided to the AI;
- purpose of the prompt;
- relevant output or concise summary of the output;
- whether the suggestion was:
  - accepted;
  - partially accepted;
  - rejected;
- explanation of the decision;
- modifications performed by the developer.

It is not necessary to record every trivial autocomplete interaction.

The focus should be on interactions that influenced the solution.

### 10.3. Decision trail

The developer should document important decisions, such as:

- technology/framework selection;
- website architecture;
- content organization;
- internationalization approach;
- data representation;
- testing strategy;
- deployment approach;
- changes of direction during development.

The objective is to make the **development and decision process observable and reproducible**, rather than requiring disclosure of private internal reasoning.

---

## 11. Short Final Reflection

The repository should contain a short final reflection, which may be included in `DEVELOPMENT_LOG.md` or another Markdown file.

It should answer:

1. What were the main technical decisions made?
2. Which part of the solution is the developer most satisfied with?
3. What was the most important problem encountered?
4. How was AI useful during development?
5. Where did AI produce an inadequate, incorrect, or low-quality suggestion?
6. How did the developer evaluate whether an AI suggestion should be trusted?
7. What would be improved with one additional week of development?
8. What evidence supports the developer's perception that the solution is reliable?

The answers should be concise and evidence-based whenever possible.

---

## 12. Expected Submission

The final submission should contain at least:

- source code;
- `README.md`;
- `DEVELOPMENT_LOG.md`;
- automated tests;
- test execution instructions;
- test coverage information;
- build/deployment instructions;
- Git commit history;
- Portuguese and English versions;
- URL of the deployed website, whenever deployment is possible.

Additional documentation may be included at the developer's discretion.

---

## 13. Scope

The challenge evaluates the developer's ability to:

- understand an open-ended problem;
- define and deliver an MVP;
- make architectural decisions;
- build a maintainable web solution;
- apply Software Engineering practices;
- design meaningful automated tests;
- reason about software quality and reliability;
- use Artificial Intelligence critically;
- communicate technical decisions;
- keep a reproducible record of the development process.

The developer should prioritize a **coherent, working, well-engineered MVP** over implementing a large number of superficial features.
