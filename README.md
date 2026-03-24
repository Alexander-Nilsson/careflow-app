# CareFlow 🏥

CareFlow is a specialized project management platform designed for healthcare environments to streamline and track continuous improvement work. It provides a structured workflow based on the **PGSA (Plan-Do-Study-Act)** cycle, allowing clinical teams to move from initial ideas to verified, high-quality healthcare improvements.

## 📺 Demo

![CareFlow App Interaction](demo.gif)
> *[Optional: Add a link to a full video demo here]*

## 🚀 Main Functionality

- **Kanban Board:** Visualize the entire lifecycle of improvement projects across five phases: *Förslag* (Proposal), *Planera* (Plan), *Göra* (Do), *Studera* (Study), and *Agera* (Act).
- **PGSA Integration:** Every project follows the Plan-Do-Study-Act methodology, ensuring that changes are tested, analyzed, and refined before full implementation.
- **Project Tracking:** 
  - Detailed project cards with titles, dates, locations, and custom tags.
  - Interactive checklists for each phase of the improvement cycle.
  - Results measurement and analysis tracking.
- **Categorization & Filtering:** Filter projects by clinic, center, tags, or status (Open/Closed) to easily find relevant work.
- **Team Collaboration:** Assign project leaders and members to specific improvement initiatives.
- **Admin Management:** Dedicated administrative features for overseeing projects and users.

## 🛠️ Technologies Used

- **Frontend:** [React](https://reactjs.org/) (with [TypeScript](https://www.typescriptlang.org/))
- **State & Routing:** [React Router](https://reactrouter.com/), Context API
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [React Bootstrap](https://react-bootstrap.github.io/), Vanilla CSS
- **Drag & Drop:** [@dnd-kit](https://dnd-kit.com/) for a smooth Kanban experience
- **Backend/Database:** [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- **Auth:** [Auth0](https://auth0.com/) for secure identity management
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)

## 📂 Project Structure

- `src/components/`: Reusable UI components (KanbanBoard, ProjectCard, Modals, etc.)
- `src/ImprovementWorkLib.tsx`: Core logic and interfaces for improvement projects.
