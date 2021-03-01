#Passo 1 - Configurar banco de dados
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "mysql",
    "database": "conexia"
P.S.: Se preferir, basta alterar o arquivo ormconfig.json para ajustes personalizados

#Passo 2 Instalar dependencias
> npm install

#Passo 3 - Rodar Migrations 
> npm run migrations:run

#Passo 4 - Iniciar Servidor
> npm run dev:server;


TODO: 
>Passar chaves etc para variaveis de ambiente

>Salvar Notas

>Recomendar Musicas