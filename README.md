# Lista de Tarefas em Vue.js

Esta é uma aplicação simples de lista de tarefas (To-Do List) construída usando Vue 3, TypeScript, Pinia e TailwindCSS.

## Funcionalidades

### 1. Visualização de Tarefas

- Apresenta uma lista de tarefas.
- Cada item da lista oferece uma opção para ver seus detalhes.
- Um pequeno texto guia o usuário para clicar em 'Details' e ver os detalhes da tarefa.

### 2. Criação e Edição de Tarefas

- Utiliza um formulário (`TaskForm`) para permitir aos usuários adicionar novas tarefas ou editar tarefas existentes.
- Os campos disponíveis no formulário são: título e descrição.
- Tarefas recém-criadas recebem um ID gerado automaticamente.
- Na edição, os usuários podem salvar alterações, excluir a tarefa ou voltar para a lista principal.

### 3. Roteamento

- A aplicação está integrada com o Vue Router.
- O roteamento facilita a navegação de volta para a lista principal ou para carregar uma tarefa específica para edição com base em um ID fornecido.

### 4. Gerenciamento de Estado (State Management)

- A aplicação utiliza Pinia como solução de gerenciamento de estado.
- Oferece métodos para adicionar, editar, deletar e obter tarefas.

## Estilização

- A interface do usuário é estilizada usando TailwindCSS, proporcionando uma experiência de usuário moderna e responsiva.

## Testes

- A aplicação está equipada com testes unitários para garantir seu correto funcionamento.
- Os testes verificam a renderização correta dos componentes e a lógica de adição/edição de tarefas.

## Iniciando com o projeto

1. **Instalação**

   Para configurar e executar o projeto localmente, primeiro clone o repositório e, em seguida, instale as dependências:

   ```bash
   yarn install
   ```

2. **Execução Local**

   Para iniciar o servidor de desenvolvimento e ver a aplicação em ação:

   ```bash
   yarn dev
   ```

3. **Testes Unitários**

   Execute os testes unitários para garantir que tudo esteja funcionando como esperado:

   ```bash
   yarn test:unit
   ```
