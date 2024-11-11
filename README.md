# HealthVibe API Management Suite (Frontend)

[![License](https://img.shields.io/github/license/somnathnath8482/ApiDoctor.svg)](https://github.com/somnathnath8482/ApiDoctor/blob/main/LICENSE)
[![Issues](https://img.shields.io/github/issues/somnathnath8482/ApiDoctor.svg)](https://github.com/somnathnath8482/ApiDoctor/issues)
[![Contributors](https://img.shields.io/github/contributors/somnathnath8482/ApiDoctor.svg)](https://github.com/somnathnath8482/ApiDoctor/graphs/contributors)


Welcome to **HealthVibe**, an open-source frontend for an API management and testing suite. This platform is designed for seamless project and workflow management, optimized for developers, testers, and managers who work with APIs. You can try it live at [https://healthvibe.in/](https://healthvibe.in/).

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Bug Reporting](#bug-reporting)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

**HealthVibe** offers a comprehensive set of tools to assist teams with API project management, testing, reporting, and workflows. Our frontend platform is open-source, allowing developers to explore, improve, and contribute to the user interface and API interaction experience.

> **Note**: The backend code is proprietary and not included in this repository.

## Features

- **API Project Management**: Organize APIs under projects with customizable access levels.
- **User Roles**:
  - **Owner**: Full permissions to manage the project and assign users.
  - **Editor**: Can add, edit, and update API configurations and handle bug reports.
  - **Viewer**: Test APIs and report bugs.
- **API Testing Console**: Interactive testing with request/response display.
- **Bug Reporting & Resolution**: Report issues found during testing, track resolution progress.
- **Project Workflow & Roadmap**: Track and manage the project’s future roadmap and tasks. (upcoming)
- **Notifications**: Keep users updated on project changes, bug fixes, and assigned tasks.  (upcoming)

## Tech Stack

- **Frontend**: React with MUI for UI components

## File Structure

Here’s the folder structure for the frontend project:

├── public │ ├── favicon.ico │ ├── index.html │ ├── manifest.json │ └── logo192.png │ ├── src │ ├── assets # Static assets like images, icons │ ├── components # Reusable UI components │ │ ├── BugReport.js │ │ ├── ProjectList.js │ │ ├── ApiTestingConsole.js │ │ └── ... │ ├── pages # Main page views │ │ ├── Dashboard.js │ │ ├── LoginPage.js │ │ ├── ProfilePage.js │ │ └── ... │ ├── services # API calls and service utilities │ ├── utils # Helper functions │ ├── App.js │ ├── index.js │ └── App.css # Main stylesheet │ └── README.md



## Getting Started

To get a local copy of the **HealthVibe frontend** up and running, follow these steps.

### Prerequisites

- **Node.js** and **npm**

### Installation

1. **Clone the Repository**
   ```
   git clone https://github.com/username/repository.git
   cd repository
   ````


Frontend Setup

Navigate to the frontend directory and install dependencies:
````
Copy code
npm install
npm start
````
Backend API Configuration

Configure the backend API endpoint in the frontend environment settings file (e.g., .env or config.js).
Ensure the backend server is running and accessible at the configured endpoint.
Run the Application

Access the frontend at http://localhost:3000.



# Contributing
We welcome contributions from the community to enhance the frontend! Here’s how you can contribute:

Fork the Repository
Create a Branch
````
git checkout -b feature/new-feature
Commit Your Changes
````
````
git commit -m 'Add a new feature'
Push to the Branch
````

````
git push origin feature/new-feature
Submit a Pull Request
Please refer to our CONTRIBUTING.md for more detailed guidelines.
````

## Bug Reporting
If you encounter any bugs, please:

Open an issue in the repository with details.
Alternatively, you can report bugs via email: yourname@example.com.
Roadmap
Here’s a brief outline of upcoming frontend features:

### UI/UX Enhancements: Improved design and accessibility features.
API Request Console Upgrades: New response data visualizations.
Additional Project Management Tools: Templates and tagging for project tasks.
Check our Roadmap for detailed updates.

##License
This frontend is distributed under the MIT License. See LICENSE for more information.
