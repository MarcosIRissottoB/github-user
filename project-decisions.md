# Decisiones Tomadas en el Proyecto

## 1. Estructura Inicial del Proyecto

- Se utiliza **Next.js** como framework principal.
- Configuración inicial realizada:
    - ESLint y Prettier con reglas personalizadas.
    - Husky y lint-staged para hooks de pre-commit.
- La arquitectura se desarrolla incrementalmente, comenzando con un enfoque sencillo y agregando complejidad de manera
  progresiva.

## 2. Nomenclatura de Ramas

- **chore/**: Para tareas de configuración o mantenimiento (e.g., chore/setup-eslint).
- **feat/**: Para nuevas funcionalidades (e.g., feat/user-fetching).

## 3. Fetching de Datos

### Etapa Inicial

- Se realiza el fetching directamente en la página (`pages/index.tsx`) para probar rápidamente el flujo básico.
- Se utiliza **Axios** para las solicitudes HTTP.

### Refactorización Incremental

- La lógica de fetching se moverá a:
  Refactor 1. Un custom hook (`useFetchUsers`) para modularizar el código.
  Refactor 2. Un servicio en la capa de infraestructura (`src/services/userService.ts`) para manejar la lógica de API.
  Refactor 3. Finalmente, integrar la lógica con SWR para mejorar la gestión de datos.

## 4. Manejo de Estado

- Inicialmente, el estado (e.g., favoritos) se gestiona directamente en el componente page.
- En etapas posteriores, el estado se moverá a:
    - Custom hooks para lógica específica.
    - Posiblemente, una herramienta de manejo de estado global si la complejidad lo requiere (e.g., Context o Zustand).

## 5. Uso de Constantes y Variables de Entorno

- Se utilizan constantes para evitar strings mágicos:
  ```typescript
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.github.com';
  const ENDPOINT_USERS = '/users';
  ```
- Archivo `.env.example` creado para facilitar la configuración inicial:
  ```env
  NEXT_PUBLIC_API_BASE_URL=https://api.github.com
  ```

## 6. Lógica de Favoritos

- Implementación inicial:
    - Los favoritos se gestionan como un array en el estado del componente.
    - Un botón permite agregar y eliminar usuarios de favoritos.
- Refactor futuro:
    - Mover la lógica de favoritos a un hook específico o al dominio.

## 7. Manejo de Rutas

- Se utiliza CSR (Client-Side Rendering) en el Home.
- Posteriormente, se implementará SSR (Server-Side Rendering) en páginas como el detalle del usuario.

## 8. Páginas y Navegación

- Página inicial: `/` muestra una lista de usuarios, utiliza CSR.
- Página de detalle: `/user/[id]` mostrará información detallada de un usuario específico.
    - Se utilizará SSR para esta página.

## 9. Configuración de Estilos

- Se definirán variables CSS para temas, tamaños, y estilos globales.
- Los estilos se modularizan en `src/styles/`.

## 10. Decisiones sobre Patrones de Diseño

- **Custom Hooks**: Para lógica de fetching, manejo de estado, etc.
- **Separación por capas** (incremental):
    - UI: Componentes reutilizables.
    - Dominio: Lógica de negocio, validaciones.
    - Infraestructura: Interacciones con APIs y servicios externos.

## Próximos Pasos

1. Mover la lógica de fetching a un custom hook (`useFetchUsers`).
2. Implementar la funcionalidad de favoritos.
3. Crear la página de detalles de usuario.
4. Refactorizar el código en capas (UI, dominio, infraestructura).
5. Integrar SWR para optimizar el fetching de datos.
6. Configurar estilos globales y tema.

Estas decisiones buscan mantener un balance entre simplicidad y escalabilidad, priorizando la entrega incremental y
pruebas rápidas de funcionalidad.

