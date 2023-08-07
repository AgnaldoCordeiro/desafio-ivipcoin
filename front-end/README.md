
# My Tasks Front-end - Documentação

Este é um projeto do Desafio para a vaga Front-End, que gerencia tarefas de usuários. Ele foi desenvolvido usando Reatcj, Material UI.

## Estrutura de Diretórios

A estrutura de diretórios da aplicação é organizada da seguinte forma:

- `src`: Pasta raiz da aplicação.
  - `assets`: Contém recursos estáticos como imagens utilizadas na aplicação.
  - `pages`: Contém as páginas principais da aplicação.
    - `tarefas`: Páginas relacionadas à gestão de tarefas.
      - `DetalheDeTarefa.tsx`: Página de detalhes de uma tarefa específica.
      - `ListagemDeTarefas.tsx`: Página de listagem de todas as tarefas.
    - `usuario`: Páginas relacionadas à gestão de usuários.
      - `DetalheDeUsuario.tsx`: Página de detalhes de um usuário específico.
    - `index.ts`: Arquivo de exportação de páginas.
  - `routes`: Contém os arquivos relacionados ao roteamento da aplicação.
    - `index.tsx`: Configuração das rotas da aplicação.
  - `shared`: Contém componentes, contextos e utilitários compartilhados.
    - `components`: Componentes reutilizáveis da aplicação.
      - `confirm-dialog`: Componente de diálogo de confirmação.
      - `ferramentas-da-listagem`: Componente de ferramentas para listagem.
      - `ferramentas-de-detalhe`: Componente de ferramentas para detalhes.
      - `login`: Componente de login.
      - `menu-lateral`: Componente de menu lateral.
      - `index.ts`: Arquivo de exportação de componentes.
    - `contexts`: Contextos globais da aplicação.
      - `AuthContext.tsx`: Contexto de autenticação.
      - `DrawerContext.tsx`: Contexto do menu lateral.
      - `index.ts`: Arquivo de exportação de contextos.
    - `environment`: Configurações de ambiente da aplicação.
      - `index.ts`: Arquivo de configurações de ambiente.
    - `forms`: Componentes e utilitários relacionados a formulários.
      - `index.ts`: Arquivo de exportação de utilitários de formulário.
      - `IVFormErrors.ts`: Interface para erros de validação de formulário.
      - `TraducoesYup.ts`: Traduções para mensagens de validação Yup.
      - `useVForm.ts`: Hook personalizado para manipulação de formulários.
      - `VForm.ts`: Componente de formulário customizado.
      - `VScope.ts`: Enumeração para escopo de validação de formulário.
      - `VTextField.tsx`: Componente de campo de texto customizado.
    - `hooks`: Hooks customizados da aplicação.
      - `index.ts`: Arquivo de exportação de hooks.
      - `UseDebounce.ts`: Hook de debounce para otimização de pesquisa.
    - `layouts`: Layouts de página da aplicação.
      - `index.ts`: Arquivo de exportação de layouts.
      - `LayoutBaseDePagina.tsx`: Layout base para páginas.
    - `services`: Serviços de comunicação com a API.
      - `api`: Configurações e interceptores da API.
        - `auth`: Serviços de autenticação.
          - `AuthService.ts`: Serviço de autenticação.
        - `axios-config`: Configuração global do Axios.
          - `index.ts`: Arquivo de configuração do Axios.
          - `interceptors`: Interceptores de requisição e resposta.
            - `ErrorIntercepto.ts`: Interceptor de tratamento de erros.
            - `index.ts`: Arquivo de exportação de interceptores.
            - `ResponseInterceptopr.ts`: Interceptor de tratamento de respostas.
        - `task`: Serviços relacionados a tarefas.
          - `TaskService.ts`: Serviço de gerenciamento de tarefas.
        - `users`: Serviços relacionados a usuários.
          - `UserService.ts`: Serviço de gerenciamento de usuários.
- `App.tsx`: Componente raiz da aplicação.
- `main.tsx`: Ponto de entrada da aplicação.
- `vite-env.d.ts`: Tipagens para ambiente de desenvolvimento.
- `gitignore`: Arquivo de configuração para ignorar arquivos do controle de versão.
- `index.html`: Página HTML principal da aplicação.
- `package-lock.json`: Arquivo de lock do npm para controle de versão das dependências.
- `package.json`: Arquivo de configuração do projeto e dependências.
- `tsconfig.json`: Arquivo de configuração do TypeScript.
- `tsconfig.node.json`: Arquivo de configuração do TypeScript para ambiente Node.js.
- `vite.config.ts`: Arquivo de configuração do Vite, utilizado para desenvolvimento.

## Funcionalidades Principais

A aplicação em React possui as seguintes funcionalidades principais:

- Autenticação de usuário.
- Listagem e detalhamento de tarefas.
- Listagem e detalhamento do usuário.
- Utilização de contexto global para controle de autenticação e menu lateral.
- Utilização de formulários customizados com validação.
- Serviços de comunicação com a API para autenticação, tarefas e usuários.

## Como Executar a Aplicação

Para executar a aplicação, siga os passos abaixo:

1. Certifique-se de ter o Node.js e o npm instalados em seu sistema.
2. Clone o repositório da aplicação.
3. Abra o terminal na pasta raiz do projeto.
4. Execute o comando `npm install` para instalar as dependências.
5. Execute o comando `npm run dev` para iniciar a aplicação em modo de desenvolvimento.

A aplicação estará acessível em `http://localhost:5173`.