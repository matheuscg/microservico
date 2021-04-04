# Microservices Architecture / Api / Containers
Repositorio do trabalho final para a disciplina Microservices Architecture / Api / Containers do curso [DevOps Enginnering](https://www.fiap.com.br/mba/mba-em-devops-engineering-integration-architecture);

## Grupo

| Integrante        | RM        |
|-------------------|-----------|
| Ingrid Silva Sampaio | 339235 |
| Kirmayr Roberto Tomaz Costa | 337016 |
| Matheus Cintra Gonçalves | 338893 |
| Pedro Miranda Santos Bueno dos Reis | 338209 |

## Descrição

O problema escolhido para o trabalho foi o Caso do Netflix, que contem os seguintes requisitos:

* Possibilidade de visualizar os filmes de um determinado gênero;
* Possibilidade de visualizar os detalhes de cada filme;
* Possibilidade de votar nos filmes que mais gostei;
* Possibilidade de marcar um filme ou série para ser visto no futuro;
* Possibilidade de buscar um filme por palavra-chave;
* Possibilidade de exibir os filmes mais vistos por categorias;
* Possibilidade de abrir um chamado técnico de algum problema que está acontecendo;
* Possibilidade de visualizar os filmes e séries que já foram assistidos;

## Arquitetura

TODO: DESENHO ARQUITETURA

## Rodar projeto

O projeto foi construido e projetado para rodar em um ambiente containerizado, para isso foi construido um [docker-compose.yaml](docker-compose.yaml). Para subir os micro serviços, basta rodar:

```
$ docker-compose up -d
```

A primeira vez vai fazer os build de todas as aplicações, esse processo deve demorar alguns minutos. Conselho de amigo: dispare o comando e vá buscar um café ☕☕.

## Funcionalidades

Essa seção explica/exemplifica como testar/executar as funcionalidades do projeto.

### Listar todos os gêneros

```
$ curl http://localhost:4000/movies/v1/categories
```

### Consultar filme por gênero

```
$ curl http://localhost:4000/movies
```

### Consultar filme especifico

```
$ curl http://localhost:4000/movies
```

### Consultar votar em filme

```
$ curl http://localhost:4000/movies
```

### Salvar um filme para mais tarde

```
$ curl http://localhost:4000/movies
```

### Consultar filme por palavra chave

```
$ curl http://localhost:4000/movies
```

### Listar filmes mais visto por gênero

```
$ curl http://localhost:4000/movies
```

### Abrir um ticket de supporte

```
$ curl --location --request POST 'localhost:4000/support/api/v1/support/ticket' \
--header 'Content-Type: application/json' \
--data-raw '{
    "iduser": 1,
    "description": "não consigo visualizar nenhum filme no catalogo"
}'
```

### Consultar tickets

```
$ curl --location --request GET 'localhost:4000/support/api/v1/support/ticket'
```

### Consultar filmes assistidos por um usuário especifico

```
$ curl http://localhost:4000/movies
```