`<div align="center" style="padding: 15px;">`
  `<img alt="Seidor" title="Seidor" src="https://www.seidorbrasil.com.br/Content/assets/img/logo-default.png" width="200px" />`

</div>

<p align="center"><i>Imagem feita pela <a href="https://www.seidor.com.br/content/seidor-latam-br/pt.html">Seidor</a></i></p>

<h3 align="center">Código desenvolvido para a vaga de backend na Seidor 💻</h3>

# RESUMO

API desenvolvida em Node.JS como parte do teste para pleitear a vaga de desenvolvedor *backend* na `<a href="https://www.seidor.com.br/content/seidor-latam-br/pt.html">`Seidor`</a>`

Para visualizar os requisitos, acesso o arquivo TESTE.md, clicando aqui.

# ÍNDICE

- [Instalação](#instalação)
  - [Clonando o repositório](#clonando-o-repositório)
  - [*Download* de dependências](#download-de-dependências)
  - [Configuração das variáveis ambientes](#configuração-das-variáveis-ambientes)
- [Testes](#testes)
- [Projeto](#projeto)
  - [Executar o servidor](#executar-o-servidor)
  - [Parte 1 - Automóveis](#parte-1---automóveis)
    - [Cadastro de automóvel](#cadastro-de-automóvel)
    - [Atualização de automóvel](#atualização-de-automóvel)
    - [Buscar apenas um automóvel](#buscar-apenas-um-automóvel)
    - [Buscar todos os automóvel](#buscar-todos-os-automóveis)
    - [Excluir um automóvel](#excluir-um-automóvel)
  - [Parte 2 - Motorista](#parte-2---motorista)
    - [Cadastrar um motorista](#cadastro-do-motorista)
    - [Atualização de um motorista](#atualização-do-motorista)
    - [Exclusão de um motorista](#exclusão-do-motorista)
    - [Listagem de um motorista específico](#listagem-de-motorista-específico)
    - [Listagem filtrada ou geral](#listagem-filtrada-ou-geral)
  - [Parte 3 - Alocação](#parte-3---alocação)
    - [Associar um motorista com um automóvel](#associar-um-motoritsta-com-um-automóvel)
    - [Atualizar a alocação](#atualizar-a-alocação)
    - [Listar alocações](#listar-alocações)
- [Contribuição](#contribuição)
- [Dúvidas](#dúvidas)

# Instalação

## Clonando o repositório

Existem duas maneiras de realizar o clone de um repositório, sendo elas: **SSH** e **HTTPS**.

Para clonar utilizando **SSH**, utilize o seguinte comando:

```bash
git@github.com:gaabMatias/automobile-use.gitMONGO_URL
```

Para clonar utilizando **HTTPS**, utilize o seguinte comando:

```bash
https://github.com/gaabMatias/automobile-use.git 
```

## *Download* de dependências

Após o clone do repositório, é necessário realizar o *download* das dependências que foram utilizadas nesse projeto.

Para efetuar o *download*, usando yarn, utilize do seguinte comando:

```bash
yarn
```

Para efetuar o *download*, usando npm, utilize do seguinte comando:

```bash
npm install
```

## Configuração das variáveis ambientes

Para configurar as variáveis ambientes, deve-se criar o arquivo `.env`, copiar as informações contidas
no arquivo `.env.example` e colar no arquivo recém-criado. Após isso, os dados do arquivo gerado devem ser preenchidos.

Neste projeto, contém as seguintes variáveis de ambiente:

- A URI do banco, MONGO_URL

# Testes

O seguinte projeto foi construído utilizando-se da metodologia TDD(*Test Driven Development*).

Para rodar os testes, com yarn, execute o seguinte comando no seu *console*:

```bash
yarn test
```

Para rodar os testes, com npm, execute o seguinte comando no seu *console*:

```bash
npm run test
```

# Projeto

O projeto foi desenvolvido por partes, para garantir que todos os requisitos fosse atendidos.

## Executar o servidor

Para iniciar o servidor, usando yarn, utilize do seguinte comando:

```bash
yarn dev
```

Para iniciar o servidor, usando npm, utilize do seguinte comando:

```bash
npm run dev
```

## Parte 1 - Automóveis

Na parte de automóveis, é possível realizar um CRUD.

### Cadastro do automóvel

Segue abaixo as informações da rota de cadastro de um automóvel.

| Rota autenticada? | Método da rota | Nome da rota | Parâmetros (Request Body)                                                                                                                                                                          | Retorno                                 |
| :---------------: | :-------------: | :----------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- |
|       Não       |      POST      | /car/create | 1 - licensePlate: String, que representa a placa do veículo `<br>` 2 - color: String, que representa a cor do veículo `<br>` 3 - brand: String, que representa a marca do veículo. `<br>` | Um objeto contendo os dados do veículo |

### Atualização do automóvel

Segue abaixo as informações da rota de atualização de um automóvel.

| Rota autenticada? | Método da rota | Nome da rota | Parâmetros (Request Body)                                                                                                                                                                                             | Retorno                                   |
| :---------------: | :-------------: | :----------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------- |
|       Não       |       PUT       | /car/update | 1 - id: String e obrigatório, que representa o identificador unico do carro `<br>  `2 - color: String e opcional, representa a cor do carro<br />`<br>  `3- brand: String e opcional, representa a marca do carro | Um objeto contendo os dados do automóvel |

### Buscar apenas um automóvel

Segue abaixo as informações da rota de buscar apenas um automóvel.

| Rota autenticada? | Método da rota | Nome da rota | Parâmetros (Request Params)                                                          | Retorno                                   |
| :---------------: | :-------------: | :----------: | :------------------------------------------------------------------------------------ | :---------------------------------------- |
|       Não       |       GET       |   /car/:id   | 1 - id: String e obrigatório, que representa o identificador unico do carro `<br>` | Um objeto contendo os dados do automóvel |

### Buscar todos os automóveis ou filtrado

Segue abaixo as informações da rota de buscar todos os automóveis ou realizar uma busca filtrada.

| Rota autenticada? | Método da rota | Nome da rota | Parâmetros (Request Params)                                                                               | Retorno                                                                        |
| :---------------: | :-------------: | :----------: | :--------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
|       Não       |       GET       |  /car/list  | 1 - color: string e opcional, brand: string e opcional se não forem informados retornará todos `<br>` | Um array de objetos com os dados dos automóveis já cadastrado na aplicação |

### Excluir um automóvel

Segue abaixo as informações da rota de exclusão de um automóvel.

| Rota autenticada? | Método da rota | Nome da rota | Parâmetros (Request Params)                                                                                             | Retorno                                   |
| :---------------: | :-------------: | :----------: | :----------------------------------------------------------------------------------------------------------------------- | :---------------------------------------- |
|       Não       |     DELETE     |   /car/:id   | 1 -id: String e obrigatório, que representa o identificador unico do carroque representa a placa do automóvel `<br>` | Um objeto contendo os dados do automóvel |

## Parte 2 - Motorista

Na parte do motorista, é possível realizar um CRUD.

### Cadastro do motorista

Segue abaixo as informações da rota de cadastro de um motorista.

| Rota autenticada? | Método da rota |  Nome da rota  | Parâmetros (Request Params)                                                 | Retorno                                  |
| :---------------: | :-------------: | :------------: | :--------------------------------------------------------------------------- | :--------------------------------------- |
|       Não       |      POST      | /driver/create | 1 - name: string e obrigatório, que representa o nome do motorista `<br>` | Um objeto contendo os dados do motorista |

### Atualização do motorista

Segue abaixo as informações da rota de atualização de um motorista.

| Rota autenticada? | Método da rota | Nome da rota | Parâmetros (Request Params)                                                                                                                                                       | Retorno                                  |
| :---------------: | :-------------: | :----------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
|       Não       |       PUT       | /driver/:id | 1 - id: String e obrigatório, que representa o ID no banco `<br>` 2 - name: string e obrigatório, que representa o nome do motorista<br /> `(passado por request body) <br>` | Um objeto contendo os dados do motorista |

### Exclusão do motorista

Segue abaixo as informações da rota de exclusão de um motorista.

| Rota autenticada? | Método da rota | Nome da rota | Parâmetros (Request Params)                                         | Retorno                                  |
| :---------------: | :-------------: | :----------: | :------------------------------------------------------------------- | :--------------------------------------- |
|       Não       |     DELETE     | /driver/:id | 1 - id: String e obrigatório, que representa o ID no banco `<br>` | Um objeto contendo os dados do motorista |

### Listagem de motorista específico

Segue abaixo as informações da rota de exclusão de um motorista.

| Rota autenticada? | Método da rota | Nome da rota | Parâmetros (Request Params)                                         | Retorno                                  |
| :---------------: | :-------------: | :----------: | :------------------------------------------------------------------- | :--------------------------------------- |
|       Não       |       GET       | /driver/:id | 1 - id: String e obrigatório, que representa o ID no banco `<br>` | Um objeto contendo os dados do motorista |

### Listagem filtrada ou geral

Segue abaixo as informações da rota de exclusão de um motorista.

| Rota autenticada? | Método da rota | Nome da rota | Parâmetros (Request Body)  | Retorno                                  |
| :---------------: | :-------------: | :----------: | :-------------------------- | :--------------------------------------- |
|       Não       |       GET       |   /driver   | 1 - name: string e opcional | Um objeto contendo os dados do motorista |

## Parte 3 - Utilização de um automóvel

Na parte de utilização de um automóvel, é possível associar um motorista com um automóvel.

### Associar um motorista com um automóvel

Segue abaixo as informações da rota de exclusão de um motorista.

| Rota autenticada? | Método da rota |  Nome da rota  | Parâmetros (Request Params)                                                                                                                                                                                                               | Retorno                                   |
| :---------------: | :-------------: | :------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------- |
|       Não       |      POST      | car-use/create | 1 - driverId: String e obrigatório, se refere ao id de um motorista.`<br>` 2 - carId: String e obrigatório, se refere ao id unico do automóvel.`<br>` 3 - reason: String e obrigatório, se refere ao motivo da alocação.`<br>` | Um objeto contendo os dados da alocação |

### Atualizar a alocação

Segue abaixo as informações da rota de atualização de uma alocação para representar o fim da mesma.

| Rota autenticada? | Método da rota |  Nome da rota  | Parâmetros (Request Params)                                                  | Retorno                                   |
| :---------------: | :-------------: | :-------------: | :---------------------------------------------------------------------------- | :---------------------------------------- |
|       Não       |      POST      | /car-use/finish | 1 - driverId: String e obrigatório, se refere ao id de um motorista.`<br>` | Um objeto contendo os dados da alocação |

### Listar alocações

Segue abaixo as informações da rota de atualização de uma alocação para representar o fim da mesma.

| Rota autenticada? | Método da rota | Nome da rota | Retorno                                          |  |
| :---------------: | :-------------: | :----------: | :----------------------------------------------- | :- |
|       Não       |       GET       | car-use/list | Um objeto contendo os dados de todas alocações |  |

## Contribuição

Pull requests serão sempre bem-vindas. Para grandes mudanças, crie uma issue para discurtimos o que você gostaria de mudar.

PS: Não se esqueça de atualizar os testes. 😉

## Dúvidas

Qualquer dúvida em relação ao projeto, crie uma issue ou mande um e-mail para gabrielmatias0202@gmail.com, ou entre em contato pelo WhatsApp.
