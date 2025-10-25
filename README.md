# ProjectSync - Frontend (Angular UI)

![Angular Badge](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

This repository contains the official frontend UI for the **ProjectSync** application. It is a modern, reactive single-page application (SPA) built with Angular and styled with Tailwind CSS.

This client is designed to consume the [ProjectSync Backend API](https://github.com/java-lovelace/project-sync-backend_Latte) to provide a rich, interactive user experience for managing projects.

---

## Technology Stack

* **[Angular](https://angular.io/):** A platform and framework for building single-page client applications.
* **[TypeScript](https://www.typescriptlang.org/):** The primary language used, providing strong type-checking.
* **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development.
* **[RxJS](https://rxjs.dev/):** Used extensively by Angular for managing asynchronous operations and data streams.
* **[Angular CLI](https://angular.io/cli):** Used for project generation, building, and development.

---

## Features

* **View Projects:** Fetches and displays a list of all projects from the backend.
* **Create Project:** Provides a form (or modal) to create a new project.
* **Edit Project:** Allows users to select a project and update its details.
* **Delete Project:** Allows users to remove a project from the system.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following software installed on your machine:

1.  **Node.js and npm:** Angular requires a current, active LTS, or maintenance LTS version. (e.g., v18 or v20+).
    * *You can download it from [nodejs.org](https://nodejs.org/)*
2.  **Angular CLI:** The command-line interface for Angular.
    ```bash
    npm install -g @angular/cli
    ```
3.  **The Backend API:** This frontend **WILL NOT** work unless the [ProjectSync Backend API](https://github.com/java-lovelace/project-sync-backend_Latte) is running locally (typically on `http://localhost:8080`).

### Installation & Running

Follow these steps to run the application in a development environment:

**1. Clone the repository:**
```bash
git clone [https://github.com/java-lovelace/project-sync-frontend_Latte.git](https://github.com/java-lovelace/project-sync-frontend_Latte.git)
````

**2. Navigate to the project directory:**

```bash
cd project-sync-frontend_Latte
```

**3. Install dependencies:**
This will download all the required `node_modules` specified in `package.json`.

```bash
npm install
```

**4. Run the development server:**
This command will compile the application, start a development server, and automatically open it in your browser.

```bash
ng serve -o
```

*(The `-o` flag automatically opens it in your browser).*

By default, the application will be available at **`http://localhost:4200/`**.

-----

## API (Backend) Connection

This Angular application uses a **proxy** to handle Cross-Origin Resource Sharing (CORS) issues during development. This allows the app (running on `localhost:4200`) to send requests to the backend API (running on `http://localhost:8080`).

The configuration is in the `proxy.conf.json` file:

**`proxy.conf.json`**

```json
{
  "/api/*": {
    "target": "http://localhost:8080",
    "secure": false,
    "logLevel": "debug"
  }
}
```

This proxy is automatically enabled when you run `ng serve` because it is configured in the `angular.json` file.

**Important:** If your backend API is running on a port other than `8080`, you **must** update the `target` in the `proxy.conf.json` file.

```
```
