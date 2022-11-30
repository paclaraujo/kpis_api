# KPIS_API

![GitHub repo size](https://img.shields.io/github/repo-size/iuricode/README-template?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/iuricode/README-template?style=for-the-badge)

> Api de validação de email de usuários pré cadastrados e gerador de reports referentes ao headcount e turnover atrelados aos liderados diretos e indiretos de cada usuário cadastrado.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [x] Rota POST de validação de usuários por email
- [x] Rota GET de busca de reports
- [ ] Deploy
- [ ] Injeção de dependências
- [ ] Testes de integração

## 💻 Pré-requisitos

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/en/)

## 🚀 Rodando a KPIS_API

Para instalar a KPIS_API, siga estas etapas:

1. Instale as dependências do repositório:

```
npm install
```

2. Crie o arquivo .env com as variáveis de ambiente existente no arquivo .env.example

3. Para subir o banco de dados:

```
sudo docker-compose up
```

4. Para rodar api local:

```
npm run dev
```

5. Para inserir os dados necessários no banco:

```
npm run migrate
```

## Documentação de rotas

As rotas existente foram documentadas no arquivo kpis_docs.yaml e é possível visualizar a documentação usando postman ou insomnia ao importar esse arquivo.

## Tecnologias utilizadas

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
