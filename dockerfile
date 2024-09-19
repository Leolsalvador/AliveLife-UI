# Etapa 1: Construir a aplicação
FROM node:16 as build

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Construir a aplicação
RUN npm run build

# Etapa 2: Servir a aplicação usando o servidor Apache
FROM httpd:2.4

# Copiar os arquivos de build da etapa anterior para o diretório Apache
COPY --from=build /app/build /usr/local/apache2/htdocs/

# Copiar o arquivo de configuração do Apache
COPY httpd.conf /usr/local/apache2/conf/httpd.conf

# Expor a porta que o contêiner irá escutar
EXPOSE 80

# Comando para rodar o servidor Apache
CMD ["httpd-foreground"]