# Social Network (Client)

Esta es la aplicación de web de una "red social" (**esto fue hecho con fines prácticos y no esta destinado para ir a producción**). Para su funcionamiento [se utiliza la siguiente API](https://github.com/Yumiko0828/social-network-api).

Para la creación de esta aplicación se utilizaron las siguientes tecnologías: [Axios](https://axios-http.com/), [SWR](https://swr.vercel.app/), [TailwindCSS](), [Vite](https://vitejs.dev/) con [React](https://react.dev/), [Gravatar](https://gravatar.com/) y [Timeago.js](https://www.npmjs.com/package/timeago.js/v/4.0.0-beta.3)

> Nota: La API fue adaptada para que funcionara específicamente con esta Web, pero incluye algunas prácticas que no recomendaría hacer en una aplicación, como enviar datos sencibles (**emails**).

## Tabla de contenido

- [Vista previa](#vista-previa)
- [Configuración](#configuración)
- [Inicialización](#inicialización)

## Vista previa

![Example 1](https://raw.githubusercontent.com/Yumiko0828/social-network-client/main/docs/example1.png)
![Example 2](https://raw.githubusercontent.com/Yumiko0828/social-network-client/main/docs/example2.png)
![Example 3](https://raw.githubusercontent.com/Yumiko0828/social-network-client/main/docs/example3.png)

## Configuración

Para que el proyecto funcione correctamente, debemos pasarle la dirección de la API (URL) en una variable de entorno. Para eso copiaremos el contenido dentro de `.env.example` en un nuevo archivo `.env` o `.env.local`.

```toml
VITE_API_URL="http://localhost:3000"
```

Usted deberá reemplazar ese valor por la URL en donde se encuentre el [Backend](https://github.com/Yumiko0828/social-network-api).

## Inicialización

Ya con las variables de entorno configuradas, solo queda instalar las dependencias y iniciar el servidor.

Recuerda que eres libre de usar tu gestor de paquetes de preferencia (Yarn, pnpm, etc).

### Instalar dependencias

```bash
npm install
```

### Iniciar el servidor

```bash
npm run dev
```

Esto abrirá un servidor web en el puerto `3001`.
