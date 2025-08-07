import type { Column } from "@/modules/kanban/interfaces";

export const initialColumns: Column[] = [
  { 
    id: "col-1", 
    title: "Pendiente", 
    cards: [
      { id: "c1", title: "Configurar entorno de desarrollo" },
      { id: "c2", title: "Crear diseño inicial en Figma" },
      { id: "c3", title: "Definir backlog de tareas" },
      { id: "c4", title: "Configurar eslint y prettier" },
      { id: "c5", title: "Instalar dependencias iniciales" },
      { id: "c6", title: "Diseñar la base de datos" },
      { id: "c7", title: "Crear estructura de carpetas" },
      { id: "c8", title: "Configurar variables de entorno" },
      { id: "c9", title: "Preparar mockups para el dashboard" },
      { id: "c10", title: "Redactar plan de testing inicial" },
      { id: "c11", title: "Definir roles de usuario" },
      { id: "c12", title: "Escribir documentación para devs" },
      { id: "c13", title: "Crear script de inicio del proyecto" },
      { id: "c14", title: "Configurar linter en CI/CD" },
      { id: "c15", title: "Preparar plantilla de Pull Requests" },
      { id: "c16", title: "Definir endpoints de la API" },
      { id: "c17", title: "Hacer investigación de librerías UI" },
      { id: "c18", title: "Diseñar iconografía del proyecto" },
      { id: "c19", title: "Crear sistema de tipografías" },
      { id: "c20", title: "Configurar husky para pre-commits" },
    ],
  },
  { 
    id: "col-2", 
    title: "En progreso", 
    cards: [
      { id: "c21", title: "Implementar autenticación con JWT" },
      { id: "c22", title: "Integrar API de usuarios" },
    ],
  },
  { 
    id: "col-3", 
    title: "En revisión", 
    cards: [
      { id: "c23", title: "Revisar PR de dashboard" },
      { id: "c24", title: "Testear componente de sidebar" },
    ],
  },
  { 
    id: "col-4", 
    title: "Completado", 
    cards: [
      { id: "c25", title: "Configurar CI/CD en Vercel" },
      { id: "c26", title: "Crear documentación inicial del proyecto" },
    ],
  },
];