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
  title: "Inventory and Sales System",
  description:
    "Full-stack web application developed to automate stock control and sales in a store. Includes administration panel, low inventory alerts, and report generation.",
  tech: ["React", "Vite", "Node.js", "Express", "JavaScript", "MySQL", "Bootstrap","CSS"],
  image: "/images/proyectos/inventario.png",
  github: "https://github.com/minombresgabriel/inventory-system", // cambia si es privado
  achievements: [
    "Reduced inventory management time at Ananda Shop by 30%",
    "Automatic low stock alerts and monthly sales reports",
  ]
}
,
{
  title: "Supplier System for Unicasa",
  description:
    "Complete web application developed for Unicasa suppliers (such as Coca-Cola) to check accounts payable. Includes backend in .NET Core and frontend in React, with SQL Server database.",
  tech: [".NET Core", "React", "TypeScript", "Vite", "SQL Server", "IIS", "Bootstrap"],
  image: "/images/proyectos/sistema-proveedores.png",
  github: "https://github.com/minombresgabriel/sistema-proveedores", // si no es público, omite esto
  achievements: [
    "Processed 500+ requests/day with less than 100ms response time",
    "Deployed on IIS and used by real providers",
    "Secure authentication and real-time queries"
  ]
}
,
{
  title: "Automated Assistance System",
  description:
    "Web application for automated attendance control. It allows users to log in with their ID card and PIN, records entries in real time, and offers an administration panel for user management and viewing daily records.",
  tech: ["React", "Node.js", "Express", "JavaScript", "MongoDB", "Bootstrap"],
  image: "/images/proyectos/asistencias.png", // usa una imagen real del sistema si tienes
  github: "https://github.com/minombresgabriel/sistema-asistencia", // cámbialo si tienes el repo real
  achievements: [
    "Automates attendance control with ID card and PIN validation.",
    "Administrative panel for queries, records, and daily statistics.",
    "Developed as an academic project with a professional focus."
  ]
},

  
];
