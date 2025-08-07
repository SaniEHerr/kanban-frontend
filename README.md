# Kanban Frontend

Una aplicación de tablero Kanban moderna construida con React, TypeScript y Vite.

## 🚀 Características

- **Drag & Drop**: Interfaz intuitiva para arrastrar y soltar tarjetas
- **Tiempo Real**: Sincronización en tiempo real con Socket.IO
- **Autenticación**: Sistema de login y registro (futura feature)
- **UI Moderna**: Diseño responsive con Tailwind CSS
- **TypeScript**: Código tipado para mayor robustez
- **React Query**: Gestión de estado del servidor

## 📋 Prerrequisitos

- **Node.js**: Versión 18.20.5 o superior
- **Yarn**: Gestor de paquetes (recomendado) o npm

## 🛠️ Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd kanban-frontend
   ```

2. **Instala las dependencias**
   ```bash
   yarn install
   # o
   npm install
   ```

3. **Configura las variables de entorno**
   
   Crea un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_SOCKET_URL=http://localhost:3000
   ```

## 🎯 Scripts Disponibles

- **Desarrollo**: `yarn dev` - Inicia el servidor de desarrollo
- **Build**: `yarn build` - Construye la aplicación para producción
- **Preview**: `yarn preview` - Previsualiza la build de producción
- **Lint**: `yarn lint` - Ejecuta el linter

## 🏃‍♂️ Ejecutar el Proyecto

1. **Modo desarrollo**
   ```bash
   yarn dev
   ```
   
   La aplicación estará disponible en `http://localhost:5173`

2. **Modo producción**
   ```bash
   yarn build
   yarn preview
   ```

## 🏗️ Estructura del Proyecto

```
src/
├── api/                 # Configuración de API
├── assets/             # Imágenes y recursos estáticos
├── components/         # Componentes reutilizables
├── layout/            # Layouts de la aplicación
├── modules/           # Módulos principales
│   ├── auth/          # Autenticación
│   ├── core/          # Componentes base
│   └── kanban/        # Funcionalidad del tablero
├── routes/            # Configuración de rutas
├── screens/           # Páginas de la aplicación
└── services/          # Servicios
```

## 🔧 Tecnologías Utilizadas

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS
- **React Router** - Enrutamiento
- **Socket.IO** - Comunicación en tiempo real
- **React Query** - Gestión de estado del servidor
- **DND Kit** - Drag and drop
- **Radix UI** - Componentes de UI accesibles

## 🌐 Configuración del Backend

Este frontend está configurado para conectarse a un backend en `http://localhost:3000`. Asegúrate de que:

1. El backend esté ejecutándose en el puerto 3000
2. El backend tenga habilitado CORS para `http://localhost:5173`
3. El backend soporte Socket.IO para la sincronización en tiempo real

## 📝 Notas de Desarrollo

- El proyecto usa **Yarn** como gestor de paquetes
- Los alias de importación están configurados con `@/` apuntando a `src/`
- El linter está configurado con ESLint y TypeScript
- Los componentes usan Tailwind CSS para los estilos
