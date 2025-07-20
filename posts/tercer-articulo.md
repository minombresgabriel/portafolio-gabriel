---
title: "Cómo crear un Modal Reutilizable con React y TailwindCSS"
date: "2025-07-20"
author: "Gabriel Ramírez"
image: "/images/posts/react-modal.png"
---

En muchas interfaces modernas, los modales son esenciales para mostrar información sin redirigir al usuario a otra página. En este artículo te muestro cómo desarrollé un modal completamente reutilizable usando **React** y **TailwindCSS**.

## ¿Por qué usar un modal reutilizable?

Los modales son componentes que aparecen encima del contenido principal y sirven para mostrar alertas, formularios, confirmaciones o detalles. Si no se manejan correctamente, pueden generar duplicación de código o errores de accesibilidad.

Por eso, creé un componente modal que se puede usar fácilmente en cualquier parte del proyecto simplemente llamándolo con props.

## Componentes usados

- `Modal.tsx`: El componente base
- `useState`: Para controlar su visibilidad
- `React Portal` (opcional): Para montar el modal fuera del flujo normal del DOM

---

Este componente de modal reutilizable surgió como respuesta a la necesidad de crear interfaces más limpias y consistentes, y terminó convirtiéndose en una muestra clara de cómo React y TailwindCSS pueden potenciar la eficiencia en el desarrollo front-end. ¿Has creado algo parecido o estás pensando en integrar un modal personalizado en tu proyecto? ¡Me encantaría conocer tu enfoque!
