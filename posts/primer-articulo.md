---
title: "Cómo desarrollé mi sistema de asistencia automatizado con React, Node.js y MongoDB"
date: "2025-07-20"
author: "Gabriel Ramírez"
image: "/images/posts/sistema-asistencias.png"
---

Crear un sistema de asistencia automatizado representó uno de los mayores desafíos a nivel de desarrollo. Este artículo documenta cómo fue abordado este proyecto full stack, las herramientas utilizadas, los principales obstáculos superados y las lecciones aprendidas durante el proceso.

## El origen de la idea

Todo partió de una problemática real: en muchas instituciones educativas, el registro de asistencia continúa siendo manual, lo cual lo vuelve lento, propenso a errores y difícil de auditar. A partir de esa necesidad surgió la idea de construir una solución moderna, automatizada y accesible desde cualquier dispositivo.

## Tecnologías utilizadas

- **Frontend:** React + Vite + React Bootstrap
- **Backend:** Node.js + Express
- **Base de datos:** MongoDB
- **Autenticación:** Login con cédula y pin personalizado
- **Herramientas de apoyo:** Postman (testing), GitHub (control de versiones)

## Funcionalidades principales

- Inicio de sesión seguro mediante cédula y pin único.
- Registro automático de asistencia al iniciar sesión.
- Panel administrativo para gestionar usuarios y visualizar registros.
- Diseño responsive con interfaz moderna y accesible.
- Registros detallados por usuario, fecha y hora.

## Arquitectura del sistema

El proyecto sigue el patrón **MVC (Modelo - Vista - Controlador)**. El backend gestiona la lógica del sistema, conecta con la base de datos y protege rutas mediante JWT. El frontend consume las APIs para presentar la información en tiempo real con una interfaz clara y funcional.

## Fase de pruebas

Antes de conectar la interfaz gráfica, se realizaron pruebas exhaustivas con Postman para validar el correcto funcionamiento de cada endpoint. Esto permitió detectar y corregir errores tempranamente, optimizando el flujo de desarrollo.

## Interfaz y diseño

Se buscó crear una interfaz visualmente potente: paleta oscura con detalles brillantes, tarjetas estilizadas, bordes suaves y tipografía moderna. El objetivo fue ofrecer no solo funcionalidad, sino también una experiencia profesional y atractiva.

## Lecciones aprendidas

- Planificación y estructuración de un proyecto full stack desde cero.
- Validación de datos y protección de rutas usando JWT.
- Aplicación práctica de principios UI/UX.
- Documentación, organización y despliegue de un proyecto completo.

---

Este sistema de asistencia automatizado resolvió una necesidad concreta y además se convirtió en una muestra tangible de lo que puede lograrse como desarrollador. ¿Estás trabajando en un sistema similar o te gustaría compartir tu experiencia? ¡Será un gusto leerla!
