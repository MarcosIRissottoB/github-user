# Github User Finder

Este es un proyecto que permite buscar y visualizar información sobre usuarios de Github. La aplicación utiliza la **API de Github** para obtener datos relacionados con usuarios, sus repositorios y otra información relevante. Este proyecto fue creado utilizando **Next.js** y está diseñado para proporcionar una experiencia rápida y amigable.

---

## **Requisitos**

Antes de comenzar, asegúrate de que tu entorno cumple con los siguientes requisitos:

- Node.js versión `>= 18`
- npm versión `>= 8`
- Una conexión activa a Internet (para consumir la API de Github)

---

## **Instalación**

Para configurar el proyecto localmente, sigue estos pasos:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/MarcosIRissottoB/github-user.git
   cd github-user
   ```

2. **Instala las dependencias**:  
   Ejecuta el siguiente comando para instalar todas las dependencias necesarias:
   ```bash
   npm install
   ```

3. **Ejecuta el entorno de desarrollo**:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en `http://localhost:3000` para ver el proyecto en ejecución.

---

## **Cómo usar las funcionalidades**

### **Buscar un usuario**
1. Ingresa el nombre de usuario en el formulario de búsqueda.
2. Presiona el botón de búsqueda para obtener toda la información disponible de ese usuario.

### **Ver detalles del usuario**
- Haz clic en el nombre de usuario para visualizar información adicional como:
    - Avatar
    - Repositorios públicos

### **Explorar repositorios**
- Una vez dentro del perfil del usuario, se muestran todos sus repositorios públicos con enlaces directos a Github.

---

## **Tecnologías utilizadas**

Este proyecto utiliza las siguientes tecnologías y bibliotecas:

- **Frontend:**}
    - [Next.js](https://nextjs.org/) (v15.1.6)
    - Typescript https://www.typescriptlang.org/
    - Etc.
- **Estilo y diseño:**
    - CSS Modules

- **Testing:**
    - [Jest](https://jestjs.io/) (v29.7)
    - [Testing Library](https://testing-library.com/) (React, DOM, y User Event)

- **Linter y formato:**
    - ESLint
    - Prettier
    - Husky y lint-staged

- **Backend (API Consumption):**
    - [Axios](https://axios-http.com/) (para solicitudes HTTP).

---

## **Estructura del proyecto**

La estructura de carpetas está organizada para mantener el proyecto limpio y escalable. A continuación, una breve descripción:

```plaintext
src/
├── components/    # Componentes reutilizables como botones y formularios
├── pages/         # Páginas principales de la aplicación
│   ├── index.tsx      # Página principal (búsqueda)
│   ├── users/         # Directorio para rutas físicas
│       └── UserDetailPage.tsx # Detalle del usuario
├── styles/        # Archivos de estilos (CSS Modules)
├── utils/         # Utilidades y funciones de ayuda (como validación de datos)
├── types/         # Tipos globales (TypeScript)
├── hooks/         # Hooks personalizados adicionales (si corresponde)
├── __tests__/     # Archivos y configuraciones para pruebas unitarias
```

---

## **Pruebas y calidad de código**

### Ejecutar los linters y formateadores:
```bash
npm run lint
npm run lint:fix
npm run format
```

### Ejecutar las pruebas:
```bash
npm run test
```
Esto ejecuta todas las pruebas configuradas con **Jest** y Testing Library.

---

## **Contribuciones**

Este proyecto está abierto a contribuciones. Si deseas colaborar, crea un pull request o abre un issue describiendo tu propuesta de mejora.

---

## **Licencia**

Este proyecto se encuentra bajo la licencia [MIT](https://opensource.org/licenses/MIT). 