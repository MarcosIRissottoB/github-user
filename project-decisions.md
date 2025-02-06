# Project Decisions

Este documento detalla las decisiones técnicas y de arquitectura tomadas durante el desarrollo del proyecto.

---

## **Decisiones tomadas**

1. **Uso de Next.js**

- Se seleccionó Next.js para aprovechar su optimización de rendimiento, generación de rutas automáticas y capacidad de SSR/SSG. Esto le brindó flexibilidad al proyecto para adaptarse a distintos casos de uso.

2. **Tecnologías de pruebas**

- Se eligieron **Jest** y **Testing Library** por su simplicidad y soporte activo para pruebas de React. Estas herramientas facilitaron la validación de los componentes y el comportamiento del usuario.

3. **Uso de Axios**

- En lugar de `fetch`, se decidió usar **Axios** por su manejo más ordenado y su soporte para interceptores, lo cual simplificó la gestión de errores y escalabilidad de las solicitudes HTTP.

4. **Integración de ESLint y Prettier**

- Se configuraron ESLint y Prettier para mantener uniformidad del código, prevenir errores y mejorar el formato automáticamente durante el flujo de trabajo.

---

## **Estructura del Proyecto**

- Se utilizó **Next.js** como framework principal.
- Para la configuración inicial se incluyeron:
  - ESLint y Prettier con reglas personalizadas.
  - Husky y lint-staged para hooks de pre-commit.
- La arquitectura del proyecto se desarrolló incrementalmente, comenzando con un enfoque sencillo y agregando complejidad progresivamente.

---

## **Nomenclatura de Ramas**

- **chore/**: Para tareas de configuración o mantenimiento (e.g., chore/setup-eslint).
- **feat/**: Para nuevas funcionalidades (e.g., feat/user-fetching).

---

## **Fetching de Datos**

### Implementación inicial

- En las primeras etapas se realizó el fetching directamente en la página (`pages/index.tsx`) para probar rápidamente el flujo básico de la aplicación.
- Luego se utilizó **Axios** para las solicitudes HTTP, migro la logica a custom hook, servicios y la api interna de Next.js.

### Refactor posterior

- La lógica de fetching fue migrada a hooks, servicios y la API interna de Next.js.
- Se agregó un adaptador para **Axios** con el objetivo de desacoplarlo la dependencia y facilitar cambios futuros.

---

## **Manejo de Estado**

- Inicialmente, el estado (como favoritos) se gestionó directamente dentro de los componentes, específicamente en la página correspondiente.
- Posteriormente:
  - Parte de la lógica se trasladó a **custom hooks** para mayor reusabilidad.
  - Finalmente, el estado global fue movido a un **Context**, facilitando el acceso consistente a los datos en componentes separados.

---

## **Uso de Constantes y Variables de Entorno**

- Para evitar strings mágicos, se definieron constantes reutilizables:

  ```typescript
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.github.com';
  const ENDPOINT_USERS = '/users';
  ```

- Se creó un archivo `.env.example` para simplificar la configuración inicial:

  ```env
  NEXT_PUBLIC_API_BASE_URL=https://api.github.com
  ```

---

## **Lógica de Favoritos**

- Implementación inicial:

  - Los favoritos se gestionaron mediante un array en el estado de los componentes.
  - Se habilitó un botón que permitía agregar y eliminar usuarios de favoritos.

- Refactor posterior:
  - La lógica fue movida a un **hook personalizado** para facilitar su reutilización en distintas partes del proyecto.

---

## **Manejo de Rutas**

- Se implementó **CSR (Client-Side Rendering)** en la página principal (Home).
- Para la página de detalle del usuario, se utilizó **SSR (Server-Side Rendering)**, optimizando la carga inicial y mejorando el SEO.

---

## **Páginas y Navegación**

- Página inicial `/`:
  - Muestra una lista de usuarios con su información básica. La página utiliza CSR.
- Página de detalle `/users/[id]`:
  - Esta página muestra información ampliada de un usuario específico, como el avatar, repositorios y seguidores. Utiliza SSR.

---

## **Configuración de Estilos**

- Se definieron y utilizaron variables CSS para temas, tamaños y estilos globales en todo el proyecto.
- Los estilos se modularizaron en la carpeta `src/styles/` para facilitar su mantenimiento y evitar conflictos entre ellos.

---

Estas decisiones lograron mantener un balance entre simplicidad y escalabilidad, priorizando la entrega incremental de funcionalidades y permitiendo pruebas rápidas durante el desarrollo.
