---
title: "Cómo integré autenticación segura con JWT en un proyecto Node.js"
date: "2025-07-20"
author: "Gabriel Ramírez"
image: "/images/posts/jwt-authentication.png"
---

Uno de los elementos clave en cualquier aplicación web moderna es la autenticación. En este artículo explico cómo implementé un sistema de autenticación robusto utilizando JSON Web Tokens (JWT) en un proyecto con Node.js y Express.

## El problema de fondo

Cuando se trabaja con aplicaciones full stack, asegurar las rutas protegidas y garantizar que solo los usuarios autorizados accedan a ciertas funcionalidades es una prioridad. Para lograr esto, se requiere una estrategia eficiente y segura de autenticación y autorización.

## Tecnologías implementadas

- **Node.js + Express:** Backend con endpoints RESTful
- **MongoDB + Mongoose:** Base de datos y modelo de usuario
- **bcrypt:** Encriptación de contraseñas
- **jsonwebtoken (JWT):** Generación y verificación de tokens
- **Postman:** Pruebas de rutas protegidas

## Flujo de autenticación

1. El usuario se registra con sus datos y contraseña.
2. La contraseña se encripta con `bcrypt` antes de ser almacenada.
3. Al iniciar sesión, se valida la contraseña y se genera un JWT con datos esenciales del usuario.
4. El token se devuelve al cliente y se usa en cada solicitud a rutas protegidas, a través del header `Authorization`.
5. El backend verifica el token en cada ruta protegida antes de responder.

## Middleware de protección

Se desarrolló un middleware en Express que intercepta las peticiones a rutas protegidas y valida el JWT antes de permitir el acceso. Esto permite mantener el código modular y fácilmente reutilizable.

```js
function authMiddleware(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Acceso denegado" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token inválido" });
  }
}
```

---

Este sistema de autenticación con JWT respondió a la necesidad urgente de proteger rutas y datos sensibles en una aplicación Node.js, y terminó siendo un ejemplo concreto de cómo aplicar buenas prácticas en seguridad dentro del desarrollo backend. ¿Estás explorando soluciones similares o tienes tu propio enfoque de autenticación? ¡Será genial conocerlo!
