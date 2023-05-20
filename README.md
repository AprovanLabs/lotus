# Lotus

Lotus websites. 'Highly Strung Tennis Tournamen' homepage

## Overview

The applications in this repository are written in [React](https://reactjs.org/), a popular web framework using JavaScript or TypeScript as the language and a templating syntax, stored in `.jsx` (JavaScript) or `.tsx` (TypeScript) files. We are using [TypeScript](https://www.w3schools.com/typescript/typescript_intro.php); this is becoming the industry standard due to its type safety and other features.

React is a bare-bones framework. Things like routing (what code should run on a websites '/page1' vs '/page2', and is a user allowed to access the '/admin' site), complete state management (what data is currently being displayed on the page), or querying functions (how do we send requests to a server) are not included. These are provided by other libraries.

### Meta-framework

[Next.js](https://nextjs.org/learn/foundations/about-nextjs/what-is-nextjs) is a 'meta-framework' that provides a number of these features out-of-the-box. It also provides a [backend](https://www.geeksforgeeks.org/frontend-vs-backend/) where we can write functions in JavaScript/TypeScript on a server, and call these from the frontend. This is useful for things like getting items from a database, where we don't want users on their browser to access the data directly.

All of this code can be run locally on your computer. For someone to view the site on a different computer, we must deploy the code to a server. This is done using [Vercel](https://vercel.com/) (who make Next.js).

### Libraries

- [Tailwind](https://tailwindcss.com/) - CSS framework
- [React Query](https://react-query.tanstack.com/) - Querying library
- [React Hook Form](https://react-hook-form.com/) - Form library

## Prerequisites

Install the below items before starting.

- [Git](https://git-scm.com/)
- [Node Version Manager (nvm)](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) Node ^18.10.0
- [VS Code](https://code.visualstudio.com/) (optional)
  - [Install Reccomended Extensions](<https://dev.to/askrishnapravin/recommend-vs-code-extensions-to-your-future-teammates-4gkb#:~:text=Configuring%20recommended%20extensions&text=vscode%2F%20in%20the%20root%20of,tools(we%20use%20Git).>)

## Getting Started

Clone the repository from GitHub. Make sure you are either locally logged-in to a GitHub account with access to the repository (preferred) or are [using a personal access token](docs/how-to/github-personal-access-token.md).

```bash
git clone https://github.com/AprovanLabs/lotus
```

Change to the directory of the repo ('lotus') and the specific project (e.g. the 'tennis' website). If using VS Code (recommended), [set Git bash as the default terminal](https://www.geeksforgeeks.org/how-to-integrate-git-bash-with-visual-studio-code/)

```bash
cd lotus       # If not already in the directory
cd apps/tennis # Specific application
```

Install the local dependencies needed to run the applications. This uses the `package-lock.json` file to install the exact versions of the dependencies used when the project was last built. This is preferred over `npm install` which will install the latest versions of the dependencies (which may cause differing installed between computers).

```bash
npm ci
```

## Running the Application

Run the below command to start the website, locally. You must be in a directory with a `package.json` file (e.g. `apps/tennis`).

- **Note**: Most other JavaScript/TypeScript projects will use `npm start` to start the application. This is not the case for Next.js projects.

```bash
npm run dev
```

Once the server is running, you should see `- ready started server on 0.0.0.0:3000, url: http://localhost:3000` in the terminal.

Open you browser to `http://localhost:3000` to view the website.
