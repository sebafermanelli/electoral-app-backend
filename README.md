# Documentación electoral-app-backend

## Version
1.0.0

## Instalación
1. Clona este repositorio.
2. Ejecuta el siguiente comando para instalar las dependencias:
```bash
npm install
```
3. Inicializar la base de datos mediante docker-compose:
```bash
docker-compose build
```
4. Correr la base de datos mediante docker-compose:
```bash
docker-compose up
```

## Uso
### Modo de Desarrollo
Ejecuta el siguiente comando para iniciar la aplicación en modo de desarrollo:
```bash
npm run dev
```

### Modo de Produccion
Ejecuta el siguiente comando para iniciar la aplicación en modo local:
```bash
npm start
```
o sino el siguiente comando para utilizar `.production.env`:
```bash
npm run start:prod
```


### Modo de Produccion con Docker
Ejecuta el siguiente comando para iniciar la aplicación en modo de produccion con Docker:
```bash
docker build --no-cache --progress=plain -t electoral-app-backend .
```

```bash
docker run -it -p 8000:8000 electoral-app-backend
```

## Reportar Problemas
Si encuentras algún problema o tienes alguna sugerencia, por favor [crea un issue](https://github.com/sebafermanelli/vote-app-backend/issues).
