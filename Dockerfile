# Establece la imagen base
FROM node:14

# Crea el directorio de la aplicación en el contenedor
WORKDIR /usr/src/app

# Copia los archivos del paquete y el bloqueo del paquete
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Expone el puerto que tu aplicación utilizará
EXPOSE 3000

# Ejecuta tu aplicación
CMD [ "npm", "start" ]
