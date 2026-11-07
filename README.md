# AdoptMe Project - Entrega Final Backend 🚀

Este proyecto corresponde al backend integrador final de la cursada, incorporando arquitecturas robustas en capas, generación modular de mocks, documentación OpenAPI interactiva y empaquetamiento contenedorizado mediante Docker.

## 🔗 Enlace Público a la Imagen de DockerHub
Puedes acceder y descargar la imagen oficial compilada del proyecto en el siguiente enlace:
👉 *https://hub.docker.com/repositories/kejoraku*

---

## 🛠️ Instrucciones para Construcción y Ejecución con Docker

### 1. Construir la Imagen de Forma Local
Si deseas compilar la imagen de manera local en tu máquina, posiciónate en la raíz del proyecto donde reside el `Dockerfile` y ejecuta:
```bash
docker build -t tu_docker_id/adoptme-project:1.0.0 .
```

### 2. Ejecutar el Contenedor
Levanta la instancia de la aplicación mapeando el puerto interno al host e inyectando tu URI de conexión real a MongoDB como variable de entorno:
```bash
docker run -d -p 8080:8080 -e PORT=8080 -e MONGO_URL="tu_uri_de_mongodb" --name adoptme_instance tu_docker_id/adoptme-project:1.0.0
```

### 3. Detener el Contenedor
```bash
docker stop adoptme_instance
```

---

## 🧪 Comandos de Testing Automatizado
Para ejecutar el banco de pruebas funcionales desarrollado sobre el ruteador de adopciones con Mocha y Supertest, corre el comando:
```bash
npm test
```
