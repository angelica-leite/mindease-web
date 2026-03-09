# MindEase Web

Aplicação web focada em organização de tarefas com abordagem de acessibilidade cognitiva.

## 1. Objetivo do projeto

O MindEase Web oferece:

- Camada de autenticação com login, cadastro e sessão local

- Gestão de tarefas em colunas (`todo`, `in-progress`, `done`)

- Timer Pomodoro para foco

- Configurações de acessibilidade (fonte, contraste, espaçamento, redução de movimento e visual simplificado)

- Experiência responsiva com navegação desktop e mobile.

Atualmente, o projeto é frontend-only, com persistência local via `localStorage`.

## 2. Stack técnica

- Framework: `Next.js 16` (App Router)
- UI: `React 19` + `TypeScript` (strict)
- Estilos: `Tailwind CSS v4` + `shadcn/ui` + `tw-animate-css`

- Ícones: `lucide-react`

- Motion: `framer-motion`
- Qualidade: `ESLint 9` + `Prettier 3`
- Testes: `Jest 30` + `Testing Library`

## 3. Pré-requisitos

- Node.js `20+` (LTS recomendado)
- npm `10+`

## 4. Setup rápido.

```bash
npm install
npm run dev
```

Aplicação em `http://localhost:3000`.

## 5. Scripts disponíveis.

- `npm run dev`: ambiente de desenvolvimento

- `npm run build`: build de produção

- `npm run start`: executa build de produção.

- `npm run lint`: lint com ESLint
- `npm run test`: testes
- `npm run test:watch`: testes em watch mode
- `npm run test:coverage`: cobertura de testes

- `npm run format`: formata código

- `npm run format:check`: valida formatação

## 6. Arquitetura.

Separação por camadas, inspirada em Clean Architecture:

src/

  app/            # Rotas e layouts do Next

  domain/         # Entidades e contratos de negócio

  application/    # Casos de uso de aplicação

  infra/          # Implementações concretas (repositórios, DI)

  presentation/   # Páginas, componentes, hooks e estado de UI

## 7. Rotas

Públicas:

- `/login`
- `/cadastro`

Protegidas:

- `/dashboard`
- `/tasks`
- `/pomodoro`
- `/profile`
- `/settings`

## 8. Acessibilidade

`AccessibilityProvider` centraliza preferências de UX:

- Persistência em `localStorage` (`mindease-accessibility`)
- Aplicação de CSS variables
- Toggles globais: `reduce-motion`, `high-contrast`, `simplified-view`

## 9. Testes

Cobertura atual inclui:

- Casos de uso (domain/application)
- Repositório de infra
- Hooks de ViewModel
- Componentes e páginas principais
- Contexto e páginas de autenticação

## 10. Segurança

A autenticação é local (frontend-only) e usa `localStorage` para fins de protótipo.

## 11. CI/CD

- CI em `.github/workflows/ci.yml`

  - Triggers: `pull_request` e `push` nas branches principais.

  - Passos: `npm ci`, `npm run format:check`, `npm run lint`, `npm run test -- --ci --coverage`, `npm run build`

  - Objetivo: bloquear merge com regressão de qualidade.

- CD em `.github/workflows/cd.yml`

  - Trigger principal: `workflow_run` após CI bem-sucedido em `main/master`

  - Trigger manual: `workflow_dispatch`
