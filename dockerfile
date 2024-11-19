# Etapa 1: Construir a aplicação React
FROM node:16 as build

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Construir a aplicação React
RUN npm run build

# Etapa 2: Servir a aplicação usando o servidor Nginx
FROM nginx:alpine

# Remover o arquivo de configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar o arquivo de build da aplicação React para o diretório padrão do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar o novo arquivo de configuração do Nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80 para acessar o servidor
EXPOSE 80

# Comando para rodar o Nginx no primeiro plano
CMD ["nginx", "-g", "daemon off;"]
