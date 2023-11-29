# Pokédex Builder

Este é um projeto de aplicativo web desenvolvido em **[Angular 16](https://v16.angular.io/docs)**, utilizando **Tailwind CSS** e **SCSS** para estilização e **flowbite** para componentes de interface do usuário.

## :memo: Descrição

O objetivo deste aplicativo é permitir que os jogadores de Pokemon construam e gerenciem seus baralhos. O aplicativo consome a API oficial do Pokemon TCG (https://docs.pokemontcg.io/#api_v1cards_list) para fornecer informações sobre as cartas disponíveis.

## :books: Funcionalidades

### Lista de Baralhos

- **Visualização:** Os usuários podem ver uma lista de seus baralhos existentes.
- **Criação:** Os usuários podem criar novo baralho.
- **Remoção:** Os usuários podem remover baralhos existentes.
- **Edição:** Os usuários podem editar os detalhes de um baralho existente.
- **Detalhes:** Os usuários podem clicar em um baralho para visualizar informações detalhadas.

### Criação de Baralho

- **Nome:** Os usuários podem dar um nome personalizado ao seu baralho.
- **Inserção de Cartas:** Os usuários podem adicionar cartas ao baralho.
- **Restrições:** Um baralho deve conter no mínimo 24 e no máximo 60 cartas. Não mais que 4 cartas com o mesmo nome são permitidas.
- **Salvamento:** Após salvar, o usuário é redirecionado para a página de lista de baralhos, que é atualizada.

### Detalhes do Baralho

- **Estatísticas:** Os usuários podem ver quantos Pokémons e cartas de treinador estão no baralho.
- **Tipos:** Os usuários podem visualizar quantos tipos únicos estão presentes no baralho.

## Interface do Usuário

A interface do usuário foi desenvolvida com foco na usabilidade e experiência visual agradável e houve a inclusão do modo Light/Dark.

## :wrench: Tecnologias utilizadas

✔ **[Angular](https://v16.angular.io/docs)**

✔ **[Tailwind CSS](https://tailwindcss.com/docs/guides/angular)**

✔ **[Flowbite](https://flowbite.com/docs/getting-started/angular/)**

## Arquitetura

O projeto foi desenvolvido na arquitetura MVC padrão recomendada pelo [Angular](https://v16.angular.io/docs), bem como com componentes _standalones_ (nova feature lançada no Angular 16). O gerenciamento de estado foi feito de forma reativa com o [RxJS](https://rxjs.dev/api) (lib de programação reativa integrada ao angular). Também, pensando na experiência do usuário, foi incluso o modo Light/Dark e resposividade, fazendo com que o app possa ser utilizado em diverso tipos de dispositivos.

## Ambiente de Desenvolvimento

O projeto foi desenvolvido no seguinte ambiente:

- **Node.js 16.15.1**
- **Angular CLI 16.1.8**

## Como Executar o Projeto Localmente

> Para isso você precis ter [Node, NPM](https://nodejs.org/en) e [Git](https://git-scm.com/) instalados.

1. Clone este repositório.

```sh
git clone https://github.com/Lucas-Lopes-II/pokemon-decks.git
```

2. Navegue até o diretório do projeto.
3. Execute `npm install` para instalar as dependências.

```sh
npm install
```

4. Execute `npm start` para iniciar o servidor de desenvolvimento.

```sh
npm start
```

5. Seu navegador irá abrir uma janela com: `http://localhost:4200/` onde a aplicação já estará dispinível para uso.

## Contato

[Linked-in](https://www.linkedin.com/in/lucas-lopes-840965190/)

[Email](mailto:lucas.santos.pessoal@outlook.com)
