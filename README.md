tire suas duvidas com nossa ia

# Let Me Ask

## Descrição
O Let Me Ask é uma plataforma para criação e gerenciamento de salas de perguntas e respostas em tempo real, ideal para eventos, workshops e aulas online. Permite que usuários criem salas, enviem perguntas e interajam de forma dinâmica.

## Tecnologias e Ferramentas Utilizadas
- Node.js
- TypeScript
- React
- Vite
- Drizzle ORM
- Docker
- PostgreSQL
- Day.js

## Instalação e Execução Local

### 1. Clone o repositório
```bash
git clone https://github.com/kariel-max/let-me-ask.git
cd let-me-ask
```

### 2. Instale as dependências
#### Backend
```bash
cd projetoNlw
npm install
```
#### Frontend
```bash
cd ../web
npm install
```

### 3. Configure o banco de dados
- Certifique-se de ter o Docker instalado.
- Execute o comando para subir o banco de dados:
```bash
cd ../projetoNlw
docker-compose up -d
```
- Rode as migrations e seeds se necessário.

### 4. Execute o Backend
```bash
cd projetoNlw
npm run dev
```

### 5. Execute o Frontend
```bash
cd ../web
npm run dev
```

Acesse o frontend em `http://localhost:5173` (ou porta configurada).

## Comandos Principais

### Backend
- `npm run dev` — inicia o servidor em modo desenvolvimento
- `npm run build` — gera build de produção
- `npm run start` — inicia o servidor em produção

### Frontend
- `npm run dev` — inicia o frontend em modo desenvolvimento
- `npm run build` — gera build de produção
- `npm run preview` — visualiza build de produção localmente

## Como Contribuir
1. Faça um fork do projeto
2. Crie uma branch para sua feature ou correção (`git checkout -b minha-feature`)
3. Commit suas alterações (`git commit -m 'feat: minha nova feature'`)
4. Faça push para a branch (`git push origin minha-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT.
