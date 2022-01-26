# Como executar o aplicativo.

- Certifique-se de ter o docker instalado na máquina local
- execute `docker-compose-up`
- verifique se o servidor flask está ativo indo para `http://localhost:5000/api`
- Navegue até `http://localhost:3000/` no navegador.

# Observação

Se você ver isso:

```
npm ERR! UpScore@0.6.0 start: `react-scripts start`
npm ERR! gerar ENOENT
```

Significa apenas que algo deu errado quando as dependências foram instaladas pela primeira vez.

Sugiro fazer estes três passos no docker file do client:

- `npm install -g npm@latest` para atualizar o npm porque às vezes tem bugs.
- `rm -rf node_modules` para remover os módulos existentes.
- `npm install` para reinstalar as dependências do projeto.
