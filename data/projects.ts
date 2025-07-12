export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
  github?: string;
  achievements: string[];
}

export const projects: Project[] = [
{
  title: "Sistema de Inventario y Ventas",
  description:
    "Aplicación web full-stack desarrollada para automatizar el control de stock y ventas en una tienda. Incluye panel de administración, alertas de productos bajos en inventario y generación de reportes.",
  tech: ["React", "Vite", "Node.js", "Express", "JavaScript", "MySQL", "Bootstrap","CSS"],
  image: "/images/proyectos/inventario.png",
  github: "https://github.com/minombresgabriel/inventory-system", // cambia si es privado
  achievements: [
    "Redujo un 30% el tiempo de gestión de inventario en Tienda Ananda Shop",
    "Alertas automáticas por bajo stock y reportes mensuales de ventas",
  ]
}
,
{
  title: "Sistema de Proveedores para Unicasa",
  description:
    "Aplicación web completa desarrollada para proveedores de Unicasa (como Coca-Cola) para consultar cuentas por pagar. Incluye backend en .NET Core y frontend en React, con base de datos SQL Server.",
  tech: [".NET Core", "React", "TypeScript", "Vite", "SQL Server", "IIS", "Bootstrap"],
  image: "/images/proyectos/sistema-proveedores.png",
  github: "https://github.com/minombresgabriel/sistema-proveedores", // si no es público, omite esto
  achievements: [
    "Procesó 500+ solicitudes/día con menos de 100ms de respuesta",
    "Desplegada en IIS y usada por proveedores reales",
    "Autenticación segura y consultas en tiempo real"
  ]
}
,
{
  title: "Sistema de Asistencias Automatizado",
  description:
    "Aplicación web para el control automatizado de asistencias. Permite el inicio de sesión con cédula y pin, registra entradas en tiempo real y ofrece un panel de administración para la gestión de usuarios y visualización de registros diarios.",
  tech: ["React", "Node.js", "Express", "JavaScript", "MongoDB", "Bootstrap"],
  image: "/images/proyectos/asistencias.png", // usa una imagen real del sistema si tienes
  github: "https://github.com/minombresgabriel/sistema-asistencia", // cámbialo si tienes el repo real
  achievements: [
    "Automatiza el control de asistencias con validación por cédula y pin",
    "Panel administrativo para consultas, registros y estadísticas diarias",
    "Desarrollado como proyecto académico con enfoque profesional"
  ]
},
{
  title: "Sitios WordPress y SEO para empresas europeas",
  description:
    "Migración, rediseño y optimización de múltiples sitios WordPress para Hatél Studio. Implementé mejoras de rendimiento, SEO técnico y usabilidad, utilizando Elementor y herramientas como GTmetrix y PageSpeed Insights.",
  tech: ["WordPress", "SEO", "GTmetrix", "Elementor"],
  image: "/images/proyectos/wordpress.png",
  achievements: [
    "Puntuación 95+ en Lighthouse para SEO y rendimiento web",
    "Migración completa y optimización de 10+ sitios WordPress",
    "Mejoras visibles en posicionamiento y velocidad de carga"
  ]
}
,
{
  title: "Dashboard Power BI – Propuesta para Mitsubishi",
  description:
    "Diseñé un dashboard interactivo en Power BI como propuesta empresarial de Mitsubishi, extrayendo y modelando datos desde Microsoft Access. Transformé información cruda en visualizaciones efectivas para toma de decisiones.",
  tech: ["Power BI", "Microsoft Access", "Excel", "DAX"],
  image: "/images/proyectos/powerbi-mitsubishi.png",
  achievements: [
    "Extracción y modelado de datos desde Access para KPIs clave",
    "Visualizaciones claras de métricas comerciales y operativas",
    "Presentación ejecutiva con storytelling visual enfocado en insights"
  ]
}
,
{
  title: "Dashboard de Ventas – Industria de Refrescos en EE. UU.",
  description:
    "Creé un dashboard en Power BI usando tablas de Excel con datos reales de ventas de bebidas. Incluyó segmentación por regiones, análisis temporal, proyecciones y comparativas visuales.",
  tech: ["Power BI", "Excel", "DAX", "Segmentación de Datos"],
  image: "/images/proyectos/powerbi-soda.png",
  achievements: [
    "Análisis completo de ventas históricas por estado y producto",
    "Segmentación interactiva y proyecciones dinámicas",
    "Presentación visual clara para toma de decisiones rápida"
  ]
}

  
];
