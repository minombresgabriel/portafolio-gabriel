---
title: "How I developed my automated support system with React, Node.js, and MongoDB"
date: "2025-07-20"
author: "Gabriel Ramírez"
image: "/images/posts/sistema-asistencias.png"
---

Creating an automated assistance system was one of the biggest challenges in terms of development. This article documents how this full stack project was approached, the tools used, the main obstacles overcome, and the lessons learned during the process.

## The origin of the idea

It all started with a real problem: in many educational institutions, attendance records are still kept manually, which makes them slow, prone to errors, and difficult to audit. This need gave rise to the idea of building a modern, automated solution that could be accessed from any device.

## Technologies used

- **Frontend:** React + Vite + React Bootstrap
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Authentication:** Login with ID card and personalized PIN
- **Support tools:** Postman (testing), GitHub (version control)

## Key features

- Secure login using ID card and unique PIN.
- Automatic attendance recording upon login.
- Administrative panel for managing users and viewing records.
- Responsive design with a modern and accessible interface.
- Detailed records by user, date, and time.

## System architecture

The project follows the **MVC (Model-View-Controller)** pattern. The backend manages the system logic, connects to the database, and protects routes using JWT. The frontend consumes the APIs to present information in real time with a clear and functional interface.

## Testing phase

Before connecting the graphical interface, exhaustive tests were carried out with Postman to validate the correct functioning of each endpoint. This allowed errors to be detected and corrected early on, optimizing the development flow.

## Interface and design

The aim was to create a visually powerful interface: a dark palette with bright details, stylized cards, soft edges, and modern typography. The goal was to offer not only functionality, but also a professional and attractive experience.

## Lessons learned

- Planning and structuring a full stack project from scratch.
- Data validation and route protection using JWT.
- Practical application of UI/UX principles.
- Documentation, organization, and deployment of a complete project.

---

This automated assistance system solved a specific need and also became a tangible example of what can be achieved as a developer. Are you working on a similar system or would you like to share your experience? We would love to hear from you!
