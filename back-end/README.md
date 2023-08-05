
# My Tasks Back-End - Documentação

Este é um projeto do Desafio para a vaga Front-End, que gerencia tarefas de usuários. Ele foi desenvolvido usando Node.js, Express e AceBase como banco de dados.

## Estrutura de Pastas

-   **node_modules**: Diretório onde as dependências do projeto são instaladas.
-   **src**: Diretório principal do código-fonte do projeto.
    -   **config**: Configurações do projeto.
        -   **my_tasks.acebase**: Arquivo de configuração do banco de dados AceBase.
        -   **authConfig.ts**: Configurações de autenticação.
        -   **dbConfig.ts**: Configurações de conexão com o banco de dados.
    -   **controller**: Controladores da aplicação.
        -   **AuthenticateUserController.ts**: Controlador para autenticação de usuário.
        -   **FindUserIdController.ts**: Controlador para buscar dados de um usuário por ID.
        -   **FindUserTasksController.ts**: Controlador para buscar tarefas de um usuário.
        -   **index.ts**: Arquivo de exportação dos controladores.
    -   **errors**: Classes de erros customizados.
        -   **AppError.ts**: Classe para erros personalizados da aplicação.
    -   **provider**: Provedores de serviços.
        -   **GenerateTokenProvider.ts**: Provedor para geração de tokens de autenticação.
    -   **repositories**: Repositórios de dados.
        -   **acebase**: Repositórios específicos para AceBase.
            -   **acebase-tasks-repository.ts**: Repositório para tarefas no AceBase.
            -   **acebase-users-repository.ts**: Repositório para usuários no AceBase.
        -   **tasks-repositories.ts**: Interface e métodos para repositórios de tarefas.
        -   **users-repositories.ts**: Interface e métodos para repositórios de usuários.
    -   **routes**: Rotas da aplicação.
        -   **router.authenticate.ts**: Rota para autenticação de usuário.
        -   **router.tasks.ts**: Rotas relacionadas a tarefas.
        -   **router.users.ts**: Rotas relacionadas a usuários.
        -   **index.ts**: Arquivo de exportação das rotas.
    -   **types**: Tipos e interfaces.
        -   **types.ts**: Tipos utilizados na aplicação.
    -   **use-cases**: Casos de uso da aplicação.
        -   **auth**: Casos de uso relacionados à autenticação.
            -   **authenticateUser.ts**: Caso de uso para autenticar usuário.
        -   **task**: Casos de uso relacionados a tarefas.
            -   **createTask.ts**: Caso de uso para criar uma nova tarefa.
            -   **updateTask.ts**: Caso de uso para atualizar uma tarefa.
        -   **user**: Casos de uso relacionados a usuários.
            -   **createUser.ts**: Caso de uso para criar um novo usuário.
            -   **updateUser.ts**: Caso de uso para atualizar um usuário.
        -   **index.ts**: Arquivo de exportação dos casos de uso.
    -   **server.ts**: Arquivo principal para iniciar o servidor da aplicação.
-   **package-lock.json**: Arquivo de controle de versões das dependências.
-   **package.json**: Arquivo de configuração do projeto e dependências.
-   **tsconfig.json**: Arquivo de configuração do TypeScript.
-   **README.md**: Este arquivo de documentação.

## Rotas

A aplicação possui as seguintes rotas:

-   Autenticação de Usuário:
    
    -   `POST /sessions`: Autenticação de usuário.
-   Tarefas:
    
    -   `POST /tasks`: Criação de uma nova tarefa.
    -   `PUT /tasks`: Atualização de uma tarefa existente.
    -   `GET /tasks/:id`: Busca de tarefas de um usuário por ID.
-   Usuários:
    
    -   `POST /user`: Criação de um novo usuário.
    -   `PUT /user`: Atualização de um usuário existente.
    -   `GET /users/:id`: Busca de dados de um usuário por ID.

## Executando o Projeto

1.  Certifique-se de ter o Node.js instalado em sua máquina.
2.  Clone este repositório para o seu computador.
3.  Abra o terminal na pasta raiz do projeto.
4.  Execute `npm install` para instalar as dependências.
6.  Execute `npm run dev` para iniciar o servidor.
7.  As rotas podem ser acessadas através das URLs mencionadas acima usando ferramentas como o Insomnia ou o Postman.