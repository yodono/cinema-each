# frontend

## Visão Geral

### 📁 Estrutura de Pastas

Este projeto segue a arquitetura baseada em features (funcionalidades), organizando o código por domínio de negócio.

```bash
./src
├── api # Configurações ou serviços de API compartilhados por toda a aplicação
│   └── api.tsx # Wrapper do fetch API
├── assets # Arquivos estáticos como imagens, fontes ou ícones que podem ser importados nos componentes
├── components # Componentes de interface reutilizáveis em várias partes do projeto (ex: botões, modais)
├── context # Gerencia estados globais usando React Context (ex: autenticação, tema, idioma)
├── features # Organiza o código por funcionalidades
│   └── cake # Módulo de exemplo
│       ├── # Cada feature pode ter seu próprio conjunto de api, hooks, components, types, assets, etc
│       ├── api
│       │   └── useQueryCake.tsx # Hook personalizado para buscar dados relacionados a bolos
│       └── components
│           └── Cake
│               └── Cake.tsx
├── hooks # Hooks personalizados reutilizáveis (ex: useDebounce, useLocalStorage).
├── pages # Componentes de páginas principais da aplicação (ex: Home, Filmes), associados a rotas.
├── routes # Configuração e definição de rotas do projeto.
├── types # Tipos TypeScript e interfaces globais compartilhadas entre diferentes partes do projeto.
└── ...
```

## Dependências

- [Animate UI](https://animate-ui.com/): biblioteca open-source de componentes animados baseados em shadcn e tailwind.
