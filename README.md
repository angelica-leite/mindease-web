# MindEase Web

Aplicacao web focada em organizacao de tarefas com abordagem de acessibilidade cognitiva.

## 1. Objetivo do projeto

O MindEase Web oferece:

- Gestao de tarefas em colunas (`todo`, `in-progress`, `done`)
- Timer Pomodoro para foco
- Configuracoes de acessibilidade (fonte, contraste, espacamento, reducao de movimento e visual simplificado)
- Experiencia responsiva com navegacao desktop e mobile

Atualmente o projeto e frontend-only, com persistencia local via `localStorage`.

## 2. Stack tecnica

- Framework: `Next.js 16` (App Router)
- UI: `React 19` + `TypeScript` (strict)
- Estilos: `Tailwind CSS v4` + `shadcn/ui` + `tw-animate-css`
- Icones: `lucide-react`
- Motion: `framer-motion`
- Qualidade: `ESLint 9` + `Prettier 3`
- Testes: `Jest 30` + `Testing Library`

## 3. Pre-requisitos

- Node.js `20+` (LTS recomendado)
- npm `10+`

O projeto nao possui `.env.example` e, hoje, nao depende de variaveis de ambiente.

## 4. Setup rapido

```bash
npm install
npm run dev
```

Aplicacao em `http://localhost:3000`.

## 5. Scripts disponiveis

- `npm run dev`: ambiente de desenvolvimento
- `npm run build`: build de producao
- `npm run start`: executa build de producao
- `npm run lint`: lint com ESLint
- `npm run test`: testes
- `npm run test:watch`: testes em watch mode
- `npm run test:coverage`: cobertura de testes
- `npm run format`: formata codigo
- `npm run format:check`: valida formatacao

## 6. Arquitetura

Separacao por camadas, inspirada em Clean Architecture:

```text
src/
  app/            # Rotas e layouts do Next
  domain/         # Entidades e contratos de negocio
  application/    # Casos de uso de aplicacao
  infra/          # Implementacoes concretas (repositorios, DI)
  presentation/   # Paginas, componentes, hooks e estado de UI
```

### 6.1 Responsabilidades por camada

- `domain`
  - `entities/task.ts`: modelos centrais
  - `repositories/task-repository.ts`: contrato de persistencia
  - `use-cases/*`: regras de negocio
- `application`
  - `tasks/add-tasks.ts`: criacao de tarefa com `id` e `createdAt`
- `infra`
  - `repositories/local-storage/task-repository.local.ts`: persistencia local
  - `di/tasks.ts`: composicao dos casos de uso
- `presentation`
  - UI client-side, hooks de ViewModel e contexto global de acessibilidade
- `app`
  - Entradas de rota que delegam para componentes da `presentation`

### 6.2 Fluxo de dados de tarefas

1. Pagina/componente dispara acao.
2. Hook de ViewModel usa `useTasks`.
3. `useTasks` resolve casos de uso via `makeTasks()`.
4. Caso de uso executa regra de negocio.
5. Repositorio salva/le em `localStorage`.
6. UI renderiza estado atualizado.

## 7. Rotas

- `/` redireciona para `/dashboard`
- `/dashboard`
- `/tasks`
- `/pomodoro`
- `/profile`
- `/settings`

Layout principal em `src/app/(main)/layout.tsx`, com `Sidebar` (desktop) e `MobileNav` (mobile).

## 8. Acessibilidade

`AccessibilityProvider` centraliza preferencias de UX:

- Persistencia em `localStorage` (`mindease-accessibility`)
- Aplicacao de CSS variables no `document.documentElement`
- Toggles globais: `reduce-motion`, `high-contrast`, `simplified-view`

## 9. Testes

Cobertura atual inclui:

- Casos de uso (domain/application)
- Repositorio de infra
- Hooks de ViewModel
- Componentes e paginas principais

## 10. Decisoes tecnicas

1. `localStorage` como persistencia inicial

- Pro: simplicidade e velocidade de entrega
- Contra: sem sincronizacao entre dispositivos

2. Arquitetura em camadas

- Pro: baixo acoplamento e evolucao mais segura
- Contra: mais arquivos e abstracoes

3. App Router com componentes client para telas interativas

- Pro: UX fluida e boa organizacao de rotas
- Contra: maior dependencia de estado client-side

## 11. CI/CD

- CI em `.github/workflows/ci.yml`
  - Triggers: `pull_request` e `push` nas branches principais
  - Passos: `npm ci`, `npm run format:check`, `npm run lint`, `npm run test`, `npm run build`
  - Objetivo: bloquear merge com regressao de qualidade
- CD em `.github/workflows/cd.yml`
  - Trigger: merge em branch de release/producao
  - Passos: build de producao + deploy no provedor alvo
  - Objetivo: deploy reprodutivel e previsivel

## 12. Convencao para contribuicao

Antes de abrir PR:

```bash
npm run format
npm run lint
npm run test
npm run build
```

Criterios minimos:

- Tipagem consistente
- Testes para regras de negocio e comportamentos criticos
- Reuso de hooks/view models existentes
- Merge apenas com pipeline CI aprovada
